"""Per-channel JSON storage. Everything Hindsight knows lives under data/<slug>/
as inspectable JSON — transcripts, digests, the vector index, the persona card.
Delete a folder to forget a channel."""

import json
import re
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-") or "channel"


class ChannelStore:
    def __init__(self, channel: str):
        self.channel = channel
        self.root = DATA_DIR / slugify(channel)
        self.transcripts_dir = self.root / "transcripts"
        self.digests_dir = self.root / "digests"
        self.index_file = self.root / "index.json"
        self.persona_file = self.root / "persona.json"

    # ── transcripts ──
    def save_transcript(self, doc: dict):
        self.transcripts_dir.mkdir(parents=True, exist_ok=True)
        path = self.transcripts_dir / f"{doc['video_id']}.json"
        path.write_text(json.dumps(doc, ensure_ascii=False, indent=2))

    def get_transcript(self, video_id: str) -> dict | None:
        path = self.transcripts_dir / f"{video_id}.json"
        return json.loads(path.read_text()) if path.exists() else None

    def transcripts(self) -> list[dict]:
        if not self.transcripts_dir.exists():
            return []
        return [json.loads(p.read_text()) for p in sorted(self.transcripts_dir.glob("*.json"))]

    # ── digests ──
    def save_digest(self, video_id: str, digest: dict):
        self.digests_dir.mkdir(parents=True, exist_ok=True)
        (self.digests_dir / f"{video_id}.json").write_text(
            json.dumps(digest, ensure_ascii=False, indent=2))

    def get_digest(self, video_id: str) -> dict | None:
        path = self.digests_dir / f"{video_id}.json"
        return json.loads(path.read_text()) if path.exists() else None

    def digests(self) -> list[dict]:
        if not self.digests_dir.exists():
            return []
        return [json.loads(p.read_text()) for p in sorted(self.digests_dir.glob("*.json"))]

    # ── index / persona ──
    def save_index(self, index: dict):
        self.root.mkdir(parents=True, exist_ok=True)
        self.index_file.write_text(json.dumps(index))

    def load_index(self) -> dict:
        return json.loads(self.index_file.read_text()) if self.index_file.exists() else {}

    def save_persona(self, persona: dict):
        self.root.mkdir(parents=True, exist_ok=True)
        self.persona_file.write_text(json.dumps(persona, ensure_ascii=False, indent=2))

    def load_persona(self) -> dict | None:
        return json.loads(self.persona_file.read_text()) if self.persona_file.exists() else None

    # ── channel metadata (display name, group/lean, handle) ──
    @property
    def meta_file(self):
        return self.root / "meta.json"

    def save_meta(self, meta: dict):
        self.root.mkdir(parents=True, exist_ok=True)
        self.meta_file.write_text(json.dumps(meta, ensure_ascii=False, indent=2))

    def load_meta(self) -> dict:
        return json.loads(self.meta_file.read_text()) if self.meta_file.exists() else {}


def list_channels() -> list[str]:
    if not DATA_DIR.exists():
        return []
    return sorted(p.name for p in DATA_DIR.iterdir() if (p / "transcripts").exists())
