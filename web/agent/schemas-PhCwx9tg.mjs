import { n as e } from "./rolldown-runtime-DArdT4gl.mjs";
//#region node_modules/zod/v4/core/util.js
var t = /* @__PURE__ */ e({
	BIGINT_FORMAT_RANGES: () => Te,
	CONSTANT_CATCH: () => ot,
	Class: () => Ze,
	NUMBER_FORMAT_RANGES: () => we,
	aborted: () => w,
	allowsEval: () => he,
	assert: () => s,
	assertEqual: () => n,
	assertIs: () => a,
	assertNever: () => o,
	assertNotEqual: () => r,
	assignProp: () => g,
	attachSchema: () => Le,
	base64ToUint8Array: () => Ge,
	base64urlToUint8Array: () => qe,
	cached: () => f,
	captureStackTrace: () => pe,
	cleanEnum: () => We,
	cleanRegex: () => m,
	clone: () => S,
	cloneDef: () => se,
	codePointLength: () => Be,
	constantCatch: () => st,
	createTransparentProxy: () => xe,
	defineLazy: () => te,
	defineLazyInternal: () => k,
	derived: () => et,
	esc: () => de,
	escapeRegex: () => x,
	explicitlyAborted: () => Fe,
	extend: () => ke,
	finalizeIssue: () => E,
	floatSafeRemainder: () => h,
	getElementAtPath: () => ce,
	getEnumValues: () => c,
	getLengthableOrigin: () => Ve,
	getParsedType: () => ve,
	getSizableOrigin: () => Re,
	hexToUint8Array: () => Ye,
	hide: () => $e,
	installLazyProp: () => at,
	isObject: () => me,
	isPlainObject: () => b,
	issue: () => Ue,
	joinValues: () => l,
	jsonStringifyReplacer: () => u,
	members: () => Qe,
	merge: () => Me,
	mergeDefs: () => y,
	normalizeParams: () => C,
	nullish: () => p,
	numKeys: () => _e,
	objectClone: () => ne,
	omit: () => Oe,
	optionalKeys: () => Ce,
	own: () => D,
	parsedType: () => He,
	partial: () => Ne,
	pick: () => Ee,
	prefixIssues: () => T,
	primitiveTypes: () => be,
	promiseAllObject: () => le,
	propertyKeyTypes: () => ye,
	randomString: () => ue,
	rawShape: () => re,
	required: () => Pe,
	safeExtend: () => je,
	shallowClone: () => ge,
	slugify: () => fe,
	stringifyPrimitive: () => Se,
	toZod: () => i,
	uint8ArrayToBase64: () => Ke,
	uint8ArrayToBase64url: () => Je,
	uint8ArrayToHex: () => Xe,
	unwrapMessage: () => Ie
});
function n(e) {
	return e;
}
function r(e) {
	return e;
}
function i() {
	return (e) => e;
}
function a(e) {}
function o(e) {
	throw Error("Unexpected value in exhaustive check");
}
function s(e) {}
function c(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function l(e, t = "|") {
	return e.map((e) => Se(e)).join(t);
}
function u(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var d = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function f(e) {
	return new d(e);
}
function p(e) {
	return e == null;
}
function m(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function h(e, t) {
	let n = e / t, r = Math.round(n), i = 4 * 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
var ee = /* @__PURE__*/ Symbol("evaluating");
function te(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== ee) return r === void 0 && (r = ee, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function ne(e) {
	return Object.create(Object.getPrototypeOf(e), Object.getOwnPropertyDescriptors(e));
}
function g(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function re(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function _(e) {
	return re(e._zod.def) ?? e._zod.def.shape;
}
function ie(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return g(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function ae(e, t, n) {
	t in e ? g(e, t, n) : e[t] = n;
}
function v(e, t, n, r) {
	let i = _(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? ie(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : ae(e, a, r ? r(n.value, a) : n.value));
	}
}
function oe(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? ie(e, n, () => t[n]) : ae(e, n, r.value));
	}
}
function y(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function se(e) {
	return y(e._zod.def);
}
function ce(e, t) {
	return t ? t.reduce((e, t) => e?.[t], e) : e;
}
function le(e) {
	let t = Object.keys(e), n = t.map((t) => e[t]);
	return Promise.all(n).then((e) => {
		let n = {};
		for (let r = 0; r < t.length; r++) n[t[r]] = e[r];
		return n;
	});
}
function ue(e = 10) {
	let t = "";
	for (let n = 0; n < e; n++) t += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
	return t;
}
function de(e) {
	return JSON.stringify(e);
}
function fe(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var pe = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function me(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var he = /* @__PURE__*/ f(() => {
	if (M.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function b(e) {
	if (me(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return me(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function ge(e) {
	return b(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
function _e(e) {
	let t = 0;
	for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
	return t;
}
var ve = (e) => {
	let t = typeof e;
	switch (t) {
		case "undefined": return "undefined";
		case "string": return "string";
		case "number": return Number.isNaN(e) ? "nan" : "number";
		case "boolean": return "boolean";
		case "function": return "function";
		case "bigint": return "bigint";
		case "symbol": return "symbol";
		case "object": return Array.isArray(e) ? "array" : e === null ? "null" : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? "promise" : typeof Map < "u" && e instanceof Map ? "map" : typeof Set < "u" && e instanceof Set ? "set" : typeof Date < "u" && e instanceof Date ? "date" : typeof File < "u" && e instanceof File ? "file" : "object";
		default: throw Error(`Unknown data type: ${t}`);
	}
}, ye = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]), be = /* @__PURE__*/ new Set([
	"string",
	"number",
	"bigint",
	"boolean",
	"symbol",
	"undefined"
]);
function x(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function S(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function C(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function xe(e) {
	let t;
	return new Proxy({}, {
		get(n, r, i) {
			return t ?? (t = e()), Reflect.get(t, r, i);
		},
		set(n, r, i, a) {
			return t ?? (t = e()), Reflect.set(t, r, i, a);
		},
		has(n, r) {
			return t ?? (t = e()), Reflect.has(t, r);
		},
		deleteProperty(n, r) {
			return t ?? (t = e()), Reflect.deleteProperty(t, r);
		},
		ownKeys(n) {
			return t ?? (t = e()), Reflect.ownKeys(t);
		},
		getOwnPropertyDescriptor(n, r) {
			return t ?? (t = e()), Reflect.getOwnPropertyDescriptor(t, r);
		},
		defineProperty(n, r, i) {
			return t ?? (t = e()), Reflect.defineProperty(t, r, i);
		}
	});
}
function Se(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function Ce(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
var we = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}, Te = {
	int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
	uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
};
function Ee(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	let i = {};
	return v(i, e, De(e, t)), S(e, y(n, {
		shape: i,
		checks: []
	}));
}
function De(e, t) {
	let n = _(e), r = [];
	for (let e of Reflect.ownKeys(t)) {
		if (!Object.getOwnPropertyDescriptor(n, e)?.enumerable) throw Error(`Unrecognized key: "${String(e)}"`);
		t[e] && r.push(e);
	}
	return r;
}
function Oe(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	let i = new Set(De(e, t)), a = {};
	return v(a, e, Reflect.ownKeys(_(e)).filter((e) => !i.has(e))), S(e, y(n, {
		shape: a,
		checks: []
	}));
}
function ke(e, t) {
	if (!b(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = _(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return S(e, y(e._zod.def, { shape: Ae(e, t) }));
}
function Ae(e, t) {
	let n = {};
	return v(n, e, Reflect.ownKeys(_(e))), oe(n, t), n;
}
function je(e, t) {
	if (!b(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return S(e, y(e._zod.def, { shape: Ae(e, t) }));
}
function Me(e, t) {
	if (!t?._zod?.def) throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	let n = {};
	return v(n, e, Reflect.ownKeys(_(e))), v(n, t, Reflect.ownKeys(_(t))), S(e, y(e._zod.def, {
		shape: n,
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function Ne(e, t, n, r = "partial") {
	let i = t._zod.def.checks;
	if (i && i.length > 0) throw Error(`.${r}() cannot be used on object schemas containing refinements`);
	let a = n ? new Set(De(t, n)) : void 0, o = {};
	return v(o, t, Reflect.ownKeys(_(t)), e && ((t, n) => a && !a.has(n) ? t : new e({
		type: "optional",
		innerType: t
	}))), S(t, y(t._zod.def, {
		shape: o,
		checks: []
	}));
}
function Pe(e, t, n) {
	let r = n ? new Set(De(t, n)) : void 0, i = {};
	return v(i, t, Reflect.ownKeys(_(t)), (t, n) => r && !r.has(n) ? t : new e({
		type: "nonoptional",
		innerType: t
	})), S(t, y(t._zod.def, { shape: i }));
}
function w(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function Fe(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function T(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function Ie(e) {
	return typeof e == "string" ? e : e?.message;
}
function Le(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function E(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : Ie(e.inst?._zod.def?.error?.(e)) ?? Ie(a?.(e)) ?? Ie(t?.error?.(e)) ?? Ie(n.customError?.(e)) ?? Ie(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ?? (s.path = []), s.message = o, t?.reportInput && (s.input = e.input), s;
}
function Re(e) {
	return e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof File ? "file" : "unknown";
}
var ze = /[\uD800-\uDBFF]/;
function Be(e) {
	let t = e.length;
	if (!ze.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function Ve(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function He(e) {
	let t = typeof e;
	switch (t) {
		case "number": return Number.isNaN(e) ? "nan" : "number";
		case "object": {
			if (e === null) return "null";
			if (Array.isArray(e)) return "array";
			let t = e;
			if (t && Object.getPrototypeOf(t) !== Object.prototype && "constructor" in t && t.constructor) return t.constructor.name;
		}
	}
	return t;
}
function Ue(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
function We(e) {
	return Object.entries(e).filter(([e, t]) => Number.isNaN(Number.parseInt(e, 10))).map((e) => e[1]);
}
function Ge(e) {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}
function Ke(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
	return btoa(t);
}
function qe(e) {
	let t = e.replace(/-/g, "+").replace(/_/g, "/");
	return Ge(t + "=".repeat((4 - t.length % 4) % 4));
}
function Je(e) {
	return Ke(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function Ye(e) {
	let t = e.replace(/^0x/, "");
	if (t.length % 2 != 0) throw Error("Invalid hex string length");
	let n = new Uint8Array(t.length / 2);
	for (let e = 0; e < t.length; e += 2) n[e / 2] = Number.parseInt(t.slice(e, e + 2), 16);
	return n;
}
function Xe(e) {
	return Array.from(e).map((e) => e.toString(16).padStart(2, "0")).join("");
}
var Ze = class {
	constructor(...e) {}
};
function Qe(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : tt(e, n, r.value);
	}
}
function D(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function $e(e, t, n) {
	return D(e, t, n, !1);
}
function et(e, t) {
	for (let n in e) {
		let r = e[n];
		Object.defineProperty(t, n, {
			configurable: !0,
			enumerable: !0,
			get() {
				return D(this, n, r(this));
			},
			set(e) {
				D(this, n, e);
			}
		});
	}
	return t;
}
function tt(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : D(this, t, n.bind(this));
		},
		set(e) {
			D(this, t, e);
		}
	});
}
function nt(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var rt, O = !1, it = {
	configurable: !0,
	get() {
		O = !0;
	}
};
function k(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	if (t in r && rt !== e._zod) {
		rt = void 0;
		return;
	}
	rt = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, it);
			let e = O;
			O = !1;
			try {
				let r = n(this);
				return O ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), O = O || e, r;
			} catch (n) {
				throw delete this[t], O = O || e, n;
			}
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				value: e
			});
		}
	});
}
function at(e, t, n, r) {
	let i = nt(e, t);
	i && Object.defineProperty(i, t, {
		configurable: !0,
		get() {
			let e = {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: void 0
			};
			return Object.defineProperty(this, t, e), e.value = n(this), Object.defineProperty(this, t, e), e.value;
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: e
			});
		}
	});
}
var ot = "~constantCatch";
function st(e) {
	let t = () => e;
	return t[ot] = !0, t;
}
//#endregion
//#region node_modules/zod/v4/core/core.js
var ct, lt = /*@__PURE__*/ Object.freeze({ status: "aborted" }), ut = {
	value: void 0,
	enumerable: !1
}, dt = "captureStackTrace" in Error ? Error : null;
function ft(e) {
	let t = dt;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return dt = null, new e();
			}
			try {
				return new e();
			} finally {
				t.stackTraceLimit = n;
			}
		}
	}
	return new e();
}
function A(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			ut.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", ut);
			} finally {
				ut.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), Qe(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? ft(u) : this;
		c(t, e);
		let n = t._zod.deferred;
		if (n) {
			for (let e of n) e();
			t._zod.deferred = void 0;
		}
		let i = globalThis.__zod_globalConfig?.postProcessor;
		return i && i(t), t;
	}
	return Object.defineProperty(d, "init", { value: c }), Object.defineProperty(d, Symbol.hasInstance, { value: (t) => r?.Parent && t instanceof r.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(d, "name", { value: e }), d;
}
var pt = /*@__PURE__*/ Symbol("zod_brand"), j = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, mt = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
};
(ct = globalThis).__zod_globalConfig ?? (ct.__zod_globalConfig = {});
var M = globalThis.__zod_globalConfig;
function N(e) {
	return e && Object.assign(M, e), M;
}
//#endregion
//#region node_modules/zod/v4/core/errors.js
function ht() {
	let e = this._zod;
	return e.message ?? (e.message = JSON.stringify(e.def, u, 2)), e.message;
}
function gt(e) {
	this._zod.message = e;
}
var _t = {
	get: ht,
	set: gt,
	enumerable: !0,
	configurable: !0
}, vt = {
	value: void 0,
	enumerable: !1
}, yt = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), bt = (e, t) => {
	e.name = "$ZodError", vt.value = t, Object.defineProperty(e, "issues", vt), vt.value = void 0, Object.defineProperty(e, "message", _t);
	let n = Object.getPrototypeOf(e);
	yt.has(n) || (yt.add(n), Object.defineProperty(n, "toString", {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = () => this.message;
			return Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	}));
}, xt = A("$ZodError", bt), P = A("$ZodError", bt, void 0, { Parent: Error });
function St(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, {
		value: n(),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n()), e[t];
}
function Ct(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? St(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function wt(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e, i = []) => {
		for (let a of e.issues) if (a.code === "invalid_union" && a.errors.length) a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
		else if (a.code === "invalid_key") r({ issues: a.issues }, [...i, ...a.path]);
		else if (a.code === "invalid_element") r({ issues: a.issues }, [...i, ...a.path]);
		else {
			let e = [...i, ...a.path];
			if (e.length === 0) n._errors.push(t(a));
			else {
				let r = n, i = 0;
				for (; i < e.length;) {
					let n = e[i], o = i === e.length - 1;
					if (n === "_errors") {
						o && r._errors.push(t(a)), i++;
						continue;
					}
					Object.prototype.hasOwnProperty.call(r, n) || Object.defineProperty(r, n, {
						value: { _errors: [] },
						enumerable: !0,
						writable: !0,
						configurable: !0
					});
					let s = r[n];
					o && s._errors.push(t(a)), r = s, i++;
				}
			}
		}
	};
	return r(e), n;
}
function Tt(e, t = (e) => e.message) {
	let n = { errors: [] }, r = (e, i = []) => {
		var a;
		for (let o of e.issues) if (o.code === "invalid_union" && o.errors.length) o.errors.map((e) => r({ issues: e }, [...i, ...o.path]));
		else if (o.code === "invalid_key") r({ issues: o.issues }, [...i, ...o.path]);
		else if (o.code === "invalid_element") r({ issues: o.issues }, [...i, ...o.path]);
		else {
			let e = [...i, ...o.path];
			if (e.length === 0) {
				n.errors.push(t(o));
				continue;
			}
			let r = n, s = 0;
			for (; s < e.length;) {
				let n = e[s], i = s === e.length - 1;
				typeof n == "string" ? (r.properties ?? (r.properties = {}), Object.prototype.hasOwnProperty.call(r.properties, n) || Object.defineProperty(r.properties, n, {
					value: { errors: [] },
					enumerable: !0,
					writable: !0,
					configurable: !0
				}), r = r.properties[n]) : (r.items ?? (r.items = []), (a = r.items)[n] ?? (a[n] = { errors: [] }), r = r.items[n]), i && r.errors.push(t(o)), s++;
			}
		}
	};
	return r(e), n;
}
function Et(e) {
	let t = [], n = e.map((e) => typeof e == "object" ? e.key : e);
	for (let e of n) typeof e == "number" ? t.push(`[${e}]`) : typeof e == "symbol" ? t.push(`[${JSON.stringify(String(e))}]`) : /[^\w$]/.test(e) ? t.push(`[${JSON.stringify(e)}]`) : (t.length && t.push("."), t.push(e));
	return t.join("");
}
function Dt(e) {
	let t = [], n = [...e.issues].sort((e, t) => (e.path ?? []).length - (t.path ?? []).length);
	for (let e of n) t.push(`✖ ${e.message}`), e.path?.length && t.push(`  → at ${Et(e.path)}`);
	return t.join("\n");
}
//#endregion
//#region node_modules/zod/v4/core/parse.js
function Ot(e, t) {
	return {
		callee: t?.callee ?? e,
		Err: t?.Err
	};
}
var kt = (e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new j();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => E(e, o, N())));
			throw pe(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
}, At = /* @__PURE__*/ kt(P), jt = (e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => E(e, o, N())));
			throw pe(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
}, Mt = /* @__PURE__*/ jt(P), Nt = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new j();
	return a.issues.length ? Ft(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
}, Pt = /* @__PURE__*/ Nt(P);
function Ft(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => E(e, n, N()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var It = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? Ft(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
}, Lt = /* @__PURE__*/ It(P), Rt = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), zt = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), Bt = ((e, t, n) => {
	let r = e._zod.bag.validator;
	if (r !== void 0) {
		if (r(t) !== Rt) return !0;
		if (r.definite === !0 && n === void 0) return !1;
	}
	return Vt(e, t, n);
});
function Vt(e, t, n) {
	let r = n ? {
		...n,
		async: !1,
		abortEarly: !0
	} : {
		async: !1,
		abortEarly: !0
	}, i = e._zod.bag.fallbackRun, a;
	if (i ? (r[zt] = !0, a = i({
		value: t,
		issues: []
	}, r)) : a = e._zod.run({
		value: t,
		issues: []
	}, r), a instanceof Promise) throw new j();
	return a.issues.length === 0;
}
var Ht = async (e, t, n) => {
	let r = n ? {
		...n,
		async: !0,
		abortEarly: !0
	} : {
		async: !0,
		abortEarly: !0
	}, i = e._zod.run({
		value: t,
		issues: []
	}, r);
	return i instanceof Promise && (i = await i), i.issues.length === 0;
}, Ut = (e) => {
	let t = kt(e), n = (e, r, i, a) => {
		let o = i ? {
			...i,
			direction: "backward"
		} : { direction: "backward" };
		return t(e, r, o, Ot(n, a));
	};
	return n;
}, Wt = /* @__PURE__*/ Ut(P), Gt = (e) => {
	let t = kt(e), n = (e, r, i, a) => t(e, r, i, Ot(n, a));
	return n;
}, Kt = /* @__PURE__*/ Gt(P), qt = (e) => {
	let t = jt(e), n = async (e, r, i, a) => {
		let o = i ? {
			...i,
			direction: "backward"
		} : { direction: "backward" };
		return await t(e, r, o, Ot(n, a));
	};
	return n;
}, Jt = /* @__PURE__*/ qt(P), Yt = (e) => {
	let t = jt(e), n = async (e, r, i, a) => await t(e, r, i, Ot(n, a));
	return n;
}, Xt = /* @__PURE__*/ Yt(P), Zt = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Nt(e)(t, n, i);
}, Qt = /* @__PURE__*/ Zt(P), $t = (e) => (t, n, r) => Nt(e)(t, n, r), en = /* @__PURE__*/ $t(P), tn = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return It(e)(t, n, i);
}, nn = /* @__PURE__*/ tn(P), rn = (e) => async (t, n, r) => It(e)(t, n, r), an = /* @__PURE__*/ rn(P), on = /* @__PURE__ */ e({
	anyString: () => Yn,
	base64: () => Pn,
	base64url: () => Fn,
	bigint: () => Zn,
	boolean: () => er,
	browserEmail: () => En,
	cidrv4: () => Mn,
	cidrv6: () => Nn,
	creditCard: () => Bn,
	cuid: () => sn,
	cuid2: () => cn,
	currencyCode: () => Vn,
	date: () => Gn,
	datetime: () => Jn,
	domain: () => Ln,
	duration: () => mn,
	e164: () => zn,
	email: () => xn,
	emoji: () => On,
	extendedDuration: () => hn,
	guid: () => gn,
	hex: () => ar,
	hostname: () => In,
	html5Email: () => Sn,
	httpProtocol: () => Rn,
	iban: () => Hn,
	idnEmail: () => Tn,
	integer: () => Qn,
	ipv4: () => kn,
	ipv6: () => An,
	ksuid: () => dn,
	lowercase: () => rr,
	mac: () => jn,
	md5_base64: () => lr,
	md5_base64url: () => ur,
	md5_hex: () => cr,
	nanoid: () => fn,
	nanoidOfLength: () => pn,
	null: () => tr,
	number: () => $n,
	rfc5322Email: () => Cn,
	sha1_base64: () => fr,
	sha1_base64url: () => pr,
	sha1_hex: () => dr,
	sha256_base64: () => hr,
	sha256_base64url: () => gr,
	sha256_hex: () => mr,
	sha384_base64: () => vr,
	sha384_base64url: () => yr,
	sha384_hex: () => _r,
	sha512_base64: () => xr,
	sha512_base64url: () => Sr,
	sha512_hex: () => br,
	string: () => Xn,
	time: () => qn,
	ulid: () => ln,
	undefined: () => nr,
	unicodeEmail: () => wn,
	uppercase: () => ir,
	uuid: () => _n,
	uuid4: () => vn,
	uuid6: () => yn,
	uuid7: () => bn,
	xid: () => un
}), sn = /^[cC][0-9a-z]{6,}$/, cn = /^[0-9a-z]+$/, ln = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, un = /^[0-9a-vA-V]{20}$/, dn = /^[A-Za-z0-9]{27}$/, fn = /^[a-zA-Z0-9_-]{21}$/;
function pn(e) {
	return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
var mn = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, hn = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, gn = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, _n = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, vn = /*@__PURE__*/ _n(4), yn = /*@__PURE__*/ _n(6), bn = /*@__PURE__*/ _n(7), xn = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Sn = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, Cn = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, wn = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u, Tn = wn, En = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, Dn = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function On() {
	return new RegExp(Dn, "u");
}
var kn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, An = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, jn = (e) => {
	let t = x(e ?? ":");
	return RegExp(`^(?:[0-9A-F]{2}${t}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${t}){5}[0-9a-f]{2}$`);
}, Mn = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Nn = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Pn = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Fn = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/, In = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/, Ln = /^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/, Rn = /^https?$/, zn = /^\+[1-9]\d{6,14}$/, Bn = /^\d(?:[ -]?\d){11,18}$/, Vn = /^(?:AED|AFN|ALL|AMD|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BHD|BIF|BMD|BND|BOB|BOV|BRL|BSD|BTN|BWP|BYN|BZD|CAD|CDF|CHE|CHF|CHW|CLF|CLP|CNY|COP|COU|CRC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MXV|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLE|SOS|SRD|SSP|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UYW|UZS|VED|VES|VND|VUV|WST|XAD|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XCD|XCG|XDR|XOF|XPD|XPF|XPT|XSU|XTS|XUA|XXX|YER|ZAR|ZMW|ZWG)$/, Hn = /^[A-Z]{2}(?!00|01|99)\d{2}[A-Z0-9]{11,30}$/, Un = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function Wn(e) {
	return RegExp(`^${e}$`);
}
var Gn = /*@__PURE__*/ Wn(Un);
function Kn(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function qn(e) {
	return RegExp(`^${Kn(e)}$`);
}
function Jn(e) {
	let t = ["Z"];
	e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let n = `${Kn({
		precision: e.precision,
		seconds: !0
	})}(?:${t.join("|")})`, r = e.local ? `${n}|${Kn({ precision: e.precision })}` : n;
	return RegExp(`^${Un}T(?:${r})$`);
}
var Yn = /^[\s\S]{0,}$/, Xn = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, Zn = /^-?\d+n?$/, Qn = /^-?\d+$/, $n = /^-?\d+(?:\.\d+)?$/, er = /^(?:true|false)$/i, tr = /^null$/i, nr = /^undefined$/i, rr = /^[^A-Z]*$/, ir = /^[^a-z]*$/, ar = /^[0-9a-fA-F]*$/;
function or(e, t) {
	return RegExp(`^[A-Za-z0-9+/]{${e}}${t}$`);
}
function sr(e) {
	return RegExp(`^[A-Za-z0-9_-]{${e}}$`);
}
var cr = /^[0-9a-fA-F]{32}$/, lr = /*@__PURE__*/ or(22, "=="), ur = /*@__PURE__*/ sr(22), dr = /^[0-9a-fA-F]{40}$/, fr = /*@__PURE__*/ or(27, "="), pr = /*@__PURE__*/ sr(27), mr = /^[0-9a-fA-F]{64}$/, hr = /*@__PURE__*/ or(43, "="), gr = /*@__PURE__*/ sr(43), _r = /^[0-9a-fA-F]{96}$/, vr = /*@__PURE__*/ or(64, ""), yr = /*@__PURE__*/ sr(64), br = /^[0-9a-fA-F]{128}$/, xr = /*@__PURE__*/ or(86, "=="), Sr = /*@__PURE__*/ sr(86), F = /*@__PURE__*/ A("$ZodCheck", (e, t) => {
	var n;
	e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Cr = (e) => {
	let t = e.value;
	return !p(t) && t.size !== void 0;
}, wr = (e) => {
	let t = e.value;
	return !p(t) && t.length !== void 0;
}, Tr = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, Er = /*@__PURE__*/ A("$ZodCheckLessThan", (e, t) => {
	F.init(e, t);
	let n = Tr[typeof t.value];
	e._zod.check = (r) => {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: Tr[typeof r.value] ?? n,
			code: "too_big",
			maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), Dr = /*@__PURE__*/ A("$ZodCheckGreaterThan", (e, t) => {
	F.init(e, t);
	let n = Tr[typeof t.value];
	e._zod.check = (r) => {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: Tr[typeof r.value] ?? n,
			code: "too_small",
			minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), Or = /*@__PURE__*/ A("$ZodCheckMultipleOf", (e, t) => {
	F.init(e, t), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? t.value !== BigInt(0) && n.value % t.value === BigInt(0) : h(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), kr = /*@__PURE__*/ A("$ZodCheckNumberFormat", (e, t) => {
	F.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = we[t.format];
	e._zod.check = (o) => {
		let s = o.value;
		if (n) {
			if (!Number.isInteger(s)) {
				o.issues.push({
					expected: r,
					format: t.format,
					code: "invalid_type",
					continue: !1,
					input: s,
					inst: e
				});
				return;
			}
			if (!Number.isSafeInteger(s)) {
				s > 0 ? o.issues.push({
					input: s,
					code: "too_big",
					maximum: 2 ** 53 - 1,
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				}) : o.issues.push({
					input: s,
					code: "too_small",
					minimum: -(2 ** 53 - 1),
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				});
				return;
			}
		}
		s < i && o.issues.push({
			origin: "number",
			input: s,
			code: "too_small",
			minimum: i,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), s > a && o.issues.push({
			origin: "number",
			input: s,
			code: "too_big",
			maximum: a,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), Ar = /*@__PURE__*/ A("$ZodCheckBigIntFormat", (e, t) => {
	F.init(e, t);
	let [n, r] = Te[t.format];
	e._zod.check = (i) => {
		let a = i.value;
		a < n && i.issues.push({
			origin: "bigint",
			input: a,
			code: "too_small",
			minimum: n,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), a > r && i.issues.push({
			origin: "bigint",
			input: a,
			code: "too_big",
			maximum: r,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), jr = /*@__PURE__*/ A("$ZodCheckMaxSize", (e, t) => {
	var n;
	F.init(e, t), (n = e._zod.def).when ?? (n.when = Cr), e._zod.check = (n) => {
		let r = n.value;
		r.size <= t.maximum || n.issues.push({
			origin: Re(r),
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Mr = /*@__PURE__*/ A("$ZodCheckMinSize", (e, t) => {
	var n;
	F.init(e, t), (n = e._zod.def).when ?? (n.when = Cr), e._zod.check = (n) => {
		let r = n.value;
		r.size >= t.minimum || n.issues.push({
			origin: Re(r),
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Nr = /*@__PURE__*/ A("$ZodCheckSizeEquals", (e, t) => {
	var n;
	F.init(e, t), (n = e._zod.def).when ?? (n.when = Cr), e._zod.check = (n) => {
		let r = n.value, i = r.size;
		if (i === t.size) return;
		let a = i > t.size;
		n.issues.push({
			origin: Re(r),
			...a ? {
				code: "too_big",
				maximum: t.size
			} : {
				code: "too_small",
				minimum: t.size
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Pr = /*@__PURE__*/ A("$ZodCheckMaxLength", (e, t) => {
	var n;
	F.init(e, t), (n = e._zod.def).when ?? (n.when = wr), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? Be(r) : i) <= t.maximum) return;
		let a = Ve(r);
		n.issues.push({
			origin: a,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Fr = /*@__PURE__*/ A("$ZodCheckMinLength", (e, t) => {
	var n;
	F.init(e, t), (n = e._zod.def).when ?? (n.when = wr), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? Be(r) : i) >= t.minimum) return;
		let a = Ve(r);
		n.issues.push({
			origin: a,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Ir = /*@__PURE__*/ A("$ZodCheckLengthEquals", (e, t) => {
	var n;
	F.init(e, t), (n = e._zod.def).when ?? (n.when = wr), e._zod.check = (n) => {
		let r = n.value, i = r.length, a = typeof r == "string" && i >= t.length && i <= t.length * 2 ? Be(r) : i;
		if (a === t.length) return;
		let o = Ve(r), s = a > t.length;
		n.issues.push({
			origin: o,
			...s ? {
				code: "too_big",
				maximum: t.length
			} : {
				code: "too_small",
				minimum: t.length
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Lr = /*@__PURE__*/ A("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	F.init(e, t), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), Rr = /*@__PURE__*/ A("$ZodCheckRegex", (e, t) => {
	Lr.init(e, t), e._zod.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), zr = /*@__PURE__*/ A("$ZodCheckLowerCase", (e, t) => {
	t.pattern ?? (t.pattern = rr), Lr.init(e, t);
}), Br = /*@__PURE__*/ A("$ZodCheckUpperCase", (e, t) => {
	t.pattern ?? (t.pattern = ir), Lr.init(e, t);
}), Vr = /*@__PURE__*/ A("$ZodCheckIncludes", (e, t) => {
	F.init(e, t);
	let n = x(t.includes);
	t.pattern = new RegExp(typeof t.position == "number" ? `^.{${t.position},}${n}` : n), e._zod.check = (n) => {
		n.value.includes(t.includes, t.position) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: t.includes,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Hr = /*@__PURE__*/ A("$ZodCheckStartsWith", (e, t) => {
	F.init(e, t);
	let n = RegExp(`^${x(t.prefix)}.*`);
	t.pattern ?? (t.pattern = n), e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Ur = /*@__PURE__*/ A("$ZodCheckEndsWith", (e, t) => {
	F.init(e, t);
	let n = RegExp(`.*${x(t.suffix)}$`);
	t.pattern ?? (t.pattern = n), e._zod.check = (n) => {
		n.value.endsWith(t.suffix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: t.suffix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function Wr(e, t, n) {
	e.issues.length && t.issues.push(...T(n, e.issues));
}
var Gr = /*@__PURE__*/ A("$ZodCheckProperty", (e, t) => {
	F.init(e, t), e._zod.check = (e) => {
		let n = t.schema._zod.run({
			value: e.value[t.property],
			issues: []
		}, {});
		if (n instanceof Promise) return n.then((n) => Wr(n, e, t.property));
		Wr(n, e, t.property);
	};
}), Kr = /*@__PURE__*/ A("$ZodCheckProperties", (e, t) => {
	F.init(e, t), $e(e, Symbol.iterator, function* () {
		yield e;
	});
	let n;
	e._zod.check = (r) => {
		if (r.value == null) {
			r.issues.push({
				expected: "object",
				code: "invalid_type",
				input: r.value,
				inst: e
			});
			return;
		}
		n ?? (n = Reflect.ownKeys(t.shape).map((e) => [e, t.shape[e]]));
		let i = r.value, a;
		for (let [e, t] of n) {
			let n = t._zod.run({
				value: i[e],
				issues: []
			}, {});
			n instanceof Promise ? (a ?? (a = []), a.push(n.then((t) => Wr(t, r, e)))) : Wr(n, r, e);
		}
		if (a) return Promise.all(a).then(() => void 0);
	};
}), qr = /*@__PURE__*/ A("$ZodCheckMimeType", (e, t) => {
	F.init(e, t);
	let n = new Set(t.mime);
	e._zod.check = (r) => {
		n.has(r.value.type) || r.issues.push({
			code: "invalid_value",
			values: t.mime,
			input: r.value.type,
			inst: e,
			continue: !t.abort
		});
	};
}), Jr = /*@__PURE__*/ A("$ZodCheckOverwrite", (e, t) => {
	F.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), Yr = class {
	constructor(e = [], t = {}) {
		this.content = [], this.indent = 0, this.args = e, this.closed = t;
	}
	indented(e) {
		this.indent += 1;
		try {
			e(this);
		} finally {
			--this.indent;
		}
	}
	write(e) {
		if (typeof e == "function") {
			e(this, { execution: "sync" }), e(this, { execution: "async" });
			return;
		}
		let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
		for (let e of r) this.content.push(e);
	}
	compile() {
		let e = Function, t = this?.content ?? [""];
		return new e(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${t.join("\n")}\n};`)(...Object.values(this.closed));
	}
}, Xr = {
	major: 4,
	minor: 6,
	patch: 4
}, I = /*@__PURE__*/ A("$ZodType", (e, t) => {
	var n;
	e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Xr;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = w(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (Fe(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new j();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (Le(t.issues, n, e), i || (i = w(t, n)));
				});
				else {
					if (t.issues.length === n) continue;
					Le(t.issues, n, e), i || (i = w(t, n));
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (w(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new j();
				return o.then((t) => e._zod.parse(t, a));
			}
			return e._zod.parse(o, a);
		};
		e._zod.run = (r, a) => {
			if (a.skipChecks) return e._zod.parse(r, a);
			if (a.direction === "backward") {
				let t = e._zod.parse({
					value: r.value,
					issues: []
				}, {
					...a,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, r, a)) : n(t, r, a);
			}
			let o = e._zod.parse(r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new j();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return $e(this, "~standard", $r(this));
	},
	set "~standard"(e) {
		D(this, "~standard", e);
	}
}), Zr = (e, t) => e.issues.length ? { issues: e.issues.map((e) => E(e, t, N())) } : { value: e.value };
async function Qr(e, t) {
	let n = { async: !0 };
	return Zr(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function $r(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return Zr(r, n);
			} catch {}
			return Qr(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var ei = /*@__PURE__*/ A("$ZodString", (e, t) => {
	I.init(e, t), e._zod.pattern = t.pattern ?? Yn, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), L = /*@__PURE__*/ A("$ZodStringFormat", (e, t) => {
	Lr.init(e, t), ei.init(e, t);
}), ti = /*@__PURE__*/ A("$ZodGUID", (e, t) => {
	t.pattern ?? (t.pattern = gn), L.init(e, t);
}), ni = /*@__PURE__*/ A("$ZodUUID", (e, t) => {
	if (t.version) {
		let e = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[t.version];
		if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
		t.pattern ?? (t.pattern = _n(e));
	} else t.pattern ?? (t.pattern = _n());
	L.init(e, t);
}), ri = /*@__PURE__*/ A("$ZodEmail", (e, t) => {
	t.pattern ?? (t.pattern = xn), L.init(e, t);
});
function ii(e) {
	try {
		return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(e) : (new URL(e), !0);
	} catch {
		return !1;
	}
}
function ai(e, t) {
	return !("normalize" in t) && !("hostname" in t) && !("protocol" in t) ? ii(e) || 2 : oi(e, t);
}
function oi(e, t) {
	if (!t.normalize && t.protocol?.source === Rn.source && !/^https?:\/\//i.test(e)) return 1;
	try {
		if (typeof URL < "u") {
			let t = URL;
			if (typeof t.parse == "function") return t.parse(e) ?? 2;
		}
		return new URL(e);
	} catch {
		return 2;
	}
}
var si = /[\t\n\r]/g;
function ci(e) {
	return e.replace(si, "");
}
function li(e, t) {
	return t.lastIndex = 0, t.test(e.hostname);
}
function ui(e, t) {
	return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
var di = /*@__PURE__*/ A("$ZodURL", (e, t) => {
	L.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim(), i = ai(r, t);
			if (i === 1) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid URL format",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			if (i === 2) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			if (i === !0) {
				n.value = ci(r);
				return;
			}
			t.hostname && !li(i, t.hostname) && n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			}), t.protocol && !ui(i, t.protocol) && n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			}), n.value = t.normalize ? i.href : ci(r);
			return;
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), fi = /*@__PURE__*/ A("$ZodEmoji", (e, t) => {
	t.pattern ?? (t.pattern = On()), L.init(e, t);
}), pi = /*@__PURE__*/ A("$ZodNanoID", (e, t) => {
	if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
	t.pattern ?? (t.pattern = t.length === void 0 ? fn : pn(t.length)), L.init(e, t);
}), mi = /*@__PURE__*/ A("$ZodCUID", (e, t) => {
	t.pattern ?? (t.pattern = sn), L.init(e, t);
}), hi = /*@__PURE__*/ A("$ZodCUID2", (e, t) => {
	t.pattern ?? (t.pattern = cn), L.init(e, t);
}), gi = /*@__PURE__*/ A("$ZodULID", (e, t) => {
	t.pattern ?? (t.pattern = ln), L.init(e, t);
}), _i = /*@__PURE__*/ A("$ZodXID", (e, t) => {
	t.pattern ?? (t.pattern = un), L.init(e, t);
}), vi = /*@__PURE__*/ A("$ZodKSUID", (e, t) => {
	t.pattern ?? (t.pattern = dn), L.init(e, t);
}), yi = /*@__PURE__*/ A("$ZodISODateTime", (e, t) => {
	t.pattern ?? (t.pattern = Jn(t)), L.init(e, t);
}), bi = /*@__PURE__*/ A("$ZodISODate", (e, t) => {
	t.pattern ?? (t.pattern = Gn), L.init(e, t);
}), xi = /*@__PURE__*/ A("$ZodISOTime", (e, t) => {
	t.pattern ?? (t.pattern = qn(t)), L.init(e, t);
}), Si = /*@__PURE__*/ A("$ZodISODuration", (e, t) => {
	t.pattern ?? (t.pattern = mn), L.init(e, t);
}), Ci = /*@__PURE__*/ A("$ZodIPv4", (e, t) => {
	t.pattern ?? (t.pattern = kn), L.init(e, t);
}), wi = /^[0-9a-fA-F:.]+$/;
function Ti(e) {
	return wi.test(e) ? ii(`http://[${e}]`) : !1;
}
var Ei = /*@__PURE__*/ A("$ZodIPv6", (e, t) => {
	t.pattern ?? (t.pattern = An), L.init(e, t), e._zod.check = (n) => {
		Ti(n.value) || n.issues.push({
			code: "invalid_format",
			format: "ipv6",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Di = /*@__PURE__*/ A("$ZodMAC", (e, t) => {
	t.pattern ?? (t.pattern = jn(t.delimiter)), L.init(e, t);
}), Oi = /*@__PURE__*/ A("$ZodCIDRv4", (e, t) => {
	t.pattern ?? (t.pattern = Mn), L.init(e, t);
});
function ki(e) {
	let t = e.split("/");
	if (t.length !== 2) return !1;
	let [n, r] = t;
	if (!r) return !1;
	let i = Number(r);
	return `${i}` !== r || i < 0 || i > 128 ? !1 : Ti(n);
}
var Ai = /*@__PURE__*/ A("$ZodCIDRv6", (e, t) => {
	t.pattern ?? (t.pattern = Nn), L.init(e, t), e._zod.check = (n) => {
		ki(n.value) || n.issues.push({
			code: "invalid_format",
			format: "cidrv6",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function ji(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var Mi = /^[0-9a-zA-Z+/]*={0,2}$/, Ni = /*@__PURE__*/ A("$ZodBase64", (e, t) => {
	t.pattern ?? (t.pattern = Mi), L.init(e, t), e._zod.check = (n) => {
		ji(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Pi = /^[A-Za-z0-9_-]*$/;
function Fi(e) {
	if (!Pi.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return ji(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var Ii = /*@__PURE__*/ A("$ZodBase64URL", (e, t) => {
	t.pattern ?? (t.pattern = Pi), L.init(e, t), e._zod.check = (n) => {
		Fi(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Li = /*@__PURE__*/ A("$ZodE164", (e, t) => {
	t.pattern ?? (t.pattern = zn), L.init(e, t);
}), Ri = /[- ]/g;
function zi(e) {
	let t = e.length, n = 1, r = 0;
	for (; t;) {
		let i = e.charCodeAt(--t) - 48;
		n ^= 1, r += n ? [
			0,
			2,
			4,
			6,
			8,
			1,
			3,
			5,
			7,
			9
		][i] : i;
	}
	return r % 10 == 0;
}
function Bi(e) {
	return Bn.test(e) ? zi(e.replace(Ri, "")) : !1;
}
var Vi = /*@__PURE__*/ A("$ZodCreditCard", (e, t) => {
	t.pattern ?? (t.pattern = Bn), L.init(e, t), e._zod.check = (n) => {
		Bi(n.value) || n.issues.push({
			code: "invalid_format",
			format: "credit_card",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function Hi(e) {
	let t = 0, n = e.length;
	for (let r = 4; r < n; r++) {
		let n = e.charCodeAt(r);
		t = (n >= 65 ? t * 100 + (n - 55) : t * 10 + (n - 48)) % 97;
	}
	for (let n = 0; n < 4; n++) {
		let r = e.charCodeAt(n);
		t = (r >= 65 ? t * 100 + (r - 55) : t * 10 + (r - 48)) % 97;
	}
	return t === 1;
}
function Ui(e) {
	return Hn.test(e) ? Hi(e) : !1;
}
var Wi = /*@__PURE__*/ A("$ZodIBAN", (e, t) => {
	t.pattern ?? (t.pattern = Hn), L.init(e, t), e._zod.check = (n) => {
		Ui(n.value) || n.issues.push({
			code: "invalid_format",
			format: "iban",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function Gi(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
var Ki = /*@__PURE__*/ A("$ZodJWT", (e, t) => {
	L.init(e, t), e._zod.check = (n) => {
		Gi(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), qi = /*@__PURE__*/ A("$ZodCustomStringFormat", (e, t) => {
	L.init(e, t), e._zod.check = (n) => {
		t.fn(n.value) || n.issues.push({
			code: "invalid_format",
			format: t.format,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Ji = /*@__PURE__*/ A("$ZodNumber", (e, t) => {
	I.init(e, t), e._zod.pattern = $n, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : String(i) : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), Yi = /*@__PURE__*/ A("$ZodNumberFormat", (e, t) => {
	kr.init(e, t), Ji.init(e, t);
}), Xi = /*@__PURE__*/ A("$ZodBoolean", (e, t) => {
	I.init(e, t), e._zod.pattern = er, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), Zi = /*@__PURE__*/ A("$ZodBigInt", (e, t) => {
	I.init(e, t), e._zod.pattern = Zn, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = BigInt(n.value);
		} catch {}
		return typeof n.value == "bigint" || n.issues.push({
			expected: "bigint",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), Qi = /*@__PURE__*/ A("$ZodBigIntFormat", (e, t) => {
	Ar.init(e, t), Zi.init(e, t);
}), $i = /*@__PURE__*/ A("$ZodSymbol", (e, t) => {
	I.init(e, t), e._zod.parse = (t, n) => {
		let r = t.value;
		return typeof r == "symbol" || t.issues.push({
			expected: "symbol",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), ea = /*@__PURE__*/ A("$ZodUndefined", (e, t) => {
	I.init(e, t), e._zod.pattern = nr, e._zod.values = /* @__PURE__ */ new Set([void 0]), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === void 0 || t.issues.push({
			expected: "undefined",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), ta = /*@__PURE__*/ A("$ZodNull", (e, t) => {
	I.init(e, t), e._zod.pattern = tr, e._zod.values = /* @__PURE__ */ new Set([null]), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === null || t.issues.push({
			expected: "null",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), na = /*@__PURE__*/ A("$ZodAny", (e, t) => {
	I.init(e, t), e._zod.parse = (e) => e;
}), ra = /*@__PURE__*/ A("$ZodUnknown", (e, t) => {
	I.init(e, t), e._zod.parse = (e) => e;
}), ia = /*@__PURE__*/ A("$ZodNever", (e, t) => {
	I.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
}), aa = /*@__PURE__*/ A("$ZodVoid", (e, t) => {
	I.init(e, t), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === void 0 || t.issues.push({
			expected: "void",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), oa = /*@__PURE__*/ A("$ZodDate", (e, t) => {
	I.init(e, t), e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = new Date(n.value);
		} catch {}
		let i = n.value, a = i instanceof Date;
		return a && !Number.isNaN(i.getTime()) || n.issues.push({
			expected: "date",
			code: "invalid_type",
			input: i,
			...a ? { received: "Invalid Date" } : {},
			inst: e
		}), n;
	};
});
function sa(e, t, n) {
	e.issues.length && t.issues.push(...T(n, e.issues)), t.value[n] = e.value;
}
var ca = /*@__PURE__*/ A("$ZodArray", (e, t) => {
	I.init(e, t);
	let n = M.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!Array.isArray(a)) return r.issues.push({
			expected: "array",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		r.value = n ? n.alloc(e, r, Array(a.length), i) : Array(a.length);
		let o = [], s = i?.abortEarly;
		for (let e = 0; e < a.length; e++) {
			let n = a[e], c = t.element._zod.run({
				value: n,
				issues: []
			}, i);
			if (c instanceof Promise) o.push(c.then((t) => sa(t, r, e)));
			else if (sa(c, r, e), s && c.issues.length !== 0 && w(c)) break;
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
});
function la(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...T(n, e.issues));
		}
		if (!o && i === void 0) {
			e.issues.length || t.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: void 0,
				path: [n]
			});
			return;
		}
		e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var ua = [];
function da(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : ua, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = Ce(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function fa(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (w(n, p)) break;
			p = n.issues.length;
		}
		if (c.has(i)) continue;
		if (i === "__proto__") {
			u === "never" && s.push(i);
			continue;
		}
		if (u === "never") {
			s.push(i);
			continue;
		}
		let a = l.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => la(e, n, i, t, d, f))) : la(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var pa = /*@__PURE__*/ A("$ZodObject", (e, t) => {
	I.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = f(() => da(t));
	k(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || g(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = me, o = t.catchall, s, c = M.memoizer;
	c?.attach(e), e._zod.parse = (t, n) => {
		s ?? (s = i.value);
		let r = t.value;
		if (!a(r)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
		t.value = c ? c.alloc(e, t, {}, n) : {};
		let l = [], u = s.shape, d = n?.abortEarly, f = t.issues.length;
		for (let e of s.allKeys) {
			if (d && t.issues.length !== f) {
				if (w(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => la(n, t, e, r, a, o))) : la(s, t, e, r, a, o);
		}
		return o ? fa(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
}), ma = /*@__PURE__*/ A("$ZodObjectJIT", (e, t) => {
	pa.init(e, t);
	let n = e._zod.parse, r = f(() => da(t)), i = M.memoizer, a = (t) => {
		let n = r.value, a = n.symbolKeys, o = new Yr(["payload", "ctx"], {
			shape: t,
			inst: e,
			memo: i,
			syms: a
		}), s = (e) => `shape[${e}]._zod.run({ value: input[${e}], issues: [] }, ctx)`, c = (e, t) => `
          let ${e}_ab = false;
          for (let i = 0; i < ${e}.issues.length; i++) {
            const iss = ${e}.issues[i];
            iss.path = iss.path ? [${t}, ...iss.path] : [${t}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${e}_ab = true;
          }
          if (${e}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
		o.write("const input = payload.value;");
		let l = Object.create(null), u = 0;
		for (let e of n.allKeys) l[e] = `key_${u++}`;
		o.write(i ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
		for (let e of n.allKeys) {
			if (e === "__proto__") continue;
			let n = l[e], r = typeof e == "symbol" ? `syms[${a.indexOf(e)}]` : de(e), i = `${r} in input`, u = t[e], d = u?._zod?.optin, f = d !== void 0, p = u?._zod?.optout === "optional";
			if (o.write(`const ${n} = ${s(r)};`), f && p) {
				let e = d === "optional" ? `${n}_present` : `${n}.value !== undefined || ${n}_present`;
				o.write(`
        const ${n}_present = ${i};
        if (!${n}.issues.length || ${n}_present) {
          if (${n}.issues.length) {${c(n, r)}
          }

          if (${e}) {
            newResult[${r}] = ${n}.value;
          }
        }

      `);
			} else f ? (o.write(`
        if (${n}.issues.length) {${c(n, r)}
        }
      `), d === "defaulted" ? o.write(`newResult[${r}] = ${n}.value;`) : o.write(`
        if (${n}.value !== undefined || ${i}) {
          newResult[${r}] = ${n}.value;
        }
      `)) : o.write(`
        const ${n}_present = ${i};
        if (${n}.issues.length) {${c(n, r)}
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${r}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${n}_present) {
          newResult[${r}] = ${n}.value;
        }

      `);
		}
		return o.write("payload.value = newResult;"), o.write("return payload;"), o.compile();
	}, o, s = me, c = !M.jitless, l = c && he.value, u = t.catchall, d;
	e._zod.parse = (i, f) => {
		d ?? (d = r.value);
		let p = i.value;
		return s(p) ? c && l && f?.async === !1 && f.jitless !== !0 ? (o || (o = a(t.shape)), i = o(i, f), u ? fa([], p, i, f, d, e, f?.abortEarly === !0) : i) : n(i, f) : (i.issues.push({
			expected: "object",
			code: "invalid_type",
			input: p,
			inst: e
		}), i);
	};
});
function ha(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !w(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => E(e, r, N())))
	}), t);
}
var ga = /*@__PURE__*/ A("$ZodUnion", (e, t) => {
	I.init(e, t), k(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), k(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), k(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), k(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => m(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			if (t instanceof Promise) o.push(t), a = !0;
			else {
				if (t.issues.length === 0) return t;
				o.push(t);
			}
		}
		return a ? Promise.all(o).then((t) => ha(t, r, e, i)) : ha(o, r, e, i);
	};
});
function _a(e, t, n, r) {
	let i = [];
	for (let t = 0; t < e.length; t++) e[t].issues.length === 0 && i.push(t);
	return i.length === 1 ? (t.value = e[i[0]].value, t) : (i.length === 0 ? t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => E(e, r, N())))
	}) : t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: [],
		inclusive: !1,
		matches: i
	}), t);
}
var va = /*@__PURE__*/ A("$ZodXor", (e, t) => {
	ga.init(e, t), t.inclusive = !1;
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			t instanceof Promise ? (o.push(t), a = !0) : o.push(t);
		}
		return a ? Promise.all(o).then((t) => _a(t, r, e, i)) : _a(o, r, e, i);
	};
});
function ya(e, t) {
	let n = e._zod, r = n.bag.optionsMap;
	r || (r = ba(n.def), n.bag.optionsMap = r);
	let i = r.get(t);
	if (i === null) throw Error(`Ambiguous discriminator value "${String(t)}"`);
	return i;
}
function ba(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.options) {
		let r = n._zod.propValues?.[e.discriminator];
		if (!r || r.size === 0) throw Error(`Invalid discriminated union option at index "${e.options.indexOf(n)}"`);
		for (let e of r) if (t.has(e)) {
			if (e !== void 0) throw Error(`Duplicate discriminator value "${String(e)}"`);
			t.set(e, null);
		} else t.set(e, n);
	}
	return t;
}
var xa = /*@__PURE__*/ A("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, ga.init(e, t);
	let n = e._zod.parse;
	k(e, "propValues", (e) => {
		let t = {}, n = 0;
		for (let r of e.def.options) {
			let i = r._zod.propValues;
			if (!i || Object.keys(i).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(r)}"`);
			i[e.def.discriminator]?.has(void 0) && n++;
			for (let [e, n] of Object.entries(i)) {
				Object.prototype.hasOwnProperty.call(t, e) || g(t, e, /* @__PURE__ */ new Set());
				for (let r of n) t[e].add(r);
			}
		}
		return !e.def.unionFallback && n > 1 && t[e.def.discriminator]?.delete(void 0), t;
	}), t.options.forEach((e, n) => {
		let r = re(e._zod.def);
		if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
	});
	let r = f(() => ba(t));
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!me(o)) return i.issues.push({
			code: "invalid_type",
			expected: "object",
			input: o,
			inst: e
		}), i;
		let s = o?.[t.discriminator], c = r.value.get(s);
		return c && (s !== void 0 || a.direction !== "backward") ? c._zod.run(i, a) : t.unionFallback || a.direction === "backward" ? n(i, a) : (i.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: t.discriminator,
			options: Array.from(r.value.keys()).filter((e) => r.value.get(e) !== null),
			input: o,
			path: [t.discriminator],
			inst: e
		}), i);
	};
}), Sa = /*@__PURE__*/ A("$ZodIntersection", (e, t) => {
	I.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => wa(e, t, n)) : wa(e, i, a);
	};
});
function Ca(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (b(e) && b(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
		for (let n of r) {
			if (n === "__proto__") continue;
			let r = Ca(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = Ca(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function wa(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i, a = /* @__PURE__ */ new Map(), o = (e, t) => {
		let n;
		if (e.code === "unrecognized_keys" && !e.path?.length) i ?? (i = e), n = e.keys;
		else if (e.code === "invalid_key" && e.origin === "record" && e.path?.length === 1) {
			let t = String(e.path[0]);
			a.has(t) || a.set(t, e), n = [t];
		} else return !1;
		for (let e of n) r.has(e) || r.set(e, {}), r.get(e)[t] = !0;
		return !0;
	};
	for (let n of t.issues) o(n, "l") || e.issues.push(n);
	for (let t of n.issues) o(t, "r") || e.issues.push(t);
	let s = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (s.length) {
		let t = i ? s.filter((e) => i.keys.includes(e)) : [];
		t.length && e.issues.push({
			...i,
			keys: t
		});
		for (let n of s) !t.includes(n) && a.has(n) && e.issues.push(a.get(n));
	}
	let c = Ca(t.value, n.value);
	if (!c.valid) {
		if (w(e)) return e;
		throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
	}
	return e.value = c.data, e;
}
var Ta = /*@__PURE__*/ A("$ZodTuple", (e, t) => {
	I.init(e, t);
	let n = t.items, r = M.memoizer;
	r?.attach(e), e._zod.parse = (i, a) => {
		let o = i.value;
		if (!Array.isArray(o)) return i.issues.push({
			input: o,
			inst: e,
			expected: "tuple",
			code: "invalid_type"
		}), i;
		i.value = r ? r.alloc(e, i, [], a) : [];
		let s = [], c = Ea(n, "optin"), l = Ea(n, "optout");
		if (!t.rest) {
			if (o.length < c) return i.issues.push({
				code: "too_small",
				minimum: c,
				inclusive: !0,
				input: o,
				inst: e,
				origin: "array"
			}), i;
			o.length > n.length && i.issues.push({
				code: "too_big",
				maximum: n.length,
				inclusive: !0,
				input: o,
				inst: e,
				origin: "array"
			});
		}
		let u = Array(n.length), d = t.rest ? a?.abortEarly : void 0, f = !1;
		for (let e = 0; e < n.length; e++) {
			let t = n[e]._zod.run({
				value: o[e],
				issues: []
			}, a);
			t instanceof Promise ? s.push(t.then((t) => {
				u[e] = t;
			})) : (u[e] = t, d && !f && t.issues.length && (f = w(t)));
		}
		if (t.rest && !f) {
			let e = n.length - 1, r = o.slice(n.length), c = i.issues.length;
			for (let n of r) {
				if (d && i.issues.length !== c) {
					if (w(i, c)) break;
					c = i.issues.length;
				}
				e++;
				let r = t.rest._zod.run({
					value: n,
					issues: []
				}, a);
				r instanceof Promise ? s.push(r.then((t) => Da(t, i, e))) : Da(r, i, e);
			}
		}
		return s.length ? Promise.all(s).then(() => Oa(u, i, n, o, l)) : Oa(u, i, n, o, l);
	};
});
function Ea(e, t) {
	for (let n = e.length - 1; n >= 0; n--) if (!(t === "optin" ? e[n]._zod.optin !== void 0 : e[n]._zod.optout === "optional")) return n + 1;
	return 0;
}
function Da(e, t, n) {
	e.issues.length && t.issues.push(...T(n, e.issues)), t.value[n] = e.value;
}
function Oa(e, t, n, r, i) {
	for (let a = 0; a < n.length; a++) {
		let o = e[a], s = a < r.length;
		if (!s && a >= i && n[a]._zod.optin === "optional") {
			t.value.length = a;
			break;
		}
		if (o.issues.length) {
			if (!s && a >= i) {
				t.value.length = a;
				break;
			}
			t.issues.push(...T(a, o.issues));
		}
		t.value[a] = o.value;
	}
	for (let e = t.value.length - 1; e >= r.length && n[e]._zod.optout === "optional" && t.value[e] === void 0; e--) t.value.length = e;
	return t;
}
var ka = /*@__PURE__*/ A("$ZodRecord", (e, t) => {
	I.init(e, t);
	let n = M.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!b(a)) return r.issues.push({
			expected: "record",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		let o = [], s = t.keyType._zod.values;
		if (s && !t.partial) {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c = /* @__PURE__ */ new Set();
			for (let n of s) if (typeof n == "string" || typeof n == "number" || typeof n == "symbol") {
				if (c.add(typeof n == "number" ? n.toString() : n), n === "__proto__") continue;
				let s = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (s.issues.length) {
					r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: s.issues.map((e) => E(e, i, N())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let l = s.value;
				if (l === "__proto__") continue;
				let u = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				u instanceof Promise ? o.push(u.then((e) => {
					e.issues.length && r.issues.push(...T(n, e.issues)), r.value[l] = e.value;
				})) : (u.issues.length && r.issues.push(...T(n, u.issues)), r.value[l] = u.value);
			}
			let l;
			for (let e in a) if (!c.has(e)) {
				if (t.mode === "loose") {
					if (e === "__proto__") continue;
					r.value[e] = a[e];
				} else l = l ?? [], l.push(e);
			}
			l && l.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: l,
				continue: !0
			});
		} else {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c;
			for (let n of Reflect.ownKeys(a)) {
				if (n === "__proto__" || !Object.prototype.propertyIsEnumerable.call(a, n)) continue;
				let l = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (l instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (typeof n == "string" && $n.test(n) && l.issues.length) {
					let e = t.keyType._zod.run({
						value: Number(n),
						issues: []
					}, i);
					if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					e.issues.length === 0 && (l = e);
				}
				if (l.issues.length) {
					t.mode === "loose" ? r.value[n] = a[n] : s ? (c = c ?? [], c.push(n)) : r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: l.issues.map((e) => E(e, i, N())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let u = l.value;
				if (u === "__proto__") continue;
				let d = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				d instanceof Promise ? o.push(d.then((e) => {
					e.issues.length && r.issues.push(...T(n, e.issues)), r.value[u] = e.value;
				})) : (d.issues.length && r.issues.push(...T(n, d.issues)), r.value[u] = d.value);
			}
			c && c.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: c,
				continue: !0
			});
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
}), Aa = /*@__PURE__*/ A("$ZodMap", (e, t) => {
	I.init(e, t);
	let n = M.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!(a instanceof Map)) return r.issues.push({
			expected: "map",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		let o = [];
		r.value = n ? n.alloc(e, r, /* @__PURE__ */ new Map(), i) : /* @__PURE__ */ new Map();
		let s = i?.abortEarly, c = r.issues.length;
		for (let [n, l] of a) {
			if (s && r.issues.length !== c) {
				if (w(r, c)) break;
				c = r.issues.length;
			}
			let u = t.keyType._zod.run({
				value: n,
				issues: []
			}, i), d = t.valueType._zod.run({
				value: l,
				issues: []
			}, i);
			u instanceof Promise || d instanceof Promise ? o.push(Promise.all([u, d]).then(([t, o]) => {
				ja(t, o, r, n, a, e, i);
			})) : ja(u, d, r, n, a, e, i);
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
});
function ja(e, t, n, r, i, a, o) {
	e.issues.length && (ye.has(typeof r) ? n.issues.push(...T(r, e.issues)) : n.issues.push({
		code: "invalid_key",
		origin: "map",
		input: i,
		inst: a,
		issues: e.issues.map((e) => E(e, o, N()))
	})), t.issues.length && (ye.has(typeof r) ? n.issues.push(...T(r, t.issues)) : n.issues.push({
		origin: "map",
		code: "invalid_element",
		input: i,
		inst: a,
		key: r,
		issues: t.issues.map((e) => E(e, o, N()))
	})), n.value.set(e.value, t.value);
}
var Ma = /*@__PURE__*/ A("$ZodSet", (e, t) => {
	I.init(e, t);
	let n = M.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!(a instanceof Set)) return r.issues.push({
			input: a,
			inst: e,
			expected: "set",
			code: "invalid_type"
		}), r;
		let o = [];
		r.value = n ? n.alloc(e, r, /* @__PURE__ */ new Set(), i) : /* @__PURE__ */ new Set();
		let s = i?.abortEarly, c = r.issues.length;
		for (let e of a) {
			if (s && r.issues.length !== c) {
				if (w(r, c)) break;
				c = r.issues.length;
			}
			let n = t.valueType._zod.run({
				value: e,
				issues: []
			}, i);
			n instanceof Promise ? o.push(n.then((e) => Na(e, r))) : Na(n, r);
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
});
function Na(e, t) {
	e.issues.length && t.issues.push(...e.issues), t.value.add(e.value);
}
var Pa = /*@__PURE__*/ A("$ZodEnum", (e, t) => {
	I.init(e, t);
	let n = c(t.entries), r = new Set(n);
	e._zod.values = r, k(e, "pattern", (e) => {
		let t = c(e.def.entries).filter((e) => ye.has(typeof e));
		return RegExp(t.length ? `^(${t.map((e) => x(e.toString())).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), Fa = /*@__PURE__*/ A("$ZodLiteral", (e, t) => {
	I.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, k(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? x(e) : e ? x(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
}), Ia = /*@__PURE__*/ A("$ZodFile", (e, t) => {
	I.init(e, t), e._zod.parse = (t, n) => {
		let r = t.value;
		return r instanceof File || t.issues.push({
			expected: "file",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), La = /*@__PURE__*/ A("$ZodTransform", (e, t) => {
	I.init(e, t), e._zod.optin = "optional", M.memoizer?.guard(e), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new mt(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
		if (i instanceof Promise) throw new j();
		return n.value = i, n;
	};
});
function Ra(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var za = /*@__PURE__*/ A("$ZodOptional", (e, t) => {
	I.init(e, t), k(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", k(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), k(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${m(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => Ra(e, t)) : Ra(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), Ba = /*@__PURE__*/ A("$ZodExactOptional", (e, t) => {
	za.init(e, t), k(e, "values", (e) => e.def.innerType._zod.values), k(e, "pattern", (e) => e.def.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), Va = /*@__PURE__*/ A("$ZodNullable", (e, t) => {
	I.init(e, t), k(e, "optin", (e) => e.def.innerType._zod.optin), k(e, "optout", (e) => e.def.innerType._zod.optout), k(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${m(t.source)}|null)$`) : void 0;
	}), k(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), Ha = /*@__PURE__*/ A("$ZodDefault", (e, t) => {
	I.init(e, t), e._zod.optin = "defaulted", k(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Ua(e, t)) : Ua(r, t);
	};
});
function Ua(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Wa = /*@__PURE__*/ A("$ZodPrefault", (e, t) => {
	I.init(e, t), e._zod.optin = "defaulted", k(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), Ga = /*@__PURE__*/ A("$ZodNonOptional", (e, t) => {
	I.init(e, t), k(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? new Set([...t].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => Ka(t, e)) : Ka(i, e);
	};
});
function Ka(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
var qa = /*@__PURE__*/ A("$ZodSuccess", (e, t) => {
	I.init(e, t), e._zod.parse = (e, n) => {
		if (n.direction === "backward") throw new mt("ZodSuccess");
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((t) => (e.value = t.issues.length === 0, e)) : (e.value = r.issues.length === 0, e);
	};
});
function Ja(e, t, n, r) {
	return t.issues.length ? (e.value = n.catchValue({
		...t,
		value: e.value,
		error: { issues: t.issues.map((e) => E(e, r, N())) },
		input: e.value
	}), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
var Ya = /*@__PURE__*/ A("$ZodCatch", (e, t) => {
	I.init(e, t), k(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), k(e, "optout", (e) => e.def.innerType._zod.optout), k(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run({
			value: e.value,
			issues: []
		}, n);
		return r instanceof Promise ? r.then((r) => Ja(e, r, t, n)) : Ja(e, r, t, n);
	};
}), Xa = /*@__PURE__*/ A("$ZodNaN", (e, t) => {
	I.init(e, t), e._zod.parse = (t, n) => ((typeof t.value != "number" || !Number.isNaN(t.value)) && t.issues.push({
		input: t.value,
		inst: e,
		expected: "nan",
		code: "invalid_type"
	}), t);
}), Za = /*@__PURE__*/ A("$ZodPipe", (e, t) => {
	I.init(e, t), k(e, "values", (e) => e.def.in._zod.values), k(e, "optin", (e) => e.def.in._zod.optin), k(e, "optout", (e) => e.def.out._zod.optout), k(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Qa(e, t.in, n)) : Qa(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Qa(e, t.out, n)) : Qa(r, t.out, n);
	};
});
function Qa(e, t, n) {
	return e.issues.some((e) => e.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
var $a = /*@__PURE__*/ A("$ZodCodec", (e, t) => {
	I.init(e, t), k(e, "values", (e) => e.def.in._zod.values), k(e, "optin", (e) => e.def.in._zod.optin), k(e, "optout", (e) => e.def.out._zod.optout), k(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
		if ((n.direction || "forward") === "forward") {
			let r = t.in._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => eo(e, t, n)) : eo(r, t, n);
		}
		{
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => eo(e, t, n)) : eo(r, t, n);
		}
	};
});
function eo(e, t, n) {
	if (e.issues.length) return e.aborted = !0, e;
	if ((n.direction || "forward") === "forward") {
		let r = t.transform(e.value, e);
		return r instanceof Promise ? r.then((r) => to(e, r, t.out, n)) : to(e, r, t.out, n);
	}
	{
		let r = t.reverseTransform(e.value, e);
		return r instanceof Promise ? r.then((r) => to(e, r, t.in, n)) : to(e, r, t.in, n);
	}
}
function to(e, t, n, r) {
	return e.issues.length ? (e.aborted = !0, e) : n._zod.run({
		value: t,
		issues: e.issues
	}, r);
}
var no = /*@__PURE__*/ A("$ZodPreprocess", (e, t) => {
	Za.init(e, t);
}), ro = /*@__PURE__*/ A("$ZodReadonly", (e, t) => {
	I.init(e, t), k(e, "propValues", (e) => e.def.innerType._zod.propValues), k(e, "values", (e) => e.def.innerType._zod.values), k(e, "optin", (e) => e.def.innerType?._zod?.optin), k(e, "optout", (e) => e.def.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(io) : io(r);
	};
});
function io(e) {
	return e.memo || (e.value = Object.freeze(e.value)), e;
}
function ao(e) {
	let t = e._zod.def, n = t.pattern, r = !!t.format?.includes("int"), i, a;
	for (let e of t.checks ?? []) {
		let t = e._zod.def;
		t.pattern && (n = t.pattern), r || (r = !!t.format?.includes("int"));
		let o = t.minimum ?? t.length, s = t.maximum ?? t.length;
		o !== void 0 && (i === void 0 || o > i) && (i = o), s !== void 0 && (a === void 0 || s < a) && (a = s);
	}
	if (n) return n.source;
	if (i !== void 0 && a !== void 0 && i > a) return "(?!)";
	if (i !== void 0 || a !== void 0) return Xn({
		minimum: i,
		maximum: a
	}).source;
	let o = e._zod.pattern;
	return (r && o === $n ? Qn : o)?.source;
}
function oo(e) {
	let t = e._zod.def, n = e._zod.pattern?.source, r = t.innerType ?? e._zod.innerType;
	if (r) {
		let e = r._zod.pattern?.source, t = oo(r);
		return n && e && t && t !== e ? n.replace(m(e), () => m(t)) : n;
	}
	if (t.options) {
		let e = t.options.map(oo);
		if (e.every(Boolean)) return `^(${e.map((e) => m(e)).join("|")})$`;
	}
	return ao(e);
}
var so = /*@__PURE__*/ A("$ZodTemplateLiteral", (e, t) => {
	I.init(e, t);
	let n = [];
	for (let e of t.parts) if (typeof e == "object" && e) {
		let t = oo(e);
		if (!t) throw Error(`Invalid template literal part, no pattern found: ${[...e._zod.traits].shift()}`);
		n.push(m(t));
	} else if (e === null || be.has(typeof e)) n.push(x(`${e}`));
	else throw Error(`Invalid template literal part: ${e}`);
	e._zod.pattern = RegExp(`^${n.join("")}$`), e._zod.parse = (n, r) => typeof n.value == "string" ? (e._zod.pattern.lastIndex = 0, e._zod.pattern.test(n.value) || n.issues.push({
		input: n.value,
		inst: e,
		code: "invalid_format",
		format: t.format ?? "template_literal",
		pattern: e._zod.pattern.source
	}), n) : (n.issues.push({
		input: n.value,
		inst: e,
		expected: "string",
		code: "invalid_type"
	}), n);
}), co = /*@__PURE__*/ A("$ZodFunction", (e, t) => (I.init(e, t), Object.defineProperty(e, "_def", { value: t }), e._zod.def = t, e.implement = (t) => {
	if (typeof t != "function") throw Error("implement() must be called with a function");
	return Object.defineProperty(function(...n) {
		let r = e._def.input ? At(e._def.input, n) : n, i = Reflect.apply(t, this, r);
		return e._def.output ? At(e._def.output, i) : i;
	}, "_zod", {
		value: e._zod,
		enumerable: !1
	});
}, e.implementAsync = (t) => {
	if (typeof t != "function") throw Error("implementAsync() must be called with a function");
	return Object.defineProperty(async function(...n) {
		let r = e._def.input ? await Mt(e._def.input, n) : n, i = await Reflect.apply(t, this, r);
		return e._def.output ? await Mt(e._def.output, i) : i;
	}, "_zod", {
		value: e._zod,
		enumerable: !1
	});
}, e._zod.parse = (t, n) => typeof t.value == "function" ? (t.value = e._def.output && e._def.output._zod.def.type === "promise" ? e.implementAsync(t.value) : e.implement(t.value), t) : (t.issues.push({
	code: "invalid_type",
	expected: "function",
	input: t.value,
	inst: e
}), t), e.input = (...t) => {
	let n = e.constructor;
	return Array.isArray(t[0]) ? new n({
		type: "function",
		input: new Ta({
			type: "tuple",
			items: t[0],
			rest: t[1]
		}),
		output: e._def.output
	}) : new n({
		type: "function",
		input: t[0],
		output: e._def.output
	});
}, e.output = (t) => {
	let n = e.constructor;
	return new n({
		type: "function",
		input: e._def.input,
		output: t
	});
}, e)), lo = /*@__PURE__*/ A("$ZodPromise", (e, t) => {
	I.init(e, t), e._zod.parse = (e, n) => Promise.resolve(e.value).then((e) => t.innerType._zod.run({
		value: e,
		issues: []
	}, n));
}), uo = /*@__PURE__*/ A("$ZodLazy", (e, t) => {
	I.init(e, t), te(e._zod, "innerType", () => {
		let e = t;
		return e._cachedInner || (e._cachedInner = t.getter()), e._cachedInner;
	}), k(e, "pattern", (e) => e.innerType?._zod?.pattern), k(e, "propValues", (e) => e.innerType?._zod?.propValues), k(e, "optin", (e) => e.innerType?._zod?.optin ?? void 0), k(e, "optout", (e) => e.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n);
}), fo = /*@__PURE__*/ A("$ZodCustom", (e, t) => {
	F.init(e, t), I.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => po(t, n, r, e));
		po(i, n, r, e);
	};
});
function po(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(Ue(e));
	}
}
//#endregion
//#region node_modules/zod/v4/core/memoizer.js
var mo = class extends Error {
	constructor() {
		super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
	}
}, ho = "~memo", go = [];
function _o(e) {
	return typeof e == "object" && !!e;
}
function vo(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
var yo = /*@__PURE__*/ new WeakMap(), bo = 0, xo = 1, So = 2;
function Co(e, t, n) {
	let r = yo.get(e);
	if (r !== void 0) return r ? So : bo;
	if (t.has(e)) return So;
	t.add(e);
	let i = bo, a = (e) => {
		if (i !== So && e?._zod) {
			let r = Co(e, t, n);
			r > i && (i = r);
		}
	}, o = (e, r) => {
		let i = bo;
		for (let a of Reflect.ownKeys(e)) {
			let o = Object.getOwnPropertyDescriptor(e, a);
			if (r && !o.enumerable) continue;
			let s = o.get ? xo : o.value?._zod ? Co(o.value, t, n) : bo;
			s > i && (i = s);
		}
		return i;
	}, s = (e) => {
		e > i && (i = e);
	}, c = e._zod.def;
	switch (c.type) {
		case "object": {
			let e = re(c);
			s(e ? o(e, !0) : xo), a(c.catchall);
			break;
		}
		case "array":
			a(c.element);
			break;
		case "tuple":
			for (let e of c.items) a(e);
			a(c.rest);
			break;
		case "record":
		case "map":
			a(c.keyType), a(c.valueType);
			break;
		case "set":
			a(c.valueType);
			break;
		case "union":
			for (let e of c.options) a(e);
			break;
		case "intersection":
			a(c.left), a(c.right);
			break;
		case "optional":
		case "nullable":
		case "default":
		case "prefault":
		case "catch":
		case "readonly":
		case "nonoptional":
		case "promise":
		case "success":
			a(c.innerType);
			break;
		case "pipe":
			a(c.in), a(c.out);
			break;
		case "function":
			a(c.input), a(c.output);
			break;
		case "lazy": {
			let r = c._cachedInner ?? (n ? e._zod.innerType : void 0);
			s(r ? Co(r, t, !1) : xo);
			break;
		}
		case "template_literal":
		case "string":
		case "number":
		case "int":
		case "boolean":
		case "bigint":
		case "symbol":
		case "undefined":
		case "null":
		case "void":
		case "never":
		case "any":
		case "unknown":
		case "date":
		case "nan":
		case "enum":
		case "literal":
		case "file":
		case "transform":
		case "custom": break;
		default: for (let e in c) {
			let t = Object.getOwnPropertyDescriptor(c, e);
			if (!t || t.get) continue;
			let n = t.value;
			if (n && typeof n == "object") {
				if (n._zod) a(n);
				else if (Array.isArray(n)) for (let e of n) a(e);
			}
		}
	}
	return t.delete(e), wo(e, i);
}
function wo(e, t) {
	return t !== xo && yo.set(e, t === So), t;
}
function To(e) {
	return Co(e, /* @__PURE__ */ new Set(), !0) !== bo;
}
function Eo(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new WeakMap(), e.buckets.set(t, n)), n;
}
var Do, Oo = [], ko = {
	alloc(e, t, n) {
		let r = Do;
		if (!r) return n;
		Do = void 0;
		let i = {
			value: n,
			issues: null
		};
		return r.set(t.value, i), Oo.push(i), n;
	},
	guard(e) {
		var t;
		(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
			let t = e._zod.parse, n = (e, n) => {
				if (n.direction !== "backward" && jo(n, e.value)) throw new mo();
				return t(e, n);
			};
			e._zod.parse = n, e._zod.run === t && (e._zod.run = n);
		});
	},
	attach(e) {
		var t;
		let n, r = !1, i, a;
		(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
			let t = e._zod.parse, o = (s, c) => {
				if (n === void 0) {
					let i = Co(e, /* @__PURE__ */ new Set(), !1);
					if (i === bo) return e._zod.parse = t, e._zod.run === o && (e._zod.run = t), t(s, c);
					i === So || r ? n = !0 : r = !0;
				}
				let l = s.value;
				if (!_o(l)) return t(s, c);
				let u = c[ho];
				u || (u = {
					buckets: /* @__PURE__ */ new WeakMap(),
					backEdges: void 0
				}, c[ho] = u);
				let d;
				i === c ? d = a : (d = Eo(u, e), i = c, a = d);
				let f = d.get(l);
				if (f) return s.value = f.value, f.issues ? f.issues.length && s.issues.push(...vo(f.issues)) : (s.memo = !0, u.backEdges ?? (u.backEdges = /* @__PURE__ */ new WeakSet()), u.backEdges.add(f.value)), s;
				Do = d;
				let p = Oo.length, m = t(s, c);
				Do = void 0;
				let h = Oo.length > p ? Oo.pop() : void 0;
				return m instanceof Promise ? m.then((e) => (h && (h.issues = e.issues.length ? vo(e.issues) : go), e)) : (h && (h.issues = m.issues.length ? vo(m.issues) : go), m);
			};
			e._zod.parse = o, e._zod.run === t && (e._zod.run = o);
		});
	}
};
function Ao() {
	return ko;
}
function jo(e, t) {
	let n = e[ho]?.backEdges;
	return n !== void 0 && _o(t) && n.has(t);
}
//#endregion
//#region node_modules/zod/v4/locales/en.js
var Mo = () => {
	let e = {
		string: {
			unit: "characters",
			verb: "to have"
		},
		file: {
			unit: "bytes",
			verb: "to have"
		},
		array: {
			unit: "items",
			verb: "to have"
		},
		set: {
			unit: "items",
			verb: "to have"
		},
		map: {
			unit: "entries",
			verb: "to have"
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: "input",
		email: "email address",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		mac: "MAC address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		currency_code: "currency code",
		credit_card: "credit card number",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	}, r = { nan: "NaN" };
	function i(e, t) {
		return e === "number" && typeof t == "number" && !Number.isFinite(t) ? String(t) : r[e] ?? e;
	}
	return (e) => {
		switch (e.code) {
			case "invalid_type": return `Invalid input: expected ${i(e.expected)}, received ${i(He(e.input), e.input)}`;
			case "invalid_value": return e.values.length === 1 ? `Invalid input: expected ${Se(e.values[0])}` : `Invalid option: expected one of ${l(e.values, "|")}`;
			case "too_big": {
				let n = e.exact ? "exactly " : e.inclusive ? "<=" : "<", r = t(e.origin);
				return r ? `Too big: expected ${e.origin ?? "value"} to have ${n}${e.maximum.toString()} ${r.unit ?? "elements"}` : `Too big: expected ${e.origin ?? "value"} to be ${n}${e.maximum.toString()}`;
			}
			case "too_small": {
				let n = e.exact ? "exactly " : e.inclusive ? ">=" : ">", r = t(e.origin);
				return r ? `Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}` : `Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`;
			}
			case "invalid_format": {
				let t = e;
				return t.format === "starts_with" ? `Invalid string: must start with "${t.prefix}"` : t.format === "ends_with" ? `Invalid string: must end with "${t.suffix}"` : t.format === "includes" ? `Invalid string: must include "${t.includes}"` : t.format === "regex" ? `Invalid string: must match pattern ${t.pattern}` : `Invalid ${n[t.format] ?? e.format}`;
			}
			case "not_multiple_of": return `Invalid number: must be a multiple of ${e.divisor}`;
			case "unrecognized_keys": return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${l(e.keys, ", ")}`;
			case "invalid_key": return `Invalid key in ${e.origin}`;
			case "invalid_union": return e.options && Array.isArray(e.options) && e.options.length > 0 ? `Invalid discriminator value. Expected ${e.options.map((e) => `'${e}'`).join(" | ")}` : e.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
			case "invalid_element": return `Invalid value in ${e.origin}`;
			default: return "Invalid input";
		}
	};
};
function No() {
	return { localeError: Mo() };
}
//#endregion
//#region node_modules/zod/v4/core/registries.js
var Po, Fo = /*@__PURE__*/ Symbol("ZodOutput"), Io = /*@__PURE__*/ Symbol("ZodInput"), Lo = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(e, ...t) {
		let n = t[0];
		return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(e) {
		let t = this._map.get(e);
		return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		let t = e._zod.parent;
		if (t) {
			let n = { ...this.get(t) ?? {} };
			delete n.id;
			let r = {
				...n,
				...this._map.get(e)
			};
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function Ro() {
	return new Lo();
}
(Po = globalThis).__zod_globalRegistry ?? (Po.__zod_globalRegistry = Ro());
var R = globalThis.__zod_globalRegistry;
//#endregion
//#region node_modules/zod/v4/core/api.js
function zo(e) {
	return e.checks && (e.checks = [...e.checks]), e;
}
// @__NO_SIDE_EFFECTS__
function Bo(e, t) {
	return new e(zo({
		type: "string",
		...C(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Vo(e, t) {
	return new e(zo({
		type: "string",
		coerce: !0,
		...C(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Ho(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Uo(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Wo(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Go(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ko(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qo(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Jo(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Yo(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Xo(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Zo(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Qo(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $o(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function es(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ts(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ns(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function rs(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function is(e, t) {
	return new e({
		type: "string",
		format: "mac",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function as(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function os(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ss(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cs(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ls(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function us(e, t) {
	return new e({
		type: "string",
		format: "credit_card",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ds(e, t) {
	return new e({
		type: "string",
		format: "iban",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function fs(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
var ps = {
	Any: null,
	Minute: -1,
	Second: 0,
	Millisecond: 3,
	Microsecond: 6
};
// @__NO_SIDE_EFFECTS__
function ms(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function hs(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function gs(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function _s(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function vs(e, t) {
	return new e(zo({
		type: "number",
		checks: [],
		...C(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function ys(e, t) {
	return new e(zo({
		type: "number",
		coerce: !0,
		checks: [],
		...C(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function bs(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function xs(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "float32",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ss(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "float64",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Cs(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "int32",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ws(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "uint32",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ts(e, t) {
	return new e({
		type: "boolean",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Es(e, t) {
	return new e({
		type: "boolean",
		coerce: !0,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ds(e, t) {
	return new e({
		type: "bigint",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Os(e, t) {
	return new e({
		type: "bigint",
		coerce: !0,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ks(e, t) {
	return new e({
		type: "bigint",
		check: "bigint_format",
		abort: !1,
		format: "int64",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function As(e, t) {
	return new e({
		type: "bigint",
		check: "bigint_format",
		abort: !1,
		format: "uint64",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function js(e, t) {
	return new e({
		type: "symbol",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ms(e, t) {
	return new e({
		type: "undefined",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ns(e, t) {
	return new e({
		type: "null",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ps(e) {
	return new e({ type: "any" });
}
// @__NO_SIDE_EFFECTS__
function Fs(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function Is(e, t) {
	return new e({
		type: "never",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ls(e, t) {
	return new e({
		type: "void",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Rs(e, t) {
	return new e({
		type: "date",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function zs(e, t) {
	return new e({
		type: "date",
		coerce: !0,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Bs(e, t) {
	return new e({
		type: "nan",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Vs(e, t) {
	return new Er({
		check: "less_than",
		...C(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function z(e, t) {
	return new Er({
		check: "less_than",
		...C(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Hs(e, t) {
	return new Dr({
		check: "greater_than",
		...C(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function B(e, t) {
	return new Dr({
		check: "greater_than",
		...C(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Us(e) {
	return /* @__PURE__ */ Hs(0, e);
}
// @__NO_SIDE_EFFECTS__
function Ws(e) {
	return /* @__PURE__ */ Vs(0, e);
}
// @__NO_SIDE_EFFECTS__
function Gs(e) {
	return /* @__PURE__ */ z(0, e);
}
// @__NO_SIDE_EFFECTS__
function Ks(e) {
	return /* @__PURE__ */ B(0, e);
}
// @__NO_SIDE_EFFECTS__
function qs(e, t) {
	return new Or({
		check: "multiple_of",
		...C(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function Js(e, t) {
	return new jr({
		check: "max_size",
		...C(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ys(e, t) {
	return new Mr({
		check: "min_size",
		...C(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Xs(e, t) {
	return new Nr({
		check: "size_equals",
		...C(t),
		size: e
	});
}
// @__NO_SIDE_EFFECTS__
function Zs(e, t) {
	return new Pr({
		check: "max_length",
		...C(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Qs(e, t) {
	return new Fr({
		check: "min_length",
		...C(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function $s(e, t) {
	return new Ir({
		check: "length_equals",
		...C(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function ec(e, t) {
	return new Rr({
		check: "string_format",
		format: "regex",
		...C(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function tc(e) {
	return new zr({
		check: "string_format",
		format: "lowercase",
		...C(e)
	});
}
// @__NO_SIDE_EFFECTS__
function nc(e) {
	return new Br({
		check: "string_format",
		format: "uppercase",
		...C(e)
	});
}
// @__NO_SIDE_EFFECTS__
function rc(e, t) {
	return new Vr({
		check: "string_format",
		format: "includes",
		...C(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function ic(e, t) {
	return new Hr({
		check: "string_format",
		format: "starts_with",
		...C(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function ac(e, t) {
	return new Ur({
		check: "string_format",
		format: "ends_with",
		...C(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function oc(e, t, n) {
	return new Gr({
		check: "property",
		property: e,
		schema: t,
		...C(n)
	});
}
// @__NO_SIDE_EFFECTS__
function sc(e, t) {
	return new Kr({
		check: "properties",
		shape: e,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cc(e, t) {
	return new qr({
		check: "mime_type",
		mime: e,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function V(e) {
	return new Jr({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function lc(e) {
	return /* @__PURE__ */ V((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function uc() {
	return /* @__PURE__ */ V((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function dc() {
	return /* @__PURE__ */ V((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function fc() {
	return /* @__PURE__ */ V((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function pc() {
	return /* @__PURE__ */ V((e) => fe(e));
}
// @__NO_SIDE_EFFECTS__
function mc(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...C(n)
	});
}
// @__NO_SIDE_EFFECTS__
function hc(e, t, n) {
	return new e({
		type: "union",
		options: t,
		...C(n)
	});
}
function gc(e, t, n) {
	return new e({
		type: "union",
		options: t,
		inclusive: !1,
		...C(n)
	});
}
// @__NO_SIDE_EFFECTS__
function _c(e, t, n, r) {
	return new e({
		type: "union",
		options: n,
		discriminator: t,
		...C(r)
	});
}
// @__NO_SIDE_EFFECTS__
function vc(e, t, n) {
	return new e({
		type: "intersection",
		left: t,
		right: n
	});
}
// @__NO_SIDE_EFFECTS__
function yc(e, t, n, r) {
	let i = n instanceof I;
	return new e({
		type: "tuple",
		items: t,
		rest: i ? n : null,
		...C(i ? r : n)
	});
}
// @__NO_SIDE_EFFECTS__
function bc(e, t, n, r) {
	return new e({
		type: "record",
		keyType: t,
		valueType: n,
		...C(r)
	});
}
// @__NO_SIDE_EFFECTS__
function xc(e, t, n, r) {
	return new e({
		type: "map",
		keyType: t,
		valueType: n,
		...C(r)
	});
}
// @__NO_SIDE_EFFECTS__
function Sc(e, t, n) {
	return new e({
		type: "set",
		valueType: t,
		...C(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Cc(e, t, n) {
	return new e({
		type: "enum",
		entries: Array.isArray(t) ? Object.fromEntries(t.map((e) => [e, e])) : t,
		...C(n)
	});
}
// @__NO_SIDE_EFFECTS__
function wc(e, t, n) {
	return new e({
		type: "enum",
		entries: t,
		...C(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Tc(e, t, n) {
	return new e({
		type: "literal",
		values: Array.isArray(t) ? t : [t],
		...C(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Ec(e, t) {
	return new e({
		type: "file",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Dc(e, t) {
	return new e({
		type: "transform",
		transform: t
	});
}
// @__NO_SIDE_EFFECTS__
function Oc(e, t) {
	return new e({
		type: "optional",
		innerType: t
	});
}
// @__NO_SIDE_EFFECTS__
function kc(e, t) {
	return new e({
		type: "nullable",
		innerType: t
	});
}
// @__NO_SIDE_EFFECTS__
function Ac(e, t, n) {
	return new e({
		type: "default",
		innerType: t,
		get defaultValue() {
			return typeof n == "function" ? n() : ge(n);
		}
	});
}
// @__NO_SIDE_EFFECTS__
function jc(e, t, n) {
	return new e({
		type: "nonoptional",
		innerType: t,
		...C(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Mc(e, t) {
	return new e({
		type: "success",
		innerType: t
	});
}
// @__NO_SIDE_EFFECTS__
function Nc(e, t, n) {
	return new e({
		type: "catch",
		innerType: t,
		catchValue: typeof n == "function" ? n : st(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Pc(e, t, n) {
	return new e({
		type: "pipe",
		in: t,
		out: n
	});
}
// @__NO_SIDE_EFFECTS__
function Fc(e, t) {
	return new e({
		type: "readonly",
		innerType: t
	});
}
// @__NO_SIDE_EFFECTS__
function Ic(e, t, n) {
	return new e({
		type: "template_literal",
		parts: t,
		...C(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Lc(e, t) {
	return new e({
		type: "lazy",
		getter: t
	});
}
// @__NO_SIDE_EFFECTS__
function Rc(e, t) {
	return new e({
		type: "promise",
		innerType: t
	});
}
// @__NO_SIDE_EFFECTS__
function zc(e, t, n) {
	let r = C(n);
	return r.abort ?? (r.abort = !0), new e({
		type: "custom",
		check: "custom",
		fn: t,
		...r
	});
}
// @__NO_SIDE_EFFECTS__
function Bc(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...C(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Vc(e, t) {
	let n = /* @__PURE__ */ Hc((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(Ue(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ?? (r.code = "custom"), "input" in r || (r.input = t.value), r.inst ?? (r.inst = n), r.continue ?? (r.continue = !n._zod.def.abort), t.issues.push(Ue(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function Hc(e, t) {
	let n = new F({
		check: "custom",
		...C(t)
	});
	return n._zod.check = e, n;
}
// @__NO_SIDE_EFFECTS__
function Uc(e) {
	let t = new F({ check: "describe" });
	return t._zod.onattach = [(t) => {
		let n = R.get(t) ?? {};
		R.add(t, {
			...n,
			description: e
		});
	}], t._zod.check = () => {}, t;
}
// @__NO_SIDE_EFFECTS__
function Wc(e) {
	let t = new F({ check: "meta" });
	return t._zod.onattach = [(t) => {
		let n = R.get(t) ?? {};
		R.add(t, {
			...n,
			...e
		});
	}], t._zod.check = () => {}, t;
}
// @__NO_SIDE_EFFECTS__
function Gc(e, t) {
	let n = C(t), r = n.truthy ?? [
		"true",
		"1",
		"yes",
		"on",
		"y",
		"enabled"
	], i = n.falsy ?? [
		"false",
		"0",
		"no",
		"off",
		"n",
		"disabled"
	];
	n.case !== "sensitive" && (r = r.map((e) => typeof e == "string" ? e.toLowerCase() : e), i = i.map((e) => typeof e == "string" ? e.toLowerCase() : e));
	let a = new Set(r), o = new Set(i), s = e.Codec ?? $a, c = e.Boolean ?? Xi, l = new s({
		type: "pipe",
		in: new (e.String ?? ei)({
			type: "string",
			error: n.error
		}),
		out: new c({
			type: "boolean",
			error: n.error
		}),
		transform: ((e, t) => {
			let r = e;
			return n.case !== "sensitive" && (r = r.toLowerCase()), a.has(r) ? !0 : !o.has(r) && (t.issues.push({
				code: "invalid_value",
				expected: "stringbool",
				values: [...a, ...o],
				input: t.value,
				inst: l,
				continue: !1
			}), {});
		}),
		reverseTransform: ((e, t) => e === !0 ? r[0] || "true" : i[0] || "false"),
		error: n.error
	});
	return l._zod.bag.truthy = r, l._zod.bag.falsy = i, l._zod.bag.case = n.case ?? "insensitive", l;
}
// @__NO_SIDE_EFFECTS__
function Kc(e, t, n, r = {}) {
	let i = C(r), a = {
		check: "string_format",
		type: "string",
		format: t,
		fn: typeof n == "function" ? n : (e) => n.test(e),
		...i
	};
	return n instanceof RegExp && (a.pattern = n), new e(a);
}
//#endregion
//#region node_modules/zod/v4/core/to-json-schema.js
function qc(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && g(e, t, n[t]);
	return e;
}
function Jc(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? R,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		sharedDefsExtractedFor: void 0,
		sharedEmitDoneFor: void 0,
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		intersections: [],
		deferred: [],
		external: e?.external ?? void 0
	};
}
function H(e, t, n, r, i) {
	let a = typeof t.unrepresentable == "function" ? t.unrepresentable({
		zodSchema: e,
		path: r.path,
		message: i
	}) : t.unrepresentable;
	if (a === "any") return !1;
	if (a === void 0 || a === "throw") throw Error(i);
	return Object.assign(n, a), !0;
}
function U(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o), t.sharedDefsExtractedFor = void 0, t.sharedEmitDoneFor = void 0;
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref || (o.ref = a), U(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && qc(o.schema, c), t.io === "input" && W(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function Yc(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function Xc(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	if (e.external && e.sharedDefsExtractedFor === e.external) return;
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${Yc(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + Yc(a)
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		r.count > 1 && e.reused === "ref" && a(n);
	}
	e.external && (e.sharedDefsExtractedFor = e.external);
}
function Zc(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		Zc(e);
		let t = Object.keys(e);
		if (t.length !== 1 || t[0] !== "type") return;
		let r = e.type;
		for (let e of Array.isArray(r) ? r : [r]) {
			if (typeof e != "string") return;
			n.includes(e) || n.push(e);
		}
	}
	delete e.anyOf, e.type = n.length === 1 ? n[0] : n;
}
var Qc = /* @__PURE__ */ new Set([
	"type",
	"properties",
	"required",
	"additionalProperties"
]), $c = ["oneOf", "anyOf"];
function el(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function tl(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!Qc.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? el(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			g(n, r, e.length === 1 ? e[0] : tl(e) ?? { allOf: e });
		}
		for (let t of e.required ?? []) r.add(t);
	}
	let i = {
		type: "object",
		properties: n
	};
	if (r.size && (i.required = [...r]), t.every((e) => e.additionalProperties === !1)) i.additionalProperties = !1;
	else {
		let e = [];
		for (let n of t) {
			let t = el(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function nl(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of Qc) if (t in e) return;
	let n = t.filter((e) => $c.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = tl(t);
	else {
		let e = n[0], i = $c.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => tl([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, qc(e, r));
}
function rl(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : qc(i, s), qc(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
			if (s.$ref && n.def) for (let e in i) e !== "$ref" && e !== "allOf" && e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e !== "$ref" && e !== "allOf" && e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	if (!e.external || e.sharedEmitDoneFor !== e.external) {
		for (let t of [...e.seen.entries()].reverse()) r(t[0]);
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) Zc(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) nl(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	qc(i, n.defId ? n.schema : n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external) for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, g(o, e.defId, e.def));
	}
	e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: al(t, "input", e.processors),
					output: al(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function W(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return W(r.element, n);
	if (r.type === "set") return W(r.valueType, n);
	if (r.type === "lazy") return W(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return W(r.innerType, n);
	if (r.type === "intersection") return W(r.left, n) || W(r.right, n);
	if (r.type === "record" || r.type === "map") return W(r.keyType, n) || W(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : W(r.in, n) || W(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (W(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (W(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (W(e, n)) return !0;
		return !!(r.rest && W(r.rest, n));
	}
	return !1;
}
var il = (e, t = {}) => (n) => {
	let r = Jc({
		...n,
		processors: t
	});
	return U(e, r), Xc(r, e), rl(r, e);
}, al = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = Jc({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return U(e, o), Xc(o, e), rl(o, e);
}, ol = (e, t, n) => {
	(e[t] === void 0 || n > e[t]) && (e[t] = n);
}, sl = (e, t, n) => {
	(e[t] === void 0 || n < e[t]) && (e[t] = n);
}, cl = (e, t) => {
	ol(e, "minimum", t), sl(e, "maximum", t);
}, ll = (e, t) => {
	e.multipleOf ?? (e.multipleOf = []), e.multipleOf.includes(t) || e.multipleOf.push(t);
}, ul = (e, t) => {
	e.patterns ?? (e.patterns = /* @__PURE__ */ new Set()), e.patterns.add(t);
}, dl = (e, t) => {
	e.mime = e.mime ? e.mime.filter((e) => t.includes(e)) : [...t];
}, fl = (e, t) => {
	e.format = t, t.includes("int") && (e.isInt = !0);
}, pl = (e, t) => ol(e, "minimum", t.minimum), ml = (e, t) => sl(e, "maximum", t.maximum), hl = (e) => (t, n) => {
	fl(t, n.format);
	let [r, i] = e[n.format];
	ol(t, "minimum", r), sl(t, "maximum", i);
}, gl = {
	greater_than: (e, t) => ol(e, t.inclusive ? "minimum" : "exclusiveMinimum", t.value),
	less_than: (e, t) => sl(e, t.inclusive ? "maximum" : "exclusiveMaximum", t.value),
	multiple_of: (e, t) => ll(e, t.value),
	number_format: hl(we),
	bigint_format: hl(Te),
	min_length: pl,
	max_length: ml,
	length_equals: (e, t) => cl(e, t.length),
	min_size: pl,
	max_size: ml,
	size_equals: (e, t) => cl(e, t.size),
	string_format: (e, t) => {
		fl(e, t.format), t.pattern && ul(e, t.pattern), (t.format === "base64" || t.format === "base64url") && (e.contentEncoding = t.format), (t.local || t.precision === -1) && (e.laxFormat = !0);
	},
	mime_type: (e, t) => dl(e, t.mime)
};
function G(e) {
	let t = {}, n = e._zod.def, r = e._zod.traits.has("$ZodCheck") ? [e, ...n.checks ?? []] : n.checks ?? [];
	for (let e of r) gl[e._zod.def.check]?.(t, e._zod.def);
	let i = e._zod.bag;
	i.minimum !== void 0 && ol(t, "minimum", i.minimum), i.exclusiveMinimum !== void 0 && ol(t, "exclusiveMinimum", i.exclusiveMinimum), i.maximum !== void 0 && sl(t, "maximum", i.maximum), i.exclusiveMaximum !== void 0 && sl(t, "exclusiveMaximum", i.exclusiveMaximum), i.multipleOf !== void 0 && ll(t, i.multipleOf), i.format !== void 0 && (t.format ?? (t.format = i.format), i.format.includes("int") && (t.isInt = !0)), i.mime && dl(t, i.mime);
	for (let e of i.patterns ?? []) ul(t, e);
	return t;
}
var _l = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, vl = /* @__PURE__ */ new Map([[Mi, Pn], [Pi, Fn]]), yl = (e) => vl.get(e) ?? e, bl = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = G(e);
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = _l[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c].map(yl);
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, xl = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, multipleOf: s, exclusiveMaximum: c, exclusiveMinimum: l, isInt: u } = G(e);
	i.type = u ? "integer" : "number";
	let d = typeof l == "number" && l >= (a ?? -Infinity), f = typeof c == "number" && c <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
	if (d ? p ? (i.minimum = l, i.exclusiveMinimum = !0) : i.exclusiveMinimum = l : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = c, i.exclusiveMaximum = !0) : i.exclusiveMaximum = c : typeof o == "number" && (i.maximum = o), s) {
		let n = /* @__PURE__ */ new Set();
		for (let a of s) Number.isFinite(a) && a !== 0 ? n.add(Math.abs(a)) : H(e, t, i, r, `A multipleOf divisor of ${a} cannot be represented in JSON Schema`);
		let [a, ...o] = n;
		a !== void 0 && (i.multipleOf = a), o.length && (i.allOf = [...i.allOf ?? [], ...o.map((e) => ({ multipleOf: e }))]);
	}
}, Sl = (e, t, n, r) => {
	n.type = "boolean";
}, Cl = (e, t, n, r) => {
	H(e, t, n, r, "BigInt cannot be represented in JSON Schema");
}, wl = (e, t, n, r) => {
	H(e, t, n, r, "Symbols cannot be represented in JSON Schema");
}, Tl = (e, t, n, r) => {
	t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
}, El = (e, t, n, r) => {
	H(e, t, n, r, "Undefined cannot be represented in JSON Schema");
}, Dl = (e, t, n, r) => {
	H(e, t, n, r, "Void cannot be represented in JSON Schema");
}, Ol = (e, t, n, r) => {
	n.not = {};
}, kl = (e, t, n, r) => {}, Al = (e, t, n, r) => {}, jl = (e, t, n, r) => {
	H(e, t, n, r, "Date cannot be represented in JSON Schema");
}, Ml = (e, t, n, r) => {
	let i = e._zod.def, a = c(i.entries);
	if (a.length === 0) {
		n.not = {};
		return;
	}
	a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
}, Nl = (e, t, n, r) => {
	let i = e._zod.def;
	if (i.values.length === 0) {
		n.not = {};
		return;
	}
	let a = [];
	for (let o of i.values) if (o === void 0) {
		if (H(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema")) return;
	} else if (typeof o == "bigint") {
		if (H(e, t, n, r, "BigInt literals cannot be represented in JSON Schema")) return;
		a.push(Number(o));
	} else a.push(o);
	if (a.length !== 0) {
		if (a.length === 1) {
			let e = a[0];
			n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
		} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
	}
}, Pl = (e, t, n, r) => {
	H(e, t, n, r, "NaN cannot be represented in JSON Schema");
}, Fl = (e, t, n, r) => {
	let i = n, a = e._zod.pattern;
	if (!a) throw Error("Pattern not found in template literal");
	i.type = "string", i.pattern = a.source;
}, Il = (e, t, n, r) => {
	let i = n;
	i.type = "string", i.format = "binary", i.contentEncoding = "binary";
	let { minimum: a, maximum: o, mime: s } = G(e);
	a !== void 0 && (i.minLength = a), o !== void 0 && (i.maxLength = o), s && (s.length === 0 ? i.not = {} : s.length === 1 ? i.contentMediaType = s[0] : i.anyOf = s.map((e) => ({ contentMediaType: e })));
}, Ll = (e, t, n, r) => {
	n.type = "boolean";
}, Rl = (e, t, n, r) => {
	H(e, t, n, r, "Custom types cannot be represented in JSON Schema");
}, zl = (e, t, n, r) => {
	H(e, t, n, r, "Function types cannot be represented in JSON Schema");
}, Bl = (e, t, n, r) => {
	H(e, t, n, r, "Transforms cannot be represented in JSON Schema");
}, Vl = (e, t, n, r) => {
	H(e, t, n, r, "Map cannot be represented in JSON Schema");
}, Hl = (e, t, n, r) => {
	H(e, t, n, r, "Set cannot be represented in JSON Schema");
}, Ul = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = G(e);
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = U(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
};
function Wl(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? Wl(t.out) : t.type === "catch" ? Wl(t.innerType) : e._zod.optin;
}
var Gl = (e, t, n, r) => {
	let i = n, a = e._zod.def, o = a.shape;
	if (Object.getOwnPropertySymbols(o).length && H(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")) return;
	i.type = "object", i.properties = {};
	for (let e in o) g(i.properties, e, U(o[e], t, {
		...r,
		path: [
			...r.path,
			"properties",
			e
		]
	}));
	let s = [];
	for (let e of Object.keys(o)) {
		let n = a.shape[e];
		(t.io === "input" ? Wl(n) === void 0 : n._zod.optout === void 0) && s.push(e);
	}
	s.length > 0 && (i.required = s), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = U(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, Kl = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => U(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, ql = (e, t, n, r) => {
	let i = e._zod.def, a = U(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = U(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1, c = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
	n.allOf = c, t.intersections.push(c);
}, Jl = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "array";
	let o = t.target === "draft-2020-12" ? "prefixItems" : "items", s = t.target === "draft-2020-12" || t.target === "openapi-3.0" ? "items" : "additionalItems", c = a.items.map((e, n) => U(e, t, {
		...r,
		path: [
			...r.path,
			o,
			n
		]
	})), l = a.rest ? U(a.rest, t, {
		...r,
		path: [
			...r.path,
			s,
			...t.target === "openapi-3.0" ? [a.items.length] : []
		]
	}) : null, u = a.items.length;
	for (; u > 0;) {
		let e = a.items[u - 1];
		if (!(t.io === "input" ? Wl(e) !== void 0 : e._zod.optout === "optional")) break;
		u--;
	}
	let d = a.items.length, f = !a.rest;
	t.target === "draft-2020-12" ? (i.prefixItems = c, f ? i.items = !1 : l && (i.items = l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : t.target === "openapi-3.0" ? (i.items = { anyOf: c }, l && i.items.anyOf.push(l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : (i.items = c, f ? i.additionalItems = !1 : l && (i.additionalItems = l), u > 0 && (i.minItems = u), f && (i.maxItems = d));
	let { minimum: p, maximum: m } = G(e);
	typeof p == "number" && (i.minItems = p), typeof m == "number" && (i.maxItems = m);
};
function Yl(e, t, n) {
	if (t.$ref) {
		if (n.has(t)) return t;
		n.add(t);
		let r = e.get(t)?.def;
		if (!r) return t;
		let i = Yl(e, r, n);
		return i === r ? t : i;
	}
	for (let r of ["anyOf", "oneOf"]) {
		let i = t[r];
		if (!Array.isArray(i)) continue;
		let a = i.map((t) => Yl(e, t, n));
		a.some((e, t) => e !== i[t]) && (t = {
			...t,
			[r]: a
		});
	}
	let r = Array.isArray(t.type) ? t.type : [t.type], i = !r.includes("string") && r.some((e) => e === "number" || e === "integer"), a = t.enum ?? (t.const === void 0 ? void 0 : [t.const]);
	if (!i && !a?.some((e) => typeof e == "number")) return t;
	let { minimum: o, maximum: s, exclusiveMinimum: c, exclusiveMaximum: l, multipleOf: u, format: d, id: f, ...p } = t;
	return p.enum ? p.enum = p.enum.map((e) => typeof e == "number" ? String(e) : e) : typeof p.const == "number" && (p.const = String(p.const)), i ? (p.type = "string", a || (p.pattern = (r.includes("number") ? $n : Qn).source), p) : p;
}
var Xl = /* @__PURE__ */ new WeakMap();
function Zl(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.seen.values()) n.def && !t.has(n.schema) && t.set(n.schema, n);
	let n = /* @__PURE__ */ new Map();
	for (let r of Xl.get(e) ?? []) {
		let i = e.seen.get(r), a = (i?.def ?? i?.schema)?.propertyNames;
		if (!a || a === !0 || n.has(a)) continue;
		let o = Yl(t, a, /* @__PURE__ */ new Set());
		o !== a && n.set(a, o);
	}
	if (n.size) for (let t of e.seen.values()) for (let e of [t.schema, t.def]) {
		let t = e && n.get(e.propertyNames);
		t && (e.propertyNames = t);
	}
}
var Ql = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object";
	let o = a.keyType, s = G(o).patterns;
	if (a.mode === "loose" && s && s.size > 0) {
		let e = U(a.valueType, t, {
			...r,
			path: [
				...r.path,
				"patternProperties",
				"*"
			]
		});
		i.patternProperties = {};
		for (let t of s) g(i.patternProperties, yl(t).source, e);
	} else {
		if (t.target === "draft-07" || t.target === "draft-2020-12") {
			i.propertyNames = U(a.keyType, t, {
				...r,
				path: [...r.path, "propertyNames"]
			});
			let n = Xl.get(t);
			n || (n = [], Xl.set(t, n), t.deferred.push(() => Zl(t))), n.push(e);
		}
		i.additionalProperties = U(a.valueType, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		});
	}
	let c = o._zod.values, l = t.io === "input" && Wl(a.valueType) !== void 0;
	if (c && !a.partial && !l) {
		let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
		e.length > 0 && (i.required = e.map(String));
	}
}, $l = (e, t, n, r) => {
	let i = e._zod.def, a = U(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, eu = (e, t, n, r) => {
	let i = e._zod.def;
	U(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, tu = Symbol();
function nu(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (H(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), tu) : JSON.parse(o);
}
var ru = (e, t, n, r) => {
	let i = e._zod.def;
	U(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o = nu(i.defaultValue, e, t, n, r);
	o !== tu && (n.default = o);
}, iu = (e, t, n, r) => {
	let i = e._zod.def;
	U(i.innerType, t, r);
	let a = t.seen.get(e);
	if (a.ref = i.innerType, t.io !== "input") return;
	let o = nu(i.defaultValue, e, t, n, r);
	o !== tu && (n._prefault = o);
}, au = (e, t, n, r) => {
	let i = e._zod.def;
	U(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		H(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
		return;
	}
	n.default = o;
}, ou = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
	U(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, su = (e, t, n, r) => {
	let i = e._zod.def;
	U(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, cu = (e, t, n, r) => {
	let i = e._zod.def;
	U(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, lu = (e, t, n, r) => {
	let i = e._zod.def;
	U(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, uu = (e, t, n, r) => {
	let i = e._zod.innerType;
	U(i, t, r);
	let a = t.seen.get(e);
	a.ref = i;
}, du = {
	string: bl,
	number: xl,
	boolean: Sl,
	bigint: Cl,
	symbol: wl,
	null: Tl,
	undefined: El,
	void: Dl,
	never: Ol,
	any: kl,
	unknown: Al,
	date: jl,
	enum: Ml,
	literal: Nl,
	nan: Pl,
	template_literal: Fl,
	file: Il,
	success: Ll,
	custom: Rl,
	function: zl,
	transform: Bl,
	map: Vl,
	set: Hl,
	array: Ul,
	object: Gl,
	union: Kl,
	intersection: ql,
	tuple: Jl,
	record: Ql,
	nullable: $l,
	nonoptional: eu,
	default: ru,
	prefault: iu,
	catch: au,
	pipe: ou,
	readonly: su,
	promise: cu,
	optional: lu,
	lazy: uu
};
function fu(e, t) {
	if ("_idmap" in e) {
		let n = e, r = Jc({
			...t,
			processors: du
		}), i = {};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			U(n, r);
		}
		let a = {};
		r.external = {
			registry: n,
			uri: t?.uri,
			defs: i
		};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			Xc(r, n), g(a, t, rl(r, n));
		}
		return Object.keys(i).length > 0 && (a.__shared = { [r.target === "draft-2020-12" ? "$defs" : "definitions"]: i }), { schemas: a };
	}
	let n = Jc({
		...t,
		processors: du
	});
	return U(e, n), Xc(n, e), rl(n, e);
}
//#endregion
//#region node_modules/zod/v4/classic/errors.js
var pu = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function mu(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = n(this);
			return Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	});
}
var hu = (e, t) => {
	xt.init(e, t), e.name = "ZodError";
	let n = Object.getPrototypeOf(e);
	pu.has(n) || (pu.add(n), mu(n, "format", (e) => (t) => wt(e, t)), mu(n, "flatten", (e) => (t) => Ct(e, t)), mu(n, "addIssue", (e) => (t) => {
		e.issues.push(t), e.message = JSON.stringify(e.issues, u, 2);
	}), mu(n, "addIssues", (e) => (t) => {
		e.issues.push(...t), e.message = JSON.stringify(e.issues, u, 2);
	}), Object.defineProperty(n, "isEmpty", {
		configurable: !0,
		enumerable: !1,
		get() {
			return this.issues.length === 0;
		}
	}));
}, gu = /*@__PURE__*/ A("ZodError", hu), K = /*@__PURE__*/ A("ZodError", hu, void 0, { Parent: Error }), _u = /* @__PURE__ */ kt(K), vu = /* @__PURE__ */ jt(K), yu = /* @__PURE__ */ Nt(K), bu = /* @__PURE__ */ It(K), xu = /* @__PURE__ */ Ut(K), Su = /* @__PURE__ */ Gt(K), Cu = /* @__PURE__ */ qt(K), wu = /* @__PURE__ */ Yt(K), Tu = /* @__PURE__ */ Zt(K), Eu = /* @__PURE__ */ $t(K), Du = /* @__PURE__ */ tn(K), Ou = /* @__PURE__ */ rn(K), ku = /* @__PURE__ */ e({
	ZodAny: () => nf,
	ZodArray: () => ff,
	ZodBase64: () => yd,
	ZodBase64URL: () => xd,
	ZodBigInt: () => Gd,
	ZodBigIntFormat: () => qd,
	ZodBoolean: () => Ud,
	ZodCIDRv4: () => hd,
	ZodCIDRv6: () => _d,
	ZodCUID: () => $u,
	ZodCUID2: () => td,
	ZodCatch: () => sp,
	ZodCodec: () => pp,
	ZodCreditCard: () => Td,
	ZodCustom: () => Dp,
	ZodCustomStringFormat: () => Z,
	ZodDate: () => uf,
	ZodDefault: () => $f,
	ZodDiscriminatedUnion: () => Cf,
	ZodE164: () => Cd,
	ZodEmail: () => Ru,
	ZodEmoji: () => Yu,
	ZodEnum: () => Lf,
	ZodExactOptional: () => Jf,
	ZodFile: () => Hf,
	ZodFunction: () => Tp,
	ZodGUID: () => Bu,
	ZodIBAN: () => Dd,
	ZodIPv4: () => ld,
	ZodIPv6: () => pd,
	ZodISODate: () => Fu,
	ZodISODateTime: () => Pu,
	ZodISODuration: () => Lu,
	ZodISOTime: () => Iu,
	ZodInstanceOf: () => Pp,
	ZodIntersection: () => Tf,
	ZodJWT: () => kd,
	ZodKSUID: () => sd,
	ZodLazy: () => xp,
	ZodLiteral: () => Bf,
	ZodMAC: () => dd,
	ZodMap: () => Nf,
	ZodNaN: () => lp,
	ZodNanoID: () => Zu,
	ZodNever: () => of,
	ZodNonOptional: () => rp,
	ZodNull: () => ef,
	ZodNullable: () => Xf,
	ZodNumber: () => Id,
	ZodNumberFormat: () => Q,
	ZodObject: () => hf,
	ZodOptional: () => Kf,
	ZodPipe: () => dp,
	ZodPrefault: () => tp,
	ZodPreprocess: () => gp,
	ZodPromise: () => Cp,
	ZodReadonly: () => _p,
	ZodRecord: () => kf,
	ZodSet: () => Ff,
	ZodString: () => Mu,
	ZodStringFormat: () => Y,
	ZodSuccess: () => ap,
	ZodSymbol: () => Xd,
	ZodTemplateLiteral: () => yp,
	ZodTransform: () => Wf,
	ZodTuple: () => Df,
	ZodType: () => J,
	ZodULID: () => rd,
	ZodURL: () => Ku,
	ZodUUID: () => X,
	ZodUndefined: () => Qd,
	ZodUnion: () => yf,
	ZodUnknown: () => af,
	ZodVoid: () => cf,
	ZodXID: () => ad,
	ZodXor: () => xf,
	_ZodString: () => ju,
	_default: () => ep,
	_function: () => Ep,
	any: () => rf,
	array: () => pf,
	base64: () => bd,
	base64url: () => Sd,
	bigint: () => Kd,
	boolean: () => Wd,
	catch: () => cp,
	check: () => Op,
	cidrv4: () => gd,
	cidrv6: () => vd,
	codec: () => mp,
	creditCard: () => Ed,
	cuid: () => ed,
	cuid2: () => nd,
	currencyCode: () => Pd,
	custom: () => kp,
	date: () => df,
	describe: () => Mp,
	discriminatedUnion: () => wf,
	e164: () => wd,
	email: () => zu,
	emoji: () => Xu,
	enum: () => Rf,
	exactOptional: () => Yf,
	file: () => Uf,
	float32: () => zd,
	float64: () => Bd,
	function: () => Ep,
	guid: () => Vu,
	hash: () => Fd,
	hex: () => Nd,
	hostname: () => Md,
	httpUrl: () => Ju,
	iban: () => Od,
	instanceof: () => Fp,
	int: () => Rd,
	int32: () => Vd,
	int64: () => Jd,
	intersection: () => Ef,
	invertCodec: () => hp,
	ipv4: () => ud,
	ipv6: () => md,
	json: () => Lp,
	jwt: () => Ad,
	keyof: () => mf,
	ksuid: () => cd,
	lazy: () => Sp,
	literal: () => Vf,
	looseObject: () => vf,
	looseRecord: () => Mf,
	mac: () => fd,
	map: () => Pf,
	meta: () => Np,
	nan: () => up,
	nanoid: () => Qu,
	nativeEnum: () => zf,
	never: () => sf,
	nonoptional: () => ip,
	null: () => tf,
	nullable: () => Zf,
	nullish: () => Qf,
	number: () => Ld,
	object: () => gf,
	optional: () => qf,
	partialRecord: () => jf,
	pipe: () => fp,
	prefault: () => np,
	preprocess: () => Rp,
	promise: () => wp,
	readonly: () => vp,
	record: () => Af,
	refine: () => Ap,
	set: () => If,
	strictObject: () => _f,
	string: () => Nu,
	stringFormat: () => jd,
	stringbool: () => Ip,
	success: () => op,
	superRefine: () => jp,
	symbol: () => Zd,
	templateLiteral: () => bp,
	transform: () => Gf,
	tuple: () => Of,
	uint32: () => Hd,
	uint64: () => Yd,
	ulid: () => id,
	undefined: () => $d,
	union: () => bf,
	unknown: () => $,
	url: () => qu,
	uuid: () => Hu,
	uuidv4: () => Uu,
	uuidv6: () => Wu,
	uuidv7: () => Gu,
	void: () => lf,
	xid: () => od,
	xor: () => Sf
});
function Au() {
	M.localeError || N(No());
}
function q() {
	M.memoizer || N({ memoizer: Ao() });
}
var J = /*@__PURE__*/ A("ZodType", (e, t) => (Au(), I.init(e, t), e.def = t, e.type = t.type, e), {
	check(...e) {
		let t = this.def;
		return this.clone(y(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)] }), { parent: !0 });
	},
	with(...e) {
		return this.check(...e);
	},
	clone(e, t) {
		return S(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	refine(e, t) {
		return this.check(Ap(e, t));
	},
	superRefine(e, t) {
		return this.check(jp(e, t));
	},
	overwrite(e) {
		return this.check(/* @__PURE__ */ V(e));
	},
	optional() {
		return qf(this);
	},
	exactOptional() {
		return Yf(this);
	},
	nullable() {
		return Zf(this);
	},
	nullish() {
		return qf(Zf(this));
	},
	nonoptional(e) {
		return ip(this, e);
	},
	array() {
		return pf(this);
	},
	or(e) {
		return bf([this, e]);
	},
	and(e) {
		return Ef(this, e);
	},
	transform(e) {
		return fp(this, Gf(e));
	},
	default(e) {
		return ep(this, e);
	},
	prefault(e) {
		return np(this, e);
	},
	catch(e) {
		return cp(this, e);
	},
	pipe(e) {
		return fp(this, e);
	},
	readonly() {
		return vp(this);
	},
	describe(e) {
		let t = this.clone();
		return R.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return R.get(this);
		let t = this.clone();
		return R.add(t, e[0]), t;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(e, ...t) {
		return t.length === 0 ? e(this) : e(this, ...t);
	},
	get "~standard"() {
		return $e(this, "~standard", {
			...$r(this),
			jsonSchema: {
				input: al(this, "input"),
				output: al(this, "output")
			}
		});
	},
	set "~standard"(e) {
		D(this, "~standard", e);
	},
	parse: function e(t, n) {
		return _u(this, t, n, { callee: e });
	},
	parseAsync: async function e(t, n) {
		return await vu(this, t, n, { callee: e });
	},
	safeParse(e, t) {
		return yu(this, e, t);
	},
	async safeParseAsync(e, t) {
		return bu(this, e, t);
	},
	get spa() {
		return this?.safeParseAsync;
	},
	set spa(e) {
		D(this, "spa", e);
	},
	validate(e, t) {
		return Bt(this, e, t);
	},
	validateAsync(e, t) {
		return Ht(this, e, t);
	},
	encode: function e(t, n) {
		return xu(this, t, n, { callee: e });
	},
	decode: function e(t, n) {
		return Su(this, t, n, { callee: e });
	},
	encodeAsync: async function e(t, n) {
		return await Cu(this, t, n, { callee: e });
	},
	decodeAsync: async function e(t, n) {
		return await wu(this, t, n, { callee: e });
	},
	safeEncode(e, t) {
		return Tu(this, e, t);
	},
	safeDecode(e, t) {
		return Eu(this, e, t);
	},
	async safeEncodeAsync(e, t) {
		return Du(this, e, t);
	},
	async safeDecodeAsync(e, t) {
		return Ou(this, e, t);
	},
	toJSONSchema(e) {
		return il(this, {})(e);
	},
	get description() {
		return R.get(this)?.description;
	},
	get _def() {
		return this._zod.def;
	}
}), ju = /*@__PURE__*/ A("_ZodString", (e, t) => {
	ei.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => bl(e, t, n, r);
}, /*@__PURE__*/ et({
	format: (e) => G(e).format ?? null,
	minLength: (e) => G(e).minimum ?? null,
	maxLength: (e) => G(e).maximum ?? null
}, {
	regex(...e) {
		return this.check(/* @__PURE__ */ ec(...e));
	},
	includes(...e) {
		return this.check(/* @__PURE__ */ rc(...e));
	},
	startsWith(...e) {
		return this.check(/* @__PURE__ */ ic(...e));
	},
	endsWith(...e) {
		return this.check(/* @__PURE__ */ ac(...e));
	},
	min(...e) {
		return this.check(/* @__PURE__ */ Qs(...e));
	},
	max(...e) {
		return this.check(/* @__PURE__ */ Zs(...e));
	},
	length(...e) {
		return this.check(/* @__PURE__ */ $s(...e));
	},
	nonempty(...e) {
		return this.check(/* @__PURE__ */ Qs(1, ...e));
	},
	lowercase(e) {
		return this.check(/* @__PURE__ */ tc(e));
	},
	uppercase(e) {
		return this.check(/* @__PURE__ */ nc(e));
	},
	trim() {
		return this.check(/* @__PURE__ */ uc());
	},
	normalize(...e) {
		return this.check(/* @__PURE__ */ lc(...e));
	},
	toLowerCase() {
		return this.check(/* @__PURE__ */ dc());
	},
	toUpperCase() {
		return this.check(/* @__PURE__ */ fc());
	},
	slugify() {
		return this.check(/* @__PURE__ */ pc());
	}
})), Mu = /*@__PURE__*/ A("ZodString", (e, t) => {
	ei.init(e, t), ju.init(e, t);
}, {
	email(e) {
		return this.check(/* @__PURE__ */ Ho(Ru, e));
	},
	url(e) {
		return this.check(/* @__PURE__ */ Jo(Ku, e));
	},
	jwt(e) {
		return this.check(/* @__PURE__ */ fs(kd, e));
	},
	emoji(e) {
		return this.check(/* @__PURE__ */ Yo(Yu, e));
	},
	guid(e) {
		return this.check(/* @__PURE__ */ Uo(Bu, e));
	},
	uuid(e) {
		return this.check(/* @__PURE__ */ Wo(X, e));
	},
	uuidv4(e) {
		return this.check(/* @__PURE__ */ Go(X, e));
	},
	uuidv6(e) {
		return this.check(/* @__PURE__ */ Ko(X, e));
	},
	uuidv7(e) {
		return this.check(/* @__PURE__ */ qo(X, e));
	},
	nanoid(e) {
		return this.check(/* @__PURE__ */ Xo(Zu, e));
	},
	cuid(e) {
		return this.check(/* @__PURE__ */ Zo($u, e));
	},
	cuid2(e) {
		return this.check(/* @__PURE__ */ Qo(td, e));
	},
	ulid(e) {
		return this.check(/* @__PURE__ */ $o(rd, e));
	},
	base64(e) {
		return this.check(/* @__PURE__ */ ss(yd, e));
	},
	base64url(e) {
		return this.check(/* @__PURE__ */ cs(xd, e));
	},
	xid(e) {
		return this.check(/* @__PURE__ */ es(ad, e));
	},
	ksuid(e) {
		return this.check(/* @__PURE__ */ ts(sd, e));
	},
	ipv4(e) {
		return this.check(/* @__PURE__ */ ns(ld, e));
	},
	ipv6(e) {
		return this.check(/* @__PURE__ */ rs(pd, e));
	},
	cidrv4(e) {
		return this.check(/* @__PURE__ */ as(hd, e));
	},
	cidrv6(e) {
		return this.check(/* @__PURE__ */ os(_d, e));
	},
	e164(e) {
		return this.check(/* @__PURE__ */ ls(Cd, e));
	},
	datetime(e) {
		return this.check(/* @__PURE__ */ ms(Pu, e));
	},
	date(e) {
		return this.check(/* @__PURE__ */ hs(Fu, e));
	},
	time(e) {
		return this.check(/* @__PURE__ */ gs(Iu, e));
	},
	duration(e) {
		return this.check(/* @__PURE__ */ _s(Lu, e));
	}
});
function Nu(e) {
	return /* @__PURE__ */ Bo(Mu, e);
}
var Y = /*@__PURE__*/ A("ZodStringFormat", (e, t) => {
	L.init(e, t), ju.init(e, t);
}), Pu = /*@__PURE__*/ A("ZodISODateTime", (e, t) => {
	yi.init(e, t), Y.init(e, t);
}), Fu = /*@__PURE__*/ A("ZodISODate", (e, t) => {
	bi.init(e, t), Y.init(e, t);
}), Iu = /*@__PURE__*/ A("ZodISOTime", (e, t) => {
	xi.init(e, t), Y.init(e, t);
}), Lu = /*@__PURE__*/ A("ZodISODuration", (e, t) => {
	Si.init(e, t), Y.init(e, t);
}), Ru = /*@__PURE__*/ A("ZodEmail", (e, t) => {
	ri.init(e, t), Y.init(e, t);
});
function zu(e) {
	return /* @__PURE__ */ Ho(Ru, e);
}
var Bu = /*@__PURE__*/ A("ZodGUID", (e, t) => {
	ti.init(e, t), Y.init(e, t);
});
function Vu(e) {
	return /* @__PURE__ */ Uo(Bu, e);
}
var X = /*@__PURE__*/ A("ZodUUID", (e, t) => {
	ni.init(e, t), Y.init(e, t);
});
function Hu(e) {
	return /* @__PURE__ */ Wo(X, e);
}
function Uu(e) {
	return /* @__PURE__ */ Go(X, e);
}
function Wu(e) {
	return /* @__PURE__ */ Ko(X, e);
}
function Gu(e) {
	return /* @__PURE__ */ qo(X, e);
}
var Ku = /*@__PURE__*/ A("ZodURL", (e, t) => {
	di.init(e, t), Y.init(e, t);
});
function qu(e) {
	return /* @__PURE__ */ Jo(Ku, e);
}
function Ju(e) {
	return /* @__PURE__ */ Jo(Ku, {
		protocol: Rn,
		hostname: Ln,
		...C(e)
	});
}
var Yu = /*@__PURE__*/ A("ZodEmoji", (e, t) => {
	fi.init(e, t), Y.init(e, t);
});
function Xu(e) {
	return /* @__PURE__ */ Yo(Yu, e);
}
var Zu = /*@__PURE__*/ A("ZodNanoID", (e, t) => {
	pi.init(e, t), Y.init(e, t);
});
function Qu(e) {
	return /* @__PURE__ */ Xo(Zu, e);
}
var $u = /*@__PURE__*/ A("ZodCUID", (e, t) => {
	mi.init(e, t), Y.init(e, t);
});
function ed(e) {
	return /* @__PURE__ */ Zo($u, e);
}
var td = /*@__PURE__*/ A("ZodCUID2", (e, t) => {
	hi.init(e, t), Y.init(e, t);
});
function nd(e) {
	return /* @__PURE__ */ Qo(td, e);
}
var rd = /*@__PURE__*/ A("ZodULID", (e, t) => {
	gi.init(e, t), Y.init(e, t);
});
function id(e) {
	return /* @__PURE__ */ $o(rd, e);
}
var ad = /*@__PURE__*/ A("ZodXID", (e, t) => {
	_i.init(e, t), Y.init(e, t);
});
function od(e) {
	return /* @__PURE__ */ es(ad, e);
}
var sd = /*@__PURE__*/ A("ZodKSUID", (e, t) => {
	vi.init(e, t), Y.init(e, t);
});
function cd(e) {
	return /* @__PURE__ */ ts(sd, e);
}
var ld = /*@__PURE__*/ A("ZodIPv4", (e, t) => {
	Ci.init(e, t), Y.init(e, t);
});
function ud(e) {
	return /* @__PURE__ */ ns(ld, e);
}
var dd = /*@__PURE__*/ A("ZodMAC", (e, t) => {
	Di.init(e, t), Y.init(e, t);
});
function fd(e) {
	return /* @__PURE__ */ is(dd, e);
}
var pd = /*@__PURE__*/ A("ZodIPv6", (e, t) => {
	Ei.init(e, t), Y.init(e, t);
});
function md(e) {
	return /* @__PURE__ */ rs(pd, e);
}
var hd = /*@__PURE__*/ A("ZodCIDRv4", (e, t) => {
	Oi.init(e, t), Y.init(e, t);
});
function gd(e) {
	return /* @__PURE__ */ as(hd, e);
}
var _d = /*@__PURE__*/ A("ZodCIDRv6", (e, t) => {
	Ai.init(e, t), Y.init(e, t);
});
function vd(e) {
	return /* @__PURE__ */ os(_d, e);
}
var yd = /*@__PURE__*/ A("ZodBase64", (e, t) => {
	Ni.init(e, t), Y.init(e, t);
});
function bd(e) {
	return /* @__PURE__ */ ss(yd, e);
}
var xd = /*@__PURE__*/ A("ZodBase64URL", (e, t) => {
	Ii.init(e, t), Y.init(e, t);
});
function Sd(e) {
	return /* @__PURE__ */ cs(xd, e);
}
var Cd = /*@__PURE__*/ A("ZodE164", (e, t) => {
	Li.init(e, t), Y.init(e, t);
});
function wd(e) {
	return /* @__PURE__ */ ls(Cd, e);
}
var Td = /*@__PURE__*/ A("ZodCreditCard", (e, t) => {
	Vi.init(e, t), Y.init(e, t);
});
function Ed(e) {
	return /* @__PURE__ */ us(Td, e);
}
var Dd = /*@__PURE__*/ A("ZodIBAN", (e, t) => {
	Wi.init(e, t), Y.init(e, t);
});
function Od(e) {
	return /* @__PURE__ */ ds(Dd, e);
}
var kd = /*@__PURE__*/ A("ZodJWT", (e, t) => {
	Ki.init(e, t), Y.init(e, t);
});
function Ad(e) {
	return /* @__PURE__ */ fs(kd, e);
}
var Z = /*@__PURE__*/ A("ZodCustomStringFormat", (e, t) => {
	qi.init(e, t), Y.init(e, t);
});
function jd(e, t, n = {}) {
	return /* @__PURE__ */ Kc(Z, e, t, n);
}
function Md(e) {
	return /* @__PURE__ */ Kc(Z, "hostname", In, e);
}
function Nd(e) {
	return /* @__PURE__ */ Kc(Z, "hex", ar, e);
}
function Pd(e) {
	return /* @__PURE__ */ Kc(Z, "currency_code", Vn, e);
}
function Fd(e, t) {
	let n = `${e}_${t?.enc ?? "hex"}`, r = on[n];
	if (!r) throw Error(`Unrecognized hash format: ${n}`);
	return /* @__PURE__ */ Kc(Z, n, r, t);
}
var Id = /*@__PURE__*/ A("ZodNumber", (e, t) => {
	Ji.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => xl(e, t, n, r), e.isFinite = !0;
}, /*@__PURE__*/ et({
	minValue: (e) => {
		let { minimum: t, exclusiveMinimum: n } = G(e);
		return Math.max(t ?? -Infinity, n ?? -Infinity);
	},
	maxValue: (e) => {
		let { maximum: t, exclusiveMaximum: n } = G(e);
		return Math.min(t ?? Infinity, n ?? Infinity);
	},
	isInt: (e) => {
		let { isInt: t, multipleOf: n } = G(e);
		return !!t || !!n?.some(Number.isSafeInteger);
	},
	format: (e) => G(e).format ?? null
}, {
	gt(e, t) {
		return this.check(/* @__PURE__ */ Hs(e, t));
	},
	gte(e, t) {
		return this.check(/* @__PURE__ */ B(e, t));
	},
	min(e, t) {
		return this.check(/* @__PURE__ */ B(e, t));
	},
	lt(e, t) {
		return this.check(/* @__PURE__ */ Vs(e, t));
	},
	lte(e, t) {
		return this.check(/* @__PURE__ */ z(e, t));
	},
	max(e, t) {
		return this.check(/* @__PURE__ */ z(e, t));
	},
	int(e) {
		return this.check(Rd(e));
	},
	safe(e) {
		return this.check(Rd(e));
	},
	positive(e) {
		return this.check(/* @__PURE__ */ Hs(0, e));
	},
	nonnegative(e) {
		return this.check(/* @__PURE__ */ B(0, e));
	},
	negative(e) {
		return this.check(/* @__PURE__ */ Vs(0, e));
	},
	nonpositive(e) {
		return this.check(/* @__PURE__ */ z(0, e));
	},
	multipleOf(e, t) {
		return this.check(/* @__PURE__ */ qs(e, t));
	},
	step(e, t) {
		return this.check(/* @__PURE__ */ qs(e, t));
	},
	finite() {
		return this;
	}
}));
function Ld(e) {
	return /* @__PURE__ */ vs(Id, e);
}
var Q = /*@__PURE__*/ A("ZodNumberFormat", (e, t) => {
	Yi.init(e, t), Id.init(e, t);
});
function Rd(e) {
	return /* @__PURE__ */ bs(Q, e);
}
function zd(e) {
	return /* @__PURE__ */ xs(Q, e);
}
function Bd(e) {
	return /* @__PURE__ */ Ss(Q, e);
}
function Vd(e) {
	return /* @__PURE__ */ Cs(Q, e);
}
function Hd(e) {
	return /* @__PURE__ */ ws(Q, e);
}
var Ud = /*@__PURE__*/ A("ZodBoolean", (e, t) => {
	Xi.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Sl(e, t, n, r);
});
function Wd(e) {
	return /* @__PURE__ */ Ts(Ud, e);
}
var Gd = /*@__PURE__*/ A("ZodBigInt", (e, t) => {
	Zi.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Cl(e, t, n, r);
}, /*@__PURE__*/ et({
	minValue: (e) => G(e).minimum ?? null,
	maxValue: (e) => G(e).maximum ?? null,
	format: (e) => G(e).format ?? null
}, {
	gte(e, t) {
		return this.check(/* @__PURE__ */ B(e, t));
	},
	min(e, t) {
		return this.check(/* @__PURE__ */ B(e, t));
	},
	gt(e, t) {
		return this.check(/* @__PURE__ */ Hs(e, t));
	},
	lt(e, t) {
		return this.check(/* @__PURE__ */ Vs(e, t));
	},
	lte(e, t) {
		return this.check(/* @__PURE__ */ z(e, t));
	},
	max(e, t) {
		return this.check(/* @__PURE__ */ z(e, t));
	},
	positive(e) {
		return this.check(/* @__PURE__ */ Hs(BigInt(0), e));
	},
	negative(e) {
		return this.check(/* @__PURE__ */ Vs(BigInt(0), e));
	},
	nonpositive(e) {
		return this.check(/* @__PURE__ */ z(BigInt(0), e));
	},
	nonnegative(e) {
		return this.check(/* @__PURE__ */ B(BigInt(0), e));
	},
	multipleOf(e, t) {
		return this.check(/* @__PURE__ */ qs(e, t));
	}
}));
function Kd(e) {
	return /* @__PURE__ */ Ds(Gd, e);
}
var qd = /*@__PURE__*/ A("ZodBigIntFormat", (e, t) => {
	Qi.init(e, t), Gd.init(e, t);
});
function Jd(e) {
	return /* @__PURE__ */ ks(qd, e);
}
function Yd(e) {
	return /* @__PURE__ */ As(qd, e);
}
var Xd = /*@__PURE__*/ A("ZodSymbol", (e, t) => {
	$i.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => wl(e, t, n, r);
});
function Zd(e) {
	return /* @__PURE__ */ js(Xd, e);
}
var Qd = /*@__PURE__*/ A("ZodUndefined", (e, t) => {
	ea.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => El(e, t, n, r);
});
function $d(e) {
	return /* @__PURE__ */ Ms(Qd, e);
}
var ef = /*@__PURE__*/ A("ZodNull", (e, t) => {
	ta.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Tl(e, t, n, r);
});
function tf(e) {
	return /* @__PURE__ */ Ns(ef, e);
}
var nf = /*@__PURE__*/ A("ZodAny", (e, t) => {
	na.init(e, t), J.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function rf() {
	return /* @__PURE__ */ Ps(nf);
}
var af = /*@__PURE__*/ A("ZodUnknown", (e, t) => {
	ra.init(e, t), J.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function $() {
	return /* @__PURE__ */ Fs(af);
}
var of = /*@__PURE__*/ A("ZodNever", (e, t) => {
	ia.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ol(e, t, n, r);
});
function sf(e) {
	return /* @__PURE__ */ Is(of, e);
}
var cf = /*@__PURE__*/ A("ZodVoid", (e, t) => {
	aa.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Dl(e, t, n, r);
});
function lf(e) {
	return /* @__PURE__ */ Ls(cf, e);
}
var uf = /*@__PURE__*/ A("ZodDate", (e, t) => {
	oa.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => jl(e, t, n, r), e.min = (t, n) => e.check(/* @__PURE__ */ B(t, n)), e.max = (t, n) => e.check(/* @__PURE__ */ z(t, n));
}, /*@__PURE__*/ et({
	minDate: (e) => {
		let { minimum: t } = G(e);
		return t ? new Date(t) : null;
	},
	maxDate: (e) => {
		let { maximum: t } = G(e);
		return t ? new Date(t) : null;
	}
}, {}));
function df(e) {
	return /* @__PURE__ */ Rs(uf, e);
}
var ff = /*@__PURE__*/ A("ZodArray", (e, t) => {
	q(), ca.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ul(e, t, n, r), e.element = t.element;
}, {
	min(e, t) {
		return this.check(/* @__PURE__ */ Qs(e, t));
	},
	nonempty(e) {
		return this.check(/* @__PURE__ */ Qs(1, e));
	},
	max(e, t) {
		return this.check(/* @__PURE__ */ Zs(e, t));
	},
	length(e, t) {
		return this.check(/* @__PURE__ */ $s(e, t));
	},
	unwrap() {
		return this.element;
	}
});
function pf(e, t) {
	return /* @__PURE__ */ mc(ff, e, t);
}
function mf(e) {
	let t = e._zod.def.shape;
	return Rf(Object.keys(t));
}
var hf = /*@__PURE__*/ A("ZodObject", (e, t) => {
	q(), ma.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Gl(e, t, n, r), at(e, "shape", (e) => e._zod.def.shape, !1);
}, {
	keyof() {
		return Rf(Object.keys(this._zod.def.shape));
	},
	catchall(e) {
		return this.clone(y(this._zod.def, { catchall: e }));
	},
	passthrough() {
		return this.clone(y(this._zod.def, { catchall: $() }));
	},
	loose() {
		return this.clone(y(this._zod.def, { catchall: $() }));
	},
	strict() {
		return this.clone(y(this._zod.def, { catchall: sf() }));
	},
	strip() {
		return this.clone(y(this._zod.def, { catchall: void 0 }));
	},
	extend(e) {
		return ke(this, e);
	},
	safeExtend(e) {
		return je(this, e);
	},
	merge(e) {
		return Me(this, e);
	},
	pick(e) {
		return Ee(this, e);
	},
	omit(e) {
		return Oe(this, e);
	},
	partial(...e) {
		return Ne(Kf, this, e[0]);
	},
	exactPartial(...e) {
		return Ne(Jf, this, e[0], "exactPartial");
	},
	required(...e) {
		return Pe(rp, this, e[0]);
	}
});
function gf(e, t) {
	return new hf({
		type: "object",
		shape: e ?? {},
		...C(t)
	});
}
function _f(e, t) {
	return new hf({
		type: "object",
		shape: e,
		catchall: sf(),
		...C(t)
	});
}
function vf(e, t) {
	return new hf({
		type: "object",
		shape: e,
		catchall: $(),
		...C(t)
	});
}
var yf = /*@__PURE__*/ A("ZodUnion", (e, t) => {
	ga.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Kl(e, t, n, r), e.options = t.options;
});
function bf(e, t) {
	return new yf({
		type: "union",
		options: e,
		...C(t)
	});
}
var xf = /*@__PURE__*/ A("ZodXor", (e, t) => {
	yf.init(e, t), va.init(e, t), e._zod.processJSONSchema = (t, n, r) => Kl(e, t, n, r), e.options = t.options;
});
function Sf(e, t) {
	return new xf({
		type: "union",
		options: e,
		inclusive: !1,
		...C(t)
	});
}
var Cf = /*@__PURE__*/ A("ZodDiscriminatedUnion", (e, t) => {
	yf.init(e, t), xa.init(e, t);
});
function wf(e, t, n) {
	return new Cf({
		type: "union",
		options: t,
		discriminator: e,
		...C(n)
	});
}
var Tf = /*@__PURE__*/ A("ZodIntersection", (e, t) => {
	Sa.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => ql(e, t, n, r);
});
function Ef(e, t) {
	return new Tf({
		type: "intersection",
		left: e,
		right: t
	});
}
var Df = /*@__PURE__*/ A("ZodTuple", (e, t) => {
	q(), Ta.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Jl(e, t, n, r);
}, {
	rest(e) {
		return this.clone({
			...this._zod.def,
			rest: e
		});
	},
	partial() {
		let e = this._zod.def;
		if (e.checks?.length) throw Error(".partial() cannot be used on tuple schemas containing refinements");
		return this.clone({
			...e,
			items: e.items.map((e) => new Kf({
				type: "optional",
				innerType: e
			}))
		});
	}
});
function Of(e, t, n) {
	let r = t instanceof I;
	return new Df({
		type: "tuple",
		items: e,
		rest: r ? t : null,
		...C(r ? n : t)
	});
}
var kf = /*@__PURE__*/ A("ZodRecord", (e, t) => {
	q(), ka.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ql(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function Af(e, t, n) {
	return !t || !t._zod ? new kf({
		type: "record",
		keyType: Nu(),
		valueType: e,
		...C(t)
	}) : new kf({
		type: "record",
		keyType: e,
		valueType: t,
		...C(n)
	});
}
function jf(e, t, n) {
	return new kf({
		type: "record",
		keyType: e,
		valueType: t,
		...C(n),
		partial: !0
	});
}
function Mf(e, t, n) {
	return new kf({
		type: "record",
		keyType: e,
		valueType: t,
		mode: "loose",
		...C(n)
	});
}
var Nf = /*@__PURE__*/ A("ZodMap", (e, t) => {
	q(), Aa.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Vl(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType, e.min = (...t) => e.check(/* @__PURE__ */ Ys(...t)), e.nonempty = (t) => e.check(/* @__PURE__ */ Ys(1, t)), e.max = (...t) => e.check(/* @__PURE__ */ Js(...t)), e.size = (...t) => e.check(/* @__PURE__ */ Xs(...t));
});
function Pf(e, t, n) {
	return new Nf({
		type: "map",
		keyType: e,
		valueType: t,
		...C(n)
	});
}
var Ff = /*@__PURE__*/ A("ZodSet", (e, t) => {
	q(), Ma.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Hl(e, t, n, r), e.min = (...t) => e.check(/* @__PURE__ */ Ys(...t)), e.nonempty = (t) => e.check(/* @__PURE__ */ Ys(1, t)), e.max = (...t) => e.check(/* @__PURE__ */ Js(...t)), e.size = (...t) => e.check(/* @__PURE__ */ Xs(...t));
});
function If(e, t) {
	return new Ff({
		type: "set",
		valueType: e,
		...C(t)
	});
}
var Lf = /*@__PURE__*/ A("ZodEnum", (e, t) => {
	Pa.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ml(e, t, n, r), e.enum = t.entries, e.options = [...e._zod.values];
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new Lf({
			...t,
			checks: [],
			...C(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new Lf({
			...t,
			checks: [],
			...C(r),
			entries: i
		});
	};
});
function Rf(e, t) {
	return new Lf({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...C(t)
	});
}
function zf(e, t) {
	return new Lf({
		type: "enum",
		entries: e,
		...C(t)
	});
}
var Bf = /*@__PURE__*/ A("ZodLiteral", (e, t) => {
	Fa.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Nl(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function Vf(e, t) {
	return new Bf({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...C(t)
	});
}
var Hf = /*@__PURE__*/ A("ZodFile", (e, t) => {
	Ia.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Il(e, t, n, r), e.min = (t, n) => e.check(/* @__PURE__ */ Ys(t, n)), e.max = (t, n) => e.check(/* @__PURE__ */ Js(t, n)), e.mime = (t, n) => e.check(/* @__PURE__ */ cc(Array.isArray(t) ? t : [t], n));
});
function Uf(e) {
	return /* @__PURE__ */ Ec(Hf, e);
}
var Wf = /*@__PURE__*/ A("ZodTransform", (e, t) => {
	q(), La.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Bl(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new mt(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(Ue(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ?? (t.code = "custom"), "input" in t || (t.input = n.value), t.inst ?? (t.inst = e), n.issues.push(Ue(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
	};
});
function Gf(e) {
	return new Wf({
		type: "transform",
		transform: e
	});
}
var Kf = /*@__PURE__*/ A("ZodOptional", (e, t) => {
	za.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => lu(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function qf(e) {
	return new Kf({
		type: "optional",
		innerType: e
	});
}
var Jf = /*@__PURE__*/ A("ZodExactOptional", (e, t) => {
	Ba.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => lu(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Yf(e) {
	return new Jf({
		type: "optional",
		innerType: e
	});
}
var Xf = /*@__PURE__*/ A("ZodNullable", (e, t) => {
	Va.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => $l(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Zf(e) {
	return new Xf({
		type: "nullable",
		innerType: e
	});
}
function Qf(e) {
	return qf(Zf(e));
}
var $f = /*@__PURE__*/ A("ZodDefault", (e, t) => {
	Ha.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => ru(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function ep(e, t) {
	return new $f({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ge(t);
		}
	});
}
var tp = /*@__PURE__*/ A("ZodPrefault", (e, t) => {
	Wa.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => iu(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function np(e, t) {
	return new tp({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ge(t);
		}
	});
}
var rp = /*@__PURE__*/ A("ZodNonOptional", (e, t) => {
	Ga.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => eu(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function ip(e, t) {
	return new rp({
		type: "nonoptional",
		innerType: e,
		...C(t)
	});
}
var ap = /*@__PURE__*/ A("ZodSuccess", (e, t) => {
	qa.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ll(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function op(e) {
	return new ap({
		type: "success",
		innerType: e
	});
}
var sp = /*@__PURE__*/ A("ZodCatch", (e, t) => {
	Ya.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => au(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function cp(e, t) {
	return new sp({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : st(t)
	});
}
var lp = /*@__PURE__*/ A("ZodNaN", (e, t) => {
	Xa.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Pl(e, t, n, r);
});
function up(e) {
	return /* @__PURE__ */ Bs(lp, e);
}
var dp = /*@__PURE__*/ A("ZodPipe", (e, t) => {
	Za.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => ou(e, t, n, r), e.in = t.in, e.out = t.out;
});
function fp(e, t) {
	return new dp({
		type: "pipe",
		in: e,
		out: t
	});
}
var pp = /*@__PURE__*/ A("ZodCodec", (e, t) => {
	dp.init(e, t), $a.init(e, t);
});
function mp(e, t, n) {
	return new pp({
		type: "pipe",
		in: e,
		out: t,
		transform: n.decode,
		reverseTransform: n.encode
	});
}
function hp(e) {
	let t = e._zod.def;
	return new pp({
		type: "pipe",
		in: t.out,
		out: t.in,
		transform: t.reverseTransform,
		reverseTransform: t.transform
	});
}
var gp = /*@__PURE__*/ A("ZodPreprocess", (e, t) => {
	dp.init(e, t), no.init(e, t);
}), _p = /*@__PURE__*/ A("ZodReadonly", (e, t) => {
	ro.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => su(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function vp(e) {
	return new _p({
		type: "readonly",
		innerType: e
	});
}
var yp = /*@__PURE__*/ A("ZodTemplateLiteral", (e, t) => {
	so.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fl(e, t, n, r);
});
function bp(e, t) {
	return new yp({
		type: "template_literal",
		parts: e,
		...C(t)
	});
}
var xp = /*@__PURE__*/ A("ZodLazy", (e, t) => {
	uo.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => uu(e, t, n, r), e.unwrap = () => e._zod.def.getter();
});
function Sp(e) {
	return new xp({
		type: "lazy",
		getter: e
	});
}
var Cp = /*@__PURE__*/ A("ZodPromise", (e, t) => {
	lo.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => cu(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function wp(e) {
	return new Cp({
		type: "promise",
		innerType: e
	});
}
var Tp = /*@__PURE__*/ A("ZodFunction", (e, t) => {
	co.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => zl(e, t, n, r);
});
function Ep(e) {
	return new Tp({
		type: "function",
		input: Array.isArray(e?.input) ? Of(e?.input) : e?.input ?? pf($()),
		output: e?.output ?? $()
	});
}
var Dp = /*@__PURE__*/ A("ZodCustom", (e, t) => {
	fo.init(e, t), J.init(e, t), e._zod.processJSONSchema = (t, n, r) => Rl(e, t, n, r);
});
function Op(e) {
	let t = new F({ check: "custom" });
	return t._zod.check = e, t;
}
function kp(e, t) {
	return /* @__PURE__ */ zc(Dp, e ?? (() => !0), t);
}
function Ap(e, t = {}) {
	return /* @__PURE__ */ Bc(Dp, e, t);
}
function jp(e, t) {
	return /* @__PURE__ */ Vc(e, t);
}
var Mp = Uc, Np = Wc, Pp = /*@__PURE__*/ A("ZodInstanceOf", (e, t) => {
	Dp.init(e, t);
}, { properties(e, t) {
	return this.check(/* @__PURE__ */ sc(e, t));
} });
function Fp(e, t = {}) {
	let n = new Pp({
		type: "custom",
		check: "custom",
		fn: (t) => t instanceof e,
		abort: !0,
		...C(t)
	});
	return n._zod.bag.Class = e, n._zod.check = (t) => {
		t.value instanceof e || t.issues.push({
			code: "invalid_type",
			expected: e.name,
			input: t.value,
			inst: n,
			path: [...n._zod.def.path ?? []]
		});
	}, n;
}
var Ip = (...e) => /* @__PURE__ */ Gc({
	Codec: pp,
	Boolean: Ud,
	String: Mu
}, ...e);
function Lp(e) {
	let t = Sp(() => bf([
		Nu(e),
		Ld(),
		Wd(),
		tf(),
		pf(t),
		Af(Nu(), t)
	]));
	return t;
}
function Rp(e, t) {
	return new gp({
		type: "pipe",
		in: Gf(e),
		out: t
	});
}
//#endregion
export { dp as $, No as $a, A as $c, Gs as $i, Zd as $n, pa as $o, Vo as $r, zr as $s, Yf as $t, pd as A, yc as Aa, Xt as Ac, fs as Ai, sf as An, ti as Ao, fu as Ar, ji as As, $d as At, Bf as B, Go as Ba, Lt as Bc, Zs as Bi, Rp as Bn, vi as Bo, mc as Br, ci as Bs, vd as Bt, Lf as C, Vc as Ca, $t as Cc, vc as Ci, Mf as Cn, Li as Co, Tu as Cr, aa as Cs, ju as Ct, Bu as D, fc as Da, Nt as Dc, ms as Di, up as Dn, Ba as Do, gu as Dr, Pi as Ds, Ep as Dt, Tp as E, dc as Ea, tn as Ec, hs as Ei, Np as En, Pa as Eo, bu as Er, Mi as Es, Rf as Et, Pp as F, hc as Fa, en as Fc, tc as Fi, gf as Fn, yi as Fo, H as Fr, Ti as Fs, Sd as Ft, of as G, gc as Ga, Ct as Gc, qs as Gi, ku as Gn, Xa as Go, Nc as Gr, Yr as Gs, Pd as Gt, Nf as H, qo as Ha, Ht as Hc, cc as Hi, vp as Hn, Fa as Ho, cs as Hr, ui as Hs, Ed as Ht, Tf as I, Fs as Ia, an as Ic, Vs as Ii, qf as In, Si as Io, Jc as Ir, Gi as Is, Kd as It, Xf as J, Lo as Ja, Et as Jc, wc as Ji, Nu as Jn, Ga as Jo, os as Jr, Ur as Js, Mp as Jt, rp as K, Uc as Ka, wt as Kc, Bs as Ki, If as Kn, pi as Ko, Hc as Kr, F as Ks, kp as Kt, kd as L, nc as La, Qt as Lc, z as Li, jf as Ln, xi as Lo, U as Lr, Ca as Ls, Wd as Lt, Pu as M, As as Ma, Jt as Mc, Lc as Mi, Zf as Mn, Ci as Mo, il as Mr, ki as Ms, rf as Mt, Lu as N, $o as Na, At as Nc, $s as Ni, Qf as Nn, Ei as No, Xc as Nr, Bi as Ns, pf as Nt, Dd as O, Dc as Oa, It as Oc, _s as Oi, Qu as On, Ia as Oo, K as Or, ii as Os, Fp as Ot, Iu as P, Ms as Pa, Mt as Pc, Tc as Pi, Ld as Pn, bi as Po, rl as Pr, Ui as Ps, bd as Pt, Kf as Q, Ro as Qa, pt as Qc, jc as Qi, jp as Qn, Yi as Qo, ys as Qr, Er as Qs, Xu as Qt, sd as R, Jo as Ra, nn as Rc, is as Ri, fp as Rn, Sa as Ro, ps as Rr, oi as Rs, Op as Rt, Yu as S, Mc as Sa, jt as Sc, ks as Si, vf as Sn, xa as So, Ou as Sr, ra as Ss, xf as St, Hf as T, Ic as Ta, Zt as Tc, rs as Ti, Pf as Tn, fi as To, yu as Tr, va as Ts, ep as Tt, lp as U, Ls as Ua, xt as Uc, Qs as Ui, Af as Un, Di as Uo, Ds as Ur, ai as Us, ed as Ut, dd as V, Ko as Va, Bt as Vc, Js as Vi, wp as Vn, uo as Vo, ss as Vr, li as Vs, mp as Vt, Zu as W, es as Wa, P as Wc, Ys as Wi, Ap as Wn, Aa as Wo, Ts as Wr, Xr as Ws, nd as Wt, Q as X, Fo as Xa, j as Xc, Is as Xi, Ip as Xn, Va as Xo, Es as Xr, Vr as Xs, wd as Xt, Id as Y, Io as Ya, Tt as Yc, Ws as Yi, jd as Yn, ta as Yo, Os as Yr, Dr as Ys, wf as Yt, hf as Z, R as Za, mt as Zc, Ks as Zi, op as Zn, Ji as Zo, zs as Zr, Ir as Zs, zu as Zt, uf as _, pc as _a, Gt as _c, Uo as _i, Ad as _n, Vi as _o, xu as _r, gi as _s, Qd as _t, Gd as a, V as aa, Or as ac, Ac as ai, S as al, Nd as an, ca as ao, id as ar, lo as as, Ff as at, Cd as b, Kc as ba, qt as bc, bs as bi, Sp as bn, oa as bo, vu as br, ea as bs, cf as bt, hd as c, Rc as ca, Kr as cc, Ho as ci, h as cl, Od as cn, Zi as co, qu as cr, Ma as cs, ap as ct, td as d, Fc as da, Nr as dc, Cc as di, y as dl, Jd as dn, Oi as do, Wu as dr, qa as ds, Wf as dt, lc as ea, Pr as ec, us as ei, lt as el, Uf as en, mo as eo, bp as er, ma as es, tp as et, sp as f, bc as fa, Hr as fc, Ec as fi, He as fl, Ef as fn, Ai as fo, Gu as fr, $i as fs, Df as ft, Z as g, Xs as ga, on as gc, B as gi, t as gl, Lp as gn, $a as go, wu as gr, I as gs, X as gt, Dp as h, Sc as ha, $n as hc, Hs as hi, i as hl, md as hn, Ya as ho, Su as hr, Ta as hs, Ku as ht, xd as i, Oc as ia, Mr as ic, Rs as ii, g as il, Fd as in, na as io, Yd as ir, no as is, kf as it, Fu as j, ws as ja, Wt as jc, ts as ji, ip as jn, Wi as jo, al as jr, Fi as js, lf as jt, ld as k, uc as ka, Kt as kc, gs as ki, zf as kn, co as ko, du as kr, ya as ks, tf as kt, _d as l, sc as la, Gr as lc, Yo as li, b as ll, Rd as ln, Qi as lo, Hu as lr, ei as ls, Xd as lt, Td as m, ec as ma, Br as mc, Ss as mi, Se as ml, ud as mn, hi as mo, Sf as mr, La as ms, rd as mt, ff as n, kc as na, qr as nc, Qo as ni, M as nl, Bd as nn, To as no, Of as nr, Za as ns, Cp as nt, qd as o, Pc as oa, kr as oc, _c as oi, Be as ol, Md as on, Ni as oo, bf as or, ro as os, Mu as ot, pp as p, Bc as pa, Lr as pc, xs as pi, ge as pl, hp as pn, mi as po, od as pr, so as ps, J as pt, ef as q, Wc as qa, Dt as qc, Xo as qi, _f as qn, ia as qo, as as qr, Ar as qs, df as qt, yd as r, vs as ra, Fr as rc, zc as ri, ot as rl, Vu as rn, Ao as ro, Hd as rr, Wa as rs, _p as rt, Ud as s, Us as sa, Jr as sc, ls as si, de as sl, Ju as sn, Ii as so, $ as sr, ka as ss, Y as st, nf as t, Ns as ta, jr as tc, Zo as ti, N as tl, zd as tn, jo as to, Gf as tr, za as ts, gp as tt, $u as u, oc as ua, Rr as uc, ac as ui, l as ul, Vd as un, Xi as uo, Uu as ur, L as us, yp as ut, $f as v, ic as va, Yt as vc, ds as vi, mf as vn, fo as vo, Cu as vr, di as vs, yf as vt, Jf as w, js as wa, rn as wc, ns as wi, fd as wn, ri as wo, Du as wr, _i as ws, cp as wt, Ru as x, Gc as xa, kt as xc, Cs as xi, Vf as xn, Ha as xo, Eu as xr, ga as xs, ad as xt, Cf as y, Bo as ya, Ut as yc, rc as yi, cd as yn, qi as yo, _u as yr, ni as ys, af as yt, xp as z, Wo as za, Pt as zc, xc as zi, np as zn, Ki as zo, Ps as zr, $r as zs, gd as zt };
