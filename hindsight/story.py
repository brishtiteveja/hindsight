"""Storyline — follow anything through time, across the whole map.

Type an actor ("Elon Musk"), an event ("debt ceiling"), or any phrase, and get
every video that carries it, in order, from every channel — each with its lean,
stance, and the receipt. One compact in-memory index makes queries instant.
"""

import json
import re
from collections import defaultdict

from . import taxonomy
from .store import DATA_DIR, ChannelStore, list_channels

INDEX_FILE = DATA_DIR / "_storyindex.json"
_mem: dict = {"mtime": None, "rows": None}


def build_index() -> int:
    """One row per video: everything the story search needs to match + render."""
    rows = []
    for slug in list_channels():
        store = ChannelStore(slug)
        meta = store.load_meta() or {}
        name = meta.get("name") or slug
        lean = taxonomy.lean_of(meta.get("group", ""))
        for d in store.digests():
            date = (d.get("published_at") or "")[:10]
            if not date:
                continue
            topics = d.get("topics") or []
            top = topics[0] if topics else {}
            rows.append({
                "v": d["video_id"], "s": slug, "ch": name, "l": lean, "d": date,
                "t": (d.get("title") or "")[:110],
                "n": (d.get("key_narrative") or "")[:150],
                "a": [a for a in (d.get("actors") or []) if a][:8],
                "st": top.get("stance", "neutral"),
                "tp": top.get("topic", ""),
            })
    rows.sort(key=lambda r: r["d"])
    INDEX_FILE.write_text(json.dumps(rows, ensure_ascii=False))
    _mem.update(mtime=None, rows=None)          # force reload
    return len(rows)


def _rows() -> list[dict]:
    if not INDEX_FILE.exists():
        build_index()
    mt = INDEX_FILE.stat().st_mtime
    if _mem["rows"] is None or _mem["mtime"] != mt:
        _mem["rows"] = json.loads(INDEX_FILE.read_text())
        _mem["mtime"] = mt
    return _mem["rows"]


def search(q: str, limit: int = 120, lean: str = "") -> dict:
    q = (q or "").strip()
    if len(q) < 2:
        return {"query": q, "total": 0, "events": []}
    needle = q.lower()
    words = [w for w in re.findall(r"[a-z0-9]{2,}", needle)]

    hits = []
    for r in _rows():
        if lean and r["l"] != lean:
            continue
        actors_l = " · ".join(r["a"]).lower()
        hay = f"{r['t']} {r['n']}".lower()
        # actor matches rank above body matches; require every word somewhere
        if needle in actors_l:
            score = 3
        elif all(w in actors_l or w in hay for w in words):
            score = 2 if any(w in actors_l for w in words) else 1
        else:
            continue
        hits.append((score, r))

    hits.sort(key=lambda h: (h[1]["d"], -h[0]))
    events = []
    for score, r in hits:
        events.append({
            "date": r["d"], "channel": r["ch"], "slug": r["s"], "lean": r["l"],
            "stance": r["st"], "topic": r["tp"],
            "title": r["t"], "narrative": r["n"],
            "actors": [a for a in r["a"] if needle in a.lower()] or r["a"][:2],
            "video_id": r["v"],
            "thumb": f"https://i.ytimg.com/vi/{r['v']}/mqdefault.jpg",
        })

    by_stance: dict[str, int] = defaultdict(int)
    by_lean: dict[str, dict] = defaultdict(lambda: defaultdict(int))
    by_month: dict[str, int] = defaultdict(int)
    for e in events:
        by_stance[e["stance"]] += 1
        by_lean[e["lean"]][e["stance"]] += 1
        by_month[e["date"][:7]] += 1

    total = len(events)
    # trim for transport but keep the aggregate story intact
    if total > limit:
        events = events[-limit:]
    return {"query": q, "total": total,
            "channels": len({e["slug"] for e in events}),
            "stances": dict(by_stance),
            "by_lean": {k: dict(v) for k, v in by_lean.items()},
            "by_month": dict(sorted(by_month.items())),
            "events": events}


def suggestions(top: int = 24) -> list[dict]:
    """The most-covered actors across the map — good starting points."""
    counts: dict[str, int] = defaultdict(int)
    for r in _rows():
        for a in r["a"]:
            if len(a) > 3 and not a.isupper() or a in ("ICE", "NATO", "FBI"):
                counts[a] += 1
    ranked = sorted(counts.items(), key=lambda kv: -kv[1])
    return [{"actor": a, "n": n} for a, n in ranked[:top]]


STANCE_W = {"critical": -1.0, "mixed": -0.2, "neutral": 0.0, "supportive": 1.0}


def ledger(days: int = 180, per_day: int = 14, min_videos: int = 4) -> dict:
    """The map as a diary: for each day, who was talked about, how hard, and
    which way the wind blew. Rows come newest-first for a scroll-down feed."""
    by_day: dict[str, list] = defaultdict(list)
    for r in _rows():
        by_day[r["d"]].append(r)

    dates = sorted(by_day, reverse=True)[: days * 2]      # generous window
    out_days = []
    for date in dates:
        rows = by_day[date]
        if len(rows) < min_videos:
            continue
        actors: dict[str, dict] = {}
        for r in rows:
            for a in r["a"][:6]:
                if len(a) < 3:
                    continue
                slot = actors.setdefault(a, {"n": 0, "w": 0.0, "channels": set()})
                slot["n"] += 1
                slot["w"] += STANCE_W.get(r["st"], 0.0)
                slot["channels"].add(r["s"])
        ranked = sorted(actors.items(), key=lambda kv: -kv[1]["n"])[:per_day]
        top_story = max(rows, key=lambda r: len(r["a"]))
        out_days.append({
            "date": date,
            "videos": len(rows),
            "headline": top_story["t"],
            "headline_video": top_story["v"],
            "actors": [{"name": a, "n": v["n"],
                        "net": round(v["w"] / v["n"], 2),
                        "channels": len(v["channels"])}
                       for a, v in ranked if v["n"] >= 2],
        })
        if len(out_days) >= days:
            break
    return {"days": out_days}


def cluster(actor: str, date: str) -> dict:
    """One actor on one day, sources grouped by lean — the click-through."""
    needle = actor.lower()
    groups: dict[str, list] = {"left": [], "center": [], "right": []}
    for r in _rows():
        if r["d"] != date:
            continue
        if not any(needle in a.lower() for a in r["a"]):
            continue
        groups[r["l"]].append({
            "channel": r["ch"], "slug": r["s"], "stance": r["st"],
            "title": r["t"], "narrative": r["n"], "video_id": r["v"],
            "thumb": f"https://i.ytimg.com/vi/{r['v']}/mqdefault.jpg",
        })
    return {"actor": actor, "date": date,
            "total": sum(len(v) for v in groups.values()), "groups": groups}


def targets(days: int = 120, top: int = 40) -> dict:
    """Who the map is criticizing — ranked, with a weekly heat series so you
    can watch a pile-on build and fade."""
    rows = _rows()
    if not rows:
        return {"targets": []}
    last = max(r["d"] for r in rows)
    import datetime as _dt
    cutoff = (_dt.date.fromisoformat(last) - _dt.timedelta(days=days)).isoformat()

    acc: dict[str, dict] = {}
    for r in rows:
        if r["d"] < cutoff:
            continue
        crit = r["st"] == "critical"
        for a in r["a"][:6]:
            if len(a) < 3:
                continue
            slot = acc.setdefault(a, {"n": 0, "crit": 0, "sup": 0,
                                      "weeks": defaultdict(lambda: [0, 0]),
                                      "by_lean": defaultdict(int),
                                      "latest": []})
            slot["n"] += 1
            wk = r["d"][:8] + "0"          # crude week bucket: 10-day bins by date prefix
            week = f"{r['d'][:7]}-{'early' if r['d'][8:] < '15' else 'late'}"
            slot["weeks"][week][0] += 1
            if crit:
                slot["crit"] += 1
                slot["weeks"][week][1] += 1
                slot["by_lean"][r["l"]] += 1
                if len(slot["latest"]) < 6:
                    slot["latest"].append({
                        "video_id": r["v"], "title": r["t"], "date": r["d"],
                        "channel": r["ch"], "lean": r["l"],
                        "thumb": f"https://i.ytimg.com/vi/{r['v']}/mqdefault.jpg"})
            elif r["st"] == "supportive":
                slot["sup"] += 1

    ranked = sorted(acc.items(), key=lambda kv: -kv[1]["crit"])[:top]
    out = []
    for name, v in ranked:
        if v["crit"] < 4:
            continue
        weeks = sorted(v["weeks"].items())
        out.append({
            "name": name, "mentions": v["n"], "critical": v["crit"],
            "supportive": v["sup"],
            "crit_share": round(v["crit"] / v["n"], 2),
            "by_lean": dict(v["by_lean"]),
            "series": [{"w": w, "n": c[0], "crit": c[1]} for w, c in weeks],
            "latest": v["latest"],
        })
    return {"window_days": days, "since": cutoff, "targets": out}
