"""AG-UI transport — lets a CopilotKit frontend talk to this Python agent directly.

CopilotKit normally sits in front of a Node runtime. It also accepts
`selfManagedAgents: { name: new HttpAgent({ url }) }`, where the URL speaks the
AG-UI protocol — which means FastAPI can serve the agent itself and the stack
stays one process. That is the path taken here.

The event and request field names below are not guesses; they were read off the
zod schemas in @ag-ui/core (RunAgentInputSchema, TextMessage*/ToolCall*/Run*
EventSchema) in the installed package.

Where this differs from hindsight.agent: tool execution is split by side.
Backend tools run here and loop, so multi-step reasoning over the corpus never
leaves the server. A frontend tool (open_lens, play_moment) is emitted as a tool
call and the run ends — CopilotKit executes it in the browser, appends the
result, and starts the next run. That is AG-UI's round trip, and it is why the
agent can move the user's screen.
"""

import json
import uuid

from . import agent_tools
from .agent import MAX_STEPS, _system
from .providers import stream


def _event(payload: dict) -> bytes:
    return f"data: {json.dumps(payload, default=str)}\n\n".encode()


def _to_openai(messages: list[dict]) -> list[dict]:
    """AG-UI messages -> OpenAI chat messages."""
    out = []
    for m in messages:
        role = m.get("role")
        if role == "tool":
            out.append({"role": "tool",
                        "tool_call_id": m.get("toolCallId", ""),
                        "content": m.get("content") or ""})
            continue
        if role == "assistant":
            msg: dict = {"role": "assistant", "content": m.get("content") or None}
            calls = m.get("toolCalls") or []
            if calls:
                msg["tool_calls"] = [{
                    "id": c.get("id", ""),
                    "type": "function",
                    "function": {
                        "name": (c.get("function") or {}).get("name", ""),
                        "arguments": (c.get("function") or {}).get("arguments", "") or "{}",
                    },
                } for c in calls]
            out.append(msg)
            continue
        if role in ("user", "system", "developer"):
            content = m.get("content")
            if isinstance(content, list):
                # Multimodal input parts — keep the text, ignore the rest.
                content = " ".join(p.get("text", "") for p in content
                                   if isinstance(p, dict))
            out.append({"role": "user" if role == "user" else "system",
                        "content": content or ""})
        # reasoning/activity messages carry no input signal for us
    return _close_tool_gaps(out)


def _close_tool_gaps(messages: list[dict]) -> list[dict]:
    """Insert placeholders for tool calls whose result never came back.

    CopilotKit issue #3884: a tool message can go missing from the history it
    replays on a follow-up run. OpenAI-compatible APIs reject an assistant
    tool_call with no matching tool message outright, so a dropped result would
    turn into a 400 mid-conversation rather than a degraded answer."""
    out: list[dict] = []
    for i, m in enumerate(messages):
        out.append(m)
        if m.get("role") != "assistant" or not m.get("tool_calls"):
            continue
        answered = {n.get("tool_call_id") for n in messages[i + 1:]
                    if n.get("role") == "tool"}
        for call in m["tool_calls"]:
            if call["id"] not in answered:
                out.append({"role": "tool", "tool_call_id": call["id"],
                            "content": "(no result recorded)"})
    return out


def _client_tools(tools: list[dict]) -> tuple[list[dict], set[str]]:
    """Tools the browser declared (useFrontendTool), in OpenAI schema form.

    Trusting the client's list rather than a hardcoded one is what makes the UI
    tools composable: a new useFrontendTool in the React island becomes
    available to the model without touching Python."""
    schemas, names = [], set()
    for t in tools or []:
        name = t.get("name")
        if not name:
            continue
        names.add(name)
        schemas.append({"type": "function", "function": {
            "name": name,
            "description": t.get("description", ""),
            "parameters": t.get("parameters") or {"type": "object", "properties": {}},
        }})
    return schemas, names


def run_agui(body: dict):
    """Yield AG-UI SSE events for one run."""
    thread_id = body.get("threadId") or str(uuid.uuid4())
    run_id = body.get("runId") or str(uuid.uuid4())

    # The studio tells us which channel is on screen via forwardedProps; that is
    # the "context awareness" half of being an in-app agent.
    forwarded = body.get("forwardedProps") or {}
    channel = forwarded.get("channel") or ""
    for ctx in body.get("context") or []:
        if ctx.get("description", "").lower().startswith("channel") and not channel:
            channel = ctx.get("value") or ""

    yield _event({"type": "RUN_STARTED", "threadId": thread_id, "runId": run_id})

    try:
        convo = [{"role": "system", "content": _system(channel or None)}]
        convo += _to_openai(body.get("messages") or [])

        ui_schemas, ui_names = _client_tools(body.get("tools") or [])
        # Backend schemas minus anything the client also declared, so a tool is
        # never offered twice under the same name.
        backend = [s for s in agent_tools.SCHEMAS
                   if s["function"]["name"] not in ui_names
                   and s["function"]["name"] not in agent_tools.FRONTEND_TOOLS]
        tools = backend + ui_schemas

        for _ in range(MAX_STEPS):
            message_id = str(uuid.uuid4())
            text_open = False
            calls: dict[int, dict] = {}

            for choice in stream(convo, tools=tools):
                delta = choice.get("delta") or {}
                if delta.get("content"):
                    if not text_open:
                        yield _event({"type": "TEXT_MESSAGE_START",
                                      "messageId": message_id,
                                      "role": "assistant"})
                        text_open = True
                    yield _event({"type": "TEXT_MESSAGE_CONTENT",
                                  "messageId": message_id,
                                  "delta": delta["content"]})
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

            if text_open:
                yield _event({"type": "TEXT_MESSAGE_END", "messageId": message_id})

            ordered = [calls[i] for i in sorted(calls)]
            if not ordered:
                break

            convo.append({
                "role": "assistant",
                "content": None,
                "tool_calls": [{"id": c["id"], "type": "function",
                                "function": {"name": c["name"],
                                             "arguments": c["args"] or "{}"}}
                               for c in ordered],
            })

            # Announce every call, so the UI can render it as it happens.
            for call in ordered:
                yield _event({"type": "TOOL_CALL_START",
                              "toolCallId": call["id"],
                              "toolCallName": call["name"],
                              "parentMessageId": message_id})
                if call["args"]:
                    yield _event({"type": "TOOL_CALL_ARGS",
                                  "toolCallId": call["id"],
                                  "delta": call["args"]})
                yield _event({"type": "TOOL_CALL_END", "toolCallId": call["id"]})

            # A browser tool ends the run: CopilotKit runs it, appends the
            # result, and starts the next one.
            if any(c["name"] in ui_names for c in ordered):
                yield _event({"type": "RUN_FINISHED", "threadId": thread_id,
                              "runId": run_id})
                return

            for call in ordered:
                try:
                    args = json.loads(call["args"] or "{}")
                except json.JSONDecodeError:
                    args = {}
                result = agent_tools.dispatch(call["name"], args)
                content = json.dumps(result, default=str)[:20000]
                yield _event({"type": "TOOL_CALL_RESULT",
                              "messageId": str(uuid.uuid4()),
                              "toolCallId": call["id"],
                              "content": content,
                              "role": "tool"})
                convo.append({"role": "tool", "tool_call_id": call["id"],
                              "name": call["name"], "content": content})

        yield _event({"type": "RUN_FINISHED", "threadId": thread_id,
                      "runId": run_id})
    except Exception as e:                                    # noqa: BLE001
        # RUN_ERROR rather than a dropped connection, so the UI can say why.
        yield _event({"type": "RUN_ERROR", "message": str(e)})
