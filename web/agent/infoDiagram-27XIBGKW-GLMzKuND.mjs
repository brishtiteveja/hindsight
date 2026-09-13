import { n as e } from "./mermaid-parser.core-CocydDMZ.mjs";
import { n as t } from "./chunk-Y2CYZVJY-i11wjrBe.mjs";
import { m as n } from "./src-DKnM293t.mjs";
import { c as r } from "./chunk-DU6HZSFF-Bv553b-w.mjs";
import { f as i } from "./mermaid.core-DuekSTCI.mjs";
//#region node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-27XIBGKW.mjs
var a = { parse: /* @__PURE__ */ t(async (t) => {
	let r = await e("info", t);
	n.debug(r);
}, "parse") }, o = { version: "11.17.2" }, s = {
	parser: a,
	db: { getVersion: /* @__PURE__ */ t(() => o.version, "getVersion") },
	renderer: { draw: /* @__PURE__ */ t((e, t, a) => {
		n.debug("rendering info diagram\n" + e);
		let o = i(t);
		r(o, 100, 400, !0), o.append("g").append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${a}`);
	}, "draw") }
};
//#endregion
export { s as diagram };
