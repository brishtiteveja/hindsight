"""Channel persona — synthesized profile + guardrailed, citation-grounded chat.

A persona speaks ABOUT the channel ("this channel's coverage tends to…"),
never impersonates it, cites real videos, and says "not enough data" rather
than inventing. Answers cite {video_id, title, date, t} where t is the start
second of the best-matching transcript segment (deep-linkable as &t=Ns)."""

import re
from collections import Counter

from .embeddings import search
from .llm import generate
from .store import ChannelStore


def build_persona(store: ChannelStore) -> dict:
    """Aggregate digests into a persona card."""
    digests = store.digests()
    topics = Counter()
    stances: dict[str, Counter] = {}
    narratives, quotes = [], []
    dates = sorted(d.get("published_at", "") for d in digests if d.get("published_at"))
    for d in sorted(digests, key=lambda x: x.get("published_at", ""), reverse=True):
        for t in d.get("topics") or []:
            topic = t.get("topic", "")
            if not topic:
                continue
            topics[topic] += 1
            stances.setdefault(topic, Counter())[t.get("stance", "neutral")] += 1
        if d.get("key_narrative") and len(narratives) < 8:
            narratives.append({"text": d["key_narrative"], "title": d.get("title", ""),
                               "date": (d.get("published_at") or "")[:10]})
        quotes += (d.get("key_quotes") or [])[:1]

    top_topics = [{"topic": t, "count": c,
                   "stance": stances[t].most_common(1)[0][0]}
                  for t, c in topics.most_common(8)]
    # Channel visual: thumbnails of the most recent videos (public YouTube stills).
    recent_ids = [d["video_id"] for d in
                  sorted(digests, key=lambda x: x.get("published_at", ""), reverse=True)[:5]
                  if d.get("video_id")]
    meta = store.load_meta()
    persona = {
        "channel": meta.get("name") or store.channel,
        "group": meta.get("group", ""),
        "role": meta.get("role", ""),
        "handle": meta.get("handle", ""),
        "total_videos": len(digests),
        "date_range": [dates[0][:10], dates[-1][:10]] if dates else [],
        "top_topics": top_topics,
        "recent_narratives": narratives,
        "sample_quotes": quotes[:6],
        "thumbnails": [f"https://i.ytimg.com/vi/{v}/mqdefault.jpg" for v in recent_ids],
        "poster": f"https://i.ytimg.com/vi/{recent_ids[0]}/hqdefault.jpg" if recent_ids else "",
    }
    store.save_persona(persona)
    return persona


def _segment_timestamp(store: ChannelStore, video_id: str, answer_terms: set[str]) -> int:
    """Best-matching segment start (seconds) for citation deep links."""
    doc = store.get_transcript(video_id)
    if not doc:
        return 0
    best, best_score = 0, 0
    for seg in doc.get("segments", []):
        words = set(re.findall(r"[a-z]{3,}", seg["text"].lower()))
        score = len(words & answer_terms)
        if score > best_score:
            best, best_score = int(seg["start"]), score
    return best


def ask(store: ChannelStore, question: str, k: int = 8) -> dict:
    """Grounded single-shot answer with citations."""
    hits = search(store, question, k=k)
    if not hits:
        return {"answer": "This channel has no indexed videos yet — run analyze + index first.",
                "citations": []}

    persona = store.load_persona() or build_persona(store)
    context_lines, cites = [], []
    for vid, score in hits:
        d = store.get_digest(vid) or {}
        date = (d.get("published_at") or "")[:10]
        claims = "; ".join(c.get("claim", "") for c in (d.get("claims") or [])[:2])
        context_lines.append(
            f"- [{date}] \"{d.get('title','')}\" — {d.get('key_narrative','')} "
            f"(claims: {claims or 'n/a'})")
        cites.append({"video_id": vid, "title": d.get("title", ""), "date": date})

    ts = "; ".join(f"{t['topic']}: {t['stance']}" for t in persona["top_topics"][:6])
    prompt = (
        f"You are a NARRATIVE PROFILE of the YouTube channel \"{store.channel}\" — a "
        f"synthesized, evidence-grounded view of what this channel has published. You are "
        f"NOT the channel or any person; never say \"I am\". Speak in third person about "
        f"the channel's content.\n\n"
        f"Profile: {persona['total_videos']} analyzed videos"
        f"{' spanning ' + ' to '.join(persona['date_range']) if persona['date_range'] else ''}. "
        f"Dominant topic stances — {ts or 'n/a'}.\n\n"
        f"Rules: ground every claim in the videos listed below and cite them by title/date. "
        f"If they don't cover the question, say the corpus doesn't have enough data — do NOT "
        f"invent positions or quotes. Be concise (2-5 sentences).\n\n"
        f"Relevant videos:\n" + "\n".join(context_lines) +
        f"\n\nQuestion: {question}"
    )
    answer = generate(prompt) or "The model returned no answer — try again."

    # Resolve a deep-link timestamp per citation from the answer's key terms.
    terms = {w for w in re.findall(r"[a-z]{4,}", (question + " " + answer).lower())}
    for c in cites:
        c["t"] = _segment_timestamp(store, c["video_id"], terms)
        c["url"] = f"https://www.youtube.com/watch?v={c['video_id']}&t={c['t']}s"

    return {"answer": answer, "citations": cites}
