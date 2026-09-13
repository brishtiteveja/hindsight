"""Pull a single video frame at a given second, and say what is on it.

This is the local alternative to an 8kEdu deployment (see visual.py): instead of
a service that pre-extracts keyframes for every video, we grab exactly the one
frame a caller asks for, when they ask for it.

    frame at t  ──yt-dlp (resolve stream)──> ffmpeg -ss (byte-range seek) ──> jpeg
                                                                              │
                                              dgx.describe_image (vision) <───┘

Deliberately **on demand only**. A frame costs ~20s wall-clock (stream resolve
plus seek) and a description costs a vision call, so this is far too expensive
to run across the corpus on a timer — and there is no need to, since the whole
point is answering "what was actually on screen when he said that?" for one
receipt a human is looking at. Results are cached to disk, so the second ask is
free.

Everything degrades to None/"" — the caller falls back to text-only citations.
"""

import os
import subprocess
from pathlib import Path

from .store import DATA_DIR
from . import dgx

CACHE = DATA_DIR / "_frames"

# 360p is plenty for "who is on screen and what does the caption say", and it
# keeps the byte-range seek small. Falls back progressively.
_FORMAT = "best[height<=720][ext=mp4]/best[height<=720]/best"

_ASK = (
    "This is a single frame from a video, at the exact moment a claim was made. "
    "In two short lines: (1) who is on screen and the setting, (2) transcribe any "
    "on-screen text or caption exactly, or write 'none'. Do not speculate about "
    "what is being said — describe only what is visible."
)


def _proxy() -> str:
    """Caption and media fetches go through the rotating proxy, never direct."""
    return os.getenv("YT_PROXY", "").strip()


def _path(video_id: str, t: int) -> Path:
    return CACHE / video_id / f"{t}.jpg"


def _stream_url(video_id: str) -> str:
    """Direct media URL for the video. These are IP-bound and expire in hours,
    which is fine because we use it immediately and never persist it."""
    try:
        import yt_dlp
    except ImportError:
        return ""
    opts = {"quiet": True, "no_warnings": True, "skip_download": True,
            "format": _FORMAT}
    if _proxy():
        opts["proxy"] = _proxy()
    try:
        with yt_dlp.YoutubeDL(opts) as y:
            info = y.extract_info(
                f"https://www.youtube.com/watch?v={video_id}", download=False)
        return info.get("url") or ""
    except Exception:
        return ""


def grab(video_id: str, t: float, *, timeout: float = 150.0) -> Path | None:
    """The frame at second `t`, extracting it if we don't already have it."""
    sec = max(0, int(t))
    out = _path(video_id, sec)
    if out.exists() and out.stat().st_size > 0:
        return out

    url = _stream_url(video_id)
    if not url:
        return None

    out.parent.mkdir(parents=True, exist_ok=True)
    cmd = ["ffmpeg", "-y", "-loglevel", "error"]
    if _proxy():
        cmd += ["-http_proxy", _proxy()]
    # -ss before -i seeks via HTTP range requests, so we fetch only the bytes
    # around the target rather than streaming the file from the start.
    cmd += ["-ss", str(sec), "-i", url, "-frames:v", "1", "-q:v", "3", str(out)]
    try:
        r = subprocess.run(cmd, capture_output=True, timeout=timeout)
    except subprocess.TimeoutExpired:
        return None
    if r.returncode != 0 or not out.exists() or out.stat().st_size == 0:
        out.unlink(missing_ok=True)
        return None
    return out


def describe(video_id: str, t: float, *, force: bool = False) -> dict:
    """What was on screen at (video, t). Cached next to the frame itself.

    Returns {video_id, t, frame, description, source}; `description` is '' when
    the box is disabled or unreachable, which callers treat as "text only".
    """
    sec = max(0, int(t))
    note = _path(video_id, sec).with_suffix(".txt")
    if note.exists() and not force:
        return {"video_id": video_id, "t": sec, "frame": str(_path(video_id, sec)),
                "description": note.read_text().strip(), "source": "cache"}

    frame = grab(video_id, t)
    if not frame:
        return {"video_id": video_id, "t": sec, "frame": "",
                "description": "", "source": "no-frame"}

    text = dgx.describe_image(frame.read_bytes(), _ASK)
    if text:
        note.write_text(text)
    return {"video_id": video_id, "t": sec, "frame": str(frame),
            "description": text, "source": "dgx" if text else "frame-only"}
