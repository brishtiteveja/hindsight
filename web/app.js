/* Hindsight — the YouTube narrative map. Zero-build vanilla JS.
   All fetches are RELATIVE so the app works at / and at /hindsight/. */

const $ = (id) => document.getElementById(id);
const api = (path) => fetch(path).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));

let CH = null;           // current channel slug
let TOPICS = [];         // coverage cache for the current channel
const PALETTE = ["#f0b243","#7fd6a4","#c9a7f5","#ff7b66","#8fb7de",
                 "#ffd98a","#d68fb0","#9be0dd","#b5c98f","#e0a67a"];

/* ── routing ── */
let BROWSE = null;   // cached /v1/browse payload

function go(view, slug) {
  for (const v of ["home", "map", "channel", "collection", "galaxy", "cut", "ledger", "targets", "liars", "onboard"])
    $("view-" + v).hidden = view !== v;
  document.querySelectorAll(".top-nav [data-nav]").forEach((b) =>
    b.classList.toggle("on", b.dataset.nav === view));
  document.getElementById("nav-drop")?.classList.remove("open");
  window.scrollTo(0, 0);
  window.hsInvestigation = null;
  if (view !== "channel") { CH = null; window.hsContext && hsBroadcast(); }
  if (view === "map") { loadMap(); loadPipeline(); }
  if (view === "channel") loadChannel(slug);
  if (view === "home") loadHomeGalaxy();
  if (view === "galaxy") return loadGalaxy();
  if (view === "cut") { fillCutPicker(); if (!CUT) { renderCutPresets(); loadCut(0); } }
  if (view === "ledger") loadLedger();
  if (view === "targets") loadTargets();
  if (view === "liars") loadLiars();
}

/* ── front page: shelves of channels by lean, domain, and issue ── */
async function loadMap() {
  const box = $("shelves");
  if (BROWSE) return renderShelves(BROWSE);
  try {
    BROWSE = await api("v1/browse");
    if (!BROWSE.channels.length) {
      box.innerHTML = `<div class="map-loading">No channels indexed yet — ingest captions with
        <code>hindsight ingest ./captions --channel "Name"</code></div>`;
      return;
    }
    renderShelves(BROWSE);
  } catch (e) {
    box.innerHTML = `<div class="map-loading">API unreachable (${e})</div>`;
  }
}

function renderShelves(b) {
  const rows = [];

  // 1. every channel, largest corpus first
  const all = [...b.channels].sort((x, y) => y.total_videos - x.total_videos);
  rows.push(shelf("Every channel on the map", "", all.map(channelTile).join("")));

  // 2. by political lean
  for (const l of b.leans) {
    const hits = b.channels.filter((c) => c.lean === l.key);
    if (hits.length) rows.push(shelf(l.label, "", hits.map(channelTile).join(""), l.hue));
  }

  // 3. by domain facet — poster tiles that open a collection
  rows.push(shelf("By domain", "the lens a channel looks through",
    b.facets.map((f) => posterTile(f, "facet",
      b.channels.filter((c) => (c.facets || {})[f.key])).outerHTML || "").join("")));

  // 4. by issue — the big taxonomy
  const withCounts = b.issues.map((i) => ({
    ...i, n: b.channels.filter((c) => (c.issues || {})[i.key]).length }));
  const live = withCounts.filter((i) => i.n).sort((a, c) => c.n - a.n);
  const rest = withCounts.filter((i) => !i.n);
  rows.push(shelf("By issue", `${live.length} issues covered across the map`,
    [...live, ...rest].map((i) =>
      posterTile(i, "issue", b.channels.filter((c) => (c.issues || {})[i.key])).outerHTML).join("")));

  $("shelves").innerHTML = rows.join("");
}

function shelf(title, sub, inner, hue) {
  return `<section class="shelf">
    <div class="shelf-head">
      ${hue ? `<span class="shelf-dot" style="background:${hue}"></span>` : ""}
      <h2>${title}</h2>${sub ? `<span class="shelf-sub">${sub}</span>` : ""}
    </div>
    <div class="rail">${inner}</div>
  </section>`;
}

function channelTile(c) {
  const chips = (c.top_topics || []).slice(0, 3).map((t) =>
    `<span class="chip ${t.stance}">${t.topic.replace(/_/g, " ")}</span>`).join("");
  const span = c.date_range?.length ? `${c.date_range[0].slice(0,4)}–${c.date_range[1].slice(0,4)}` : "";
  return `<div class="tile chan" onclick="go('channel','${c.slug}')">
    ${c.poster ? `<div class="tile-art" style="background-image:url('${c.poster}')"></div>` : `<div class="tile-art ph"></div>`}
    <div class="tile-body">
      <h3>${esc(c.name)}</h3>
      <div class="tile-meta">${c.total_videos} videos${span ? " · " + span : ""}</div>
      <div class="tile-chips">${chips}</div>
    </div></div>`;
}

function posterTile(item, kind, hits) {
  const el = document.createElement("div");
  el.className = "tile poster" + (hits.length ? "" : " empty");
  el.setAttribute("onclick", `openCollection('${kind}','${item.key}')`);
  // Cover = a mosaic of real frames from clips tagged to this issue; the
  // generated SVG is the fallback when nothing is tagged yet.
  const tiles = (item.tiles || []).slice(0, 6);
  const art = tiles.length
    ? `<div class="poster-mosaic">${tiles.map((t) =>
        `<img src="${t.thumb}" alt="" loading="lazy" title="${esc(t.title)}"/>`).join("")}</div>`
    : `<div class="tile-art" style="background-image:url('${item.image}')"></div>`;
  el.innerHTML = `${art}
    <div class="poster-wash" style="background:linear-gradient(0deg, #0c0b09f2 8%, ${item.hue}26 55%, transparent 100%)"></div>
    <div class="poster-body">
      <h3>${item.label}</h3>
      <div class="tile-meta">${hits.length ? `${hits.length} channel${hits.length > 1 ? "s" : ""}` : "no coverage yet"}</div>
    </div>
    <span class="poster-edge" style="background:${item.hue}"></span>`;
  return el;
}

/* ── collection view: one issue / facet / lean ── */
let COLL = null;   // {kind, key, meta}

function openCollection(kind, key) {
  const b = BROWSE;
  const src = kind === "issue" ? b.issues : b.facets;
  const meta = src.find((x) => x.key === key);
  if (!meta) return;
  COLL = { kind, key, meta };
  const hits = b.channels
    .filter((c) => (kind === "issue" ? c.issues : c.facets)[key])
    .sort((x, y) => ((kind === "issue" ? y.issues : y.facets)[key] || 0) -
                    ((kind === "issue" ? x.issues : x.facets)[key] || 0));

  $("coll-hero").style.backgroundImage =
    `linear-gradient(180deg, #0c0b09cc, #0c0b09), url('${meta.image}')`;
  $("coll-title").textContent = meta.label;
  $("coll-title").style.color = meta.hue;
  $("coll-sub").textContent = hits.length
    ? `${hits.length} channel${hits.length > 1 ? "s" : ""} covering this`
    : "No channel on the map covers this yet.";
  $("coll-issues").innerHTML = (meta.issues || [])
    .map((i) => `<span class="chip">${i}</span>`).join("");
  $("coll-grid").innerHTML = hits.map(channelTile).join("");
  // the evidence timeline only exists for issues
  $("coll-tabs").hidden = kind !== "issue";
  setCollTab("channels");
  go("collection");
}

function setCollTab(tab) {
  document.querySelectorAll("#coll-tabs button").forEach((b) =>
    b.classList.toggle("on", b.dataset.ctab === tab));
  $("coll-grid").hidden = tab !== "channels";
  $("coll-timeline").hidden = tab !== "timeline";
  if (tab === "timeline") renderTimeline();
}

/* ── evidence timeline: every position taken on an issue, with the receipt ── */
const STANCE_HUE = { supportive: "#7fd6a4", neutral: "#56503f",
                     mixed: "#c9a7f5", critical: "#ff7b66" };

async function renderTimeline() {
  if (!COLL || COLL.kind !== "issue") return;
  const track = $("tl-track");
  track.innerHTML = `<div class="map-loading">gathering the evidence…</div>`;
  let d;
  try { d = await api(`v1/issues/${COLL.key}/timeline?limit=80`); }
  catch { track.innerHTML = `<div class="map-loading">Could not load the timeline.</div>`; return; }

  const total = d.total || 0;
  const order = ["supportive", "neutral", "mixed", "critical"];
  const bar = (counts, n) => order.filter((s) => counts[s]).map((s) =>
    `<i style="width:${100 * counts[s] / n}%;background:${STANCE_HUE[s]}" title="${s}: ${counts[s]}"></i>`).join("");

  // how each side of the spectrum frames the same issue
  const sides = ["left", "center", "right"].filter((l) => d.by_lean?.[l]);
  const sideRows = sides.map((l) => {
    const c = d.by_lean[l], n = Object.values(c).reduce((a, b) => a + b, 0);
    return `<div class="tl-side">
      <span class="tl-side-name">${l}</span>
      <span class="tl-side-bar">${bar(c, n)}</span>
      <span class="tl-side-n">${n}</span></div>`;
  }).join("");

  $("tl-summary").innerHTML = `
    <div class="tl-count"><b>${total}</b> position${total === 1 ? "" : "s"} taken
      across <b>${d.channels}</b> channel${d.channels === 1 ? "" : "s"}
      ${d.events.length < total ? `· showing the latest ${d.events.length}` : ""}</div>
    <div class="tl-bar">${bar(d.stances, total)}</div>
    <div class="tl-key">${order.filter((s) => d.stances[s]).map((s) =>
      `<span><i style="background:${STANCE_HUE[s]}"></i>${s} ${d.stances[s]}</span>`).join("")}</div>
    ${sides.length > 1 ? `<div class="tl-sides">
      <div class="tl-sides-head">How each side frames it</div>${sideRows}</div>` : ""}`;

  if (!d.events.length) { track.innerHTML = `<div class="map-loading">No evidence yet.</div>`; return; }

  let lastYear = "";
  track.innerHTML = d.events.map((e) => {
    const year = e.date.slice(0, 4);
    const marker = year !== lastYear ? `<div class="tl-year">${year}</div>` : "";
    lastYear = year;
    return marker + `
      <div class="tl-item" onclick="play('${e.video_id}',${e.t},'${esc(e.title).replace(/'/g, "\\'")}')">
        <div class="tl-rail"><span class="tl-dot" style="background:${STANCE_HUE[e.stance]}"></span></div>
        <img class="tl-thumb" src="${e.thumb}" alt="" loading="lazy"/>
        <div class="tl-body">
          <div class="tl-meta">
            <span class="tl-date">${e.date}</span>
            <span class="tl-chan">${esc(e.channel)}</span>
            <span class="chip ${e.stance}">${e.stance}</span>
            <span class="tl-t">▶ ${fmtT(e.t)}</span>
          </div>
          <div class="tl-title">${esc(e.title)}</div>
          ${e.summary ? `<div class="tl-sum">${esc(e.summary)}</div>` : ""}
        </div>
      </div>`;
  }).join("");
}

/* ── channel view ── */
async function loadChannel(slug) {
  CH = slug;
  window.hsContext && hsBroadcast();   // tell the agent which channel is open
  $("chat-log").innerHTML = $("chat-log").innerHTML; // keep hint node
  resetChat();
  const p = await api(`v1/channels/${slug}/persona`).catch(() => null);
  renderPersona(p || { channel: slug, total_videos: 0, top_topics: [], recent_narratives: [] });
  TOPICS = (await api(`v1/channels/${slug}/topics`).catch(() => ({ topics: [] }))).topics;
  fillTopicSelect($("evo-topic"));
  fillTopicSelect($("prism-topic"));
  renderSuggestions(p);
  renderEvolution(); renderCoverage(); renderPrism(); renderRiver(); renderReceipts();
  setLens("chat");
}

function renderPersona(p) {
  const max = Math.max(...(p.top_topics || []).map((t) => t.count), 1);
  $("persona-card").innerHTML = `
    <div class="pc-head">
      ${p.poster ? `<img class="pc-avatar" src="${p.poster}" alt=""/>` : `<span class="pc-avatar ph"></span>`}
      <div><h2>${p.channel}</h2>
      <div class="pc-span">${p.total_videos} videos${p.date_range?.length ? ` · ${p.date_range[0]} → ${p.date_range[1]}` : ""}</div></div>
    </div>
    <div class="pc-stat">Speaks most about</div>
    <div class="pc-topics">${(p.top_topics || []).slice(0, 6).map((t) => `
      <div class="pc-topic">
        <span class="bar" style="width:${Math.round(56 * t.count / max) + 8}px"></span>
        <span class="t-name">${t.topic.replace(/_/g, " ")}</span>
        <span class="chip ${t.stance}">${t.stance}</span>
      </div>`).join("")}</div>
    <div class="pc-narr">${(p.recent_narratives || []).slice(0, 3).map((n) => `
      <div class="n-item"><b>${n.date}</b> — ${n.text}</div>`).join("")}</div>`;
}

function renderSuggestions(p) {
  const qs = [];
  for (const t of (p?.top_topics || []).slice(0, 3))
    qs.push(`What has this channel said about ${t.topic.replace(/_/g, " ")}?`);
  qs.push("How has this channel's framing changed over time?");
  $("chat-suggestions").innerHTML = qs.map((q) =>
    `<span class="chip" onclick="askSuggested(this.textContent)">${q}</span>`).join("");
}

/* ── lenses ── */
document.addEventListener("click", (e) => {
  const b = e.target.closest("#lens-nav button");
  if (b) setLens(b.dataset.lens);
});
function setLens(name) {
  document.querySelectorAll("#lens-nav button").forEach((b) =>
    b.classList.toggle("on", b.dataset.lens === name));
  document.querySelectorAll(".lens").forEach((l) => (l.hidden = l.id !== `lens-${name}`));
  if (name === "ideas") renderIdeas();
  if (name === "clips") renderClipSuggest();
  if (name === "studio") renderStudio();
}

/* ── chat ── */
function resetChat() {
  $("chat-log").innerHTML = `<div class="chat-hint">
    <div class="hint-title">Ask this channel anything about itself.</div>
    <div id="chat-suggestions" class="hint-chips"></div></div>`;
}
function askSuggested(q) { $("chat-input").value = q; sendChat(); }
async function sendChat(ev) {
  if (ev) ev.preventDefault();
  const q = $("chat-input").value.trim();
  if (!q || !CH) return false;
  $("chat-input").value = "";
  const hint = document.querySelector(".chat-hint");
  if (hint) hint.remove();
  const log = $("chat-log");
  log.insertAdjacentHTML("beforeend", `<div class="msg you">${esc(q)}</div>`);
  const bot = document.createElement("div");
  bot.className = "msg bot";
  log.appendChild(bot); log.scrollTop = log.scrollHeight;
  const pg = progressInto(bot, [
    "embedding your question…",
    "searching the catalogue…",
    "reading the closest clips…",
    "writing a grounded answer…",
    "resolving the timestamps…",
  ], 1);
  try {
    const r = await fetch(`v1/channels/${CH}/ask`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q }),
    }).then((r) => r.json());
    pg.done();
    bot.innerHTML = `<div class="answer">${esc(r.answer)}</div>
      <div class="cites">${(r.citations || []).slice(0, 6).map((c) => `
        <button class="cite" onclick="play('${c.video_id}',${c.t || 0},'${esc(c.title).replace(/'/g, "\\'")}')">
          <img class="cite-thumb" src="${c.frame_url || thumb(c.video_id)}" alt="" loading="lazy"/>
          <span class="play">▶</span><span class="c-title">${esc(c.title || c.video_id)}</span>
          <span class="c-t">${c.date || ""}${c.t ? " · " + fmtT(c.t) : ""}</span></button>`).join("")}</div>`;
  } catch {
    pg.done();
    bot.innerHTML = `<div class="answer">The archive didn't answer — is the channel indexed?</div>`;
  }
  log.scrollTop = log.scrollHeight;
  return false;
}
const esc = (s) => (s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmtT = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
const thumb = (id) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;

/* ── inline player + synced transcript ──
   The YouTube IFrame API gives us seek + playback time, so the transcript can
   follow along and any line can jump the video. */
let YT_READY = false, ytPlayer = null, ytTimer = null;
let PT_SEGS = [], PT_FOLLOW = true, PT_ACTIVE = -1;
window.onYouTubeIframeAPIReady = () => { YT_READY = true; };

async function play(videoId, seconds, title) {
  const t = Math.max(0, parseInt(seconds || 0, 10));
  $("player-title").textContent = title || "";
  $("player-open").href = `https://www.youtube.com/watch?v=${videoId}&t=${t}s`;
  $("player").hidden = false;
  document.body.style.overflow = "hidden";
  mountPlayer(videoId, t);
  loadTranscript(videoId, t);
}

function mountPlayer(videoId, t) {
  $("player-mount").innerHTML = `<div id="yt-target"></div>`;
  const build = () => {
    ytPlayer = new YT.Player("yt-target", {
      videoId, playerVars: { start: t, autoplay: 1, rel: 0, modestbranding: 1 },
      host: "https://www.youtube-nocookie.com",
      events: { onReady: () => startTracking() },
    });
  };
  if (YT_READY && window.YT && YT.Player) build();
  else {
    // API still loading — poll briefly, then fall back to a plain iframe.
    let tries = 0;
    const iv = setInterval(() => {
      if (window.YT && YT.Player) { clearInterval(iv); build(); }
      else if (++tries > 40) {
        clearInterval(iv);
        $("player-mount").innerHTML =
          `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?start=${t}&autoplay=1&rel=0"
             allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      }
    }, 100);
  }
}

function startTracking() {
  clearInterval(ytTimer);
  ytTimer = setInterval(() => {
    if (!ytPlayer || !ytPlayer.getCurrentTime) return;
    highlightAt(ytPlayer.getCurrentTime());
  }, 500);
}

function seekTo(sec) {
  if (ytPlayer && ytPlayer.seekTo) { ytPlayer.seekTo(sec, true); ytPlayer.playVideo(); }
  else window.open($("player-open").href, "_blank");
}

async function loadTranscript(videoId, t) {
  const box = $("pt-lines");
  box.innerHTML = `<div class="pt-empty">loading transcript…</div>`;
  PT_SEGS = [];
  try {
    const doc = await api(`v1/channels/${CH}/transcripts/${videoId}`);
    PT_SEGS = doc.segments || [];
    if (!PT_SEGS.length) { box.innerHTML = `<div class="pt-empty">No transcript stored.</div>`; return; }
    box.innerHTML = PT_SEGS.map((s, i) =>
      `<div class="pt-line" data-i="${i}" onclick="seekTo(${Math.floor(s.start)})">
         <span class="pt-t">${fmtT(Math.floor(s.start))}</span>
         <span class="pt-x">${esc(s.text)}</span></div>`).join("");
    highlightAt(t);
  } catch {
    box.innerHTML = `<div class="pt-empty">No transcript stored for this video.</div>`;
  }
}

function highlightAt(sec) {
  if (!PT_SEGS.length) return;
  let idx = 0;
  for (let i = 0; i < PT_SEGS.length; i++) { if (PT_SEGS[i].start <= sec) idx = i; else break; }
  if (idx === PT_ACTIVE) return;
  PT_ACTIVE = idx;
  const box = $("pt-lines");
  box.querySelectorAll(".pt-line.on").forEach((el) => el.classList.remove("on"));
  const el = box.querySelector(`.pt-line[data-i="${idx}"]`);
  if (el) {
    el.classList.add("on");
    if (PT_FOLLOW) box.scrollTop = el.offsetTop - box.clientHeight / 2.5;
  }
}

function toggleFollow() {
  PT_FOLLOW = !PT_FOLLOW;
  $("pt-follow").classList.toggle("on", PT_FOLLOW);
}

function filterTranscript() {
  const q = $("pt-search").value.trim().toLowerCase();
  $("pt-lines").querySelectorAll(".pt-line").forEach((el) => {
    el.hidden = q ? !el.textContent.toLowerCase().includes(q) : false;
  });
}

function closePlayer() {
  clearInterval(ytTimer);
  if (ytPlayer && ytPlayer.destroy) { try { ytPlayer.destroy(); } catch {} }
  ytPlayer = null; PT_SEGS = []; PT_ACTIVE = -1;
  $("player-mount").innerHTML = "";
  $("pt-lines").innerHTML = "";
  $("pt-search").value = "";
  $("player").hidden = true;
  document.body.style.overflow = "";
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePlayer(); });

/* ── evolution lens ── */
function fillTopicSelect(sel) {
  sel.innerHTML = TOPICS.slice(0, 20).map((t) =>
    `<option value="${t.topic}">${t.topic.replace(/_/g, " ")} (${t.mentions})</option>`).join("");
}
const STANCE_Y = { supportive: 0, neutral: 1, mixed: 1, critical: 2 };
async function renderEvolution() {
  const topic = $("evo-topic").value;
  if (!topic || !CH) { $("evo-chart").innerHTML = ""; return; }
  const tl = await api(`v1/channels/${CH}/timeline?topic=${encodeURIComponent(topic)}`).catch(() => null);
  if (!tl || !tl.points.length) { $("evo-chart").innerHTML = "<em>no data</em>"; return; }
  const W = Math.max(600, $("evo-chart").clientWidth - 30), H = 200, P = 34;
  const pts = tl.points.filter((p) => p.date);
  const xs = pts.map((_, i) => P + (W - 2 * P) * (i / Math.max(pts.length - 1, 1)));
  const ys = pts.map((p) => P + (H - 2 * P) * (STANCE_Y[p.stance] ?? 1) / 2);
  let path = "";
  xs.forEach((x, i) => { path += (i ? "L" : "M") + x + "," + ys[i]; });
  const dots = pts.map((p, i) =>
    `<circle cx="${xs[i]}" cy="${ys[i]}" r="3.2" fill="${p.stance === "supportive" ? "#7fd6a4" : p.stance === "critical" ? "#ff7b66" : "#c9a7f5"}">
       <title>${p.date} · ${esc(p.title)}</title></circle>`).join("");
  $("evo-chart").innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%">
    ${["supportive","neutral / mixed","critical"].map((lab, i) => {
      const y = P + (H - 2 * P) * i / 2;
      return `<line x1="${P}" y1="${y}" x2="${W - P}" y2="${y}" stroke="#2b2620" stroke-dasharray="3 5"/>
              <text x="4" y="${y + 3}">${lab}</text>`; }).join("")}
    <path d="${path}" fill="none" stroke="#f0b243" stroke-width="1.6" opacity=".8"/>
    ${dots}
    <text x="${P}" y="${H - 6}">${pts[0].date}</text>
    <text x="${W - P - 60}" y="${H - 6}">${pts[pts.length - 1].date}</text>
  </svg>`;
  $("evo-shifts").innerHTML = (tl.shifts || []).slice(-8).reverse().map((s) => `
    <div class="shift-item">
      <span class="s-date">${s.from_date} → ${s.to_date}</span>
      <span class="s-move"><span class="s-from">${s.from}</span> → <b class="s-to ${s.to}">${s.to}</b>
        · ${esc(s.title)}</span>
    </div>`).join("");
}

/* ── coverage lens ── */
function renderCoverage() {
  $("coverage-grid").innerHTML = TOPICS.slice(0, 24).map((t) => {
    const st = t.stances || {}, tot = Math.max(Object.values(st).reduce((a, b) => a + b, 0), 1);
    const seg = (k, cls) => st[k] ? `<i class="${cls}" style="width:${100 * st[k] / tot}%"></i>` : "";
    return `<div class="cov-card">
      <h4>${t.topic.replace(/_/g, " ")}</h4>
      <div class="cov-meta"><span>${t.mentions}×</span><span>${t.first?.slice(0,7)} → ${t.last?.slice(0,7)}</span>
        <span class="badge ${t.status}">${t.status.toUpperCase()}</span></div>
      <div class="cov-bar">${seg("supportive","sup")}${seg("neutral","neu")}${seg("mixed","mixx")}${seg("critical","crit")}</div>
    </div>`; }).join("");
}

/* ── prism lens ── */
async function renderPrism() {
  const topic = $("prism-topic").value;
  if (!topic || !CH) { $("prism-cols").innerHTML = ""; return; }
  const pr = await api(`v1/channels/${CH}/prism?topic=${encodeURIComponent(topic)}`).catch(() => null);
  if (!pr) return;
  const order = ["supportive", "neutral", "mixed", "critical"];
  $("prism-cols").innerHTML = order.map((s) => {
    const items = (pr.buckets[s] || []).slice(0, 12);
    return `<div class="prism-col ${s}"><h4>${s} · ${(pr.buckets[s] || []).length}</h4>
      ${items.map((v) => `<div class="prism-item"
           onclick="play('${v.video_id}',0,'${esc(v.title).replace(/'/g, "\\'")}')">
         <img class="p-thumb" src="${thumb(v.video_id)}" alt="" loading="lazy"/>
         <div><div class="p-title">${esc(v.title)}</div>
         <div class="p-date">${v.date}</div></div></div>`).join("")}</div>`; }).join("");
}

/* ── river lens ── */
async function renderRiver() {
  const rv = await api(`v1/channels/${CH}/river`).catch(() => null);
  if (!rv || !rv.months.length) { $("river-chart").innerHTML = "<em>no data</em>"; return; }
  const names = Object.keys(rv.series);
  const W = Math.max(700, $("river-chart").clientWidth - 30), H = 260, P = 28;
  const n = rv.months.length;
  const totals = rv.months.map((_, i) => names.reduce((a, t) => a + rv.series[t][i], 0));
  const maxT = Math.max(...totals, 1);
  const X = (i) => P + (W - 2 * P) * (i / Math.max(n - 1, 1));
  // stacked stream centered on the midline
  let base = rv.months.map(() => 0);
  const layers = names.map((t, li) => {
    const vals = rv.series[t];
    const top = base.map((b, i) => b + vals[i]);
    const scale = (v) => (H - 2 * P) * v / maxT;
    const mid = H / 2;
    let d = "";
    top.forEach((v, i) => { d += (i ? "L" : "M") + X(i) + "," + (mid - scale(v - totals[i] / 2)); });
    for (let i = n - 1; i >= 0; i--) d += "L" + X(i) + "," + (mid - scale(base[i] - totals[i] / 2));
    base = top;
    return `<path d="${d}Z" fill="${PALETTE[li % PALETTE.length]}" opacity=".78"><title>${t}</title></path>`;
  });
  const ticks = rv.months.filter((_, i) => i % Math.ceil(n / 8) === 0)
    .map((m) => `<text x="${X(rv.months.indexOf(m))}" y="${H - 6}">${m}</text>`).join("");
  $("river-chart").innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%">${layers.join("")}${ticks}</svg>`;
  $("river-legend").innerHTML = names.map((t, i) =>
    `<span class="lg"><span class="sw" style="background:${PALETTE[i % PALETTE.length]}"></span>${t.replace(/_/g," ")}</span>`).join("");
}

/* ── receipts lens ── */
async function renderReceipts() {
  const box = $("receipts-list");
  try {
    const r = await api(`v1/channels/${CH}/contradictions`);
    if (!r.contradictions.length) {
      box.innerHTML = `<div class="receipts-empty">No contradictions found in this corpus.</div>`;
      return;
    }
    box.innerHTML = r.contradictions.map((c) => `
      <div class="receipt">
        ${["claim_a", "claim_b"].map((k) => { const s = c[k]; return `
          <div class="r-side">
            <div class="r-date">${s.date} · ${esc(s.actor || "")}</div>
            <div class="r-claim">${esc(s.text)}</div>
            ${s.quote ? `<div class="r-quote">"${esc(s.quote)}"</div>` : ""}
            <button class="r-link" onclick="play('${s.video_id}',0,'${esc(s.title).replace(/'/g, "\\'")}')">
              <img class="r-thumb" src="${s.frame_url || thumb(s.video_id)}" alt="" loading="lazy"/>
              <span>▶ ${esc(s.title)}</span></button>
          </div>`; }).join(`<div class="r-vs">vs</div>`)}
        <div class="r-why">${esc(c.explanation)}</div>
      </div>`).join("");
  } catch {
    box.innerHTML = `<div class="receipts-empty">Not computed yet.
      <button onclick="computeReceipts()">Find the receipts</button></div>`;
  }
}
async function computeReceipts() {
  const pg = progressInto($("receipts-list"), [
    "collecting every claim the channel ever made…",
    "embedding the claims…",
    "pairing same-topic claims 30+ days apart…",
    "judging each pair for contradiction…",
    "this one genuinely takes a while — worth it…",
  ], 2);
  await fetch(`v1/channels/${CH}/contradictions`, { method: "POST" }).catch(() => {});
  pg.done();
  renderReceipts();
}

/* boot moved to end of file */

/* ── Idea Hub ── */
const GAP_LABEL = {
  never_covered: "never covered", gone_cold: "gone cold",
  stance_unresolved: "unresolved flip", market_surge: "market surge",
};

async function renderIdeas() {
  const box = $("ideas-list");
  box.innerHTML = `<div class="map-loading">checking for saved ideas…</div>`;
  let d;
  try { d = await api(`v1/channels/${CH}/ideas`); }
  catch {
    box.innerHTML = `<div class="ideas-empty">No ideas generated yet.
      <button class="mini-btn" onclick="makeIdeas()">Generate ideas</button></div>`;
    return;
  }
  paintIdeas(d);
}

function paintIdeas(d) {
  const box = $("ideas-list");
  if (!d.ideas?.length) {
    box.innerHTML = `<div class="ideas-empty">${esc(d.error || "No ideas yet.")}
      <button class="mini-btn" onclick="makeIdeas()">Generate</button></div>`;
    return;
  }
  box.innerHTML = d.ideas.map((i) => `
    <div class="idea">
      <div class="idea-head">
        <span class="idea-gap ${i.gap_type}">${GAP_LABEL[i.gap_type] || i.gap_type}</span>
        ${i.confidence != null ? `<span class="idea-conf">${Math.round(i.confidence * 100)}%</span>` : ""}
      </div>
      <h3>${esc(i.title_pitch)}</h3>
      <p class="idea-angle">${esc(i.angle)}</p>
      <div class="idea-why"><b>Why now</b> — ${esc(i.why_now)}</div>
      ${evidenceRow("Your history", i.your_history)}
      ${evidenceRow("Across the map", i.market_evidence)}
    </div>`).join("");
}

function evidenceRow(label, items) {
  if (!items?.length) return "";
  return `<div class="idea-ev"><span class="ev-label">${label}</span>
    <div class="ev-strip">${items.map((v) => `
      <button class="ev-clip" onclick="play('${v.video_id}',0,'${esc(v.title).replace(/'/g, "\\'")}')">
        <img src="${v.thumb || thumb(v.video_id)}" alt="" loading="lazy"/>
        <span>${esc(v.title).slice(0, 40)}</span>
      </button>`).join("")}</div></div>`;
}

async function makeIdeas() {
  const box = $("ideas-list");
  const pg = progressInto(box, [
    "reading your coverage map…",
    `scanning ${BROWSE?.channels.length || 108} channels for momentum…`,
    "hunting unresolved stance flips…",
    "pitching ideas in your voice…",
    "attaching the evidence clips…",
  ], 3);
  try {
    const d = await postJSON(`v1/channels/${CH}/ideas`, {});
    pg.done();
    paintIdeas(d);
  } catch {
    pg.done();
    box.innerHTML = `<div class="ideas-empty">Generation failed — try again.</div>`;
  }
}

const postJSON = (url, body) =>
  fetch(url, { method: "POST", headers: { "Content-Type": "application/json" },
               body: JSON.stringify(body) }).then(async (r) => {
    if (!r.ok) throw new Error(`Request failed (${r.status})`);
    return r.json();
  });

/* ── Pre-flight ── */
const VERDICT_LABEL = {
  contradiction: "reversal",
  // Deliberately not "reversal": the earlier claim clashes, but the analyzer
  // could not establish who said it, and on an interview channel that is often
  // a guest. Saying the creator reversed themselves would be unfounded.
  archive_conflict: "conflicts with archive",
  drift: "drift", consistent: "consistent", new: "new ground",
};

async function runPrecheck() {
  const script = $("pf-script").value.trim();
  const channel = CH;
  if (!channel || script.length < 60) {
    const reason = !channel ? "select a channel first" : "paste a longer draft";
    $("pf-status").textContent = reason;
    return { ok: false, reason };
  }
  $("pf-status").textContent = "";
  const pg = progressInto($("pf-results"), [
    "extracting the claims your draft makes…",
    "matching each against everything you've said…",
    "judging: consistent, drift, or reversal…",
    "collecting the receipts and timestamps…",
  ], 3);
  let d;
  try {
    d = await postJSON(`v1/channels/${channel}/precheck`, { script });
    if (d.error || !Array.isArray(d.claims)) throw new Error(d.error || "Invalid check response");
  } catch (e) {
    pg.done();
    $("pf-results").innerHTML = "";
    $("pf-status").textContent = "Check failed. Your draft is still here; try again.";
    return { ok: false, reason: e.message || "check failed" };
  }
  pg.done();
  if (CH !== channel || $("pf-script").value.trim() !== script) {
    $("pf-results").innerHTML = "";
    $("pf-status").textContent = "The draft or channel changed. Check the current draft again.";
    return { ok: false, reason: "draft or channel changed during check" };
  }

  const s = d.summary || {};
  $("pf-status").innerHTML = Object.keys(s).length
    ? Object.entries(s).map(([k, n]) =>
        `<span class="pf-pill ${k}">${n} ${VERDICT_LABEL[k] || k}</span>`).join("")
    : "no checkable claims found";

  $("pf-results").innerHTML = (d.claims || []).map((c) => `
    <div class="pf-claim ${c.verdict}" data-verdict="${c.verdict}">
      <div class="pf-verdict ${c.verdict}">${VERDICT_LABEL[c.verdict] || c.verdict}</div>
      <div class="pf-body">
        <div class="pf-text">${esc(c.text)}</div>
        ${(c.past || []).map((p) => `
          <div class="pf-past">
            <span class="pf-past-date">${p.date}</span>
            <span class="pf-speaker ${p.attribution || "unverified"}">${
              p.attribution === "named" ? esc(p.speaker) : "speaker unverified"}</span>
            <span class="pf-past-text">"${esc(p.text)}"</span>
            <button class="pf-play" onclick="play('${p.video_id}',${p.t},'${esc(p.title).replace(/'/g, "\\'")}')">
              ▶ ${fmtT(p.t)}</button>
            ${p.why ? `<div class="pf-why">${esc(p.why)}</div>` : ""}
          </div>`).join("")}
      </div>
    </div>`).join("");
  return { ok: true, result: d, channel, draft_chars: script.length };
}

/* ── Clip finder ── */
const CLIP_SUGGEST = ["my hottest takes", "moments people argued about",
                      "the clearest explanation I gave", "where I made a prediction"];

function renderClipSuggest() {
  $("clip-suggest").innerHTML = CLIP_SUGGEST.map((q) =>
    `<span class="chip" onclick="$('clip-q').value='${q}';findClips()">${q}</span>`).join("");
}

async function findClips(ev) {
  if (ev) ev.preventDefault();
  const q = $("clip-q").value.trim();
  if (!q) return false;
  const box = $("clip-results");
  const pg = progressInto(box, [
    "embedding your query…",
    "searching every video…",
    "scoring clipability — stance, quotability, hooks…",
    "cutting in/out timestamps…",
  ], 3);
  let d;
  try { d = await api(`v1/channels/${CH}/clips?q=${encodeURIComponent(q)}`); pg.done(); }
  catch { pg.done(); box.innerHTML = `<div class="map-loading">search failed.</div>`; return false; }
  if (!d.clips?.length) { box.innerHTML = `<div class="map-loading">nothing clippable found.</div>`; return false; }
  box.innerHTML = d.clips.map((c) => `
    <div class="clip-card">
      <button class="clip-thumb" onclick="play('${c.video_id}',${c.start},'${esc(c.title).replace(/'/g, "\\'")}')">
        <img src="${c.thumb}" alt="" loading="lazy"/>
        <span class="clip-range">${fmtT(c.start)}–${fmtT(c.end)}</span>
      </button>
      <div class="clip-body">
        <div class="clip-title">${esc(c.short_title)}</div>
        <div class="clip-hook">"${esc(c.hook)}"</div>
        <div class="clip-meta">
          <span>${esc(c.title).slice(0, 42)}</span><span class="clip-date">${c.date}</span>
          ${c.score != null ? `<span class="clip-score">${Math.round(c.score * 100)}</span>` : ""}
        </div>
        <button class="copy-btn" onclick="copyText(this, ${JSON.stringify(c.ffmpeg).replace(/"/g, "&quot;")})">copy cut command</button>
      </div>
    </div>`).join("");
  return false;
}

function copyText(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const old = btn.textContent; btn.textContent = "copied ✓";
    setTimeout(() => (btn.textContent = old), 1400);
  });
}

/* ── Metadata studio ── */
async function renderStudio() {
  const sel = $("studio-video");
  if (sel.options.length) return;
  const d = await api(`v1/channels/${CH}/transcripts`).catch(() => null);
  if (!d) return;
  sel.innerHTML = d.videos.slice(-40).reverse()
    .map((v) => `<option value="${v.video_id}">${esc(v.title).slice(0, 70)}</option>`).join("");
  loadMeta();
}

async function loadMeta(force) {
  const vid = $("studio-video").value;
  if (!vid) return;
  const box = $("studio-pack");
  const pg = progressInto(box, [
    "reading the transcript…",
    "drafting three title angles…",
    "writing the description…",
    "snapping chapters to real timestamps…",
    "picking tags from your vocabulary…",
  ], 4);
  let m;
  try { m = await api(`v1/channels/${CH}/videos/${vid}/metadata${force ? "?force=1" : ""}`); pg.done(); }
  catch { pg.done(); box.innerHTML = `<div class="map-loading">could not draft metadata.</div>`; return; }
  const desc = m.description || "";
  const chapters = (m.chapters || []).map((c) => `${c.stamp} ${c.label}`).join("\n");
  box.innerHTML = `
    <div class="sp-block"><div class="sp-head">Titles
      <button class="mini-btn" onclick="loadMeta(1)">redraft</button></div>
      ${(m.titles || []).map((t) => `
        <div class="sp-title"><span class="sp-style">${t.style}</span>
          <span>${esc(t.text)}</span>
          <button class="copy-btn" onclick="copyText(this, ${JSON.stringify(t.text).replace(/"/g, "&quot;")})">copy</button>
        </div>`).join("")}</div>
    <div class="sp-block"><div class="sp-head">Description
      <button class="copy-btn" onclick="copyText(this, ${JSON.stringify(desc).replace(/"/g, "&quot;")})">copy</button></div>
      <pre class="sp-pre">${esc(desc)}</pre></div>
    <div class="sp-block"><div class="sp-head">Chapters
      <button class="copy-btn" onclick="copyText(this, ${JSON.stringify(chapters).replace(/"/g, "&quot;")})">copy</button></div>
      ${(m.chapters || []).map((c) => `
        <div class="sp-chapter" onclick="play('${vid}',${c.t},'${esc(m.original_title || "").replace(/'/g, "\\'")}')">
          <span class="sp-stamp">${c.stamp}</span>${esc(c.label)}</div>`).join("")}</div>
    <div class="sp-block"><div class="sp-head">Tags
      <button class="copy-btn" onclick="copyText(this, ${JSON.stringify((m.tags || []).join(", ")).replace(/"/g, "&quot;")})">copy</button></div>
      <div class="sp-tags">${(m.tags || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div></div>
    <div class="sp-block"><div class="sp-head">Pinned comment</div>
      ${(m.pinned_comments || []).map((c) => `<div class="sp-pin">${esc(c)}
        <button class="copy-btn" onclick="copyText(this, ${JSON.stringify(c).replace(/"/g, "&quot;")})">copy</button></div>`).join("")}</div>`;
}

/* ── the pipeline hero: 4 stations, 2 layouts, live artifacts from /v1/showcase ── */
let SHOWCASE = null;

function setPipeLayout(mode) {
  const pipe = $("pipeline");
  pipe.classList.toggle("conveyor", mode === "conveyor");
  pipe.classList.toggle("steps", mode === "steps");
  $("pt-conveyor").classList.toggle("on", mode === "conveyor");
  $("pt-steps").classList.toggle("on", mode === "steps");
  localStorage.setItem("pipeLayout", mode);
}

function openStation(lens) {
  go("channel", SHOWCASE?.channel || "dwarkesh-patel");
  // wait for the channel view to load, then jump to the right lens
  setTimeout(() => setLens(lens), 1400);
}

async function loadPipeline() {
  setPipeLayout(localStorage.getItem("pipeLayout") || "conveyor");
  if (SHOWCASE) return;
  try { SHOWCASE = await api("v1/showcase"); }
  catch { $("pipe-stations").innerHTML = ""; return; }
  const s = SHOWCASE;

  const idea = s.idea || {};
  const pf = s.precheck || {}, hit = pf.example || {}, past = (hit.past || [])[0] || {};
  const clip = s.clip || {};
  const meta = s.metadata || {}, titles = meta.titles || [];

  $("pipe-stations").innerHTML = `
    <div class="station" onclick="openStation('ideas')">
      <div class="st-step">01</div>
      <div class="st-name">💡 Ideate</div>
      <div class="st-ask">"what should I make?"</div>
      <div class="st-art">
        <span class="idea-gap ${idea.gap_type || ""}">${GAP_LABEL[idea.gap_type] || "idea"}</span>
        <div class="st-idea-title">${esc(idea.title_pitch || "")}</div>
        <div class="st-small">${esc((idea.why_now || "").slice(0, 90))}…</div>
      </div>
      <div class="st-cta">Idea Hub →</div>
    </div>
    <div class="st-link"><span class="spark"></span>⇢</div>

    <div class="station" onclick="openStation('preflight')">
      <div class="st-step">02</div>
      <div class="st-name">✓ Write</div>
      <div class="st-ask">"will this burn me?"</div>
      <div class="st-art">
        <span class="pf-pill contradiction">⚡ ${(pf.summary || {}).contradiction || 0} reversals caught</span>
        <div class="st-vs">
          <div class="st-vs-side"><i>draft says</i>${esc((hit.text || "").slice(0, 74))}</div>
          <div class="st-vs-side"><i>you said · ${past.date || ""}</i>${esc((past.text || "").slice(0, 74))}</div>
        </div>
      </div>
      <div class="st-cta">Pre-flight →</div>
    </div>
    <div class="st-link"><span class="spark"></span>⇢</div>

    <div class="station" onclick="openStation('clips')">
      <div class="st-step">03</div>
      <div class="st-name">✂ Cut</div>
      <div class="st-ask">"where's the Short?"</div>
      <div class="st-art st-cliparea">
        ${clip.video_id ? `<img src="${clip.thumb || ''}" alt="" loading="lazy"/>` : ""}
        <div>
          <div class="st-idea-title">${esc(clip.short_title || "")}</div>
          <div class="st-small">"${esc((clip.hook || "").slice(0, 70))}"</div>
          <span class="clip-range-inline">${clip.start != null ? fmtT(clip.start) + "–" + fmtT(clip.end) : ""}</span>
        </div>
      </div>
      <div class="st-cta">Clip Finder →</div>
    </div>
    <div class="st-link"><span class="spark"></span>⇢</div>

    <div class="station" onclick="openStation('studio')">
      <div class="st-step">04</div>
      <div class="st-name">📦 Ship</div>
      <div class="st-ask">"package the upload"</div>
      <div class="st-art">
        ${titles.slice(0, 2).map((t) => `
          <div class="st-title-opt"><span class="sp-style">${t.style}</span>${esc(t.text).slice(0, 52)}</div>`).join("")}
        <div class="st-small">${(meta.chapters || []).length ? "+ chapters from real timestamps, tags, pinned comment" : ""}</div>
      </div>
      <div class="st-cta">Metadata Studio →</div>
    </div>`;

  observePipeFlow();
}

/* ── the flow: a spark walks the line, each station lights as it lands ──
   Runs once when the pipeline scrolls into view, replayable, pauses on hover,
   and stays still for anyone who asked for reduced motion. */
const FLOW_BEATS = [
  "Your catalogue shows a gap the market is surging on…",
  "…you draft it, and the past you gets checked against the new you…",
  "…the sharpest 45 seconds are already cut…",
  "…and the upload packages itself. Ship.",
];
let flowTimer = [], flowPlaying = false, flowSeen = false;

function clearFlow() {
  flowTimer.forEach(clearTimeout); flowTimer = [];
  document.querySelectorAll(".station").forEach((s) => s.classList.remove("lit", "done"));
  document.querySelectorAll(".st-link").forEach((l) => l.classList.remove("firing"));
  $("pipe-narrate")?.classList.remove("show");
  flowPlaying = false;
  $("pipe-replay")?.classList.remove("playing");
}

function runPipeFlow(force) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced && !force) return;
  clearFlow();
  const stations = [...document.querySelectorAll(".station")];
  const links = [...document.querySelectorAll(".st-link")];
  const narr = $("pipe-narrate");
  if (!stations.length) return;
  flowPlaying = true;
  $("pipe-replay")?.classList.add("playing");

  const at = (ms, fn) => flowTimer.push(setTimeout(fn, ms));
  let t = 260;
  stations.forEach((st, i) => {
    at(t, () => {
      stations.forEach((o, j) => { if (j < i) { o.classList.remove("lit"); o.classList.add("done"); } });
      st.classList.add("lit");
      if (narr) {
        narr.classList.remove("show");
        narr.querySelector("span").textContent = FLOW_BEATS[i] || "";
        requestAnimationFrame(() => narr.classList.add("show"));
      }
    });
    if (links[i]) at(t + 1080, () => {
      links[i].classList.add("firing");
      setTimeout(() => links[i].classList.remove("firing"), 700);
    });
    t += 1700;
  });
  at(t + 200, () => {
    stations.forEach((s) => { s.classList.remove("lit"); s.classList.add("done"); });
    flowPlaying = false;
    $("pipe-replay")?.classList.remove("playing");
    at(2200, () => { if (!flowPlaying) narr?.classList.remove("show"); });
  });
}

function observePipeFlow() {
  const pipe = $("pipeline");
  if (!pipe || flowSeen) return;
  pipe.addEventListener("mouseenter", () => { if (flowPlaying) clearFlow(); });
  if (!("IntersectionObserver" in window)) { runPipeFlow(); flowSeen = true; return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting && !flowSeen) {
        flowSeen = true;
        setTimeout(() => runPipeFlow(), 420);
        io.disconnect();
      }
    }
  }, { threshold: 0.35 });
  io.observe(pipe);
}

/* Boot after all three studio scripts have initialized. */
window.addEventListener("DOMContentLoaded", () => { go("home"); hsRenderStory(); });

/* ── What happened: the ledger ── */
let LEDGER = null;

function netTint(net) {
  // net -1 (piled on) … +1 (championed)
  if (net <= -0.45) return { bg: "#3d1a14", fg: "#ff9d7a", bd: "#55302a" };
  if (net <= -0.12) return { bg: "#33231a", fg: "#e0a67a", bd: "#4a3527" };
  if (net >= 0.35)  return { bg: "#14342a", fg: "#7fd6a4", bd: "#2c4a3a" };
  if (net >= 0.12)  return { bg: "#1e3028", fg: "#a8cfb4", bd: "#2c4a3a" };
  return { bg: "#24211b", fg: "#b8ad97", bd: "#2b2620" };
}

async function loadLedger() {
  if (LEDGER) return;
  const feed = $("ledger-feed");
  try { LEDGER = await api(`v1/ledger?days=${window.innerWidth < 720 ? 90 : 200}`); }
  catch { feed.innerHTML = `<div class="map-loading">could not open the ledger.</div>`; return; }

  let lastMonth = "";
  feed.innerHTML = LEDGER.days.map((day) => {
    const month = day.date.slice(0, 7);
    const divider = month !== lastMonth
      ? `<div class="lg-month">${new Date(day.date + "T00:00:00Z")
           .toLocaleDateString("en", { month: "long", year: "numeric", timeZone: "UTC" })}</div>`
      : "";
    lastMonth = month;
    const maxN = Math.max(...day.actors.map((a) => a.n), 1);
    const chips = day.actors.map((a) => {
      const t = netTint(a.net);
      const size = 11 + Math.round(7 * Math.sqrt(a.n / maxN));
      return `<button class="lg-actor" style="background:${t.bg};color:${t.fg};border-color:${t.bd};font-size:${size}px"
        onclick="openCluster(this,'${a.name.replace(/'/g, "\\'")}','${day.date}')"
        title="${a.n} mentions · ${a.channels} channels · net ${a.net > 0 ? "+" : ""}${a.net}">
        ${esc(a.name)}<b>${a.n}</b></button>`;
    }).join("");
    return divider + `
      <div class="lg-day" data-date="${day.date}">
        <div class="lg-datecol">
          <div class="lg-date">${day.date.slice(8)}</div>
          <div class="lg-dow">${new Date(day.date + "T00:00:00Z")
            .toLocaleDateString("en", { weekday: "short", timeZone: "UTC" })}</div>
          <div class="lg-vol">${day.videos}<span>vids</span></div>
        </div>
        <div class="lg-body">
          <div class="lg-headline" onclick="play('${day.headline_video}',0,'${esc(day.headline).replace(/'/g, "\\'")}')">
            ▸ ${esc(day.headline)}</div>
          <div class="lg-actors">${chips}</div>
          <div class="lg-cluster" hidden></div>
        </div>
      </div>`;
  }).join("");
}

function storyGo(q){ }
async function openCluster(btn, actor, date) {
  const dayEl = btn.closest(".lg-day");
  const box = dayEl.querySelector(".lg-cluster");
  if (!box.hidden && box.dataset.actor === actor) {   // toggle off
    box.hidden = true; return;
  }
  box.hidden = false;
  box.dataset.actor = actor;
  box.innerHTML = `<div class="map-loading">gathering sources…</div>`;
  let d;
  try { d = await api(`v1/ledger/cluster?actor=${encodeURIComponent(actor)}&date=${date}`); }
  catch { box.innerHTML = `<div class="map-loading">failed.</div>`; return; }
  const col = (lean, label) => {
    const items = d.groups[lean] || [];
    return `<div class="lgc-col">
      <div class="lgc-head ${lean}">${label} · ${items.length}</div>
      ${items.slice(0, 8).map((v) => `
        <div class="lgc-item" onclick="event.stopPropagation();play('${v.video_id}',0,'${esc(v.title).replace(/'/g, "\\'")}')">
          <img src="${v.thumb}" alt="" loading="lazy"/>
          <div><div class="lgc-title">${esc(v.title).slice(0, 64)}</div>
            <div class="lgc-meta">${esc(v.channel)} · <span class="chip ${v.stance}">${v.stance}</span></div></div>
        </div>`).join("") || `<div class="lgc-none">silent</div>`}
    </div>`;
  };
  box.innerHTML = `
    <div class="lgc-bar"><b>${esc(actor)}</b> on ${date} — ${d.total} videos
      <button class="lgc-close" onclick="this.closest('.lg-cluster').hidden=true">✕</button></div>
    <div class="lgc-cols">${col("left", "From the Left")}${col("center", "Center")}${col("right", "From the Right")}</div>`;
}

/* ── Who's the target? ── */
let TARGETS = null;
async function loadTargets() {
  if (TARGETS) return;
  const box = $("targets-list");
  try { TARGETS = await api("v1/targets?days=120"); }
  catch { box.innerHTML = `<div class="map-loading">failed.</div>`; return; }
  box.innerHTML = TARGETS.targets.slice(0, 24).map((t, rank) => {
    const maxC = Math.max(...t.series.map((s) => s.crit), 1);
    const spark = t.series.map((s) =>
      `<i style="height:${Math.max(8, 100 * s.crit / maxC)}%" title="${s.w}: ${s.crit} critical"></i>`).join("");
    const bl = t.by_lean, totalBl = (bl.left||0)+(bl.center||0)+(bl.right||0) || 1;
    const punchers = `
      <i class="tp-l" style="width:${100*(bl.left||0)/totalBl}%"></i>
      <i class="tp-c" style="width:${100*(bl.center||0)/totalBl}%"></i>
      <i class="tp-r" style="width:${100*(bl.right||0)/totalBl}%"></i>`;
    return `<div class="target" onclick="this.classList.toggle('open')">
      <div class="tg-rank">${rank + 1}</div>
      <div class="tg-main">
        <div class="tg-name">${esc(t.name)}
          <span class="tg-share">${Math.round(t.crit_share * 100)}% critical</span></div>
        <div class="tg-nums">${t.critical.toLocaleString()} critical of ${t.mentions.toLocaleString()} mentions</div>
        <div class="tg-punchers" title="who's criticizing: left / center / right">${punchers}</div>
      </div>
      <div class="tg-spark">${spark}</div>
      <div class="tg-latest">
        ${t.latest.map((v) => `
          <div class="lgc-item" onclick="event.stopPropagation();play('${v.video_id}',0,'${esc(v.title).replace(/'/g, "\\'")}')">
            <img src="${v.thumb}" alt="" loading="lazy"/>
            <div><div class="lgc-title">${esc(v.title).slice(0, 60)}</div>
              <div class="lgc-meta">${v.date} · ${esc(v.channel)}</div></div>
          </div>`).join("")}
      </div>
    </div>`;
  }).join("");
}

/* ── Who's lying? ── */
let LIARS = null;
const vsCard = (v, side) => v ? `
  <div class="wl-side" onclick="event.stopPropagation();play('${v.video_id}',${v.t || 0},'${esc(v.title).replace(/'/g, "\\'")}')">
    <span class="wl-when">${side} · ${v.date}</span>
    <img src="${v.thumb || thumb(v.video_id)}" alt="" loading="lazy"/>
    <div class="wl-title">${esc(v.title).slice(0, 56)}</div>
    <div class="lgc-meta">${esc(v.channel || "")}${v.stance ? ` · <span class="chip ${v.stance}">${v.stance}</span>` : ""}</div>
  </div>` : `<div class="wl-side wl-empty">no footage in the map</div>`;

async function loadLiars() {
  if (LIARS) return;
  const box = $("liars-list");
  try { LIARS = await api("v1/liars?limit=24"); }
  catch { box.innerHTML = `<div class="map-loading">failed.</div>`; return; }

  const receipts = (LIARS.receipts || []).map((r) => {
    const a = r.claim_a || {}, b = r.claim_b || {};
    return `<div class="wl-card ours">
      <div class="wl-head"><span class="wl-badge ours">caught on camera</span>
        <b>${esc(r.channel)}</b> contradicts itself</div>
      <div class="wl-pair">
        ${vsCard({ ...a, channel: r.channel, title: a.text }, "then")}
        <div class="wl-vs">⚡</div>
        ${vsCard({ ...b, channel: r.channel, title: b.text }, "later")}
      </div>
      <div class="wl-why">${esc(r.explanation || "")}</div>
    </div>`;
  }).join("");

  const reversals = (LIARS.reversals || []).map((r) => {
    const yt = r.youtube || {};
    return `<div class="wl-card">
      <div class="wl-head"><span class="wl-badge">${esc(r.rating || "reversal")}</span>
        <b>${esc(r.speaker || "")}</b> — ${esc(r.text || "")}
        <a class="wl-src" href="${r.url}" target="_blank">PolitiFact ↗</a></div>
      <div class="wl-pair">
        ${vsCard((yt.before || [])[0], "before the flip")}
        <div class="wl-vs">⚡<span>${r.date || ""}</span></div>
        ${vsCard((yt.after || [])[0], "after")}
      </div>
      ${r.detail ? `<div class="wl-why">${esc(r.detail)} — rated by PolitiFact</div>` : ""}
    </div>`;
  }).join("");

  box.innerHTML =
    (receipts ? `<div class="wl-section">Our receipts — the map's own catalogue</div>${receipts}` : "") +
    `<div class="wl-section">On-record reversals — PolitiFact Flip-O-Meter, footage from the map</div>${reversals}`;
}

/* ── onboard: add your channel ── */
let OB_POLL = 0;

async function startOnboard() {
  const channel = $("ob-name").value.trim();
  const urls = $("ob-urls").value.trim();
  if (!urls) { $("ob-note").textContent = "paste at least one link"; return; }
  $("ob-go").disabled = true;
  $("ob-note").textContent = "starting…";
  let r;
  try {
    r = await fetch("v1/onboard", { method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channel, urls }) });
  } catch { $("ob-note").textContent = "network error"; $("ob-go").disabled = false; return; }
  if (!r.ok) {
    const e = await r.json().catch(() => ({}));
    $("ob-note").textContent = e.detail || "could not start";
    $("ob-go").disabled = false;
    return;
  }
  const j = await r.json();
  const slug = j.slug;
  $("ob-name").value = j.channel;
  $("ob-note").textContent = j.appending
    ? `appending to ${j.channel}` : `building ${j.channel}`;
  $("ob-progress").hidden = false;
  clearInterval(OB_POLL);
  OB_POLL = setInterval(() => pollOnboard(slug), 1600);
  pollOnboard(slug);
}

const OB_ICON = { queued: "·", fetching: "⟳", fetched: "✓", analyzing: "⟳",
                  done: "✓", failed: "✗" };

async function pollOnboard(slug) {
  let d;
  try { d = await api(`v1/onboard/${slug}/status`); } catch { return; }
  const box = $("ob-progress");
  const rows = (d.steps || []).map((s) => `
    <div class="ob-step">
      <span class="${s.state === "failed" ? "fail" : s.state.endsWith("ing") ? "spin" : "ok"}">${OB_ICON[s.state] || "·"}</span>
      <span class="mono">${s.video_id}</span>
      <span>${esc(s.title || "")}</span>
      <span style="margin-left:auto;color:var(--faint);font-size:11px">${s.state}${s.error ? " — " + esc(s.error) : ""}</span>
    </div>`).join("");
  const phase = d.phase ? `<div class="ob-step"><span class="spin">⟳</span> ${d.phase}…</div>` : "";
  if (d.state === "done") {
    clearInterval(OB_POLL);
    BROWSE = null;                       // channel list changed
    box.innerHTML = rows + `
      <div class="ob-done">
        <button class="pf-run" onclick="go('channel','${d.slug}')">
          Open your studio → ${d.videos} videos ready</button>
      </div>`;
    $("ob-go").disabled = false;
  } else if (d.state === "error") {
    clearInterval(OB_POLL);
    box.innerHTML = rows + `<div class="ob-step"><span class="fail">✗</span> ${esc(d.error || "failed")}</div>`;
    $("ob-go").disabled = false;
  } else {
    box.innerHTML = rows + (d.phase !== "captions" ? phase : "");
  }
}

/* ── staged progress: honest theater for model-backed calls ──
   The bar eases toward 92% while stage labels narrate the real steps, then
   snaps to 100% when the response lands. Skeletons hold the layout. */
function progressInto(el, stages, skeleton = 3) {
  const id = "pg" + Math.random().toString(36).slice(2, 8);
  el.innerHTML = `
    <div class="pg" id="${id}">
      <div class="pg-bar"><i></i></div>
      <div class="pg-stage"><span class="pg-spin">◐</span><span class="pg-label">${stages[0]}</span></div>
      <div class="pg-skels">${Array.from({ length: skeleton }, () =>
        `<div class="pg-skel"><b></b><u></u><u style="width:62%"></u></div>`).join("")}</div>
    </div>`;
  const root = document.getElementById(id);
  const bar = root.querySelector(".pg-bar i");
  const label = root.querySelector(".pg-label");
  const t0 = performance.now();
  let stage = 0, raf = 0, alive = true;

  const perStage = 2600;                       // advance narration every ~2.6s
  (function tick() {
    if (!alive) return;
    const dt = performance.now() - t0;
    // ease toward 92%: fast start, long patient tail
    bar.style.width = (92 * (1 - Math.exp(-dt / 6500))).toFixed(1) + "%";
    const want = Math.min(stages.length - 1, Math.floor(dt / perStage));
    if (want !== stage) {
      stage = want;
      label.textContent = stages[stage];
      label.animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }],
                    { duration: 300, easing: "ease-out" });
    }
    raf = requestAnimationFrame(tick);
  })();

  return {
    done() {
      alive = false;
      cancelAnimationFrame(raf);
      if (root.isConnected) bar.style.width = "100%";
    },
  };
}

/* ── agent bridge ──
   The in-studio agent (web/agent/, built from agent-ui/) runs in its own React
   island and cannot see this script's scope, so the few things it needs are
   published here deliberately rather than by making internals global.

   Two directions:
     * hsOpenLens / hsPlayMoment — the agent's browser tools call these, so it
       drives the same code paths a click does instead of a parallel one.
     * hs:context — broadcast on every change, so the agent's view of "what is
       on screen" stays current between turns. */
let HS_LENS = "chat";

function hsDraft() {
  const el = $("pf-script");
  return el && el.value.trim() ? el.value.trim() : "";
}

function hsBroadcast() {
  window.dispatchEvent(new CustomEvent("hs:context", { detail: window.hsContext() }));
}

window.hsContext = () => {
  const draft = hsDraft();
  return {
    channel: CH,
    investigation: window.hsInvestigation || null,
    galaxy: !$("view-galaxy").hidden ? window.hsGalaxySelection || null : null,
    lens: HS_LENS,
    // The draft itself, not just a flag: "check this" has to work without the
    // user pasting their script a second time into the chat.
    draft_present: Boolean(draft),
    draft_chars: draft.length,
    draft: draft.slice(0, 6000),
  };
};

window.hsOpenLens = (name) => {
  setLens(name);
  HS_LENS = name;
  hsBroadcast();
  return `opened the ${name} lens`;
};

/* Run the studio's own pre-flight on whatever is in the editor, so results land
   in the real Pre-flight view instead of the agent narrating into an empty one.
   Returns a summary the agent can reason about rather than a bare "done". */
window.hsRunPreflight = async () => {
  const draft = hsDraft();
  if (draft.length < 60) return { ok: false, reason: "no draft in the editor yet" };
  window.hsOpenLens("preflight");
  const checked = await runPrecheck();
  if (!checked.ok) return checked;
  // Return the evidence already rendered. Counts alone force the model to run
  // the expensive check a second time just to recover video ids and timestamps.
  return { ok: true, rendered_in: "preflight lens", channel: checked.channel,
           draft_chars: checked.draft_chars, verdicts: checked.result.summary || {},
           claims: checked.result.claims };
};

/* Honest about what actually happened: a dispatched call is not a playing
   video. If the iframe never mounts (blocked embed, offline), say so and hand
   back the watch URL so the evidence is still reachable. */
window.hsPlayMoment = async (videoId, second, note) => {
  try {
    await play(videoId, second, note || "");
  } catch (e) {
    return { ok: false, reason: String(e && e.message || e),
             url: `https://www.youtube.com/watch?v=${videoId}&t=${second}s` };
  }
  await new Promise((r) => setTimeout(r, 700));   // give the iframe a beat
  const mounted = Boolean(document.querySelector("#player-mount iframe"));
  const open = $("player") && !$("player").hidden;
  return {
    ok: open,
    player_open: open,
    embed_mounted: mounted,
    // Distinguish "I opened it" from "it is playing" — the transcript panel is
    // still usable evidence when an embed is blocked.
    note: mounted ? "embed mounted" : "embed did not mount; transcript still shown",
    url: `https://www.youtube.com/watch?v=${videoId}&t=${second}s`,
  };
};

// Keep the broadcast honest when the user navigates or edits by hand.
document.addEventListener("click", (e) => {
  const b = e.target.closest("#lens-nav button");
  if (b) { HS_LENS = b.dataset.lens; hsBroadcast(); }
});
document.addEventListener("input", (e) => {
  if (e.target.id !== "pf-script") return;
  clearTimeout(window._hsDraftT);
  window._hsDraftT = setTimeout(hsBroadcast, 400);   // debounce typing
});

const HS_FEATURED_STORY = {"topic": "AI regulation", "channel": "dwarkesh-patel", "provenance": "Existing transcripts collected by Perspectivity.co. Dates are archive metadata. Framing summaries are editorial interpretations, not verbatim quotations.", "interpretation": "These examples share a critical stance while emphasizing different concerns. They do not establish a reversal by a particular person.", "sources": [{"video_id": "unAEMjpvnkk", "title": "Are we racing China just to become China?", "archive_date": "2026-04-26", "channel": "dwarkesh-patel", "framing_label": "Government coercion", "framing_summary": "The video frames AI governance as a question of government leverage over a private company.", "second": 15, "transcript_excerpt": "the government did. The government has threatened to destroy Anthropic as a private business because Anthropic refuses to sell to the government on terms that the government commands. The", "url": "https://www.youtube.com/watch?v=unAEMjpvnkk&t=15s", "thumbnail": "https://i.ytimg.com/vi/unAEMjpvnkk/mqdefault.jpg"}, {"video_id": "5Wvpc_2-7-U", "title": "AI Regulation's Authoritarian Problem", "archive_date": "2026-04-28", "channel": "dwarkesh-patel", "framing_label": "Vague definitions", "framing_summary": "The argument focuses on how broad AI-risk terms could permit abuse.", "second": 13, "transcript_excerpt": "a wannabe despot. The underlying terms here like catastrophic risk or threats to national security or autonomy risk are so vague and so open to interpretation that you're just handing a fully loaded bazooka to a future power-hungry leader. These terms can mean whatever the government wants them", "url": "https://www.youtube.com/watch?v=5Wvpc_2-7-U&t=13s", "thumbnail": "https://i.ytimg.com/vi/5Wvpc_2-7-U/mqdefault.jpg"}, {"video_id": "yiaKkyx8g3s", "title": "Why the Nukes Analogy for AI Is Wrong", "archive_date": "2026-05-01", "channel": "dwarkesh-patel", "framing_label": "A different analogy", "framing_summary": "The speaker challenges the nuclear-weapons analogy and compares AI to industrialization.", "second": 31, "transcript_excerpt": "used. But I think this is a terrible analogy. First, AI is not some self-contained weapon like a nuclear bomb, which only does one thing. Rather, it is more like the process of industrialization itself. Now, people", "url": "https://www.youtube.com/watch?v=yiaKkyx8g3s&t=31s", "thumbnail": "https://i.ytimg.com/vi/yiaKkyx8g3s/mqdefault.jpg"}]};

function hsRenderStory() {
  const box = $("gx-story-sources");
  if (!box) return;
  box.innerHTML = HS_FEATURED_STORY.sources.map((v, i) => `<button class="gx-story-source" data-source="${i}"><div class="gx-source-image"><img src="${v.thumbnail}" alt="${esc(v.title)}" loading="lazy"/><span>${fmtT(v.second)}</span></div><div class="gx-source-date">${v.archive_date}</div><h3>${esc(v.framing_label)}</h3><p>${esc(v.framing_summary)}</p><span class="gx-source-title">${esc(v.title)}</span><span class="gx-source-action">Open source moment</span></button>`).join("");
  box.querySelectorAll("button").forEach(b => b.onclick = () => {const v = HS_FEATURED_STORY.sources[+b.dataset.source]; play(v.video_id, v.second, v.title);});
}
function hsInvestigateStory() {
  window.hsInvestigation = HS_FEATURED_STORY;
  hsBroadcast();
  window.dispatchEvent(new CustomEvent("hs:open-agent"));
}
