"""Precompute — bake every read-heavy view to disk.

None of these views change between ingests, yet some were rebuilt on every
request: the issue timeline opened a transcript file per event just to find the
evidence second (~60s). This walks the corpus once, resolves those seconds in a
single pass, and writes ready-to-serve JSON. Endpoints then just stream a file.

    uv run python -m hindsight.precompute            # everything
    uv run python -m hindsight.precompute timelines  # one section
"""

import json
import re
import sys
import time
from collections import defaultdict

from . import story, taxonomy
from .store import DATA_DIR, ChannelStore, list_channels

CACHE = DATA_DIR / "_cache"
CUT_PRESETS = [
    ("tech", ["dwarkesh-patel"]),
    ("tech", ["lex-fridman"]),
    ("immigration", ["fox-news", "msnbc"]),
    ("economy", ["the-young-turks", "ben-shapiro"]),
    ("justice", ["jubilee"]),
]


def _write(name: str, payload) -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    (CACHE / f"{name}.json").write_text(json.dumps(payload, ensure_ascii=False,
                                                   separators=(",", ":")))


def read(name: str):
    f = CACHE / f"{name}.json"
    if not f.exists():
        return None
    try:
        return json.loads(f.read_text())
    except Exception:
        return None


def _best_second(segments: list, terms: str) -> int:
    words = {w for w in re.findall(r"[a-z]{4,}", terms.lower())}
    if not words:
        return 0
    best, score = 0, 0
    for seg in segments:
        hit = len(words & set(re.findall(r"[a-z]{4,}", seg["text"].lower())))
        if hit > score:
            best, score = int(seg["start"]), hit
    return best


def timelines() -> None:
    """Per-issue evidence timelines + per-channel cut payloads, in one pass.

    The expensive part is the evidence second, which needs the transcript. We
    open each transcript at most once and answer every issue from it."""
    t0 = time.time()
    per_issue = defaultdict(list)          # issue -> events
    per_channel_issue = defaultdict(list)  # (slug, issue) -> clips

    for n, slug in enumerate(list_channels(), 1):
        store = ChannelStore(slug)
        meta = store.load_meta() or {}
        name = meta.get("name") or slug
        lean = taxonomy.lean_of(meta.get("group", ""))

        for d in store.digests():
            date = (d.get("published_at") or "")[:10]
            vid = d.get("video_id")
            if not date or not vid:
                continue
            # which issues does this video speak to, and with what topic entry
            matched: dict[str, dict] = {}
            for t in d.get("topics") or []:
                topic = t.get("topic", "")
                for key, (_l, _h, _i, keys) in taxonomy.ISSUES.items():
                    if key not in matched and taxonomy._match(topic, keys):
                        matched[key] = t
            if not matched:
                continue

            doc = store.get_transcript(vid)
            segs = (doc or {}).get("segments") or []
            dur = int(segs[-1]["start"] + segs[-1].get("duration", 0)) if segs else 0
            thumb = f"https://i.ytimg.com/vi/{vid}/mqdefault.jpg"

            for key, t in matched.items():
                second = _best_second(segs, f"{t.get('topic','')} {t.get('summary','')}")
                ev = {
                    "date": date, "channel": name, "slug": slug, "lean": lean,
                    "topic": t.get("topic", ""), "stance": t.get("stance", "neutral"),
                    "summary": t.get("summary", ""),
                    "video_id": vid, "title": d.get("title", ""), "thumb": thumb,
                    "t": second,
                    "url": f"https://www.youtube.com/watch?v={vid}&t={second}s",
                }
                per_issue[key].append(ev)
                per_channel_issue[(slug, key)].append(
                    {**{k: ev[k] for k in ("date", "video_id", "title", "thumb",
                                           "stance", "topic", "summary", "t")},
                     "dur_s": dur})
        if n % 20 == 0:
            print(f"  …{n} channels ({time.time()-t0:.0f}s)", flush=True)

    # issue timelines, trimmed for transport but with full aggregates
    for key, events in per_issue.items():
        events.sort(key=lambda e: e["date"])
        entry = taxonomy.ISSUES[key]
        by_stance: dict[str, int] = defaultdict(int)
        by_lean: dict[str, dict] = defaultdict(lambda: defaultdict(int))
        for e in events:
            by_stance[e["stance"]] += 1
            by_lean[e["lean"]][e["stance"]] += 1
        _write(f"timeline_{key}", {
            "issue": key, "label": entry[0], "hue": entry[1], "issues": entry[2],
            "total": len(events), "channels": len({e["slug"] for e in events}),
            "stances": dict(by_stance),
            "by_lean": {k: dict(v) for k, v in by_lean.items()},
            "events": events[-200:],
        })
    print(f"  timelines: {len(per_issue)} issues", flush=True)

    # cut presets
    for issue, slugs in CUT_PRESETS:
        entry = taxonomy.ISSUES.get(issue)
        if not entry:
            continue
        tracks, dates = [], []
        for slug in slugs:
            store = ChannelStore(slug)
            meta = store.load_meta() or {}
            clips = sorted(per_channel_issue.get((slug, issue), []),
                           key=lambda c: c["date"])[-220:]
            dates += [c["date"] for c in clips]
            pairs = []
            from .contradictions import load_contradictions
            for p in (load_contradictions(store) or []):
                a, b = p.get("claim_a", {}), p.get("claim_b", {})
                pairs.append({"a": {k: a.get(k) for k in ("video_id", "date", "text")},
                              "b": {k: b.get(k) for k in ("video_id", "date", "text")},
                              "explanation": p.get("explanation", ""),
                              "similarity": p.get("similarity")})
            tracks.append({"slug": slug, "name": meta.get("name") or slug,
                           "lean": taxonomy.lean_of(meta.get("group", "")),
                           "clips": clips, "contradictions": pairs})
        _write(f"cut_{issue}_{'_'.join(slugs)}", {
            "issue": issue, "label": entry[0], "hue": entry[1],
            "range": {"start": min(dates) if dates else "",
                      "end": max(dates) if dates else ""},
            "tracks": tracks})
    print(f"  cut presets: {len(CUT_PRESETS)} ({time.time()-t0:.0f}s)", flush=True)


def diaries() -> None:
    story.build_index()
    _write("ledger_200", story.ledger(days=200))
    _write("ledger_90", story.ledger(days=90))
    _write("targets_120", story.targets(days=120))
    _write("story_suggest", {"actors": story.suggestions()})
    print("  ledger + targets cached", flush=True)


def main() -> None:
    which = sys.argv[1] if len(sys.argv) > 1 else "all"
    t0 = time.time()
    if which in ("all", "diaries"):
        print("diaries…", flush=True)
        diaries()
    if which in ("all", "timelines"):
        print("timelines + cut…", flush=True)
        timelines()
    print(f"done in {time.time()-t0:.0f}s → {CACHE}", flush=True)


if __name__ == "__main__":
    main()
