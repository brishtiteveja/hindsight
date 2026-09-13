# Hindsight — an agent that lives in the room where you publish

**Built for _Agents, Everywhere: Bots, Channels, & More_ (AI Tinkerers × OpenAI, Sept 12 2026).**

Live: https://dev.perspectivity.co/hindsight · by [Perspectivity](https://perspectivity.co)

---

## The premise

Most agents wait in a separate chat window, which means you have to stop working
to go ask them something. Hindsight doesn't. It is embedded in the creator's
studio, and it has hands: it switches the view you're looking at, and it opens
your own video at the exact second that proves what it just told you.

The context is the whole point. A general assistant can tell you how to write a
YouTube script. Hindsight is the only agent that has read **everything you have
ever published** — 100+ channels, 49,411 videos, digested into topics, stances,
attributed claims and quotes, with transcript timestamps — so it can tell you
that the script you're about to publish contradicts you, and show you where.

## The environment

The agent shows up in three places creators already are:

| Surface | What it is |
|---|---|
| **In the studio** | An in-app agent (CopilotKit) inside the Hindsight web studio. Not a sidebar that talks — it drives the app: opens the right lens, plays the receipt. |
| **In your pocket** | An Expo/React Native app over the same agent endpoint. |
| **In your terminal** | `hindsight agent` — the same loop, printing each tool call as it reaches for the catalogue. |

One agent core, three transports. The loop in `hindsight/agent.py` emits
normalized events, so nothing about it is bound to a particular surface.

## What makes it an agent, not a chatbot

It has eleven tools (`GET /v1/agent/tools`). Nine run on the server against the
corpus; **two run in the browser**, which is what lets it act on the app instead
of only describing it:

```
server   search_catalogue   ask_channel         get_persona
         check_draft        find_contradictions suggest_ideas
         find_clips         draft_metadata      list_channels

browser  open_lens          play_moment
```

So a turn looks like this — the agent reaching for evidence, then moving your
screen to it:

```
you> does my new script contradict anything I've said?

  ⚒ check_draft(channel="dwarkesh-patel", script="…")
  ▸ studio: open_lens {"lens": "preflight"}
  ⚒ search_catalogue(channel="dwarkesh-patel", query="AI timelines compute")
  ▸ studio: play_moment {"video_id": "Jj-kBHzUohs", "second": 915}

Two of your four claims are reversals. In March you said timelines were
overhyped; this draft says two years. Here is the moment — 15:15.
```

Frontend tools are fire-and-forget: the agent emits a `ui` event and gets an
acknowledgement immediately, rather than suspending the run for a client round
trip. The model doesn't need a return value to know it moved your screen, and a
demo that never blocks on the client can't hang on stage.

## The model stack

- **Reasoning** — OpenRouter on `openai/gpt-5.2` (`openai/gpt-5-mini` for bulk
  per-video work). One key, swappable model, attributed usage.
- **Retrieval** — `gemini-embedding-001` at 768 dims. This stays on Gemini
  deliberately: the corpus is already vectorized with it, and vectors from a
  different model aren't comparable, so switching would mean re-embedding 49K
  videos. The provider shim in `hindsight/llm.py` keeps the two independent.

## Quick start

```bash
uv sync
cp .env.example .env        # add OPENROUTER_API_KEY (+ GEMINI_API_KEY for embeddings)

uv run hindsight serve      # API + studio on :8300
uv run hindsight agent --channel dwarkesh-patel "what have I said about AI safety?"
```

Bring your own channel: `uv run hindsight ingest ./captions --channel "My Channel"`,
then `analyze` and `index`. Or paste video links into **＋ Add your channel** in
the studio and the whole pipeline runs in about a minute.

## Reviewing this repo from a clean clone

The 49K-video corpus is not in git — it's gigabytes of third-party captions, and
`data/` is gitignored. So a fresh clone starts empty. It starts *cleanly* empty:
nothing crashes, `/v1/channels` returns `[]`, and all 12 tools load.

The built agent island is committed (`web/agent/`), so you do **not** need npm to
run the app.

```bash
git clone https://github.com/brishtiteveja/hindsight && cd hindsight
uv sync

# Works with no API keys at all — parses captions into transcript documents:
uv run hindsight ingest samples/demo-channel --channel "Demo Channel"
uv run hindsight serve                       # studio on :8300
```

`samples/demo-channel/` is a short caption file written for this purpose (not
anyone's real video) containing a deliberate self-reversal and a guest
disclaimer, so the pre-flight and attribution behaviour can be exercised.

What each key unlocks:

| Without keys | `GEMINI_API_KEY` | `OPENROUTER_API_KEY` |
|---|---|---|
| ingest, browse transcripts, serve the studio, list tools | `analyze` / `index` — digests, embeddings, semantic search, persona | the agent itself: chat, pre-flight judging, ideas, clips, metadata |

Both keys are needed for the full agent experience, because reasoning and
retrieval deliberately run on different providers (see **The model stack**).

To rebuild the island after changing `agent-ui/src/`:

```bash
cd agent-ui && npm install && npx vite build     # outputs to web/agent/
node verify-island.mjs http://127.0.0.1:8300/    # asserts it mounted
```

## The agent API

| Endpoint | What it does |
|---|---|
| `POST /v1/agent/chat` | stream a turn (SSE: `text`, `tool_call`, `tool_result`, `ui`, `done`) |
| `GET  /v1/agent/tools` | what the agent can do, and which side runs each tool |

The rest of the corpus REST API — ingest, search, persona, contradictions,
ideas, pre-flight, clips, metadata, galaxy — is unchanged and documented in
`hindsight/api.py`.

## Underneath: the memory the agent reads

- **Transcript intelligence** — captions → per-video digests (summary, key
  narrative, topics with stances, attributed claims, quotes) → embeddings.
- **Grounded answers** — every claim carries a video id and a second, as a
  `youtube.com/watch?v=…&t=…s` deep link.
- **Contradiction detection** — same-topic claims ≥30 days apart, judged, with
  honest typing: a documented reversal is a contradiction; an unresolved shift
  is a video idea.
- **The studio pipeline** — Ideate (idea hub) → Write (pre-flight) → Cut (clip
  finder) → Ship (metadata), all over your own words.
- **Cross-channel context** — an Issue Galaxy of 22,904 videos as one zoomable
  canvas, a multitrack Narrative Cut timeline, and an accountability pair
  (who's the target / who reversed themselves).

Storage is plain JSON on disk — one folder per channel, no database. Delete a
folder to forget a channel.

## What was built during the hackathon

The rules allow reusing existing components. These are the parts that are
net-new:

- **`agent.py`** — the tool-calling loop, streaming, with browser-executed tools
- **`agent_tools.py`** — the engine exposed as 11 tool schemas + dispatch
- **`agent_api.py`** — the SSE agent transport
- **`providers.py`** + the `llm.py` shim — the OpenRouter migration
- **`moments.py`** — a window-and-IDF resolver for receipt timestamps, replacing
  a single-cue matcher whose ties always resolved to the earliest caption
- the in-studio CopilotKit surface and the `hindsight agent` CLI

**Reused as a building block:** the underlying transcript-intelligence engine
(ingest / analyze / index / persona / contradictions), the studio frontend, and
the already-collected corpus.

## License

MIT — © Perspectivity
