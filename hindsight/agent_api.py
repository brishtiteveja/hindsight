"""HTTP transport for the agent — plain SSE.

Kept in its own router so the agent surface can be reasoned about (and mounted,
or not) independently of the corpus REST API. StreamingResponse is enough here;
no sse_starlette dependency for what is a one-line framing format.
"""

import json
from typing import Iterator

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from . import agent, agent_tools

router = APIRouter(prefix="/v1/agent", tags=["agent"])


class Message(BaseModel):
    role: str
    content: str = ""


class ChatBody(BaseModel):
    messages: list[Message]
    channel: str = ""


def _sse(events: Iterator[dict]) -> Iterator[bytes]:
    for ev in events:
        yield f"data: {json.dumps(ev, default=str)}\n\n".encode()
    yield b"data: [DONE]\n\n"


@router.post("/chat")
def chat(body: ChatBody):
    """Stream one agent turn.

    Event types match hindsight.agent: text, tool_call, tool_result, ui, done,
    error. The ui events are the interesting ones — the client is expected to
    execute those against its own surface (switch lens, open the player)."""
    messages = [m.model_dump() for m in body.messages]
    events = agent.run(messages, channel=body.channel or None)
    return StreamingResponse(
        _sse(events),
        media_type="text/event-stream",
        # nginx buffers SSE by default, which turns a live stream into one
        # delivery at the end; this is the header that stops it.
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@router.get("/tools")
def tools():
    """What the agent can do, and which side runs it. Handy for the demo and
    for debugging why a tool was or wasn't reachable."""
    return {
        "count": len(agent_tools.SCHEMAS),
        "tools": [{
            "name": s["function"]["name"],
            "runs_on": "browser" if s["function"]["name"] in agent_tools.FRONTEND_TOOLS
                       else "server",
            "description": s["function"]["description"],
        } for s in agent_tools.SCHEMAS],
    }
