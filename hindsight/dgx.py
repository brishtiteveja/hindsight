"""Optional local inference on the DGX Spark box — OpenAI-compatible.

Gemini stays the primary engine for everything Hindsight does on a schedule.
This module exists so a *specific* request can be answered locally instead: in
practice, vision. The box hosts multimodal models that can look at an actual
video frame, which Gemini is not wired up to do here.

Disabled unless DGX_API_KEY is set. Every entry point degrades to None/"" rather
than raising, so a dead box can never take a Hindsight endpoint down.

The one constraint that shapes this module: **the box holds one model in memory
at a time.** Asking for a different one triggers an implicit 1-5 minute cold
swap served on the same HTTP call. So nothing here runs on a timer, requests
stream by default to keep the connection alive through a load, and `preferred()`
lets a caller opt into whatever is already hot.
"""

import base64
import json
import os
import re
import urllib.error
import urllib.request

DEFAULT_BASE = "https://spark-e257.tail803c7f.ts.net:8443/v1"

# Preference order when we have a free choice, best-quality first. This is only
# a ranking — which models *exist* and which are vision-capable is read live
# from /catalog, because the box's roster changes (a vision model shipped after
# the integration guide was written, and hardcoding the list would have made us
# evict it needlessly).
VISION_PREFERENCE = [
    "glm-4.6v-awq-4bit",            # strongest multimodal
    "qwen3-vl-32b-instruct-gguf",   # highest-quality vision
    "qwen3-vl-30b-a3b-gguf",        # fast OCR / screenshots
    "qwen3.6-27b-nvidia-nvfp4",     # dense, vision + 256K ctx
    "internvl3-78b-gguf",
]

# GLM-4.6V wraps its final answer in these; other models never emit them.
_BOX = re.compile(r"<\|begin_of_box\|>|<\|end_of_box\|>")


def _base() -> str:
    return os.getenv("DGX_BASE_URL", DEFAULT_BASE).rstrip("/")


def _key() -> str:
    return os.getenv("DGX_API_KEY", "").strip()


def enabled() -> bool:
    return bool(_key())


def _get(path: str, timeout: float = 10.0) -> dict | None:
    """GET against the box root (not /v1). Health and catalog need no auth."""
    root = _base().rsplit("/v1", 1)[0]
    try:
        with urllib.request.urlopen(f"{root}{path}", timeout=timeout) as r:
            return json.load(r)
    except Exception:
        return None


def loaded_model() -> str:
    """Whichever model is resident right now, or '' if idle/unreachable."""
    return ((_get("/health") or {}).get("loaded") or [""])[0]


def vision_models() -> list[str]:
    """Vision-capable ids, live from the box, ranked by our preference."""
    cat = _get("/catalog") or {}
    ids = [m["id"] for m in cat.get("models", []) if m.get("vision")]
    if not ids:
        return list(VISION_PREFERENCE)
    rank = {m: i for i, m in enumerate(VISION_PREFERENCE)}
    return sorted(ids, key=lambda m: rank.get(m, len(rank)))


def preferred(candidates: list[str] | None = None) -> str:
    """Pick a vision model, strongly favouring whichever is already resident.

    The box holds one model at a time, so picking a cold one costs 1-5 minutes
    *and* evicts whatever someone else is using. If the hot model can see
    images, that is the right answer regardless of our quality ranking.
    """
    pool = candidates or vision_models()
    hot = loaded_model()
    return hot if hot in pool else (pool[0] if pool else VISION_PREFERENCE[0])


def chat(
    messages: list[dict],
    model: str = "",
    *,
    max_tokens: int = 800,
    temperature: float = 0.2,
    timeout: float = 900.0,
) -> str:
    """One completion. Returns '' on any failure — callers treat it as optional.

    Streams so that a cold model load keeps the socket alive; the router emits
    progress text as assistant content while weights load, which we drop.
    """
    if not enabled():
        return ""
    body = json.dumps({
        "model": model or preferred(),
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature,
        "stream": True,
    }).encode()
    req = urllib.request.Request(
        f"{_base()}/chat/completions",
        data=body,
        headers={"Authorization": f"Bearer {_key()}",
                 "Content-Type": "application/json"},
    )
    try:
        parts: list[str] = []
        with urllib.request.urlopen(req, timeout=timeout) as r:
            for raw in r:
                line = raw.decode("utf-8", "replace").strip()
                if not line.startswith("data:"):
                    continue
                payload = line[5:].strip()
                if payload == "[DONE]":
                    break
                try:
                    delta = json.loads(payload)["choices"][0]["delta"]
                except (KeyError, IndexError, json.JSONDecodeError):
                    continue
                # `reasoning` is the model thinking aloud, not the answer.
                if delta.get("content"):
                    parts.append(delta["content"])
        return _BOX.sub("", "".join(parts)).strip()
    except Exception:
        return ""


def describe_image(
    jpeg: bytes,
    prompt: str,
    *,
    model: str = "",
    max_tokens: int = 700,
) -> str:
    """Ask a vision model about one image. '' if disabled or unreachable."""
    if not enabled() or not jpeg:
        return ""
    b64 = base64.b64encode(jpeg).decode()
    return chat(
        [{"role": "user", "content": [
            {"type": "text", "text": prompt},
            {"type": "image_url",
             "image_url": {"url": f"data:image/jpeg;base64,{b64}"}},
        ]}],
        model=model or preferred(),
        max_tokens=max_tokens,
    )


def status() -> dict:
    """Small dict for the API/debugging — never raises."""
    if not enabled():
        return {"enabled": False, "reason": "DGX_API_KEY not set"}
    health = _get("/health")
    return {
        "enabled": True,
        "base": _base(),
        "reachable": health is not None,
        "loaded": (health or {}).get("loaded") or [],
    }
