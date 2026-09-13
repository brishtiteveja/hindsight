import Constants from "expo-constants";

import type {
  BrowseResponse,
  ClipsResponse,
  IdeasResponse,
  IssueTimeline,
  MetadataResponse,
  OnboardStart,
  OnboardStatus,
  Persona,
  PrecheckResponse,
  Showcase,
  TranscriptsResponse,
} from "./types";

export const API_BASE: string =
  (Constants.expoConfig?.extra as { apiBase?: string } | undefined)?.apiBase ||
  "https://dev.perspectivity.co/hindsight";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Model-backed endpoints (ideas, precheck, clips, metadata) can legitimately run
 * for a minute or more — the server calls Gemini synchronously. Cached/read
 * endpoints are fast. Callers pick a timeout accordingly; the default is
 * generous because a spurious abort is worse UX than a slow spinner.
 */
async function request<T>(
  path: string,
  opts: { method?: string; body?: unknown; timeoutMs?: number } = {},
): Promise<T> {
  const { method = "GET", body, timeoutMs = 90_000 } = opts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      signal: controller.signal,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      // FastAPI puts the useful part in `detail`; fall back to the raw body.
      const text = await res.text().catch(() => "");
      let detail = text;
      try {
        detail = JSON.parse(text)?.detail ?? text;
      } catch {
        /* not JSON — keep the raw text */
      }
      throw new ApiError(res.status, detail || `HTTP ${res.status}`);
    }
    return (await res.json()) as T;
  } catch (e) {
    if (e instanceof ApiError) throw e;
    if ((e as Error)?.name === "AbortError") {
      throw new ApiError(408, "That took too long. Try again in a moment.");
    }
    throw new ApiError(0, "Can't reach Hindsight. Check your connection.");
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  channels: () => request<{ channels: string[] }>("/v1/channels", { timeoutMs: 20_000 }),

  browse: () => request<BrowseResponse>("/v1/browse", { timeoutMs: 30_000 }),

  showcase: () => request<Showcase>("/v1/showcase", { timeoutMs: 30_000 }),

  issueTimeline: (key: string) =>
    request<IssueTimeline>(`/v1/issues/${key}/timeline`, { timeoutMs: 45_000 }),

  persona: (channel: string) =>
    request<Persona>(`/v1/channels/${channel}/persona`, { timeoutMs: 20_000 }),

  /** Cached ideas; 404 means "never generated" — the caller should offer to run it. */
  ideas: (channel: string) => request<IdeasResponse>(`/v1/channels/${channel}/ideas`),

  generateIdeas: (channel: string, k = 6) =>
    request<IdeasResponse>(`/v1/channels/${channel}/ideas?k=${k}`, {
      method: "POST",
      timeoutMs: 180_000,
    }),

  precheck: (channel: string, script: string) =>
    request<PrecheckResponse>(`/v1/channels/${channel}/precheck`, {
      method: "POST",
      body: { script },
      timeoutMs: 180_000,
    }),

  clips: (channel: string, q: string, k = 12) =>
    request<ClipsResponse>(
      `/v1/channels/${channel}/clips?q=${encodeURIComponent(q)}&k=${k}`,
      { timeoutMs: 180_000 },
    ),

  metadata: (channel: string, videoId: string, force = false) =>
    request<MetadataResponse>(
      `/v1/channels/${channel}/videos/${videoId}/metadata${force ? "?force=true" : ""}`,
      { timeoutMs: 180_000 },
    ),

  transcripts: (channel: string) =>
    request<TranscriptsResponse>(`/v1/channels/${channel}/transcripts`, {
      timeoutMs: 30_000,
    }),

  onboard: (urls: string, channel = "") =>
    request<OnboardStart>("/v1/onboard", {
      method: "POST",
      body: { urls, channel },
      timeoutMs: 30_000,
    }),

  onboardStatus: (slug: string) =>
    request<OnboardStatus>(`/v1/onboard/${slug}/status`, { timeoutMs: 20_000 }),
};

/** Absolute URL for a server-rendered asset path like "v1/art/issue/x.svg". */
export const assetUrl = (p: string) =>
  p.startsWith("http") ? p : `${API_BASE}/${p.replace(/^\//, "")}`;
