/** Response shapes for the Hindsight API. Kept hand-written and narrow — only
 *  the fields the app actually reads, so a server addition never breaks a build. */

export type VideoRef = {
  video_id: string;
  title: string;
  date?: string;
  thumb?: string;
  channel?: string;
};

export type Idea = {
  title_pitch: string;
  angle: string;
  why_now: string;
  gap_type: string;
  confidence: number;
  topics: string[];
  your_history: VideoRef[];
  market_evidence: VideoRef[];
};

export type IdeasResponse = {
  channel: string;
  generated_for: string;
  ideas: Idea[];
};

export type PastClaim = {
  text: string;
  quote?: string;
  video_id: string;
  title: string;
  date: string;
  similarity: number;
  verdict: string;
  why: string;
  t: number;
  url: string;
};

/** Verdicts the judge can return, plus "new" when there's no past claim to compare. */
export type Verdict =
  | "contradiction"
  | "drift"
  | "consistent"
  | "unrelated"
  | "new";

export type PrecheckClaim = {
  text: string;
  verdict: Verdict | string;
  past: PastClaim[];
};

export type PrecheckResponse = {
  claims: PrecheckClaim[];
  summary?: Record<string, number>;
  /** Set instead of `claims` when the draft was too short to check. */
  error?: string;
  /** The showcase payload carries a single `example` rather than the full list. */
  example?: PrecheckClaim;
  script?: string;
};

export type Clip = {
  video_id: string;
  short_title: string;
  hook: string;
  score: number;
  title: string;
  date: string;
  thumb: string;
  start: number;
  end: number;
  url: string;
  ffmpeg: string;
};

export type ClipsResponse = { query: string; clips: Clip[] };

export type MetadataResponse = {
  video_id: string;
  original_title: string;
  titles: { style: string; text: string }[];
  chapters: { t: number; label: string; stamp: string }[];
  description?: string;
  tags?: string[];
  pinned_comments?: string[];
};

export type TranscriptRef = {
  video_id: string;
  title: string;
  published_at?: string;
  word_count?: number;
};

export type TranscriptsResponse = { count: number; videos: TranscriptRef[] };

export type Persona = {
  channel: string;
  group?: string;
  role?: string;
  handle?: string;
  total_videos: number;
  date_range?: [string, string];
  top_topics?: { topic: string; count: number; stance: string }[];
  recent_narratives?: { text: string; title: string; date: string }[];
  sample_quotes?: string[];
  thumbnails?: string[];
  poster?: string;
};

export type IssueTile = {
  video_id: string;
  thumb: string;
  title: string;
  channel: string;
};

export type Issue = {
  key: string;
  label: string;
  hue: string;
  image?: string;
  issues: string[];
  tiles: IssueTile[];
};

export type BrowseResponse = { issues: Issue[] };

export type Stance = "supportive" | "critical" | "mixed" | "neutral";
export type Lean = "left" | "center" | "right";

export type IssueEvent = {
  date: string;
  channel: string;
  slug: string;
  lean: Lean | string;
  topic: string;
  stance: Stance | string;
  summary: string;
  video_id: string;
  title: string;
  thumb: string;
  /** Second in the video where the claim lands. */
  t: number;
  url: string;
};

export type IssueTimeline = {
  issue: string;
  label: string;
  hue: string;
  issues: string[];
  total: number;
  channels: number;
  stances: Record<string, number>;
  by_lean: Record<string, Record<string, number>>;
  events: IssueEvent[];
};

export type OnboardStart = {
  channel: string;
  slug: string;
  videos: number;
  appending: boolean;
};

export type OnboardStepState =
  | "queued"
  | "fetching"
  | "fetched"
  | "analyzing"
  | "done"
  | "failed";

export type OnboardStep = {
  video_id: string;
  state: OnboardStepState | string;
  title: string;
  error?: string;
};

export type OnboardStatus = {
  state: "none" | "running" | "done" | "error" | string;
  /** "captions" | "analysis" | "second chance" | "indexing" */
  phase?: string;
  steps?: OnboardStep[];
  slug?: string;
  videos?: number;
  error?: string;
  started?: number;
};

export type Showcase = {
  channel: string;
  name: string;
  idea: Idea;
  precheck: PrecheckResponse;
  clip: Clip;
  clip_query: string;
  metadata: MetadataResponse;
};
