"""Optional visual layer — bridges to an 8kEdu deployment for frame-level video
understanding (https://github.com/8k-Edu/8kEdu).

8kEdu extracts keyframes per video and answers VLM questions about any frame.
Hindsight uses it to make citations *visual*: given a citation timestamp we can
(1) fetch the nearest keyframe as a thumbnail and (2) ask what is on screen at
that exact moment — so a contradiction card can show both moments side by side
and deep-link into the player.

Disabled unless EDU8K_URL is set (e.g. https://dev.perspectivity.co/8kedu).
All failures degrade silently to text-only citations."""

import os

import httpx


def _base() -> str:
    return os.getenv("EDU8K_URL", "").rstrip("/")


def enabled() -> bool:
    return bool(_base())


def frame_at(video_id: str, t: float) -> dict | None:
    """Nearest keyframe metadata for (video, timestamp): {file, time, url}."""
    if not enabled():
        return None
    try:
        r = httpx.get(f"{_base()}/api/info", params={"video": video_id}, timeout=10)
        if r.status_code != 200:
            return None
        frames = (r.json() or {}).get("frames") or []
        if not frames:
            return None
        fr = min(frames, key=lambda f: abs(f.get("time", 0) - t))
        fr["url"] = f"{_base()}/data/{video_id}/{fr.get('file','')}"
        return fr
    except Exception:
        return None


def describe_moment(video_id: str, t: float, context: str = "") -> str:
    """Ask the 8kEdu VLM what is on screen at (video, t). '' on any failure."""
    if not enabled():
        return ""
    try:
        r = httpx.post(f"{_base()}/api/widget", json={
            "video": video_id, "time": t,
            "text": context[:1200],
            "ask": "Briefly describe what is visible on screen at this moment "
                   "(speaker, setting, any on-screen text).",
        }, timeout=30)
        if r.status_code != 200:
            return ""
        return (r.json() or {}).get("description", "") or ""
    except Exception:
        return ""


def enrich_citations(citations: list[dict], context: str = "") -> list[dict]:
    """Attach {frame_url, frame_time} to citations that have video_id + t."""
    if not enabled():
        return citations
    for c in citations:
        fr = frame_at(c.get("video_id", ""), float(c.get("t", 0)))
        if fr:
            c["frame_url"] = fr.get("url", "")
            c["frame_time"] = fr.get("time", c.get("t", 0))
    return citations
