/* Headless check that the agent island actually mounts inside the studio and
 * registers its browser tools.
 *
 * Exists because the backend contract can be proven with curl but "does the
 * sidebar appear and can the agent reach the studio" cannot. Run against a
 * local server:  node verify-island.mjs http://127.0.0.1:8315/
 */

import { chromium } from "playwright-core";

const url = process.argv[2] || "http://127.0.0.1:8315/";
const errors = [];

const browser = await chromium.launch({
  // playwright-core's pinned revision isn't downloaded here; use the system
  // Chrome. --no-sandbox is required because this runs as root.
  executablePath: process.env.CHROME_PATH || "/opt/google/chrome/chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();

page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

const requests = [];
const notFound = [];
page.on("request", (r) => {
  if (r.url().includes("/v1/agent/")) requests.push(`${r.method()} ${r.url()}`);
});
page.on("response", (r) => {
  if (r.status() === 404) notFound.push(r.url());
});

await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

// networkidle fires before React has committed, so waiting on the network alone
// reports a false regression roughly one run in three. Wait for the mount itself.
await page.waitForFunction(
  () => document.getElementById("hs-agent")?.childElementCount > 0,
  null, { timeout: 30000 },
).catch(() => {});   // fall through: the assertions below report the real state

// The studio's half of the bridge.
const bridge = await page.evaluate(() => ({
  hsContext: typeof window.hsContext,
  hsOpenLens: typeof window.hsOpenLens,
  hsPlayMoment: typeof window.hsPlayMoment,
  hsRunPreflight: typeof window.hsRunPreflight,
  context: window.hsContext ? window.hsContext() : null,
}));

// The island's half: did React mount anything into #hs-agent?
const mounted = await page.evaluate(() => {
  const el = document.getElementById("hs-agent");
  return {
    present: Boolean(el),
    flagged: el?.dataset.hsMounted === "1",
    childCount: el ? el.childElementCount : 0,
    copilotNodes: document.querySelectorAll("[data-copilotkit]").length,
  };
});

// Does the draft actually reach the context object?
await page.evaluate(() => {
  const ta = document.getElementById("pf-script");
  if (ta) {
    ta.value = "A".repeat(200);
    ta.dispatchEvent(new Event("input", { bubbles: true }));
  }
});
await page.waitForTimeout(700);
const withDraft = await page.evaluate(() =>
  window.hsContext ? window.hsContext() : null);

console.log("bridge          ", JSON.stringify(bridge));
console.log("island mounted  ", JSON.stringify(mounted));
console.log("draft in context", JSON.stringify({
  draft_present: withDraft?.draft_present,
  draft_chars: withDraft?.draft_chars,
}));
console.log("agent requests  ", JSON.stringify(requests));
console.log("404s            ", notFound.length ? JSON.stringify(notFound) : "none");
console.log("console errors  ", errors.length ? JSON.stringify(errors.slice(0, 5)) : "none");

await browser.close();

const ok = bridge.hsRunPreflight === "function" &&
           mounted.flagged && mounted.childCount > 0 &&
           withDraft?.draft_present === true;
console.log(ok ? "\nPASS island mounted and bridge reachable"
               : "\nFAIL see above");
process.exit(ok ? 0 : 1);
