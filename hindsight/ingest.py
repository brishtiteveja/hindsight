"""Transcript ingestion — the API's front door.

Two paths, both rights-clean:
  1. Caption files the user already has (.srt / .vtt exports from YouTube Studio).
  2. Public/own-channel captions via youtube-transcript-api (optional dependency),
     for deployments where the operator has the rights to the content they fetch.
"""

import re
from datetime import datetime, timezone

from .store import ChannelStore

_TS = r"(\d{2}):(\d{2}):(\d{2})[,.](\d{3})"


def _to_seconds(h, m, s, ms) -> float:
    return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000


def parse_srt(text: str) -> list[dict]:
    """Parse .srt (or .vtt — same timestamp shape) into [{text, start, duration}]."""
    segments = []
    blocks = re.split(r"\n\s*\n", text.strip())
    for block in blocks:
        m = re.search(rf"{_TS}\s*-->\s*{_TS}", block)
        if not m:
            continue
        start = _to_seconds(*m.groups()[:4])
        end = _to_seconds(*m.groups()[4:])
        lines = block[m.end():].strip().splitlines()
        content = " ".join(l.strip() for l in lines
                           if l.strip() and not l.strip().isdigit())
        content = re.sub(r"<[^>]+>", "", content).strip()  # strip vtt styling tags
        if content:
            segments.append({"text": content, "start": round(start, 2),
                             "duration": round(end - start, 2)})
    return segments


def ingest_caption_file(store: ChannelStore, path, video_id: str = "",
                        title: str = "", published_at: str = "") -> dict:
    """Ingest one .srt/.vtt file as a transcript document."""
    raw = open(path, encoding="utf-8", errors="replace").read()
    segments = parse_srt(raw)
    vid = video_id or re.sub(r"\.[^.]+$", "", str(path).split("/")[-1])
    doc = {
        "video_id": vid,
        "title": title or vid,
        "published_at": published_at,
        "channel": store.channel,
        "segments": segments,
        "full_text": " ".join(s["text"] for s in segments),
        "word_count": sum(len(s["text"].split()) for s in segments),
        "ingested_at": datetime.now(timezone.utc).isoformat(),
        "source": "caption_file",
    }
    store.save_transcript(doc)
    return doc


def fetch_transcript(store: ChannelStore, video_id: str, languages=("en",),
                     title: str = "", published_at: str = "") -> dict:
    """Fetch captions for a video via youtube-transcript-api (optional extra).

    Only use for content you have the rights to (your own channel, or public
    captions where your use is permitted). Honors HTTPS_PROXY/HTTP_PROXY from
    the environment if the deployment needs one.
    """
    from youtube_transcript_api import YouTubeTranscriptApi  # optional dep

    entries = YouTubeTranscriptApi().fetch(video_id, languages=list(languages))
    segments = [{"text": e.text, "start": round(e.start, 2),
                 "duration": round(e.duration, 2)} for e in entries]
    doc = {
        "video_id": video_id,
        "title": title or video_id,
        "published_at": published_at,
        "channel": store.channel,
        "segments": segments,
        "full_text": " ".join(s["text"] for s in segments),
        "word_count": sum(len(s["text"].split()) for s in segments),
        "ingested_at": datetime.now(timezone.utc).isoformat(),
        "source": "youtube_transcript_api",
    }
    store.save_transcript(doc)
    return doc
