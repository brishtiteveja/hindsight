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
let gThumbMode = true;
const gThumbImages = new Map();
let gThumbHits = [];

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
  if (!w || !h) return;
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
  if (!w || !h) return;
  if (cv.width !== w * dpr || cv.height !== h * dpr) {
    cv.width = w * dpr; cv.height = h * dpr;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const filtering = gFilter.q || gFilter.lean >= 0 || gFilter.issue >= 0;
  const r = gThumbMode ? Math.max(1, Math.min(2.6, 1.6 * gView.k)) : Math.max(1.5, Math.min(5.5, 2.2 * gView.k * 6));

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

  if (gThumbMode) drawGalaxyThumbnails(ctx,w,h);

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
  if ($("view-galaxy").hidden) return;
  if (!gSnap || !gSnap.view || !gSnap.cv.width || !gSnap.cv.height) { queueDraw(); return; }
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
  if (gThumbMode) for (const hit of gThumbHits) {
    if ((sx(G.x[hit.i])-px)**2+(sy(G.y[hit.i])-py)**2 <= (hit.worldRadius*gView.k)**2) return hit.i;
  }
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
      const hay = G.t[i] + " " + G.channel_names[G.c[i]] + " " + G.issues[G.i[i]].replace(/_/g," ");
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
  const matched = [];
  for (let i = 0; i < G.n; i++) if (gMatch[i]) matched.push(i);
  matched.sort((a,b) => G.d[a].localeCompare(G.d[b]));
  const chosen = matched.length <= 8 ? matched : Array.from({length:8}, (_,i) => matched[Math.round(i*(matched.length-1)/7)]);
  window.hsGalaxySelection = {issue: gFilter.issue < 0 ? null : G.labels.find(l=>l.key===G.issues[gFilter.issue])?.label,
    query: gFilter.q, matching_videos: n, sources: chosen.map(i=>({video_id:G.v[i], channel:G.channels[G.c[i]], title:G.t[i], date:G.d[i]})), sampling:"Up to eight matching videos sampled across archive dates; not an exhaustive comparison."};
  window.hsContext && hsBroadcast();
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
    fitGalaxyMatches();
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

function gxInvestigate() {
  if (!G) return;
  applyGxFilter();
  window.hsInvestigation = null;
  hsBroadcast();
  window.dispatchEvent(new CustomEvent("hs:open-agent"));
}
function gxToggleMotion() {
  const paused = $("view-home").classList.toggle("gx-motion-paused");
  $("gx-motion").textContent = paused ? "Resume motion" : "Pause motion";
  $("gx-motion").setAttribute("aria-pressed", String(paused));
}

let HOME_GALAXY = null;
let homeLayout = null;
async function loadHomeGalaxy() {
  try {
    if (!HOME_GALAXY) HOME_GALAXY = await api("v1/galaxy");
    const d = HOME_GALAXY;
    $("home-galaxy-status").textContent = `${d.n.toLocaleString()} mapped videos · ${d.labels.length} issue families · ${d.channels.length} channels`;
    drawHomeGalaxy();
    const cv = $("home-galaxy");
    cv.onmousemove = homeGalaxyHover;
    cv.onmouseleave = () => { $("home-galaxy-tip").hidden = true; };
    cv.onclick = (e) => { const issue = homeGalaxyPick(e); if (issue) homeOpenCluster(issue.key); };
  } catch { $("home-galaxy-status").textContent = "The map is unavailable. Explore the featured story below."; }
}
function drawHomeGalaxy() {
  if (!HOME_GALAXY || $("view-home").hidden) return;
  const d = HOME_GALAXY, cv = $("home-galaxy"), ctx = cv.getContext("2d");
  const w = cv.clientWidth, h = cv.clientHeight, dpi = Math.min(devicePixelRatio || 1, 2);
  cv.width = w*dpi; cv.height = h*dpi; ctx.setTransform(dpi,0,0,dpi,0,0);
  const left = w > 800 ? Math.min(470,w*.37) : 0, available = w-left;
  const k = Math.min(available*.95,h*.90)/d.world;
  const x = left+(available-d.world*k)/2, y=(h-d.world*k)/2;
  const hues = d.issues.map(key=>d.labels.find(l=>l.key===key)?.hue || "#aaa");
  const paths = hues.map(()=>new Path2D());
  const r = w > 800 ? .65 : .42;
  for(let i=0;i<d.n;i++) paths[d.i[i]].rect(d.x[i]*k+x,d.y[i]*k+y,r*1.5,r*1.5);
  paths.forEach((path,i)=>{ctx.fillStyle=hues[i];ctx.globalAlpha=.8;ctx.fill(path);});
  homeLayout = {x,y,k};
  const labels = $("home-cluster-labels");
  labels.innerHTML = "";
  for (const l of d.labels.filter(l=>l.n>700)) {
    const b = document.createElement("button");
    b.textContent = l.label; b.style.left = `${l.x*k+x}px`; b.style.top = `${l.y*k+y}px`; b.style.color = l.hue;
    b.setAttribute("aria-label", `Explore ${l.label}, ${l.n.toLocaleString()} videos`);
    b.title = `${l.n.toLocaleString()} videos · Open this issue in the Galaxy`;
    b.onclick = () => homeOpenCluster(l.key);
    b.onmouseenter = (e) => homeGalaxyTooltip(l,e.clientX,e.clientY);
    b.onmouseleave = () => {$("home-galaxy-tip").hidden=true;};
    labels.appendChild(b);
  }
}
window.addEventListener("resize",()=>{if(HOME_GALAXY) requestAnimationFrame(drawHomeGalaxy);});

function homeGalaxyPick(e) {
  if (!HOME_GALAXY || !homeLayout) return null;
  const rect = $("home-galaxy").getBoundingClientRect(), d = HOME_GALAXY;
  const px = e.clientX-rect.left, py = e.clientY-rect.top;
  let nearest = -1, distance = 16*16;
  for (let i=0;i<d.n;i++) {
    const dx=d.x[i]*homeLayout.k+homeLayout.x-px, dy=d.y[i]*homeLayout.k+homeLayout.y-py;
    const dd=dx*dx+dy*dy;
    if(dd<distance){distance=dd;nearest=i;}
  }
  return nearest<0 ? null : d.labels.find(l=>l.key===d.issues[d.i[nearest]]);
}
function homeGalaxyTooltip(issue, clientX, clientY) {
  const tip = $("home-galaxy-tip"), wrap=$("home-galaxy").parentElement.getBoundingClientRect();
  tip.hidden=false;
  tip.innerHTML=`<strong>${esc(issue.label)}</strong><span>${issue.n.toLocaleString()} videos in this issue family</span><p>Explore how channels cover this issue. Open the cluster to inspect individual videos and sources.</p><b>Open in Galaxy</b>`;
  tip.style.left=`${Math.max(12,Math.min(clientX-wrap.left+16,wrap.width-272))}px`;
  tip.style.top=`${Math.max(12,Math.min(clientY-wrap.top+16,wrap.height-165))}px`;
}
function homeGalaxyHover(e) {
  const issue = homeGalaxyPick(e);
  $("home-galaxy").style.cursor=issue ? "pointer" : "default";
  if(issue) homeGalaxyTooltip(issue,e.clientX,e.clientY); else $("home-galaxy-tip").hidden=true;
}
async function homeOpenCluster(key) {
  $("home-galaxy-tip").hidden=true;
  await go("galaxy");
  if(!G) return;
  const idx=G.issues.indexOf(key);
  if(idx>=0){gxReset();gxIssue(idx);}
}

function fitGalaxyMatches() {
  if (!G) return;
  const cv=$("gx-canvas"), w=cv.clientWidth,h=cv.clientHeight;
  let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  for(let i=0;i<G.n;i++) if(gMatch[i]){minX=Math.min(minX,G.x[i]);maxX=Math.max(maxX,G.x[i]);minY=Math.min(minY,G.y[i]);maxY=Math.max(maxY,G.y[i]);}
  if(!Number.isFinite(minX)){fitGalaxy();return;}
  const left=w>720?280:24, right=35, top=90, bottom=95;
  const k=Math.min((w-left-right)/Math.max(100,maxX-minX+90),(h-top-bottom)/Math.max(100,maxY-minY+90),3);
  gZoomAnim=null;gView.k=k;gView.x=left+(w-left-right)/2-(minX+maxX)/2*k;gView.y=top+(h-top-bottom)/2-(minY+maxY)/2*k;
  queueDraw();
}
function gxToggleThumbnails(){gThumbMode=!gThumbMode;$("gx-thumbnails").textContent=`Video thumbnails ${gThumbMode?'on':'off'}`;$("gx-thumbnails").setAttribute('aria-pressed',String(gThumbMode));queueDraw();}
function drawGalaxyThumbnails(ctx,w,h){
  gThumbHits=[];
  const occupied=new Set();let count=0;const size=32;
  for(let i=0;i<G.n&&count<44;i++){
    if(!gMatch[i])continue;
    const px=sx(G.x[i]),py=sy(G.y[i]);
    if(px<12||py<80||px>w-20||py>h-80||(w>720&&px<280))continue;
    const cell=`${Math.floor(px/74)}:${Math.floor(py/74)}`;if(occupied.has(cell))continue;occupied.add(cell);count++;
    const id=G.v[i];let img=gThumbImages.get(id);
    if(!img){img=new Image();img.onload=()=>{if(!$("view-galaxy").hidden)queueDraw();};img.src=`https://i.ytimg.com/vi/${encodeURIComponent(id)}/default.jpg`;gThumbImages.set(id,img);if(gThumbImages.size>220)gThumbImages.delete(gThumbImages.keys().next().value);}
    if(!img.complete||!img.naturalWidth)continue;
    gThumbHits.push({i,worldRadius:size/(2*gView.k)});
    ctx.save();ctx.beginPath();ctx.arc(px,py,size/2,0,Math.PI*2);ctx.clip();const side=Math.min(img.naturalWidth,img.naturalHeight);ctx.drawImage(img,(img.naturalWidth-side)/2,(img.naturalHeight-side)/2,side,side,px-size/2,py-size/2,size,size);ctx.restore();
    ctx.beginPath();ctx.arc(px,py,size/2,0,Math.PI*2);ctx.strokeStyle=G.hues[G.i[i]];ctx.lineWidth=1.5;ctx.stroke();
  }
}
