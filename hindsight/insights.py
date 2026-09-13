"""Aggregation endpoints' engine — the data behind the visual pages.

Everything here is pure aggregation over stored digests (no LLM calls):
  • timeline — per-topic stance over time (Stance Drift / Voice Evolution)
  • topics   — mentions, momentum, lifecycle per topic (Coverage Map)
  • prism    — videos bucketed by stance for one topic (Event Prism)
  • river    — monthly topic volume series (Narrative River)
"""

from collections import Counter, defaultdict

from .store import ChannelStore

STANCE_NUM = {"supportive": 1, "neutral": 0, "mixed": 0, "critical": -1}


def _topic_events(store: ChannelStore) -> list[dict]:
    """Flatten digests to (date, topic, stance, video) events, date-sorted."""
    events = []
    for d in store.digests():
        date = (d.get("published_at") or "")[:10]
        for t in d.get("topics") or []:
            if t.get("topic"):
                events.append({"date": date, "topic": t["topic"],
                               "stance": t.get("stance", "neutral"),
                               "video_id": d["video_id"], "title": d.get("title", ""),
                               "summary": t.get("summary", "")})
    return sorted(events, key=lambda e: e["date"])


def timeline(store: ChannelStore, topic: str) -> dict:
    """Stance timeline for one topic + detected shifts (adjacent stance changes)."""
    points = [e for e in _topic_events(store) if e["topic"] == topic and e["date"]]
    shifts = []
    for prev, curr in zip(points, points[1:]):
        if prev["stance"] != curr["stance"]:
            delta = abs(STANCE_NUM.get(curr["stance"], 0) - STANCE_NUM.get(prev["stance"], 0))
            shifts.append({"from": prev["stance"], "to": curr["stance"],
                           "from_date": prev["date"], "to_date": curr["date"],
                           "video_id": curr["video_id"], "title": curr["title"],
                           "magnitude": delta})
    return {"topic": topic, "points": points, "shifts": shifts}


def topics(store: ChannelStore) -> list[dict]:
    """Coverage map: per-topic mentions, date span, recent share, momentum, status."""
    events = _topic_events(store)
    dated = [e for e in events if e["date"]]
    if not dated:
        return []
    all_dates = sorted({e["date"] for e in dated})
    recent_cut = all_dates[max(0, int(len(all_dates) * 0.75))]  # last quarter of the span

    by_topic = defaultdict(list)
    for e in dated:
        by_topic[e["topic"]].append(e)

    out = []
    for topic_name, evs in by_topic.items():
        recent = [e for e in evs if e["date"] >= recent_cut]
        share = len(recent) / len(evs)
        momentum = round(share / 0.25, 2)  # 1.0 == steady; >1 accelerating
        status = ("hot" if momentum > 1.3 else
                  "fading" if momentum < 0.6 else "steady")
        out.append({"topic": topic_name, "mentions": len(evs),
                    "first": evs[0]["date"], "last": evs[-1]["date"],
                    "recent_mentions": len(recent), "momentum": momentum,
                    "status": status,
                    "stances": dict(Counter(e["stance"] for e in evs))})
    out.sort(key=lambda t: -t["mentions"])
    return out


def prism(store: ChannelStore, topic: str) -> dict:
    """Event Prism: videos on one topic bucketed by stance."""
    buckets = defaultdict(list)
    for e in _topic_events(store):
        if e["topic"] == topic:
            buckets[e["stance"]].append({"video_id": e["video_id"], "title": e["title"],
                                         "date": e["date"], "summary": e["summary"]})
    order = ["supportive", "neutral", "mixed", "critical"]
    return {"topic": topic,
            "buckets": {s: buckets.get(s, []) for s in order if s in buckets or True}}


def river(store: ChannelStore, top_n: int = 10) -> dict:
    """Narrative River: monthly mention counts for the top-N topics."""
    events = [e for e in _topic_events(store) if len(e["date"]) >= 7]
    top = [t for t, _ in Counter(e["topic"] for e in events).most_common(top_n)]
    months = sorted({e["date"][:7] for e in events})
    series = {t: [0] * len(months) for t in top}
    mi = {m: i for i, m in enumerate(months)}
    for e in events:
        if e["topic"] in series:
            series[e["topic"]][mi[e["date"][:7]]] += 1
    return {"months": months, "series": series}
