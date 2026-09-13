/* The in-studio agent.
 *
 * A small React island mounted into the existing zero-build studio. It adds no
 * framework to the rest of the app — the studio stays vanilla JS, and this
 * bundle only owns the agent panel.
 *
 * The interesting part is not the chat. It is that the agent gets hands on the
 * app: the two useFrontendTool registrations below run in this browser, so the
 * model can switch the lens you are looking at and open one of your videos at
 * the second that proves what it just claimed. Those handlers call into the
 * studio's own globals, so the agent drives the same code paths a click does.
 */

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { z } from "zod";
import {
  CopilotKitProvider,
  CopilotSidebar,
  useFrontendTool,
  useAgentContext,
  HttpAgent,
  CopilotModalHeader,
  useConfigureSuggestions,
  useAgent,
  useRenderTool,
} from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";
import { BookOpen, FileText, Search, ArrowUpRight, Play, Check, LoaderCircle, MessageSquare } from "lucide-react";
import "./hindsight.css";

// Relative on purpose: the studio is served at / locally and at /hindsight/
// behind nginx, and a relative URL resolves correctly under both.
const agent = new HttpAgent({ url: "v1/agent/agui" });

const LENSES = [
  "chat", "ideas", "preflight", "clips", "studio",
  "coverage", "evolution", "prism", "receipts", "river",
];


function useStudioView() {
  const [view, setView] = useState(() => window.hsContext?.() ?? {});
  useEffect(() => {
    const update = (e) => setView(e.detail || window.hsContext?.() || {});
    window.addEventListener("hs:context", update);
    update({});
    return () => window.removeEventListener("hs:context", update);
  }, []);
  return view;
}
const channelName = (view) => view.investigation ? "Dwarkesh Patel · AI regulation" : view.galaxy?.issue || view.channel_name || view.channel?.replace(/-/g, " ") || "All channels";
const unpack = (result) => {
  try { return typeof result === "string" ? JSON.parse(result) : result; }
  catch { return null; }
};
function AgentHeader(props) {
  const view = useStudioView();
  return <CopilotModalHeader {...props} >{({closeButton}) => <div className="hs-chat-header">
    <div><div className="hs-agent-brand"><BookOpen size={19}/><strong>Hindsight</strong></div>
      <div className="hs-agent-context">{channelName(view)}<span>{view.draft_present ? "Draft in context" : "Archive companion"}</span></div></div>
    {closeButton}
  </div>}</CopilotModalHeader>;
}
function Welcome({input, suggestionView}) {
  const view = useStudioView();
  return <div className="hs-chat-welcome">
    <div className="hs-welcome-content">
      <div className="hs-eyebrow">THE CONVERSATION HAS A HISTORY</div>
      <h2>A longer memory.<br/><em>A clearer view.</em></h2>
      <p>Follow an issue through the archive. Find what changed—and the moments behind it.</p>
      <div className="hs-context-block">
        <div className="hs-eyebrow">IN YOUR WORKSPACE</div>
        <div><BookOpen size={17}/><span>Channel</span><strong>{channelName(view)}</strong></div>
        <div><FileText size={17}/><span>{view.investigation ? "Selected sources" : "Draft"}</span><strong>{view.investigation ? `${view.investigation.sources.length} videos` : view.draft_present ? `${view.draft_chars} characters` : "No draft open"}</strong></div>
      </div>
      <div className="hs-memory-path"><span><FileText size={19}/>Transcripts</span><ArrowUpRight size={15}/><span><MessageSquare size={19}/>Claims</span><ArrowUpRight size={15}/><span><BookOpen size={19}/>Sources</span></div>
      <div className="hs-eyebrow hs-start-label">START AN INVESTIGATION</div>
      {suggestionView}
    </div>
    <div className="hs-welcome-composer">{input}</div>
  </div>;
}
function PreflightProgress({status, result}) {
  const data = unpack(result);
  const done = status === "complete";
  return <div className={`hs-tool-status ${done ? "is-complete" : "is-working"}`} role="status">
    {done ? <Check size={16}/> : <LoaderCircle size={16} className="hs-spin"/>}
    <div><strong>{done ? (data?.ok ? "Draft checked against the archive" : "Draft check needs attention") : "Comparing your draft with past statements"}</strong>
    <small>{done ? (data?.ok ? `${data.claims?.length || 0} claims reviewed · evidence in Pre-flight` : data?.reason || "Try again from the editor") : "Retrieving claims and their source moments…"}</small></div>
  </div>;
}
function MomentCard({args, status, result}) {
  const [error, setError] = useState("");
  const data = unpack(result);
  if (!args.video_id) return null;
  const second = Math.max(0, Math.floor(args.second || 0));
  const time = `${Math.floor(second / 60)}:${String(second % 60).padStart(2, "0")}`;
  return <div className="hs-source-card">
    <button className="hs-source-open" onClick={async () => {
      const r = await window.hsPlayMoment?.(args.video_id, second, args.note);
      setError(r?.ok ? "" : "Could not open the source. Use the YouTube link below.");
    }} aria-label={`Open source at ${time}`}>
      <div className="hs-source-thumb"><img src={`https://i.ytimg.com/vi/${encodeURIComponent(args.video_id)}/mqdefault.jpg`} alt="Video source thumbnail" loading="lazy"/><span><Play size={12}/>{time}</span></div>
      <div><div className="hs-eyebrow">SOURCE MOMENT</div><p>{args.note || "Inspect the supporting transcript"}</p><small>{status === "complete" ? (data?.ok ? "Open transcript and video" : "Inspect source") : "Opening source…"}<ArrowUpRight size={13}/></small></div>
    </button>
    {error && <small role="alert">{error}</small>}
    <a className="hs-source-external" href={`https://www.youtube.com/watch?v=${encodeURIComponent(args.video_id)}&t=${second}s`} target="_blank" rel="noreferrer">View on YouTube <ArrowUpRight size={12}/></a>
  </div>;
}

function Wiring() {
  // The studio broadcasts hs:context whenever the channel or lens changes, so
  // the agent's picture of the screen stays current between turns rather than
  // being frozen at mount.
  const view = useStudioView();
  const {agent: currentAgent} = useAgent({agentId: "hindsight"});
  const hasMessages = currentAgent.messages.some(m => m.role === "user");
  useRenderTool({name: "read_sources", parameters: z.object({sources: z.array(z.object({channel:z.string(),video_id:z.string(),second:z.number().optional()}))}), render: ({status, result}) => {
    const data = unpack(result);
    const done = status === "complete";
    return <div className="hs-tool-status" role="status">{done ? <Check size={16}/> : <LoaderCircle className="hs-spin" size={16}/>}<div><strong>{done ? "Source transcripts inspected" : "Reading the selected source transcripts"}</strong><small>{done ? `${data?.sources?.filter(s=>!s.error).length || 0} sources returned · dates and attribution preserved` : "Following the evidence in your workspace…"}</small></div></div>;
  }});
  const suggestions = hasMessages ? [
    {title: "Show the strongest source", message: "Open the strongest source moment for your last answer. Explain what it supports and any uncertainty."},
    {title: "Find another perspective", message: "Find a different argument about this issue in the indexed archive. Cite its source and distinguish speakers."},
  ] : view.investigation ? [
    {title: "Compare these three moments", message: "Investigate the three source videos in my current investigation. Use read_sources to inspect their transcripts. Explain how the framing differs over time, distinguish claims from facts and speaker identity, then open the strongest source moment. Keep the answer concise."},
    {title: "What stayed consistent?", message: "Read the sources in my current investigation and explain which concerns remained consistent across these videos. Cite the original evidence; do not assume a personal reversal."},
  ] : view.galaxy?.sources?.length ? [
    {title: "Investigate this selection", message: "Inspect the sampled sources in my current galaxy selection with read_sources. Compare their framing and dates, acknowledge the sample is not exhaustive, and open a supporting moment."},
    {title: "Help me narrow this issue", message: "Use the issue and source titles in my galaxy selection to suggest two specific questions I could investigate. Say these are suggestions based on titles, not findings."},
  ] : view.channel ? [
    {title: "How has the framing changed?", message: "Investigate how this channel has framed AI regulation across its indexed videos. Compare dated examples, distinguish speakers, and open one supporting moment. Do not equate a change in framing with a personal reversal."},
    ...(view.draft_present ? [{title: "Check the draft in my editor", message: "Check this draft against this channel’s past statements and show me the strongest evidence."}] : [{title: "What does this channel return to?", message: "What recurring issues and arguments appear in this channel's indexed archive? Give me a useful starting point with sources."}]),
  ] : [
    {title: "Explore AI regulation", message: "Find channels and videos in the indexed archive discussing AI regulation. Recommend a starting point with sources."},
    {title: "Help me choose a channel", message: "Show me a few channels available in this archive and the issues they cover, so I can choose one to investigate."},
  ];
  useConfigureSuggestions({suggestions, available: "always", consumerAgentId: "hindsight"}, [view.channel, view.draft_present, view.investigation, view.galaxy, hasMessages]);

  // Context awareness: the agent is told what is on screen, so "check my draft"
  // does not need the channel spelled out.
  useAgentContext({
    description:
      "The Hindsight studio view the user is currently looking at: the open " +
      "channel, the active lens, and the draft script currently in the " +
      "Pre-flight editor (if any). When the user says 'this draft' or 'check " +
      "this', they mean the draft below — do not ask them to paste it again. " +
      "If investigation or galaxy_selection contains sources, those are the videos on screen: inspect them with read_sources before drawing conclusions.",
    value: {
      channel: view.channel ?? null,
      investigation: view.investigation ?? null,
      galaxy_selection: view.galaxy ?? null,
      lens: view.lens ?? null,
      available_lenses: LENSES,
      draft_present: view.draft_present ?? false,
      draft_chars: view.draft_chars ?? 0,
      draft: view.draft ?? "",
    },
  });

  useFrontendTool({
    name: "open_lens",
    description:
      "Switch the studio to a lens so the user sees what you are talking " +
      "about. Call this before explaining a result that has its own view.",
    parameters: z.object({
      lens: z.enum(LENSES).describe("Which lens to open."),
    }),
    handler: async ({ lens }) => {
      return window.hsOpenLens?.(lens) ?? { ok: false, reason: "studio bridge unavailable" };
    },
  });

  // Runs the studio's own pre-flight over the draft already in the editor, so
  // the verdicts render in the real Pre-flight view rather than the agent
  // switching to an empty lens and describing what it would have found.
  useFrontendTool({
    name: "run_preflight",
    render: PreflightProgress,
    description:
      "Check the draft currently in the studio's Pre-flight editor against the " +
      "channel's published past, rendering the verdicts into the Pre-flight " +
      "view. Use this instead of check_draft whenever the draft is already in " +
      "the editor. Returns rendered claims, verdicts, video IDs and timestamps; use that evidence without repeating check_draft.",
    parameters: z.object({}),
    handler: async () => {
      const r = await window.hsRunPreflight?.();
      return r ?? { ok: false, reason: "studio bridge unavailable" };
    },
  });

  useFrontendTool({
    name: "play_moment",
    render: MomentCard,
    description:
      "Open a video in the studio player at an exact second, so the user can " +
      "watch the receipt for a claim instead of trusting you.",
    parameters: z.object({
      video_id: z.string().describe("YouTube video id."),
      second: z.number().int().describe("Where to start playback."),
      note: z.string().optional().describe("Why this moment matters."),
    }),
    // Returns what actually happened, not what was requested: a dispatched call
    // is not a playing video, and claiming otherwise would make the agent
    // unreliable about its own evidence.
    handler: async ({ video_id, second, note }) => {
      const r = await window.hsPlayMoment?.(video_id, second, note || "");
      return r ?? { ok: false, reason: "studio bridge unavailable" };
    },
  });

  return null;
}

function App() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("hs:open-agent", show);
    return () => window.removeEventListener("hs:open-agent", show);
  }, []);
  return (
    <CopilotKitProvider
      agentId="hindsight"
      agents__unsafe_dev_only={{ hindsight: agent }}
    >
      <Wiring />
      <CopilotSidebar
        open={open}
        onOpenChange={setOpen}
        width={470}
        header={AgentHeader}
        welcomeScreen={Welcome}
        className="hs-investigation-chat"
        labels={{
          modalHeaderTitle: "Hindsight",
          welcomeMessageText: "A longer memory. A clearer view.",
          chatInputPlaceholder: "Ask about the archive…",
          chatDisclaimerText: "Archive memory by Perspectivity.co · Verify the source.",
          chatToggleOpenLabel: "Open Hindsight",
          chatToggleCloseLabel: "Close Hindsight",
        }}
      />
    </CopilotKitProvider>
  );
}

const el = document.getElementById("hs-agent");
// Idempotent: a stray second <script> tag must not mount a second agent.
if (el && !el.dataset.hsMounted) {
  el.dataset.hsMounted = "1";
  createRoot(el).render(<App />);   // no StrictMode: it double-registers tools
}
