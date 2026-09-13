"""Hindsight CLI — ingest / analyze / index / ask / chat / contradictions / serve."""

import argparse
import json
import sys
from pathlib import Path


def main():
    ap = argparse.ArgumentParser(prog="hindsight",
                                 description="Chat with your channel's caption history.")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("ingest", help="ingest a folder of .srt/.vtt caption files")
    p.add_argument("folder")
    p.add_argument("--channel", required=True)

    p = sub.add_parser("fetch", help="fetch captions for video ids you have rights to")
    p.add_argument("video_ids", nargs="+")
    p.add_argument("--channel", required=True)

    p = sub.add_parser("analyze", help="digest every transcript with Gemini")
    p.add_argument("--channel", required=True)
    p.add_argument("--force", action="store_true")

    p = sub.add_parser("index", help="build the vector index + persona card")
    p.add_argument("--channel", required=True)

    p = sub.add_parser("ask", help="one grounded question")
    p.add_argument("question")
    p.add_argument("--channel", required=True)

    p = sub.add_parser("chat", help="interactive REPL")
    p.add_argument("--channel", required=True)

    p = sub.add_parser("contradictions", help="detect channel or actor contradictions")
    p.add_argument("--channel", required=True)
    p.add_argument("--actor", default="")

    sub.add_parser("serve", help="run the Perspectivity Transcript API on :8300")

    args = ap.parse_args()
    from .store import ChannelStore

    if args.cmd == "serve":
        from .api import serve
        serve()
        return

    store = ChannelStore(args.channel)

    if args.cmd == "ingest":
        from .ingest import ingest_caption_file
        files = sorted(Path(args.folder).glob("*.srt")) + sorted(Path(args.folder).glob("*.vtt"))
        for f in files:
            doc = ingest_caption_file(store, f)
            print(f"  + {doc['video_id']} ({doc['word_count']} words)")
        print(f"Ingested {len(files)} caption files into '{args.channel}'")

    elif args.cmd == "fetch":
        from .ingest import fetch_transcript
        for vid in args.video_ids:
            try:
                doc = fetch_transcript(store, vid)
                print(f"  + {vid} ({doc['word_count']} words)")
            except Exception as e:
                print(f"  ! {vid}: {e}", file=sys.stderr)

    elif args.cmd == "analyze":
        from .analyze import analyze_channel
        ok, failed = analyze_channel(store, force=args.force,
                                     progress=lambda v, o, f: print(f"  {v} ({o} ok, {f} failed)"))
        print(f"Analyzed {ok}, failed {failed}")

    elif args.cmd == "index":
        from .embeddings import build_index
        from .persona import build_persona
        added = build_index(store)
        persona = build_persona(store)
        print(f"Indexed {added} new videos; persona covers {persona['total_videos']} videos")

    elif args.cmd == "ask":
        from .persona import ask
        result = ask(store, args.question)
        print("\n" + result["answer"] + "\n")
        for c in result["citations"]:
            print(f"  [{c['date']}] {c['title']} — {c['url']}")

    elif args.cmd == "chat":
        from .persona import ask
        print(f"Chatting with '{args.channel}' — empty line to quit.")
        while True:
            try:
                q = input("you> ").strip()
            except (EOFError, KeyboardInterrupt):
                break
            if not q:
                break
            result = ask(store, q)
            print("\n" + result["answer"] + "\n")
            for c in result["citations"][:4]:
                print(f"  [{c['date']}] {c['title']} — {c['url']}")
            print()

    elif args.cmd == "contradictions":
        from .contradictions import find_contradictions
        found = find_contradictions(store, actor=args.actor)
        scope = args.actor or "channel"
        print(f"{len(found)} contradictions ({scope} scope)")
        for f in found[:10]:
            print(json.dumps(f, indent=2)[:600])


if __name__ == "__main__":
    main()
