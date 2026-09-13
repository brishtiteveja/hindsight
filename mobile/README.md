# Hindsight — mobile

The iOS and Android app for [Hindsight](../README.md). Same corpus, same API,
built for the phone: the four creator tools, your channels, and the public issue
map.

Web dashboard: <https://dev.perspectivity.co/hindsight>

## What's in it

| Screen | What it does |
|---|---|
| **Studio** | Your active channel and the four tools |
| **Idea Hub** | Next-video pitches argued from your archive vs. the wider map |
| **Pre-flight** | Paste a draft; get every claim checked against your past self |
| **Clip Finder** | Search your transcripts for Shorts-worthy moments with in/out points |
| **Metadata Studio** | Titles, chapters, description, tags, pinned comment |
| **Add your channel** | Paste YouTube links, watch each one index live |
| **Discover** | 23 issue families from the public corpus, with stance splits |
| **Channels** | Switch between your channels; browse the indexed corpus |

Every result that cites a moment opens the video **inside the app** at that
second — the receipt only means something next to the claim.

## Architecture

Zero backend work: the app is a client of the existing Hindsight API, which is
already precomputed and fast (`data/_cache/*.json`).

- **Expo SDK 54** + `expo-router` (file-based routing, typed routes)
- **TanStack Query** with AsyncStorage persistence — results are cached to disk,
  so a cold launch offline still shows content
- **No auth, no database, no analytics.** Channel selection lives in
  AsyncStorage; that's the entire notion of "my stuff"
- Styling is plain `StyleSheet` against tokens in `src/theme.ts`, mirrored from
  the web dashboard's palette

```
app/
  (tabs)/         index (Studio) · discover · library · about
  tools/          ideas · precheck · clips · metadata
  channel/[slug]  persona, topics, indexed videos
  issue/[key]     stance split by lean + event feed
  onboard         paste links, per-video live progress
src/
  api/            client.ts (typed fetch) · types.ts
  components/     ui.tsx · VideoSheet.tsx · RequireChannel.tsx
  store.tsx       saved channels (AsyncStorage)
  theme.ts        design tokens
```

## Develop

```bash
npm install
npx expo start            # scan the QR with Expo Go, or press i / a
npm run lint              # tsc --noEmit
```

Point at a local API instead of production:

```bash
EXPO_PUBLIC_API_BASE=http://192.168.1.5:8300 npx expo start
```

(Use your machine's LAN IP, not `localhost` — that resolves to the phone.)

## Icons

Generated from code so they're reviewable in a diff:

```bash
uv run --with pillow python assets/generate_icons.py
```

## Build and ship

Requires the `eas-cli` and an Expo account (`npx eas login`). Native projects
are generated at build time and are not checked in.

```bash
npx eas init                       # once — links the Expo project
npx eas build --profile preview    # internal APK / simulator build
npm run build:ios                  # App Store binary
npm run build:android              # Play Store AAB
npm run submit:ios                 # needs ascAppId + appleTeamId in eas.json
npm run submit:android             # needs play-service-account.json
```

Before the first submit, fill in the `REPLACE_WITH_*` placeholders in
`eas.json`. Android `versionCode` is derived from the git commit count, so
commit before building.

Store listing copy lives in [`store/`](store/), and the privacy policy both
stores require is [`PRIVACY.md`](PRIVACY.md).
