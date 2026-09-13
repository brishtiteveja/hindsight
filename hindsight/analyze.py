"""Per-video analysis — one Gemini call per transcript produces a compact digest
that powers search, personas, and (downstream) contradiction detection."""

from datetime import datetime, timezone

from .llm import generate_json
from .store import ChannelStore

_DIGEST_PROMPT = """Analyze this video transcript and return ONLY a JSON object:
{{
  "summary": "2-3 sentence summary",
  "key_narrative": "the central story/argument of the video in one sentence",
  "topics": [{{"topic": "snake_case_topic", "stance": "supportive|critical|neutral|mixed", "summary": "one line"}}],
  "claims": [{{"claim": "a specific, checkable statement made in the video", "quote": "short verbatim quote supporting it", "actor": "who said it (person's name if identifiable from context, else 'host')"}}],
  "actors": ["names of people who speak or are centrally discussed"],
  "key_quotes": ["up to 3 short memorable verbatim quotes"]
}}

Video title: {title}
Published: {published_at}

Transcript:
{text}
"""

MAX_CHARS = 60_000  # keep prompt within a safe context size


def analyze_video(store: ChannelStore, video_id: str, force: bool = False) -> dict | None:
    """Digest one transcript. Returns the digest, or None if unusable."""
    if not force:
        existing = store.get_digest(video_id)
        if existing:
            return existing
    doc = store.get_transcript(video_id)
    if not doc or len(doc.get("full_text", "")) < 200:
        return None

    digest = generate_json(_DIGEST_PROMPT.format(
        title=doc.get("title", video_id),
        published_at=doc.get("published_at", "unknown"),
        text=doc["full_text"][:MAX_CHARS],
    ))
    digest.update({
        "video_id": video_id,
        "title": doc.get("title", ""),
        "published_at": doc.get("published_at", ""),
        "analyzed_at": datetime.now(timezone.utc).isoformat(),
    })
    store.save_digest(video_id, digest)
    return digest


def analyze_channel(store: ChannelStore, force: bool = False,
                    progress=None) -> tuple[int, int]:
    """Digest every transcript in the channel. Returns (ok, failed)."""
    ok = failed = 0
    for doc in store.transcripts():
        vid = doc["video_id"]
        try:
            if analyze_video(store, vid, force=force):
                ok += 1
            else:
                failed += 1
        except Exception:
            failed += 1
        if progress:
            progress(vid, ok, failed)
    return ok, failed
