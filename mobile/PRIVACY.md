# Hindsight — Privacy Policy

_Last updated: 2026-08-09_

Hindsight is a tool for YouTube creators. It reads the public captions of videos
you point it at and turns them into ideas, checks, clips and metadata.

## What we collect

**No account, no sign-in.** Hindsight has no login. We do not ask for your name,
email, phone number, or any other personal identifier.

**No advertising or tracking SDKs.** The app contains no analytics, no
advertising network, and no third-party tracker. We do not build a profile of
you and we do not sell data, because we do not have any to sell.

## What stays on your device

The list of channels you have added and which one is currently selected is
stored locally on your device, along with a cache of previously-viewed results
so the app works without a connection. Deleting the app deletes all of it.

## What is sent to our server

When you add a channel, the app sends the **YouTube video links you paste** to
the Hindsight API at `dev.perspectivity.co`. The server then:

1. fetches the publicly available caption file for each video;
2. sends that transcript text to Google's Gemini API for summarisation,
   analysis, and embedding;
3. stores the resulting transcript, analysis, and search index so the tools can
   run against it.

When you use a tool (Idea Hub, Pre-flight, Clip Finder, Metadata Studio), the
text you supply — for example a draft script pasted into Pre-flight — is sent to
the server and to the Gemini API to produce the result. Draft text is used to
generate your answer and is not published or shared.

Our server records ordinary web-server logs (IP address, timestamp, requested
path) for security and debugging. These are not linked to any identity.

## Third parties

- **Google Gemini API** — processes transcript and draft text to produce
  analysis. Governed by [Google's privacy policy](https://policies.google.com/privacy).
- **YouTube** — video thumbnails and the embedded player are loaded directly
  from YouTube, which may set its own cookies. Governed by Google's privacy
  policy above.

We use no other third-party processors.

## Content you index

Hindsight is designed for use on **your own channel** — the archive you have
rights to. Indexed transcripts and analyses are retained so the tools stay fast.
To have a channel's data deleted from the server, email the address below with
the channel name and we will remove it.

## Children

Hindsight is a professional tool for content creators and is not directed at
children under 13. We do not knowingly collect information from children.

## Changes

If this policy changes materially, the updated date at the top will change and
the new version will be published at the URL below.

## Contact

Questions or deletion requests: **brishtiteveja@gmail.com**

Published at: https://dev.perspectivity.co/hindsight/privacy
