import { n as e } from "./chunk-Y2CYZVJY-i11wjrBe.mjs";
import { h as t, m as n, p as r } from "./src-DKnM293t.mjs";
import { $ as i, C as a, E as o, I as s, L as c, N as l, P as u, Q as d, S as f, T as p, V as m, W as h, X as g, Z as _, _ as v, b as y, c as b, g as x, l as S, m as C, n as w, p as T, q as E, r as D, s as O, t as k, u as A, x as j } from "./chunk-DU6HZSFF-Bv553b-w.mjs";
import { S as M, a as N, d as ee, f as P, g as F, h as I, i as L, o as R, v as te, x as ne, y as re } from "./chunk-75Z2AOVW-DlpwHa_5.mjs";
import { r as ie } from "./chunk-PWAF6VOD-CPL-Te_E.mjs";
import { i as ae } from "./chunk-GMAD6QVW-4mlTi1Bn.mjs";
import "./chunk-P2QGCYS3-DGLAAY3E.mjs";
import { a as oe } from "./chunk-4HAMMTFA-DyLvtKHk.mjs";
import { i as se, n as ce, r as le, t as ue } from "./chunk-GVQU2GXP-QLVNlVya.mjs";
import { a as de, c as fe, i as pe, l as z, n as me, r as he, s as ge, t as _e } from "./chunk-OSK3NFVY-Bbxjh8pF.mjs";
import { t as ve } from "./graphlib-W4p2eKAU.mjs";
import { n as ye, t as be } from "./chunk-L3NEJ4N5-xQTuRmpd.mjs";
//#region node_modules/mermaid/dist/chunks/mermaid.core/chunk-CLGD4ZFX.mjs
var xe = /* @__PURE__ */ e((e) => {
	let { securityLevel: t } = j(), n = r("body");
	if (t === "sandbox") {
		let t = r(`#i${e}`).node()?.contentDocument ?? document;
		n = r(t.body);
	}
	return n.select(`#${e}`);
}, "selectSvgElement");
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/isPrototype.mjs
function Se(e) {
	let t = e?.constructor;
	return e === (typeof t == "function" ? t.prototype : Object.prototype);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isEmpty.mjs
function Ce(e) {
	if (e == null) return !0;
	if (ne(e)) return typeof e.splice != "function" && typeof e != "string" && !M(e) && !te(e) && !re(e) ? !1 : e.length === 0;
	if (typeof e == "object" || typeof e == "function") {
		if (e instanceof Map || e instanceof Set) return e.size === 0;
		let t = Object.keys(e);
		return Se(e) ? t.filter((e) => e !== "constructor").length === 0 : t.length === 0;
	}
	return !0;
}
//#endregion
//#region node_modules/mermaid/dist/chunks/mermaid.core/chunk-TLUHSLCS.mjs
var we = {
	common: O,
	getConfig: y,
	insertCluster: ye,
	insertEdge: pe,
	insertEdgeLabel: de,
	insertMarkers: ge,
	insertNode: le,
	interpolateToCurve: ee,
	labelHelper: oe,
	log: n,
	positionEdgeLabel: fe
}, Te = {}, Ee = /* @__PURE__ */ e((e) => {
	for (let t of e) Te[t.name] = t;
}, "registerLayoutLoaders");
(/* @__PURE__ */ e(() => {
	Ee([
		{
			name: "dagre",
			loader: /* @__PURE__ */ e(async () => await import("./dagre-GXQ25YYZ-Dz-CdTaE.mjs"), "loader")
		},
		{
			name: "swimlane",
			loader: /* @__PURE__ */ e(async () => await import("./swimlanes-42K2YHIH-8oRO9rC7.mjs"), "loader")
		},
		{
			name: "cose-bilkent",
			loader: /* @__PURE__ */ e(async () => await import("./cose-bilkent-JH36ORCC-D_ID025i.mjs"), "loader")
		}
	]);
}, "registerDefaultLayoutLoaders"))();
var De = /* @__PURE__ */ e(async (e, t) => {
	if (!(e.layoutAlgorithm in Te)) throw Error(`Unknown layout algorithm: ${e.layoutAlgorithm}`);
	if (e.diagramId) for (let t of e.nodes) {
		let n = t.domId || t.id;
		t.domId = `${e.diagramId}-${n}`;
	}
	let n = Te[e.layoutAlgorithm], r = await n.loader(), { theme: i, themeVariables: a } = e.config, { useGradient: o, gradientStart: s, gradientStop: c } = a, l = t.attr("id");
	if (t.append("defs").append("filter").attr("id", `${l}-drop-shadow`).attr("height", "130%").attr("width", "130%").append("feDropShadow").attr("dx", "4").attr("dy", "4").attr("stdDeviation", 0).attr("flood-opacity", "0.06").attr("flood-color", `${i?.includes("dark") ? "#FFFFFF" : "#000000"}`), t.append("defs").append("filter").attr("id", `${l}-drop-shadow-small`).attr("height", "150%").attr("width", "150%").append("feDropShadow").attr("dx", "2").attr("dy", "2").attr("stdDeviation", 0).attr("flood-opacity", "0.06").attr("flood-color", `${i?.includes("dark") ? "#FFFFFF" : "#000000"}`), o) {
		let e = t.append("linearGradient").attr("id", t.attr("id") + "-gradient").attr("gradientUnits", "objectBoundingBox").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
		e.append("svg:stop").attr("offset", "0%").attr("stop-color", s).attr("stop-opacity", 1), e.append("svg:stop").attr("offset", "100%").attr("stop-color", c).attr("stop-opacity", 1);
	}
	return r.render(e, t, we, { algorithm: n.algorithm });
}, "render"), Oe = /* @__PURE__ */ e((e = "", { fallback: t = "dagre" } = {}) => {
	if (e in Te) return e;
	if (t in Te) return n.warn(`Layout algorithm ${e} is not registered. Using ${t} as fallback.`), t;
	throw Error(`Both layout algorithms ${e} and ${t} are not registered.`);
}, "getRegisteredLayoutAlgorithm");
//#endregion
//#region node_modules/mermaid/dist/chunks/mermaid.core/chunk-2E4U76K2.mjs
function ke(e, { edgePathsClass: t = "edges edgePaths" } = {}) {
	let n = e.insert("g").attr("class", "root");
	return {
		clusters: n.insert("g").attr("class", "clusters"),
		edgePaths: n.insert("g").attr("class", t),
		edgeLabels: n.insert("g").attr("class", "edgeLabels"),
		nodes: n.insert("g").attr("class", "nodes"),
		rootGroups: n
	};
}
e(ke, "createLayoutElementGroups");
async function Ae(e, t) {
	if (t.label) {
		let { shapeSvg: n, bbox: r } = await oe(e, t);
		t.labelBBox = {
			width: r.width,
			height: r.height
		}, n.remove();
	} else t.labelBBox = {
		width: 0,
		height: 0
	};
}
e(Ae, "measureGroupLabel");
async function je(e, t, n) {
	let r = await le(e, t, n), i = r.node()?.getBBox() ?? {
		width: 0,
		height: 0
	};
	return t.width = i.width, t.height = i.height, r;
}
e(je, "insertMeasuredNode");
async function Me(e, t) {
	let n = new ve({
		multigraph: !0,
		compound: !0
	}), r = [...t.edges], i = j(), a = ke(e), { edgeLabels: o, nodes: s } = a, c = /* @__PURE__ */ new Map(), l = e.node() != null;
	await Promise.all(t.nodes.map(async (e) => {
		if (e.isGroup) l && await Ae(s, e), n.setNode(e.id, { ...e });
		else {
			if (l) {
				let t = await je(s, e, {
					config: i,
					dir: e.dir
				});
				c.set(e.id, t);
			}
			n.setNode(e.id, { ...e });
		}
	}));
	for (let e of r) l && he(e) && await de(o, e), n.setEdge(e.start, e.end, { ...e }, e.id), t.edges.some((t) => t.id === e.id) || t.edges.push(e);
	if (globalThis.mermaidCaptureSizes) {
		let { captureNodeSizes: n } = await import("./sizeCapture-INFHLROL-CEIhjxQh.mjs");
		n(e, t);
	}
	return {
		graph: n,
		groups: a,
		nodeElements: c
	};
}
e(Me, "createGraphWithElements");
var B = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Map(), Ne = /* @__PURE__ */ new Map(), Pe = /* @__PURE__ */ e(() => {
	V.clear(), Ne.clear(), B.clear();
}, "clear"), Fe = /* @__PURE__ */ e((e, t) => {
	let r = V.get(t) || [];
	return n.trace("In isDescendant", t, " ", e, " = ", r.includes(e)), r.includes(e);
}, "isDescendant"), Ie = /* @__PURE__ */ e((e, t) => {
	let r = V.get(t) || [];
	return n.info("Descendants of ", t, " is ", r), n.info("Edge is ", e), e.v === t || e.w === t ? !1 : r ? r.includes(e.v) || Fe(e.v, t) || Fe(e.w, t) || r.includes(e.w) : (n.debug("Tilt, ", t, ",not in descendants"), !1);
}, "edgeInCluster"), Le = /* @__PURE__ */ e((e, t, r, i) => {
	n.debug("Copying children of ", e, "root", i, "data", t.node(e), i);
	let a = t.children(e) || [];
	e !== i && a.push(e), n.debug("Copying (nodes) clusterId", e, "nodes", a), a.forEach((a) => {
		if (t.children(a).length > 0) Le(a, t, r, i);
		else {
			let o = t.node(a);
			n.info("cp ", a, " to ", i, " with parent ", e), r.setNode(a, o), i !== t.parent(a) && (n.debug("Setting parent", a, t.parent(a)), r.setParent(a, t.parent(a))), e !== i && a !== e ? (n.debug("Setting parent", a, e), r.setParent(a, e)) : (n.info("In copy ", e, "root", i, "data", t.node(e), i), n.debug("Not Setting parent for node=", a, "cluster!==rootId", e !== i, "node!==clusterId", a !== e));
			let s = t.edges(a);
			n.debug("Copying Edges", s), s.forEach((a) => {
				n.info("Edge", a);
				let o = t.edge(a.v, a.w, a.name);
				n.info("Edge data", o, i);
				try {
					Ie(a, i) ? (n.info("Copying as ", a.v, a.w, o, a.name), r.setEdge(a.v, a.w, o, a.name), n.info("newGraph edges ", r.edges(), r.edge(r.edges()[0]))) : n.info("Skipping copy of edge ", a.v, "-->", a.w, " rootId: ", i, " clusterId:", e);
				} catch (e) {
					n.error(e);
				}
			});
		}
		n.debug("Removing node", a), t.removeNode(a);
	});
}, "copy"), Re = /* @__PURE__ */ e((e, t) => {
	let n = t.children(e), r = [...n];
	for (let i of n) Ne.set(i, e), r = [...r, ...Re(i, t)];
	return r;
}, "extractDescendants"), ze = /* @__PURE__ */ e((e, t, n) => {
	let r = e.edges().filter((e) => e.v === t || e.w === t), i = e.edges().filter((e) => e.v === n || e.w === n), a = r.map((e) => ({
		v: e.v === t ? n : e.v,
		w: e.w === t ? t : e.w
	})), o = i.map((e) => ({
		v: e.v,
		w: e.w
	}));
	return a.filter((e) => o.some((t) => e.v === t.v && e.w === t.w));
}, "findCommonEdges"), Be = /* @__PURE__ */ e((e, t, r) => {
	let i = t.children(e);
	if (n.trace("Searching children of id ", e, i), i.length < 1) return e;
	let a;
	for (let e of i) {
		let n = Be(e, t, r), i = ze(t, r, n);
		if (n) {
			if (i.length > 0) a = n;
			else return n;
		}
	}
	return a;
}, "findNonClusterChild"), Ve = /* @__PURE__ */ e((e) => !B.has(e) || !B.get(e).externalConnections ? e : B.has(e) ? B.get(e).id : e, "getAnchorId"), He = /* @__PURE__ */ e((e, t) => {
	if (!e || t > 10) {
		n.debug("Opting out, no graph ");
		return;
	}
	n.debug("Opting in, graph "), e.nodes().forEach(function(t) {
		e.children(t).length > 0 && (n.debug("Cluster identified", t, " Replacement id in edges: ", Be(t, e, t)), V.set(t, Re(t, e)), B.set(t, {
			id: Be(t, e, t),
			clusterData: e.node(t)
		}));
	}), e.nodes().forEach(function(t) {
		let r = e.children(t), i = e.edges();
		r.length > 0 ? (n.debug("Cluster identified", t, V), i.forEach((e) => {
			Fe(e.v, t) ^ Fe(e.w, t) && (n.debug("Edge: ", e, " leaves cluster ", t), n.debug("Descendants of XXX ", t, ": ", V.get(t)), B.get(t).externalConnections = !0);
		})) : n.debug("Not a cluster ", t, V);
	});
	for (let t of B.keys()) {
		let n = B.get(t).id, r = e.parent(n);
		r !== t && B.has(r) && !B.get(r).externalConnections && (B.get(t).id = r);
		let i = e.edges().some((e) => e.v === t);
		if (n && B.get(t)?.externalConnections && i && Ke(e, n, t)) {
			let r = qe(e, t, e.parent(n));
			r && (B.get(t).id = r);
		}
	}
	e.edges().forEach(function(t) {
		let r = e.edge(t);
		n.debug("Edge " + t.v + " -> " + t.w + ": " + JSON.stringify(t)), n.debug("Edge " + t.v + " -> " + t.w + ": " + JSON.stringify(e.edge(t)));
		let i = t.v, a = t.w;
		if (n.debug("Fix XXX", B, "ids:", t.v, t.w, "Translating: ", B.get(t.v), " --- ", B.get(t.w)), B.get(t.v) || B.get(t.w)) {
			if (n.debug("Fixing and trying - removing XXX", t.v, t.w, t.name), i = Ve(t.v), a = Ve(t.w), e.removeEdge(t.v, t.w, t.name), i !== t.v) {
				let n = e.parent(i);
				B.get(n).externalConnections = !0, r.fromCluster = t.v;
			}
			if (a !== t.w) {
				let n = e.parent(a);
				B.get(n).externalConnections = !0, r.toCluster = t.w;
			}
			n.debug("Fix Replacing with XXX", i, a, t.name), e.setEdge(i, a, r, t.name);
		}
	}), Ue(e, 0), n.trace(B);
}, "adjustClustersAndEdges"), Ue = /* @__PURE__ */ e((e, t) => {
	if (t > 10) {
		n.error("Bailing out");
		return;
	}
	let r = e.nodes(), i = !1;
	for (let t of r) {
		let n = e.children(t);
		i = i || n.length > 0;
	}
	if (!i) {
		n.debug("Done, no node has children", e.nodes());
		return;
	}
	n.debug("Nodes = ", r, t);
	for (let i of r) if (n.debug("Extracting node", i, B, B.has(i) && !B.get(i).externalConnections, !e.parent(i), e.node(i), e.children("D"), " Depth ", t), !B.has(i)) n.debug("Not a cluster", i, t);
	else if (!B.get(i).externalConnections && e.children(i) && e.children(i).length > 0) {
		n.debug("Cluster without external connections, without a parent and with children", i, t);
		let r = e.graph().rankdir === "TB" ? "LR" : "TB";
		B.get(i)?.clusterData?.dir && (r = B.get(i).clusterData.dir, n.debug("Fixing dir", B.get(i).clusterData.dir, r));
		let a = new ve({
			multigraph: !0,
			compound: !0
		}).setGraph({
			rankdir: r,
			nodesep: 50,
			ranksep: 50,
			marginx: 8,
			marginy: 8
		}).setDefaultEdgeLabel(function() {
			return {};
		});
		Le(i, e, a, i), e.setNode(i, {
			clusterNode: !0,
			id: i,
			clusterData: B.get(i).clusterData,
			label: B.get(i).label,
			graph: a
		});
	} else n.debug("Cluster ** ", i, " **not meeting the criteria !externalConnections:", !B.get(i).externalConnections, " no parent: ", !e.parent(i), " children ", e.children(i) && e.children(i).length > 0, e.children("D"), t), n.debug(B);
	r = e.nodes(), n.debug("New list of nodes", r);
	for (let i of r) {
		let r = e.node(i);
		n.debug(" Now next level", i, r), r?.clusterNode && Ue(r.graph, t + 1);
	}
}, "extractor"), We = /* @__PURE__ */ e((e, t) => {
	if (t.length === 0) return [];
	let n = Object.assign([], t);
	return t.forEach((t) => {
		let r = We(e, e.children(t));
		n = [...n, ...r];
	}), n;
}, "sorter"), Ge = /* @__PURE__ */ e((e) => We(e, e.children()), "sortNodesByHierarchy"), Ke = /* @__PURE__ */ e((e, t, n) => {
	let r = e.parent(t);
	for (; r && r !== n;) {
		let t = B.get(r);
		if (t && !t.externalConnections) return !0;
		r = e.parent(r);
	}
	return !1;
}, "isNodeInExtractableCluster"), qe = /* @__PURE__ */ e((e, t, n) => {
	let r = e.children(t) ?? [];
	for (let i of r) {
		if (i === n || Fe(i, n)) continue;
		let r = Be(i, e, t);
		if (r && !Ke(e, r, t)) return r;
	}
	return null;
}, "findSafeAnchorNode");
function Je({ prepareLayout: t, measureLayout: n, runLayoutCore: r, paintLayout: i, afterPaint: a, paintOptions: o }) {
	let s = n ?? Xe;
	return /* @__PURE__ */ e(async function(e, n, c, l) {
		let u = n.select("g");
		(c?.insertMarkers ?? ge)(u, e.markers, e.type, e.diagramId), Ye();
		let d = {
			element: u,
			helpers: c,
			options: l
		};
		d.preparedLayout = await t?.(e, d);
		let f = await s(e, d), p = await r(e, d), m = {
			...d,
			measure: f
		};
		i ? await i(e, m, p) : await Ze(e, m, o), await a?.(e, m, p);
	}, "render");
}
e(Je, "createCommonLayoutRenderer");
function Ye() {
	ue(), _e(), be(), Pe();
}
e(Ye, "clearLayoutRenderState");
async function Xe(e, { element: t }) {
	return await Me(t, e);
}
e(Xe, "defaultMeasureLayout");
async function Ze(e, t, n = {}) {
	let { measure: r } = t, { groups: i } = r;
	for (let r of n.getNodes?.(e, t) ?? e.nodes) n.skipNode?.(r, t) || await Qe(i, r, t, n);
	let a = et(e.nodes);
	for (let r of e.edges) tt(r, n) || await nt(i, r, a, e, n, t);
}
e(Ze, "paintLayoutData");
async function Qe(e, t, n, r) {
	t.clusterNode ? se(t) : $e(t, n, r) ? await ye(e.clusters, t) : se(t);
}
e(Qe, "paintLayoutNode");
function $e(e, t, n) {
	return e.isGroup === !0 && (n.isCluster?.(e, t) ?? !0);
}
e($e, "shouldPaintAsCluster");
function et(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) n?.id && t.set(n.id, n);
	return t;
}
e(et, "buildNodeLookup");
function tt(e, t) {
	return e.isLayoutOnly || !!t.skipEdge?.(e);
}
e(tt, "shouldSkipPaintEdge");
async function nt(e, t, n, r, i, a) {
	let o = pe(e.edgePaths, { ...t }, i.clusterDb ?? /* @__PURE__ */ new Map(), r.type, rt(t.start, t, n, a, i), rt(t.end, t, n, a, i), r.diagramId, it(t, i));
	he(t) && (me.has(t.id) || await de(e.edgeLabels, t), at(t, o));
}
e(nt, "paintLayoutEdge");
function rt(e, t, n, r, i) {
	return i.getEdgeNode?.(e, t, r) ?? (e ? n.get(e) ?? {} : {});
}
e(rt, "getRenderedNode");
function it(e, t) {
	return typeof t.skipIntersect == "function" ? t.skipIntersect(e) : t.skipIntersect ?? !1;
}
e(it, "shouldSkipIntersect");
function at(e, t) {
	let r = t?.updatedPath ?? t?.originalPath, i = y(), { subGraphTitleTotalMargin: a } = ce({ flowchart: i.flowchart ?? {} });
	if (e.label) {
		let i = me.get(e.id), o = e.x, s = e.y;
		if (r) {
			let i = F.calcLabelPosition(r);
			n.debug("Moving label " + e.label + " from (", o, ",", s, ") to (", i.x, ",", i.y, ") abc88"), t?.updatedPath && (o = i.x, s = i.y);
		}
		i.attr("transform", `translate(${o}, ${s + a / 2})`);
	}
	if (e?.startLabelLeft) {
		let t = z.get(e.id).startLeft, n = e?.x, i = e?.y;
		if (r) {
			let t = F.calcTerminalLabelPosition(e.arrowTypeStart ? 10 : 0, "start_left", r);
			n = t.x, i = t.y;
		}
		t.attr("transform", `translate(${n}, ${i})`);
	}
	if (e.startLabelRight) {
		let t = z.get(e.id).startRight, n = e.x, i = e.y;
		if (r) {
			let t = F.calcTerminalLabelPosition(e.arrowTypeStart ? 10 : 0, "start_right", r);
			n = t.x, i = t.y;
		}
		t.attr("transform", `translate(${n}, ${i})`);
	}
	if (e.endLabelLeft) {
		let t = z.get(e.id).endLeft, n = e.x, i = e.y;
		if (r) {
			let t = F.calcTerminalLabelPosition(e.arrowTypeEnd ? 10 : 0, "end_left", r);
			n = t.x, i = t.y;
		}
		t.attr("transform", `translate(${n}, ${i})`);
	}
	if (e.endLabelRight) {
		let t = z.get(e.id).endRight, n = e.x, i = e.y;
		if (r) {
			let t = F.calcTerminalLabelPosition(e.arrowTypeEnd ? 10 : 0, "end_right", r);
			n = t.x, i = t.y;
		}
		t.attr("transform", `translate(${n}, ${i})`);
	}
}
e(at, "positionRenderedEdgeLabel");
//#endregion
//#region node_modules/mermaid/dist/chunks/mermaid.core/chunk-LNGE3PJU.mjs
function ot(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
e(ot, "getDefaultExportFromCjs");
var H = {}, st = {}, U = {}, ct;
function W() {
	if (ct) return U;
	ct = 1;
	function t(e) {
		return e == null;
	}
	e(t, "isNothing");
	function n(e) {
		return typeof e == "object" && !!e;
	}
	e(n, "isObject");
	function r(e) {
		return Array.isArray(e) ? e : t(e) ? [] : [e];
	}
	e(r, "toArray");
	function i(e, t) {
		if (t) {
			let n = Object.keys(t);
			for (let r = 0, i = n.length; r < i; r += 1) {
				let i = n[r];
				e[i] = t[i];
			}
		}
		return e;
	}
	e(i, "extend");
	function a(e, t) {
		let n = "";
		for (let r = 0; r < t; r += 1) n += e;
		return n;
	}
	e(a, "repeat");
	function o(e) {
		return e === 0 && 1 / e == -Infinity;
	}
	return e(o, "isNegativeZero"), U.isNothing = t, U.isObject = n, U.toArray = r, U.repeat = a, U.isNegativeZero = o, U.extend = i, U;
}
e(W, "requireCommon");
var lt, ut;
function G() {
	if (ut) return lt;
	ut = 1;
	function t(e, t) {
		let n = "", r = e.reason || "(unknown reason)";
		return e.mark ? (e.mark.name && (n += "in \"" + e.mark.name + "\" "), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += "\n\n" + e.mark.snippet), r + " " + n) : r;
	}
	e(t, "formatError");
	function n(e, n) {
		Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = t(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (/* @__PURE__ */ Error()).stack || "";
	}
	return e(n, "YAMLException2"), n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n.prototype.toString = /* @__PURE__ */ e(function(e) {
		return this.name + ": " + t(this, e);
	}, "toString"), lt = n, lt;
}
e(G, "requireException");
var dt, ft;
function pt() {
	if (ft) return dt;
	ft = 1;
	let t = W();
	function n(e, t, n, r, i) {
		let a = "", o = "", s = Math.floor(i / 2) - 1;
		return r - t > s && (a = " ... ", t = r - s + a.length), n - r > s && (o = " ...", n = r + s - o.length), {
			str: a + e.slice(t, n).replace(/\t/g, "→") + o,
			pos: r - t + a.length
		};
	}
	e(n, "getLine");
	function r(e, n) {
		return t.repeat(" ", n - e.length) + e;
	}
	e(r, "padStart");
	function i(e, i) {
		if (i = Object.create(i || null), !e.buffer) return null;
		i.maxLength || (i.maxLength = 79), typeof i.indent != "number" && (i.indent = 1), typeof i.linesBefore != "number" && (i.linesBefore = 3), typeof i.linesAfter != "number" && (i.linesAfter = 2);
		let a = /\r?\n|\r|\0/g, o = [0], s = [], c, l = -1;
		for (; c = a.exec(e.buffer);) s.push(c.index), o.push(c.index + c[0].length), e.position <= c.index && l < 0 && (l = o.length - 2);
		l < 0 && (l = o.length - 1);
		let u = "", d = Math.min(e.line + i.linesAfter, s.length).toString().length, f = i.maxLength - (i.indent + d + 3);
		for (let a = 1; a <= i.linesBefore && !(l - a < 0); a++) {
			let c = n(e.buffer, o[l - a], s[l - a], e.position - (o[l] - o[l - a]), f);
			u = t.repeat(" ", i.indent) + r((e.line - a + 1).toString(), d) + " | " + c.str + "\n" + u;
		}
		let p = n(e.buffer, o[l], s[l], e.position, f);
		u += t.repeat(" ", i.indent) + r((e.line + 1).toString(), d) + " | " + p.str + "\n", u += t.repeat("-", i.indent + d + 3 + p.pos) + "^\n";
		for (let a = 1; a <= i.linesAfter && !(l + a >= s.length); a++) {
			let c = n(e.buffer, o[l + a], s[l + a], e.position - (o[l] - o[l + a]), f);
			u += t.repeat(" ", i.indent) + r((e.line + a + 1).toString(), d) + " | " + c.str + "\n";
		}
		return u.replace(/\n$/, "");
	}
	return e(i, "makeSnippet"), dt = i, dt;
}
e(pt, "requireSnippet");
var mt, ht;
function K() {
	if (ht) return mt;
	ht = 1;
	let t = G(), n = [
		"kind",
		"multi",
		"resolve",
		"construct",
		"instanceOf",
		"predicate",
		"represent",
		"representName",
		"defaultStyle",
		"styleAliases"
	], r = [
		"scalar",
		"sequence",
		"mapping"
	];
	function i(e) {
		let t = {};
		return e !== null && Object.keys(e).forEach(function(n) {
			e[n].forEach(function(e) {
				t[String(e)] = n;
			});
		}), t;
	}
	e(i, "compileStyleAliases");
	function a(e, a) {
		if (a = a || {}, Object.keys(a).forEach(function(r) {
			if (n.indexOf(r) === -1) throw new t("Unknown option \"" + r + "\" is met in definition of \"" + e + "\" YAML type.");
		}), this.options = a, this.tag = e, this.kind = a.kind || null, this.resolve = a.resolve || function() {
			return !0;
		}, this.construct = a.construct || function(e) {
			return e;
		}, this.instanceOf = a.instanceOf || null, this.predicate = a.predicate || null, this.represent = a.represent || null, this.representName = a.representName || null, this.defaultStyle = a.defaultStyle || null, this.multi = a.multi || !1, this.styleAliases = i(a.styleAliases || null), r.indexOf(this.kind) === -1) throw new t("Unknown kind \"" + this.kind + "\" is specified for \"" + e + "\" YAML type.");
	}
	return e(a, "Type2"), mt = a, mt;
}
e(K, "requireType");
var gt, _t;
function vt() {
	if (_t) return gt;
	_t = 1;
	let t = G(), n = K();
	function r(e, t) {
		let n = [];
		return e[t].forEach(function(e) {
			let t = n.length;
			n.forEach(function(n, r) {
				n.tag === e.tag && n.kind === e.kind && n.multi === e.multi && (t = r);
			}), n[t] = e;
		}), n;
	}
	e(r, "compileList");
	function i() {
		let t = {
			scalar: {},
			sequence: {},
			mapping: {},
			fallback: {},
			multi: {
				scalar: [],
				sequence: [],
				mapping: [],
				fallback: []
			}
		};
		function n(e) {
			e.multi ? (t.multi[e.kind].push(e), t.multi.fallback.push(e)) : t[e.kind][e.tag] = t.fallback[e.tag] = e;
		}
		e(n, "collectType");
		for (let e = 0, t = arguments.length; e < t; e += 1) arguments[e].forEach(n);
		return t;
	}
	e(i, "compileMap");
	function a(e) {
		return this.extend(e);
	}
	return e(a, "Schema2"), a.prototype.extend = /* @__PURE__ */ e(function(e) {
		let o = [], s = [];
		if (e instanceof n) s.push(e);
		else if (Array.isArray(e)) s = s.concat(e);
		else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit))) e.implicit && (o = o.concat(e.implicit)), e.explicit && (s = s.concat(e.explicit));
		else throw new t("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
		o.forEach(function(e) {
			if (!(e instanceof n)) throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.");
			if (e.loadKind && e.loadKind !== "scalar") throw new t("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
			if (e.multi) throw new t("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
		}), s.forEach(function(e) {
			if (!(e instanceof n)) throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.");
		});
		let c = Object.create(a.prototype);
		return c.implicit = (this.implicit || []).concat(o), c.explicit = (this.explicit || []).concat(s), c.compiledImplicit = r(c, "implicit"), c.compiledExplicit = r(c, "explicit"), c.compiledTypeMap = i(c.compiledImplicit, c.compiledExplicit), c;
	}, "extend"), gt = a, gt;
}
e(vt, "requireSchema");
var yt, bt;
function xt() {
	return bt ? yt : (bt = 1, yt = new (K())("tag:yaml.org,2002:str", {
		kind: "scalar",
		construct: /* @__PURE__ */ e(function(e) {
			return e === null ? "" : e;
		}, "construct")
	}), yt);
}
e(xt, "requireStr");
var St, Ct;
function wt() {
	return Ct ? St : (Ct = 1, St = new (K())("tag:yaml.org,2002:seq", {
		kind: "sequence",
		construct: /* @__PURE__ */ e(function(e) {
			return e === null ? [] : e;
		}, "construct")
	}), St);
}
e(wt, "requireSeq");
var Tt, Et;
function Dt() {
	return Et ? Tt : (Et = 1, Tt = new (K())("tag:yaml.org,2002:map", {
		kind: "mapping",
		construct: /* @__PURE__ */ e(function(e) {
			return e === null ? {} : e;
		}, "construct")
	}), Tt);
}
e(Dt, "requireMap");
var Ot, kt;
function At() {
	return kt ? Ot : (kt = 1, Ot = new (vt())({ explicit: [
		xt(),
		wt(),
		Dt()
	] }), Ot);
}
e(At, "requireFailsafe");
var jt, Mt;
function Nt() {
	if (Mt) return jt;
	Mt = 1;
	let t = K();
	function n(e) {
		if (e === null) return !0;
		let t = e.length;
		return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
	}
	e(n, "resolveYamlNull");
	function r() {
		return null;
	}
	e(r, "constructYamlNull");
	function i(e) {
		return e === null;
	}
	return e(i, "isNull"), jt = new t("tag:yaml.org,2002:null", {
		kind: "scalar",
		resolve: n,
		construct: r,
		predicate: i,
		represent: {
			canonical: /* @__PURE__ */ e(function() {
				return "~";
			}, "canonical"),
			lowercase: /* @__PURE__ */ e(function() {
				return "null";
			}, "lowercase"),
			uppercase: /* @__PURE__ */ e(function() {
				return "NULL";
			}, "uppercase"),
			camelcase: /* @__PURE__ */ e(function() {
				return "Null";
			}, "camelcase"),
			empty: /* @__PURE__ */ e(function() {
				return "";
			}, "empty")
		},
		defaultStyle: "lowercase"
	}), jt;
}
e(Nt, "require_null");
var Pt, Ft;
function It() {
	if (Ft) return Pt;
	Ft = 1;
	let t = K();
	function n(e) {
		if (e === null) return !1;
		let t = e.length;
		return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
	}
	e(n, "resolveYamlBoolean");
	function r(e) {
		return e === "true" || e === "True" || e === "TRUE";
	}
	e(r, "constructYamlBoolean");
	function i(e) {
		return Object.prototype.toString.call(e) === "[object Boolean]";
	}
	return e(i, "isBoolean"), Pt = new t("tag:yaml.org,2002:bool", {
		kind: "scalar",
		resolve: n,
		construct: r,
		predicate: i,
		represent: {
			lowercase: /* @__PURE__ */ e(function(e) {
				return e ? "true" : "false";
			}, "lowercase"),
			uppercase: /* @__PURE__ */ e(function(e) {
				return e ? "TRUE" : "FALSE";
			}, "uppercase"),
			camelcase: /* @__PURE__ */ e(function(e) {
				return e ? "True" : "False";
			}, "camelcase")
		},
		defaultStyle: "lowercase"
	}), Pt;
}
e(It, "requireBool");
var Lt, Rt;
function zt() {
	if (Rt) return Lt;
	Rt = 1;
	let t = W(), n = K();
	function r(e) {
		return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
	}
	e(r, "isHexCode");
	function i(e) {
		return e >= 48 && e <= 55;
	}
	e(i, "isOctCode");
	function a(e) {
		return e >= 48 && e <= 57;
	}
	e(a, "isDecCode");
	function o(e) {
		if (e === null) return !1;
		let t = e.length, n = 0, o = !1;
		if (!t) return !1;
		let c = e[n];
		if ((c === "-" || c === "+") && (c = e[++n]), c === "0") {
			if (n + 1 === t) return !0;
			if (c = e[++n], c === "b") {
				for (n++; n < t; n++) {
					if (c = e[n], c !== "0" && c !== "1") return !1;
					o = !0;
				}
				return o && isFinite(s(e));
			}
			if (c === "x") {
				for (n++; n < t; n++) {
					if (!r(e.charCodeAt(n))) return !1;
					o = !0;
				}
				return o && isFinite(s(e));
			}
			if (c === "o") {
				for (n++; n < t; n++) {
					if (!i(e.charCodeAt(n))) return !1;
					o = !0;
				}
				return o && isFinite(s(e));
			}
		}
		for (; n < t; n++) {
			if (!a(e.charCodeAt(n))) return !1;
			o = !0;
		}
		return o ? isFinite(s(e)) : !1;
	}
	e(o, "resolveYamlInteger");
	function s(e) {
		let t = e, n = 1, r = t[0];
		if ((r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0") return 0;
		if (r === "0") {
			if (t[1] === "b") return n * parseInt(t.slice(2), 2);
			if (t[1] === "x") return n * parseInt(t.slice(2), 16);
			if (t[1] === "o") return n * parseInt(t.slice(2), 8);
		}
		return n * parseInt(t, 10);
	}
	e(s, "parseYamlInteger");
	function c(e) {
		return s(e);
	}
	e(c, "constructYamlInteger");
	function l(e) {
		return Object.prototype.toString.call(e) === "[object Number]" && e % 1 == 0 && !t.isNegativeZero(e);
	}
	return e(l, "isInteger"), Lt = new n("tag:yaml.org,2002:int", {
		kind: "scalar",
		resolve: o,
		construct: c,
		predicate: l,
		represent: {
			binary: /* @__PURE__ */ e(function(e) {
				return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
			}, "binary"),
			octal: /* @__PURE__ */ e(function(e) {
				return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
			}, "octal"),
			decimal: /* @__PURE__ */ e(function(e) {
				return e.toString(10);
			}, "decimal"),
			hexadecimal: /* @__PURE__ */ e(function(e) {
				return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
			}, "hexadecimal")
		},
		defaultStyle: "decimal",
		styleAliases: {
			binary: [2, "bin"],
			octal: [8, "oct"],
			decimal: [10, "dec"],
			hexadecimal: [16, "hex"]
		}
	}), Lt;
}
e(zt, "requireInt");
var Bt, Vt;
function Ht() {
	if (Vt) return Bt;
	Vt = 1;
	let t = W(), n = K(), r = /* @__PURE__ */ RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"), i = /* @__PURE__ */ RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
	function a(e) {
		return e === null || !r.test(e) ? !1 : isFinite(parseFloat(e, 10)) ? !0 : i.test(e);
	}
	e(a, "resolveYamlFloat");
	function o(e) {
		let t = e.toLowerCase(), n = t[0] === "-" ? -1 : 1;
		return "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Infinity : -Infinity : t === ".nan" ? NaN : n * parseFloat(t, 10);
	}
	e(o, "constructYamlFloat");
	let s = /^[-+]?[0-9]+e/;
	function c(e, n) {
		if (isNaN(e)) switch (n) {
			case "lowercase": return ".nan";
			case "uppercase": return ".NAN";
			case "camelcase": return ".NaN";
		}
		else if (e === Infinity) switch (n) {
			case "lowercase": return ".inf";
			case "uppercase": return ".INF";
			case "camelcase": return ".Inf";
		}
		else if (e === -Infinity) switch (n) {
			case "lowercase": return "-.inf";
			case "uppercase": return "-.INF";
			case "camelcase": return "-.Inf";
		}
		else if (t.isNegativeZero(e)) return "-0.0";
		let r = e.toString(10);
		return s.test(r) ? r.replace("e", ".e") : r;
	}
	e(c, "representYamlFloat");
	function l(e) {
		return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 != 0 || t.isNegativeZero(e));
	}
	return e(l, "isFloat"), Bt = new n("tag:yaml.org,2002:float", {
		kind: "scalar",
		resolve: a,
		construct: o,
		predicate: l,
		represent: c,
		defaultStyle: "lowercase"
	}), Bt;
}
e(Ht, "requireFloat");
var Ut, Wt;
function Gt() {
	return Wt ? Ut : (Wt = 1, Ut = At().extend({ implicit: [
		Nt(),
		It(),
		zt(),
		Ht()
	] }), Ut);
}
e(Gt, "requireJson");
var Kt, qt;
function Jt() {
	return qt ? Kt : (qt = 1, Kt = Gt(), Kt);
}
e(Jt, "requireCore");
var Yt, Xt;
function Zt() {
	if (Xt) return Yt;
	Xt = 1;
	let t = K(), n = /* @__PURE__ */ RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"), r = /* @__PURE__ */ RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
	function i(e) {
		return e === null ? !1 : n.exec(e) !== null || r.exec(e) !== null;
	}
	e(i, "resolveYamlTimestamp");
	function a(e) {
		let t = 0, i = null, a = n.exec(e);
		if (a === null && (a = r.exec(e)), a === null) throw Error("Date resolve error");
		let o = +a[1], s = a[2] - 1, c = +a[3];
		if (!a[4]) return new Date(Date.UTC(o, s, c));
		let l = +a[4], u = +a[5], d = +a[6];
		if (a[7]) {
			for (t = a[7].slice(0, 3); t.length < 3;) t += "0";
			t = +t;
		}
		if (a[9]) {
			let e = +a[10], t = +(a[11] || 0);
			i = (e * 60 + t) * 6e4, a[9] === "-" && (i = -i);
		}
		let f = new Date(Date.UTC(o, s, c, l, u, d, t));
		return i && f.setTime(f.getTime() - i), f;
	}
	e(a, "constructYamlTimestamp");
	function o(e) {
		return e.toISOString();
	}
	return e(o, "representYamlTimestamp"), Yt = new t("tag:yaml.org,2002:timestamp", {
		kind: "scalar",
		resolve: i,
		construct: a,
		instanceOf: Date,
		represent: o
	}), Yt;
}
e(Zt, "requireTimestamp");
var Qt, $t;
function en() {
	if ($t) return Qt;
	$t = 1;
	let t = K();
	function n(e) {
		return e === "<<" || e === null;
	}
	return e(n, "resolveYamlMerge"), Qt = new t("tag:yaml.org,2002:merge", {
		kind: "scalar",
		resolve: n
	}), Qt;
}
e(en, "requireMerge");
var tn, nn;
function rn() {
	if (nn) return tn;
	nn = 1;
	let t = K();
	function n(e) {
		if (e === null) return !1;
		let t = 0, n = e.length;
		for (let r = 0; r < n; r++) {
			let n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r".indexOf(e.charAt(r));
			if (!(n > 64)) {
				if (n < 0) return !1;
				t += 6;
			}
		}
		return t % 8 == 0;
	}
	e(n, "resolveYamlBinary");
	function r(e) {
		let t = e.replace(/[\r\n=]/g, ""), n = t.length, r = 0, i = [];
		for (let e = 0; e < n; e++) e % 4 == 0 && e && (i.push(r >> 16 & 255), i.push(r >> 8 & 255), i.push(r & 255)), r = r << 6 | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r".indexOf(t.charAt(e));
		let a = n % 4 * 6;
		return a === 0 ? (i.push(r >> 16 & 255), i.push(r >> 8 & 255), i.push(r & 255)) : a === 18 ? (i.push(r >> 10 & 255), i.push(r >> 2 & 255)) : a === 12 && i.push(r >> 4 & 255), new Uint8Array(i);
	}
	e(r, "constructYamlBinary");
	function i(e) {
		let t = "", n = 0, r = e.length, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
		for (let a = 0; a < r; a++) a % 3 == 0 && a && (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]), n = (n << 8) + e[a];
		let a = r % 3;
		return a === 0 ? (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]) : a === 2 ? (t += i[n >> 10 & 63], t += i[n >> 4 & 63], t += i[n << 2 & 63], t += i[64]) : a === 1 && (t += i[n >> 2 & 63], t += i[n << 4 & 63], t += i[64], t += i[64]), t;
	}
	e(i, "representYamlBinary");
	function a(e) {
		return Object.prototype.toString.call(e) === "[object Uint8Array]";
	}
	return e(a, "isBinary"), tn = new t("tag:yaml.org,2002:binary", {
		kind: "scalar",
		resolve: n,
		construct: r,
		predicate: a,
		represent: i
	}), tn;
}
e(rn, "requireBinary");
var an, on;
function sn() {
	if (on) return an;
	on = 1;
	let t = K(), n = Object.prototype.hasOwnProperty, r = Object.prototype.toString;
	function i(e) {
		if (e === null) return !0;
		let t = [], i = e;
		for (let e = 0, a = i.length; e < a; e += 1) {
			let a = i[e], o = !1;
			if (r.call(a) !== "[object Object]") return !1;
			let s;
			for (s in a) if (n.call(a, s)) {
				if (!o) o = !0;
				else return !1;
			}
			if (!o) return !1;
			if (t.indexOf(s) === -1) t.push(s);
			else return !1;
		}
		return !0;
	}
	e(i, "resolveYamlOmap");
	function a(e) {
		return e === null ? [] : e;
	}
	return e(a, "constructYamlOmap"), an = new t("tag:yaml.org,2002:omap", {
		kind: "sequence",
		resolve: i,
		construct: a
	}), an;
}
e(sn, "requireOmap");
var cn, ln;
function un() {
	if (ln) return cn;
	ln = 1;
	let t = K(), n = Object.prototype.toString;
	function r(e) {
		if (e === null) return !0;
		let t = e, r = Array(t.length);
		for (let e = 0, i = t.length; e < i; e += 1) {
			let i = t[e];
			if (n.call(i) !== "[object Object]") return !1;
			let a = Object.keys(i);
			if (a.length !== 1) return !1;
			r[e] = [a[0], i[a[0]]];
		}
		return !0;
	}
	e(r, "resolveYamlPairs");
	function i(e) {
		if (e === null) return [];
		let t = e, n = Array(t.length);
		for (let e = 0, r = t.length; e < r; e += 1) {
			let r = t[e], i = Object.keys(r);
			n[e] = [i[0], r[i[0]]];
		}
		return n;
	}
	return e(i, "constructYamlPairs"), cn = new t("tag:yaml.org,2002:pairs", {
		kind: "sequence",
		resolve: r,
		construct: i
	}), cn;
}
e(un, "requirePairs");
var dn, fn;
function pn() {
	if (fn) return dn;
	fn = 1;
	let t = K(), n = Object.prototype.hasOwnProperty;
	function r(e) {
		if (e === null) return !0;
		let t = e;
		for (let e in t) if (n.call(t, e) && t[e] !== null) return !1;
		return !0;
	}
	e(r, "resolveYamlSet");
	function i(e) {
		return e === null ? {} : e;
	}
	return e(i, "constructYamlSet"), dn = new t("tag:yaml.org,2002:set", {
		kind: "mapping",
		resolve: r,
		construct: i
	}), dn;
}
e(pn, "requireSet");
var mn, hn;
function gn() {
	return hn ? mn : (hn = 1, mn = Jt().extend({
		implicit: [Zt(), en()],
		explicit: [
			rn(),
			sn(),
			un(),
			pn()
		]
	}), mn);
}
e(gn, "require_default");
var _n;
function vn() {
	if (_n) return st;
	_n = 1;
	let t = W(), n = G(), r = pt(), i = gn(), a = Object.prototype.hasOwnProperty, o = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, s = /[\x85\u2028\u2029]/, c = /[,\[\]{}]/, l = /^(?:!|!!|![0-9A-Za-z-]+!)$/, u = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
	function d(e) {
		return Object.prototype.toString.call(e);
	}
	e(d, "_class");
	function f(e) {
		return e === 10 || e === 13;
	}
	e(f, "isEol");
	function p(e) {
		return e === 9 || e === 32;
	}
	e(p, "isWhiteSpace");
	function m(e) {
		return e === 9 || e === 32 || e === 10 || e === 13;
	}
	e(m, "isWsOrEol");
	function h(e) {
		return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
	}
	e(h, "isFlowIndicator");
	function g(e) {
		if (e >= 48 && e <= 57) return e - 48;
		let t = e | 32;
		return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
	}
	e(g, "fromHexCode");
	function _(e) {
		return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
	}
	e(_, "escapedHexLen");
	function v(e) {
		return e >= 48 && e <= 57 ? e - 48 : -1;
	}
	e(v, "fromDecimalCode");
	function y(e) {
		switch (e) {
			case 48: return "\0";
			case 97: return "\x07";
			case 98: return "\b";
			case 116: return "	";
			case 9: return "	";
			case 110: return "\n";
			case 118: return "\v";
			case 102: return "\f";
			case 114: return "\r";
			case 101: return "\x1B";
			case 32: return " ";
			case 34: return "\"";
			case 47: return "/";
			case 92: return "\\";
			case 78: return "";
			case 95: return "\xA0";
			case 76: return "\u2028";
			case 80: return "\u2029";
			default: return "";
		}
	}
	e(y, "simpleEscapeSequence");
	function b(e) {
		return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode((e - 65536 >> 10) + 55296, (e - 65536 & 1023) + 56320);
	}
	e(b, "charFromCodepoint");
	function x(e, t, n) {
		t === "__proto__" ? Object.defineProperty(e, t, {
			configurable: !0,
			enumerable: !0,
			writable: !0,
			value: n
		}) : e[t] = n;
	}
	e(x, "setProperty");
	let S = Array(256), C = Array(256);
	for (let e = 0; e < 256; e++) S[e] = +!!y(e), C[e] = y(e);
	function w(e, t) {
		this.input = e, this.filename = t.filename || null, this.schema = t.schema || i, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.maxDepth = typeof t.maxDepth == "number" ? t.maxDepth : 100, this.maxTotalMergeKeys = typeof t.maxTotalMergeKeys == "number" ? t.maxTotalMergeKeys : 1e4, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.depth = 0, this.totalMergeKeys = 0, this.firstTabInLine = -1, this.documents = [], this.anchorMapTransactions = [];
	}
	e(w, "State");
	function T(e, t) {
		let i = {
			name: e.filename,
			buffer: e.input.slice(0, -1),
			position: e.position,
			line: e.line,
			column: e.position - e.lineStart
		};
		return i.snippet = r(i), new n(t, i);
	}
	e(T, "generateError");
	function E(e, t) {
		throw T(e, t);
	}
	e(E, "throwError");
	function D(e, t) {
		e.onWarning && e.onWarning.call(null, T(e, t));
	}
	e(D, "throwWarning");
	function O(e, t, n) {
		let r = e.anchorMapTransactions;
		if (r.length !== 0) {
			let n = r[r.length - 1];
			a.call(n, t) || (n[t] = {
				existed: a.call(e.anchorMap, t),
				value: e.anchorMap[t]
			});
		}
		e.anchorMap[t] = n;
	}
	e(O, "storeAnchor");
	function k(e) {
		e.anchorMapTransactions.push(/* @__PURE__ */ Object.create(null));
	}
	e(k, "beginAnchorTransaction");
	function A(e) {
		let t = e.anchorMapTransactions.pop(), n = e.anchorMapTransactions;
		if (n.length === 0) return;
		let r = n[n.length - 1], i = Object.keys(t);
		for (let e = 0, n = i.length; e < n; e += 1) {
			let n = i[e];
			a.call(r, n) || (r[n] = t[n]);
		}
	}
	e(A, "commitAnchorTransaction");
	function j(e) {
		let t = e.anchorMapTransactions.pop(), n = Object.keys(t);
		for (let r = n.length - 1; r >= 0; --r) {
			let i = t[n[r]];
			i.existed ? e.anchorMap[n[r]] = i.value : delete e.anchorMap[n[r]];
		}
	}
	e(j, "rollbackAnchorTransaction");
	function M(e) {
		return {
			position: e.position,
			line: e.line,
			lineStart: e.lineStart,
			lineIndent: e.lineIndent,
			firstTabInLine: e.firstTabInLine,
			tag: e.tag,
			anchor: e.anchor,
			kind: e.kind,
			result: e.result
		};
	}
	e(M, "snapshotState");
	function N(e, t) {
		e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.tag = t.tag, e.anchor = t.anchor, e.kind = t.kind, e.result = t.result;
	}
	e(N, "restoreState");
	let ee = {
		YAML: /* @__PURE__ */ e(function(e, t, n) {
			e.version !== null && E(e, "duplication of %YAML directive"), n.length !== 1 && E(e, "YAML directive accepts exactly one argument");
			let r = /^([0-9]+)\.([0-9]+)$/.exec(n[0]);
			r === null && E(e, "ill-formed argument of the YAML directive");
			let i = parseInt(r[1], 10), a = parseInt(r[2], 10);
			i !== 1 && E(e, "unacceptable YAML version of the document"), e.version = n[0], e.checkLineBreaks = a < 2, a !== 1 && a !== 2 && D(e, "unsupported YAML version of the document");
		}, "handleYamlDirective"),
		TAG: /* @__PURE__ */ e(function(e, t, n) {
			let r;
			n.length !== 2 && E(e, "TAG directive accepts exactly two arguments");
			let i = n[0];
			r = n[1], l.test(i) || E(e, "ill-formed tag handle (first argument) of the TAG directive"), a.call(e.tagMap, i) && E(e, "there is a previously declared suffix for \"" + i + "\" tag handle"), u.test(r) || E(e, "ill-formed tag prefix (second argument) of the TAG directive");
			try {
				r = decodeURIComponent(r);
			} catch {
				E(e, "tag prefix is malformed: " + r);
			}
			e.tagMap[i] = r;
		}, "handleTagDirective")
	};
	function P(e, t, n, r) {
		if (t < n) {
			let i = e.input.slice(t, n);
			if (r) for (let t = 0, n = i.length; t < n; t += 1) {
				let n = i.charCodeAt(t);
				n === 9 || n >= 32 && n <= 1114111 || E(e, "expected valid JSON character");
			}
			else o.test(i) && E(e, "the stream contains non-printable characters");
			e.result += i;
		}
	}
	e(P, "captureSegment");
	function F(e, n, r, i) {
		t.isObject(r) || E(e, "cannot merge mappings; the provided source object is unacceptable");
		let o = Object.keys(r);
		for (let t = 0, s = o.length; t < s; t += 1) {
			let s = o[t];
			e.maxTotalMergeKeys !== -1 && ++e.totalMergeKeys > e.maxTotalMergeKeys && E(e, "merge keys exceeded maxTotalMergeKeys (" + e.maxTotalMergeKeys + ")"), a.call(n, s) || (x(n, s, r[s]), i[s] = !0);
		}
	}
	e(F, "mergeMappings");
	function I(e, t, n, r, i, o, s, c, l) {
		if (Array.isArray(i)) {
			i = Array.prototype.slice.call(i);
			for (let t = 0, n = i.length; t < n; t += 1) Array.isArray(i[t]) && E(e, "nested arrays are not supported inside keys"), typeof i == "object" && d(i[t]) === "[object Object]" && (i[t] = "[object Object]");
		}
		if (typeof i == "object" && d(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge") {
			if (Array.isArray(o)) for (let r = 0, i = o.length; r < i; r += 1) F(e, t, o[r], n);
			else F(e, t, o, n);
		} else !e.json && !a.call(n, i) && a.call(t, i) && (e.line = s || e.line, e.lineStart = c || e.lineStart, e.position = l || e.position, E(e, "duplicated mapping key")), x(t, i, o), delete n[i];
		return t;
	}
	e(I, "storeMappingPair");
	function L(e) {
		let t = e.input.charCodeAt(e.position);
		t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : E(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
	}
	e(L, "readLineBreak");
	function R(e, t, n) {
		let r = 0, i = e.input.charCodeAt(e.position);
		for (; i !== 0;) {
			for (; p(i);) i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
			if (t && i === 35) do
				i = e.input.charCodeAt(++e.position);
			while (i !== 10 && i !== 13 && i !== 0);
			if (f(i)) for (L(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32;) e.lineIndent++, i = e.input.charCodeAt(++e.position);
			else break;
		}
		return n !== -1 && r !== 0 && e.lineIndent < n && D(e, "deficient indentation"), r;
	}
	e(R, "skipSeparationSpace");
	function te(e) {
		let t = e.position, n = e.input.charCodeAt(t);
		return !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || m(n)));
	}
	e(te, "testDocumentSeparator");
	function ne(e, n) {
		n === 1 ? e.result += " " : n > 1 && (e.result += t.repeat("\n", n - 1));
	}
	e(ne, "writeFoldedLines");
	function re(e, t, n) {
		let r, i, a, o, s, c, l = e.kind, u = e.result, d = e.input.charCodeAt(e.position);
		if (m(d) || h(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96) return !1;
		if (d === 63 || d === 45) {
			let t = e.input.charCodeAt(e.position + 1);
			if (m(t) || n && h(t)) return !1;
		}
		for (e.kind = "scalar", e.result = "", r = i = e.position, a = !1; d !== 0;) {
			if (d === 58) {
				let t = e.input.charCodeAt(e.position + 1);
				if (m(t) || n && h(t)) break;
			} else if (d === 35) {
				if (m(e.input.charCodeAt(e.position - 1))) break;
			} else if (e.position === e.lineStart && te(e) || n && h(d)) break;
			else if (f(d)) {
				if (o = e.line, s = e.lineStart, c = e.lineIndent, R(e, !1, -1), e.lineIndent >= t) {
					a = !0, d = e.input.charCodeAt(e.position);
					continue;
				}
				e.position = i, e.line = o, e.lineStart = s, e.lineIndent = c;
				break;
			}
			a && (P(e, r, i, !1), ne(e, e.line - o), r = i = e.position, a = !1), p(d) || (i = e.position + 1), d = e.input.charCodeAt(++e.position);
		}
		return P(e, r, i, !1), e.result ? !0 : (e.kind = l, e.result = u, !1);
	}
	e(re, "readPlainScalar");
	function ie(e, t) {
		let n, r, i = e.input.charCodeAt(e.position);
		if (i !== 39) return !1;
		for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (i = e.input.charCodeAt(e.position)) !== 0;) if (i === 39) {
			if (P(e, n, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39) n = e.position, e.position++, r = e.position;
			else return !0;
		} else f(i) ? (P(e, n, r, !0), ne(e, R(e, !1, t)), n = r = e.position) : e.position === e.lineStart && te(e) ? E(e, "unexpected end of the document within a single quoted scalar") : (e.position++, p(i) || (r = e.position));
		E(e, "unexpected end of the stream within a single quoted scalar");
	}
	e(ie, "readSingleQuotedScalar");
	function ae(e, t) {
		let n, r, i, a = e.input.charCodeAt(e.position);
		if (a !== 34) return !1;
		for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (a = e.input.charCodeAt(e.position)) !== 0;) if (a === 34) return P(e, n, e.position, !0), e.position++, !0;
		else if (a === 92) {
			if (P(e, n, e.position, !0), a = e.input.charCodeAt(++e.position), f(a)) R(e, !1, t);
			else if (a < 256 && S[a]) e.result += C[a], e.position++;
			else if ((i = _(a)) > 0) {
				let t = i, n = 0;
				for (; t > 0; t--) a = e.input.charCodeAt(++e.position), (i = g(a)) >= 0 ? n = (n << 4) + i : E(e, "expected hexadecimal character");
				e.result += b(n), e.position++;
			} else E(e, "unknown escape sequence");
			n = r = e.position;
		} else f(a) ? (P(e, n, r, !0), ne(e, R(e, !1, t)), n = r = e.position) : e.position === e.lineStart && te(e) ? E(e, "unexpected end of the document within a double quoted scalar") : (e.position++, p(a) || (r = e.position));
		E(e, "unexpected end of the stream within a double quoted scalar");
	}
	e(ae, "readDoubleQuotedScalar");
	function oe(e, t) {
		let n = !0, r, i, a, o = e.tag, s, c = e.anchor, l, u, d, f, p = /* @__PURE__ */ Object.create(null), h, g, _, v = e.input.charCodeAt(e.position);
		if (v === 91) l = 93, f = !1, s = [];
		else if (v === 123) l = 125, f = !0, s = {};
		else return !1;
		for (e.anchor !== null && O(e, e.anchor, s), v = e.input.charCodeAt(++e.position); v !== 0;) {
			if (R(e, !0, t), v = e.input.charCodeAt(e.position), v === l) return e.position++, e.tag = o, e.anchor = c, e.kind = f ? "mapping" : "sequence", e.result = s, !0;
			n ? v === 44 && E(e, "expected the node content, but found ','") : E(e, "missed comma between flow collection entries"), g = h = _ = null, u = d = !1, v === 63 && m(e.input.charCodeAt(e.position + 1)) && (u = d = !0, e.position++, R(e, !0, t)), r = e.line, i = e.lineStart, a = e.position, z(e, t, 1, !1, !0), g = e.tag, h = e.result, R(e, !0, t), v = e.input.charCodeAt(e.position), (d || e.line === r) && v === 58 && (u = !0, v = e.input.charCodeAt(++e.position), R(e, !0, t), z(e, t, 1, !1, !0), _ = e.result), f ? I(e, s, p, g, h, _, r, i, a) : u ? s.push(I(e, null, p, g, h, _, r, i, a)) : s.push(h), R(e, !0, t), v = e.input.charCodeAt(e.position), v === 44 ? (n = !0, v = e.input.charCodeAt(++e.position)) : n = !1;
		}
		E(e, "unexpected end of the stream within a flow collection");
	}
	e(oe, "readFlowCollection");
	function se(e, n) {
		let r, i = 1, a = !1, o = !1, s = n, c = 0, l = !1, u, d = e.input.charCodeAt(e.position);
		if (d === 124) r = !1;
		else if (d === 62) r = !0;
		else return !1;
		for (e.kind = "scalar", e.result = ""; d !== 0;) if (d = e.input.charCodeAt(++e.position), d === 43 || d === 45) i === 1 ? i = d === 43 ? 3 : 2 : E(e, "repeat of a chomping mode identifier");
		else if ((u = v(d)) >= 0) u === 0 ? E(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? E(e, "repeat of an indentation width identifier") : (s = n + u - 1, o = !0);
		else break;
		if (p(d)) {
			do
				d = e.input.charCodeAt(++e.position);
			while (p(d));
			if (d === 35) do
				d = e.input.charCodeAt(++e.position);
			while (!f(d) && d !== 0);
		}
		for (; d !== 0;) {
			for (L(e), e.lineIndent = 0, d = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && d === 32;) e.lineIndent++, d = e.input.charCodeAt(++e.position);
			if (!o && e.lineIndent > s && (s = e.lineIndent), f(d)) {
				c++;
				continue;
			}
			if (!o && s === 0 && E(e, "missing indentation for block scalar"), e.lineIndent < s) {
				i === 3 ? e.result += t.repeat("\n", a ? 1 + c : c) : i === 1 && a && (e.result += "\n");
				break;
			}
			r ? p(d) ? (l = !0, e.result += t.repeat("\n", a ? 1 + c : c)) : l ? (l = !1, e.result += t.repeat("\n", c + 1)) : c === 0 ? a && (e.result += " ") : e.result += t.repeat("\n", c) : e.result += t.repeat("\n", a ? 1 + c : c), a = !0, o = !0, c = 0;
			let n = e.position;
			for (; !f(d) && d !== 0;) d = e.input.charCodeAt(++e.position);
			P(e, n, e.position, !1);
		}
		return !0;
	}
	e(se, "readBlockScalar");
	function ce(e, t) {
		let n = e.tag, r = e.anchor, i = [], a = !1;
		if (e.firstTabInLine !== -1) return !1;
		e.anchor !== null && O(e, e.anchor, i);
		let o = e.input.charCodeAt(e.position);
		for (; o !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, E(e, "tab characters must not be used in indentation")), o === 45 && m(e.input.charCodeAt(e.position + 1)));) {
			if (a = !0, e.position++, R(e, !0, -1) && e.lineIndent <= t) {
				i.push(null), o = e.input.charCodeAt(e.position);
				continue;
			}
			let n = e.line;
			if (z(e, t, 3, !1, !0), i.push(e.result), R(e, !0, -1), o = e.input.charCodeAt(e.position), (e.line === n || e.lineIndent > t) && o !== 0) E(e, "bad indentation of a sequence entry");
			else if (e.lineIndent < t) break;
		}
		return a ? (e.tag = n, e.anchor = r, e.kind = "sequence", e.result = i, !0) : !1;
	}
	e(ce, "readBlockSequence");
	function le(e, t, n) {
		let r, i, a, o, s = e.tag, c = e.anchor, l = {}, u = /* @__PURE__ */ Object.create(null), d = null, f = null, h = null, g = !1, _ = !1;
		if (e.firstTabInLine !== -1) return !1;
		e.anchor !== null && O(e, e.anchor, l);
		let v = e.input.charCodeAt(e.position);
		for (; v !== 0;) {
			!g && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, E(e, "tab characters must not be used in indentation"));
			let y = e.input.charCodeAt(e.position + 1), b = e.line;
			if ((v === 63 || v === 58) && m(y)) v === 63 ? (g && (I(e, l, u, d, f, null, i, a, o), d = f = h = null), _ = !0, g = !0, r = !0) : g ? (g = !1, r = !0) : E(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, v = y;
			else {
				if (i = e.line, a = e.lineStart, o = e.position, !z(e, n, 2, !1, !0)) break;
				if (e.line === b) {
					for (v = e.input.charCodeAt(e.position); p(v);) v = e.input.charCodeAt(++e.position);
					if (v === 58) v = e.input.charCodeAt(++e.position), m(v) || E(e, "a whitespace character is expected after the key-value separator within a block mapping"), g && (I(e, l, u, d, f, null, i, a, o), d = f = h = null), _ = !0, g = !1, r = !1, d = e.tag, f = e.result;
					else if (_) E(e, "can not read an implicit mapping pair; a colon is missed");
					else return e.tag = s, e.anchor = c, !0;
				} else if (_) E(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
				else return e.tag = s, e.anchor = c, !0;
			}
			if ((e.line === b || e.lineIndent > t) && (g && (i = e.line, a = e.lineStart, o = e.position), z(e, t, 4, !0, r) && (g ? f = e.result : h = e.result), g || (I(e, l, u, d, f, h, i, a, o), d = f = h = null), R(e, !0, -1), v = e.input.charCodeAt(e.position)), (e.line === b || e.lineIndent > t) && v !== 0) E(e, "bad indentation of a mapping entry");
			else if (e.lineIndent < t) break;
		}
		return g && I(e, l, u, d, f, null, i, a, o), _ && (e.tag = s, e.anchor = c, e.kind = "mapping", e.result = l), _;
	}
	e(le, "readBlockMapping");
	function ue(e) {
		let t = !1, n = !1, r, i, o = e.input.charCodeAt(e.position);
		if (o !== 33) return !1;
		e.tag !== null && E(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (t = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (n = !0, r = "!!", o = e.input.charCodeAt(++e.position)) : r = "!";
		let s = e.position;
		if (t) {
			do
				o = e.input.charCodeAt(++e.position);
			while (o !== 0 && o !== 62);
			e.position < e.length ? (i = e.input.slice(s, e.position), o = e.input.charCodeAt(++e.position)) : E(e, "unexpected end of the stream within a verbatim tag");
		} else {
			for (; o !== 0 && !m(o);) o === 33 && (n ? E(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(s - 1, e.position + 1), l.test(r) || E(e, "named tag handle cannot contain such characters"), n = !0, s = e.position + 1)), o = e.input.charCodeAt(++e.position);
			i = e.input.slice(s, e.position), c.test(i) && E(e, "tag suffix cannot contain flow indicator characters");
		}
		i && !u.test(i) && E(e, "tag name cannot contain such characters: " + i);
		try {
			i = decodeURIComponent(i);
		} catch {
			E(e, "tag name is malformed: " + i);
		}
		return t ? e.tag = i : a.call(e.tagMap, r) ? e.tag = e.tagMap[r] + i : r === "!" ? e.tag = "!" + i : r === "!!" ? e.tag = "tag:yaml.org,2002:" + i : E(e, "undeclared tag handle \"" + r + "\""), !0;
	}
	e(ue, "readTagProperty");
	function de(e) {
		let t = e.input.charCodeAt(e.position);
		if (t !== 38) return !1;
		e.anchor !== null && E(e, "duplication of an anchor property"), t = e.input.charCodeAt(++e.position);
		let n = e.position;
		for (; t !== 0 && !m(t) && !h(t);) t = e.input.charCodeAt(++e.position);
		return e.position === n && E(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
	}
	e(de, "readAnchorProperty");
	function fe(e) {
		let t = e.input.charCodeAt(e.position);
		if (t !== 42) return !1;
		t = e.input.charCodeAt(++e.position);
		let n = e.position;
		for (; t !== 0 && !m(t) && !h(t);) t = e.input.charCodeAt(++e.position);
		e.position === n && E(e, "name of an alias node must contain at least one character");
		let r = e.input.slice(n, e.position);
		return a.call(e.anchorMap, r) || E(e, "unidentified alias \"" + r + "\""), e.result = e.anchorMap[r], R(e, !0, -1), !0;
	}
	e(fe, "readAlias");
	function pe(e, t, n, r) {
		let i = M(e);
		return k(e), N(e, t), e.tag = null, e.anchor = null, e.kind = null, e.result = null, le(e, n, r) && e.kind === "mapping" ? (A(e), !0) : (j(e), N(e, i), !1);
	}
	e(pe, "tryReadBlockMappingFromProperty");
	function z(e, t, n, r, i) {
		let o, s, c = 1, l = !1, u = !1, d = null, f, p, m;
		e.depth >= e.maxDepth && E(e, "nesting exceeded maxDepth (" + e.maxDepth + ")"), e.depth += 1, e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null;
		let h = o = s = n === 4 || n === 3;
		if (r && R(e, !0, -1) && (l = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1) for (;;) {
			let n = e.input.charCodeAt(e.position), r = M(e);
			if (l && (n === 33 && e.tag !== null || n === 38 && e.anchor !== null) || !ue(e) && !de(e)) break;
			d === null && (d = r), R(e, !0, -1) ? (l = !0, s = h, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : s = !1;
		}
		if (s && (s = l || i), c === 1 || n === 4) {
			if (p = n === 1 || n === 2 ? t : t + 1, m = e.position - e.lineStart, c === 1) {
				if (s && (ce(e, m) || le(e, m, p)) || oe(e, p)) u = !0;
				else {
					let t = e.input.charCodeAt(e.position);
					d !== null && h && !s && t !== 124 && t !== 62 && pe(e, d, d.position - d.lineStart, p) || o && se(e, p) || ie(e, p) || ae(e, p) ? u = !0 : fe(e) ? (u = !0, (e.tag !== null || e.anchor !== null) && E(e, "alias node should not have any properties")) : re(e, p, n === 1) && (u = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && O(e, e.anchor, e.result);
				}
			} else c === 0 && (u = s && ce(e, m));
		}
		if (e.tag === null) e.anchor !== null && O(e, e.anchor, e.result);
		else if (e.tag === "?") {
			e.result !== null && e.kind !== "scalar" && E(e, "unacceptable node kind for !<?> tag; it should be \"scalar\", not \"" + e.kind + "\"");
			for (let t = 0, n = e.implicitTypes.length; t < n; t += 1) if (f = e.implicitTypes[t], f.resolve(e.result)) {
				e.result = f.construct(e.result), e.tag = f.tag, e.anchor !== null && O(e, e.anchor, e.result);
				break;
			}
		} else if (e.tag !== "!") {
			if (a.call(e.typeMap[e.kind || "fallback"], e.tag)) f = e.typeMap[e.kind || "fallback"][e.tag];
			else {
				f = null;
				let t = e.typeMap.multi[e.kind || "fallback"];
				for (let n = 0, r = t.length; n < r; n += 1) if (e.tag.slice(0, t[n].tag.length) === t[n].tag) {
					f = t[n];
					break;
				}
			}
			f || E(e, "unknown tag !<" + e.tag + ">"), e.result !== null && f.kind !== e.kind && E(e, "unacceptable node kind for !<" + e.tag + "> tag; it should be \"" + f.kind + "\", not \"" + e.kind + "\""), f.resolve(e.result, e.tag) ? (e.result = f.construct(e.result, e.tag), e.anchor !== null && O(e, e.anchor, e.result)) : E(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
		}
		return e.listener !== null && e.listener("close", e), --e.depth, e.tag !== null || e.anchor !== null || u;
	}
	e(z, "composeNode");
	function me(e) {
		let t = e.position, n = !1, r;
		for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (r = e.input.charCodeAt(e.position)) !== 0 && (R(e, !0, -1), r = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || r !== 37));) {
			n = !0, r = e.input.charCodeAt(++e.position);
			let t = e.position;
			for (; r !== 0 && !m(r);) r = e.input.charCodeAt(++e.position);
			let i = e.input.slice(t, e.position), o = [];
			for (i.length < 1 && E(e, "directive name must not be less than one character in length"); r !== 0;) {
				for (; p(r);) r = e.input.charCodeAt(++e.position);
				if (r === 35) {
					do
						r = e.input.charCodeAt(++e.position);
					while (r !== 0 && !f(r));
					break;
				}
				if (f(r)) break;
				for (t = e.position; r !== 0 && !m(r);) r = e.input.charCodeAt(++e.position);
				o.push(e.input.slice(t, e.position));
			}
			r !== 0 && L(e), a.call(ee, i) ? ee[i](e, i, o) : D(e, "unknown document directive \"" + i + "\"");
		}
		if (R(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, R(e, !0, -1)) : n && E(e, "directives end mark is expected"), z(e, e.lineIndent - 1, 4, !1, !0), R(e, !0, -1), e.checkLineBreaks && s.test(e.input.slice(t, e.position)) && D(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && te(e)) {
			e.input.charCodeAt(e.position) === 46 && (e.position += 3, R(e, !0, -1));
			return;
		}
		e.position < e.length - 1 && E(e, "end of the stream or a document separator is expected");
	}
	e(me, "readDocument");
	function he(e, t) {
		e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += "\n"), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
		let n = new w(e, t), r = e.indexOf("\0");
		for (r !== -1 && (n.position = r, E(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32;) n.lineIndent += 1, n.position += 1;
		for (; n.position < n.length - 1;) me(n);
		return n.documents;
	}
	e(he, "loadDocuments");
	function ge(e, t, n) {
		typeof t == "object" && t && n === void 0 && (n = t, t = null);
		let r = he(e, n);
		if (typeof t != "function") return r;
		for (let e = 0, n = r.length; e < n; e += 1) t(r[e]);
	}
	e(ge, "loadAll2");
	function _e(e, t) {
		let r = he(e, t);
		if (r.length !== 0) {
			if (r.length === 1) return r[0];
			throw new n("expected a single document in the stream, but found more");
		}
	}
	return e(_e, "load2"), st.loadAll = ge, st.load = _e, st;
}
e(vn, "requireLoader");
var yn = {}, bn;
function xn() {
	if (bn) return yn;
	bn = 1;
	let t = W(), n = G(), r = gn(), i = Object.prototype.toString, a = Object.prototype.hasOwnProperty, o = 65279, s = {};
	s[0] = "\\0", s[7] = "\\a", s[8] = "\\b", s[9] = "\\t", s[10] = "\\n", s[11] = "\\v", s[12] = "\\f", s[13] = "\\r", s[27] = "\\e", s[34] = "\\\"", s[92] = "\\\\", s[133] = "\\N", s[160] = "\\_", s[8232] = "\\L", s[8233] = "\\P";
	let c = [
		"y",
		"Y",
		"yes",
		"Yes",
		"YES",
		"on",
		"On",
		"ON",
		"n",
		"N",
		"no",
		"No",
		"NO",
		"off",
		"Off",
		"OFF"
	], l = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
	function u(e, t) {
		if (t === null) return {};
		let n = {}, r = Object.keys(t);
		for (let i = 0, o = r.length; i < o; i += 1) {
			let o = r[i], s = String(t[o]);
			o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2));
			let c = e.compiledTypeMap.fallback[o];
			c && a.call(c.styleAliases, s) && (s = c.styleAliases[s]), n[o] = s;
		}
		return n;
	}
	e(u, "compileStyleMap");
	function d(e) {
		let r, i, a = e.toString(16).toUpperCase();
		if (e <= 255) r = "x", i = 2;
		else if (e <= 65535) r = "u", i = 4;
		else if (e <= 4294967295) r = "U", i = 8;
		else throw new n("code point within a string may not be greater than 0xFFFFFFFF");
		return "\\" + r + t.repeat("0", i - a.length) + a;
	}
	e(d, "encodeHex");
	function f(e) {
		this.schema = e.schema || r, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = t.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = u(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === "\"" ? 2 : 1, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
	}
	e(f, "State");
	function p(e, n) {
		let r = t.repeat(" ", n), i = 0, a = "", o = e.length;
		for (; i < o;) {
			let t, n = e.indexOf("\n", i);
			n === -1 ? (t = e.slice(i), i = o) : (t = e.slice(i, n + 1), i = n + 1), t.length && t !== "\n" && (a += r), a += t;
		}
		return a;
	}
	e(p, "indentString");
	function m(e, n) {
		return "\n" + t.repeat(" ", e.indent * n);
	}
	e(m, "generateNextLine");
	function h(e, t) {
		for (let n = 0, r = e.implicitTypes.length; n < r; n += 1) if (e.implicitTypes[n].resolve(t)) return !0;
		return !1;
	}
	e(h, "testImplicitResolving");
	function g(e) {
		return e === 32 || e === 9;
	}
	e(g, "isWhitespace");
	function _(e) {
		return e >= 32 && e <= 126 || e >= 161 && e <= 55295 && e !== 8232 && e !== 8233 || e >= 57344 && e <= 65533 && e !== o || e >= 65536 && e <= 1114111;
	}
	e(_, "isPrintable");
	function v(e) {
		return _(e) && e !== o && e !== 13 && e !== 10;
	}
	e(v, "isNsCharOrWhitespace");
	function y(e, t, n) {
		let r = v(e), i = r && !g(e);
		return (n ? r : r && e !== 44 && e !== 91 && e !== 93 && e !== 123 && e !== 125) && e !== 35 && !(t === 58 && !i) || v(t) && !g(t) && e === 35 || t === 58 && i;
	}
	e(y, "isPlainSafe");
	function b(e) {
		return _(e) && e !== o && !g(e) && e !== 45 && e !== 63 && e !== 58 && e !== 44 && e !== 91 && e !== 93 && e !== 123 && e !== 125 && e !== 35 && e !== 38 && e !== 42 && e !== 33 && e !== 124 && e !== 61 && e !== 62 && e !== 39 && e !== 34 && e !== 37 && e !== 64 && e !== 96;
	}
	e(b, "isPlainSafeFirst");
	function x(e) {
		return !g(e) && e !== 58;
	}
	e(x, "isPlainSafeLast");
	function S(e, t) {
		let n = e.charCodeAt(t), r;
		return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
	}
	e(S, "codePointAt");
	function C(e) {
		return /^\n* /.test(e);
	}
	e(C, "needIndentIndicator");
	function w(e, t, n, r, i, a, o, s) {
		let c, l = 0, u = null, d = !1, f = !1, p = r !== -1, m = -1, h = b(S(e, 0)) && x(S(e, e.length - 1));
		if (t || o) for (c = 0; c < e.length; l >= 65536 ? c += 2 : c++) {
			if (l = S(e, c), !_(l)) return 5;
			h = h && y(l, u, s), u = l;
		}
		else {
			for (c = 0; c < e.length; l >= 65536 ? c += 2 : c++) {
				if (l = S(e, c), l === 10) d = !0, p && (f = f || c - m - 1 > r && e[m + 1] !== " ", m = c);
				else if (!_(l)) return 5;
				h = h && y(l, u, s), u = l;
			}
			f = f || p && c - m - 1 > r && e[m + 1] !== " ";
		}
		return !d && !f ? h && !o && !i(e) ? 1 : a === 2 ? 5 : 2 : n > 9 && C(e) ? 5 : o ? a === 2 ? 5 : 2 : f ? 4 : 3;
	}
	e(w, "chooseScalarStyle");
	function T(t, r, i, a, o) {
		t.dump = (function() {
			if (r.length === 0) return t.quotingType === 2 ? "\"\"" : "''";
			if (!t.noCompatMode && (c.indexOf(r) !== -1 || l.test(r))) return t.quotingType === 2 ? "\"" + r + "\"" : "'" + r + "'";
			let s = t.indent * Math.max(1, i), u = t.lineWidth === -1 ? -1 : Math.max(Math.min(t.lineWidth, 40), t.lineWidth - s), d = a || t.flowLevel > -1 && i >= t.flowLevel;
			function f(e) {
				return h(t, e);
			}
			switch (e(f, "testAmbiguity"), w(r, d, t.indent, u, f, t.quotingType, t.forceQuotes && !a, o)) {
				case 1: return r;
				case 2: return "'" + r.replace(/'/g, "''") + "'";
				case 3: return "|" + E(r, t.indent) + D(p(r, s));
				case 4: return ">" + E(r, t.indent) + D(p(O(r, u), s));
				case 5: return "\"" + A(r) + "\"";
				default: throw new n("impossible error: invalid scalar style");
			}
		})();
	}
	e(T, "writeScalar");
	function E(e, t) {
		let n = C(e) ? String(t) : "", r = e[e.length - 1] === "\n";
		return n + (r && (e[e.length - 2] === "\n" || e === "\n") ? "+" : r ? "" : "-") + "\n";
	}
	e(E, "blockHeader");
	function D(e) {
		return e[e.length - 1] === "\n" ? e.slice(0, -1) : e;
	}
	e(D, "dropEndingNewline");
	function O(e, t) {
		let n = /(\n+)([^\n]*)/g, r = (function() {
			let r = e.indexOf("\n");
			return r = r === -1 ? e.length : r, n.lastIndex = r, k(e.slice(0, r), t);
		})(), i = e[0] === "\n" || e[0] === " ", a, o;
		for (; o = n.exec(e);) {
			let e = o[1], n = o[2];
			a = n[0] === " ", r += e + (!i && !a && n !== "" ? "\n" : "") + k(n, t), i = a;
		}
		return r;
	}
	e(O, "foldString");
	function k(e, t) {
		if (e === "" || e[0] === " ") return e;
		let n = / [^ ]/g, r, i = 0, a, o = 0, s = 0, c = "";
		for (; r = n.exec(e);) s = r.index, s - i > t && (a = o > i ? o : s, c += "\n" + e.slice(i, a), i = a + 1), o = s;
		return c += "\n", e.length - i > t && o > i ? c += e.slice(i, o) + "\n" + e.slice(o + 1) : c += e.slice(i), c.slice(1);
	}
	e(k, "foldLine");
	function A(e) {
		let t = "", n = 0;
		for (let r = 0; r < e.length; n >= 65536 ? r += 2 : r++) {
			n = S(e, r);
			let i = s[n];
			!i && _(n) ? (t += e[r], n >= 65536 && (t += e[r + 1])) : t += i || d(n);
		}
		return t;
	}
	e(A, "escapeString");
	function j(e, t, n) {
		let r = "", i = e.tag;
		for (let i = 0, a = n.length; i < a; i += 1) {
			let a = n[i];
			e.replacer && (a = e.replacer.call(n, String(i), a)), (F(e, t, a, !1, !1) || a === void 0 && F(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
		}
		e.tag = i, e.dump = "[" + r + "]";
	}
	e(j, "writeFlowSequence");
	function M(e, t, n, r) {
		let i = "", a = e.tag;
		for (let a = 0, o = n.length; a < o; a += 1) {
			let o = n[a];
			e.replacer && (o = e.replacer.call(n, String(a), o)), (F(e, t + 1, o, !0, !0, !1, !0) || o === void 0 && F(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += m(e, t)), e.dump && e.dump.charCodeAt(0) === 10 ? i += "-" : i += "- ", i += e.dump);
		}
		e.tag = a, e.dump = i || "[]";
	}
	e(M, "writeBlockSequence");
	function N(e, t, n) {
		let r = "", i = e.tag, a = Object.keys(n);
		for (let i = 0, o = a.length; i < o; i += 1) {
			let o = "";
			r !== "" && (o += ", "), e.condenseFlow && (o += "\"");
			let s = a[i], c = n[s];
			e.replacer && (c = e.replacer.call(n, s, c)), F(e, t, s, !1, !1) && (e.dump.length > 1024 && (o += "? "), o += e.dump + (e.condenseFlow ? "\"" : "") + ":" + (e.condenseFlow ? "" : " "), F(e, t, c, !1, !1) && (o += e.dump, r += o));
		}
		e.tag = i, e.dump = "{" + r + "}";
	}
	e(N, "writeFlowMapping");
	function ee(e, t, r, i) {
		let a = "", o = e.tag, s = Object.keys(r);
		if (e.sortKeys === !0) s.sort();
		else if (typeof e.sortKeys == "function") s.sort(e.sortKeys);
		else if (e.sortKeys) throw new n("sortKeys must be a boolean or a function");
		for (let n = 0, o = s.length; n < o; n += 1) {
			let o = "";
			(!i || a !== "") && (o += m(e, t));
			let c = s[n], l = r[c];
			if (e.replacer && (l = e.replacer.call(r, c, l)), !F(e, t + 1, c, !0, !0, !0)) continue;
			let u = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024;
			u && (e.dump && e.dump.charCodeAt(0) === 10 ? o += "?" : o += "? "), o += e.dump, u && (o += m(e, t)), F(e, t + 1, l, !0, u) && (e.dump && e.dump.charCodeAt(0) === 10 ? o += ":" : o += ": ", o += e.dump, a += o);
		}
		e.tag = o, e.dump = a || "{}";
	}
	e(ee, "writeBlockMapping");
	function P(e, t, r) {
		let o = r ? e.explicitTypes : e.implicitTypes;
		for (let s = 0, c = o.length; s < c; s += 1) {
			let c = o[s];
			if ((c.instanceOf || c.predicate) && (!c.instanceOf || typeof t == "object" && t instanceof c.instanceOf) && (!c.predicate || c.predicate(t))) {
				if (e.tag = r ? c.multi && c.representName ? c.representName(t) : c.tag : "?", c.represent) {
					let r = e.styleMap[c.tag] || c.defaultStyle, o;
					if (i.call(c.represent) === "[object Function]") o = c.represent(t, r);
					else if (a.call(c.represent, r)) o = c.represent[r](t, r);
					else throw new n("!<" + c.tag + "> tag resolver accepts not \"" + r + "\" style");
					e.dump = o;
				}
				return !0;
			}
		}
		return !1;
	}
	e(P, "detectType");
	function F(e, t, r, a, o, s, c) {
		e.tag = null, e.dump = r, P(e, r, !1) || P(e, r, !0);
		let l = i.call(e.dump), u = a;
		a && (a = e.flowLevel < 0 || e.flowLevel > t);
		let d = l === "[object Object]" || l === "[object Array]", f, p;
		if (d && (f = e.duplicates.indexOf(r), p = f !== -1), (e.tag !== null && e.tag !== "?" || p || e.indent !== 2 && t > 0) && (o = !1), p && e.usedDuplicates[f]) e.dump = "*ref_" + f;
		else {
			if (d && p && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), l === "[object Object]") a && Object.keys(e.dump).length !== 0 ? (ee(e, t, e.dump, o), p && (e.dump = "&ref_" + f + e.dump)) : (N(e, t, e.dump), p && (e.dump = "&ref_" + f + " " + e.dump));
			else if (l === "[object Array]") a && e.dump.length !== 0 ? (e.noArrayIndent && !c && t > 0 ? M(e, t - 1, e.dump, o) : M(e, t, e.dump, o), p && (e.dump = "&ref_" + f + e.dump)) : (j(e, t, e.dump), p && (e.dump = "&ref_" + f + " " + e.dump));
			else if (l === "[object String]") e.tag !== "?" && T(e, e.dump, t, s, u);
			else if (l === "[object Undefined]") return !1;
			else {
				if (e.skipInvalid) return !1;
				throw new n("unacceptable kind of an object to dump " + l);
			}
			if (e.tag !== null && e.tag !== "?") {
				let t = encodeURI(e.tag[0] === "!" ? e.tag.slice(1) : e.tag).replace(/!/g, "%21");
				t = e.tag[0] === "!" ? "!" + t : t.slice(0, 18) === "tag:yaml.org,2002:" ? "!!" + t.slice(18) : "!<" + t + ">", e.dump = t + " " + e.dump;
			}
		}
		return !0;
	}
	e(F, "writeNode");
	function I(e, t) {
		let n = [], r = [];
		L(e, n, r);
		let i = r.length;
		for (let e = 0; e < i; e += 1) t.duplicates.push(n[r[e]]);
		t.usedDuplicates = Array(i);
	}
	e(I, "getDuplicateReferences");
	function L(e, t, n) {
		if (typeof e == "object" && e) {
			let r = t.indexOf(e);
			if (r !== -1) n.indexOf(r) === -1 && n.push(r);
			else if (t.push(e), Array.isArray(e)) for (let r = 0, i = e.length; r < i; r += 1) L(e[r], t, n);
			else {
				let r = Object.keys(e);
				for (let i = 0, a = r.length; i < a; i += 1) L(e[r[i]], t, n);
			}
		}
	}
	e(L, "inspectNode");
	function R(e, t) {
		t = t || {};
		let n = new f(t);
		n.noRefs || I(e, n);
		let r = e;
		return n.replacer && (r = n.replacer.call({ "": r }, "", r)), F(n, 0, r, !0, !0) ? n.dump + "\n" : "";
	}
	return e(R, "dump2"), yn.dump = R, yn;
}
e(xn, "requireDumper");
var Sn;
function Cn() {
	if (Sn) return H;
	Sn = 1;
	let t = vn(), n = xn();
	function r(e, t) {
		return function() {
			throw Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
		};
	}
	return e(r, "renamed"), H.Type = K(), H.Schema = vt(), H.FAILSAFE_SCHEMA = At(), H.JSON_SCHEMA = Gt(), H.CORE_SCHEMA = Jt(), H.DEFAULT_SCHEMA = gn(), H.load = t.load, H.loadAll = t.loadAll, H.dump = n.dump, H.YAMLException = G(), H.types = {
		binary: rn(),
		float: Ht(),
		map: Dt(),
		null: Nt(),
		pairs: un(),
		set: pn(),
		timestamp: Zt(),
		bool: It(),
		int: zt(),
		merge: en(),
		omap: sn(),
		seq: wt(),
		str: xt()
	}, H.safeLoad = r("safeLoad", "load"), H.safeLoadAll = r("safeLoadAll", "loadAll"), H.safeDump = r("safeDump", "dump"), H;
}
e(Cn, "requireJsYaml");
var { Type: wn, Schema: Tn, FAILSAFE_SCHEMA: En, JSON_SCHEMA: Dn, CORE_SCHEMA: On, DEFAULT_SCHEMA: kn, load: An, loadAll: jn, dump: Mn, YAMLException: Nn, types: Pn, safeLoad: Fn, safeLoadAll: In, safeDump: Ln } = /* @__PURE__ */ ot(Cn()), Rn = "comm", zn = "rule", Bn = "decl", Vn = "@import", Hn = "@namespace", Un = "@keyframes", Wn = "@layer", Gn = Math.abs, Kn = String.fromCharCode;
function qn(e) {
	return e.trim();
}
function Jn(e, t, n) {
	return e.replace(t, n);
}
function Yn(e, t) {
	return e.charCodeAt(t) | 0;
}
function Xn(e, t, n) {
	return e.slice(t, n);
}
function q(e) {
	return e.length;
}
function Zn(e) {
	return e.length;
}
function Qn(e, t) {
	return t.push(e), e;
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var $n = 1, er = 1, tr = 0, J = 0, Y = 0, nr = "";
function rr(e, t, n, r, i, a, o, s) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: $n,
		column: er,
		length: o,
		return: "",
		siblings: s
	};
}
function ir() {
	return Y;
}
function ar() {
	return Y = J > 0 ? Yn(nr, --J) : 0, er--, Y === 10 && (er = 1, $n--), Y;
}
function X() {
	return Y = J < tr ? Yn(nr, J++) : 0, er++, Y === 10 && (er = 1, $n++), Y;
}
function Z() {
	return Yn(nr, J);
}
function or() {
	return J;
}
function sr(e, t) {
	return Xn(nr, e, t);
}
function cr(e) {
	switch (e) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
function lr(e) {
	return $n = er = 1, tr = q(nr = e), J = 0, [];
}
function ur(e) {
	return nr = "", e;
}
function dr(e) {
	return qn(sr(J - 1, mr(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function fr(e) {
	for (; (Y = Z()) && Y < 33;) X();
	return cr(e) > 2 || cr(Y) > 3 ? "" : " ";
}
function pr(e, t) {
	for (; --t && X() && !(Y < 48 || Y > 102 || Y > 57 && Y < 65 || Y > 70 && Y < 97););
	return sr(e, or() + (t < 6 && Z() == 32 && X() == 32));
}
function mr(e) {
	for (; X();) switch (Y) {
		case e: return J;
		case 34:
		case 39:
			e !== 34 && e !== 39 && mr(Y);
			break;
		case 40:
			e === 41 && mr(e);
			break;
		case 92: X();
	}
	return J;
}
function hr(e, t) {
	for (; X() && e + Y !== 57 && (e + Y !== 84 || Z() !== 47););
	return "/*" + sr(t, J - 1) + "*" + Kn(e === 47 ? e : X());
}
function gr(e) {
	for (; !cr(Z());) X();
	return sr(e, J);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function _r(e) {
	return ur(vr("", null, null, null, [""], e = lr(e), 0, [0], e));
}
function vr(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = 0, b = "", x = i, S = a, C = r, w = b; g;) switch (m = y, y = X()) {
		case 40:
			m != 108 && Yn(w, d - 1) == 58 ? (v++, w += "(") : w += dr(y);
			break;
		case 41:
			v--, w += ")";
			break;
		case 34:
		case 39:
		case 91:
			w += dr(y);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			if (v > 0) {
				w += Kn(y);
				break;
			}
			w += fr(m);
			break;
		case 92:
			w += pr(or() - 1, 7);
			continue;
		case 47:
			switch (Z()) {
				case 42:
				case 47:
					Qn(br(hr(X(), or()), t, n, c), c), (cr(m || 1) == 5 || cr(Z() || 1) == 5) && q(w) && Xn(w, -1, void 0) !== " " && (w += " ");
					break;
				default: w += "/";
			}
			break;
		case 123 * h: s[l++] = q(w) * _;
		case 125 * h:
		case 59:
		case 0:
			if (v > 0 && y) {
				w += Kn(y);
				break;
			}
			switch (y) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (w = Jn(w, /\f/g, "")), p > 0 && (q(w) - d || h === 0) && Qn(p > 32 ? xr(w + ";", r, n, d - 1, c) : xr(Jn(w, " ", "") + ";", r, n, d - 2, c), c);
					break;
				case 59: w += ";";
				default: if (Qn(C = yr(w, t, n, l, u, i, s, b, x = [], S = [], d, a), a), y === 123) {
					if (u === 0) vr(w, t, C, C, x, a, d, s, S);
					else {
						switch (f) {
							case 99: if (Yn(w, 3) === 110) break;
							case 108: if (Yn(w, 2) === 97) break;
							default: u = 0;
							case 100:
							case 109:
							case 115:
						}
						u ? vr(e, C, C, r && Qn(yr(e, C, C, 0, 0, i, s, b, i, x = [], d, S), S), i, S, d, s, r ? x : S) : vr(w, C, C, C, [""], S, 0, s, S);
					}
				}
			}
			l = u = p = 0, h = _ = 1, b = w = "", d = o;
			break;
		case 58: d = 1 + q(w), p = m;
		default:
			if (h < 1) {
				if (y == 123) --h;
				else if (y == 125 && h++ == 0 && ar() == 125) continue;
			}
			switch (w += Kn(y), y * h) {
				case 38:
					_ = u > 0 ? 1 : (w += "\f", -1);
					break;
				case 44:
					if (v > 0) break;
					s[l++] = (q(w) - 1) * _, _ = 1;
					break;
				case 64:
					Z() === 45 && (w += dr(X())), f = Z(), u = d = q(b = w += gr(or())), y++;
					break;
				case 45: m === 45 && q(w) == 2 && (h = 0);
			}
	}
	return a;
}
function yr(e, t, n, r, i, a, o, s, c, l, u, d) {
	for (var f = i - 1, p = i === 0 ? a : [""], m = Zn(p), h = 0, g = 0, _ = 0; h < r; ++h) for (var v = 0, y = Xn(e, f + 1, f = Gn(g = o[h])), b = e; v < m; ++v) (b = qn(g > 0 ? p[v] + " " + y : Jn(y, /&\f/g, p[v]))) && (c[_++] = b);
	return rr(e, t, n, i === 0 ? zn : s, c, l, u, d);
}
function br(e, t, n, r) {
	return rr(e, t, n, Rn, Kn(ir()), Xn(e, 2, -2), 0, r);
}
function xr(e, t, n, r, i) {
	return rr(e, t, n, Bn, Xn(e, 0, r), Xn(e, r + 1, -1), r, i);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function Sr(e, t) {
	for (var n = "", r = 0; r < e.length; r++) n += t(e[r], r, e, t) || "";
	return n;
}
function Cr(e, t, n, r) {
	switch (e.type) {
		case Wn: if (e.children.length) break;
		case Vn:
		case Hn:
		case Bn: return e.return = e.return || e.value;
		case Rn: return "";
		case Un: return e.return = e.value + "{" + Sr(e.children, r) + "}";
		case zn: if (!q(e.value = e.props.join(","))) return "";
	}
	return q(n = Sr(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function wr(e) {
	var t = Zn(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
//#endregion
//#region node_modules/mermaid/dist/mermaid.core.mjs
var Tr, Er = "c4", Dr = {
	id: Er,
	detector: /* @__PURE__ */ e((e) => /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./c4Diagram-7LVT6UL2-U-Ax2EmS.mjs");
		return {
			id: Er,
			diagram: e
		};
	}, "loader")
}, Or = "flowchart", kr = {
	id: Or,
	detector: /* @__PURE__ */ e((e, t) => t?.flowchart?.defaultRenderer === "dagre-wrapper" || t?.flowchart?.defaultRenderer === "elk" ? !1 : /^\s*graph/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./flowDiagram-HODETNUW-CT_6JpHy.mjs");
		return {
			id: Or,
			diagram: e
		};
	}, "loader")
}, Ar = "flowchart-v2", jr = {
	id: Ar,
	detector: /* @__PURE__ */ e((e, t) => t?.flowchart?.defaultRenderer !== "dagre-d3" && (t?.flowchart?.defaultRenderer === "elk" && (t.layout = "elk"), /^\s*graph/.test(e) && t?.flowchart?.defaultRenderer === "dagre-wrapper" ? !0 : /^\s*flowchart/.test(e)), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./flowDiagram-HODETNUW-CT_6JpHy.mjs");
		return {
			id: Ar,
			diagram: e
		};
	}, "loader")
}, Mr = "swimlane", Nr = {
	id: Mr,
	detector: /* @__PURE__ */ e((e) => /^\s*swimlane-beta\b/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./swimlanesDiagram-VR7AAH4N-Dmov975B.mjs");
		return {
			id: Mr,
			diagram: e
		};
	}, "loader")
}, Pr = "er", Fr = {
	id: Pr,
	detector: /* @__PURE__ */ e((e) => /^\s*erDiagram/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./erDiagram-RLTQ6QDP-D8jV3e9N.mjs");
		return {
			id: Pr,
			diagram: e
		};
	}, "loader")
}, Ir = "gitGraph", Lr = {
	id: Ir,
	detector: /* @__PURE__ */ e((e) => /^\s*gitGraph/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./gitGraphDiagram-WWUBYQGX-BeAnsSVL.mjs");
		return {
			id: Ir,
			diagram: e
		};
	}, "loader")
}, Rr = "gantt", zr = {
	id: Rr,
	detector: /* @__PURE__ */ e((e) => /^\s*gantt/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./ganttDiagram-EL5Y4UJY-D-LQu5qa.mjs");
		return {
			id: Rr,
			diagram: e
		};
	}, "loader")
}, Br = "info", Vr = {
	id: Br,
	detector: /* @__PURE__ */ e((e) => /^\s*info/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./infoDiagram-27XIBGKW-GLMzKuND.mjs");
		return {
			id: Br,
			diagram: e
		};
	}, "loader")
}, Hr = "pie", Ur = {
	id: Hr,
	detector: /* @__PURE__ */ e((e) => /^\s*pie/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./pieDiagram-E7YTZNPT-CHYZYVeS.mjs");
		return {
			id: Hr,
			diagram: e
		};
	}, "loader")
}, Wr = "quadrantChart", Gr = {
	id: Wr,
	detector: /* @__PURE__ */ e((e) => /^\s*quadrantChart/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./quadrantDiagram-AXDQQJYC-B00eRjyc.mjs");
		return {
			id: Wr,
			diagram: e
		};
	}, "loader")
}, Kr = "xychart", qr = {
	id: Kr,
	detector: /* @__PURE__ */ e((e) => /^\s*xychart(-beta)?/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./xychartDiagram-S5SC5T6Z-CqaITvmP.mjs");
		return {
			id: Kr,
			diagram: e
		};
	}, "loader")
}, Jr = "requirement", Yr = {
	id: Jr,
	detector: /* @__PURE__ */ e((e) => /^\s*requirement(Diagram)?/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./requirementDiagram-BXWQKSXE-DaMS5q8G.mjs");
		return {
			id: Jr,
			diagram: e
		};
	}, "loader")
}, Xr = "sequence", Zr = {
	id: Xr,
	detector: /* @__PURE__ */ e((e) => /^\s*sequenceDiagram/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./sequenceDiagram-WJ2MYXX4-jw6RJhXb.mjs");
		return {
			id: Xr,
			diagram: e
		};
	}, "loader")
}, Qr = "class", $r = {
	id: Qr,
	detector: /* @__PURE__ */ e((e, t) => t?.class?.defaultRenderer !== "dagre-wrapper" && /^\s*classDiagram/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./classDiagram-ZZMXUADV-BmXJ_Xkj.mjs");
		return {
			id: Qr,
			diagram: e
		};
	}, "loader")
}, ei = "classDiagram", ti = {
	id: ei,
	detector: /* @__PURE__ */ e((e, t) => /^\s*classDiagram/.test(e) && t?.class?.defaultRenderer === "dagre-wrapper" ? !0 : /^\s*classDiagram-v2/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./classDiagram-v2-VYDZK3BY-DYa3wuK4.mjs");
		return {
			id: ei,
			diagram: e
		};
	}, "loader")
}, ni = "state", ri = {
	id: ni,
	detector: /* @__PURE__ */ e((e, t) => t?.state?.defaultRenderer !== "dagre-wrapper" && /^\s*stateDiagram/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./stateDiagram-D77RDMKH-un0oqznE.mjs");
		return {
			id: ni,
			diagram: e
		};
	}, "loader")
}, ii = "stateDiagram", ai = {
	id: ii,
	detector: /* @__PURE__ */ e((e, t) => !!(/^\s*stateDiagram-v2/.test(e) || /^\s*stateDiagram/.test(e) && t?.state?.defaultRenderer === "dagre-wrapper"), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./stateDiagram-v2-MP3YSRHH-wpyozN3K.mjs");
		return {
			id: ii,
			diagram: e
		};
	}, "loader")
}, oi = "journey", si = {
	id: oi,
	detector: /* @__PURE__ */ e((e) => /^\s*journey/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./journeyDiagram-3NMN7TZE-QahWGvGl.mjs");
		return {
			id: oi,
			diagram: e
		};
	}, "loader")
}, ci = { draw: /* @__PURE__ */ e((e, t, r) => {
	n.debug("rendering svg for syntax error\n");
	let i = xe(t), a = i.append("g");
	i.attr("viewBox", "0 0 2412 512"), b(i, 100, 512, !0), a.append("path").attr("class", "error-icon").attr("d", "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"), a.append("path").attr("class", "error-icon").attr("d", "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"), a.append("path").attr("class", "error-icon").attr("d", "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"), a.append("path").attr("class", "error-icon").attr("d", "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"), a.append("path").attr("class", "error-icon").attr("d", "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"), a.append("path").attr("class", "error-icon").attr("d", "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"), a.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text"), a.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text(`mermaid version ${r}`);
}, "draw") }, li = ci, ui = {
	db: {},
	renderer: ci,
	parser: { parse: /* @__PURE__ */ e(() => {}, "parse") }
}, di = "flowchart-elk", fi = {
	id: di,
	detector: /* @__PURE__ */ e((e, t = {}) => /^\s*flowchart-elk/.test(e) || /^\s*(flowchart|graph)/.test(e) && t?.flowchart?.defaultRenderer === "elk" ? (t.layout = "elk", !0) : !1, "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./flowDiagram-HODETNUW-CT_6JpHy.mjs");
		return {
			id: di,
			diagram: e
		};
	}, "loader")
}, pi = "timeline", mi = {
	id: pi,
	detector: /* @__PURE__ */ e((e) => /^\s*timeline/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./timeline-definition-24CTP7MA-rGpoaLiw.mjs");
		return {
			id: pi,
			diagram: e
		};
	}, "loader")
}, hi = "mindmap", gi = {
	id: hi,
	detector: /* @__PURE__ */ e((e) => /^\s*mindmap/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./mindmap-definition-YA3MSWOX-JgRm3duN.mjs");
		return {
			id: hi,
			diagram: e
		};
	}, "loader")
}, _i = "kanban", vi = {
	id: _i,
	detector: /* @__PURE__ */ e((e) => /^\s*kanban/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./kanban-definition-UXKFOSKX-CcGQTEW2.mjs");
		return {
			id: _i,
			diagram: e
		};
	}, "loader")
}, yi = "sankey", bi = {
	id: yi,
	detector: /* @__PURE__ */ e((e) => /^\s*sankey(-beta)?/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./sankeyDiagram-P5KCCOFB-BGu-9n6f.mjs");
		return {
			id: yi,
			diagram: e
		};
	}, "loader")
}, xi = "packet", Si = {
	id: xi,
	detector: /* @__PURE__ */ e((e) => /^\s*packet(-beta)?/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./diagram-Z3DM3KII-DVwxccmP.mjs");
		return {
			id: xi,
			diagram: e
		};
	}, "loader")
}, Ci = "radar", wi = {
	id: Ci,
	detector: /* @__PURE__ */ e((e) => /^\s*radar-beta/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./diagram-UQ7AKVKN-Cncy7vFs.mjs");
		return {
			id: Ci,
			diagram: e
		};
	}, "loader")
}, Ti = "block", Ei = {
	id: Ti,
	detector: /* @__PURE__ */ e((e) => /^\s*block(-beta)?/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./blockDiagram-I7D4REHJ-FKMleaSg.mjs");
		return {
			id: Ti,
			diagram: e
		};
	}, "loader")
}, Di = "treeView", Oi = {
	id: Di,
	detector: /* @__PURE__ */ e((e) => /^\s*treeView-beta/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./diagram-S7CK7UJ4-CmLkAd5H.mjs");
		return {
			id: Di,
			diagram: e
		};
	}, "loader")
}, ki = "architecture", Ai = {
	id: ki,
	detector: /* @__PURE__ */ e((e) => /^\s*architecture/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./architectureDiagram-5GKGNRK7-JTye8Ch2.mjs");
		return {
			id: ki,
			diagram: e
		};
	}, "loader")
}, ji = "eventmodeling", Mi = {
	id: ji,
	detector: /* @__PURE__ */ e((e) => /^\s*eventmodeling/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./diagram-VSXAHHWV-_ibhyTnW.mjs");
		return {
			id: ji,
			diagram: e
		};
	}, "loader")
}, Ni = "ishikawa", Pi = {
	id: Ni,
	detector: /* @__PURE__ */ e((e) => /^\s*ishikawa(-beta)?\b/i.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./ishikawaDiagram-5VMMS53U-h1plbLJs.mjs");
		return {
			id: Ni,
			diagram: e
		};
	}, "loader")
}, Fi = "venn", Ii = {
	id: Fi,
	detector: /* @__PURE__ */ e((e) => /^\s*venn-beta/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./vennDiagram-4TSXK5OY-F0OgAlJa.mjs");
		return {
			id: Fi,
			diagram: e
		};
	}, "loader")
}, Li = "treemap", Ri = {
	id: Li,
	detector: /* @__PURE__ */ e((e) => /^\s*treemap/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./diagram-VX7I27RA-BBUvx0jG.mjs");
		return {
			id: Li,
			diagram: e
		};
	}, "loader")
}, zi = "wardley", Bi = {
	id: zi,
	detector: /* @__PURE__ */ e((e) => /^\s*wardley-beta/i.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./wardleyDiagram-VM6X3IG4-CT1L35Z6.mjs");
		return {
			id: zi,
			diagram: e
		};
	}, "loader")
}, Vi = "cynefin", Hi = {
	id: Vi,
	detector: /* @__PURE__ */ e((e) => /^\s*cynefin-beta(?:[\s:]|$)/.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./cynefinDiagram-5FMLGOSQ-tVj0LZjv.mjs");
		return {
			id: Vi,
			diagram: e
		};
	}, "loader")
}, Ui = "railroad", Wi = {
	id: Ui,
	detector: /* @__PURE__ */ e((e) => /^\s*railroad-beta/i.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./railroadDiagram-O6MQD6OU-Bvo3CWfH.mjs");
		return {
			id: Ui,
			diagram: e
		};
	}, "loader")
}, Gi = "railroadEbnf", Ki = {
	id: Gi,
	detector: /* @__PURE__ */ e((e) => /^\s*railroad-ebnf-beta/i.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./ebnfDiagram-PWID7BFC-DBzmc7nd.mjs");
		return {
			id: Gi,
			diagram: e
		};
	}, "loader")
}, qi = "railroadAbnf", Ji = {
	id: qi,
	detector: /* @__PURE__ */ e((e) => /^\s*railroad-abnf-beta/i.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./abnfDiagram-VCTEODGH-Cl09dgPQ.mjs");
		return {
			id: qi,
			diagram: e
		};
	}, "loader")
}, Yi = "railroadPeg", Xi = {
	id: Yi,
	detector: /* @__PURE__ */ e((e) => /^\s*railroad-peg-beta/i.test(e), "detector"),
	loader: /* @__PURE__ */ e(async () => {
		let { diagram: e } = await import("./pegDiagram-XKGWAZYB-BoTt9JwV.mjs");
		return {
			id: Yi,
			diagram: e
		};
	}, "loader")
}, Zi = !1, Qi = /* @__PURE__ */ e(() => {
	Zi || (Zi = !0, l("error", ui, (e) => e.toLowerCase().trim() === "error"), l("---", {
		db: { clear: /* @__PURE__ */ e(() => {}, "clear") },
		styles: {},
		renderer: { draw: /* @__PURE__ */ e(() => {}, "draw") },
		parser: { parse: /* @__PURE__ */ e(() => {
			throw Error("Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks");
		}, "parse") },
		init: /* @__PURE__ */ e(() => null, "init")
	}, (e) => e.toLowerCase().trimStart().startsWith("---")), u(fi, gi, Ai), u(Dr, vi, ti, $r, Fr, zr, Vr, Ur, Yr, Zr, Nr, jr, kr, mi, Lr, ai, ri, si, Gr, bi, Si, qr, Ei, Mi, Oi, wi, Pi, Ri, Wi, Ki, Ji, Xi, Ii, Bi, Hi));
}, "addDiagrams"), $i = /* @__PURE__ */ e(async () => {
	n.debug("Loading registered diagrams");
	let e = (await Promise.allSettled(Object.entries(C).map(async ([e, { detector: t, loader: r }]) => {
		if (r) try {
			f(e);
		} catch {
			try {
				let { diagram: e, id: n } = await r();
				l(n, e, t);
			} catch (t) {
				throw n.error(`Failed to load external diagram with key ${e}. Removing from detectors.`), delete C[e], t;
			}
		}
	}))).filter((e) => e.status === "rejected");
	if (e.length > 0) {
		n.error(`Failed to load ${e.length} external diagrams`);
		for (let t of e) n.error(t);
		throw Error(`Failed to load ${e.length} external diagrams`);
	}
}, "loadRegisteredDiagrams"), ea = "graphics-document document";
function ta(e, t) {
	e.attr("role", ea), t !== "" && e.attr("aria-roledescription", t);
}
e(ta, "setA11yDiagramInfo");
function na(e, t, n, r) {
	if (e.insert !== void 0) {
		if (n) {
			let t = `chart-desc-${r}`;
			e.attr("aria-describedby", t), e.insert("desc", ":first-child").attr("id", t).text(n);
		}
		if (t) {
			let n = `chart-title-${r}`;
			e.attr("aria-labelledby", n), e.insert("title", ":first-child").attr("id", n).text(t);
		}
	}
}
e(na, "addSVGa11yTitleDescription");
var ra = (Tr = class e {
	constructor(e, t, n, r, i) {
		this.type = e, this.text = t, this.db = n, this.parser = r, this.renderer = i;
	}
	static async fromText(t, n = {}) {
		let r = y(), i = T(t, r);
		t = R(t) + "\n";
		try {
			f(i);
		} catch {
			let e = a(i);
			if (!e) throw new k(`Diagram ${i} not found.`);
			let { id: t, diagram: n } = await e();
			l(t, n);
		}
		let { db: o, parser: s, renderer: c, init: u } = f(i);
		return s.parser && (s.parser.yy = o), o.clear?.(), u?.(r), n.title && o.setDiagramTitle?.(n.title), await s.parse(t), new e(i, t, o, s, c);
	}
	async render(e, t) {
		await this.renderer.draw(this.text, e, t, this);
	}
	getParser() {
		return this.parser;
	}
	getType() {
		return this.type;
	}
}, e(Tr, "Diagram"), Tr), ia = [], aa = /* @__PURE__ */ e(() => {
	ia.forEach((e) => {
		e();
	}), ia = [];
}, "attachFunctions"), oa = /* @__PURE__ */ e((e) => e.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart(), "cleanupComments");
function sa(e) {
	let t = e.match(v);
	if (!t) return {
		text: e,
		metadata: {}
	};
	let n = t[1], r = An(n ? t[2].split("\n").map((e) => e.startsWith(n) ? e.slice(n.length) : e).join("\n") : t[2], { schema: Dn }) ?? {};
	r = typeof r == "object" && !Array.isArray(r) ? r : {};
	let i = {};
	return r.displayMode && (i.displayMode = r.displayMode.toString()), r.title && (i.title = r.title.toString()), r.config && (i.config = r.config), {
		text: e.slice(t[0].length),
		metadata: i
	};
}
e(sa, "extractFrontMatter");
var ca = /* @__PURE__ */ e((e) => e.replace(/\r\n?/g, "\n").replace(/<(\w+)([^>]*)>/g, (e, t, n) => "<" + t + n.replace(/="([^"]*)"/g, "='$1'") + ">"), "cleanupText"), la = /* @__PURE__ */ e((e) => {
	let { text: t, metadata: n } = sa(e), { displayMode: r, title: i, config: a = {} } = n;
	return r && (a.gantt || (a.gantt = {}), a.gantt.displayMode = r), {
		title: i,
		config: a,
		text: t
	};
}, "processFrontmatter"), ua = /* @__PURE__ */ e((e) => {
	let t = F.detectInit(e) ?? {}, n = F.detectDirective(e, "wrap");
	return Array.isArray(n) ? t.wrap = n.some(({ type: e }) => e === "wrap") : n?.type === "wrap" && (t.wrap = !0), {
		text: I(e),
		directive: t
	};
}, "processDirectives");
function da(e) {
	let t = la(ca(e)), n = ua(t.text), r = L(t.config, n.directive);
	return e = oa(n.text), {
		code: e,
		title: t.title,
		config: r
	};
}
e(da, "preprocessDiagram");
function fa(e) {
	let t = new TextEncoder().encode(e), n = Array.from(t, (e) => String.fromCodePoint(e)).join("");
	return btoa(n);
}
e(fa, "toBase64");
var pa = 5e4, ma = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", ha = "sandbox", ga = "loose", _a = "http://www.w3.org/2000/svg", va = "http://www.w3.org/1999/xlink", ya = "http://www.w3.org/1999/xhtml", ba = "100%", xa = "100%", Sa = "border:0;margin:0;", Ca = "margin:0", wa = "allow-top-navigation-by-user-activation allow-popups", Ta = "The \"iframe\" tag is not supported by your browser.", Ea = ["foreignobject"], Da = ["dominant-baseline"];
function Oa(e) {
	let t = da(e);
	return s(), w(t.config ?? {}), t;
}
e(Oa, "processAndSetConfigs");
async function ka(e, t) {
	Qi();
	try {
		let { code: t, config: n } = Oa(e);
		return {
			diagramType: (await Va(t)).type,
			config: n
		};
	} catch (e) {
		if (t?.suppressErrors) return !1;
		throw e;
	}
}
e(ka, "parse");
var Aa = /* @__PURE__ */ e((e, t, n = []) => `.${e} ${t} ${c(`{ ${n.join(" !important; ")} !important; }`)}`, "cssImportantStyles"), ja = /* @__PURE__ */ e((e, t = /* @__PURE__ */ new Map()) => {
	let n = new CSSStyleSheet();
	if (e.fontFamily !== void 0 && n.insertRule(`:root { --mermaid-font-family: ${e.fontFamily}}`, n.cssRules.length), e.altFontFamily !== void 0 && n.insertRule(`:root { --mermaid-alt-font-family: ${e.altFontFamily}}`, n.cssRules.length), t instanceof Map) {
		let r = p(e) ? ["> *", "span"] : [
			"rect",
			"polygon",
			"ellipse",
			"circle",
			"path"
		];
		t.forEach((e) => {
			Ce(e.styles) || r.forEach((t) => {
				n.insertRule(Aa(e.id, t, e.styles), n.cssRules.length);
			}), Ce(e.textStyles) || n.insertRule(Aa(e.id, "tspan", (e?.textStyles || []).map((e) => e.replace("color", "fill"))), n.cssRules.length);
		});
	}
	let r = "";
	if (e.themeCSS !== void 0) {
		if (typeof n.replaceSync == "function") {
			let t = new CSSStyleSheet();
			t.replaceSync(e.themeCSS), r = S(t) + "\n";
		} else r += `${e.themeCSS}
`;
	}
	return r + S(n);
}, "createCssStyles"), Ma = /* @__PURE__ */ e((t, r) => Sr(_r(`${t}{${r}}`), wr([/* @__PURE__ */ e(function(e, r, i, a) {
	if (e.type === "rule" && Array.isArray(e.props)) {
		if (e.parent && e.parent.type === "@keyframes") return;
		e.props = e.props.map((n) => n === t && Array.isArray(e.children) && e.children.every((e) => e.type === "decl" && (/* @__PURE__ */ new Set([
			"font-family",
			"font-size",
			"fill"
		])).has(e.props)) ? n : !n.startsWith(`${t} `) && !n.startsWith(`${t}>`) || n.startsWith(`${t} ||`) ? `${t} ${n}` : n);
	} else e.type.startsWith("@") && ([
		"@media",
		"@supports",
		"@layer",
		"@scope",
		"@container",
		"@starting-style",
		"@keyframes"
	].includes(e.type) || (n.warn(`Removing unsupported at-rule ${e.type} from CSS`), e.type = Rn));
}, "addNamespace"), Cr])), "compileCSS"), Na = /* @__PURE__ */ e((e, t, n, r) => {
	let i = ja(e, n);
	return Ma(r, g(t, i, {
		...e.themeVariables,
		theme: e.theme,
		look: e.look
	}, r));
}, "createUserStyles"), Pa = /* @__PURE__ */ e((e = "", t, n) => {
	let r = e;
	return !n && !t && (r = r.replace(/marker-end="url\([\d+./:=?A-Za-z-]*?#/g, "marker-end=\"url(#")), r = N(r), r = r.replace(/<br>/g, "<br/>"), r;
}, "cleanUpSvgCode"), Fa = /* @__PURE__ */ e((e = "", t) => `<iframe style="width:${ba};height:${t?.viewBox?.baseVal?.height ? t.viewBox.baseVal.height + "px" : xa};${Sa}" src="data:text/html;charset=UTF-8;base64,${fa(`<body style="${Ca}">${e}</body>`)}" sandbox="${wa}">
  ${Ta}
</iframe>`, "putIntoIFrame"), Ia = /* @__PURE__ */ e((e, t, n, r, i) => {
	let a = e.append("div");
	a.attr("id", n), r && a.attr("style", r);
	let o = a.append("svg").attr("id", t).attr("width", "100%").attr("xmlns", _a);
	return i && o.attr("xmlns:xlink", i), o.append("g"), e;
}, "appendDivSvgG");
function La(e, t) {
	return e.append("iframe").attr("id", t).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
e(La, "sandboxedIframe");
var Ra = /* @__PURE__ */ e((e, t, n, r) => {
	e.getElementById(t)?.remove(), e.getElementById(n)?.remove(), e.getElementById(r)?.remove();
}, "removeExistingElements"), za = /* @__PURE__ */ e(async function(t, a, o) {
	Qi();
	let s = Oa(a);
	a = s.code;
	let c = y();
	n.debug(c), a.length > (c?.maxTextSize ?? pa) && (a = ma);
	let l = `#${t}`, u = "i" + t, d = "#" + u, f = "d" + t, p = "#" + f, m = /* @__PURE__ */ e(() => {
		let e = r(g ? d : p).node();
		e && "remove" in e && e.remove();
	}, "removeTempElements"), h = r(document.body), g = c.securityLevel === ha, _ = c.securityLevel === ga, v = c.fontFamily;
	if (o !== void 0) {
		if (o && (o.innerHTML = ""), g) {
			let e = La(r(o), u);
			h = r(e.nodes()[0].contentDocument.body), h.node().style.margin = "0";
		} else h = r(o);
		Ia(h, t, f, `font-family: ${v}`, va);
	} else {
		if (Ra(document, t, f, u), g) {
			let e = La(r(document.body), u);
			h = r(e.nodes()[0].contentDocument.body), h.node().style.margin = "0";
		} else h = r("body");
		Ia(h, t, f);
	}
	let b, S;
	try {
		b = await ra.fromText(a, { title: s.title });
	} catch (e) {
		if (c.suppressErrorRendering) throw m(), e;
		b = await ra.fromText("error"), S = e;
	}
	let C = h.select(p).node(), w = b.type, T = C.firstChild, E = T.firstChild, D = b.renderer.getClasses?.(a, b), O = Na(c, w, D, l), k = document.createElement("style");
	k.innerHTML = O, T.insertBefore(k, E);
	try {
		await b.renderer.draw(a, t, "11.17.2", b);
	} catch (e) {
		throw c.suppressErrorRendering ? m() : li.draw(a, t, "11.17.2"), e;
	}
	let A = h.select(`${p} svg`), j = b.db.getAccTitle?.(), M = b.db.getAccDescription?.();
	Ha(w, A, j, M);
	let N = (/* @__PURE__ */ e(() => {
		h.select(`[id="${t}"]`).selectAll("foreignobject > *").attr("xmlns", ya);
		let e = h.select(p).node().innerHTML;
		if (n.debug("config.arrowMarkerAbsolute", c.arrowMarkerAbsolute), e = Pa(e, g, x(c.arrowMarkerAbsolute)), g) {
			let t = h.select(p + " svg").node();
			e = Fa(e, t);
		} else _ || (e = i.sanitize(e, {
			ADD_TAGS: Ea,
			ADD_ATTR: Da,
			HTML_INTEGRATION_POINTS: { foreignobject: !0 }
		}));
		return aa(), e;
	}, "serializeSvg"))();
	if (S) throw S;
	return m(), {
		diagramType: w,
		svg: N,
		bindFunctions: b.db.bindFunctions
	};
}, "render");
function Ba(e = {}) {
	let n = D({}, e);
	n?.fontFamily && !n.themeVariables?.fontFamily && (n.themeVariables || (n.themeVariables = {}), n.themeVariables.fontFamily = n.fontFamily), m(n), n?.theme && n.theme in _ ? n.themeVariables = _[n.theme].getThemeVariables(n.themeVariables) : n && (n.themeVariables = _.default.getThemeVariables(n.themeVariables));
	let r = typeof n == "object" ? E(n) : o();
	t(r.logLevel), Qi();
}
e(Ba, "initialize");
var Va = /* @__PURE__ */ e((e, t = {}) => {
	let { code: n } = da(e);
	return ra.fromText(n, t);
}, "getDiagramFromText");
function Ha(e, t, n, r) {
	ta(t, e), na(t, n, r, t.attr("id"));
}
e(Ha, "addA11yInfo");
var Q = Object.freeze({
	render: za,
	parse: ka,
	getDiagramFromText: Va,
	initialize: Ba,
	getConfig: y,
	setConfig: h,
	getSiteConfig: o,
	updateSiteConfig: d,
	reset: /* @__PURE__ */ e(() => {
		s();
	}, "reset"),
	globalReset: /* @__PURE__ */ e(() => {
		s(A);
	}, "globalReset"),
	defaultConfig: A
});
t(y().logLevel), s(y());
var Ua = /* @__PURE__ */ e((e, t, r) => {
	n.warn(e), P(e) ? (r && r(e.str, e.hash), t.push({
		...e,
		message: e.str,
		error: e
	})) : (r && r(e), e instanceof Error && t.push({
		str: e.message,
		message: e.message,
		hash: e.name,
		error: e
	}));
}, "handleError"), Wa = /* @__PURE__ */ e(async function(e = { querySelector: ".mermaid" }) {
	try {
		await Ga(e);
	} catch (t) {
		if (P(t) && n.error(t.str), $.parseError && $.parseError(t), !e.suppressErrors) throw n.error("Use the suppressErrors option to suppress these errors"), t;
	}
}, "run"), Ga = /* @__PURE__ */ e(async function({ postRenderCallback: e, querySelector: t, nodes: r } = { querySelector: ".mermaid" }) {
	let i = Q.getConfig();
	n.debug(`${e ? "" : "No "}Callback function found`);
	let a;
	if (r) a = r;
	else if (t) a = document.querySelectorAll(t);
	else throw Error("Nodes and querySelector are both undefined");
	n.debug(`Found ${a.length} diagrams`), i?.startOnLoad !== void 0 && (n.debug("Start On Load: " + i?.startOnLoad), Q.updateSiteConfig({ startOnLoad: i?.startOnLoad }));
	let o = new F.InitIDGenerator(i.deterministicIds, i.deterministicIDSeed), s, c = [];
	for (let t of Array.from(a)) {
		if (n.info("Rendering diagram: " + t.id), t.getAttribute("data-processed")) continue;
		t.setAttribute("data-processed", "true");
		let r = `mermaid-${o.next()}`;
		s = t.innerHTML, s = ae(F.entityDecode(s)).trim().replace(/<br\s*\/?>/gi, "<br/>");
		let i = F.detectInit(s);
		i && n.debug("Detected early reinit: ", i);
		try {
			let { svg: n, bindFunctions: i } = await to(r, s, t);
			t.innerHTML = n, e && await e(r), i && i(t);
		} catch (e) {
			Ua(e, c, $.parseError);
		}
	}
	if (c.length > 0) throw c[0];
}, "runThrowsErrors"), Ka = /* @__PURE__ */ e(function(e) {
	Q.initialize(e);
}, "initialize"), qa = /* @__PURE__ */ e(async function(e, t, r) {
	n.warn("mermaid.init is deprecated. Please use run instead."), e && Ka(e);
	let i = {
		postRenderCallback: r,
		querySelector: ".mermaid"
	};
	typeof t == "string" ? i.querySelector = t : t && (i.nodes = t instanceof HTMLElement ? [t] : t), await Wa(i);
}, "init"), Ja = /* @__PURE__ */ e(async (e, { lazyLoad: t = !0 } = {}) => {
	Qi(), u(...e), t === !1 && await $i();
}, "registerExternalDiagrams"), Ya = /* @__PURE__ */ e(function() {
	if ($.startOnLoad) {
		let { startOnLoad: e } = Q.getConfig();
		e && $.run().catch((e) => n.error("Mermaid failed to initialize", e));
	}
}, "contentLoaded");
typeof document < "u" && window.addEventListener("load", Ya, !1);
var Xa = /* @__PURE__ */ e(function(e) {
	$.parseError = e;
}, "setParseErrorHandler"), Za = [], Qa = !1, $a = /* @__PURE__ */ e(async () => {
	if (!Qa) {
		for (Qa = !0; Za.length > 0;) {
			let e = Za.shift();
			if (e) try {
				await e();
			} catch (e) {
				n.error("Error executing queue", e);
			}
		}
		Qa = !1;
	}
}, "executeQueue"), eo = /* @__PURE__ */ e(async (t, r) => new Promise((i, a) => {
	let o = /* @__PURE__ */ e(() => new Promise((e, o) => {
		Q.parse(t, r).then((t) => {
			e(t), i(t);
		}, (e) => {
			n.error("Error parsing", e), $.parseError?.(e), o(e), a(e);
		});
	}), "performCall");
	Za.push(o), $a().catch(a);
}), "parse"), to = /* @__PURE__ */ e((t, r, i) => new Promise((a, o) => {
	let s = /* @__PURE__ */ e(() => new Promise((e, s) => {
		Q.render(t, r, i).then((t) => {
			e(t), a(t);
		}, (e) => {
			n.error("Error parsing", e), $.parseError?.(e), s(e), o(e);
		});
	}), "performCall");
	Za.push(s), $a().catch(o);
}), "render"), $ = {
	startOnLoad: !0,
	mermaidAPI: Q,
	parse: eo,
	render: to,
	init: qa,
	run: Wa,
	registerExternalDiagrams: Ja,
	registerLayoutLoaders: Ee,
	initialize: Ka,
	parseError: void 0,
	contentLoaded: Ya,
	setParseErrorHandler: Xa,
	detectType: T,
	registerIconPacks: ie,
	getRegisteredDiagramsMetadata: /* @__PURE__ */ e(() => Object.keys(C).map((e) => ({ id: e })), "getRegisteredDiagramsMetadata")
}, no = $;
//#endregion
export { Je as a, je as c, De as d, no as default, xe as f, B as i, Ge as l, An as n, ke as o, He as r, Be as s, Dn as t, Oe as u };
