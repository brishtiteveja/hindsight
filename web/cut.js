/* Narrative Cut — the edit bay.
   Tracks are channels, clips are positions taken, contradictions arc between
   the two moments that disagree. DOM for clips, canvas for ruler + arcs. */

let CUT = null;
let cutPx = 3;                 // pixels per day (calendar) / per event (compact)
let cutStart = 0;              // ms of range start
let cutScroll = 0;
let cutPlayhead = 0;           // x position in scale units
let CUT_SEL = null;            // {issue, channels[]} for custom track stacks
let CUT_MODE = localStorage.getItem("cutMode") || "compact";
let CUT_DATES = [];            // sorted unique dates (compact scale)
let CUT_DIDX = {};             // date -> index

const CUT_PRESETS = [
  { label: "Dwarkesh × AI timelines", issue: "tech", channels: ["dwarkesh-patel"] },
  { label: "Lex Fridman × Tech", issue: "tech", channels: ["lex-fridman"] },
  { label: "Fox vs MSNBC × Immigration", issue: "immigration", channels: ["fox-news", "msnbc"] },
  { label: "Left vs Right × Economy", issue: "economy", channels: ["the-young-turks", "ben-shapiro"] },
  { label: "Jubilee × Justice", issue: "justice", channels: ["jubilee"] },
];

const DAY = 86400000;
const dayOf = (iso) => Math.floor((Date.parse(iso + "T00:00:00Z") - cutStart) / DAY);
// compact mode collapses empty calendar stretches: x advances one unit per
// distinct publication date instead of per day
const xu = (iso) => CUT_MODE === "compact" ? (CUT_DIDX[iso] ?? 0) : dayOf(iso);
const cutSpan = () => CUT_MODE === "compact"
  ? Math.max(CUT_DATES.length, 1)
  : dayOf(CUT.range.end) + 2;

function renderCutPresets() {
  $("cut-presets").innerHTML = CUT_PRESETS.map((p, i) =>
    `<button class="cut-chip" data-cut="${i}" onclick="loadCut(${i})">${p.label}</button>`).join("");
}

async function loadCut(idx) {
  const p = CUT_PRESETS[idx];
  document.querySelectorAll(".cut-chip").forEach((b, i) => b.classList.toggle("on", i === idx));
  CUT_SEL = { issue: p.issue, channels: [...p.channels] };
  await fetchCut();
}

async function fetchCut() {
  $("cut-stage").innerHTML = `<div class="map-loading">assembling the cut…</div>`;
  try {
    CUT = await api(`v1/cut?issue=${CUT_SEL.issue}&channels=${CUT_SEL.channels.join(",")}`);
  } catch {
    $("cut-stage").innerHTML = `<div class="map-loading">could not load that cut.</div>`;
    return;
  }
  if (!CUT.range.start) {
    $("cut-stage").innerHTML = `<div class="map-loading">no clips on this issue for those channels.</div>`;
    return;
  }
  cutStart = Date.parse(CUT.range.start + "T00:00:00Z");
  CUT_DATES = [...new Set(CUT.tracks.flatMap((t) => t.clips.map((c) => c.date)))].sort();
  CUT_DIDX = Object.fromEntries(CUT_DATES.map((d, i) => [d, i]));
  cutPlayhead = 0;
  buildCutDOM();
  cutFit();
}

function setCutMode(mode) {
  CUT_MODE = mode;
  localStorage.setItem("cutMode", mode);
  document.querySelectorAll("[data-cutmode]").forEach((b) =>
    b.classList.toggle("on", b.dataset.cutmode === mode));
  cutFit();
}

async function addTrack(slug) {
  if (!slug || !CUT_SEL || CUT_SEL.channels.includes(slug)) return;
  CUT_SEL.channels.push(slug);
  await fetchCut();
}

function buildCutDOM() {
  const span = dayOf(CUT.range.end) + 1;
  $("cut-stage").innerHTML = `
    <div class="cut-grid">
      <div class="cut-gutter">
        <div class="cut-ruler-pad"></div>
        ${CUT.tracks.map((t) => `
          <div class="cut-thead">
            <div class="cut-tname">${esc(t.name)}</div>
            <div class="cut-tmeta"><span class="lean-pip ${t.lean}">${t.lean[0].toUpperCase()}</span>
              ${t.clips.length} clips</div>
          </div>`).join("")}
      </div>
      <div class="cut-scroll" id="cut-scroll">
        <div class="cut-inner" id="cut-inner">
          <canvas id="cut-ruler" class="cut-ruler"></canvas>
          <div id="cut-lanes" class="cut-lanes">
            ${CUT.tracks.map((t, ti) => `
              <div class="cut-lane" data-track="${ti}"></div>`).join("")}
          </div>
          <canvas id="cut-arcs" class="cut-arcs"></canvas>
          <div id="cut-playhead" class="cut-playhead"><i></i></div>
        </div>
      </div>
    </div>`;

  const scroll = $("cut-scroll");
  scroll.onscroll = () => { cutScroll = scroll.scrollLeft; drawCutCanvas(); };
  scroll.onwheel = (e) => {
    if (e.ctrlKey || e.metaKey) { e.preventDefault(); cutZoom(e.deltaY < 0 ? 1.15 : 1 / 1.15); }
  };
  $("cut-ruler").onmousedown = (e) => scrubStart(e);
}

function renderCut() {
  const width = Math.max(900, cutSpan() * cutPx + 80);
  $("cut-inner").style.width = width + "px";

  CUT.tracks.forEach((t, ti) => {
    const lane = document.querySelector(`.cut-lane[data-track="${ti}"]`);
    lane.innerHTML = t.clips.map((c) => {
      const x = xu(c.date) * cutPx;
      const w = Math.max(12, Math.min(96, (c.dur_s / 60) * 4 || 18));
      const showLabel = w >= 48;
      return `<div class="cut-clip ${c.stance}" style="left:${x}px;width:${w}px"
                data-vid="${c.video_id}" data-t="${c.t}"
                onclick="play('${c.video_id}',${c.t},'${esc(c.title).replace(/'/g, "\\'")}')"
                onmouseenter="cutTip(event,${ti},'${c.video_id}')" onmouseleave="cutTipHide()">
                <span class="cc-strip" style="background:${CUT.hue}"></span>
                ${showLabel ? `<span class="cc-label">${esc(c.title).slice(0, 22)}</span>` : ""}
              </div>`;
    }).join("");
  });
  drawCutCanvas();
}

function drawCutCanvas() {
  const inner = $("cut-inner");
  const W = inner.clientWidth, dpr = window.devicePixelRatio || 1;

  // ruler
  const ru = $("cut-ruler"), rc = ru.getContext("2d");
  ru.width = W * dpr; ru.height = 30 * dpr;
  rc.setTransform(dpr, 0, 0, dpr, 0, 0);
  rc.clearRect(0, 0, W, 30);
  rc.fillStyle = "#0c0b09"; rc.fillRect(0, 0, W, 30);
  rc.font = "10px JetBrains Mono, monospace";
  if (CUT_MODE === "compact") {
    let lastMonth = "";
    CUT_DATES.forEach((iso, i) => {
      const m = iso.slice(0, 7);
      if (m === lastMonth) return;
      lastMonth = m;
      const x = i * cutPx;
      rc.strokeStyle = "#2b2620"; rc.beginPath();
      rc.moveTo(x, 16); rc.lineTo(x, 30); rc.stroke();
      rc.fillStyle = "#7d745f";
      rc.fillText(new Date(iso + "T00:00:00Z").toLocaleDateString("en",
        { month: "short", year: "2-digit", timeZone: "UTC" }), x + 4, 12);
    });
  } else {
    const span = cutSpan();
    let d = new Date(cutStart);
    d.setUTCDate(1);
    while (true) {
      const day = Math.floor((d.getTime() - cutStart) / DAY);
      if (day > span) break;
      if (day >= -31) {
        const x = day * cutPx;
        rc.strokeStyle = "#2b2620"; rc.beginPath();
        rc.moveTo(x, 16); rc.lineTo(x, 30); rc.stroke();
        rc.fillStyle = "#7d745f";
        rc.fillText(d.toLocaleDateString("en", { month: "short", year: "2-digit", timeZone: "UTC" }), x + 4, 12);
      }
      d.setUTCMonth(d.getUTCMonth() + 1);
    }
  }

  // contradiction arcs
  const lanes = $("cut-lanes");
  const ac = $("cut-arcs"), ax = ac.getContext("2d");
  ac.width = W * dpr; ac.height = lanes.clientHeight * dpr;
  ac.style.height = lanes.clientHeight + "px";
  ax.setTransform(dpr, 0, 0, dpr, 0, 0);
  ax.clearRect(0, 0, W, lanes.clientHeight);

  CUT.tracks.forEach((t, ti) => {
    const laneTop = ti * 62;
    for (const p of t.contradictions || []) {
      if (!p.a?.date || !p.b?.date) continue;
      const x1 = xu(p.a.date) * cutPx, x2 = xu(p.b.date) * cutPx;
      const y = laneTop + 6;
      const lift = Math.max(24, Math.min(70, Math.abs(x2 - x1) * 0.35));
      ax.strokeStyle = "#f0b243"; ax.setLineDash([4, 4]); ax.lineWidth = 1.2;
      ax.beginPath();
      ax.moveTo(x1, y);
      ax.quadraticCurveTo((x1 + x2) / 2, y - lift, x2, y);
      ax.stroke();
      ax.setLineDash([]);
      for (const x of [x1, x2]) {
        ax.fillStyle = "#f0b243";
        ax.beginPath(); ax.moveTo(x, y); ax.lineTo(x + 7, y - 5); ax.lineTo(x, y - 10); ax.fill();
      }
      ax.fillStyle = "#ffd98a"; ax.font = "11px Inter, sans-serif"; ax.textAlign = "center";
      ax.fillText("⚡", (x1 + x2) / 2, y - lift + 4);
    }
  });

  $("cut-playhead").style.left = cutPlayhead * cutPx + "px";
  $("cut-playhead").style.height = (lanes.clientHeight + 30) + "px";
  updateNowPlaying();
}

function updateNowPlaying() {
  let best = null, bestD = 1e9;
  for (const t of CUT.tracks) {
    for (const c of t.clips) {
      const d = Math.abs(xu(c.date) - cutPlayhead);
      if (d < bestD) { bestD = d; best = { c, t }; }
    }
  }
  $("cut-now").innerHTML = best && bestD < 8
    ? `<b>${esc(best.t.name)}</b> · <span class="chip ${best.c.stance}">${best.c.stance}</span>
       ${esc(best.c.title).slice(0, 60)} <span class="cut-when">${best.c.date}</span>`
    : "—";
  document.querySelectorAll(".cut-clip").forEach((el) => {
    const x = parseFloat(el.style.left), w = parseFloat(el.style.width);
    const ph = cutPlayhead * cutPx;
    el.classList.toggle("live", ph >= x && ph <= x + w);
  });
}

function scrubStart(e) {
  const move = (ev) => {
    const rect = $("cut-inner").getBoundingClientRect();
    cutPlayhead = Math.max(0, (ev.clientX - rect.left) / cutPx);
    $("cut-playhead").style.left = cutPlayhead * cutPx + "px";
    updateNowPlaying();
  };
  move(e);
  const up = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", up);
}

function cutZoom(f) {
  cutPx = Math.max(0.4, Math.min(30, cutPx * f));
  renderCut();
}
function cutFit() {
  if (!CUT) return;
  const avail = ($("cut-scroll")?.clientWidth || 900) - 60;
  cutPx = Math.max(CUT_MODE === "compact" ? 8 : 0.4, avail / cutSpan());
  renderCut();
}

function cutTip(e, ti, vid) {
  const c = CUT.tracks[ti].clips.find((x) => x.video_id === vid);
  if (!c) return;
  const tip = $("cut-tip");
  tip.innerHTML = `
    <img src="${c.thumb}" alt="" loading="lazy"/>
    <div class="ct-body">
      <div class="ct-title">${esc(c.title)}</div>
      <div class="ct-meta"><span>${c.date}</span>
        <span class="chip ${c.stance}">${c.stance}</span>
        <span class="ct-t">▶ ${fmtT(c.t)}</span></div>
      ${c.summary ? `<div class="ct-sum">${esc(c.summary)}</div>` : ""}
    </div>`;
  tip.hidden = false;
  const r = e.target.getBoundingClientRect();
  tip.style.left = Math.min(r.left, window.innerWidth - 340) + "px";
  tip.style.top = Math.max(10, r.top - tip.offsetHeight - 10) + "px";
}
const cutTipHide = () => { $("cut-tip").hidden = true; };

document.addEventListener("keydown", (e) => {
  if ($("view-cut").hidden || !CUT) return;
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
  const days = CUT.tracks.flatMap((t) => t.clips.map((c) => xu(c.date))).sort((a, b) => a - b);
  const next = e.key === "ArrowRight"
    ? days.find((d) => d > cutPlayhead + 0.5)
    : [...days].reverse().find((d) => d < cutPlayhead - 0.5);
  if (next !== undefined) {
    cutPlayhead = next;
    $("cut-playhead").style.left = cutPlayhead * cutPx + "px";
    updateNowPlaying();
  }
});

/* channel picker: stack more tracks vertically */
async function fillCutPicker() {
  const sel = $("cut-channel-pick");
  if (!sel || sel.options.length > 1) return;
  if (!BROWSE) { try { BROWSE = await api("v1/browse"); } catch { return; } }
  const chans = [...BROWSE.channels].sort((a, b) => a.name.localeCompare(b.name));
  sel.innerHTML = `<option value="">+ add track…</option>` +
    chans.map((c) => `<option value="${c.slug}">${esc(c.name)} (${c.lean[0].toUpperCase()})</option>`).join("");
  sel.onchange = () => { addTrack(sel.value); sel.value = ""; };
}
