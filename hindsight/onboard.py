"""Onboard — bring your own channel in one flow.

Paste video links → captions fetched → each video digested → embedded →
persona built. Runs in a background thread, writing progress to disk so the
UI can poll. Own-channel-first: for content you have the rights to.

Optional env: YT_PROXY (http://user:pass@host:port) routes only the caption
fetch through a proxy, useful when the host IP is rate-limited by YouTube.
"""

import json
import os
import re
import threading
import time

from .analyze import analyze_video
from .embeddings import build_index
from .persona import build_persona
from .store import ChannelStore

MAX_VIDEOS = 12


def detect_channel(video_id: str) -> str:
    """The video's real channel title, so droppers don't have to name it."""
    key = os.getenv("YOUTUBE_API_KEY", "")
    if key:
        try:
            import httpx
            r = httpx.get("https://www.googleapis.com/youtube/v3/videos",
                          params={"part": "snippet", "id": video_id, "key": key},
                          timeout=10)
            items = r.json().get("items", []) if r.status_code == 200 else []
            if items:
                return items[0]["snippet"].get("channelTitle", "")
        except Exception:
            pass
    try:                                     # keyless fallback
        import httpx
        r = httpx.get("https://www.youtube.com/oembed",
                      params={"url": f"https://youtu.be/{video_id}", "format": "json"},
                      timeout=10)
        if r.status_code == 200:
            return r.json().get("author_name", "")
    except Exception:
        pass
    return ""
_URL = re.compile(
    r"(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/shorts/|youtube\.com/live/)"
    r"([A-Za-z0-9_-]{11})")
_lock = threading.Lock()
_running: set[str] = set()


def parse_ids(text: str) -> list[str]:
    ids = []
    for line in (text or "").splitlines():
        line = line.strip()
        if not line:
            continue
        m = _URL.search(line)
        if m:
            ids.append(m.group(1))
        elif re.fullmatch(r"[A-Za-z0-9_-]{11}", line):
            ids.append(line)
    seen, out = set(), []
    for v in ids:
        if v not in seen:
            seen.add(v)
            out.append(v)
    return out[:MAX_VIDEOS]


def _status_file(store: ChannelStore):
    return store.root / "onboard.json"


def _write(store: ChannelStore, doc: dict):
    store.root.mkdir(parents=True, exist_ok=True)
    _status_file(store).write_text(json.dumps(doc, ensure_ascii=False))


def status(store: ChannelStore) -> dict:
    f = _status_file(store)
    return json.loads(f.read_text()) if f.exists() else {"state": "none"}


def _fetch(store: ChannelStore, video_id: str) -> dict:
    """Caption fetch — proxy first, direct second, with retries. The rotating
    proxy IP has weather; a blocked minute shouldn't fail the whole drop."""
    from youtube_transcript_api import YouTubeTranscriptApi
    from youtube_transcript_api.proxies import GenericProxyConfig

    proxy = os.getenv("YT_PROXY", "")
    clients = []
    if proxy:
        clients.append(YouTubeTranscriptApi(proxy_config=GenericProxyConfig(
            http_url=proxy, https_url=proxy)))
    clients.append(YouTubeTranscriptApi())

    entries, last_err = None, None
    for attempt in range(3):
        for api in clients:
            try:
                entries = api.fetch(video_id, languages=["en"])
                break
            except Exception as e:
                last_err = e
        if entries is not None:
            break
        time.sleep(6 * (attempt + 1))        # proxy IP rotates every few minutes
    if entries is None:
        raise last_err

    title, published = video_id, ""
    try:
        import httpx
        r = httpx.get("https://www.youtube.com/oembed",
                      params={"url": f"https://youtu.be/{video_id}", "format": "json"},
                      timeout=10)
        if r.status_code == 200:
            title = r.json().get("title", video_id)
    except Exception:
        pass
    key = os.getenv("YOUTUBE_API_KEY", "")
    if key:
        try:
            import httpx
            r = httpx.get("https://www.googleapis.com/youtube/v3/videos",
                          params={"part": "snippet", "id": video_id, "key": key},
                          timeout=10)
            items = r.json().get("items", []) if r.status_code == 200 else []
            if items:
                sn = items[0]["snippet"]
                title = sn.get("title", title)
                published = sn.get("publishedAt", "")[:10]
        except Exception:
            pass

    segments = [{"text": e.text, "start": round(e.start, 2),
                 "duration": round(e.duration, 2)} for e in entries]
    doc = {"video_id": video_id, "title": title, "published_at": published,
           "channel": store.channel,
           "segments": segments,
           "full_text": " ".join(s["text"] for s in segments),
           "word_count": sum(len(s["text"].split()) for s in segments),
           "source": "onboard"}
    store.save_transcript(doc)
    return doc


def run(channel: str, ids: list[str]) -> bool:
    """Start the pipeline in a background thread. False if already running."""
    store = ChannelStore(channel)
    with _lock:
        if store.root.name in _running:
            return False
        _running.add(store.root.name)

    steps = [{"video_id": v, "state": "queued", "title": ""} for v in ids]
    _write(store, {"state": "running", "phase": "captions", "steps": steps,
                   "started": time.time()})
    # appending to an existing channel must not clobber its metadata
    if not store.load_meta():
        store.save_meta({"name": channel, "group": "", "role": "your channel",
                         "source": "onboard"})

    def work():
        try:
            ok = 0
            for s_ in steps:
                s_["state"] = "fetching"
                _write(store, {"state": "running", "phase": "captions", "steps": steps})
                try:
                    doc = _fetch(store, s_["video_id"])
                    s_["title"] = doc["title"][:70]
                    s_["state"] = "fetched"
                    ok += 1
                except Exception as e:
                    s_["state"] = "failed"
                    s_["error"] = str(e)[:90]
                _write(store, {"state": "running", "phase": "captions", "steps": steps})

            if not ok:
                _write(store, {"state": "error", "steps": steps,
                               "error": "No captions could be fetched."})
                return

            for s_ in steps:
                if s_["state"] != "fetched":
                    continue
                s_["state"] = "analyzing"
                _write(store, {"state": "running", "phase": "analysis", "steps": steps})
                try:
                    analyze_video(store, s_["video_id"], force=True)
                    s_["state"] = "done"
                except Exception as e:
                    s_["state"] = "failed"
                    s_["error"] = str(e)[:90]
                _write(store, {"state": "running", "phase": "analysis", "steps": steps})

            # Second chance for blocked fetches: by now minutes have passed and
            # the rotating proxy is on a different IP.
            for s_ in steps:
                if s_["state"] != "failed" or "transcript" not in s_.get("error", "").lower()                         and "Encoding" not in s_.get("error", ""):
                    continue
                s_["state"] = "fetching"
                s_.pop("error", None)
                _write(store, {"state": "running", "phase": "second chance", "steps": steps})
                try:
                    doc = _fetch(store, s_["video_id"])
                    s_["title"] = doc["title"][:70]
                    s_["state"] = "analyzing"
                    _write(store, {"state": "running", "phase": "second chance", "steps": steps})
                    analyze_video(store, s_["video_id"], force=True)
                    s_["state"] = "done"
                except Exception as e:
                    s_["state"] = "failed"
                    s_["error"] = str(e)[:90]
                _write(store, {"state": "running", "phase": "second chance", "steps": steps})

            _write(store, {"state": "running", "phase": "indexing", "steps": steps})
            build_index(store)
            build_persona(store)
            _write(store, {"state": "done", "steps": steps,
                           "slug": store.root.name,
                           "videos": sum(1 for s_ in steps if s_["state"] == "done")})
        except Exception as e:
            _write(store, {"state": "error", "steps": steps, "error": str(e)[:150]})
        finally:
            with _lock:
                _running.discard(store.root.name)

    threading.Thread(target=work, daemon=True).start()
    return True
