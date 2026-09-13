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
} from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

// Relative on purpose: the studio is served at / locally and at /hindsight/
// behind nginx, and a relative URL resolves correctly under both.
const agent = new HttpAgent({ url: "v1/agent/agui" });

const LENSES = [
  "chat", "ideas", "preflight", "clips", "studio",
  "coverage", "evolution", "prism", "receipts", "river",
];

function Wiring() {
  // The studio broadcasts hs:context whenever the channel or lens changes, so
  // the agent's picture of the screen stays current between turns rather than
  // being frozen at mount.
  const [view, setView] = useState(() => window.hsContext?.() ?? {});
  useEffect(() => {
    const onChange = (e) => setView(e.detail || {});
    window.addEventListener("hs:context", onChange);
    setView(window.hsContext?.() ?? {});
    return () => window.removeEventListener("hs:context", onChange);
  }, []);

  // Context awareness: the agent is told what is on screen, so "check my draft"
  // does not need the channel spelled out.
  useAgentContext({
    description:
      "The Hindsight studio view the user is currently looking at: which " +
      "channel is open and which lens is active.",
    value: {
      channel: view.channel ?? null,
      lens: view.lens ?? null,
      available_lenses: LENSES,
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
      window.hsOpenLens?.(lens);
      return `opened the ${lens} lens`;
    },
  });

  useFrontendTool({
    name: "play_moment",
    description:
      "Open a video in the studio player at an exact second, so the user can " +
      "watch the receipt for a claim instead of trusting you.",
    parameters: z.object({
      video_id: z.string().describe("YouTube video id."),
      second: z.number().int().describe("Where to start playback."),
      note: z.string().optional().describe("Why this moment matters."),
    }),
    handler: async ({ video_id, second, note }) => {
      window.hsPlayMoment?.(video_id, second, note || "");
      return `playing ${video_id} at ${second}s`;
    },
  });

  return null;
}

function App() {
  return (
    <CopilotKitProvider
      agentId="hindsight"
      agents__unsafe_dev_only={{ hindsight: agent }}
    >
      <Wiring />
      <CopilotSidebar
        defaultOpen={false}
        labels={{
          title: "Hindsight",
          initial:
            "I've read everything this channel has published. Ask what it has " +
            "said about something, or paste a draft and I'll check it against " +
            "your own back catalogue.",
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
