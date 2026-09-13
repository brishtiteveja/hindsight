# Store listing copy

Paste-ready metadata for App Store Connect and Google Play Console.

---

## App name

**Hindsight — Creator Studio**

(iOS name limit is 30 characters; the above is 26.)

## Subtitle (iOS, 30 char max)

`Your archive, made useful` — 25

## Short description (Play, 80 char max)

`Turn your own YouTube archive into ideas, clip picks, and a contradiction check.` — 79

## Full description

Hindsight reads the captions of videos you already made and turns that archive
into four tools you'll actually use before you hit publish.

**Idea Hub** — What should you make next? Hindsight compares what you've covered
against what the wider map is discussing, and pitches the gaps worth filling.
Every pitch cites your own videos and the outside coverage that makes it timely.

**Pre-flight** — Paste a draft script. Hindsight pulls out the checkable claims
you're making and compares each one against everything you've said before. It
flags straight reversals and quiet position drift, and shows you the exact
moment in the exact old video — so you can address it on camera instead of
being surprised in the comments.

**Clip Finder** — Describe the moment you want ("my strongest take on AI") and
get back clips from your back catalogue with exact in and out points, a
Shorts-ready title, and a copy-paste cut command.

**Metadata Studio** — Pick a video and get title options in different styles,
chapters at real timestamps, a description, tags, and a pinned comment — all
drafted from the transcript, not guessed from the title.

**Receipts, always.** Every result points at a video and a second, and plays it
right there in the app. If Hindsight can't point at something you actually said,
it doesn't claim it.

**Discover** — Browse the public map: 23 issue families across news and
commentary channels, with the stance split by political lean, so you can see how
contested a topic really is before you wade in.

No account. No ads. No tracking. Add your channel by pasting a few YouTube
links and the studio is ready in about a minute.

Hindsight is built for your own channel — the archive you have the rights to.
The core is open source under the MIT licence.

---

## Keywords (iOS, 100 char max, comma-separated)

```
youtube,creator,script,transcript,clips,shorts,metadata,titles,chapters,video,podcast,research
```

(94 characters.)

## Category

- **Primary:** Productivity
- **Secondary:** Business (iOS) / Video Players & Editors (Play)

## Content rating

No objectionable content. The app displays public news and commentary video
thumbnails and transcript excerpts. Rated 4+ / Everyone.

Note for the Play questionnaire: the app **does** display user-generated content
from third-party channels in Discover, but users cannot post or message.

## Privacy answers

Both stores ask for a data-safety declaration. The honest answers:

| Question | Answer |
|---|---|
| Does the app collect data? | No personal data. Draft text and video links are sent to the server to produce results. |
| Is data linked to identity? | No — there is no account. |
| Is data used for tracking? | No. |
| Third-party analytics/ads SDKs? | None. |
| Data encrypted in transit? | Yes, HTTPS. |
| Can users request deletion? | Yes, by email (see privacy policy). |

Privacy policy URL: `https://dev.perspectivity.co/hindsight/privacy`
Support URL: `https://dev.perspectivity.co/hindsight`

## Export compliance

`usesNonExemptEncryption: false` is already set in `app.config.js` — the app uses
only standard HTTPS.

## Review notes (paste into App Store Connect "Notes for Review")

> Hindsight is a productivity tool for YouTube creators. No account is required
> — tap "Add your channel" and paste any public YouTube links to see the full
> flow, or open the Channels tab and search the pre-indexed corpus (e.g. type
> "dwarkesh") to open a channel that already has data, then tap "Add to my
> channels" to unlock the four tools instantly without waiting for indexing.
>
> The app reads publicly available caption files and does not download or
> re-host video. Video playback uses YouTube's official embed player.

## Screenshots needed

Required sizes — capture on a simulator/emulator once builds run:

- **iOS:** 6.9" (1320×2868) and 6.5" (1242×2688), 3–10 shots
- **Play:** phone screenshots 1080×1920 or larger, 2–8 shots, plus a
  1024×500 feature graphic

Suggested shot order (the story sells better than the UI):

1. Studio home with the four tools
2. Pre-flight showing a **contradiction** verdict with the receipt below it
3. The receipt playing inline at its timestamp
4. Idea Hub card with "why now" and both evidence rails
5. Clip Finder result with the in/out range on the thumbnail
6. Metadata Studio chapters
7. Discover — an issue with the stance-split bars
