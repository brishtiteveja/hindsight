"""Build vector indexes + personas for every channel in data/.

    uv run python -m hindsight.bulk_index            # all channels
    uv run python -m hindsight.bulk_index --only 5   # first N (smoke test)
"""

import sys
import time

from .embeddings import build_index
from .persona import build_persona
from .store import ChannelStore, list_channels


def _pending(slug: str) -> bool:
    """True when the channel still has digests without a vector."""
    store = ChannelStore(slug)
    vectors = store.load_index().get("vectors", {})
    if not vectors:
        return True
    return any(p.stem not in vectors for p in store.digests_dir.glob("*.json"))


def main():
    slugs = list_channels()
    if "--only" in sys.argv:
        slugs = slugs[: int(sys.argv[sys.argv.index("--only") + 1])]
    if "--resume" in sys.argv:
        before = len(slugs)
        slugs = [s for s in slugs if _pending(s)]
        print(f"Resuming: {len(slugs)} of {before} channels still need work")

    print(f"Indexing {len(slugs)} channels…")
    total_added, failed = 0, []
    t0 = time.time()
    for i, slug in enumerate(slugs, 1):
        try:
            store = ChannelStore(slug)
            added = build_index(store)
            p = build_persona(store)
            total_added += added
            print(f"  [{i}/{len(slugs)}] {slug}: +{added} → {p['total_videos']} videos",
                  flush=True)
        except Exception as e:
            failed.append(slug)
            print(f"  [{i}/{len(slugs)}] {slug}: FAILED {str(e)[:70]}", flush=True)

    mins = (time.time() - t0) / 60
    print(f"\nIndexed {total_added} new videos across {len(slugs)-len(failed)} channels "
          f"in {mins:.1f} min")
    if failed:
        print(f"Failed ({len(failed)}): {', '.join(failed[:10])}")

    if "--no-precompute" not in sys.argv:
        # Views are read-heavy and only change on ingest — bake them now so the
        # app serves files instead of walking the corpus per request.
        print("\nBaking views…")
        from . import precompute
        precompute.diaries()
        precompute.timelines()
        from .galaxy import build as build_galaxy
        build_galaxy()


if __name__ == "__main__":
    main()
