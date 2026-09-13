/* Issue Galaxy — every video a point, clustered by issue.
   Canvas at 20K+ scale: one full redraw per frame, spatial grid for hover. */

let G = null;                 // the loaded columnar payload
let gView = { x: 0, y: 0, k: 1 };   // pan + zoom
let gZoomAnim = null;         // {k, x, y} target for eased zoom
let gSnap = null;             // bitmap of the last full render + its view
let gSettle = 0;              // debounce for the sharp re-render
let gGrid = null;             // {cell: [idx…]} for hover hit-testing
let gHover = -1;
let gFilter = { q: "", lean: -1, issue: -1 };
let gMatch = null;            // Uint8Array — 1 when a point passes the filter
let gRaf = 0;

const GRID = 40;              // world units per hover cell

async function loadGalaxy() {
  const cv = $("gx-canvas");
  if (G) { fitGalaxy(); return; }
  $("gx-status").textContent = "loading the constellation…";
  try {
    G = await api("v1/galaxy?b=" + Date.now());
  } catch {
    $("gx-status").textContent = "galaxy not built yet — run `python -m hindsight.galaxy`";
    return;
  }
  G.hues = G.issues.map((k) => {
    const l = G.labels.find((x) => x.key === k);
    return l ? l.hue : "#888";
  });
  gMatch = new Uint8Array(G.n).fill(1);
  buildGrid();
  renderIssueChips();
  $("gx-status").textContent =
    `${G.n.toLocaleString()} videos · ${G.labels.length} issue families · ${G.channels.length} channels`;
  bindGalaxy(cv);
  fitGalaxy();
}

function buildGrid() {
  gGrid = new Map();
  for (let i = 0; i < G.n; i++) {
    const key = ((G.x[i] / GRID) | 0) * 10000 + ((G.y[i] / GRID) | 0);
    let bucket = gGrid.get(key);
    if (!bucket) gGrid.set(key, (bucket = []));
    bucket.push(i);
  }
}

function fitGalaxy() {
  const cv = $("gx-canvas");
  const w = cv.clientWidth, h = cv.clientHeight;
  gView.k = Math.min(w, h) / (G.world * 1.06);
  gView.x = (w - G.world * gView.k) / 2;
  gView.y = (h - G.world * gView.k) / 2;
  drawGalaxy();
}

const wx = (sx) => (sx - gView.x) / gView.k;      // screen -> world
const wy = (sy) => (sy - gView.y) / gView.k;
const sx = (x) => x * gView.k + gView.x;          // world -> screen
const sy = (y) => y * gView.k + gView.y;

function drawGalaxy() {
  if (!G) return;
  const cv = $("gx-canvas"), ctx = cv.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = cv.clientWidth, h = cv.clientHeight;
  if (cv.width !== w * dpr || cv.height !== h * dpr) {
    cv.width = w * dpr; cv.height = h * dpr;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const filtering = gFilter.q || gFilter.lean >= 0 || gFilter.issue >= 0;
  const r = Math.max(1.5, Math.min(5.5, 2.2 * gView.k * 6));

  // Batched drawing: one Path2D + one fill per hue (16 fills, not 23K) —
  // the difference between chugging and butter while zooming.
  const useRect = r < 3;                        // squares read as dots when tiny
  if (filtering) {
    ctx.globalAlpha = 0.16;
    const dim = new Path2D();
    const rd = r * 0.75;
    for (let i = 0; i < G.n; i++) {
      if (gMatch[i]) continue;
      const px = sx(G.x[i]), py = sy(G.y[i]);
      if (px < -4 || py < -4 || px > w + 4 || py > h + 4) continue;
      if (useRect) dim.rect(px - rd, py - rd, rd * 2, rd * 2);
      else { dim.moveTo(px + rd, py); dim.arc(px, py, rd, 0, 6.283); }
    }
    ctx.fillStyle = "#4a443a"; ctx.fill(dim);
  }

  ctx.globalAlpha = filtering ? 1 : 0.82;
  const paths = G.hues.map(() => null);
  for (let i = 0; i < G.n; i++) {
    if (filtering && !gMatch[i]) continue;
    const px = sx(G.x[i]), py = sy(G.y[i]);
    if (px < -4 || py < -4 || px > w + 4 || py > h + 4) continue;
    const hi = G.i[i];
    const path = paths[hi] || (paths[hi] = new Path2D());
    if (useRect) path.rect(px - r, py - r, r * 2, r * 2);
    else { path.moveTo(px + r, py); path.arc(px, py, r, 0, 6.283); }
  }
  for (let hi = 0; hi < paths.length; hi++) {
    if (!paths[hi]) continue;
    ctx.fillStyle = G.hues[hi];
    ctx.fill(paths[hi]);
  }
  ctx.globalAlpha = 1;

  // hovered point gets a ring
  if (gHover >= 0) {
    const px = sx(G.x[gHover]), py = sy(G.y[gHover]);
    ctx.strokeStyle = "#efe6d4"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(px, py, r + 4, 0, 6.283); ctx.stroke();
  }

  snapAfterDraw(cv);

  // cluster labels
  ctx.textAlign = "center";
  for (const l of G.labels) {
    if (gFilter.issue >= 0 && G.issues[gFilter.issue] !== l.key) continue;
    const px = sx(l.x), py = sy(l.y);
    if (px < 0 || py < 0 || px > w || py > h) continue;
    const size = Math.max(12, Math.min(26, 9 + l.n / 220));
    ctx.font = `700 ${size}px Fraunces, Georgia, serif`;
    ctx.lineWidth = 4; ctx.strokeStyle = "rgba(8,7,5,.92)";
    ctx.strokeText(l.label, px, py);
    ctx.fillStyle = l.hue;
    ctx.fillText(l.label, px, py);
  }
}

function snapAfterDraw(cv) {
  if (!gSnap) gSnap = { cv: document.createElement("canvas") };
  gSnap.cv.width = cv.width; gSnap.cv.height = cv.height;
  gSnap.cv.getContext("2d").drawImage(cv, 0, 0);
  gSnap.view = { ...gView };
}

/* During interaction: transform the last bitmap (one drawImage per frame),
   then settle into a sharp full render when the hand stops. */
function fastDraw() {
  if (!gSnap || !gSnap.view) { queueDraw(); return; }
  const cv = $("gx-canvas"), ctx = cv.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = cv.clientWidth, h = cv.clientHeight;
  const s = gView.k / gSnap.view.k;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(gSnap.cv,
    gView.x - gSnap.view.x * s, gView.y - gSnap.view.y * s,
    (gSnap.cv.width / dpr) * s, (gSnap.cv.height / dpr) * s);
  clearTimeout(gSettle);
  gSettle = setTimeout(() => queueDraw(), 140);
}

const queueDraw = () => {
  if (gRaf) return;
  gRaf = requestAnimationFrame(() => { gRaf = 0; drawGalaxy(); });
};

let gEasing = 0;
function easeZoom() {
  if (gEasing) return;
  gEasing = requestAnimationFrame(function step() {
    if (!gZoomAnim) { gEasing = 0; return; }
    const t = 0.32;                       // smoothing factor per frame
    gView.k += (gZoomAnim.k - gView.k) * t;
    gView.x += (gZoomAnim.x - gView.x) * t;
    gView.y += (gZoomAnim.y - gView.y) * t;
    fastDraw();
    if (Math.abs(gZoomAnim.k - gView.k) / gZoomAnim.k < 0.004) {
      gView.k = gZoomAnim.k; gView.x = gZoomAnim.x; gView.y = gZoomAnim.y;
      gZoomAnim = null; gEasing = 0; queueDraw();
    } else {
      gEasing = requestAnimationFrame(step);
    }
  });
}

function pickPoint(px, py) {
  const x = wx(px), y = wy(py);
  const cx = (x / GRID) | 0, cy = (y / GRID) | 0;
  let best = -1, bestD = (14 / gView.k) ** 2;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const bucket = gGrid.get((cx + dx) * 10000 + (cy + dy));
      if (!bucket) continue;
      for (const i of bucket) {
        if (gMatch && !gMatch[i] && (gFilter.q || gFilter.lean >= 0 || gFilter.issue >= 0)) continue;
        const d = (G.x[i] - x) ** 2 + (G.y[i] - y) ** 2;
        if (d < bestD) { bestD = d; best = i; }
      }
    }
  }
  return best;
}

function bindGalaxy(cv) {
  let dragging = false, lastX = 0, lastY = 0, moved = 0;

  cv.onmousedown = (e) => { dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; };
  window.addEventListener("mouseup", () => { dragging = false; });
  cv.onmousemove = (e) => {
    const rect = cv.getBoundingClientRect();
    if (dragging) {
      moved += Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY);
      gView.x += e.clientX - lastX; gView.y += e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      hideGxTip(); fastDraw();
      return;
    }
    const hit = pickPoint(e.clientX - rect.left, e.clientY - rect.top);
    if (hit !== gHover) {
      gHover = hit;
      hit >= 0 ? showGxTip(hit, e.clientX, e.clientY) : hideGxTip();
      queueDraw();
    } else if (hit >= 0) {
      moveGxTip(e.clientX, e.clientY);
    }
  };
  cv.onmouseleave = () => { gHover = -1; hideGxTip(); queueDraw(); };
  cv.onclick = () => {
    if (moved > 6 || gHover < 0) return;
    play(G.v[gHover], 0, G.t[gHover]);
  };
  cv.onwheel = (e) => {
    e.preventDefault();
    const rect = cv.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const factor = Math.exp(-e.deltaY * 0.0016);
    const base = gZoomAnim || gView;
    const k = Math.max(0.05, Math.min(14, base.k * factor));
    gZoomAnim = {
      k,
      x: mx - (mx - (gZoomAnim ? gZoomAnim.x : gView.x)) * (k / base.k),
      y: my - (my - (gZoomAnim ? gZoomAnim.y : gView.y)) * (k / base.k),
    };
    hideGxTip(); easeZoom();
  };
  window.addEventListener("resize", () => { if (!$("view-galaxy").hidden) queueDraw(); });
}

/* tooltip */
function showGxTip(i, cx, cy) {
  const tip = $("gx-tip");
  tip.innerHTML = `
    <img src="${thumb(G.v[i])}" alt="" loading="lazy"/>
    <div>
      <div class="gt-title">${esc(G.t[i])}</div>
      <div class="gt-meta">
        <span>${esc(G.channel_names[G.c[i]])}</span>
        <span class="gt-dot" style="background:${G.hues[G.i[i]]}"></span>
        <span>${G.labels.find((l) => l.key === G.issues[G.i[i]])?.label || ""}</span>
        <span class="gt-date">${G.d[i]}</span>
      </div>
    </div>`;
  tip.hidden = false;
  moveGxTip(cx, cy);
}
function moveGxTip(cx, cy) {
  const tip = $("gx-tip");
  const w = tip.offsetWidth, h = tip.offsetHeight;
  tip.style.left = Math.min(cx + 16, window.innerWidth - w - 12) + "px";
  tip.style.top = Math.max(12, cy - h - 14) + "px";
}
const hideGxTip = () => { $("gx-tip").hidden = true; };

/* filters */
function renderIssueChips() {
  $("gx-issues").innerHTML = G.labels
    .slice().sort((a, b) => b.n - a.n)
    .map((l) => {
      const idx = G.issues.indexOf(l.key);
      return `<button class="gx-chip" data-issue="${idx}" onclick="gxIssue(${idx})">
        <i style="background:${l.hue}"></i>${l.label}<b>${l.n}</b></button>`;
    }).join("");
}

function applyGxFilter() {
  const q = gFilter.q.toLowerCase();
  for (let i = 0; i < G.n; i++) {
    let ok = 1;
    if (gFilter.lean >= 0 && G.l[i] !== gFilter.lean) ok = 0;
    if (ok && gFilter.issue >= 0 && G.i[i] !== gFilter.issue) ok = 0;
    if (ok && q) {
      const hay = G.t[i] + " " + G.channel_names[G.c[i]];
      if (!hay.toLowerCase().includes(q)) ok = 0;
    }
    gMatch[i] = ok;
  }
  let n = 0;
  for (let i = 0; i < G.n; i++) n += gMatch[i];
  const filtering = gFilter.q || gFilter.lean >= 0 || gFilter.issue >= 0;
  $("gx-status").textContent = filtering
    ? `${n.toLocaleString()} of ${G.n.toLocaleString()} videos match`
    : `${G.n.toLocaleString()} videos · ${G.labels.length} issue families · ${G.channels.length} channels`;
  queueDraw();
}

function gxSearch(v) { gFilter.q = v.trim(); applyGxFilter(); }
function gxLean(n) {
  gFilter.lean = gFilter.lean === n ? -1 : n;
  document.querySelectorAll("#gx-leans button").forEach((b, idx) =>
    b.classList.toggle("on", idx === gFilter.lean));
  applyGxFilter();
}
function gxIssue(n) {
  gFilter.issue = gFilter.issue === n ? -1 : n;
  document.querySelectorAll("#gx-issues .gx-chip").forEach((b) =>
    b.classList.toggle("on", +b.dataset.issue === gFilter.issue));
  applyGxFilter();
  if (gFilter.issue >= 0) {
    const l = G.labels.find((x) => x.key === G.issues[gFilter.issue]);
    if (l) zoomTo(l.x, l.y, 2.6);
  }
}
function gxReset() {
  gFilter = { q: "", lean: -1, issue: -1 };
  $("gx-search").value = "";
  document.querySelectorAll("#gx-leans button, #gx-issues .gx-chip")
    .forEach((b) => b.classList.remove("on"));
  applyGxFilter();
  fitGalaxy();
}

function zoomTo(x, y, k) {
  const cv = $("gx-canvas");
  gView.k = k;
  gView.x = cv.clientWidth / 2 - x * k;
  gView.y = cv.clientHeight / 2 - y * k;
  queueDraw();
}

/* mobile: button zoom (centered) + single-finger pan + tap-to-play */
function gxZoomBtn(f) {
  const cv = $("gx-canvas");
  const mx = cv.clientWidth / 2, my = cv.clientHeight / 2;
  const k = Math.max(0.05, Math.min(14, gView.k * f));
  gView.x = mx - (mx - gView.x) * (k / gView.k);
  gView.y = my - (my - gView.y) * (k / gView.k);
  gView.k = k;
  queueDraw();
}

(function bindTouch() {
  const cv = $("gx-canvas");
  if (!cv) return;
  let tLast = null, moved = 0, pinch = null;
  cv.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      tLast = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      moved = 0;
    } else if (e.touches.length === 2) {
      const [a, b] = e.touches;
      pinch = { d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
                cx: (a.clientX + b.clientX) / 2, cy: (a.clientY + b.clientY) / 2 };
    }
  }, { passive: true });
  cv.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (e.touches.length === 1 && tLast) {
      const t = e.touches[0];
      moved += Math.abs(t.clientX - tLast.x) + Math.abs(t.clientY - tLast.y);
      gView.x += t.clientX - tLast.x;
      gView.y += t.clientY - tLast.y;
      tLast = { x: t.clientX, y: t.clientY };
      fastDraw();
    } else if (e.touches.length === 2 && pinch) {
      const [a, b] = e.touches;
      const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const rect = cv.getBoundingClientRect();
      const mx = pinch.cx - rect.left, my = pinch.cy - rect.top;
      const k = Math.max(0.05, Math.min(14, gView.k * (d / pinch.d)));
      gView.x = mx - (mx - gView.x) * (k / gView.k);
      gView.y = my - (my - gView.y) * (k / gView.k);
      gView.k = k;
      pinch.d = d;
      fastDraw();
    }
  }, { passive: false });
  cv.addEventListener("touchend", (e) => {
    if (e.touches.length === 0 && tLast && moved < 10 && G) {
      const rect = cv.getBoundingClientRect();
      const hit = pickPoint(tLast.x - rect.left, tLast.y - rect.top);
      if (hit >= 0) play(G.v[hit], 0, G.t[hit]);   // tap = play (mobile limitation)
    }
    tLast = null; pinch = null;
  });
})();
