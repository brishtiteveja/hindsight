/* Browser regression checks for the studio's agent bridge. API responses are
 * deliberately controlled here; this does not prove live model quality.
 * Run: node verify-preflight.mjs https://dev.perspectivity.co/hindsight/
 */
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
const draft = 'Hypothetical test draft: Broad AI regulation cannot be repurposed to suppress models that criticize government policy.';
const fixture = {
  summary: { archive_conflict: 1 },
  claims: [{ text: draft, verdict: 'archive_conflict', past: [{
    text: 'Earlier archive claim for the browser regression fixture.',
    video_id: '5Wvpc_2-7-U', t: 31, title: 'Browser test fixture',
    date: '2026-04-28', speaker: 'host', attribution: 'unverified',
    url: 'https://www.youtube.com/watch?v=5Wvpc_2-7-U&t=31s',
  }] }],
};
const pattern = '**/v1/channels/*/precheck';
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(process.argv[2] || 'http://127.0.0.1:8315/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', {name:'Studio',exact:true}).click();
  await page.getByRole('heading', { name: 'Dwarkesh Patel', exact: true }).first().waitFor();
  await page.getByRole('heading', { name: 'Dwarkesh Patel', exact: true }).first().click();
  await page.getByRole('button', { name: '✓ Pre-flight', exact: true }).click();
  const editor = page.getByRole('textbox', { name: 'Paste your script or outline here…' });
  await editor.fill(draft);
  await page.route(pattern, r => r.fulfill({ json: fixture }));
  const success = await page.evaluate(() => window.hsRunPreflight());
  assert.equal(success.ok, true);
  assert.equal(success.claims[0].past[0].video_id, '5Wvpc_2-7-U');
  assert.equal(success.claims[0].past[0].t, 31);
  assert.equal(success.claims[0].past[0].attribution, 'unverified');
  assert.equal(await page.locator('#pf-results [data-verdict="archive_conflict"]').count(), 1);
  console.log('PASS: one check returns the same evidence rendered in the studio.');

  await page.unroute(pattern);
  await page.route(pattern, r => r.fulfill({ status: 503, json: { detail: 'Injected outage' } }));
  const failed = await page.evaluate(() => window.hsRunPreflight());
  assert.equal(failed.ok, false);
  assert.match(failed.reason, /503/);
  assert.equal(await editor.inputValue(), draft);
  assert.equal(await page.locator('#pf-results [data-verdict]').count(), 0);
  assert.match(await page.locator('#pf-status').innerText(), /Check failed/);
  await page.screenshot({ path: '/tmp/hindsight-preflight-failure.png' });
  console.log('PASS: an injected HTTP failure preserves the draft and reports failure.');

  await page.unroute(pattern);
  await page.route(pattern, r => r.fulfill({ json: { error: 'Injected model failure', claims: [] } }));
  assert.equal((await page.evaluate(() => window.hsRunPreflight())).ok, false);
  console.log('PASS: an error payload cannot become a successful empty check.');

  await page.unroute(pattern);
  let release;
  const intercepted = new Promise(resolve => { release = resolve; });
  await page.route(pattern, route => { release(route); });
  await page.evaluate(() => { window.pendingCheck = window.hsRunPreflight(); });
  const route = await intercepted;
  await editor.fill(draft + ' The draft has changed.');
  await route.fulfill({ json: fixture });
  const stale = await page.evaluate(() => window.pendingCheck);
  assert.equal(stale.ok, false);
  assert.match(stale.reason, /changed/);
  assert.equal(await page.locator('#pf-results [data-verdict]').count(), 0);
  console.log('PASS: results from an older draft are not applied to the edited draft.');

  await editor.fill('');
  assert.equal((await page.evaluate(() => window.hsRunPreflight())).ok, false);
  console.log('PASS: empty draft is rejected.');

  await page.getByRole('button', { name: 'Open Hindsight', exact: true }).click();
  await page.getByRole('complementary', { name: 'Copilot chat sidebar' }).waitFor();
  await page.evaluate(() => window.hsPlayMoment('5Wvpc_2-7-U', 31, 'Layout regression check'));
  await page.locator('.pt-line').first().waitFor();
  const onTop = await page.locator('.player-close').evaluate(el => {
    const r = el.getBoundingClientRect();
    return document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2) === el;
  });
  assert.equal(onTop, true, 'Copilot sidebar must not cover the source dialog');
  await page.screenshot({ path: '/tmp/hindsight-player-above-agent.png' });
  await page.getByRole('button', { name: '✕', exact: true }).click();
  assert.equal(await page.locator('#player').isVisible(), false);
  console.log('PASS: receipt dialog remains operable above the open agent sidebar.');
} finally {
  await browser.close();
}
