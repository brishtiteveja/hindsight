"""Perspectivity Transcript API — the HTTP face of Hindsight.

A self-hostable transcript service: ingest caption files, browse and search
transcripts, and ask grounded questions of a whole channel. Run with:

    uv run hindsight serve            # uvicorn on :8300
"""

import json
from pathlib import Path as _P

from dotenv import load_dotenv

load_dotenv(_P(__file__).resolve().parent.parent / ".env")

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from fastapi.responses import Response

from . import (artwork, dgx, factcheck, frames, ideas as ideas_mod, insights,
               mosaics,
               onboard as onboard_mod, precheck as precheck_mod, precompute, story,
               studio,
               taxonomy, visual)
from .analyze import analyze_channel, analyze_video
from .contradictions import find_contradictions, load_contradictions
from .embeddings import build_index, search
from .ingest import ingest_caption_file, fetch_transcript
from .persona import ask, build_persona
from .store import ChannelStore, list_channels

app = FastAPI(title="Perspectivity Transcript API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"],
                   allow_methods=["*"], allow_headers=["*"])


class AskBody(BaseModel):
    question: str
    k: int = 8


class FetchBody(BaseModel):
    video_id: str
    title: str = ""
    published_at: str = ""
    languages: list[str] = ["en"]


@app.get("/v1/channels")
def channels():
    return {"channels": list_channels()}


_browse_cache: dict = {"key": None, "payload": None}


@app.get("/v1/browse")
def browse():
    """Front-page shelves: every channel tagged by issue, domain facet, and lean,
    plus the browse vocabulary with artwork. One call powers all the carousels.

    Cached against the persona files' mtimes — with 100+ channels this is a lot
    of small reads, and it only changes when something is re-indexed."""
    slugs = list_channels()
    key = tuple(sorted(
        (s, ChannelStore(s).persona_file.stat().st_mtime)
        for s in slugs if ChannelStore(s).persona_file.exists()))
    if _browse_cache["key"] == key and _browse_cache["payload"]:
        return _browse_cache["payload"]

    channels = []
    for slug in slugs:
        p = ChannelStore(slug).load_persona()
        if not p:
            continue
        topics = p.get("top_topics") or []
        channels.append({
            "slug": slug,
            "name": p.get("channel", slug),
            "total_videos": p.get("total_videos", 0),
            "date_range": p.get("date_range", []),
            "poster": p.get("poster", ""),
            "thumbnails": p.get("thumbnails", []),
            "top_topics": topics[:5],
            "lean": taxonomy.lean_of(p.get("group", "")),
            "issues": taxonomy.issue_scores(topics),
            "facets": taxonomy.facet_scores(topics),
        })
    payload = {**taxonomy.catalog(), "channels": channels}
    # Cover imagery: real frames from the clips tagged to each issue/facet.
    try:
        m = mosaics.build()
        for row in payload["issues"]:
            row["tiles"] = m["issues"].get(row["key"], [])
        for row in payload["facets"]:
            row["tiles"] = m["facets"].get(row["key"], [])
    except Exception:
        pass
    _browse_cache.update(key=key, payload=payload)
    return payload


@app.post("/v1/channels/{channel}/transcripts")
async def upload_transcript(channel: str, file: UploadFile = File(...),
                            video_id: str = Form(""), title: str = Form(""),
                            published_at: str = Form("")):
    """Upload one .srt/.vtt caption file."""
    store = ChannelStore(channel)
    import tempfile, os
    with tempfile.NamedTemporaryFile(delete=False, suffix=file.filename or ".srt") as tmp:
        tmp.write(await file.read())
        path = tmp.name
    try:
        doc = ingest_caption_file(store, path, video_id=video_id,
                                  title=title, published_at=published_at)
    finally:
        os.unlink(path)
    return {"video_id": doc["video_id"], "word_count": doc["word_count"]}


@app.post("/v1/channels/{channel}/fetch")
def fetch(channel: str, body: FetchBody):
    """Fetch captions for a video you have rights to (own channel / permitted use)."""
    store = ChannelStore(channel)
    try:
        doc = fetch_transcript(store, body.video_id, languages=tuple(body.languages),
                               title=body.title, published_at=body.published_at)
    except Exception as e:
        raise HTTPException(422, f"Could not fetch captions: {e}")
    return {"video_id": doc["video_id"], "word_count": doc["word_count"]}


@app.get("/v1/channels/{channel}/transcripts")
def transcripts(channel: str):
    docs = ChannelStore(channel).transcripts()
    return {"count": len(docs),
            "videos": [{"video_id": d["video_id"], "title": d.get("title", ""),
                        "published_at": d.get("published_at", ""),
                        "word_count": d.get("word_count", 0)} for d in docs]}


@app.get("/v1/channels/{channel}/transcripts/{video_id}")
def transcript(channel: str, video_id: str):
    doc = ChannelStore(channel).get_transcript(video_id)
    if not doc:
        raise HTTPException(404, "No such transcript")
    return doc


@app.post("/v1/channels/{channel}/analyze")
def analyze(channel: str, video_id: str = "", force: bool = False):
    store = ChannelStore(channel)
    if video_id:
        digest = analyze_video(store, video_id, force=force)
        if not digest:
            raise HTTPException(422, "Transcript missing or too short")
        return digest
    ok, failed = analyze_channel(store, force=force)
    return {"analyzed": ok, "failed": failed}


@app.post("/v1/channels/{channel}/index")
def index(channel: str):
    store = ChannelStore(channel)
    added = build_index(store)
    persona = build_persona(store)
    return {"added": added, "persona": persona}


@app.get("/v1/channels/{channel}/search")
def search_channel(channel: str, q: str, k: int = 8):
    store = ChannelStore(channel)
    hits = search(store, q, k=k)
    out = []
    for vid, score in hits:
        d = store.get_digest(vid) or {}
        out.append({"video_id": vid, "score": round(score, 4),
                    "title": d.get("title", ""), "published_at": d.get("published_at", ""),
                    "summary": d.get("summary", "")})
    return {"results": out}


@app.get("/v1/channels/{channel}/persona")
def persona(channel: str):
    store = ChannelStore(channel)
    p = store.load_persona() or build_persona(store)
    return p


@app.post("/v1/channels/{channel}/ask")
def ask_channel(channel: str, body: AskBody):
    store = ChannelStore(channel)
    result = ask(store, body.question, k=body.k)
    # Optional visual layer (8kEdu): attach keyframe thumbnails to citations.
    result["citations"] = visual.enrich_citations(result["citations"], body.question)
    return result


# ── contradictions: channel scope and actor scope ──

@app.post("/v1/channels/{channel}/contradictions")
def detect_contradictions(channel: str, actor: str = ""):
    """Run detection (channel-wide, or one actor's claims with ?actor=Name)."""
    store = ChannelStore(channel)
    found = find_contradictions(store, actor=actor)
    return {"scope": actor or "channel", "count": len(found), "contradictions": found}


@app.get("/v1/channels/{channel}/contradictions")
def get_contradictions(channel: str, actor: str = ""):
    store = ChannelStore(channel)
    found = load_contradictions(store, actor=actor)
    if found is None:
        raise HTTPException(404, "Not computed yet — POST to this endpoint first")
    # Visual layer: keyframes at both moments so the UI can jump to positions.
    for pair in found:
        for side in ("claim_a", "claim_b"):
            c = pair[side]
            fr = visual.frame_at(c.get("video_id", ""), 0) if visual.enabled() else None
            if fr:
                c["frame_url"] = fr.get("url", "")
    return {"scope": actor or "channel", "count": len(found), "contradictions": found}


# ── creator tools ──

class PrecheckBody(BaseModel):
    script: str


@app.get("/v1/channels/{channel}/ideas")
def get_ideas(channel: str):
    """Cached next-video ideas (instant); POST to regenerate."""
    cached = ideas_mod.load_ideas(ChannelStore(channel))
    if not cached:
        raise HTTPException(404, "not generated yet — POST to this endpoint first")
    return cached


@app.post("/v1/channels/{channel}/ideas")
def make_ideas(channel: str, k: int = 6):
    return ideas_mod.build_ideas(ChannelStore(channel), k=k)


@app.post("/v1/channels/{channel}/precheck")
def precheck(channel: str, body: PrecheckBody):
    """Check a draft script against everything the channel has already said."""
    return precheck_mod.check(ChannelStore(channel), body.script)


@app.get("/v1/channels/{channel}/clips")
def find_clips(channel: str, q: str, k: int = 12):
    """Moments from the back catalogue worth cutting into Shorts."""
    return studio.clips(ChannelStore(channel), q, k=k)


@app.get("/v1/channels/{channel}/videos/{video_id}/metadata")
def video_metadata(channel: str, video_id: str, force: bool = False):
    """Titles, description, real-timestamp chapters, tags, pinned comments."""
    try:
        return studio.metadata(ChannelStore(channel), video_id, force=force)
    except ValueError as e:
        raise HTTPException(404, str(e))


class OnboardBody(BaseModel):
    channel: str = ""
    urls: str


@app.post("/v1/onboard")
def onboard_start(body: OnboardBody):
    """Drop YouTube links — on-demand collection + analysis. Channel name is
    optional: we detect it from the first video and append if it exists."""
    ids = onboard_mod.parse_ids(body.urls)
    if not ids:
        raise HTTPException(422, "no YouTube links or video ids found")
    name = (body.channel or "").strip()
    if len(name) < 2:
        name = onboard_mod.detect_channel(ids[0])
        if len(name) < 2:
            raise HTTPException(422, "could not detect the channel — give it a name")
    existing = ChannelStore(name).load_meta()
    if not onboard_mod.run(name, ids):
        raise HTTPException(409, "already running for this channel")
    return {"channel": name, "slug": ChannelStore(name).root.name,
            "videos": len(ids), "appending": bool(existing)}


@app.get("/v1/onboard/{slug}/status")
def onboard_status(slug: str):
    return onboard_mod.status(ChannelStore(slug))


@app.get("/v1/story")
def story_search(q: str, limit: int = 120, lean: str = ""):
    """Follow an actor, event or phrase through time across the whole map."""
    return story.search(q, limit=limit, lean=lean)


@app.get("/v1/targets")
def targets(days: int = 120):
    """Who the map is criticizing — ranked with weekly heat + lean split."""
    hit = _cached(f"targets_{days}")
    if hit is not None:
        return hit
    return story.targets(days=days)


def _date_ord(d: str) -> int:
    try:
        import datetime as _dt
        return _dt.date.fromisoformat(d[:10]).toordinal()
    except Exception:
        return 0


@app.get("/v1/liars")
def liars(limit: int = 40, speaker: str = ""):
    """On-record reversals + worst fact-check track records, attributed to
    PolitiFact via the Perspectivity mirror, merged with our own channel
    receipts. Honest typing: reversals are contradictions; false ratings are
    credibility signals — we present, PolitiFact rates."""
    import httpx as _hx
    base = "http://localhost:5002/narrative/politifact"
    out = {"reversals": [], "track_records": [], "receipts": []}
    try:
        r = _hx.get(f"{base}/contradictions",
                    params={"limit": limit, **({"speaker": speaker} if speaker else {})},
                    timeout=10)
        if r.status_code == 200:
            out["reversals"] = r.json().get("contradictions", [])
    except Exception:
        pass
    # PolitiFact names the flip; our corpus shows them saying it on camera.
    # Attach YouTube receipts: same speaker, closest to the flip date.
    for rev in out["reversals"]:
        who = rev.get("speaker") or ""
        when = rev.get("date") or ""
        if not who:
            rev["youtube"] = []
            continue
        hits = story.search(who, limit=600).get("events", [])
        flip = _date_ord(when)
        slim = lambda h: {"video_id": h["video_id"], "title": h["title"],
                          "date": h["date"], "channel": h["channel"],
                          "lean": h["lean"], "stance": h["stance"],
                          "thumb": h["thumb"]}
        before = sorted((h for h in hits if _date_ord(h["date"]) < flip),
                        key=lambda h: flip - _date_ord(h["date"]))
        after = sorted((h for h in hits if _date_ord(h["date"]) >= flip),
                       key=lambda h: _date_ord(h["date"]) - flip)
        rev["youtube"] = {"before": [slim(h) for h in before[:3]],
                         "after": [slim(h) for h in after[:3]]}
    try:
        r = _hx.get(f"{base}/figures", params={"limit": 24, "sort": "false_rate"},
                    timeout=10)
        if r.status_code == 200:
            j = r.json()
            out["track_records"] = j.get("figures", j if isinstance(j, list) else [])
    except Exception:
        pass
    for slug in list_channels():
        store = ChannelStore(slug)
        found = load_contradictions(store)
        if found:
            name = (store.load_meta() or {}).get("name") or slug
            for p_ in found:
                out["receipts"].append({"channel": name, "slug": slug, **p_})
    return out


@app.get("/v1/ledger")
def ledger(days: int = 180):
    """The map as a diary — who was talked about each day, and which way."""
    hit = _cached(f"ledger_{days}")
    if hit is not None:
        return hit
    return story.ledger(days=days)


@app.get("/v1/ledger/cluster")
def ledger_cluster(actor: str, date: str):
    return story.cluster(actor, date)


@app.get("/v1/story/suggest")
def story_suggest():
    return _cached("story_suggest") or {"actors": story.suggestions()}


@app.post("/v1/story/reindex")
def story_reindex():
    return {"rows": story.build_index()}


@app.get("/v1/showcase")
def showcase():
    """One real artifact per pipeline station, all from cache — powers the
    front page without a single model call."""
    from .store import DATA_DIR
    demo = ChannelStore("dwarkesh-patel")
    out = {"channel": "dwarkesh-patel", "name": "Dwarkesh Patel"}

    ideas = ideas_mod.load_ideas(demo) or {}
    flip = next((i for i in ideas.get("ideas", [])
                 if i.get("gap_type") == "stance_unresolved"), None)
    out["idea"] = flip or (ideas.get("ideas") or [None])[0]

    pf_file = DATA_DIR / "_demo_precheck.json"
    if pf_file.exists():
        pf = json.loads(pf_file.read_text())
        hit = next((c for c in pf.get("claims", [])
                    if c.get("verdict") == "contradiction" and c.get("past")), None)
        out["precheck"] = {"summary": pf.get("summary"), "example": hit,
                           "script": pf.get("script", "")}

    cl_file = DATA_DIR / "_demo_clips.json"
    if cl_file.exists():
        cl = json.loads(cl_file.read_text())
        out["clip"] = (cl.get("clips") or [None])[0]
        out["clip_query"] = cl.get("query", "")

    meta_file = demo.digests_dir / "pV10LYdta7s.meta.json"
    if meta_file.exists():
        m = json.loads(meta_file.read_text())
        out["metadata"] = {"titles": m.get("titles", [])[:3],
                           "chapters": m.get("chapters", [])[:4],
                           "video_id": m.get("video_id", ""),
                           "original_title": m.get("original_title", "")}
    return out


def _cached(name: str):
    """Stream a precomputed view; None when it hasn't been baked yet."""
    payload = precompute.read(name)
    if payload is None:
        return None
    return Response(json.dumps(payload, separators=(",", ":")),
                    media_type="application/json",
                    headers={"Cache-Control": "public, max-age=300"})


@app.get("/v1/galaxy")
def galaxy():
    """Precomputed point cloud — every video placed in its issue constellation."""
    from .store import DATA_DIR
    path = DATA_DIR / "_galaxy.json"
    if not path.exists():
        raise HTTPException(404, "galaxy not built — run: python -m hindsight.galaxy")
    return Response(path.read_text(), media_type="application/json",
                    headers={"Cache-Control": "no-cache",
                             "ETag": str(int(path.stat().st_mtime))})


@app.get("/v1/art/{kind}/{key}.svg")
def art(kind: str, key: str):
    """Generated cover art for an issue or facet."""
    table = taxonomy.ISSUES if kind == "issue" else taxonomy.FACETS
    entry = table.get(key)
    if not entry:
        raise HTTPException(404, "no such key")
    motif = {"issue": "strata", "facet": "arcs"}.get(kind, "strata")
    if key in ("government", "constitution", "tech"):
        motif = "grid"
    return Response(artwork.cover(key, entry[1], motif), media_type="image/svg+xml",
                    headers={"Cache-Control": "public, max-age=86400"})


@app.get("/v1/moment/{video_id}")
def moment(video_id: str, t: float = 0, force: bool = False):
    """What was on screen when this was said — extracted on demand.

    Slow by nature (~20s cold: resolve the stream, range-seek, then a vision
    call) and cached after, so this is only ever called for a receipt someone is
    actually looking at. Never runs on a schedule.
    """
    return frames.describe(video_id, t, force=force)


@app.get("/v1/moment/{video_id}/frame.jpg")
def moment_frame(video_id: str, t: float = 0):
    """The extracted frame itself, for showing next to the claim."""
    path = frames.grab(video_id, t)
    if not path:
        raise HTTPException(404, "could not extract that frame")
    return Response(path.read_bytes(), media_type="image/jpeg",
                    headers={"Cache-Control": "public, max-age=86400"})


@app.get("/v1/dgx/status")
def dgx_status():
    """Is local inference available, and which model is hot right now."""
    return dgx.status()


@app.get("/v1/issues/{issue_key}/timeline")
def issue_timeline(issue_key: str, channel: str = "", limit: int = 60,
                   lean_filter: str = ""):
    """Evidence timeline for one issue: every moment a channel took a position,
    in date order, each carrying the video + timestamp that proves it.

    Without ?channel= this spans every indexed channel, so you can watch an
    issue get argued across the map. ?lean_filter=left|center|right narrows it
    to one side of the spectrum."""
    entry = taxonomy.ISSUES.get(issue_key)
    if not entry:
        raise HTTPException(404, "no such issue")
    label, hue, issues, keys = entry

    # The whole-map view is precomputed (it opens a transcript per event);
    # per-channel and lean-filtered slices still compute live.
    if not channel and not lean_filter:
        hit = _cached(f"timeline_{issue_key}")
        if hit is not None:
            return hit

    slugs = [channel] if channel else list_channels()
    events = []
    for slug in slugs:
        store = ChannelStore(slug)
        meta = store.load_meta()
        chan_name = meta.get("name") or slug
        lean = taxonomy.lean_of(meta.get("group", ""))
        if lean_filter and lean != lean_filter:
            continue
        for d in store.digests():
            date = (d.get("published_at") or "")[:10]
            if not date:
                continue
            for t in d.get("topics") or []:
                if not taxonomy._match(t.get("topic", ""), keys):
                    continue
                events.append({
                    "date": date,
                    "channel": chan_name, "slug": slug, "lean": lean,
                    "topic": t.get("topic", ""), "stance": t.get("stance", "neutral"),
                    "summary": t.get("summary", ""),
                    "video_id": d["video_id"], "title": d.get("title", ""),
                    "thumb": f"https://i.ytimg.com/vi/{d['video_id']}/mqdefault.jpg",
                })
                break                      # one event per video per issue
    events.sort(key=lambda e: e["date"])

    # Evidence timestamp: the transcript moment that best matches the topic.
    trimmed = events[-limit:] if limit else events
    for e in trimmed:
        e["t"] = _evidence_second(ChannelStore(e["slug"]), e["video_id"],
                                  f"{e['topic']} {e['summary']}")
        e["url"] = f"https://www.youtube.com/watch?v={e['video_id']}&t={e['t']}s"

    by_stance: dict[str, int] = {}
    by_lean: dict[str, dict[str, int]] = {}
    for e in events:
        by_stance[e["stance"]] = by_stance.get(e["stance"], 0) + 1
        side = by_lean.setdefault(e["lean"], {})
        side[e["stance"]] = side.get(e["stance"], 0) + 1

    return {"issue": issue_key, "label": label, "hue": hue, "issues": issues,
            "total": len(events), "stances": by_stance, "by_lean": by_lean,
            "channels": len({e["slug"] for e in events}), "events": trimmed}


@app.get("/v1/cut")
def cut(issue: str, channels: str = "", limit: int = 220):
    """Multitrack edit-bay view: one track per channel, clips = positions taken
    on the issue over calendar time, plus contradiction pairs as markers."""
    entry = taxonomy.ISSUES.get(issue)
    if not entry:
        raise HTTPException(404, "no such issue")
    label, hue, _issues, keys = entry

    slugs = [s for s in channels.split(",") if s.strip()] or list_channels()[:4]
    hit = _cached(f"cut_{issue}_{'_'.join(slugs)}")
    if hit is not None:
        return hit

    tracks, all_dates = [], []
    for slug in slugs:
        store = ChannelStore(slug)
        meta = store.load_meta() or {}
        clips = []
        for d in store.digests():
            date = (d.get("published_at") or "")[:10]
            if not date:
                continue
            for t in d.get("topics") or []:
                if not taxonomy._match(t.get("topic", ""), keys):
                    continue
                doc = store.get_transcript(d["video_id"])
                segs = (doc or {}).get("segments") or []
                clips.append({
                    "date": date, "video_id": d["video_id"],
                    "title": d.get("title", ""),
                    "thumb": f"https://i.ytimg.com/vi/{d['video_id']}/mqdefault.jpg",
                    "stance": t.get("stance", "neutral"),
                    "topic": t.get("topic", ""), "summary": t.get("summary", ""),
                    "dur_s": int(segs[-1]["start"] + segs[-1].get("duration", 0)) if segs else 0,
                    "t": _evidence_second(store, d["video_id"],
                                          f"{t.get('topic','')} {t.get('summary','')}"),
                })
                break
        clips.sort(key=lambda c: c["date"])
        clips = clips[-limit:]
        all_dates += [c["date"] for c in clips]

        # contradiction markers — unfiltered for a single channel so the one
        # real pair is never lost to keyword matching
        pairs = []
        for p in (load_contradictions(store) or []):
            a, b = p.get("claim_a", {}), p.get("claim_b", {})
            pairs.append({"a": {k: a.get(k) for k in ("video_id", "date", "text")},
                          "b": {k: b.get(k) for k in ("video_id", "date", "text")},
                          "explanation": p.get("explanation", ""),
                          "similarity": p.get("similarity")})

        tracks.append({"slug": slug, "name": meta.get("name") or slug,
                       "lean": taxonomy.lean_of(meta.get("group", "")),
                       "clips": clips, "contradictions": pairs})

    return {"issue": issue, "label": label, "hue": hue,
            "range": {"start": min(all_dates) if all_dates else "",
                      "end": max(all_dates) if all_dates else ""},
            "tracks": tracks}


def _evidence_second(store: ChannelStore, video_id: str, terms: str) -> int:
    """Start second of the transcript segment that best matches `terms`."""
    import re
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


# ── insights: the data behind the visual pages ──

@app.get("/v1/channels/{channel}/timeline")
def stance_timeline(channel: str, topic: str):
    """Stance Drift / Voice Evolution — per-topic stance over time + shifts."""
    return insights.timeline(ChannelStore(channel), topic)


@app.get("/v1/channels/{channel}/topics")
def topic_intelligence(channel: str):
    """Coverage Map — mentions, momentum, hot/steady/fading per topic."""
    return {"topics": insights.topics(ChannelStore(channel))}


@app.get("/v1/channels/{channel}/prism")
def event_prism(channel: str, topic: str):
    """Event Prism — videos on one topic bucketed by stance."""
    return insights.prism(ChannelStore(channel), topic)


@app.get("/v1/channels/{channel}/river")
def narrative_river(channel: str, top_n: int = 10):
    """Narrative River — monthly topic volume series."""
    return insights.river(ChannelStore(channel), top_n=top_n)


# ── fact-check crossref (PolitiFact et al. via Google Fact Check Tools) ──

@app.get("/v1/actors/{actor}/factchecks")
def actor_factchecks(actor: str, max_results: int = 20):
    """Published fact-checks for an actor (PolitiFact, Snopes, AFP…)."""
    if not factcheck.enabled():
        raise HTTPException(503, "Set GOOGLE_FACTCHECK_API_KEY to enable fact-check search")
    return {"actor": actor, "factchecks": factcheck.actor_factchecks(actor, max_results)}


@app.get("/v1/factchecks/search")
def factcheck_search(q: str, publisher: str = "", max_results: int = 20):
    if not factcheck.enabled():
        raise HTTPException(503, "Set GOOGLE_FACTCHECK_API_KEY to enable fact-check search")
    return {"query": q, "factchecks": factcheck.search_claims(q, max_results, publisher)}


# ── dashboard: the YouTube narrative map (zero-build static app in web/) ──
from pathlib import Path as _Path
from fastapi.staticfiles import StaticFiles

_WEB = _Path(__file__).resolve().parent.parent / "web"


@app.middleware("http")
async def _no_cache_assets(request, call_next):
    """The dashboard ships unbuilt, so never let a stale app.js/style.css stick."""
    response = await call_next(request)
    if request.url.path.endswith((".js", ".css", ".html")) or request.url.path in ("/", ""):
        response.headers["Cache-Control"] = "no-store, must-revalidate"
    return response


@app.get("/privacy", include_in_schema=False)
def privacy():
    """The App Store and Play Console both require a reachable policy URL, and
    they check the exact string you give them — so serve it without the .html."""
    from fastapi.responses import FileResponse
    return FileResponse(_WEB / "privacy.html", media_type="text/html")


if _WEB.exists():
    app.mount("/", StaticFiles(directory=str(_WEB), html=True), name="web")


def serve():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8300)
