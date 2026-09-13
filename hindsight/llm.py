"""Model façade — one place for provider choice, models, and the JSON helper.

Reasoning (digests, personas, idea ranking, contradiction judging, pre-flight)
runs on OpenRouter by default. Retrieval embeddings stay on Gemini because the
corpus is already vectorized with gemini-embedding-001 and vectors from a
different model would not be comparable — so get_client()/embed_model() below
remain Gemini-only and are used solely by embeddings.py.
"""

import json
import os
import re
from pathlib import Path

_client = None


def _load_env() -> None:
    if not os.getenv("_HINDSIGHT_ENV_LOADED"):
        from dotenv import load_dotenv
        load_dotenv(Path(__file__).resolve().parent.parent / ".env")
        os.environ["_HINDSIGHT_ENV_LOADED"] = "1"


def provider() -> str:
    """openrouter | gemini. Explicit env wins; otherwise whichever key exists."""
    _load_env()
    choice = os.getenv("HINDSIGHT_LLM_PROVIDER", "").strip().lower()
    if choice in ("openrouter", "gemini"):
        return choice
    return "openrouter" if os.getenv("OPENROUTER_API_KEY") else "gemini"


def get_client():
    """Gemini client. Embeddings only — see module docstring."""
    global _client
    if _client is None:
        _load_env()
        import google.genai as genai
        key = os.getenv("GEMINI_API_KEY", "")
        if not key:
            raise RuntimeError("GEMINI_API_KEY is not set (see .env.example)")
        _client = genai.Client(api_key=key)
    return _client


def chat_model() -> str:
    if provider() == "openrouter":
        from .providers import chat_model as _m
        return _m()
    _load_env()
    return os.getenv("HINDSIGHT_GEMINI_CHAT_MODEL", "gemini-3-flash-preview")


def embed_model() -> str:
    _load_env()
    return os.getenv("HINDSIGHT_EMBED_MODEL", "gemini-embedding-001")


def generate(prompt: str, *, fast: bool = False) -> str:
    """One-shot completion. fast=True picks the cheaper model for bulk work."""
    if provider() == "openrouter":
        from .providers import complete, fast_model
        msg = complete([{"role": "user", "content": prompt}],
                       model=fast_model() if fast else None)
        return (msg.get("content") or "").strip()
    r = get_client().models.generate_content(model=chat_model(), contents=prompt)
    return (getattr(r, "text", None) or "").strip()


def generate_json(prompt: str, *, fast: bool = False) -> dict:
    """Generate + parse a JSON object; tolerates ```json fences and prose."""
    text = generate(prompt, fast=fast)
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip())
    m = re.search(r"\{.*\}", text, re.DOTALL)
    return json.loads(m.group(0) if m else text)
