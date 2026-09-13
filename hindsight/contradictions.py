"""Contradiction detection — the "you said the opposite" engine.

Two scopes over the same machinery:
  • channel scope — all claims a channel has published, compared over time
  • actor scope   — claims attributed to one person, across every video
                    (and, when stores are combined, across channels)

Method: embed claims → candidate pairs are same-scope claims with high cosine
similarity published ≥ MIN_DAYS apart → a batched LLM call judges each pair
contradiction / consistent / unrelated with a one-line explanation. Results are
persisted so serving is instant; honest typing — we report *reversals and
tensions with evidence*, never verdicts about truth."""

import json
from datetime import datetime

from .embeddings import embed_texts
from .llm import generate_json
from .store import ChannelStore

MIN_COSINE = 0.72
MIN_DAYS = 30
JUDGE_BATCH = 15


def _claims(store: ChannelStore, actor: str = "") -> list[dict]:
    """Flatten digests into claim rows: {text, quote, actor, video_id, title, date}."""
    rows = []
    want = actor.strip().lower()
    for d in store.digests():
        for c in d.get("claims") or []:
            who = (c.get("actor") or "host").strip()
            if want and want not in who.lower():
                continue
            if not c.get("claim"):
                continue
            rows.append({"text": c["claim"], "quote": c.get("quote", ""), "actor": who,
                         "video_id": d["video_id"], "title": d.get("title", ""),
                         "date": (d.get("published_at") or "")[:10]})
    return rows


def _days_apart(a: str, b: str) -> int:
    try:
        return abs((datetime.fromisoformat(a) - datetime.fromisoformat(b)).days)
    except Exception:
        return MIN_DAYS  # unknown dates: allow the pair, let the judge decide


def _candidate_pairs(rows: list[dict]) -> list[tuple[dict, dict, float]]:
    if len(rows) < 2:
        return []
    vecs = embed_texts([r["text"] for r in rows], "RETRIEVAL_DOCUMENT")
    pairs = []
    for i in range(len(rows)):
        for j in range(i + 1, len(rows)):
            if rows[i]["video_id"] == rows[j]["video_id"]:
                continue
            if _days_apart(rows[i]["date"], rows[j]["date"]) < MIN_DAYS:
                continue
            cos = sum(a * b for a, b in zip(vecs[i], vecs[j]))
            if cos >= MIN_COSINE:
                pairs.append((rows[i], rows[j], round(cos, 3)))
    pairs.sort(key=lambda p: -p[2])
    return pairs[:200]  # judge at most 200 candidate pairs per run


_JUDGE_PROMPT = """For each numbered pair of claims (same {scope}, different dates), decide:
"contradiction" (the two claims cannot both hold), "consistent", or "unrelated".
Return ONLY JSON: {{"verdicts": [{{"pair": 1, "verdict": "...", "why": "one line"}}]}}

{pairs}
"""


def find_contradictions(store: ChannelStore, actor: str = "") -> list[dict]:
    """Run detection; persists to data/<slug>/contradictions[.actor].json."""
    scope = f"actor '{actor}'" if actor else "channel"
    rows = _claims(store, actor=actor)
    pairs = _candidate_pairs(rows)
    found = []
    for i in range(0, len(pairs), JUDGE_BATCH):
        batch = pairs[i:i + JUDGE_BATCH]
        listing = "\n".join(
            f"{n+1}. A [{a['date']}] ({a['actor']}): \"{a['text']}\"\n"
            f"   B [{b['date']}] ({b['actor']}): \"{b['text']}\""
            for n, (a, b, _) in enumerate(batch))
        try:
            out = generate_json(_JUDGE_PROMPT.format(scope=scope, pairs=listing))
        except Exception:
            continue
        for v in out.get("verdicts", []):
            if v.get("verdict") != "contradiction":
                continue
            idx = int(v.get("pair", 0)) - 1
            if not 0 <= idx < len(batch):
                continue
            a, b, cos = batch[idx]
            found.append({"claim_a": a, "claim_b": b, "similarity": cos,
                          "explanation": v.get("why", "")})

    out_file = store.root / (f"contradictions.{actor.lower().replace(' ', '_')}.json"
                             if actor else "contradictions.json")
    store.root.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(found, ensure_ascii=False, indent=2))
    return found


def load_contradictions(store: ChannelStore, actor: str = "") -> list[dict] | None:
    f = store.root / (f"contradictions.{actor.lower().replace(' ', '_')}.json"
                      if actor else "contradictions.json")
    return json.loads(f.read_text()) if f.exists() else None
