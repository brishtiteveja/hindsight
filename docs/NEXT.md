# Work after the hackathon

The remaining build window is limited to a narrative-first homepage, one verified agent/evidence flow, accurate README positioning, and recording preparation. Do not add these items before the video unless they block that path.

- Broader visual explorations and new branding.
- More surfaces and sponsor integrations.
- Claim-level embedding cache and larger-channel latency work.
- Unified confidence-aware timestamp resolution across every feature.
- Speaker identity verification across interview episodes.
- A complete accessibility audit and richer keyboard navigation.
- Narrative-change evaluation set with human-reviewed examples.
- Fine-grained corpus coverage and freshness indicators.
- Persistent investigations, share links, and exportable evidence collections.
- Agent memory across sessions: save investigations and user-approved findings with source provenance, revision history, and explicit deletion controls.
- Iterative knowledge enrichment: revisit linked evidence, track unresolved questions, and distinguish extracted claims from verified findings. Evaluate this before describing it as recursive knowledge.
- Improved mobile agent parity and app-store work.

Never infer that a change in topic sentiment proves an individual reversed position. Preserve source excerpts, actor uncertainty, and the distinction between changing coverage and changing beliefs.

## Search and temporal memory evaluation

Defer infrastructure changes until after recording. Evaluate these as separate problems:

- [QMD](https://github.com/tobi/qmd): hybrid keyword/vector retrieval and reranking. Compare it with the existing per-video digest vectors on a small set of real questions. Export timestamped transcript passages with stable video IDs; measure relevant-passage recall, citation accuracy, latency and indexing cost before adopting it. A simpler lexical search combined with the existing embeddings is also a candidate baseline.
- [Graphiti](https://github.com/getzep/graphiti): temporal relationships and source provenance. Pilot one channel and one issue. Model a statement as “speaker expressed claim in video at time,” preserving publication date, ingest date, attribution confidence and transcript offsets. Opposing statements from different speakers must coexist; neither automatically invalidates the other. Publication date alone does not establish when a belief began or ended.

Start with 20 manually reviewed questions covering exact quotes, paraphrases, changes in framing and guest/host disagreement. Adopt a new system only when it improves evidence retrieval or historical answers over the current baseline. Neither integration is part of the current build.
