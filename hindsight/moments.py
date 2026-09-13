"""Locating the moment a thing was actually said.

Every "receipt" in Hindsight — a chat citation, a pre-flight conflict, a clip
in/out — is a second inside a transcript. Three separate call sites used to
resolve that second by scoring each caption cue on raw word overlap and keeping
the first cue to reach the best score. Two flaws compounded:

  * a caption cue is 5-10 words, so scores were small integers and thousands of
    cues tied; strict `>` handed the tie to the earliest one
  * every term counted equally, so a host's filler vocabulary outvoted the one
    distinctive word in the query

The result was that citations for hour-long podcasts landed at 0:01-0:56 almost
every time. A receipt that points at the intro is worse than no receipt, because
it looks precise while being wrong.

This module fixes it once:

  * score over overlapping ~30s windows, not single cues, so there is real signal
  * weight terms by inverse frequency *within that video*, so words the host says
    constantly count for little and rare ones carry the match
  * return None below a confidence floor, so callers can say "no specific moment"
    instead of pointing at 0:00
"""

import math
import re

WINDOW = 30.0           # seconds of transcript scored together
STRIDE = 15.0           # overlap, so a match straddling a boundary still wins
MIN_SCORE = 0.60        # below this, we do not claim a moment
STOP = {
    "that", "this", "with", "have", "from", "they", "what", "when", "were",
    "been", "there", "their", "would", "could", "should", "about", "which",
    "them", "than", "then", "will", "your", "just", "like", "some", "more",
    "into", "also", "because", "really", "very", "much", "know", "think",
    "going", "kind", "sort", "thing", "things", "actually", "basically",
    "right", "yeah", "okay", "mean", "well", "even", "want", "make", "made",
}


def terms_of(text: str) -> set[str]:
    """Content words worth matching on."""
    return {w for w in re.findall(r"[a-z]{4,}", (text or "").lower())
            if w not in STOP}


def _windows(segments: list[dict]) -> list[tuple[float, set[str]]]:
    """Overlapping time windows as (start_second, terms_in_window)."""
    if not segments:
        return []
    out: list[tuple[float, set[str]]] = []
    end = max(float(s.get("start", 0) or 0) for s in segments)
    # Pre-tokenize once; segments get visited by several overlapping windows.
    toks = [(float(s.get("start", 0) or 0), terms_of(s.get("text", "")))
            for s in segments]
    t = 0.0
    while t <= end:
        bucket: set[str] = set()
        for start, words in toks:
            if start < t:
                continue
            if start > t + WINDOW:
                break                       # segments are time-ordered
            bucket |= words
        if bucket:
            out.append((t, bucket))
        t += STRIDE
    return out


def _idf(windows: list[tuple[float, set[str]]]) -> dict[str, float]:
    """Inverse frequency within this one video.

    A word in every window is this host's verbal tic and tells us nothing about
    where something was said; a word in two windows is a landmark."""
    n = len(windows) or 1
    df: dict[str, int] = {}
    for _, words in windows:
        for w in words:
            df[w] = df.get(w, 0) + 1
    return {w: math.log(1 + n / (1 + c)) for w, c in df.items()}


def best_moment(store, video_id: str, query: str) -> dict | None:
    """Where in this video the query was most likely said.

    Returns {"second", "score", "matched"} or None when nothing matches well
    enough to be worth calling a receipt."""
    doc = store.get_transcript(video_id)
    segments = (doc or {}).get("segments") or []
    windows = _windows(segments)
    if not windows:
        return None

    wanted = terms_of(query)
    if not wanted:
        return None

    idf = _idf(windows)
    # Normalize by the query's own best possible score, so the floor means the
    # same thing for a two-word query and a twenty-word one.
    ceiling = sum(idf.get(w, 0.0) for w in wanted) or 1.0

    best = None
    for start, words in windows:
        hit = wanted & words
        if not hit:
            continue
        score = sum(idf[w] for w in hit) / ceiling
        if best is None or score > best["score"]:
            best = {"second": int(start), "score": round(score, 4),
                    "matched": sorted(hit)}

    if best is None or best["score"] < MIN_SCORE:
        return None
    return best


def best_second(store, video_id: str, query: str, default: int = 0) -> int:
    """best_moment as a plain second, for callers that need a number."""
    m = best_moment(store, video_id, query)
    return m["second"] if m else default


def best_window(store, video_id: str, query: str,
                length: int = 45) -> tuple[int, int]:
    """A clippable (start, end) around the best moment, nudged to start just
    before the point is made rather than mid-sentence."""
    m = best_moment(store, video_id, query)
    start = max(0, (m["second"] if m else 0) - 3)
    return start, start + length
