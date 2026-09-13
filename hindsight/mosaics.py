"""Issue cover imagery — built from the clips themselves.

Abstract art says nothing about an issue. A mosaic of the actual video frames
tagged to it does: you see the faces, the chyrons, the settings. This scans the
digests once, buckets representative videos per issue and facet, and caches the
result to disk (rebuilt when the channel set changes).
"""

import json
import random
from pathlib import Path

from . import taxonomy
from .store import DATA_DIR, ChannelStore, list_channels

CACHE = DATA_DIR / "_mosaics.json"
PER_KEY = 12          # candidates kept per issue
PER_CHANNEL = 2       # cap per channel so one big corpus can't dominate


def _thumb(video_id: str) -> str:
    return f"https://i.ytimg.com/vi/{video_id}/mqdefault.jpg"


def build(force: bool = False) -> dict:
    """{'issues': {key: [{video_id, thumb, title, channel}]}, 'facets': {...}}"""
    slugs = list_channels()
    stamp = f"{len(slugs)}:{sum(1 for _ in slugs)}"
    if CACHE.exists() and not force:
        try:
            cached = json.loads(CACHE.read_text())
            if cached.get("stamp") == stamp:
                return cached
        except Exception:
            pass

    issues: dict[str, list] = {k: [] for k in taxonomy.ISSUES}
    facets: dict[str, list] = {k: [] for k in taxonomy.FACETS}

    for slug in slugs:
        store = ChannelStore(slug)
        name = (store.load_meta() or {}).get("name") or slug
        seen_i: dict[str, int] = {}
        seen_f: dict[str, int] = {}
        # newest first — recent frames look current
        digests = sorted(store.digests(), key=lambda d: d.get("published_at", ""),
                         reverse=True)
        for d in digests:
            vid = d.get("video_id")
            if not vid:
                continue
            topics = [t.get("topic", "") for t in (d.get("topics") or [])]
            if not topics:
                continue
            entry = {"video_id": vid, "thumb": _thumb(vid),
                     "title": d.get("title", ""), "channel": name}
            for key, (_, _, _, keys) in taxonomy.ISSUES.items():
                if len(issues[key]) >= PER_KEY * 4 or seen_i.get(key, 0) >= PER_CHANNEL:
                    continue
                if any(taxonomy._match(t, keys) for t in topics):
                    issues[key].append(entry)
                    seen_i[key] = seen_i.get(key, 0) + 1
            for key, (_, _, keys) in taxonomy.FACETS.items():
                if len(facets[key]) >= PER_KEY * 4 or seen_f.get(key, 0) >= PER_CHANNEL:
                    continue
                if any(taxonomy._match(t, keys) for t in topics):
                    facets[key].append(entry)
                    seen_f[key] = seen_f.get(key, 0) + 1

    rng = random.Random(7)                       # stable shuffle across restarts
    for table in (issues, facets):
        for key, rows in table.items():
            rng.shuffle(rows)
            table[key] = rows[:PER_KEY]

    out = {"stamp": stamp, "issues": issues, "facets": facets}
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    CACHE.write_text(json.dumps(out))
    return out


def for_issue(key: str) -> list:
    return build().get("issues", {}).get(key, [])


def for_facet(key: str) -> list:
    return build().get("facets", {}).get(key, [])
