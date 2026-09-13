"""Idea Hub — what should this channel make next.

Fuses two signals nothing else has together: the creator's own coverage map
(what they cover, what's gone cold, where they never resolved a stance) and
market momentum across every other indexed channel. Gemini turns that into
pitched ideas, each carrying evidence links back to real clips.
"""

import json
from collections import defaultdict

from . import insights, taxonomy
from .llm import generate_json
from .store import DATA_DIR, ChannelStore, list_channels

MARKET_CACHE = DATA_DIR / "_market_momentum.json"


def market_momentum(force: bool = False, top: int = 40) -> list[dict]:
    """What the whole map is talking about now, with example clips."""
    if MARKET_CACHE.exists() and not force:
        try:
            return json.loads(MARKET_CACHE.read_text())
        except Exception:
            pass

    counts: dict[str, int] = defaultdict(int)
    recent: dict[str, int] = defaultdict(int)
    examples: dict[str, list] = defaultdict(list)
    dates = []
    for slug in list_channels():
        store = ChannelStore(slug)
        name = (store.load_meta() or {}).get("name") or slug
        for d in store.digests():
            date = (d.get("published_at") or "")[:10]
            if not date:
                continue
            dates.append(date)
            for t in d.get("topics") or []:
                topic = t.get("topic", "")
                if not topic or topic == "other":
                    continue
                counts[topic] += 1
                if len(examples[topic]) < 3:
                    examples[topic].append({"channel": name, "video_id": d["video_id"],
                                            "title": d.get("title", ""), "date": date})
    if not dates:
        return []
    dates.sort()
    cut = dates[int(len(dates) * 0.75)]          # last quarter of the corpus
    for slug in list_channels():
        for d in ChannelStore(slug).digests():
            if (d.get("published_at") or "")[:10] < cut:
                continue
            for t in d.get("topics") or []:
                if t.get("topic"):
                    recent[t["topic"]] += 1

    rows = []
    for topic, n in counts.items():
        share = recent.get(topic, 0) / n if n else 0
        rows.append({"topic": topic, "mentions": n,
                     "recent": recent.get(topic, 0),
                     "momentum": round(share / 0.25, 2),
                     "examples": examples[topic]})
    rows.sort(key=lambda r: -(r["momentum"] * r["mentions"] ** 0.5))
    rows = rows[:top]
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    MARKET_CACHE.write_text(json.dumps(rows))
    return rows


_PROMPT = """You advise a YouTube creator on what to publish next. Ground every
idea in the evidence below — never invent a topic they or the market never touched.

THE CHANNEL: {channel}
Voice and recurring framings: {persona}

WHAT THEY COVER (topic · mentions · momentum · status · last covered · latest stance):
{own}

WHERE THEY'VE GONE QUIET or never went deep (issue families with thin coverage):
{gaps}

WHAT THE WIDER MAP ({n_channels} channels) IS SURGING ON RIGHT NOW:
{market}

UNRESOLVED STANCE FLIPS (they changed position and never explained it):
{flips}

Return ONLY JSON: {{"ideas": [{{
  "title_pitch": "a working video title in this channel's voice",
  "angle": "the specific take, 1-2 sentences",
  "why_now": "the concrete signal — cite the numbers you were given",
  "gap_type": "never_covered | gone_cold | stance_unresolved | market_surge",
  "confidence": 0.0-1.0,
  "topics": ["topic keys this belongs to"]
}}]}}

Give {k} ideas, most compelling first. Prefer ideas only THIS channel could make
well. At least one must be gap_type "stance_unresolved" if any flips are listed.
"""


def _own_topics(store: ChannelStore) -> list[dict]:
    return insights.topics(store)[:15]


def _gaps(store: ChannelStore, own: list[dict]) -> list[str]:
    covered = taxonomy.issue_scores([{"topic": t["topic"], "count": t["mentions"]}
                                     for t in own])
    thin = []
    for key, (label, _hue, issues, _keys) in taxonomy.ISSUES.items():
        if covered.get(key, 0) < 2:
            thin.append(f"{label} ({', '.join(issues[:3])})")
    return thin[:10]


def _flips(store: ChannelStore) -> list[dict]:
    """Topics where the channel reversed and never returned to explain."""
    out = []
    for t in insights.topics(store)[:20]:
        tl = insights.timeline(store, t["topic"])
        shifts = [s for s in tl["shifts"] if s["magnitude"] >= 2]
        if shifts:
            last = shifts[-1]
            out.append({"topic": t["topic"], "from": last["from"], "to": last["to"],
                        "when": last["to_date"], "video_id": last["video_id"],
                        "title": last["title"]})
    return out[:5]


def build_ideas(store: ChannelStore, k: int = 6) -> dict:
    own = _own_topics(store)
    if not own:
        return {"channel": store.channel, "ideas": [], "error": "no analyzed topics yet"}
    persona = store.load_persona() or {}
    gaps = _gaps(store, own)
    flips = _flips(store)
    market = market_momentum()

    own_txt = "\n".join(
        f"- {t['topic']} · {t['mentions']} videos · momentum {t['momentum']} · "
        f"{t['status']} · last {t['last']} · stances {t['stances']}" for t in own)
    market_txt = "\n".join(
        f"- {m['topic']} · {m['mentions']} videos map-wide · momentum {m['momentum']}"
        f" · e.g. \"{m['examples'][0]['title'][:60]}\" ({m['examples'][0]['channel']})"
        for m in market[:18] if m["examples"])
    flips_txt = "\n".join(
        f"- {f['topic']}: {f['from']} → {f['to']} on {f['when']} (\"{f['title'][:50]}\")"
        for f in flips) or "none detected"

    out = generate_json(_PROMPT.format(
        channel=persona.get("channel", store.channel),
        persona=", ".join(t["topic"] for t in own[:6]),
        own=own_txt, gaps="\n".join(f"- {g}" for g in gaps) or "none",
        market=market_txt, flips=flips_txt,
        n_channels=len(list_channels()), k=k))

    ideas = out.get("ideas", [])
    # attach real evidence so every card is clickable
    own_by_topic = {t["topic"]: t for t in own}
    market_by_topic = {m["topic"]: m for m in market}
    for idea in ideas:
        hist, mkt = [], []
        for topic in (idea.get("topics") or [])[:3]:
            if topic in own_by_topic:
                tl = insights.timeline(store, topic)
                for p in tl["points"][-2:]:
                    hist.append({"video_id": p["video_id"], "title": p["title"],
                                 "date": p["date"],
                                 "thumb": f"https://i.ytimg.com/vi/{p['video_id']}/mqdefault.jpg"})
            for ex in (market_by_topic.get(topic, {}).get("examples") or [])[:2]:
                mkt.append({**ex,
                            "thumb": f"https://i.ytimg.com/vi/{ex['video_id']}/mqdefault.jpg"})
        idea["your_history"] = hist[:3]
        idea["market_evidence"] = mkt[:3]

    payload = {"channel": persona.get("channel", store.channel),
               "generated_for": store.channel, "ideas": ideas}
    (store.root / "ideas.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2))
    return payload


def load_ideas(store: ChannelStore) -> dict | None:
    f = store.root / "ideas.json"
    return json.loads(f.read_text()) if f.exists() else None
