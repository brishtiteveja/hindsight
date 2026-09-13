# Hindsight: submission positioning and evidence plan

Working brief, September 13, 2026. Scores are not predicted: every criterion needs observable evidence.

## Position

**Hindsight — check your next draft against your published past.**

For a creator reviewing a script before recording, Hindsight uses the channel and draft already open in the studio to find potentially conflicting past statements, explain the difference, and bring the supporting transcript into view. The creator decides whether to revise or explain the change.

Lead with this one interaction. The corpus, Galaxy, clips, metadata, and mobile app are supporting capabilities; they are not five separate pitches. Avoid claiming to have read “everything” when the indexed catalogue is incomplete. A channel is not necessarily one speaker.

## Published rubric

Source: [CopilotKit's official starter-kit overview](https://github.com/CopilotKit/agents-everywhere-starter-kit/blob/main/hackathon-overview.md), retrieved September 13. It attributes the rubric to the San Francisco participant portal: four criteria, each scored 1–5. Direct portal access returned 403; updates from the team's virtual portal take precedence.

| Criterion | Evidence the demo should supply | Current gap / acceptance gate |
|---|---|---|
| Core Requirements & Functionality | Draft visible → agent request → check runs → result visible → source opened | Repeat the full live interaction without developer intervention. |
| Innovation & Theme Alignment | “Check this draft” works from the open channel and editor | Pass actual draft state to the agent, not just channel/lens; demonstrate what disappears without that context. |
| Technical Execution & Integration | Model, retrieval, AG-UI and browser actions cooperate; failures remain understandable | Verify browser round trip, fix player overflow, test an unavailable source and stop/error path. |
| Usefulness & Agentic Experience | A creator can inspect the source and decide what to change | Distinguish attribution, disagreement, drift and reversal; never equate tool dispatch with successful playback. |

More sponsor logos or more surfaces are not independent rubric criteria. This is a focus decision, not a numerical scoring forecast.

## Most important work, in order

1. Prove the agent's complete browser workflow on a preview server before restarting the live backend. The last verified live process lacked the agent routes.
2. Make context essential: share the editor draft and selected channel. Render tool results into the actual Pre-flight view; do not merely switch to an empty lens.
3. Make evidence defensible: preserve who said the prior claim, use actual transcript excerpts, and resolve a relevant moment. Treat uncertain attribution as a channel-archive conflict, not “you reversed yourself.”
4. Fix the oversized video modal. Keep the close button and external YouTube link visible, and retain readable transcript evidence when embedding is blocked.
5. Rehearse one short, clearly labeled hypothetical draft against a real, inspected source. It must be plausible, but it is not a real new statement by the creator.
6. Confirm clean-clone setup and supply runnable example input; the private/local 49K corpus is excluded by .gitignore.
7. Record under two minutes and finish every required link. Reserve upload time before the portal deadline.

## Demo candidate to validate

Channel: `dwarkesh-patel`.

Source: `5Wvpc_2-7-U`, “AI Regulation's Authoritarian Problem,” archive date 2026-04-28. The saved transcript discusses vague AI-risk terms and authoritarian abuse around 0:04–0:27. Verify speaker identity from the actual recording before attributing it to a person. The digest currently says `actor: host`, which is not a verified identity.

Hypothetical draft for testing:

> Terms such as catastrophic risk and threats to national security are precise enough to prevent government abuse. Broad AI regulation built on these terms cannot be repurposed to suppress models that criticize government policy.

This deliberately tests tension with archived statements. Do not claim a successful check until the actual tool returns relevant evidence. Do not label an actual creator as having made this hypothetical statement.

## Two-minute narrative

- 0:00–0:12 — Show channel and hypothetical draft already in the editor. “Creators publish for years. Before recording the next script, they need to know where it conflicts with the archive.”
- 0:12–0:25 — Ask “Check this draft against this channel's past statements and show the strongest evidence.” Do not repaste the draft into chat.
- 0:25–0:55 — Show actual tool activity and the check appearing in the studio. Explain the specific conflicting propositions, not just a red badge.
- 0:55–1:20 — Open the matching moment and inspect the transcript. Name the speaker only if verified. Explain why these two claims conflict.
- 1:20–1:40 — Show the creator's decision: edit the draft or acknowledge the change. If no save exists, do not imply publishing or persistence.
- 1:40–1:52 — Show a short genuine error/recovery case, such as unavailable playback with usable transcript evidence. Do not stage a successful video when YouTube is blocked.
- 1:52–2:00 — “The agent uses the draft and channel already here, then puts evidence where I can act on it.” Credit the actual integrations used.

This is a target script, not a report of completed behavior. Record the actual working sequence; disclose edits/time compression.

## Inherited work and eligibility

The existing studio and transcript engine were already running before the event. New event-period commits add provider routing, agent tools/loop, SSE, AG-UI and the CopilotKit island. Commit dates alone do not establish when the underlying work was authored.

The event allows inherited building blocks but excludes extending a pre-existing project and entering it as new. Do not relabel the inherited studio to hide this. Seek organizer clarification on whether the distinct agent interaction qualifies when it uses the existing engine as infrastructure. That decision is not established by this document.

## Sponsor positioning

- OpenRouter: routes the reasoning/tool-calling requests.
- OpenAI: the configured model is requested through OpenRouter; verify the actual model used in the recording before stating it.
- CopilotKit: agent UI, live application context, browser tool execution via AG-UI. Integration exists in source; verify the actual browser run.
- Gemini: existing retrieval embeddings; credit accurately without implying it is an event sponsor.
- Do not claim use of Ambiguous AI, Exa, Trigger.dev or other integrations merely because they sponsor the event.

Best Use of CopilotKit is a plausible additional category to pursue if context and frontend tools work reliably. No category or score is guaranteed.
