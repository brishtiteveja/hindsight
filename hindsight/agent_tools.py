"""The agent's hands — Hindsight's engine exposed as tool schemas + dispatch.

Two kinds of tool live side by side here:

  * backend tools  — executed in this process against the corpus
  * frontend tools — declared to the model but executed in the browser, so the
                     agent can drive the studio UI (switch lens, open a
                     transcript at a second). Dispatch returns a sentinel and
                     the transport hands the call to the client.

Every backend tool returns something citable. An answer the agent cannot
attach a video id and a timestamp to is worth less than no answer, so the
return shapes carry ids and seconds rather than prose.
"""

import re

from . import ideas as ideas_mod, precheck as precheck_mod, studio
from .contradictions import find_contradictions, load_contradictions
from .embeddings import search
from .persona import ask, build_persona
from .store import ChannelStore, list_channels

# Tools whose side effect belongs in the browser, not here.
FRONTEND_TOOLS = {"open_lens", "play_moment", "run_preflight"}


def _watch_url(video_id: str, second: int = 0) -> str:
    at = f"&t={int(second)}s" if second else ""
    return f"https://youtube.com/watch?v={video_id}{at}"


# ── backend tools ──

def t_list_channels() -> dict:
    return {"channels": list_channels()}


def t_search_catalogue(channel: str, query: str, k: int = 8) -> dict:
    store = ChannelStore(channel)
    out = []
    for vid, score in search(store, query, k=k):
        d = store.get_digest(vid) or {}
        out.append({"video_id": vid, "score": round(score, 4),
                    "title": d.get("title", ""),
                    "published_at": d.get("published_at", ""),
                    "summary": d.get("summary", ""),
                    "url": _watch_url(vid)})
    return {"results": out}


def t_read_sources(sources: list[dict]) -> dict:
    """Read bounded source excerpts without re-embedding or inventing citations."""
    results = []
    for source in sources[:8]:
        channel = str(source.get("channel", ""))
        vid = str(source.get("video_id", ""))
        if not channel or not re.fullmatch(r"[A-Za-z0-9_-]{1,100}", vid):
            results.append({"video_id": vid, "error": "invalid source identifier"})
            continue
        store = ChannelStore(channel)
        transcript = store.get_transcript(vid)
        if not transcript:
            results.append({"video_id": vid, "channel": channel, "error": "transcript not found"})
            continue
        digest = store.get_digest(vid) or {}
        second = max(0, float(source.get("second") or 0))
        segments = transcript.get("segments") or []
        excerpt = [x for x in segments if max(0, second-25) <= float(x.get("start", 0)) <= second+100][:100]
        results.append({"video_id": vid, "channel": channel,
            "title": transcript.get("title") or digest.get("title"),
            "published_at": transcript.get("published_at") or digest.get("published_at"),
            "summary": digest.get("summary", ""),
            "claims": (digest.get("claims") or [])[:12],
            "transcript_excerpt": [{"second": x.get("start", 0), "text": str(x.get("text", ""))[:700]} for x in excerpt],
            "excerpt_is_partial": len(excerpt) < len(segments),
            "attribution_note": "Channel ownership does not establish the speaker. Verify attribution before claiming a personal change of position.",
            "url": _watch_url(vid, int(second))})
    return {"sources": results, "scope": "Source excerpts and existing analysis; not independent fact verification."}


def t_ask_channel(channel: str, question: str, k: int = 8) -> dict:
    """Grounded answer over one channel, with timestamped citations."""
    return ask(ChannelStore(channel), question, k=k)


def t_get_persona(channel: str) -> dict:
    store = ChannelStore(channel)
    return store.load_persona() or build_persona(store)


def t_check_draft(channel: str, script: str) -> dict:
    """The money tool: does this draft contradict what the channel already said?"""
    return precheck_mod.check(ChannelStore(channel), script)


def t_find_contradictions(channel: str, actor: str = "") -> dict:
    store = ChannelStore(channel)
    found = load_contradictions(store, actor=actor)
    if found is None:
        found = find_contradictions(store, actor=actor)
    return {"scope": actor or "channel", "count": len(found),
            "contradictions": found[:12]}


def t_suggest_ideas(channel: str) -> dict:
    store = ChannelStore(channel)
    return ideas_mod.load_ideas(store) or ideas_mod.build_ideas(store)


def t_find_clips(channel: str, query: str, k: int = 8) -> dict:
    return studio.clips(ChannelStore(channel), query, k=k)


def t_draft_metadata(channel: str, video_id: str) -> dict:
    return studio.metadata(ChannelStore(channel), video_id)


DISPATCH = {
    "list_channels": t_list_channels,
    "read_sources": t_read_sources,
    "search_catalogue": t_search_catalogue,
    "ask_channel": t_ask_channel,
    "get_persona": t_get_persona,
    "check_draft": t_check_draft,
    "find_contradictions": t_find_contradictions,
    "suggest_ideas": t_suggest_ideas,
    "find_clips": t_find_clips,
    "draft_metadata": t_draft_metadata,
}


def _tool(name: str, description: str, properties: dict,
          required: list[str]) -> dict:
    return {"type": "function", "function": {
        "name": name, "description": description,
        "parameters": {"type": "object", "properties": properties,
                       "required": required}}}


_CHANNEL = {"type": "string", "description": "Channel slug, e.g. dwarkesh-patel."}

SCHEMAS = [
    _tool("read_sources", "Read the actual transcript excerpts and analysis for source videos already visible in the user's investigation or galaxy selection. Use before comparing their framing. Preserve dates and speaker uncertainty.",
          {"sources": {"type": "array", "maxItems": 8, "items": {"type": "object", "properties": {
              "channel": _CHANNEL, "video_id": {"type": "string"}, "second": {"type": "number", "description": "Optional source moment to inspect; defaults to start."}},
              "required": ["channel", "video_id"]}}}, ["sources"]),
    _tool("list_channels",
          "List every channel in the corpus. Use when unsure of a slug.",
          {}, []),
    _tool("search_catalogue",
          "Semantic search over one channel's analyzed videos. Returns video "
          "ids, titles, publish dates and scores. Start here for 'has this "
          "channel covered X' questions.",
          {"channel": _CHANNEL,
           "query": {"type": "string", "description": "Natural-language query."},
           "k": {"type": "integer", "description": "How many hits (default 8)."}},
          ["channel", "query"]),
    _tool("ask_channel",
          "Answer a question from one channel's own words, returning citations "
          "with video ids and the second the point was made. Prefer this over "
          "search when the user wants an answer rather than a list.",
          {"channel": _CHANNEL,
           "question": {"type": "string"},
           "k": {"type": "integer"}},
          ["channel", "question"]),
    _tool("get_persona",
          "The channel's synthesized profile: recurring topics, stances, "
          "narratives. Use for 'what is this channel about' or to ground tone.",
          {"channel": _CHANNEL}, ["channel"]),
    _tool("check_draft",
          "Check a draft script against everything the channel has published. "
          "Each extracted claim comes back judged consistent / drift / "
          "archive_conflict / contradiction, with the past video and second that "
          "clashes. Note the difference: 'contradiction' means the same named "
          "speaker reversed themselves, while 'archive_conflict' means the past "
          "claim's speaker could not be established — often a guest — so report "
          "it as conflicting with the channel's archive, never as the creator "
          "reversing themselves. Each past claim carries speaker and "
          "attribution fields; respect them.",
          {"channel": _CHANNEL,
           "script": {"type": "string", "description": "The draft script text."}},
          ["channel", "script"]),
    _tool("find_contradictions",
          "Claims the channel later reversed. Pass actor to track one person's "
          "claims across videos instead of the channel's own.",
          {"channel": _CHANNEL,
           "actor": {"type": "string", "description": "Optional person's name."}},
          ["channel"]),
    _tool("suggest_ideas",
          "Ranked next-video ideas from the channel's coverage gaps crossed "
          "with momentum across the rest of the corpus, including unresolved "
          "stance flips worth a reconciliation video.",
          {"channel": _CHANNEL}, ["channel"]),
    _tool("find_clips",
          "Moments in the back catalogue worth cutting as Shorts. Returns in/out "
          "seconds and a ready ffmpeg command.",
          {"channel": _CHANNEL,
           "query": {"type": "string", "description": "What the clip should be about."},
           "k": {"type": "integer"}},
          ["channel", "query"]),
    _tool("draft_metadata",
          "Titles, description, chapters snapped to real transcript timestamps, "
          "and tags for one video.",
          {"channel": _CHANNEL,
           "video_id": {"type": "string", "description": "YouTube video id."}},
          ["channel", "video_id"]),

    # ── frontend tools: executed by the browser ──
    _tool("open_lens",
          "Switch the studio to a lens so the user sees what you are talking "
          "about. Call this before explaining a result that has its own view.",
          {"lens": {"type": "string",
                    "enum": ["chat", "ideas", "preflight", "clips", "studio",
                             "coverage", "evolution", "prism", "receipts",
                             "river"],
                    "description": "Which lens to open."}},
          ["lens"]),
    _tool("play_moment",
          "Open a video in the studio player at an exact second, so the user "
          "can watch the receipt for a claim instead of trusting you. Returns "
          "whether the embed actually mounted — report what happened, and fall "
          "back to the watch URL if it did not.",
          {"video_id": {"type": "string"},
           "second": {"type": "integer", "description": "Where to start playback."},
           "note": {"type": "string", "description": "Why this moment matters."}},
          ["video_id", "second"]),
    _tool("run_preflight",
          "Check the draft already in the studio's Pre-flight editor against the "
          "channel's published past, rendering verdicts into the Pre-flight view. "
          "Prefer this over check_draft when the draft is already on screen — it "
          "avoids making the user paste it twice.",
          {}, []),
]


def dispatch(name: str, args: dict):
    """Run a backend tool. Frontend tools return None — the transport forwards
    them to the browser instead of executing them here."""
    if name in FRONTEND_TOOLS:
        return None
    fn = DISPATCH.get(name)
    if fn is None:
        return {"error": f"unknown tool: {name}"}
    try:
        return fn(**args)
    except TypeError as e:
        return {"error": f"bad arguments for {name}: {e}"}
    except Exception as e:                            # noqa: BLE001
        return {"error": f"{name} failed: {e}"}
