"""Studio — the packaging half of the creator toolkit.

clips()    : semantic search over the catalogue, reranked for what would
             actually survive as a Short, with real in/out timestamps.
metadata() : a full SEO pack drafted from what was actually said — titles,
             description, chapters whose timestamps come from the transcript
             rather than the model's imagination, tags, pinned comments.
"""

import json
import re

from .embeddings import search
from .llm import generate_json
from .store import ChannelStore

_CLIP_PROMPT = """You pick moments from a creator's back catalogue that would work
as standalone Shorts. Strong stance, quotable, understandable with no setup.

For each candidate below decide whether it's clippable, and if so give the hook.
Return ONLY JSON: {{"clips":[{{
  "video_id": "...", "short_title": "punchy <60 char title",
  "hook": "the line or beat that makes someone stop scrolling",
  "score": 0.0-1.0}}]}}
Drop weak candidates entirely. Query the creator asked for: "{query}"

CANDIDATES:
{cands}
"""

_META_PROMPT = """Draft the upload package for this video, using only what was
actually said. Match the channel's voice.

CHANNEL: {channel}
TITLE AS PUBLISHED: {title}
WHAT IT COVERS: {summary}
KEY POINTS: {narrative}
TOPICS: {topics}
QUOTES: {quotes}

SECTION MARKERS (real transcript timestamps — pick 4-7 for chapters, keep the
seconds exactly as given, first chapter must be 0):
{markers}

Return ONLY JSON:
{{"titles": [{{"style":"curiosity|keyword|contrarian","text":"..."}}],
  "description": "2-3 paragraphs, no hashtags inline",
  "chapters": [{{"t": 0, "label": "..."}}],
  "tags": ["15 tags, lowercase"],
  "pinned_comments": ["2 options that invite replies"]}}
"""


def clips(store: ChannelStore, query: str, k: int = 12) -> dict:
    hits = search(store, query, k=k)
    if not hits:
        return {"query": query, "clips": []}

    cands = []
    for vid, score in hits:
        d = store.get_digest(vid) or {}
        quotes = (d.get("key_quotes") or [])[:2]
        cands.append({
            "video_id": vid, "title": d.get("title", ""),
            "date": (d.get("published_at") or "")[:10],
            "narrative": d.get("key_narrative", ""), "quotes": quotes,
            "score": score,
        })

    listing = "\n".join(
        f"- {c['video_id']} [{c['date']}] \"{c['title']}\" — {c['narrative']}"
        + (f" Quote: \"{c['quotes'][0]}\"" if c["quotes"] else "")
        for c in cands)
    try:
        picked = generate_json(_CLIP_PROMPT.format(query=query, cands=listing)).get("clips", [])
    except Exception:
        picked = [{"video_id": c["video_id"], "short_title": c["title"][:60],
                   "hook": c["narrative"], "score": round(c["score"], 2)} for c in cands[:6]]

    by_id = {c["video_id"]: c for c in cands}
    out = []
    for p in picked:
        base = by_id.get(p.get("video_id"))
        if not base:
            continue
        start, end = _clip_window(store, p["video_id"], p.get("hook", "") or query)
        out.append({**p, "title": base["title"], "date": base["date"],
                    "thumb": f"https://i.ytimg.com/vi/{p['video_id']}/mqdefault.jpg",
                    "start": start, "end": end,
                    "url": f"https://www.youtube.com/watch?v={p['video_id']}&t={start}s",
                    "ffmpeg": f"yt-dlp -f mp4 -o clip.mp4 "
                              f"https://youtu.be/{p['video_id']} && "
                              f"ffmpeg -ss {start} -to {end} -i clip.mp4 -c copy short.mp4"})
    out.sort(key=lambda c: -(c.get("score") or 0))
    return {"query": query, "clips": out}


def _clip_window(store: ChannelStore, video_id: str, terms: str,
                 length: int = 45) -> tuple[int, int]:
    """The best-matching stretch of transcript, as (start, end) seconds."""
    doc = store.get_transcript(video_id)
    segs = (doc or {}).get("segments") or []
    if not segs:
        return 0, length
    words = {w for w in re.findall(r"[a-z]{4,}", terms.lower())}
    best_i, best = 0, -1
    for i, s in enumerate(segs):
        hit = len(words & set(re.findall(r"[a-z]{4,}", s["text"].lower())))
        if hit > best:
            best, best_i = hit, i
    start = int(max(0, segs[best_i]["start"] - 3))
    return start, start + length


def metadata(store: ChannelStore, video_id: str, force: bool = False) -> dict:
    cache = store.digests_dir / f"{video_id}.meta.json"
    if cache.exists() and not force:
        return json.loads(cache.read_text())

    d = store.get_digest(video_id)
    if not d:
        raise ValueError("no digest for that video")
    doc = store.get_transcript(video_id) or {}
    segs = doc.get("segments") or []

    # candidate chapter marks: evenly spaced real segment starts
    marks = []
    if segs:
        step = max(1, len(segs) // 12)
        for s in segs[::step][:12]:
            marks.append(f"{int(s['start'])}s — \"{s['text'][:70]}\"")

    pack = generate_json(_META_PROMPT.format(
        channel=(store.load_meta() or {}).get("name") or store.channel,
        title=d.get("title", ""), summary=d.get("summary", ""),
        narrative=d.get("key_narrative", ""),
        topics=", ".join(t.get("topic", "") for t in (d.get("topics") or [])),
        quotes=" | ".join((d.get("key_quotes") or [])[:3]),
        markers="\n".join(marks) or "none",
    ))
    # never trust model timestamps — snap each to the nearest real segment
    starts = [int(s["start"]) for s in segs]
    for ch in pack.get("chapters", []):
        if starts:
            ch["t"] = min(starts, key=lambda s: abs(s - int(ch.get("t", 0))))
        ch["stamp"] = f"{ch['t'] // 60}:{ch['t'] % 60:02d}"
    pack["video_id"] = video_id
    pack["original_title"] = d.get("title", "")
    cache.write_text(json.dumps(pack, ensure_ascii=False, indent=2))
    return pack
