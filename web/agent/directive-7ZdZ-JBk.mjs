import { i as e, n as t, t as n } from "./rolldown-runtime-DArdT4gl.mjs";
import { a as r, i, n as a, o, r as s, t as c } from "./superPropGet-CtoCvIbY.mjs";
import { t as l } from "./v4-BZmdGEh9.mjs";
import { t as u } from "./defineProperty-DxjBOsvz.mjs";
//#region node_modules/@tanstack/pacer/dist/utils.js
function d(e) {
	return typeof e == "function";
}
function f(e, ...t) {
	return d(e) ? e(...t) : e;
}
//#endregion
//#region node_modules/@tanstack/devtools-event-client/dist/esm/plugin.js
var p = /* @__PURE__ */ new WeakMap(), m = /* @__PURE__ */ new WeakMap(), h = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), pe = class {
	constructor({ pluginId: e, debug: t = !1, enabled: n = !0, reconnectEveryMs: r = 300 }) {
		o(this, p, !0), o(this, m, void 0), o(this, h, void 0), o(this, ee, void 0), o(this, te, void 0), o(this, ne, void 0), o(this, re, void 0), o(this, ie, void 0), o(this, ae, 0), o(this, oe, 5), o(this, se, !1), o(this, ce, !1), o(this, le, null), o(this, ue, () => {
			this.debugLog("Connected to event bus"), i(ne, this, !0), i(se, this, !1), this.debugLog("Emitting queued events", s(te, this)), s(te, this).forEach((e) => this.emitEventToBus(e)), i(te, this, []), this.stopConnectLoop(), s(h, this).call(this).removeEventListener("tanstack-connect-success", s(ue, this));
		}), o(this, de, () => {
			if (s(ae, this) < s(oe, this)) {
				var e;
				i(ae, this, (e = s(ae, this), e++, e)), this.dispatchCustomEvent("tanstack-connect", {});
				return;
			}
			s(h, this).call(this).removeEventListener("tanstack-connect", s(de, this)), i(ce, this, !0), this.debugLog("Max retries reached, giving up on connection"), this.stopConnectLoop();
		}), o(this, fe, () => {
			s(se, this) || (i(se, this, !0), s(h, this).call(this).addEventListener("tanstack-connect-success", s(ue, this)), s(de, this).call(this));
		}), i(m, this, e), i(p, this, n), i(h, this, this.getGlobalTarget), i(ee, this, t), this.debugLog(" Initializing event subscription for plugin", s(m, this)), i(te, this, []), i(ne, this, !1), i(ce, this, !1), i(re, this, null), i(ie, this, r);
	}
	startConnectLoop() {
		s(re, this) !== null || s(ne, this) || (this.debugLog(`Starting connect loop (every ${s(ie, this)}ms)`), i(re, this, setInterval(s(de, this), s(ie, this))));
	}
	stopConnectLoop() {
		i(se, this, !1), s(re, this) !== null && (clearInterval(s(re, this)), i(re, this, null), i(te, this, []), this.debugLog("Stopped connect loop"));
	}
	debugLog(...e) {
		s(ee, this) && console.log(`🌴 [tanstack-devtools:${s(m, this)}-plugin]`, ...e);
	}
	getGlobalTarget() {
		if (typeof globalThis < "u" && globalThis.__TANSTACK_EVENT_TARGET__) return this.debugLog("Using global event target"), globalThis.__TANSTACK_EVENT_TARGET__;
		if (typeof window < "u" && window.addEventListener !== void 0) return this.debugLog("Using window as event target"), window;
		let e = typeof EventTarget < "u" ? new EventTarget() : void 0;
		return e === void 0 || e.addEventListener === void 0 ? (this.debugLog("No event mechanism available, running in non-web environment"), {
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => !1
		}) : (this.debugLog("Using new EventTarget as fallback"), e);
	}
	getPluginId() {
		return s(m, this);
	}
	dispatchCustomEventShim(e, t) {
		try {
			let n = new Event(e, { detail: t });
			s(h, this).call(this).dispatchEvent(n);
		} catch {
			this.debugLog("Failed to dispatch shim event");
		}
	}
	dispatchCustomEvent(e, t) {
		try {
			s(h, this).call(this).dispatchEvent(new CustomEvent(e, { detail: t }));
		} catch {
			this.dispatchCustomEventShim(e, t);
		}
	}
	emitEventToBus(e) {
		this.debugLog("Emitting event to client bus", e), this.dispatchCustomEvent("tanstack-dispatch-event", e);
	}
	createEventPayload(e, t) {
		return {
			type: `${s(m, this)}:${e}`,
			payload: t,
			pluginId: s(m, this)
		};
	}
	emit(e, t) {
		if (!s(p, this)) {
			this.debugLog("Event bus client is disabled, not emitting event", e, t);
			return;
		}
		if (s(le, this) && (this.debugLog("Emitting event to internal event target", e, t), s(le, this).dispatchEvent(new CustomEvent(`${s(m, this)}:${e}`, { detail: this.createEventPayload(e, t) }))), s(ce, this)) {
			this.debugLog("Previously failed to connect, not emitting to bus");
			return;
		}
		if (!s(ne, this)) {
			this.debugLog("Bus not available, will be pushed as soon as connected"), s(te, this).push(this.createEventPayload(e, t)), typeof CustomEvent < "u" && !s(se, this) && (s(fe, this).call(this), this.startConnectLoop());
			return;
		}
		return this.emitEventToBus(this.createEventPayload(e, t));
	}
	on(e, t, n) {
		let r = n?.withEventTarget ?? !1, a = `${s(m, this)}:${e}`;
		if (r && (s(le, this) || i(le, this, new EventTarget()), s(le, this).addEventListener(a, (e) => {
			t(e.detail);
		})), !s(p, this)) return this.debugLog("Event bus client is disabled, not registering event", a), () => {};
		let o = (e) => {
			this.debugLog("Received event from bus", e.detail), t(e.detail);
		};
		return s(h, this).call(this).addEventListener(a, o), this.debugLog("Registered event to bus", a), () => {
			r && s(le, this)?.removeEventListener(a, o), s(h, this).call(this).removeEventListener(a, o);
		};
	}
	onAll(e) {
		if (!s(p, this)) return this.debugLog("Event bus client is disabled, not registering event"), () => {};
		let t = (t) => {
			let n = t.detail;
			e(n);
		};
		return s(h, this).call(this).addEventListener("tanstack-devtools-global", t), () => s(h, this).call(this).removeEventListener("tanstack-devtools-global", t);
	}
	onAllPluginEvents(e) {
		if (!s(p, this)) return this.debugLog("Event bus client is disabled, not registering event"), () => {};
		let t = (t) => {
			let n = t.detail;
			s(m, this) && n.pluginId !== s(m, this) || e(n);
		};
		return s(h, this).call(this).addEventListener("tanstack-devtools-global", t), () => s(h, this).call(this).removeEventListener("tanstack-devtools-global", t);
	}
}, me = /* @__PURE__ */ new Map();
function he(e, t) {
	me.set(e, t);
}
function ge(e) {
	if (e !== void 0) try {
		return JSON.parse(JSON.stringify(e));
	} catch {
		return null;
	}
}
function _e(e) {
	return typeof e.get == "function" ? e.get() : e.state;
}
function ve(e) {
	return {
		key: e.key,
		store: { state: ge(_e(e.store)) },
		options: ge(e.options)
	};
}
var ye = class extends pe {
	constructor(e) {
		super({
			pluginId: "pacer",
			debug: e?.debug,
			reconnectEveryMs: 1e3
		});
	}
}, be = (e, t) => {
	let n = t.key;
	n && (he(n, t), xe.emit(e, ve({
		...t,
		key: n
	})));
}, xe = new ye(), Se = /* @__PURE__ */ ((e) => (e[e.None = 0] = "None", e[e.Mutable = 1] = "Mutable", e[e.Watching = 2] = "Watching", e[e.RecursedCheck = 4] = "RecursedCheck", e[e.Recursed = 8] = "Recursed", e[e.Dirty = 16] = "Dirty", e[e.Pending = 32] = "Pending", e))(Se || {});
// @__NO_SIDE_EFFECTS__
function Ce({ update: e, notify: t, unwatched: n }) {
	return {
		link: r,
		unlink: i,
		propagate: a,
		checkDirty: o,
		shallowPropagate: s
	};
	function r(e, t, n) {
		let r = t.depsTail;
		if (r !== void 0 && r.dep === e) return;
		let i = r === void 0 ? t.deps : r.nextDep;
		if (i !== void 0 && i.dep === e) {
			i.version = n, t.depsTail = i;
			return;
		}
		let a = e.subsTail;
		if (a !== void 0 && a.version === n && a.sub === t) return;
		let o = t.depsTail = e.subsTail = {
			version: n,
			dep: e,
			sub: t,
			prevDep: r,
			nextDep: i,
			prevSub: a,
			nextSub: void 0
		};
		i !== void 0 && (i.prevDep = o), r === void 0 ? t.deps = o : r.nextDep = o, a === void 0 ? e.subs = o : a.nextSub = o;
	}
	function i(e, t = e.sub) {
		let r = e.dep, i = e.prevDep, a = e.nextDep, o = e.nextSub, s = e.prevSub;
		return a === void 0 ? t.depsTail = i : a.prevDep = i, i === void 0 ? t.deps = a : i.nextDep = a, o === void 0 ? r.subsTail = s : o.prevSub = s, s === void 0 ? (r.subs = o) === void 0 && n(r) : s.nextSub = o, a;
	}
	function a(e) {
		let n = e.nextSub, r;
		top: do {
			let i = e.sub, a = i.flags;
			if (a & 60 ? a & 12 ? a & 4 ? !(a & 48) && c(e, i) ? (i.flags = a | 40, a &= 1) : a = 0 : i.flags = a & -9 | 32 : a = 0 : i.flags = a | 32, a & 2 && t(i), a & 1) {
				let t = i.subs;
				if (t !== void 0) {
					let i = (e = t).nextSub;
					i !== void 0 && (r = {
						value: n,
						prev: r
					}, n = i);
					continue;
				}
			}
			if ((e = n) !== void 0) {
				n = e.nextSub;
				continue;
			}
			for (; r !== void 0;) if (e = r.value, r = r.prev, e !== void 0) {
				n = e.nextSub;
				continue top;
			}
			break;
		} while (1);
	}
	function o(t, n) {
		let r, i = 0, a = !1;
		top: do {
			let o = t.dep, c = o.flags;
			if (n.flags & 16) a = !0;
			else if ((c & 17) == 17) {
				if (e(o)) {
					let e = o.subs;
					e.nextSub !== void 0 && s(e), a = !0;
				}
			} else if ((c & 33) == 33) {
				(t.nextSub !== void 0 || t.prevSub !== void 0) && (r = {
					value: t,
					prev: r
				}), t = o.deps, n = o, ++i;
				continue;
			}
			if (!a) {
				let e = t.nextDep;
				if (e !== void 0) {
					t = e;
					continue;
				}
			}
			for (; i--;) {
				let i = n.subs, o = i.nextSub !== void 0;
				if (o ? (t = r.value, r = r.prev) : t = i, a) {
					if (e(n)) {
						o && s(i), n = t.sub;
						continue;
					}
					a = !1;
				} else n.flags &= -33;
				n = t.sub;
				let c = t.nextDep;
				if (c !== void 0) {
					t = c;
					continue top;
				}
			}
			return a;
		} while (1);
	}
	function s(e) {
		do {
			let n = e.sub, r = n.flags;
			(r & 48) == 32 && (n.flags = r | 16, (r & 6) == 2 && t(n));
		} while ((e = e.nextSub) !== void 0);
	}
	function c(e, t) {
		let n = t.depsTail;
		for (; n !== void 0;) {
			if (n === e) return !0;
			n = n.prevDep;
		}
		return !1;
	}
}
//#endregion
//#region node_modules/@tanstack/store/dist/esm/atom.js
function we(e, t, n) {
	let r = typeof e == "object", i = r ? e : void 0;
	return {
		next: (r ? e.next : e)?.bind(i),
		error: (r ? e.error : t)?.bind(i),
		complete: (r ? e.complete : n)?.bind(i)
	};
}
var Te = [], Ee = 0, { link: De, unlink: Oe, propagate: ke, checkDirty: Ae, shallowPropagate: je } = /* @__PURE__ */ Ce({
	update(e) {
		return e._update();
	},
	notify(e) {
		Te[Ne++] = e, e.flags &= ~Se.Watching;
	},
	unwatched(e) {
		e.depsTail !== void 0 && (e.depsTail = void 0, e.flags = Se.Mutable | Se.Dirty, Ie(e));
	}
}), Me = 0, Ne = 0, Pe, Fe = 0;
function Ie(e) {
	let t = e.depsTail, n = t === void 0 ? e.deps : t.nextDep;
	for (; n !== void 0;) n = Oe(n, e);
}
function Le() {
	if (!(Fe > 0)) {
		for (; Me < Ne;) {
			let e = Te[Me];
			Te[Me++] = void 0, e.notify();
		}
		Me = 0, Ne = 0;
	}
}
function Re(e, t) {
	let n = typeof e == "function", r = e, i = {
		_snapshot: n ? void 0 : e,
		subs: void 0,
		subsTail: void 0,
		deps: void 0,
		depsTail: void 0,
		flags: n ? Se.None : Se.Mutable,
		get() {
			return Pe !== void 0 && De(i, Pe, Ee), i._snapshot;
		},
		subscribe(e) {
			let t = we(e), n = { current: !1 }, r = ze(() => {
				i.get(), n.current ? t.next?.(i._snapshot) : n.current = !0;
			});
			return { unsubscribe: () => {
				r.stop();
			} };
		},
		_update(e) {
			let a = Pe, o = t?.compare ?? Object.is;
			if (n) Pe = i, ++Ee, i.depsTail = void 0;
			else if (e === void 0) return !1;
			n && (i.flags = Se.Mutable | Se.RecursedCheck);
			try {
				let t = i._snapshot, a = typeof e == "function" ? e(t) : e === void 0 && n ? r(t) : e;
				return t === void 0 || !o(t, a) ? (i._snapshot = a, !0) : !1;
			} finally {
				Pe = a, n && (i.flags &= ~Se.RecursedCheck), Ie(i);
			}
		}
	};
	return n ? (i.flags = Se.Mutable | Se.Dirty, i.get = function() {
		let e = i.flags;
		if (e & Se.Dirty || e & Se.Pending && Ae(i.deps, i)) {
			if (i._update()) {
				let e = i.subs;
				e !== void 0 && je(e);
			}
		} else e & Se.Pending && (i.flags = e & ~Se.Pending);
		return Pe !== void 0 && De(i, Pe, Ee), i._snapshot;
	}) : i.set = function(e) {
		if (i._update(e)) {
			let e = i.subs;
			e !== void 0 && (ke(e), je(e), Le());
		}
	}, i;
}
function ze(e) {
	let t = () => {
		let t = Pe;
		Pe = n, ++Ee, n.depsTail = void 0, n.flags = Se.Watching | Se.RecursedCheck;
		try {
			return e();
		} finally {
			Pe = t, n.flags &= ~Se.RecursedCheck, Ie(n);
		}
	}, n = {
		deps: void 0,
		depsTail: void 0,
		subs: void 0,
		subsTail: void 0,
		flags: Se.Watching | Se.RecursedCheck,
		notify() {
			let e = this.flags;
			e & Se.Dirty || e & Se.Pending && Ae(this.deps, this) ? t() : this.flags = Se.Watching;
		},
		stop() {
			this.flags = Se.None, this.depsTail = void 0, Ie(this);
		}
	};
	return t(), n;
}
//#endregion
//#region node_modules/@tanstack/store/dist/esm/store.js
var Be = class {
	constructor(e) {
		this.atom = Re(e);
	}
	setState(e) {
		this.atom.set(e);
	}
	get state() {
		return this.atom.get();
	}
	get() {
		return this.state;
	}
	subscribe(e) {
		return this.atom.subscribe(we(e));
	}
}, Ve, He, Ue, We, Ge, Ke;
function qe() {
	return {
		executionCount: 0,
		isPending: !1,
		lastArgs: void 0,
		lastExecutionTime: 0,
		nextExecutionTime: 0,
		status: "idle",
		maybeExecuteCount: 0
	};
}
var Je = {
	enabled: !0,
	leading: !0,
	trailing: !0,
	wait: 0
}, Ye = (Ve = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), We = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), class {
	constructor(e, t) {
		o(this, Ve, void 0), o(this, He, (e) => {
			this.store.setState((t) => {
				let n = {
					...t,
					...e
				}, { isPending: r } = n;
				return {
					...n,
					status: s(Ue, this).call(this) ? r ? "pending" : "idle" : "disabled"
				};
			}), be("Throttler", this);
		}), o(this, Ue, () => !!f(this.options.enabled, this)), o(this, We, () => f(this.options.wait, this)), o(this, Ge, (...e) => {
			if (!s(Ue, this).call(this)) return;
			this.fn(...e);
			let t = Date.now(), n = t + s(We, this).call(this);
			s(Ke, this).call(this), s(He, this).call(this, {
				executionCount: this.store.state.executionCount + 1,
				lastExecutionTime: t,
				nextExecutionTime: n,
				isPending: !1,
				lastArgs: void 0
			}), this.options.onExecute?.(e, this), setTimeout(() => {
				this.store.state.isPending || s(He, this).call(this, { nextExecutionTime: void 0 });
			}, s(We, this).call(this));
		}), o(this, Ke, () => {
			s(Ve, this) && (clearTimeout(s(Ve, this)), i(Ve, this, void 0));
		}), this.fn = e, this.store = new Be(qe()), this.setOptions = (e) => {
			this.options = {
				...this.options,
				...e
			}, s(Ue, this).call(this) || this.cancel();
		}, this.maybeExecute = (...e) => {
			s(He, this).call(this, { maybeExecuteCount: this.store.state.maybeExecuteCount + 1 });
			let t = Date.now(), n = t - this.store.state.lastExecutionTime, r = s(We, this).call(this);
			if (this.options.leading && n >= r) s(Ge, this).call(this, ...e);
			else if (s(He, this).call(this, { lastArgs: e }), !s(Ve, this) && this.options.trailing) {
				let e = r - (this.store.state.lastExecutionTime ? t - this.store.state.lastExecutionTime : 0);
				s(He, this).call(this, { isPending: !0 }), i(Ve, this, setTimeout(() => {
					let { lastArgs: e } = this.store.state;
					e !== void 0 && s(Ge, this).call(this, ...e);
				}, e));
			}
		}, this.flush = () => {
			this.store.state.isPending && this.store.state.lastArgs && s(Ge, this).call(this, ...this.store.state.lastArgs);
		}, this.cancel = () => {
			s(Ke, this).call(this), s(He, this).call(this, {
				lastArgs: void 0,
				isPending: !1
			});
		}, this.reset = () => {
			s(He, this).call(this, qe());
		}, this.key = t.key, this.options = {
			...Je,
			...t
		}, s(He, this).call(this, this.options.initialState ?? {}), this.key && xe.on("d-Throttler", (e) => {
			e.payload.key === this.key && (s(He, this).call(this, e.payload.store.state), this.setOptions(e.payload.options));
		});
	}
}), Xe;
(function(e) {
	e.assertEqual = (e) => {};
	function t(e) {}
	e.assertIs = t;
	function n(e) {
		throw Error();
	}
	e.assertNever = n, e.arrayToEnum = (e) => {
		let t = {};
		for (let n of e) t[n] = n;
		return t;
	}, e.getValidEnumValues = (t) => {
		let n = e.objectKeys(t).filter((e) => typeof t[t[e]] != "number"), r = {};
		for (let e of n) r[e] = t[e];
		return e.objectValues(r);
	}, e.objectValues = (t) => e.objectKeys(t).map(function(e) {
		return t[e];
	}), e.objectKeys = typeof Object.keys == "function" ? (e) => Object.keys(e) : (e) => {
		let t = [];
		for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
		return t;
	}, e.find = (e, t) => {
		for (let n of e) if (t(n)) return n;
	}, e.isInteger = typeof Number.isInteger == "function" ? (e) => Number.isInteger(e) : (e) => typeof e == "number" && Number.isFinite(e) && Math.floor(e) === e;
	function r(e, t = " | ") {
		return e.map((e) => typeof e == "string" ? `'${e}'` : e).join(t);
	}
	e.joinValues = r, e.jsonStringifyReplacer = (e, t) => typeof t == "bigint" ? t.toString() : t;
})(Xe || (Xe = {}));
var Ze;
(function(e) {
	e.mergeShapes = (e, t) => ({
		...e,
		...t
	});
})(Ze || (Ze = {}));
var g = Xe.arrayToEnum([
	"string",
	"nan",
	"number",
	"integer",
	"float",
	"boolean",
	"date",
	"bigint",
	"symbol",
	"function",
	"undefined",
	"null",
	"array",
	"object",
	"unknown",
	"promise",
	"void",
	"never",
	"map",
	"set"
]), Qe = (e) => {
	switch (typeof e) {
		case "undefined": return g.undefined;
		case "string": return g.string;
		case "number": return Number.isNaN(e) ? g.nan : g.number;
		case "boolean": return g.boolean;
		case "function": return g.function;
		case "bigint": return g.bigint;
		case "symbol": return g.symbol;
		case "object": return Array.isArray(e) ? g.array : e === null ? g.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? g.promise : typeof Map < "u" && e instanceof Map ? g.map : typeof Set < "u" && e instanceof Set ? g.set : typeof Date < "u" && e instanceof Date ? g.date : g.object;
		default: return g.unknown;
	}
}, _ = Xe.arrayToEnum([
	"invalid_type",
	"invalid_literal",
	"custom",
	"invalid_union",
	"invalid_union_discriminator",
	"invalid_enum_value",
	"unrecognized_keys",
	"invalid_arguments",
	"invalid_return_type",
	"invalid_date",
	"invalid_string",
	"too_small",
	"too_big",
	"invalid_intersection_types",
	"not_multiple_of",
	"not_finite"
]), $e = class e extends Error {
	get errors() {
		return this.issues;
	}
	constructor(e) {
		super(), this.issues = [], this.addIssue = (e) => {
			this.issues = [...this.issues, e];
		}, this.addIssues = (e = []) => {
			this.issues = [...this.issues, ...e];
		};
		let t = new.target.prototype;
		Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
	}
	format(e) {
		let t = e || function(e) {
			return e.message;
		}, n = { _errors: [] }, r = (e) => {
			for (let i of e.issues) if (i.code === "invalid_union") i.unionErrors.map(r);
			else if (i.code === "invalid_return_type") r(i.returnTypeError);
			else if (i.code === "invalid_arguments") r(i.argumentsError);
			else if (i.path.length === 0) n._errors.push(t(i));
			else {
				let e = n, r = 0;
				for (; r < i.path.length;) {
					let n = i.path[r];
					r === i.path.length - 1 ? (e[n] = e[n] || { _errors: [] }, e[n]._errors.push(t(i))) : e[n] = e[n] || { _errors: [] }, e = e[n], r++;
				}
			}
		};
		return r(this), n;
	}
	static assert(t) {
		if (!(t instanceof e)) throw Error(`Not a ZodError: ${t}`);
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, Xe.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(e = (e) => e.message) {
		let t = {}, n = [];
		for (let r of this.issues) if (r.path.length > 0) {
			let n = r.path[0];
			t[n] = t[n] || [], t[n].push(e(r));
		} else n.push(e(r));
		return {
			formErrors: n,
			fieldErrors: t
		};
	}
	get formErrors() {
		return this.flatten();
	}
};
$e.create = (e) => new $e(e);
//#endregion
//#region node_modules/@ag-ui/core/node_modules/zod/v3/locales/en.js
var et = (e, t) => {
	let n;
	switch (e.code) {
		case _.invalid_type:
			n = e.received === g.undefined ? "Required" : `Expected ${e.expected}, received ${e.received}`;
			break;
		case _.invalid_literal:
			n = `Invalid literal value, expected ${JSON.stringify(e.expected, Xe.jsonStringifyReplacer)}`;
			break;
		case _.unrecognized_keys:
			n = `Unrecognized key(s) in object: ${Xe.joinValues(e.keys, ", ")}`;
			break;
		case _.invalid_union:
			n = "Invalid input";
			break;
		case _.invalid_union_discriminator:
			n = `Invalid discriminator value. Expected ${Xe.joinValues(e.options)}`;
			break;
		case _.invalid_enum_value:
			n = `Invalid enum value. Expected ${Xe.joinValues(e.options)}, received '${e.received}'`;
			break;
		case _.invalid_arguments:
			n = "Invalid function arguments";
			break;
		case _.invalid_return_type:
			n = "Invalid function return type";
			break;
		case _.invalid_date:
			n = "Invalid date";
			break;
		case _.invalid_string:
			typeof e.validation == "object" ? "includes" in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : Xe.assertNever(e.validation) : n = e.validation === "regex" ? "Invalid" : `Invalid ${e.validation}`;
			break;
		case _.too_small:
			n = e.type === "array" ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" || e.type === "bigint" ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : "Invalid input";
			break;
		case _.too_big:
			n = e.type === "array" ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : "Invalid input";
			break;
		case _.custom:
			n = "Invalid input";
			break;
		case _.invalid_intersection_types:
			n = "Intersection results could not be merged";
			break;
		case _.not_multiple_of:
			n = `Number must be a multiple of ${e.multipleOf}`;
			break;
		case _.not_finite:
			n = "Number must be finite";
			break;
		default: n = t.defaultError, Xe.assertNever(e);
	}
	return { message: n };
}, tt = et;
function nt() {
	return tt;
}
//#endregion
//#region node_modules/@ag-ui/core/node_modules/zod/v3/helpers/parseUtil.js
var rt = (e) => {
	let { data: t, path: n, errorMaps: r, issueData: i } = e, a = [...n, ...i.path || []], o = {
		...i,
		path: a
	};
	if (i.message !== void 0) return {
		...i,
		path: a,
		message: i.message
	};
	let s = "", c = r.filter((e) => !!e).slice().reverse();
	for (let e of c) s = e(o, {
		data: t,
		defaultError: s
	}).message;
	return {
		...i,
		path: a,
		message: s
	};
};
function v(e, t) {
	let n = nt(), r = rt({
		issueData: t,
		data: e.data,
		path: e.path,
		errorMaps: [
			e.common.contextualErrorMap,
			e.schemaErrorMap,
			n,
			n === et ? void 0 : et
		].filter((e) => !!e)
	});
	e.common.issues.push(r);
}
var it = class e {
	constructor() {
		this.value = "valid";
	}
	dirty() {
		this.value === "valid" && (this.value = "dirty");
	}
	abort() {
		this.value !== "aborted" && (this.value = "aborted");
	}
	static mergeArray(e, t) {
		let n = [];
		for (let r of t) {
			if (r.status === "aborted") return y;
			r.status === "dirty" && e.dirty(), n.push(r.value);
		}
		return {
			status: e.value,
			value: n
		};
	}
	static async mergeObjectAsync(t, n) {
		let r = [];
		for (let e of n) {
			let t = await e.key, n = await e.value;
			r.push({
				key: t,
				value: n
			});
		}
		return e.mergeObjectSync(t, r);
	}
	static mergeObjectSync(e, t) {
		let n = {};
		for (let r of t) {
			let { key: t, value: i } = r;
			if (t.status === "aborted" || i.status === "aborted") return y;
			t.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), t.value !== "__proto__" && (i.value !== void 0 || r.alwaysSet) && (n[t.value] = i.value);
		}
		return {
			status: e.value,
			value: n
		};
	}
}, y = Object.freeze({ status: "aborted" }), at = (e) => ({
	status: "dirty",
	value: e
}), ot = (e) => ({
	status: "valid",
	value: e
}), st = (e) => e.status === "aborted", ct = (e) => e.status === "dirty", lt = (e) => e.status === "valid", ut = (e) => typeof Promise < "u" && e instanceof Promise, b;
(function(e) {
	e.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, e.toString = (e) => typeof e == "string" ? e : e?.message;
})(b || (b = {}));
//#endregion
//#region node_modules/@ag-ui/core/node_modules/zod/v3/types.js
var dt = class {
	constructor(e, t, n, r) {
		this._cachedPath = [], this.parent = e, this.data = t, this._path = n, this._key = r;
	}
	get path() {
		return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
	}
}, ft = (e, t) => {
	if (lt(t)) return {
		success: !0,
		data: t.value
	};
	if (!e.common.issues.length) throw Error("Validation failed but no issues detected.");
	return {
		success: !1,
		get error() {
			if (this._error) return this._error;
			let t = new $e(e.common.issues);
			return this._error = t, this._error;
		}
	};
};
function x(e) {
	if (!e) return {};
	let { errorMap: t, invalid_type_error: n, required_error: r, description: i } = e;
	if (t && (n || r)) throw Error("Can't use \"invalid_type_error\" or \"required_error\" in conjunction with custom error map.");
	return t ? {
		errorMap: t,
		description: i
	} : {
		errorMap: (t, i) => {
			let { message: a } = e;
			return t.code === "invalid_enum_value" ? { message: a ?? i.defaultError } : i.data === void 0 ? { message: a ?? r ?? i.defaultError } : t.code === "invalid_type" ? { message: a ?? n ?? i.defaultError } : { message: i.defaultError };
		},
		description: i
	};
}
var S = class {
	get description() {
		return this._def.description;
	}
	_getType(e) {
		return Qe(e.data);
	}
	_getOrReturnCtx(e, t) {
		return t || {
			common: e.parent.common,
			data: e.data,
			parsedType: Qe(e.data),
			schemaErrorMap: this._def.errorMap,
			path: e.path,
			parent: e.parent
		};
	}
	_processInputParams(e) {
		return {
			status: new it(),
			ctx: {
				common: e.parent.common,
				data: e.data,
				parsedType: Qe(e.data),
				schemaErrorMap: this._def.errorMap,
				path: e.path,
				parent: e.parent
			}
		};
	}
	_parseSync(e) {
		let t = this._parse(e);
		if (ut(t)) throw Error("Synchronous parse encountered promise.");
		return t;
	}
	_parseAsync(e) {
		let t = this._parse(e);
		return Promise.resolve(t);
	}
	parse(e, t) {
		let n = this.safeParse(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	safeParse(e, t) {
		let n = {
			common: {
				issues: [],
				async: t?.async ?? !1,
				contextualErrorMap: t?.errorMap
			},
			path: t?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: Qe(e)
		};
		return ft(n, this._parseSync({
			data: e,
			path: n.path,
			parent: n
		}));
	}
	"~validate"(e) {
		let t = {
			common: {
				issues: [],
				async: !!this["~standard"].async
			},
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: Qe(e)
		};
		if (!this["~standard"].async) try {
			let n = this._parseSync({
				data: e,
				path: [],
				parent: t
			});
			return lt(n) ? { value: n.value } : { issues: t.common.issues };
		} catch (e) {
			e?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = !0), t.common = {
				issues: [],
				async: !0
			};
		}
		return this._parseAsync({
			data: e,
			path: [],
			parent: t
		}).then((e) => lt(e) ? { value: e.value } : { issues: t.common.issues });
	}
	async parseAsync(e, t) {
		let n = await this.safeParseAsync(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	async safeParseAsync(e, t) {
		let n = {
			common: {
				issues: [],
				contextualErrorMap: t?.errorMap,
				async: !0
			},
			path: t?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: Qe(e)
		}, r = this._parse({
			data: e,
			path: n.path,
			parent: n
		});
		return ft(n, await (ut(r) ? r : Promise.resolve(r)));
	}
	refine(e, t) {
		let n = (e) => typeof t == "string" || t === void 0 ? { message: t } : typeof t == "function" ? t(e) : t;
		return this._refinement((t, r) => {
			let i = e(t), a = () => r.addIssue({
				code: _.custom,
				...n(t)
			});
			return typeof Promise < "u" && i instanceof Promise ? i.then((e) => e ? !0 : (a(), !1)) : i ? !0 : (a(), !1);
		});
	}
	refinement(e, t) {
		return this._refinement((n, r) => e(n) ? !0 : (r.addIssue(typeof t == "function" ? t(n, r) : t), !1));
	}
	_refinement(e) {
		return new gn({
			schema: this,
			typeName: C.ZodEffects,
			effect: {
				type: "refinement",
				refinement: e
			}
		});
	}
	superRefine(e) {
		return this._refinement(e);
	}
	constructor(e) {
		this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
			version: 1,
			vendor: "zod",
			validate: (e) => this["~validate"](e)
		};
	}
	optional() {
		return _n.create(this, this._def);
	}
	nullable() {
		return vn.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return Xt.create(this);
	}
	promise() {
		return hn.create(this, this._def);
	}
	or(e) {
		return $t.create([this, e], this._def);
	}
	and(e) {
		return rn.create(this, e, this._def);
	}
	transform(e) {
		return new gn({
			...x(this._def),
			schema: this,
			typeName: C.ZodEffects,
			effect: {
				type: "transform",
				transform: e
			}
		});
	}
	default(e) {
		let t = typeof e == "function" ? e : () => e;
		return new yn({
			...x(this._def),
			innerType: this,
			defaultValue: t,
			typeName: C.ZodDefault
		});
	}
	brand() {
		return new Sn({
			typeName: C.ZodBranded,
			type: this,
			...x(this._def)
		});
	}
	catch(e) {
		let t = typeof e == "function" ? e : () => e;
		return new bn({
			...x(this._def),
			innerType: this,
			catchValue: t,
			typeName: C.ZodCatch
		});
	}
	describe(e) {
		let t = this.constructor;
		return new t({
			...this._def,
			description: e
		});
	}
	pipe(e) {
		return Cn.create(this, e);
	}
	readonly() {
		return wn.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
}, pt = /^c[^\s-]{8,}$/i, mt = /^[0-9a-z]+$/, ht = /^[0-9A-HJKMNP-TV-Z]{26}$/i, gt = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, _t = /^[a-z0-9_-]{21}$/i, vt = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, yt = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, bt = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, xt = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", St, Ct = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, wt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Tt = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Et = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Dt = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Ot = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, kt = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", At = RegExp(`^${kt}$`);
function jt(e) {
	let t = "[0-5]\\d";
	e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision ?? (t = `${t}(\\.\\d+)?`);
	let n = e.precision ? "+" : "?";
	return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${n}`;
}
function Mt(e) {
	return RegExp(`^${jt(e)}$`);
}
function Nt(e) {
	let t = `${kt}T${jt(e)}`, n = [];
	return n.push(e.local ? "Z?" : "Z"), e.offset && n.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${n.join("|")})`, RegExp(`^${t}$`);
}
function Pt(e, t) {
	return !((t !== "v4" && t || !Ct.test(e)) && (t !== "v6" && t || !Tt.test(e)));
}
function Ft(e, t) {
	if (!vt.test(e)) return !1;
	try {
		let [n] = e.split(".");
		if (!n) return !1;
		let r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), i = JSON.parse(atob(r));
		return !(typeof i != "object" || !i || "typ" in i && i?.typ !== "JWT" || !i.alg || t && i.alg !== t);
	} catch {
		return !1;
	}
}
function It(e, t) {
	return !((t !== "v4" && t || !wt.test(e)) && (t !== "v6" && t || !Et.test(e)));
}
var Lt = class e extends S {
	_parse(e) {
		if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== g.string) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: _.invalid_type,
				expected: g.string,
				received: t.parsedType
			}), y;
		}
		let t = new it(), n;
		for (let r of this._def.checks) if (r.kind === "min") e.data.length < r.value && (n = this._getOrReturnCtx(e, n), v(n, {
			code: _.too_small,
			minimum: r.value,
			type: "string",
			inclusive: !0,
			exact: !1,
			message: r.message
		}), t.dirty());
		else if (r.kind === "max") e.data.length > r.value && (n = this._getOrReturnCtx(e, n), v(n, {
			code: _.too_big,
			maximum: r.value,
			type: "string",
			inclusive: !0,
			exact: !1,
			message: r.message
		}), t.dirty());
		else if (r.kind === "length") {
			let i = e.data.length > r.value, a = e.data.length < r.value;
			(i || a) && (n = this._getOrReturnCtx(e, n), i ? v(n, {
				code: _.too_big,
				maximum: r.value,
				type: "string",
				inclusive: !0,
				exact: !0,
				message: r.message
			}) : a && v(n, {
				code: _.too_small,
				minimum: r.value,
				type: "string",
				inclusive: !0,
				exact: !0,
				message: r.message
			}), t.dirty());
		} else if (r.kind === "email") bt.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "email",
			code: _.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "emoji") St || (St = new RegExp(xt, "u")), St.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "emoji",
			code: _.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "uuid") gt.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "uuid",
			code: _.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "nanoid") _t.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "nanoid",
			code: _.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "cuid") pt.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "cuid",
			code: _.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "cuid2") mt.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "cuid2",
			code: _.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "ulid") ht.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "ulid",
			code: _.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "url") try {
			new URL(e.data);
		} catch {
			n = this._getOrReturnCtx(e, n), v(n, {
				validation: "url",
				code: _.invalid_string,
				message: r.message
			}), t.dirty();
		}
		else r.kind === "regex" ? (r.regex.lastIndex = 0, r.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "regex",
			code: _.invalid_string,
			message: r.message
		}), t.dirty())) : r.kind === "trim" ? e.data = e.data.trim() : r.kind === "includes" ? e.data.includes(r.value, r.position) || (n = this._getOrReturnCtx(e, n), v(n, {
			code: _.invalid_string,
			validation: {
				includes: r.value,
				position: r.position
			},
			message: r.message
		}), t.dirty()) : r.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : r.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : r.kind === "startsWith" ? e.data.startsWith(r.value) || (n = this._getOrReturnCtx(e, n), v(n, {
			code: _.invalid_string,
			validation: { startsWith: r.value },
			message: r.message
		}), t.dirty()) : r.kind === "endsWith" ? e.data.endsWith(r.value) || (n = this._getOrReturnCtx(e, n), v(n, {
			code: _.invalid_string,
			validation: { endsWith: r.value },
			message: r.message
		}), t.dirty()) : r.kind === "datetime" ? Nt(r).test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			code: _.invalid_string,
			validation: "datetime",
			message: r.message
		}), t.dirty()) : r.kind === "date" ? At.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			code: _.invalid_string,
			validation: "date",
			message: r.message
		}), t.dirty()) : r.kind === "time" ? Mt(r).test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			code: _.invalid_string,
			validation: "time",
			message: r.message
		}), t.dirty()) : r.kind === "duration" ? yt.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "duration",
			code: _.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "ip" ? Pt(e.data, r.version) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "ip",
			code: _.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "jwt" ? Ft(e.data, r.alg) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "jwt",
			code: _.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "cidr" ? It(e.data, r.version) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "cidr",
			code: _.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "base64" ? Dt.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "base64",
			code: _.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "base64url" ? Ot.test(e.data) || (n = this._getOrReturnCtx(e, n), v(n, {
			validation: "base64url",
			code: _.invalid_string,
			message: r.message
		}), t.dirty()) : Xe.assertNever(r);
		return {
			status: t.value,
			value: e.data
		};
	}
	_regex(e, t, n) {
		return this.refinement((t) => e.test(t), {
			validation: t,
			code: _.invalid_string,
			...b.errToObj(n)
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	email(e) {
		return this._addCheck({
			kind: "email",
			...b.errToObj(e)
		});
	}
	url(e) {
		return this._addCheck({
			kind: "url",
			...b.errToObj(e)
		});
	}
	emoji(e) {
		return this._addCheck({
			kind: "emoji",
			...b.errToObj(e)
		});
	}
	uuid(e) {
		return this._addCheck({
			kind: "uuid",
			...b.errToObj(e)
		});
	}
	nanoid(e) {
		return this._addCheck({
			kind: "nanoid",
			...b.errToObj(e)
		});
	}
	cuid(e) {
		return this._addCheck({
			kind: "cuid",
			...b.errToObj(e)
		});
	}
	cuid2(e) {
		return this._addCheck({
			kind: "cuid2",
			...b.errToObj(e)
		});
	}
	ulid(e) {
		return this._addCheck({
			kind: "ulid",
			...b.errToObj(e)
		});
	}
	base64(e) {
		return this._addCheck({
			kind: "base64",
			...b.errToObj(e)
		});
	}
	base64url(e) {
		return this._addCheck({
			kind: "base64url",
			...b.errToObj(e)
		});
	}
	jwt(e) {
		return this._addCheck({
			kind: "jwt",
			...b.errToObj(e)
		});
	}
	ip(e) {
		return this._addCheck({
			kind: "ip",
			...b.errToObj(e)
		});
	}
	cidr(e) {
		return this._addCheck({
			kind: "cidr",
			...b.errToObj(e)
		});
	}
	datetime(e) {
		return typeof e == "string" ? this._addCheck({
			kind: "datetime",
			precision: null,
			offset: !1,
			local: !1,
			message: e
		}) : this._addCheck({
			kind: "datetime",
			precision: e?.precision === void 0 ? null : e?.precision,
			offset: e?.offset ?? !1,
			local: e?.local ?? !1,
			...b.errToObj(e?.message)
		});
	}
	date(e) {
		return this._addCheck({
			kind: "date",
			message: e
		});
	}
	time(e) {
		return typeof e == "string" ? this._addCheck({
			kind: "time",
			precision: null,
			message: e
		}) : this._addCheck({
			kind: "time",
			precision: e?.precision === void 0 ? null : e?.precision,
			...b.errToObj(e?.message)
		});
	}
	duration(e) {
		return this._addCheck({
			kind: "duration",
			...b.errToObj(e)
		});
	}
	regex(e, t) {
		return this._addCheck({
			kind: "regex",
			regex: e,
			...b.errToObj(t)
		});
	}
	includes(e, t) {
		return this._addCheck({
			kind: "includes",
			value: e,
			position: t?.position,
			...b.errToObj(t?.message)
		});
	}
	startsWith(e, t) {
		return this._addCheck({
			kind: "startsWith",
			value: e,
			...b.errToObj(t)
		});
	}
	endsWith(e, t) {
		return this._addCheck({
			kind: "endsWith",
			value: e,
			...b.errToObj(t)
		});
	}
	min(e, t) {
		return this._addCheck({
			kind: "min",
			value: e,
			...b.errToObj(t)
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: "max",
			value: e,
			...b.errToObj(t)
		});
	}
	length(e, t) {
		return this._addCheck({
			kind: "length",
			value: e,
			...b.errToObj(t)
		});
	}
	nonempty(e) {
		return this.min(1, b.errToObj(e));
	}
	trim() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }]
		});
	}
	toLowerCase() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }]
		});
	}
	toUpperCase() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "toUpperCase" }]
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((e) => e.kind === "datetime");
	}
	get isDate() {
		return !!this._def.checks.find((e) => e.kind === "date");
	}
	get isTime() {
		return !!this._def.checks.find((e) => e.kind === "time");
	}
	get isDuration() {
		return !!this._def.checks.find((e) => e.kind === "duration");
	}
	get isEmail() {
		return !!this._def.checks.find((e) => e.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((e) => e.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((e) => e.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((e) => e.kind === "uuid");
	}
	get isNANOID() {
		return !!this._def.checks.find((e) => e.kind === "nanoid");
	}
	get isCUID() {
		return !!this._def.checks.find((e) => e.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((e) => e.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((e) => e.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((e) => e.kind === "ip");
	}
	get isCIDR() {
		return !!this._def.checks.find((e) => e.kind === "cidr");
	}
	get isBase64() {
		return !!this._def.checks.find((e) => e.kind === "base64");
	}
	get isBase64url() {
		return !!this._def.checks.find((e) => e.kind === "base64url");
	}
	get minLength() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxLength() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
Lt.create = (e) => new Lt({
	checks: [],
	typeName: C.ZodString,
	coerce: e?.coerce ?? !1,
	...x(e)
});
function Rt(e, t) {
	let n = (e.toString().split(".")[1] || "").length, r = (t.toString().split(".")[1] || "").length, i = n > r ? n : r;
	return Number.parseInt(e.toFixed(i).replace(".", "")) % Number.parseInt(t.toFixed(i).replace(".", "")) / 10 ** i;
}
var zt = class e extends S {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
	}
	_parse(e) {
		if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== g.number) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: _.invalid_type,
				expected: g.number,
				received: t.parsedType
			}), y;
		}
		let t, n = new it();
		for (let r of this._def.checks) r.kind === "int" ? Xe.isInteger(e.data) || (t = this._getOrReturnCtx(e, t), v(t, {
			code: _.invalid_type,
			expected: "integer",
			received: "float",
			message: r.message
		}), n.dirty()) : r.kind === "min" ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), v(t, {
			code: _.too_small,
			minimum: r.value,
			type: "number",
			inclusive: r.inclusive,
			exact: !1,
			message: r.message
		}), n.dirty()) : r.kind === "max" ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), v(t, {
			code: _.too_big,
			maximum: r.value,
			type: "number",
			inclusive: r.inclusive,
			exact: !1,
			message: r.message
		}), n.dirty()) : r.kind === "multipleOf" ? Rt(e.data, r.value) !== 0 && (t = this._getOrReturnCtx(e, t), v(t, {
			code: _.not_multiple_of,
			multipleOf: r.value,
			message: r.message
		}), n.dirty()) : r.kind === "finite" ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t), v(t, {
			code: _.not_finite,
			message: r.message
		}), n.dirty()) : Xe.assertNever(r);
		return {
			status: n.value,
			value: e.data
		};
	}
	gte(e, t) {
		return this.setLimit("min", e, !0, b.toString(t));
	}
	gt(e, t) {
		return this.setLimit("min", e, !1, b.toString(t));
	}
	lte(e, t) {
		return this.setLimit("max", e, !0, b.toString(t));
	}
	lt(e, t) {
		return this.setLimit("max", e, !1, b.toString(t));
	}
	setLimit(t, n, r, i) {
		return new e({
			...this._def,
			checks: [...this._def.checks, {
				kind: t,
				value: n,
				inclusive: r,
				message: b.toString(i)
			}]
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	int(e) {
		return this._addCheck({
			kind: "int",
			message: b.toString(e)
		});
	}
	positive(e) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !1,
			message: b.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !1,
			message: b.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !0,
			message: b.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !0,
			message: b.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: "multipleOf",
			value: e,
			message: b.toString(t)
		});
	}
	finite(e) {
		return this._addCheck({
			kind: "finite",
			message: b.toString(e)
		});
	}
	safe(e) {
		return this._addCheck({
			kind: "min",
			inclusive: !0,
			value: -(2 ** 53 - 1),
			message: b.toString(e)
		})._addCheck({
			kind: "max",
			inclusive: !0,
			value: 2 ** 53 - 1,
			message: b.toString(e)
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
	get isInt() {
		return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && Xe.isInteger(e.value));
	}
	get isFinite() {
		let e = null, t = null;
		for (let n of this._def.checks) if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf") return !0;
		else n.kind === "min" ? (t === null || n.value > t) && (t = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
		return Number.isFinite(t) && Number.isFinite(e);
	}
};
zt.create = (e) => new zt({
	checks: [],
	typeName: C.ZodNumber,
	coerce: e?.coerce || !1,
	...x(e)
});
var Bt = class e extends S {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte;
	}
	_parse(e) {
		if (this._def.coerce) try {
			e.data = BigInt(e.data);
		} catch {
			return this._getInvalidInput(e);
		}
		if (this._getType(e) !== g.bigint) return this._getInvalidInput(e);
		let t, n = new it();
		for (let r of this._def.checks) r.kind === "min" ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), v(t, {
			code: _.too_small,
			type: "bigint",
			minimum: r.value,
			inclusive: r.inclusive,
			message: r.message
		}), n.dirty()) : r.kind === "max" ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), v(t, {
			code: _.too_big,
			type: "bigint",
			maximum: r.value,
			inclusive: r.inclusive,
			message: r.message
		}), n.dirty()) : r.kind === "multipleOf" ? e.data % r.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t), v(t, {
			code: _.not_multiple_of,
			multipleOf: r.value,
			message: r.message
		}), n.dirty()) : Xe.assertNever(r);
		return {
			status: n.value,
			value: e.data
		};
	}
	_getInvalidInput(e) {
		let t = this._getOrReturnCtx(e);
		return v(t, {
			code: _.invalid_type,
			expected: g.bigint,
			received: t.parsedType
		}), y;
	}
	gte(e, t) {
		return this.setLimit("min", e, !0, b.toString(t));
	}
	gt(e, t) {
		return this.setLimit("min", e, !1, b.toString(t));
	}
	lte(e, t) {
		return this.setLimit("max", e, !0, b.toString(t));
	}
	lt(e, t) {
		return this.setLimit("max", e, !1, b.toString(t));
	}
	setLimit(t, n, r, i) {
		return new e({
			...this._def,
			checks: [...this._def.checks, {
				kind: t,
				value: n,
				inclusive: r,
				message: b.toString(i)
			}]
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	positive(e) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !1,
			message: b.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !1,
			message: b.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !0,
			message: b.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !0,
			message: b.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: "multipleOf",
			value: e,
			message: b.toString(t)
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
Bt.create = (e) => new Bt({
	checks: [],
	typeName: C.ZodBigInt,
	coerce: e?.coerce ?? !1,
	...x(e)
});
var Vt = class extends S {
	_parse(e) {
		if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== g.boolean) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: _.invalid_type,
				expected: g.boolean,
				received: t.parsedType
			}), y;
		}
		return ot(e.data);
	}
};
Vt.create = (e) => new Vt({
	typeName: C.ZodBoolean,
	coerce: e?.coerce || !1,
	...x(e)
});
var Ht = class e extends S {
	_parse(e) {
		if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== g.date) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: _.invalid_type,
				expected: g.date,
				received: t.parsedType
			}), y;
		}
		if (Number.isNaN(e.data.getTime())) return v(this._getOrReturnCtx(e), { code: _.invalid_date }), y;
		let t = new it(), n;
		for (let r of this._def.checks) r.kind === "min" ? e.data.getTime() < r.value && (n = this._getOrReturnCtx(e, n), v(n, {
			code: _.too_small,
			message: r.message,
			inclusive: !0,
			exact: !1,
			minimum: r.value,
			type: "date"
		}), t.dirty()) : r.kind === "max" ? e.data.getTime() > r.value && (n = this._getOrReturnCtx(e, n), v(n, {
			code: _.too_big,
			message: r.message,
			inclusive: !0,
			exact: !1,
			maximum: r.value,
			type: "date"
		}), t.dirty()) : Xe.assertNever(r);
		return {
			status: t.value,
			value: new Date(e.data.getTime())
		};
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	min(e, t) {
		return this._addCheck({
			kind: "min",
			value: e.getTime(),
			message: b.toString(t)
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: "max",
			value: e.getTime(),
			message: b.toString(t)
		});
	}
	get minDate() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e == null ? null : new Date(e);
	}
	get maxDate() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e == null ? null : new Date(e);
	}
};
Ht.create = (e) => new Ht({
	checks: [],
	coerce: e?.coerce || !1,
	typeName: C.ZodDate,
	...x(e)
});
var Ut = class extends S {
	_parse(e) {
		if (this._getType(e) !== g.symbol) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: _.invalid_type,
				expected: g.symbol,
				received: t.parsedType
			}), y;
		}
		return ot(e.data);
	}
};
Ut.create = (e) => new Ut({
	typeName: C.ZodSymbol,
	...x(e)
});
var Wt = class extends S {
	_parse(e) {
		if (this._getType(e) !== g.undefined) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: _.invalid_type,
				expected: g.undefined,
				received: t.parsedType
			}), y;
		}
		return ot(e.data);
	}
};
Wt.create = (e) => new Wt({
	typeName: C.ZodUndefined,
	...x(e)
});
var Gt = class extends S {
	_parse(e) {
		if (this._getType(e) !== g.null) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: _.invalid_type,
				expected: g.null,
				received: t.parsedType
			}), y;
		}
		return ot(e.data);
	}
};
Gt.create = (e) => new Gt({
	typeName: C.ZodNull,
	...x(e)
});
var Kt = class extends S {
	constructor() {
		super(...arguments), this._any = !0;
	}
	_parse(e) {
		return ot(e.data);
	}
};
Kt.create = (e) => new Kt({
	typeName: C.ZodAny,
	...x(e)
});
var qt = class extends S {
	constructor() {
		super(...arguments), this._unknown = !0;
	}
	_parse(e) {
		return ot(e.data);
	}
};
qt.create = (e) => new qt({
	typeName: C.ZodUnknown,
	...x(e)
});
var Jt = class extends S {
	_parse(e) {
		let t = this._getOrReturnCtx(e);
		return v(t, {
			code: _.invalid_type,
			expected: g.never,
			received: t.parsedType
		}), y;
	}
};
Jt.create = (e) => new Jt({
	typeName: C.ZodNever,
	...x(e)
});
var Yt = class extends S {
	_parse(e) {
		if (this._getType(e) !== g.undefined) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: _.invalid_type,
				expected: g.void,
				received: t.parsedType
			}), y;
		}
		return ot(e.data);
	}
};
Yt.create = (e) => new Yt({
	typeName: C.ZodVoid,
	...x(e)
});
var Xt = class e extends S {
	_parse(e) {
		let { ctx: t, status: n } = this._processInputParams(e), r = this._def;
		if (t.parsedType !== g.array) return v(t, {
			code: _.invalid_type,
			expected: g.array,
			received: t.parsedType
		}), y;
		if (r.exactLength !== null) {
			let e = t.data.length > r.exactLength.value, i = t.data.length < r.exactLength.value;
			(e || i) && (v(t, {
				code: e ? _.too_big : _.too_small,
				minimum: i ? r.exactLength.value : void 0,
				maximum: e ? r.exactLength.value : void 0,
				type: "array",
				inclusive: !0,
				exact: !0,
				message: r.exactLength.message
			}), n.dirty());
		}
		if (r.minLength !== null && t.data.length < r.minLength.value && (v(t, {
			code: _.too_small,
			minimum: r.minLength.value,
			type: "array",
			inclusive: !0,
			exact: !1,
			message: r.minLength.message
		}), n.dirty()), r.maxLength !== null && t.data.length > r.maxLength.value && (v(t, {
			code: _.too_big,
			maximum: r.maxLength.value,
			type: "array",
			inclusive: !0,
			exact: !1,
			message: r.maxLength.message
		}), n.dirty()), t.common.async) return Promise.all([...t.data].map((e, n) => r.type._parseAsync(new dt(t, e, t.path, n)))).then((e) => it.mergeArray(n, e));
		let i = [...t.data].map((e, n) => r.type._parseSync(new dt(t, e, t.path, n)));
		return it.mergeArray(n, i);
	}
	get element() {
		return this._def.type;
	}
	min(t, n) {
		return new e({
			...this._def,
			minLength: {
				value: t,
				message: b.toString(n)
			}
		});
	}
	max(t, n) {
		return new e({
			...this._def,
			maxLength: {
				value: t,
				message: b.toString(n)
			}
		});
	}
	length(t, n) {
		return new e({
			...this._def,
			exactLength: {
				value: t,
				message: b.toString(n)
			}
		});
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
Xt.create = (e, t) => new Xt({
	type: e,
	minLength: null,
	maxLength: null,
	exactLength: null,
	typeName: C.ZodArray,
	...x(t)
});
function Zt(e) {
	if (e instanceof Qt) {
		let t = {};
		for (let n in e.shape) {
			let r = e.shape[n];
			t[n] = _n.create(Zt(r));
		}
		return new Qt({
			...e._def,
			shape: () => t
		});
	}
	return e instanceof Xt ? new Xt({
		...e._def,
		type: Zt(e.element)
	}) : e instanceof _n ? _n.create(Zt(e.unwrap())) : e instanceof vn ? vn.create(Zt(e.unwrap())) : e instanceof an ? an.create(e.items.map((e) => Zt(e))) : e;
}
var Qt = class e extends S {
	constructor() {
		super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		let e = this._def.shape(), t = Xe.objectKeys(e);
		return this._cached = {
			shape: e,
			keys: t
		}, this._cached;
	}
	_parse(e) {
		if (this._getType(e) !== g.object) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: _.invalid_type,
				expected: g.object,
				received: t.parsedType
			}), y;
		}
		let { status: t, ctx: n } = this._processInputParams(e), { shape: r, keys: i } = this._getCached(), a = [];
		if (!(this._def.catchall instanceof Jt && this._def.unknownKeys === "strip")) for (let e in n.data) i.includes(e) || a.push(e);
		let o = [];
		for (let e of i) {
			let t = r[e], i = n.data[e];
			o.push({
				key: {
					status: "valid",
					value: e
				},
				value: t._parse(new dt(n, i, n.path, e)),
				alwaysSet: e in n.data
			});
		}
		if (this._def.catchall instanceof Jt) {
			let e = this._def.unknownKeys;
			if (e === "passthrough") for (let e of a) o.push({
				key: {
					status: "valid",
					value: e
				},
				value: {
					status: "valid",
					value: n.data[e]
				}
			});
			else if (e === "strict") a.length > 0 && (v(n, {
				code: _.unrecognized_keys,
				keys: a
			}), t.dirty());
			else if (e !== "strip") throw Error("Internal ZodObject error: invalid unknownKeys value.");
		} else {
			let e = this._def.catchall;
			for (let t of a) {
				let r = n.data[t];
				o.push({
					key: {
						status: "valid",
						value: t
					},
					value: e._parse(new dt(n, r, n.path, t)),
					alwaysSet: t in n.data
				});
			}
		}
		return n.common.async ? Promise.resolve().then(async () => {
			let e = [];
			for (let t of o) {
				let n = await t.key, r = await t.value;
				e.push({
					key: n,
					value: r,
					alwaysSet: t.alwaysSet
				});
			}
			return e;
		}).then((e) => it.mergeObjectSync(t, e)) : it.mergeObjectSync(t, o);
	}
	get shape() {
		return this._def.shape();
	}
	strict(t) {
		return b.errToObj, new e({
			...this._def,
			unknownKeys: "strict",
			...t === void 0 ? {} : { errorMap: (e, n) => {
				let r = this._def.errorMap?.(e, n).message ?? n.defaultError;
				return e.code === "unrecognized_keys" ? { message: b.errToObj(t).message ?? r } : { message: r };
			} }
		});
	}
	strip() {
		return new e({
			...this._def,
			unknownKeys: "strip"
		});
	}
	passthrough() {
		return new e({
			...this._def,
			unknownKeys: "passthrough"
		});
	}
	extend(t) {
		return new e({
			...this._def,
			shape: () => ({
				...this._def.shape(),
				...t
			})
		});
	}
	merge(t) {
		return new e({
			unknownKeys: t._def.unknownKeys,
			catchall: t._def.catchall,
			shape: () => ({
				...this._def.shape(),
				...t._def.shape()
			}),
			typeName: C.ZodObject
		});
	}
	setKey(e, t) {
		return this.augment({ [e]: t });
	}
	catchall(t) {
		return new e({
			...this._def,
			catchall: t
		});
	}
	pick(t) {
		let n = {};
		for (let e of Xe.objectKeys(t)) t[e] && this.shape[e] && (n[e] = this.shape[e]);
		return new e({
			...this._def,
			shape: () => n
		});
	}
	omit(t) {
		let n = {};
		for (let e of Xe.objectKeys(this.shape)) t[e] || (n[e] = this.shape[e]);
		return new e({
			...this._def,
			shape: () => n
		});
	}
	deepPartial() {
		return Zt(this);
	}
	partial(t) {
		let n = {};
		for (let e of Xe.objectKeys(this.shape)) {
			let r = this.shape[e];
			n[e] = t && !t[e] ? r : r.optional();
		}
		return new e({
			...this._def,
			shape: () => n
		});
	}
	required(t) {
		let n = {};
		for (let e of Xe.objectKeys(this.shape)) if (t && !t[e]) n[e] = this.shape[e];
		else {
			let t = this.shape[e];
			for (; t instanceof _n;) t = t._def.innerType;
			n[e] = t;
		}
		return new e({
			...this._def,
			shape: () => n
		});
	}
	keyof() {
		return fn(Xe.objectKeys(this.shape));
	}
};
Qt.create = (e, t) => new Qt({
	shape: () => e,
	unknownKeys: "strip",
	catchall: Jt.create(),
	typeName: C.ZodObject,
	...x(t)
}), Qt.strictCreate = (e, t) => new Qt({
	shape: () => e,
	unknownKeys: "strict",
	catchall: Jt.create(),
	typeName: C.ZodObject,
	...x(t)
}), Qt.lazycreate = (e, t) => new Qt({
	shape: e,
	unknownKeys: "strip",
	catchall: Jt.create(),
	typeName: C.ZodObject,
	...x(t)
});
var $t = class extends S {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = this._def.options;
		function r(e) {
			for (let t of e) if (t.result.status === "valid") return t.result;
			for (let n of e) if (n.result.status === "dirty") return t.common.issues.push(...n.ctx.common.issues), n.result;
			let n = e.map((e) => new $e(e.ctx.common.issues));
			return v(t, {
				code: _.invalid_union,
				unionErrors: n
			}), y;
		}
		if (t.common.async) return Promise.all(n.map(async (e) => {
			let n = {
				...t,
				common: {
					...t.common,
					issues: []
				},
				parent: null
			};
			return {
				result: await e._parseAsync({
					data: t.data,
					path: t.path,
					parent: n
				}),
				ctx: n
			};
		})).then(r);
		{
			let e, r = [];
			for (let i of n) {
				let n = {
					...t,
					common: {
						...t.common,
						issues: []
					},
					parent: null
				}, a = i._parseSync({
					data: t.data,
					path: t.path,
					parent: n
				});
				if (a.status === "valid") return a;
				a.status === "dirty" && !e && (e = {
					result: a,
					ctx: n
				}), n.common.issues.length && r.push(n.common.issues);
			}
			if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
			let i = r.map((e) => new $e(e));
			return v(t, {
				code: _.invalid_union,
				unionErrors: i
			}), y;
		}
	}
	get options() {
		return this._def.options;
	}
};
$t.create = (e, t) => new $t({
	options: e,
	typeName: C.ZodUnion,
	...x(t)
});
var en = (e) => e instanceof un ? en(e.schema) : e instanceof gn ? en(e.innerType()) : e instanceof dn ? [e.value] : e instanceof pn ? e.options : e instanceof mn ? Xe.objectValues(e.enum) : e instanceof yn ? en(e._def.innerType) : e instanceof Wt ? [void 0] : e instanceof Gt ? [null] : e instanceof _n ? [void 0, ...en(e.unwrap())] : e instanceof vn ? [null, ...en(e.unwrap())] : e instanceof Sn || e instanceof wn ? en(e.unwrap()) : e instanceof bn ? en(e._def.innerType) : [], tn = class e extends S {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== g.object) return v(t, {
			code: _.invalid_type,
			expected: g.object,
			received: t.parsedType
		}), y;
		let n = this.discriminator, r = t.data[n], i = this.optionsMap.get(r);
		return i ? t.common.async ? i._parseAsync({
			data: t.data,
			path: t.path,
			parent: t
		}) : i._parseSync({
			data: t.data,
			path: t.path,
			parent: t
		}) : (v(t, {
			code: _.invalid_union_discriminator,
			options: Array.from(this.optionsMap.keys()),
			path: [n]
		}), y);
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	static create(t, n, r) {
		let i = /* @__PURE__ */ new Map();
		for (let e of n) {
			let n = en(e.shape[t]);
			if (!n.length) throw Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
			for (let r of n) {
				if (i.has(r)) throw Error(`Discriminator property ${String(t)} has duplicate value ${String(r)}`);
				i.set(r, e);
			}
		}
		return new e({
			typeName: C.ZodDiscriminatedUnion,
			discriminator: t,
			options: n,
			optionsMap: i,
			...x(r)
		});
	}
};
function nn(e, t) {
	let n = Qe(e), r = Qe(t);
	if (e === t) return {
		valid: !0,
		data: e
	};
	if (n === g.object && r === g.object) {
		let n = Xe.objectKeys(t), r = Xe.objectKeys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = nn(e[n], t[n]);
			if (!r.valid) return { valid: !1 };
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (n === g.array && r === g.array) {
		if (e.length !== t.length) return { valid: !1 };
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = nn(i, a);
			if (!o.valid) return { valid: !1 };
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return n === g.date && r === g.date && +e == +t ? {
		valid: !0,
		data: e
	} : { valid: !1 };
}
var rn = class extends S {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e), r = (e, r) => {
			if (st(e) || st(r)) return y;
			let i = nn(e.value, r.value);
			return i.valid ? ((ct(e) || ct(r)) && t.dirty(), {
				status: t.value,
				value: i.data
			}) : (v(n, { code: _.invalid_intersection_types }), y);
		};
		return n.common.async ? Promise.all([this._def.left._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		}), this._def.right._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		})]).then(([e, t]) => r(e, t)) : r(this._def.left._parseSync({
			data: n.data,
			path: n.path,
			parent: n
		}), this._def.right._parseSync({
			data: n.data,
			path: n.path,
			parent: n
		}));
	}
};
rn.create = (e, t, n) => new rn({
	left: e,
	right: t,
	typeName: C.ZodIntersection,
	...x(n)
});
var an = class e extends S {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== g.array) return v(n, {
			code: _.invalid_type,
			expected: g.array,
			received: n.parsedType
		}), y;
		if (n.data.length < this._def.items.length) return v(n, {
			code: _.too_small,
			minimum: this._def.items.length,
			inclusive: !0,
			exact: !1,
			type: "array"
		}), y;
		!this._def.rest && n.data.length > this._def.items.length && (v(n, {
			code: _.too_big,
			maximum: this._def.items.length,
			inclusive: !0,
			exact: !1,
			type: "array"
		}), t.dirty());
		let r = [...n.data].map((e, t) => {
			let r = this._def.items[t] || this._def.rest;
			return r ? r._parse(new dt(n, e, n.path, t)) : null;
		}).filter((e) => !!e);
		return n.common.async ? Promise.all(r).then((e) => it.mergeArray(t, e)) : it.mergeArray(t, r);
	}
	get items() {
		return this._def.items;
	}
	rest(t) {
		return new e({
			...this._def,
			rest: t
		});
	}
};
an.create = (e, t) => {
	if (!Array.isArray(e)) throw Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new an({
		items: e,
		typeName: C.ZodTuple,
		rest: null,
		...x(t)
	});
};
var on = class e extends S {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== g.object) return v(n, {
			code: _.invalid_type,
			expected: g.object,
			received: n.parsedType
		}), y;
		let r = [], i = this._def.keyType, a = this._def.valueType;
		for (let e in n.data) r.push({
			key: i._parse(new dt(n, e, n.path, e)),
			value: a._parse(new dt(n, n.data[e], n.path, e)),
			alwaysSet: e in n.data
		});
		return n.common.async ? it.mergeObjectAsync(t, r) : it.mergeObjectSync(t, r);
	}
	get element() {
		return this._def.valueType;
	}
	static create(t, n, r) {
		return n instanceof S ? new e({
			keyType: t,
			valueType: n,
			typeName: C.ZodRecord,
			...x(r)
		}) : new e({
			keyType: Lt.create(),
			valueType: t,
			typeName: C.ZodRecord,
			...x(n)
		});
	}
}, sn = class extends S {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== g.map) return v(n, {
			code: _.invalid_type,
			expected: g.map,
			received: n.parsedType
		}), y;
		let r = this._def.keyType, i = this._def.valueType, a = [...n.data.entries()].map(([e, t], a) => ({
			key: r._parse(new dt(n, e, n.path, [a, "key"])),
			value: i._parse(new dt(n, t, n.path, [a, "value"]))
		}));
		if (n.common.async) {
			let e = /* @__PURE__ */ new Map();
			return Promise.resolve().then(async () => {
				for (let n of a) {
					let r = await n.key, i = await n.value;
					if (r.status === "aborted" || i.status === "aborted") return y;
					(r.status === "dirty" || i.status === "dirty") && t.dirty(), e.set(r.value, i.value);
				}
				return {
					status: t.value,
					value: e
				};
			});
		}
		{
			let e = /* @__PURE__ */ new Map();
			for (let n of a) {
				let r = n.key, i = n.value;
				if (r.status === "aborted" || i.status === "aborted") return y;
				(r.status === "dirty" || i.status === "dirty") && t.dirty(), e.set(r.value, i.value);
			}
			return {
				status: t.value,
				value: e
			};
		}
	}
};
sn.create = (e, t, n) => new sn({
	valueType: t,
	keyType: e,
	typeName: C.ZodMap,
	...x(n)
});
var cn = class e extends S {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== g.set) return v(n, {
			code: _.invalid_type,
			expected: g.set,
			received: n.parsedType
		}), y;
		let r = this._def;
		r.minSize !== null && n.data.size < r.minSize.value && (v(n, {
			code: _.too_small,
			minimum: r.minSize.value,
			type: "set",
			inclusive: !0,
			exact: !1,
			message: r.minSize.message
		}), t.dirty()), r.maxSize !== null && n.data.size > r.maxSize.value && (v(n, {
			code: _.too_big,
			maximum: r.maxSize.value,
			type: "set",
			inclusive: !0,
			exact: !1,
			message: r.maxSize.message
		}), t.dirty());
		let i = this._def.valueType;
		function a(e) {
			let n = /* @__PURE__ */ new Set();
			for (let r of e) {
				if (r.status === "aborted") return y;
				r.status === "dirty" && t.dirty(), n.add(r.value);
			}
			return {
				status: t.value,
				value: n
			};
		}
		let o = [...n.data.values()].map((e, t) => i._parse(new dt(n, e, n.path, t)));
		return n.common.async ? Promise.all(o).then((e) => a(e)) : a(o);
	}
	min(t, n) {
		return new e({
			...this._def,
			minSize: {
				value: t,
				message: b.toString(n)
			}
		});
	}
	max(t, n) {
		return new e({
			...this._def,
			maxSize: {
				value: t,
				message: b.toString(n)
			}
		});
	}
	size(e, t) {
		return this.min(e, t).max(e, t);
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
cn.create = (e, t) => new cn({
	valueType: e,
	minSize: null,
	maxSize: null,
	typeName: C.ZodSet,
	...x(t)
});
var ln = class e extends S {
	constructor() {
		super(...arguments), this.validate = this.implement;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== g.function) return v(t, {
			code: _.invalid_type,
			expected: g.function,
			received: t.parsedType
		}), y;
		function n(e, n) {
			return rt({
				data: e,
				path: t.path,
				errorMaps: [
					t.common.contextualErrorMap,
					t.schemaErrorMap,
					nt(),
					et
				].filter((e) => !!e),
				issueData: {
					code: _.invalid_arguments,
					argumentsError: n
				}
			});
		}
		function r(e, n) {
			return rt({
				data: e,
				path: t.path,
				errorMaps: [
					t.common.contextualErrorMap,
					t.schemaErrorMap,
					nt(),
					et
				].filter((e) => !!e),
				issueData: {
					code: _.invalid_return_type,
					returnTypeError: n
				}
			});
		}
		let i = { errorMap: t.common.contextualErrorMap }, a = t.data;
		if (this._def.returns instanceof hn) {
			let e = this;
			return ot(async function(...t) {
				let o = new $e([]), s = await e._def.args.parseAsync(t, i).catch((e) => {
					throw o.addIssue(n(t, e)), o;
				}), c = await Reflect.apply(a, this, s);
				return await e._def.returns._def.type.parseAsync(c, i).catch((e) => {
					throw o.addIssue(r(c, e)), o;
				});
			});
		}
		{
			let e = this;
			return ot(function(...t) {
				let o = e._def.args.safeParse(t, i);
				if (!o.success) throw new $e([n(t, o.error)]);
				let s = Reflect.apply(a, this, o.data), c = e._def.returns.safeParse(s, i);
				if (!c.success) throw new $e([r(s, c.error)]);
				return c.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...t) {
		return new e({
			...this._def,
			args: an.create(t).rest(qt.create())
		});
	}
	returns(t) {
		return new e({
			...this._def,
			returns: t
		});
	}
	implement(e) {
		return this.parse(e);
	}
	strictImplement(e) {
		return this.parse(e);
	}
	static create(t, n, r) {
		return new e({
			args: t || an.create([]).rest(qt.create()),
			returns: n || qt.create(),
			typeName: C.ZodFunction,
			...x(r)
		});
	}
}, un = class extends S {
	get schema() {
		return this._def.getter();
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return this._def.getter()._parse({
			data: t.data,
			path: t.path,
			parent: t
		});
	}
};
un.create = (e, t) => new un({
	getter: e,
	typeName: C.ZodLazy,
	...x(t)
});
var dn = class extends S {
	_parse(e) {
		if (e.data !== this._def.value) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				received: t.data,
				code: _.invalid_literal,
				expected: this._def.value
			}), y;
		}
		return {
			status: "valid",
			value: e.data
		};
	}
	get value() {
		return this._def.value;
	}
};
dn.create = (e, t) => new dn({
	value: e,
	typeName: C.ZodLiteral,
	...x(t)
});
function fn(e, t) {
	return new pn({
		values: e,
		typeName: C.ZodEnum,
		...x(t)
	});
}
var pn = class e extends S {
	_parse(e) {
		if (typeof e.data != "string") {
			let t = this._getOrReturnCtx(e), n = this._def.values;
			return v(t, {
				expected: Xe.joinValues(n),
				received: t.parsedType,
				code: _.invalid_type
			}), y;
		}
		if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
			let t = this._getOrReturnCtx(e), n = this._def.values;
			return v(t, {
				received: t.data,
				code: _.invalid_enum_value,
				options: n
			}), y;
		}
		return ot(e.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Values() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	extract(t, n = this._def) {
		return e.create(t, {
			...this._def,
			...n
		});
	}
	exclude(t, n = this._def) {
		return e.create(this.options.filter((e) => !t.includes(e)), {
			...this._def,
			...n
		});
	}
};
pn.create = fn;
var mn = class extends S {
	_parse(e) {
		let t = Xe.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
		if (n.parsedType !== g.string && n.parsedType !== g.number) {
			let e = Xe.objectValues(t);
			return v(n, {
				expected: Xe.joinValues(e),
				received: n.parsedType,
				code: _.invalid_type
			}), y;
		}
		if (this._cache || (this._cache = new Set(Xe.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
			let e = Xe.objectValues(t);
			return v(n, {
				received: n.data,
				code: _.invalid_enum_value,
				options: e
			}), y;
		}
		return ot(e.data);
	}
	get enum() {
		return this._def.values;
	}
};
mn.create = (e, t) => new mn({
	values: e,
	typeName: C.ZodNativeEnum,
	...x(t)
});
var hn = class extends S {
	unwrap() {
		return this._def.type;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return t.parsedType !== g.promise && t.common.async === !1 ? (v(t, {
			code: _.invalid_type,
			expected: g.promise,
			received: t.parsedType
		}), y) : ot((t.parsedType === g.promise ? t.data : Promise.resolve(t.data)).then((e) => this._def.type.parseAsync(e, {
			path: t.path,
			errorMap: t.common.contextualErrorMap
		})));
	}
};
hn.create = (e, t) => new hn({
	type: e,
	typeName: C.ZodPromise,
	...x(t)
});
var gn = class extends S {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === C.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e), r = this._def.effect || null, i = {
			addIssue: (e) => {
				v(n, e), e.fatal ? t.abort() : t.dirty();
			},
			get path() {
				return n.path;
			}
		};
		if (i.addIssue = i.addIssue.bind(i), r.type === "preprocess") {
			let e = r.transform(n.data, i);
			if (n.common.async) return Promise.resolve(e).then(async (e) => {
				if (t.value === "aborted") return y;
				let r = await this._def.schema._parseAsync({
					data: e,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? y : r.status === "dirty" || t.value === "dirty" ? at(r.value) : r;
			});
			{
				if (t.value === "aborted") return y;
				let r = this._def.schema._parseSync({
					data: e,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? y : r.status === "dirty" || t.value === "dirty" ? at(r.value) : r;
			}
		}
		if (r.type === "refinement") {
			let e = (e) => {
				let t = r.refinement(e, i);
				if (n.common.async) return Promise.resolve(t);
				if (t instanceof Promise) throw Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
				return e;
			};
			if (n.common.async === !1) {
				let r = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? y : (r.status === "dirty" && t.dirty(), e(r.value), {
					status: t.value,
					value: r.value
				});
			}
			return this._def.schema._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			}).then((n) => n.status === "aborted" ? y : (n.status === "dirty" && t.dirty(), e(n.value).then(() => ({
				status: t.value,
				value: n.value
			}))));
		}
		if (r.type === "transform") {
			if (n.common.async === !1) {
				let e = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n
				});
				if (!lt(e)) return y;
				let a = r.transform(e.value, i);
				if (a instanceof Promise) throw Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
				return {
					status: t.value,
					value: a
				};
			}
			return this._def.schema._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			}).then((e) => lt(e) ? Promise.resolve(r.transform(e.value, i)).then((e) => ({
				status: t.value,
				value: e
			})) : y);
		}
		Xe.assertNever(r);
	}
};
gn.create = (e, t, n) => new gn({
	schema: e,
	typeName: C.ZodEffects,
	effect: t,
	...x(n)
}), gn.createWithPreprocess = (e, t, n) => new gn({
	schema: t,
	effect: {
		type: "preprocess",
		transform: e
	},
	typeName: C.ZodEffects,
	...x(n)
});
var _n = class extends S {
	_parse(e) {
		return this._getType(e) === g.undefined ? ot(void 0) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
_n.create = (e, t) => new _n({
	innerType: e,
	typeName: C.ZodOptional,
	...x(t)
});
var vn = class extends S {
	_parse(e) {
		return this._getType(e) === g.null ? ot(null) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
vn.create = (e, t) => new vn({
	innerType: e,
	typeName: C.ZodNullable,
	...x(t)
});
var yn = class extends S {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = t.data;
		return t.parsedType === g.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
			data: n,
			path: t.path,
			parent: t
		});
	}
	removeDefault() {
		return this._def.innerType;
	}
};
yn.create = (e, t) => new yn({
	innerType: e,
	typeName: C.ZodDefault,
	defaultValue: typeof t.default == "function" ? t.default : () => t.default,
	...x(t)
});
var bn = class extends S {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = {
			...t,
			common: {
				...t.common,
				issues: []
			}
		}, r = this._def.innerType._parse({
			data: n.data,
			path: n.path,
			parent: { ...n }
		});
		return ut(r) ? r.then((e) => ({
			status: "valid",
			value: e.status === "valid" ? e.value : this._def.catchValue({
				get error() {
					return new $e(n.common.issues);
				},
				input: n.data
			})
		})) : {
			status: "valid",
			value: r.status === "valid" ? r.value : this._def.catchValue({
				get error() {
					return new $e(n.common.issues);
				},
				input: n.data
			})
		};
	}
	removeCatch() {
		return this._def.innerType;
	}
};
bn.create = (e, t) => new bn({
	innerType: e,
	typeName: C.ZodCatch,
	catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
	...x(t)
});
var xn = class extends S {
	_parse(e) {
		if (this._getType(e) !== g.nan) {
			let t = this._getOrReturnCtx(e);
			return v(t, {
				code: _.invalid_type,
				expected: g.nan,
				received: t.parsedType
			}), y;
		}
		return {
			status: "valid",
			value: e.data
		};
	}
};
xn.create = (e) => new xn({
	typeName: C.ZodNaN,
	...x(e)
});
var Sn = class extends S {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = t.data;
		return this._def.type._parse({
			data: n,
			path: t.path,
			parent: t
		});
	}
	unwrap() {
		return this._def.type;
	}
}, Cn = class e extends S {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.common.async) return (async () => {
			let e = await this._def.in._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			});
			return e.status === "aborted" ? y : e.status === "dirty" ? (t.dirty(), at(e.value)) : this._def.out._parseAsync({
				data: e.value,
				path: n.path,
				parent: n
			});
		})();
		{
			let e = this._def.in._parseSync({
				data: n.data,
				path: n.path,
				parent: n
			});
			return e.status === "aborted" ? y : e.status === "dirty" ? (t.dirty(), {
				status: "dirty",
				value: e.value
			}) : this._def.out._parseSync({
				data: e.value,
				path: n.path,
				parent: n
			});
		}
	}
	static create(t, n) {
		return new e({
			in: t,
			out: n,
			typeName: C.ZodPipeline
		});
	}
}, wn = class extends S {
	_parse(e) {
		let t = this._def.innerType._parse(e), n = (e) => (lt(e) && (e.value = Object.freeze(e.value)), e);
		return ut(t) ? t.then((e) => n(e)) : n(t);
	}
	unwrap() {
		return this._def.innerType;
	}
};
wn.create = (e, t) => new wn({
	innerType: e,
	typeName: C.ZodReadonly,
	...x(t)
}), Qt.lazycreate;
var C;
(function(e) {
	e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
})(C || (C = {}));
var w = Lt.create, Tn = zt.create;
xn.create, Bt.create;
var En = Vt.create;
Ht.create, Ut.create, Wt.create, Gt.create;
var Dn = Kt.create, On = qt.create;
Jt.create, Yt.create;
var kn = Xt.create, T = Qt.create;
Qt.strictCreate;
var An = $t.create, jn = tn.create;
rn.create, an.create;
var Mn = on.create;
sn.create, cn.create, ln.create, un.create;
var E = dn.create, Nn = pn.create, Pn = mn.create;
hn.create, gn.create, _n.create, vn.create, gn.createWithPreprocess, Cn.create;
var Fn = Mn(Dn()).optional();
function In(e, t) {
	return t === void 0 ? e : e === void 0 ? { ...t } : {
		...e,
		...t
	};
}
var Ln = T({
	name: w(),
	arguments: w()
}), Rn = T({
	id: w(),
	type: E("function"),
	function: Ln,
	encryptedValue: w().optional(),
	metadata: Fn
}), zn = T({
	id: w(),
	role: w(),
	content: w().optional(),
	name: w().optional(),
	encryptedValue: w().optional(),
	subagentRunId: w().optional(),
	metadata: Fn
}), Bn = T({
	type: E("text"),
	text: w()
}), Vn = jn("type", [T({
	type: E("data"),
	value: w(),
	mimeType: w()
}), T({
	type: E("url"),
	value: w(),
	mimeType: w().optional()
})]), Hn = T({
	type: E("image"),
	source: Vn,
	metadata: On().optional()
}), Un = T({
	type: E("audio"),
	source: Vn,
	metadata: On().optional()
}), Wn = T({
	type: E("video"),
	source: Vn,
	metadata: On().optional()
}), Gn = T({
	type: E("document"),
	source: Vn,
	metadata: On().optional()
}), Kn = T({
	type: E("binary"),
	mimeType: w(),
	id: w().optional(),
	url: w().optional(),
	data: w().optional(),
	filename: w().optional()
}), qn = (e, t) => {
	!e.id && !e.url && !e.data && t.addIssue({
		code: _.custom,
		message: "BinaryInputContent requires at least one of id, url, or data.",
		path: ["id"]
	});
};
Kn.superRefine((e, t) => {
	qn(e, t);
});
var Jn = jn("type", [
	Bn,
	Hn,
	Un,
	Wn,
	Gn,
	Kn
]).superRefine((e, t) => {
	e.type === "binary" && qn(e, t);
}), Yn = jn("role", [
	zn.extend({
		role: E("developer"),
		content: w()
	}),
	zn.extend({
		role: E("system"),
		content: w()
	}),
	zn.extend({
		role: E("assistant"),
		content: w().optional(),
		toolCalls: kn(Rn).optional()
	}),
	zn.extend({
		role: E("user"),
		content: An([w(), kn(Jn)])
	}),
	T({
		id: w(),
		content: w(),
		role: E("tool"),
		toolCallId: w(),
		error: w().optional(),
		encryptedValue: w().optional(),
		subagentRunId: w().optional(),
		metadata: Fn
	}),
	T({
		id: w(),
		role: E("activity"),
		activityType: w(),
		content: Mn(Dn()),
		subagentRunId: w().optional(),
		metadata: Fn
	}),
	T({
		id: w(),
		role: E("reasoning"),
		content: w(),
		encryptedValue: w().optional(),
		subagentRunId: w().optional(),
		metadata: Fn
	})
]);
An([
	E("developer"),
	E("system"),
	E("assistant"),
	E("user"),
	E("tool"),
	E("activity"),
	E("reasoning")
]);
var Xn = T({
	description: w(),
	value: w()
}), Zn = T({
	name: w(),
	description: w(),
	parameters: Dn(),
	metadata: Mn(Dn()).optional()
}), Qn = T({
	id: w(),
	reason: w(),
	message: w().optional(),
	toolCallId: w().optional(),
	responseSchema: Mn(Dn()).optional(),
	expiresAt: w().optional(),
	metadata: Mn(Dn()).optional(),
	subagentRunId: w().optional()
}), $n = T({
	interruptId: w(),
	status: Nn(["resolved", "cancelled"]),
	payload: Dn().optional(),
	metadata: Fn
}), er = T({
	threadId: w(),
	runId: w(),
	parentRunId: w().optional(),
	state: Dn().transform((e) => e ?? void 0),
	messages: kn(Yn),
	tools: kn(Zn),
	context: kn(Xn),
	forwardedProps: Dn(),
	resume: kn($n).optional()
}), tr = Dn(), D = class extends Error {
	constructor(e) {
		super(e);
	}
}, nr = class extends D {
	constructor() {
		super("Connect not implemented. This method is not supported by the current agent.");
	}
}, rr = T({
	name: w(),
	description: w().optional()
}), ir = T({
	name: w().optional(),
	type: w().optional(),
	description: w().optional(),
	version: w().optional(),
	provider: w().optional(),
	documentationUrl: w().optional(),
	metadata: Mn(On()).optional()
}), ar = T({
	streaming: En().optional(),
	websocket: En().optional(),
	httpBinary: En().optional(),
	pushNotifications: En().optional(),
	resumable: En().optional()
}), or = T({
	supported: En().optional(),
	items: kn(Zn).optional(),
	parallelCalls: En().optional(),
	clientProvided: En().optional()
}), sr = T({
	structuredOutput: En().optional(),
	supportedMimeTypes: kn(w()).optional()
}), cr = T({
	snapshots: En().optional(),
	deltas: En().optional(),
	memory: En().optional(),
	persistentState: En().optional()
}), lr = T({
	supported: En().optional(),
	delegation: En().optional(),
	handoffs: En().optional(),
	subAgents: kn(rr).optional()
}), ur = T({
	supported: En().optional(),
	streaming: En().optional(),
	encrypted: En().optional()
}), dr = T({
	image: En().optional(),
	audio: En().optional(),
	video: En().optional(),
	pdf: En().optional(),
	file: En().optional()
}), fr = T({
	image: En().optional(),
	audio: En().optional()
}), pr = T({
	input: dr.optional(),
	output: fr.optional()
}), mr = T({
	codeExecution: En().optional(),
	sandboxed: En().optional(),
	maxIterations: Tn().optional(),
	maxExecutionTime: Tn().optional()
}), hr = T({
	supported: En().optional(),
	approvals: En().optional(),
	interventions: En().optional(),
	feedback: En().optional(),
	interrupts: En().optional(),
	approveWithEdits: En().optional()
});
T({
	identity: ir.optional(),
	transport: ar.optional(),
	tools: or.optional(),
	output: sr.optional(),
	state: cr.optional(),
	multiAgent: lr.optional(),
	reasoning: ur.optional(),
	multimodal: pr.optional(),
	execution: mr.optional(),
	humanInTheLoop: hr.optional(),
	custom: Mn(On()).optional()
});
var gr = An([
	E("developer"),
	E("system"),
	E("assistant"),
	E("user")
]), O = /* @__PURE__ */ function(e) {
	return e.TEXT_MESSAGE_START = "TEXT_MESSAGE_START", e.TEXT_MESSAGE_CONTENT = "TEXT_MESSAGE_CONTENT", e.TEXT_MESSAGE_END = "TEXT_MESSAGE_END", e.TEXT_MESSAGE_CHUNK = "TEXT_MESSAGE_CHUNK", e.TOOL_CALL_START = "TOOL_CALL_START", e.TOOL_CALL_ARGS = "TOOL_CALL_ARGS", e.TOOL_CALL_END = "TOOL_CALL_END", e.TOOL_CALL_CHUNK = "TOOL_CALL_CHUNK", e.TOOL_CALL_RESULT = "TOOL_CALL_RESULT", e.THINKING_START = "THINKING_START", e.THINKING_END = "THINKING_END", e.THINKING_TEXT_MESSAGE_START = "THINKING_TEXT_MESSAGE_START", e.THINKING_TEXT_MESSAGE_CONTENT = "THINKING_TEXT_MESSAGE_CONTENT", e.THINKING_TEXT_MESSAGE_END = "THINKING_TEXT_MESSAGE_END", e.STATE_SNAPSHOT = "STATE_SNAPSHOT", e.STATE_DELTA = "STATE_DELTA", e.MESSAGES_SNAPSHOT = "MESSAGES_SNAPSHOT", e.ACTIVITY_SNAPSHOT = "ACTIVITY_SNAPSHOT", e.ACTIVITY_DELTA = "ACTIVITY_DELTA", e.RAW = "RAW", e.CUSTOM = "CUSTOM", e.RUN_STARTED = "RUN_STARTED", e.RUN_FINISHED = "RUN_FINISHED", e.RUN_ERROR = "RUN_ERROR", e.STEP_STARTED = "STEP_STARTED", e.STEP_FINISHED = "STEP_FINISHED", e.REASONING_START = "REASONING_START", e.REASONING_MESSAGE_START = "REASONING_MESSAGE_START", e.REASONING_MESSAGE_CONTENT = "REASONING_MESSAGE_CONTENT", e.REASONING_MESSAGE_END = "REASONING_MESSAGE_END", e.REASONING_MESSAGE_CHUNK = "REASONING_MESSAGE_CHUNK", e.REASONING_END = "REASONING_END", e.REASONING_ENCRYPTED_VALUE = "REASONING_ENCRYPTED_VALUE", e.SUBAGENT_STARTED = "SUBAGENT_STARTED", e.SUBAGENT_FINISHED = "SUBAGENT_FINISHED", e.SUBAGENT_ERROR = "SUBAGENT_ERROR", e;
}({}), _r = T({
	type: Pn(O),
	timestamp: Tn().optional(),
	rawEvent: Dn().optional(),
	metadata: Fn
}).passthrough(), vr = _r.extend({
	type: E(O.TEXT_MESSAGE_START),
	messageId: w(),
	role: gr.default("assistant"),
	name: w().optional(),
	subagentRunId: w().optional()
}), yr = _r.extend({
	type: E(O.TEXT_MESSAGE_CONTENT),
	messageId: w(),
	delta: w(),
	subagentRunId: w().optional()
}), br = _r.extend({
	type: E(O.TEXT_MESSAGE_END),
	messageId: w(),
	subagentRunId: w().optional()
}), xr = _r.extend({
	type: E(O.TEXT_MESSAGE_CHUNK),
	messageId: w().optional(),
	role: gr.optional(),
	delta: w().optional(),
	name: w().optional(),
	subagentRunId: w().optional()
}), Sr = _r.extend({ type: E(O.THINKING_TEXT_MESSAGE_START) }), Cr = yr.omit({
	messageId: !0,
	type: !0,
	subagentRunId: !0
}).extend({ type: E(O.THINKING_TEXT_MESSAGE_CONTENT) }), wr = _r.extend({ type: E(O.THINKING_TEXT_MESSAGE_END) }), Tr = _r.extend({
	type: E(O.TOOL_CALL_START),
	toolCallId: w(),
	toolCallName: w(),
	parentMessageId: w().nullable().optional().transform((e) => e ?? void 0),
	subagentRunId: w().optional()
}), Er = _r.extend({
	type: E(O.TOOL_CALL_ARGS),
	toolCallId: w(),
	delta: w(),
	subagentRunId: w().optional()
}), Dr = _r.extend({
	type: E(O.TOOL_CALL_END),
	toolCallId: w(),
	subagentRunId: w().optional()
}), Or = _r.extend({
	messageId: w(),
	type: E(O.TOOL_CALL_RESULT),
	toolCallId: w(),
	content: w(),
	role: E("tool").optional(),
	subagentRunId: w().optional()
}), kr = _r.extend({
	type: E(O.TOOL_CALL_CHUNK),
	toolCallId: w().optional(),
	toolCallName: w().optional(),
	parentMessageId: w().nullable().optional().transform((e) => e ?? void 0),
	delta: w().optional(),
	subagentRunId: w().optional()
}), Ar = _r.extend({
	type: E(O.THINKING_START),
	title: w().optional()
}), jr = _r.extend({ type: E(O.THINKING_END) }), Mr = _r.extend({
	type: E(O.STATE_SNAPSHOT),
	snapshot: tr,
	subagentRunId: w().optional()
}), Nr = _r.extend({
	type: E(O.STATE_DELTA),
	delta: kn(Dn()),
	subagentRunId: w().optional()
}), Pr = _r.extend({
	type: E(O.MESSAGES_SNAPSHOT),
	messages: kn(Yn)
}), Fr = _r.extend({
	type: E(O.ACTIVITY_SNAPSHOT),
	messageId: w(),
	activityType: w(),
	content: Mn(Dn()),
	replace: En().optional().default(!0),
	subagentRunId: w().optional()
}), Ir = _r.extend({
	type: E(O.ACTIVITY_DELTA),
	messageId: w(),
	activityType: w(),
	patch: kn(Dn()),
	subagentRunId: w().optional()
}), Lr = _r.extend({
	type: E(O.RAW),
	event: Dn(),
	source: w().optional(),
	subagentRunId: w().optional()
}), Rr = _r.extend({
	type: E(O.CUSTOM),
	name: w(),
	value: Dn(),
	subagentRunId: w().optional()
}), zr = _r.extend({
	type: E(O.RUN_STARTED),
	threadId: w(),
	runId: w(),
	parentRunId: w().optional(),
	input: er.optional()
}), Br = jn("type", [T({ type: E("success") }).strict(), T({
	type: E("interrupt"),
	interrupts: kn(Qn).min(1)
}).strict()]), Vr = T({
	provider: w().optional(),
	model: w().optional(),
	inputTokens: Tn().int().nonnegative().optional(),
	outputTokens: Tn().int().nonnegative().optional(),
	totalTokens: Tn().int().nonnegative().optional(),
	reasoningTokens: Tn().int().nonnegative().optional(),
	cachedInputTokens: Tn().int().nonnegative().optional()
}), Hr = _r.extend({
	type: E(O.RUN_FINISHED),
	threadId: w(),
	runId: w(),
	result: Dn().optional(),
	outcome: Br.nullable().optional().transform((e) => e ?? void 0),
	usage: kn(Vr).optional()
}), Ur = _r.extend({
	type: E(O.RUN_ERROR),
	message: w(),
	code: w().optional(),
	usage: kn(Vr).optional()
}), Wr = _r.extend({
	type: E(O.STEP_STARTED),
	stepName: w(),
	subagentRunId: w().optional()
}), Gr = _r.extend({
	type: E(O.STEP_FINISHED),
	stepName: w(),
	subagentRunId: w().optional()
}), Kr = An([E("tool-call"), E("message")]), qr = _r.extend({
	type: E(O.REASONING_START),
	messageId: w(),
	subagentRunId: w().optional()
}), Jr = _r.extend({
	type: E(O.REASONING_MESSAGE_START),
	messageId: w(),
	role: E("reasoning"),
	subagentRunId: w().optional()
}), Yr = _r.extend({
	type: E(O.REASONING_MESSAGE_CONTENT),
	messageId: w(),
	delta: w(),
	subagentRunId: w().optional()
}), Xr = _r.extend({
	type: E(O.REASONING_MESSAGE_END),
	messageId: w(),
	subagentRunId: w().optional()
}), Zr = _r.extend({
	type: E(O.REASONING_MESSAGE_CHUNK),
	messageId: w().optional(),
	delta: w().optional(),
	subagentRunId: w().optional()
}), Qr = _r.extend({
	type: E(O.REASONING_END),
	messageId: w(),
	subagentRunId: w().optional()
}), $r = _r.extend({
	type: E(O.REASONING_ENCRYPTED_VALUE),
	subtype: Kr,
	entityId: w(),
	encryptedValue: w(),
	subagentRunId: w().optional()
}), ei = _r.extend({
	type: E(O.SUBAGENT_STARTED),
	subagentRunId: w(),
	name: w(),
	description: w().optional(),
	parentSubagentRunId: w().optional(),
	parentToolCallId: w().optional(),
	parentMessageId: w().optional()
}), ti = jn("type", [T({ type: E("success") }).strict(), T({
	type: E("suspended"),
	interruptIds: kn(w()).optional()
}).strict()]), ni = jn("type", [
	vr,
	yr,
	br,
	xr,
	Ar,
	jr,
	Sr,
	Cr,
	wr,
	Tr,
	Er,
	Dr,
	kr,
	Or,
	Mr,
	Nr,
	Pr,
	Fr,
	Ir,
	Lr,
	Rr,
	zr,
	Hr,
	Ur,
	Wr,
	Gr,
	qr,
	Jr,
	Yr,
	Xr,
	Zr,
	Qr,
	$r,
	ei,
	_r.extend({
		type: E(O.SUBAGENT_FINISHED),
		subagentRunId: w(),
		result: Dn().optional(),
		outcome: ti.optional()
	}),
	_r.extend({
		type: E(O.SUBAGENT_ERROR),
		subagentRunId: w(),
		message: w(),
		code: w().optional()
	})
]), ri = (function() {
	var e = function(t, n) {
		return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
			e.__proto__ = t;
		} || function(e, t) {
			for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
		}, e(t, n);
	};
	return function(t, n) {
		e(t, n);
		function r() {
			this.constructor = t;
		}
		t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
	};
})(), ii = Object.prototype.hasOwnProperty;
function ai(e, t) {
	return ii.call(e, t);
}
function oi(e) {
	if (Array.isArray(e)) {
		for (var t = Array(e.length), n = 0; n < t.length; n++) t[n] = "" + n;
		return t;
	}
	if (Object.keys) return Object.keys(e);
	var r = [];
	for (var i in e) ai(e, i) && r.push(i);
	return r;
}
function si(e) {
	switch (typeof e) {
		case "object": return JSON.parse(JSON.stringify(e));
		case "undefined": return null;
		default: return e;
	}
}
function ci(e) {
	for (var t = 0, n = e.length, r; t < n;) {
		if (r = e.charCodeAt(t), r >= 48 && r <= 57) {
			t++;
			continue;
		}
		return !1;
	}
	return !0;
}
function li(e) {
	return e.indexOf("/") === -1 && e.indexOf("~") === -1 ? e : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function ui(e) {
	return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
function di(e) {
	if (e === void 0) return !0;
	if (e) {
		if (Array.isArray(e)) {
			for (var t = 0, n = e.length; t < n; t++) if (di(e[t])) return !0;
		} else if (typeof e == "object") {
			for (var r = oi(e), i = r.length, a = 0; a < i; a++) if (di(e[r[a]])) return !0;
		}
	}
	return !1;
}
function fi(e, t) {
	var n = [e];
	for (var r in t) {
		var i = typeof t[r] == "object" ? JSON.stringify(t[r], null, 2) : t[r];
		i !== void 0 && n.push(r + ": " + i);
	}
	return n.join("\n");
}
var pi = function(e) {
	ri(t, e);
	function t(t, n, r, i, a) {
		var o = this.constructor, s = e.call(this, fi(t, {
			name: n,
			index: r,
			operation: i,
			tree: a
		})) || this;
		return s.name = n, s.index = r, s.operation = i, s.tree = a, Object.setPrototypeOf(s, o.prototype), s.message = fi(t, {
			name: n,
			index: r,
			operation: i,
			tree: a
		}), s;
	}
	return t;
}(Error), mi = /* @__PURE__ */ t({
	JsonPatchError: () => hi,
	_areEquals: () => Ti,
	applyOperation: () => bi,
	applyPatch: () => xi,
	applyReducer: () => Si,
	deepClone: () => gi,
	getValueByPointer: () => yi,
	validate: () => wi,
	validator: () => Ci
}), hi = pi, gi = si, _i = {
	add: function(e, t, n) {
		return e[t] = this.value, { newDocument: n };
	},
	remove: function(e, t, n) {
		var r = e[t];
		return delete e[t], {
			newDocument: n,
			removed: r
		};
	},
	replace: function(e, t, n) {
		var r = e[t];
		return e[t] = this.value, {
			newDocument: n,
			removed: r
		};
	},
	move: function(e, t, n) {
		var r = yi(n, this.path);
		r && (r = si(r));
		var i = bi(n, {
			op: "remove",
			path: this.from
		}).removed;
		return bi(n, {
			op: "add",
			path: this.path,
			value: i
		}), {
			newDocument: n,
			removed: r
		};
	},
	copy: function(e, t, n) {
		var r = yi(n, this.from);
		return bi(n, {
			op: "add",
			path: this.path,
			value: si(r)
		}), { newDocument: n };
	},
	test: function(e, t, n) {
		return {
			newDocument: n,
			test: Ti(e[t], this.value)
		};
	},
	_get: function(e, t, n) {
		return this.value = e[t], { newDocument: n };
	}
}, vi = {
	add: function(e, t, n) {
		return ci(t) ? e.splice(t, 0, this.value) : e[t] = this.value, {
			newDocument: n,
			index: t
		};
	},
	remove: function(e, t, n) {
		return {
			newDocument: n,
			removed: e.splice(t, 1)[0]
		};
	},
	replace: function(e, t, n) {
		var r = e[t];
		return e[t] = this.value, {
			newDocument: n,
			removed: r
		};
	},
	move: _i.move,
	copy: _i.copy,
	test: _i.test,
	_get: _i._get
};
function yi(e, t) {
	if (t == "") return e;
	var n = {
		op: "_get",
		path: t
	};
	return bi(e, n), n.value;
}
function bi(e, t, n, r, i, a) {
	if (n === void 0 && (n = !1), r === void 0 && (r = !0), i === void 0 && (i = !0), a === void 0 && (a = 0), n && (typeof n == "function" ? n(t, 0, e, t.path) : Ci(t, 0)), t.path === "") {
		var o = { newDocument: e };
		if (t.op === "add") return o.newDocument = t.value, o;
		if (t.op === "replace") return o.newDocument = t.value, o.removed = e, o;
		if (t.op === "move" || t.op === "copy") return o.newDocument = yi(e, t.from), t.op === "move" && (o.removed = e), o;
		if (t.op === "test") {
			if (o.test = Ti(e, t.value), o.test === !1) throw new hi("Test operation failed", "TEST_OPERATION_FAILED", a, t, e);
			return o.newDocument = e, o;
		}
		if (t.op === "remove") return o.removed = e, o.newDocument = null, o;
		if (t.op === "_get") return t.value = e, o;
		if (n) throw new hi("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", a, t, e);
		return o;
	}
	r || (e = si(e));
	var s = (t.path || "").split("/"), c = e, l = 1, u = s.length, d = void 0, f = void 0, p = void 0;
	for (p = typeof n == "function" ? n : Ci;;) {
		if (f = s[l], f && f.indexOf("~") != -1 && (f = ui(f)), i && (f == "__proto__" || f == "prototype" && l > 0 && s[l - 1] == "constructor")) throw TypeError("JSON-Patch: modifying `__proto__` or `constructor/prototype` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README");
		if (n && d === void 0 && (c[f] === void 0 ? d = s.slice(0, l).join("/") : l == u - 1 && (d = t.path), d !== void 0 && p(t, 0, e, d)), l++, Array.isArray(c)) {
			if (f === "-") f = c.length;
			else if (n && !ci(f)) throw new hi("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", a, t, e);
			else ci(f) && (f = ~~f);
			if (l >= u) {
				if (n && t.op === "add" && f > c.length) throw new hi("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", a, t, e);
				var o = vi[t.op].call(t, c, f, e);
				if (o.test === !1) throw new hi("Test operation failed", "TEST_OPERATION_FAILED", a, t, e);
				return o;
			}
		} else if (l >= u) {
			var o = _i[t.op].call(t, c, f, e);
			if (o.test === !1) throw new hi("Test operation failed", "TEST_OPERATION_FAILED", a, t, e);
			return o;
		}
		if (c = c[f], n && l < u && (!c || typeof c != "object")) throw new hi("Cannot perform operation at the desired path", "OPERATION_PATH_UNRESOLVABLE", a, t, e);
	}
}
function xi(e, t, n, r, i) {
	if (r === void 0 && (r = !0), i === void 0 && (i = !0), n && !Array.isArray(t)) throw new hi("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
	r || (e = si(e));
	for (var a = Array(t.length), o = 0, s = t.length; o < s; o++) a[o] = bi(e, t[o], n, !0, i, o), e = a[o].newDocument;
	return a.newDocument = e, a;
}
function Si(e, t, n) {
	var r = bi(e, t);
	if (r.test === !1) throw new hi("Test operation failed", "TEST_OPERATION_FAILED", n, t, e);
	return r.newDocument;
}
function Ci(e, t, n, r) {
	if (typeof e != "object" || !e || Array.isArray(e)) throw new hi("Operation is not an object", "OPERATION_NOT_AN_OBJECT", t, e, n);
	if (!_i[e.op]) throw new hi("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", t, e, n);
	if (typeof e.path != "string") throw new hi("Operation `path` property is not a string", "OPERATION_PATH_INVALID", t, e, n);
	if (e.path.indexOf("/") !== 0 && e.path.length > 0) throw new hi("Operation `path` property must start with \"/\"", "OPERATION_PATH_INVALID", t, e, n);
	if ((e.op === "move" || e.op === "copy") && typeof e.from != "string") throw new hi("Operation `from` property is not present (applicable in `move` and `copy` operations)", "OPERATION_FROM_REQUIRED", t, e, n);
	if ((e.op === "add" || e.op === "replace" || e.op === "test") && e.value === void 0) throw new hi("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_REQUIRED", t, e, n);
	if ((e.op === "add" || e.op === "replace" || e.op === "test") && di(e.value)) throw new hi("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED", t, e, n);
	if (n) {
		if (e.op == "add") {
			var i = e.path.split("/").length, a = r.split("/").length;
			if (i !== a + 1 && i !== a) throw new hi("Cannot perform an `add` operation at the desired path", "OPERATION_PATH_CANNOT_ADD", t, e, n);
		} else if (e.op === "replace" || e.op === "remove" || e.op === "_get") {
			if (e.path !== r) throw new hi("Cannot perform the operation at a path that does not exist", "OPERATION_PATH_UNRESOLVABLE", t, e, n);
		} else if (e.op === "move" || e.op === "copy") {
			var o = wi([{
				op: "_get",
				path: e.from,
				value: void 0
			}], n);
			if (o && o.name === "OPERATION_PATH_UNRESOLVABLE") throw new hi("Cannot perform the operation from a path that does not exist", "OPERATION_FROM_UNRESOLVABLE", t, e, n);
		}
	}
}
function wi(e, t, n) {
	try {
		if (!Array.isArray(e)) throw new hi("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
		if (t) xi(si(t), si(e), n || !0);
		else {
			n = n || Ci;
			for (var r = 0; r < e.length; r++) n(e[r], r, t, void 0);
		}
	} catch (e) {
		if (e instanceof hi) return e;
		throw e;
	}
}
function Ti(e, t) {
	if (e === t) return !0;
	if (e && t && typeof e == "object" && typeof t == "object") {
		var n = Array.isArray(e), r = Array.isArray(t), i, a, o;
		if (n && r) {
			if (a = e.length, a != t.length) return !1;
			for (i = a; i-- !== 0;) if (!Ti(e[i], t[i])) return !1;
			return !0;
		}
		if (n != r) return !1;
		var s = Object.keys(e);
		if (a = s.length, a !== Object.keys(t).length) return !1;
		for (i = a; i-- !== 0;) if (!t.hasOwnProperty(s[i])) return !1;
		for (i = a; i-- !== 0;) if (o = s[i], !Ti(e[o], t[o])) return !1;
		return !0;
	}
	return e !== e && t !== t;
}
//#endregion
//#region node_modules/fast-json-patch/module/duplex.mjs
var Ei = /* @__PURE__ */ t({
	compare: () => Li,
	generate: () => Fi,
	observe: () => Pi,
	unobserve: () => Ni
}), Di = /* @__PURE__ */ new WeakMap(), Oi = function() {
	function e(e) {
		this.observers = /* @__PURE__ */ new Map(), this.obj = e;
	}
	return e;
}(), ki = function() {
	function e(e, t) {
		this.callback = e, this.observer = t;
	}
	return e;
}();
function Ai(e) {
	return Di.get(e);
}
function ji(e, t) {
	return e.observers.get(t);
}
function Mi(e, t) {
	e.observers.delete(t.callback);
}
function Ni(e, t) {
	t.unobserve();
}
function Pi(e, t) {
	var n = [], r, i = Ai(e);
	if (!i) i = new Oi(e), Di.set(e, i);
	else {
		var a = ji(i, t);
		r = a && a.observer;
	}
	if (r) return r;
	if (r = {}, i.value = si(e), t) {
		r.callback = t, r.next = null;
		var o = function() {
			Fi(r);
		}, s = function() {
			clearTimeout(r.next), r.next = setTimeout(o);
		};
		typeof window < "u" && (window.addEventListener("mouseup", s), window.addEventListener("keyup", s), window.addEventListener("mousedown", s), window.addEventListener("keydown", s), window.addEventListener("change", s));
	}
	return r.patches = n, r.object = e, r.unobserve = function() {
		Fi(r), clearTimeout(r.next), Mi(i, r), typeof window < "u" && (window.removeEventListener("mouseup", s), window.removeEventListener("keyup", s), window.removeEventListener("mousedown", s), window.removeEventListener("keydown", s), window.removeEventListener("change", s));
	}, i.observers.set(t, new ki(t, r)), r;
}
function Fi(e, t) {
	t === void 0 && (t = !1);
	var n = Di.get(e.object);
	Ii(n.value, e.object, e.patches, "", t), e.patches.length && xi(n.value, e.patches);
	var r = e.patches;
	return r.length > 0 && (e.patches = [], e.callback && e.callback(r)), r;
}
function Ii(e, t, n, r, i) {
	if (t !== e) {
		typeof t.toJSON == "function" && (t = t.toJSON());
		for (var a = oi(t), o = oi(e), s = !1, c = o.length - 1; c >= 0; c--) {
			var l = o[c], u = e[l];
			if (ai(t, l) && (t[l] !== void 0 || u === void 0 || Array.isArray(t) !== !1)) {
				var d = t[l];
				typeof u == "object" && u && typeof d == "object" && d && Array.isArray(u) === Array.isArray(d) ? Ii(u, d, n, r + "/" + li(l), i) : u !== d && (i && n.push({
					op: "test",
					path: r + "/" + li(l),
					value: si(u)
				}), n.push({
					op: "replace",
					path: r + "/" + li(l),
					value: si(d)
				}));
			} else Array.isArray(e) === Array.isArray(t) ? (i && n.push({
				op: "test",
				path: r + "/" + li(l),
				value: si(u)
			}), n.push({
				op: "remove",
				path: r + "/" + li(l)
			}), s = !0) : (i && n.push({
				op: "test",
				path: r,
				value: e
			}), n.push({
				op: "replace",
				path: r,
				value: t
			}));
		}
		if (s || a.length != o.length) for (var c = 0; c < a.length; c++) {
			var l = a[c];
			!ai(e, l) && t[l] !== void 0 && n.push({
				op: "add",
				path: r + "/" + li(l),
				value: si(t[l])
			});
		}
	}
}
function Li(e, t, n) {
	n === void 0 && (n = !1);
	var r = [];
	return Ii(e, t, r, "", n), r;
}
//#endregion
//#region node_modules/fast-json-patch/index.mjs
var Ri = Object.assign({}, mi, Ei, {
	JsonPatchError: pi,
	deepClone: si,
	escapePathComponent: li,
	unescapePathComponent: ui
}), zi = function(e, t) {
	return zi = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, zi(e, t);
};
function Bi(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	zi(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Vi = function() {
	return Vi = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Vi.apply(this, arguments);
};
function Hi(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Ui(e, t, n, r) {
	function i(e) {
		return e instanceof n ? e : new n(function(t) {
			t(e);
		});
	}
	return new (n || (n = Promise))(function(n, a) {
		function o(e) {
			try {
				c(r.next(e));
			} catch (e) {
				a(e);
			}
		}
		function s(e) {
			try {
				c(r.throw(e));
			} catch (e) {
				a(e);
			}
		}
		function c(e) {
			e.done ? n(e.value) : i(e.value).then(o, s);
		}
		c((r = r.apply(e, t || [])).next());
	});
}
function Wi(e, t) {
	var n = {
		label: 0,
		sent: function() {
			if (a[0] & 1) throw a[1];
			return a[1];
		},
		trys: [],
		ops: []
	}, r, i, a, o = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
	return o.next = s(0), o.throw = s(1), o.return = s(2), typeof Symbol == "function" && (o[Symbol.iterator] = function() {
		return this;
	}), o;
	function s(e) {
		return function(t) {
			return c([e, t]);
		};
	}
	function c(s) {
		if (r) throw TypeError("Generator is already executing.");
		for (; o && (o = 0, s[0] && (n = 0)), n;) try {
			if (r = 1, i && (a = s[0] & 2 ? i.return : s[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, s[1])).done) return a;
			switch (i = 0, a && (s = [s[0] & 2, a.value]), s[0]) {
				case 0:
				case 1:
					a = s;
					break;
				case 4: return n.label++, {
					value: s[1],
					done: !1
				};
				case 5:
					n.label++, i = s[1], s = [0];
					continue;
				case 7:
					s = n.ops.pop(), n.trys.pop();
					continue;
				default:
					if (a = n.trys, !(a = a.length > 0 && a[a.length - 1]) && (s[0] === 6 || s[0] === 2)) {
						n = 0;
						continue;
					}
					if (s[0] === 3 && (!a || s[1] > a[0] && s[1] < a[3])) {
						n.label = s[1];
						break;
					}
					if (s[0] === 6 && n.label < a[1]) {
						n.label = a[1], a = s;
						break;
					}
					if (a && n.label < a[2]) {
						n.label = a[2], n.ops.push(s);
						break;
					}
					a[2] && n.ops.pop(), n.trys.pop();
					continue;
			}
			s = t.call(e, n);
		} catch (e) {
			s = [6, e], i = 0;
		} finally {
			r = a = 0;
		}
		if (s[0] & 5) throw s[1];
		return {
			value: s[0] ? s[1] : void 0,
			done: !0
		};
	}
}
function Gi(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Ki(e, t) {
	var n = typeof Symbol == "function" && e[Symbol.iterator];
	if (!n) return e;
	var r = n.call(e), i, a = [], o;
	try {
		for (; (t === void 0 || t-- > 0) && !(i = r.next()).done;) a.push(i.value);
	} catch (e) {
		o = { error: e };
	} finally {
		try {
			i && !i.done && (n = r.return) && n.call(r);
		} finally {
			if (o) throw o.error;
		}
	}
	return a;
}
function qi(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
function Ji(e) {
	return this instanceof Ji ? (this.v = e, this) : new Ji(e);
}
function Yi(e, t, n) {
	if (!Symbol.asyncIterator) throw TypeError("Symbol.asyncIterator is not defined.");
	var r = n.apply(e, t || []), i, a = [];
	return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), s("next"), s("throw"), s("return", o), i[Symbol.asyncIterator] = function() {
		return this;
	}, i;
	function o(e) {
		return function(t) {
			return Promise.resolve(t).then(e, d);
		};
	}
	function s(e, t) {
		r[e] && (i[e] = function(t) {
			return new Promise(function(n, r) {
				a.push([
					e,
					t,
					n,
					r
				]) > 1 || c(e, t);
			});
		}, t && (i[e] = t(i[e])));
	}
	function c(e, t) {
		try {
			l(r[e](t));
		} catch (e) {
			f(a[0][3], e);
		}
	}
	function l(e) {
		e.value instanceof Ji ? Promise.resolve(e.value.v).then(u, d) : f(a[0][2], e);
	}
	function u(e) {
		c("next", e);
	}
	function d(e) {
		c("throw", e);
	}
	function f(e, t) {
		e(t), a.shift(), a.length && c(a[0][0], a[0][1]);
	}
}
function Xi(e) {
	if (!Symbol.asyncIterator) throw TypeError("Symbol.asyncIterator is not defined.");
	var t = e[Symbol.asyncIterator], n;
	return t ? t.call(e) : (e = typeof Gi == "function" ? Gi(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
		return this;
	}, n);
	function r(t) {
		n[t] = e[t] && function(n) {
			return new Promise(function(r, a) {
				n = e[t](n), i(r, a, n.done, n.value);
			});
		};
	}
	function i(e, t, n, r) {
		Promise.resolve(r).then(function(t) {
			e({
				value: t,
				done: n
			});
		}, t);
	}
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function Zi(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function Qi(e) {
	var t = e(function(e) {
		Error.call(e), e.stack = (/* @__PURE__ */ Error()).stack;
	});
	return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var $i = Qi(function(e) {
	return function(t) {
		e(this), this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map(function(e, t) {
			return t + 1 + ") " + e.toString();
		}).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t;
	};
});
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function ea(e, t) {
	if (e) {
		var n = e.indexOf(t);
		0 <= n && e.splice(n, 1);
	}
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/Subscription.js
var ta = function() {
	function e(e) {
		this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
	}
	return e.prototype.unsubscribe = function() {
		var e, t, n, r, i;
		if (!this.closed) {
			this.closed = !0;
			var a = this._parentage;
			if (a) {
				if (this._parentage = null, Array.isArray(a)) try {
					for (var o = Gi(a), s = o.next(); !s.done; s = o.next()) s.value.remove(this);
				} catch (t) {
					e = { error: t };
				} finally {
					try {
						s && !s.done && (t = o.return) && t.call(o);
					} finally {
						if (e) throw e.error;
					}
				}
				else a.remove(this);
			}
			var c = this.initialTeardown;
			if (Zi(c)) try {
				c();
			} catch (e) {
				i = e instanceof $i ? e.errors : [e];
			}
			var l = this._finalizers;
			if (l) {
				this._finalizers = null;
				try {
					for (var u = Gi(l), d = u.next(); !d.done; d = u.next()) {
						var f = d.value;
						try {
							ia(f);
						} catch (e) {
							i = i ?? [], e instanceof $i ? i = qi(qi([], Ki(i)), Ki(e.errors)) : i.push(e);
						}
					}
				} catch (e) {
					n = { error: e };
				} finally {
					try {
						d && !d.done && (r = u.return) && r.call(u);
					} finally {
						if (n) throw n.error;
					}
				}
			}
			if (i) throw new $i(i);
		}
	}, e.prototype.add = function(t) {
		if (t && t !== this) {
			if (this.closed) ia(t);
			else {
				if (t instanceof e) {
					if (t.closed || t._hasParent(this)) return;
					t._addParent(this);
				}
				(this._finalizers = this._finalizers ?? []).push(t);
			}
		}
	}, e.prototype._hasParent = function(e) {
		var t = this._parentage;
		return t === e || Array.isArray(t) && t.includes(e);
	}, e.prototype._addParent = function(e) {
		var t = this._parentage;
		this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
	}, e.prototype._removeParent = function(e) {
		var t = this._parentage;
		t === e ? this._parentage = null : Array.isArray(t) && ea(t, e);
	}, e.prototype.remove = function(t) {
		var n = this._finalizers;
		n && ea(n, t), t instanceof e && t._removeParent(this);
	}, e.EMPTY = (function() {
		var t = new e();
		return t.closed = !0, t;
	})(), e;
}(), na = ta.EMPTY;
function ra(e) {
	return e instanceof ta || e && "closed" in e && Zi(e.remove) && Zi(e.add) && Zi(e.unsubscribe);
}
function ia(e) {
	Zi(e) ? e() : e.unsubscribe();
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/config.js
var aa = {
	onUnhandledError: null,
	onStoppedNotification: null,
	Promise: void 0,
	useDeprecatedSynchronousErrorHandling: !1,
	useDeprecatedNextContext: !1
}, oa = {
	setTimeout: function(e, t) {
		var n = [...arguments].slice(2), r = oa.delegate;
		return r?.setTimeout ? r.setTimeout.apply(r, qi([e, t], Ki(n))) : setTimeout.apply(void 0, qi([e, t], Ki(n)));
	},
	clearTimeout: function(e) {
		return (oa.delegate?.clearTimeout || clearTimeout)(e);
	},
	delegate: void 0
};
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function sa(e) {
	oa.setTimeout(function() {
		var t = aa.onUnhandledError;
		if (t) t(e);
		else throw e;
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/noop.js
function ca() {}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var la = (function() {
	return fa("C", void 0, void 0);
})();
function ua(e) {
	return fa("E", void 0, e);
}
function da(e) {
	return fa("N", e, void 0);
}
function fa(e, t, n) {
	return {
		kind: e,
		value: t,
		error: n
	};
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var pa = null;
function ma(e) {
	if (aa.useDeprecatedSynchronousErrorHandling) {
		var t = !pa;
		if (t && (pa = {
			errorThrown: !1,
			error: null
		}), e(), t) {
			var n = pa, r = n.errorThrown, i = n.error;
			if (pa = null, r) throw i;
		}
	} else e();
}
function ha(e) {
	aa.useDeprecatedSynchronousErrorHandling && pa && (pa.errorThrown = !0, pa.error = e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/Subscriber.js
var ga = function(e) {
	Bi(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n.isStopped = !1, t ? (n.destination = t, ra(t) && t.add(n)) : n.destination = wa, n;
	}
	return t.create = function(e, t, n) {
		return new ba(e, t, n);
	}, t.prototype.next = function(e) {
		this.isStopped ? Ca(da(e), this) : this._next(e);
	}, t.prototype.error = function(e) {
		this.isStopped ? Ca(ua(e), this) : (this.isStopped = !0, this._error(e));
	}, t.prototype.complete = function() {
		this.isStopped ? Ca(la, this) : (this.isStopped = !0, this._complete());
	}, t.prototype.unsubscribe = function() {
		this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
	}, t.prototype._next = function(e) {
		this.destination.next(e);
	}, t.prototype._error = function(e) {
		try {
			this.destination.error(e);
		} finally {
			this.unsubscribe();
		}
	}, t.prototype._complete = function() {
		try {
			this.destination.complete();
		} finally {
			this.unsubscribe();
		}
	}, t;
}(ta), _a = Function.prototype.bind;
function va(e, t) {
	return _a.call(e, t);
}
var ya = function() {
	function e(e) {
		this.partialObserver = e;
	}
	return e.prototype.next = function(e) {
		var t = this.partialObserver;
		if (t.next) try {
			t.next(e);
		} catch (e) {
			xa(e);
		}
	}, e.prototype.error = function(e) {
		var t = this.partialObserver;
		if (t.error) try {
			t.error(e);
		} catch (e) {
			xa(e);
		}
		else xa(e);
	}, e.prototype.complete = function() {
		var e = this.partialObserver;
		if (e.complete) try {
			e.complete();
		} catch (e) {
			xa(e);
		}
	}, e;
}(), ba = function(e) {
	Bi(t, e);
	function t(t, n, r) {
		var i = e.call(this) || this, a;
		if (Zi(t) || !t) a = {
			next: t ?? void 0,
			error: n ?? void 0,
			complete: r ?? void 0
		};
		else {
			var o;
			i && aa.useDeprecatedNextContext ? (o = Object.create(t), o.unsubscribe = function() {
				return i.unsubscribe();
			}, a = {
				next: t.next && va(t.next, o),
				error: t.error && va(t.error, o),
				complete: t.complete && va(t.complete, o)
			}) : a = t;
		}
		return i.destination = new ya(a), i;
	}
	return t;
}(ga);
function xa(e) {
	aa.useDeprecatedSynchronousErrorHandling ? ha(e) : sa(e);
}
function Sa(e) {
	throw e;
}
function Ca(e, t) {
	var n = aa.onStoppedNotification;
	n && oa.setTimeout(function() {
		return n(e, t);
	});
}
var wa = {
	closed: !0,
	next: ca,
	error: Sa,
	complete: ca
}, Ta = (function() {
	return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/identity.js
function Ea(e) {
	return e;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/pipe.js
function Da() {
	return Oa([...arguments]);
}
function Oa(e) {
	return e.length === 0 ? Ea : e.length === 1 ? e[0] : function(t) {
		return e.reduce(function(e, t) {
			return t(e);
		}, t);
	};
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/Observable.js
var ka = function() {
	function e(e) {
		e && (this._subscribe = e);
	}
	return e.prototype.lift = function(t) {
		var n = new e();
		return n.source = this, n.operator = t, n;
	}, e.prototype.subscribe = function(e, t, n) {
		var r = this, i = Ma(e) ? e : new ba(e, t, n);
		return ma(function() {
			var e = r, t = e.operator, n = e.source;
			i.add(t ? t.call(i, n) : n ? r._subscribe(i) : r._trySubscribe(i));
		}), i;
	}, e.prototype._trySubscribe = function(e) {
		try {
			return this._subscribe(e);
		} catch (t) {
			e.error(t);
		}
	}, e.prototype.forEach = function(e, t) {
		var n = this;
		return t = Aa(t), new t(function(t, r) {
			var i = new ba({
				next: function(t) {
					try {
						e(t);
					} catch (e) {
						r(e), i.unsubscribe();
					}
				},
				error: r,
				complete: t
			});
			n.subscribe(i);
		});
	}, e.prototype._subscribe = function(e) {
		return this.source?.subscribe(e);
	}, e.prototype[Ta] = function() {
		return this;
	}, e.prototype.pipe = function() {
		return Oa([...arguments])(this);
	}, e.prototype.toPromise = function(e) {
		var t = this;
		return e = Aa(e), new e(function(e, n) {
			var r;
			t.subscribe(function(e) {
				return r = e;
			}, function(e) {
				return n(e);
			}, function() {
				return e(r);
			});
		});
	}, e.create = function(t) {
		return new e(t);
	}, e;
}();
function Aa(e) {
	return e ?? aa.Promise ?? Promise;
}
function ja(e) {
	return e && Zi(e.next) && Zi(e.error) && Zi(e.complete);
}
function Ma(e) {
	return e && e instanceof ga || ja(e) && ra(e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/lift.js
function Na(e) {
	return Zi(e?.lift);
}
function Pa(e) {
	return function(t) {
		if (Na(t)) return t.lift(function(t) {
			try {
				return e(t, this);
			} catch (e) {
				this.error(e);
			}
		});
		throw TypeError("Unable to lift unknown Observable type");
	};
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
function Fa(e, t, n, r, i) {
	return new Ia(e, t, n, r, i);
}
var Ia = function(e) {
	Bi(t, e);
	function t(t, n, r, i, a, o) {
		var s = e.call(this, t) || this;
		return s.onFinalize = a, s.shouldUnsubscribe = o, s._next = n ? function(e) {
			try {
				n(e);
			} catch (e) {
				t.error(e);
			}
		} : e.prototype._next, s._error = i ? function(e) {
			try {
				i(e);
			} catch (e) {
				t.error(e);
			} finally {
				this.unsubscribe();
			}
		} : e.prototype._error, s._complete = r ? function() {
			try {
				r();
			} catch (e) {
				t.error(e);
			} finally {
				this.unsubscribe();
			}
		} : e.prototype._complete, s;
	}
	return t.prototype.unsubscribe = function() {
		var t;
		if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
			var n = this.closed;
			e.prototype.unsubscribe.call(this), !n && ((t = this.onFinalize) == null || t.call(this));
		}
	}, t;
}(ga), La = Qi(function(e) {
	return function() {
		e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
	};
}), Ra = function(e) {
	Bi(t, e);
	function t() {
		var t = e.call(this) || this;
		return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
	}
	return t.prototype.lift = function(e) {
		var t = new za(this, this);
		return t.operator = e, t;
	}, t.prototype._throwIfClosed = function() {
		if (this.closed) throw new La();
	}, t.prototype.next = function(e) {
		var t = this;
		ma(function() {
			var n, r;
			if (t._throwIfClosed(), !t.isStopped) {
				t.currentObservers || (t.currentObservers = Array.from(t.observers));
				try {
					for (var i = Gi(t.currentObservers), a = i.next(); !a.done; a = i.next()) a.value.next(e);
				} catch (e) {
					n = { error: e };
				} finally {
					try {
						a && !a.done && (r = i.return) && r.call(i);
					} finally {
						if (n) throw n.error;
					}
				}
			}
		});
	}, t.prototype.error = function(e) {
		var t = this;
		ma(function() {
			if (t._throwIfClosed(), !t.isStopped) {
				t.hasError = t.isStopped = !0, t.thrownError = e;
				for (var n = t.observers; n.length;) n.shift().error(e);
			}
		});
	}, t.prototype.complete = function() {
		var e = this;
		ma(function() {
			if (e._throwIfClosed(), !e.isStopped) {
				e.isStopped = !0;
				for (var t = e.observers; t.length;) t.shift().complete();
			}
		});
	}, t.prototype.unsubscribe = function() {
		this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
	}, Object.defineProperty(t.prototype, "observed", {
		get: function() {
			return this.observers?.length > 0;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype._trySubscribe = function(t) {
		return this._throwIfClosed(), e.prototype._trySubscribe.call(this, t);
	}, t.prototype._subscribe = function(e) {
		return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
	}, t.prototype._innerSubscribe = function(e) {
		var t = this, n = this, r = n.hasError, i = n.isStopped, a = n.observers;
		return r || i ? na : (this.currentObservers = null, a.push(e), new ta(function() {
			t.currentObservers = null, ea(a, e);
		}));
	}, t.prototype._checkFinalizedStatuses = function(e) {
		var t = this, n = t.hasError, r = t.thrownError, i = t.isStopped;
		n ? e.error(r) : i && e.complete();
	}, t.prototype.asObservable = function() {
		var e = new ka();
		return e.source = this, e;
	}, t.create = function(e, t) {
		return new za(e, t);
	}, t;
}(ka), za = function(e) {
	Bi(t, e);
	function t(t, n) {
		var r = e.call(this) || this;
		return r.destination = t, r.source = n, r;
	}
	return t.prototype.next = function(e) {
		var t, n;
		(n = (t = this.destination)?.next) == null || n.call(t, e);
	}, t.prototype.error = function(e) {
		var t, n;
		(n = (t = this.destination)?.error) == null || n.call(t, e);
	}, t.prototype.complete = function() {
		var e, t;
		(t = (e = this.destination)?.complete) == null || t.call(e);
	}, t.prototype._subscribe = function(e) {
		return this.source?.subscribe(e) ?? na;
	}, t;
}(Ra), Ba = function(e) {
	Bi(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n._value = t, n;
	}
	return Object.defineProperty(t.prototype, "value", {
		get: function() {
			return this.getValue();
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype._subscribe = function(t) {
		var n = e.prototype._subscribe.call(this, t);
		return !n.closed && t.next(this._value), n;
	}, t.prototype.getValue = function() {
		var e = this, t = e.hasError, n = e.thrownError, r = e._value;
		if (t) throw n;
		return this._throwIfClosed(), r;
	}, t.prototype.next = function(t) {
		e.prototype.next.call(this, this._value = t);
	}, t;
}(Ra), Va = {
	now: function() {
		return (Va.delegate || Date).now();
	},
	delegate: void 0
}, Ha = function(e) {
	Bi(t, e);
	function t(t, n, r) {
		t === void 0 && (t = Infinity), n === void 0 && (n = Infinity), r === void 0 && (r = Va);
		var i = e.call(this) || this;
		return i._bufferSize = t, i._windowTime = n, i._timestampProvider = r, i._buffer = [], i._infiniteTimeWindow = !0, i._infiniteTimeWindow = n === Infinity, i._bufferSize = Math.max(1, t), i._windowTime = Math.max(1, n), i;
	}
	return t.prototype.next = function(t) {
		var n = this, r = n.isStopped, i = n._buffer, a = n._infiniteTimeWindow, o = n._timestampProvider, s = n._windowTime;
		r || (i.push(t), !a && i.push(o.now() + s)), this._trimBuffer(), e.prototype.next.call(this, t);
	}, t.prototype._subscribe = function(e) {
		this._throwIfClosed(), this._trimBuffer();
		for (var t = this._innerSubscribe(e), n = this, r = n._infiniteTimeWindow, i = n._buffer.slice(), a = 0; a < i.length && !e.closed; a += r ? 1 : 2) e.next(i[a]);
		return this._checkFinalizedStatuses(e), t;
	}, t.prototype._trimBuffer = function() {
		var e = this, t = e._bufferSize, n = e._timestampProvider, r = e._buffer, i = e._infiniteTimeWindow, a = (i ? 1 : 2) * t;
		if (t < Infinity && a < r.length && r.splice(0, r.length - a), !i) {
			for (var o = n.now(), s = 0, c = 1; c < r.length && r[c] <= o; c += 2) s = c;
			s && r.splice(0, s + 1);
		}
	}, t;
}(Ra), Ua = function(e) {
	Bi(t, e);
	function t(t, n) {
		return e.call(this) || this;
	}
	return t.prototype.schedule = function(e, t) {
		return t === void 0 && (t = 0), this;
	}, t;
}(ta), Wa = {
	setInterval: function(e, t) {
		var n = [...arguments].slice(2), r = Wa.delegate;
		return r?.setInterval ? r.setInterval.apply(r, qi([e, t], Ki(n))) : setInterval.apply(void 0, qi([e, t], Ki(n)));
	},
	clearInterval: function(e) {
		return (Wa.delegate?.clearInterval || clearInterval)(e);
	},
	delegate: void 0
}, Ga = function(e) {
	Bi(t, e);
	function t(t, n) {
		var r = e.call(this, t, n) || this;
		return r.scheduler = t, r.work = n, r.pending = !1, r;
	}
	return t.prototype.schedule = function(e, t) {
		if (t === void 0 && (t = 0), this.closed) return this;
		this.state = e;
		var n = this.id, r = this.scheduler;
		return n != null && (this.id = this.recycleAsyncId(r, n, t)), this.pending = !0, this.delay = t, this.id = this.id ?? this.requestAsyncId(r, this.id, t), this;
	}, t.prototype.requestAsyncId = function(e, t, n) {
		return n === void 0 && (n = 0), Wa.setInterval(e.flush.bind(e, this), n);
	}, t.prototype.recycleAsyncId = function(e, t, n) {
		if (n === void 0 && (n = 0), n != null && this.delay === n && this.pending === !1) return t;
		t != null && Wa.clearInterval(t);
	}, t.prototype.execute = function(e, t) {
		if (this.closed) return /* @__PURE__ */ Error("executing a cancelled action");
		this.pending = !1;
		var n = this._execute(e, t);
		if (n) return n;
		this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
	}, t.prototype._execute = function(e, t) {
		var n = !1, r;
		try {
			this.work(e);
		} catch (e) {
			n = !0, r = e || /* @__PURE__ */ Error("Scheduled action threw falsy error");
		}
		if (n) return this.unsubscribe(), r;
	}, t.prototype.unsubscribe = function() {
		if (!this.closed) {
			var t = this, n = t.id, r = t.scheduler, i = r.actions;
			this.work = this.state = this.scheduler = null, this.pending = !1, ea(i, this), n != null && (this.id = this.recycleAsyncId(r, n, null)), this.delay = null, e.prototype.unsubscribe.call(this);
		}
	}, t;
}(Ua), Ka = 1, qa, Ja = {};
function Ya(e) {
	return e in Ja && (delete Ja[e], !0);
}
var Xa = {
	setImmediate: function(e) {
		var t = Ka++;
		return Ja[t] = !0, qa || (qa = Promise.resolve()), qa.then(function() {
			return Ya(t) && e();
		}), t;
	},
	clearImmediate: function(e) {
		Ya(e);
	}
}, Za = Xa.setImmediate, Qa = Xa.clearImmediate, $a = {
	setImmediate: function() {
		var e = [...arguments];
		return ($a.delegate?.setImmediate || Za).apply(void 0, qi([], Ki(e)));
	},
	clearImmediate: function(e) {
		return ($a.delegate?.clearImmediate || Qa)(e);
	},
	delegate: void 0
}, eo = function(e) {
	Bi(t, e);
	function t(t, n) {
		var r = e.call(this, t, n) || this;
		return r.scheduler = t, r.work = n, r;
	}
	return t.prototype.requestAsyncId = function(t, n, r) {
		return r === void 0 && (r = 0), r !== null && r > 0 ? e.prototype.requestAsyncId.call(this, t, n, r) : (t.actions.push(this), t._scheduled || (t._scheduled = $a.setImmediate(t.flush.bind(t, void 0))));
	}, t.prototype.recycleAsyncId = function(t, n, r) {
		if (r === void 0 && (r = 0), r == null ? this.delay > 0 : r > 0) return e.prototype.recycleAsyncId.call(this, t, n, r);
		var i = t.actions;
		n != null && i[i.length - 1]?.id !== n && ($a.clearImmediate(n), t._scheduled === n && (t._scheduled = void 0));
	}, t;
}(Ga), to = function() {
	function e(t, n) {
		n === void 0 && (n = e.now), this.schedulerActionCtor = t, this.now = n;
	}
	return e.prototype.schedule = function(e, t, n) {
		return t === void 0 && (t = 0), new this.schedulerActionCtor(this, e).schedule(n, t);
	}, e.now = Va.now, e;
}(), no = function(e) {
	Bi(t, e);
	function t(t, n) {
		n === void 0 && (n = to.now);
		var r = e.call(this, t, n) || this;
		return r.actions = [], r._active = !1, r;
	}
	return t.prototype.flush = function(e) {
		var t = this.actions;
		if (this._active) {
			t.push(e);
			return;
		}
		var n;
		this._active = !0;
		do
			if (n = e.execute(e.state, e.delay)) break;
		while (e = t.shift());
		if (this._active = !1, n) {
			for (; e = t.shift();) e.unsubscribe();
			throw n;
		}
	}, t;
}(to), ro = new (function(e) {
	Bi(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.flush = function(e) {
		this._active = !0;
		var t = this._scheduled;
		this._scheduled = void 0;
		var n = this.actions, r;
		e = e || n.shift();
		do
			if (r = e.execute(e.state, e.delay)) break;
		while ((e = n[0]) && e.id === t && n.shift());
		if (this._active = !1, r) {
			for (; (e = n[0]) && e.id === t && n.shift();) e.unsubscribe();
			throw r;
		}
	}, t;
}(no))(eo), io = new no(Ga), ao = io, oo = new ka(function(e) {
	return e.complete();
});
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isScheduler.js
function so(e) {
	return e && Zi(e.schedule);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/args.js
function co(e) {
	return e[e.length - 1];
}
function lo(e) {
	return Zi(co(e)) ? e.pop() : void 0;
}
function uo(e) {
	return so(co(e)) ? e.pop() : void 0;
}
function fo(e, t) {
	return typeof co(e) == "number" ? e.pop() : t;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
var po = (function(e) {
	return e && typeof e.length == "number" && typeof e != "function";
});
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isPromise.js
function mo(e) {
	return Zi(e?.then);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
function ho(e) {
	return Zi(e[Ta]);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
function go(e) {
	return Symbol.asyncIterator && Zi(e?.[Symbol.asyncIterator]);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
function _o(e) {
	return /* @__PURE__ */ TypeError("You provided " + (typeof e == "object" && e ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
function vo() {
	return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var yo = vo();
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isIterable.js
function bo(e) {
	return Zi(e?.[yo]);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
function xo(e) {
	return Yi(this, arguments, function() {
		var t, n, r, i;
		return Wi(this, function(a) {
			switch (a.label) {
				case 0: t = e.getReader(), a.label = 1;
				case 1: a.trys.push([
					1,
					,
					9,
					10
				]), a.label = 2;
				case 2: return [4, Ji(t.read())];
				case 3: return n = a.sent(), r = n.value, i = n.done, i ? [4, Ji(void 0)] : [3, 5];
				case 4: return [2, a.sent()];
				case 5: return [4, Ji(r)];
				case 6: return [4, a.sent()];
				case 7: return a.sent(), [3, 2];
				case 8: return [3, 10];
				case 9: return t.releaseLock(), [7];
				case 10: return [2];
			}
		});
	});
}
function So(e) {
	return Zi(e?.getReader);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
function Co(e) {
	if (e instanceof ka) return e;
	if (e != null) {
		if (ho(e)) return wo(e);
		if (po(e)) return To(e);
		if (mo(e)) return Eo(e);
		if (go(e)) return Oo(e);
		if (bo(e)) return Do(e);
		if (So(e)) return ko(e);
	}
	throw _o(e);
}
function wo(e) {
	return new ka(function(t) {
		var n = e[Ta]();
		if (Zi(n.subscribe)) return n.subscribe(t);
		throw TypeError("Provided object does not correctly implement Symbol.observable");
	});
}
function To(e) {
	return new ka(function(t) {
		for (var n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
		t.complete();
	});
}
function Eo(e) {
	return new ka(function(t) {
		e.then(function(e) {
			t.closed || (t.next(e), t.complete());
		}, function(e) {
			return t.error(e);
		}).then(null, sa);
	});
}
function Do(e) {
	return new ka(function(t) {
		var n, r;
		try {
			for (var i = Gi(e), a = i.next(); !a.done; a = i.next()) {
				var o = a.value;
				if (t.next(o), t.closed) return;
			}
		} catch (e) {
			n = { error: e };
		} finally {
			try {
				a && !a.done && (r = i.return) && r.call(i);
			} finally {
				if (n) throw n.error;
			}
		}
		t.complete();
	});
}
function Oo(e) {
	return new ka(function(t) {
		Ao(e, t).catch(function(e) {
			return t.error(e);
		});
	});
}
function ko(e) {
	return Oo(xo(e));
}
function Ao(e, t) {
	var n, r, i, a;
	return Ui(this, void 0, void 0, function() {
		var o, s;
		return Wi(this, function(c) {
			switch (c.label) {
				case 0: c.trys.push([
					0,
					5,
					6,
					11
				]), n = Xi(e), c.label = 1;
				case 1: return [4, n.next()];
				case 2:
					if (r = c.sent(), r.done) return [3, 4];
					if (o = r.value, t.next(o), t.closed) return [2];
					c.label = 3;
				case 3: return [3, 1];
				case 4: return [3, 11];
				case 5: return s = c.sent(), i = { error: s }, [3, 11];
				case 6: return c.trys.push([
					6,
					,
					9,
					10
				]), r && !r.done && (a = n.return) ? [4, a.call(n)] : [3, 8];
				case 7: c.sent(), c.label = 8;
				case 8: return [3, 10];
				case 9:
					if (i) throw i.error;
					return [7];
				case 10: return [7];
				case 11: return t.complete(), [2];
			}
		});
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
function jo(e, t, n, r, i) {
	r === void 0 && (r = 0), i === void 0 && (i = !1);
	var a = t.schedule(function() {
		n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
	}, r);
	if (e.add(a), !i) return a;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/observeOn.js
function Mo(e, t) {
	return t === void 0 && (t = 0), Pa(function(n, r) {
		n.subscribe(Fa(r, function(n) {
			return jo(r, e, function() {
				return r.next(n);
			}, t);
		}, function() {
			return jo(r, e, function() {
				return r.complete();
			}, t);
		}, function(n) {
			return jo(r, e, function() {
				return r.error(n);
			}, t);
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js
function No(e, t) {
	return t === void 0 && (t = 0), Pa(function(n, r) {
		r.add(e.schedule(function() {
			return n.subscribe(r);
		}, t));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js
function Po(e, t) {
	return Co(e).pipe(No(t), Mo(t));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js
function Fo(e, t) {
	return Co(e).pipe(No(t), Mo(t));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js
function Io(e, t) {
	return new ka(function(n) {
		var r = 0;
		return t.schedule(function() {
			r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule());
		});
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js
function Lo(e, t) {
	return new ka(function(n) {
		var r;
		return jo(n, t, function() {
			r = e[yo](), jo(n, t, function() {
				var e, t, i;
				try {
					e = r.next(), t = e.value, i = e.done;
				} catch (e) {
					n.error(e);
					return;
				}
				i ? n.complete() : n.next(t);
			}, 0, !0);
		}), function() {
			return Zi(r?.return) && r.return();
		};
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js
function Ro(e, t) {
	if (!e) throw Error("Iterable cannot be null");
	return new ka(function(n) {
		jo(n, t, function() {
			var r = e[Symbol.asyncIterator]();
			jo(n, t, function() {
				r.next().then(function(e) {
					e.done ? n.complete() : n.next(e.value);
				});
			}, 0, !0);
		});
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js
function zo(e, t) {
	return Ro(xo(e), t);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js
function Bo(e, t) {
	if (e != null) {
		if (ho(e)) return Po(e, t);
		if (po(e)) return Io(e, t);
		if (mo(e)) return Fo(e, t);
		if (go(e)) return Ro(e, t);
		if (bo(e)) return Lo(e, t);
		if (So(e)) return zo(e, t);
	}
	throw _o(e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/from.js
function Vo(e, t) {
	return t ? Bo(e, t) : Co(e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/of.js
function k() {
	var e = [...arguments];
	return Vo(e, uo(e));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/throwError.js
function A(e, t) {
	var n = Zi(e) ? e : function() {
		return e;
	}, r = function(e) {
		return e.error(n());
	};
	return new ka(t ? function(e) {
		return t.schedule(r, 0, e);
	} : r);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/Notification.js
var Ho;
(function(e) {
	e.NEXT = "N", e.ERROR = "E", e.COMPLETE = "C";
})(Ho || (Ho = {}));
var Uo = function() {
	function e(e, t, n) {
		this.kind = e, this.value = t, this.error = n, this.hasValue = e === "N";
	}
	return e.prototype.observe = function(e) {
		return Wo(this, e);
	}, e.prototype.do = function(e, t, n) {
		var r = this, i = r.kind, a = r.value, o = r.error;
		return i === "N" ? e?.(a) : i === "E" ? t?.(o) : n?.();
	}, e.prototype.accept = function(e, t, n) {
		return Zi(e?.next) ? this.observe(e) : this.do(e, t, n);
	}, e.prototype.toObservable = function() {
		var e = this, t = e.kind, n = e.value, r = e.error, i = t === "N" ? k(n) : t === "E" ? A(function() {
			return r;
		}) : t === "C" ? oo : 0;
		if (!i) throw TypeError("Unexpected notification kind " + t);
		return i;
	}, e.createNext = function(t) {
		return new e("N", t);
	}, e.createError = function(t) {
		return new e("E", void 0, t);
	}, e.createComplete = function() {
		return e.completeNotification;
	}, e.completeNotification = new e("C"), e;
}();
function Wo(e, t) {
	var n, r, i, a = e, o = a.kind, s = a.value, c = a.error;
	if (typeof o != "string") throw TypeError("Invalid notification, missing \"kind\"");
	o === "N" ? (n = t.next) == null || n.call(t, s) : o === "E" ? (r = t.error) == null || r.call(t, c) : (i = t.complete) == null || i.call(t);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/EmptyError.js
var Go = Qi(function(e) {
	return function() {
		e(this), this.name = "EmptyError", this.message = "no elements in sequence";
	};
});
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/lastValueFrom.js
function Ko(e, t) {
	var n = typeof t == "object";
	return new Promise(function(r, i) {
		var a = !1, o;
		e.subscribe({
			next: function(e) {
				o = e, a = !0;
			},
			error: i,
			complete: function() {
				a ? r(o) : n ? r(t.defaultValue) : i(new Go());
			}
		});
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/firstValueFrom.js
function qo(e, t) {
	var n = typeof t == "object";
	return new Promise(function(r, i) {
		var a = new ba({
			next: function(e) {
				r(e), a.unsubscribe();
			},
			error: i,
			complete: function() {
				n ? r(t.defaultValue) : i(new Go());
			}
		});
		e.subscribe(a);
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isDate.js
function Jo(e) {
	return e instanceof Date && !isNaN(e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/timeout.js
var Yo = Qi(function(e) {
	return function(t) {
		t === void 0 && (t = null), e(this), this.message = "Timeout has occurred", this.name = "TimeoutError", this.info = t;
	};
});
function Xo(e, t) {
	var n = Jo(e) ? { first: e } : typeof e == "number" ? { each: e } : e, r = n.first, i = n.each, a = n.with, o = a === void 0 ? Zo : a, s = n.scheduler, c = s === void 0 ? t ?? io : s, l = n.meta, u = l === void 0 ? null : l;
	if (r == null && i == null) throw TypeError("No timeout provided.");
	return Pa(function(e, t) {
		var n, a, s = null, l = 0, d = function(e) {
			a = jo(t, c, function() {
				try {
					n.unsubscribe(), Co(o({
						meta: u,
						lastValue: s,
						seen: l
					})).subscribe(t);
				} catch (e) {
					t.error(e);
				}
			}, e);
		};
		n = e.subscribe(Fa(t, function(e) {
			a?.unsubscribe(), l++, t.next(s = e), i > 0 && d(i);
		}, void 0, void 0, function() {
			a?.closed || a?.unsubscribe(), s = null;
		})), !l && d(r == null ? i : typeof r == "number" ? r : +r - c.now());
	});
}
function Zo(e) {
	throw new Yo(e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/map.js
function j(e, t) {
	return Pa(function(n, r) {
		var i = 0;
		n.subscribe(Fa(r, function(n) {
			r.next(e.call(t, n, i++));
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js
var Qo = Array.isArray;
function $o(e, t) {
	return Qo(t) ? e.apply(void 0, qi([], Ki(t))) : e(t);
}
function es(e) {
	return j(function(t) {
		return $o(e, t);
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js
var ts = Array.isArray, ns = Object.getPrototypeOf, rs = Object.prototype, is = Object.keys;
function as(e) {
	if (e.length === 1) {
		var t = e[0];
		if (ts(t)) return {
			args: t,
			keys: null
		};
		if (os(t)) {
			var n = is(t);
			return {
				args: n.map(function(e) {
					return t[e];
				}),
				keys: n
			};
		}
	}
	return {
		args: e,
		keys: null
	};
}
function os(e) {
	return e && typeof e == "object" && ns(e) === rs;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/createObject.js
function ss(e, t) {
	return e.reduce(function(e, n, r) {
		return e[n] = t[r], e;
	}, {});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js
function cs() {
	var e = [...arguments], t = uo(e), n = lo(e), r = as(e), i = r.args, a = r.keys;
	if (i.length === 0) return Vo([], t);
	var o = new ka(ls(i, t, a ? function(e) {
		return ss(a, e);
	} : Ea));
	return n ? o.pipe(es(n)) : o;
}
function ls(e, t, n) {
	return n === void 0 && (n = Ea), function(r) {
		us(t, function() {
			for (var i = e.length, a = Array(i), o = i, s = i, c = function(i) {
				us(t, function() {
					var c = Vo(e[i], t), l = !1;
					c.subscribe(Fa(r, function(e) {
						a[i] = e, l || (l = !0, s--), s || r.next(n(a.slice()));
					}, function() {
						--o || r.complete();
					}));
				}, r);
			}, l = 0; l < i; l++) c(l);
		}, r);
	};
}
function us(e, t, n) {
	e ? jo(n, e, t) : t();
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js
function ds(e, t, n, r, i, a, o, s) {
	var c = [], l = 0, u = 0, d = !1, f = function() {
		d && !c.length && !l && t.complete();
	}, p = function(e) {
		return l < r ? m(e) : c.push(e);
	}, m = function(e) {
		a && t.next(e), l++;
		var s = !1;
		Co(n(e, u++)).subscribe(Fa(t, function(e) {
			i?.(e), a ? p(e) : t.next(e);
		}, function() {
			s = !0;
		}, void 0, function() {
			if (s) try {
				l--;
				for (var e = function() {
					var e = c.shift();
					o ? jo(t, o, function() {
						return m(e);
					}) : m(e);
				}; c.length && l < r;) e();
				f();
			} catch (e) {
				t.error(e);
			}
		}));
	};
	return e.subscribe(Fa(t, p, function() {
		d = !0, f();
	})), function() {
		s?.();
	};
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js
function fs(e, t, n) {
	return n === void 0 && (n = Infinity), Zi(t) ? fs(function(n, r) {
		return j(function(e, i) {
			return t(n, e, r, i);
		})(Co(e(n, r)));
	}, n) : (typeof t == "number" && (n = t), Pa(function(t, r) {
		return ds(t, r, e, n);
	}));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js
function ps(e) {
	return e === void 0 && (e = Infinity), fs(Ea, e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/concatAll.js
function ms() {
	return ps(1);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/concat.js
function hs() {
	var e = [...arguments];
	return ms()(Vo(e, uo(e)));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/defer.js
function gs(e) {
	return new ka(function(t) {
		Co(e()).subscribe(t);
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/timer.js
function _s(e, t, n) {
	e === void 0 && (e = 0), n === void 0 && (n = ao);
	var r = -1;
	return t != null && (so(t) ? n = t : r = t), new ka(function(t) {
		var i = Jo(e) ? +e - n.now() : e;
		i < 0 && (i = 0);
		var a = 0;
		return n.schedule(function() {
			t.closed || (t.next(a++), 0 <= r ? this.schedule(void 0, r) : t.complete());
		}, i);
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/merge.js
function vs() {
	var e = [...arguments], t = uo(e), n = fo(e, Infinity), r = e;
	return r.length ? r.length === 1 ? Co(r[0]) : ps(n)(Vo(r, t)) : oo;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/never.js
var ys = new ka(ca);
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/filter.js
function bs(e, t) {
	return Pa(function(n, r) {
		var i = 0;
		n.subscribe(Fa(r, function(n) {
			return e.call(t, n, i++) && r.next(n);
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/catchError.js
function xs(e) {
	return Pa(function(t, n) {
		var r = null, i = !1, a;
		r = t.subscribe(Fa(n, void 0, void 0, function(o) {
			a = Co(e(o, xs(e)(t))), r ? (r.unsubscribe(), r = null, a.subscribe(n)) : i = !0;
		})), i && (r.unsubscribe(), r = null, a.subscribe(n));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/scanInternals.js
function Ss(e, t, n, r, i) {
	return function(a, o) {
		var s = n, c = t, l = 0;
		a.subscribe(Fa(o, function(t) {
			var n = l++;
			c = s ? e(c, t, n) : (s = !0, t), r && o.next(c);
		}, i && (function() {
			s && o.next(c), o.complete();
		})));
	};
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/concatMap.js
function Cs(e, t) {
	return Zi(t) ? fs(e, t, 1) : fs(e, 1);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/concat.js
function ws() {
	var e = [...arguments], t = uo(e);
	return Pa(function(n, r) {
		ms()(Vo(qi([n], Ki(e)), t)).subscribe(r);
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/concatWith.js
function Ts() {
	var e = [...arguments];
	return ws.apply(void 0, qi([], Ki(e)));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/defaultIfEmpty.js
function Es(e) {
	return Pa(function(t, n) {
		var r = !1;
		t.subscribe(Fa(n, function(e) {
			r = !0, n.next(e);
		}, function() {
			r || n.next(e), n.complete();
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/take.js
function Ds(e) {
	return e <= 0 ? function() {
		return oo;
	} : Pa(function(t, n) {
		var r = 0;
		t.subscribe(Fa(n, function(t) {
			++r <= e && (n.next(t), e <= r && n.complete());
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js
function Os() {
	return Pa(function(e, t) {
		e.subscribe(Fa(t, ca));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/mapTo.js
function ks(e) {
	return j(function() {
		return e;
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/delayWhen.js
function As(e, t) {
	return t ? function(n) {
		return hs(t.pipe(Ds(1), Os()), n.pipe(As(e)));
	} : fs(function(t, n) {
		return Co(e(t, n)).pipe(Ds(1), ks(t));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/delay.js
function js(e, t) {
	t === void 0 && (t = io);
	var n = _s(e, t);
	return As(function() {
		return n;
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/dematerialize.js
function Ms() {
	return Pa(function(e, t) {
		e.subscribe(Fa(t, function(e) {
			return Wo(e, t);
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js
function Ns(e, t) {
	return t === void 0 && (t = Ea), e = e ?? Ps, Pa(function(n, r) {
		var i, a = !0;
		n.subscribe(Fa(r, function(n) {
			var o = t(n);
			(a || !e(i, o)) && (a = !1, i = o, r.next(n));
		}));
	});
}
function Ps(e, t) {
	return e === t;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/endWith.js
function Fs() {
	var e = [...arguments];
	return function(t) {
		return hs(t, k.apply(void 0, qi([], Ki(e))));
	};
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/finalize.js
function Is(e) {
	return Pa(function(t, n) {
		try {
			t.subscribe(n);
		} finally {
			n.add(e);
		}
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/scan.js
function Ls(e, t) {
	return Pa(Ss(e, t, arguments.length >= 2, !0));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/share.js
function Rs(e) {
	e === void 0 && (e = {});
	var t = e.connector, n = t === void 0 ? function() {
		return new Ra();
	} : t, r = e.resetOnError, i = r === void 0 || r, a = e.resetOnComplete, o = a === void 0 || a, s = e.resetOnRefCountZero, c = s === void 0 || s;
	return function(e) {
		var t, r, a, s = 0, l = !1, u = !1, d = function() {
			r?.unsubscribe(), r = void 0;
		}, f = function() {
			d(), t = a = void 0, l = u = !1;
		}, p = function() {
			var e = t;
			f(), e?.unsubscribe();
		};
		return Pa(function(e, m) {
			s++, !u && !l && d();
			var h = a = a ?? n();
			m.add(function() {
				s--, s === 0 && !u && !l && (r = zs(p, c));
			}), h.subscribe(m), !t && s > 0 && (t = new ba({
				next: function(e) {
					return h.next(e);
				},
				error: function(e) {
					u = !0, d(), r = zs(f, i, e), h.error(e);
				},
				complete: function() {
					l = !0, d(), r = zs(f, o), h.complete();
				}
			}), Co(e).subscribe(t));
		})(e);
	};
}
function zs(e, t) {
	var n = [...arguments].slice(2);
	if (t === !0) {
		e();
		return;
	}
	if (t !== !1) {
		var r = new ba({ next: function() {
			r.unsubscribe(), e();
		} });
		return Co(t.apply(void 0, qi([], Ki(n)))).subscribe(r);
	}
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js
function Bs(e, t, n) {
	var r, i, a, o, s = !1;
	return e && typeof e == "object" ? (r = e.bufferSize, o = r === void 0 ? Infinity : r, i = e.windowTime, t = i === void 0 ? Infinity : i, a = e.refCount, s = a !== void 0 && a, n = e.scheduler) : o = e ?? Infinity, Rs({
		connector: function() {
			return new Ha(o, t, n);
		},
		resetOnError: !0,
		resetOnComplete: !1,
		resetOnRefCountZero: s
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/switchMap.js
function Vs(e, t) {
	return Pa(function(n, r) {
		var i = null, a = 0, o = !1, s = function() {
			return o && !i && r.complete();
		};
		n.subscribe(Fa(r, function(n) {
			i?.unsubscribe();
			var o = 0, c = a++;
			Co(e(n, c)).subscribe(i = Fa(r, function(e) {
				return r.next(t ? t(n, e, c, o++) : e);
			}, function() {
				i = null, s();
			}));
		}, function() {
			o = !0, s();
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js
function Hs(e) {
	return Pa(function(t, n) {
		Co(e).subscribe(Fa(n, function() {
			return n.complete();
		}, ca)), !n.closed && t.subscribe(n);
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/tap.js
function Us(e, t, n) {
	var r = Zi(e) || t || n ? {
		next: e,
		error: t,
		complete: n
	} : e;
	return r ? Pa(function(e, t) {
		var n;
		(n = r.subscribe) == null || n.call(r);
		var i = !0;
		e.subscribe(Fa(t, function(e) {
			var n;
			(n = r.next) == null || n.call(r, e), t.next(e);
		}, function() {
			var e;
			i = !1, (e = r.complete) == null || e.call(r), t.complete();
		}, function(e) {
			var n;
			i = !1, (n = r.error) == null || n.call(r, e), t.error(e);
		}, function() {
			var e, t;
			i && ((e = r.unsubscribe) == null || e.call(r)), (t = r.finalize) == null || t.call(r);
		}));
	}) : Ea;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js
function Ws() {
	var e = [...arguments], t = lo(e);
	return Pa(function(n, r) {
		for (var i = e.length, a = Array(i), o = e.map(function() {
			return !1;
		}), s = !1, c = function(t) {
			Co(e[t]).subscribe(Fa(r, function(e) {
				a[t] = e, !s && !o[t] && (o[t] = !0, (s = o.every(Ea)) && (o = null));
			}, ca));
		}, l = 0; l < i; l++) c(l);
		n.subscribe(Fa(r, function(e) {
			if (s) {
				var n = qi([e], Ki(a));
				r.next(t ? t.apply(void 0, qi([], Ki(n))) : n);
			}
		}));
	});
}
//#endregion
//#region node_modules/untruncate-json/dist/esm/index.js
function Gs(e) {
	return " \r\n	".indexOf(e) >= 0;
}
function Ks(e) {
	for (var t = ["topLevel"], n = 0, r, i, a, o = function(e) {
		return t.push(e);
	}, s = function(e) {
		return t[t.length - 1] = e;
	}, c = function(e) {
		r ?? (r = n, i = t.length, a = e);
	}, l = function(e) {
		e === a && (r = void 0, i = void 0, a = void 0);
	}, u = function() {
		return t.pop();
	}, d = function() {
		return n--;
	}, f = function(e) {
		if ("0" <= e && e <= "9") {
			o("number");
			return;
		}
		switch (e) {
			case "\"":
				o("string");
				return;
			case "-":
				o("numberNeedsDigit");
				return;
			case "t":
				o("true");
				return;
			case "f":
				o("false");
				return;
			case "n":
				o("null");
				return;
			case "[":
				o("arrayNeedsValue");
				return;
			case "{":
				o("objectNeedsKey");
				return;
		}
	}, p = e.length; n < p; n++) {
		var m = e[n];
		switch (t[t.length - 1]) {
			case "topLevel":
				f(m);
				break;
			case "string":
				switch (m) {
					case "\"":
						u();
						break;
					case "\\": c("stringEscape"), o("stringEscaped");
				}
				break;
			case "stringEscaped":
				m === "u" ? o("stringUnicode") : (l("stringEscape"), u());
				break;
			case "stringUnicode":
				n - e.lastIndexOf("u", n) === 4 && (l("stringEscape"), u());
				break;
			case "number":
				m === "." ? s("numberNeedsDigit") : m === "e" || m === "E" ? s("numberNeedsExponent") : (m < "0" || m > "9") && (d(), u());
				break;
			case "numberNeedsDigit":
				s("number");
				break;
			case "numberNeedsExponent":
				s(m === "+" || m === "-" ? "numberNeedsDigit" : "number");
				break;
			case "true":
			case "false":
			case "null":
				(m < "a" || m > "z") && (d(), u());
				break;
			case "arrayNeedsValue":
				m === "]" ? u() : Gs(m) || (l("collectionItem"), s("arrayNeedsComma"), f(m));
				break;
			case "arrayNeedsComma":
				m === "]" ? u() : m === "," && (c("collectionItem"), s("arrayNeedsValue"));
				break;
			case "objectNeedsKey":
				m === "}" ? u() : m === "\"" && (c("collectionItem"), s("objectNeedsColon"), o("string"));
				break;
			case "objectNeedsColon":
				m === ":" && s("objectNeedsValue");
				break;
			case "objectNeedsValue":
				Gs(m) || (l("collectionItem"), s("objectNeedsComma"), f(m));
				break;
			case "objectNeedsComma": m === "}" ? u() : m === "," && (c("collectionItem"), s("objectNeedsKey"));
		}
	}
	i != null && (t.length = i);
	for (var h = [r == null ? e : e.slice(0, r)], ee = function(t) {
		return h.push(t.slice(e.length - e.lastIndexOf(t[0])));
	}, te = t.length - 1; te >= 0; te--) switch (t[te]) {
		case "string":
			h.push("\"");
			break;
		case "numberNeedsDigit":
		case "numberNeedsExponent":
			h.push("0");
			break;
		case "true":
			ee("true");
			break;
		case "false":
			ee("false");
			break;
		case "null":
			ee("null");
			break;
		case "arrayNeedsValue":
		case "arrayNeedsComma":
			h.push("]");
			break;
		case "objectNeedsKey":
		case "objectNeedsColon":
		case "objectNeedsValue":
		case "objectNeedsComma": h.push("}");
	}
	return h.join("");
}
//#endregion
//#region node_modules/@bufbuild/protobuf/dist/esm/wire/varint.js
function qs() {
	let e = this.buf, t = this.pos, n = 0, r = 0;
	for (let i = 0; i < 28; i += 7) {
		let a = e[t++];
		if (n |= (a & 127) << i, !(a & 128)) {
			this.pos = t, this.assertBounds(), this.varint64Lo = n, this.varint64Hi = r;
			return;
		}
	}
	let i = e[t++];
	if (n |= (i & 15) << 28, r = (i & 112) >> 4, !(i & 128)) {
		this.pos = t, this.assertBounds(), this.varint64Lo = n, this.varint64Hi = r;
		return;
	}
	for (let i = 3; i <= 31; i += 7) {
		let a = e[t++];
		if (r |= (a & 127) << i, !(a & 128)) {
			this.pos = t, this.assertBounds(), this.varint64Lo = n, this.varint64Hi = r;
			return;
		}
	}
	throw Error("invalid varint");
}
var Js = 4294967296;
function Ys(e) {
	let t = e[0] === "-";
	t && (e = e.slice(1));
	let n = 1e6, r = 0, i = 0;
	function a(t, a) {
		let o = Number(e.slice(t, a));
		i *= n, r = r * n + o, r >= Js && (i += r / Js | 0, r %= Js);
	}
	return a(-24, -18), a(-18, -12), a(-12, -6), a(-6), t ? ec(r, i) : $s(r, i);
}
function Xs(e, t) {
	let n = $s(e, t), r = n.hi & 2147483648;
	r && (n = ec(n.lo, n.hi));
	let i = Zs(n.lo, n.hi);
	return r ? "-" + i : i;
}
function Zs(e, t) {
	if ({lo: e, hi: t} = Qs(e, t), t <= 2097151) return String(Js * t + e);
	let n = e & 16777215, r = (e >>> 24 | t << 8) & 16777215, i = t >> 16 & 65535, a = n + r * 6777216 + i * 6710656, o = r + i * 8147497, s = i * 2, c = 1e7;
	return a >= c && (o += Math.floor(a / c), a %= c), o >= c && (s += Math.floor(o / c), o %= c), s.toString() + tc(o) + tc(a);
}
function Qs(e, t) {
	return {
		lo: e >>> 0,
		hi: t >>> 0
	};
}
function $s(e, t) {
	return {
		lo: e | 0,
		hi: t | 0
	};
}
function ec(e, t) {
	return t = ~t, e ? e = ~e + 1 : t += 1, $s(e, t);
}
var tc = (e) => {
	let t = String(e);
	return "0000000".slice(t.length) + t;
};
function nc() {
	let e = this.buf[this.pos++];
	if (!(e & 128)) return this.assertBounds(), e;
	let t = e & 127;
	if (e = this.buf[this.pos++], t |= (e & 127) << 7, !(e & 128) || (e = this.buf[this.pos++], t |= (e & 127) << 14, !(e & 128)) || (e = this.buf[this.pos++], t |= (e & 127) << 21, !(e & 128))) return this.assertBounds(), t;
	e = this.buf[this.pos++], t |= (e & 15) << 28;
	for (let t = 5; e & 128 && t < 10; t++) e = this.buf[this.pos++];
	if (e & 128) throw Error("invalid varint");
	return this.assertBounds(), t >>> 0;
}
//#endregion
//#region node_modules/@bufbuild/protobuf/dist/esm/proto-int64.js
var rc = /*@__PURE__*/ ic();
function ic() {
	let e = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8));
	if (typeof BigInt == "function" && typeof e.getBigInt64 == "function" && typeof e.getBigUint64 == "function" && typeof e.setBigInt64 == "function" && typeof e.setBigUint64 == "function" && (globalThis.Deno || globalThis.Bun || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
		let t = BigInt("-9223372036854775808"), n = BigInt("9223372036854775807"), r = BigInt("0"), i = BigInt("18446744073709551615");
		return {
			zero: BigInt(0),
			supported: !0,
			parse(e) {
				let r = typeof e == "bigint" ? e : BigInt(e);
				if (r > n || r < t) throw Error(`invalid int64: ${e}`);
				return r;
			},
			uParse(e) {
				let t = typeof e == "bigint" ? e : BigInt(e);
				if (t > i || t < r) throw Error(`invalid uint64: ${e}`);
				return t;
			},
			enc(t) {
				return e.setBigInt64(0, this.parse(t), !0), {
					lo: e.getInt32(0, !0),
					hi: e.getInt32(4, !0)
				};
			},
			uEnc(t) {
				return e.setBigInt64(0, this.uParse(t), !0), {
					lo: e.getInt32(0, !0),
					hi: e.getInt32(4, !0)
				};
			},
			dec(t, n) {
				return e.setInt32(0, t, !0), e.setInt32(4, n, !0), e.getBigInt64(0, !0);
			},
			uDec(t, n) {
				return e.setInt32(0, t, !0), e.setInt32(4, n, !0), e.getBigUint64(0, !0);
			}
		};
	}
	return {
		zero: "0",
		supported: !1,
		parse(e) {
			return typeof e != "string" && (e = e.toString()), ac(e), e;
		},
		uParse(e) {
			return typeof e != "string" && (e = e.toString()), oc(e), e;
		},
		enc(e) {
			return typeof e != "string" && (e = e.toString()), ac(e), Ys(e);
		},
		uEnc(e) {
			return typeof e != "string" && (e = e.toString()), oc(e), Ys(e);
		},
		dec(e, t) {
			return Xs(e, t);
		},
		uDec(e, t) {
			return Zs(e, t);
		}
	};
}
function ac(e) {
	if (!/^-?[0-9]+$/.test(e)) throw Error("invalid int64: " + e);
}
function oc(e) {
	if (!/^[0-9]+$/.test(e)) throw Error("invalid uint64: " + e);
}
//#endregion
//#region node_modules/@bufbuild/protobuf/dist/esm/wire/text-encoding.js
var sc;
function cc(e) {
	sc = Object.assign(Object.assign({}, e), { encodeUtf8Into: e.encodeUtf8Into ?? uc(e.encodeUtf8.bind(e)) });
}
function lc() {
	if (!sc) {
		let e = globalThis;
		if (!e.TextEncoder || !e.TextDecoder) throw Error("encoding API missing: install TextEncoder and TextDecoder on globalThis");
		let t = new e.TextEncoder(), n = new e.TextDecoder(), r, i = {
			encodeUtf8(e) {
				return t.encode(e);
			},
			decodeUtf8(t, i) {
				return i ? (r || (r = new e.TextDecoder("utf-8", { fatal: !0 })), r.decode(t)) : n.decode(t);
			},
			checkUtf8(e) {
				try {
					return !0;
				} catch {
					return !1;
				}
			}
		};
		t.encodeInto && (i.encodeUtf8Into = t.encodeInto.bind(t));
		let a = String.prototype.isWellFormed;
		a && (i.checkUtf8 = (e) => a.call(e)), cc(i);
	}
	return sc;
}
function uc(e) {
	return (t, n) => {
		let r = e(t);
		return n.set(r), { written: r.byteLength };
	};
}
//#endregion
//#region node_modules/@bufbuild/protobuf/dist/esm/wire/binary-encoding.js
var dc;
(function(e) {
	e[e.Varint = 0] = "Varint", e[e.Bit64 = 1] = "Bit64", e[e.LengthDelimited = 2] = "LengthDelimited", e[e.StartGroup = 3] = "StartGroup", e[e.EndGroup = 4] = "EndGroup", e[e.Bit32 = 5] = "Bit32";
})(dc || (dc = {}));
var M = class {
	constructor(e) {
		this.stackPos = [], this.encodeUtf8Into = e ? uc(e) : lc().encodeUtf8Into, this.buffer = mc, this.viewCache = hc, this.pos = 0;
	}
	ensureCapacity(e) {
		let t = this.pos + e;
		if (t > this.buffer.length) {
			let e = this.buffer.length || fc;
			for (; e < t;) e *= 2;
			let n = new Uint8Array(e);
			this.pos > 0 && n.set(this.buffer), this.buffer = n;
		}
	}
	view() {
		let e = this.buffer, t = this.viewCache;
		if (t.byteLength === e.byteLength) return t;
		let n = new DataView(e.buffer);
		return this.viewCache = n, n;
	}
	finish() {
		let e = this.buffer.slice(0, this.pos);
		return this.pos = 0, this.stackPos = [], e;
	}
	fork() {
		return this.stackPos.push(this.pos), this.ensureCapacity(pc), this.buffer[this.pos++] = 0, this;
	}
	join() {
		let e = this.stackPos.pop();
		if (e === void 0) throw Error("invalid state, fork stack empty");
		let t = this.pos - e - pc, n = _c(t);
		return n > pc && (this.ensureCapacity(n - pc), this.buffer.copyWithin(e + n, e + pc, this.pos)), this.pos = e, this.uint32(t), this.pos += t, this;
	}
	tag(e, t) {
		return this.uint32((e << 3 | t) >>> 0);
	}
	raw(e) {
		return this.ensureCapacity(e.length), this.buffer.set(e, this.pos), this.pos += e.length, this;
	}
	uint32(e) {
		if (yc(e), this.ensureCapacity(5), e < 128) return this.buffer[this.pos++] = e, this;
		for (; e > 127;) this.buffer[this.pos++] = e & 127 | 128, e >>>= 7;
		return this.buffer[this.pos++] = e, this;
	}
	int32(e) {
		if (vc(e), e >= 0) return this.uint32(e);
		this.ensureCapacity(10);
		for (let t = 0; t < 9; t++) this.buffer[this.pos++] = e & 127 | 128, e >>= 7;
		return this.buffer[this.pos++] = 1, this;
	}
	bool(e) {
		return this.ensureCapacity(1), this.buffer[this.pos++] = +!!e, this;
	}
	bytes(e) {
		return this.uint32(e.byteLength), this.raw(e);
	}
	string(e) {
		typeof e != "string" && (e = String(e));
		let t = e.length;
		if (t <= gc) {
			this.ensureCapacity(t + 1);
			let n = this.buffer, r = this.pos;
			n[r++] = t;
			let i = 0;
			for (; i < t; i++) {
				let t = e.charCodeAt(i);
				if (t > 127) break;
				n[r++] = t;
			}
			if (i == t) return this.pos = r, this;
		}
		this.ensureCapacity(t * 3 + 5);
		let n = _c(t), r = this.buffer, i = this.pos, { written: a } = this.encodeUtf8Into(e, r.subarray(i + n)), o = _c(a);
		return o != n && r.copyWithin(i + o, i + n, i + n + a), this.uint32(a), this.pos += a, this;
	}
	float(e) {
		return bc(e), this.ensureCapacity(4), this.view().setFloat32(this.pos, e, !0), this.pos += 4, this;
	}
	double(e) {
		return this.ensureCapacity(8), this.view().setFloat64(this.pos, e, !0), this.pos += 8, this;
	}
	fixed32(e) {
		return yc(e), this.ensureCapacity(4), this.view().setUint32(this.pos, e, !0), this.pos += 4, this;
	}
	sfixed32(e) {
		return vc(e), this.ensureCapacity(4), this.view().setInt32(this.pos, e, !0), this.pos += 4, this;
	}
	sint32(e) {
		return vc(e), this.uint32((e << 1 ^ e >> 31) >>> 0);
	}
	sfixed64(e) {
		let t = rc.enc(e);
		this.ensureCapacity(8);
		let n = this.view();
		return n.setInt32(this.pos, t.lo, !0), n.setInt32(this.pos + 4, t.hi, !0), this.pos += 8, this;
	}
	fixed64(e) {
		let t = rc.uEnc(e);
		this.ensureCapacity(8);
		let n = this.view();
		return n.setInt32(this.pos, t.lo, !0), n.setInt32(this.pos + 4, t.hi, !0), this.pos += 8, this;
	}
	int64(e) {
		let t = rc.enc(e);
		return this.writeVarint64(t.lo, t.hi);
	}
	sint64(e) {
		let t = rc.enc(e), n = t.hi >> 31, r = t.lo << 1 ^ n, i = (t.hi << 1 | t.lo >>> 31) ^ n;
		return this.writeVarint64(r, i);
	}
	uint64(e) {
		let t = rc.uEnc(e);
		return this.writeVarint64(t.lo, t.hi);
	}
	writeVarint64(e, t) {
		this.ensureCapacity(10);
		let n = this.buffer, r = this.pos;
		for (let i = 0; i < 28; i += 7) {
			let a = e >>> i, o = !(!(a >>> 7) && t == 0);
			if (n[r++] = (o ? a | 128 : a) & 255, !o) return this.pos = r, this;
		}
		let i = e >>> 28 & 15 | (t & 7) << 4, a = !!(t >> 3);
		if (n[r++] = (a ? i | 128 : i) & 255, !a) return this.pos = r, this;
		for (let e = 3; e < 31; e += 7) {
			let i = t >>> e, a = !!(i >>> 7);
			if (n[r++] = (a ? i | 128 : i) & 255, !a) return this.pos = r, this;
		}
		return n[r++] = t >>> 31 & 1, this.pos = r, this;
	}
}, fc = 128, pc = 1, mc = /* @__PURE__ */ new Uint8Array(), hc = new DataView(mc.buffer), gc = 32;
function _c(e) {
	return e < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5;
}
var N = class {
	constructor(e, t = lc().decodeUtf8) {
		this.decodeUtf8 = t, this.varint64Lo = 0, this.varint64Hi = 0, this.varint64 = qs, this.uint32 = nc, this.buf = e, this.len = e.length, this.pos = 0, this.view = new DataView(e.buffer, e.byteOffset, e.byteLength);
	}
	tag() {
		let e = this.pos, t = this.uint32(), n = this.pos - e;
		if (n > 5 || n == 5 && this.buf[this.pos - 1] > 15) throw Error("illegal tag: varint overflows uint32");
		let r = t >>> 3, i = t & 7;
		if (r <= 0 || i > 5) throw Error("illegal tag: field no " + r + " wire type " + i);
		return [r, i];
	}
	skip(e, t, n = 100) {
		let r = this.pos;
		switch (e) {
			case dc.Varint:
				for (; this.buf[this.pos++] & 128;);
				break;
			case dc.Bit64: this.pos += 4;
			case dc.Bit32:
				this.pos += 4;
				break;
			case dc.LengthDelimited:
				let r = this.uint32();
				this.pos += r;
				break;
			case dc.StartGroup:
				if (n <= 0) throw Error("maximum recursion depth reached");
				for (;;) {
					let [e, r] = this.tag();
					if (r === dc.EndGroup) {
						if (t !== void 0 && e !== t) throw Error("invalid end group tag");
						break;
					}
					this.skip(r, e, n - 1);
				}
				break;
			default: throw Error("cant skip wire type " + e);
		}
		return this.assertBounds(), this.buf.subarray(r, this.pos);
	}
	assertBounds() {
		if (this.pos > this.len) throw RangeError("premature EOF");
	}
	int32() {
		return this.uint32() | 0;
	}
	sint32() {
		let e = this.uint32();
		return e >>> 1 ^ -(e & 1);
	}
	int64() {
		return this.varint64(), rc.dec(this.varint64Lo, this.varint64Hi);
	}
	uint64() {
		return this.varint64(), rc.uDec(this.varint64Lo, this.varint64Hi);
	}
	sint64() {
		this.varint64();
		let e = this.varint64Lo, t = this.varint64Hi, n = -(e & 1);
		return e = (e >>> 1 | (t & 1) << 31) ^ n, t = t >>> 1 ^ n, rc.dec(e, t);
	}
	bool() {
		let e = this.buf[this.pos];
		return e < 128 ? (this.pos++, e !== 0) : (this.varint64(), this.varint64Lo !== 0 || this.varint64Hi !== 0);
	}
	fixed32() {
		return this.view.getUint32((this.pos += 4) - 4, !0);
	}
	sfixed32() {
		return this.view.getInt32((this.pos += 4) - 4, !0);
	}
	fixed64() {
		return rc.uDec(this.sfixed32(), this.sfixed32());
	}
	sfixed64() {
		return rc.dec(this.sfixed32(), this.sfixed32());
	}
	float() {
		return this.view.getFloat32((this.pos += 4) - 4, !0);
	}
	double() {
		return this.view.getFloat64((this.pos += 8) - 8, !0);
	}
	bytes() {
		let e = this.uint32(), t = this.pos;
		return this.pos += e, this.assertBounds(), this.buf.subarray(t, t + e);
	}
	string(e) {
		let t = this.bytes(), n = t.length;
		if (n <= gc) {
			let r = Array(n);
			for (let i = 0; i < n; i++) {
				let n = t[i];
				if (n > 127) return this.decodeUtf8(t, e);
				r[i] = n;
			}
			return String.fromCharCode.apply(String, r);
		}
		return this.decodeUtf8(t, e);
	}
};
function vc(e) {
	if (typeof e == "string") e = Number(e);
	else if (typeof e != "number") throw Error("invalid int32: " + typeof e);
	if (!Number.isInteger(e) || e > 2147483647 || e < -2147483648) throw Error("invalid int32: " + e);
}
function yc(e) {
	if (typeof e == "string") e = Number(e);
	else if (typeof e != "number") throw Error("invalid uint32: " + typeof e);
	if (!Number.isInteger(e) || e > 4294967295 || e < 0) throw Error("invalid uint32: " + e);
}
function bc(e) {
	if (typeof e == "string") {
		let t = e;
		if (e = Number(e), Number.isNaN(e) && t !== "NaN") throw Error("invalid float32: " + t);
	} else if (typeof e != "number") throw Error("invalid float32: " + typeof e);
	if (Number.isFinite(e) && (e > 34028234663852886e22 || e < -34028234663852886e22)) throw Error("invalid float32: " + e);
}
//#endregion
//#region node_modules/@ag-ui/proto/dist/index.mjs
var xc = /* @__PURE__ */ function(e) {
	return e[e.NULL_VALUE = 0] = "NULL_VALUE", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED", e;
}({});
function Sc() {
	return { fields: {} };
}
var Cc = {
	encode(e, t = new M()) {
		return Object.entries(e.fields).forEach(([e, n]) => {
			n !== void 0 && Tc.encode({
				key: e,
				value: n
			}, t.uint32(10).fork()).join();
		}), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Sc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1: {
					if (e !== 10) break;
					let t = Tc.decode(n, n.uint32());
					t.value !== void 0 && (i.fields[t.key] = t.value);
					continue;
				}
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Cc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Sc();
		return t.fields = Object.entries(e.fields ?? {}).reduce((e, [t, n]) => (n !== void 0 && (e[t] = n), e), {}), t;
	},
	wrap(e) {
		let t = Sc();
		if (e !== void 0) for (let n of Object.keys(e)) t.fields[n] = e[n];
		return t;
	},
	unwrap(e) {
		let t = {};
		if (e.fields) for (let n of Object.keys(e.fields)) t[n] = e.fields[n];
		return t;
	}
};
function wc() {
	return {
		key: "",
		value: void 0
	};
}
var Tc = {
	encode(e, t = new M()) {
		return e.key !== "" && t.uint32(10).string(e.key), e.value !== void 0 && P.encode(P.wrap(e.value), t.uint32(18).fork()).join(), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = wc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.key = n.string();
					continue;
				case 2:
					if (e !== 18) break;
					i.value = P.unwrap(P.decode(n, n.uint32()));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Tc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = wc();
		return t.key = e.key ?? "", t.value = e.value ?? void 0, t;
	}
};
function Ec() {
	return {
		nullValue: void 0,
		numberValue: void 0,
		stringValue: void 0,
		boolValue: void 0,
		structValue: void 0,
		listValue: void 0
	};
}
var P = {
	encode(e, t = new M()) {
		return e.nullValue !== void 0 && t.uint32(8).int32(e.nullValue), e.numberValue !== void 0 && t.uint32(17).double(e.numberValue), e.stringValue !== void 0 && t.uint32(26).string(e.stringValue), e.boolValue !== void 0 && t.uint32(32).bool(e.boolValue), e.structValue !== void 0 && Cc.encode(Cc.wrap(e.structValue), t.uint32(42).fork()).join(), e.listValue !== void 0 && Oc.encode(Oc.wrap(e.listValue), t.uint32(50).fork()).join(), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Ec();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 8) break;
					i.nullValue = n.int32();
					continue;
				case 2:
					if (e !== 17) break;
					i.numberValue = n.double();
					continue;
				case 3:
					if (e !== 26) break;
					i.stringValue = n.string();
					continue;
				case 4:
					if (e !== 32) break;
					i.boolValue = n.bool();
					continue;
				case 5:
					if (e !== 42) break;
					i.structValue = Cc.unwrap(Cc.decode(n, n.uint32()));
					continue;
				case 6:
					if (e !== 50) break;
					i.listValue = Oc.unwrap(Oc.decode(n, n.uint32()));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return P.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Ec();
		return t.nullValue = e.nullValue ?? void 0, t.numberValue = e.numberValue ?? void 0, t.stringValue = e.stringValue ?? void 0, t.boolValue = e.boolValue ?? void 0, t.structValue = e.structValue ?? void 0, t.listValue = e.listValue ?? void 0, t;
	},
	wrap(e) {
		let t = Ec();
		if (e === null) t.nullValue = xc.NULL_VALUE;
		else if (typeof e == "boolean") t.boolValue = e;
		else if (typeof e == "number") t.numberValue = e;
		else if (typeof e == "string") t.stringValue = e;
		else if (globalThis.Array.isArray(e)) t.listValue = e;
		else if (typeof e == "object") t.structValue = e;
		else if (e !== void 0) throw new globalThis.Error("Unsupported any value type: " + typeof e);
		return t;
	},
	unwrap(e) {
		if (e.stringValue !== void 0) return e.stringValue;
		if (e?.numberValue !== void 0) return e.numberValue;
		if (e?.boolValue !== void 0) return e.boolValue;
		if (e?.structValue !== void 0) return e.structValue;
		if (e?.listValue !== void 0) return e.listValue;
		if (e?.nullValue !== void 0) return null;
	}
};
function Dc() {
	return { values: [] };
}
var Oc = {
	encode(e, t = new M()) {
		for (let n of e.values) P.encode(P.wrap(n), t.uint32(10).fork()).join();
		return t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Dc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.values.push(P.unwrap(P.decode(n, n.uint32())));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Oc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Dc();
		return t.values = e.values?.map((e) => e) || [], t;
	},
	wrap(e) {
		let t = Dc();
		return t.values = e ?? [], t;
	},
	unwrap(e) {
		return e?.hasOwnProperty("values") && globalThis.Array.isArray(e.values) ? e.values : e;
	}
}, kc = /* @__PURE__ */ function(e) {
	return e[e.ADD = 0] = "ADD", e[e.REMOVE = 1] = "REMOVE", e[e.REPLACE = 2] = "REPLACE", e[e.MOVE = 3] = "MOVE", e[e.COPY = 4] = "COPY", e[e.TEST = 5] = "TEST", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED", e;
}({});
function Ac() {
	return {
		op: 0,
		path: "",
		from: void 0,
		value: void 0
	};
}
var jc = {
	encode(e, t = new M()) {
		return e.op !== 0 && t.uint32(8).int32(e.op), e.path !== "" && t.uint32(18).string(e.path), e.from !== void 0 && t.uint32(26).string(e.from), e.value !== void 0 && P.encode(P.wrap(e.value), t.uint32(34).fork()).join(), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Ac();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 8) break;
					i.op = n.int32();
					continue;
				case 2:
					if (e !== 18) break;
					i.path = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.from = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.value = P.unwrap(P.decode(n, n.uint32()));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return jc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Ac();
		return t.op = e.op ?? 0, t.path = e.path ?? "", t.from = e.from ?? void 0, t.value = e.value ?? void 0, t;
	}
};
function Mc() {
	return {
		id: "",
		type: "",
		function: void 0,
		metadata: void 0
	};
}
var Nc = {
	encode(e, t = new M()) {
		return e.id !== "" && t.uint32(10).string(e.id), e.type !== "" && t.uint32(18).string(e.type), e.function !== void 0 && Fc.encode(e.function, t.uint32(26).fork()).join(), e.metadata !== void 0 && Cc.encode(Cc.wrap(e.metadata), t.uint32(34).fork()).join(), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Mc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.id = n.string();
					continue;
				case 2:
					if (e !== 18) break;
					i.type = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.function = Fc.decode(n, n.uint32());
					continue;
				case 4:
					if (e !== 34) break;
					i.metadata = Cc.unwrap(Cc.decode(n, n.uint32()));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Nc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Mc();
		return t.id = e.id ?? "", t.type = e.type ?? "", t.function = e.function !== void 0 && e.function !== null ? Fc.fromPartial(e.function) : void 0, t.metadata = e.metadata ?? void 0, t;
	}
};
function Pc() {
	return {
		name: "",
		arguments: ""
	};
}
var Fc = {
	encode(e, t = new M()) {
		return e.name !== "" && t.uint32(10).string(e.name), e.arguments !== "" && t.uint32(18).string(e.arguments), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Pc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.name = n.string();
					continue;
				case 2:
					if (e !== 18) break;
					i.arguments = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Fc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Pc();
		return t.name = e.name ?? "", t.arguments = e.arguments ?? "", t;
	}
};
function Ic() {
	return {
		value: "",
		mimeType: ""
	};
}
var Lc = {
	encode(e, t = new M()) {
		return e.value !== "" && t.uint32(10).string(e.value), e.mimeType !== "" && t.uint32(18).string(e.mimeType), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Ic();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.value = n.string();
					continue;
				case 2:
					if (e !== 18) break;
					i.mimeType = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Lc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Ic();
		return t.value = e.value ?? "", t.mimeType = e.mimeType ?? "", t;
	}
};
function Rc() {
	return {
		value: "",
		mimeType: void 0
	};
}
var zc = {
	encode(e, t = new M()) {
		return e.value !== "" && t.uint32(10).string(e.value), e.mimeType !== void 0 && t.uint32(18).string(e.mimeType), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Rc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.value = n.string();
					continue;
				case 2:
					if (e !== 18) break;
					i.mimeType = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return zc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Rc();
		return t.value = e.value ?? "", t.mimeType = e.mimeType ?? void 0, t;
	}
};
function Bc() {
	return {
		data: void 0,
		url: void 0
	};
}
var Vc = {
	encode(e, t = new M()) {
		return e.data !== void 0 && Lc.encode(e.data, t.uint32(10).fork()).join(), e.url !== void 0 && zc.encode(e.url, t.uint32(18).fork()).join(), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Bc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.data = Lc.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.url = zc.decode(n, n.uint32());
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Vc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Bc();
		return t.data = e.data !== void 0 && e.data !== null ? Lc.fromPartial(e.data) : void 0, t.url = e.url !== void 0 && e.url !== null ? zc.fromPartial(e.url) : void 0, t;
	}
};
function Hc() {
	return { text: "" };
}
var Uc = {
	encode(e, t = new M()) {
		return e.text !== "" && t.uint32(10).string(e.text), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Hc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.text = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Uc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Hc();
		return t.text = e.text ?? "", t;
	}
};
function Wc() {
	return {
		source: void 0,
		metadata: void 0
	};
}
var Gc = {
	encode(e, t = new M()) {
		return e.source !== void 0 && Vc.encode(e.source, t.uint32(10).fork()).join(), e.metadata !== void 0 && P.encode(P.wrap(e.metadata), t.uint32(18).fork()).join(), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Wc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.source = Vc.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.metadata = P.unwrap(P.decode(n, n.uint32()));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Gc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Wc();
		return t.source = e.source !== void 0 && e.source !== null ? Vc.fromPartial(e.source) : void 0, t.metadata = e.metadata ?? void 0, t;
	}
};
function Kc() {
	return {
		source: void 0,
		metadata: void 0
	};
}
var qc = {
	encode(e, t = new M()) {
		return e.source !== void 0 && Vc.encode(e.source, t.uint32(10).fork()).join(), e.metadata !== void 0 && P.encode(P.wrap(e.metadata), t.uint32(18).fork()).join(), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Kc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.source = Vc.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.metadata = P.unwrap(P.decode(n, n.uint32()));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return qc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Kc();
		return t.source = e.source !== void 0 && e.source !== null ? Vc.fromPartial(e.source) : void 0, t.metadata = e.metadata ?? void 0, t;
	}
};
function Jc() {
	return {
		source: void 0,
		metadata: void 0
	};
}
var Yc = {
	encode(e, t = new M()) {
		return e.source !== void 0 && Vc.encode(e.source, t.uint32(10).fork()).join(), e.metadata !== void 0 && P.encode(P.wrap(e.metadata), t.uint32(18).fork()).join(), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Jc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.source = Vc.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.metadata = P.unwrap(P.decode(n, n.uint32()));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Yc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Jc();
		return t.source = e.source !== void 0 && e.source !== null ? Vc.fromPartial(e.source) : void 0, t.metadata = e.metadata ?? void 0, t;
	}
};
function Xc() {
	return {
		source: void 0,
		metadata: void 0
	};
}
var Zc = {
	encode(e, t = new M()) {
		return e.source !== void 0 && Vc.encode(e.source, t.uint32(10).fork()).join(), e.metadata !== void 0 && P.encode(P.wrap(e.metadata), t.uint32(18).fork()).join(), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Xc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.source = Vc.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.metadata = P.unwrap(P.decode(n, n.uint32()));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Zc.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Xc();
		return t.source = e.source !== void 0 && e.source !== null ? Vc.fromPartial(e.source) : void 0, t.metadata = e.metadata ?? void 0, t;
	}
};
function Qc() {
	return {
		text: void 0,
		image: void 0,
		audio: void 0,
		video: void 0,
		document: void 0
	};
}
var $c = {
	encode(e, t = new M()) {
		return e.text !== void 0 && Uc.encode(e.text, t.uint32(10).fork()).join(), e.image !== void 0 && Gc.encode(e.image, t.uint32(18).fork()).join(), e.audio !== void 0 && qc.encode(e.audio, t.uint32(26).fork()).join(), e.video !== void 0 && Yc.encode(e.video, t.uint32(34).fork()).join(), e.document !== void 0 && Zc.encode(e.document, t.uint32(42).fork()).join(), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Qc();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.text = Uc.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.image = Gc.decode(n, n.uint32());
					continue;
				case 3:
					if (e !== 26) break;
					i.audio = qc.decode(n, n.uint32());
					continue;
				case 4:
					if (e !== 34) break;
					i.video = Yc.decode(n, n.uint32());
					continue;
				case 5:
					if (e !== 42) break;
					i.document = Zc.decode(n, n.uint32());
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return $c.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Qc();
		return t.text = e.text !== void 0 && e.text !== null ? Uc.fromPartial(e.text) : void 0, t.image = e.image !== void 0 && e.image !== null ? Gc.fromPartial(e.image) : void 0, t.audio = e.audio !== void 0 && e.audio !== null ? qc.fromPartial(e.audio) : void 0, t.video = e.video !== void 0 && e.video !== null ? Yc.fromPartial(e.video) : void 0, t.document = e.document !== void 0 && e.document !== null ? Zc.fromPartial(e.document) : void 0, t;
	}
};
function el() {
	return {
		id: "",
		role: "",
		content: void 0,
		name: void 0,
		toolCalls: [],
		toolCallId: void 0,
		error: void 0,
		contentParts: [],
		metadata: void 0,
		subagentRunId: void 0
	};
}
var tl = {
	encode(e, t = new M()) {
		e.id !== "" && t.uint32(10).string(e.id), e.role !== "" && t.uint32(18).string(e.role), e.content !== void 0 && t.uint32(26).string(e.content), e.name !== void 0 && t.uint32(34).string(e.name);
		for (let n of e.toolCalls) Nc.encode(n, t.uint32(42).fork()).join();
		e.toolCallId !== void 0 && t.uint32(50).string(e.toolCallId), e.error !== void 0 && t.uint32(58).string(e.error);
		for (let n of e.contentParts) $c.encode(n, t.uint32(66).fork()).join();
		return e.metadata !== void 0 && Cc.encode(Cc.wrap(e.metadata), t.uint32(74).fork()).join(), e.subagentRunId !== void 0 && t.uint32(82).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = el();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.id = n.string();
					continue;
				case 2:
					if (e !== 18) break;
					i.role = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.content = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.name = n.string();
					continue;
				case 5:
					if (e !== 42) break;
					i.toolCalls.push(Nc.decode(n, n.uint32()));
					continue;
				case 6:
					if (e !== 50) break;
					i.toolCallId = n.string();
					continue;
				case 7:
					if (e !== 58) break;
					i.error = n.string();
					continue;
				case 8:
					if (e !== 66) break;
					i.contentParts.push($c.decode(n, n.uint32()));
					continue;
				case 9:
					if (e !== 74) break;
					i.metadata = Cc.unwrap(Cc.decode(n, n.uint32()));
					continue;
				case 10:
					if (e !== 82) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return tl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = el();
		return t.id = e.id ?? "", t.role = e.role ?? "", t.content = e.content ?? void 0, t.name = e.name ?? void 0, t.toolCalls = e.toolCalls?.map((e) => Nc.fromPartial(e)) || [], t.toolCallId = e.toolCallId ?? void 0, t.error = e.error ?? void 0, t.contentParts = e.contentParts?.map((e) => $c.fromPartial(e)) || [], t.metadata = e.metadata ?? void 0, t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function nl() {
	return {
		id: "",
		reason: "",
		message: void 0,
		toolCallId: void 0,
		responseSchema: void 0,
		expiresAt: void 0,
		metadata: void 0,
		subagentRunId: void 0
	};
}
var rl = {
	encode(e, t = new M()) {
		return e.id !== "" && t.uint32(10).string(e.id), e.reason !== "" && t.uint32(18).string(e.reason), e.message !== void 0 && t.uint32(26).string(e.message), e.toolCallId !== void 0 && t.uint32(34).string(e.toolCallId), e.responseSchema !== void 0 && P.encode(P.wrap(e.responseSchema), t.uint32(42).fork()).join(), e.expiresAt !== void 0 && t.uint32(50).string(e.expiresAt), e.metadata !== void 0 && P.encode(P.wrap(e.metadata), t.uint32(58).fork()).join(), e.subagentRunId !== void 0 && t.uint32(66).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = nl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.id = n.string();
					continue;
				case 2:
					if (e !== 18) break;
					i.reason = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.message = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.toolCallId = n.string();
					continue;
				case 5:
					if (e !== 42) break;
					i.responseSchema = P.unwrap(P.decode(n, n.uint32()));
					continue;
				case 6:
					if (e !== 50) break;
					i.expiresAt = n.string();
					continue;
				case 7:
					if (e !== 58) break;
					i.metadata = P.unwrap(P.decode(n, n.uint32()));
					continue;
				case 8:
					if (e !== 66) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return rl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = nl();
		return t.id = e.id ?? "", t.reason = e.reason ?? "", t.message = e.message ?? void 0, t.toolCallId = e.toolCallId ?? void 0, t.responseSchema = e.responseSchema ?? void 0, t.expiresAt = e.expiresAt ?? void 0, t.metadata = e.metadata ?? void 0, t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
}, il = /* @__PURE__ */ function(e) {
	return e[e.TEXT_MESSAGE_START = 0] = "TEXT_MESSAGE_START", e[e.TEXT_MESSAGE_CONTENT = 1] = "TEXT_MESSAGE_CONTENT", e[e.TEXT_MESSAGE_END = 2] = "TEXT_MESSAGE_END", e[e.TOOL_CALL_START = 3] = "TOOL_CALL_START", e[e.TOOL_CALL_ARGS = 4] = "TOOL_CALL_ARGS", e[e.TOOL_CALL_END = 5] = "TOOL_CALL_END", e[e.STATE_SNAPSHOT = 6] = "STATE_SNAPSHOT", e[e.STATE_DELTA = 7] = "STATE_DELTA", e[e.MESSAGES_SNAPSHOT = 8] = "MESSAGES_SNAPSHOT", e[e.RAW = 9] = "RAW", e[e.CUSTOM = 10] = "CUSTOM", e[e.RUN_STARTED = 11] = "RUN_STARTED", e[e.RUN_FINISHED = 12] = "RUN_FINISHED", e[e.RUN_ERROR = 13] = "RUN_ERROR", e[e.STEP_STARTED = 14] = "STEP_STARTED", e[e.STEP_FINISHED = 15] = "STEP_FINISHED", e[e.SUBAGENT_STARTED = 16] = "SUBAGENT_STARTED", e[e.SUBAGENT_FINISHED = 17] = "SUBAGENT_FINISHED", e[e.SUBAGENT_ERROR = 18] = "SUBAGENT_ERROR", e[e.UNRECOGNIZED = -1] = "UNRECOGNIZED", e;
}({});
function al() {
	return {
		type: 0,
		timestamp: void 0,
		rawEvent: void 0,
		metadata: void 0
	};
}
var F = {
	encode(e, t = new M()) {
		return e.type !== 0 && t.uint32(8).int32(e.type), e.timestamp !== void 0 && t.uint32(16).int64(e.timestamp), e.rawEvent !== void 0 && P.encode(P.wrap(e.rawEvent), t.uint32(26).fork()).join(), e.metadata !== void 0 && Cc.encode(Cc.wrap(e.metadata), t.uint32(34).fork()).join(), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = al();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 8) break;
					i.type = n.int32();
					continue;
				case 2:
					if (e !== 16) break;
					i.timestamp = Ql(n.int64());
					continue;
				case 3:
					if (e !== 26) break;
					i.rawEvent = P.unwrap(P.decode(n, n.uint32()));
					continue;
				case 4:
					if (e !== 34) break;
					i.metadata = Cc.unwrap(Cc.decode(n, n.uint32()));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return F.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = al();
		return t.type = e.type ?? 0, t.timestamp = e.timestamp ?? void 0, t.rawEvent = e.rawEvent ?? void 0, t.metadata = e.metadata ?? void 0, t;
	}
};
function ol() {
	return {
		baseEvent: void 0,
		messageId: "",
		role: void 0,
		name: void 0,
		subagentRunId: void 0
	};
}
var sl = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.messageId !== "" && t.uint32(18).string(e.messageId), e.role !== void 0 && t.uint32(26).string(e.role), e.name !== void 0 && t.uint32(34).string(e.name), e.subagentRunId !== void 0 && t.uint32(42).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = ol();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.messageId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.role = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.name = n.string();
					continue;
				case 5:
					if (e !== 42) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return sl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = ol();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.messageId = e.messageId ?? "", t.role = e.role ?? void 0, t.name = e.name ?? void 0, t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function cl() {
	return {
		baseEvent: void 0,
		messageId: "",
		delta: "",
		subagentRunId: void 0
	};
}
var ll = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.messageId !== "" && t.uint32(18).string(e.messageId), e.delta !== "" && t.uint32(26).string(e.delta), e.subagentRunId !== void 0 && t.uint32(34).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = cl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.messageId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.delta = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return ll.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = cl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.messageId = e.messageId ?? "", t.delta = e.delta ?? "", t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function ul() {
	return {
		baseEvent: void 0,
		messageId: "",
		subagentRunId: void 0
	};
}
var dl = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.messageId !== "" && t.uint32(18).string(e.messageId), e.subagentRunId !== void 0 && t.uint32(26).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = ul();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.messageId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return dl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = ul();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.messageId = e.messageId ?? "", t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function fl() {
	return {
		baseEvent: void 0,
		toolCallId: "",
		toolCallName: "",
		parentMessageId: void 0,
		subagentRunId: void 0
	};
}
var pl = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.toolCallId !== "" && t.uint32(18).string(e.toolCallId), e.toolCallName !== "" && t.uint32(26).string(e.toolCallName), e.parentMessageId !== void 0 && t.uint32(34).string(e.parentMessageId), e.subagentRunId !== void 0 && t.uint32(42).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = fl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.toolCallId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.toolCallName = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.parentMessageId = n.string();
					continue;
				case 5:
					if (e !== 42) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return pl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = fl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.toolCallId = e.toolCallId ?? "", t.toolCallName = e.toolCallName ?? "", t.parentMessageId = e.parentMessageId ?? void 0, t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function ml() {
	return {
		baseEvent: void 0,
		toolCallId: "",
		delta: "",
		subagentRunId: void 0
	};
}
var hl = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.toolCallId !== "" && t.uint32(18).string(e.toolCallId), e.delta !== "" && t.uint32(26).string(e.delta), e.subagentRunId !== void 0 && t.uint32(34).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = ml();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.toolCallId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.delta = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return hl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = ml();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.toolCallId = e.toolCallId ?? "", t.delta = e.delta ?? "", t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function gl() {
	return {
		baseEvent: void 0,
		toolCallId: "",
		subagentRunId: void 0
	};
}
var _l = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.toolCallId !== "" && t.uint32(18).string(e.toolCallId), e.subagentRunId !== void 0 && t.uint32(26).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = gl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.toolCallId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return _l.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = gl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.toolCallId = e.toolCallId ?? "", t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function vl() {
	return {
		baseEvent: void 0,
		snapshot: void 0,
		subagentRunId: void 0
	};
}
var yl = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.snapshot !== void 0 && P.encode(P.wrap(e.snapshot), t.uint32(18).fork()).join(), e.subagentRunId !== void 0 && t.uint32(26).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = vl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.snapshot = P.unwrap(P.decode(n, n.uint32()));
					continue;
				case 3:
					if (e !== 26) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return yl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = vl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.snapshot = e.snapshot ?? void 0, t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function bl() {
	return {
		baseEvent: void 0,
		delta: [],
		subagentRunId: void 0
	};
}
var xl = {
	encode(e, t = new M()) {
		e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join();
		for (let n of e.delta) jc.encode(n, t.uint32(18).fork()).join();
		return e.subagentRunId !== void 0 && t.uint32(26).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = bl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.delta.push(jc.decode(n, n.uint32()));
					continue;
				case 3:
					if (e !== 26) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return xl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = bl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.delta = e.delta?.map((e) => jc.fromPartial(e)) || [], t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function Sl() {
	return {
		baseEvent: void 0,
		messages: []
	};
}
var Cl = {
	encode(e, t = new M()) {
		e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join();
		for (let n of e.messages) tl.encode(n, t.uint32(18).fork()).join();
		return t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Sl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.messages.push(tl.decode(n, n.uint32()));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Cl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Sl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.messages = e.messages?.map((e) => tl.fromPartial(e)) || [], t;
	}
};
function wl() {
	return {
		baseEvent: void 0,
		event: void 0,
		source: void 0,
		subagentRunId: void 0
	};
}
var Tl = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.event !== void 0 && P.encode(P.wrap(e.event), t.uint32(18).fork()).join(), e.source !== void 0 && t.uint32(26).string(e.source), e.subagentRunId !== void 0 && t.uint32(34).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = wl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.event = P.unwrap(P.decode(n, n.uint32()));
					continue;
				case 3:
					if (e !== 26) break;
					i.source = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Tl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = wl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.event = e.event ?? void 0, t.source = e.source ?? void 0, t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function El() {
	return {
		baseEvent: void 0,
		name: "",
		value: void 0,
		subagentRunId: void 0
	};
}
var Dl = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.name !== "" && t.uint32(18).string(e.name), e.value !== void 0 && P.encode(P.wrap(e.value), t.uint32(26).fork()).join(), e.subagentRunId !== void 0 && t.uint32(34).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = El();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.name = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.value = P.unwrap(P.decode(n, n.uint32()));
					continue;
				case 4:
					if (e !== 34) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Dl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = El();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.name = e.name ?? "", t.value = e.value ?? void 0, t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function Ol() {
	return {
		baseEvent: void 0,
		threadId: "",
		runId: ""
	};
}
var kl = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.threadId !== "" && t.uint32(18).string(e.threadId), e.runId !== "" && t.uint32(26).string(e.runId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Ol();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.threadId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.runId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return kl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Ol();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.threadId = e.threadId ?? "", t.runId = e.runId ?? "", t;
	}
};
function Al() {
	return {
		provider: void 0,
		model: void 0,
		inputTokens: void 0,
		outputTokens: void 0,
		totalTokens: void 0,
		reasoningTokens: void 0,
		cachedInputTokens: void 0
	};
}
var jl = {
	encode(e, t = new M()) {
		return e.provider !== void 0 && t.uint32(10).string(e.provider), e.model !== void 0 && t.uint32(18).string(e.model), e.inputTokens !== void 0 && t.uint32(24).int64(e.inputTokens), e.outputTokens !== void 0 && t.uint32(32).int64(e.outputTokens), e.totalTokens !== void 0 && t.uint32(40).int64(e.totalTokens), e.reasoningTokens !== void 0 && t.uint32(48).int64(e.reasoningTokens), e.cachedInputTokens !== void 0 && t.uint32(56).int64(e.cachedInputTokens), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Al();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.provider = n.string();
					continue;
				case 2:
					if (e !== 18) break;
					i.model = n.string();
					continue;
				case 3:
					if (e !== 24) break;
					i.inputTokens = Ql(n.int64());
					continue;
				case 4:
					if (e !== 32) break;
					i.outputTokens = Ql(n.int64());
					continue;
				case 5:
					if (e !== 40) break;
					i.totalTokens = Ql(n.int64());
					continue;
				case 6:
					if (e !== 48) break;
					i.reasoningTokens = Ql(n.int64());
					continue;
				case 7:
					if (e !== 56) break;
					i.cachedInputTokens = Ql(n.int64());
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return jl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Al();
		return t.provider = e.provider ?? void 0, t.model = e.model ?? void 0, t.inputTokens = e.inputTokens ?? void 0, t.outputTokens = e.outputTokens ?? void 0, t.totalTokens = e.totalTokens ?? void 0, t.reasoningTokens = e.reasoningTokens ?? void 0, t.cachedInputTokens = e.cachedInputTokens ?? void 0, t;
	}
};
function Ml() {
	return {
		baseEvent: void 0,
		threadId: "",
		runId: "",
		result: void 0,
		outcome: "",
		interrupts: [],
		usage: []
	};
}
var Nl = {
	encode(e, t = new M()) {
		e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.threadId !== "" && t.uint32(18).string(e.threadId), e.runId !== "" && t.uint32(26).string(e.runId), e.result !== void 0 && P.encode(P.wrap(e.result), t.uint32(34).fork()).join(), e.outcome !== "" && t.uint32(42).string(e.outcome);
		for (let n of e.interrupts) rl.encode(n, t.uint32(50).fork()).join();
		for (let n of e.usage) jl.encode(n, t.uint32(58).fork()).join();
		return t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Ml();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.threadId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.runId = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.result = P.unwrap(P.decode(n, n.uint32()));
					continue;
				case 5:
					if (e !== 42) break;
					i.outcome = n.string();
					continue;
				case 6:
					if (e !== 50) break;
					i.interrupts.push(rl.decode(n, n.uint32()));
					continue;
				case 7:
					if (e !== 58) break;
					i.usage.push(jl.decode(n, n.uint32()));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Nl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Ml();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.threadId = e.threadId ?? "", t.runId = e.runId ?? "", t.result = e.result ?? void 0, t.outcome = e.outcome ?? "", t.interrupts = e.interrupts?.map((e) => rl.fromPartial(e)) || [], t.usage = e.usage?.map((e) => jl.fromPartial(e)) || [], t;
	}
};
function Pl() {
	return {
		baseEvent: void 0,
		code: void 0,
		message: "",
		usage: []
	};
}
var Fl = {
	encode(e, t = new M()) {
		e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.code !== void 0 && t.uint32(18).string(e.code), e.message !== "" && t.uint32(26).string(e.message);
		for (let n of e.usage) jl.encode(n, t.uint32(34).fork()).join();
		return t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Pl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.code = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.message = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.usage.push(jl.decode(n, n.uint32()));
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Fl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Pl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.code = e.code ?? void 0, t.message = e.message ?? "", t.usage = e.usage?.map((e) => jl.fromPartial(e)) || [], t;
	}
};
function Il() {
	return {
		baseEvent: void 0,
		stepName: "",
		subagentRunId: void 0
	};
}
var Ll = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.stepName !== "" && t.uint32(18).string(e.stepName), e.subagentRunId !== void 0 && t.uint32(26).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Il();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.stepName = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Ll.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Il();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.stepName = e.stepName ?? "", t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function Rl() {
	return {
		baseEvent: void 0,
		stepName: "",
		subagentRunId: void 0
	};
}
var zl = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.stepName !== "" && t.uint32(18).string(e.stepName), e.subagentRunId !== void 0 && t.uint32(26).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Rl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.stepName = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return zl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Rl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.stepName = e.stepName ?? "", t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function Bl() {
	return {
		baseEvent: void 0,
		messageId: void 0,
		role: void 0,
		delta: void 0,
		name: void 0,
		subagentRunId: void 0
	};
}
var Vl = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.messageId !== void 0 && t.uint32(18).string(e.messageId), e.role !== void 0 && t.uint32(26).string(e.role), e.delta !== void 0 && t.uint32(34).string(e.delta), e.name !== void 0 && t.uint32(42).string(e.name), e.subagentRunId !== void 0 && t.uint32(50).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Bl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.messageId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.role = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.delta = n.string();
					continue;
				case 5:
					if (e !== 42) break;
					i.name = n.string();
					continue;
				case 6:
					if (e !== 50) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Vl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Bl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.messageId = e.messageId ?? void 0, t.role = e.role ?? void 0, t.delta = e.delta ?? void 0, t.name = e.name ?? void 0, t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function Hl() {
	return {
		baseEvent: void 0,
		toolCallId: void 0,
		toolCallName: void 0,
		parentMessageId: void 0,
		delta: void 0,
		subagentRunId: void 0
	};
}
var Ul = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.toolCallId !== void 0 && t.uint32(18).string(e.toolCallId), e.toolCallName !== void 0 && t.uint32(26).string(e.toolCallName), e.parentMessageId !== void 0 && t.uint32(34).string(e.parentMessageId), e.delta !== void 0 && t.uint32(42).string(e.delta), e.subagentRunId !== void 0 && t.uint32(50).string(e.subagentRunId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Hl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.toolCallId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.toolCallName = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.parentMessageId = n.string();
					continue;
				case 5:
					if (e !== 42) break;
					i.delta = n.string();
					continue;
				case 6:
					if (e !== 50) break;
					i.subagentRunId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Ul.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Hl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.toolCallId = e.toolCallId ?? void 0, t.toolCallName = e.toolCallName ?? void 0, t.parentMessageId = e.parentMessageId ?? void 0, t.delta = e.delta ?? void 0, t.subagentRunId = e.subagentRunId ?? void 0, t;
	}
};
function Wl() {
	return {
		baseEvent: void 0,
		subagentRunId: "",
		name: "",
		description: void 0,
		parentSubagentRunId: void 0,
		parentToolCallId: void 0,
		parentMessageId: void 0
	};
}
var Gl = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.subagentRunId !== "" && t.uint32(18).string(e.subagentRunId), e.name !== "" && t.uint32(26).string(e.name), e.description !== void 0 && t.uint32(34).string(e.description), e.parentSubagentRunId !== void 0 && t.uint32(42).string(e.parentSubagentRunId), e.parentToolCallId !== void 0 && t.uint32(50).string(e.parentToolCallId), e.parentMessageId !== void 0 && t.uint32(58).string(e.parentMessageId), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Wl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.subagentRunId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.name = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.description = n.string();
					continue;
				case 5:
					if (e !== 42) break;
					i.parentSubagentRunId = n.string();
					continue;
				case 6:
					if (e !== 50) break;
					i.parentToolCallId = n.string();
					continue;
				case 7:
					if (e !== 58) break;
					i.parentMessageId = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Gl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Wl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.subagentRunId = e.subagentRunId ?? "", t.name = e.name ?? "", t.description = e.description ?? void 0, t.parentSubagentRunId = e.parentSubagentRunId ?? void 0, t.parentToolCallId = e.parentToolCallId ?? void 0, t.parentMessageId = e.parentMessageId ?? void 0, t;
	}
};
function Kl() {
	return {
		baseEvent: void 0,
		subagentRunId: "",
		result: void 0,
		outcome: "",
		interruptIds: []
	};
}
var ql = {
	encode(e, t = new M()) {
		e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.subagentRunId !== "" && t.uint32(18).string(e.subagentRunId), e.result !== void 0 && P.encode(P.wrap(e.result), t.uint32(26).fork()).join(), e.outcome !== "" && t.uint32(34).string(e.outcome);
		for (let n of e.interruptIds) t.uint32(42).string(n);
		return t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Kl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.subagentRunId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.result = P.unwrap(P.decode(n, n.uint32()));
					continue;
				case 4:
					if (e !== 34) break;
					i.outcome = n.string();
					continue;
				case 5:
					if (e !== 42) break;
					i.interruptIds.push(n.string());
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return ql.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Kl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.subagentRunId = e.subagentRunId ?? "", t.result = e.result ?? void 0, t.outcome = e.outcome ?? "", t.interruptIds = e.interruptIds?.map((e) => e) || [], t;
	}
};
function Jl() {
	return {
		baseEvent: void 0,
		subagentRunId: "",
		message: "",
		code: void 0
	};
}
var Yl = {
	encode(e, t = new M()) {
		return e.baseEvent !== void 0 && F.encode(e.baseEvent, t.uint32(10).fork()).join(), e.subagentRunId !== "" && t.uint32(18).string(e.subagentRunId), e.message !== "" && t.uint32(26).string(e.message), e.code !== void 0 && t.uint32(34).string(e.code), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Jl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.baseEvent = F.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.subagentRunId = n.string();
					continue;
				case 3:
					if (e !== 26) break;
					i.message = n.string();
					continue;
				case 4:
					if (e !== 34) break;
					i.code = n.string();
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Yl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Jl();
		return t.baseEvent = e.baseEvent !== void 0 && e.baseEvent !== null ? F.fromPartial(e.baseEvent) : void 0, t.subagentRunId = e.subagentRunId ?? "", t.message = e.message ?? "", t.code = e.code ?? void 0, t;
	}
};
function Xl() {
	return {
		textMessageStart: void 0,
		textMessageContent: void 0,
		textMessageEnd: void 0,
		toolCallStart: void 0,
		toolCallArgs: void 0,
		toolCallEnd: void 0,
		stateSnapshot: void 0,
		stateDelta: void 0,
		messagesSnapshot: void 0,
		raw: void 0,
		custom: void 0,
		runStarted: void 0,
		runFinished: void 0,
		runError: void 0,
		stepStarted: void 0,
		stepFinished: void 0,
		textMessageChunk: void 0,
		toolCallChunk: void 0,
		subagentStarted: void 0,
		subagentFinished: void 0,
		subagentError: void 0
	};
}
var Zl = {
	encode(e, t = new M()) {
		return e.textMessageStart !== void 0 && sl.encode(e.textMessageStart, t.uint32(10).fork()).join(), e.textMessageContent !== void 0 && ll.encode(e.textMessageContent, t.uint32(18).fork()).join(), e.textMessageEnd !== void 0 && dl.encode(e.textMessageEnd, t.uint32(26).fork()).join(), e.toolCallStart !== void 0 && pl.encode(e.toolCallStart, t.uint32(34).fork()).join(), e.toolCallArgs !== void 0 && hl.encode(e.toolCallArgs, t.uint32(42).fork()).join(), e.toolCallEnd !== void 0 && _l.encode(e.toolCallEnd, t.uint32(50).fork()).join(), e.stateSnapshot !== void 0 && yl.encode(e.stateSnapshot, t.uint32(58).fork()).join(), e.stateDelta !== void 0 && xl.encode(e.stateDelta, t.uint32(66).fork()).join(), e.messagesSnapshot !== void 0 && Cl.encode(e.messagesSnapshot, t.uint32(74).fork()).join(), e.raw !== void 0 && Tl.encode(e.raw, t.uint32(82).fork()).join(), e.custom !== void 0 && Dl.encode(e.custom, t.uint32(90).fork()).join(), e.runStarted !== void 0 && kl.encode(e.runStarted, t.uint32(98).fork()).join(), e.runFinished !== void 0 && Nl.encode(e.runFinished, t.uint32(106).fork()).join(), e.runError !== void 0 && Fl.encode(e.runError, t.uint32(114).fork()).join(), e.stepStarted !== void 0 && Ll.encode(e.stepStarted, t.uint32(122).fork()).join(), e.stepFinished !== void 0 && zl.encode(e.stepFinished, t.uint32(130).fork()).join(), e.textMessageChunk !== void 0 && Vl.encode(e.textMessageChunk, t.uint32(138).fork()).join(), e.toolCallChunk !== void 0 && Ul.encode(e.toolCallChunk, t.uint32(146).fork()).join(), e.subagentStarted !== void 0 && Gl.encode(e.subagentStarted, t.uint32(154).fork()).join(), e.subagentFinished !== void 0 && ql.encode(e.subagentFinished, t.uint32(162).fork()).join(), e.subagentError !== void 0 && Yl.encode(e.subagentError, t.uint32(170).fork()).join(), t;
	},
	decode(e, t) {
		let n = e instanceof N ? e : new N(e), r = t === void 0 ? n.len : n.pos + t, i = Xl();
		for (; n.pos < r;) {
			let e = n.uint32();
			switch (e >>> 3) {
				case 1:
					if (e !== 10) break;
					i.textMessageStart = sl.decode(n, n.uint32());
					continue;
				case 2:
					if (e !== 18) break;
					i.textMessageContent = ll.decode(n, n.uint32());
					continue;
				case 3:
					if (e !== 26) break;
					i.textMessageEnd = dl.decode(n, n.uint32());
					continue;
				case 4:
					if (e !== 34) break;
					i.toolCallStart = pl.decode(n, n.uint32());
					continue;
				case 5:
					if (e !== 42) break;
					i.toolCallArgs = hl.decode(n, n.uint32());
					continue;
				case 6:
					if (e !== 50) break;
					i.toolCallEnd = _l.decode(n, n.uint32());
					continue;
				case 7:
					if (e !== 58) break;
					i.stateSnapshot = yl.decode(n, n.uint32());
					continue;
				case 8:
					if (e !== 66) break;
					i.stateDelta = xl.decode(n, n.uint32());
					continue;
				case 9:
					if (e !== 74) break;
					i.messagesSnapshot = Cl.decode(n, n.uint32());
					continue;
				case 10:
					if (e !== 82) break;
					i.raw = Tl.decode(n, n.uint32());
					continue;
				case 11:
					if (e !== 90) break;
					i.custom = Dl.decode(n, n.uint32());
					continue;
				case 12:
					if (e !== 98) break;
					i.runStarted = kl.decode(n, n.uint32());
					continue;
				case 13:
					if (e !== 106) break;
					i.runFinished = Nl.decode(n, n.uint32());
					continue;
				case 14:
					if (e !== 114) break;
					i.runError = Fl.decode(n, n.uint32());
					continue;
				case 15:
					if (e !== 122) break;
					i.stepStarted = Ll.decode(n, n.uint32());
					continue;
				case 16:
					if (e !== 130) break;
					i.stepFinished = zl.decode(n, n.uint32());
					continue;
				case 17:
					if (e !== 138) break;
					i.textMessageChunk = Vl.decode(n, n.uint32());
					continue;
				case 18:
					if (e !== 146) break;
					i.toolCallChunk = Ul.decode(n, n.uint32());
					continue;
				case 19:
					if (e !== 154) break;
					i.subagentStarted = Gl.decode(n, n.uint32());
					continue;
				case 20:
					if (e !== 162) break;
					i.subagentFinished = ql.decode(n, n.uint32());
					continue;
				case 21:
					if (e !== 170) break;
					i.subagentError = Yl.decode(n, n.uint32());
					continue;
			}
			if ((e & 7) == 4 || e === 0) break;
			n.skip(e & 7);
		}
		return i;
	},
	create(e) {
		return Zl.fromPartial(e ?? {});
	},
	fromPartial(e) {
		let t = Xl();
		return t.textMessageStart = e.textMessageStart !== void 0 && e.textMessageStart !== null ? sl.fromPartial(e.textMessageStart) : void 0, t.textMessageContent = e.textMessageContent !== void 0 && e.textMessageContent !== null ? ll.fromPartial(e.textMessageContent) : void 0, t.textMessageEnd = e.textMessageEnd !== void 0 && e.textMessageEnd !== null ? dl.fromPartial(e.textMessageEnd) : void 0, t.toolCallStart = e.toolCallStart !== void 0 && e.toolCallStart !== null ? pl.fromPartial(e.toolCallStart) : void 0, t.toolCallArgs = e.toolCallArgs !== void 0 && e.toolCallArgs !== null ? hl.fromPartial(e.toolCallArgs) : void 0, t.toolCallEnd = e.toolCallEnd !== void 0 && e.toolCallEnd !== null ? _l.fromPartial(e.toolCallEnd) : void 0, t.stateSnapshot = e.stateSnapshot !== void 0 && e.stateSnapshot !== null ? yl.fromPartial(e.stateSnapshot) : void 0, t.stateDelta = e.stateDelta !== void 0 && e.stateDelta !== null ? xl.fromPartial(e.stateDelta) : void 0, t.messagesSnapshot = e.messagesSnapshot !== void 0 && e.messagesSnapshot !== null ? Cl.fromPartial(e.messagesSnapshot) : void 0, t.raw = e.raw !== void 0 && e.raw !== null ? Tl.fromPartial(e.raw) : void 0, t.custom = e.custom !== void 0 && e.custom !== null ? Dl.fromPartial(e.custom) : void 0, t.runStarted = e.runStarted !== void 0 && e.runStarted !== null ? kl.fromPartial(e.runStarted) : void 0, t.runFinished = e.runFinished !== void 0 && e.runFinished !== null ? Nl.fromPartial(e.runFinished) : void 0, t.runError = e.runError !== void 0 && e.runError !== null ? Fl.fromPartial(e.runError) : void 0, t.stepStarted = e.stepStarted !== void 0 && e.stepStarted !== null ? Ll.fromPartial(e.stepStarted) : void 0, t.stepFinished = e.stepFinished !== void 0 && e.stepFinished !== null ? zl.fromPartial(e.stepFinished) : void 0, t.textMessageChunk = e.textMessageChunk !== void 0 && e.textMessageChunk !== null ? Vl.fromPartial(e.textMessageChunk) : void 0, t.toolCallChunk = e.toolCallChunk !== void 0 && e.toolCallChunk !== null ? Ul.fromPartial(e.toolCallChunk) : void 0, t.subagentStarted = e.subagentStarted !== void 0 && e.subagentStarted !== null ? Gl.fromPartial(e.subagentStarted) : void 0, t.subagentFinished = e.subagentFinished !== void 0 && e.subagentFinished !== null ? ql.fromPartial(e.subagentFinished) : void 0, t.subagentError = e.subagentError !== void 0 && e.subagentError !== null ? Yl.fromPartial(e.subagentError) : void 0, t;
	}
};
function Ql(e) {
	let t = globalThis.Number(e.toString());
	if (t > globalThis.Number.MAX_SAFE_INTEGER) throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
	if (t < globalThis.Number.MIN_SAFE_INTEGER) throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
	return t;
}
var $l = (e) => e && typeof e == "object" ? e : void 0, eu = (e) => {
	let t = $l(e);
	if (t) {
		if (t.data) {
			let e = t.data;
			return {
				type: "data",
				value: e.value,
				mimeType: e.mimeType
			};
		}
		if (t.url) {
			let e = t.url;
			return {
				type: "url",
				value: e.value,
				mimeType: e.mimeType
			};
		}
	}
}, tu = (e) => {
	let t = $l(e);
	if (t) {
		if (t.text) return {
			type: "text",
			text: t.text.text
		};
		if (t.image) {
			let e = t.image;
			return {
				type: "image",
				source: eu(e.source),
				metadata: e.metadata
			};
		}
		if (t.audio) {
			let e = t.audio;
			return {
				type: "audio",
				source: eu(e.source),
				metadata: e.metadata
			};
		}
		if (t.video) {
			let e = t.video;
			return {
				type: "video",
				source: eu(e.source),
				metadata: e.metadata
			};
		}
		if (t.document) {
			let e = t.document;
			return {
				type: "document",
				source: eu(e.source),
				metadata: e.metadata
			};
		}
	}
};
function nu(e) {
	let t = Zl.decode(e), n = Object.values(t).find((e) => e !== void 0);
	if (!n) throw Error("Invalid event");
	if (n.type = il[n.baseEvent.type], n.timestamp = n.baseEvent.timestamp, n.rawEvent = n.baseEvent.rawEvent, n.baseEvent.metadata !== void 0 && (n.metadata = n.baseEvent.metadata), delete n.baseEvent, n.type === O.MESSAGES_SNAPSHOT) for (let e of n.messages) {
		let t = e;
		if (t.role === "user" && Array.isArray(t.contentParts)) {
			let e = t.contentParts.map((e) => tu(e)).filter((e) => e !== void 0);
			e.length > 0 && (t.content = e);
		}
		Array.isArray(t.contentParts) && t.contentParts.length === 0 && (t.contentParts = void 0), t.toolCalls?.length === 0 && (t.toolCalls = void 0);
	}
	if (n.type === O.RUN_FINISHED) {
		let e = n, t = typeof e.outcome == "string" && e.outcome !== "" ? e.outcome : void 0, r = Array.isArray(e.interrupts) ? e.interrupts : [];
		delete e.interrupts, t === "interrupt" ? e.outcome = {
			type: "interrupt",
			interrupts: r
		} : t === "success" ? e.outcome = { type: "success" } : delete e.outcome;
	}
	if (n.type === O.SUBAGENT_FINISHED) {
		let e = n, t = typeof e.outcome == "string" && e.outcome !== "" ? e.outcome : void 0, r = Array.isArray(e.interruptIds) ? e.interruptIds : [];
		delete e.interruptIds, t === "suspended" ? e.outcome = {
			type: "suspended",
			...r.length > 0 && { interruptIds: r }
		} : t === "success" ? e.outcome = { type: "success" } : delete e.outcome;
	}
	if ((n.type === O.RUN_FINISHED || n.type === O.RUN_ERROR) && Array.isArray(n.usage) && n.usage.length === 0 && delete n.usage, n.type === O.STATE_DELTA) for (let e of n.delta) e.op = kc[e.op].toLowerCase(), Object.keys(e).forEach((t) => {
		e[t] === void 0 && delete e[t];
	});
	return Object.keys(n).forEach((e) => {
		n[e] === void 0 && delete n[e];
	}), ni.parse(n);
}
//#endregion
//#region node_modules/@ag-ui/client/node_modules/zod/v3/helpers/util.js
var ru;
(function(e) {
	e.assertEqual = (e) => {};
	function t(e) {}
	e.assertIs = t;
	function n(e) {
		throw Error();
	}
	e.assertNever = n, e.arrayToEnum = (e) => {
		let t = {};
		for (let n of e) t[n] = n;
		return t;
	}, e.getValidEnumValues = (t) => {
		let n = e.objectKeys(t).filter((e) => typeof t[t[e]] != "number"), r = {};
		for (let e of n) r[e] = t[e];
		return e.objectValues(r);
	}, e.objectValues = (t) => e.objectKeys(t).map(function(e) {
		return t[e];
	}), e.objectKeys = typeof Object.keys == "function" ? (e) => Object.keys(e) : (e) => {
		let t = [];
		for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
		return t;
	}, e.find = (e, t) => {
		for (let n of e) if (t(n)) return n;
	}, e.isInteger = typeof Number.isInteger == "function" ? (e) => Number.isInteger(e) : (e) => typeof e == "number" && Number.isFinite(e) && Math.floor(e) === e;
	function r(e, t = " | ") {
		return e.map((e) => typeof e == "string" ? `'${e}'` : e).join(t);
	}
	e.joinValues = r, e.jsonStringifyReplacer = (e, t) => typeof t == "bigint" ? t.toString() : t;
})(ru || (ru = {}));
var iu;
(function(e) {
	e.mergeShapes = (e, t) => ({
		...e,
		...t
	});
})(iu || (iu = {}));
var I = ru.arrayToEnum([
	"string",
	"nan",
	"number",
	"integer",
	"float",
	"boolean",
	"date",
	"bigint",
	"symbol",
	"function",
	"undefined",
	"null",
	"array",
	"object",
	"unknown",
	"promise",
	"void",
	"never",
	"map",
	"set"
]), au = (e) => {
	switch (typeof e) {
		case "undefined": return I.undefined;
		case "string": return I.string;
		case "number": return Number.isNaN(e) ? I.nan : I.number;
		case "boolean": return I.boolean;
		case "function": return I.function;
		case "bigint": return I.bigint;
		case "symbol": return I.symbol;
		case "object": return Array.isArray(e) ? I.array : e === null ? I.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? I.promise : typeof Map < "u" && e instanceof Map ? I.map : typeof Set < "u" && e instanceof Set ? I.set : typeof Date < "u" && e instanceof Date ? I.date : I.object;
		default: return I.unknown;
	}
}, L = ru.arrayToEnum([
	"invalid_type",
	"invalid_literal",
	"custom",
	"invalid_union",
	"invalid_union_discriminator",
	"invalid_enum_value",
	"unrecognized_keys",
	"invalid_arguments",
	"invalid_return_type",
	"invalid_date",
	"invalid_string",
	"too_small",
	"too_big",
	"invalid_intersection_types",
	"not_multiple_of",
	"not_finite"
]), ou = class e extends Error {
	get errors() {
		return this.issues;
	}
	constructor(e) {
		super(), this.issues = [], this.addIssue = (e) => {
			this.issues = [...this.issues, e];
		}, this.addIssues = (e = []) => {
			this.issues = [...this.issues, ...e];
		};
		let t = new.target.prototype;
		Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
	}
	format(e) {
		let t = e || function(e) {
			return e.message;
		}, n = { _errors: [] }, r = (e) => {
			for (let i of e.issues) if (i.code === "invalid_union") i.unionErrors.map(r);
			else if (i.code === "invalid_return_type") r(i.returnTypeError);
			else if (i.code === "invalid_arguments") r(i.argumentsError);
			else if (i.path.length === 0) n._errors.push(t(i));
			else {
				let e = n, r = 0;
				for (; r < i.path.length;) {
					let n = i.path[r];
					r === i.path.length - 1 ? (e[n] = e[n] || { _errors: [] }, e[n]._errors.push(t(i))) : e[n] = e[n] || { _errors: [] }, e = e[n], r++;
				}
			}
		};
		return r(this), n;
	}
	static assert(t) {
		if (!(t instanceof e)) throw Error(`Not a ZodError: ${t}`);
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, ru.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(e = (e) => e.message) {
		let t = {}, n = [];
		for (let r of this.issues) if (r.path.length > 0) {
			let n = r.path[0];
			t[n] = t[n] || [], t[n].push(e(r));
		} else n.push(e(r));
		return {
			formErrors: n,
			fieldErrors: t
		};
	}
	get formErrors() {
		return this.flatten();
	}
};
ou.create = (e) => new ou(e);
//#endregion
//#region node_modules/@ag-ui/client/node_modules/zod/v3/locales/en.js
var su = (e, t) => {
	let n;
	switch (e.code) {
		case L.invalid_type:
			n = e.received === I.undefined ? "Required" : `Expected ${e.expected}, received ${e.received}`;
			break;
		case L.invalid_literal:
			n = `Invalid literal value, expected ${JSON.stringify(e.expected, ru.jsonStringifyReplacer)}`;
			break;
		case L.unrecognized_keys:
			n = `Unrecognized key(s) in object: ${ru.joinValues(e.keys, ", ")}`;
			break;
		case L.invalid_union:
			n = "Invalid input";
			break;
		case L.invalid_union_discriminator:
			n = `Invalid discriminator value. Expected ${ru.joinValues(e.options)}`;
			break;
		case L.invalid_enum_value:
			n = `Invalid enum value. Expected ${ru.joinValues(e.options)}, received '${e.received}'`;
			break;
		case L.invalid_arguments:
			n = "Invalid function arguments";
			break;
		case L.invalid_return_type:
			n = "Invalid function return type";
			break;
		case L.invalid_date:
			n = "Invalid date";
			break;
		case L.invalid_string:
			typeof e.validation == "object" ? "includes" in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : ru.assertNever(e.validation) : n = e.validation === "regex" ? "Invalid" : `Invalid ${e.validation}`;
			break;
		case L.too_small:
			n = e.type === "array" ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" || e.type === "bigint" ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : "Invalid input";
			break;
		case L.too_big:
			n = e.type === "array" ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : "Invalid input";
			break;
		case L.custom:
			n = "Invalid input";
			break;
		case L.invalid_intersection_types:
			n = "Intersection results could not be merged";
			break;
		case L.not_multiple_of:
			n = `Number must be a multiple of ${e.multipleOf}`;
			break;
		case L.not_finite:
			n = "Number must be finite";
			break;
		default: n = t.defaultError, ru.assertNever(e);
	}
	return { message: n };
}, cu = su;
function lu() {
	return cu;
}
//#endregion
//#region node_modules/@ag-ui/client/node_modules/zod/v3/helpers/parseUtil.js
var uu = (e) => {
	let { data: t, path: n, errorMaps: r, issueData: i } = e, a = [...n, ...i.path || []], o = {
		...i,
		path: a
	};
	if (i.message !== void 0) return {
		...i,
		path: a,
		message: i.message
	};
	let s = "", c = r.filter((e) => !!e).slice().reverse();
	for (let e of c) s = e(o, {
		data: t,
		defaultError: s
	}).message;
	return {
		...i,
		path: a,
		message: s
	};
};
function R(e, t) {
	let n = lu(), r = uu({
		issueData: t,
		data: e.data,
		path: e.path,
		errorMaps: [
			e.common.contextualErrorMap,
			e.schemaErrorMap,
			n,
			n === su ? void 0 : su
		].filter((e) => !!e)
	});
	e.common.issues.push(r);
}
var du = class e {
	constructor() {
		this.value = "valid";
	}
	dirty() {
		this.value === "valid" && (this.value = "dirty");
	}
	abort() {
		this.value !== "aborted" && (this.value = "aborted");
	}
	static mergeArray(e, t) {
		let n = [];
		for (let r of t) {
			if (r.status === "aborted") return z;
			r.status === "dirty" && e.dirty(), n.push(r.value);
		}
		return {
			status: e.value,
			value: n
		};
	}
	static async mergeObjectAsync(t, n) {
		let r = [];
		for (let e of n) {
			let t = await e.key, n = await e.value;
			r.push({
				key: t,
				value: n
			});
		}
		return e.mergeObjectSync(t, r);
	}
	static mergeObjectSync(e, t) {
		let n = {};
		for (let r of t) {
			let { key: t, value: i } = r;
			if (t.status === "aborted" || i.status === "aborted") return z;
			t.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), t.value !== "__proto__" && (i.value !== void 0 || r.alwaysSet) && (n[t.value] = i.value);
		}
		return {
			status: e.value,
			value: n
		};
	}
}, z = Object.freeze({ status: "aborted" }), fu = (e) => ({
	status: "dirty",
	value: e
}), pu = (e) => ({
	status: "valid",
	value: e
}), mu = (e) => e.status === "aborted", hu = (e) => e.status === "dirty", gu = (e) => e.status === "valid", _u = (e) => typeof Promise < "u" && e instanceof Promise, B;
(function(e) {
	e.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, e.toString = (e) => typeof e == "string" ? e : e?.message;
})(B || (B = {}));
//#endregion
//#region node_modules/@ag-ui/client/node_modules/zod/v3/types.js
var vu = class {
	constructor(e, t, n, r) {
		this._cachedPath = [], this.parent = e, this.data = t, this._path = n, this._key = r;
	}
	get path() {
		return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
	}
}, yu = (e, t) => {
	if (gu(t)) return {
		success: !0,
		data: t.value
	};
	if (!e.common.issues.length) throw Error("Validation failed but no issues detected.");
	return {
		success: !1,
		get error() {
			if (this._error) return this._error;
			let t = new ou(e.common.issues);
			return this._error = t, this._error;
		}
	};
};
function V(e) {
	if (!e) return {};
	let { errorMap: t, invalid_type_error: n, required_error: r, description: i } = e;
	if (t && (n || r)) throw Error("Can't use \"invalid_type_error\" or \"required_error\" in conjunction with custom error map.");
	return t ? {
		errorMap: t,
		description: i
	} : {
		errorMap: (t, i) => {
			let { message: a } = e;
			return t.code === "invalid_enum_value" ? { message: a ?? i.defaultError } : i.data === void 0 ? { message: a ?? r ?? i.defaultError } : t.code === "invalid_type" ? { message: a ?? n ?? i.defaultError } : { message: i.defaultError };
		},
		description: i
	};
}
var H = class {
	get description() {
		return this._def.description;
	}
	_getType(e) {
		return au(e.data);
	}
	_getOrReturnCtx(e, t) {
		return t || {
			common: e.parent.common,
			data: e.data,
			parsedType: au(e.data),
			schemaErrorMap: this._def.errorMap,
			path: e.path,
			parent: e.parent
		};
	}
	_processInputParams(e) {
		return {
			status: new du(),
			ctx: {
				common: e.parent.common,
				data: e.data,
				parsedType: au(e.data),
				schemaErrorMap: this._def.errorMap,
				path: e.path,
				parent: e.parent
			}
		};
	}
	_parseSync(e) {
		let t = this._parse(e);
		if (_u(t)) throw Error("Synchronous parse encountered promise.");
		return t;
	}
	_parseAsync(e) {
		let t = this._parse(e);
		return Promise.resolve(t);
	}
	parse(e, t) {
		let n = this.safeParse(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	safeParse(e, t) {
		let n = {
			common: {
				issues: [],
				async: t?.async ?? !1,
				contextualErrorMap: t?.errorMap
			},
			path: t?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: au(e)
		};
		return yu(n, this._parseSync({
			data: e,
			path: n.path,
			parent: n
		}));
	}
	"~validate"(e) {
		let t = {
			common: {
				issues: [],
				async: !!this["~standard"].async
			},
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: au(e)
		};
		if (!this["~standard"].async) try {
			let n = this._parseSync({
				data: e,
				path: [],
				parent: t
			});
			return gu(n) ? { value: n.value } : { issues: t.common.issues };
		} catch (e) {
			e?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = !0), t.common = {
				issues: [],
				async: !0
			};
		}
		return this._parseAsync({
			data: e,
			path: [],
			parent: t
		}).then((e) => gu(e) ? { value: e.value } : { issues: t.common.issues });
	}
	async parseAsync(e, t) {
		let n = await this.safeParseAsync(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	async safeParseAsync(e, t) {
		let n = {
			common: {
				issues: [],
				contextualErrorMap: t?.errorMap,
				async: !0
			},
			path: t?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: au(e)
		}, r = this._parse({
			data: e,
			path: n.path,
			parent: n
		});
		return yu(n, await (_u(r) ? r : Promise.resolve(r)));
	}
	refine(e, t) {
		let n = (e) => typeof t == "string" || t === void 0 ? { message: t } : typeof t == "function" ? t(e) : t;
		return this._refinement((t, r) => {
			let i = e(t), a = () => r.addIssue({
				code: L.custom,
				...n(t)
			});
			return typeof Promise < "u" && i instanceof Promise ? i.then((e) => e ? !0 : (a(), !1)) : i ? !0 : (a(), !1);
		});
	}
	refinement(e, t) {
		return this._refinement((n, r) => e(n) ? !0 : (r.addIssue(typeof t == "function" ? t(n, r) : t), !1));
	}
	_refinement(e) {
		return new Sd({
			schema: this,
			typeName: U.ZodEffects,
			effect: {
				type: "refinement",
				refinement: e
			}
		});
	}
	superRefine(e) {
		return this._refinement(e);
	}
	constructor(e) {
		this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
			version: 1,
			vendor: "zod",
			validate: (e) => this["~validate"](e)
		};
	}
	optional() {
		return Cd.create(this, this._def);
	}
	nullable() {
		return wd.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return rd.create(this);
	}
	promise() {
		return xd.create(this, this._def);
	}
	or(e) {
		return od.create([this, e], this._def);
	}
	and(e) {
		return ud.create(this, e, this._def);
	}
	transform(e) {
		return new Sd({
			...V(this._def),
			schema: this,
			typeName: U.ZodEffects,
			effect: {
				type: "transform",
				transform: e
			}
		});
	}
	default(e) {
		let t = typeof e == "function" ? e : () => e;
		return new Td({
			...V(this._def),
			innerType: this,
			defaultValue: t,
			typeName: U.ZodDefault
		});
	}
	brand() {
		return new Od({
			typeName: U.ZodBranded,
			type: this,
			...V(this._def)
		});
	}
	catch(e) {
		let t = typeof e == "function" ? e : () => e;
		return new Ed({
			...V(this._def),
			innerType: this,
			catchValue: t,
			typeName: U.ZodCatch
		});
	}
	describe(e) {
		let t = this.constructor;
		return new t({
			...this._def,
			description: e
		});
	}
	pipe(e) {
		return kd.create(this, e);
	}
	readonly() {
		return Ad.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
}, bu = /^c[^\s-]{8,}$/i, xu = /^[0-9a-z]+$/, Su = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Cu = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, wu = /^[a-z0-9_-]{21}$/i, Tu = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Eu = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Du = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Ou = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", ku, Au = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ju = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Mu = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Nu = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Pu = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Fu = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Iu = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Lu = RegExp(`^${Iu}$`);
function Ru(e) {
	let t = "[0-5]\\d";
	e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision ?? (t = `${t}(\\.\\d+)?`);
	let n = e.precision ? "+" : "?";
	return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${n}`;
}
function zu(e) {
	return RegExp(`^${Ru(e)}$`);
}
function Bu(e) {
	let t = `${Iu}T${Ru(e)}`, n = [];
	return n.push(e.local ? "Z?" : "Z"), e.offset && n.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${n.join("|")})`, RegExp(`^${t}$`);
}
function Vu(e, t) {
	return !((t !== "v4" && t || !Au.test(e)) && (t !== "v6" && t || !Mu.test(e)));
}
function Hu(e, t) {
	if (!Tu.test(e)) return !1;
	try {
		let [n] = e.split(".");
		if (!n) return !1;
		let r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), i = JSON.parse(atob(r));
		return !(typeof i != "object" || !i || "typ" in i && i?.typ !== "JWT" || !i.alg || t && i.alg !== t);
	} catch {
		return !1;
	}
}
function Uu(e, t) {
	return !((t !== "v4" && t || !ju.test(e)) && (t !== "v6" && t || !Nu.test(e)));
}
var Wu = class e extends H {
	_parse(e) {
		if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== I.string) {
			let t = this._getOrReturnCtx(e);
			return R(t, {
				code: L.invalid_type,
				expected: I.string,
				received: t.parsedType
			}), z;
		}
		let t = new du(), n;
		for (let r of this._def.checks) if (r.kind === "min") e.data.length < r.value && (n = this._getOrReturnCtx(e, n), R(n, {
			code: L.too_small,
			minimum: r.value,
			type: "string",
			inclusive: !0,
			exact: !1,
			message: r.message
		}), t.dirty());
		else if (r.kind === "max") e.data.length > r.value && (n = this._getOrReturnCtx(e, n), R(n, {
			code: L.too_big,
			maximum: r.value,
			type: "string",
			inclusive: !0,
			exact: !1,
			message: r.message
		}), t.dirty());
		else if (r.kind === "length") {
			let i = e.data.length > r.value, a = e.data.length < r.value;
			(i || a) && (n = this._getOrReturnCtx(e, n), i ? R(n, {
				code: L.too_big,
				maximum: r.value,
				type: "string",
				inclusive: !0,
				exact: !0,
				message: r.message
			}) : a && R(n, {
				code: L.too_small,
				minimum: r.value,
				type: "string",
				inclusive: !0,
				exact: !0,
				message: r.message
			}), t.dirty());
		} else if (r.kind === "email") Du.test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "email",
			code: L.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "emoji") ku || (ku = new RegExp(Ou, "u")), ku.test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "emoji",
			code: L.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "uuid") Cu.test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "uuid",
			code: L.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "nanoid") wu.test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "nanoid",
			code: L.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "cuid") bu.test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "cuid",
			code: L.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "cuid2") xu.test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "cuid2",
			code: L.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "ulid") Su.test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "ulid",
			code: L.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "url") try {
			new URL(e.data);
		} catch {
			n = this._getOrReturnCtx(e, n), R(n, {
				validation: "url",
				code: L.invalid_string,
				message: r.message
			}), t.dirty();
		}
		else r.kind === "regex" ? (r.regex.lastIndex = 0, r.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "regex",
			code: L.invalid_string,
			message: r.message
		}), t.dirty())) : r.kind === "trim" ? e.data = e.data.trim() : r.kind === "includes" ? e.data.includes(r.value, r.position) || (n = this._getOrReturnCtx(e, n), R(n, {
			code: L.invalid_string,
			validation: {
				includes: r.value,
				position: r.position
			},
			message: r.message
		}), t.dirty()) : r.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : r.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : r.kind === "startsWith" ? e.data.startsWith(r.value) || (n = this._getOrReturnCtx(e, n), R(n, {
			code: L.invalid_string,
			validation: { startsWith: r.value },
			message: r.message
		}), t.dirty()) : r.kind === "endsWith" ? e.data.endsWith(r.value) || (n = this._getOrReturnCtx(e, n), R(n, {
			code: L.invalid_string,
			validation: { endsWith: r.value },
			message: r.message
		}), t.dirty()) : r.kind === "datetime" ? Bu(r).test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			code: L.invalid_string,
			validation: "datetime",
			message: r.message
		}), t.dirty()) : r.kind === "date" ? Lu.test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			code: L.invalid_string,
			validation: "date",
			message: r.message
		}), t.dirty()) : r.kind === "time" ? zu(r).test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			code: L.invalid_string,
			validation: "time",
			message: r.message
		}), t.dirty()) : r.kind === "duration" ? Eu.test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "duration",
			code: L.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "ip" ? Vu(e.data, r.version) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "ip",
			code: L.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "jwt" ? Hu(e.data, r.alg) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "jwt",
			code: L.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "cidr" ? Uu(e.data, r.version) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "cidr",
			code: L.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "base64" ? Pu.test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "base64",
			code: L.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "base64url" ? Fu.test(e.data) || (n = this._getOrReturnCtx(e, n), R(n, {
			validation: "base64url",
			code: L.invalid_string,
			message: r.message
		}), t.dirty()) : ru.assertNever(r);
		return {
			status: t.value,
			value: e.data
		};
	}
	_regex(e, t, n) {
		return this.refinement((t) => e.test(t), {
			validation: t,
			code: L.invalid_string,
			...B.errToObj(n)
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	email(e) {
		return this._addCheck({
			kind: "email",
			...B.errToObj(e)
		});
	}
	url(e) {
		return this._addCheck({
			kind: "url",
			...B.errToObj(e)
		});
	}
	emoji(e) {
		return this._addCheck({
			kind: "emoji",
			...B.errToObj(e)
		});
	}
	uuid(e) {
		return this._addCheck({
			kind: "uuid",
			...B.errToObj(e)
		});
	}
	nanoid(e) {
		return this._addCheck({
			kind: "nanoid",
			...B.errToObj(e)
		});
	}
	cuid(e) {
		return this._addCheck({
			kind: "cuid",
			...B.errToObj(e)
		});
	}
	cuid2(e) {
		return this._addCheck({
			kind: "cuid2",
			...B.errToObj(e)
		});
	}
	ulid(e) {
		return this._addCheck({
			kind: "ulid",
			...B.errToObj(e)
		});
	}
	base64(e) {
		return this._addCheck({
			kind: "base64",
			...B.errToObj(e)
		});
	}
	base64url(e) {
		return this._addCheck({
			kind: "base64url",
			...B.errToObj(e)
		});
	}
	jwt(e) {
		return this._addCheck({
			kind: "jwt",
			...B.errToObj(e)
		});
	}
	ip(e) {
		return this._addCheck({
			kind: "ip",
			...B.errToObj(e)
		});
	}
	cidr(e) {
		return this._addCheck({
			kind: "cidr",
			...B.errToObj(e)
		});
	}
	datetime(e) {
		return typeof e == "string" ? this._addCheck({
			kind: "datetime",
			precision: null,
			offset: !1,
			local: !1,
			message: e
		}) : this._addCheck({
			kind: "datetime",
			precision: e?.precision === void 0 ? null : e?.precision,
			offset: e?.offset ?? !1,
			local: e?.local ?? !1,
			...B.errToObj(e?.message)
		});
	}
	date(e) {
		return this._addCheck({
			kind: "date",
			message: e
		});
	}
	time(e) {
		return typeof e == "string" ? this._addCheck({
			kind: "time",
			precision: null,
			message: e
		}) : this._addCheck({
			kind: "time",
			precision: e?.precision === void 0 ? null : e?.precision,
			...B.errToObj(e?.message)
		});
	}
	duration(e) {
		return this._addCheck({
			kind: "duration",
			...B.errToObj(e)
		});
	}
	regex(e, t) {
		return this._addCheck({
			kind: "regex",
			regex: e,
			...B.errToObj(t)
		});
	}
	includes(e, t) {
		return this._addCheck({
			kind: "includes",
			value: e,
			position: t?.position,
			...B.errToObj(t?.message)
		});
	}
	startsWith(e, t) {
		return this._addCheck({
			kind: "startsWith",
			value: e,
			...B.errToObj(t)
		});
	}
	endsWith(e, t) {
		return this._addCheck({
			kind: "endsWith",
			value: e,
			...B.errToObj(t)
		});
	}
	min(e, t) {
		return this._addCheck({
			kind: "min",
			value: e,
			...B.errToObj(t)
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: "max",
			value: e,
			...B.errToObj(t)
		});
	}
	length(e, t) {
		return this._addCheck({
			kind: "length",
			value: e,
			...B.errToObj(t)
		});
	}
	nonempty(e) {
		return this.min(1, B.errToObj(e));
	}
	trim() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }]
		});
	}
	toLowerCase() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }]
		});
	}
	toUpperCase() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "toUpperCase" }]
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((e) => e.kind === "datetime");
	}
	get isDate() {
		return !!this._def.checks.find((e) => e.kind === "date");
	}
	get isTime() {
		return !!this._def.checks.find((e) => e.kind === "time");
	}
	get isDuration() {
		return !!this._def.checks.find((e) => e.kind === "duration");
	}
	get isEmail() {
		return !!this._def.checks.find((e) => e.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((e) => e.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((e) => e.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((e) => e.kind === "uuid");
	}
	get isNANOID() {
		return !!this._def.checks.find((e) => e.kind === "nanoid");
	}
	get isCUID() {
		return !!this._def.checks.find((e) => e.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((e) => e.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((e) => e.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((e) => e.kind === "ip");
	}
	get isCIDR() {
		return !!this._def.checks.find((e) => e.kind === "cidr");
	}
	get isBase64() {
		return !!this._def.checks.find((e) => e.kind === "base64");
	}
	get isBase64url() {
		return !!this._def.checks.find((e) => e.kind === "base64url");
	}
	get minLength() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxLength() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
Wu.create = (e) => new Wu({
	checks: [],
	typeName: U.ZodString,
	coerce: e?.coerce ?? !1,
	...V(e)
});
function Gu(e, t) {
	let n = (e.toString().split(".")[1] || "").length, r = (t.toString().split(".")[1] || "").length, i = n > r ? n : r;
	return Number.parseInt(e.toFixed(i).replace(".", "")) % Number.parseInt(t.toFixed(i).replace(".", "")) / 10 ** i;
}
var Ku = class e extends H {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
	}
	_parse(e) {
		if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== I.number) {
			let t = this._getOrReturnCtx(e);
			return R(t, {
				code: L.invalid_type,
				expected: I.number,
				received: t.parsedType
			}), z;
		}
		let t, n = new du();
		for (let r of this._def.checks) r.kind === "int" ? ru.isInteger(e.data) || (t = this._getOrReturnCtx(e, t), R(t, {
			code: L.invalid_type,
			expected: "integer",
			received: "float",
			message: r.message
		}), n.dirty()) : r.kind === "min" ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), R(t, {
			code: L.too_small,
			minimum: r.value,
			type: "number",
			inclusive: r.inclusive,
			exact: !1,
			message: r.message
		}), n.dirty()) : r.kind === "max" ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), R(t, {
			code: L.too_big,
			maximum: r.value,
			type: "number",
			inclusive: r.inclusive,
			exact: !1,
			message: r.message
		}), n.dirty()) : r.kind === "multipleOf" ? Gu(e.data, r.value) !== 0 && (t = this._getOrReturnCtx(e, t), R(t, {
			code: L.not_multiple_of,
			multipleOf: r.value,
			message: r.message
		}), n.dirty()) : r.kind === "finite" ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t), R(t, {
			code: L.not_finite,
			message: r.message
		}), n.dirty()) : ru.assertNever(r);
		return {
			status: n.value,
			value: e.data
		};
	}
	gte(e, t) {
		return this.setLimit("min", e, !0, B.toString(t));
	}
	gt(e, t) {
		return this.setLimit("min", e, !1, B.toString(t));
	}
	lte(e, t) {
		return this.setLimit("max", e, !0, B.toString(t));
	}
	lt(e, t) {
		return this.setLimit("max", e, !1, B.toString(t));
	}
	setLimit(t, n, r, i) {
		return new e({
			...this._def,
			checks: [...this._def.checks, {
				kind: t,
				value: n,
				inclusive: r,
				message: B.toString(i)
			}]
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	int(e) {
		return this._addCheck({
			kind: "int",
			message: B.toString(e)
		});
	}
	positive(e) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !1,
			message: B.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !1,
			message: B.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !0,
			message: B.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !0,
			message: B.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: "multipleOf",
			value: e,
			message: B.toString(t)
		});
	}
	finite(e) {
		return this._addCheck({
			kind: "finite",
			message: B.toString(e)
		});
	}
	safe(e) {
		return this._addCheck({
			kind: "min",
			inclusive: !0,
			value: -(2 ** 53 - 1),
			message: B.toString(e)
		})._addCheck({
			kind: "max",
			inclusive: !0,
			value: 2 ** 53 - 1,
			message: B.toString(e)
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
	get isInt() {
		return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && ru.isInteger(e.value));
	}
	get isFinite() {
		let e = null, t = null;
		for (let n of this._def.checks) if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf") return !0;
		else n.kind === "min" ? (t === null || n.value > t) && (t = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
		return Number.isFinite(t) && Number.isFinite(e);
	}
};
Ku.create = (e) => new Ku({
	checks: [],
	typeName: U.ZodNumber,
	coerce: e?.coerce || !1,
	...V(e)
});
var qu = class e extends H {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte;
	}
	_parse(e) {
		if (this._def.coerce) try {
			e.data = BigInt(e.data);
		} catch {
			return this._getInvalidInput(e);
		}
		if (this._getType(e) !== I.bigint) return this._getInvalidInput(e);
		let t, n = new du();
		for (let r of this._def.checks) r.kind === "min" ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), R(t, {
			code: L.too_small,
			type: "bigint",
			minimum: r.value,
			inclusive: r.inclusive,
			message: r.message
		}), n.dirty()) : r.kind === "max" ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), R(t, {
			code: L.too_big,
			type: "bigint",
			maximum: r.value,
			inclusive: r.inclusive,
			message: r.message
		}), n.dirty()) : r.kind === "multipleOf" ? e.data % r.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t), R(t, {
			code: L.not_multiple_of,
			multipleOf: r.value,
			message: r.message
		}), n.dirty()) : ru.assertNever(r);
		return {
			status: n.value,
			value: e.data
		};
	}
	_getInvalidInput(e) {
		let t = this._getOrReturnCtx(e);
		return R(t, {
			code: L.invalid_type,
			expected: I.bigint,
			received: t.parsedType
		}), z;
	}
	gte(e, t) {
		return this.setLimit("min", e, !0, B.toString(t));
	}
	gt(e, t) {
		return this.setLimit("min", e, !1, B.toString(t));
	}
	lte(e, t) {
		return this.setLimit("max", e, !0, B.toString(t));
	}
	lt(e, t) {
		return this.setLimit("max", e, !1, B.toString(t));
	}
	setLimit(t, n, r, i) {
		return new e({
			...this._def,
			checks: [...this._def.checks, {
				kind: t,
				value: n,
				inclusive: r,
				message: B.toString(i)
			}]
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	positive(e) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !1,
			message: B.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !1,
			message: B.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !0,
			message: B.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !0,
			message: B.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: "multipleOf",
			value: e,
			message: B.toString(t)
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
qu.create = (e) => new qu({
	checks: [],
	typeName: U.ZodBigInt,
	coerce: e?.coerce ?? !1,
	...V(e)
});
var Ju = class extends H {
	_parse(e) {
		if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== I.boolean) {
			let t = this._getOrReturnCtx(e);
			return R(t, {
				code: L.invalid_type,
				expected: I.boolean,
				received: t.parsedType
			}), z;
		}
		return pu(e.data);
	}
};
Ju.create = (e) => new Ju({
	typeName: U.ZodBoolean,
	coerce: e?.coerce || !1,
	...V(e)
});
var Yu = class e extends H {
	_parse(e) {
		if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== I.date) {
			let t = this._getOrReturnCtx(e);
			return R(t, {
				code: L.invalid_type,
				expected: I.date,
				received: t.parsedType
			}), z;
		}
		if (Number.isNaN(e.data.getTime())) return R(this._getOrReturnCtx(e), { code: L.invalid_date }), z;
		let t = new du(), n;
		for (let r of this._def.checks) r.kind === "min" ? e.data.getTime() < r.value && (n = this._getOrReturnCtx(e, n), R(n, {
			code: L.too_small,
			message: r.message,
			inclusive: !0,
			exact: !1,
			minimum: r.value,
			type: "date"
		}), t.dirty()) : r.kind === "max" ? e.data.getTime() > r.value && (n = this._getOrReturnCtx(e, n), R(n, {
			code: L.too_big,
			message: r.message,
			inclusive: !0,
			exact: !1,
			maximum: r.value,
			type: "date"
		}), t.dirty()) : ru.assertNever(r);
		return {
			status: t.value,
			value: new Date(e.data.getTime())
		};
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	min(e, t) {
		return this._addCheck({
			kind: "min",
			value: e.getTime(),
			message: B.toString(t)
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: "max",
			value: e.getTime(),
			message: B.toString(t)
		});
	}
	get minDate() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e == null ? null : new Date(e);
	}
	get maxDate() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e == null ? null : new Date(e);
	}
};
Yu.create = (e) => new Yu({
	checks: [],
	coerce: e?.coerce || !1,
	typeName: U.ZodDate,
	...V(e)
});
var Xu = class extends H {
	_parse(e) {
		if (this._getType(e) !== I.symbol) {
			let t = this._getOrReturnCtx(e);
			return R(t, {
				code: L.invalid_type,
				expected: I.symbol,
				received: t.parsedType
			}), z;
		}
		return pu(e.data);
	}
};
Xu.create = (e) => new Xu({
	typeName: U.ZodSymbol,
	...V(e)
});
var Zu = class extends H {
	_parse(e) {
		if (this._getType(e) !== I.undefined) {
			let t = this._getOrReturnCtx(e);
			return R(t, {
				code: L.invalid_type,
				expected: I.undefined,
				received: t.parsedType
			}), z;
		}
		return pu(e.data);
	}
};
Zu.create = (e) => new Zu({
	typeName: U.ZodUndefined,
	...V(e)
});
var Qu = class extends H {
	_parse(e) {
		if (this._getType(e) !== I.null) {
			let t = this._getOrReturnCtx(e);
			return R(t, {
				code: L.invalid_type,
				expected: I.null,
				received: t.parsedType
			}), z;
		}
		return pu(e.data);
	}
};
Qu.create = (e) => new Qu({
	typeName: U.ZodNull,
	...V(e)
});
var $u = class extends H {
	constructor() {
		super(...arguments), this._any = !0;
	}
	_parse(e) {
		return pu(e.data);
	}
};
$u.create = (e) => new $u({
	typeName: U.ZodAny,
	...V(e)
});
var ed = class extends H {
	constructor() {
		super(...arguments), this._unknown = !0;
	}
	_parse(e) {
		return pu(e.data);
	}
};
ed.create = (e) => new ed({
	typeName: U.ZodUnknown,
	...V(e)
});
var td = class extends H {
	_parse(e) {
		let t = this._getOrReturnCtx(e);
		return R(t, {
			code: L.invalid_type,
			expected: I.never,
			received: t.parsedType
		}), z;
	}
};
td.create = (e) => new td({
	typeName: U.ZodNever,
	...V(e)
});
var nd = class extends H {
	_parse(e) {
		if (this._getType(e) !== I.undefined) {
			let t = this._getOrReturnCtx(e);
			return R(t, {
				code: L.invalid_type,
				expected: I.void,
				received: t.parsedType
			}), z;
		}
		return pu(e.data);
	}
};
nd.create = (e) => new nd({
	typeName: U.ZodVoid,
	...V(e)
});
var rd = class e extends H {
	_parse(e) {
		let { ctx: t, status: n } = this._processInputParams(e), r = this._def;
		if (t.parsedType !== I.array) return R(t, {
			code: L.invalid_type,
			expected: I.array,
			received: t.parsedType
		}), z;
		if (r.exactLength !== null) {
			let e = t.data.length > r.exactLength.value, i = t.data.length < r.exactLength.value;
			(e || i) && (R(t, {
				code: e ? L.too_big : L.too_small,
				minimum: i ? r.exactLength.value : void 0,
				maximum: e ? r.exactLength.value : void 0,
				type: "array",
				inclusive: !0,
				exact: !0,
				message: r.exactLength.message
			}), n.dirty());
		}
		if (r.minLength !== null && t.data.length < r.minLength.value && (R(t, {
			code: L.too_small,
			minimum: r.minLength.value,
			type: "array",
			inclusive: !0,
			exact: !1,
			message: r.minLength.message
		}), n.dirty()), r.maxLength !== null && t.data.length > r.maxLength.value && (R(t, {
			code: L.too_big,
			maximum: r.maxLength.value,
			type: "array",
			inclusive: !0,
			exact: !1,
			message: r.maxLength.message
		}), n.dirty()), t.common.async) return Promise.all([...t.data].map((e, n) => r.type._parseAsync(new vu(t, e, t.path, n)))).then((e) => du.mergeArray(n, e));
		let i = [...t.data].map((e, n) => r.type._parseSync(new vu(t, e, t.path, n)));
		return du.mergeArray(n, i);
	}
	get element() {
		return this._def.type;
	}
	min(t, n) {
		return new e({
			...this._def,
			minLength: {
				value: t,
				message: B.toString(n)
			}
		});
	}
	max(t, n) {
		return new e({
			...this._def,
			maxLength: {
				value: t,
				message: B.toString(n)
			}
		});
	}
	length(t, n) {
		return new e({
			...this._def,
			exactLength: {
				value: t,
				message: B.toString(n)
			}
		});
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
rd.create = (e, t) => new rd({
	type: e,
	minLength: null,
	maxLength: null,
	exactLength: null,
	typeName: U.ZodArray,
	...V(t)
});
function id(e) {
	if (e instanceof ad) {
		let t = {};
		for (let n in e.shape) {
			let r = e.shape[n];
			t[n] = Cd.create(id(r));
		}
		return new ad({
			...e._def,
			shape: () => t
		});
	}
	return e instanceof rd ? new rd({
		...e._def,
		type: id(e.element)
	}) : e instanceof Cd ? Cd.create(id(e.unwrap())) : e instanceof wd ? wd.create(id(e.unwrap())) : e instanceof dd ? dd.create(e.items.map((e) => id(e))) : e;
}
var ad = class e extends H {
	constructor() {
		super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		let e = this._def.shape(), t = ru.objectKeys(e);
		return this._cached = {
			shape: e,
			keys: t
		}, this._cached;
	}
	_parse(e) {
		if (this._getType(e) !== I.object) {
			let t = this._getOrReturnCtx(e);
			return R(t, {
				code: L.invalid_type,
				expected: I.object,
				received: t.parsedType
			}), z;
		}
		let { status: t, ctx: n } = this._processInputParams(e), { shape: r, keys: i } = this._getCached(), a = [];
		if (!(this._def.catchall instanceof td && this._def.unknownKeys === "strip")) for (let e in n.data) i.includes(e) || a.push(e);
		let o = [];
		for (let e of i) {
			let t = r[e], i = n.data[e];
			o.push({
				key: {
					status: "valid",
					value: e
				},
				value: t._parse(new vu(n, i, n.path, e)),
				alwaysSet: e in n.data
			});
		}
		if (this._def.catchall instanceof td) {
			let e = this._def.unknownKeys;
			if (e === "passthrough") for (let e of a) o.push({
				key: {
					status: "valid",
					value: e
				},
				value: {
					status: "valid",
					value: n.data[e]
				}
			});
			else if (e === "strict") a.length > 0 && (R(n, {
				code: L.unrecognized_keys,
				keys: a
			}), t.dirty());
			else if (e !== "strip") throw Error("Internal ZodObject error: invalid unknownKeys value.");
		} else {
			let e = this._def.catchall;
			for (let t of a) {
				let r = n.data[t];
				o.push({
					key: {
						status: "valid",
						value: t
					},
					value: e._parse(new vu(n, r, n.path, t)),
					alwaysSet: t in n.data
				});
			}
		}
		return n.common.async ? Promise.resolve().then(async () => {
			let e = [];
			for (let t of o) {
				let n = await t.key, r = await t.value;
				e.push({
					key: n,
					value: r,
					alwaysSet: t.alwaysSet
				});
			}
			return e;
		}).then((e) => du.mergeObjectSync(t, e)) : du.mergeObjectSync(t, o);
	}
	get shape() {
		return this._def.shape();
	}
	strict(t) {
		return B.errToObj, new e({
			...this._def,
			unknownKeys: "strict",
			...t === void 0 ? {} : { errorMap: (e, n) => {
				let r = this._def.errorMap?.(e, n).message ?? n.defaultError;
				return e.code === "unrecognized_keys" ? { message: B.errToObj(t).message ?? r } : { message: r };
			} }
		});
	}
	strip() {
		return new e({
			...this._def,
			unknownKeys: "strip"
		});
	}
	passthrough() {
		return new e({
			...this._def,
			unknownKeys: "passthrough"
		});
	}
	extend(t) {
		return new e({
			...this._def,
			shape: () => ({
				...this._def.shape(),
				...t
			})
		});
	}
	merge(t) {
		return new e({
			unknownKeys: t._def.unknownKeys,
			catchall: t._def.catchall,
			shape: () => ({
				...this._def.shape(),
				...t._def.shape()
			}),
			typeName: U.ZodObject
		});
	}
	setKey(e, t) {
		return this.augment({ [e]: t });
	}
	catchall(t) {
		return new e({
			...this._def,
			catchall: t
		});
	}
	pick(t) {
		let n = {};
		for (let e of ru.objectKeys(t)) t[e] && this.shape[e] && (n[e] = this.shape[e]);
		return new e({
			...this._def,
			shape: () => n
		});
	}
	omit(t) {
		let n = {};
		for (let e of ru.objectKeys(this.shape)) t[e] || (n[e] = this.shape[e]);
		return new e({
			...this._def,
			shape: () => n
		});
	}
	deepPartial() {
		return id(this);
	}
	partial(t) {
		let n = {};
		for (let e of ru.objectKeys(this.shape)) {
			let r = this.shape[e];
			n[e] = t && !t[e] ? r : r.optional();
		}
		return new e({
			...this._def,
			shape: () => n
		});
	}
	required(t) {
		let n = {};
		for (let e of ru.objectKeys(this.shape)) if (t && !t[e]) n[e] = this.shape[e];
		else {
			let t = this.shape[e];
			for (; t instanceof Cd;) t = t._def.innerType;
			n[e] = t;
		}
		return new e({
			...this._def,
			shape: () => n
		});
	}
	keyof() {
		return vd(ru.objectKeys(this.shape));
	}
};
ad.create = (e, t) => new ad({
	shape: () => e,
	unknownKeys: "strip",
	catchall: td.create(),
	typeName: U.ZodObject,
	...V(t)
}), ad.strictCreate = (e, t) => new ad({
	shape: () => e,
	unknownKeys: "strict",
	catchall: td.create(),
	typeName: U.ZodObject,
	...V(t)
}), ad.lazycreate = (e, t) => new ad({
	shape: e,
	unknownKeys: "strip",
	catchall: td.create(),
	typeName: U.ZodObject,
	...V(t)
});
var od = class extends H {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = this._def.options;
		function r(e) {
			for (let t of e) if (t.result.status === "valid") return t.result;
			for (let n of e) if (n.result.status === "dirty") return t.common.issues.push(...n.ctx.common.issues), n.result;
			let n = e.map((e) => new ou(e.ctx.common.issues));
			return R(t, {
				code: L.invalid_union,
				unionErrors: n
			}), z;
		}
		if (t.common.async) return Promise.all(n.map(async (e) => {
			let n = {
				...t,
				common: {
					...t.common,
					issues: []
				},
				parent: null
			};
			return {
				result: await e._parseAsync({
					data: t.data,
					path: t.path,
					parent: n
				}),
				ctx: n
			};
		})).then(r);
		{
			let e, r = [];
			for (let i of n) {
				let n = {
					...t,
					common: {
						...t.common,
						issues: []
					},
					parent: null
				}, a = i._parseSync({
					data: t.data,
					path: t.path,
					parent: n
				});
				if (a.status === "valid") return a;
				a.status === "dirty" && !e && (e = {
					result: a,
					ctx: n
				}), n.common.issues.length && r.push(n.common.issues);
			}
			if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
			let i = r.map((e) => new ou(e));
			return R(t, {
				code: L.invalid_union,
				unionErrors: i
			}), z;
		}
	}
	get options() {
		return this._def.options;
	}
};
od.create = (e, t) => new od({
	options: e,
	typeName: U.ZodUnion,
	...V(t)
});
var sd = (e) => e instanceof gd ? sd(e.schema) : e instanceof Sd ? sd(e.innerType()) : e instanceof _d ? [e.value] : e instanceof yd ? e.options : e instanceof bd ? ru.objectValues(e.enum) : e instanceof Td ? sd(e._def.innerType) : e instanceof Zu ? [void 0] : e instanceof Qu ? [null] : e instanceof Cd ? [void 0, ...sd(e.unwrap())] : e instanceof wd ? [null, ...sd(e.unwrap())] : e instanceof Od || e instanceof Ad ? sd(e.unwrap()) : e instanceof Ed ? sd(e._def.innerType) : [], cd = class e extends H {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== I.object) return R(t, {
			code: L.invalid_type,
			expected: I.object,
			received: t.parsedType
		}), z;
		let n = this.discriminator, r = t.data[n], i = this.optionsMap.get(r);
		return i ? t.common.async ? i._parseAsync({
			data: t.data,
			path: t.path,
			parent: t
		}) : i._parseSync({
			data: t.data,
			path: t.path,
			parent: t
		}) : (R(t, {
			code: L.invalid_union_discriminator,
			options: Array.from(this.optionsMap.keys()),
			path: [n]
		}), z);
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	static create(t, n, r) {
		let i = /* @__PURE__ */ new Map();
		for (let e of n) {
			let n = sd(e.shape[t]);
			if (!n.length) throw Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
			for (let r of n) {
				if (i.has(r)) throw Error(`Discriminator property ${String(t)} has duplicate value ${String(r)}`);
				i.set(r, e);
			}
		}
		return new e({
			typeName: U.ZodDiscriminatedUnion,
			discriminator: t,
			options: n,
			optionsMap: i,
			...V(r)
		});
	}
};
function ld(e, t) {
	let n = au(e), r = au(t);
	if (e === t) return {
		valid: !0,
		data: e
	};
	if (n === I.object && r === I.object) {
		let n = ru.objectKeys(t), r = ru.objectKeys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = ld(e[n], t[n]);
			if (!r.valid) return { valid: !1 };
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (n === I.array && r === I.array) {
		if (e.length !== t.length) return { valid: !1 };
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = ld(i, a);
			if (!o.valid) return { valid: !1 };
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return n === I.date && r === I.date && +e == +t ? {
		valid: !0,
		data: e
	} : { valid: !1 };
}
var ud = class extends H {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e), r = (e, r) => {
			if (mu(e) || mu(r)) return z;
			let i = ld(e.value, r.value);
			return i.valid ? ((hu(e) || hu(r)) && t.dirty(), {
				status: t.value,
				value: i.data
			}) : (R(n, { code: L.invalid_intersection_types }), z);
		};
		return n.common.async ? Promise.all([this._def.left._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		}), this._def.right._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		})]).then(([e, t]) => r(e, t)) : r(this._def.left._parseSync({
			data: n.data,
			path: n.path,
			parent: n
		}), this._def.right._parseSync({
			data: n.data,
			path: n.path,
			parent: n
		}));
	}
};
ud.create = (e, t, n) => new ud({
	left: e,
	right: t,
	typeName: U.ZodIntersection,
	...V(n)
});
var dd = class e extends H {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== I.array) return R(n, {
			code: L.invalid_type,
			expected: I.array,
			received: n.parsedType
		}), z;
		if (n.data.length < this._def.items.length) return R(n, {
			code: L.too_small,
			minimum: this._def.items.length,
			inclusive: !0,
			exact: !1,
			type: "array"
		}), z;
		!this._def.rest && n.data.length > this._def.items.length && (R(n, {
			code: L.too_big,
			maximum: this._def.items.length,
			inclusive: !0,
			exact: !1,
			type: "array"
		}), t.dirty());
		let r = [...n.data].map((e, t) => {
			let r = this._def.items[t] || this._def.rest;
			return r ? r._parse(new vu(n, e, n.path, t)) : null;
		}).filter((e) => !!e);
		return n.common.async ? Promise.all(r).then((e) => du.mergeArray(t, e)) : du.mergeArray(t, r);
	}
	get items() {
		return this._def.items;
	}
	rest(t) {
		return new e({
			...this._def,
			rest: t
		});
	}
};
dd.create = (e, t) => {
	if (!Array.isArray(e)) throw Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new dd({
		items: e,
		typeName: U.ZodTuple,
		rest: null,
		...V(t)
	});
};
var fd = class e extends H {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== I.object) return R(n, {
			code: L.invalid_type,
			expected: I.object,
			received: n.parsedType
		}), z;
		let r = [], i = this._def.keyType, a = this._def.valueType;
		for (let e in n.data) r.push({
			key: i._parse(new vu(n, e, n.path, e)),
			value: a._parse(new vu(n, n.data[e], n.path, e)),
			alwaysSet: e in n.data
		});
		return n.common.async ? du.mergeObjectAsync(t, r) : du.mergeObjectSync(t, r);
	}
	get element() {
		return this._def.valueType;
	}
	static create(t, n, r) {
		return n instanceof H ? new e({
			keyType: t,
			valueType: n,
			typeName: U.ZodRecord,
			...V(r)
		}) : new e({
			keyType: Wu.create(),
			valueType: t,
			typeName: U.ZodRecord,
			...V(n)
		});
	}
}, pd = class extends H {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== I.map) return R(n, {
			code: L.invalid_type,
			expected: I.map,
			received: n.parsedType
		}), z;
		let r = this._def.keyType, i = this._def.valueType, a = [...n.data.entries()].map(([e, t], a) => ({
			key: r._parse(new vu(n, e, n.path, [a, "key"])),
			value: i._parse(new vu(n, t, n.path, [a, "value"]))
		}));
		if (n.common.async) {
			let e = /* @__PURE__ */ new Map();
			return Promise.resolve().then(async () => {
				for (let n of a) {
					let r = await n.key, i = await n.value;
					if (r.status === "aborted" || i.status === "aborted") return z;
					(r.status === "dirty" || i.status === "dirty") && t.dirty(), e.set(r.value, i.value);
				}
				return {
					status: t.value,
					value: e
				};
			});
		}
		{
			let e = /* @__PURE__ */ new Map();
			for (let n of a) {
				let r = n.key, i = n.value;
				if (r.status === "aborted" || i.status === "aborted") return z;
				(r.status === "dirty" || i.status === "dirty") && t.dirty(), e.set(r.value, i.value);
			}
			return {
				status: t.value,
				value: e
			};
		}
	}
};
pd.create = (e, t, n) => new pd({
	valueType: t,
	keyType: e,
	typeName: U.ZodMap,
	...V(n)
});
var md = class e extends H {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== I.set) return R(n, {
			code: L.invalid_type,
			expected: I.set,
			received: n.parsedType
		}), z;
		let r = this._def;
		r.minSize !== null && n.data.size < r.minSize.value && (R(n, {
			code: L.too_small,
			minimum: r.minSize.value,
			type: "set",
			inclusive: !0,
			exact: !1,
			message: r.minSize.message
		}), t.dirty()), r.maxSize !== null && n.data.size > r.maxSize.value && (R(n, {
			code: L.too_big,
			maximum: r.maxSize.value,
			type: "set",
			inclusive: !0,
			exact: !1,
			message: r.maxSize.message
		}), t.dirty());
		let i = this._def.valueType;
		function a(e) {
			let n = /* @__PURE__ */ new Set();
			for (let r of e) {
				if (r.status === "aborted") return z;
				r.status === "dirty" && t.dirty(), n.add(r.value);
			}
			return {
				status: t.value,
				value: n
			};
		}
		let o = [...n.data.values()].map((e, t) => i._parse(new vu(n, e, n.path, t)));
		return n.common.async ? Promise.all(o).then((e) => a(e)) : a(o);
	}
	min(t, n) {
		return new e({
			...this._def,
			minSize: {
				value: t,
				message: B.toString(n)
			}
		});
	}
	max(t, n) {
		return new e({
			...this._def,
			maxSize: {
				value: t,
				message: B.toString(n)
			}
		});
	}
	size(e, t) {
		return this.min(e, t).max(e, t);
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
md.create = (e, t) => new md({
	valueType: e,
	minSize: null,
	maxSize: null,
	typeName: U.ZodSet,
	...V(t)
});
var hd = class e extends H {
	constructor() {
		super(...arguments), this.validate = this.implement;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== I.function) return R(t, {
			code: L.invalid_type,
			expected: I.function,
			received: t.parsedType
		}), z;
		function n(e, n) {
			return uu({
				data: e,
				path: t.path,
				errorMaps: [
					t.common.contextualErrorMap,
					t.schemaErrorMap,
					lu(),
					su
				].filter((e) => !!e),
				issueData: {
					code: L.invalid_arguments,
					argumentsError: n
				}
			});
		}
		function r(e, n) {
			return uu({
				data: e,
				path: t.path,
				errorMaps: [
					t.common.contextualErrorMap,
					t.schemaErrorMap,
					lu(),
					su
				].filter((e) => !!e),
				issueData: {
					code: L.invalid_return_type,
					returnTypeError: n
				}
			});
		}
		let i = { errorMap: t.common.contextualErrorMap }, a = t.data;
		if (this._def.returns instanceof xd) {
			let e = this;
			return pu(async function(...t) {
				let o = new ou([]), s = await e._def.args.parseAsync(t, i).catch((e) => {
					throw o.addIssue(n(t, e)), o;
				}), c = await Reflect.apply(a, this, s);
				return await e._def.returns._def.type.parseAsync(c, i).catch((e) => {
					throw o.addIssue(r(c, e)), o;
				});
			});
		}
		{
			let e = this;
			return pu(function(...t) {
				let o = e._def.args.safeParse(t, i);
				if (!o.success) throw new ou([n(t, o.error)]);
				let s = Reflect.apply(a, this, o.data), c = e._def.returns.safeParse(s, i);
				if (!c.success) throw new ou([r(s, c.error)]);
				return c.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...t) {
		return new e({
			...this._def,
			args: dd.create(t).rest(ed.create())
		});
	}
	returns(t) {
		return new e({
			...this._def,
			returns: t
		});
	}
	implement(e) {
		return this.parse(e);
	}
	strictImplement(e) {
		return this.parse(e);
	}
	static create(t, n, r) {
		return new e({
			args: t || dd.create([]).rest(ed.create()),
			returns: n || ed.create(),
			typeName: U.ZodFunction,
			...V(r)
		});
	}
}, gd = class extends H {
	get schema() {
		return this._def.getter();
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return this._def.getter()._parse({
			data: t.data,
			path: t.path,
			parent: t
		});
	}
};
gd.create = (e, t) => new gd({
	getter: e,
	typeName: U.ZodLazy,
	...V(t)
});
var _d = class extends H {
	_parse(e) {
		if (e.data !== this._def.value) {
			let t = this._getOrReturnCtx(e);
			return R(t, {
				received: t.data,
				code: L.invalid_literal,
				expected: this._def.value
			}), z;
		}
		return {
			status: "valid",
			value: e.data
		};
	}
	get value() {
		return this._def.value;
	}
};
_d.create = (e, t) => new _d({
	value: e,
	typeName: U.ZodLiteral,
	...V(t)
});
function vd(e, t) {
	return new yd({
		values: e,
		typeName: U.ZodEnum,
		...V(t)
	});
}
var yd = class e extends H {
	_parse(e) {
		if (typeof e.data != "string") {
			let t = this._getOrReturnCtx(e), n = this._def.values;
			return R(t, {
				expected: ru.joinValues(n),
				received: t.parsedType,
				code: L.invalid_type
			}), z;
		}
		if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
			let t = this._getOrReturnCtx(e), n = this._def.values;
			return R(t, {
				received: t.data,
				code: L.invalid_enum_value,
				options: n
			}), z;
		}
		return pu(e.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Values() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	extract(t, n = this._def) {
		return e.create(t, {
			...this._def,
			...n
		});
	}
	exclude(t, n = this._def) {
		return e.create(this.options.filter((e) => !t.includes(e)), {
			...this._def,
			...n
		});
	}
};
yd.create = vd;
var bd = class extends H {
	_parse(e) {
		let t = ru.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
		if (n.parsedType !== I.string && n.parsedType !== I.number) {
			let e = ru.objectValues(t);
			return R(n, {
				expected: ru.joinValues(e),
				received: n.parsedType,
				code: L.invalid_type
			}), z;
		}
		if (this._cache || (this._cache = new Set(ru.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
			let e = ru.objectValues(t);
			return R(n, {
				received: n.data,
				code: L.invalid_enum_value,
				options: e
			}), z;
		}
		return pu(e.data);
	}
	get enum() {
		return this._def.values;
	}
};
bd.create = (e, t) => new bd({
	values: e,
	typeName: U.ZodNativeEnum,
	...V(t)
});
var xd = class extends H {
	unwrap() {
		return this._def.type;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return t.parsedType !== I.promise && t.common.async === !1 ? (R(t, {
			code: L.invalid_type,
			expected: I.promise,
			received: t.parsedType
		}), z) : pu((t.parsedType === I.promise ? t.data : Promise.resolve(t.data)).then((e) => this._def.type.parseAsync(e, {
			path: t.path,
			errorMap: t.common.contextualErrorMap
		})));
	}
};
xd.create = (e, t) => new xd({
	type: e,
	typeName: U.ZodPromise,
	...V(t)
});
var Sd = class extends H {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === U.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e), r = this._def.effect || null, i = {
			addIssue: (e) => {
				R(n, e), e.fatal ? t.abort() : t.dirty();
			},
			get path() {
				return n.path;
			}
		};
		if (i.addIssue = i.addIssue.bind(i), r.type === "preprocess") {
			let e = r.transform(n.data, i);
			if (n.common.async) return Promise.resolve(e).then(async (e) => {
				if (t.value === "aborted") return z;
				let r = await this._def.schema._parseAsync({
					data: e,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? z : r.status === "dirty" || t.value === "dirty" ? fu(r.value) : r;
			});
			{
				if (t.value === "aborted") return z;
				let r = this._def.schema._parseSync({
					data: e,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? z : r.status === "dirty" || t.value === "dirty" ? fu(r.value) : r;
			}
		}
		if (r.type === "refinement") {
			let e = (e) => {
				let t = r.refinement(e, i);
				if (n.common.async) return Promise.resolve(t);
				if (t instanceof Promise) throw Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
				return e;
			};
			if (n.common.async === !1) {
				let r = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? z : (r.status === "dirty" && t.dirty(), e(r.value), {
					status: t.value,
					value: r.value
				});
			}
			return this._def.schema._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			}).then((n) => n.status === "aborted" ? z : (n.status === "dirty" && t.dirty(), e(n.value).then(() => ({
				status: t.value,
				value: n.value
			}))));
		}
		if (r.type === "transform") {
			if (n.common.async === !1) {
				let e = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n
				});
				if (!gu(e)) return z;
				let a = r.transform(e.value, i);
				if (a instanceof Promise) throw Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
				return {
					status: t.value,
					value: a
				};
			}
			return this._def.schema._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			}).then((e) => gu(e) ? Promise.resolve(r.transform(e.value, i)).then((e) => ({
				status: t.value,
				value: e
			})) : z);
		}
		ru.assertNever(r);
	}
};
Sd.create = (e, t, n) => new Sd({
	schema: e,
	typeName: U.ZodEffects,
	effect: t,
	...V(n)
}), Sd.createWithPreprocess = (e, t, n) => new Sd({
	schema: t,
	effect: {
		type: "preprocess",
		transform: e
	},
	typeName: U.ZodEffects,
	...V(n)
});
var Cd = class extends H {
	_parse(e) {
		return this._getType(e) === I.undefined ? pu(void 0) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
Cd.create = (e, t) => new Cd({
	innerType: e,
	typeName: U.ZodOptional,
	...V(t)
});
var wd = class extends H {
	_parse(e) {
		return this._getType(e) === I.null ? pu(null) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
wd.create = (e, t) => new wd({
	innerType: e,
	typeName: U.ZodNullable,
	...V(t)
});
var Td = class extends H {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = t.data;
		return t.parsedType === I.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
			data: n,
			path: t.path,
			parent: t
		});
	}
	removeDefault() {
		return this._def.innerType;
	}
};
Td.create = (e, t) => new Td({
	innerType: e,
	typeName: U.ZodDefault,
	defaultValue: typeof t.default == "function" ? t.default : () => t.default,
	...V(t)
});
var Ed = class extends H {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = {
			...t,
			common: {
				...t.common,
				issues: []
			}
		}, r = this._def.innerType._parse({
			data: n.data,
			path: n.path,
			parent: { ...n }
		});
		return _u(r) ? r.then((e) => ({
			status: "valid",
			value: e.status === "valid" ? e.value : this._def.catchValue({
				get error() {
					return new ou(n.common.issues);
				},
				input: n.data
			})
		})) : {
			status: "valid",
			value: r.status === "valid" ? r.value : this._def.catchValue({
				get error() {
					return new ou(n.common.issues);
				},
				input: n.data
			})
		};
	}
	removeCatch() {
		return this._def.innerType;
	}
};
Ed.create = (e, t) => new Ed({
	innerType: e,
	typeName: U.ZodCatch,
	catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
	...V(t)
});
var Dd = class extends H {
	_parse(e) {
		if (this._getType(e) !== I.nan) {
			let t = this._getOrReturnCtx(e);
			return R(t, {
				code: L.invalid_type,
				expected: I.nan,
				received: t.parsedType
			}), z;
		}
		return {
			status: "valid",
			value: e.data
		};
	}
};
Dd.create = (e) => new Dd({
	typeName: U.ZodNaN,
	...V(e)
});
var Od = class extends H {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = t.data;
		return this._def.type._parse({
			data: n,
			path: t.path,
			parent: t
		});
	}
	unwrap() {
		return this._def.type;
	}
}, kd = class e extends H {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.common.async) return (async () => {
			let e = await this._def.in._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			});
			return e.status === "aborted" ? z : e.status === "dirty" ? (t.dirty(), fu(e.value)) : this._def.out._parseAsync({
				data: e.value,
				path: n.path,
				parent: n
			});
		})();
		{
			let e = this._def.in._parseSync({
				data: n.data,
				path: n.path,
				parent: n
			});
			return e.status === "aborted" ? z : e.status === "dirty" ? (t.dirty(), {
				status: "dirty",
				value: e.value
			}) : this._def.out._parseSync({
				data: e.value,
				path: n.path,
				parent: n
			});
		}
	}
	static create(t, n) {
		return new e({
			in: t,
			out: n,
			typeName: U.ZodPipeline
		});
	}
}, Ad = class extends H {
	_parse(e) {
		let t = this._def.innerType._parse(e), n = (e) => (gu(e) && (e.value = Object.freeze(e.value)), e);
		return _u(t) ? t.then((e) => n(e)) : n(t);
	}
	unwrap() {
		return this._def.innerType;
	}
};
Ad.create = (e, t) => new Ad({
	innerType: e,
	typeName: U.ZodReadonly,
	...V(t)
}), ad.lazycreate;
var U;
(function(e) {
	e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
})(U || (U = {}));
var jd = Wu.create;
Ku.create, Dd.create, qu.create;
var Md = Ju.create;
Yu.create, Xu.create, Zu.create, Qu.create;
var Nd = $u.create;
ed.create, td.create, nd.create, rd.create;
var Pd = ad.create;
ad.strictCreate, od.create;
var Fd = cd.create;
ud.create, dd.create, fd.create, pd.create, md.create, hd.create, gd.create;
var Id = _d.create, Ld = yd.create;
bd.create, xd.create, Sd.create, Cd.create, wd.create, Sd.createWithPreprocess, kd.create;
//#endregion
//#region node_modules/compare-versions/lib/esm/utils.js
var Rd = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i, zd = (e) => {
	if (typeof e != "string") throw TypeError("Invalid argument expected string");
	let t = e.match(Rd);
	if (!t) throw Error(`Invalid argument not valid semver ('${e}' received)`);
	return t.shift(), t;
}, Bd = (e) => e === "*" || e === "x" || e === "X", Vd = (e) => {
	let t = parseInt(e, 10);
	return isNaN(t) ? e : t;
}, Hd = (e, t) => typeof e == typeof t ? [e, t] : [String(e), String(t)], Ud = (e, t) => {
	if (Bd(e) || Bd(t)) return 0;
	let [n, r] = Hd(Vd(e), Vd(t));
	return n > r ? 1 : n < r ? -1 : 0;
}, Wd = (e, t) => {
	for (let n = 0; n < Math.max(e.length, t.length); n++) {
		let r = Ud(e[n] || "0", t[n] || "0");
		if (r !== 0) return r;
	}
	return 0;
}, Gd = (e, t) => {
	let n = zd(e), r = zd(t), i = n.pop(), a = r.pop(), o = Wd(n, r);
	return o === 0 ? i && a ? Wd(i.split("."), a.split(".")) : i || a ? i ? -1 : 1 : 0 : o;
}, W = (e) => {
	if (typeof structuredClone == "function") return structuredClone(e);
	try {
		return JSON.parse(JSON.stringify(e));
	} catch {
		return Array.isArray(e) ? [...e] : { ...e };
	}
};
function Kd() {
	return l();
}
function qd(e) {
	if (Object.freeze(e), typeof e == "object" && e) for (let t of Object.values(e)) typeof t == "object" && t && !Object.isFrozen(t) && qd(t);
	return e;
}
var Jd = 524288;
function Yd(e, t, n) {
	let r = 0, i = [e, t], a = /* @__PURE__ */ new WeakSet();
	for (; i.length > 0;) {
		let e = i.pop();
		if (typeof e == "string") {
			if (r += e.length, r > n) return !0;
		} else if (typeof e == "object" && e) {
			if (a.has(e)) continue;
			if (a.add(e), Array.isArray(e)) for (let t = 0; t < e.length; t++) i.push(e[t]);
			else {
				let t = Object.keys(e);
				for (let a = 0; a < t.length; a++) {
					let o = t[a];
					if (r += o.length, r > n) return !0;
					i.push(e[o]);
				}
			}
		}
	}
	return !1;
}
async function Xd(e, t, n, r) {
	let i = typeof process < "u" && process.env !== void 0, a = i && !!process.env.VITEST_WORKER_ID, o = i && !!process.env.VITEST_WORKER_ID, s = o && !Yd(t, n, Jd), c = s ? W(t) : t, l = s ? W(n) : n, u = !1, d = !1, f;
	for (let t of e) try {
		s && (qd(c), qd(l));
		let e = await r(t, c, l);
		if (e === void 0) continue;
		let n = !1;
		if (e.messages !== void 0 && e.messages !== c && (c = W(e.messages), u = !0, n = !0), e.state !== void 0 && e.state !== l && (l = W(e.state), d = !0, n = !0), s && n && Yd(c, l, Jd) && (s = !1), f = e.stopPropagation, f === !0) break;
	} catch (e) {
		if (o && e instanceof TypeError) {
			if (a) throw e;
			console.error("AG-UI: Subscriber attempted to mutate frozen inputs in-place. Return mutations via AgentStateMutation instead of mutating directly.", e);
		} else a || console.error("Subscriber error:", e);
		continue;
	}
	return {
		...u ? { messages: Object.isFrozen(c) ? W(c) : c } : {},
		...d ? { state: Object.isFrozen(l) ? W(l) : l } : {},
		...f === void 0 ? {} : { stopPropagation: f }
	};
}
function Zd(e) {
	if (!e) return {
		enabled: !1,
		events: !1,
		lifecycle: !1,
		verbose: !1
	};
	if (e === !0) return {
		enabled: !0,
		events: !0,
		lifecycle: !0,
		verbose: !0
	};
	let t = e.events ?? !0, n = e.lifecycle ?? !0, r = e.verbose ?? !1;
	return {
		enabled: t || n,
		events: t,
		lifecycle: n,
		verbose: r
	};
}
function Qd(e) {
	if (e instanceof $d) return e;
	if (e === !0) return new $d(Zd(!0));
}
var $d = class {
	constructor(e) {
		this.config = e;
	}
	event(e, t, n, r) {
		this.config.events && (this.config.verbose ? console.debug(`[${e}] ${t}`, typeof n == "string" ? n : JSON.stringify(n)) : console.debug(`[${e}] ${t}`, r ?? n));
	}
	lifecycle(e, t, n) {
		this.config.lifecycle && (n ? console.debug(`[${e}] ${t}`, n) : console.debug(`[${e}] ${t}`));
	}
	get eventsEnabled() {
		return this.config.events;
	}
	get lifecycleEnabled() {
		return this.config.lifecycle;
	}
	get enabled() {
		return this.config.enabled;
	}
};
function ef(e) {
	return e.enabled ? new $d(e) : void 0;
}
function tf(e, t, n) {
	if (t) {
		let r = e.find((e) => e.id === t);
		if (r?.role === "assistant") return r;
		r && console.warn(`TOOL_CALL_START: parentMessageId '${t}' matches a '${r.role}' message, not assistant — falling back to toolCallId`);
		let i = {
			id: r ? n : t,
			role: "assistant",
			toolCalls: []
		};
		return e.push(i), i;
	}
	let r = {
		id: n,
		role: "assistant",
		toolCalls: []
	};
	return e.push(r), r;
}
function nf(e, t) {
	return !e || t.metadata === void 0 ? !1 : (e.metadata = In(e.metadata, W(t.metadata)), !0);
}
var rf = (e, t, n, r, i) => {
	let a = Qd(i), o = W(n.messages), s = W(e.state), c = {}, l = (e) => {
		e.messages !== void 0 && (o = e.messages, c.messages = e.messages), e.state !== void 0 && (s = e.state, c.state = e.state);
	}, u = () => {
		let e = W(c);
		return c = {}, e.messages !== void 0 || e.state !== void 0 ? k(e) : oo;
	};
	return t.pipe(Cs(async (t) => {
		let i = await Xd(r, o, s, (r, i, a) => r.onEvent?.({
			event: t,
			agent: n,
			input: e,
			messages: i,
			state: a
		}));
		if (l(i), i.stopPropagation === !0 ? a?.event("APPLY", "Event dropped:", t, {
			type: t.type,
			reason: "stopPropagation by subscriber"
		}) : a?.event("APPLY", "Event applied:", t, {
			type: t.type,
			subscribers: r.length
		}), i.stopPropagation === !0) return u();
		switch (t.type) {
			case O.TEXT_MESSAGE_START: {
				let i = await Xd(r, o, s, (r, i, a) => r.onTextMessageStartEvent?.({
					event: t,
					messages: i,
					state: a,
					agent: n,
					input: e
				}));
				if (l(i), i.stopPropagation !== !0) {
					let { messageId: e, role: n = "assistant", name: r, subagentRunId: i } = t, a = o.find((t) => t.id === e);
					if (a?.role === "activity") return console.warn(`TEXT_MESSAGE_START: Message '${e}' is an activity message — message ids must be unique across activity and text messages`), u();
					let s = a;
					if (!s) {
						let t = {
							id: e,
							role: n,
							content: "",
							...r !== void 0 && { name: r },
							...i != null && { subagentRunId: i }
						};
						o.push(t), s = t;
					}
					let c = nf(s, t);
					(!a || c) && l({ messages: o });
				}
				return u();
			}
			case O.TEXT_MESSAGE_CONTENT: {
				let { messageId: i, delta: a } = t, c = o.find((e) => e.id === i);
				if (!c) return console.warn(`TEXT_MESSAGE_CONTENT: No message found with ID '${i}'`), u();
				if (c.role === "activity") return console.warn(`TEXT_MESSAGE_CONTENT: Message '${i}' is an activity message — message ids must be unique across activity and text messages`), u();
				let d = await Xd(r, o, s, (r, i, a) => r.onTextMessageContentEvent?.({
					event: t,
					messages: i,
					state: a,
					agent: n,
					input: e,
					textMessageBuffer: typeof c.content == "string" ? c.content : ""
				}));
				return l(d), d.stopPropagation !== !0 && (c.content = `${typeof c.content == "string" ? c.content : ""}${a}`, nf(c, t), l({ messages: o })), u();
			}
			case O.TEXT_MESSAGE_END: {
				let { messageId: i } = t, a = o.find((e) => e.id === i);
				if (!a) return console.warn(`TEXT_MESSAGE_END: No message found with ID '${i}'`), u();
				if (a.role === "activity") return console.warn(`TEXT_MESSAGE_END: Message '${i}' is an activity message — message ids must be unique across activity and text messages`), u();
				let c = await Xd(r, o, s, (r, i, o) => r.onTextMessageEndEvent?.({
					event: t,
					messages: i,
					state: o,
					agent: n,
					input: e,
					textMessageBuffer: typeof a.content == "string" ? a.content : ""
				}));
				return l(c), c.stopPropagation !== !0 && nf(a, t) && l({ messages: o }), await Promise.all(r.map((t) => {
					t.onNewMessage?.({
						message: a,
						messages: o,
						state: s,
						agent: n,
						input: e
					});
				})), u();
			}
			case O.TOOL_CALL_START: {
				let i = await Xd(r, o, s, (r, i, a) => r.onToolCallStartEvent?.({
					event: t,
					messages: i,
					state: a,
					agent: n,
					input: e
				}));
				if (l(i), i.stopPropagation !== !0) {
					let { toolCallId: e, toolCallName: n, parentMessageId: r, subagentRunId: i } = t, a = o.find((t) => t.toolCalls?.some((t) => t.id === e))?.toolCalls?.find((t) => t.id === e);
					if (a) {
						let r = a.function.name !== n;
						return r && (console.warn(`TOOL_CALL_START: tool call '${e}' already exists with name '${a.function.name}' — updating it to '${n}'`), a.function.name = n), (nf(a, t) || r) && l({ messages: o }), u();
					}
					let s = new Set(o.map((e) => e.id)), c = tf(o, r, e);
					!s.has(c.id) && i != null && c.subagentRunId === void 0 && (c.subagentRunId = i), c.toolCalls ?? (c.toolCalls = []);
					let d = {
						id: e,
						type: "function",
						function: {
							name: n,
							arguments: ""
						}
					};
					c.toolCalls.push(d), nf(d, t), l({ messages: o });
				}
				return u();
			}
			case O.TOOL_CALL_ARGS: {
				let { toolCallId: i, delta: a } = t, c = o.find((e) => e.toolCalls?.some((e) => e.id === i));
				if (!c) return console.warn(`TOOL_CALL_ARGS: No message found containing tool call with ID '${i}'`), u();
				let d = c.toolCalls?.find((e) => e.id === i);
				if (!d) return console.warn(`TOOL_CALL_ARGS: No tool call found with ID '${i}'`), u();
				let f = await Xd(r, o, s, (r, i, a) => {
					let o = d.function.arguments, s = d.function.name, c = {};
					try {
						c = Ks(o);
					} catch {}
					return r.onToolCallArgsEvent?.({
						event: t,
						messages: i,
						state: a,
						agent: n,
						input: e,
						toolCallBuffer: o,
						toolCallName: s,
						partialToolCallArgs: c
					});
				});
				return l(f), f.stopPropagation !== !0 && (d.function.arguments += a, nf(d, t), l({ messages: o })), u();
			}
			case O.TOOL_CALL_END: {
				let { toolCallId: i } = t, a = o.find((e) => e.toolCalls?.some((e) => e.id === i));
				if (!a) return console.warn(`TOOL_CALL_END: No message found containing tool call with ID '${i}'`), u();
				let c = a.toolCalls?.find((e) => e.id === i);
				if (!c) return console.warn(`TOOL_CALL_END: No tool call found with ID '${i}'`), u();
				let d = await Xd(r, o, s, (r, i, a) => {
					let o = c.function.arguments, s = c.function.name, l = {};
					try {
						l = JSON.parse(o);
					} catch {}
					return r.onToolCallEndEvent?.({
						event: t,
						messages: i,
						state: a,
						agent: n,
						input: e,
						toolCallName: s,
						toolCallArgs: l
					});
				});
				return l(d), d.stopPropagation !== !0 && nf(c, t) && l({ messages: o }), await Promise.all(r.map((t) => {
					t.onNewToolCall?.({
						toolCall: c,
						messages: o,
						state: s,
						agent: n,
						input: e
					});
				})), u();
			}
			case O.TOOL_CALL_RESULT: {
				let i = await Xd(r, o, s, (r, i, a) => r.onToolCallResultEvent?.({
					event: t,
					messages: i,
					state: a,
					agent: n,
					input: e
				}));
				if (l(i), i.stopPropagation !== !0) {
					let { messageId: i, toolCallId: a, content: c, role: u, subagentRunId: d } = t, f = {
						id: i,
						toolCallId: a,
						role: u || "tool",
						content: c,
						...d != null && { subagentRunId: d }
					};
					nf(f, t);
					let p = o.findIndex((e) => e.role === "assistant" && e.toolCalls?.some((e) => e.id === a));
					if (p === -1) o.push(f);
					else {
						let e = p + 1;
						for (; e < o.length && o[e].role === "tool";) e++;
						o.splice(e, 0, f);
					}
					await Promise.all(r.map((t) => {
						t.onNewMessage?.({
							message: f,
							messages: o,
							state: s,
							agent: n,
							input: e
						});
					})), l({ messages: o });
				}
				return u();
			}
			case O.STATE_SNAPSHOT: {
				let i = await Xd(r, o, s, (r, i, a) => r.onStateSnapshotEvent?.({
					event: t,
					messages: i,
					state: a,
					agent: n,
					input: e
				}));
				if (l(i), i.stopPropagation !== !0) {
					let { snapshot: e } = t;
					s = e, l({ state: s });
				}
				return u();
			}
			case O.STATE_DELTA: {
				let i = await Xd(r, o, s, (r, i, a) => r.onStateDeltaEvent?.({
					event: t,
					messages: i,
					state: a,
					agent: n,
					input: e
				}));
				if (l(i), i.stopPropagation !== !0) {
					let { delta: e } = t;
					try {
						s = Ri.applyPatch(s, e, !0, !1).newDocument, l({ state: s });
					} catch (t) {
						let n = t instanceof Error ? t.message : String(t);
						console.warn(`Failed to apply state patch:\nCurrent state: ${JSON.stringify(s, null, 2)}\nPatch operations: ${JSON.stringify(e, null, 2)}\nError: ${n}`);
					}
				}
				return u();
			}
			case O.MESSAGES_SNAPSHOT: {
				let i = await Xd(r, o, s, (r, i, a) => r.onMessagesSnapshotEvent?.({
					event: t,
					messages: i,
					state: a,
					agent: n,
					input: e
				}));
				if (l(i), i.stopPropagation !== !0) {
					let { messages: e } = t, n = e.map((e) => {
						if (e.subagentRunId !== null) return e;
						let t = { ...e };
						return delete t.subagentRunId, t;
					}), r = new Map(n.map((e) => [e.id, e])), i = n.some((e) => e.role === "activity"), a = n.some((e) => e.role === "reasoning"), s = (e) => e.role === "activity" && !i || e.role === "reasoning" && !a;
					o = o.filter((e) => s(e) || r.has(e.id)).map((e) => s(e) ? e : r.get(e.id));
					let c = new Set(o.map((e) => e.id));
					for (let e of n) c.has(e.id) || o.push(e);
					l({ messages: o });
				}
				return u();
			}
			case O.ACTIVITY_SNAPSHOT: {
				let i = t, a = o.findIndex((e) => e.id === i.messageId), c = a >= 0 ? o[a] : void 0, d = c?.role === "activity" ? c : void 0, f = i.replace ?? !0, p = await Xd(r, o, s, (t, r, a) => t.onActivitySnapshotEvent?.({
					event: i,
					messages: r,
					state: a,
					agent: n,
					input: e,
					activityMessage: d,
					existingMessage: c
				}));
				if (l(p), p.stopPropagation !== !0) {
					let t = {
						id: i.messageId,
						role: "activity",
						activityType: i.activityType,
						content: W(i.content),
						...i.subagentRunId != null && { subagentRunId: i.subagentRunId }
					}, c, u;
					a === -1 ? (o.push(t), c = t, u = t) : d ? (f && (o[a] = {
						...d,
						activityType: i.activityType,
						content: W(i.content),
						subagentRunId: i.subagentRunId
					}, i.subagentRunId ?? delete o[a].subagentRunId), u = o[a]) : f && (o[a] = t, c = t, u = t), nf(u, i), l({ messages: o }), c && await Promise.all(r.map((t) => t.onNewMessage?.({
						message: c,
						messages: o,
						state: s,
						agent: n,
						input: e
					})));
				}
				return u();
			}
			case O.ACTIVITY_DELTA: {
				let i = t, a = o.findIndex((e) => e.id === i.messageId);
				if (a === -1) return u();
				let c = o[a];
				if (c.role !== "activity") return console.warn(`ACTIVITY_DELTA: Message '${i.messageId}' is not an activity message`), u();
				let d = c, f = await Xd(r, o, s, (t, r, a) => t.onActivityDeltaEvent?.({
					event: i,
					messages: r,
					state: a,
					agent: n,
					input: e,
					activityMessage: d
				}));
				if (l(f), f.stopPropagation !== !0) try {
					nf(d, i) && l({ messages: o });
					let e = W(d.content ?? {}), t = Ri.applyPatch(e, i.patch ?? [], !0, !1).newDocument;
					o[a] = {
						...d,
						content: W(t),
						activityType: i.activityType
					}, l({ messages: o });
				} catch (e) {
					let t = e instanceof Error ? e.message : String(e);
					console.warn(`Failed to apply activity patch for '${i.messageId}': ${t}`);
				}
				return u();
			}
			case O.RAW: return l(await Xd(r, o, s, (r, i, a) => r.onRawEvent?.({
				event: t,
				messages: i,
				state: a,
				agent: n,
				input: e
			}))), u();
			case O.CUSTOM: return l(await Xd(r, o, s, (r, i, a) => r.onCustomEvent?.({
				event: t,
				messages: i,
				state: a,
				agent: n,
				input: e
			}))), u();
			case O.RUN_STARTED: {
				let i = await Xd(r, o, s, (r, i, a) => r.onRunStartedEvent?.({
					event: t,
					messages: i,
					state: a,
					agent: n,
					input: e
				}));
				if (l(i), i.stopPropagation !== !0) {
					let e = t;
					if (e.input?.messages) {
						for (let t of e.input.messages) {
							let e = t;
							if (t.subagentRunId === null) {
								let n = { ...t };
								delete n.subagentRunId, e = n;
							}
							o.find((t) => t.id === e.id) || o.push(e);
						}
						l({ messages: o });
					}
				}
				return u();
			}
			case O.RUN_FINISHED: {
				let i = t, a = i.outcome?.type === "interrupt" ? {
					event: i,
					outcome: "interrupt",
					interrupts: i.outcome.interrupts
				} : {
					event: i,
					outcome: "success",
					result: i.result
				}, c = await Xd(r, o, s, (t, r, i) => t.onRunFinishedEvent?.({
					...a,
					messages: r,
					state: i,
					agent: n,
					input: e
				}));
				return l(c), c.stopPropagation !== !0 && (n.pendingInterrupts = a.outcome === "interrupt" ? a.interrupts.map((e) => {
					if (e.subagentRunId !== null) return e;
					let t = { ...e };
					return delete t.subagentRunId, t;
				}) : []), u();
			}
			case O.RUN_ERROR: return l(await Xd(r, o, s, (r, i, a) => r.onRunErrorEvent?.({
				event: t,
				messages: i,
				state: a,
				agent: n,
				input: e
			}))), u();
			case O.STEP_STARTED: return l(await Xd(r, o, s, (r, i, a) => r.onStepStartedEvent?.({
				event: t,
				messages: i,
				state: a,
				agent: n,
				input: e
			}))), u();
			case O.STEP_FINISHED: return l(await Xd(r, o, s, (r, i, a) => r.onStepFinishedEvent?.({
				event: t,
				messages: i,
				state: a,
				agent: n,
				input: e
			}))), u();
			case O.TEXT_MESSAGE_CHUNK: throw Error("TEXT_MESSAGE_CHUNK must be transformed before being applied");
			case O.TOOL_CALL_CHUNK: throw Error("TOOL_CALL_CHUNK must be transformed before being applied");
			case O.THINKING_START: return u();
			case O.THINKING_END: return u();
			case O.THINKING_TEXT_MESSAGE_START: return u();
			case O.THINKING_TEXT_MESSAGE_CONTENT: return u();
			case O.THINKING_TEXT_MESSAGE_END: return u();
			case O.REASONING_START: return l(await Xd(r, o, s, (r, i, a) => r.onReasoningStartEvent?.({
				event: t,
				messages: i,
				state: a,
				agent: n,
				input: e
			}))), u();
			case O.REASONING_MESSAGE_START: {
				let i = await Xd(r, o, s, (r, i, a) => r.onReasoningMessageStartEvent?.({
					event: t,
					messages: i,
					state: a,
					agent: n,
					input: e
				}));
				if (l(i), i.stopPropagation !== !0) {
					let { messageId: e, subagentRunId: n } = t, r = o.find((t) => t.id === e), i = r;
					if (!i) {
						let t = {
							id: e,
							role: "reasoning",
							content: "",
							...n != null && { subagentRunId: n }
						};
						o.push(t), i = t;
					}
					let a = nf(i, t);
					(!r || a) && l({ messages: o });
				}
				return u();
			}
			case O.REASONING_MESSAGE_CONTENT: {
				let { messageId: i, delta: a } = t, c = o.find((e) => e.id === i);
				if (!c) return console.warn(`REASONING_MESSAGE_CONTENT: No message found with ID '${i}'`), u();
				let d = await Xd(r, o, s, (r, i, a) => r.onReasoningMessageContentEvent?.({
					event: t,
					messages: i,
					state: a,
					agent: n,
					input: e,
					reasoningMessageBuffer: typeof c.content == "string" ? c.content : ""
				}));
				return l(d), d.stopPropagation !== !0 && (c.content = `${typeof c.content == "string" ? c.content : ""}${a}`, nf(c, t), l({ messages: o })), u();
			}
			case O.REASONING_MESSAGE_END: {
				let { messageId: i } = t, a = o.find((e) => e.id === i);
				if (!a) return console.warn(`REASONING_MESSAGE_END: No message found with ID '${i}'`), u();
				let c = await Xd(r, o, s, (r, i, o) => r.onReasoningMessageEndEvent?.({
					event: t,
					messages: i,
					state: o,
					agent: n,
					input: e,
					reasoningMessageBuffer: typeof a.content == "string" ? a.content : ""
				}));
				return l(c), c.stopPropagation !== !0 && nf(a, t) && l({ messages: o }), await Promise.all(r.map((t) => {
					t.onNewMessage?.({
						message: a,
						messages: o,
						state: s,
						agent: n,
						input: e
					});
				})), u();
			}
			case O.REASONING_MESSAGE_CHUNK: throw Error("REASONING_MESSAGE_CHUNK must be transformed before being applied");
			case O.REASONING_END: return l(await Xd(r, o, s, (r, i, a) => r.onReasoningEndEvent?.({
				event: t,
				messages: i,
				state: a,
				agent: n,
				input: e
			}))), u();
			case O.REASONING_ENCRYPTED_VALUE: {
				let { subtype: i, entityId: a, encryptedValue: d } = t, f = await Xd(r, o, s, (r, i, a) => r.onReasoningEncryptedValueEvent?.({
					event: t,
					messages: i,
					state: a,
					agent: n,
					input: e
				}));
				if (l(f), f.stopPropagation !== !0) {
					let e = !1;
					if (i === "tool-call") {
						for (let t of o) if (t.role === "assistant" && t.toolCalls) {
							let n = t.toolCalls.find((e) => e.id === a);
							if (n) {
								n.encryptedValue = d, e = !0;
								break;
							}
						}
					} else {
						let t = o.find((e) => e.id === a);
						t?.role !== "activity" && t && (t.encryptedValue = d, e = !0);
					}
					e && (c.messages = o);
				}
				return u();
			}
			case O.SUBAGENT_STARTED: return l(await Xd(r, o, s, (r, i, a) => r.onSubagentStartedEvent?.({
				event: t,
				messages: i,
				state: a,
				agent: n,
				input: e
			}))), u();
			case O.SUBAGENT_FINISHED: return l(await Xd(r, o, s, (r, i, a) => r.onSubagentFinishedEvent?.({
				event: t,
				messages: i,
				state: a,
				agent: n,
				input: e
			}))), u();
			case O.SUBAGENT_ERROR: return l(await Xd(r, o, s, (r, i, a) => r.onSubagentErrorEvent?.({
				event: t,
				messages: i,
				state: a,
				agent: n,
				input: e
			}))), u();
		}
		return t.type, u();
	}), ps(), r.length > 0 ? Es({}) : (e) => e);
}, af = (e) => (t) => {
	let n = Qd(e), r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = {
		message: /* @__PURE__ */ new Map(),
		toolCall: /* @__PURE__ */ new Map(),
		activity: /* @__PURE__ */ new Map(),
		reasoning: /* @__PURE__ */ new Map()
	}, s = !1, c = !1, l = !1, u = /* @__PURE__ */ new Map(), d = (e) => {
		let t = u.get(e);
		return t || (t = /* @__PURE__ */ new Map(), u.set(e, t)), t;
	}, f = () => {
		for (let e of u.values()) if (e.size > 0) return !0;
		return !1;
	}, p = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set(), h = !1, ee = !1, te = !1, ne = () => {
		r.clear(), i.clear(), a.clear(), o.message.clear(), o.toolCall.clear(), o.activity.clear(), o.reasoning.clear(), u.clear(), p.clear(), m.clear(), h = !1, ee = !1, s = !1, c = !1, te = !0;
	}, re = (e, t) => {
		let n = e ?? [];
		if (Array.isArray(n)) for (let e of n) {
			if (!e || typeof e.id != "string") continue;
			if (e.subagentRunId === null) return new D(`Cannot send a message (id '${e.id}') with 'subagentRunId: null'. The field is optional — omit it entirely.`);
			let n = e.role === "reasoning" ? o.reasoning : e.role === "activity" ? o.activity : o.message;
			(t || !n.has(e.id)) && n.set(e.id, { subagentRunId: e.subagentRunId });
			for (let n of e.toolCalls ?? []) n && typeof n.id == "string" && (t || !o.toolCall.has(n.id)) && o.toolCall.set(n.id, { subagentRunId: e.subagentRunId ?? void 0 });
		}
	}, ie = (e, t, n, r, i) => {
		if (t !== void 0 && n && n.subagentRunId !== t) return new D(`Cannot send '${e}': subagentRunId '${t}' does not match the ${r} '${i}' opener's subagent '${n.subagentRunId ?? "(the parent agent)"}'.`);
	};
	return t.pipe(fs((e) => {
		let t = e.type;
		if (n?.event("VERIFY", "Event:", e, { type: e.type }), c && t !== O.RUN_STARTED) return A(() => new D(`Cannot send event type '${t}': The run has already errored with 'RUN_ERROR'. No further events can be sent.`));
		if (s && t !== O.RUN_ERROR && t !== O.RUN_STARTED) return A(() => new D(`Cannot send event type '${t}': The run has already finished with 'RUN_FINISHED'. Start a new run with 'RUN_STARTED'.`));
		if (!l) {
			if (l = !0, t !== O.RUN_STARTED && t !== O.RUN_ERROR) return A(() => new D("First event must be 'RUN_STARTED'"));
		} else if (t === O.RUN_STARTED) {
			if (te && !s && !c) return A(() => new D("Cannot send 'RUN_STARTED' while a run is still active. The previous run must be finished with 'RUN_FINISHED' before starting a new run."));
			(s || c) && ne();
		}
		if (e.subagentRunId === null) return A(() => new D(`Cannot send '${t}' with 'subagentRunId: null'. The field is optional — omit it entirely.`));
		if (t === O.SUBAGENT_STARTED || t === O.SUBAGENT_FINISHED || t === O.SUBAGENT_ERROR) {
			let n = t === O.SUBAGENT_STARTED ? [
				"description",
				"parentSubagentRunId",
				"parentToolCallId",
				"parentMessageId"
			] : t === O.SUBAGENT_FINISHED ? ["outcome"] : ["code"];
			for (let r of n) if (e[r] === null) return A(() => new D(`Cannot send '${t}' with '${r}: null'. The field is optional — omit it entirely.`));
			let r = e.outcome;
			if (r != null && r.type !== "success" && r.type !== "suspended") return A(() => new D(`Cannot send '${t}' with outcome type '${String(r.type)}'. The outcome is either { type: "success" } or { type: "suspended" }.`));
			if (r && r.interruptIds === null) return A(() => new D(`Cannot send '${t}' with 'outcome.interruptIds: null'. The field is optional — omit it entirely.`));
			if (r && Array.isArray(r.interruptIds) && r.interruptIds.some((e) => typeof e != "string")) return A(() => new D(`Cannot send '${t}' with a non-string entry in 'outcome.interruptIds'. Interrupt ids are strings.`));
		}
		if (t === O.RUN_FINISHED) {
			let t = e.outcome;
			if (t?.type === "interrupt" && Array.isArray(t.interrupts)) {
				for (let e of t.interrupts) if (e && e.subagentRunId === null) return A(() => new D(`Cannot send 'RUN_FINISHED' with an interrupt (id '${e.id}') carrying 'subagentRunId: null'. The field is optional — omit it entirely.`));
			}
		}
		switch (t) {
			case O.TEXT_MESSAGE_START: {
				let n = e.messageId;
				if (r.has(n)) return A(() => new D(`Cannot send 'TEXT_MESSAGE_START' event: A text message with ID '${n}' is already in progress. Complete it with 'TEXT_MESSAGE_END' first.`));
				let i = o.message.get(n);
				if (i) {
					let r = ie(t, e.subagentRunId, i, "message", n);
					if (r) return A(() => r);
				}
				return r.add(n), i || o.message.set(n, { subagentRunId: e.subagentRunId }), k(e);
			}
			case O.TEXT_MESSAGE_CONTENT: {
				let n = e.messageId;
				if (!r.has(n)) return A(() => new D(`Cannot send 'TEXT_MESSAGE_CONTENT' event: No active text message found with ID '${n}'. Start a text message with 'TEXT_MESSAGE_START' first.`));
				let i = ie(t, e.subagentRunId, o.message.get(n), "message", n);
				return i ? A(() => i) : k(e);
			}
			case O.TEXT_MESSAGE_END: {
				let n = e.messageId;
				if (!r.has(n)) return A(() => new D(`Cannot send 'TEXT_MESSAGE_END' event: No active text message found with ID '${n}'. A 'TEXT_MESSAGE_START' event must be sent first.`));
				let i = ie(t, e.subagentRunId, o.message.get(n), "message", n);
				return i ? A(() => i) : (r.delete(n), k(e));
			}
			case O.TOOL_CALL_START: {
				let n = e.toolCallId;
				if (i.has(n)) return A(() => new D(`Cannot send 'TOOL_CALL_START' event: A tool call with ID '${n}' is already in progress. Complete it with 'TOOL_CALL_END' first.`));
				let r = e.parentMessageId, a = e.subagentRunId, s;
				if (r !== void 0) {
					let e = o.message.get(r);
					if (e) {
						if (a !== void 0 && a !== e.subagentRunId) return A(() => new D(`Cannot send 'TOOL_CALL_START': subagentRunId '${a}' does not match its parent message '${r}' owner '${e.subagentRunId ?? "(the parent agent)"}'. A tool call belongs to the message that carries it.`));
						s = e;
					}
				}
				let c = o.toolCall.get(n);
				if (c) {
					let e = ie(t, a, c, "tool call", n);
					if (e) return A(() => e);
					if (a === void 0 && s && s.subagentRunId !== c.subagentRunId) return A(() => new D(`Cannot send 'TOOL_CALL_START': tool call '${n}' is owned by '${c.subagentRunId ?? "(the parent agent)"}' but its parent message '${r}' is owned by '${s.subagentRunId ?? "(the parent agent)"}'. A tool call belongs to the message that carries it.`));
				}
				return i.add(n), c || o.toolCall.set(n, a === void 0 ? s ?? { subagentRunId: void 0 } : { subagentRunId: a }), k(e);
			}
			case O.TOOL_CALL_ARGS: {
				let n = e.toolCallId;
				if (!i.has(n)) return A(() => new D(`Cannot send 'TOOL_CALL_ARGS' event: No active tool call found with ID '${n}'. Start a tool call with 'TOOL_CALL_START' first.`));
				let r = ie(t, e.subagentRunId, o.toolCall.get(n), "tool call", n);
				return r ? A(() => r) : k(e);
			}
			case O.TOOL_CALL_END: {
				let n = e.toolCallId;
				if (!i.has(n)) return A(() => new D(`Cannot send 'TOOL_CALL_END' event: No active tool call found with ID '${n}'. A 'TOOL_CALL_START' event must be sent first.`));
				let r = ie(t, e.subagentRunId, o.toolCall.get(n), "tool call", n);
				return r ? A(() => r) : (i.delete(n), k(e));
			}
			case O.STEP_STARTED: {
				let t = e.stepName, n = e.subagentRunId;
				return d(n).has(t) ? A(() => new D(`Step "${t}" is already active for 'STEP_STARTED'${n === void 0 ? "" : ` in subagent '${n}'`}`)) : (d(n).set(t, !0), k(e));
			}
			case O.STEP_FINISHED: {
				let t = e.stepName, n = e.subagentRunId;
				if (!d(n).has(t)) {
					let e, r = !1;
					for (let [i, a] of u) if (i !== n && a.has(t)) {
						e = i, r = !0;
						break;
					}
					return A(r ? () => new D(`Cannot send 'STEP_FINISHED' for step "${t}" attributed to ${n === void 0 ? "the parent agent" : `subagent '${n}'`}: that step is open under ${e === void 0 ? "the parent agent" : `subagent '${e}'`}. A step must be finished by whoever started it.`) : () => new D(`Cannot send 'STEP_FINISHED' for step "${t}" that was not started`));
				}
				return d(n).delete(t), k(e);
			}
			case O.ACTIVITY_SNAPSHOT: {
				let t = e.messageId;
				return (!o.activity.has(t) || e.replace !== !1) && o.activity.set(t, { subagentRunId: e.subagentRunId }), k(e);
			}
			case O.TOOL_CALL_RESULT: {
				let t = e.messageId;
				return typeof t == "string" && o.message.set(t, { subagentRunId: e.subagentRunId }), k(e);
			}
			case O.REASONING_START:
			case O.REASONING_MESSAGE_START: {
				let n = e.messageId, r = o.reasoning.get(n);
				if (r) {
					let i = ie(t, e.subagentRunId, r, "reasoning message", n);
					if (i) return A(() => i);
				}
				return a.add(n), r || o.reasoning.set(n, { subagentRunId: e.subagentRunId }), k(e);
			}
			case O.REASONING_MESSAGE_CONTENT:
			case O.REASONING_MESSAGE_END:
			case O.REASONING_END: {
				let n = e.messageId, r = ie(t, e.subagentRunId, o.reasoning.get(n), "reasoning message", n);
				return r ? A(() => r) : (t === O.REASONING_END && a.delete(n), k(e));
			}
			case O.REASONING_ENCRYPTED_VALUE: {
				let n = e.entityId, r = e.subtype, i = r === "tool-call" ? o.toolCall.get(n) : r === "message" ? o.message.get(n) ?? o.reasoning.get(n) : o.reasoning.get(n), a = r === "tool-call" ? "tool call" : r === "message" ? "message" : "reasoning message", s = ie(t, e.subagentRunId, i, a, n);
				return s ? A(() => s) : k(e);
			}
			case O.ACTIVITY_DELTA: {
				let n = e.messageId, r = ie(t, e.subagentRunId, o.activity.get(n), "activity", n);
				return r ? A(() => r) : k(e);
			}
			case O.SUBAGENT_STARTED: {
				if (typeof e.subagentRunId != "string") return A(() => new D("Cannot send 'SUBAGENT_STARTED' without a 'subagentRunId'."));
				if (typeof e.name != "string") return A(() => new D("Cannot send 'SUBAGENT_STARTED' without a 'name'."));
				let t = e.subagentRunId, n = e.parentSubagentRunId;
				return p.has(t) ? A(() => new D(`Cannot send 'SUBAGENT_STARTED': subagent '${t}' is already active. Finish it with 'SUBAGENT_FINISHED' first.`)) : m.has(t) ? A(() => new D(`Cannot send 'SUBAGENT_STARTED': subagent '${t}' has already finished in this run. Subagent IDs are per-invocation and cannot be reused.`)) : n !== void 0 && !p.has(n) && !m.has(n) ? A(() => new D(`Cannot send 'SUBAGENT_STARTED': parentSubagentRunId '${n}' has not been started in this run.`)) : (p.set(t, !0), k(e));
			}
			case O.SUBAGENT_FINISHED:
			case O.SUBAGENT_ERROR: {
				if (typeof e.subagentRunId != "string") return A(() => new D(`Cannot send '${t}' without a 'subagentRunId'.`));
				if (t === O.SUBAGENT_ERROR && typeof e.message != "string") return A(() => new D("Cannot send 'SUBAGENT_ERROR' without a 'message'."));
				let n = e.subagentRunId;
				return p.has(n) ? (p.delete(n), m.add(n), k(e)) : A(() => new D(`Cannot send '${t}': no active subagent found with ID '${n}'. A 'SUBAGENT_STARTED' event must be sent first.`));
			}
			case O.MESSAGES_SNAPSHOT:
				{
					let t = re(e.messages, !0);
					if (t) return A(() => t);
				}
				return k(e);
			case O.RUN_STARTED:
				te = !0;
				{
					let t = re((e.input ?? {}).messages, !1);
					if (t) return A(() => t);
				}
				return k(e);
			case O.RUN_FINISHED:
				if (f()) {
					let e = [];
					for (let [t, n] of u) for (let r of n.keys()) e.push(t === void 0 ? r : `${r} (subagent '${t}')`);
					let t = e.join(", ");
					return A(() => new D(`Cannot send 'RUN_FINISHED' while steps are still active: ${t}`));
				}
				if (r.size > 0) {
					let e = Array.from(r.keys()).join(", ");
					return A(() => new D(`Cannot send 'RUN_FINISHED' while text messages are still active: ${e}`));
				}
				if (i.size > 0) {
					let e = Array.from(i.keys()).join(", ");
					return A(() => new D(`Cannot send 'RUN_FINISHED' while tool calls are still active: ${e}`));
				}
				if (p.size > 0) {
					let e = Array.from(p.keys()).join(", ");
					return A(() => new D(`Cannot send 'RUN_FINISHED' while subagents are still active: ${e}`));
				}
				return s = !0, k(e);
			case O.RUN_ERROR: return c = !0, k(e);
			case O.CUSTOM: return k(e);
			case O.THINKING_TEXT_MESSAGE_START: return h ? ee ? A(() => new D("Cannot send 'THINKING_TEXT_MESSAGE_START' event: A thinking message is already in progress. Complete it with 'THINKING_TEXT_MESSAGE_END' first.")) : (ee = !0, k(e)) : A(() => new D("Cannot send 'THINKING_TEXT_MESSAGE_START' event: A thinking step is not in progress. Create one with 'THINKING_START' first."));
			case O.THINKING_TEXT_MESSAGE_CONTENT: return ee ? k(e) : A(() => new D("Cannot send 'THINKING_TEXT_MESSAGE_CONTENT' event: No active thinking message found. Start a message with 'THINKING_TEXT_MESSAGE_START' first."));
			case O.THINKING_TEXT_MESSAGE_END: return ee ? (ee = !1, k(e)) : A(() => new D("Cannot send 'THINKING_TEXT_MESSAGE_END' event: No active thinking message found. A 'THINKING_TEXT_MESSAGE_START' event must be sent first."));
			case O.THINKING_START: return h ? A(() => new D("Cannot send 'THINKING_START' event: A thinking step is already in progress. End it with 'THINKING_END' first.")) : (h = !0, k(e));
			case O.THINKING_END: return h ? (h = !1, k(e)) : A(() => new D("Cannot send 'THINKING_END' event: No active thinking step found. A 'THINKING_START' event must be sent first."));
			default: return k(e);
		}
	}));
}, of = function(e) {
	return e.HEADERS = "headers", e.DATA = "data", e;
}({}), sf = (e) => gs(() => Vo(e())).pipe(Vs((e) => {
	if (!e.ok) {
		let t = e.headers.get("content-type") || "";
		return Vo(e.text()).pipe(fs((n) => {
			let r = n;
			if (t.includes("application/json")) try {
				r = JSON.parse(n);
			} catch {}
			let i = Error(`HTTP ${e.status}: ${typeof r == "string" ? r : JSON.stringify(r)}`);
			return i.status = e.status, i.payload = r, A(() => i);
		}));
	}
	let t = {
		type: of.HEADERS,
		status: e.status,
		headers: e.headers
	}, n = e.body?.getReader();
	return n ? new ka((e) => (e.next(t), (async () => {
		try {
			for (;;) {
				let { done: t, value: r } = await n.read();
				if (t) break;
				let i = {
					type: of.DATA,
					data: r
				};
				e.next(i);
			}
			e.complete();
		} catch (t) {
			e.error(t);
		}
	})(), () => {
		n.cancel().catch((e) => {
			if (e?.name !== "AbortError") throw e;
		});
	})) : A(() => Error("Failed to getReader() from response"));
})), cf = (e, t) => {
	let n = Qd(t), r = new Ra(), i = new TextDecoder("utf-8", { fatal: !1 }), a = "";
	e.subscribe({
		next: (e) => {
			if (e.type !== of.HEADERS && e.type === of.DATA && e.data) {
				let t = i.decode(e.data, { stream: !0 });
				a += t;
				let n = a.split(/\n\n/);
				a = n.pop() || "";
				for (let e of n) o(e);
			}
		},
		error: (e) => r.error(e),
		complete: () => {
			a && (a += i.decode(), o(a)), r.complete();
		}
	});
	function o(e) {
		let t = e.split("\n"), i = [];
		for (let e of t) e.startsWith("data:") && i.push(e.slice(5).replace(/^ /, ""));
		if (i.length > 0) try {
			let e = i.join("\n"), t = JSON.parse(e);
			n?.event("SSE", "Event received:", t, { type: t.type }), r.next(t);
		} catch (e) {
			r.error(e);
		}
	}
	return r.asObservable();
}, lf = (e) => {
	let t = new Ra(), n = /* @__PURE__ */ new Uint8Array();
	e.subscribe({
		next: (e) => {
			if (e.type !== of.HEADERS && e.type === of.DATA && e.data) {
				let t = new Uint8Array(n.length + e.data.length);
				t.set(n, 0), t.set(e.data, n.length), n = t, r();
			}
		},
		error: (e) => t.error(e),
		complete: () => {
			if (n.length > 0) try {
				r();
			} catch {
				console.warn("Incomplete or invalid protocol buffer data at stream end");
			}
			t.complete();
		}
	});
	function r() {
		for (; n.length >= 4;) {
			let e = 4 + new DataView(n.buffer, n.byteOffset, 4).getUint32(0, !1);
			if (n.length < e) break;
			try {
				let r = nu(n.slice(4, e));
				t.next(r), n = n.slice(e);
			} catch (e) {
				let n = e instanceof Error ? e.message : String(e);
				t.error(Error(`Failed to decode protocol buffer message: ${n}`));
				return;
			}
		}
	}
	return t.asObservable();
}, uf = (e, t) => {
	let n = Qd(t), r = new Ra(), i = new Ha(), a = !1;
	return e.subscribe({
		next: (e) => {
			if (i.next(e), e.type === of.HEADERS && !a) {
				a = !0;
				let t = e.headers.get("content-type");
				n?.lifecycle("HTTP", "Stream format detected:", {
					contentType: t,
					parser: t === "application/vnd.ag-ui.event+proto" ? "protobuf" : "sse"
				}), t === "application/vnd.ag-ui.event+proto" ? lf(i).subscribe({
					next: (e) => r.next(e),
					error: (e) => r.error(e),
					complete: () => r.complete()
				}) : cf(i, n).subscribe({
					next: (e) => {
						try {
							let t = ni.parse(e);
							n?.event("HTTP", "Event validated:", t, {
								type: t.type,
								valid: !0
							}), r.next(t);
						} catch (t) {
							n?.event("HTTP", "Event invalid:", {
								json: e,
								error: String(t)
							}), r.error(t);
						}
					},
					error: (e) => {
						if (e?.name === "AbortError") {
							r.next({
								type: O.RUN_ERROR,
								message: e.message || "Request aborted",
								code: "abort",
								rawEvent: e
							}), r.complete();
							return;
						}
						return r.error(e);
					},
					complete: () => r.complete()
				});
			} else a || r.error(Error("No headers event received before data events"));
		},
		error: (e) => {
			i.error(e), r.error(e);
		},
		complete: () => {
			i.complete();
		}
	}), r.asObservable();
}, df = Ld([
	"TextMessageStart",
	"TextMessageContent",
	"TextMessageEnd",
	"ActionExecutionStart",
	"ActionExecutionArgs",
	"ActionExecutionEnd",
	"ActionExecutionResult",
	"AgentStateMessage",
	"MetaEvent",
	"RunStarted",
	"RunFinished",
	"RunError",
	"NodeStarted",
	"NodeFinished"
]), ff = Ld([
	"LangGraphInterruptEvent",
	"PredictState",
	"Exit"
]);
Fd("type", [
	Pd({
		type: Id(df.enum.TextMessageStart),
		messageId: jd(),
		parentMessageId: jd().optional(),
		role: jd().optional()
	}),
	Pd({
		type: Id(df.enum.TextMessageContent),
		messageId: jd(),
		content: jd()
	}),
	Pd({
		type: Id(df.enum.TextMessageEnd),
		messageId: jd()
	}),
	Pd({
		type: Id(df.enum.ActionExecutionStart),
		actionExecutionId: jd(),
		actionName: jd(),
		parentMessageId: jd().optional()
	}),
	Pd({
		type: Id(df.enum.ActionExecutionArgs),
		actionExecutionId: jd(),
		args: jd()
	}),
	Pd({
		type: Id(df.enum.ActionExecutionEnd),
		actionExecutionId: jd()
	}),
	Pd({
		type: Id(df.enum.ActionExecutionResult),
		actionName: jd(),
		actionExecutionId: jd(),
		result: jd()
	}),
	Pd({
		type: Id(df.enum.AgentStateMessage),
		threadId: jd(),
		agentName: jd(),
		nodeName: jd(),
		runId: jd(),
		active: Md(),
		role: jd(),
		state: jd(),
		running: Md()
	}),
	Pd({
		type: Id(df.enum.MetaEvent),
		name: ff,
		value: Nd()
	}),
	Pd({
		type: Id(df.enum.RunError),
		message: jd(),
		code: jd().optional()
	})
]), Pd({
	id: jd(),
	role: jd(),
	content: jd(),
	parentMessageId: jd().optional()
}), Pd({
	id: jd(),
	name: jd(),
	arguments: Nd(),
	parentMessageId: jd().optional()
}), Pd({
	id: jd(),
	result: Nd(),
	actionExecutionId: jd(),
	actionName: jd()
});
var pf = (e) => {
	if (typeof e == "string") return e;
	if (!Array.isArray(e)) return;
	let t = e.filter((e) => e.type === "text").map((e) => e.text).filter((e) => e.length > 0);
	if (t.length !== 0) return t.join("\n");
}, mf = (e, t, n) => (r) => {
	let i = {}, a = !0, o = !0, s = "", c = null, l = null, u = [], d = {}, f = (e) => {
		typeof e == "object" && e && ("messages" in e && delete e.messages, i = e);
	};
	return r.pipe(fs((r) => {
		switch (r.type) {
			case O.TEXT_MESSAGE_START: {
				let e = r;
				return [{
					type: df.enum.TextMessageStart,
					messageId: e.messageId,
					role: e.role
				}];
			}
			case O.TEXT_MESSAGE_CONTENT: {
				let e = r;
				return [{
					type: df.enum.TextMessageContent,
					messageId: e.messageId,
					content: e.delta
				}];
			}
			case O.TEXT_MESSAGE_END: {
				let e = r;
				return [{
					type: df.enum.TextMessageEnd,
					messageId: e.messageId
				}];
			}
			case O.TOOL_CALL_START: {
				let e = r;
				return u.push({
					id: e.toolCallId,
					type: "function",
					function: {
						name: e.toolCallName,
						arguments: ""
					}
				}), o = !0, d[e.toolCallId] = e.toolCallName, [{
					type: df.enum.ActionExecutionStart,
					actionExecutionId: e.toolCallId,
					actionName: e.toolCallName,
					parentMessageId: e.parentMessageId
				}];
			}
			case O.TOOL_CALL_ARGS: {
				let c = r, d = u.find((e) => e.id === c.toolCallId);
				if (!d) return console.warn(`TOOL_CALL_ARGS: No tool call found with ID '${c.toolCallId}'`), [];
				d.function.arguments += c.delta;
				let p = !1;
				if (l) {
					let e = l.find((e) => e.tool == d.function.name);
					if (e) try {
						let t = JSON.parse(Ks(d.function.arguments));
						e.tool_argument && e.tool_argument in t ? (f({
							...i,
							[e.state_key]: t[e.tool_argument]
						}), p = !0) : e.tool_argument || (f({
							...i,
							[e.state_key]: t
						}), p = !0);
					} catch {}
				}
				return [{
					type: df.enum.ActionExecutionArgs,
					actionExecutionId: c.toolCallId,
					args: c.delta
				}, ...p ? [{
					type: df.enum.AgentStateMessage,
					threadId: e,
					agentName: n,
					nodeName: s,
					runId: t,
					running: a,
					role: "assistant",
					state: JSON.stringify(i),
					active: o
				}] : []];
			}
			case O.TOOL_CALL_END: {
				let e = r;
				return [{
					type: df.enum.ActionExecutionEnd,
					actionExecutionId: e.toolCallId
				}];
			}
			case O.TOOL_CALL_RESULT: {
				let e = r;
				return [{
					type: df.enum.ActionExecutionResult,
					actionExecutionId: e.toolCallId,
					result: e.content,
					actionName: d[e.toolCallId] || "unknown"
				}];
			}
			case O.RAW: return [];
			case O.CUSTOM: {
				let e = r;
				switch (e.name) {
					case "Exit":
						a = !1;
						break;
					case "PredictState": l = e.value;
				}
				return [{
					type: df.enum.MetaEvent,
					name: e.name,
					value: e.value
				}];
			}
			case O.STATE_SNAPSHOT: return f(r.snapshot), [{
				type: df.enum.AgentStateMessage,
				threadId: e,
				agentName: n,
				nodeName: s,
				runId: t,
				running: a,
				role: "assistant",
				state: JSON.stringify(i),
				active: o
			}];
			case O.STATE_DELTA: {
				let c = r, l = Ri.applyPatch(i, c.delta, !0, !1);
				return l ? (f(l.newDocument), [{
					type: df.enum.AgentStateMessage,
					threadId: e,
					agentName: n,
					nodeName: s,
					runId: t,
					running: a,
					role: "assistant",
					state: JSON.stringify(i),
					active: o
				}]) : [];
			}
			case O.MESSAGES_SNAPSHOT: return c = r.messages, [{
				type: df.enum.AgentStateMessage,
				threadId: e,
				agentName: n,
				nodeName: s,
				runId: t,
				running: a,
				role: "assistant",
				state: JSON.stringify({
					...i,
					...c ? { messages: c } : {}
				}),
				active: !0
			}];
			case O.RUN_STARTED: return [];
			case O.RUN_FINISHED: return c && (i.messages = c), Object.keys(i).length === 0 ? [] : [{
				type: df.enum.AgentStateMessage,
				threadId: e,
				agentName: n,
				nodeName: s,
				runId: t,
				running: a,
				role: "assistant",
				state: JSON.stringify({
					...i,
					...c ? { messages: hf(c) } : {}
				}),
				active: !1
			}];
			case O.RUN_ERROR: {
				let e = r;
				return [{
					type: df.enum.RunError,
					message: e.message,
					code: e.code
				}];
			}
			case O.STEP_STARTED: return s = r.stepName, u = [], l = null, [{
				type: df.enum.AgentStateMessage,
				threadId: e,
				agentName: n,
				nodeName: s,
				runId: t,
				running: a,
				role: "assistant",
				state: JSON.stringify(i),
				active: !0
			}];
			case O.STEP_FINISHED: return u = [], l = null, [{
				type: df.enum.AgentStateMessage,
				threadId: e,
				agentName: n,
				nodeName: s,
				runId: t,
				running: a,
				role: "assistant",
				state: JSON.stringify(i),
				active: !1
			}];
			default: return [];
		}
	}));
};
function hf(e) {
	let t = [];
	for (let n of e) if (n.role === "assistant" || n.role === "user" || n.role === "system") {
		let e = pf(n.content);
		if (e) {
			let r = {
				id: n.id,
				role: n.role,
				content: e
			};
			t.push(r);
		}
		if (n.role === "assistant" && n.toolCalls && n.toolCalls.length > 0) for (let e of n.toolCalls) {
			let r = {
				id: e.id,
				name: e.function.name,
				arguments: JSON.parse(e.function.arguments),
				parentMessageId: n.id
			};
			t.push(r);
		}
	} else if (n.role === "tool") {
		let r = "unknown";
		for (let t of e) if (t.role === "assistant" && t.toolCalls?.length) {
			for (let e of t.toolCalls) if (e.id === n.toolCallId) {
				r = e.function.name;
				break;
			}
		}
		let i = {
			id: n.id,
			result: n.content,
			actionExecutionId: n.toolCallId,
			actionName: r
		};
		t.push(i);
	}
	return t;
}
var gf = (e) => e.kind === "tool" ? e.fields.toolCallId : e.fields.messageId, _f = (e) => e === "tool" ? "toolCallId" : "messageId", vf = (e, t) => t.metadata === void 0 ? e : {
	...e,
	metadata: t.metadata
}, yf = (e) => (t) => {
	let n = Qd(e), r = /* @__PURE__ */ new Map(), i = (e) => {
		let t = r.get(e);
		if (!t) return [];
		switch (r.delete(e), t.kind) {
			case "text": {
				let e = {
					type: O.TEXT_MESSAGE_END,
					messageId: t.fields.messageId,
					...t.fields.subagentRunId != null && { subagentRunId: t.fields.subagentRunId }
				};
				return n?.event("TRANSFORM", "TEXT_MESSAGE_END", e, { messageId: e.messageId }), [e];
			}
			case "tool": {
				let e = {
					type: O.TOOL_CALL_END,
					toolCallId: t.fields.toolCallId,
					...t.fields.subagentRunId != null && { subagentRunId: t.fields.subagentRunId }
				};
				return n?.event("TRANSFORM", "TOOL_CALL_END", e, { toolCallId: e.toolCallId }), [e];
			}
			case "reasoning": {
				let e = {
					type: O.REASONING_MESSAGE_END,
					messageId: t.fields.messageId,
					...t.fields.subagentRunId != null && { subagentRunId: t.fields.subagentRunId }
				};
				return n?.event("TRANSFORM", "REASONING_MESSAGE_END", e, { messageId: e.messageId }), [e];
			}
		}
	}, a = () => [...r.keys()].flatMap((e) => i(e)), o = (e, t) => {
		for (let [n, i] of r) if (i.kind === e && gf(i) === t) return { owner: n };
	}, s = (e, t, n, i, a) => {
		if (t !== void 0) {
			let r = o(e, t);
			if (r) {
				if (n !== void 0 && n !== r.owner) throw Error(`Cannot continue ${a} '${t}': chunk subagentRunId '${n}' does not match the open stream's subagent '${r.owner ?? "(the parent agent)"}'.`);
				return r.owner;
			}
			return n;
		}
		if (n !== void 0) return n;
		if (r.get(void 0)?.kind === e) return;
		let s = [...r.entries()].filter(([, t]) => t.kind === e);
		if (s.length === 1) return s[0][0];
		if (s.length > 1) throw Error(`Ambiguous ${i}: it carries neither a ${_f(e)} nor a subagentRunId, but ${s.length} lanes have an open ${a}. Attribute the chunk to the subagent it belongs to.`);
	};
	return t.pipe(fs((e) => {
		switch (e.type) {
			case O.TEXT_MESSAGE_START:
			case O.TEXT_MESSAGE_CONTENT:
			case O.TEXT_MESSAGE_END:
			case O.TOOL_CALL_START:
			case O.TOOL_CALL_ARGS:
			case O.TOOL_CALL_END:
			case O.TOOL_CALL_RESULT:
			case O.STATE_SNAPSHOT:
			case O.STATE_DELTA:
			case O.CUSTOM:
			case O.STEP_STARTED:
			case O.STEP_FINISHED:
			case O.THINKING_START:
			case O.THINKING_END:
			case O.THINKING_TEXT_MESSAGE_START:
			case O.THINKING_TEXT_MESSAGE_CONTENT:
			case O.THINKING_TEXT_MESSAGE_END:
			case O.REASONING_START:
			case O.REASONING_MESSAGE_START:
			case O.REASONING_MESSAGE_CONTENT:
			case O.REASONING_MESSAGE_END:
			case O.REASONING_END: return [...i(e.subagentRunId ?? void 0), e];
			case O.RUN_STARTED:
			case O.RUN_FINISHED:
			case O.RUN_ERROR:
			case O.MESSAGES_SNAPSHOT: return [...a(), e];
			case O.RAW:
			case O.ACTIVITY_SNAPSHOT:
			case O.ACTIVITY_DELTA:
			case O.REASONING_ENCRYPTED_VALUE:
			case O.SUBAGENT_STARTED: return [e];
			case O.SUBAGENT_FINISHED:
			case O.SUBAGENT_ERROR: {
				let t = e.subagentRunId;
				return t == null ? [e] : [...i(t), e];
			}
			case O.TEXT_MESSAGE_CHUNK: {
				let t = e, a = s("text", t.messageId, t.subagentRunId ?? void 0, "TEXT_MESSAGE_CHUNK", "text message"), o = r.get(a), c = [], l;
				if (o?.kind === "text" && (t.messageId === void 0 || t.messageId === o.fields.messageId)) l = o.fields;
				else {
					if (c.push(...i(a)), t.messageId === void 0) throw Error("First TEXT_MESSAGE_CHUNK must have a messageId");
					l = {
						messageId: t.messageId,
						name: t.name,
						subagentRunId: t.subagentRunId
					}, r.set(a, {
						kind: "text",
						fields: l
					});
					let e = vf({
						type: O.TEXT_MESSAGE_START,
						messageId: t.messageId,
						role: t.role || "assistant",
						...t.name !== void 0 && { name: t.name },
						...t.subagentRunId != null && { subagentRunId: t.subagentRunId }
					}, t);
					c.push(e), n?.event("TRANSFORM", "TEXT_MESSAGE_START", e, { messageId: t.messageId });
				}
				if (t.delta !== void 0) {
					let e = t.subagentRunId ?? l.subagentRunId, r = vf({
						type: O.TEXT_MESSAGE_CONTENT,
						messageId: l.messageId,
						delta: t.delta,
						...e != null && { subagentRunId: e }
					}, t);
					c.push(r), n?.event("TRANSFORM", "TEXT_MESSAGE_CONTENT", r, { messageId: l.messageId });
				}
				if (c.length === 0 && t.metadata !== void 0) {
					let e = t.subagentRunId ?? l.subagentRunId;
					c.push({
						type: O.TEXT_MESSAGE_CONTENT,
						messageId: l.messageId,
						delta: "",
						metadata: t.metadata,
						...e != null && { subagentRunId: e }
					});
				}
				return c;
			}
			case O.TOOL_CALL_CHUNK: {
				let t = e, a = s("tool", t.toolCallId, t.subagentRunId ?? void 0, "TOOL_CALL_CHUNK", "tool call"), o = r.get(a), c = [], l;
				if (o?.kind === "tool" && (t.toolCallId === void 0 || t.toolCallId === o.fields.toolCallId)) l = o.fields;
				else {
					if (c.push(...i(a)), t.toolCallId === void 0) throw Error("First TOOL_CALL_CHUNK must have a toolCallId");
					if (t.toolCallName === void 0) throw Error("First TOOL_CALL_CHUNK must have a toolCallName");
					l = {
						toolCallId: t.toolCallId,
						toolCallName: t.toolCallName,
						parentMessageId: t.parentMessageId,
						subagentRunId: t.subagentRunId
					}, r.set(a, {
						kind: "tool",
						fields: l
					});
					let e = vf({
						type: O.TOOL_CALL_START,
						toolCallId: t.toolCallId,
						toolCallName: t.toolCallName,
						parentMessageId: t.parentMessageId,
						...t.subagentRunId != null && { subagentRunId: t.subagentRunId }
					}, t);
					c.push(e), n?.event("TRANSFORM", "TOOL_CALL_START", e, {
						toolCallId: t.toolCallId,
						toolCallName: t.toolCallName
					});
				}
				if (t.delta !== void 0) {
					let e = t.subagentRunId ?? l.subagentRunId, r = vf({
						type: O.TOOL_CALL_ARGS,
						toolCallId: l.toolCallId,
						delta: t.delta,
						...e != null && { subagentRunId: e }
					}, t);
					c.push(r), n?.event("TRANSFORM", "TOOL_CALL_ARGS", r, { toolCallId: l.toolCallId });
				}
				if (c.length === 0 && t.metadata !== void 0) {
					let e = t.subagentRunId ?? l.subagentRunId;
					c.push({
						type: O.TOOL_CALL_ARGS,
						toolCallId: l.toolCallId,
						delta: "",
						metadata: t.metadata,
						...e != null && { subagentRunId: e }
					});
				}
				return c;
			}
			case O.REASONING_MESSAGE_CHUNK: {
				let t = e, a = s("reasoning", t.messageId, t.subagentRunId ?? void 0, "REASONING_MESSAGE_CHUNK", "reasoning message"), o = r.get(a), c = [], l;
				if (o?.kind === "reasoning" && (t.messageId === void 0 || t.messageId === o.fields.messageId)) l = o.fields;
				else {
					if (c.push(...i(a)), t.messageId === void 0) throw Error("First REASONING_MESSAGE_CHUNK must have a messageId");
					l = {
						messageId: t.messageId,
						subagentRunId: t.subagentRunId
					}, r.set(a, {
						kind: "reasoning",
						fields: l
					});
					let e = vf({
						type: O.REASONING_MESSAGE_START,
						messageId: t.messageId,
						role: "reasoning",
						...t.subagentRunId != null && { subagentRunId: t.subagentRunId }
					}, t);
					c.push(e), n?.event("TRANSFORM", "REASONING_MESSAGE_START", e, { messageId: t.messageId });
				}
				if (t.delta !== void 0) {
					let e = t.subagentRunId ?? l.subagentRunId, r = vf({
						type: O.REASONING_MESSAGE_CONTENT,
						messageId: l.messageId,
						delta: t.delta,
						...e != null && { subagentRunId: e }
					}, t);
					c.push(r), n?.event("TRANSFORM", "REASONING_MESSAGE_CONTENT", r, { messageId: l.messageId });
				}
				if (c.length === 0 && t.metadata !== void 0) {
					let e = t.subagentRunId ?? l.subagentRunId;
					c.push({
						type: O.REASONING_MESSAGE_CONTENT,
						messageId: l.messageId,
						delta: "",
						metadata: t.metadata,
						...e != null && { subagentRunId: e }
					});
				}
				return c;
			}
		}
		return e.type, [];
	}), Is(() => {
		a();
	}));
};
function bf(e, t = /* @__PURE__ */ new Date()) {
	return e.expiresAt !== void 0 && new Date(e.expiresAt) <= t;
}
var xf = class {
	runNext(e, t) {
		return t.run(e).pipe(yf(!1));
	}
	runNextWithState(e, t) {
		let n = W(e.messages || []), r = W(e.state || {}), i = new Ha();
		return rf(e, i, t, []).subscribe((e) => {
			e.messages !== void 0 && (n = e.messages), e.state !== void 0 && (r = e.state);
		}), this.runNext(e, t).pipe(Cs(async (e) => (i.next(e), await new Promise((e) => setTimeout(e, 0)), {
			event: e,
			messages: W(n),
			state: W(r)
		})));
	}
}, Sf = class extends xf {
	constructor(e) {
		super(), this.fn = e;
	}
	run(e, t) {
		return this.fn(e, t);
	}
};
function Cf(e) {
	let t = e.content;
	if (Array.isArray(t)) {
		let n = t.filter((e) => typeof e == "object" && !!e && "type" in e && e.type === "text" && typeof e.text == "string").map((e) => e.text).join("");
		return {
			...e,
			content: n
		};
	}
	return typeof t == "string" ? e : {
		...e,
		content: ""
	};
}
var wf = class extends xf {
	run(e, t) {
		let { parentRunId: n, ...r } = e, i = {
			...r,
			messages: r.messages.map(Cf)
		};
		return this.runNext(i, t);
	}
}, Tf = "THINKING_START", Ef = "THINKING_END", Df = "THINKING_TEXT_MESSAGE_START", Of = "THINKING_TEXT_MESSAGE_CONTENT", kf = "THINKING_TEXT_MESSAGE_END", Af = class extends xf {
	constructor(...e) {
		super(...e), this.currentReasoningId = null, this.currentMessageId = null;
	}
	warnAboutTransformation(e, t) {
		typeof process < "u" && process.env !== void 0 && process.env.SUPPRESS_TRANSFORMATION_WARNINGS || console.warn(`AG-UI is converting ${e} to ${t}. To remove this warning, upgrade your AG-UI integration package (e.g. @ag-ui/langgraph). To surpress it, set SUPPRESS_TRANSFORMATION_WARNINGS=true in your .env file.`);
	}
	run(e, t) {
		return this.currentReasoningId = null, this.currentMessageId = null, this.runNext(e, t).pipe(j((e) => this.transformEvent(e)));
	}
	transformEvent(e) {
		switch (e.type) {
			case Tf: {
				this.currentReasoningId = Kd();
				let { title: t, ...n } = e;
				return this.warnAboutTransformation(Tf, O.REASONING_START), {
					...n,
					type: O.REASONING_START,
					messageId: this.currentReasoningId
				};
			}
			case Df: return this.currentMessageId = Kd(), this.warnAboutTransformation(Df, O.REASONING_MESSAGE_START), {
				...e,
				type: O.REASONING_MESSAGE_START,
				messageId: this.currentMessageId,
				role: "assistant"
			};
			case Of: {
				let { delta: t, ...n } = e;
				return this.warnAboutTransformation(Of, O.REASONING_MESSAGE_CONTENT), {
					...n,
					type: O.REASONING_MESSAGE_CONTENT,
					messageId: this.currentMessageId ?? Kd(),
					delta: t
				};
			}
			case kf: {
				let t = this.currentMessageId ?? Kd();
				return this.warnAboutTransformation(kf, O.REASONING_MESSAGE_END), {
					...e,
					type: O.REASONING_MESSAGE_END,
					messageId: t
				};
			}
			case Ef: {
				let t = this.currentReasoningId ?? Kd();
				return this.warnAboutTransformation(Ef, O.REASONING_END), {
					...e,
					type: O.REASONING_END,
					messageId: t
				};
			}
			default: return e;
		}
	}
};
function jf(e) {
	return e.startsWith("image/") ? "image" : e.startsWith("audio/") ? "audio" : e.startsWith("video/") ? "video" : "document";
}
function Mf(e) {
	return typeof e == "object" && !!e && "type" in e && e.type === "binary" && "mimeType" in e && typeof e.mimeType == "string";
}
function Nf(e) {
	let t = jf(e.mimeType);
	return e.data ? {
		type: t,
		source: {
			type: "data",
			value: e.data,
			mimeType: e.mimeType
		},
		...e.filename ? { metadata: { filename: e.filename } } : {}
	} : e.url ? {
		type: t,
		source: {
			type: "url",
			value: e.url,
			mimeType: e.mimeType
		},
		...e.filename ? { metadata: { filename: e.filename } } : {}
	} : e;
}
function Pf(e) {
	let t = e.content;
	if (!Array.isArray(t)) return e;
	let n = t.map((e) => Mf(e) ? Nf(e) : e);
	return {
		...e,
		content: n
	};
}
var Ff = class extends xf {
	run(e, t) {
		let n = {
			...e,
			messages: e.messages.map(Pf)
		};
		return this.runNext(n, t);
	}
}, If = "SUBAGENT_STARTED", Lf = "SUBAGENT_FINISHED", Rf = "SUBAGENT_ERROR";
function zf(e) {
	if (e && typeof e == "object" && "subagentRunId" in e) {
		let { subagentRunId: t, ...n } = e;
		return n;
	}
	return e;
}
function Bf(e) {
	return e.map((e) => zf(e));
}
var Vf = class extends xf {
	warnDroppedLifecycleEvent(e) {
		typeof process < "u" && process.env !== void 0 && process.env.SUPPRESS_TRANSFORMATION_WARNINGS || console.warn(`AG-UI is dropping ${e} because the target agent predates subagent support. To remove this warning, upgrade your AG-UI integration package. To suppress it, set SUPPRESS_TRANSFORMATION_WARNINGS=true in your .env file.`);
	}
	run(e, t) {
		let n = {
			...e,
			messages: (e.messages ?? []).map((e) => zf(e))
		};
		return this.runNext(n, t).pipe(Us((e) => {
			let t = e.type;
			(t === If || t === Lf || t === Rf) && this.warnDroppedLifecycleEvent(t);
		}), bs((e) => {
			let t = e.type;
			return t !== If && t !== Lf && t !== Rf;
		}), j((e) => {
			let t = zf(e);
			if (t.type === O.MESSAGES_SNAPSHOT) {
				let e = t;
				if (Array.isArray(e.messages)) return {
					...e,
					messages: Bf(e.messages)
				};
			}
			if (t.type === O.RUN_FINISHED) {
				let e = t;
				if (e.outcome && Array.isArray(e.outcome.interrupts)) return {
					...e,
					outcome: {
						...e.outcome,
						interrupts: e.outcome.interrupts.map((e) => zf(e))
					}
				};
			}
			if (t.type === O.RUN_STARTED) {
				let e = t;
				if (e.input && Array.isArray(e.input.messages)) return {
					...e,
					input: {
						...e.input,
						messages: Bf(e.input.messages)
					}
				};
			}
			return t;
		}));
	}
}, Hf = "0.0.59", Uf = class {
	get maxVersion() {
		return Hf;
	}
	get debug() {
		return this._debug;
	}
	set debug(e) {
		this._debug = Zd(e), this._debugLogger = ef(this._debug);
	}
	get debugLogger() {
		return this._debugLogger;
	}
	set debugLogger(e) {
		this._debugLogger = typeof e == "boolean" ? e ? ef(Zd(!0)) : void 0 : e;
	}
	constructor({ agentId: e, description: t, threadId: n, initialMessages: r, initialState: i, debug: a } = {}) {
		this.subscribers = [], this.isRunning = !1, this.pendingInterrupts = [], this.middlewares = [], this.agentId = e, this.description = t ?? "", this.threadId = n ?? l(), this.messages = W(r ?? []), this.state = W(i ?? {}), this._debug = Zd(a), this._debugLogger = ef(this._debug), Gd(this.maxVersion, "0.0.39") <= 0 && this.middlewares.unshift(new wf()), Gd(this.maxVersion, "0.0.45") <= 0 && this.middlewares.unshift(new Af()), Gd(this.maxVersion, "0.0.47") <= 0 && this.middlewares.unshift(new Ff()), Gd(this.maxVersion, "0.0.57") <= 0 && this.middlewares.unshift(new Vf());
	}
	subscribe(e) {
		return this.subscribers.push(e), { unsubscribe: () => {
			this.subscribers = this.subscribers.filter((t) => t !== e);
		} };
	}
	use(...e) {
		let t = e.map((e) => typeof e == "function" ? new Sf(e) : e);
		return this.middlewares.push(...t), this;
	}
	async runAgent(e, t) {
		try {
			this.isRunning = !0, this.agentId = this.agentId ?? l();
			let n = this.prepareRunAgentInput(e);
			this.debugLogger?.lifecycle("LIFECYCLE", "Run started:", {
				agentId: this.agentId,
				threadId: this.threadId
			});
			let r, i = new Set(this.messages.map((e) => e.id)), a = [
				{ onRunFinishedEvent: (e) => {
					e.outcome === "success" && (r = e.result);
				} },
				...this.subscribers,
				t ?? {}
			];
			await this.onInitialize(n, a), this.activeRunDetach$ = new Ra();
			let o;
			this.activeRunCompletionPromise = new Promise((e) => {
				o = e;
			}), await Ko(Da(() => this.middlewares.length === 0 ? this.run(n) : this.middlewares.reduceRight((e, t) => ({
				run: (n) => t.run(n, e),
				get messages() {
					return e.messages;
				},
				get state() {
					return e.state;
				}
			}), this).run(n), yf(this.debugLogger), af(this.debugLogger), (e) => e.pipe(Hs(this.activeRunDetach$)), (e) => this.apply(n, e, a), (e) => this.processApplyEvents(n, e, a), xs((e) => (this.debugLogger?.lifecycle("LIFECYCLE", "Run errored:", {
				agentId: this.agentId,
				error: e instanceof Error ? e.message : String(e)
			}), this.isRunning = !1, this.onError(n, e, a))), Is(() => {
				this.debugLogger?.lifecycle("LIFECYCLE", "Run finished:", {
					agentId: this.agentId,
					threadId: this.threadId
				}), this.isRunning = !1, this.onFinalize(n, a), o?.(), o = void 0, this.activeRunCompletionPromise = void 0, this.activeRunDetach$ = void 0;
			}))(k(null)));
			let s = W(this.messages).filter((e) => !i.has(e.id));
			return {
				result: r,
				newMessages: s
			};
		} finally {
			this.isRunning = !1;
		}
	}
	connect(e) {
		throw new nr();
	}
	async connectAgent(e, t) {
		try {
			this.isRunning = !0, this.agentId = this.agentId ?? l();
			let n = this.prepareRunAgentInput(e), r, i = new Set(this.messages.map((e) => e.id)), a = [
				{ onRunFinishedEvent: (e) => {
					e.outcome === "success" && (r = e.result);
				} },
				...this.subscribers,
				t ?? {}
			];
			await this.onInitialize(n, a), this.activeRunDetach$ = new Ra();
			let o;
			this.activeRunCompletionPromise = new Promise((e) => {
				o = e;
			}), await Ko(Da(() => gs(() => this.connect(n)), yf(this.debugLogger), af(this.debugLogger), (e) => e.pipe(Hs(this.activeRunDetach$)), (e) => this.apply(n, e, a), (e) => this.processApplyEvents(n, e, a), xs((e) => (this.isRunning = !1, e instanceof nr ? oo : this.onError(n, e, a))), Is(() => {
				this.isRunning = !1, this.onFinalize(n, a), o?.(), o = void 0, this.activeRunCompletionPromise = void 0, this.activeRunDetach$ = void 0;
			}))(k(null)), { defaultValue: void 0 });
			let s = W(this.messages).filter((e) => !i.has(e.id));
			return {
				result: r,
				newMessages: s
			};
		} finally {
			this.isRunning = !1;
		}
	}
	abortRun() {}
	async detachActiveRun() {
		if (!this.activeRunDetach$) return;
		let e = this.activeRunCompletionPromise ?? Promise.resolve();
		this.activeRunDetach$.next(), this.activeRunDetach$?.complete(), await e;
	}
	apply(e, t, n) {
		return rf(e, t, this, n, this.debugLogger);
	}
	processApplyEvents(e, t, n) {
		return t.pipe(Us((t) => {
			t.messages && (this.messages = t.messages, n.forEach((t) => {
				t.onMessagesChanged?.({
					messages: this.messages,
					state: this.state,
					agent: this,
					input: e
				});
			})), t.state && (this.state = t.state, n.forEach((t) => {
				t.onStateChanged?.({
					state: this.state,
					messages: this.messages,
					agent: this,
					input: e
				});
			}));
		}));
	}
	prepareRunAgentInput(e) {
		let t = W(this.messages);
		for (let e of t) e.subagentRunId === null && delete e.subagentRunId;
		let n = t.filter((e) => e.role !== "activity");
		return {
			threadId: this.threadId,
			runId: e?.runId || l(),
			tools: W(e?.tools ?? []),
			context: W(e?.context ?? []),
			forwardedProps: W(e?.forwardedProps ?? {}),
			state: W(this.state),
			messages: n,
			...e?.resume === void 0 ? {} : { resume: W(e.resume) }
		};
	}
	async onInitialize(e, t) {
		if (this.pendingInterrupts.length > 0) {
			let t = new Set((e.resume ?? []).map((e) => e.interruptId)), n = this.pendingInterrupts.map((e) => e.id).filter((e) => !t.has(e));
			if (n.length > 0) throw new D(`Thread has ${n.length} pending interrupt(s) not addressed by resume: ${n.join(", ")}`);
			for (let e of this.pendingInterrupts) if (bf(e)) throw new D(`Interrupt ${e.id} expired at ${e.expiresAt}`);
		}
		let n = await Xd(t, this.messages, this.state, (t, n, r) => t.onRunInitialized?.({
			messages: n,
			state: r,
			agent: this,
			input: e
		}));
		if (n.messages !== void 0 || n.state !== void 0) {
			if (n.messages) {
				this.messages = n.messages;
				for (let e of n.messages) e.subagentRunId === null && delete e.subagentRunId;
				e.messages = n.messages, t.forEach((t) => {
					t.onMessagesChanged?.({
						messages: this.messages,
						state: this.state,
						agent: this,
						input: e
					});
				});
			}
			n.state && (this.state = n.state, e.state = n.state, t.forEach((t) => {
				t.onStateChanged?.({
					state: this.state,
					messages: this.messages,
					agent: this,
					input: e
				});
			}));
		}
	}
	onError(e, t, n) {
		return Vo(Xd(n, this.messages, this.state, (n, r, i) => n.onRunFailed?.({
			error: t,
			messages: r,
			state: i,
			agent: this,
			input: e
		}))).pipe(j((r) => {
			let i = r;
			if ((i.messages !== void 0 || i.state !== void 0) && (i.messages !== void 0 && (this.messages = i.messages, n.forEach((t) => {
				t.onMessagesChanged?.({
					messages: this.messages,
					state: this.state,
					agent: this,
					input: e
				});
			})), i.state !== void 0 && (this.state = i.state, n.forEach((t) => {
				t.onStateChanged?.({
					state: this.state,
					messages: this.messages,
					agent: this,
					input: e
				});
			}))), i.stopPropagation !== !0) {
				let e = String(t);
				if (t.name !== "AbortError" && t.message !== "Fetch is aborted" && t.message !== "signal is aborted without reason" && t.message !== "component unmounted" && e !== "component unmounted") throw console.error("Agent execution failed:", t), t;
			}
			return {};
		}));
	}
	async onFinalize(e, t) {
		let n = await Xd(t, this.messages, this.state, (t, n, r) => t.onRunFinalized?.({
			messages: n,
			state: r,
			agent: this,
			input: e
		}));
		(n.messages !== void 0 || n.state !== void 0) && (n.messages !== void 0 && (this.messages = n.messages, t.forEach((t) => {
			t.onMessagesChanged?.({
				messages: this.messages,
				state: this.state,
				agent: this,
				input: e
			});
		})), n.state !== void 0 && (this.state = n.state, t.forEach((t) => {
			t.onStateChanged?.({
				state: this.state,
				messages: this.messages,
				agent: this,
				input: e
			});
		})));
	}
	clone() {
		let e = Object.create(Object.getPrototypeOf(this));
		return e.agentId = this.agentId, e.description = this.description, e.threadId = this.threadId, e.messages = W(this.messages), e.state = W(this.state), e._debug = this._debug, e._debugLogger = this._debugLogger, e.isRunning = this.isRunning, e.subscribers = [...this.subscribers], e.middlewares = [...this.middlewares], e.pendingInterrupts = W(this.pendingInterrupts), e;
	}
	addMessage(e) {
		this.messages.push(e), (async () => {
			for (let t of this.subscribers) await t.onNewMessage?.({
				message: e,
				messages: this.messages,
				state: this.state,
				agent: this
			});
			if (e.role === "assistant" && e.toolCalls) for (let t of e.toolCalls) for (let e of this.subscribers) await e.onNewToolCall?.({
				toolCall: t,
				messages: this.messages,
				state: this.state,
				agent: this
			});
			for (let e of this.subscribers) await e.onMessagesChanged?.({
				messages: this.messages,
				state: this.state,
				agent: this
			});
		})();
	}
	addMessages(e) {
		this.messages.push(...e), (async () => {
			for (let t of e) {
				for (let e of this.subscribers) await e.onNewMessage?.({
					message: t,
					messages: this.messages,
					state: this.state,
					agent: this
				});
				if (t.role === "assistant" && t.toolCalls) for (let e of t.toolCalls) for (let t of this.subscribers) await t.onNewToolCall?.({
					toolCall: e,
					messages: this.messages,
					state: this.state,
					agent: this
				});
			}
			for (let e of this.subscribers) await e.onMessagesChanged?.({
				messages: this.messages,
				state: this.state,
				agent: this
			});
		})();
	}
	setMessages(e) {
		this.messages = W(e), (async () => {
			for (let e of this.subscribers) await e.onMessagesChanged?.({
				messages: this.messages,
				state: this.state,
				agent: this
			});
		})();
	}
	setState(e) {
		this.state = W(e), (async () => {
			for (let e of this.subscribers) await e.onStateChanged?.({
				messages: this.messages,
				state: this.state,
				agent: this
			});
		})();
	}
	legacy_to_be_removed_runAgentBridged(e) {
		this.agentId = this.agentId ?? l();
		let t = this.prepareRunAgentInput(e);
		return (this.middlewares.length === 0 ? this.run(t) : this.middlewares.reduceRight((e, t) => ({
			run: (n) => t.run(n, e),
			get messages() {
				return e.messages;
			},
			get state() {
				return e.state;
			}
		}), this).run(t)).pipe(yf(this.debugLogger), af(this.debugLogger), mf(this.threadId, t.runId, this.agentId), (e) => e.pipe(j((e) => (this.debugLogger?.event("LEGACY", "Event:", e, { type: e.type }), e))));
	}
};
function Wf(e) {
	if (!Array.isArray(e.messages)) return e;
	let t = !1, n = e.messages.map((e) => {
		if (e.subagentRunId === null) {
			t = !0;
			let n = { ...e };
			return delete n.subagentRunId, n;
		}
		return e;
	});
	return t ? {
		...e,
		messages: n
	} : e;
}
var Gf = class extends Uf {
	requestInit(e) {
		return {
			method: "POST",
			headers: {
				...this.headers,
				"Content-Type": "application/json",
				Accept: "text/event-stream"
			},
			body: JSON.stringify(Wf(e)),
			signal: this.abortController.signal
		};
	}
	runAgent(e, t) {
		return this.abortController = e?.abortController ?? new AbortController(), super.runAgent(e, t);
	}
	abortRun() {
		this.abortController.abort(), super.abortRun();
	}
	constructor(e) {
		super(e), this.abortController = new AbortController(), this.url = e.url, this.headers = W(e.headers ?? {}), this.fetch = e.fetch ?? ((e, t) => fetch(e, t));
	}
	run(e) {
		return uf(sf(() => this.fetch(this.url, this.requestInit(e))), this.debugLogger);
	}
	clone() {
		let e = super.clone();
		e.url = this.url, e.headers = W(this.headers ?? {}), e.fetch = this.fetch;
		let t = new AbortController(), n = this.abortController.signal;
		return n.aborted && t.abort(n.reason), e.abortController = t, e;
	}
};
//#endregion
//#region node_modules/@copilotkit/shared/dist/utils/inspector-metadata.mjs
function Kf(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	try {
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	} catch {
		return !1;
	}
}
function qf(e, t) {
	try {
		let n = Object.getOwnPropertyDescriptor(e, t);
		return n !== void 0 && "value" in n ? n.value : void 0;
	} catch {
		return;
	}
}
function Jf(e) {
	if (typeof e != "string") return;
	let t = e.trim();
	return t.length > 0 ? t : void 0;
}
function Yf(e) {
	if (!Kf(e)) return;
	let t = Jf(e.organizationName), n = Jf(e.projectName);
	if (t !== void 0 && n !== void 0) return {
		organizationName: t,
		projectName: n
	};
}
function Xf(e) {
	if (!Kf(e)) return;
	let t = Jf(e.code), n = Jf(e.label);
	if (t !== void 0 && n !== void 0) return {
		code: t,
		label: n
	};
}
function Zf(e) {
	if (Kf(e)) switch (e.state) {
		case "valid":
		case "none":
		case "expired":
		case "unknown": return { state: e.state };
		default: return;
	}
}
function Qf(e) {
	switch (e) {
		case "manage_plan":
		case "renew":
		case "enable_intelligence": return e;
		default: return;
	}
}
function $f(e) {
	let t = Jf(e);
	if (t === void 0 || t.includes("?") || t.includes("#")) return;
	let n = t.indexOf("://");
	if (n < 1) return;
	let r = t.slice(n + 3), i = r.indexOf("/");
	if ((i === -1 ? r : r.slice(0, i)).includes("@")) return;
	let a;
	try {
		a = new URL(t);
	} catch {
		return;
	}
	if (a.hostname.length === 0 || a.username || a.password) return;
	if (a.protocol === "https:") return t;
	let o = a.hostname === "localhost" || a.hostname === "127.0.0.1" || a.hostname === "[::1]";
	if (a.protocol === "http:" && o) return t;
}
function ep(e) {
	if (!Kf(e)) return;
	let t = Qf(e.kind), n = $f(e.url);
	if (t !== void 0 && n !== void 0) return {
		kind: t,
		url: n
	};
}
function tp(e) {
	return typeof e == "number" && Number.isSafeInteger(e) && e >= 0;
}
function np(e) {
	if (Kf(e)) {
		if (e.kind === "finite") return typeof e.value != "number" || !Number.isSafeInteger(e.value) || e.value < 1 ? void 0 : {
			kind: "finite",
			value: e.value
		};
		if (e.kind === "unlimited") return { kind: "unlimited" };
		if (e.kind === "unknown") return { kind: "unknown" };
	}
}
function rp(e) {
	if (!Kf(e)) return;
	let t = np(e.limit), n = e.used;
	if (!tp(n) || t === void 0) return;
	let r = qf(e, "expiringSoonCount"), i = tp(r) ? r : void 0;
	return {
		used: n,
		limit: t,
		...i === void 0 ? {} : { expiringSoonCount: i }
	};
}
function ip(e) {
	if (!Kf(e) || e.schemaVersion !== 1) return;
	let t = Yf(e.identity), n = Xf(e.plan), r = Zf(e.license), i = ep(e.action), a = rp(e.usage);
	return {
		schemaVersion: 1,
		...t === void 0 ? {} : { identity: t },
		...n === void 0 ? {} : { plan: n },
		...r === void 0 ? {} : { license: r },
		...i === void 0 ? {} : { action: i },
		...a === void 0 ? {} : { usage: a }
	};
}
//#endregion
//#region node_modules/@copilotkit/shared/dist/utils/random-id.mjs
function ap() {
	return l();
}
//#endregion
//#region node_modules/partial-json/dist/options.js
var op = /* @__PURE__ */ n(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Allow = e.ALL = e.COLLECTION = e.ATOM = e.SPECIAL = e.INF = e._INFINITY = e.INFINITY = e.NAN = e.BOOL = e.NULL = e.OBJ = e.ARR = e.NUM = e.STR = void 0, e.STR = 1, e.NUM = 2, e.ARR = 4, e.OBJ = 8, e.NULL = 16, e.BOOL = 32, e.NAN = 64, e.INFINITY = 128, e._INFINITY = 256, e.INF = e.INFINITY | e._INFINITY, e.SPECIAL = e.NULL | e.BOOL | e.INF | e.NAN, e.ATOM = e.STR | e.NUM | e.SPECIAL, e.COLLECTION = e.ARR | e.OBJ, e.ALL = e.ATOM | e.COLLECTION, e.Allow = {
		STR: e.STR,
		NUM: e.NUM,
		ARR: e.ARR,
		OBJ: e.OBJ,
		NULL: e.NULL,
		BOOL: e.BOOL,
		NAN: e.NAN,
		INFINITY: e.INFINITY,
		_INFINITY: e._INFINITY,
		INF: e.INF,
		SPECIAL: e.SPECIAL,
		ATOM: e.ATOM,
		COLLECTION: e.COLLECTION,
		ALL: e.ALL
	}, e.default = e.Allow;
})), sp = /* @__PURE__ */ e((/* @__PURE__ */ n(((e) => {
	var t = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: function() {
				return t[n];
			}
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), n = e && e.__exportStar || function(e, n) {
		for (var r in e) r !== "default" && !Object.prototype.hasOwnProperty.call(n, r) && t(n, e, r);
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Allow = e.MalformedJSON = e.PartialJSON = e.parseJSON = e.parse = void 0;
	var r = op();
	Object.defineProperty(e, "Allow", {
		enumerable: !0,
		get: function() {
			return r.Allow;
		}
	}), n(op(), e);
	var i = class extends Error {};
	e.PartialJSON = i;
	var a = class extends Error {};
	e.MalformedJSON = a;
	function o(e, t = r.Allow.ALL) {
		if (typeof e != "string") throw TypeError(`expecting str, got ${typeof e}`);
		if (!e.trim()) throw Error(`${e} is empty`);
		return s(e.trim(), t);
	}
	e.parseJSON = o;
	var s = (e, t) => {
		let n = e.length, o = 0, s = (e) => {
			throw new i(`${e} at position ${o}`);
		}, c = (e) => {
			throw new a(`${e} at position ${o}`);
		}, l = () => (m(), o >= n && s("Unexpected end of input"), e[o] === "\"" ? u() : e[o] === "{" ? d() : e[o] === "[" ? f() : e.substring(o, o + 4) === "null" || r.Allow.NULL & t && n - o < 4 && "null".startsWith(e.substring(o)) ? (o += 4, null) : e.substring(o, o + 4) === "true" || r.Allow.BOOL & t && n - o < 4 && "true".startsWith(e.substring(o)) ? (o += 4, !0) : e.substring(o, o + 5) === "false" || r.Allow.BOOL & t && n - o < 5 && "false".startsWith(e.substring(o)) ? (o += 5, !1) : e.substring(o, o + 8) === "Infinity" || r.Allow.INFINITY & t && n - o < 8 && "Infinity".startsWith(e.substring(o)) ? (o += 8, Infinity) : e.substring(o, o + 9) === "-Infinity" || r.Allow._INFINITY & t && 1 < n - o && n - o < 9 && "-Infinity".startsWith(e.substring(o)) ? (o += 9, -Infinity) : e.substring(o, o + 3) === "NaN" || r.Allow.NAN & t && n - o < 3 && "NaN".startsWith(e.substring(o)) ? (o += 3, NaN) : p()), u = () => {
			let i = o, a = !1;
			for (o++; o < n && (e[o] !== "\"" || a && e[o - 1] === "\\");) a = e[o] === "\\" && !a, o++;
			if (e.charAt(o) == "\"") try {
				return JSON.parse(e.substring(i, ++o - Number(a)));
			} catch (e) {
				c(String(e));
			}
			else if (r.Allow.STR & t) try {
				return JSON.parse(e.substring(i, o - Number(a)) + "\"");
			} catch {
				return JSON.parse(e.substring(i, e.lastIndexOf("\\")) + "\"");
			}
			s("Unterminated string literal");
		}, d = () => {
			o++, m();
			let i = {};
			try {
				for (; e[o] !== "}";) {
					if (m(), o >= n && r.Allow.OBJ & t) return i;
					let a = u();
					m(), o++;
					try {
						i[a] = l();
					} catch (e) {
						if (r.Allow.OBJ & t) return i;
						throw e;
					}
					m(), e[o] === "," && o++;
				}
			} catch {
				if (r.Allow.OBJ & t) return i;
				s("Expected '}' at end of object");
			}
			return o++, i;
		}, f = () => {
			o++;
			let n = [];
			try {
				for (; e[o] !== "]";) n.push(l()), m(), e[o] === "," && o++;
			} catch {
				if (r.Allow.ARR & t) return n;
				s("Expected ']' at end of array");
			}
			return o++, n;
		}, p = () => {
			if (o === 0) {
				e === "-" && c("Not sure what '-' is");
				try {
					return JSON.parse(e);
				} catch (n) {
					if (r.Allow.NUM & t) try {
						return JSON.parse(e.substring(0, e.lastIndexOf("e")));
					} catch {}
					c(String(n));
				}
			}
			let i = o;
			for (e[o] === "-" && o++; e[o] && ",]}".indexOf(e[o]) === -1;) o++;
			o == n && !(r.Allow.NUM & t) && s("Unterminated number literal");
			try {
				return JSON.parse(e.substring(i, o));
			} catch {
				e.substring(i, o) === "-" && s("Not sure what '-' is");
				try {
					return JSON.parse(e.substring(i, e.lastIndexOf("e")));
				} catch (e) {
					c(String(e));
				}
			}
		}, m = () => {
			for (; o < n && " \n\r	".includes(e[o]);) o++;
		};
		return l();
	};
	e.parse = o;
})))(), 1);
function cp(e) {
	try {
		let t = sp.parse(e);
		return t && typeof t == "object" && !Array.isArray(t) ? t : {};
	} catch {
		return {};
	}
}
function lp(e, t) {
	return (n) => Math.min(e * 2 ** (n - 1), t);
}
//#endregion
//#region node_modules/@copilotkit/shared/dist/debug.mjs
var up = {
	enabled: !1,
	events: !1,
	lifecycle: !1,
	verbose: !1
};
function dp(e) {
	if (!e) return up;
	if (e === !0) return {
		enabled: !0,
		events: !0,
		lifecycle: !0,
		verbose: !1
	};
	let t = e.events ?? !0, n = e.lifecycle ?? !0, r = t || n;
	return {
		enabled: r,
		events: t,
		lifecycle: n,
		verbose: r && (e.verbose ?? !1)
	};
}
//#endregion
//#region node_modules/@copilotkit/shared/dist/standard-schema.mjs
function fp(e) {
	let t = e["~standard"];
	return typeof t == "object" && !!t && "jsonSchema" in t && t.jsonSchema != null && typeof t.jsonSchema == "object" && "input" in t.jsonSchema && typeof t.jsonSchema.input == "function";
}
function pp(e, t) {
	if (fp(e)) return e["~standard"].jsonSchema.input({ target: "draft-07" });
	if (typeof e.toJSONSchema == "function") return e.toJSONSchema();
	let n = e["~standard"].vendor;
	if (n === "zod" && t?.zodToJsonSchema) return t.zodToJsonSchema(e, { $refStrategy: "none" });
	throw Error(`Cannot convert schema to JSON Schema. The schema (vendor: "${n}") does not implement Standard JSON Schema V1 and no zodToJsonSchema fallback is available. Use a library that supports Standard JSON Schema (e.g., Zod 3.24+, Valibot v1+, ArkType v2+) or pass a zodToJsonSchema function in options.`);
}
//#endregion
//#region node_modules/@copilotkit/shared/dist/logger.mjs
var mp = console, hp = (e) => typeof e == "function" ? e : function() {
	return e;
}, gp = typeof self < "u" ? self : null, _p = typeof window < "u" ? window : null, vp = gp || _p || globalThis, yp = "2.0.0", bp = {
	connecting: 0,
	open: 1,
	closing: 2,
	closed: 3
}, xp = 100, Sp = 1e4, Cp = 1e3, wp = {
	closed: "closed",
	errored: "errored",
	joined: "joined",
	joining: "joining",
	leaving: "leaving"
}, Tp = {
	close: "phx_close",
	error: "phx_error",
	join: "phx_join",
	reply: "phx_reply",
	leave: "phx_leave"
}, Ep = {
	longpoll: "longpoll",
	websocket: "websocket"
}, Dp = { complete: 4 }, Op = "base64url.bearer.phx.", kp = class {
	constructor(e, t, n, r) {
		this.channel = e, this.event = t, this.payload = n || function() {
			return {};
		}, this.receivedResp = null, this.timeout = r, this.timeoutTimer = null, this.recHooks = [], this.sent = !1;
	}
	resend(e) {
		this.timeout = e, this.reset(), this.send();
	}
	send() {
		this.hasReceived("timeout") || (this.startTimeout(), this.sent = !0, this.channel.socket.push({
			topic: this.channel.topic,
			event: this.event,
			payload: this.payload(),
			ref: this.ref,
			join_ref: this.channel.joinRef()
		}));
	}
	receive(e, t) {
		return this.hasReceived(e) && t(this.receivedResp.response), this.recHooks.push({
			status: e,
			callback: t
		}), this;
	}
	reset() {
		this.cancelRefEvent(), this.ref = null, this.refEvent = null, this.receivedResp = null, this.sent = !1;
	}
	matchReceive({ status: e, response: t, _ref: n }) {
		this.recHooks.filter((t) => t.status === e).forEach((e) => e.callback(t));
	}
	cancelRefEvent() {
		this.refEvent && this.channel.off(this.refEvent);
	}
	cancelTimeout() {
		clearTimeout(this.timeoutTimer), this.timeoutTimer = null;
	}
	startTimeout() {
		this.timeoutTimer && this.cancelTimeout(), this.cancelRefEvent(), this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, (e) => {
			this.cancelRefEvent(), this.cancelTimeout(), this.receivedResp = e, this.matchReceive(e);
		}), this.timeoutTimer = setTimeout(() => {
			this.trigger("timeout", {});
		}, this.timeout);
	}
	hasReceived(e) {
		return this.receivedResp && this.receivedResp.status === e;
	}
	trigger(e, t) {
		this.channel.trigger(this.refEvent, {
			status: e,
			response: t
		});
	}
}, Ap = class {
	constructor(e, t) {
		this.callback = e, this.timerCalc = t, this.timer = null, this.tries = 0;
	}
	reset() {
		this.tries = 0, clearTimeout(this.timer);
	}
	scheduleTimeout() {
		clearTimeout(this.timer), this.timer = setTimeout(() => {
			this.tries += 1, this.callback();
		}, this.timerCalc(this.tries + 1));
	}
}, jp = class {
	constructor(e, t, n) {
		this.state = wp.closed, this.topic = e, this.params = hp(t || {}), this.socket = n, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = !1, this.joinPush = new kp(this, Tp.join, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new Ap(() => {
			this.socket.isConnected() && this.rejoin();
		}, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(() => {
			this.rejoinTimer.reset(), this.isErrored() && this.rejoin();
		})), this.joinPush.receive("ok", () => {
			this.state = wp.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((e) => e.send()), this.pushBuffer = [];
		}), this.joinPush.receive("error", () => {
			this.state = wp.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
		}), this.onClose(() => {
			this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`), this.state = wp.closed, this.socket.remove(this);
		}), this.onError((e) => {
			this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e), this.isJoining() && this.joinPush.reset(), this.state = wp.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
		}), this.joinPush.receive("timeout", () => {
			this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout), new kp(this, Tp.leave, hp({}), this.timeout).send(), this.state = wp.errored, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
		}), this.on(Tp.reply, (e, t) => {
			this.trigger(this.replyEventName(t), e);
		});
	}
	join(e = this.timeout) {
		if (this.joinedOnce) throw Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
		return this.timeout = e, this.joinedOnce = !0, this.rejoin(), this.joinPush;
	}
	onClose(e) {
		this.on(Tp.close, e);
	}
	onError(e) {
		return this.on(Tp.error, (t) => e(t));
	}
	on(e, t) {
		let n = this.bindingRef++;
		return this.bindings.push({
			event: e,
			ref: n,
			callback: t
		}), n;
	}
	off(e, t) {
		this.bindings = this.bindings.filter((n) => n.event !== e || t !== void 0 && t !== n.ref);
	}
	canPush() {
		return this.socket.isConnected() && this.isJoined();
	}
	push(e, t, n = this.timeout) {
		if (t = t || {}, !this.joinedOnce) throw Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
		let r = new kp(this, e, function() {
			return t;
		}, n);
		return this.canPush() ? r.send() : (r.startTimeout(), this.pushBuffer.push(r)), r;
	}
	leave(e = this.timeout) {
		this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = wp.leaving;
		let t = () => {
			this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(Tp.close, "leave");
		}, n = new kp(this, Tp.leave, hp({}), e);
		return n.receive("ok", () => t()).receive("timeout", () => t()), n.send(), this.canPush() || n.trigger("ok", {}), n;
	}
	onMessage(e, t, n) {
		return t;
	}
	isMember(e, t, n, r) {
		return this.topic === e ? r && r !== this.joinRef() ? (this.socket.hasLogger() && this.socket.log("channel", "dropping outdated message", {
			topic: e,
			event: t,
			payload: n,
			joinRef: r
		}), !1) : !0 : !1;
	}
	joinRef() {
		return this.joinPush.ref;
	}
	rejoin(e = this.timeout) {
		this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = wp.joining, this.joinPush.resend(e));
	}
	trigger(e, t, n, r) {
		let i = this.onMessage(e, t, n, r);
		if (t && !i) throw Error("channel onMessage callbacks must return the payload, modified or unmodified");
		let a = this.bindings.filter((t) => t.event === e);
		for (let e = 0; e < a.length; e++) a[e].callback(i, n, r || this.joinRef());
	}
	replyEventName(e) {
		return `chan_reply_${e}`;
	}
	isClosed() {
		return this.state === wp.closed;
	}
	isErrored() {
		return this.state === wp.errored;
	}
	isJoined() {
		return this.state === wp.joined;
	}
	isJoining() {
		return this.state === wp.joining;
	}
	isLeaving() {
		return this.state === wp.leaving;
	}
}, Mp = class {
	static request(e, t, n, r, i, a, o) {
		if (vp.XDomainRequest) {
			let n = new vp.XDomainRequest();
			return this.xdomainRequest(n, e, t, r, i, a, o);
		}
		if (vp.XMLHttpRequest) {
			let s = new vp.XMLHttpRequest();
			return this.xhrRequest(s, e, t, n, r, i, a, o);
		}
		if (vp.fetch && vp.AbortController) return this.fetchRequest(e, t, n, r, i, a, o);
		throw Error("No suitable XMLHttpRequest implementation found");
	}
	static fetchRequest(e, t, n, r, i, a, o) {
		let s = {
			method: e,
			headers: n,
			body: r
		}, c = null;
		return i && (c = new AbortController(), setTimeout(() => c.abort(), i), s.signal = c.signal), vp.fetch(t, s).then((e) => e.text()).then((e) => this.parseJSON(e)).then((e) => o && o(e)).catch((e) => {
			e.name === "AbortError" && a ? a() : o && o(null);
		}), c;
	}
	static xdomainRequest(e, t, n, r, i, a, o) {
		return e.timeout = i, e.open(t, n), e.onload = () => {
			let t = this.parseJSON(e.responseText);
			o && o(t);
		}, a && (e.ontimeout = a), e.onprogress = () => {}, e.send(r), e;
	}
	static xhrRequest(e, t, n, r, i, a, o, s) {
		e.open(t, n, !0), e.timeout = a;
		for (let [t, n] of Object.entries(r)) e.setRequestHeader(t, n);
		return e.onerror = () => s && s(null), e.onreadystatechange = () => {
			e.readyState === Dp.complete && s && s(this.parseJSON(e.responseText));
		}, o && (e.ontimeout = o), e.send(i), e;
	}
	static parseJSON(e) {
		if (!e || e === "") return null;
		try {
			return JSON.parse(e);
		} catch {
			return console && console.log("failed to parse JSON response", e), null;
		}
	}
	static serialize(e, t) {
		let n = [];
		for (var r in e) {
			if (!Object.prototype.hasOwnProperty.call(e, r)) continue;
			let i = t ? `${t}[${r}]` : r, a = e[r];
			typeof a == "object" ? n.push(this.serialize(a, i)) : n.push(encodeURIComponent(i) + "=" + encodeURIComponent(a));
		}
		return n.join("&");
	}
	static appendParams(e, t) {
		return Object.keys(t).length === 0 ? e : `${e}${e.match(/\?/) ? "&" : "?"}${this.serialize(t)}`;
	}
}, Np = (e) => {
	let t = "", n = new Uint8Array(e), r = n.byteLength;
	for (let e = 0; e < r; e++) t += String.fromCharCode(n[e]);
	return btoa(t);
}, Pp = class {
	constructor(e, t) {
		t && t.length === 2 && t[1].startsWith(Op) && (this.authToken = atob(t[1].slice(Op.length))), this.endPoint = null, this.token = null, this.skipHeartbeat = !0, this.reqs = /* @__PURE__ */ new Set(), this.awaitingBatchAck = !1, this.currentBatch = null, this.currentBatchTimer = null, this.batchBuffer = [], this.onopen = function() {}, this.onerror = function() {}, this.onmessage = function() {}, this.onclose = function() {}, this.pollEndpoint = this.normalizeEndpoint(e), this.readyState = bp.connecting, setTimeout(() => this.poll(), 0);
	}
	normalizeEndpoint(e) {
		return e.replace("ws://", "http://").replace("wss://", "https://").replace(RegExp("(.*)/" + Ep.websocket), "$1/" + Ep.longpoll);
	}
	endpointURL() {
		return Mp.appendParams(this.pollEndpoint, { token: this.token });
	}
	closeAndRetry(e, t, n) {
		this.close(e, t, n), this.readyState = bp.connecting;
	}
	ontimeout() {
		this.onerror("timeout"), this.closeAndRetry(1005, "timeout", !1);
	}
	isActive() {
		return this.readyState === bp.open || this.readyState === bp.connecting;
	}
	poll() {
		let e = { Accept: "application/json" };
		this.authToken && (e["X-Phoenix-AuthToken"] = this.authToken), this.ajax("GET", e, null, () => this.ontimeout(), (e) => {
			if (e) {
				var { status: t, token: n, messages: r } = e;
				if (t === 410 && this.token !== null) {
					this.onerror(410), this.closeAndRetry(3410, "session_gone", !1);
					return;
				}
				this.token = n;
			} else t = 0;
			switch (t) {
				case 200:
					r.forEach((e) => {
						setTimeout(() => this.onmessage({ data: e }), 0);
					}), this.poll();
					break;
				case 204:
					this.poll();
					break;
				case 410:
					this.readyState = bp.open, this.onopen({}), this.poll();
					break;
				case 403:
					this.onerror(403), this.close(1008, "forbidden", !1);
					break;
				case 0:
				case 500:
					this.onerror(500), this.closeAndRetry(1011, "internal server error", 500);
					break;
				default: throw Error(`unhandled poll status ${t}`);
			}
		});
	}
	send(e) {
		typeof e != "string" && (e = Np(e)), this.currentBatch ? this.currentBatch.push(e) : this.awaitingBatchAck ? this.batchBuffer.push(e) : (this.currentBatch = [e], this.currentBatchTimer = setTimeout(() => {
			this.batchSend(this.currentBatch), this.currentBatch = null;
		}, 0));
	}
	batchSend(e, t = 0) {
		this.awaitingBatchAck = !0;
		let n = t + xp, r = e.slice(t, n);
		this.ajax("POST", { "Content-Type": "application/x-ndjson" }, r.join("\n"), () => this.ontimeout(), (t) => {
			!t || t.status !== 200 ? (this.awaitingBatchAck = !1, this.onerror(t && t.status), this.closeAndRetry(1011, "internal server error", !1)) : n < e.length ? this.batchSend(e, n) : this.batchBuffer.length > 0 ? (this.batchSend(this.batchBuffer), this.batchBuffer = []) : this.awaitingBatchAck = !1;
		});
	}
	close(e, t, n) {
		for (let e of this.reqs) e.abort();
		this.readyState = bp.closed;
		let r = Object.assign({
			code: 1e3,
			reason: void 0,
			wasClean: !0
		}, {
			code: e,
			reason: t,
			wasClean: n
		});
		this.batchBuffer = [], this.awaitingBatchAck = !1, clearTimeout(this.currentBatchTimer), this.currentBatchTimer = null, typeof CloseEvent < "u" ? this.onclose(new CloseEvent("close", r)) : this.onclose(r);
	}
	ajax(e, t, n, r, i) {
		let a;
		a = Mp.request(e, this.endpointURL(), t, n, this.timeout, () => {
			this.reqs.delete(a), r();
		}, (e) => {
			this.reqs.delete(a), this.isActive() && i(e);
		}), this.reqs.add(a);
	}
}, Fp = {
	HEADER_LENGTH: 1,
	META_LENGTH: 4,
	KINDS: {
		push: 0,
		reply: 1,
		broadcast: 2
	},
	encode(e, t) {
		if (e.payload.constructor === ArrayBuffer) return t(this.binaryEncode(e));
		{
			let n = [
				e.join_ref,
				e.ref,
				e.topic,
				e.event,
				e.payload
			];
			return t(JSON.stringify(n));
		}
	},
	decode(e, t) {
		if (e.constructor === ArrayBuffer) return t(this.binaryDecode(e));
		{
			let [n, r, i, a, o] = JSON.parse(e);
			return t({
				join_ref: n,
				ref: r,
				topic: i,
				event: a,
				payload: o
			});
		}
	},
	binaryEncode(e) {
		let { join_ref: t, ref: n, event: r, topic: i, payload: a } = e, o = new TextEncoder(), s = o.encode(t), c = o.encode(n), l = o.encode(i), u = o.encode(r);
		this.assertFieldSize(s.byteLength, "join_ref"), this.assertFieldSize(c.byteLength, "ref"), this.assertFieldSize(l.byteLength, "topic"), this.assertFieldSize(u.byteLength, "event");
		let d = this.META_LENGTH + s.byteLength + c.byteLength + l.byteLength + u.byteLength, f = new ArrayBuffer(this.HEADER_LENGTH + d), p = new Uint8Array(f), m = new DataView(f), h = 0;
		m.setUint8(h++, this.KINDS.push), m.setUint8(h++, s.byteLength), m.setUint8(h++, c.byteLength), m.setUint8(h++, l.byteLength), m.setUint8(h++, u.byteLength), p.set(s, h), h += s.byteLength, p.set(c, h), h += c.byteLength, p.set(l, h), h += l.byteLength, p.set(u, h), h += u.byteLength;
		var ee = new Uint8Array(f.byteLength + a.byteLength);
		return ee.set(p, 0), ee.set(new Uint8Array(a), f.byteLength), ee.buffer;
	},
	assertFieldSize(e, t) {
		if (e > 255) throw Error(`unable to convert ${t} to binary: must be less than or equal to 255 bytes, but is ${e} bytes`);
	},
	binaryDecode(e) {
		let t = new DataView(e), n = t.getUint8(0), r = new TextDecoder();
		switch (n) {
			case this.KINDS.push: return this.decodePush(e, t, r);
			case this.KINDS.reply: return this.decodeReply(e, t, r);
			case this.KINDS.broadcast: return this.decodeBroadcast(e, t, r);
		}
	},
	decodePush(e, t, n) {
		let r = t.getUint8(1), i = t.getUint8(2), a = t.getUint8(3), o = this.HEADER_LENGTH + this.META_LENGTH - 1, s = n.decode(e.slice(o, o + r));
		o += r;
		let c = n.decode(e.slice(o, o + i));
		o += i;
		let l = n.decode(e.slice(o, o + a));
		return o += a, {
			join_ref: s,
			ref: null,
			topic: c,
			event: l,
			payload: e.slice(o, e.byteLength)
		};
	},
	decodeReply(e, t, n) {
		let r = t.getUint8(1), i = t.getUint8(2), a = t.getUint8(3), o = t.getUint8(4), s = this.HEADER_LENGTH + this.META_LENGTH, c = n.decode(e.slice(s, s + r));
		s += r;
		let l = n.decode(e.slice(s, s + i));
		s += i;
		let u = n.decode(e.slice(s, s + a));
		s += a;
		let d = n.decode(e.slice(s, s + o));
		s += o;
		let f = {
			status: d,
			response: e.slice(s, e.byteLength)
		};
		return {
			join_ref: c,
			ref: l,
			topic: u,
			event: Tp.reply,
			payload: f
		};
	},
	decodeBroadcast(e, t, n) {
		let r = t.getUint8(1), i = t.getUint8(2), a = this.HEADER_LENGTH + 2, o = n.decode(e.slice(a, a + r));
		a += r;
		let s = n.decode(e.slice(a, a + i));
		return a += i, {
			join_ref: null,
			ref: null,
			topic: o,
			event: s,
			payload: e.slice(a, e.byteLength)
		};
	}
}, Ip = class {
	constructor(e, t = {}) {
		this.stateChangeCallbacks = {
			open: [],
			close: [],
			error: [],
			message: []
		}, this.channels = [], this.sendBuffer = [], this.ref = 0, this.fallbackRef = null, this.timeout = t.timeout || Sp, this.transport = t.transport || vp.WebSocket || Pp, this.primaryPassedHealthCheck = !1, this.longPollFallbackMs = t.longPollFallbackMs, this.fallbackTimer = null, this.sessionStore = t.sessionStorage || vp && vp.sessionStorage, this.establishedConnections = 0, this.defaultEncoder = Fp.encode.bind(Fp), this.defaultDecoder = Fp.decode.bind(Fp), this.closeWasClean = !0, this.disconnecting = !1, this.binaryType = t.binaryType || "arraybuffer", this.connectClock = 1, this.transport === Pp ? (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder) : (this.encode = t.encode || this.defaultEncoder, this.decode = t.decode || this.defaultDecoder);
		let n = null;
		_p && _p.addEventListener && (_p.addEventListener("pagehide", (e) => {
			this.conn && (this.disconnect(), n = this.connectClock);
		}), _p.addEventListener("pageshow", (e) => {
			n === this.connectClock && (n = null, this.connect());
		}), _p.addEventListener("visibilitychange", () => {
			this.handleVisibilityChange();
		}), _p.document && _p.document.addEventListener("resume", () => {
			this.handleVisibilityChange();
		})), this.heartbeatIntervalMs = t.heartbeatIntervalMs || 3e4, this.rejoinAfterMs = (e) => t.rejoinAfterMs ? t.rejoinAfterMs(e) : [
			1e3,
			2e3,
			5e3
		][e - 1] || 1e4, this.reconnectAfterMs = (e) => t.reconnectAfterMs ? t.reconnectAfterMs(e) : [
			10,
			50,
			100,
			150,
			200,
			250,
			500,
			1e3,
			2e3
		][e - 1] || 5e3, this.logger = t.logger || null, !this.logger && t.debug && (this.logger = (e, t, n) => {
			console.log(`${e}: ${t}`, n);
		}), this.longpollerTimeout = t.longpollerTimeout || 2e4, this.params = hp(t.params || {}), this.endPoint = `${e}/${Ep.websocket}`, this.vsn = t.vsn || yp, this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new Ap(() => {
			if (this.pageHidden) {
				this.log("Not reconnecting as page is hidden!"), this.teardown();
				return;
			}
			this.teardown(() => this.connect());
		}, this.reconnectAfterMs), this.authToken = t.authToken && hp(t.authToken);
	}
	get pageHidden() {
		return _p && _p.document ? _p.document.visibilityState === "hidden" : !1;
	}
	handleVisibilityChange() {
		this.pageHidden || !this.isConnected() && !this.closeWasClean && this.teardown(() => this.connect());
	}
	getLongPollTransport() {
		return Pp;
	}
	replaceTransport(e) {
		this.connectClock++, this.closeWasClean = !0, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.conn && (this.conn.close(), this.conn = null), this.transport = e;
	}
	protocol() {
		return location.protocol.match(/^https/) ? "wss" : "ws";
	}
	endPointURL() {
		let e = Mp.appendParams(Mp.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
		return e.charAt(0) === "/" ? e.charAt(1) === "/" ? `${this.protocol()}:${e}` : `${this.protocol()}://${location.host}${e}` : e;
	}
	disconnect(e, t, n) {
		this.connectClock++, this.disconnecting = !0, this.closeWasClean = !0, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.teardown(() => {
			this.disconnecting = !1, e && e();
		}, t, n);
	}
	connect(e) {
		e && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = hp(e)), (!this.conn || this.disconnecting) && (this.longPollFallbackMs && this.transport !== Pp ? this.connectWithFallback(Pp, this.longPollFallbackMs) : this.transportConnect());
	}
	log(e, t, n) {
		this.logger && this.logger(e, t, n);
	}
	hasLogger() {
		return this.logger !== null;
	}
	onOpen(e) {
		let t = this.makeRef();
		return this.stateChangeCallbacks.open.push([t, e]), t;
	}
	onClose(e) {
		let t = this.makeRef();
		return this.stateChangeCallbacks.close.push([t, e]), t;
	}
	onError(e) {
		let t = this.makeRef();
		return this.stateChangeCallbacks.error.push([t, e]), t;
	}
	onMessage(e) {
		let t = this.makeRef();
		return this.stateChangeCallbacks.message.push([t, e]), t;
	}
	ping(e) {
		if (!this.isConnected()) return !1;
		let t = this.makeRef(), n = Date.now();
		this.push({
			topic: "phoenix",
			event: "heartbeat",
			payload: {},
			ref: t
		});
		let r = this.onMessage((i) => {
			i.ref === t && (this.off([r]), e(Date.now() - n));
		});
		return !0;
	}
	transportName(e) {
		switch (e) {
			case Pp: return "LongPoll";
			default: return e.name;
		}
	}
	transportConnect() {
		this.connectClock++, this.closeWasClean = !1;
		let e;
		this.authToken && (e = ["phoenix", `${Op}${btoa(this.authToken()).replace(/=/g, "")}`]), this.conn = new this.transport(this.endPointURL(), e), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = () => this.onConnOpen(), this.conn.onerror = (e) => this.onConnError(e), this.conn.onmessage = (e) => this.onConnMessage(e), this.conn.onclose = (e) => this.onConnClose(e);
	}
	getSession(e) {
		return this.sessionStore && this.sessionStore.getItem(e);
	}
	storeSession(e, t) {
		this.sessionStore && this.sessionStore.setItem(e, t);
	}
	connectWithFallback(e, t = 2500) {
		clearTimeout(this.fallbackTimer);
		let n = !1, r = !0, i, a, o = this.transportName(e), s = (t) => {
			this.log("transport", `falling back to ${o}...`, t), this.off([i, a]), r = !1, this.replaceTransport(e), this.transportConnect();
		};
		if (this.getSession(`phx:fallback:${o}`)) return s("memorized");
		this.fallbackTimer = setTimeout(s, t), a = this.onError((e) => {
			this.log("transport", "error", e), r && !n && (clearTimeout(this.fallbackTimer), s(e));
		}), this.fallbackRef && this.off([this.fallbackRef]), this.fallbackRef = this.onOpen(() => {
			if (n = !0, !r) {
				let t = this.transportName(e);
				return this.primaryPassedHealthCheck || this.storeSession(`phx:fallback:${t}`, "true"), this.log("transport", `established ${t} fallback`);
			}
			clearTimeout(this.fallbackTimer), this.fallbackTimer = setTimeout(s, t), this.ping((e) => {
				this.log("transport", "connected to primary after", e), this.primaryPassedHealthCheck = !0, clearTimeout(this.fallbackTimer);
			});
		}), this.transportConnect();
	}
	clearHeartbeats() {
		clearTimeout(this.heartbeatTimer), clearTimeout(this.heartbeatTimeoutTimer);
	}
	onConnOpen() {
		this.hasLogger() && this.log("transport", `${this.transportName(this.transport)} connected to ${this.endPointURL()}`), this.closeWasClean = !1, this.disconnecting = !1, this.establishedConnections++, this.flushSendBuffer(), this.reconnectTimer.reset(), this.resetHeartbeat(), this.stateChangeCallbacks.open.forEach(([, e]) => e());
	}
	heartbeatTimeout() {
		this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), this.triggerChanError("heartbeat_timeout"), this.closeWasClean = !1, this.teardown(() => this.reconnectTimer.scheduleTimeout(), Cp, "heartbeat timeout"));
	}
	resetHeartbeat() {
		this.conn && this.conn.skipHeartbeat || (this.pendingHeartbeatRef = null, this.clearHeartbeats(), this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs));
	}
	teardown(e, t, n) {
		if (!this.conn) return e && e();
		let r = this.conn;
		this.waitForBufferDone(r, () => {
			t ? r.close(t, n || "") : r.close(), this.waitForSocketClosed(r, () => {
				this.conn === r && (this.conn.onopen = function() {}, this.conn.onerror = function() {}, this.conn.onmessage = function() {}, this.conn.onclose = function() {}, this.conn = null), e && e();
			});
		});
	}
	waitForBufferDone(e, t, n = 1) {
		if (n === 5 || !e.bufferedAmount) {
			t();
			return;
		}
		setTimeout(() => {
			this.waitForBufferDone(e, t, n + 1);
		}, 150 * n);
	}
	waitForSocketClosed(e, t, n = 1) {
		if (n === 5 || e.readyState === bp.closed) {
			t();
			return;
		}
		setTimeout(() => {
			this.waitForSocketClosed(e, t, n + 1);
		}, 150 * n);
	}
	onConnClose(e) {
		this.conn && (this.conn.onclose = () => {});
		let t = e && e.code;
		this.hasLogger() && this.log("transport", "close", e), this.triggerChanError("connection_closed"), this.clearHeartbeats(), !this.closeWasClean && t !== 1e3 && this.reconnectTimer.scheduleTimeout(), this.stateChangeCallbacks.close.forEach(([, t]) => t(e));
	}
	onConnError(e) {
		this.hasLogger() && this.log("transport", "error", e);
		let t = this.transport, n = this.establishedConnections;
		this.stateChangeCallbacks.error.forEach(([, r]) => {
			r(e, t, n);
		}), (t === this.transport || n > 0) && this.triggerChanError("connection_error");
	}
	triggerChanError(e) {
		this.channels.forEach((t) => {
			t.isErrored() || t.isLeaving() || t.isClosed() || t.trigger(Tp.error, {
				source: "transport",
				reason: e
			});
		});
	}
	connectionState() {
		switch (this.conn && this.conn.readyState) {
			case bp.connecting: return "connecting";
			case bp.open: return "open";
			case bp.closing: return "closing";
			default: return "closed";
		}
	}
	isConnected() {
		return this.connectionState() === "open";
	}
	remove(e) {
		this.off(e.stateChangeRefs), this.channels = this.channels.filter((t) => t !== e);
	}
	off(e) {
		for (let t in this.stateChangeCallbacks) this.stateChangeCallbacks[t] = this.stateChangeCallbacks[t].filter(([t]) => e.indexOf(t) === -1);
	}
	channel(e, t = {}) {
		let n = new jp(e, t, this);
		return this.channels.push(n), n;
	}
	push(e) {
		if (this.hasLogger()) {
			let { topic: t, event: n, payload: r, ref: i, join_ref: a } = e;
			this.log("push", `${t} ${n} (${a}, ${i})`, r);
		}
		this.isConnected() ? this.encode(e, (e) => this.conn.send(e)) : this.sendBuffer.push(() => this.encode(e, (e) => this.conn.send(e)));
	}
	makeRef() {
		let e = this.ref + 1;
		return this.ref = e === this.ref ? 0 : e, this.ref.toString();
	}
	sendHeartbeat() {
		(!this.pendingHeartbeatRef || this.isConnected()) && (this.pendingHeartbeatRef = this.makeRef(), this.push({
			topic: "phoenix",
			event: "heartbeat",
			payload: {},
			ref: this.pendingHeartbeatRef
		}), this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs));
	}
	flushSendBuffer() {
		this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e) => e()), this.sendBuffer = []);
	}
	onConnMessage(e) {
		this.decode(e.data, (e) => {
			let { topic: t, event: n, payload: r, ref: i, join_ref: a } = e;
			i && i === this.pendingHeartbeatRef && (this.clearHeartbeats(), this.pendingHeartbeatRef = null, this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs)), this.hasLogger() && this.log("receive", `${r.status || ""} ${t} ${n} ${i && "(" + i + ")" || ""}`, r);
			for (let e = 0; e < this.channels.length; e++) {
				let o = this.channels[e];
				o.isMember(t, n, r, a) && o.trigger(n, r, i, a);
			}
			for (let t = 0; t < this.stateChangeCallbacks.message.length; t++) {
				let [, n] = this.stateChangeCallbacks.message[t];
				n(e);
			}
		});
	}
	leaveOpenTopic(e) {
		let t = this.channels.find((t) => t.topic === e && (t.isJoined() || t.isJoining()));
		t && (this.hasLogger() && this.log("transport", `leaving duplicate topic "${e}"`), t.leave());
	}
}, Lp = Symbol("Let zodToJsonSchema decide on which parser to use"), Rp = {
	name: void 0,
	$refStrategy: "root",
	basePath: ["#"],
	effectStrategy: "input",
	pipeStrategy: "all",
	dateStrategy: "format:date-time",
	mapStrategy: "entries",
	removeAdditionalStrategy: "passthrough",
	allowedAdditionalProperties: !0,
	rejectedAdditionalProperties: !1,
	definitionPath: "definitions",
	target: "jsonSchema7",
	strictUnions: !1,
	definitions: {},
	errorMessages: !1,
	markdownDescription: !1,
	patternStrategy: "escape",
	applyRegexFlags: !1,
	emailStrategy: "format:email",
	base64Strategy: "contentEncoding:base64",
	nameStrategy: "ref",
	openAiAnyTypeName: "OpenAiAnyType"
}, zp = (e) => typeof e == "string" ? {
	...Rp,
	name: e
} : {
	...Rp,
	...e
}, Bp = (e) => {
	let t = zp(e), n = t.name === void 0 ? t.basePath : [
		...t.basePath,
		t.definitionPath,
		t.name
	];
	return {
		...t,
		flags: { hasReferencedOpenAiAnyType: !1 },
		currentPath: n,
		propertyPath: void 0,
		seen: new Map(Object.entries(t.definitions).map(([e, n]) => [n._def, {
			def: n._def,
			path: [
				...t.basePath,
				t.definitionPath,
				e
			],
			jsonSchema: void 0
		}]))
	};
};
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function Vp(e, t, n, r) {
	r?.errorMessages && n && (e.errorMessage = {
		...e.errorMessage,
		[t]: n
	});
}
function Hp(e, t, n, r, i) {
	e[t] = n, Vp(e, t, r, i);
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/getRelativePath.js
var Up = (e, t) => {
	let n = 0;
	for (; n < e.length && n < t.length && e[n] === t[n]; n++);
	return [(e.length - n).toString(), ...t.slice(n)].join("/");
}, Wp;
(function(e) {
	e.assertEqual = (e) => {};
	function t(e) {}
	e.assertIs = t;
	function n(e) {
		throw Error();
	}
	e.assertNever = n, e.arrayToEnum = (e) => {
		let t = {};
		for (let n of e) t[n] = n;
		return t;
	}, e.getValidEnumValues = (t) => {
		let n = e.objectKeys(t).filter((e) => typeof t[t[e]] != "number"), r = {};
		for (let e of n) r[e] = t[e];
		return e.objectValues(r);
	}, e.objectValues = (t) => e.objectKeys(t).map(function(e) {
		return t[e];
	}), e.objectKeys = typeof Object.keys == "function" ? (e) => Object.keys(e) : (e) => {
		let t = [];
		for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
		return t;
	}, e.find = (e, t) => {
		for (let n of e) if (t(n)) return n;
	}, e.isInteger = typeof Number.isInteger == "function" ? (e) => Number.isInteger(e) : (e) => typeof e == "number" && Number.isFinite(e) && Math.floor(e) === e;
	function r(e, t = " | ") {
		return e.map((e) => typeof e == "string" ? `'${e}'` : e).join(t);
	}
	e.joinValues = r, e.jsonStringifyReplacer = (e, t) => typeof t == "bigint" ? t.toString() : t;
})(Wp || (Wp = {}));
var Gp;
(function(e) {
	e.mergeShapes = (e, t) => ({
		...e,
		...t
	});
})(Gp || (Gp = {}));
var G = Wp.arrayToEnum([
	"string",
	"nan",
	"number",
	"integer",
	"float",
	"boolean",
	"date",
	"bigint",
	"symbol",
	"function",
	"undefined",
	"null",
	"array",
	"object",
	"unknown",
	"promise",
	"void",
	"never",
	"map",
	"set"
]), Kp = (e) => {
	switch (typeof e) {
		case "undefined": return G.undefined;
		case "string": return G.string;
		case "number": return Number.isNaN(e) ? G.nan : G.number;
		case "boolean": return G.boolean;
		case "function": return G.function;
		case "bigint": return G.bigint;
		case "symbol": return G.symbol;
		case "object": return Array.isArray(e) ? G.array : e === null ? G.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? G.promise : typeof Map < "u" && e instanceof Map ? G.map : typeof Set < "u" && e instanceof Set ? G.set : typeof Date < "u" && e instanceof Date ? G.date : G.object;
		default: return G.unknown;
	}
}, K = Wp.arrayToEnum([
	"invalid_type",
	"invalid_literal",
	"custom",
	"invalid_union",
	"invalid_union_discriminator",
	"invalid_enum_value",
	"unrecognized_keys",
	"invalid_arguments",
	"invalid_return_type",
	"invalid_date",
	"invalid_string",
	"too_small",
	"too_big",
	"invalid_intersection_types",
	"not_multiple_of",
	"not_finite"
]), qp = class e extends Error {
	get errors() {
		return this.issues;
	}
	constructor(e) {
		super(), this.issues = [], this.addIssue = (e) => {
			this.issues = [...this.issues, e];
		}, this.addIssues = (e = []) => {
			this.issues = [...this.issues, ...e];
		};
		let t = new.target.prototype;
		Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
	}
	format(e) {
		let t = e || function(e) {
			return e.message;
		}, n = { _errors: [] }, r = (e) => {
			for (let i of e.issues) if (i.code === "invalid_union") i.unionErrors.map(r);
			else if (i.code === "invalid_return_type") r(i.returnTypeError);
			else if (i.code === "invalid_arguments") r(i.argumentsError);
			else if (i.path.length === 0) n._errors.push(t(i));
			else {
				let e = n, r = 0;
				for (; r < i.path.length;) {
					let n = i.path[r], a = r === i.path.length - 1;
					if (n === "_errors") {
						a && e._errors.push(t(i)), r++;
						continue;
					}
					Object.prototype.hasOwnProperty.call(e, n) || (n === "__proto__" ? Object.defineProperty(e, n, {
						value: { _errors: [] },
						writable: !0,
						enumerable: !0,
						configurable: !0
					}) : e[n] = { _errors: [] }), e = e[n], a && e._errors.push(t(i)), r++;
				}
			}
		};
		return r(this), n;
	}
	static assert(t) {
		if (!(t instanceof e)) throw Error(`Not a ZodError: ${t}`);
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, Wp.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(e = (e) => e.message) {
		let t = Object.create(null), n = [];
		for (let r of this.issues) if (r.path.length > 0) {
			let n = r.path[0];
			t[n] = t[n] || [], t[n].push(e(r));
		} else n.push(e(r));
		return {
			formErrors: n,
			fieldErrors: t
		};
	}
	get formErrors() {
		return this.flatten();
	}
};
qp.create = (e) => new qp(e);
//#endregion
//#region node_modules/zod/v3/locales/en.js
var Jp = (e, t) => {
	let n;
	switch (e.code) {
		case K.invalid_type:
			n = e.received === G.undefined ? "Required" : `Expected ${e.expected}, received ${e.received}`;
			break;
		case K.invalid_literal:
			n = `Invalid literal value, expected ${JSON.stringify(e.expected, Wp.jsonStringifyReplacer)}`;
			break;
		case K.unrecognized_keys:
			n = `Unrecognized key(s) in object: ${Wp.joinValues(e.keys, ", ")}`;
			break;
		case K.invalid_union:
			n = "Invalid input";
			break;
		case K.invalid_union_discriminator:
			n = `Invalid discriminator value. Expected ${Wp.joinValues(e.options)}`;
			break;
		case K.invalid_enum_value:
			n = `Invalid enum value. Expected ${Wp.joinValues(e.options)}, received '${e.received}'`;
			break;
		case K.invalid_arguments:
			n = "Invalid function arguments";
			break;
		case K.invalid_return_type:
			n = "Invalid function return type";
			break;
		case K.invalid_date:
			n = "Invalid date";
			break;
		case K.invalid_string:
			typeof e.validation == "object" ? "includes" in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : Wp.assertNever(e.validation) : n = e.validation === "regex" ? "Invalid" : `Invalid ${e.validation}`;
			break;
		case K.too_small:
			n = e.type === "array" ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" || e.type === "bigint" ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : "Invalid input";
			break;
		case K.too_big:
			n = e.type === "array" ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : "Invalid input";
			break;
		case K.custom:
			n = "Invalid input";
			break;
		case K.invalid_intersection_types:
			n = "Intersection results could not be merged";
			break;
		case K.not_multiple_of:
			n = `Number must be a multiple of ${e.multipleOf}`;
			break;
		case K.not_finite:
			n = "Number must be finite";
			break;
		default: n = t.defaultError, Wp.assertNever(e);
	}
	return { message: n };
}, Yp = Jp;
function Xp() {
	return Yp;
}
//#endregion
//#region node_modules/zod/v3/helpers/parseUtil.js
var Zp = (e) => {
	let { data: t, path: n, errorMaps: r, issueData: i } = e, a = [...n, ...i.path || []], o = {
		...i,
		path: a
	};
	if (i.message !== void 0) return {
		...i,
		path: a,
		message: i.message
	};
	let s = "", c = r.filter((e) => !!e).slice().reverse();
	for (let e of c) s = e(o, {
		data: t,
		defaultError: s
	}).message;
	return {
		...i,
		path: a,
		message: s
	};
};
function q(e, t) {
	let n = Xp(), r = Zp({
		issueData: t,
		data: e.data,
		path: e.path,
		errorMaps: [
			e.common.contextualErrorMap,
			e.schemaErrorMap,
			n,
			n === Jp ? void 0 : Jp
		].filter((e) => !!e)
	});
	e.common.issues.push(r);
}
var Qp = class e {
	constructor() {
		this.value = "valid";
	}
	dirty() {
		this.value === "valid" && (this.value = "dirty");
	}
	abort() {
		this.value !== "aborted" && (this.value = "aborted");
	}
	static mergeArray(e, t) {
		let n = [];
		for (let r of t) {
			if (r.status === "aborted") return J;
			r.status === "dirty" && e.dirty(), n.push(r.value);
		}
		return {
			status: e.value,
			value: n
		};
	}
	static async mergeObjectAsync(t, n) {
		let r = [];
		for (let e of n) {
			let t = await e.key, n = await e.value;
			r.push({
				key: t,
				value: n
			});
		}
		return e.mergeObjectSync(t, r);
	}
	static mergeObjectSync(e, t) {
		let n = {};
		for (let r of t) {
			let { key: t, value: i } = r;
			if (t.status === "aborted" || i.status === "aborted") return J;
			t.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), t.value !== "__proto__" && (i.value !== void 0 || r.alwaysSet) && (n[t.value] = i.value);
		}
		return {
			status: e.value,
			value: n
		};
	}
}, J = Object.freeze({ status: "aborted" }), $p = (e) => ({
	status: "dirty",
	value: e
}), em = (e) => ({
	status: "valid",
	value: e
}), tm = (e) => e.status === "aborted", nm = (e) => e.status === "dirty", rm = (e) => e.status === "valid", im = (e) => typeof Promise < "u" && e instanceof Promise, Y;
(function(e) {
	e.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, e.toString = (e) => typeof e == "string" ? e : e?.message;
})(Y || (Y = {}));
//#endregion
//#region node_modules/zod/v3/types.js
var am = class {
	constructor(e, t, n, r) {
		this._cachedPath = [], this.parent = e, this.data = t, this._path = n, this._key = r;
	}
	get path() {
		return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
	}
}, om = (e, t) => {
	if (rm(t)) return {
		success: !0,
		data: t.value
	};
	if (!e.common.issues.length) throw Error("Validation failed but no issues detected.");
	return {
		success: !1,
		get error() {
			if (this._error) return this._error;
			let t = new qp(e.common.issues);
			return this._error = t, this._error;
		}
	};
};
function X(e) {
	if (!e) return {};
	let { errorMap: t, invalid_type_error: n, required_error: r, description: i } = e;
	if (t && (n || r)) throw Error("Can't use \"invalid_type_error\" or \"required_error\" in conjunction with custom error map.");
	return t ? {
		errorMap: t,
		description: i
	} : {
		errorMap: (t, i) => {
			let { message: a } = e;
			return t.code === "invalid_enum_value" ? { message: a ?? i.defaultError } : i.data === void 0 ? { message: a ?? r ?? i.defaultError } : t.code === "invalid_type" ? { message: a ?? n ?? i.defaultError } : { message: i.defaultError };
		},
		description: i
	};
}
var Z = class {
	get description() {
		return this._def.description;
	}
	_getType(e) {
		return Kp(e.data);
	}
	_getOrReturnCtx(e, t) {
		return t || {
			common: e.parent.common,
			data: e.data,
			parsedType: Kp(e.data),
			schemaErrorMap: this._def.errorMap,
			path: e.path,
			parent: e.parent
		};
	}
	_processInputParams(e) {
		return {
			status: new Qp(),
			ctx: {
				common: e.parent.common,
				data: e.data,
				parsedType: Kp(e.data),
				schemaErrorMap: this._def.errorMap,
				path: e.path,
				parent: e.parent
			}
		};
	}
	_parseSync(e) {
		let t = this._parse(e);
		if (im(t)) throw Error("Synchronous parse encountered promise.");
		return t;
	}
	_parseAsync(e) {
		let t = this._parse(e);
		return Promise.resolve(t);
	}
	parse(e, t) {
		let n = this.safeParse(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	safeParse(e, t) {
		let n = {
			common: {
				issues: [],
				async: t?.async ?? !1,
				contextualErrorMap: t?.errorMap
			},
			path: t?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: Kp(e)
		};
		return om(n, this._parseSync({
			data: e,
			path: n.path,
			parent: n
		}));
	}
	"~validate"(e) {
		let t = {
			common: {
				issues: [],
				async: !!this["~standard"].async
			},
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: Kp(e)
		};
		if (!this["~standard"].async) try {
			let n = this._parseSync({
				data: e,
				path: [],
				parent: t
			});
			return rm(n) ? { value: n.value } : { issues: t.common.issues };
		} catch (e) {
			e?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = !0), t.common = {
				issues: [],
				async: !0
			};
		}
		return this._parseAsync({
			data: e,
			path: [],
			parent: t
		}).then((e) => rm(e) ? { value: e.value } : { issues: t.common.issues });
	}
	async parseAsync(e, t) {
		let n = await this.safeParseAsync(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	async safeParseAsync(e, t) {
		let n = {
			common: {
				issues: [],
				contextualErrorMap: t?.errorMap,
				async: !0
			},
			path: t?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: Kp(e)
		}, r = this._parse({
			data: e,
			path: n.path,
			parent: n
		});
		return om(n, await (im(r) ? r : Promise.resolve(r)));
	}
	refine(e, t) {
		let n = (e) => typeof t == "string" || t === void 0 ? { message: t } : typeof t == "function" ? t(e) : t;
		return this._refinement((t, r) => {
			let i = e(t), a = () => r.addIssue({
				code: K.custom,
				...n(t)
			});
			return typeof Promise < "u" && i instanceof Promise ? i.then((e) => e ? !0 : (a(), !1)) : i ? !0 : (a(), !1);
		});
	}
	refinement(e, t) {
		return this._refinement((n, r) => e(n) ? !0 : (r.addIssue(typeof t == "function" ? t(n, r) : t), !1));
	}
	_refinement(e) {
		return new lh({
			schema: this,
			typeName: Q.ZodEffects,
			effect: {
				type: "refinement",
				refinement: e
			}
		});
	}
	superRefine(e) {
		return this._refinement(e);
	}
	constructor(e) {
		this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
			version: 1,
			vendor: "zod",
			validate: (e) => this["~validate"](e)
		};
	}
	optional() {
		return uh.create(this, this._def);
	}
	nullable() {
		return dh.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return Wm.create(this);
	}
	promise() {
		return ch.create(this, this._def);
	}
	or(e) {
		return qm.create([this, e], this._def);
	}
	and(e) {
		return Zm.create(this, e, this._def);
	}
	transform(e) {
		return new lh({
			...X(this._def),
			schema: this,
			typeName: Q.ZodEffects,
			effect: {
				type: "transform",
				transform: e
			}
		});
	}
	default(e) {
		let t = typeof e == "function" ? e : () => e;
		return new fh({
			...X(this._def),
			innerType: this,
			defaultValue: t,
			typeName: Q.ZodDefault
		});
	}
	brand() {
		return new hh({
			typeName: Q.ZodBranded,
			type: this,
			...X(this._def)
		});
	}
	catch(e) {
		let t = typeof e == "function" ? e : () => e;
		return new ph({
			...X(this._def),
			innerType: this,
			catchValue: t,
			typeName: Q.ZodCatch
		});
	}
	describe(e) {
		let t = this.constructor;
		return new t({
			...this._def,
			description: e
		});
	}
	pipe(e) {
		return gh.create(this, e);
	}
	readonly() {
		return _h.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
}, sm = /^c[^\s-]{8,}$/i, cm = /^[0-9a-z]+$/, lm = /^[0-9A-HJKMNP-TV-Z]{26}$/i, um = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, dm = /^[a-z0-9_-]{21}$/i, fm = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, pm = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, mm = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, hm = "^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$", gm, _m = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, vm = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, ym = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, bm = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, xm = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Sm = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Cm = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", wm = RegExp(`^${Cm}$`);
function Tm(e) {
	let t = "[0-5]\\d";
	e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision ?? (t = `${t}(\\.\\d+)?`);
	let n = e.precision ? "+" : "?";
	return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${n}`;
}
function Em(e) {
	return RegExp(`^${Tm(e)}$`);
}
function Dm(e) {
	let t = `${Cm}T${Tm(e)}`, n = [];
	return n.push(e.local ? "Z?" : "Z"), e.offset && n.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${n.join("|")})`, RegExp(`^${t}$`);
}
function Om(e, t) {
	return !((t !== "v4" && t || !_m.test(e)) && (t !== "v6" && t || !ym.test(e)));
}
function km(e, t) {
	if (!fm.test(e)) return !1;
	try {
		let [n] = e.split(".");
		if (!n) return !1;
		let r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), i = JSON.parse(atob(r));
		return !(typeof i != "object" || !i || "typ" in i && i?.typ !== "JWT" || !i.alg || t && i.alg !== t);
	} catch {
		return !1;
	}
}
function Am(e, t) {
	return !((t !== "v4" && t || !vm.test(e)) && (t !== "v6" && t || !bm.test(e)));
}
var jm = class e extends Z {
	_parse(e) {
		if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== G.string) {
			let t = this._getOrReturnCtx(e);
			return q(t, {
				code: K.invalid_type,
				expected: G.string,
				received: t.parsedType
			}), J;
		}
		let t = new Qp(), n;
		for (let r of this._def.checks) if (r.kind === "min") e.data.length < r.value && (n = this._getOrReturnCtx(e, n), q(n, {
			code: K.too_small,
			minimum: r.value,
			type: "string",
			inclusive: !0,
			exact: !1,
			message: r.message
		}), t.dirty());
		else if (r.kind === "max") e.data.length > r.value && (n = this._getOrReturnCtx(e, n), q(n, {
			code: K.too_big,
			maximum: r.value,
			type: "string",
			inclusive: !0,
			exact: !1,
			message: r.message
		}), t.dirty());
		else if (r.kind === "length") {
			let i = e.data.length > r.value, a = e.data.length < r.value;
			(i || a) && (n = this._getOrReturnCtx(e, n), i ? q(n, {
				code: K.too_big,
				maximum: r.value,
				type: "string",
				inclusive: !0,
				exact: !0,
				message: r.message
			}) : a && q(n, {
				code: K.too_small,
				minimum: r.value,
				type: "string",
				inclusive: !0,
				exact: !0,
				message: r.message
			}), t.dirty());
		} else if (r.kind === "email") mm.test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "email",
			code: K.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "emoji") gm || (gm = new RegExp(hm, "u")), gm.test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "emoji",
			code: K.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "uuid") um.test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "uuid",
			code: K.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "nanoid") dm.test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "nanoid",
			code: K.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "cuid") sm.test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "cuid",
			code: K.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "cuid2") cm.test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "cuid2",
			code: K.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "ulid") lm.test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "ulid",
			code: K.invalid_string,
			message: r.message
		}), t.dirty());
		else if (r.kind === "url") try {
			new URL(e.data);
		} catch {
			n = this._getOrReturnCtx(e, n), q(n, {
				validation: "url",
				code: K.invalid_string,
				message: r.message
			}), t.dirty();
		}
		else r.kind === "regex" ? (r.regex.lastIndex = 0, r.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "regex",
			code: K.invalid_string,
			message: r.message
		}), t.dirty())) : r.kind === "trim" ? e.data = e.data.trim() : r.kind === "includes" ? e.data.includes(r.value, r.position) || (n = this._getOrReturnCtx(e, n), q(n, {
			code: K.invalid_string,
			validation: {
				includes: r.value,
				position: r.position
			},
			message: r.message
		}), t.dirty()) : r.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : r.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : r.kind === "startsWith" ? e.data.startsWith(r.value) || (n = this._getOrReturnCtx(e, n), q(n, {
			code: K.invalid_string,
			validation: { startsWith: r.value },
			message: r.message
		}), t.dirty()) : r.kind === "endsWith" ? e.data.endsWith(r.value) || (n = this._getOrReturnCtx(e, n), q(n, {
			code: K.invalid_string,
			validation: { endsWith: r.value },
			message: r.message
		}), t.dirty()) : r.kind === "datetime" ? Dm(r).test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			code: K.invalid_string,
			validation: "datetime",
			message: r.message
		}), t.dirty()) : r.kind === "date" ? wm.test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			code: K.invalid_string,
			validation: "date",
			message: r.message
		}), t.dirty()) : r.kind === "time" ? Em(r).test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			code: K.invalid_string,
			validation: "time",
			message: r.message
		}), t.dirty()) : r.kind === "duration" ? pm.test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "duration",
			code: K.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "ip" ? Om(e.data, r.version) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "ip",
			code: K.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "jwt" ? km(e.data, r.alg) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "jwt",
			code: K.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "cidr" ? Am(e.data, r.version) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "cidr",
			code: K.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "base64" ? xm.test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "base64",
			code: K.invalid_string,
			message: r.message
		}), t.dirty()) : r.kind === "base64url" ? Sm.test(e.data) || (n = this._getOrReturnCtx(e, n), q(n, {
			validation: "base64url",
			code: K.invalid_string,
			message: r.message
		}), t.dirty()) : Wp.assertNever(r);
		return {
			status: t.value,
			value: e.data
		};
	}
	_regex(e, t, n) {
		return this.refinement((t) => e.test(t), {
			validation: t,
			code: K.invalid_string,
			...Y.errToObj(n)
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	email(e) {
		return this._addCheck({
			kind: "email",
			...Y.errToObj(e)
		});
	}
	url(e) {
		return this._addCheck({
			kind: "url",
			...Y.errToObj(e)
		});
	}
	emoji(e) {
		return this._addCheck({
			kind: "emoji",
			...Y.errToObj(e)
		});
	}
	uuid(e) {
		return this._addCheck({
			kind: "uuid",
			...Y.errToObj(e)
		});
	}
	nanoid(e) {
		return this._addCheck({
			kind: "nanoid",
			...Y.errToObj(e)
		});
	}
	cuid(e) {
		return this._addCheck({
			kind: "cuid",
			...Y.errToObj(e)
		});
	}
	cuid2(e) {
		return this._addCheck({
			kind: "cuid2",
			...Y.errToObj(e)
		});
	}
	ulid(e) {
		return this._addCheck({
			kind: "ulid",
			...Y.errToObj(e)
		});
	}
	base64(e) {
		return this._addCheck({
			kind: "base64",
			...Y.errToObj(e)
		});
	}
	base64url(e) {
		return this._addCheck({
			kind: "base64url",
			...Y.errToObj(e)
		});
	}
	jwt(e) {
		return this._addCheck({
			kind: "jwt",
			...Y.errToObj(e)
		});
	}
	ip(e) {
		return this._addCheck({
			kind: "ip",
			...Y.errToObj(e)
		});
	}
	cidr(e) {
		return this._addCheck({
			kind: "cidr",
			...Y.errToObj(e)
		});
	}
	datetime(e) {
		return typeof e == "string" ? this._addCheck({
			kind: "datetime",
			precision: null,
			offset: !1,
			local: !1,
			message: e
		}) : this._addCheck({
			kind: "datetime",
			precision: e?.precision === void 0 ? null : e?.precision,
			offset: e?.offset ?? !1,
			local: e?.local ?? !1,
			...Y.errToObj(e?.message)
		});
	}
	date(e) {
		return this._addCheck({
			kind: "date",
			message: e
		});
	}
	time(e) {
		return typeof e == "string" ? this._addCheck({
			kind: "time",
			precision: null,
			message: e
		}) : this._addCheck({
			kind: "time",
			precision: e?.precision === void 0 ? null : e?.precision,
			...Y.errToObj(e?.message)
		});
	}
	duration(e) {
		return this._addCheck({
			kind: "duration",
			...Y.errToObj(e)
		});
	}
	regex(e, t) {
		return this._addCheck({
			kind: "regex",
			regex: e,
			...Y.errToObj(t)
		});
	}
	includes(e, t) {
		return this._addCheck({
			kind: "includes",
			value: e,
			position: t?.position,
			...Y.errToObj(t?.message)
		});
	}
	startsWith(e, t) {
		return this._addCheck({
			kind: "startsWith",
			value: e,
			...Y.errToObj(t)
		});
	}
	endsWith(e, t) {
		return this._addCheck({
			kind: "endsWith",
			value: e,
			...Y.errToObj(t)
		});
	}
	min(e, t) {
		return this._addCheck({
			kind: "min",
			value: e,
			...Y.errToObj(t)
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: "max",
			value: e,
			...Y.errToObj(t)
		});
	}
	length(e, t) {
		return this._addCheck({
			kind: "length",
			value: e,
			...Y.errToObj(t)
		});
	}
	nonempty(e) {
		return this.min(1, Y.errToObj(e));
	}
	trim() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }]
		});
	}
	toLowerCase() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }]
		});
	}
	toUpperCase() {
		return new e({
			...this._def,
			checks: [...this._def.checks, { kind: "toUpperCase" }]
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((e) => e.kind === "datetime");
	}
	get isDate() {
		return !!this._def.checks.find((e) => e.kind === "date");
	}
	get isTime() {
		return !!this._def.checks.find((e) => e.kind === "time");
	}
	get isDuration() {
		return !!this._def.checks.find((e) => e.kind === "duration");
	}
	get isEmail() {
		return !!this._def.checks.find((e) => e.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((e) => e.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((e) => e.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((e) => e.kind === "uuid");
	}
	get isNANOID() {
		return !!this._def.checks.find((e) => e.kind === "nanoid");
	}
	get isCUID() {
		return !!this._def.checks.find((e) => e.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((e) => e.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((e) => e.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((e) => e.kind === "ip");
	}
	get isCIDR() {
		return !!this._def.checks.find((e) => e.kind === "cidr");
	}
	get isBase64() {
		return !!this._def.checks.find((e) => e.kind === "base64");
	}
	get isBase64url() {
		return !!this._def.checks.find((e) => e.kind === "base64url");
	}
	get minLength() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxLength() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
jm.create = (e) => new jm({
	checks: [],
	typeName: Q.ZodString,
	coerce: e?.coerce ?? !1,
	...X(e)
});
function Mm(e, t) {
	let n = (e.toString().split(".")[1] || "").length, r = (t.toString().split(".")[1] || "").length, i = n > r ? n : r;
	return Number.parseInt(e.toFixed(i).replace(".", "")) % Number.parseInt(t.toFixed(i).replace(".", "")) / 10 ** i;
}
var Nm = class e extends Z {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
	}
	_parse(e) {
		if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== G.number) {
			let t = this._getOrReturnCtx(e);
			return q(t, {
				code: K.invalid_type,
				expected: G.number,
				received: t.parsedType
			}), J;
		}
		let t, n = new Qp();
		for (let r of this._def.checks) r.kind === "int" ? Wp.isInteger(e.data) || (t = this._getOrReturnCtx(e, t), q(t, {
			code: K.invalid_type,
			expected: "integer",
			received: "float",
			message: r.message
		}), n.dirty()) : r.kind === "min" ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), q(t, {
			code: K.too_small,
			minimum: r.value,
			type: "number",
			inclusive: r.inclusive,
			exact: !1,
			message: r.message
		}), n.dirty()) : r.kind === "max" ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), q(t, {
			code: K.too_big,
			maximum: r.value,
			type: "number",
			inclusive: r.inclusive,
			exact: !1,
			message: r.message
		}), n.dirty()) : r.kind === "multipleOf" ? Mm(e.data, r.value) !== 0 && (t = this._getOrReturnCtx(e, t), q(t, {
			code: K.not_multiple_of,
			multipleOf: r.value,
			message: r.message
		}), n.dirty()) : r.kind === "finite" ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t), q(t, {
			code: K.not_finite,
			message: r.message
		}), n.dirty()) : Wp.assertNever(r);
		return {
			status: n.value,
			value: e.data
		};
	}
	gte(e, t) {
		return this.setLimit("min", e, !0, Y.toString(t));
	}
	gt(e, t) {
		return this.setLimit("min", e, !1, Y.toString(t));
	}
	lte(e, t) {
		return this.setLimit("max", e, !0, Y.toString(t));
	}
	lt(e, t) {
		return this.setLimit("max", e, !1, Y.toString(t));
	}
	setLimit(t, n, r, i) {
		return new e({
			...this._def,
			checks: [...this._def.checks, {
				kind: t,
				value: n,
				inclusive: r,
				message: Y.toString(i)
			}]
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	int(e) {
		return this._addCheck({
			kind: "int",
			message: Y.toString(e)
		});
	}
	positive(e) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !1,
			message: Y.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !1,
			message: Y.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !0,
			message: Y.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !0,
			message: Y.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: "multipleOf",
			value: e,
			message: Y.toString(t)
		});
	}
	finite(e) {
		return this._addCheck({
			kind: "finite",
			message: Y.toString(e)
		});
	}
	safe(e) {
		return this._addCheck({
			kind: "min",
			inclusive: !0,
			value: -(2 ** 53 - 1),
			message: Y.toString(e)
		})._addCheck({
			kind: "max",
			inclusive: !0,
			value: 2 ** 53 - 1,
			message: Y.toString(e)
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
	get isInt() {
		return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && Wp.isInteger(e.value));
	}
	get isFinite() {
		let e = null, t = null;
		for (let n of this._def.checks) if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf") return !0;
		else n.kind === "min" ? (t === null || n.value > t) && (t = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
		return Number.isFinite(t) && Number.isFinite(e);
	}
};
Nm.create = (e) => new Nm({
	checks: [],
	typeName: Q.ZodNumber,
	coerce: e?.coerce || !1,
	...X(e)
});
var Pm = class e extends Z {
	constructor() {
		super(...arguments), this.min = this.gte, this.max = this.lte;
	}
	_parse(e) {
		if (this._def.coerce) try {
			e.data = BigInt(e.data);
		} catch {
			return this._getInvalidInput(e);
		}
		if (this._getType(e) !== G.bigint) return this._getInvalidInput(e);
		let t, n = new Qp();
		for (let r of this._def.checks) r.kind === "min" ? (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), q(t, {
			code: K.too_small,
			type: "bigint",
			minimum: r.value,
			inclusive: r.inclusive,
			message: r.message
		}), n.dirty()) : r.kind === "max" ? (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), q(t, {
			code: K.too_big,
			type: "bigint",
			maximum: r.value,
			inclusive: r.inclusive,
			message: r.message
		}), n.dirty()) : r.kind === "multipleOf" ? e.data % r.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t), q(t, {
			code: K.not_multiple_of,
			multipleOf: r.value,
			message: r.message
		}), n.dirty()) : Wp.assertNever(r);
		return {
			status: n.value,
			value: e.data
		};
	}
	_getInvalidInput(e) {
		let t = this._getOrReturnCtx(e);
		return q(t, {
			code: K.invalid_type,
			expected: G.bigint,
			received: t.parsedType
		}), J;
	}
	gte(e, t) {
		return this.setLimit("min", e, !0, Y.toString(t));
	}
	gt(e, t) {
		return this.setLimit("min", e, !1, Y.toString(t));
	}
	lte(e, t) {
		return this.setLimit("max", e, !0, Y.toString(t));
	}
	lt(e, t) {
		return this.setLimit("max", e, !1, Y.toString(t));
	}
	setLimit(t, n, r, i) {
		return new e({
			...this._def,
			checks: [...this._def.checks, {
				kind: t,
				value: n,
				inclusive: r,
				message: Y.toString(i)
			}]
		});
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	positive(e) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !1,
			message: Y.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !1,
			message: Y.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !0,
			message: Y.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !0,
			message: Y.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: "multipleOf",
			value: e,
			message: Y.toString(t)
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
Pm.create = (e) => new Pm({
	checks: [],
	typeName: Q.ZodBigInt,
	coerce: e?.coerce ?? !1,
	...X(e)
});
var Fm = class extends Z {
	_parse(e) {
		if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== G.boolean) {
			let t = this._getOrReturnCtx(e);
			return q(t, {
				code: K.invalid_type,
				expected: G.boolean,
				received: t.parsedType
			}), J;
		}
		return em(e.data);
	}
};
Fm.create = (e) => new Fm({
	typeName: Q.ZodBoolean,
	coerce: e?.coerce || !1,
	...X(e)
});
var Im = class e extends Z {
	_parse(e) {
		if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== G.date) {
			let t = this._getOrReturnCtx(e);
			return q(t, {
				code: K.invalid_type,
				expected: G.date,
				received: t.parsedType
			}), J;
		}
		if (Number.isNaN(e.data.getTime())) return q(this._getOrReturnCtx(e), { code: K.invalid_date }), J;
		let t = new Qp(), n;
		for (let r of this._def.checks) r.kind === "min" ? e.data.getTime() < r.value && (n = this._getOrReturnCtx(e, n), q(n, {
			code: K.too_small,
			message: r.message,
			inclusive: !0,
			exact: !1,
			minimum: r.value,
			type: "date"
		}), t.dirty()) : r.kind === "max" ? e.data.getTime() > r.value && (n = this._getOrReturnCtx(e, n), q(n, {
			code: K.too_big,
			message: r.message,
			inclusive: !0,
			exact: !1,
			maximum: r.value,
			type: "date"
		}), t.dirty()) : Wp.assertNever(r);
		return {
			status: t.value,
			value: new Date(e.data.getTime())
		};
	}
	_addCheck(t) {
		return new e({
			...this._def,
			checks: [...this._def.checks, t]
		});
	}
	min(e, t) {
		return this._addCheck({
			kind: "min",
			value: e.getTime(),
			message: Y.toString(t)
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: "max",
			value: e.getTime(),
			message: Y.toString(t)
		});
	}
	get minDate() {
		let e = null;
		for (let t of this._def.checks) t.kind === "min" && (e === null || t.value > e) && (e = t.value);
		return e == null ? null : new Date(e);
	}
	get maxDate() {
		let e = null;
		for (let t of this._def.checks) t.kind === "max" && (e === null || t.value < e) && (e = t.value);
		return e == null ? null : new Date(e);
	}
};
Im.create = (e) => new Im({
	checks: [],
	coerce: e?.coerce || !1,
	typeName: Q.ZodDate,
	...X(e)
});
var Lm = class extends Z {
	_parse(e) {
		if (this._getType(e) !== G.symbol) {
			let t = this._getOrReturnCtx(e);
			return q(t, {
				code: K.invalid_type,
				expected: G.symbol,
				received: t.parsedType
			}), J;
		}
		return em(e.data);
	}
};
Lm.create = (e) => new Lm({
	typeName: Q.ZodSymbol,
	...X(e)
});
var Rm = class extends Z {
	_parse(e) {
		if (this._getType(e) !== G.undefined) {
			let t = this._getOrReturnCtx(e);
			return q(t, {
				code: K.invalid_type,
				expected: G.undefined,
				received: t.parsedType
			}), J;
		}
		return em(e.data);
	}
};
Rm.create = (e) => new Rm({
	typeName: Q.ZodUndefined,
	...X(e)
});
var zm = class extends Z {
	_parse(e) {
		if (this._getType(e) !== G.null) {
			let t = this._getOrReturnCtx(e);
			return q(t, {
				code: K.invalid_type,
				expected: G.null,
				received: t.parsedType
			}), J;
		}
		return em(e.data);
	}
};
zm.create = (e) => new zm({
	typeName: Q.ZodNull,
	...X(e)
});
var Bm = class extends Z {
	constructor() {
		super(...arguments), this._any = !0;
	}
	_parse(e) {
		return em(e.data);
	}
};
Bm.create = (e) => new Bm({
	typeName: Q.ZodAny,
	...X(e)
});
var Vm = class extends Z {
	constructor() {
		super(...arguments), this._unknown = !0;
	}
	_parse(e) {
		return em(e.data);
	}
};
Vm.create = (e) => new Vm({
	typeName: Q.ZodUnknown,
	...X(e)
});
var Hm = class extends Z {
	_parse(e) {
		let t = this._getOrReturnCtx(e);
		return q(t, {
			code: K.invalid_type,
			expected: G.never,
			received: t.parsedType
		}), J;
	}
};
Hm.create = (e) => new Hm({
	typeName: Q.ZodNever,
	...X(e)
});
var Um = class extends Z {
	_parse(e) {
		if (this._getType(e) !== G.undefined) {
			let t = this._getOrReturnCtx(e);
			return q(t, {
				code: K.invalid_type,
				expected: G.void,
				received: t.parsedType
			}), J;
		}
		return em(e.data);
	}
};
Um.create = (e) => new Um({
	typeName: Q.ZodVoid,
	...X(e)
});
var Wm = class e extends Z {
	_parse(e) {
		let { ctx: t, status: n } = this._processInputParams(e), r = this._def;
		if (t.parsedType !== G.array) return q(t, {
			code: K.invalid_type,
			expected: G.array,
			received: t.parsedType
		}), J;
		if (r.exactLength !== null) {
			let e = t.data.length > r.exactLength.value, i = t.data.length < r.exactLength.value;
			(e || i) && (q(t, {
				code: e ? K.too_big : K.too_small,
				minimum: i ? r.exactLength.value : void 0,
				maximum: e ? r.exactLength.value : void 0,
				type: "array",
				inclusive: !0,
				exact: !0,
				message: r.exactLength.message
			}), n.dirty());
		}
		if (r.minLength !== null && t.data.length < r.minLength.value && (q(t, {
			code: K.too_small,
			minimum: r.minLength.value,
			type: "array",
			inclusive: !0,
			exact: !1,
			message: r.minLength.message
		}), n.dirty()), r.maxLength !== null && t.data.length > r.maxLength.value && (q(t, {
			code: K.too_big,
			maximum: r.maxLength.value,
			type: "array",
			inclusive: !0,
			exact: !1,
			message: r.maxLength.message
		}), n.dirty()), t.common.async) return Promise.all([...t.data].map((e, n) => r.type._parseAsync(new am(t, e, t.path, n)))).then((e) => Qp.mergeArray(n, e));
		let i = [...t.data].map((e, n) => r.type._parseSync(new am(t, e, t.path, n)));
		return Qp.mergeArray(n, i);
	}
	get element() {
		return this._def.type;
	}
	min(t, n) {
		return new e({
			...this._def,
			minLength: {
				value: t,
				message: Y.toString(n)
			}
		});
	}
	max(t, n) {
		return new e({
			...this._def,
			maxLength: {
				value: t,
				message: Y.toString(n)
			}
		});
	}
	length(t, n) {
		return new e({
			...this._def,
			exactLength: {
				value: t,
				message: Y.toString(n)
			}
		});
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
Wm.create = (e, t) => new Wm({
	type: e,
	minLength: null,
	maxLength: null,
	exactLength: null,
	typeName: Q.ZodArray,
	...X(t)
});
function Gm(e) {
	if (e instanceof Km) {
		let t = {};
		for (let n in e.shape) {
			let r = e.shape[n];
			t[n] = uh.create(Gm(r));
		}
		return new Km({
			...e._def,
			shape: () => t
		});
	}
	return e instanceof Wm ? new Wm({
		...e._def,
		type: Gm(e.element)
	}) : e instanceof uh ? uh.create(Gm(e.unwrap())) : e instanceof dh ? dh.create(Gm(e.unwrap())) : e instanceof Qm ? Qm.create(e.items.map((e) => Gm(e))) : e;
}
var Km = class e extends Z {
	constructor() {
		super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		let e = this._def.shape(), t = Wp.objectKeys(e);
		return this._cached = {
			shape: e,
			keys: t
		}, this._cached;
	}
	_parse(e) {
		if (this._getType(e) !== G.object) {
			let t = this._getOrReturnCtx(e);
			return q(t, {
				code: K.invalid_type,
				expected: G.object,
				received: t.parsedType
			}), J;
		}
		let { status: t, ctx: n } = this._processInputParams(e), { shape: r, keys: i } = this._getCached(), a = [];
		if (!(this._def.catchall instanceof Hm && this._def.unknownKeys === "strip")) for (let e in n.data) i.includes(e) || a.push(e);
		let o = [];
		for (let e of i) {
			let t = r[e], i = n.data[e];
			o.push({
				key: {
					status: "valid",
					value: e
				},
				value: t._parse(new am(n, i, n.path, e)),
				alwaysSet: e in n.data
			});
		}
		if (this._def.catchall instanceof Hm) {
			let e = this._def.unknownKeys;
			if (e === "passthrough") for (let e of a) o.push({
				key: {
					status: "valid",
					value: e
				},
				value: {
					status: "valid",
					value: n.data[e]
				}
			});
			else if (e === "strict") a.length > 0 && (q(n, {
				code: K.unrecognized_keys,
				keys: a
			}), t.dirty());
			else if (e !== "strip") throw Error("Internal ZodObject error: invalid unknownKeys value.");
		} else {
			let e = this._def.catchall;
			for (let t of a) {
				let r = n.data[t];
				o.push({
					key: {
						status: "valid",
						value: t
					},
					value: e._parse(new am(n, r, n.path, t)),
					alwaysSet: t in n.data
				});
			}
		}
		return n.common.async ? Promise.resolve().then(async () => {
			let e = [];
			for (let t of o) {
				let n = await t.key, r = await t.value;
				e.push({
					key: n,
					value: r,
					alwaysSet: t.alwaysSet
				});
			}
			return e;
		}).then((e) => Qp.mergeObjectSync(t, e)) : Qp.mergeObjectSync(t, o);
	}
	get shape() {
		return this._def.shape();
	}
	strict(t) {
		return Y.errToObj, new e({
			...this._def,
			unknownKeys: "strict",
			...t === void 0 ? {} : { errorMap: (e, n) => {
				let r = this._def.errorMap?.(e, n).message ?? n.defaultError;
				return e.code === "unrecognized_keys" ? { message: Y.errToObj(t).message ?? r } : { message: r };
			} }
		});
	}
	strip() {
		return new e({
			...this._def,
			unknownKeys: "strip"
		});
	}
	passthrough() {
		return new e({
			...this._def,
			unknownKeys: "passthrough"
		});
	}
	extend(t) {
		return new e({
			...this._def,
			shape: () => ({
				...this._def.shape(),
				...t
			})
		});
	}
	merge(t) {
		return new e({
			unknownKeys: t._def.unknownKeys,
			catchall: t._def.catchall,
			shape: () => ({
				...this._def.shape(),
				...t._def.shape()
			}),
			typeName: Q.ZodObject
		});
	}
	setKey(e, t) {
		return this.augment({ [e]: t });
	}
	catchall(t) {
		return new e({
			...this._def,
			catchall: t
		});
	}
	pick(t) {
		let n = {};
		for (let e of Wp.objectKeys(t)) t[e] && this.shape[e] && (n[e] = this.shape[e]);
		return new e({
			...this._def,
			shape: () => n
		});
	}
	omit(t) {
		let n = {};
		for (let e of Wp.objectKeys(this.shape)) t[e] || (n[e] = this.shape[e]);
		return new e({
			...this._def,
			shape: () => n
		});
	}
	deepPartial() {
		return Gm(this);
	}
	partial(t) {
		let n = {};
		for (let e of Wp.objectKeys(this.shape)) {
			let r = this.shape[e];
			n[e] = t && !t[e] ? r : r.optional();
		}
		return new e({
			...this._def,
			shape: () => n
		});
	}
	required(t) {
		let n = {};
		for (let e of Wp.objectKeys(this.shape)) if (t && !t[e]) n[e] = this.shape[e];
		else {
			let t = this.shape[e];
			for (; t instanceof uh;) t = t._def.innerType;
			n[e] = t;
		}
		return new e({
			...this._def,
			shape: () => n
		});
	}
	keyof() {
		return ah(Wp.objectKeys(this.shape));
	}
};
Km.create = (e, t) => new Km({
	shape: () => e,
	unknownKeys: "strip",
	catchall: Hm.create(),
	typeName: Q.ZodObject,
	...X(t)
}), Km.strictCreate = (e, t) => new Km({
	shape: () => e,
	unknownKeys: "strict",
	catchall: Hm.create(),
	typeName: Q.ZodObject,
	...X(t)
}), Km.lazycreate = (e, t) => new Km({
	shape: e,
	unknownKeys: "strip",
	catchall: Hm.create(),
	typeName: Q.ZodObject,
	...X(t)
});
var qm = class extends Z {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = this._def.options;
		function r(e) {
			for (let t of e) if (t.result.status === "valid") return t.result;
			for (let n of e) if (n.result.status === "dirty") return t.common.issues.push(...n.ctx.common.issues), n.result;
			let n = e.map((e) => new qp(e.ctx.common.issues));
			return q(t, {
				code: K.invalid_union,
				unionErrors: n
			}), J;
		}
		if (t.common.async) return Promise.all(n.map(async (e) => {
			let n = {
				...t,
				common: {
					...t.common,
					issues: []
				},
				parent: null
			};
			return {
				result: await e._parseAsync({
					data: t.data,
					path: t.path,
					parent: n
				}),
				ctx: n
			};
		})).then(r);
		{
			let e, r = [];
			for (let i of n) {
				let n = {
					...t,
					common: {
						...t.common,
						issues: []
					},
					parent: null
				}, a = i._parseSync({
					data: t.data,
					path: t.path,
					parent: n
				});
				if (a.status === "valid") return a;
				a.status === "dirty" && !e && (e = {
					result: a,
					ctx: n
				}), n.common.issues.length && r.push(n.common.issues);
			}
			if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
			let i = r.map((e) => new qp(e));
			return q(t, {
				code: K.invalid_union,
				unionErrors: i
			}), J;
		}
	}
	get options() {
		return this._def.options;
	}
};
qm.create = (e, t) => new qm({
	options: e,
	typeName: Q.ZodUnion,
	...X(t)
});
var Jm = (e) => e instanceof rh ? Jm(e.schema) : e instanceof lh ? Jm(e.innerType()) : e instanceof ih ? [e.value] : e instanceof oh ? e.options : e instanceof sh ? Wp.objectValues(e.enum) : e instanceof fh ? Jm(e._def.innerType) : e instanceof Rm ? [void 0] : e instanceof zm ? [null] : e instanceof uh ? [void 0, ...Jm(e.unwrap())] : e instanceof dh ? [null, ...Jm(e.unwrap())] : e instanceof hh || e instanceof _h ? Jm(e.unwrap()) : e instanceof ph ? Jm(e._def.innerType) : [], Ym = class e extends Z {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== G.object) return q(t, {
			code: K.invalid_type,
			expected: G.object,
			received: t.parsedType
		}), J;
		let n = this.discriminator, r = t.data[n], i = this.optionsMap.get(r);
		return i ? t.common.async ? i._parseAsync({
			data: t.data,
			path: t.path,
			parent: t
		}) : i._parseSync({
			data: t.data,
			path: t.path,
			parent: t
		}) : (q(t, {
			code: K.invalid_union_discriminator,
			options: Array.from(this.optionsMap.keys()),
			path: [n]
		}), J);
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	static create(t, n, r) {
		let i = /* @__PURE__ */ new Map();
		for (let e of n) {
			let n = Jm(e.shape[t]);
			if (!n.length) throw Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
			for (let r of n) {
				if (i.has(r)) throw Error(`Discriminator property ${String(t)} has duplicate value ${String(r)}`);
				i.set(r, e);
			}
		}
		return new e({
			typeName: Q.ZodDiscriminatedUnion,
			discriminator: t,
			options: n,
			optionsMap: i,
			...X(r)
		});
	}
};
function Xm(e, t) {
	let n = Kp(e), r = Kp(t);
	if (e === t) return {
		valid: !0,
		data: e
	};
	if (n === G.object && r === G.object) {
		let n = Wp.objectKeys(t), r = Wp.objectKeys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
		for (let n of r) {
			if (n === "__proto__") continue;
			let r = Xm(e[n], t[n]);
			if (!r.valid) return { valid: !1 };
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (n === G.array && r === G.array) {
		if (e.length !== t.length) return { valid: !1 };
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = Xm(i, a);
			if (!o.valid) return { valid: !1 };
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return n === G.date && r === G.date && +e == +t ? {
		valid: !0,
		data: e
	} : { valid: !1 };
}
var Zm = class extends Z {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e), r = (e, r) => {
			if (tm(e) || tm(r)) return J;
			let i = Xm(e.value, r.value);
			return i.valid ? ((nm(e) || nm(r)) && t.dirty(), {
				status: t.value,
				value: i.data
			}) : (q(n, { code: K.invalid_intersection_types }), J);
		};
		return n.common.async ? Promise.all([this._def.left._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		}), this._def.right._parseAsync({
			data: n.data,
			path: n.path,
			parent: n
		})]).then(([e, t]) => r(e, t)) : r(this._def.left._parseSync({
			data: n.data,
			path: n.path,
			parent: n
		}), this._def.right._parseSync({
			data: n.data,
			path: n.path,
			parent: n
		}));
	}
};
Zm.create = (e, t, n) => new Zm({
	left: e,
	right: t,
	typeName: Q.ZodIntersection,
	...X(n)
});
var Qm = class e extends Z {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== G.array) return q(n, {
			code: K.invalid_type,
			expected: G.array,
			received: n.parsedType
		}), J;
		if (n.data.length < this._def.items.length) return q(n, {
			code: K.too_small,
			minimum: this._def.items.length,
			inclusive: !0,
			exact: !1,
			type: "array"
		}), J;
		!this._def.rest && n.data.length > this._def.items.length && (q(n, {
			code: K.too_big,
			maximum: this._def.items.length,
			inclusive: !0,
			exact: !1,
			type: "array"
		}), t.dirty());
		let r = [...n.data].map((e, t) => {
			let r = this._def.items[t] || this._def.rest;
			return r ? r._parse(new am(n, e, n.path, t)) : null;
		}).filter((e) => !!e);
		return n.common.async ? Promise.all(r).then((e) => Qp.mergeArray(t, e)) : Qp.mergeArray(t, r);
	}
	get items() {
		return this._def.items;
	}
	rest(t) {
		return new e({
			...this._def,
			rest: t
		});
	}
};
Qm.create = (e, t) => {
	if (!Array.isArray(e)) throw Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new Qm({
		items: e,
		typeName: Q.ZodTuple,
		rest: null,
		...X(t)
	});
};
var $m = class e extends Z {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== G.object) return q(n, {
			code: K.invalid_type,
			expected: G.object,
			received: n.parsedType
		}), J;
		let r = [], i = this._def.keyType, a = this._def.valueType;
		for (let e in n.data) r.push({
			key: i._parse(new am(n, e, n.path, e)),
			value: a._parse(new am(n, n.data[e], n.path, e)),
			alwaysSet: e in n.data
		});
		return n.common.async ? Qp.mergeObjectAsync(t, r) : Qp.mergeObjectSync(t, r);
	}
	get element() {
		return this._def.valueType;
	}
	static create(t, n, r) {
		return n instanceof Z ? new e({
			keyType: t,
			valueType: n,
			typeName: Q.ZodRecord,
			...X(r)
		}) : new e({
			keyType: jm.create(),
			valueType: t,
			typeName: Q.ZodRecord,
			...X(n)
		});
	}
}, eh = class extends Z {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== G.map) return q(n, {
			code: K.invalid_type,
			expected: G.map,
			received: n.parsedType
		}), J;
		let r = this._def.keyType, i = this._def.valueType, a = [...n.data.entries()].map(([e, t], a) => ({
			key: r._parse(new am(n, e, n.path, [a, "key"])),
			value: i._parse(new am(n, t, n.path, [a, "value"]))
		}));
		if (n.common.async) {
			let e = /* @__PURE__ */ new Map();
			return Promise.resolve().then(async () => {
				for (let n of a) {
					let r = await n.key, i = await n.value;
					if (r.status === "aborted" || i.status === "aborted") return J;
					(r.status === "dirty" || i.status === "dirty") && t.dirty(), e.set(r.value, i.value);
				}
				return {
					status: t.value,
					value: e
				};
			});
		}
		{
			let e = /* @__PURE__ */ new Map();
			for (let n of a) {
				let r = n.key, i = n.value;
				if (r.status === "aborted" || i.status === "aborted") return J;
				(r.status === "dirty" || i.status === "dirty") && t.dirty(), e.set(r.value, i.value);
			}
			return {
				status: t.value,
				value: e
			};
		}
	}
};
eh.create = (e, t, n) => new eh({
	valueType: t,
	keyType: e,
	typeName: Q.ZodMap,
	...X(n)
});
var th = class e extends Z {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== G.set) return q(n, {
			code: K.invalid_type,
			expected: G.set,
			received: n.parsedType
		}), J;
		let r = this._def;
		r.minSize !== null && n.data.size < r.minSize.value && (q(n, {
			code: K.too_small,
			minimum: r.minSize.value,
			type: "set",
			inclusive: !0,
			exact: !1,
			message: r.minSize.message
		}), t.dirty()), r.maxSize !== null && n.data.size > r.maxSize.value && (q(n, {
			code: K.too_big,
			maximum: r.maxSize.value,
			type: "set",
			inclusive: !0,
			exact: !1,
			message: r.maxSize.message
		}), t.dirty());
		let i = this._def.valueType;
		function a(e) {
			let n = /* @__PURE__ */ new Set();
			for (let r of e) {
				if (r.status === "aborted") return J;
				r.status === "dirty" && t.dirty(), n.add(r.value);
			}
			return {
				status: t.value,
				value: n
			};
		}
		let o = [...n.data.values()].map((e, t) => i._parse(new am(n, e, n.path, t)));
		return n.common.async ? Promise.all(o).then((e) => a(e)) : a(o);
	}
	min(t, n) {
		return new e({
			...this._def,
			minSize: {
				value: t,
				message: Y.toString(n)
			}
		});
	}
	max(t, n) {
		return new e({
			...this._def,
			maxSize: {
				value: t,
				message: Y.toString(n)
			}
		});
	}
	size(e, t) {
		return this.min(e, t).max(e, t);
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
th.create = (e, t) => new th({
	valueType: e,
	minSize: null,
	maxSize: null,
	typeName: Q.ZodSet,
	...X(t)
});
var nh = class e extends Z {
	constructor() {
		super(...arguments), this.validate = this.implement;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== G.function) return q(t, {
			code: K.invalid_type,
			expected: G.function,
			received: t.parsedType
		}), J;
		function n(e, n) {
			return Zp({
				data: e,
				path: t.path,
				errorMaps: [
					t.common.contextualErrorMap,
					t.schemaErrorMap,
					Xp(),
					Jp
				].filter((e) => !!e),
				issueData: {
					code: K.invalid_arguments,
					argumentsError: n
				}
			});
		}
		function r(e, n) {
			return Zp({
				data: e,
				path: t.path,
				errorMaps: [
					t.common.contextualErrorMap,
					t.schemaErrorMap,
					Xp(),
					Jp
				].filter((e) => !!e),
				issueData: {
					code: K.invalid_return_type,
					returnTypeError: n
				}
			});
		}
		let i = { errorMap: t.common.contextualErrorMap }, a = t.data;
		if (this._def.returns instanceof ch) {
			let e = this;
			return em(async function(...t) {
				let o = new qp([]), s = await e._def.args.parseAsync(t, i).catch((e) => {
					throw o.addIssue(n(t, e)), o;
				}), c = await Reflect.apply(a, this, s);
				return await e._def.returns._def.type.parseAsync(c, i).catch((e) => {
					throw o.addIssue(r(c, e)), o;
				});
			});
		}
		{
			let e = this;
			return em(function(...t) {
				let o = e._def.args.safeParse(t, i);
				if (!o.success) throw new qp([n(t, o.error)]);
				let s = Reflect.apply(a, this, o.data), c = e._def.returns.safeParse(s, i);
				if (!c.success) throw new qp([r(s, c.error)]);
				return c.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...t) {
		return new e({
			...this._def,
			args: Qm.create(t).rest(Vm.create())
		});
	}
	returns(t) {
		return new e({
			...this._def,
			returns: t
		});
	}
	implement(e) {
		return this.parse(e);
	}
	strictImplement(e) {
		return this.parse(e);
	}
	static create(t, n, r) {
		return new e({
			args: t || Qm.create([]).rest(Vm.create()),
			returns: n || Vm.create(),
			typeName: Q.ZodFunction,
			...X(r)
		});
	}
}, rh = class extends Z {
	get schema() {
		return this._def.getter();
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return this._def.getter()._parse({
			data: t.data,
			path: t.path,
			parent: t
		});
	}
};
rh.create = (e, t) => new rh({
	getter: e,
	typeName: Q.ZodLazy,
	...X(t)
});
var ih = class extends Z {
	_parse(e) {
		if (e.data !== this._def.value) {
			let t = this._getOrReturnCtx(e);
			return q(t, {
				received: t.data,
				code: K.invalid_literal,
				expected: this._def.value
			}), J;
		}
		return {
			status: "valid",
			value: e.data
		};
	}
	get value() {
		return this._def.value;
	}
};
ih.create = (e, t) => new ih({
	value: e,
	typeName: Q.ZodLiteral,
	...X(t)
});
function ah(e, t) {
	return new oh({
		values: e,
		typeName: Q.ZodEnum,
		...X(t)
	});
}
var oh = class e extends Z {
	_parse(e) {
		if (typeof e.data != "string") {
			let t = this._getOrReturnCtx(e), n = this._def.values;
			return q(t, {
				expected: Wp.joinValues(n),
				received: t.parsedType,
				code: K.invalid_type
			}), J;
		}
		if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
			let t = this._getOrReturnCtx(e), n = this._def.values;
			return q(t, {
				received: t.data,
				code: K.invalid_enum_value,
				options: n
			}), J;
		}
		return em(e.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Values() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	extract(t, n = this._def) {
		return e.create(t, {
			...this._def,
			...n
		});
	}
	exclude(t, n = this._def) {
		return e.create(this.options.filter((e) => !t.includes(e)), {
			...this._def,
			...n
		});
	}
};
oh.create = ah;
var sh = class extends Z {
	_parse(e) {
		let t = Wp.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
		if (n.parsedType !== G.string && n.parsedType !== G.number) {
			let e = Wp.objectValues(t);
			return q(n, {
				expected: Wp.joinValues(e),
				received: n.parsedType,
				code: K.invalid_type
			}), J;
		}
		if (this._cache || (this._cache = new Set(Wp.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
			let e = Wp.objectValues(t);
			return q(n, {
				received: n.data,
				code: K.invalid_enum_value,
				options: e
			}), J;
		}
		return em(e.data);
	}
	get enum() {
		return this._def.values;
	}
};
sh.create = (e, t) => new sh({
	values: e,
	typeName: Q.ZodNativeEnum,
	...X(t)
});
var ch = class extends Z {
	unwrap() {
		return this._def.type;
	}
	_parse(e) {
		let { ctx: t } = this._processInputParams(e);
		return t.parsedType !== G.promise && t.common.async === !1 ? (q(t, {
			code: K.invalid_type,
			expected: G.promise,
			received: t.parsedType
		}), J) : em((t.parsedType === G.promise ? t.data : Promise.resolve(t.data)).then((e) => this._def.type.parseAsync(e, {
			path: t.path,
			errorMap: t.common.contextualErrorMap
		})));
	}
};
ch.create = (e, t) => new ch({
	type: e,
	typeName: Q.ZodPromise,
	...X(t)
});
var lh = class extends Z {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === Q.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
	}
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e), r = this._def.effect || null, i = {
			addIssue: (e) => {
				q(n, e), e.fatal ? t.abort() : t.dirty();
			},
			get path() {
				return n.path;
			}
		};
		if (i.addIssue = i.addIssue.bind(i), r.type === "preprocess") {
			let e = r.transform(n.data, i);
			if (n.common.async) return Promise.resolve(e).then(async (e) => {
				if (t.value === "aborted") return J;
				let r = await this._def.schema._parseAsync({
					data: e,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? J : r.status === "dirty" || t.value === "dirty" ? $p(r.value) : r;
			});
			{
				if (t.value === "aborted") return J;
				let r = this._def.schema._parseSync({
					data: e,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? J : r.status === "dirty" || t.value === "dirty" ? $p(r.value) : r;
			}
		}
		if (r.type === "refinement") {
			let e = (e) => {
				let t = r.refinement(e, i);
				if (n.common.async) return Promise.resolve(t);
				if (t instanceof Promise) throw Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
				return e;
			};
			if (n.common.async === !1) {
				let r = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n
				});
				return r.status === "aborted" ? J : (r.status === "dirty" && t.dirty(), e(r.value), {
					status: t.value,
					value: r.value
				});
			}
			return this._def.schema._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			}).then((n) => n.status === "aborted" ? J : (n.status === "dirty" && t.dirty(), e(n.value).then(() => ({
				status: t.value,
				value: n.value
			}))));
		}
		if (r.type === "transform") {
			if (n.common.async === !1) {
				let e = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n
				});
				if (!rm(e)) return J;
				let a = r.transform(e.value, i);
				if (a instanceof Promise) throw Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
				return {
					status: t.value,
					value: a
				};
			}
			return this._def.schema._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			}).then((e) => rm(e) ? Promise.resolve(r.transform(e.value, i)).then((e) => ({
				status: t.value,
				value: e
			})) : J);
		}
		Wp.assertNever(r);
	}
};
lh.create = (e, t, n) => new lh({
	schema: e,
	typeName: Q.ZodEffects,
	effect: t,
	...X(n)
}), lh.createWithPreprocess = (e, t, n) => new lh({
	schema: t,
	effect: {
		type: "preprocess",
		transform: e
	},
	typeName: Q.ZodEffects,
	...X(n)
});
var uh = class extends Z {
	_parse(e) {
		return this._getType(e) === G.undefined ? em(void 0) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
uh.create = (e, t) => new uh({
	innerType: e,
	typeName: Q.ZodOptional,
	...X(t)
});
var dh = class extends Z {
	_parse(e) {
		return this._getType(e) === G.null ? em(null) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
dh.create = (e, t) => new dh({
	innerType: e,
	typeName: Q.ZodNullable,
	...X(t)
});
var fh = class extends Z {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = t.data;
		return t.parsedType === G.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
			data: n,
			path: t.path,
			parent: t
		});
	}
	removeDefault() {
		return this._def.innerType;
	}
};
fh.create = (e, t) => new fh({
	innerType: e,
	typeName: Q.ZodDefault,
	defaultValue: typeof t.default == "function" ? t.default : () => t.default,
	...X(t)
});
var ph = class extends Z {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = {
			...t,
			common: {
				...t.common,
				issues: []
			}
		}, r = this._def.innerType._parse({
			data: n.data,
			path: n.path,
			parent: { ...n }
		});
		return im(r) ? r.then((e) => ({
			status: "valid",
			value: e.status === "valid" ? e.value : this._def.catchValue({
				get error() {
					return new qp(n.common.issues);
				},
				input: n.data
			})
		})) : {
			status: "valid",
			value: r.status === "valid" ? r.value : this._def.catchValue({
				get error() {
					return new qp(n.common.issues);
				},
				input: n.data
			})
		};
	}
	removeCatch() {
		return this._def.innerType;
	}
};
ph.create = (e, t) => new ph({
	innerType: e,
	typeName: Q.ZodCatch,
	catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
	...X(t)
});
var mh = class extends Z {
	_parse(e) {
		if (this._getType(e) !== G.nan) {
			let t = this._getOrReturnCtx(e);
			return q(t, {
				code: K.invalid_type,
				expected: G.nan,
				received: t.parsedType
			}), J;
		}
		return {
			status: "valid",
			value: e.data
		};
	}
};
mh.create = (e) => new mh({
	typeName: Q.ZodNaN,
	...X(e)
});
var hh = class extends Z {
	_parse(e) {
		let { ctx: t } = this._processInputParams(e), n = t.data;
		return this._def.type._parse({
			data: n,
			path: t.path,
			parent: t
		});
	}
	unwrap() {
		return this._def.type;
	}
}, gh = class e extends Z {
	_parse(e) {
		let { status: t, ctx: n } = this._processInputParams(e);
		if (n.common.async) return (async () => {
			let e = await this._def.in._parseAsync({
				data: n.data,
				path: n.path,
				parent: n
			});
			return e.status === "aborted" ? J : e.status === "dirty" ? (t.dirty(), $p(e.value)) : this._def.out._parseAsync({
				data: e.value,
				path: n.path,
				parent: n
			});
		})();
		{
			let e = this._def.in._parseSync({
				data: n.data,
				path: n.path,
				parent: n
			});
			return e.status === "aborted" ? J : e.status === "dirty" ? (t.dirty(), {
				status: "dirty",
				value: e.value
			}) : this._def.out._parseSync({
				data: e.value,
				path: n.path,
				parent: n
			});
		}
	}
	static create(t, n) {
		return new e({
			in: t,
			out: n,
			typeName: Q.ZodPipeline
		});
	}
}, _h = class extends Z {
	_parse(e) {
		let t = this._def.innerType._parse(e), n = (e) => (rm(e) && (e.value = Object.freeze(e.value)), e);
		return im(t) ? t.then((e) => n(e)) : n(t);
	}
	unwrap() {
		return this._def.innerType;
	}
};
_h.create = (e, t) => new _h({
	innerType: e,
	typeName: Q.ZodReadonly,
	...X(t)
}), Km.lazycreate;
var Q;
(function(e) {
	e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
})(Q || (Q = {})), jm.create, Nm.create, mh.create, Pm.create, Fm.create, Im.create, Lm.create, Rm.create, zm.create, Bm.create, Vm.create, Hm.create, Um.create, Wm.create, Km.create, Km.strictCreate, qm.create, Ym.create, Zm.create, Qm.create, $m.create, eh.create, th.create, nh.create, rh.create, ih.create, oh.create, sh.create, ch.create, lh.create, uh.create, dh.create, lh.createWithPreprocess, gh.create;
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function vh(e) {
	if (e.target !== "openAi") return {};
	let t = [
		...e.basePath,
		e.definitionPath,
		e.openAiAnyTypeName
	];
	return e.flags.hasReferencedOpenAiAnyType = !0, { $ref: e.$refStrategy === "relative" ? Up(t, e.currentPath) : t.join("/") };
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/array.js
function yh(e, t) {
	let n = { type: "array" };
	return e.type?._def && e.type?._def?.typeName !== Q.ZodAny && (n.items = lg(e.type._def, {
		...t,
		currentPath: [...t.currentPath, "items"]
	})), e.minLength && Hp(n, "minItems", e.minLength.value, e.minLength.message, t), e.maxLength && Hp(n, "maxItems", e.maxLength.value, e.maxLength.message, t), e.exactLength && (Hp(n, "minItems", e.exactLength.value, e.exactLength.message, t), Hp(n, "maxItems", e.exactLength.value, e.exactLength.message, t)), n;
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function bh(e, t) {
	let n = {
		type: "integer",
		format: "int64"
	};
	if (!e.checks) return n;
	for (let r of e.checks) switch (r.kind) {
		case "min":
			t.target === "jsonSchema7" ? r.inclusive ? Hp(n, "minimum", r.value, r.message, t) : Hp(n, "exclusiveMinimum", r.value, r.message, t) : (r.inclusive || (n.exclusiveMinimum = !0), Hp(n, "minimum", r.value, r.message, t));
			break;
		case "max":
			t.target === "jsonSchema7" ? r.inclusive ? Hp(n, "maximum", r.value, r.message, t) : Hp(n, "exclusiveMaximum", r.value, r.message, t) : (r.inclusive || (n.exclusiveMaximum = !0), Hp(n, "maximum", r.value, r.message, t));
			break;
		case "multipleOf": Hp(n, "multipleOf", r.value, r.message, t);
	}
	return n;
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function xh() {
	return { type: "boolean" };
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function Sh(e, t) {
	return lg(e.type._def, t);
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var Ch = (e, t) => lg(e.innerType._def, t);
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function wh(e, t, n) {
	let r = n ?? t.dateStrategy;
	if (Array.isArray(r)) return { anyOf: r.map((n, r) => wh(e, t, n)) };
	switch (r) {
		case "string":
		case "format:date-time": return {
			type: "string",
			format: "date-time"
		};
		case "format:date": return {
			type: "string",
			format: "date"
		};
		case "integer": return Th(e, t);
	}
}
var Th = (e, t) => {
	let n = {
		type: "integer",
		format: "unix-time"
	};
	if (t.target === "openApi3") return n;
	for (let r of e.checks) switch (r.kind) {
		case "min":
			Hp(n, "minimum", r.value, r.message, t);
			break;
		case "max": Hp(n, "maximum", r.value, r.message, t);
	}
	return n;
};
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function Eh(e, t) {
	return {
		...lg(e.innerType._def, t),
		default: e.defaultValue()
	};
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function Dh(e, t) {
	return t.effectStrategy === "input" ? lg(e.schema._def, t) : vh(t);
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function Oh(e) {
	return {
		type: "string",
		enum: Array.from(e.values)
	};
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
var kh = (e) => "type" in e && e.type === "string" ? !1 : "allOf" in e;
function Ah(e, t) {
	let n = [lg(e.left._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"allOf",
			"0"
		]
	}), lg(e.right._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"allOf",
			"1"
		]
	})].filter((e) => !!e), r = t.target === "jsonSchema2019-09" ? { unevaluatedProperties: !1 } : void 0, i = [];
	return n.forEach((e) => {
		if (kh(e)) i.push(...e.allOf), e.unevaluatedProperties === void 0 && (r = void 0);
		else {
			let t = e;
			if ("additionalProperties" in e && e.additionalProperties === !1) {
				let { additionalProperties: n, ...r } = e;
				t = r;
			} else r = void 0;
			i.push(t);
		}
	}), i.length ? {
		allOf: i,
		...r
	} : void 0;
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function jh(e, t) {
	let n = typeof e.value;
	return n !== "bigint" && n !== "number" && n !== "boolean" && n !== "string" ? { type: Array.isArray(e.value) ? "array" : "object" } : t.target === "openApi3" ? {
		type: n === "bigint" ? "integer" : n,
		enum: [e.value]
	} : {
		type: n === "bigint" ? "integer" : n,
		const: e.value
	};
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/string.js
var Mh = void 0, Nh = {
	cuid: /^[cC][^\s-]{8,}$/,
	cuid2: /^[0-9a-z]+$/,
	ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
	email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
	emoji: () => (Mh === void 0 && (Mh = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), Mh),
	uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
	ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
	ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
	ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
	base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
	nanoid: /^[a-zA-Z0-9_-]{21}$/,
	jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function Ph(e, t) {
	let n = { type: "string" };
	if (e.checks) for (let r of e.checks) switch (r.kind) {
		case "min":
			Hp(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, t);
			break;
		case "max":
			Hp(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, t);
			break;
		case "email":
			switch (t.emailStrategy) {
				case "format:email":
					Rh(n, "email", r.message, t);
					break;
				case "format:idn-email":
					Rh(n, "idn-email", r.message, t);
					break;
				case "pattern:zod": zh(n, Nh.email, r.message, t);
			}
			break;
		case "url":
			Rh(n, "uri", r.message, t);
			break;
		case "uuid":
			Rh(n, "uuid", r.message, t);
			break;
		case "regex":
			zh(n, r.regex, r.message, t);
			break;
		case "cuid":
			zh(n, Nh.cuid, r.message, t);
			break;
		case "cuid2":
			zh(n, Nh.cuid2, r.message, t);
			break;
		case "startsWith":
			zh(n, RegExp(`^${Fh(r.value, t)}`), r.message, t);
			break;
		case "endsWith":
			zh(n, RegExp(`${Fh(r.value, t)}$`), r.message, t);
			break;
		case "datetime":
			Rh(n, "date-time", r.message, t);
			break;
		case "date":
			Rh(n, "date", r.message, t);
			break;
		case "time":
			Rh(n, "time", r.message, t);
			break;
		case "duration":
			Rh(n, "duration", r.message, t);
			break;
		case "length":
			Hp(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, t), Hp(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, t);
			break;
		case "includes":
			zh(n, RegExp(Fh(r.value, t)), r.message, t);
			break;
		case "ip":
			r.version !== "v6" && Rh(n, "ipv4", r.message, t), r.version !== "v4" && Rh(n, "ipv6", r.message, t);
			break;
		case "base64url":
			zh(n, Nh.base64url, r.message, t);
			break;
		case "jwt":
			zh(n, Nh.jwt, r.message, t);
			break;
		case "cidr":
			r.version !== "v6" && zh(n, Nh.ipv4Cidr, r.message, t), r.version !== "v4" && zh(n, Nh.ipv6Cidr, r.message, t);
			break;
		case "emoji":
			zh(n, Nh.emoji(), r.message, t);
			break;
		case "ulid":
			zh(n, Nh.ulid, r.message, t);
			break;
		case "base64":
			switch (t.base64Strategy) {
				case "format:binary":
					Rh(n, "binary", r.message, t);
					break;
				case "contentEncoding:base64":
					Hp(n, "contentEncoding", "base64", r.message, t);
					break;
				case "pattern:zod": zh(n, Nh.base64, r.message, t);
			}
			break;
		case "nanoid": zh(n, Nh.nanoid, r.message, t);
	}
	return n;
}
function Fh(e, t) {
	return t.patternStrategy === "escape" ? Lh(e) : e;
}
var Ih = /* @__PURE__ */ new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function Lh(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) Ih.has(e[n]) || (t += "\\"), t += e[n];
	return t;
}
function Rh(e, t, n, r) {
	e.format || e.anyOf?.some((e) => e.format) ? (e.anyOf || (e.anyOf = []), e.format && (e.anyOf.push({
		format: e.format,
		...e.errorMessage && r.errorMessages && { errorMessage: { format: e.errorMessage.format } }
	}), delete e.format, e.errorMessage && (delete e.errorMessage.format, Object.keys(e.errorMessage).length === 0 && delete e.errorMessage)), e.anyOf.push({
		format: t,
		...n && r.errorMessages && { errorMessage: { format: n } }
	})) : Hp(e, "format", t, n, r);
}
function zh(e, t, n, r) {
	e.pattern || e.allOf?.some((e) => e.pattern) ? (e.allOf || (e.allOf = []), e.pattern && (e.allOf.push({
		pattern: e.pattern,
		...e.errorMessage && r.errorMessages && { errorMessage: { pattern: e.errorMessage.pattern } }
	}), delete e.pattern, e.errorMessage && (delete e.errorMessage.pattern, Object.keys(e.errorMessage).length === 0 && delete e.errorMessage)), e.allOf.push({
		pattern: Bh(t, r),
		...n && r.errorMessages && { errorMessage: { pattern: n } }
	})) : Hp(e, "pattern", Bh(t, r), n, r);
}
function Bh(e, t) {
	if (!t.applyRegexFlags || !e.flags) return e.source;
	let n = {
		i: e.flags.includes("i"),
		m: e.flags.includes("m"),
		s: e.flags.includes("s")
	}, r = n.i ? e.source.toLowerCase() : e.source, i = "", a = !1, o = !1, s = !1;
	for (let e = 0; e < r.length; e++) {
		if (a) {
			i += r[e], a = !1;
			continue;
		}
		if (n.i) {
			if (o) {
				if (r[e].match(/[a-z]/)) {
					s ? (i += r[e], i += `${r[e - 2]}-${r[e]}`.toUpperCase(), s = !1) : r[e + 1] === "-" && r[e + 2]?.match(/[a-z]/) ? (i += r[e], s = !0) : i += `${r[e]}${r[e].toUpperCase()}`;
					continue;
				}
			} else if (r[e].match(/[a-z]/)) {
				i += `[${r[e]}${r[e].toUpperCase()}]`;
				continue;
			}
		}
		if (n.m) {
			if (r[e] === "^") {
				i += "(^|(?<=[\r\n]))";
				continue;
			}
			if (r[e] === "$") {
				i += "($|(?=[\r\n]))";
				continue;
			}
		}
		if (n.s && r[e] === ".") {
			i += o ? `${r[e]}\r\n` : `[${r[e]}\r\n]`;
			continue;
		}
		i += r[e], r[e] === "\\" ? a = !0 : o && r[e] === "]" ? o = !1 : !o && r[e] === "[" && (o = !0);
	}
	try {
		new RegExp(i);
	} catch {
		return console.warn(`Could not convert regex pattern at ${t.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`), e.source;
	}
	return i;
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function Vh(e, t) {
	if (t.target === "openAi" && console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead."), t.target === "openApi3" && e.keyType?._def.typeName === Q.ZodEnum) return {
		type: "object",
		required: e.keyType._def.values,
		properties: e.keyType._def.values.reduce((n, r) => ({
			...n,
			[r]: lg(e.valueType._def, {
				...t,
				currentPath: [
					...t.currentPath,
					"properties",
					r
				]
			}) ?? vh(t)
		}), {}),
		additionalProperties: t.rejectedAdditionalProperties
	};
	let n = {
		type: "object",
		additionalProperties: lg(e.valueType._def, {
			...t,
			currentPath: [...t.currentPath, "additionalProperties"]
		}) ?? t.allowedAdditionalProperties
	};
	if (t.target === "openApi3") return n;
	if (e.keyType?._def.typeName === Q.ZodString && e.keyType._def.checks?.length) {
		let { type: r, ...i } = Ph(e.keyType._def, t);
		return {
			...n,
			propertyNames: i
		};
	}
	if (e.keyType?._def.typeName === Q.ZodEnum) return {
		...n,
		propertyNames: { enum: e.keyType._def.values }
	};
	if (e.keyType?._def.typeName === Q.ZodBranded && e.keyType._def.type._def.typeName === Q.ZodString && e.keyType._def.type._def.checks?.length) {
		let { type: r, ...i } = Sh(e.keyType._def, t);
		return {
			...n,
			propertyNames: i
		};
	}
	return n;
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function Hh(e, t) {
	return t.mapStrategy === "record" ? Vh(e, t) : {
		type: "array",
		maxItems: 125,
		items: {
			type: "array",
			items: [lg(e.keyType._def, {
				...t,
				currentPath: [
					...t.currentPath,
					"items",
					"items",
					"0"
				]
			}) || vh(t), lg(e.valueType._def, {
				...t,
				currentPath: [
					...t.currentPath,
					"items",
					"items",
					"1"
				]
			}) || vh(t)],
			minItems: 2,
			maxItems: 2
		}
	};
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function Uh(e) {
	let t = e.values, n = Object.keys(e.values).filter((e) => typeof t[t[e]] != "number").map((e) => t[e]), r = Array.from(new Set(n.map((e) => typeof e)));
	return {
		type: r.length === 1 ? r[0] === "string" ? "string" : "number" : ["string", "number"],
		enum: n
	};
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function Wh(e) {
	return e.target === "openAi" ? void 0 : { not: vh({
		...e,
		currentPath: [...e.currentPath, "not"]
	}) };
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function Gh(e) {
	return e.target === "openApi3" ? {
		enum: ["null"],
		nullable: !0
	} : { type: "null" };
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/union.js
var Kh = {
	ZodString: "string",
	ZodNumber: "number",
	ZodBigInt: "integer",
	ZodBoolean: "boolean",
	ZodNull: "null"
};
function qh(e, t) {
	if (t.target === "openApi3") return Jh(e, t);
	let n = e.options instanceof Map ? Array.from(e.options.values()) : e.options;
	if (n.every((e) => e._def.typeName in Kh && (!e._def.checks || !e._def.checks.length))) {
		let e = n.reduce((e, t) => {
			let n = Kh[t._def.typeName];
			return n && !e.includes(n) ? [...e, n] : e;
		}, []);
		return { type: e.length > 1 ? e : e[0] };
	}
	if (n.every((e) => e._def.typeName === "ZodLiteral" && !e.description)) {
		let e = n.reduce((e, t) => {
			let n = typeof t._def.value;
			switch (n) {
				case "string":
				case "number":
				case "boolean": return [...e, n];
				case "bigint": return [...e, "integer"];
				case "object": if (t._def.value === null) return [...e, "null"];
				default: return e;
			}
		}, []);
		if (e.length === n.length) {
			let t = e.filter((e, t, n) => n.indexOf(e) === t);
			return {
				type: t.length > 1 ? t : t[0],
				enum: n.reduce((e, t) => e.includes(t._def.value) ? e : [...e, t._def.value], [])
			};
		}
	} else if (n.every((e) => e._def.typeName === "ZodEnum")) return {
		type: "string",
		enum: n.reduce((e, t) => [...e, ...t._def.values.filter((t) => !e.includes(t))], [])
	};
	return Jh(e, t);
}
var Jh = (e, t) => {
	let n = (e.options instanceof Map ? Array.from(e.options.values()) : e.options).map((e, n) => lg(e._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"anyOf",
			`${n}`
		]
	})).filter((e) => !!e && (!t.strictUnions || typeof e == "object" && Object.keys(e).length > 0));
	return n.length ? { anyOf: n } : void 0;
};
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function Yh(e, t) {
	if ([
		"ZodString",
		"ZodNumber",
		"ZodBigInt",
		"ZodBoolean",
		"ZodNull"
	].includes(e.innerType._def.typeName) && (!e.innerType._def.checks || !e.innerType._def.checks.length)) return t.target === "openApi3" ? {
		type: Kh[e.innerType._def.typeName],
		nullable: !0
	} : { type: [Kh[e.innerType._def.typeName], "null"] };
	if (t.target === "openApi3") {
		let n = lg(e.innerType._def, {
			...t,
			currentPath: [...t.currentPath]
		});
		return n && "$ref" in n ? {
			allOf: [n],
			nullable: !0
		} : n && {
			...n,
			nullable: !0
		};
	}
	let n = lg(e.innerType._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"anyOf",
			"0"
		]
	});
	return n && { anyOf: [n, { type: "null" }] };
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function Xh(e, t) {
	let n = { type: "number" };
	if (!e.checks) return n;
	for (let r of e.checks) switch (r.kind) {
		case "int":
			n.type = "integer", Vp(n, "type", r.message, t);
			break;
		case "min":
			t.target === "jsonSchema7" ? r.inclusive ? Hp(n, "minimum", r.value, r.message, t) : Hp(n, "exclusiveMinimum", r.value, r.message, t) : (r.inclusive || (n.exclusiveMinimum = !0), Hp(n, "minimum", r.value, r.message, t));
			break;
		case "max":
			t.target === "jsonSchema7" ? r.inclusive ? Hp(n, "maximum", r.value, r.message, t) : Hp(n, "exclusiveMaximum", r.value, r.message, t) : (r.inclusive || (n.exclusiveMaximum = !0), Hp(n, "maximum", r.value, r.message, t));
			break;
		case "multipleOf": Hp(n, "multipleOf", r.value, r.message, t);
	}
	return n;
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function Zh(e, t) {
	let n = t.target === "openAi", r = {
		type: "object",
		properties: {}
	}, i = [], a = e.shape();
	for (let e in a) {
		let o = a[e];
		if (o === void 0 || o._def === void 0) continue;
		let s = $h(o);
		s && n && (o._def.typeName === "ZodOptional" && (o = o._def.innerType), o.isNullable() || (o = o.nullable()), s = !1);
		let c = lg(o._def, {
			...t,
			currentPath: [
				...t.currentPath,
				"properties",
				e
			],
			propertyPath: [
				...t.currentPath,
				"properties",
				e
			]
		});
		c !== void 0 && (r.properties[e] = c, s || i.push(e));
	}
	i.length && (r.required = i);
	let o = Qh(e, t);
	return o !== void 0 && (r.additionalProperties = o), r;
}
function Qh(e, t) {
	if (e.catchall._def.typeName !== "ZodNever") return lg(e.catchall._def, {
		...t,
		currentPath: [...t.currentPath, "additionalProperties"]
	});
	switch (e.unknownKeys) {
		case "passthrough": return t.allowedAdditionalProperties;
		case "strict": return t.rejectedAdditionalProperties;
		case "strip": return t.removeAdditionalStrategy === "strict" ? t.allowedAdditionalProperties : t.rejectedAdditionalProperties;
	}
}
function $h(e) {
	try {
		return e.isOptional();
	} catch {
		return !0;
	}
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var eg = (e, t) => {
	if (t.currentPath.toString() === t.propertyPath?.toString()) return lg(e.innerType._def, t);
	let n = lg(e.innerType._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"anyOf",
			"1"
		]
	});
	return n ? { anyOf: [{ not: vh(t) }, n] } : vh(t);
}, tg = (e, t) => {
	if (t.pipeStrategy === "input") return lg(e.in._def, t);
	if (t.pipeStrategy === "output") return lg(e.out._def, t);
	let n = lg(e.in._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"allOf",
			"0"
		]
	});
	return { allOf: [n, lg(e.out._def, {
		...t,
		currentPath: [
			...t.currentPath,
			"allOf",
			n ? "1" : "0"
		]
	})].filter((e) => e !== void 0) };
};
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function ng(e, t) {
	return lg(e.type._def, t);
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function rg(e, t) {
	let n = {
		type: "array",
		uniqueItems: !0,
		items: lg(e.valueType._def, {
			...t,
			currentPath: [...t.currentPath, "items"]
		})
	};
	return e.minSize && Hp(n, "minItems", e.minSize.value, e.minSize.message, t), e.maxSize && Hp(n, "maxItems", e.maxSize.value, e.maxSize.message, t), n;
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function ig(e, t) {
	return e.rest ? {
		type: "array",
		minItems: e.items.length,
		items: e.items.map((e, n) => lg(e._def, {
			...t,
			currentPath: [
				...t.currentPath,
				"items",
				`${n}`
			]
		})).reduce((e, t) => t === void 0 ? e : [...e, t], []),
		additionalItems: lg(e.rest._def, {
			...t,
			currentPath: [...t.currentPath, "additionalItems"]
		})
	} : {
		type: "array",
		minItems: e.items.length,
		maxItems: e.items.length,
		items: e.items.map((e, n) => lg(e._def, {
			...t,
			currentPath: [
				...t.currentPath,
				"items",
				`${n}`
			]
		})).reduce((e, t) => t === void 0 ? e : [...e, t], [])
	};
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function ag(e) {
	return { not: vh(e) };
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function og(e) {
	return vh(e);
}
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var sg = (e, t) => lg(e.innerType._def, t), cg = (e, t, n) => {
	switch (t) {
		case Q.ZodString: return Ph(e, n);
		case Q.ZodNumber: return Xh(e, n);
		case Q.ZodObject: return Zh(e, n);
		case Q.ZodBigInt: return bh(e, n);
		case Q.ZodBoolean: return xh();
		case Q.ZodDate: return wh(e, n);
		case Q.ZodUndefined: return ag(n);
		case Q.ZodNull: return Gh(n);
		case Q.ZodArray: return yh(e, n);
		case Q.ZodUnion:
		case Q.ZodDiscriminatedUnion: return qh(e, n);
		case Q.ZodIntersection: return Ah(e, n);
		case Q.ZodTuple: return ig(e, n);
		case Q.ZodRecord: return Vh(e, n);
		case Q.ZodLiteral: return jh(e, n);
		case Q.ZodEnum: return Oh(e);
		case Q.ZodNativeEnum: return Uh(e);
		case Q.ZodNullable: return Yh(e, n);
		case Q.ZodOptional: return eg(e, n);
		case Q.ZodMap: return Hh(e, n);
		case Q.ZodSet: return rg(e, n);
		case Q.ZodLazy: return () => e.getter()._def;
		case Q.ZodPromise: return ng(e, n);
		case Q.ZodNaN:
		case Q.ZodNever: return Wh(n);
		case Q.ZodEffects: return Dh(e, n);
		case Q.ZodAny: return vh(n);
		case Q.ZodUnknown: return og(n);
		case Q.ZodDefault: return Eh(e, n);
		case Q.ZodBranded: return Sh(e, n);
		case Q.ZodReadonly: return sg(e, n);
		case Q.ZodCatch: return Ch(e, n);
		case Q.ZodPipeline: return tg(e, n);
		case Q.ZodFunction:
		case Q.ZodVoid:
		case Q.ZodSymbol: return;
		default: return ((e) => void 0)(t);
	}
};
//#endregion
//#region node_modules/zod-to-json-schema/dist/esm/parseDef.js
function lg(e, t, n = !1) {
	let r = t.seen.get(e);
	if (t.override) {
		let i = t.override?.(e, t, r, n);
		if (i !== Lp) return i;
	}
	if (r && !n) {
		let e = ug(r, t);
		if (e !== void 0) return e;
	}
	let i = {
		def: e,
		path: t.currentPath,
		jsonSchema: void 0
	};
	t.seen.set(e, i);
	let a = cg(e, e.typeName, t), o = typeof a == "function" ? lg(a(), t) : a;
	if (o && dg(e, t, o), t.postProcess) {
		let n = t.postProcess(o, e, t);
		return i.jsonSchema = o, n;
	}
	return i.jsonSchema = o, o;
}
var ug = (e, t) => {
	switch (t.$refStrategy) {
		case "root": return { $ref: e.path.join("/") };
		case "relative": return { $ref: Up(t.currentPath, e.path) };
		case "none":
		case "seen": return e.path.length < t.currentPath.length && e.path.every((e, n) => t.currentPath[n] === e) ? (console.warn(`Recursive reference detected at ${t.currentPath.join("/")}! Defaulting to any`), vh(t)) : t.$refStrategy === "seen" ? vh(t) : void 0;
	}
}, dg = (e, t, n) => (e.description && (n.description = e.description, t.markdownDescription && (n.markdownDescription = e.description)), n), fg = (e, t) => {
	let n = Bp(t), r = typeof t == "object" && t.definitions ? Object.entries(t.definitions).reduce((e, [t, r]) => ({
		...e,
		[t]: lg(r._def, {
			...n,
			currentPath: [
				...n.basePath,
				n.definitionPath,
				t
			]
		}, !0) ?? vh(n)
	}), {}) : void 0, i = typeof t == "string" ? t : t?.nameStrategy === "title" ? void 0 : t?.name, a = lg(e._def, i === void 0 ? n : {
		...n,
		currentPath: [
			...n.basePath,
			n.definitionPath,
			i
		]
	}, !1) ?? vh(n), o = typeof t == "object" && t.name !== void 0 && t.nameStrategy === "title" ? t.name : void 0;
	o !== void 0 && (a.title = o), n.flags.hasReferencedOpenAiAnyType && (r || (r = {}), r[n.openAiAnyTypeName] || (r[n.openAiAnyTypeName] = {
		type: [
			"string",
			"number",
			"integer",
			"boolean",
			"array",
			"null"
		],
		items: { $ref: n.$refStrategy === "relative" ? "1" : [
			...n.basePath,
			n.definitionPath,
			n.openAiAnyTypeName
		].join("/") }
	}));
	let s = i === void 0 ? r ? {
		...a,
		[n.definitionPath]: r
	} : a : {
		$ref: [
			...n.$refStrategy === "relative" ? [] : n.basePath,
			n.definitionPath,
			i
		].join("/"),
		[n.definitionPath]: {
			...r,
			[i]: a
		}
	};
	return n.target === "jsonSchema7" ? s.$schema = "http://json-schema.org/draft-07/schema#" : (n.target === "jsonSchema2019-09" || n.target === "openAi") && (s.$schema = "https://json-schema.org/draft/2019-09/schema#"), n.target === "openAi" && ("anyOf" in s || "oneOf" in s || "allOf" in s || "type" in s && Array.isArray(s.type)) && console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property."), s;
}, pg, mg;
async function hg(e, t, n) {
	let r = e;
	try {
		e.isRunning = !0, e.agentId = e.agentId ?? Kd();
		let i = r.prepareRunAgentInput(t), a, o = new Set(e.messages.map((e) => e.id)), s = [
			{ onRunFinishedEvent: (e) => {
				e.outcome === "success" && (a = e.result);
			} },
			...e.subscribers,
			n ?? {}
		];
		await r.onInitialize(i, s), r.activeRunDetach$ = new Ra();
		let c;
		r.activeRunCompletionPromise = new Promise((e) => {
			c = e;
		});
		let l = gs(() => r.connect(i)).pipe(yf(r.debugLogger), Hs(r.activeRunDetach$)), u = r.apply(i, l, s);
		await Ko(r.processApplyEvents(i, u, s).pipe(xs((t) => (e.isRunning = !1, t instanceof nr ? oo : r.onError(i, t, s))), Is(() => {
			e.isRunning = !1, r.onFinalize(i, s), c?.(), c = void 0, r.activeRunCompletionPromise = void 0, r.activeRunDetach$ = void 0;
		})), { defaultValue: void 0 });
		let d = W(e.messages).filter((e) => !o.has(e.id));
		return {
			result: a,
			newMessages: d
		};
	} finally {
		e.isRunning = !1;
	}
}
function gg(e) {
	return new ka((t) => {
		e.onOpen(() => t.next({ type: "open" })), e.onError((e) => t.next({
			type: "error",
			error: e
		}));
	});
}
function _g(e) {
	return new ka((t) => {
		e.join().receive("ok", () => {
			t.next({ type: "joined" }), t.complete();
		}).receive("error", (e) => {
			t.next({
				type: "error",
				response: e
			}), t.complete();
		}).receive("timeout", () => {
			t.next({ type: "timeout" }), t.complete();
		});
	});
}
function vg(e) {
	return gs(() => {
		let t = new Ip(e.url, e.options), n = gg(t).pipe(Bs({
			bufferSize: 1,
			refCount: !0
		}));
		return t.connect(), hs(k({
			socket: t,
			signals$: n
		}), ys).pipe(Is(() => t.disconnect()));
	});
}
function yg(e) {
	return e.socket$.pipe(Vs(({ socket: t }) => gs(() => {
		let n = t.channel(e.topic, e.params);
		return hs(k({
			channel: n,
			joinOutcome$: _g(n).pipe(Bs({
				bufferSize: 1,
				refCount: !0
			}))
		}), ys).pipe(Is(() => {
			e.leaveOnUnsubscribe !== !1 && n.leave();
		}));
	})));
}
function bg(e, t) {
	return new ka((n) => {
		let r = e.on(t, (e) => n.next(e));
		return () => {
			e.off(t, r);
		};
	});
}
function xg(e) {
	return e.pipe(Vs((e) => e.joinOutcome$));
}
function Sg(e) {
	return xg(e).pipe(Ds(1), fs((e) => {
		if (e.type === "joined") return oo;
		throw e.type === "timeout" ? /* @__PURE__ */ Error("Timed out joining channel") : /* @__PURE__ */ Error(`Failed to join channel: ${JSON.stringify(e.response)}`);
	}));
}
function Cg(e) {
	return e.pipe(Vs((e) => e.signals$));
}
function wg(e, t) {
	return e.pipe(Ls((e, t) => t.type === "open" ? 0 : e + 1, 0), bs((e) => e >= t), Ds(1), fs((e) => A(() => /* @__PURE__ */ Error(`WebSocket connection failed after ${e} consecutive errors`))));
}
var Tg = (...e) => fetch(...e), Eg = "ag_ui_event", Dg = "replay_complete", Og = "stream_idle", kg = "stop_run", Ag = 100, jg = class extends Error {
	constructor(e) {
		super(e ? `Thread ${e} is locked` : "Thread is locked"), this.name = "AgentThreadLockedError";
	}
};
function Mg(e) {
	return typeof e == "object" && !!e && "activeRunCompletionPromise" in e;
}
var Ng = class e extends Uf {
	constructor(e, t = { lastSeenEventIds: /* @__PURE__ */ new Map() }) {
		super(), u(this, "config", void 0), u(this, "socket", null), u(this, "activeChannel", null), u(this, "canonicalRunId", null), u(this, "sharedState", void 0), this.config = e, this.sharedState = t;
	}
	get headers() {
		return this.config.headers;
	}
	set headers(e) {
		this.config = {
			...this.config,
			headers: e
		};
	}
	get credentials() {
		return this.config.credentials;
	}
	set credentials(e) {
		this.config = {
			...this.config,
			credentials: e
		};
	}
	clone() {
		return new e(this.config, this.sharedState);
	}
	async connectAgent(e, t) {
		let n = e?.runId || !this.canonicalRunId ? e : {
			...e,
			runId: this.canonicalRunId
		};
		return hg(this, n, t);
	}
	abortRun() {
		if (this.activeChannel && this.canonicalRunId) {
			let e = setTimeout(() => t(), 5e3), t = () => {
				clearTimeout(e), this.detachActiveRun(), this.cleanup();
			};
			this.activeChannel.push(kg, { run_id: this.canonicalRunId }).receive("ok", t).receive("error", t).receive("timeout", t);
		} else this.detachActiveRun(), this.cleanup();
	}
	run(e) {
		return this.threadId = e.threadId, this.canonicalRunId = e.runId, gs(() => this.requestJoinCredentials$("run", e)).pipe(Vs((t) => {
			if (t === null) return A(() => /* @__PURE__ */ Error("REST run request returned no credentials"));
			let n = this.applyCanonicalRunIdentity(e, t, { fallbackToInputRunId: !0 });
			return this.observeThread$(n, t, {
				completeOnRunError: !1,
				streamMode: "run"
			});
		}));
	}
	connect(e) {
		this.threadId = e.threadId, this.canonicalRunId = null;
		let t = this.getReconnectCursor(e);
		return gs(() => this.requestJoinCredentials$("connect", e, t)).pipe(Vs((n) => {
			if (n === null) return oo;
			let r = this.applyCanonicalRunIdentity(e, n, { fallbackToInputRunId: !1 });
			return this.observeThread$(r, n, {
				completeOnRunError: !1,
				streamMode: "connect",
				replayCursor: t
			});
		}));
	}
	cleanupOwned(e, t) {
		e && (e.leave(), this.activeChannel === e && (this.activeChannel = null)), t && (t.disconnect(), this.socket === t && (this.socket = null)), this.canonicalRunId = null;
	}
	cleanup() {
		this.cleanupOwned(this.activeChannel, this.socket);
	}
	requestJoinCredentials$(e, t, n) {
		return gs(async () => {
			try {
				let r = await (this.config.fetch ?? Tg)(this.buildRuntimeUrl(e), {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						...this.headers
					},
					body: JSON.stringify({
						...t,
						...e === "connect" ? { lastSeenEventId: n === void 0 ? this.getReconnectCursor(t) : n } : {}
					}),
					...this.credentials ? { credentials: this.credentials } : {}
				});
				if (r.status === 204 && e === "connect") return null;
				if (r.status === 409 && e === "run") throw new jg(t.threadId);
				if (!r.ok) {
					let e = await r.text().catch(() => "");
					throw Error(e || r.statusText || String(r.status));
				}
				return this.normalizeJoinCredentials(await r.json(), t);
			} catch (t) {
				throw t instanceof jg ? t : Error(`REST ${e} request failed: ${t instanceof Error ? t.message : String(t)}`, { cause: t });
			}
		});
	}
	normalizeJoinCredentials(e, t) {
		let n = e && typeof e == "object" ? e : null, r = n?.realtime && typeof n.realtime == "object" ? n.realtime : null;
		if (typeof n?.joinToken != "string" || !n.joinToken) throw Error("missing joinToken");
		if (typeof r?.clientUrl != "string" || !r.clientUrl) throw Error("missing realtime.clientUrl");
		if (typeof r.topic != "string" || !r.topic) throw Error("missing realtime.topic");
		return {
			threadId: typeof n.threadId == "string" && n.threadId ? n.threadId : t.threadId,
			runId: typeof n.runId == "string" && n.runId ? n.runId : null,
			joinToken: n.joinToken,
			realtime: {
				clientUrl: r.clientUrl,
				topic: r.topic
			}
		};
	}
	observeThread$(e, t, n) {
		return this.observeThreadSession$(e, t, n).pipe(xs((t) => {
			if (!this.isSocketReconnectExhaustedError(t)) return A(() => t);
			let r = this.getReconnectCursor(e);
			return this.requestJoinCredentials$("connect", e, r).pipe(Vs((t) => t === null ? oo : this.observeThread$(this.applyCanonicalRunIdentity(e, t, { fallbackToInputRunId: n.streamMode === "run" }), t, {
				...n,
				channelMode: "connect",
				replayCursor: r
			})));
		}));
	}
	observeThreadSession$(e, t, n) {
		return gs(() => {
			let r = null, i = null, a = vg({
				url: t.realtime.clientUrl,
				options: {
					params: {
						...this.config.socketParams,
						join_token: t.joinToken
					},
					reconnectAfterMs: lp(100, 1e4),
					rejoinAfterMs: lp(1e3, 3e4)
				}
			}).pipe(Us(({ socket: e }) => {
				r = e, this.socket = r;
			}), Bs({
				bufferSize: 1,
				refCount: !0
			})), o = this.createThreadChannelParams(e, n.channelMode ?? n.streamMode, n.replayCursor), s = yg({
				socket$: a,
				topic: t.realtime.topic,
				params: o
			}).pipe(Us(({ channel: e }) => {
				i = e, this.activeChannel = i;
			}), Bs({
				bufferSize: 1,
				refCount: !0
			})), c = this.readDurableEventId(n.replayCursor ?? this.getReconnectCursor(e)), l = null, u = this.observeThreadEvents$(e.threadId, s, n).pipe(Us((e) => {
				l = this.readEventId(e) ?? l;
			}), Rs()), d = this.observeControlEvent$(e.threadId, s, Dg).pipe(Bs({
				bufferSize: 1,
				refCount: !0
			})), f = this.observeControlEvent$(e.threadId, s, Og).pipe(Bs({
				bufferSize: 1,
				refCount: !0
			})), p = n.streamMode === "connect" ? vs(cs([d.pipe(Ds(1)), f.pipe(Ds(1))]), f.pipe(Ds(1), bs((e) => this.canFallbackCompleteConnect(e, c, l)), js(Ag))).pipe(Ds(1)) : oo, m = u.pipe(Os(), Fs(null), Ds(1)), h = vs(m, p);
			return vs(this.joinThreadChannel$(s), this.observeSocketHealth$(a).pipe(Hs(h)), u.pipe(Hs(p)), d.pipe(Os(), Hs(h)), p.pipe(Os(), Hs(m))).pipe(Is(() => this.cleanupOwned(i, r)));
		});
	}
	joinThreadChannel$(e) {
		return Sg(e);
	}
	observeSocketHealth$(e) {
		return wg(Cg(e), 5);
	}
	observeThreadEvents$(e, t, n) {
		return t.pipe(Vs(({ channel: e }) => this.observeChannelEvent$(e, Eg)), Us((t) => {
			this.updateLastSeenEventId(e, t);
		}), fs((e) => this.createThreadNotifications(e, {
			completeOnRunError: n.completeOnRunError,
			completeOnRunFinished: n.streamMode === "run",
			errorOnRunError: n.streamMode === "run"
		})), Ms());
	}
	observeControlEvent$(e, t, n) {
		return t.pipe(Vs(({ channel: e }) => this.observeChannelEvent$(e, n)), Us((t) => this.updateLastSeenEventIdFromControl(e, t)));
	}
	observeChannelEvent$(e, t) {
		return bg(e, t);
	}
	createThreadNotifications(e, t) {
		if (e.type === O.RUN_FINISHED) return t.completeOnRunFinished ? [Uo.createNext(e), Uo.createComplete()] : [Uo.createNext(e)];
		if (e.type === O.RUN_ERROR) {
			let n = e.message ?? "Run error";
			return t.completeOnRunError ? [Uo.createNext(e), Uo.createComplete()] : t.errorOnRunError ? [Uo.createNext(e), Uo.createError(Error(n))] : [Uo.createNext(e)];
		}
		return [Uo.createNext(e)];
	}
	buildRuntimeUrl(e) {
		let t = `${this.config.runtimeUrl}/agent/${encodeURIComponent(this.config.agentId)}/${e}`, n = typeof window < "u" && window.location ? window.location.origin : "http://localhost";
		return new URL(t, new URL(this.config.runtimeUrl, n)).toString();
	}
	createThreadChannelParams(e, t, n) {
		return t === "run" ? {
			stream_mode: "run",
			run_id: e.runId
		} : {
			stream_mode: "connect",
			last_seen_event_id: n === void 0 ? this.getReconnectCursor(e) : n
		};
	}
	getLastSeenEventId(e) {
		return this.sharedState.lastSeenEventIds.get(e) ?? null;
	}
	getReconnectCursor(e) {
		return this.getLastSeenEventId(e.threadId);
	}
	clearReconnectCursor(e) {
		this.sharedState.lastSeenEventIds.delete(e);
	}
	updateLastSeenEventId(e, t) {
		let n = this.readEventId(t);
		n && this.advanceLastSeenEventId(e, n);
	}
	updateLastSeenEventIdFromControl(e, t) {
		let n = this.readControlEventId(t);
		n && this.advanceLastSeenEventId(e, n);
	}
	advanceLastSeenEventId(e, t) {
		this.sharedState.lastSeenEventIds.set(e, t);
	}
	readEventId(e) {
		let t = e.metadata;
		if (!t || typeof t != "object") return null;
		let n = t;
		return this.readDurableEventId(n.cpki_event_id);
	}
	readControlEventId(e) {
		if (!e || typeof e != "object") return null;
		let t = e, n = t.latestEventId ?? t.latest_event_id;
		return this.readDurableEventId(n);
	}
	readDurableEventId(e) {
		return typeof e != "string" || e.trim() === "" || e.startsWith("cpki_ingested") ? null : e;
	}
	canFallbackCompleteConnect(e, t, n) {
		let r = this.readControlEventId(e);
		return !r || r === t || r === n;
	}
	applyCanonicalRunIdentity(e, t, n) {
		this.threadId = t.threadId;
		let r = t.runId ?? (n.fallbackToInputRunId ? e.runId : null);
		return this.canonicalRunId = r, {
			...e,
			threadId: t.threadId,
			...r === null ? {} : { runId: r }
		};
	}
	isSocketReconnectExhaustedError(e) {
		return e instanceof Error && e.message.includes("WebSocket connection failed after");
	}
};
async function Pg(e) {
	let t = `Runtime info request failed with status ${e.status}`, n;
	try {
		let t = (await e.clone().json())?.message;
		typeof t == "string" && t.trim().length > 0 && (n = t.trim());
	} catch {}
	let r = Error(n ? `${t}: ${n}` : t);
	return r.runtimeInfoStatus = e.status, r;
}
function Fg(e) {
	return typeof e == "object" && !!e && typeof e.runtimeInfoStatus == "number";
}
function Ig(e) {
	return "headers" in e;
}
function Lg(e) {
	return "credentials" in e;
}
function Rg(e) {
	return typeof e == "object" && !!e && "name" in e && e.name === "ZodError";
}
function zg(e) {
	return (e instanceof DOMException || e instanceof Error) && e.name === "AbortError";
}
function Bg(e) {
	return e.pipe(xs((e) => {
		if (Rg(e) || zg(e)) return oo;
		throw e;
	}));
}
var Vg = (pg = /* @__PURE__ */ new WeakSet(), mg = class e extends Gf {
	constructor(e) {
		let t = e.runtimeUrl ? e.runtimeUrl.replace(/\/$/, "") : void 0, n = e.transport ?? "auto", r = e.runtimeAgentId ?? e.agentId ?? "", i = n === "single" ? t ?? e.runtimeUrl ?? "" : `${t ?? e.runtimeUrl}/agent/${encodeURIComponent(r)}/run`;
		if (!i) throw Error("ProxiedCopilotRuntimeAgent requires a runtimeUrl when transport is set to 'single'.");
		super({
			...e,
			url: i
		}), a(this, pg), u(this, "runtimeUrl", void 0), u(this, "credentials", void 0), u(this, "runtimeAgentId", void 0), u(this, "transport", void 0), u(this, "singleEndpointUrl", void 0), u(this, "runtimeMode", void 0), u(this, "intelligence", void 0), u(this, "_capabilities", void 0), u(this, "delegate", void 0), u(this, "runtimeInfoPromise", void 0), this.runtimeUrl = t ?? e.runtimeUrl, this.credentials = e.credentials, this.runtimeAgentId = e.runtimeAgentId, this.transport = n, this.runtimeMode = e.runtimeMode ?? "sse", this.intelligence = e.intelligence, this._capabilities = e.capabilities, e.debug && (this.debug = e.debug), this.transport === "single" && (this.singleEndpointUrl = this.runtimeUrl);
	}
	routedAgentId() {
		let e = this.runtimeAgentId ?? this.agentId;
		if (!e) throw Error("ProxiedCopilotRuntimeAgent: cannot make a runtime request without an agentId or runtimeAgentId.");
		return e;
	}
	get capabilities() {
		return this._capabilities;
	}
	requestInit(e) {
		return {
			...super.requestInit(e),
			...this.credentials ? { credentials: this.credentials } : {}
		};
	}
	async getCapabilities() {
		return this._capabilities ?? {};
	}
	async detachActiveRun() {
		this.delegate && await this.delegate.detachActiveRun(), await super.detachActiveRun();
	}
	abortRun() {
		if (this.delegate) {
			this.syncDelegate(this.delegate), this.delegate.abortRun(), this.detachActiveRun();
			return;
		}
		if (!this.agentId || !this.threadId || typeof fetch > "u") return;
		let e = this.routedAgentId();
		if (this.transport === "single") {
			if (!this.singleEndpointUrl) return;
			let t = new Headers({
				...this.headers,
				"Content-Type": "application/json"
			});
			fetch(this.singleEndpointUrl, {
				method: "POST",
				headers: t,
				body: JSON.stringify({
					method: "agent/stop",
					params: {
						agentId: e,
						threadId: this.threadId
					}
				}),
				...this.credentials ? { credentials: this.credentials } : {}
			}).catch((e) => {
				console.error("ProxiedCopilotRuntimeAgent: stop request failed", e);
			});
			return;
		}
		if (!this.runtimeUrl) return;
		let t = `${this.runtimeUrl}/agent/${encodeURIComponent(e)}/stop/${encodeURIComponent(this.threadId)}`, n = typeof window < "u" && window.location ? window.location.origin : "http://localhost", r = new URL(this.runtimeUrl, n), i = new URL(t, r);
		fetch(i.toString(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...this.headers
			},
			...this.credentials ? { credentials: this.credentials } : {}
		}).catch((e) => {
			console.error("ProxiedCopilotRuntimeAgent: stop request failed", e);
		});
	}
	async connectAgent(e, t) {
		if (this.runtimeMode !== "intelligence") return hg(this, e, t);
		this.delegate && await this.delegate.detachActiveRun(), await this.resolveDelegate();
		let n = this.delegate, r = n.subscribe({
			onMessagesChanged: () => {
				this.setMessages([...n.messages]);
			},
			onStateChanged: () => {
				this.setState({ ...n.state });
			},
			onRunInitialized: () => {
				this.isRunning = !0;
			},
			onRunFinalized: () => {
				this.isRunning = !1;
			},
			onRunFailed: () => {
				this.isRunning = !1;
			},
			onRunErrorEvent: () => {
				this.isRunning = !1;
			}
		}), i = this.subscribers.map((e) => n.subscribe(e));
		try {
			let r = await n.connectAgent(e, t);
			return this.setMessages([...n.messages]), this.setState({ ...n.state }), r;
		} finally {
			this.isRunning = !1, r.unsubscribe();
			for (let e of i) e.unsubscribe();
		}
	}
	connect(e) {
		return this.runtimeMode === "pending" || this.transport === "auto" && this.runtimeMode !== "intelligence" ? gs(() => Vo(this.ensureRuntimeConfiguration())).pipe(Vs(() => this.connect(e))) : this.runtimeMode === "intelligence" ? r(pg, this, Hg).call(this, e) : r(pg, this, Ug).call(this, e);
	}
	run(e) {
		return this.runtimeMode === "pending" || this.transport === "auto" && this.runtimeMode !== "intelligence" ? gs(() => Vo(this.ensureRuntimeConfiguration())).pipe(Vs(() => this.run(e))) : this.runtimeMode === "intelligence" ? r(pg, this, Wg).call(this, e) : r(pg, this, Gg).call(this, e);
	}
	clone() {
		let t = new e({
			runtimeUrl: this.runtimeUrl,
			agentId: this.agentId,
			runtimeAgentId: this.runtimeAgentId,
			description: this.description,
			headers: { ...this.headers },
			credentials: this.credentials,
			transport: this.transport,
			runtimeMode: this.runtimeMode,
			intelligence: this.intelligence,
			capabilities: this._capabilities,
			debug: this.debug,
			fetch: this.fetch
		});
		if (t.threadId = this.threadId, t.setState(this.state), t.setMessages(this.messages), this.delegate) {
			let e = this.delegate.clone();
			t.delegate = e, t.syncDelegate(e);
		}
		return t;
	}
	clearReplayCursor(e) {
		this.runtimeMode === "intelligence" && this.delegate?.clearReconnectCursor?.(e);
	}
	async resolveDelegate() {
		if (await this.ensureRuntimeConfiguration(), !this.delegate) {
			if (this.runtimeMode !== "intelligence") throw Error("A delegate is only created for Intelligence mode");
			this.delegate = this.createIntelligenceDelegate();
		}
		return this.syncDelegate(this.delegate), this.delegate;
	}
	async ensureRuntimeConfiguration() {
		if (this.runtimeMode === "intelligence" || this.runtimeMode !== "pending" && this.transport !== "auto") return;
		if (!this.runtimeUrl) throw Error("Runtime URL is not set");
		let e = this.runtimeInfoPromise ?? this.fetchRuntimeInfo().then((e) => {
			this.runtimeMode = e.mode ?? "sse", this.intelligence = e.intelligence;
		});
		this.runtimeInfoPromise = e;
		try {
			await e;
		} catch (t) {
			throw this.runtimeInfoPromise === e && (this.runtimeInfoPromise = void 0), t;
		}
	}
	async fetchRuntimeInfo() {
		let e = { ...this.headers };
		if (this.transport === "auto") return this.fetchRuntimeInfoAutoDetect(e);
		let t, n;
		if (this.transport === "single") {
			if (!this.singleEndpointUrl) throw Error("Single endpoint transport requires a runtimeUrl");
			e["Content-Type"] || (e["Content-Type"] = "application/json"), n = this.runtimeUrl, t = {
				method: "POST",
				body: JSON.stringify({ method: "info" })
			};
		} else n = `${this.runtimeUrl}/info`, t = {};
		let r = await this.fetch(n, {
			...t,
			headers: e,
			...this.credentials ? { credentials: this.credentials } : {}
		});
		if (!r.ok) throw await Pg(r);
		return await r.json();
	}
	async fetchRuntimeInfoAutoDetect(e) {
		try {
			let t = await this.fetch(`${this.runtimeUrl}/info`, {
				headers: { ...e },
				...this.credentials ? { credentials: this.credentials } : {}
			});
			if (t.status >= 200 && t.status < 300) return this.transport = "rest", await t.json();
		} catch {}
		let t = { ...e };
		t["Content-Type"] || (t["Content-Type"] = "application/json");
		let n = await this.fetch(this.runtimeUrl, {
			method: "POST",
			headers: t,
			body: JSON.stringify({ method: "info" }),
			...this.credentials ? { credentials: this.credentials } : {}
		});
		if (!n.ok) throw await Pg(n);
		return this.transport = "single", this.singleEndpointUrl = this.runtimeUrl, await n.json();
	}
	createSingleRouteRequestInit(e, t, n) {
		if (!this.agentId) throw Error("ProxiedCopilotRuntimeAgent requires agentId to make runtime requests");
		let r = super.requestInit(e), i = new Headers(r.headers ?? {});
		i.set("Content-Type", "application/json"), i.set("Accept", i.get("Accept") ?? "text/event-stream");
		let a;
		if (typeof r.body == "string") try {
			a = JSON.parse(r.body);
		} catch (e) {
			console.warn("ProxiedCopilotRuntimeAgent: failed to parse request body for single route transport", e);
		}
		let o = { method: t };
		return n && Object.keys(n).length > 0 && (o.params = n), a !== void 0 && (o.body = a), {
			...r,
			headers: i,
			body: JSON.stringify(o),
			...this.credentials ? { credentials: this.credentials } : {}
		};
	}
	createIntelligenceDelegate() {
		let e = this.routedAgentId();
		if (!this.runtimeUrl || !e || !this.intelligence?.wsUrl) throw Error("Intelligence mode requires runtimeUrl, agentId, and intelligence websocket metadata");
		return new Ng({
			url: this.intelligence.wsUrl,
			runtimeUrl: this.runtimeUrl,
			agentId: e,
			headers: { ...this.headers },
			credentials: this.credentials,
			fetch: this.fetch
		});
	}
	syncDelegate(e) {
		e.agentId = this.routedAgentId(), e.description = this.description, e.threadId = this.threadId, e.setMessages(this.messages), e.setState(this.state), Ig(e) && (e.headers = { ...this.headers }), Lg(e) && (e.credentials = this.credentials);
	}
}, mg);
function Hg(e) {
	return gs(() => Vo(this.resolveDelegate())).pipe(Vs((t) => Bg(t.connect(e))));
}
function Ug(e) {
	let t = this.routedAgentId();
	if (this.transport === "single") {
		if (!this.singleEndpointUrl) throw Error("Single endpoint transport requires a runtimeUrl");
		let n = this.createSingleRouteRequestInit(e, "agent/connect", { agentId: t });
		return Bg(uf(sf(() => this.fetch(this.singleEndpointUrl, n))));
	}
	let n = `${this.runtimeUrl}/agent/${t}/connect`, r = this.requestInit(e);
	return Bg(uf(sf(() => this.fetch(n, r))));
}
function Wg(e) {
	return gs(() => Vo(this.resolveDelegate())).pipe(Vs((t) => Bg(t.run(e))));
}
function Gg(e) {
	if (this.transport === "single") {
		if (!this.singleEndpointUrl) throw Error("Single endpoint transport requires a runtimeUrl");
		let t = this.createSingleRouteRequestInit(e, "agent/run", { agentId: this.routedAgentId() });
		return Bg(uf(sf(() => this.fetch(this.singleEndpointUrl, t))));
	}
	return Bg(c(mg.prototype, "run", this, 2)([e]));
}
var Kg = /* @__PURE__ */ new Set([
	"Fetch is aborted",
	"signal is aborted without reason",
	"component unmounted"
]);
function qg(e) {
	if (typeof e != "object" || !e) return !1;
	let { name: t, message: n } = e;
	return t === "AbortError" || typeof n == "string" && Kg.has(n);
}
var Jg = 1e4;
function Yg(e) {
	return e?.ɵruntimeRequest;
}
function Xg(e) {
	return e === "/threads" || e.startsWith("/threads/") || e === "/memories" || e.startsWith("/memories/") || e === "/annotate";
}
async function Zg(e, t, n, r) {
	if (r === "GET" || r === "HEAD") return;
	let i;
	if (t?.body == null ? e instanceof Request && (i = await e.clone().text()) : i = await new Response(t.body).text(), i) {
		if (n.get("content-type")?.toLowerCase().includes("application/json")) try {
			return JSON.parse(i);
		} catch {
			return i;
		}
		return i;
	}
}
async function Qg(e, t, n) {
	let r = new URL(n), i = e instanceof Request ? e.url : e instanceof URL ? e.href : e, a = new URL(i, r), o = r.pathname.replace(/\/$/, "");
	if (a.origin !== r.origin || !a.pathname.startsWith(`${o}/`)) return null;
	let s = a.pathname.slice(o.length);
	if (!Xg(s)) return null;
	let c = (t?.method ?? (e instanceof Request ? e.method : "GET")).toUpperCase(), l = new Headers(t?.headers ?? (e instanceof Request ? e.headers : void 0)), u = await Zg(e, t, l, c);
	return l.set("content-type", "application/json"), l.delete("content-length"), {
		input: n,
		init: {
			...e instanceof Request ? {
				cache: e.cache,
				credentials: e.credentials,
				integrity: e.integrity,
				keepalive: e.keepalive,
				mode: e.mode,
				redirect: e.redirect,
				referrer: e.referrer,
				referrerPolicy: e.referrerPolicy,
				signal: e.signal
			} : {},
			...t,
			method: "POST",
			headers: l,
			body: JSON.stringify({
				method: "resource/request",
				params: {
					path: `${s}${a.search}`,
					httpMethod: c
				},
				...u === void 0 ? {} : { body: u }
			})
		}
	};
}
var $g = 5e3, e_ = 5e3;
function t_(e, t) {
	return t?.nonCritical ? "ignored" : qg(e) && !t?.timedOut ? "aborted" : "failed";
}
function n_(e) {
	let t = new Headers(e);
	return t.has("content-type") || t.set("content-type", "application/json"), t;
}
var r_ = 5e3, i_ = class {
	constructor(e) {
		u(this, "_agents", {}), u(this, "localAgents", {}), u(this, "remoteAgents", {}), u(this, "mintedThreadIds", /* @__PURE__ */ new WeakMap()), u(this, "_runtimeUrl", void 0), u(this, "_connectionInFlight", void 0), u(this, "_runtimeConnectionGeneration", 0), u(this, "_activeRuntimeConnectionAttempt", void 0), u(this, "_runtimeEntitlementRetryTimer", void 0), u(this, "_runtimeEntitlementRetryAttemptedKey", void 0), u(this, "_runtimeEntitlementRetryPendingKey", void 0), u(this, "_runtimeVersion", void 0), u(this, "_runtimeConnectionStatus", Ov.Disconnected), u(this, "_runtimeTransport", "auto"), u(this, "_requestedTransport", "auto"), u(this, "_audioFileTranscriptionEnabled", !1), u(this, "_runtimeMode", "sse"), u(this, "_intelligence", void 0), u(this, "_threadEndpoints", void 0), u(this, "_singleRouteResourceOperations", !1), u(this, "_suggestions", void 0), u(this, "_inspectorLearning", !1), u(this, "_inspectorMetadata", void 0), u(this, "_inspectorMetadataSupported", !1), u(this, "inspectorMetadataRefreshReady", !1), u(this, "inspectorMetadataConnectionGeneration", 0), u(this, "inspectorMetadataGeneration", 0), u(this, "inspectorMetadataHeadersGeneration", 0), u(this, "inspectorMetadataCredentialsGeneration", 0), u(this, "inspectorMetadataAbortController", void 0), u(this, "inspectorMetadataNotificationQueue", Promise.resolve()), u(this, "_a2uiEnabled", !1), u(this, "_a2uiAgents", void 0), u(this, "_openGenerativeUIEnabled", !1), u(this, "_licenseStatus", void 0), u(this, "_runtimeEntitlements", void 0), u(this, "_telemetryDisabled", !1), u(this, "remoteAgentConnections", /* @__PURE__ */ new WeakMap()), u(this, "runtimeFetch", void 0), u(this, "runtimeProbeInFlight", !1), u(this, "runtimeProbeToken", 0), u(this, "runtimeProbeAbortController", void 0), u(this, "runtimeRecoveryRunning", !1), u(this, "runtimeRecoveryPending", !1), u(this, "runtimeHealthGeneration", 0), u(this, "agentOwnHeaders", /* @__PURE__ */ new WeakMap()), this.core = e;
	}
	get agents() {
		return this._agents;
	}
	get runtimeUrl() {
		return this._runtimeUrl;
	}
	get runtimeVersion() {
		return this._runtimeVersion;
	}
	get runtimeConnectionStatus() {
		return this._runtimeConnectionStatus;
	}
	get runtimeTransport() {
		return this._runtimeTransport;
	}
	get audioFileTranscriptionEnabled() {
		return this._audioFileTranscriptionEnabled;
	}
	get runtimeMode() {
		return this._runtimeMode;
	}
	get intelligence() {
		return this._intelligence;
	}
	get threadEndpoints() {
		return this._threadEndpoints;
	}
	get suggestions() {
		return this._suggestions;
	}
	get inspectorLearning() {
		return this._inspectorLearning;
	}
	get inspectorMetadata() {
		return this._inspectorMetadata;
	}
	get a2uiEnabled() {
		return this._a2uiEnabled;
	}
	get a2uiAgents() {
		return this._a2uiAgents;
	}
	get openGenerativeUIEnabled() {
		return this._openGenerativeUIEnabled;
	}
	get licenseStatus() {
		return this._licenseStatus;
	}
	get runtimeEntitlements() {
		return this._runtimeEntitlements;
	}
	get runtimeEntitlementRetryPending() {
		return this._runtimeEntitlementRetryPendingKey === this.runtimeConnectionKey();
	}
	get telemetryDisabled() {
		return this._telemetryDisabled;
	}
	initialize(e) {
		this.localAgents = this.assignAgentIds(e), this.applyHeadersToAgents(this.localAgents), this.applyCredentialsToAgents(this.localAgents), this.applyRuntimeFetchToAgents(this.localAgents), this._agents = this.localAgents;
	}
	setRuntimeUrl(e, t) {
		let n = e ? e.replace(/\/$/, "") : void 0;
		this._runtimeUrl !== n && (this.invalidateInspectorMetadataConnection(), this.abandonRuntimeHealthProbe(), this.resetRuntimeEntitlementRetry(), this._licenseStatus = void 0, this._runtimeEntitlements = void 0, this._singleRouteResourceOperations = !1, this._runtimeUrl = n, !t?.deferConnection && this.updateRuntimeConnection({ preserveOnFailure: this.hasLiveRuntimeKnowledgeToProtect() }));
	}
	connectRuntime() {
		typeof window > "u" || this._runtimeUrl && this._runtimeConnectionStatus === Ov.Disconnected && this.updateRuntimeConnection();
	}
	setRuntimeTransport(e) {
		this._requestedTransport !== e && (this.invalidateInspectorMetadataConnection(), this.abandonRuntimeHealthProbe(), this.resetRuntimeEntitlementRetry(), this._requestedTransport = e, this._runtimeTransport = e, this._singleRouteResourceOperations = !1, this.updateRuntimeConnection({ preserveOnFailure: this.hasLiveRuntimeKnowledgeToProtect() }));
	}
	hasLiveRuntimeKnowledgeToProtect() {
		return Object.keys(this.remoteAgents).length !== 0 && this._runtimeConnectionStatus !== Ov.Connected;
	}
	reconcileRecoveredAgents(e) {
		let t = {
			...this.remoteAgents,
			...e
		};
		if (Object.keys(e).length === 0) return t;
		for (let [n, r] of Object.entries(t)) Object.prototype.hasOwnProperty.call(e, n) || this.carriesConversationState(r) || delete t[n];
		return t;
	}
	carriesConversationState(e) {
		if (e.messages.length > 0) return !0;
		let t = this.mintedThreadIds.get(e);
		return t === void 0 || e.threadId !== t;
	}
	abandonRuntimeHealthProbe() {
		this.runtimeProbeToken += 1, this.runtimeProbeInFlight = !1, this.runtimeHealthGeneration += 1, this.runtimeProbeAbortController?.abort(), this.runtimeProbeAbortController = void 0;
	}
	setAgents__unsafe_dev_only(e) {
		Object.entries(e).forEach(([e, t]) => {
			t && this.validateAndAssignAgentId(e, t);
		}), this.localAgents = e, this._agents = {
			...this.localAgents,
			...this.remoteAgents
		}, this.applyHeadersToAgents(this._agents), this.applyCredentialsToAgents(this._agents), this.applyRuntimeFetchToAgents(this._agents), this.notifyAgentsChanged();
	}
	addAgent__unsafe_dev_only({ id: e, agent: t }) {
		this.validateAndAssignAgentId(e, t), this.localAgents[e] = t, this.applyHeadersToAgent(t), this.applyCredentialsToAgent(t), this.applyRuntimeFetchToAgent(t), this._agents = {
			...this.localAgents,
			...this.remoteAgents
		}, this.notifyAgentsChanged();
	}
	removeAgent__unsafe_dev_only(e) {
		delete this.localAgents[e], this._agents = {
			...this.localAgents,
			...this.remoteAgents
		}, this.notifyAgentsChanged();
	}
	registerProxiedAgent({ agentId: e, runtimeAgentId: t }) {
		if (Object.prototype.hasOwnProperty.call(this._agents, e)) throw Error(`CopilotKitCore.registerProxiedAgent: agentId "${e}" is already registered. Pick a different agentId, or unregister the existing agent first.`);
		let n = this.core, r = n.debug, i = new Vg({
			runtimeUrl: this._runtimeUrl,
			agentId: e,
			runtimeAgentId: t,
			transport: this._runtimeTransport,
			credentials: n.credentials,
			runtimeMode: this._runtimeUrl ? this._runtimeConnectionStatus === Ov.Connected ? this._runtimeMode : "pending" : "sse",
			intelligence: this._intelligence,
			debug: r ? dp(r) : void 0
		});
		return this.applyHeadersToAgent(i), this.applyRuntimeFetchToAgent(i), this.localAgents[e] = i, this._agents = {
			...this.localAgents,
			...this.remoteAgents
		}, this.notifyAgentsChanged(), {
			agent: i,
			unregister: () => {
				this.localAgents[e] === i && (delete this.localAgents[e], this._agents = {
					...this.localAgents,
					...this.remoteAgents
				}, this.notifyAgentsChanged());
			}
		};
	}
	getAgent(e) {
		if (e in this._agents) return this._agents[e];
		(this.runtimeUrl === void 0 || this.runtimeConnectionStatus !== Ov.Disconnected && this.runtimeConnectionStatus !== Ov.Connecting) && console.warn(`Agent ${e} not found`);
	}
	applyHeadersToAgent(e) {
		e instanceof Gf && (this.agentOwnHeaders.has(e) || this.agentOwnHeaders.set(e, { ...e.headers }), e.headers = {
			...this.agentOwnHeaders.get(e),
			...this.core.headers
		});
	}
	applyHeadersToAgents(e) {
		Object.values(e).forEach((e) => {
			this.applyHeadersToAgent(e);
		});
	}
	applyCredentialsToAgent(e) {
		e instanceof Vg && (e.credentials = this.core.credentials);
	}
	applyCredentialsToAgents(e) {
		Object.values(e).forEach((e) => {
			this.applyCredentialsToAgent(e);
		});
	}
	createRuntimeFetch() {
		return this.runtimeFetch || (this.runtimeFetch = (async (e, t) => {
			let n = () => Yg(t), r = this.armRuntimeRequestWatchdog(n());
			try {
				let i = this._runtimeTransport === "single" && this._singleRouteResourceOperations && this._runtimeUrl ? await Qg(e, t, this._runtimeUrl) : null, a = i ? await fetch(i.input, i.init) : await fetch(e, t);
				return r.clear(), this.handleRuntimeRequestOutcome(a.ok ? "ok" : n()?.nonCritical ? "ignored" : "failed", r.checked), a;
			} catch (e) {
				throw r.clear(), this.handleRuntimeRequestOutcome(t_(e, n()), r.checked), e;
			}
		})), this.runtimeFetch;
	}
	armRuntimeRequestWatchdog(e) {
		if (typeof window > "u" || e?.nonCritical || e?.selfBounded) return {
			clear: () => {},
			checked: () => !1
		};
		let t = !1, n = setTimeout(() => {
			t = this.handleRuntimeRequestOutcome("failed");
		}, Jg);
		return {
			clear: () => clearTimeout(n),
			checked: () => t
		};
	}
	applyRuntimeFetchToAgent(e) {
		e instanceof Vg && (e.fetch = this.createRuntimeFetch());
	}
	applyRuntimeFetchToAgents(e) {
		Object.values(e).forEach((e) => {
			this.applyRuntimeFetchToAgent(e);
		});
	}
	handleHeadersChanged() {
		this.inspectorMetadataHeadersGeneration += 1, this.setInspectorMetadata(void 0), this.refreshInspectorMetadata();
	}
	handleCredentialsChanged() {
		this.inspectorMetadataCredentialsGeneration += 1, this.setInspectorMetadata(void 0), this.refreshInspectorMetadata();
	}
	async refreshInspectorMetadata() {
		let e = ++this.inspectorMetadataGeneration;
		if (this.inspectorMetadataAbortController?.abort(), this.inspectorMetadataAbortController = void 0, !this._inspectorMetadataSupported || !this.inspectorMetadataRefreshReady || !this.runtimeUrl || this._runtimeConnectionStatus !== Ov.Connected) {
			this.setInspectorMetadata(void 0);
			return;
		}
		let t = this.runtimeUrl, n = this._requestedTransport, r = this._runtimeTransport, i = this.inspectorMetadataHeadersGeneration, a = this.inspectorMetadataCredentialsGeneration, o = this.core, s = { ...o.headers }, c = o.credentials, l = new AbortController();
		this.inspectorMetadataAbortController = l;
		let u = !1, d, f, p = new Promise((e, t) => {
			f = t;
		}), m = () => {
			f?.(/* @__PURE__ */ Error("Inspector metadata request aborted"));
		};
		l.signal.addEventListener("abort", m, { once: !0 });
		let h = new Promise((e, t) => {
			d = setTimeout(() => {
				u = !0, t(/* @__PURE__ */ Error("Inspector metadata request timed out")), l.abort();
			}, $g);
		}), ee;
		try {
			let e = (async () => {
				let e = r === "single" ? await this.fetchInspectorMetadataSingle({
					runtimeUrl: t,
					headers: s,
					credentials: c,
					signal: l.signal
				}) : await this.fetchInspectorMetadataRest({
					runtimeUrl: t,
					headers: s,
					credentials: c,
					signal: l.signal
				});
				if (e.status !== 204 && e.ok) return ip(await e.json());
			})();
			ee = await Promise.race([
				e,
				p,
				h
			]);
		} catch {
			ee = void 0;
		} finally {
			d !== void 0 && clearTimeout(d), l.signal.removeEventListener("abort", m);
		}
		this.isInspectorMetadataRequestCurrent({
			generation: e,
			runtimeUrl: t,
			requestedTransport: n,
			resolvedTransport: r,
			headersGeneration: i,
			credentialsGeneration: a,
			signal: l.signal,
			allowAbortedSignal: u
		}) && (this.inspectorMetadataAbortController = void 0, this.setInspectorMetadata(ee));
	}
	async fetchInspectorMetadataRest({ runtimeUrl: e, headers: t, credentials: n, signal: r }) {
		return fetch(`${e}/inspector-metadata`, {
			method: "GET",
			headers: t,
			...n ? { credentials: n } : {},
			signal: r
		});
	}
	async fetchInspectorMetadataSingle({ runtimeUrl: e, headers: t, credentials: n, signal: r }) {
		return fetch(e, {
			method: "POST",
			headers: n_(t),
			body: JSON.stringify({ method: "inspector/metadata" }),
			...n ? { credentials: n } : {},
			signal: r
		});
	}
	isInspectorMetadataRequestCurrent({ generation: e, runtimeUrl: t, requestedTransport: n, resolvedTransport: r, headersGeneration: i, credentialsGeneration: a, signal: o, allowAbortedSignal: s = !1 }) {
		return (s || !o.aborted) && e === this.inspectorMetadataGeneration && t === this.runtimeUrl && n === this._requestedTransport && r === this._runtimeTransport && i === this.inspectorMetadataHeadersGeneration && a === this.inspectorMetadataCredentialsGeneration && this._inspectorMetadataSupported && this.inspectorMetadataRefreshReady && this._runtimeConnectionStatus === Ov.Connected;
	}
	invalidateInspectorMetadataConnection() {
		this._inspectorMetadataSupported = !1, this._inspectorLearning = !1, this.inspectorMetadataRefreshReady = !1, this.inspectorMetadataConnectionGeneration += 1, this.inspectorMetadataGeneration += 1, this.inspectorMetadataAbortController?.abort(), this.inspectorMetadataAbortController = void 0, this.setInspectorMetadata(void 0);
	}
	setInspectorMetadata(e) {
		if (JSON.stringify(this._inspectorMetadata) === JSON.stringify(e)) return;
		this._inspectorMetadata = e;
		let t = e;
		this.inspectorMetadataNotificationQueue = this.inspectorMetadataNotificationQueue.then(() => this.notifyInspectorMetadataChanged(t)).catch((e) => {
			console.error("Subscriber onInspectorMetadataChanged queue error:", e);
		});
	}
	setRuntimeConnectionStatus(e) {
		this._runtimeConnectionStatus = e, this.runtimeHealthGeneration += 1;
	}
	handleRuntimeRequestOutcome(e, t = () => !1) {
		return e === "aborted" || e === "ignored" || e === "failed" && t() || typeof window > "u" || !this._runtimeUrl ? !1 : e === "ok" ? (this.runtimeHealthGeneration += 1, this.runtimeRecoveryRunning && (this.runtimeRecoveryPending = !0), this._runtimeConnectionStatus === Ov.Error && this.recoverRuntimeConnection(), !1) : this._runtimeConnectionStatus !== Ov.Connected || this.runtimeProbeInFlight ? !1 : (this.probeRuntimeReachability(), !0);
	}
	async fetchRuntimeInfoWithTimeout(e, t = this.runtimeUrl, n = this._runtimeTransport) {
		if (!t) throw Error("Runtime URL is not set");
		let r, i = this.fetchRuntimeInfo(t, n, e.signal);
		i.catch(() => {});
		try {
			let t = new Promise((t, n) => {
				r = setTimeout(() => {
					e.abort(), n(/* @__PURE__ */ Error(`Runtime did not answer within ${e_}ms`));
				}, e_);
			});
			return await Promise.race([i, t]);
		} finally {
			r !== void 0 && clearTimeout(r);
		}
	}
	async probeRuntimeReachability() {
		let e = this.runtimeHealthGeneration, t = ++this.runtimeProbeToken;
		this.runtimeProbeInFlight = !0;
		let n = new AbortController();
		this.runtimeProbeAbortController = n;
		try {
			await this.fetchRuntimeInfoWithTimeout(n);
		} catch (t) {
			if (e !== this.runtimeHealthGeneration) return;
			await this.markRuntimeUnreachable(t instanceof Error ? t : Error(String(t)));
		} finally {
			this.runtimeProbeAbortController === n && (this.runtimeProbeAbortController = void 0), this.runtimeProbeToken === t && (this.runtimeProbeInFlight = !1);
		}
	}
	async markRuntimeUnreachable(e) {
		this.setRuntimeConnectionStatus(Ov.Error), await this.notifyRuntimeStatusChanged(Ov.Error);
		let t = Fg(e) ? e.runtimeInfoStatus : void 0;
		mp.warn(t === void 0 ? `Runtime did not answer the identification request (${this._runtimeUrl}/info): ${e.message}. The runtime appears to be unreachable.` : `Runtime answered the identification request with status ${t} (${this._runtimeUrl}/info): ${e.message}. The runtime is reachable but refused the request — check credentials and authorisation before addresses and ports.`), await this.core.emitError({
			error: e,
			code: Ev.RUNTIME_INFO_FETCH_FAILED,
			context: {
				runtimeUrl: this._runtimeUrl,
				reason: t === void 0 ? "no-answer" : "answered",
				...t === void 0 ? {} : { runtimeStatus: t }
			}
		});
	}
	async recoverRuntimeConnection() {
		if (this.runtimeRecoveryRunning) {
			this.runtimeRecoveryPending = !0;
			return;
		}
		this.runtimeRecoveryRunning = !0;
		try {
			do
				this.runtimeRecoveryPending = !1, await this.updateRuntimeConnection({
					preserveOnFailure: !0,
					recovery: !0
				});
			while (this.runtimeRecoveryPending && this._runtimeConnectionStatus !== Ov.Connected);
		} finally {
			this.runtimeRecoveryRunning = !1, this.runtimeRecoveryPending = !1;
		}
	}
	async updateRuntimeConnection(e) {
		if (typeof window > "u") return;
		let t = this.runtimeConnectionKey(), n = this._connectionInFlight;
		if (n && n.attempt.key === t && this.isCurrentRuntimeConnection(n.attempt)) return n.promise;
		let r = {
			key: t,
			generation: ++this._runtimeConnectionGeneration
		};
		this._activeRuntimeConnectionAttempt = r;
		let i = this.performRuntimeConnection({
			attempt: r,
			runtimeUrl: this._runtimeUrl,
			transport: this._runtimeTransport,
			options: e
		});
		return this._connectionInFlight = {
			attempt: r,
			promise: i
		}, i.finally(() => {
			this._connectionInFlight?.promise === i && (this._connectionInFlight = void 0);
		}), i;
	}
	runtimeConnectionKey() {
		return `${this._runtimeUrl ?? ""}::${this._requestedTransport}`;
	}
	canReuseRuntimeAgent(e, t, n) {
		if (!t) return !1;
		let r = this.remoteAgentConnections.get(e);
		return r?.runtimeUrl === t.replace(/\/$/, "") && r.transport === n;
	}
	isCurrentRuntimeConnection(e) {
		return this._activeRuntimeConnectionAttempt?.generation === e.generation && this.runtimeConnectionKey() === e.key;
	}
	resetRuntimeEntitlementRetry() {
		this._runtimeEntitlementRetryTimer !== void 0 && (clearTimeout(this._runtimeEntitlementRetryTimer), this._runtimeEntitlementRetryTimer = void 0), this._runtimeEntitlementRetryAttemptedKey = void 0, this._runtimeEntitlementRetryPendingKey = void 0;
	}
	updateRuntimeEntitlementRetry(e, t) {
		if (!this.isCurrentRuntimeConnection(t)) return;
		let { key: n } = t;
		if (e?.status === "ready" || e?.error.retryable !== !0) {
			this.resetRuntimeEntitlementRetry();
			return;
		}
		if (this._runtimeEntitlementRetryTimer === void 0) {
			if (this._runtimeEntitlementRetryAttemptedKey === n) {
				this._runtimeEntitlementRetryPendingKey = void 0;
				return;
			}
			this._runtimeEntitlementRetryAttemptedKey = n, this._runtimeEntitlementRetryPendingKey = n, this._runtimeEntitlementRetryTimer = setTimeout(() => {
				this._runtimeEntitlementRetryTimer = void 0, this.executeRuntimeEntitlementRetry(t).catch((e) => {
					let t = e instanceof Error ? e.message : JSON.stringify(e);
					mp.warn(`Failed to retry runtime info (${this.runtimeUrl}/info): ${t}`);
				});
			}, r_);
		}
	}
	async executeRuntimeEntitlementRetry(e) {
		let t = this._connectionInFlight;
		t?.attempt.generation === e.generation && await t.promise, this._runtimeUrl && this.isCurrentRuntimeConnection(e) && await this.updateRuntimeConnection();
	}
	async performRuntimeConnection({ attempt: e, runtimeUrl: t, transport: n, options: r }) {
		let { key: i } = e;
		if (!t) {
			if (this.invalidateInspectorMetadataConnection(), this.setRuntimeConnectionStatus(Ov.Disconnected), this._runtimeVersion = void 0, this._audioFileTranscriptionEnabled = !1, this._runtimeMode = "sse", this._intelligence = void 0, this._threadEndpoints = void 0, this._singleRouteResourceOperations = !1, this._suggestions = void 0, this._inspectorLearning = !1, this._a2uiEnabled = !1, this._a2uiAgents = void 0, this._openGenerativeUIEnabled = !1, this._licenseStatus = void 0, this._runtimeEntitlements = void 0, this.remoteAgents = {}, this._agents = this.localAgents, await this.notifyRuntimeStatusChanged(Ov.Disconnected), !this.isCurrentRuntimeConnection(e)) return;
			await this.notifyAgentsChanged();
			return;
		}
		let a = this.inspectorMetadataConnectionGeneration;
		this.setRuntimeConnectionStatus(Ov.Connecting);
		let o = this.runtimeHealthGeneration;
		if (await this.notifyRuntimeStatusChanged(Ov.Connecting), this.isCurrentRuntimeConnection(e)) try {
			if (a !== this.inspectorMetadataConnectionGeneration) return;
			let { runtimeInfo: i, resolvedTransport: o } = r?.recovery ? await this.fetchRuntimeInfoWithTimeout(new AbortController(), t, n) : await this.fetchRuntimeInfo(t, n);
			if (!this.isCurrentRuntimeConnection(e) || a !== this.inspectorMetadataConnectionGeneration) return;
			this._runtimeTransport = o;
			let { version: s, ...c } = i, l = this.core.credentials, u = this.core.debug, d = Object.fromEntries(Object.entries(c.agents).map(([e, { description: n, capabilities: a }]) => {
				let o = Object.prototype.hasOwnProperty.call(this.remoteAgents, e) ? this.remoteAgents[e] : void 0;
				if (o instanceof Vg && this.canReuseRuntimeAgent(o, t, this._runtimeTransport)) return this.applyHeadersToAgent(o), this.applyCredentialsToAgent(o), this.applyRuntimeFetchToAgent(o), [e, o];
				let s = new Vg({
					runtimeUrl: t,
					agentId: e,
					description: n,
					transport: this._runtimeTransport,
					credentials: l,
					runtimeMode: i.mode ?? "sse",
					intelligence: i.intelligence,
					capabilities: a,
					debug: u ? dp(u) : void 0
				});
				return this.applyHeadersToAgent(s), this.applyRuntimeFetchToAgent(s), this.mintedThreadIds.set(s, s.threadId), r?.preserveOnFailure === !0 && o && (s.threadId = o.threadId, s.setState(o.state), s.setMessages([...o.messages])), this.remoteAgentConnections.set(s, {
					runtimeUrl: t,
					transport: this._runtimeTransport
				}), [e, s];
			}));
			this.remoteAgents = r?.recovery ? this.reconcileRecoveredAgents(d) : d, this._agents = {
				...this.localAgents,
				...this.remoteAgents
			}, this.setRuntimeConnectionStatus(Ov.Connected), this._runtimeVersion = s, this._audioFileTranscriptionEnabled = i.audioFileTranscriptionEnabled ?? !1, this._runtimeMode = i.mode ?? "sse", this._intelligence = i.intelligence, this._singleRouteResourceOperations = o === "single" && i.singleRoute?.resourceOperations === !0, this._threadEndpoints = this._singleRouteResourceOperations ? i.singleRoute?.threadEndpoints : i.threadEndpoints, this._suggestions = i.suggestions, this._inspectorLearning = i.inspectorLearning === !0, this._inspectorMetadataSupported = i.inspectorMetadata === !0, this.inspectorMetadataRefreshReady = !1, this._inspectorMetadataSupported || this.setInspectorMetadata(void 0);
			let f = i.a2ui;
			if (this._a2uiEnabled = f?.enabled ?? i.a2uiEnabled ?? !1, this._a2uiAgents = f?.enabled ? f.agents : void 0, this._openGenerativeUIEnabled = i.openGenerativeUIEnabled ?? !1, this._licenseStatus = i.licenseStatus, this._runtimeEntitlements = i.runtimeEntitlements, this.updateRuntimeEntitlementRetry(i.runtimeEntitlements, e), this._telemetryDisabled = i.telemetryDisabled ?? !1, await this.notifyRuntimeStatusChanged(Ov.Connected), !this.isCurrentRuntimeConnection(e) || (await this.notifyAgentsChanged(), a !== this.inspectorMetadataConnectionGeneration || this._runtimeConnectionStatus !== Ov.Connected)) return;
			this.inspectorMetadataRefreshReady = !0, this._inspectorMetadataSupported && this.refreshInspectorMetadata();
		} catch (n) {
			if (!this.isCurrentRuntimeConnection(e) || a !== this.inspectorMetadataConnectionGeneration) return;
			let s = this._runtimeEntitlementRetryTimer === void 0 && this._runtimeEntitlementRetryAttemptedKey === i && this._runtimeEntitlementRetryPendingKey === i;
			if (s && (this._runtimeEntitlementRetryPendingKey = void 0), r?.preserveOnFailure) {
				if (r?.recovery && o !== this.runtimeHealthGeneration) return;
				this.setRuntimeConnectionStatus(Ov.Error), await this.notifyRuntimeStatusChanged(Ov.Error);
			} else this.invalidateInspectorMetadataConnection(), this.setRuntimeConnectionStatus(Ov.Error), this._runtimeVersion = void 0, this._audioFileTranscriptionEnabled = !1, this._runtimeMode = "sse", this._intelligence = void 0, this._threadEndpoints = void 0, this._singleRouteResourceOperations = !1, this._suggestions = void 0, this._inspectorLearning = !1, this._a2uiEnabled = !1, this._a2uiAgents = void 0, this._openGenerativeUIEnabled = !1, s || (this._licenseStatus = void 0, this._runtimeEntitlements = void 0), this.remoteAgents = {}, this._agents = this.localAgents, await this.notifyRuntimeStatusChanged(Ov.Error), await this.notifyAgentsChanged();
			let c = n instanceof Error ? n.message : JSON.stringify(n);
			mp.warn(`Failed to load runtime info (${t}/info): ${c}`);
			let l = n instanceof Error ? n : Error(String(n));
			await this.core.emitError({
				error: l,
				code: Ev.RUNTIME_INFO_FETCH_FAILED,
				context: { runtimeUrl: t }
			});
		}
	}
	async fetchRuntimeInfo(e, t, n) {
		let r = this.core.headers, i = this.core.credentials, a = { ...r };
		if (t === "single") return {
			runtimeInfo: await this.fetchRuntimeInfoSingle(e, a, i, n),
			resolvedTransport: "single"
		};
		if (t === "auto") return this.fetchRuntimeInfoAutoDetect(e, a, i, n);
		let o = await fetch(`${e}/info`, {
			headers: a,
			...i ? { credentials: i } : {},
			...n ? { signal: n } : {}
		});
		if (!o.ok) throw await Pg(o);
		return {
			runtimeInfo: await o.json(),
			resolvedTransport: "rest"
		};
	}
	async fetchRuntimeInfoSingle(e, t, n, r) {
		let i = await fetch(e, {
			method: "POST",
			headers: n_(t),
			body: JSON.stringify({ method: "info" }),
			...n ? { credentials: n } : {},
			...r ? { signal: r } : {}
		});
		if (!i.ok) throw await Pg(i);
		return await i.json();
	}
	async fetchRuntimeInfoAutoDetect(e, t, n, r) {
		try {
			let i = await fetch(`${e}/info`, {
				headers: { ...t },
				...n ? { credentials: n } : {},
				...r ? { signal: r } : {}
			});
			if (i.status >= 200 && i.status < 300) return {
				runtimeInfo: await i.json(),
				resolvedTransport: "rest"
			};
		} catch {}
		return {
			runtimeInfo: await this.fetchRuntimeInfoSingle(e, { ...t }, n, r),
			resolvedTransport: "single"
		};
	}
	assignAgentIds(e) {
		return Object.entries(e).forEach(([e, t]) => {
			t && this.validateAndAssignAgentId(e, t);
		}), e;
	}
	validateAndAssignAgentId(e, t) {
		if (t.agentId && t.agentId !== e) throw Error(`Agent registration mismatch: Agent with ID "${t.agentId}" cannot be registered under key "${e}". The agent ID must match the registration key or be undefined.`);
		t.agentId || (t.agentId = e);
	}
	async notifyRuntimeStatusChanged(e) {
		await this.core.notifySubscribers((t) => t.onRuntimeConnectionStatusChanged?.({
			copilotkit: this.core,
			status: e
		}), "Error in CopilotKitCore subscriber (onRuntimeConnectionStatusChanged):");
	}
	async notifyAgentsChanged() {
		await this.core.notifySubscribers((e) => e.onAgentsChanged?.({
			copilotkit: this.core,
			agents: this._agents
		}), "Subscriber onAgentsChanged error:");
	}
	async notifyInspectorMetadataChanged(e) {
		await this.core.notifySubscribers((t) => t.onInspectorMetadataChanged?.({
			copilotkit: this.core,
			inspectorMetadata: e
		}), "Subscriber onInspectorMetadataChanged error:");
	}
}, a_ = class {
	constructor(e) {
		u(this, "_context", {}), this.core = e;
	}
	get context() {
		return this._context;
	}
	addContext({ description: e, value: t, agentIds: n }) {
		let r = ap();
		return this._context[r] = {
			description: e,
			value: t,
			...n ? { agentIds: n } : {}
		}, this.notifySubscribers(), r;
	}
	getContextForAgent(e) {
		return Object.values(this._context).filter((t) => !t.agentIds || e !== void 0 && t.agentIds.includes(e)).map(({ description: e, value: t }) => ({
			description: e,
			value: t
		}));
	}
	removeContext(e) {
		delete this._context[e], this.notifySubscribers();
	}
	async notifySubscribers() {
		await this.core.notifySubscribers((e) => e.onContextChanged?.({
			copilotkit: this.core,
			context: this._context
		}), "Subscriber onContextChanged error:");
	}
}, o_ = class {
	constructor(e) {
		u(this, "_suggestionsConfig", {}), u(this, "_suggestions", {}), u(this, "_runningSuggestions", {}), this.core = e;
	}
	initialize(e) {
		for (let t of e) this._suggestionsConfig[ap()] = t;
	}
	addSuggestionsConfig(e) {
		let t = ap();
		return this._suggestionsConfig[t] = e, this.notifySuggestionsConfigChanged(), t;
	}
	removeSuggestionsConfig(e) {
		delete this._suggestionsConfig[e], this.notifySuggestionsConfigChanged();
	}
	reloadSuggestions(e) {
		this.clearSuggestions(e);
		let t = this.core.getAgent(e), n = t?.messages?.length ?? 0, r = !1;
		for (let i of Object.values(this._suggestionsConfig)) {
			if (i.consumerAgentId !== void 0 && i.consumerAgentId !== "*" && i.consumerAgentId !== e || !this.shouldShowSuggestions(i, n)) continue;
			let a = ap();
			if (c_(i)) {
				if (!t) continue;
				r || (r = !0, this.notifySuggestionsStartedLoading(e)), this.generateSuggestions(a, i, e);
			} else l_(i) && this.addStaticSuggestions(a, i, e);
		}
	}
	clearSuggestions(e) {
		let t = this._runningSuggestions[e];
		if (t) {
			for (let e of t) e.abortRun();
			delete this._runningSuggestions[e];
		}
		this._suggestions[e] = {}, this.notifySuggestionsChanged(e, []);
	}
	getSuggestions(e) {
		return {
			suggestions: Object.values(this._suggestions[e] ?? {}).flat(),
			isLoading: (this._runningSuggestions[e]?.length ?? 0) > 0
		};
	}
	async generateSuggestions(e, t, n) {
		let r, i = !1;
		try {
			let a = this.core, o = t.providerAgentId ?? "default", s = a.getAgent(o);
			if (!s) throw Error(`Suggestions provider agent not found: ${o}`);
			let c = a.getAgent(n);
			if (!c) throw Error(`Suggestions consumer agent not found: ${n}`);
			let l = [
				"Suggest what the user could say next. Provide clear, highly relevant suggestions by calling the `copilotkitSuggest` tool.",
				`Provide at least ${t.minSuggestions ?? 1} and at most ${t.maxSuggestions ?? 3} suggestions.`,
				`The user has the following tools available: ${JSON.stringify(a.buildFrontendTools(n))}.`,
				` ${t.instructions}`
			].join("\n");
			this._suggestions[n] = {
				...this._suggestions[n],
				[e]: []
			};
			let u = JSON.parse(JSON.stringify(c.messages)), d = JSON.parse(JSON.stringify(c.state ?? {})), f = this.core.suggestions === !0 && this.core.runtimeTransport !== "single", p;
			if (f) {
				let e = `${this.core.runtimeUrl}/agent/${encodeURIComponent(o)}/suggest`, t = this.core.credentials;
				p = new Gf({
					agentId: o,
					url: e,
					headers: { ...this.core.headers },
					...t ? { fetch: (e, n) => fetch(e, {
						...n,
						credentials: t
					}) } : {}
				});
			} else p = s.clone();
			p.threadId = e, p.setMessages(u), p.setState(d), r = { abortRun: () => {
				i = !0, p.abortRun();
			} }, this._runningSuggestions[n] = [...this._runningSuggestions[n] ?? [], r], p.addMessage({
				id: e,
				role: "user",
				content: l
			}), await p.runAgent({
				context: a.getContextForAgent(n),
				forwardedProps: {
					...a.properties,
					toolChoice: {
						type: "function",
						function: { name: "copilotkitSuggest" }
					}
				},
				tools: [u_]
			}, { onMessagesChanged: ({ messages: t }) => {
				this.extractSuggestions(t, e, n, !0);
			} });
		} catch (e) {
			!s_(e) && !i && console.warn("Error generating suggestions:", e);
		} finally {
			this.finalizeSuggestions(e, n);
			let t = this._runningSuggestions[n], i = r ? (t ?? []).filter((e) => e !== r) : t ?? [];
			i.length === 0 ? (delete this._runningSuggestions[n], await this.notifySuggestionsFinishedLoading(n)) : this._runningSuggestions[n] = i;
		}
	}
	finalizeSuggestions(e, t) {
		let n = this._suggestions[t], r = n?.[e];
		if (n && r && r.length > 0) {
			let i = r.filter((e) => e.title !== "" || e.message !== "").map((e) => ({
				...e,
				isLoading: !1
			}));
			i.length > 0 ? n[e] = i : delete n[e];
			let a = Object.values(this._suggestions[t] ?? {}).flat();
			this.notifySuggestionsChanged(t, a, "finalized");
		}
	}
	extractSuggestions(e, t, n, r) {
		let i = e.findIndex((e) => e.id === t);
		if (i == -1) return;
		let a = [], o = e.slice(i + 1);
		for (let e of o) if (e.role === "assistant" && e.toolCalls) {
			for (let t of e.toolCalls) if (t.function.name === "copilotkitSuggest") {
				let e = cp(Array.isArray(t.function.arguments) ? t.function.arguments.join("") : t.function.arguments);
				if (e && typeof e == "object" && "suggestions" in e) {
					let t = e.suggestions;
					if (Array.isArray(t)) for (let e of t) e && typeof e == "object" && "title" in e && a.push({
						title: e.title ?? "",
						message: e.message ?? "",
						isLoading: !1
					});
				}
			}
		}
		r && a.length > 0 && (a[a.length - 1].isLoading = !0);
		let s = this._suggestions[n];
		if (s) {
			s[t] = a;
			let e = Object.values(this._suggestions[n] ?? {}).flat();
			this.notifySuggestionsChanged(n, e, "suggestions changed");
		}
	}
	async notifySuggestionsConfigChanged() {
		await this.core.notifySubscribers((e) => e.onSuggestionsConfigChanged?.({
			copilotkit: this.core,
			suggestionsConfig: this._suggestionsConfig
		}), "Subscriber onSuggestionsConfigChanged error:");
	}
	async notifySuggestionsChanged(e, t, n = "") {
		await this.core.notifySubscribers((n) => n.onSuggestionsChanged?.({
			copilotkit: this.core,
			agentId: e,
			suggestions: t
		}), `Subscriber onSuggestionsChanged error: ${n}`);
	}
	async notifySuggestionsStartedLoading(e) {
		await this.core.notifySubscribers((t) => t.onSuggestionsStartedLoading?.({
			copilotkit: this.core,
			agentId: e
		}), "Subscriber onSuggestionsStartedLoading error:");
	}
	async notifySuggestionsFinishedLoading(e) {
		await this.core.notifySubscribers((t) => t.onSuggestionsFinishedLoading?.({
			copilotkit: this.core,
			agentId: e
		}), "Subscriber onSuggestionsFinishedLoading error:");
	}
	shouldShowSuggestions(e, t) {
		let n = e.available;
		if (!n) return c_(e) ? t > 0 : t === 0;
		switch (n) {
			case "disabled": return !1;
			case "before-first-message": return t === 0;
			case "after-first-message": return t > 0;
			case "always": return !0;
			default: return !1;
		}
	}
	addStaticSuggestions(e, t, n) {
		let r = t.suggestions.map((e) => ({
			...e,
			isLoading: !1
		}));
		this._suggestions[n] = {
			...this._suggestions[n],
			[e]: r
		};
		let i = Object.values(this._suggestions[n] ?? {}).flat();
		this.notifySuggestionsChanged(n, i, "static suggestions added");
	}
};
function s_(e) {
	return typeof e == "object" && !!e && "name" in e && e.name === "AbortError";
}
function c_(e) {
	return "instructions" in e;
}
function l_(e) {
	return "suggestions" in e;
}
var u_ = {
	name: "copilotkitSuggest",
	description: "Suggest what the user could say next",
	parameters: {
		type: "object",
		properties: { suggestions: {
			type: "array",
			description: "List of suggestions shown to the user as buttons.",
			items: {
				type: "object",
				properties: {
					title: {
						type: "string",
						description: "The title of the suggestion. This is shown as a button and should be short."
					},
					message: {
						type: "string",
						description: "The message to send when the suggestion is clicked. This should be a clear, complete sentence and will be sent as an instruction to the AI."
					}
				},
				required: ["title", "message"]
			}
		} },
		required: ["suggestions"]
	}
}, d_ = "Forwarded to client";
function f_(e) {
	if (typeof e == "string") return e.trim();
	if (Array.isArray(e)) {
		let t = e.flatMap((e) => typeof e == "string" ? [e] : e && typeof e == "object" && "text" in e && typeof e.text == "string" ? [e.text] : []).join("").trim();
		return t.length > 0 ? t : null;
	}
	return e && typeof e == "object" && "text" in e && typeof e.text == "string" ? e.text.trim() : null;
}
function p_(e) {
	return f_(e) === d_;
}
var m_ = {
	type: "object",
	properties: {}
};
function h_(e) {
	if (!e.parameters) return { ...m_ };
	let t = pp(e.parameters, { zodToJsonSchema: (e, t) => fg(e, t) });
	if (!t || typeof t != "object") return { ...m_ };
	let { $schema: n, ...r } = t;
	return typeof r.type != "string" && (r.type = "object"), (typeof r.properties != "object" || r.properties === null) && (r.properties = {}), g_(r), r;
}
function g_(e) {
	if (!e || typeof e != "object") return;
	if (Array.isArray(e)) {
		e.forEach(g_);
		return;
	}
	let t = e;
	t.additionalProperties !== void 0 && delete t.additionalProperties;
	for (let e of Object.values(t)) g_(e);
}
function __() {
	return typeof document > "u" ? null : document.modelContext ?? null;
}
var v_ = class {
	constructor() {
		u(this, "entries", /* @__PURE__ */ new Map()), u(this, "warnedNames", /* @__PURE__ */ new Set());
	}
	get registeredNames() {
		return [...this.entries.keys()];
	}
	sync(e) {
		let t = __();
		if (t) {
			for (let [t, n] of [...this.entries]) e.get(t) !== n.tool && (n.controller.abort(), this.entries.delete(t));
			for (let [n, r] of e) {
				if (this.entries.has(n)) continue;
				if (!r.description) {
					this.warnOnce(n, `Skipping WebMCP registration for tool '${n}': WebMCP requires a description.`);
					continue;
				}
				let e = new AbortController();
				this.entries.set(n, {
					tool: r,
					controller: e
				}), t.registerTool(this.buildModelContextTool(r), { signal: e.signal }).catch((t) => {
					if (this.entries.get(n)?.controller !== e) return;
					this.entries.delete(n);
					let r = t instanceof Error ? t.message : String(t);
					this.warnOnce(n, `WebMCP registration failed for tool '${n}': ${r}`);
				});
			}
		}
	}
	buildModelContextTool(e) {
		let t = typeof e.webmcp == "object" ? e.webmcp.annotations : void 0;
		return {
			name: e.name,
			description: e.description,
			inputSchema: h_(e),
			execute: async (t, n) => {
				if (!e.handler) return "";
				let r = {
					id: ap(),
					type: "function",
					function: {
						name: e.name,
						arguments: JSON.stringify(t ?? {})
					}
				};
				return await e.handler(t, {
					toolCall: r,
					signal: n?.signal
				});
			},
			...t ? { annotations: t } : {}
		};
	}
	warnOnce(e, t) {
		this.warnedNames.has(e) || (this.warnedNames.add(e), mp.warn(`[CopilotKit] ${t}`));
	}
}, y_ = 100, b_ = "*", x_ = class {
	constructor(e) {
		u(this, "_propTools", []), u(this, "_hookTools", /* @__PURE__ */ new Map()), u(this, "_cachedMergedTools", null), u(this, "_catalogComponents", []), u(this, "_disabledCatalogComponents", /* @__PURE__ */ new Set()), u(this, "_disabledToolKeys", /* @__PURE__ */ new Set()), u(this, "_runAbortController", null), u(this, "_runDepth", 0), u(this, "_webmcpRegistry", new v_()), u(this, "_lastConnectedThreadIdsByAgent", /* @__PURE__ */ new Map()), u(this, "_anonymousAgentIds", /* @__PURE__ */ new WeakMap()), u(this, "_nextAnonymousAgentId", 0), this.core = e;
	}
	abortCurrentRun() {
		this._runAbortController?.abort();
	}
	get _internal() {
		return this.core;
	}
	getConnectRestoreKey(e) {
		if (e.agentId) return `agent:${e.agentId}`;
		let t = this._anonymousAgentIds.get(e);
		if (t) return t;
		let n = `anonymous:${this._nextAnonymousAgentId}`;
		return this._nextAnonymousAgentId += 1, this._anonymousAgentIds.set(e, n), n;
	}
	get tools() {
		if (this._hookTools.size === 0) return this._propTools;
		if (this._cachedMergedTools) return this._cachedMergedTools;
		let e = /* @__PURE__ */ new Map();
		for (let t of this._propTools) e.set(this.capabilityKey(t.name, t.agentId), t);
		for (let [t, n] of this._hookTools) e.set(t, n);
		return this._cachedMergedTools = Array.from(e.values()), this._cachedMergedTools;
	}
	initialize(e) {
		this._propTools = [...e], this._cachedMergedTools = null, this.syncWebMCP();
	}
	addTool(e) {
		let t = this.capabilityKey(e.name, e.agentId);
		if (this._hookTools.has(t)) {
			mp.warn(`Tool already exists: '${e.name}' for agent '${e.agentId || "global"}', skipping.`);
			return;
		}
		this._hookTools.set(t, e), this._cachedMergedTools = null, this.syncWebMCP();
	}
	removeTool(e, t) {
		this._hookTools.delete(this.capabilityKey(e, t)), this._propTools = this._propTools.filter((n) => t === void 0 ? !(n.name === e && !n.agentId) : n.name !== e || n.agentId !== t), this._cachedMergedTools = null, this.syncWebMCP();
	}
	getTool(e) {
		let { toolName: t, agentId: n } = e, r = this.tools;
		if (n) {
			let e = r.find((e) => e.name === t && e.agentId === n);
			if (e) return e;
		}
		return r.find((e) => e.name === t && !e.agentId);
	}
	setTools(e) {
		this._propTools = [...e], this._cachedMergedTools = null, this.syncWebMCP();
	}
	get catalogComponents() {
		return this._catalogComponents;
	}
	setCatalogComponents(e) {
		this._catalogComponents = [...e];
	}
	setCatalogComponentEnabled(e, t) {
		t ? this._disabledCatalogComponents.delete(e) : this._disabledCatalogComponents.add(e);
	}
	isCatalogComponentEnabled(e) {
		return !this._disabledCatalogComponents.has(e);
	}
	async connectAgent({ agent: e }) {
		let t = e.threadId ?? null;
		try {
			let n = this.getConnectRestoreKey(e), r = t !== (this._lastConnectedThreadIdsByAgent.get(n) ?? null);
			if (this._lastConnectedThreadIdsByAgent.set(n, t), await e.detachActiveRun(), r) {
				e.setMessages([]), e.setState({});
				let n = e;
				t && (typeof n.clearReplayCursor == "function" && n.clearReplayCursor(t), typeof n.clearReconnectCursor == "function" && n.clearReconnectCursor(t));
			}
			this._internal.applyHeadersToAgent(e), await this._internal.notifySubscribers((t) => t.onAgentRunStarted?.({
				copilotkit: this.core,
				agent: e
			}), "Subscriber onAgentRunStarted error:");
			let i = await e.connectAgent({
				forwardedProps: this._internal.properties,
				tools: this.buildFrontendTools(e.agentId),
				context: this._internal.getContextForAgent(e.agentId)
			}, this.createAgentErrorSubscriber(e));
			return this.processAgentResult({
				runAgentResult: i,
				agent: e,
				executeFrontendTools: !1
			});
		} catch (n) {
			let r = n instanceof Error ? n : Error(String(n));
			if (!qg(r)) {
				let n = {};
				e.agentId && (n.agentId = e.agentId), t && (n.threadId = t), await this._internal.emitError({
					error: r,
					code: Ev.AGENT_CONNECT_FAILED,
					context: n
				});
			}
			return {
				result: void 0,
				newMessages: []
			};
		}
	}
	async runAgent({ agent: e, forwardedProps: t, resume: n, runId: r }, i) {
		if (e.agentId && this._internal.suggestionEngine.clearSuggestions(e.agentId), this._internal.applyHeadersToAgent(e), e.detachActiveRun) try {
			await e.detachActiveRun();
		} catch (e) {
			throw i?.cancel(), e;
		}
		let a = this._runDepth === 0, o;
		if (a) {
			this._runAbortController = new AbortController();
			let t = this._runAbortController;
			o = e.abortRun.bind(e), e.abortRun = () => {
				t.abort(), o();
			}, await this._internal.notifySubscribers((t) => t.onAgentRunStarted?.({
				copilotkit: this.core,
				agent: e
			}), "Subscriber onAgentRunStarted error:");
		}
		this._runDepth++;
		try {
			let a = r, o = this.createAgentErrorSubscriber(e), s = !1, c = o.onRunStartedEvent, l = o.onRunInitialized;
			o.onRunInitialized = async (e) => (i?.bind(e.input), l?.(e)), o.onRunStartedEvent = async (e) => (s = !0, i || (a = e.input.runId), c?.(e));
			let u = r !== void 0 && !i, d = {
				forwardedProps: {
					...this._internal.properties,
					...t
				},
				...n === void 0 ? {} : { resume: n },
				...u ? { runId: r } : {},
				tools: this.buildFrontendTools(e.agentId),
				context: this._internal.getContextForAgent(e.agentId)
			}, f = await e.runAgent(d, o);
			return s || i?.cancel(), await this.processAgentResult({
				runAgentResult: f,
				agent: e,
				runId: a
			});
		} catch (t) {
			i?.cancel();
			let n = t instanceof Error ? t : Error(String(t)), r = {};
			return e.agentId && (r.agentId = e.agentId), await this._internal.emitError({
				error: n,
				code: Ev.AGENT_RUN_FAILED,
				context: r
			}), {
				result: void 0,
				newMessages: []
			};
		} finally {
			this._runDepth--, a && o && (e.abortRun = o);
		}
	}
	async processAgentResult({ runAgentResult: e, agent: t, runId: n, executeFrontendTools: r = !0 }) {
		let { newMessages: i } = e, a = t.agentId, o = !1;
		if (r) {
			for (let e of i) if (e.role === "assistant") for (let n of e.toolCalls || []) {
				let r = this.getTool({
					toolName: n.function.name,
					agentId: t.agentId
				}), s, c = () => (r || s || (s = this.getTool({
					toolName: b_,
					agentId: t.agentId
				})), s), l = i.findIndex((e) => e.role === "tool" && e.toolCallId === n.id), u = l === -1 ? void 0 : i[l], d = r ?? c();
				if (u && d?.handler && this.isFrontendPlaceholderResult(u)) {
					i.splice(l, 1), l = -1;
					let e = t.messages.findIndex((e) => e.role === "tool" && e.toolCallId === n.id);
					e !== -1 && t.messages.splice(e, 1);
				}
				if (l === -1) {
					if (r) await this.executeSpecificTool(r, n, e, t, a) && (o = !0);
					else {
						let r = c();
						r && await this.executeWildcardTool(r, n, e, t, a) && (o = !0);
					}
				}
			}
		}
		if (o && !this._runAbortController?.signal.aborted) {
			if (this._runDepth >= y_) mp.warn(`[CopilotKit] Follow-up depth limit (${y_}) reached for agent "${a}". Stopping recursive follow-up runs to prevent an infinite loop. This usually indicates a tool that keeps requesting a follow-up (e.g. the LLM repeatedly calling the same tool). Consider setting "followUp: false" on the offending tool.`);
			else {
				await this._internal.waitForPendingFrameworkUpdates();
				let e = this._internal.stateManager.markNextRunAsContinuation(t, n);
				return await this.runAgent({
					agent: t,
					...n === void 0 ? {} : { runId: n }
				}, e);
			}
		}
		return this._internal.suggestionEngine.reloadSuggestions(a), e;
	}
	isFrontendPlaceholderResult(e) {
		return e.role === "tool" && p_(e.content);
	}
	async executeToolHandler({ tool: e, toolCall: t, agent: n, agentId: r, handlerArgs: i, toolType: a, messageId: o }) {
		let s = "", c, l = !1, u;
		try {
			u = C_(i, t.function.name);
		} catch (e) {
			let n = e instanceof Error ? e : Error(String(e));
			c = n.message, l = !0, await this._internal.emitError({
				error: n,
				code: Ev.TOOL_ARGUMENT_PARSE_FAILED,
				context: {
					agentId: r,
					toolCallId: t.id,
					toolName: t.function.name,
					rawArguments: i,
					toolType: a,
					...o ? { messageId: o } : {}
				}
			});
		}
		if (await this._internal.notifySubscribers((e) => e.onToolExecutionStart?.({
			copilotkit: this.core,
			toolCallId: t.id,
			agentId: r,
			toolName: t.function.name,
			args: u
		}), "Subscriber onToolExecutionStart error:"), !c) try {
			let r = await e.handler(u, {
				toolCall: t,
				agent: n,
				signal: this._runAbortController?.signal
			});
			s = r == null ? "" : typeof r == "string" ? r : JSON.stringify(r);
		} catch (e) {
			let n = e instanceof Error ? e : Error(String(e));
			c = n.message, await this._internal.emitError({
				error: n,
				code: Ev.TOOL_HANDLER_FAILED,
				context: {
					agentId: r,
					toolCallId: t.id,
					toolName: t.function.name,
					parsedArgs: u,
					toolType: a,
					...o ? { messageId: o } : {}
				}
			});
		}
		return c && (s = `Error: ${c}`), await this._internal.notifySubscribers((e) => e.onToolExecutionEnd?.({
			copilotkit: this.core,
			toolCallId: t.id,
			agentId: r,
			toolName: t.function.name,
			result: c ? "" : s,
			error: c
		}), "Subscriber onToolExecutionEnd error:"), {
			result: s,
			error: c,
			isArgumentError: l
		};
	}
	async executeSpecificTool(e, t, n, r, i) {
		if (e?.agentId && e.agentId !== r.agentId) return !1;
		let a = {
			result: "",
			error: void 0,
			isArgumentError: !1
		};
		e?.handler && (a = await this.executeToolHandler({
			tool: e,
			toolCall: t,
			agent: r,
			agentId: i,
			handlerArgs: t.function.arguments,
			toolType: "specific",
			messageId: n.id
		}));
		{
			let i = r.messages.findIndex((e) => e.id === n.id);
			if (i === -1) return !1;
			let o = i + 1;
			for (; o < r.messages.length && r.messages[o]?.role === "tool";) o++;
			let s = {
				id: ap(),
				role: "tool",
				toolCallId: t.id,
				content: a.result
			};
			if (r.messages.splice(o, 0, s), !a.error && e?.followUp !== !1) return !0;
		}
		return !1;
	}
	async executeWildcardTool(e, t, n, r, i) {
		if (e?.agentId && e.agentId !== r.agentId) return !1;
		let a = "", o;
		if (e?.handler) {
			let s;
			try {
				s = C_(t.function.arguments, t.function.name);
			} catch (e) {
				let r = e instanceof Error ? e : Error(String(e));
				o = r.message, await this._internal.emitError({
					error: r,
					code: Ev.TOOL_ARGUMENT_PARSE_FAILED,
					context: {
						agentId: i,
						toolCallId: t.id,
						toolName: t.function.name,
						rawArguments: t.function.arguments,
						toolType: "wildcard",
						messageId: n.id
					}
				});
			}
			let c = {
				toolName: t.function.name,
				args: s
			};
			if (await this._internal.notifySubscribers((e) => e.onToolExecutionStart?.({
				copilotkit: this.core,
				toolCallId: t.id,
				agentId: i,
				toolName: t.function.name,
				args: c
			}), "Subscriber onToolExecutionStart error:"), !o) try {
				let n = await e.handler(c, {
					toolCall: t,
					agent: r
				});
				a = n == null ? "" : typeof n == "string" ? n : JSON.stringify(n);
			} catch (e) {
				let r = e instanceof Error ? e : Error(String(e));
				o = r.message, await this._internal.emitError({
					error: r,
					code: Ev.TOOL_HANDLER_FAILED,
					context: {
						agentId: i,
						toolCallId: t.id,
						toolName: t.function.name,
						parsedArgs: c,
						toolType: "wildcard",
						messageId: n.id
					}
				});
			}
			o && (a = `Error: ${o}`), await this._internal.notifySubscribers((e) => e.onToolExecutionEnd?.({
				copilotkit: this.core,
				toolCallId: t.id,
				agentId: i,
				toolName: t.function.name,
				result: o ? "" : a,
				error: o
			}), "Subscriber onToolExecutionEnd error:");
		}
		{
			let i = r.messages.findIndex((e) => e.id === n.id);
			if (i === -1) return !1;
			let s = i + 1;
			for (; s < r.messages.length && r.messages[s]?.role === "tool";) s++;
			let c = {
				id: ap(),
				role: "tool",
				toolCallId: t.id,
				content: a
			};
			if (r.messages.splice(s, 0, c), !o && e?.followUp !== !1) return !0;
		}
		return !1;
	}
	async runTool(e) {
		let { name: t, agentId: n, parameters: r = {}, followUp: i = !1 } = e, a = this.getTool({
			toolName: t,
			agentId: n
		});
		if (!a) {
			let e = /* @__PURE__ */ Error(`Tool not found: ${t}`);
			throw await this._internal.emitError({
				error: e,
				code: Ev.TOOL_NOT_FOUND,
				context: {
					toolName: t,
					agentId: n
				}
			}), e;
		}
		let o = n ?? "default", s = this._internal.getAgent(o);
		if (!s) {
			let e = /* @__PURE__ */ Error(`Agent not found: ${o}`);
			throw await this._internal.emitError({
				error: e,
				code: Ev.AGENT_NOT_FOUND,
				context: { agentId: o }
			}), e;
		}
		let c = ap(), l = {
			id: c,
			type: "function",
			function: {
				name: t,
				arguments: JSON.stringify(r)
			}
		}, u = {
			id: ap(),
			role: "assistant",
			content: "",
			toolCalls: [l]
		};
		s.messages.push(u);
		let d = {
			result: "",
			error: void 0,
			isArgumentError: !1
		};
		a.handler && (d = await this.executeToolHandler({
			tool: a,
			toolCall: l,
			agent: s,
			agentId: o,
			handlerArgs: r,
			toolType: "runTool"
		}));
		let f = {
			id: ap(),
			role: "tool",
			toolCallId: c,
			content: d.result
		}, p = s.messages.findIndex((e) => e.id === u.id);
		if (p === -1 ? s.messages.push(f) : s.messages.splice(p + 1, 0, f), !d.error && i !== !1) {
			if (typeof i == "string" && i !== "generate") {
				let e = {
					id: ap(),
					role: "user",
					content: i
				};
				s.messages.push(e);
			}
			await this._internal.waitForPendingFrameworkUpdates(), await this.runAgent({ agent: s });
		}
		return {
			toolCallId: c,
			result: d.result,
			error: d.error
		};
	}
	capabilityKey(e, t) {
		return `${t ?? ""}\u0000${e}`;
	}
	setToolEnabled(e, t, n) {
		let r = this.capabilityKey(e, n);
		t ? this._disabledToolKeys.delete(r) : this._disabledToolKeys.add(r), this.syncWebMCP();
	}
	isToolEnabled(e, t) {
		return !this._disabledToolKeys.has(this.capabilityKey(e, t));
	}
	buildFrontendTools(e) {
		return this.tools.filter((t) => t.name !== b_ && t.available !== !1 && t.available !== "disabled" && (!t.agentId || t.agentId === e) && this.isToolEnabled(t.name, t.agentId)).map((e) => ({
			name: e.name,
			description: e.description ?? "",
			parameters: h_(e)
		}));
	}
	syncWebMCP() {
		let e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
		for (let n of this.tools) if (n.webmcp && n.name !== b_ && n.available !== !1 && n.available !== "disabled" && this.isToolEnabled(n.name, n.agentId)) {
			if (e.has(n.name)) {
				t.has(n.name) || (t.add(n.name), mp.warn(`[CopilotKit] Multiple WebMCP tools share the name '${n.name}'. Only the first registration is exposed to browser agents.`));
				continue;
			}
			e.set(n.name, n);
		}
		this._webmcpRegistry.sync(e);
	}
	createAgentErrorSubscriber(e) {
		let t = async (t, n, r = {}) => {
			let i = { ...r };
			e.agentId && (i.agentId = e.agentId), await this._internal.emitError({
				error: t,
				code: n,
				context: i
			});
		};
		return {
			onRunFailed: async ({ error: e }) => {
				await t(e, e instanceof jg ? Ev.AGENT_THREAD_LOCKED : Ev.AGENT_RUN_FAILED_EVENT, { source: "onRunFailed" });
			},
			onRunErrorEvent: async ({ event: e }) => {
				if (this._runAbortController?.signal.aborted === !0 || e?.code === "abort") return;
				let n = e?.rawEvent instanceof Error ? e.rawEvent : e?.rawEvent?.error instanceof Error ? e.rawEvent.error : void 0, r = typeof e?.rawEvent?.error == "string" ? e.rawEvent.error : e?.message ?? "Agent run error", i = n ?? Error(r);
				e?.code && !i.code && (i.code = e.code), await t(i, Ev.AGENT_RUN_ERROR_EVENT, {
					source: "onRunErrorEvent",
					event: e,
					runtimeErrorCode: e?.code
				});
			}
		};
	}
};
function S_(e, t) {
	if (typeof e == "object" && e && !Array.isArray(e)) return e;
	throw Error(`Tool arguments for ${t} parsed to non-object (${typeof e})`);
}
function C_(e, t) {
	return e === "" || e == null ? (mp.debug(`[parseToolArguments] Tool "${t}" received empty/null/undefined arguments — defaulting to {}`), {}) : S_(typeof e == "string" ? JSON.parse(e) : e, t);
}
var w_ = (e) => e.resume !== void 0 || Object.prototype.hasOwnProperty.call(e.forwardedProps?.command ?? {}, "resume"), T_ = class {
	constructor(e) {
		u(this, "stateByRun", /* @__PURE__ */ new Map()), u(this, "messageToRun", /* @__PURE__ */ new Map()), u(this, "rawEventByMessage", /* @__PURE__ */ new Map()), u(this, "activeRun", /* @__PURE__ */ new Map()), u(this, "agentSubscriptions", /* @__PURE__ */ new Map()), u(this, "pendingContinuations", /* @__PURE__ */ new WeakMap()), this.core = e;
	}
	initialize() {}
	markNextRunAsContinuation(e, t) {
		let n = this.pendingContinuations.get(e);
		n || (n = /* @__PURE__ */ new Set(), this.pendingContinuations.set(e, n));
		let r = {
			active: !0,
			expectedRunId: t,
			bind: (e) => {
				r.active && (r.expectedInput = e);
			},
			cancel: () => {
				r.active && (r.active = !1, n.delete(r), n.size === 0 && this.pendingContinuations.delete(e));
			}
		};
		return n.add(r), r;
	}
	subscribeToAgent(e) {
		if (!e.agentId) return;
		let t = e.agentId, n = this.agentSubscriptions.get(t);
		if (n) {
			if (n.agent === e) return;
			n.unsubscribe(), this.agentSubscriptions.delete(t);
		}
		let r = !1, i, a = !1, o = /* @__PURE__ */ new WeakMap(), s = (e, t) => {
			let n = o.get(t);
			if (!n) return;
			let r = [...e], i = !1;
			for (let e of n.values()) {
				let t = r.findIndex((t) => t.role === "assistant" && t.toolCalls?.some((t) => t.id === e.toolCallId));
				if (t < 0) continue;
				let n = r.reduce((t, n, r) => (n.role === "tool" && n.toolCallId === e.toolCallId && t.push(r), t), []), a = n.find((e) => !p_(r[e]?.content));
				if (a !== void 0) {
					for (let e of n.filter((e) => e !== a).sort((e, t) => t - e)) r.splice(e, 1), i = !0;
					continue;
				}
				let o = n.find((e) => p_(r[e]?.content));
				if (o !== void 0) {
					if (p_(e.content)) {
						for (let e of n.slice(1).sort((e, t) => t - e)) r.splice(e, 1), i = !0;
						continue;
					}
					r[o] = {
						...r[o],
						id: e.messageId,
						content: e.content
					}, i = !0;
					for (let e of n.filter((e) => e !== o && p_(r[e]?.content)).sort((e, t) => t - e)) r.splice(e, 1);
					continue;
				}
				let s = {
					id: e.messageId,
					role: "tool",
					toolCallId: e.toolCallId,
					content: e.content
				}, c = t + 1;
				for (; r[c]?.role === "tool";) c++;
				r.splice(c, 0, s), i = !0;
			}
			return i ? { messages: r } : void 0;
		}, c = (e) => {
			o.delete(e);
		}, l = (e) => ({
			...e,
			runId: i ?? e.runId
		}), { unsubscribe: u } = e.subscribe({
			onRunStartedEvent: ({ event: t, input: n, state: o }) => {
				if (r) return;
				let s = [...this.pendingContinuations.get(e) ?? []].find((e) => e.expectedInput === n);
				s?.cancel(), i = s ? s.expectedRunId ?? t.runId ?? n.runId : a && n.runId === i && !w_(n) && (t.runId == null || t.runId === i) ? Kd() : t.runId || n.runId, a = !1, this.handleRunStarted(e, l(n), o);
			},
			onRunFinishedEvent: ({ input: t, state: n, messages: i }) => {
				if (r) return;
				a = !0;
				let o = l(t), u = s(i, t);
				return c(t), this.handleRunFinished(e, o, n), u;
			},
			onRunErrorEvent: ({ input: t, state: n, messages: i }) => {
				if (r) return;
				a = !0;
				let o = l(t), c = s(i, t);
				return this.handleRunFinished(e, o, n), c;
			},
			onRunFailed: ({ input: e, messages: t }) => {
				if (!r) return s(t, e);
			},
			onRunFinalized: ({ input: e }) => {
				r || c(e);
			},
			onToolCallResultEvent: ({ event: e, input: t }) => {
				if (r) return;
				let n = o.get(t);
				n || (n = /* @__PURE__ */ new Map(), o.set(t, n)), n.set(e.toolCallId, e);
			},
			onStateSnapshotEvent: ({ event: t, input: n, state: i }) => {
				r || this.handleStateSnapshot(e, t, l(n), i);
			},
			onStateDeltaEvent: ({ event: t, input: n, state: i }) => {
				r || this.handleStateDelta(e, t, l(n), i);
			},
			onTextMessageStartEvent: ({ event: t, input: n }) => {
				r || this.handleTextMessageStart(e, t, l(n));
			},
			onMessagesSnapshotEvent: ({ event: t, input: n, messages: i }) => {
				r || (this.handleMessagesSnapshot(e, t, l(n), i), this.pruneRawEvents(e.agentId, n.threadId, t.messages, l(n)));
			},
			onNewMessage: ({ message: t, input: n }) => {
				r || this.handleNewMessage(e, t, n ? l(n) : void 0);
			},
			onMessagesChanged: ({ messages: t, input: n }) => {
				r || n || this.pruneRawEvents(e.agentId, e.threadId, t);
			}
		});
		this.agentSubscriptions.set(t, {
			agent: e,
			unsubscribe: () => {
				r = !0, this.pendingContinuations.delete(e), u();
			}
		});
	}
	unsubscribeFromAgent(e) {
		let t = this.agentSubscriptions.get(e);
		t && (t.unsubscribe(), this.agentSubscriptions.delete(e)), this.rawEventByMessage.delete(e);
	}
	getStateByRun(e, t, n) {
		let r = this.stateByRun.get(e)?.get(t)?.get(n);
		if (r) return JSON.parse(JSON.stringify(r));
	}
	getRunIdForMessage(e, t, n) {
		return this.messageToRun.get(e)?.get(t)?.get(n);
	}
	getRawEventForMessage(e, t, n) {
		let r = this.rawEventByMessage.get(e)?.get(t)?.get(n);
		return r === void 0 ? void 0 : W(r);
	}
	getStatesForThread(e, t) {
		return this.stateByRun.get(e)?.get(t) ?? /* @__PURE__ */ new Map();
	}
	getRunIdsForThread(e, t) {
		let n = this.stateByRun.get(e)?.get(t);
		return n ? Array.from(n.keys()) : [];
	}
	handleRunStarted(e, t, n) {
		if (!e.agentId) return;
		let { threadId: r, runId: i } = t;
		this.activeRun.set(`${e.agentId}:${r}`, i), n && Object.keys(n).length > 0 && this.saveState(e.agentId, r, i, n);
	}
	handleRunFinished(e, t, n) {
		if (!e.agentId) return;
		let { threadId: r, runId: i } = t;
		this.activeRun.delete(`${e.agentId}:${r}`), n && Object.keys(n).length > 0 && this.saveState(e.agentId, r, i, n);
	}
	handleStateSnapshot(e, t, n, r) {
		if (!e.agentId) return;
		let { threadId: i, runId: a } = n, o = {
			...r,
			...t.snapshot
		};
		this.saveState(e.agentId, i, a, o);
	}
	handleStateDelta(e, t, n, r) {
		if (!e.agentId) return;
		let { threadId: i, runId: a } = n;
		this.saveState(e.agentId, i, a, r);
	}
	handleTextMessageStart(e, t, n) {
		if (!e.agentId) return;
		let { threadId: r } = n;
		if (t.rawEvent === void 0) {
			let n = this.rawEventByMessage.get(e.agentId)?.get(r);
			n?.delete(t.messageId), n?.size === 0 && this.rawEventByMessage.get(e.agentId)?.delete(r), this.rawEventByMessage.get(e.agentId)?.size === 0 && this.rawEventByMessage.delete(e.agentId);
			return;
		}
		this.rawEventByMessage.has(e.agentId) || this.rawEventByMessage.set(e.agentId, /* @__PURE__ */ new Map());
		let i = this.rawEventByMessage.get(e.agentId);
		i.has(r) || i.set(r, /* @__PURE__ */ new Map()), i.get(r).set(t.messageId, t.rawEvent);
	}
	handleMessagesSnapshot(e, t, n, r) {
		if (!e.agentId) return;
		let { threadId: i, runId: a } = n;
		for (let n of t.messages) this.getRunIdForMessage(e.agentId, i, n.id) === void 0 && this.associateMessageWithRun(e.agentId, i, n.id, a);
	}
	handleNewMessage(e, t, n) {
		if (!e.agentId) return;
		if (!n) {
			let n = e.threadId ?? "", r = this.activeRun.get(`${e.agentId}:${n}`);
			r && this.associateMessageWithRun(e.agentId, n, t.id, r);
			return;
		}
		let { threadId: r, runId: i } = n;
		this.associateMessageWithRun(e.agentId, r, t.id, i);
	}
	saveState(e, t, n, r) {
		this.stateByRun.has(e) || this.stateByRun.set(e, /* @__PURE__ */ new Map());
		let i = this.stateByRun.get(e);
		i.has(t) || i.set(t, /* @__PURE__ */ new Map()), i.get(t).set(n, JSON.parse(JSON.stringify(r)));
	}
	associateMessageWithRun(e, t, n, r) {
		this.messageToRun.has(e) || this.messageToRun.set(e, /* @__PURE__ */ new Map());
		let i = this.messageToRun.get(e);
		i.has(t) || i.set(t, /* @__PURE__ */ new Map()), i.get(t).set(n, r);
	}
	pruneRawEvents(e, t, n, r) {
		let i = r?.threadId ?? t;
		if (!i) return;
		let a = this.rawEventByMessage.get(e)?.get(i);
		if (!a) return;
		let o = new Set(n.map((e) => e.id));
		for (let e of a.keys()) o.has(e) || a.delete(e);
		a.size === 0 && this.rawEventByMessage.get(e)?.delete(i), this.rawEventByMessage.get(e)?.size === 0 && this.rawEventByMessage.delete(e);
	}
	clearAgentState(e) {
		this.stateByRun.delete(e), this.messageToRun.delete(e), this.rawEventByMessage.delete(e);
	}
	clearThreadState(e, t) {
		this.stateByRun.get(e)?.delete(t), this.messageToRun.get(e)?.delete(t), this.rawEventByMessage.get(e)?.delete(t);
	}
}, E_ = class {
	constructor(e) {
		u(this, "_stores", {}), u(this, "_snapshot", null), this.core = e;
	}
	register(e, t) {
		if (e in this._stores) {
			let t = this._stores[e];
			delete this._stores[e], this._snapshot = null, this.notifyUnregistered(e, t).catch((e) => {
				console.error("ThreadStoreRegistry notifyUnregistered failed:", e);
			});
		}
		this._stores[e] = t, this._snapshot = null, this.notifyRegistered(e, t).catch((e) => {
			console.error("ThreadStoreRegistry notifyRegistered failed:", e);
		});
	}
	unregister(e) {
		if (!(e in this._stores)) return;
		let t = this._stores[e];
		delete this._stores[e], this._snapshot = null, this.notifyUnregistered(e, t).catch((e) => {
			console.error("ThreadStoreRegistry notifyUnregistered failed:", e);
		});
	}
	get(e) {
		return this._stores[e];
	}
	getAll() {
		return this._snapshot === null && (this._snapshot = Object.freeze({ ...this._stores })), this._snapshot;
	}
	async notifyRegistered(e, t) {
		await this.core.notifySubscribers((n) => n.onThreadStoreRegistered?.({
			copilotkit: this.core,
			agentId: e,
			store: t
		}), "Subscriber onThreadStoreRegistered error:");
	}
	async notifyUnregistered(e, t) {
		await this.core.notifySubscribers((n) => n.onThreadStoreUnregistered?.({
			copilotkit: this.core,
			agentId: e,
			prevStore: t
		}), "Subscriber onThreadStoreUnregistered error:");
	}
}, D_ = {
	boot: "@@micro-redux/boot",
	init: "@@micro-redux/init",
	stop: "@@micro-redux/stop"
}, O_ = { type: D_.boot };
function k_(e, t) {
	let n = ((...n) => ({
		...t(...n),
		type: e
	}));
	return n.type = e, n.match = (t) => t.type === e, n;
}
function $() {
	return { kind: "props" };
}
function A_() {
	return { kind: "empty" };
}
function j_(e, t) {
	let n = {};
	for (let r of Object.keys(t)) {
		let i = t[r];
		if (!i) continue;
		let a = `[${e}] ${r}`;
		if (i.kind === "props") {
			n[r] = k_(a, (e) => ({ ...e }));
			continue;
		}
		n[r] = k_(a, () => ({}));
	}
	return n;
}
function M_(...e) {
	if (e.length < 2) throw Error("on requires at least one action creator and one reducer");
	let t = e[e.length - 1];
	return {
		creators: e.slice(0, -1),
		reducer: t
	};
}
function N_(e, ...t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) for (let t of e.creators) {
		let r = n.get(t.type) ?? [];
		r.push(e.reducer), n.set(t.type, r);
	}
	return (t, r) => {
		let i = t ?? e, a = n.get(r.type);
		if (!a || a.length === 0) return i;
		let o = i;
		for (let e of a) o = e(o, r);
		return o;
	};
}
function P_(...e) {
	if (e.length === 1) {
		let t = e[0], n = !1, r, i;
		return (e) => n && e === r ? i : (r = e, i = t(e), n = !0, i);
	}
	let t = e[e.length - 1], n = e.slice(0, -1), r = !1, i = [], a;
	return (e) => {
		let o = n.map((t) => t(e));
		return r && o.length === i.length && o.every((e, t) => e === i[t]) ? a : (i = o, a = t(...o), r = !0, a);
	};
}
function F_(e) {
	return (t) => t.pipe(j(e), Ns());
}
function I_(...e) {
	if (e.length === 0) throw Error("ofType requires at least one action creator");
	let t = new Set(e.map((e) => e.type));
	return (e) => e.pipe(bs((e) => t.has(e.type)));
}
function L_(e, t = {}) {
	return t.dispatch === !1 ? {
		run: e,
		dispatch: !1
	} : {
		run: e,
		dispatch: !0
	};
}
function R_(e) {
	let t = e.reducer, n = e.effects ?? [], r = !1, i = !1, a = new ta(), o = t(void 0, O_), s = new Ba(o), c = new Ra(), l = (e) => {
		if (r) throw Error("Store is in a failed state due to an effect error");
		o = t(o, e), s.next(o), c.next(e);
	}, u = (e) => {
		r || (r = !0, i = !1, a.unsubscribe(), a = new ta(), c.error(e), s.error(e));
	}, d = () => {
		for (let e of n) {
			let t = c.asObservable().pipe(Mo(ro)), n = s.asObservable();
			if (e.dispatch) {
				let i = e.run(t, n).subscribe({
					next: (e) => {
						r || l(e);
					},
					error: (e) => {
						u(e);
					}
				});
				a.add(i);
				continue;
			}
			let i = e.run(t, n).subscribe({ error: (e) => {
				u(e);
			} });
			a.add(i);
		}
	};
	return {
		dispatch(e) {
			l(e);
		},
		getState() {
			return o;
		},
		get state$() {
			return s.asObservable();
		},
		get actions$() {
			return c.asObservable();
		},
		select(e) {
			return s.asObservable().pipe(F_(e));
		},
		init() {
			r || i || (i = !0, d(), !r && l({ type: D_.init }));
		},
		stop() {
			!r && i && (l({ type: D_.stop }), a.unsubscribe(), a = new ta(), i = !1);
		}
	};
}
var z_ = Object.freeze({
	MEMORY_LIST_FAILED: {
		code: "MEMORY_LIST_FAILED",
		category: "dependency",
		retryable: !0,
		message: "Failed to fetch memories",
		docsPath: "docs/errors/memory.md#memory_list_failed"
	},
	MEMORY_RECALL_FAILED: {
		code: "MEMORY_RECALL_FAILED",
		category: "dependency",
		retryable: !0,
		message: "Failed to recall memories",
		docsPath: "docs/errors/memory.md#memory_recall_failed"
	},
	MEMORY_CREDENTIALS_FAILED: {
		code: "MEMORY_CREDENTIALS_FAILED",
		category: "dependency",
		retryable: !0,
		message: "Failed to fetch memory subscribe credentials",
		docsPath: "docs/errors/memory.md#memory_credentials_failed"
	},
	MEMORY_MUTATION_FAILED: {
		code: "MEMORY_MUTATION_FAILED",
		category: "dependency",
		retryable: !0,
		message: "Memory mutation request failed",
		docsPath: "docs/errors/memory.md#memory_mutation_failed"
	},
	MEMORY_REQUEST_TIMEOUT: {
		code: "MEMORY_REQUEST_TIMEOUT",
		category: "dependency",
		retryable: !0,
		message: "Request timed out",
		docsPath: "docs/errors/memory.md#memory_request_timeout"
	}
}), B_ = class e extends Error {
	constructor(t, n) {
		let r = z_[t];
		super(n?.message ?? r.message, { cause: n?.cause }), u(this, "code", void 0), u(this, "category", void 0), u(this, "retryable", void 0), this.name = "MemoryError", this.code = t, this.category = r.category, this.retryable = n?.retryable ?? r.retryable, Object.setPrototypeOf(this, e.prototype);
	}
};
function V_(e) {
	return !(Number.isInteger(e) && e >= 400 && e <= 499);
}
var H_ = "/memories", U_ = "/memories/subscribe", W_ = "/memories/recall", G_ = 15e3, K_ = 5, q_ = /* @__PURE__ */ new Set([
	404,
	422,
	501
]), J_ = class extends Error {}, Y_ = Object.freeze({
	memories: Object.freeze([]),
	isLoading: !1,
	inFlightMutationCount: 0,
	error: null,
	context: null,
	sessionId: 0,
	available: !0,
	realtimeStatus: "connecting"
}), X_ = j_("Memory Adapter", {
	started: A_(),
	stopped: A_(),
	contextChanged: $(),
	addRequested: $(),
	updateRequested: $(),
	removeRequested: $()
}), Z_ = j_("Memory REST", {
	listRequested: $(),
	listSucceeded: $(),
	listFailed: $(),
	listUnavailable: $(),
	mutationFinished: $(),
	credentialsRequested: $(),
	credentialsSucceeded: $(),
	credentialsFailed: $(),
	credentialsUnavailable: $()
}), Q_ = j_("Memory Domain", {
	memoryUpserted: $(),
	memoryInvalidated: $(),
	realtimeConnecting: $(),
	realtimeConnected: $(),
	realtimeUnavailable: $()
});
function $_(e) {
	return {
		id: e.id,
		kind: e.kind,
		scope: e.scope,
		content: e.content,
		sourceThreadIds: e.sourceThreadIds,
		invalidatedAt: e.invalidatedAt
	};
}
function ev(e, t) {
	return e.operation === "invalidated" ? Q_.memoryInvalidated({
		sessionId: t,
		memoryId: e.invalidated.id
	}) : Q_.memoryUpserted({
		sessionId: t,
		memory: $_(e.memory)
	});
}
function tv(e, t) {
	let n = e.findIndex((e) => e.id === t.id);
	if (n === -1) return [t, ...e];
	let r = [...e];
	return r[n] = t, r;
}
var nv = N_(Y_, M_(X_.contextChanged, (e, { context: t }) => ({
	...e,
	context: t,
	sessionId: e.sessionId + 1,
	memories: [],
	isLoading: !!t,
	inFlightMutationCount: 0,
	error: null,
	available: !0,
	realtimeStatus: "connecting"
})), M_(X_.stopped, (e) => ({
	...e,
	memories: [],
	isLoading: !1,
	inFlightMutationCount: 0,
	error: null,
	available: !0,
	realtimeStatus: "connecting"
})), M_(Z_.listRequested, (e, { sessionId: t }) => t !== e.sessionId || !e.context ? e : {
	...e,
	isLoading: !0,
	error: null,
	available: !0
}), M_(Z_.listFailed, (e, { sessionId: t, error: n }) => t === e.sessionId ? {
	...e,
	isLoading: !1,
	error: n
} : e), M_(Z_.listUnavailable, (e, { sessionId: t }) => t === e.sessionId ? {
	...e,
	memories: [],
	isLoading: !1,
	error: null,
	available: !1
} : e), M_(X_.addRequested, X_.updateRequested, X_.removeRequested, (e) => ({
	...e,
	inFlightMutationCount: e.inFlightMutationCount + 1
})), M_(Z_.mutationFinished, (e, { outcome: t }) => t.sessionId === e.sessionId ? {
	...e,
	inFlightMutationCount: Math.max(0, e.inFlightMutationCount - 1),
	error: t.ok ? null : t.error
} : e), M_(Z_.listSucceeded, (e, { sessionId: t, memories: n }) => t === e.sessionId ? {
	...e,
	memories: n,
	isLoading: !1,
	error: null,
	available: !0
} : e), M_(Q_.memoryUpserted, (e, { sessionId: t, memory: n }) => t === e.sessionId ? {
	...e,
	memories: tv(e.memories, n)
} : e), M_(Q_.memoryInvalidated, (e, { sessionId: t, memoryId: n }) => t === e.sessionId ? {
	...e,
	memories: e.memories.filter((e) => e.id !== n)
} : e), M_(Q_.realtimeConnecting, (e, { sessionId: t }) => t === e.sessionId ? {
	...e,
	realtimeStatus: "connecting"
} : e), M_(Q_.realtimeConnected, (e, { sessionId: t }) => t === e.sessionId ? {
	...e,
	realtimeStatus: "connected"
} : e), M_(Q_.realtimeUnavailable, (e, { sessionId: t }) => t === e.sessionId ? {
	...e,
	realtimeStatus: "unavailable"
} : e)), rv = P_((e) => e.memories), iv = P_((e) => e.isLoading), av = P_((e) => e.error);
P_((e) => e.inFlightMutationCount > 0);
var ov = P_((e) => e.available), sv = P_((e) => e.realtimeStatus), cv = "memory_metadata";
function lv(e, t) {
	let { selector: n, fetch: r, signal: i, ...a } = t;
	return new ka((t) => {
		let o = new AbortController(), s = () => o.abort();
		i?.aborted ? o.abort() : i?.addEventListener("abort", s);
		let c = Vo(r(e, {
			...a,
			signal: o.signal
		})).pipe(fs((e) => Vo(n(e)))).subscribe(t);
		return () => {
			i?.removeEventListener("abort", s), o.abort(), c.unsubscribe();
		};
	});
}
function uv(e, t, n) {
	return gs(() => {
		let r = t.includeInvalidated ? "?includeInvalidated=true" : "";
		return lv(`${t.runtimeUrl}${H_}${r}`, {
			selector: (e) => {
				if (!e.ok) throw q_.has(e.status) ? new J_(String(e.status)) : new B_("MEMORY_LIST_FAILED", {
					message: `Failed to fetch memories: ${e.status}`,
					retryable: V_(e.status)
				});
				return e.json();
			},
			fetch: e.fetch,
			method: "GET",
			headers: { ...t.headers }
		}).pipe(Xo({
			first: G_,
			with: () => {
				throw new B_("MEMORY_REQUEST_TIMEOUT");
			}
		}), j((e) => Z_.listSucceeded({
			sessionId: n,
			memories: e.memories
		})), xs((e) => e instanceof J_ ? k(Z_.listUnavailable({ sessionId: n })) : k(Z_.listFailed({
			sessionId: n,
			error: e instanceof Error ? e : Error(String(e))
		}))));
	});
}
function dv(e, t, n) {
	return gs(() => lv(`${t.runtimeUrl}${U_}`, {
		selector: async (e) => {
			if (!e.ok) throw q_.has(e.status) ? new J_(String(e.status)) : new B_("MEMORY_CREDENTIALS_FAILED", {
				message: `Failed to fetch memory subscribe credentials: ${e.status}`,
				retryable: V_(e.status)
			});
			return e.json();
		},
		fetch: e.fetch,
		method: "POST",
		headers: {
			...t.headers,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({})
	}).pipe(Xo({
		first: G_,
		with: () => {
			throw new B_("MEMORY_REQUEST_TIMEOUT");
		}
	}), j((e) => {
		let t = typeof e.joinToken == "string" && e.joinToken.length > 0 && typeof e.joinCode == "string" && e.joinCode.length > 0, r = typeof e.projectJoinToken == "string" && e.projectJoinToken.length > 0 && typeof e.projectJoinCode == "string" && e.projectJoinCode.length > 0;
		if (!t && !r) throw Error("missing memory realtime credentials");
		return Z_.credentialsSucceeded({
			sessionId: n,
			...t ? {
				joinToken: e.joinToken,
				joinCode: e.joinCode
			} : {},
			...r ? {
				projectJoinToken: e.projectJoinToken,
				projectJoinCode: e.projectJoinCode
			} : {}
		});
	}), xs((e) => e instanceof J_ ? k(Z_.credentialsUnavailable({ sessionId: n })) : k(Z_.credentialsFailed({
		sessionId: n,
		error: e instanceof Error ? e : Error(String(e))
	})))));
}
function fv(e) {
	return {
		id: e.id,
		kind: e.kind,
		scope: e.scope,
		content: e.content,
		sourceThreadIds: e.sourceThreadIds,
		invalidatedAt: e.invalidatedAt
	};
}
function pv(e) {
	return {
		id: e.id,
		kind: e.kind,
		scope: e.scope,
		content: e.content,
		sourceThreadIds: e.sourceThreadIds,
		invalidatedAt: e.invalidatedAt,
		...typeof e.score == "number" ? { score: e.score } : {}
	};
}
var mv = /* @__PURE__ */ new Set([
	"topical",
	"episodic",
	"operational"
]), hv = /* @__PURE__ */ new Set(["user", "project"]);
function gv(e) {
	return !e || typeof e != "object" ? /* @__PURE__ */ Error("memory mutation response missing/invalid body") : typeof e.id != "string" || e.id.length === 0 ? /* @__PURE__ */ Error("memory mutation response missing/invalid id") : typeof e.kind != "string" || !mv.has(e.kind) ? /* @__PURE__ */ Error("memory mutation response missing/invalid kind") : typeof e.scope != "string" || !hv.has(e.scope) ? /* @__PURE__ */ Error("memory mutation response missing/invalid scope") : typeof e.content == "string" ? !Array.isArray(e.sourceThreadIds) || !e.sourceThreadIds.every((e) => typeof e == "string") ? /* @__PURE__ */ Error("memory mutation response missing/invalid sourceThreadIds") : e.invalidatedAt !== null && typeof e.invalidatedAt != "string" ? /* @__PURE__ */ Error("memory mutation response missing/invalid invalidatedAt") : null : /* @__PURE__ */ Error("memory mutation response missing/invalid content");
}
function _v(e) {
	return {
		content: e.content,
		kind: e.kind,
		...e.scope === void 0 ? {} : { scope: e.scope },
		sourceThreadIds: e.sourceThreadIds ?? []
	};
}
function vv(e, t) {
	let { requestId: n, sessionId: r } = e;
	if (e.kind === "remove") return [Q_.memoryInvalidated({
		sessionId: r,
		memoryId: e.id
	}), Z_.mutationFinished({ outcome: {
		requestId: n,
		sessionId: r,
		ok: !0,
		memory: null
	} })];
	let i = gv(t);
	if (i) return [Z_.mutationFinished({ outcome: {
		requestId: n,
		sessionId: r,
		ok: !1,
		error: i
	} })];
	let a = fv(t);
	if (e.kind === "update") {
		let e = t.retiredId;
		return typeof e != "string" || e.length === 0 ? [Z_.mutationFinished({ outcome: {
			requestId: n,
			sessionId: r,
			ok: !1,
			error: /* @__PURE__ */ Error("supersede response missing retiredId")
		} })] : [
			Q_.memoryInvalidated({
				sessionId: r,
				memoryId: e
			}),
			Q_.memoryUpserted({
				sessionId: r,
				memory: a
			}),
			Z_.mutationFinished({ outcome: {
				requestId: n,
				sessionId: r,
				ok: !0,
				memory: a
			} })
		];
	}
	return [Q_.memoryUpserted({
		sessionId: r,
		memory: a
	}), Z_.mutationFinished({ outcome: {
		requestId: n,
		sessionId: r,
		ok: !0,
		memory: a
	} })];
}
function yv(e, t, n) {
	let r = n.kind === "add" ? "POST" : n.kind === "update" ? "PATCH" : "DELETE", i = n.kind === "add" ? H_ : `${H_}/${encodeURIComponent(n.id)}`;
	return gs(() => lv(`${t.runtimeUrl}${i}`, {
		selector: async (e) => {
			if (!e.ok) throw new B_("MEMORY_MUTATION_FAILED", {
				message: `Request failed: ${e.status}`,
				retryable: V_(e.status)
			});
			return n.kind === "remove" ? null : await e.json();
		},
		fetch: e.fetch,
		method: r,
		headers: {
			...t.headers,
			"Content-Type": "application/json"
		},
		body: n.kind === "remove" ? void 0 : JSON.stringify(n.body)
	}).pipe(Xo({
		first: G_,
		with: () => {
			throw new B_("MEMORY_REQUEST_TIMEOUT");
		}
	}), fs((e) => k(...vv(n, e))), xs((e) => k(Z_.mutationFinished({ outcome: {
		requestId: n.requestId,
		sessionId: n.sessionId,
		ok: !1,
		error: e instanceof Error ? e : Error(String(e))
	} })))));
}
function bv(e) {
	let t = 0, n = () => (t += 1, `memory-request-${t}`), r = L_((e, t) => e.pipe(I_(X_.contextChanged), Ws(t), bs(([, e]) => !!e.context), j(([, e]) => Z_.listRequested({ sessionId: e.sessionId })))), i = L_((e, t) => e.pipe(I_(X_.contextChanged), Ws(t), bs(([, e]) => !!e.context), j(([, e]) => Z_.credentialsRequested({ sessionId: e.sessionId })))), a = L_((t, n) => t.pipe(I_(Z_.credentialsRequested), Vs((r) => n.pipe(j((e) => e.context), bs((e) => !!e), Ds(1), j((e) => ({
		action: r,
		context: e
	})), Hs(t.pipe(I_(X_.contextChanged, X_.stopped))), Vs(({ action: t, context: n }) => dv(e, n, t.sessionId)))))), o = R_({
		reducer: nv,
		effects: [
			r,
			i,
			L_((t, n) => t.pipe(I_(Z_.listRequested), Vs((r) => n.pipe(j((e) => e.context), bs((e) => !!e), Ds(1), j((e) => ({
				action: r,
				context: e
			})), Hs(t.pipe(I_(X_.contextChanged, X_.stopped))), Vs(({ action: t, context: n }) => uv(e, n, t.sessionId)))))),
			a,
			L_((t, n) => t.pipe(I_(X_.addRequested, X_.updateRequested, X_.removeRequested), Ws(n), fs(([t, n]) => {
				let r = n.context, i = n.sessionId;
				return r?.runtimeUrl ? X_.addRequested.match(t) ? yv(e, r, {
					requestId: t.requestId,
					sessionId: i,
					kind: "add",
					body: _v(t.input)
				}) : X_.updateRequested.match(t) ? yv(e, r, {
					requestId: t.requestId,
					sessionId: i,
					kind: "update",
					id: t.id,
					body: _v(t.changes)
				}) : yv(e, r, {
					requestId: t.requestId,
					sessionId: i,
					kind: "remove",
					id: t.id
				}) : k(Z_.mutationFinished({ outcome: {
					requestId: t.requestId,
					sessionId: i,
					ok: !1,
					error: /* @__PURE__ */ Error("Runtime URL is not configured")
				} }));
			}))),
			L_((e, t) => e.pipe(I_(Z_.credentialsSucceeded), Ws(t), bs(([e, t]) => e.sessionId === t.sessionId && !!t.context?.wsUrl), Vs(([t, n]) => {
				let r = n.context, { joinToken: i, joinCode: a, projectJoinToken: o, projectJoinCode: s } = t, c = i ?? o, l = i && a ? `user_meta:memories:${a}` : `project_meta:memories:${s}`, u = t.sessionId, d = e.pipe(I_(X_.contextChanged, X_.stopped)), f = (e, t) => {
					let n = yg({
						socket$: vg({
							url: r.wsUrl,
							options: {
								params: { join_token: e },
								reconnectAfterMs: lp(100, 1e4),
								rejoinAfterMs: lp(1e3, 3e4)
							}
						}).pipe(Bs({
							bufferSize: 1,
							refCount: !0
						})),
						topic: t
					}).pipe(Bs({
						bufferSize: 1,
						refCount: !0
					}));
					return vs(n.pipe(Vs(({ channel: e }) => bg(e, cv)), j((e) => ev(e, u))), Sg(n).pipe(xs((e) => (console.warn(`[memory] failed to join ${t}`, e), oo))));
				};
				return gs(() => {
					let e = vg({
						url: r.wsUrl,
						options: {
							params: { join_token: c },
							reconnectAfterMs: lp(100, 1e4),
							rejoinAfterMs: lp(1e3, 3e4)
						}
					}).pipe(Bs({
						bufferSize: 1,
						refCount: !0
					})), n = yg({
						socket$: e,
						topic: l
					}).pipe(Bs({
						bufferSize: 1,
						refCount: !0
					})), p = wg(Cg(e).pipe(Rs()), K_).pipe(xs(() => (console.warn(`[memory] WebSocket failed after ${K_} attempts, giving up`), k(void 0))), Rs()), m = p.pipe(j(() => Q_.realtimeUnavailable({ sessionId: u }))), h = n.pipe(Vs(({ channel: e }) => bg(e, cv)), j((e) => ev(e, t.sessionId))), ee = Sg(n).pipe(Ts(k(Q_.realtimeConnected({ sessionId: u }))), xs((e) => (console.warn(`[memory] failed to join ${l}`, e), k(Q_.realtimeUnavailable({ sessionId: u }))))), te = i && a && o && s ? f(o, `project_meta:memories:${s}`) : oo;
					return vs(k(Q_.realtimeConnecting({ sessionId: u })), h, ee, te, m).pipe(Hs(vs(d, p.pipe(Mo(ro)))), Is(() => {}));
				});
			})))
		]
	});
	function s(e, t) {
		let { requestId: n } = e, r = qo(vs(o.actions$.pipe(I_(Z_.mutationFinished), bs((e) => e.outcome.requestId === n), j((e) => e.outcome)), o.actions$.pipe(I_(X_.stopped), j(() => ({
			requestId: n,
			sessionId: o.getState().sessionId,
			ok: !1,
			error: /* @__PURE__ */ Error("Memory store stopped before mutation completed")
		})))).pipe(Ds(1))).then((e) => {
			if (!e.ok) throw e.error;
			return t(e);
		});
		return o.dispatch(e), r;
	}
	return {
		start() {
			o.init(), o.dispatch(X_.started());
		},
		stop() {
			o.dispatch(X_.stopped()), o.stop();
		},
		setContext(e) {
			o.dispatch(X_.contextChanged({ context: e }));
		},
		refresh() {
			let { sessionId: e, context: t } = o.getState();
			if (!t) return Promise.resolve();
			let n = qo(vs(o.actions$.pipe(I_(Z_.listSucceeded, Z_.listFailed, Z_.listUnavailable), bs((t) => t.sessionId === e)), o.actions$.pipe(I_(X_.stopped)), o.actions$.pipe(I_(X_.contextChanged))).pipe(Ds(1))).then((e) => {
				if (Z_.listFailed.match(e)) throw e.error;
				if (X_.stopped.match(e)) throw Error("Memory store stopped before refresh completed");
				X_.contextChanged.match(e);
			});
			return o.dispatch(Z_.listRequested({ sessionId: e })), n;
		},
		recall(t, n) {
			let { context: r } = o.getState();
			if (!r?.runtimeUrl) return Promise.reject(/* @__PURE__ */ Error("Runtime URL is not configured"));
			let i = { query: t };
			return n?.limit !== void 0 && (i.limit = n.limit), n?.scope !== void 0 && (i.scope = n.scope), qo(lv(`${r.runtimeUrl}${W_}`, {
				selector: async (e) => {
					if (!e.ok) throw new B_("MEMORY_RECALL_FAILED", {
						message: `Failed to recall memories: ${e.status}`,
						retryable: V_(e.status)
					});
					return await e.json();
				},
				fetch: e.fetch,
				method: "POST",
				headers: {
					...r.headers,
					"Content-Type": "application/json"
				},
				body: JSON.stringify(i)
			}).pipe(Xo({
				first: G_,
				with: () => {
					throw new B_("MEMORY_REQUEST_TIMEOUT");
				}
			}), j((e) => (e.memories ?? []).map((e) => pv(e)))));
		},
		addMemory(e) {
			return s(X_.addRequested({
				requestId: n(),
				input: e
			}), (e) => {
				if (e.memory == null) throw Error("add resolved without a memory");
				return e.memory;
			});
		},
		updateMemory(e, t) {
			return s(X_.updateRequested({
				requestId: n(),
				id: e,
				changes: t
			}), (e) => {
				if (e.memory == null) throw Error("update resolved without a memory");
				return e.memory;
			});
		},
		removeMemory(e) {
			return s(X_.removeRequested({
				requestId: n(),
				id: e
			}), () => void 0);
		},
		getState() {
			return o.getState();
		},
		getServerState() {
			return Y_;
		},
		select: o.select.bind(o)
	};
}
var xv = rv, Sv = iv, Cv = av, wv = ov, Tv = sv, Ev = /* @__PURE__ */ function(e) {
	return e.RUNTIME_INFO_FETCH_FAILED = "runtime_info_fetch_failed", e.AGENT_CONNECT_FAILED = "agent_connect_failed", e.AGENT_RUN_FAILED = "agent_run_failed", e.AGENT_RUN_FAILED_EVENT = "agent_run_failed_event", e.AGENT_RUN_ERROR_EVENT = "agent_run_error_event", e.TOOL_ARGUMENT_PARSE_FAILED = "tool_argument_parse_failed", e.TOOL_HANDLER_FAILED = "tool_handler_failed", e.TOOL_NOT_FOUND = "tool_not_found", e.AGENT_NOT_FOUND = "agent_not_found", e.AGENT_THREAD_LOCKED = "agent_thread_locked", e.TRANSCRIPTION_FAILED = "transcription_failed", e.TRANSCRIPTION_SERVICE_NOT_CONFIGURED = "transcription_service_not_configured", e.TRANSCRIPTION_INVALID_AUDIO = "transcription_invalid_audio", e.TRANSCRIPTION_RATE_LIMITED = "transcription_rate_limited", e.TRANSCRIPTION_AUTH_FAILED = "transcription_auth_failed", e.TRANSCRIPTION_NETWORK_ERROR = "transcription_network_error", e.SUBSCRIBER_CALLBACK_FAILED = "subscriber_callback_failed", e;
}({}), Dv = /* @__PURE__ */ new Set([
	"onMessagesChanged",
	"onStateChanged",
	"onRunInitialized",
	"onRunFinalized",
	"onRunFailed",
	"onRunErrorEvent"
]), Ov = /* @__PURE__ */ function(e) {
	return e.Disconnected = "disconnected", e.Connected = "connected", e.Connecting = "connecting", e.Error = "error", e;
}({});
function kv(e) {
	return Object.fromEntries(Object.entries(e).filter((e) => e[1] != null));
}
var Av = class {
	constructor({ runtimeUrl: e, runtimeTransport: t = "auto", deferInitialConnection: n = !1, headers: r = {}, credentials: i, properties: a = {}, agents__unsafe_dev_only: o = {}, tools: s = [], suggestionsConfig: c = [], debug: l }) {
		u(this, "_headers", void 0), u(this, "_credentials", void 0), u(this, "_properties", void 0), u(this, "_defaultThrottleMs", void 0), u(this, "_debug", void 0), u(this, "subscribers", /* @__PURE__ */ new Set()), u(this, "agentRegistry", void 0), u(this, "contextStore", void 0), u(this, "suggestionEngine", void 0), u(this, "runHandler", void 0), u(this, "stateManager", void 0), u(this, "threadStoreRegistry", void 0), u(this, "_memoryStore", void 0), u(this, "previousAgentIds", /* @__PURE__ */ new Set()), this._headers = kv(r), this._credentials = i, this._properties = a, this._debug = l, this.agentRegistry = new i_(this), this.contextStore = new a_(this), this.suggestionEngine = new o_(this), this.runHandler = new x_(this), this.stateManager = new T_(this), this.threadStoreRegistry = new E_(this), this.agentRegistry.initialize(o), this.runHandler.initialize(s), this.suggestionEngine.initialize(c), this.stateManager.initialize(), this.agentRegistry.setRuntimeTransport(t), this.agentRegistry.setRuntimeUrl(e, { deferConnection: n }), this.previousAgentIds = new Set(Object.keys(o)), this.subscribe({
			onRuntimeConnectionStatusChanged: () => {
				this._memoryStore && this.syncMemoryContext();
			},
			onAgentsChanged: ({ agents: e }) => {
				Object.values(e).forEach((e) => {
					e.agentId && this.stateManager.subscribeToAgent(e);
				});
				let t = new Set(Object.keys(e));
				for (let e of Object.keys(this.threadStoreRegistry.getAll())) if (this.previousAgentIds.has(e) && !t.has(e)) try {
					this.threadStoreRegistry.unregister(e);
				} catch (t) {
					console.error(`CopilotKitCore.onAgentsChanged: threadStoreRegistry.unregister failed for "${e}":`, t);
				}
				for (let e of this.previousAgentIds) if (!t.has(e)) try {
					this.stateManager.unsubscribeFromAgent(e);
				} catch (t) {
					console.error(`CopilotKitCore.onAgentsChanged: stateManager.unsubscribeFromAgent failed for "${e}":`, t);
				}
				this.previousAgentIds = t;
			}
		});
	}
	async notifySubscribers(e, t) {
		await Promise.all(Array.from(this.subscribers).map(async (n) => {
			try {
				await e(n);
			} catch (e) {
				console.error(t, e);
			}
		}));
	}
	async emitError({ error: e, code: t, context: n = {} }) {
		await this.notifySubscribers((r) => r.onError?.({
			copilotkit: this,
			error: e,
			code: t,
			context: n
		}), "Subscriber onError error:");
	}
	logAndEmitError(e, t, n = "error") {
		console[n](e, t.error), this.emitError(t).catch((t) => {
			console.error(e + " — emitError itself failed:", t);
		});
	}
	get context() {
		return this.contextStore.context;
	}
	get agents() {
		return this.agentRegistry.agents;
	}
	get tools() {
		return this.runHandler.tools;
	}
	get catalogComponents() {
		return this.runHandler.catalogComponents;
	}
	get runtimeUrl() {
		return this.agentRegistry.runtimeUrl;
	}
	setRuntimeUrl(e) {
		this.agentRegistry.setRuntimeUrl(e);
	}
	connect() {
		this.agentRegistry.connectRuntime();
	}
	get runtimeTransport() {
		return this.agentRegistry.runtimeTransport;
	}
	setRuntimeTransport(e) {
		this.agentRegistry.setRuntimeTransport(e);
	}
	get runtimeVersion() {
		return this.agentRegistry.runtimeVersion;
	}
	get headers() {
		return this._headers;
	}
	get credentials() {
		return this._credentials;
	}
	get properties() {
		return this._properties;
	}
	get defaultThrottleMs() {
		return this._defaultThrottleMs;
	}
	setDefaultThrottleMs(e) {
		if (e !== void 0 && (!Number.isFinite(e) || e < 0)) {
			this.logAndEmitError(`CopilotKitCore.setDefaultThrottleMs: value must be a non-negative finite number or undefined, got ${e}. Keeping current value (${this._defaultThrottleMs}).`, {
				error: /* @__PURE__ */ Error(`setDefaultThrottleMs: invalid value (${e}), keeping current value (${this._defaultThrottleMs})`),
				code: Ev.SUBSCRIBER_CALLBACK_FAILED,
				context: {
					value: e,
					currentValue: this._defaultThrottleMs
				}
			});
			return;
		}
		this._defaultThrottleMs = e;
	}
	get debug() {
		return this._debug;
	}
	setDebug(e) {
		this._debug = e;
	}
	get runtimeConnectionStatus() {
		return this.agentRegistry.runtimeConnectionStatus;
	}
	get ɵruntimeFetch() {
		return this.agentRegistry.createRuntimeFetch();
	}
	get audioFileTranscriptionEnabled() {
		return this.agentRegistry.audioFileTranscriptionEnabled;
	}
	get runtimeMode() {
		return this.agentRegistry.runtimeMode;
	}
	get intelligence() {
		return this.agentRegistry.intelligence;
	}
	get threadEndpoints() {
		return this.agentRegistry.threadEndpoints;
	}
	get suggestions() {
		return this.agentRegistry.suggestions;
	}
	get inspectorLearning() {
		return this.agentRegistry.inspectorLearning;
	}
	get inspectorMetadata() {
		return this.agentRegistry.inspectorMetadata;
	}
	async refreshInspectorMetadata() {
		await this.agentRegistry.refreshInspectorMetadata();
	}
	get a2uiEnabled() {
		return this.agentRegistry.a2uiEnabled;
	}
	get a2uiAgents() {
		return this.agentRegistry.a2uiAgents;
	}
	get openGenerativeUIEnabled() {
		return this.agentRegistry.openGenerativeUIEnabled;
	}
	get licenseStatus() {
		return this.agentRegistry.licenseStatus;
	}
	get runtimeEntitlements() {
		return this.agentRegistry.runtimeEntitlements;
	}
	get runtimeEntitlementRetryPending() {
		return this.agentRegistry.runtimeEntitlementRetryPending;
	}
	get telemetryDisabled() {
		return this.agentRegistry.telemetryDisabled;
	}
	setHeaders(e) {
		this._headers = kv(e), this._memoryStore && this.syncMemoryContext(), this.agentRegistry.applyHeadersToAgents(this.agentRegistry.agents), this.agentRegistry.handleHeadersChanged(), this.notifySubscribers((e) => e.onHeadersChanged?.({
			copilotkit: this,
			headers: this.headers
		}), "Subscriber onHeadersChanged error:");
	}
	setCredentials(e) {
		this._credentials = e, this.agentRegistry.applyCredentialsToAgents(this.agentRegistry.agents), this.agentRegistry.handleCredentialsChanged();
	}
	setProperties(e) {
		this._properties = e, this.notifySubscribers((e) => e.onPropertiesChanged?.({
			copilotkit: this,
			properties: this.properties
		}), "Subscriber onPropertiesChanged error:");
	}
	setAgents__unsafe_dev_only(e) {
		this.agentRegistry.setAgents__unsafe_dev_only(e);
	}
	addAgent__unsafe_dev_only(e) {
		this.agentRegistry.addAgent__unsafe_dev_only(e);
	}
	removeAgent__unsafe_dev_only(e) {
		this.agentRegistry.removeAgent__unsafe_dev_only(e);
	}
	registerProxiedAgent(e) {
		return this.agentRegistry.registerProxiedAgent(e);
	}
	getAgent(e) {
		return this.agentRegistry.getAgent(e);
	}
	applyHeadersToAgent(e) {
		this.agentRegistry.applyHeadersToAgent(e);
	}
	addContext(e) {
		return this.contextStore.addContext(e);
	}
	removeContext(e) {
		this.contextStore.removeContext(e);
	}
	getContextForAgent(e) {
		return this.contextStore.getContextForAgent(e);
	}
	registerThreadStore(e, t) {
		this.threadStoreRegistry.register(e, t);
	}
	unregisterThreadStore(e) {
		this.threadStoreRegistry.unregister(e);
	}
	getThreadStore(e) {
		return this.threadStoreRegistry.get(e);
	}
	getThreadStores() {
		return this.threadStoreRegistry.getAll();
	}
	getMemoryStore() {
		return this.ensureMemoryStore();
	}
	ensureMemoryStore() {
		return this._memoryStore || (this._memoryStore = bv({ fetch: this.ɵruntimeFetch }), this._memoryStore.start(), this.syncMemoryContext()), this._memoryStore;
	}
	syncMemoryContext() {
		this._memoryStore && (this.runtimeConnectionStatus === Ov.Connected && this.intelligence?.wsUrl && this.runtimeUrl ? this._memoryStore.setContext({
			runtimeUrl: this.runtimeUrl,
			wsUrl: this.intelligence.wsUrl,
			headers: { ...this.headers }
		}) : this._memoryStore.setContext(null));
	}
	addSuggestionsConfig(e) {
		return this.suggestionEngine.addSuggestionsConfig(e);
	}
	removeSuggestionsConfig(e) {
		this.suggestionEngine.removeSuggestionsConfig(e);
	}
	reloadSuggestions(e) {
		this.suggestionEngine.reloadSuggestions(e);
	}
	clearSuggestions(e) {
		this.suggestionEngine.clearSuggestions(e);
	}
	getSuggestions(e) {
		return this.suggestionEngine.getSuggestions(e);
	}
	addTool(e) {
		this.runHandler.addTool(e);
	}
	removeTool(e, t) {
		this.runHandler.removeTool(e, t);
	}
	getTool(e) {
		return this.runHandler.getTool(e);
	}
	setTools(e) {
		this.runHandler.setTools(e);
	}
	setToolEnabled(e, t, n) {
		this.runHandler.setToolEnabled(e, t, n);
	}
	isToolEnabled(e, t) {
		return this.runHandler.isToolEnabled(e, t);
	}
	setCatalogComponents(e) {
		this.runHandler.setCatalogComponents(e), this.notifySubscribers((e) => e.onCatalogComponentsChanged?.({
			copilotkit: this,
			catalogComponents: this.runHandler.catalogComponents
		}), "Subscriber onCatalogComponentsChanged error:");
	}
	setCatalogComponentEnabled(e, t) {
		this.runHandler.setCatalogComponentEnabled(e, t), this.notifySubscribers((e) => e.onCatalogComponentsChanged?.({
			copilotkit: this,
			catalogComponents: this.runHandler.catalogComponents
		}), "Subscriber onCatalogComponentsChanged error:");
	}
	isCatalogComponentEnabled(e) {
		return this.runHandler.isCatalogComponentEnabled(e);
	}
	subscribe(e) {
		return this.subscribers.add(e), { unsubscribe: () => {
			this.subscribers.delete(e);
		} };
	}
	subscribeToAgentWithOptions(e, t, n) {
		let r = n?.throttleMs ?? this._defaultThrottleMs ?? 0, i = 0;
		if (!Number.isFinite(r) || r < 0) {
			let t = n?.throttleMs === void 0 ? "defaultThrottleMs" : "throttleMs";
			this.logAndEmitError(`CopilotKitCore.subscribeToAgentWithOptions: ${t} must be a non-negative finite number, got ${r}. Falling back to unthrottled.`, {
				error: /* @__PURE__ */ Error(`subscribeToAgentWithOptions: invalid ${t} (${r}), falling back to unthrottled`),
				code: Ev.SUBSCRIBER_CALLBACK_FAILED,
				context: {
					agentId: e.agentId,
					source: t,
					value: r
				}
			});
		} else i = r;
		let a = e.agentId || "(unknown agent)", o = (t, n, ...r) => {
			let i = (n, r) => {
				this.logAndEmitError(`CopilotKitCore.subscribeToAgentWithOptions[${a}]: ${t} callback ${r}:`, {
					error: n instanceof Error ? n : Error(String(n)),
					code: Ev.SUBSCRIBER_CALLBACK_FAILED,
					context: {
						agentId: e.agentId,
						callback: t
					}
				});
			};
			try {
				let e = n(...r);
				return e instanceof Promise ? e.catch((e) => {
					i(e, "rejected");
				}) : e;
			} catch (e) {
				i(e, "threw");
			}
		}, s = (e) => {
			let t = {};
			if (e.onMessagesChanged) {
				let n = e.onMessagesChanged;
				t.onMessagesChanged = (e) => o("onMessagesChanged", n, e);
			}
			if (e.onStateChanged) {
				let n = e.onStateChanged;
				t.onStateChanged = (e) => o("onStateChanged", n, e);
			}
			if (e.onRunInitialized) {
				let n = e.onRunInitialized;
				t.onRunInitialized = (e) => o("onRunInitialized", n, e);
			}
			if (e.onRunFinalized) {
				let n = e.onRunFinalized;
				t.onRunFinalized = (e) => o("onRunFinalized", n, e);
			}
			if (e.onRunFailed) {
				let n = e.onRunFailed;
				t.onRunFailed = (e) => o("onRunFailed", n, e);
			}
			if (e.onRunErrorEvent) {
				let n = e.onRunErrorEvent;
				t.onRunErrorEvent = (e) => o("onRunErrorEvent", n, e);
			}
			return t;
		};
		for (let n of Object.keys(t)) if (typeof t[n] == "function" && !Dv.has(n)) {
			let t = `CopilotKitCore.subscribeToAgentWithOptions[${a}]: callback "${n}" is not supported and was dropped. Supported callbacks: ${Array.from(Dv).join(", ")}. Use agent.subscribe() directly for event handlers and per-item notifications.`;
			this.logAndEmitError(t, {
				error: Error(t),
				code: Ev.SUBSCRIBER_CALLBACK_FAILED,
				context: {
					agentId: e.agentId,
					droppedCallback: n
				}
			}, "warn");
		}
		if (i <= 0) {
			let n = e.subscribe(s(t));
			return { unsubscribe: () => n.unsubscribe() };
		}
		let c = !0, l = null, u = null, d = new Ye(() => {
			if (c && t.onMessagesChanged && l) {
				let e = l;
				l = null, o("onMessagesChanged", t.onMessagesChanged, e);
			}
			if (c && t.onStateChanged && u) {
				let e = u;
				u = null, o("onStateChanged", t.onStateChanged, e);
			}
		}, {
			wait: i,
			leading: !0,
			trailing: !0
		}), f = {};
		t.onRunInitialized && (f.onRunInitialized = t.onRunInitialized), t.onRunFinalized && (f.onRunFinalized = t.onRunFinalized), t.onRunFailed && (f.onRunFailed = t.onRunFailed), t.onRunErrorEvent && (f.onRunErrorEvent = t.onRunErrorEvent);
		let p = s(f);
		t.onMessagesChanged && (p.onMessagesChanged = (e) => {
			l = e, d.maybeExecute();
		}), t.onStateChanged && (p.onStateChanged = (e) => {
			u = e, d.maybeExecute();
		});
		let m = e.subscribe(p);
		return { unsubscribe: () => {
			c = !1, d.cancel(), m.unsubscribe();
		} };
	}
	async connectAgent(e) {
		return this.runHandler.connectAgent(e);
	}
	stopAgent(e) {
		this.runHandler.abortCurrentRun(), e.agent.abortRun();
	}
	async runAgent(e) {
		return this.runHandler.runAgent(e);
	}
	async runTool(e) {
		return this.runHandler.runTool(e);
	}
	getStateByRun(e, t, n) {
		return this.stateManager.getStateByRun(e, t, n);
	}
	getRunIdForMessage(e, t, n) {
		return this.stateManager.getRunIdForMessage(e, t, n);
	}
	getRawEventForMessage(e, t, n) {
		return this.stateManager.getRawEventForMessage(e, t, n);
	}
	getRunIdsForThread(e, t) {
		return this.stateManager.getRunIdsForThread(e, t);
	}
	buildFrontendTools(e) {
		return this.runHandler.buildFrontendTools(e);
	}
	async waitForPendingFrameworkUpdates() {}
}, jv = /* @__PURE__ */ function(e) {
	return e.InProgress = "inProgress", e.Executing = "executing", e.Complete = "complete", e;
}({}), Mv = "thread_metadata", Nv = "thread_run_activity", Pv = "/threads/subscribe", Fv = 5, Iv = 15e3, Lv = {
	threads: [],
	isLoading: !1,
	isFetchingNextPage: !1,
	error: null,
	fetchMoreError: null,
	context: null,
	sessionId: 0,
	metadataCredentialsRequested: !1,
	metadataJoinCode: null,
	nextCursor: null,
	inFlightMutationCount: 0,
	pendingDeletes: {}
}, Rv = j_("Thread Adapter", {
	started: A_(),
	stopped: A_(),
	contextChanged: $(),
	fetchNextPageRequested: A_(),
	renameRequested: $(),
	archiveRequested: $(),
	unarchiveRequested: $(),
	deleteRequested: $(),
	newThreadStarted: A_()
}), zv = j_("Thread REST", {
	listRequested: $(),
	listSucceeded: $(),
	listFailed: $(),
	nextPageSucceeded: $(),
	nextPageFailed: $(),
	metadataCredentialsRequested: $(),
	metadataCredentialsSucceeded: $(),
	metadataCredentialsFailed: $(),
	mutationFinished: $()
}), Bv = j_("Thread Socket", {
	opened: $(),
	errored: $(),
	joinFailed: $(),
	joinTimedOut: $(),
	metadataReceived: $(),
	runActivityReceived: $()
}), Vv = j_("Thread Domain", {
	threadUpserted: $(),
	threadDeleted: $()
});
function Hv(e) {
	return [...e].sort((e, t) => {
		let n = e.lastRunAt ?? e.updatedAt ?? e.createdAt;
		return (t.lastRunAt ?? t.updatedAt ?? t.createdAt).localeCompare(n);
	});
}
function Uv(e, t) {
	let n = e.findIndex((e) => e.id === t.id);
	if (n === -1) return Hv([...e, t]);
	let r = [...e];
	return r[n] = t, Hv(r);
}
function Wv(e) {
	return typeof e == "string" && e.length > 0 ? e : void 0;
}
function Gv(e, t) {
	if (!t || e.operation === "deleted") return !0;
	let n = Wv(e.thread.agentId);
	return !n || n === t;
}
function Kv(e) {
	let t = Wv(e.threadId ?? e.thread_id), n = Wv(e.eventType ?? e.event_type);
	return !t || !n ? null : {
		type: "thread_run_activity",
		threadId: t,
		agentId: Wv(e.agentId ?? e.agent_id),
		runId: Wv(e.runId ?? e.run_id),
		eventType: n,
		latestEventId: Wv(e.latestEventId ?? e.latest_event_id)
	};
}
var qv = N_(Lv, M_(Rv.contextChanged, (e, { context: t }) => ({
	...e,
	context: t,
	sessionId: e.sessionId + 1,
	threads: [],
	isLoading: !!t,
	isFetchingNextPage: !1,
	error: null,
	fetchMoreError: null,
	metadataCredentialsRequested: !1,
	metadataJoinCode: null,
	nextCursor: null,
	inFlightMutationCount: 0,
	pendingDeletes: {}
})), M_(Rv.stopped, (e) => ({
	...e,
	threads: [],
	isLoading: !1,
	isFetchingNextPage: !1,
	error: null,
	fetchMoreError: null,
	metadataCredentialsRequested: !1,
	metadataJoinCode: null,
	nextCursor: null,
	inFlightMutationCount: 0,
	pendingDeletes: {}
})), M_(zv.listRequested, (e, { sessionId: t }) => t !== e.sessionId || !e.context ? e : {
	...e,
	isLoading: !0,
	error: null,
	fetchMoreError: null
}), M_(zv.listSucceeded, (e, { sessionId: t, threads: n, joinCode: r, nextCursor: i }) => {
	if (t !== e.sessionId) return e;
	let a = r !== e.metadataJoinCode;
	return {
		...e,
		threads: Hv(n),
		isLoading: !1,
		error: null,
		fetchMoreError: null,
		metadataJoinCode: r,
		metadataCredentialsRequested: !a && e.metadataCredentialsRequested,
		nextCursor: i
	};
}), M_(zv.listFailed, (e, { sessionId: t, error: n }) => t === e.sessionId ? {
	...e,
	isLoading: !1,
	error: n
} : e), M_(zv.nextPageSucceeded, (e, { sessionId: t, threads: n, nextCursor: r }) => {
	if (t !== e.sessionId) return e;
	let i = e.threads;
	for (let e of n) i = Uv(i, e);
	return {
		...e,
		threads: i,
		isFetchingNextPage: !1,
		fetchMoreError: null,
		nextCursor: r
	};
}), M_(zv.nextPageFailed, (e, { sessionId: t, error: n }) => t === e.sessionId ? {
	...e,
	isFetchingNextPage: !1,
	fetchMoreError: n
} : e), M_(zv.metadataCredentialsFailed, (e, { sessionId: t }) => t === e.sessionId ? {
	...e,
	metadataCredentialsRequested: !1
} : e), M_(zv.metadataCredentialsRequested, (e, { sessionId: t }) => t === e.sessionId ? {
	...e,
	metadataCredentialsRequested: !0
} : e), M_(Rv.fetchNextPageRequested, (e) => !e.nextCursor || e.isFetchingNextPage ? e : {
	...e,
	isFetchingNextPage: !0,
	fetchMoreError: null
}), M_(Rv.renameRequested, (e, { threadId: t, name: n }) => {
	let r = e.threads.find((e) => e.id === t), i = e.inFlightMutationCount + 1;
	return r ? {
		...e,
		threads: Uv(e.threads, {
			...r,
			name: n
		}),
		inFlightMutationCount: i
	} : {
		...e,
		inFlightMutationCount: i
	};
}), M_(Rv.archiveRequested, (e, { threadId: t }) => {
	let n = e.threads.find((e) => e.id === t), r = e.inFlightMutationCount + 1;
	return n ? e.context?.includeArchived ? {
		...e,
		threads: Uv(e.threads, {
			...n,
			archived: !0
		}),
		inFlightMutationCount: r
	} : {
		...e,
		threads: e.threads.filter((e) => e.id !== t),
		inFlightMutationCount: r
	} : {
		...e,
		inFlightMutationCount: r
	};
}), M_(Rv.unarchiveRequested, (e, { threadId: t }) => {
	let n = e.threads.find((e) => e.id === t), r = e.inFlightMutationCount + 1;
	return n ? {
		...e,
		threads: Uv(e.threads, {
			...n,
			archived: !1
		}),
		inFlightMutationCount: r
	} : {
		...e,
		inFlightMutationCount: r
	};
}), M_(Rv.deleteRequested, (e, { requestId: t, threadId: n }) => {
	let r = e.threads.find((e) => e.id === n), i = e.inFlightMutationCount + 1;
	return r ? {
		...e,
		threads: e.threads.filter((e) => e.id !== n),
		pendingDeletes: {
			...e.pendingDeletes,
			[t]: r
		},
		inFlightMutationCount: i
	} : {
		...e,
		inFlightMutationCount: i
	};
}), M_(Rv.newThreadStarted, (e) => ({
	...e,
	error: null
})), M_(zv.mutationFinished, (e, { outcome: t }) => {
	if (t.sessionId !== e.sessionId) return e;
	let n = Math.max(0, e.inFlightMutationCount - 1);
	if (t.ok) {
		if (e.pendingDeletes[t.requestId] === void 0) return {
			...e,
			inFlightMutationCount: n
		};
		let { [t.requestId]: r, ...i } = e.pendingDeletes;
		return {
			...e,
			inFlightMutationCount: n,
			pendingDeletes: i
		};
	}
	let r = e.pendingDeletes[t.requestId];
	if (r === void 0) return {
		...e,
		inFlightMutationCount: n,
		error: t.error
	};
	let { [t.requestId]: i, ...a } = e.pendingDeletes;
	return {
		...e,
		threads: Uv(e.threads, r),
		pendingDeletes: a,
		inFlightMutationCount: n,
		error: t.error
	};
}), M_(Vv.threadUpserted, (e, { sessionId: t, thread: n }) => t === e.sessionId ? {
	...e,
	threads: Uv(e.threads, n)
} : e), M_(Vv.threadDeleted, (e, { sessionId: t, threadId: n }) => t === e.sessionId ? {
	...e,
	threads: e.threads.filter((e) => e.id !== n)
} : e));
function Jv() {
	return {
		threads: P_((e) => e.threads),
		isLoading: P_((e) => e.isLoading),
		error: P_((e) => e.error),
		fetchMoreError: P_((e) => e.fetchMoreError),
		hasNextPage: P_((e) => e.nextCursor != null),
		isFetchingNextPage: P_((e) => e.isFetchingNextPage),
		isMutating: P_((e) => e.inFlightMutationCount > 0)
	};
}
var Yv = Jv(), Xv = Yv.threads, Zv = Yv.isLoading, Qv = Yv.error, $v = Yv.fetchMoreError, ey = Yv.hasNextPage, ty = Yv.isFetchingNextPage, ny = Yv.isMutating, ry = 0;
function iy() {
	return ry += 1, `thread-request-${ry}`;
}
function ay(e, t) {
	return new ka((n) => {
		let { fetch: r, selector: i, signal: a, timeoutMs: o, nonCritical: s, ...c } = t, l = new AbortController(), u = {
			...s ? { nonCritical: !0 } : {},
			...o === void 0 ? {} : { selfBounded: !0 }
		}, d = !1, f = () => l.abort();
		a?.aborted ? f() : a?.addEventListener("abort", f, { once: !0 });
		let p = o === void 0 ? void 0 : setTimeout(() => {
			d = !0, u.timedOut = !0, f();
		}, o);
		return r(e, {
			...c,
			signal: l.signal,
			ɵruntimeRequest: u
		}).then((e) => i(e)).then((e) => {
			n.closed || (n.next(e), n.complete());
		}).catch((e) => {
			n.closed || n.error(d ? /* @__PURE__ */ Error("Request timed out") : e);
		}), () => {
			p !== void 0 && clearTimeout(p), a?.removeEventListener("abort", f), f();
		};
	});
}
function oy(e, t, n) {
	return gs(() => {
		let r = { agentId: t.agentId };
		t.includeArchived && (r.includeArchived = "true"), t.limit != null && (r.limit = String(t.limit));
		let i = new URLSearchParams(r);
		return ay(`${t.runtimeUrl}/threads?${i.toString()}`, {
			selector: (e) => {
				if (!e.ok) throw Error(`Failed to fetch threads: ${e.status}`);
				return e.json();
			},
			fetch: e.fetch,
			timeoutMs: Iv,
			method: "GET",
			headers: { ...t.headers }
		}).pipe(j((e) => zv.listSucceeded({
			sessionId: n,
			threads: e.threads,
			joinCode: typeof e.joinCode == "string" && e.joinCode.length > 0 ? e.joinCode : null,
			nextCursor: e.nextCursor ?? null
		})), xs((e) => k(zv.listFailed({
			sessionId: n,
			error: e instanceof Error ? e : Error(String(e))
		}))));
	});
}
function sy(e, t, n) {
	return gs(() => ay(`${t.runtimeUrl}${Pv}`, {
		selector: async (e) => {
			if (!e.ok) throw Error(`Failed to fetch thread metadata credentials: ${e.status}`);
			return e.json();
		},
		fetch: e.fetch,
		timeoutMs: Iv,
		nonCritical: !0,
		method: "POST",
		headers: {
			...t.headers,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({})
	}).pipe(j((e) => {
		if (typeof e.joinToken != "string" || e.joinToken.length === 0) throw Error("missing joinToken");
		return zv.metadataCredentialsSucceeded({
			sessionId: n,
			joinToken: e.joinToken
		});
	}), xs((e) => k(zv.metadataCredentialsFailed({
		sessionId: n,
		error: e instanceof Error ? e : Error(String(e))
	})))));
}
function cy(e, t, n) {
	return gs(() => ay(`${t.runtimeUrl}${n.path}`, {
		selector: async (e) => {
			if (!e.ok) throw Error(`Request failed: ${e.status}`);
			return null;
		},
		fetch: e.fetch,
		method: n.method,
		headers: {
			...t.headers,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(n.body)
	}).pipe(j(() => zv.mutationFinished({ outcome: {
		requestId: n.requestId,
		sessionId: n.sessionId,
		ok: !0
	} })), xs((e) => k(zv.mutationFinished({ outcome: {
		requestId: n.requestId,
		sessionId: n.sessionId,
		ok: !1,
		error: e instanceof Error ? e : Error(String(e))
	} })))));
}
function ly(e) {
	let t = Jv(), n = R_({
		reducer: qv,
		effects: [
			L_((e, t) => e.pipe(I_(Rv.contextChanged), Ws(t), bs(([, e]) => !!e.context), j(([, e]) => zv.listRequested({ sessionId: e.sessionId })))),
			L_((t, n) => t.pipe(I_(zv.listRequested), Vs((r) => n.pipe(j((e) => e.context), bs((e) => !!e), Ds(1), j((e) => ({
				action: r,
				context: e
			})), Hs(t.pipe(I_(Rv.contextChanged, Rv.stopped))), Vs(({ action: t, context: n }) => oy(e, n, t.sessionId)))))),
			L_((e, t) => e.pipe(I_(zv.listSucceeded), Ws(t), bs(([e, t]) => e.sessionId === t.sessionId && !t.metadataCredentialsRequested && !!t.context?.wsUrl && !!t.metadataJoinCode), j(([e]) => zv.metadataCredentialsRequested({ sessionId: e.sessionId })))),
			L_((t, n) => t.pipe(I_(zv.metadataCredentialsRequested), Vs((r) => n.pipe(j((e) => e.context), bs((e) => !!e), Ds(1), j((e) => ({
				action: r,
				context: e
			})), Hs(t.pipe(I_(Rv.contextChanged, Rv.stopped))), Vs(({ action: t, context: n }) => sy(e, n, t.sessionId)))))),
			L_((e, t) => e.pipe(I_(zv.metadataCredentialsSucceeded), Ws(t), bs(([e, t]) => e.sessionId === t.sessionId && !!t.context?.wsUrl), Vs(([t, n]) => {
				let r = n.context, i = t.joinToken, a = n.metadataJoinCode, o = e.pipe(I_(Rv.contextChanged, Rv.stopped));
				return gs(() => {
					let e = vg({
						url: r.wsUrl,
						options: {
							params: { join_token: i },
							reconnectAfterMs: lp(100, 1e4),
							rejoinAfterMs: lp(1e3, 3e4)
						}
					}).pipe(Bs({
						bufferSize: 1,
						refCount: !0
					})), n = yg({
						socket$: e,
						topic: `user_meta:${a}`
					}).pipe(Bs({
						bufferSize: 1,
						refCount: !0
					})), s = Cg(e).pipe(Rs()), c = wg(s, Fv).pipe(xs(() => (console.warn(`[threads] WebSocket failed after ${Fv} attempts, giving up`), k(void 0))), Rs());
					return vs(s.pipe(j((e) => e.type === "open" ? Bv.opened({ sessionId: t.sessionId }) : Bv.errored({ sessionId: t.sessionId }))), n.pipe(Vs(({ channel: e }) => bg(e, Mv)), j((e) => Bv.metadataReceived({
						sessionId: t.sessionId,
						payload: e
					}))), n.pipe(Vs(({ channel: e }) => bg(e, Nv)), j((e) => Kv(e)), bs((e) => e !== null), j((e) => Bv.runActivityReceived({
						sessionId: t.sessionId,
						notification: e
					}))), xg(n).pipe(bs((e) => e.type !== "joined"), j((e) => e.type === "timeout" ? Bv.joinTimedOut({ sessionId: t.sessionId }) : Bv.joinFailed({ sessionId: t.sessionId })))).pipe(Hs(vs(o, c)));
				});
			}))),
			L_((e, t) => e.pipe(I_(Bv.metadataReceived), Ws(t), bs(([e, t]) => e.sessionId === t.sessionId && Gv(e.payload, t.context?.agentId)), j(([e, t]) => e.payload.operation === "deleted" ? Vv.threadDeleted({
				sessionId: e.sessionId,
				threadId: e.payload.deleted.id
			}) : e.payload.operation === "archived" && !t.context?.includeArchived ? Vv.threadDeleted({
				sessionId: e.sessionId,
				threadId: e.payload.threadId
			}) : Vv.threadUpserted({
				sessionId: e.sessionId,
				thread: e.payload.thread
			})))),
			L_((e, t) => e.pipe(I_(Bv.joinFailed, Bv.joinTimedOut, Bv.errored, zv.metadataCredentialsFailed), Ws(t), bs(([e, t]) => e.sessionId === t.sessionId), Us(([e]) => {
				let t = Bv.joinTimedOut.match(e) ? "channel join timed out" : Bv.joinFailed.match(e) ? "channel join was rejected" : zv.metadataCredentialsFailed.match(e) ? "metadata credentials fetch failed" : "socket errored";
				console.warn(`[threads] realtime ${t}; the thread list may be stale until reconnect`);
			})), { dispatch: !1 }),
			L_((t, n) => t.pipe(I_(Rv.fetchNextPageRequested), Ws(n), bs(([, e]) => !!e.context && !!e.nextCursor), Vs(([, n]) => {
				let r = n.context, i = {
					agentId: r.agentId,
					cursor: n.nextCursor
				};
				return r.includeArchived && (i.includeArchived = "true"), r.limit != null && (i.limit = String(r.limit)), ay(`${r.runtimeUrl}/threads?${new URLSearchParams(i).toString()}`, {
					selector: (e) => {
						if (!e.ok) throw Error(`Failed to fetch next page: ${e.status}`);
						return e.json();
					},
					fetch: e.fetch,
					timeoutMs: Iv,
					method: "GET",
					headers: { ...r.headers }
				}).pipe(j((e) => zv.nextPageSucceeded({
					sessionId: n.sessionId,
					threads: e.threads,
					nextCursor: e.nextCursor ?? null
				})), xs((e) => k(zv.nextPageFailed({
					sessionId: n.sessionId,
					error: e instanceof Error ? e : Error(String(e))
				}))), Hs(t.pipe(I_(Rv.contextChanged, Rv.stopped))));
			}))),
			L_((t, n) => t.pipe(I_(Rv.renameRequested, Rv.archiveRequested, Rv.unarchiveRequested, Rv.deleteRequested), Ws(n), fs(([t, n]) => {
				let r = n.sessionId, i = n.context;
				if (!i?.runtimeUrl) {
					let e = t.requestId;
					return k(zv.mutationFinished({ outcome: {
						requestId: e,
						sessionId: r,
						ok: !1,
						error: /* @__PURE__ */ Error("Runtime URL is not configured")
					} }));
				}
				let a = { agentId: i.agentId };
				return Rv.renameRequested.match(t) ? cy(e, i, {
					requestId: t.requestId,
					sessionId: r,
					method: "PATCH",
					path: `/threads/${encodeURIComponent(t.threadId)}`,
					body: {
						...a,
						name: t.name
					}
				}) : Rv.archiveRequested.match(t) ? cy(e, i, {
					requestId: t.requestId,
					sessionId: r,
					method: "POST",
					path: `/threads/${encodeURIComponent(t.threadId)}/archive`,
					body: a
				}) : Rv.unarchiveRequested.match(t) ? cy(e, i, {
					requestId: t.requestId,
					sessionId: r,
					method: "PATCH",
					path: `/threads/${encodeURIComponent(t.threadId)}`,
					body: {
						...a,
						archived: !1
					}
				}) : cy(e, i, {
					requestId: t.requestId,
					sessionId: r,
					method: "DELETE",
					path: `/threads/${encodeURIComponent(t.threadId)}`,
					body: a
				});
			})))
		]
	});
	function r(e) {
		let t = qo(vs(n.actions$.pipe(I_(zv.mutationFinished), bs((t) => t.outcome.requestId === e.requestId), j((e) => e.outcome)), n.actions$.pipe(I_(Rv.stopped), j(() => ({
			requestId: e.requestId,
			sessionId: n.getState().sessionId,
			ok: !1,
			error: /* @__PURE__ */ Error("Thread store stopped before mutation completed")
		})))).pipe(Ds(1))).then((e) => {
			if (!e.ok) throw e.error;
		});
		return n.dispatch(e), t;
	}
	let i = null, a = () => {
		e.onError && !i && (i = n.actions$.pipe(I_(zv.mutationFinished), bs((e) => !e.outcome.ok && e.outcome.sessionId === n.getState().sessionId)).subscribe((t) => {
			t.outcome.ok || e.onError?.(t.outcome.error);
		}));
	};
	return {
		start() {
			n.init(), a(), n.dispatch(Rv.started());
		},
		stop() {
			n.dispatch(Rv.stopped()), i?.unsubscribe(), i = null, n.stop();
		},
		setContext(e) {
			n.dispatch(Rv.contextChanged({ context: e }));
		},
		refresh() {
			let { sessionId: e, context: t } = n.getState();
			t && n.dispatch(zv.listRequested({ sessionId: e }));
		},
		refetchThreads() {
			let { sessionId: e, context: t } = n.getState();
			t && n.dispatch(zv.listRequested({ sessionId: e }));
		},
		startNewThread() {
			n.dispatch(Rv.newThreadStarted());
		},
		fetchNextPage() {
			n.dispatch(Rv.fetchNextPageRequested());
		},
		renameThread(e, t) {
			return r(Rv.renameRequested({
				requestId: iy(),
				threadId: e,
				name: t
			}));
		},
		archiveThread(e) {
			return r(Rv.archiveRequested({
				requestId: iy(),
				threadId: e
			}));
		},
		unarchiveThread(e) {
			return r(Rv.unarchiveRequested({
				requestId: iy(),
				threadId: e
			}));
		},
		deleteThread(e) {
			return r(Rv.deleteRequested({
				requestId: iy(),
				threadId: e
			}));
		},
		subscribeToRunActivity(e) {
			return n.actions$.pipe(I_(Bv.runActivityReceived), bs((e) => e.sessionId === n.getState().sessionId), j((e) => e.notification)).subscribe(e);
		},
		getState() {
			return n.getState();
		},
		getServerState() {
			return Lv;
		},
		select: n.select.bind(n),
		selectors: t
	};
}
var uy = Xv, dy = Zv, fy = Qv, py = $v, my = ey, hy = ty, gy = ny, _y = Object.freeze([
	"chat",
	"sidebar",
	"popup",
	"threads"
]);
new Set(_y);
var vy = "copilotkit:cpk-inspector-thread";
function yy(e) {
	return `${vy}:${e}`;
}
function by() {
	if (typeof window < "u" && typeof window.addEventListener == "function") return window;
	if (typeof EventTarget > "u") return null;
	let e = globalThis;
	return e.__COPILOTKIT_INSPECTOR_THREAD_EVENT_TARGET__ ?? (e.__COPILOTKIT_INSPECTOR_THREAD_EVENT_TARGET__ = new EventTarget()), e.__COPILOTKIT_INSPECTOR_THREAD_EVENT_TARGET__;
}
function xy(e, t) {
	if (typeof CustomEvent < "u") return new CustomEvent(e, { detail: t });
	let n = new Event(e);
	return Object.defineProperty(n, "detail", { value: t }), n;
}
function Sy(e) {
	return e.detail;
}
function Cy() {
	return !1;
}
function wy() {
	return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `inspector-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function Ty(e, t) {
	if (!Cy()) return;
	let n = by();
	n && n.dispatchEvent(xy(yy(e), t));
}
function Ey(e, t) {
	if (!Cy()) return () => void 0;
	let n = by();
	if (!n) return () => void 0;
	let r = (e) => {
		t(Sy(e));
	}, i = yy(e);
	return n.addEventListener(i, r), () => n.removeEventListener(i, r);
}
function Dy(e) {
	if (!Cy()) return !1;
	let t = by();
	if (!t) return !1;
	let n = {
		payload: e,
		claimed: !1
	};
	return t.dispatchEvent(xy(yy("view-thread"), n)), n.claimed;
}
function Oy(e) {
	Ty("stop-viewing", e);
}
function ky(e) {
	Ty("active-thread", e);
}
function Ay(e) {
	Ty("view-thread-result", e);
}
function jy(e) {
	if (!Cy()) return () => void 0;
	let t = by();
	if (!t) return () => void 0;
	let n = (t) => {
		let n = Sy(t);
		n.claimed || (n.claimed = e(n.payload));
	}, r = yy("view-thread");
	return t.addEventListener(r, n), () => t.removeEventListener(r, n);
}
function My(e) {
	return Ey("stop-viewing", e);
}
function Ny(e) {
	return Ey("active-thread", e);
}
function Py(e) {
	return Ey("view-thread-result", e);
}
//#endregion
//#region node_modules/@lit/reactive-element/css-tag.js
var Fy = globalThis, Iy = Fy.ShadowRoot && (Fy.ShadyCSS === void 0 || Fy.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ly = Symbol(), Ry = /* @__PURE__ */ new WeakMap(), zy = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== Ly) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (Iy && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = Ry.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Ry.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, By = (e) => new zy(typeof e == "string" ? e : e + "", void 0, Ly), Vy = (e, ...t) => new zy(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, Ly), Hy = (e, t) => {
	if (Iy) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = Fy.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, Uy = Iy ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return By(t);
})(e) : e, Wy, { is: Gy, defineProperty: Ky, getOwnPropertyDescriptor: qy, getOwnPropertyNames: Jy, getOwnPropertySymbols: Yy, getPrototypeOf: Xy } = Object, Zy = globalThis, Qy = Zy.trustedTypes, $y = Qy ? Qy.emptyScript : "", eb = Zy.reactiveElementPolyfillSupport, tb = (e, t) => e, nb = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? $y : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, rb = (e, t) => !Gy(e, t), ib = {
	attribute: !0,
	type: String,
	converter: nb,
	reflect: !1,
	useDefault: !1,
	hasChanged: rb
};
(Wy = Symbol).metadata ?? (Wy.metadata = Symbol("metadata")), Zy.litPropertyMetadata ?? (Zy.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var ab = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ?? (this.l = [])).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ib) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && Ky(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = qy(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? ib;
	}
	static _$Ei() {
		if (this.hasOwnProperty(tb("elementProperties"))) return;
		let e = Xy(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(tb("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(tb("properties"))) {
			let e = this.properties, t = [...Jy(e), ...Yy(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(Uy(e));
		} else e !== void 0 && t.push(Uy(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return Hy(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? nb : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? nb : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ?? (n = a.getPropertyOptions(e)), !((n.hasChanged ?? rb)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
ab.elementStyles = [], ab.shadowRootOptions = { mode: "open" }, ab[tb("elementProperties")] = /* @__PURE__ */ new Map(), ab[tb("finalized")] = /* @__PURE__ */ new Map(), eb?.({ ReactiveElement: ab }), (Zy.reactiveElementVersions ?? (Zy.reactiveElementVersions = [])).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ob = globalThis, sb = (e) => e, cb = ob.trustedTypes, lb = cb ? cb.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ub = "$lit$", db = `lit$${Math.random().toFixed(9).slice(2)}$`, fb = "?" + db, pb = `<${fb}>`, mb = document, hb = () => mb.createComment(""), gb = (e) => e === null || typeof e != "object" && typeof e != "function", _b = Array.isArray, vb = (e) => _b(e) || typeof e?.[Symbol.iterator] == "function", yb = "[ 	\n\f\r]", bb = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xb = /-->/g, Sb = />/g, Cb = RegExp(`>|${yb}(?:([^\\s"'>=/]+)(${yb}*=${yb}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), wb = /'/g, Tb = /"/g, Eb = /^(?:script|style|textarea|title)$/i, Db = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), Ob = Symbol.for("lit-noChange"), kb = Symbol.for("lit-nothing"), Ab = /* @__PURE__ */ new WeakMap(), jb = mb.createTreeWalker(mb, 129);
function Mb(e, t) {
	if (!_b(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return lb === void 0 ? t : lb.createHTML(t);
}
var Nb = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = bb;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === bb ? c[1] === "!--" ? o = xb : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = Cb) : (Eb.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = Cb) : o = Sb : o === Cb ? c[0] === ">" ? (o = i ?? bb, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? Cb : c[3] === "\"" ? Tb : wb) : o === Tb || o === wb ? o = Cb : o === xb || o === Sb ? o = bb : (o = Cb, i = void 0);
		let d = o === Cb && e[t + 1].startsWith("/>") ? " " : "";
		a += o === bb ? n + pb : l >= 0 ? (r.push(s), n.slice(0, l) + ub + n.slice(l) + db + d) : n + db + (l === -2 ? t : d);
	}
	return [Mb(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Pb = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Nb(t, n);
		if (this.el = e.createElement(l, r), jb.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = jb.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ub)) {
					let t = u[o++], n = i.getAttribute(e).split(db), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? zb : r[1] === "?" ? Bb : r[1] === "@" ? Vb : Rb
					}), i.removeAttribute(e);
				} else e.startsWith(db) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Eb.test(i.tagName)) {
					let e = i.textContent.split(db), t = e.length - 1;
					if (t > 0) {
						i.textContent = cb ? cb.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], hb()), jb.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], hb());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === fb) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(db, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += db.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = mb.createElement("template");
		return n.innerHTML = e, n;
	}
};
function Fb(e, t, n = e, r) {
	if (t === Ob) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = gb(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ?? (n._$Co = []))[r] = i), i !== void 0 && (t = Fb(e, i._$AS(e, t.values), i, r)), t;
}
var Ib = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? mb).importNode(t, !0);
		jb.currentNode = r;
		let i = jb.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Lb(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Hb(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = jb.nextNode(), a++);
		}
		return jb.currentNode = mb, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Lb = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = kb, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = Fb(this, e, t), gb(e) ? e === kb || e == null || e === "" ? (this._$AH !== kb && this._$AR(), this._$AH = kb) : e !== this._$AH && e !== Ob && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? vb(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== kb && gb(this._$AH) ? this._$AA.nextSibling.data = e : this.T(mb.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Pb.createElement(Mb(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Ib(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Ab.get(e.strings);
		return t === void 0 && Ab.set(e.strings, t = new Pb(e)), t;
	}
	k(t) {
		_b(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(hb()), this.O(hb()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = sb(e).nextSibling;
			sb(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Rb = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = kb, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = kb;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = Fb(this, e, t, 0), a = !gb(e) || e !== this._$AH && e !== Ob, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = Fb(this, r[n + o], t, o), s === Ob && (s = this._$AH[o]), a || (a = !gb(s) || s !== this._$AH[o]), s === kb ? e = kb : e !== kb && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === kb ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, zb = class extends Rb {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === kb ? void 0 : e;
	}
}, Bb = class extends Rb {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== kb);
	}
}, Vb = class extends Rb {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = Fb(this, e, t, 0) ?? kb) === Ob) return;
		let n = this._$AH, r = e === kb && n !== kb || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== kb && (n === kb || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Hb = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		Fb(this, e);
	}
}, Ub = {
	M: ub,
	P: db,
	A: fb,
	C: 1,
	L: Nb,
	R: Ib,
	D: vb,
	V: Fb,
	I: Lb,
	H: Rb,
	N: Bb,
	U: Vb,
	B: zb,
	F: Hb
}, Wb = ob.litHtmlPolyfillSupport;
Wb?.(Pb, Lb), (ob.litHtmlVersions ?? (ob.litHtmlVersions = [])).push("3.3.3");
var Gb = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Lb(t.insertBefore(hb(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Kb = globalThis, qb = class extends ab {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		var e;
		let t = super.createRenderRoot();
		return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Gb(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return Ob;
	}
};
qb._$litElement$ = !0, qb.finalized = !0, Kb.litElementHydrateSupport?.({ LitElement: qb });
var Jb = Kb.litElementPolyfillSupport;
Jb?.({ LitElement: qb }), (Kb.litElementVersions ?? (Kb.litElementVersions = [])).push("4.2.2");
//#endregion
//#region node_modules/lit-html/directive.js
var Yb = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Xb = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Zb = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
};
//#endregion
export { my as A, dy as B, Cy as C, jy as D, My as E, Cv as F, ip as G, pp as H, Sv as I, Hi as J, Gf as K, Tv as L, gy as M, xv as N, Py as O, wv as P, uy as R, Ay as S, Ny as T, cp as U, fg as V, ap as W, qi as Y, wy as _, kb as a, Oy as b, Db as c, By as d, Av as f, jv as g, Vg as h, qb as i, hy as j, py as k, Ub as l, Ov as m, Zb as n, Gb as o, Ev as p, Vi as q, Yb as r, Ob as s, Xb as t, Vy as u, ly as v, Mg as w, Dy as x, ky as y, fy as z };
