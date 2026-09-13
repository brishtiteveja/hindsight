# Recording plan — narrative first

Recording path verified on the public site after the backend refresh. Keep the video at or below two minutes. Preserve time to upload and check the public link.

## The story

“A single video captures a moment. I wanted to see the longer story: how creators frame an issue, what changes, and where the evidence is. Hindsight makes that YouTube history explorable.”

Begin on Home: the fine-point galaxy and “Every issue has a history.” Hover an issue to reveal its description; clicking opens the original Galaxy focused on that cluster.

Optional memory line: “Hindsight keeps a persistent memory of the indexed archive. The agent brings that history into the channel and draft I am working on.” This refers to stored transcripts and analysis, not saved personal conversations or autonomous learning.

## Main sequence to verify before recording

1. Show the landing galaxy, then select Follow a story.
2. Select Investigate this story, then the suggested Compare these three moments prompt; no titles need to be pasted.
3. Show how the emphasis moves between government coercion, broad legal definitions and the industrialization analogy.
4. Open a supporting moment and inspect the transcript. State that these are different framings within a broadly consistent stance, not a demonstrated reversal.
5. Explain how the agent used the selected sources and acted within the archive.

Real sources are recorded in `docs/demo-evidence.json`. Verified browser path: Home → Follow a story → Investigate this story → Compare these three moments. The real model called `read_sources`, received the three selected transcripts, called `play_moment`, and completed in 17.309 seconds with no browser JavaScript errors. A subsequent public-site run completed in 15.377 seconds after the backend refresh. These are observed runs, not a performance guarantee.

## Timing

- 0:00–0:15: Motivation and homepage. “How does the conversation change?”
- 0:15–0:30: Choose AI regulation and show the three dated sources.
- 0:30–1:10: Run the investigation. Show actual tool actions and the resulting explanation. If waits are edited, disclose the time compression.
- 1:10–1:35: Open and read source evidence. If YouTube blocks embedding, use the transcript and show the external link; do not claim playback succeeded.
- 1:35–1:50: Explain what context the agent used and what work it saved.
- 1:50–2:00: Credit Perspectivity.co's existing transcript corpus; explain that agent/tool/context integration is the event work. Close with the live app and repository links.

## Verified secondary flow

The live draft-check agent received the current channel and a hypothetical script from the editor, rendered two conflicts, and opened source moments. A second live run finished in 34.336 seconds, compared with 54.152 seconds before the evidence-return change. It called `run_preflight` once and `play_moment` three times, with no duplicate `check_draft` call and no browser JavaScript errors. These are two observations, not a latency benchmark. The browser bridge returns the evidence already rendered. Its controlled success/failure/stale-draft tests also pass.

The public backend was refreshed to include the `archive_conflict` attribution fix and `read_sources`. Recheck the draft wording on the recording machine if using this secondary flow. Only one source moment is visible at a time; opening three moments does not display three simultaneous players.

Do not try to fit a full second demo into the same two-minute video. Keep draft review available if the narrative flow cannot be made reliable within the code-freeze window.

## Before recording

- Use a fresh browser session and the actual recording machine.
- Confirm all visible source titles, dates and timestamps match the archive.
- Confirm speaker uncertainty is visible and narration does not overstate it.
- Confirm the agent sidebar and source dialog do not obscure each other.
- Confirm the public app is running the tested backend and frontend version.
- Hide notifications and credentials. Check microphone audio.
- Check video duration and public visibility after upload.
- Update the already-started submission only with the team's authorization.

## Freeze

Stop feature work by 05:32 UTC / 07:32 Berlin on September 13, 2026, based on the user's requested 90-minute limit. Save unfinished work in `docs/NEXT.md` and hand off a tested recording path earlier if possible.
