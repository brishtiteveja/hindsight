"""The agent loop — transport-agnostic.

Yields normalized events so the same loop can back an AG-UI/CopilotKit stream,
a plain SSE endpoint, or the CLI:

    {"type": "text",        "delta": str}
    {"type": "tool_call",   "id", "name", "args"}
    {"type": "tool_result", "id", "name", "result"}
    {"type": "ui",          "id", "name", "args"}   # browser runs this one
    {"type": "done"}
    {"type": "error",       "message"}

Frontend tools (open_lens, play_moment) are fire-and-forget: we emit a "ui"
event for the browser and immediately hand the model an acknowledgement, rather
than suspending the run for a round trip. The model does not need a return
value to know it moved the user's screen, and a demo that never blocks on the
client is a demo that does not hang on stage.
"""

import json

from . import agent_tools
from .providers import stream
from .store import list_channels

MAX_STEPS = 8           # tool rounds per user turn; generous but bounded

SYSTEM = """You are Hindsight, an agent embedded in a YouTube creator's studio.

You have tool access to the creator's own analyzed catalogue — every video they
published, digested into topics, stances, attributed claims and quotes, with
transcript timestamps — plus a corpus of 100+ other channels for market context.

How you work:

- Ground everything. Before making a claim about what a channel said, call a
  tool. Never answer from memory about the catalogue's contents.
- Carry receipts. Cite the video id and the second, and prefer the tool's own
  timestamps over any you would estimate. Format links as
  youtube.com/watch?v=ID&t=SECONDs.
- Drive the screen. You are inside the studio UI, not a chat box. When a result
  has its own view, call open_lens to take the user there. When you reference a
  specific moment as evidence, call play_moment so they can watch it instead of
  trusting you.
- Be direct about conflicts. If a draft contradicts the channel's past
  position, say so plainly and show both moments. A reversal the creator learns
  about from their comment section is a failure of this tool.
- Distinguish a documented reversal from an unresolved shift. The first is a
  contradiction; the second is a video idea.
- Keep prose tight. The receipts are the product, not your commentary.

Budget your tools. Most questions are answerable in one or two calls: answer as
soon as you can support the claim, and do not go hunting for corroboration you
already have. Chain more than three calls only when the user actually asked for
something multi-part. Ending a turn with tool results and no answer is the one
failure mode to avoid — if you are near the limit, say what you found."""


def _system(channel: str | None) -> str:
    text = SYSTEM
    if channel:
        text += (f"\n\nThe studio is currently open on channel: {channel}. "
                 "Use that slug unless the user names another.")
    else:
        chans = list_channels()[:12]
        if chans:
            text += "\n\nChannels available include: " + ", ".join(chans)
    return text


def run(messages: list[dict], *, channel: str | None = None):
    """Drive one user turn to completion, yielding normalized events."""
    convo = [{"role": "system", "content": _system(channel)}] + list(messages)

    try:
        for _ in range(MAX_STEPS):
            content_parts: list[str] = []
            calls: dict[int, dict] = {}

            # Stream the assistant turn: text goes out immediately, tool-call
            # fragments are stitched by index until the turn ends.
            for choice in stream(convo, tools=agent_tools.SCHEMAS):
                delta = choice.get("delta") or {}
                if delta.get("content"):
                    content_parts.append(delta["content"])
                    yield {"type": "text", "delta": delta["content"]}
                for frag in delta.get("tool_calls") or []:
                    i = frag.get("index", 0)
                    slot = calls.setdefault(i, {"id": "", "name": "", "args": ""})
                    if frag.get("id"):
                        slot["id"] = frag["id"]
                    fn = frag.get("function") or {}
                    if fn.get("name"):
                        slot["name"] = fn["name"]
                    if fn.get("arguments"):
                        slot["args"] += fn["arguments"]

            content = "".join(content_parts)
            ordered = [calls[i] for i in sorted(calls)]

            if not ordered:
                yield {"type": "done"}
                return

            convo.append({
                "role": "assistant",
                "content": content or None,
                "tool_calls": [{"id": c["id"], "type": "function",
                                "function": {"name": c["name"],
                                             "arguments": c["args"] or "{}"}}
                               for c in ordered],
            })

            for call in ordered:
                name, call_id = call["name"], call["id"]
                try:
                    args = json.loads(call["args"] or "{}")
                except json.JSONDecodeError:
                    args = {}

                if name in agent_tools.FRONTEND_TOOLS:
                    yield {"type": "ui", "id": call_id, "name": name, "args": args}
                    result = {"dispatched": True, "surface": "studio-ui"}
                else:
                    yield {"type": "tool_call", "id": call_id, "name": name,
                           "args": args}
                    result = agent_tools.dispatch(name, args)
                    yield {"type": "tool_result", "id": call_id, "name": name,
                           "result": result}

                convo.append({"role": "tool", "tool_call_id": call_id,
                              "name": name,
                              "content": json.dumps(result, default=str)[:20000]})

        # Ran out of tool rounds with the model still wanting more.
        yield {"type": "text",
               "delta": "\n\n_(stopped after the tool limit — ask me to continue)_"}
        yield {"type": "done"}
    except Exception as e:                                       # noqa: BLE001
        yield {"type": "error", "message": str(e)}


def answer(question: str, *, channel: str | None = None) -> str:
    """Collect a whole run into text. Used by the CLI and for smoke tests."""
    out = []
    for ev in run([{"role": "user", "content": question}], channel=channel):
        if ev["type"] == "text":
            out.append(ev["delta"])
        elif ev["type"] == "error":
            out.append(f"\n[error: {ev['message']}]")
    return "".join(out).strip()
