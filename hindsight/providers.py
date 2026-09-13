"""OpenRouter chat client — OpenAI-compatible, with tool calling.

Deliberately httpx-only rather than the OpenAI SDK: httpx is already a
dependency, and the pieces we need (chat completions, tool calls, streaming)
are a thin JSON contract. One less package to install on demo day.

Embeddings do NOT come through here. The 49K-video corpus is already
vectorized with gemini-embedding-001, and vectors from a different model are
not comparable — so retrieval stays on Gemini (see embeddings.py) while all
reasoning moves to OpenRouter.
"""

import json
import os
import time
from pathlib import Path

API_URL = "https://openrouter.ai/api/v1/chat/completions"
TIMEOUT = 180.0


def _env(name: str, default: str = "") -> str:
    if not os.getenv("_HINDSIGHT_ENV_LOADED"):
        from dotenv import load_dotenv
        load_dotenv(Path(__file__).resolve().parent.parent / ".env")
        os.environ["_HINDSIGHT_ENV_LOADED"] = "1"
    return os.getenv(name, default)


def api_key() -> str:
    key = _env("OPENROUTER_API_KEY", "")
    if not key:
        raise RuntimeError("OPENROUTER_API_KEY is not set (see .env.example)")
    return key


def chat_model() -> str:
    return _env("HINDSIGHT_CHAT_MODEL", "openai/gpt-5.2")


def fast_model() -> str:
    """Bulk per-video work — digests, batch judging — where latency x 49K matters."""
    return _env("HINDSIGHT_FAST_MODEL", "openai/gpt-5-mini")


def _headers() -> dict:
    # HTTP-Referer and X-Title are how OpenRouter attributes usage to an app.
    return {
        "Authorization": f"Bearer {api_key()}",
        "HTTP-Referer": _env("HINDSIGHT_PUBLIC_URL", "https://dev.perspectivity.co/hindsight"),
        "X-Title": "Hindsight",
        "Content-Type": "application/json",
    }


def complete(messages: list[dict], *, tools: list[dict] | None = None,
             model: str | None = None, temperature: float | None = None,
             retries: int = 4) -> dict:
    """One chat turn. Returns the raw assistant message dict, so callers can
    read .content or .tool_calls without this layer deciding which matters."""
    import httpx

    body: dict = {"model": model or chat_model(), "messages": messages}
    if tools:
        body["tools"] = tools
        body["tool_choice"] = "auto"
    if temperature is not None:
        body["temperature"] = temperature

    last = None
    for attempt in range(retries):
        try:
            r = httpx.post(API_URL, headers=_headers(), json=body, timeout=TIMEOUT)
            if r.status_code in (429, 500, 502, 503, 504):
                raise RuntimeError(f"openrouter {r.status_code}: {r.text[:200]}")
            r.raise_for_status()
            choices = r.json().get("choices") or []
            if not choices:
                raise RuntimeError("openrouter returned no choices")
            return choices[0].get("message") or {}
        except Exception as e:                      # noqa: BLE001 - retry any transport fault
            last = e
            if attempt == retries - 1:
                raise
            time.sleep(min(30, 2 ** attempt * 2))   # 2s, 4s, 8s, 16s
    raise last                                      # unreachable, keeps type checkers happy


def stream(messages: list[dict], *, tools: list[dict] | None = None,
           model: str | None = None):
    """Yield raw SSE delta dicts. The agent loop turns these into AG-UI events."""
    import httpx

    body: dict = {"model": model or chat_model(), "messages": messages, "stream": True}
    if tools:
        body["tools"] = tools
        body["tool_choice"] = "auto"

    with httpx.stream("POST", API_URL, headers=_headers(), json=body,
                      timeout=TIMEOUT) as r:
        r.raise_for_status()
        for line in r.iter_lines():
            if not line.startswith("data: "):
                continue
            payload = line[6:].strip()
            if payload == "[DONE]":
                return
            try:
                chunk = json.loads(payload)
            except json.JSONDecodeError:
                continue                            # OpenRouter sends ": keepalive" comments
            choices = chunk.get("choices") or []
            if choices:
                yield choices[0]
