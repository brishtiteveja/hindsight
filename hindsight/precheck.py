"""Pre-flight — check a draft script against everything the channel has said.

Extract the claims a draft makes, retrieve the channel's own past claims that
are semantically closest, and judge each pair: consistent, drift, or a straight
reversal. Every verdict carries the clip and the second it happened.
"""

import json
import re

from .embeddings import embed_texts
from .llm import generate_json
from .store import ChannelStore

MIN_COSINE = 0.55
TOP_PAST = 4

_EXTRACT = """Extract the checkable factual/positional claims this video script
makes — the statements an audience could later hold the creator to. Skip
pleasantries, calls to action, and pure description.

Return ONLY JSON: {{"claims": ["claim one", "claim two"]}}  (max 12)

SCRIPT:
{script}
"""

_JUDGE = """For each numbered pair, decide how the NEW claim relates to what this
channel said BEFORE:
  "contradiction" — they cannot both be true; the creator has reversed
  "drift"         — same topic, meaningfully softened/hardened position
  "consistent"    — agrees with the past claim
  "unrelated"     — not really the same subject

Return ONLY JSON: {{"verdicts":[{{"pair":1,"verdict":"...","why":"one line"}}]}}

{pairs}
"""


def _past_claims(store: ChannelStore) -> list[dict]:
    rows = []
    for d in store.digests():
        for c in d.get("claims") or []:
            if c.get("claim"):
                rows.append({"text": c["claim"], "quote": c.get("quote", ""),
                             "video_id": d["video_id"], "title": d.get("title", ""),
                             "date": (d.get("published_at") or "")[:10]})
    return rows


def _second_for(store: ChannelStore, video_id: str, terms: str) -> int:
    doc = store.get_transcript(video_id)
    if not doc:
        return 0
    words = {w for w in re.findall(r"[a-z]{4,}", terms.lower())}
    best, score = 0, 0
    for seg in doc.get("segments", []):
        hit = len(words & set(re.findall(r"[a-z]{4,}", seg["text"].lower())))
        if hit > score:
            best, score = int(seg["start"]), hit
    return best


def check(store: ChannelStore, script: str) -> dict:
    script = (script or "").strip()
    if len(script) < 60:
        return {"claims": [], "error": "paste a longer draft"}

    new_claims = (generate_json(_EXTRACT.format(script=script[:24000]))
                  .get("claims") or [])[:12]
    if not new_claims:
        return {"claims": []}

    past = _past_claims(store)
    if not past:
        return {"claims": [{"text": c, "verdict": "new", "past": []} for c in new_claims]}

    new_vecs = embed_texts(new_claims, "RETRIEVAL_QUERY")
    past_vecs = embed_texts([p["text"] for p in past], "RETRIEVAL_DOCUMENT")

    candidates, flat = [], []
    for i, nv in enumerate(new_vecs):
        scored = sorted(
            ((sum(a * b for a, b in zip(nv, pv)), j) for j, pv in enumerate(past_vecs)),
            reverse=True)[:TOP_PAST]
        hits = [(s, j) for s, j in scored if s >= MIN_COSINE]
        candidates.append(hits)
        for s, j in hits:
            flat.append((i, j, round(s, 3)))

    verdicts: dict[tuple, dict] = {}
    for chunk_start in range(0, len(flat), 15):
        chunk = flat[chunk_start:chunk_start + 15]
        listing = "\n".join(
            f"{n+1}. NEW: \"{new_claims[i]}\"\n"
            f"   BEFORE [{past[j]['date']}]: \"{past[j]['text']}\""
            for n, (i, j, _) in enumerate(chunk))
        try:
            out = generate_json(_JUDGE.format(pairs=listing))
        except Exception:
            continue
        for v in out.get("verdicts", []):
            idx = int(v.get("pair", 0)) - 1
            if 0 <= idx < len(chunk):
                i, j, _ = chunk[idx]
                verdicts[(i, j)] = {"verdict": v.get("verdict", "unrelated"),
                                    "why": v.get("why", "")}

    RANK = {"contradiction": 3, "drift": 2, "consistent": 1, "unrelated": 0}
    results = []
    for i, claim in enumerate(new_claims):
        matches = []
        for s, j in candidates[i]:
            v = verdicts.get((i, j))
            if not v or v["verdict"] == "unrelated":
                continue
            p = past[j]
            matches.append({
                **p, "similarity": round(s, 3), "verdict": v["verdict"], "why": v["why"],
                "t": _second_for(store, p["video_id"], p["text"]),
            })
        matches.sort(key=lambda m: -RANK.get(m["verdict"], 0))
        for m in matches:
            m["url"] = f"https://www.youtube.com/watch?v={m['video_id']}&t={m['t']}s"
        verdict = matches[0]["verdict"] if matches else "new"
        results.append({"text": claim, "verdict": verdict, "past": matches[:3]})

    order = {"contradiction": 0, "drift": 1, "consistent": 2, "new": 3}
    results.sort(key=lambda r: order.get(r["verdict"], 9))
    counts: dict[str, int] = {}
    for r in results:
        counts[r["verdict"]] = counts.get(r["verdict"], 0) + 1
    return {"claims": results, "summary": counts}
