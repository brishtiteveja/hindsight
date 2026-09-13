"""Gemini client — one place for models, keys, and the JSON-call helper."""

import json
import os
import re
from pathlib import Path

_client = None


def get_client():
    global _client
    if _client is None:
        from dotenv import load_dotenv
        load_dotenv(Path(__file__).resolve().parent.parent / ".env")
        import google.genai as genai
        key = os.getenv("GEMINI_API_KEY", "")
        if not key:
            raise RuntimeError("GEMINI_API_KEY is not set (see .env.example)")
        _client = genai.Client(api_key=key)
    return _client


def chat_model() -> str:
    return os.getenv("HINDSIGHT_CHAT_MODEL", "gemini-3-flash-preview")


def embed_model() -> str:
    return os.getenv("HINDSIGHT_EMBED_MODEL", "gemini-embedding-001")


def generate(prompt: str) -> str:
    r = get_client().models.generate_content(model=chat_model(), contents=prompt)
    return (getattr(r, "text", None) or "").strip()


def generate_json(prompt: str) -> dict:
    """Generate + parse a JSON object; tolerates ```json fences."""
    text = generate(prompt)
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip())
    m = re.search(r"\{.*\}", text, re.DOTALL)
    return json.loads(m.group(0) if m else text)
