"""Vector index — Gemini embeddings + pure-Python cosine (no numpy, no vector DB).

Each video digest becomes one 768-dim L2-normalized vector (cosine == dot
product). A channel of a few thousand videos is a few MB of JSON and
brute-force search is milliseconds."""

import math
import time

from google.genai import types

from .llm import get_client, embed_model
from .store import ChannelStore

DIM = 768
BATCH = 100


def _normalize(v):
    n = math.sqrt(sum(x * x for x in v)) or 1.0
    return [round(x / n, 6) for x in v]


def embed_texts(texts: list[str], task: str, retries: int = 6) -> list[list[float]]:
    """L2-normalized vectors, batched. task: RETRIEVAL_DOCUMENT | RETRIEVAL_QUERY.

    Embedding APIs rate-limit hard on large corpora, so each batch backs off and
    retries rather than losing the whole run."""
    client = get_client()
    out = []
    for i in range(0, len(texts), BATCH):
        chunk = texts[i:i + BATCH]
        for attempt in range(retries):
            try:
                r = client.models.embed_content(
                    model=embed_model(), contents=chunk,
                    config=types.EmbedContentConfig(
                        output_dimensionality=DIM, task_type=task))
                out.extend(_normalize(e.values) for e in r.embeddings)
                break
            except Exception as e:
                transient = "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e) \
                    or "503" in str(e) or "UNAVAILABLE" in str(e)
                if not transient or attempt == retries - 1:
                    raise
                time.sleep(min(60, 2 ** attempt * 5))   # 5s,10s,20s,40s,60s,60s
    return out


def _digest_text(d: dict) -> str:
    parts = [d.get("title", ""), d.get("key_narrative", ""), d.get("summary", "")]
    parts += [f"{t.get('topic','')}: {t.get('summary','')}" for t in (d.get("topics") or [])]
    parts += [c.get("claim", "") for c in (d.get("claims") or [])]
    return " ".join(p for p in parts if p)


def build_index(store: ChannelStore) -> int:
    """Embed digests that aren't in the index yet. Returns count added."""
    index = store.load_index()
    vectors = index.get("vectors", {})
    todo = [(d["video_id"], _digest_text(d)) for d in store.digests()
            if d["video_id"] not in vectors and _digest_text(d).strip()]
    if todo:
        vecs = embed_texts([t for _, t in todo], "RETRIEVAL_DOCUMENT")
        for (vid, _), v in zip(todo, vecs):
            vectors[vid] = v
        store.save_index({"dim": DIM, "model": embed_model(), "vectors": vectors})
    return len(todo)


def search(store: ChannelStore, query: str, k: int = 8) -> list[tuple[str, float]]:
    """Top-k (video_id, cosine) for a query. [] if no index."""
    vectors = store.load_index().get("vectors", {})
    if not vectors or not query.strip():
        return []
    qv = embed_texts([query], "RETRIEVAL_QUERY")[0]
    scored = [(vid, sum(a * b for a, b in zip(qv, v))) for vid, v in vectors.items()]
    scored.sort(key=lambda x: -x[1])
    return scored[:k]
