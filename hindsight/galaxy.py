"""Issue Galaxy precompute — every video as a point in an issue constellation.

Layout: issue anchors on a golden-angle spiral (biggest families near the
centre), and each family's interior shaped by its own embeddings via local PCA.
Real geometry inside each blob, deterministic placement between them.

    uv run python -m hindsight.galaxy            # 24k points -> data/_galaxy.json
    uv run python -m hindsight.galaxy --cap 0    # ship every video
"""

import json
import math
import sys
import time
import zlib
from collections import defaultdict

import numpy as np

from . import taxonomy
from .store import DATA_DIR, ChannelStore, list_channels

OUT = DATA_DIR / "_galaxy.json"
CAP = 24_000
R_MAX = 210.0          # world units for the biggest cluster
WORLD = 2000.0
MIN_ISSUE_QUOTA = 300
MIN_LEAN_CELL = 50


def _collect() -> tuple[list[dict], dict]:
    """Every video with its issue + lean, plus each channel's loaded vectors."""
    rows, vectors = [], {}
    for slug in list_channels():
        store = ChannelStore(slug)
        meta = store.load_meta() or {}
        lean = taxonomy.lean_of(meta.get("group", ""))
        name = meta.get("name") or slug
        vectors[slug] = store.load_index().get("vectors", {})
        for d in store.digests():
            vid = d.get("video_id")
            if not vid:
                continue
            scores = taxonomy.issue_scores(d.get("topics") or [])
            issue = max(scores, key=scores.get) if scores else "politics"
            rows.append({
                "v": vid, "slug": slug, "channel": name, "lean": lean,
                "issue": issue, "date": (d.get("published_at") or "")[:10],
                "title": (d.get("title") or "")[:90],
            })
    return rows, vectors


def _sample(rows: list[dict], cap: int) -> list[dict]:
    """Stratified issue x lean x channel, newest first — so small families and
    every side of the spectrum stay visible instead of being drowned out."""
    if not cap or cap >= len(rows):
        return rows
    by_issue = defaultdict(list)
    for r in rows:
        by_issue[r["issue"]].append(r)

    n_all = len(rows)
    quotas = {k: max(MIN_ISSUE_QUOTA, round(cap * len(v) / n_all))
              for k, v in by_issue.items()}
    scale = cap / max(sum(quotas.values()), 1)
    quotas = {k: max(1, int(q * scale)) for k, q in quotas.items()}

    out = []
    for issue, items in by_issue.items():
        quota = min(quotas[issue], len(items))
        by_lean = defaultdict(list)
        for r in items:
            by_lean[r["lean"]].append(r)
        for lean, cell in by_lean.items():
            share = len(cell) / len(items)
            cell_q = min(len(cell), max(min(MIN_LEAN_CELL, len(cell)),
                                        int(quota * share)))
            per_chan = defaultdict(list)
            for r in sorted(cell, key=lambda x: x["date"], reverse=True):
                per_chan[r["slug"]].append(r)
            chan_cap = max(5, math.ceil(cell_q / max(len(per_chan), 1) * 1.5))
            picked = []
            for chan_rows in per_chan.values():
                picked.extend(chan_rows[:chan_cap])
            picked.sort(key=lambda x: x["date"], reverse=True)
            out.extend(picked[:cell_q])
    return out


def _anchors(counts: dict) -> tuple[dict, dict]:
    """Greedy circle packing — biggest family at the centre, each next one
    settled tangent to what's already placed, as close to the middle as it can
    get. Gives one contiguous continent of issues rather than islands."""
    order = sorted(counts, key=lambda k: -counts[k])
    n_max = max(counts.values())
    radius = {k: R_MAX * math.sqrt(counts[k] / n_max) for k in order}
    gap = 3.0                                  # breathing room between families

    pos = {order[0]: (0.0, 0.0)}
    for key in order[1:]:
        r = radius[key]
        best, best_d = None, float("inf")
        for anchor in pos:                     # tangent to an already-placed one
            ring = radius[anchor] + r + gap
            for step in range(180):            # 2-degree sweep
                a = math.radians(step * 2)
                cx = pos[anchor][0] + ring * math.cos(a)
                cy = pos[anchor][1] + ring * math.sin(a)
                if any(math.hypot(cx - px, cy - py) < radius[other] + r + gap - 0.5
                       for other, (px, py) in pos.items()):
                    continue
                d = math.hypot(cx, cy)         # prefer hugging the centre
                if d < best_d:
                    best_d, best = d, (cx, cy)
        pos[key] = best or (0.0, 0.0)
    return pos, radius


def _interior(vecs: np.ndarray) -> np.ndarray:
    """2D coords in the unit disk from local PCA — organic core, soft edge."""
    n = len(vecs)
    if n == 1:
        return np.zeros((1, 2))
    x = vecs - vecs.mean(axis=0)
    cov = x.T @ x                                   # 768x768, cheap
    _, eigvecs = np.linalg.eigh(cov)
    p = x @ eigvecs[:, -2:]                         # top-2 components
    for axis in range(2):
        scale = np.percentile(np.abs(p[:, axis]), 95) or 1.0
        p[:, axis] /= scale
    mag = np.linalg.norm(p, axis=1, keepdims=True)
    mag[mag == 0] = 1e-6
    return p * np.tanh(1.1 * mag) / mag             # squash to a soft disk


def build(cap: int = CAP) -> dict:
    t0 = time.time()
    print("collecting digests…", flush=True)
    rows, vectors = _collect()
    print(f"  {len(rows):,} videos across {len(vectors)} channels "
          f"({time.time()-t0:.0f}s)", flush=True)

    rows = _sample(rows, cap)
    counts = defaultdict(int)
    for r in rows:
        counts[r["issue"]] += 1
    print(f"  sampled {len(rows):,} · {len(counts)} issue families", flush=True)

    anchors, radii = _anchors(dict(counts))

    by_issue = defaultdict(list)
    for r in rows:
        by_issue[r["issue"]].append(r)

    placed = []
    for issue, items in by_issue.items():
        mat, have = [], []
        for r in items:
            v = vectors.get(r["slug"], {}).get(r["v"])
            if v:
                mat.append(v)
                have.append(r)
        if not have:
            continue
        pts = _interior(np.asarray(mat, dtype=np.float32))
        ax, ay = anchors[issue]
        rad = radii[issue]
        for r, (px, py) in zip(have, pts):
            jitter = ((zlib.crc32(r["v"].encode()) % 997) / 997 - 0.5) * 4
            r["x"] = ax + float(px) * rad + jitter
            r["y"] = ay + float(py) * rad + jitter
            placed.append(r)

    xs = [r["x"] for r in placed]
    ys = [r["y"] for r in placed]
    lo_x, hi_x, lo_y, hi_y = min(xs), max(xs), min(ys), max(ys)
    span = max(hi_x - lo_x, hi_y - lo_y) or 1.0
    for r in placed:
        r["x"] = round((r["x"] - lo_x) / span * WORLD, 1)
        r["y"] = round((r["y"] - lo_y) / span * WORLD, 1)

    issue_keys = sorted({r["issue"] for r in placed})
    slugs = sorted({r["slug"] for r in placed})
    ii = {k: i for i, k in enumerate(issue_keys)}
    si = {s: i for i, s in enumerate(slugs)}
    leans = ["left", "center", "right"]

    # cluster labels sit at each family's centroid
    labels = []
    for key in issue_keys:
        pts = [(r["x"], r["y"]) for r in placed if r["issue"] == key]
        entry = taxonomy.ISSUES.get(key)
        labels.append({
            "key": key,
            "label": entry[0] if entry else key,
            "hue": entry[1] if entry else "#888",
            "n": len(pts),
            "x": round(sum(p[0] for p in pts) / len(pts), 1),
            "y": round(sum(p[1] for p in pts) / len(pts), 1),
        })

    out = {
        "generated": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "world": WORLD,
        "n": len(placed),
        "issues": issue_keys,
        "channels": slugs,
        "channel_names": [next(r["channel"] for r in placed if r["slug"] == s)
                          for s in slugs],
        "leans": leans,
        "labels": labels,
        # columnar — roughly half the bytes of an array of objects
        "v": [r["v"] for r in placed],
        "x": [r["x"] for r in placed],
        "y": [r["y"] for r in placed],
        "i": [ii[r["issue"]] for r in placed],
        "c": [si[r["slug"]] for r in placed],
        "l": [leans.index(r["lean"]) for r in placed],
        "d": [r["date"] for r in placed],
        "t": [r["title"] for r in placed],
    }
    OUT.write_text(json.dumps(out, separators=(",", ":")))
    size = OUT.stat().st_size / 1e6
    print(f"wrote {OUT.name}: {len(placed):,} points, {size:.1f} MB "
          f"in {time.time()-t0:.0f}s", flush=True)
    return out


if __name__ == "__main__":
    cap = CAP
    if "--cap" in sys.argv:
        cap = int(sys.argv[sys.argv.index("--cap") + 1])
    build(cap)
