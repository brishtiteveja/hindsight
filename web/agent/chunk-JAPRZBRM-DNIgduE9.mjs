import { i as e, n as t, t as n } from "./rolldown-runtime-DArdT4gl.mjs";
import { t as r } from "./defineProperty-DxjBOsvz.mjs";
import { t as i } from "./katex-BxecjHRB.mjs";
//#region node_modules/react/cjs/react.production.js
var a = /* @__PURE__ */ n(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.for("react.view_transition"), m = Symbol.iterator;
	function h(e) {
		return typeof e != "object" || !e ? null : (e = m && e[m] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var g = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, _ = Object.assign, v = {};
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	y.prototype.isReactComponent = {}, y.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, y.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function ee() {}
	ee.prototype = y.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	var te = b.prototype = new ee();
	te.constructor = b, _(te, y.prototype), te.isPureReactComponent = !0;
	var ne = Array.isArray;
	function x() {}
	var S = {
		H: null,
		A: null,
		T: null,
		S: null
	}, re = Object.prototype.hasOwnProperty;
	function ie(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function C(e, t) {
		return ie(e.type, t, e.props);
	}
	function ae(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function oe(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var se = /\/+/g;
	function ce(e, t) {
		return typeof e == "object" && e && e.key != null ? oe("" + e.key) : t.toString(36);
	}
	function le(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(x, x) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ue(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ue(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + ce(e, 0) : a, ne(o) ? (i = "", c != null && (i = c.replace(se, "$&/") + "/"), ue(o, r, i, "", function(e) {
			return e;
		})) : o != null && (ae(o) && (o = C(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(se, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ne(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + ce(a, u), c += ue(a, r, i, s, o);
		else if (u = h(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + ce(a, u++), c += ue(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ue(le(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function de(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ue(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function w(e) {
		if (e._status === -1) {
			var t = e._result, n = t();
			n.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t, n.status === void 0 && (n.status = "fulfilled", n.value = t));
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t, n.status === void 0 && (n.status = "rejected", n.reason = t));
			}), e._status === -1 && (e._status = 0, e._result = n);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var fe = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function pe(e) {
		var t = S.T, n = {};
		n.types = t === null ? null : t.types, S.T = n;
		try {
			var r = e(), i = S.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(x, fe);
		} catch (e) {
			fe(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), S.T = t;
		}
	}
	function me(e) {
		var t = S.T;
		if (t !== null) {
			var n = t.types;
			n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
		} else pe(me.bind(null, e));
	}
	var he = {
		map: de,
		forEach: function(e, t, n) {
			de(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return de(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return de(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!ae(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = he, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return S.H.useMemoCache(e);
		}
	}, e.addTransitionType = me, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = _({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !re.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return ie(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) re.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return ie(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = ae, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: w
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = pe, e.unstable_useCacheRefresh = function() {
		return S.H.useCacheRefresh();
	}, e.use = function(e) {
		return S.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return S.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return S.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return S.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return S.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return S.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return S.H.useEffectEvent(e);
	}, e.useId = function() {
		return S.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return S.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return S.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return S.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return S.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return S.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return S.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return S.H.useRef(e);
	}, e.useState = function(e) {
		return S.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return S.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return S.H.useTransition();
	}, e.version = "19.3.0";
})), o = /* @__PURE__ */ n(((e, t) => {
	t.exports = a();
})), s = /* @__PURE__ */ e(o()), c = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, l = (e, t) => ({
	classGroupId: e,
	validator: t
}), u = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), d = "-", f = [], p = "arbitrary..", m = (e) => {
	let t = _(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return g(e);
			let n = e.split(d);
			return h(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? c(i, t) : t : i || f;
			}
			return n[e] || f;
		}
	};
}, h = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = h(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(d) : e.slice(t).join(d), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, g = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? p + r : void 0;
})(), _ = (e) => {
	let { theme: t, classGroups: n } = e;
	return v(n, t);
}, v = (e, t) => {
	let n = u();
	for (let r in e) {
		let i = e[r];
		y(i, n, r, t);
	}
	return n;
}, y = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		ee(i, t, n, r);
	}
}, ee = (e, t, n, r) => {
	if (typeof e == "string") {
		b(e, t, n);
		return;
	}
	if (typeof e == "function") {
		te(e, t, n, r);
		return;
	}
	ne(e, t, n, r);
}, b = (e, t, n) => {
	let r = e === "" ? t : x(t, e);
	r.classGroupId = n;
}, te = (e, t, n, r) => {
	if (S(e)) {
		y(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(l(n, e));
}, ne = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		y(o, x(t, a), n, r);
	}
}, x = (e, t) => {
	let n = e, r = t.split(d), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = u(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, S = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, re = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, ie = "!", C = ":", ae = [], oe = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), se = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === C) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(ie) ? (c = s.slice(0, -1), l = !0) : s.startsWith(ie) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return oe(t, l, c, u);
	};
	if (t) {
		let e = t + C, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : oe(ae, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, ce = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, le = (e) => ({
	cache: re(e.cacheSize),
	parseClassName: se(e),
	sortModifiers: ce(e),
	postfixLookupClassGroupIds: ue(e),
	...m(e)
}), ue = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, de = /\s+/, w = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(de), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			if (g = r(p), !g) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + ie : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let ee = i(g, h);
		for (let e = 0; e < ee.length; ++e) {
			let t = ee[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, fe = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = pe(n)) && (i && (i += " "), i += r);
	return i;
}, pe = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = pe(e[r])) && (n && (n += " "), n += t);
	return n;
}, me = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = le(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = w(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(fe(...e));
}, he = [], ge = (e) => {
	let t = (t) => t[e] || he;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, _e = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ve = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ye = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, be = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, xe = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Se = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, Ce = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, we = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Te = (e) => ye.test(e), T = (e) => !!e && !Number.isNaN(Number(e)), Ee = (e) => !!e && Number.isInteger(Number(e)), De = (e) => e.endsWith("%") && T(e.slice(0, -1)), Oe = (e) => be.test(e), ke = () => !0, Ae = (e) => xe.test(e) && !Se.test(e), je = () => !1, Me = (e) => Ce.test(e), Ne = (e) => we.test(e), Pe = (e) => !E(e) && !D(e), Fe = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Ie = (e) => Ze(e, tt, je), E = (e) => _e.test(e), Le = (e) => Ze(e, nt, Ae), Re = (e) => Ze(e, rt, T), ze = (e) => Ze(e, at, ke), Be = (e) => Ze(e, it, je), Ve = (e) => Ze(e, $e, je), He = (e) => Ze(e, et, Ne), Ue = (e) => Ze(e, ot, Me), D = (e) => ve.test(e), We = (e) => Qe(e, nt), Ge = (e) => Qe(e, it), Ke = (e) => Qe(e, $e), qe = (e) => Qe(e, tt), Je = (e) => Qe(e, et), Ye = (e) => Qe(e, ot, !0), Xe = (e) => Qe(e, at, !0), Ze = (e, t, n) => {
	let r = _e.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Qe = (e, t, n = !1) => {
	let r = ve.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, $e = (e) => e === "position" || e === "percentage", et = (e) => e === "image" || e === "url", tt = (e) => e === "length" || e === "size" || e === "bg-size", nt = (e) => e === "length", rt = (e) => e === "number", it = (e) => e === "family-name", at = (e) => e === "number" || e === "weight", ot = (e) => e === "shadow", st = () => {
	let e = ge("color"), t = ge("font"), n = ge("text"), r = ge("font-weight"), i = ge("tracking"), a = ge("leading"), o = ge("breakpoint"), s = ge("container"), c = ge("spacing"), l = ge("radius"), u = ge("shadow"), d = ge("inset-shadow"), f = ge("text-shadow"), p = ge("drop-shadow"), m = ge("blur"), h = ge("perspective"), g = ge("aspect"), _ = ge("ease"), v = ge("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], ee = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], b = () => [
		...ee(),
		D,
		E
	], te = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], ne = () => [
		"auto",
		"contain",
		"none"
	], x = () => [
		D,
		E,
		c
	], S = () => [
		Te,
		"full",
		"auto",
		...x()
	], re = () => [
		Ee,
		"none",
		"subgrid",
		D,
		E
	], ie = () => [
		"auto",
		{ span: [
			"full",
			Ee,
			D,
			E
		] },
		Ee,
		D,
		E
	], C = () => [
		Ee,
		"auto",
		D,
		E
	], ae = () => [
		"auto",
		"min",
		"max",
		"fr",
		D,
		E
	], oe = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], se = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], ce = () => ["auto", ...x()], le = () => [
		Te,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...x()
	], ue = () => [
		s,
		Te,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...x()
	], de = () => [
		Te,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...x()
	], w = () => [
		e,
		D,
		E
	], fe = () => [
		...ee(),
		Ke,
		Ve,
		{ position: [D, E] }
	], pe = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], me = () => [
		"auto",
		"cover",
		"contain",
		qe,
		Ie,
		{ size: [D, E] }
	], he = () => [
		De,
		We,
		Le
	], _e = () => [
		"",
		"none",
		"full",
		l,
		D,
		E
	], ve = () => [
		"",
		T,
		We,
		Le
	], ye = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], be = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], xe = () => [
		T,
		De,
		Ke,
		Ve
	], Se = () => [
		"",
		"none",
		m,
		D,
		E
	], Ce = () => [
		"none",
		T,
		D,
		E
	], we = () => [
		"none",
		T,
		D,
		E
	], Ae = () => [
		T,
		D,
		E
	], je = () => [
		Te,
		"full",
		...x()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [Oe],
			breakpoint: [Oe],
			color: [ke],
			container: [Oe],
			"drop-shadow": [Oe],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Pe],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [Oe],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [Oe],
			shadow: [Oe],
			spacing: ["px", T],
			text: [Oe],
			"text-shadow": [Oe],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				Te,
				E,
				D,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				D,
				E
			] }],
			"container-named": [Fe],
			columns: [{ columns: [
				T,
				"auto",
				E,
				D,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: b() }],
			overflow: [{ overflow: te() }],
			"overflow-x": [{ "overflow-x": te() }],
			"overflow-y": [{ "overflow-y": te() }],
			overscroll: [{ overscroll: ne() }],
			"overscroll-x": [{ "overscroll-x": ne() }],
			"overscroll-y": [{ "overscroll-y": ne() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: S() }],
			"inset-x": [{ "inset-x": S() }],
			"inset-y": [{ "inset-y": S() }],
			start: [{
				"inset-s": S(),
				start: S()
			}],
			end: [{
				"inset-e": S(),
				end: S()
			}],
			"inset-bs": [{ "inset-bs": S() }],
			"inset-be": [{ "inset-be": S() }],
			top: [{ top: S() }],
			right: [{ right: S() }],
			bottom: [{ bottom: S() }],
			left: [{ left: S() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				Ee,
				"auto",
				D,
				E
			] }],
			basis: [{ basis: [
				Te,
				"full",
				"auto",
				s,
				...x()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				T,
				Te,
				"auto",
				"initial",
				"none",
				E
			] }],
			grow: [{ grow: [
				"",
				T,
				D,
				E
			] }],
			shrink: [{ shrink: [
				"",
				T,
				D,
				E
			] }],
			order: [{ order: [
				Ee,
				"first",
				"last",
				"none",
				D,
				E
			] }],
			"grid-cols": [{ "grid-cols": re() }],
			"col-start-end": [{ col: ie() }],
			"col-start": [{ "col-start": C() }],
			"col-end": [{ "col-end": C() }],
			"grid-rows": [{ "grid-rows": re() }],
			"row-start-end": [{ row: ie() }],
			"row-start": [{ "row-start": C() }],
			"row-end": [{ "row-end": C() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": ae() }],
			"auto-rows": [{ "auto-rows": ae() }],
			gap: [{ gap: x() }],
			"gap-x": [{ "gap-x": x() }],
			"gap-y": [{ "gap-y": x() }],
			"justify-content": [{ justify: [...oe(), "normal"] }],
			"justify-items": [{ "justify-items": [...se(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...se()] }],
			"align-content": [{ content: ["normal", ...oe()] }],
			"align-items": [{ items: [...se(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...se(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": oe() }],
			"place-items": [{ "place-items": [...se(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...se()] }],
			p: [{ p: x() }],
			px: [{ px: x() }],
			py: [{ py: x() }],
			ps: [{ ps: x() }],
			pe: [{ pe: x() }],
			pbs: [{ pbs: x() }],
			pbe: [{ pbe: x() }],
			pt: [{ pt: x() }],
			pr: [{ pr: x() }],
			pb: [{ pb: x() }],
			pl: [{ pl: x() }],
			m: [{ m: ce() }],
			mx: [{ mx: ce() }],
			my: [{ my: ce() }],
			ms: [{ ms: ce() }],
			me: [{ me: ce() }],
			mbs: [{ mbs: ce() }],
			mbe: [{ mbe: ce() }],
			mt: [{ mt: ce() }],
			mr: [{ mr: ce() }],
			mb: [{ mb: ce() }],
			ml: [{ ml: ce() }],
			"space-x": [{ "space-x": x() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": x() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: le() }],
			"inline-size": [{ inline: ["auto", ...ue()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...ue()] }],
			"max-inline-size": [{ "max-inline": ["none", ...ue()] }],
			"block-size": [{ block: ["auto", ...de()] }],
			"min-block-size": [{ "min-block": ["auto", ...de()] }],
			"max-block-size": [{ "max-block": ["none", ...de()] }],
			w: [{ w: [
				s,
				"screen",
				...le()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...le()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...le()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...le()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...le()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...le()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				We,
				Le
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Xe,
				ze
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				De,
				E
			] }],
			"font-family": [{ font: [
				Ge,
				Be,
				t
			] }],
			"font-features": [{ "font-features": [E] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				D,
				E
			] }],
			"line-clamp": [{ "line-clamp": [
				T,
				"none",
				D,
				Re
			] }],
			leading: [{ leading: [
				"none",
				a,
				...x()
			] }],
			"list-image": [{ "list-image": [
				"none",
				D,
				E
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				D,
				E
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: w() }],
			"text-color": [{ text: w() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...ye(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				T,
				"from-font",
				"auto",
				D,
				Le
			] }],
			"text-decoration-color": [{ decoration: w() }],
			"underline-offset": [{ "underline-offset": [
				T,
				"auto",
				D,
				E
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: x() }],
			"tab-size": [{ tab: [
				Ee,
				D,
				E
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				D,
				E
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				D,
				E
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: fe() }],
			"bg-repeat": [{ bg: pe() }],
			"bg-size": [{ bg: me() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						Ee,
						D,
						E
					],
					radial: [
						"",
						D,
						E
					],
					conic: [
						"",
						Ee,
						D,
						E
					]
				},
				Je,
				He
			] }],
			"bg-color": [{ bg: w() }],
			"gradient-from-pos": [{ from: he() }],
			"gradient-via-pos": [{ via: he() }],
			"gradient-to-pos": [{ to: he() }],
			"gradient-from": [{ from: w() }],
			"gradient-via": [{ via: w() }],
			"gradient-to": [{ to: w() }],
			rounded: [{ rounded: _e() }],
			"rounded-s": [{ "rounded-s": _e() }],
			"rounded-e": [{ "rounded-e": _e() }],
			"rounded-t": [{ "rounded-t": _e() }],
			"rounded-r": [{ "rounded-r": _e() }],
			"rounded-b": [{ "rounded-b": _e() }],
			"rounded-l": [{ "rounded-l": _e() }],
			"rounded-ss": [{ "rounded-ss": _e() }],
			"rounded-se": [{ "rounded-se": _e() }],
			"rounded-ee": [{ "rounded-ee": _e() }],
			"rounded-es": [{ "rounded-es": _e() }],
			"rounded-tl": [{ "rounded-tl": _e() }],
			"rounded-tr": [{ "rounded-tr": _e() }],
			"rounded-br": [{ "rounded-br": _e() }],
			"rounded-bl": [{ "rounded-bl": _e() }],
			"border-w": [{ border: ve() }],
			"border-w-x": [{ "border-x": ve() }],
			"border-w-y": [{ "border-y": ve() }],
			"border-w-s": [{ "border-s": ve() }],
			"border-w-e": [{ "border-e": ve() }],
			"border-w-bs": [{ "border-bs": ve() }],
			"border-w-be": [{ "border-be": ve() }],
			"border-w-t": [{ "border-t": ve() }],
			"border-w-r": [{ "border-r": ve() }],
			"border-w-b": [{ "border-b": ve() }],
			"border-w-l": [{ "border-l": ve() }],
			"divide-x": [{ "divide-x": ve() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": ve() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...ye(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...ye(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: w() }],
			"border-color-x": [{ "border-x": w() }],
			"border-color-y": [{ "border-y": w() }],
			"border-color-s": [{ "border-s": w() }],
			"border-color-e": [{ "border-e": w() }],
			"border-color-bs": [{ "border-bs": w() }],
			"border-color-be": [{ "border-be": w() }],
			"border-color-t": [{ "border-t": w() }],
			"border-color-r": [{ "border-r": w() }],
			"border-color-b": [{ "border-b": w() }],
			"border-color-l": [{ "border-l": w() }],
			"divide-color": [{ divide: w() }],
			"outline-style": [{ outline: [
				...ye(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				T,
				D,
				E
			] }],
			"outline-w": [{ outline: [
				"",
				T,
				We,
				Le
			] }],
			"outline-color": [{ outline: w() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				Ye,
				Ue
			] }],
			"shadow-color": [{ shadow: w() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Ye,
				Ue
			] }],
			"inset-shadow-color": [{ "inset-shadow": w() }],
			"ring-w": [{ ring: ve() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: w() }],
			"ring-offset-w": [{ "ring-offset": [T, Le] }],
			"ring-offset-color": [{ "ring-offset": w() }],
			"inset-ring-w": [{ "inset-ring": ve() }],
			"inset-ring-color": [{ "inset-ring": w() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Ye,
				Ue
			] }],
			"text-shadow-color": [{ "text-shadow": w() }],
			opacity: [{ opacity: [
				T,
				D,
				E
			] }],
			"mix-blend": [{ "mix-blend": [
				...be(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": be() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [T] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": xe() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": xe() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": w() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": w() }],
			"mask-image-t-from-pos": [{ "mask-t-from": xe() }],
			"mask-image-t-to-pos": [{ "mask-t-to": xe() }],
			"mask-image-t-from-color": [{ "mask-t-from": w() }],
			"mask-image-t-to-color": [{ "mask-t-to": w() }],
			"mask-image-r-from-pos": [{ "mask-r-from": xe() }],
			"mask-image-r-to-pos": [{ "mask-r-to": xe() }],
			"mask-image-r-from-color": [{ "mask-r-from": w() }],
			"mask-image-r-to-color": [{ "mask-r-to": w() }],
			"mask-image-b-from-pos": [{ "mask-b-from": xe() }],
			"mask-image-b-to-pos": [{ "mask-b-to": xe() }],
			"mask-image-b-from-color": [{ "mask-b-from": w() }],
			"mask-image-b-to-color": [{ "mask-b-to": w() }],
			"mask-image-l-from-pos": [{ "mask-l-from": xe() }],
			"mask-image-l-to-pos": [{ "mask-l-to": xe() }],
			"mask-image-l-from-color": [{ "mask-l-from": w() }],
			"mask-image-l-to-color": [{ "mask-l-to": w() }],
			"mask-image-x-from-pos": [{ "mask-x-from": xe() }],
			"mask-image-x-to-pos": [{ "mask-x-to": xe() }],
			"mask-image-x-from-color": [{ "mask-x-from": w() }],
			"mask-image-x-to-color": [{ "mask-x-to": w() }],
			"mask-image-y-from-pos": [{ "mask-y-from": xe() }],
			"mask-image-y-to-pos": [{ "mask-y-to": xe() }],
			"mask-image-y-from-color": [{ "mask-y-from": w() }],
			"mask-image-y-to-color": [{ "mask-y-to": w() }],
			"mask-image-radial": [{ "mask-radial": [D, E] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": xe() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": xe() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": w() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": w() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": ee() }],
			"mask-image-conic-pos": [{ "mask-conic": [T] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": xe() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": xe() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": w() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": w() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: fe() }],
			"mask-repeat": [{ mask: pe() }],
			"mask-size": [{ mask: me() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				D,
				E
			] }],
			filter: [{ filter: [
				"",
				"none",
				D,
				E
			] }],
			blur: [{ blur: Se() }],
			brightness: [{ brightness: [
				T,
				D,
				E
			] }],
			contrast: [{ contrast: [
				T,
				D,
				E
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				Ye,
				Ue
			] }],
			"drop-shadow-color": [{ "drop-shadow": w() }],
			grayscale: [{ grayscale: [
				"",
				T,
				D,
				E
			] }],
			"hue-rotate": [{ "hue-rotate": [
				T,
				D,
				E
			] }],
			invert: [{ invert: [
				"",
				T,
				D,
				E
			] }],
			saturate: [{ saturate: [
				T,
				D,
				E
			] }],
			sepia: [{ sepia: [
				"",
				T,
				D,
				E
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				D,
				E
			] }],
			"backdrop-blur": [{ "backdrop-blur": Se() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				T,
				D,
				E
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				T,
				D,
				E
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				T,
				D,
				E
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				T,
				D,
				E
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				T,
				D,
				E
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				T,
				D,
				E
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				T,
				D,
				E
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				T,
				D,
				E
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": x() }],
			"border-spacing-x": [{ "border-spacing-x": x() }],
			"border-spacing-y": [{ "border-spacing-y": x() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				D,
				E
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				T,
				"initial",
				D,
				E
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				D,
				E
			] }],
			delay: [{ delay: [
				T,
				D,
				E
			] }],
			animate: [{ animate: [
				"none",
				v,
				D,
				E
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				D,
				E
			] }],
			"perspective-origin": [{ "perspective-origin": b() }],
			rotate: [{ rotate: Ce() }],
			"rotate-x": [{ "rotate-x": Ce() }],
			"rotate-y": [{ "rotate-y": Ce() }],
			"rotate-z": [{ "rotate-z": Ce() }],
			scale: [{ scale: we() }],
			"scale-x": [{ "scale-x": we() }],
			"scale-y": [{ "scale-y": we() }],
			"scale-z": [{ "scale-z": we() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: Ae() }],
			"skew-x": [{ "skew-x": Ae() }],
			"skew-y": [{ "skew-y": Ae() }],
			transform: [{ transform: [
				D,
				E,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: b() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: je() }],
			"translate-x": [{ "translate-x": je() }],
			"translate-y": [{ "translate-y": je() }],
			"translate-z": [{ "translate-z": je() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Ee,
				D,
				E
			] }],
			accent: [{ accent: w() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: w() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				D,
				E
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": w() }],
			"scrollbar-track-color": [{ "scrollbar-track": w() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": x() }],
			"scroll-mx": [{ "scroll-mx": x() }],
			"scroll-my": [{ "scroll-my": x() }],
			"scroll-ms": [{ "scroll-ms": x() }],
			"scroll-me": [{ "scroll-me": x() }],
			"scroll-mbs": [{ "scroll-mbs": x() }],
			"scroll-mbe": [{ "scroll-mbe": x() }],
			"scroll-mt": [{ "scroll-mt": x() }],
			"scroll-mr": [{ "scroll-mr": x() }],
			"scroll-mb": [{ "scroll-mb": x() }],
			"scroll-ml": [{ "scroll-ml": x() }],
			"scroll-p": [{ "scroll-p": x() }],
			"scroll-px": [{ "scroll-px": x() }],
			"scroll-py": [{ "scroll-py": x() }],
			"scroll-ps": [{ "scroll-ps": x() }],
			"scroll-pe": [{ "scroll-pe": x() }],
			"scroll-pbs": [{ "scroll-pbs": x() }],
			"scroll-pbe": [{ "scroll-pbe": x() }],
			"scroll-pt": [{ "scroll-pt": x() }],
			"scroll-pr": [{ "scroll-pr": x() }],
			"scroll-pb": [{ "scroll-pb": x() }],
			"scroll-pl": [{ "scroll-pl": x() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				D,
				E
			] }],
			fill: [{ fill: ["none", ...w()] }],
			"stroke-w": [{ stroke: [
				T,
				We,
				Le,
				Re
			] }],
			stroke: [{ stroke: ["none", ...w()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": [
				"start",
				"end",
				"right",
				"left"
			],
			"inset-y": [
				"inset-bs",
				"inset-be",
				"top",
				"bottom"
			],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: [
				"ps",
				"pe",
				"pr",
				"pl"
			],
			py: [
				"pbs",
				"pbe",
				"pt",
				"pb"
			],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: [
				"ms",
				"me",
				"mr",
				"ml"
			],
			my: [
				"mbs",
				"mbe",
				"mt",
				"mb"
			],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": [
				"border-w-s",
				"border-w-e",
				"border-w-r",
				"border-w-l"
			],
			"border-w-y": [
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-b"
			],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": [
				"border-color-s",
				"border-color-e",
				"border-color-r",
				"border-color-l"
			],
			"border-color-y": [
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-b"
			],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": [
				"scroll-ms",
				"scroll-me",
				"scroll-mr",
				"scroll-ml"
			],
			"scroll-my": [
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mb"
			],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": [
				"scroll-ps",
				"scroll-pe",
				"scroll-pr",
				"scroll-pl"
			],
			"scroll-py": [
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pb"
			],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
}, ct = (e, { cacheSize: t, prefix: n, experimentalParseClassName: r, extend: i = {}, override: a = {} }) => (lt(e, "cacheSize", t), lt(e, "prefix", n), lt(e, "experimentalParseClassName", r), ut(e.theme, a.theme), ut(e.classGroups, a.classGroups), ut(e.conflictingClassGroups, a.conflictingClassGroups), ut(e.conflictingClassGroupModifiers, a.conflictingClassGroupModifiers), lt(e, "postfixLookupClassGroups", a.postfixLookupClassGroups), lt(e, "orderSensitiveModifiers", a.orderSensitiveModifiers), dt(e.theme, i.theme), dt(e.classGroups, i.classGroups), dt(e.conflictingClassGroups, i.conflictingClassGroups), dt(e.conflictingClassGroupModifiers, i.conflictingClassGroupModifiers), ft(e, i, "postfixLookupClassGroups"), ft(e, i, "orderSensitiveModifiers"), e), lt = (e, t, n) => {
	n !== void 0 && (e[t] = n);
}, ut = (e, t) => {
	if (t) for (let n in t) lt(e, n, t[n]);
}, dt = (e, t) => {
	if (t) for (let n in t) ft(e, t, n);
}, ft = (e, t, n) => {
	let r = t[n];
	r !== void 0 && (e[n] = e[n] ? e[n].concat(r) : r);
}, pt = (e, ...t) => typeof e == "function" ? me(st, e, ...t) : me(() => ct(st(), e), ...t), mt = /*#__PURE__*/ me(st), ht = /* @__PURE__ */ n(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), gt = /* @__PURE__ */ n(((e, t) => {
	t.exports = ht();
}));
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function _t(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = _t(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function vt() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = _t(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/unist-util-is/lib/index.js
var yt = (function(e) {
	if (e == null) return wt;
	if (typeof e == "function") return Ct(e);
	if (typeof e == "object") return Array.isArray(e) ? bt(e) : xt(e);
	if (typeof e == "string") return St(e);
	throw Error("Expected function, string, or object as test");
});
function bt(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t[n] = yt(e[n]);
	return Ct(r);
	function r(...e) {
		let n = -1;
		for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
		return !1;
	}
}
function xt(e) {
	let t = e;
	return Ct(n);
	function n(n) {
		let r = n, i;
		for (i in e) if (r[i] !== t[i]) return !1;
		return !0;
	}
}
function St(e) {
	return Ct(t);
	function t(t) {
		return t && t.type === e;
	}
}
function Ct(e) {
	return t;
	function t(t, n, r) {
		return !!(Tt(t) && e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
	}
}
function wt() {
	return !0;
}
function Tt(e) {
	return typeof e == "object" && !!e && "type" in e;
}
//#endregion
//#region node_modules/unist-util-visit-parents/lib/color.js
function Et(e) {
	return e;
}
//#endregion
//#region node_modules/unist-util-visit-parents/lib/index.js
var Dt = [], Ot = "skip";
function kt(e, t, n, r) {
	let i;
	typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
	let a = yt(i), o = r ? -1 : 1;
	s(e, void 0, [])();
	function s(e, i, c) {
		let l = e && typeof e == "object" ? e : {};
		if (typeof l.type == "string") {
			let t = typeof l.tagName == "string" ? l.tagName : typeof l.name == "string" ? l.name : void 0;
			Object.defineProperty(u, "name", { value: "node (" + Et(e.type + (t ? "<" + t + ">" : "")) + ")" });
		}
		return u;
		function u() {
			let l = Dt, u, d, f;
			if ((!t || a(e, i, c[c.length - 1] || void 0)) && (l = At(n(e, c)), l[0] === !1)) return l;
			if ("children" in e && e.children) {
				let t = e;
				if (t.children && l[0] !== "skip") for (d = (r ? t.children.length : -1) + o, f = c.concat(t); d > -1 && d < t.children.length;) {
					let e = t.children[d];
					if (u = s(e, d, f)(), u[0] === !1) return u;
					d = typeof u[1] == "number" ? u[1] : d + o;
				}
			}
			return l;
		}
	}
}
function At(e) {
	return Array.isArray(e) ? e : typeof e == "number" ? [!0, e] : e == null ? Dt : [e];
}
//#endregion
//#region node_modules/rehype-harden/node_modules/unist-util-visit/lib/index.js
function jt(e, t, n, r) {
	let i, a, o;
	typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), kt(e, a, s, i);
	function s(e, t) {
		let n = t[t.length - 1], r = n ? n.children.indexOf(e) : void 0;
		return o(e, r, n);
	}
}
//#endregion
//#region node_modules/rehype-harden/dist/index.js
var Mt = {
	indicator: "indicator",
	textOnly: "text-only",
	remove: "remove"
};
function Nt({ defaultOrigin: e = "", allowedLinkPrefixes: t = [], allowedImagePrefixes: n = [], allowDataImages: r = !1, allowedProtocols: i = [], blockedImageClass: a = "inline-block bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded text-sm", blockedLinkClass: o = "text-gray-500", linkBlockPolicy: s = Mt.indicator, imageBlockPolicy: c = Mt.indicator }) {
	let l = t.length && !t.every((e) => e === "*"), u = n.length && !n.every((e) => e === "*");
	if (!e && (l || u)) throw Error("defaultOrigin is required when allowedLinkPrefixes or allowedImagePrefixes are provided");
	return (l) => {
		let u = Ut(e, t, n, r, i, a, o, s, c);
		zt(l), jt(l, u);
	};
}
function Pt(e, t) {
	if (typeof e != "string") return null;
	try {
		return new URL(e);
	} catch {
		if (t) try {
			return new URL(e, t);
		} catch {
			return null;
		}
		if (e.startsWith("/") || e.startsWith("./") || e.startsWith("../")) try {
			return new URL(e, "http://example.com");
		} catch {
			return null;
		}
		return null;
	}
}
function Ft(e) {
	return typeof e == "string" ? e.startsWith("/") || e.startsWith("./") || e.startsWith("../") : !1;
}
var It = /* @__PURE__ */ new Set([
	"https:",
	"http:",
	"irc:",
	"ircs:",
	"mailto:",
	"xmpp:",
	"blob:"
]), Lt = /* @__PURE__ */ new Set([
	"javascript:",
	"data:",
	"file:",
	"vbscript:"
]);
function Rt(e, t, n, r = !1, i = !1, a = []) {
	if (!e) return null;
	if (typeof e == "string" && e.startsWith("#") && !i) try {
		if (new URL(e, "http://example.com").hash === e) return e;
	} catch {}
	if (typeof e == "string" && e.startsWith("data:")) return i && r && e.startsWith("data:image/") ? e : null;
	if (typeof e == "string" && e.startsWith("blob:")) {
		try {
			if (new URL(e).protocol === "blob:" && e.length > 5) {
				let t = e.substring(5);
				if (t && t.length > 0 && t !== "invalid") return e;
			}
		} catch {
			return null;
		}
		return null;
	}
	let o = Pt(e, n);
	if (!o || Lt.has(o.protocol) || !(It.has(o.protocol) || a.includes(o.protocol) || a.includes("*"))) return null;
	if (o.protocol === "mailto:" || !o.protocol.match(/^https?:$/)) return o.href;
	let s = Ft(e);
	return o && t.some((e) => {
		let t = Pt(e, n);
		return !t || t.origin !== o.origin ? !1 : o.href.startsWith(t.href);
	}) ? s ? o.pathname + o.search + o.hash : o.href : t.includes("*") ? o.protocol !== "https:" && o.protocol !== "http:" ? null : s ? o.pathname + o.search + o.hash : o.href : null;
}
function zt(e) {
	if ("children" in e && Array.isArray(e.children)) {
		e.children = e.children.filter((e) => e != null);
		for (let t of e.children) zt(t);
	}
}
var Bt = Symbol("node-seen");
function Vt(e, t, n) {
	return t === Mt.remove ? { type: "remove" } : t === Mt.textOnly ? {
		type: "replace",
		element: {
			type: "element",
			tagName: "span",
			properties: {},
			children: [...e.children]
		}
	} : {
		type: "replace",
		element: {
			type: "element",
			tagName: "span",
			properties: {
				title: "Blocked URL: " + String(e.properties.href),
				class: n
			},
			children: [...e.children, {
				type: "text",
				value: " [blocked]"
			}]
		}
	};
}
function Ht(e, t, n) {
	if (t === Mt.remove) return { type: "remove" };
	if (t === Mt.textOnly) {
		let t = String(e.properties.alt || "");
		return t ? {
			type: "replace",
			element: {
				type: "element",
				tagName: "span",
				properties: {},
				children: [{
					type: "text",
					value: t
				}]
			}
		} : { type: "remove" };
	}
	return {
		type: "replace",
		element: {
			type: "element",
			tagName: "span",
			properties: { class: n },
			children: [{
				type: "text",
				value: "[Image blocked: " + String(e.properties.alt || "No description") + "]"
			}]
		}
	};
}
var Ut = (e, t, n, r, i, a, o, s, c) => {
	let l = (u, d, f) => {
		if (u.type !== "element" || u[Bt]) return !0;
		if (u.tagName === "a") {
			let n = Rt(u.properties.href, t, e, !1, !1, i);
			if (n === null) {
				if (u[Bt] = !0, jt(u, l), f && typeof d == "number") {
					let e = Vt(u, s, o);
					if (e.type === "remove") return f.children.splice(d, 1), [Ot, d];
					f.children[d] = e.element;
				}
				return Ot;
			}
			return u.properties.href = n, u.properties.target = "_blank", u.properties.rel = "noopener noreferrer", !0;
		}
		if (u.tagName === "img") {
			let t = Rt(u.properties.src, n, e, r, !0, i);
			if (t === null) {
				if (u[Bt] = !0, jt(u, l), f && typeof d == "number") {
					let e = Ht(u, c, a);
					if (e.type === "remove") return f.children.splice(d, 1), [Ot, d];
					f.children[d] = e.element;
				}
				return Ot;
			}
			return u.properties.src = t, !0;
		}
		return !0;
	};
	return l;
}, Wt = class {
	constructor(e, t, n) {
		this.normal = t, this.property = e, n && (this.space = n);
	}
};
Wt.prototype.normal = {}, Wt.prototype.property = {}, Wt.prototype.space = void 0;
//#endregion
//#region node_modules/hastscript/node_modules/property-information/lib/util/merge.js
function Gt(e, t) {
	let n = {}, r = {};
	for (let t of e) Object.assign(n, t.property), Object.assign(r, t.normal);
	return new Wt(n, r, t);
}
//#endregion
//#region node_modules/hastscript/node_modules/property-information/lib/normalize.js
function Kt(e) {
	return e.toLowerCase();
}
//#endregion
//#region node_modules/hastscript/node_modules/property-information/lib/util/info.js
var qt = class {
	constructor(e, t) {
		this.attribute = t, this.property = e;
	}
};
qt.prototype.attribute = "", qt.prototype.booleanish = !1, qt.prototype.boolean = !1, qt.prototype.commaOrSpaceSeparated = !1, qt.prototype.commaSeparated = !1, qt.prototype.defined = !1, qt.prototype.mustUseProperty = !1, qt.prototype.number = !1, qt.prototype.overloadedBoolean = !1, qt.prototype.property = "", qt.prototype.spaceSeparated = !1, qt.prototype.space = void 0;
//#endregion
//#region node_modules/hastscript/node_modules/property-information/lib/util/types.js
var Jt = /* @__PURE__ */ t({
	boolean: () => O,
	booleanish: () => Xt,
	commaOrSpaceSeparated: () => en,
	commaSeparated: () => $t,
	number: () => k,
	overloadedBoolean: () => Zt,
	spaceSeparated: () => Qt
}), Yt = 0, O = tn(), Xt = tn(), Zt = tn(), k = tn(), Qt = tn(), $t = tn(), en = tn();
function tn() {
	return 2 ** ++Yt;
}
//#endregion
//#region node_modules/hastscript/node_modules/property-information/lib/util/defined-info.js
var nn = Object.keys(Jt), rn = class extends qt {
	constructor(e, t, n, r) {
		let i = -1;
		if (super(e, t), an(this, "space", r), typeof n == "number") for (; ++i < nn.length;) {
			let e = nn[i];
			an(this, nn[i], (n & Jt[e]) === Jt[e]);
		}
	}
};
rn.prototype.defined = !0;
function an(e, t, n) {
	n && (e[t] = n);
}
//#endregion
//#region node_modules/hastscript/node_modules/property-information/lib/util/create.js
function on(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e.properties)) {
		let a = new rn(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Kt(r)] = r, n[Kt(a.attribute)] = r;
	}
	return new Wt(t, n, e.space);
}
//#endregion
//#region node_modules/hastscript/node_modules/property-information/lib/aria.js
var sn = on({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: Xt,
		ariaAutoComplete: null,
		ariaBusy: Xt,
		ariaChecked: Xt,
		ariaColCount: k,
		ariaColIndex: k,
		ariaColSpan: k,
		ariaControls: Qt,
		ariaCurrent: null,
		ariaDescribedBy: Qt,
		ariaDetails: null,
		ariaDisabled: Xt,
		ariaDropEffect: Qt,
		ariaErrorMessage: null,
		ariaExpanded: Xt,
		ariaFlowTo: Qt,
		ariaGrabbed: Xt,
		ariaHasPopup: null,
		ariaHidden: Xt,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: Qt,
		ariaLevel: k,
		ariaLive: null,
		ariaModal: Xt,
		ariaMultiLine: Xt,
		ariaMultiSelectable: Xt,
		ariaOrientation: null,
		ariaOwns: Qt,
		ariaPlaceholder: null,
		ariaPosInSet: k,
		ariaPressed: Xt,
		ariaReadOnly: Xt,
		ariaRelevant: null,
		ariaRequired: Xt,
		ariaRoleDescription: Qt,
		ariaRowCount: k,
		ariaRowIndex: k,
		ariaRowSpan: k,
		ariaSelected: Xt,
		ariaSetSize: k,
		ariaSort: null,
		ariaValueMax: k,
		ariaValueMin: k,
		ariaValueNow: k,
		ariaValueText: null,
		role: null
	},
	transform(e, t) {
		return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
	}
});
//#endregion
//#region node_modules/hastscript/node_modules/property-information/lib/util/case-sensitive-transform.js
function cn(e, t) {
	return t in e ? e[t] : t;
}
//#endregion
//#region node_modules/hastscript/node_modules/property-information/lib/util/case-insensitive-transform.js
function ln(e, t) {
	return cn(e, t.toLowerCase());
}
//#endregion
//#region node_modules/hastscript/node_modules/property-information/lib/html.js
var un = on({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: $t,
		acceptCharset: Qt,
		accessKey: Qt,
		action: null,
		allow: null,
		allowFullScreen: O,
		allowPaymentRequest: O,
		allowUserMedia: O,
		alpha: O,
		alt: null,
		as: null,
		async: O,
		autoCapitalize: null,
		autoComplete: Qt,
		autoFocus: O,
		autoPlay: O,
		blocking: Qt,
		capture: null,
		charSet: null,
		checked: O,
		cite: null,
		className: Qt,
		closedBy: null,
		colorSpace: null,
		cols: k,
		colSpan: k,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: Xt,
		controls: O,
		controlsList: Qt,
		coords: k | $t,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: O,
		defer: O,
		dir: null,
		dirName: null,
		disabled: O,
		download: Zt,
		draggable: Xt,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: O,
		formTarget: null,
		headers: Qt,
		height: k,
		hidden: Zt,
		high: k,
		href: null,
		hrefLang: null,
		htmlFor: Qt,
		httpEquiv: Qt,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: O,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: O,
		itemId: null,
		itemProp: Qt,
		itemRef: Qt,
		itemScope: O,
		itemType: Qt,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: O,
		low: k,
		manifest: null,
		max: null,
		maxLength: k,
		media: null,
		method: null,
		min: null,
		minLength: k,
		multiple: O,
		muted: O,
		name: null,
		nonce: null,
		noModule: O,
		noValidate: O,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: O,
		optimum: k,
		pattern: null,
		ping: Qt,
		placeholder: null,
		playsInline: O,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: O,
		referrerPolicy: null,
		rel: Qt,
		required: O,
		reversed: O,
		rows: k,
		rowSpan: k,
		sandbox: Qt,
		scope: null,
		scoped: O,
		seamless: O,
		selected: O,
		shadowRootClonable: O,
		shadowRootCustomElementRegistry: O,
		shadowRootDelegatesFocus: O,
		shadowRootMode: null,
		shadowRootSerializable: O,
		shape: null,
		size: k,
		sizes: null,
		slot: null,
		span: k,
		spellCheck: Xt,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: k,
		step: null,
		style: null,
		tabIndex: k,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: O,
		useMap: null,
		value: Xt,
		width: k,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: Qt,
		axis: null,
		background: null,
		bgColor: null,
		border: k,
		borderColor: null,
		bottomMargin: k,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: O,
		declare: O,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: k,
		leftMargin: k,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: k,
		marginWidth: k,
		noResize: O,
		noHref: O,
		noShade: O,
		noWrap: O,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: k,
		rules: null,
		scheme: null,
		scrolling: Xt,
		standby: null,
		summary: null,
		text: null,
		topMargin: k,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: k,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: O,
		disablePictureInPicture: O,
		disableRemotePlayback: O,
		exportParts: $t,
		part: Qt,
		prefix: null,
		property: null,
		results: k,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: ln
}), dn = on({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		maskType: "mask-type",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: en,
		accentHeight: k,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: k,
		amplitude: k,
		arabicForm: null,
		ascent: k,
		attributeName: null,
		attributeType: null,
		azimuth: k,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: k,
		by: null,
		calcMode: null,
		capHeight: k,
		className: Qt,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: k,
		diffuseConstant: k,
		direction: null,
		display: null,
		dur: null,
		divisor: k,
		dominantBaseline: null,
		download: O,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: k,
		enableBackground: null,
		end: null,
		event: null,
		exponent: k,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: k,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: $t,
		g2: $t,
		glyphName: $t,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: k,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: k,
		horizOriginX: k,
		horizOriginY: k,
		id: null,
		ideographic: k,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: k,
		k,
		k1: k,
		k2: k,
		k3: k,
		k4: k,
		kernelMatrix: en,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: k,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskType: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: k,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: k,
		overlineThickness: k,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: k,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: Qt,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: k,
		pointsAtY: k,
		pointsAtZ: k,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: en,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: en,
		rev: en,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: en,
		requiredFeatures: en,
		requiredFonts: en,
		requiredFormats: en,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: k,
		specularExponent: k,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: k,
		strikethroughThickness: k,
		string: null,
		stroke: null,
		strokeDashArray: en,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: k,
		strokeOpacity: k,
		strokeWidth: null,
		style: null,
		surfaceScale: k,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: en,
		tabIndex: k,
		tableValues: null,
		target: null,
		targetX: k,
		targetY: k,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: en,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: k,
		underlineThickness: k,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: k,
		values: null,
		vAlphabetic: k,
		vMathematical: k,
		vectorEffect: null,
		vHanging: k,
		vIdeographic: k,
		version: null,
		vertAdvY: k,
		vertOriginX: k,
		vertOriginY: k,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: k,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: cn
}), fn = on({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(e, t) {
		return "xlink:" + t.slice(5).toLowerCase();
	}
}), pn = on({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: ln
}), mn = on({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(e, t) {
		return "xml:" + t.slice(3).toLowerCase();
	}
}), hn = /[A-Z]/g, gn = /-[a-z]/g, _n = /^data[-\w.:]+$/i;
function vn(e, t) {
	let n = Kt(t), r = t, i = qt;
	if (n in e.normal) return e.property[e.normal[n]];
	if (n.length > 4 && n.slice(0, 4) === "data" && _n.test(t)) {
		if (t.charAt(4) === "-") {
			let e = t.slice(5).replace(gn, bn);
			r = "data" + e.charAt(0).toUpperCase() + e.slice(1);
		} else {
			let e = t.slice(4);
			if (!gn.test(e)) {
				let n = e.replace(hn, yn);
				n.charAt(0) !== "-" && (n = "-" + n), t = "data" + n;
			}
		}
		i = rn;
	}
	return new i(r, t);
}
function yn(e) {
	return "-" + e.toLowerCase();
}
function bn(e) {
	return e.charAt(1).toUpperCase();
}
//#endregion
//#region node_modules/hastscript/node_modules/property-information/index.js
var xn = Gt([
	sn,
	un,
	fn,
	pn,
	mn
], "html"), Sn = Gt([
	sn,
	dn,
	fn,
	pn,
	mn
], "svg");
//#endregion
//#region node_modules/comma-separated-tokens/index.js
function Cn(e) {
	let t = [], n = String(e || ""), r = n.indexOf(","), i = 0, a = !1;
	for (; !a;) {
		r === -1 && (r = n.length, a = !0);
		let e = n.slice(i, r).trim();
		(e || !a) && t.push(e), i = r + 1, r = n.indexOf(",", i);
	}
	return t;
}
function wn(e, t) {
	let n = t || {};
	return (e[e.length - 1] === "" ? [...e, ""] : e).join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")).trim();
}
//#endregion
//#region node_modules/hast-util-parse-selector/lib/index.js
var Tn = /[#.]/g;
function En(e, t) {
	let n = e || "", r = {}, i = 0, a, o;
	for (; i < n.length;) {
		Tn.lastIndex = i;
		let e = Tn.exec(n), t = n.slice(i, e ? e.index : n.length);
		t && (a ? a === "#" ? r.id = t : Array.isArray(r.className) ? r.className.push(t) : r.className = [t] : o = t, i += t.length), e && (a = e[0], i++);
	}
	return {
		type: "element",
		tagName: o || t || "div",
		properties: r,
		children: []
	};
}
//#endregion
//#region node_modules/space-separated-tokens/index.js
function Dn(e) {
	let t = String(e || "").trim();
	return t ? t.split(/[ \t\n\r\f]+/g) : [];
}
function On(e) {
	return e.join(" ").trim();
}
//#endregion
//#region node_modules/hastscript/lib/create-h.js
function kn(e, t, n) {
	let r = n ? Fn(n) : void 0;
	function i(n, i, ...a) {
		let o;
		if (n == null) {
			o = {
				type: "root",
				children: []
			};
			let e = i;
			a.unshift(e);
		} else {
			o = En(n, t);
			let s = o.tagName.toLowerCase(), c = r ? r.get(s) : void 0;
			if (o.tagName = c || s, An(i)) a.unshift(i);
			else for (let [t, n] of Object.entries(i)) jn(e, o.properties, t, n);
		}
		for (let e of a) Mn(o.children, e);
		return o.type === "element" && o.tagName === "template" && (o.content = {
			type: "root",
			children: o.children
		}, o.children = []), o;
	}
	return i;
}
function An(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !0;
	if (typeof e.type != "string") return !1;
	let t = e, n = Object.keys(e);
	for (let e of n) {
		let n = t[e];
		if (n && typeof n == "object") {
			if (!Array.isArray(n)) return !0;
			let e = n;
			for (let t of e) if (typeof t != "number" && typeof t != "string") return !0;
		}
	}
	return !!("children" in e && Array.isArray(e.children));
}
function jn(e, t, n, r) {
	let i = vn(e, n), a;
	if (r != null) {
		if (typeof r == "number") {
			if (Number.isNaN(r)) return;
			a = r;
		} else a = typeof r == "boolean" ? r : typeof r == "string" ? i.spaceSeparated ? Dn(r) : i.commaSeparated ? Cn(r) : i.commaOrSpaceSeparated ? Dn(Cn(r).join(" ")) : Nn(i, i.property, r) : Array.isArray(r) ? [...r] : i.property === "style" ? Pn(r) : String(r);
		if (Array.isArray(a)) {
			let e = [];
			for (let t of a) e.push(Nn(i, i.property, t));
			a = e;
		}
		i.property === "className" && Array.isArray(t.className) && (a = t.className.concat(a)), t[i.property] = a;
	}
}
function Mn(e, t) {
	if (t != null) {
		if (typeof t == "number" || typeof t == "string") e.push({
			type: "text",
			value: String(t)
		});
		else if (Array.isArray(t)) for (let n of t) Mn(e, n);
		else if (typeof t == "object" && "type" in t) t.type === "root" ? Mn(e, t.children) : e.push(t);
		else throw Error("Expected node, nodes, or string, got `" + t + "`");
	}
}
function Nn(e, t, n) {
	if (typeof n == "string") {
		if (e.number && n && !Number.isNaN(Number(n))) return Number(n);
		if ((e.boolean || e.overloadedBoolean) && (n === "" || Kt(n) === Kt(t))) return !0;
	}
	return n;
}
function Pn(e) {
	let t = [];
	for (let [n, r] of Object.entries(e)) t.push([n, r].join(": "));
	return t.join("; ");
}
function Fn(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) t.set(n.toLowerCase(), n);
	return t;
}
//#endregion
//#region node_modules/hastscript/lib/svg-case-sensitive-tag-names.js
var In = /* @__PURE__ */ "altGlyph.altGlyphDef.altGlyphItem.animateColor.animateMotion.animateTransform.clipPath.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.foreignObject.glyphRef.linearGradient.radialGradient.solidColor.textArea.textPath".split("."), Ln = kn(xn, "div"), Rn = kn(Sn, "g", In), zn = {
	html: "http://www.w3.org/1999/xhtml",
	mathml: "http://www.w3.org/1998/Math/MathML",
	svg: "http://www.w3.org/2000/svg",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
//#endregion
//#region node_modules/hast-util-from-dom/lib/index.js
function Bn(e, t) {
	return Vn(e, t || {}) || {
		type: "root",
		children: []
	};
}
function Vn(e, t) {
	let n = Hn(e, t);
	return n && t.afterTransform && t.afterTransform(e, n), n;
}
function Hn(e, t) {
	switch (e.nodeType) {
		case 1: return qn(e, t);
		case 3: return Gn(e);
		case 8: return Kn(e);
		case 9: return Un(e, t);
		case 10: return Wn();
		case 11: return Un(e, t);
		default: return;
	}
}
function Un(e, t) {
	return {
		type: "root",
		children: Jn(e, t)
	};
}
function Wn() {
	return { type: "doctype" };
}
function Gn(e) {
	return {
		type: "text",
		value: e.nodeValue || ""
	};
}
function Kn(e) {
	return {
		type: "comment",
		value: e.nodeValue || ""
	};
}
function qn(e, t) {
	let n = e.namespaceURI, r = n === zn.svg ? Rn : Ln, i = n === zn.html ? e.tagName.toLowerCase() : e.tagName, a = n === zn.html && i === "template" ? e.content : e, o = e.getAttributeNames(), s = {}, c = -1;
	for (; ++c < o.length;) s[o[c]] = e.getAttribute(o[c]) || "";
	return r(i, s, Jn(a, t));
}
function Jn(e, t) {
	let n = e.childNodes, r = [], i = -1;
	for (; ++i < n.length;) {
		let e = Vn(n[i], t);
		e !== void 0 && r.push(e);
	}
	return r;
}
//#endregion
//#region node_modules/hast-util-from-html-isomorphic/lib/browser.js
var Yn = new DOMParser();
function Xn(e, t) {
	return Bn(t?.fragment ? Zn(e) : Yn.parseFromString(e, "text/html"));
}
function Zn(e) {
	let t = document.createElement("template");
	return t.innerHTML = e, t.content;
}
//#endregion
//#region node_modules/unist-util-find-after/lib/index.js
var Qn = (function(e, t, n) {
	let r = yt(n);
	if (!e || !e.type || !e.children) throw Error("Expected parent node");
	if (typeof t == "number") {
		if (t < 0 || t === Infinity) throw Error("Expected positive finite number as index");
	} else if (t = e.children.indexOf(t), t < 0) throw Error("Expected child node or index");
	for (; ++t < e.children.length;) if (r(e.children[t], t, e)) return e.children[t];
}), $n = (function(e) {
	if (e == null) return rr;
	if (typeof e == "string") return tr(e);
	if (typeof e == "object") return er(e);
	if (typeof e == "function") return nr(e);
	throw Error("Expected function, string, or array as `test`");
});
function er(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t[n] = $n(e[n]);
	return nr(r);
	function r(...e) {
		let n = -1;
		for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
		return !1;
	}
}
function tr(e) {
	return nr(t);
	function t(t) {
		return t.tagName === e;
	}
}
function nr(e) {
	return t;
	function t(t, n, r) {
		return !!(ir(t) && e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
	}
}
function rr(e) {
	return !!(e && typeof e == "object" && "type" in e && e.type === "element" && "tagName" in e && typeof e.tagName == "string");
}
function ir(e) {
	return typeof e == "object" && !!e && "type" in e && "tagName" in e;
}
//#endregion
//#region node_modules/hast-util-to-text/lib/index.js
var ar = /\n/g, or = /[\t ]+/g, sr = $n("br"), cr = $n(xr), lr = $n("p"), ur = $n("tr"), dr = $n([
	"datalist",
	"head",
	"noembed",
	"noframes",
	"noscript",
	"rp",
	"script",
	"style",
	"template",
	"title",
	br,
	Sr
]), fr = $n(/* @__PURE__ */ "address.article.aside.blockquote.body.caption.center.dd.dialog.dir.dl.dt.div.figure.figcaption.footer.form,.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.legend.li.listing.main.menu.nav.ol.p.plaintext.pre.section.ul.xmp".split("."));
function pr(e, t) {
	let n = t || {}, r = "children" in e ? e.children : [], i = fr(e), a = yr(e, {
		whitespace: n.whitespace || "normal",
		breakBefore: !1,
		breakAfter: !1
	}), o = [];
	(e.type === "text" || e.type === "comment") && o.push(...gr(e, {
		whitespace: a,
		breakBefore: !0,
		breakAfter: !0
	}));
	let s = -1;
	for (; ++s < r.length;) o.push(...mr(r[s], e, {
		whitespace: a,
		breakBefore: s ? void 0 : i,
		breakAfter: s < r.length - 1 ? sr(r[s + 1]) : i
	}));
	let c = [], l;
	for (s = -1; ++s < o.length;) {
		let e = o[s];
		typeof e == "number" ? l !== void 0 && e > l && (l = e) : e && (l !== void 0 && l > -1 && c.push("\n".repeat(l) || " "), l = -1, c.push(e));
	}
	return c.join("");
}
function mr(e, t, n) {
	return e.type === "element" ? hr(e, t, n) : e.type === "text" ? n.whitespace === "normal" ? gr(e, n) : _r(e) : [];
}
function hr(e, t, n) {
	let r = yr(e, n), i = e.children || [], a = -1, o = [];
	if (dr(e)) return o;
	let s, c;
	for (sr(e) || ur(e) && Qn(t, e, ur) ? c = "\n" : lr(e) ? (s = 2, c = 2) : fr(e) && (s = 1, c = 1); ++a < i.length;) o = o.concat(mr(i[a], e, {
		whitespace: r,
		breakBefore: a ? void 0 : s,
		breakAfter: a < i.length - 1 ? sr(i[a + 1]) : c
	}));
	return cr(e) && Qn(t, e, cr) && o.push("	"), s && o.unshift(s), c && o.push(c), o;
}
function gr(e, t) {
	let n = String(e.value), r = [], i = [], a = 0;
	for (; a <= n.length;) {
		ar.lastIndex = a;
		let e = ar.exec(n), i = e && "index" in e ? e.index : n.length;
		r.push(vr(n.slice(a, i).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, ""), a !== 0 || t.breakBefore, i !== n.length || t.breakAfter)), a = i + 1;
	}
	let o = -1, s;
	for (; ++o < r.length;) r[o].charCodeAt(r[o].length - 1) === 8203 || o < r.length - 1 && r[o + 1].charCodeAt(0) === 8203 ? (i.push(r[o]), s = void 0) : r[o] ? (typeof s == "number" && i.push(s), i.push(r[o]), s = 0) : (o === 0 || o === r.length - 1) && i.push(0);
	return i;
}
function _r(e) {
	return [String(e.value)];
}
function vr(e, t, n) {
	let r = [], i = 0, a;
	for (; i < e.length;) {
		or.lastIndex = i;
		let n = or.exec(e);
		a = n ? n.index : e.length, !i && !a && n && !t && r.push(""), i !== a && r.push(e.slice(i, a)), i = n ? a + n[0].length : a;
	}
	return i !== a && !n && r.push(""), r.join(" ");
}
function yr(e, t) {
	if (e.type === "element") {
		let n = e.properties || {};
		switch (e.tagName) {
			case "listing":
			case "plaintext":
			case "xmp": return "pre";
			case "nobr": return "nowrap";
			case "pre": return n.wrap ? "pre-wrap" : "pre";
			case "td":
			case "th": return n.noWrap ? "nowrap" : t.whitespace;
			case "textarea": return "pre-wrap";
		}
	}
	return t.whitespace;
}
function br(e) {
	return !!(e.properties || {}).hidden;
}
function xr(e) {
	return e.tagName === "td" || e.tagName === "th";
}
function Sr(e) {
	return e.tagName === "dialog" && !(e.properties || {}).open;
}
//#endregion
//#region node_modules/rehype-katex/lib/index.js
var Cr = {}, wr = [];
function Tr(e) {
	let t = e || Cr;
	return function(e, n) {
		kt(e, "element", function(e, r) {
			let a = Array.isArray(e.properties.className) ? e.properties.className : wr, o = a.includes("language-math"), s = a.includes("math-display"), c = a.includes("math-inline"), l = s;
			if (!o && !s && !c) return;
			let u = r[r.length - 1], d = e;
			/* c8 ignore next -- verbose to test. */
			if (e.tagName === "code" && o && u && u.type === "element" && u.tagName === "pre" && (d = u, u = r[r.length - 2], l = !0), !u) return;
			let f = pr(d, { whitespace: "pre" }), p;
			try {
				p = i.renderToString(f, {
					...t,
					displayMode: l,
					throwOnError: !0
				});
			} catch (a) {
				let o = a, s = o.name.toLowerCase();
				n.message("Could not render math with KaTeX", {
					ancestors: [...r, e],
					cause: o,
					place: e.position,
					ruleId: s,
					source: "rehype-katex"
				});
				try {
					p = i.renderToString(f, {
						...t,
						displayMode: l,
						strict: "ignore",
						throwOnError: !1
					});
				} catch {
					p = [{
						type: "element",
						tagName: "span",
						properties: {
							className: ["katex-error"],
							style: "color:" + (t.errorColor || "#cc0000"),
							title: String(a)
						},
						children: [{
							type: "text",
							value: f
						}]
					}];
				}
			}
			typeof p == "string" && (p = Xn(p, { fragment: !0 }).children);
			let m = u.children.indexOf(d);
			return u.children.splice(m, 1, ...p), Ot;
		});
	};
}
//#endregion
//#region node_modules/@ungap/structured-clone/esm/deserialize.js
var { defineProperty: Er } = Object, Dr = typeof self == "object" ? self : globalThis, Or = (e, t) => {
	switch (e) {
		case "Function":
		case "SharedWorker":
		case "Worker":
		case "eval":
		case "setInterval":
		case "setTimeout": throw TypeError("unable to deserialize " + e);
	}
	return new Dr[e](t);
}, kr = (e, t) => {
	let n = (t, n) => (e.set(n, t), t), r = (i) => {
		if (e.has(i)) return e.get(i);
		let [a, o] = t[i];
		switch (a) {
			case 0:
			case -1: return n(o, i);
			case 1: {
				let e = n([], i);
				for (let t of o) e.push(r(t));
				return e;
			}
			case 2: {
				let e = n({}, i);
				for (let [t, n] of o) {
					let i = r(t), a = r(n);
					i === "__proto__" ? Er(e, i, {
						value: a,
						configurable: !0,
						enumerable: !0,
						writable: !0
					}) : e[i] = a;
				}
				return e;
			}
			case 3: return n(new Date(o), i);
			case 4: {
				let { source: e, flags: t } = o;
				return n(new RegExp(e, t), i);
			}
			case 5: {
				let e = n(/* @__PURE__ */ new Map(), i);
				for (let [t, n] of o) e.set(r(t), r(n));
				return e;
			}
			case 6: {
				let e = n(/* @__PURE__ */ new Set(), i);
				for (let t of o) e.add(r(t));
				return e;
			}
			case 7: {
				let { name: e, message: t } = o;
				return n(typeof Dr[e] == "function" ? Or(e, t) : Error(t), i);
			}
			case 8: return n(BigInt(o), i);
			case "BigInt": return n(Object(BigInt(o)), i);
			case "ArrayBuffer": return n(new Uint8Array(o).buffer, o);
			case "DataView": {
				let { buffer: e } = new Uint8Array(o);
				return n(new DataView(e), o);
			}
			case "-0": return -0;
		}
		return n(Or(a, o), i);
	};
	return r;
}, Ar = (e) => kr(/* @__PURE__ */ new Map(), e)(0), jr = "", { toString: Mr } = {}, { keys: Nr, is: Pr } = Object, Fr = (e) => {
	let t = typeof e;
	if (t !== "object" || !e) return [0, t];
	let n = Mr.call(e).slice(8, -1);
	switch (n) {
		case "Array": return [1, jr];
		case "Object": return [2, jr];
		case "Date": return [3, jr];
		case "RegExp": return [4, jr];
		case "Map": return [5, jr];
		case "Set": return [6, jr];
		case "DataView": return [1, n];
	}
	return n.includes("Array") ? [1, n] : e instanceof Error ? [7, e.name || "Error"] : [2, n];
}, Ir = ([e, t]) => e === 0 && (t === "function" || t === "symbol"), Lr = (e, t, n, r) => {
	let i = (e, t) => {
		let i = r.push(e) - 1;
		return n.set(t, i), i;
	}, a = (o) => {
		if (n.has(o)) return n.get(o);
		let [s, c] = Fr(o);
		switch (s) {
			case 0: {
				let t = o;
				switch (c) {
					case "bigint":
						s = 8, t = o.toString();
						break;
					case "number":
						if (!o && Pr(o, -0)) return r.push(["-0"]) - 1;
						break;
					case "function":
					case "symbol":
						if (e) throw TypeError("unable to serialize " + c);
						t = null;
						break;
					case "undefined": return i([-1], o);
				}
				return i([s, t], o);
			}
			case 1: {
				if (c) {
					let e = o;
					return c === "DataView" ? e = new Uint8Array(o.buffer) : c === "ArrayBuffer" && (e = new Uint8Array(o)), i([c, [...e]], o);
				}
				let e = [], t = i([s, e], o);
				for (let t of o) e.push(a(t));
				return t;
			}
			case 2: {
				if (c) switch (c) {
					case "BigInt": return i([c, o.toString()], o);
					case "Boolean":
					case "Number":
					case "String": return i([c, o.valueOf()], o);
				}
				if (t && "toJSON" in o) return a(o.toJSON());
				let n = [], r = i([s, n], o);
				for (let t of Nr(o)) (e || !Ir(Fr(o[t]))) && n.push([a(t), a(o[t])]);
				return r;
			}
			case 3: return i([s, isNaN(o.getTime()) ? jr : o.toISOString()], o);
			case 4: {
				let { source: e, flags: t } = o;
				return i([s, {
					source: e,
					flags: t
				}], o);
			}
			case 5: {
				let t = [], n = i([s, t], o);
				for (let [n, r] of o) (e || !(Ir(Fr(n)) || Ir(Fr(r)))) && t.push([a(n), a(r)]);
				return n;
			}
			case 6: {
				let t = [], n = i([s, t], o);
				for (let n of o) (e || !Ir(Fr(n))) && t.push(a(n));
				return n;
			}
		}
		let { message: l } = o;
		return i([s, {
			name: c,
			message: l
		}], o);
	};
	return a;
}, Rr = (e, { json: t, lossy: n } = {}) => {
	let r = [];
	return Lr(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, zr = typeof structuredClone == "function" ? 
/* c8 ignore start */
(e, t) => t && ("json" in t || "lossy" in t) ? Ar(Rr(e, t)) : structuredClone(e) : (e, t) => Ar(Rr(e, t)), Br = class {
	constructor(e, t, n) {
		this.normal = t, this.property = e, n && (this.space = n);
	}
};
Br.prototype.normal = {}, Br.prototype.property = {}, Br.prototype.space = void 0;
//#endregion
//#region node_modules/hast-util-from-parse5/node_modules/property-information/lib/util/merge.js
function Vr(e, t) {
	let n = {}, r = {};
	for (let t of e) Object.assign(n, t.property), Object.assign(r, t.normal);
	return new Br(n, r, t);
}
//#endregion
//#region node_modules/hast-util-from-parse5/node_modules/property-information/lib/normalize.js
function Hr(e) {
	return e.toLowerCase();
}
//#endregion
//#region node_modules/hast-util-from-parse5/node_modules/property-information/lib/util/info.js
var Ur = class {
	constructor(e, t) {
		this.attribute = t, this.property = e;
	}
};
Ur.prototype.attribute = "", Ur.prototype.booleanish = !1, Ur.prototype.boolean = !1, Ur.prototype.commaOrSpaceSeparated = !1, Ur.prototype.commaSeparated = !1, Ur.prototype.defined = !1, Ur.prototype.mustUseProperty = !1, Ur.prototype.number = !1, Ur.prototype.overloadedBoolean = !1, Ur.prototype.property = "", Ur.prototype.spaceSeparated = !1, Ur.prototype.space = void 0;
//#endregion
//#region node_modules/hast-util-from-parse5/node_modules/property-information/lib/util/types.js
var Wr = /* @__PURE__ */ t({
	boolean: () => A,
	booleanish: () => Kr,
	commaOrSpaceSeparated: () => Xr,
	commaSeparated: () => Yr,
	number: () => j,
	overloadedBoolean: () => qr,
	spaceSeparated: () => Jr
}), Gr = 0, A = Zr(), Kr = Zr(), qr = Zr(), j = Zr(), Jr = Zr(), Yr = Zr(), Xr = Zr();
function Zr() {
	return 2 ** ++Gr;
}
//#endregion
//#region node_modules/hast-util-from-parse5/node_modules/property-information/lib/util/defined-info.js
var Qr = Object.keys(Wr), $r = class extends Ur {
	constructor(e, t, n, r) {
		let i = -1;
		if (super(e, t), ei(this, "space", r), typeof n == "number") for (; ++i < Qr.length;) {
			let e = Qr[i];
			ei(this, Qr[i], (n & Wr[e]) === Wr[e]);
		}
	}
};
$r.prototype.defined = !0;
function ei(e, t, n) {
	n && (e[t] = n);
}
//#endregion
//#region node_modules/hast-util-from-parse5/node_modules/property-information/lib/util/create.js
function ti(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e.properties)) {
		let a = new $r(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Hr(r)] = r, n[Hr(a.attribute)] = r;
	}
	return new Br(t, n, e.space);
}
//#endregion
//#region node_modules/hast-util-from-parse5/node_modules/property-information/lib/aria.js
var ni = ti({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: Kr,
		ariaAutoComplete: null,
		ariaBusy: Kr,
		ariaChecked: Kr,
		ariaColCount: j,
		ariaColIndex: j,
		ariaColSpan: j,
		ariaControls: Jr,
		ariaCurrent: null,
		ariaDescribedBy: Jr,
		ariaDetails: null,
		ariaDisabled: Kr,
		ariaDropEffect: Jr,
		ariaErrorMessage: null,
		ariaExpanded: Kr,
		ariaFlowTo: Jr,
		ariaGrabbed: Kr,
		ariaHasPopup: null,
		ariaHidden: Kr,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: Jr,
		ariaLevel: j,
		ariaLive: null,
		ariaModal: Kr,
		ariaMultiLine: Kr,
		ariaMultiSelectable: Kr,
		ariaOrientation: null,
		ariaOwns: Jr,
		ariaPlaceholder: null,
		ariaPosInSet: j,
		ariaPressed: Kr,
		ariaReadOnly: Kr,
		ariaRelevant: null,
		ariaRequired: Kr,
		ariaRoleDescription: Jr,
		ariaRowCount: j,
		ariaRowIndex: j,
		ariaRowSpan: j,
		ariaSelected: Kr,
		ariaSetSize: j,
		ariaSort: null,
		ariaValueMax: j,
		ariaValueMin: j,
		ariaValueNow: j,
		ariaValueText: null,
		role: null
	},
	transform(e, t) {
		return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
	}
});
//#endregion
//#region node_modules/hast-util-from-parse5/node_modules/property-information/lib/util/case-sensitive-transform.js
function ri(e, t) {
	return t in e ? e[t] : t;
}
//#endregion
//#region node_modules/hast-util-from-parse5/node_modules/property-information/lib/util/case-insensitive-transform.js
function ii(e, t) {
	return ri(e, t.toLowerCase());
}
//#endregion
//#region node_modules/hast-util-from-parse5/node_modules/property-information/lib/html.js
var ai = ti({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: Yr,
		acceptCharset: Jr,
		accessKey: Jr,
		action: null,
		allow: null,
		allowFullScreen: A,
		allowPaymentRequest: A,
		allowUserMedia: A,
		alpha: A,
		alt: null,
		as: null,
		async: A,
		autoCapitalize: null,
		autoComplete: Jr,
		autoFocus: A,
		autoPlay: A,
		blocking: Jr,
		capture: null,
		charSet: null,
		checked: A,
		cite: null,
		className: Jr,
		closedBy: null,
		colorSpace: null,
		cols: j,
		colSpan: j,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: Kr,
		controls: A,
		controlsList: Jr,
		coords: j | Yr,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: A,
		defer: A,
		dir: null,
		dirName: null,
		disabled: A,
		download: qr,
		draggable: Kr,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: A,
		formTarget: null,
		headers: Jr,
		height: j,
		hidden: qr,
		high: j,
		href: null,
		hrefLang: null,
		htmlFor: Jr,
		httpEquiv: Jr,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: A,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: A,
		itemId: null,
		itemProp: Jr,
		itemRef: Jr,
		itemScope: A,
		itemType: Jr,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: A,
		low: j,
		manifest: null,
		max: null,
		maxLength: j,
		media: null,
		method: null,
		min: null,
		minLength: j,
		multiple: A,
		muted: A,
		name: null,
		nonce: null,
		noModule: A,
		noValidate: A,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: A,
		optimum: j,
		pattern: null,
		ping: Jr,
		placeholder: null,
		playsInline: A,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: A,
		referrerPolicy: null,
		rel: Jr,
		required: A,
		reversed: A,
		rows: j,
		rowSpan: j,
		sandbox: Jr,
		scope: null,
		scoped: A,
		seamless: A,
		selected: A,
		shadowRootClonable: A,
		shadowRootCustomElementRegistry: A,
		shadowRootDelegatesFocus: A,
		shadowRootMode: null,
		shadowRootSerializable: A,
		shape: null,
		size: j,
		sizes: null,
		slot: null,
		span: j,
		spellCheck: Kr,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: j,
		step: null,
		style: null,
		tabIndex: j,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: A,
		useMap: null,
		value: Kr,
		width: j,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: Jr,
		axis: null,
		background: null,
		bgColor: null,
		border: j,
		borderColor: null,
		bottomMargin: j,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: A,
		declare: A,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: j,
		leftMargin: j,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: j,
		marginWidth: j,
		noResize: A,
		noHref: A,
		noShade: A,
		noWrap: A,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: j,
		rules: null,
		scheme: null,
		scrolling: Kr,
		standby: null,
		summary: null,
		text: null,
		topMargin: j,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: j,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: A,
		disablePictureInPicture: A,
		disableRemotePlayback: A,
		exportParts: Yr,
		part: Jr,
		prefix: null,
		property: null,
		results: j,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: ii
}), oi = ti({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		maskType: "mask-type",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: Xr,
		accentHeight: j,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: j,
		amplitude: j,
		arabicForm: null,
		ascent: j,
		attributeName: null,
		attributeType: null,
		azimuth: j,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: j,
		by: null,
		calcMode: null,
		capHeight: j,
		className: Jr,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: j,
		diffuseConstant: j,
		direction: null,
		display: null,
		dur: null,
		divisor: j,
		dominantBaseline: null,
		download: A,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: j,
		enableBackground: null,
		end: null,
		event: null,
		exponent: j,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: j,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: Yr,
		g2: Yr,
		glyphName: Yr,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: j,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: j,
		horizOriginX: j,
		horizOriginY: j,
		id: null,
		ideographic: j,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: j,
		k: j,
		k1: j,
		k2: j,
		k3: j,
		k4: j,
		kernelMatrix: Xr,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: j,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskType: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: j,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: j,
		overlineThickness: j,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: j,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: Jr,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: j,
		pointsAtY: j,
		pointsAtZ: j,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: Xr,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: Xr,
		rev: Xr,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: Xr,
		requiredFeatures: Xr,
		requiredFonts: Xr,
		requiredFormats: Xr,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: j,
		specularExponent: j,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: j,
		strikethroughThickness: j,
		string: null,
		stroke: null,
		strokeDashArray: Xr,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: j,
		strokeOpacity: j,
		strokeWidth: null,
		style: null,
		surfaceScale: j,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: Xr,
		tabIndex: j,
		tableValues: null,
		target: null,
		targetX: j,
		targetY: j,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: Xr,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: j,
		underlineThickness: j,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: j,
		values: null,
		vAlphabetic: j,
		vMathematical: j,
		vectorEffect: null,
		vHanging: j,
		vIdeographic: j,
		version: null,
		vertAdvY: j,
		vertOriginX: j,
		vertOriginY: j,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: j,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: ri
}), si = ti({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(e, t) {
		return "xlink:" + t.slice(5).toLowerCase();
	}
}), ci = ti({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: ii
}), li = ti({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(e, t) {
		return "xml:" + t.slice(3).toLowerCase();
	}
}), ui = /[A-Z]/g, di = /-[a-z]/g, fi = /^data[-\w.:]+$/i;
function pi(e, t) {
	let n = Hr(t), r = t, i = Ur;
	if (n in e.normal) return e.property[e.normal[n]];
	if (n.length > 4 && n.slice(0, 4) === "data" && fi.test(t)) {
		if (t.charAt(4) === "-") {
			let e = t.slice(5).replace(di, hi);
			r = "data" + e.charAt(0).toUpperCase() + e.slice(1);
		} else {
			let e = t.slice(4);
			if (!di.test(e)) {
				let n = e.replace(ui, mi);
				n.charAt(0) !== "-" && (n = "-" + n), t = "data" + n;
			}
		}
		i = $r;
	}
	return new i(r, t);
}
function mi(e) {
	return "-" + e.toLowerCase();
}
function hi(e) {
	return e.charAt(1).toUpperCase();
}
//#endregion
//#region node_modules/hast-util-from-parse5/node_modules/property-information/index.js
var gi = Vr([
	ni,
	ai,
	si,
	ci,
	li
], "html"), _i = Vr([
	ni,
	oi,
	si,
	ci,
	li
], "svg");
//#endregion
//#region node_modules/vfile-location/lib/index.js
function vi(e) {
	let t = String(e), n = [];
	return {
		toOffset: i,
		toPoint: r
	};
	function r(e) {
		if (typeof e == "number" && e > -1 && e <= t.length) {
			let r = 0;
			for (;;) {
				let i = n[r];
				if (i === void 0) {
					let e = yi(t, n[r - 1]);
					i = e === -1 ? t.length + 1 : e + 1, n[r] = i;
				}
				if (i > e) return {
					line: r + 1,
					column: e - (r > 0 ? n[r - 1] : 0) + 1,
					offset: e
				};
				r++;
			}
		}
	}
	function i(e) {
		if (e && typeof e.line == "number" && typeof e.column == "number" && !Number.isNaN(e.line) && !Number.isNaN(e.column)) {
			for (; n.length < e.line;) {
				let e = n[n.length - 1], r = yi(t, e), i = r === -1 ? t.length + 1 : r + 1;
				if (e === i) break;
				n.push(i);
			}
			let r = (e.line > 1 ? n[e.line - 2] : 0) + e.column - 1;
			if (r < n[e.line - 1]) return r;
		}
	}
}
function yi(e, t) {
	let n = e.indexOf("\r", t), r = e.indexOf("\n", t);
	return r === -1 ? n : n === -1 || n + 1 === r ? r : n < r ? n : r;
}
//#endregion
//#region node_modules/hast-util-from-parse5/lib/index.js
var bi = {}.hasOwnProperty, xi = Object.prototype;
function Si(e, t) {
	let n = t || {};
	return Ci({
		file: n.file || void 0,
		location: !1,
		schema: n.space === "svg" ? _i : gi,
		verbose: n.verbose || !1
	}, e);
}
function Ci(e, t) {
	let n;
	switch (t.nodeName) {
		case "#comment": {
			let r = t;
			return n = {
				type: "comment",
				value: r.data
			}, Ei(e, r, n), n;
		}
		case "#document":
		case "#document-fragment": {
			let r = t, i = "mode" in r ? r.mode === "quirks" || r.mode === "limited-quirks" : !1;
			if (n = {
				type: "root",
				children: wi(e, t.childNodes),
				data: { quirksMode: i }
			}, e.file && e.location) {
				let t = String(e.file), r = vi(t), i = r.toPoint(0), a = r.toPoint(t.length);
				n.position = {
					start: i,
					end: a
				};
			}
			return n;
		}
		case "#documentType": {
			let r = t;
			return n = { type: "doctype" }, Ei(e, r, n), n;
		}
		case "#text": {
			let r = t;
			return n = {
				type: "text",
				value: r.value
			}, Ei(e, r, n), n;
		}
		default: return n = Ti(e, t), n;
	}
}
function wi(e, t) {
	let n = -1, r = [];
	for (; ++n < t.length;) {
		let i = Ci(e, t[n]);
		r.push(i);
	}
	return r;
}
function Ti(e, t) {
	let n = e.schema;
	e.schema = t.namespaceURI === zn.svg ? _i : gi;
	let r = -1, i = {};
	for (; ++r < t.attrs.length;) {
		let e = t.attrs[r], n = (e.prefix ? e.prefix + ":" : "") + e.name;
		bi.call(xi, n) || (i[n] = e.value);
	}
	let a = (e.schema.space === "svg" ? Rn : Ln)(t.tagName, i, wi(e, t.childNodes));
	if (Ei(e, t, a), a.tagName === "template") {
		let n = t, r = n.sourceCodeLocation, i = r && r.startTag && Oi(r.startTag), o = r && r.endTag && Oi(r.endTag), s = Ci(e, n.content);
		i && o && e.file && (s.position = {
			start: i.end,
			end: o.start
		}), a.content = s;
	}
	return e.schema = n, a;
}
function Ei(e, t, n) {
	if ("sourceCodeLocation" in t && t.sourceCodeLocation && e.file) {
		let r = Di(e, n, t.sourceCodeLocation);
		r && (e.location = !0, n.position = r);
	}
}
function Di(e, t, n) {
	let r = Oi(n);
	if (t.type === "element") {
		let i = t.children[t.children.length - 1];
		if (r && !n.endTag && i && i.position && i.position.end && (r.end = Object.assign({}, i.position.end)), e.verbose) {
			let r = {}, i;
			if (n.attrs) for (i in n.attrs) bi.call(n.attrs, i) && (r[pi(e.schema, i).property] = Oi(n.attrs[i]));
			n.startTag;
			let a = Oi(n.startTag), o = n.endTag ? Oi(n.endTag) : void 0, s = { opening: a };
			o && (s.closing = o), s.properties = r, t.data = { position: s };
		}
	}
	return r;
}
function Oi(e) {
	let t = ki({
		line: e.startLine,
		column: e.startCol,
		offset: e.startOffset
	}), n = ki({
		line: e.endLine,
		column: e.endCol,
		offset: e.endOffset
	});
	return t || n ? {
		start: t,
		end: n
	} : void 0;
}
function ki(e) {
	return e.line && e.column ? e : void 0;
}
//#endregion
//#region node_modules/hast-util-to-parse5/node_modules/property-information/lib/util/schema.js
var Ai = class {
	constructor(e, t, n) {
		this.normal = t, this.property = e, n && (this.space = n);
	}
};
Ai.prototype.normal = {}, Ai.prototype.property = {}, Ai.prototype.space = void 0;
//#endregion
//#region node_modules/hast-util-to-parse5/node_modules/property-information/lib/util/merge.js
function ji(e, t) {
	let n = {}, r = {};
	for (let t of e) Object.assign(n, t.property), Object.assign(r, t.normal);
	return new Ai(n, r, t);
}
//#endregion
//#region node_modules/hast-util-to-parse5/node_modules/property-information/lib/normalize.js
function Mi(e) {
	return e.toLowerCase();
}
//#endregion
//#region node_modules/hast-util-to-parse5/node_modules/property-information/lib/util/info.js
var Ni = class {
	constructor(e, t) {
		this.attribute = t, this.property = e;
	}
};
Ni.prototype.attribute = "", Ni.prototype.booleanish = !1, Ni.prototype.boolean = !1, Ni.prototype.commaOrSpaceSeparated = !1, Ni.prototype.commaSeparated = !1, Ni.prototype.defined = !1, Ni.prototype.mustUseProperty = !1, Ni.prototype.number = !1, Ni.prototype.overloadedBoolean = !1, Ni.prototype.property = "", Ni.prototype.spaceSeparated = !1, Ni.prototype.space = void 0;
//#endregion
//#region node_modules/hast-util-to-parse5/node_modules/property-information/lib/util/types.js
var Pi = /* @__PURE__ */ t({
	boolean: () => M,
	booleanish: () => Ii,
	commaOrSpaceSeparated: () => Bi,
	commaSeparated: () => zi,
	number: () => N,
	overloadedBoolean: () => Li,
	spaceSeparated: () => Ri
}), Fi = 0, M = Vi(), Ii = Vi(), Li = Vi(), N = Vi(), Ri = Vi(), zi = Vi(), Bi = Vi();
function Vi() {
	return 2 ** ++Fi;
}
//#endregion
//#region node_modules/hast-util-to-parse5/node_modules/property-information/lib/util/defined-info.js
var Hi = Object.keys(Pi), Ui = class extends Ni {
	constructor(e, t, n, r) {
		let i = -1;
		if (super(e, t), Wi(this, "space", r), typeof n == "number") for (; ++i < Hi.length;) {
			let e = Hi[i];
			Wi(this, Hi[i], (n & Pi[e]) === Pi[e]);
		}
	}
};
Ui.prototype.defined = !0;
function Wi(e, t, n) {
	n && (e[t] = n);
}
//#endregion
//#region node_modules/hast-util-to-parse5/node_modules/property-information/lib/util/create.js
function Gi(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e.properties)) {
		let a = new Ui(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Mi(r)] = r, n[Mi(a.attribute)] = r;
	}
	return new Ai(t, n, e.space);
}
//#endregion
//#region node_modules/hast-util-to-parse5/node_modules/property-information/lib/aria.js
var Ki = Gi({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: Ii,
		ariaAutoComplete: null,
		ariaBusy: Ii,
		ariaChecked: Ii,
		ariaColCount: N,
		ariaColIndex: N,
		ariaColSpan: N,
		ariaControls: Ri,
		ariaCurrent: null,
		ariaDescribedBy: Ri,
		ariaDetails: null,
		ariaDisabled: Ii,
		ariaDropEffect: Ri,
		ariaErrorMessage: null,
		ariaExpanded: Ii,
		ariaFlowTo: Ri,
		ariaGrabbed: Ii,
		ariaHasPopup: null,
		ariaHidden: Ii,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: Ri,
		ariaLevel: N,
		ariaLive: null,
		ariaModal: Ii,
		ariaMultiLine: Ii,
		ariaMultiSelectable: Ii,
		ariaOrientation: null,
		ariaOwns: Ri,
		ariaPlaceholder: null,
		ariaPosInSet: N,
		ariaPressed: Ii,
		ariaReadOnly: Ii,
		ariaRelevant: null,
		ariaRequired: Ii,
		ariaRoleDescription: Ri,
		ariaRowCount: N,
		ariaRowIndex: N,
		ariaRowSpan: N,
		ariaSelected: Ii,
		ariaSetSize: N,
		ariaSort: null,
		ariaValueMax: N,
		ariaValueMin: N,
		ariaValueNow: N,
		ariaValueText: null,
		role: null
	},
	transform(e, t) {
		return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
	}
});
//#endregion
//#region node_modules/hast-util-to-parse5/node_modules/property-information/lib/util/case-sensitive-transform.js
function qi(e, t) {
	return t in e ? e[t] : t;
}
//#endregion
//#region node_modules/hast-util-to-parse5/node_modules/property-information/lib/util/case-insensitive-transform.js
function Ji(e, t) {
	return qi(e, t.toLowerCase());
}
//#endregion
//#region node_modules/hast-util-to-parse5/node_modules/property-information/lib/html.js
var Yi = Gi({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: zi,
		acceptCharset: Ri,
		accessKey: Ri,
		action: null,
		allow: null,
		allowFullScreen: M,
		allowPaymentRequest: M,
		allowUserMedia: M,
		alpha: M,
		alt: null,
		as: null,
		async: M,
		autoCapitalize: null,
		autoComplete: Ri,
		autoFocus: M,
		autoPlay: M,
		blocking: Ri,
		capture: null,
		charSet: null,
		checked: M,
		cite: null,
		className: Ri,
		closedBy: null,
		colorSpace: null,
		cols: N,
		colSpan: N,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: Ii,
		controls: M,
		controlsList: Ri,
		coords: N | zi,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: M,
		defer: M,
		dir: null,
		dirName: null,
		disabled: M,
		download: Li,
		draggable: Ii,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: M,
		formTarget: null,
		headers: Ri,
		height: N,
		hidden: Li,
		high: N,
		href: null,
		hrefLang: null,
		htmlFor: Ri,
		httpEquiv: Ri,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: M,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: M,
		itemId: null,
		itemProp: Ri,
		itemRef: Ri,
		itemScope: M,
		itemType: Ri,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: M,
		low: N,
		manifest: null,
		max: null,
		maxLength: N,
		media: null,
		method: null,
		min: null,
		minLength: N,
		multiple: M,
		muted: M,
		name: null,
		nonce: null,
		noModule: M,
		noValidate: M,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: M,
		optimum: N,
		pattern: null,
		ping: Ri,
		placeholder: null,
		playsInline: M,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: M,
		referrerPolicy: null,
		rel: Ri,
		required: M,
		reversed: M,
		rows: N,
		rowSpan: N,
		sandbox: Ri,
		scope: null,
		scoped: M,
		seamless: M,
		selected: M,
		shadowRootClonable: M,
		shadowRootCustomElementRegistry: M,
		shadowRootDelegatesFocus: M,
		shadowRootMode: null,
		shadowRootSerializable: M,
		shape: null,
		size: N,
		sizes: null,
		slot: null,
		span: N,
		spellCheck: Ii,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: N,
		step: null,
		style: null,
		tabIndex: N,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: M,
		useMap: null,
		value: Ii,
		width: N,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: Ri,
		axis: null,
		background: null,
		bgColor: null,
		border: N,
		borderColor: null,
		bottomMargin: N,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: M,
		declare: M,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: N,
		leftMargin: N,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: N,
		marginWidth: N,
		noResize: M,
		noHref: M,
		noShade: M,
		noWrap: M,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: N,
		rules: null,
		scheme: null,
		scrolling: Ii,
		standby: null,
		summary: null,
		text: null,
		topMargin: N,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: N,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: M,
		disablePictureInPicture: M,
		disableRemotePlayback: M,
		exportParts: zi,
		part: Ri,
		prefix: null,
		property: null,
		results: N,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: Ji
}), Xi = Gi({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		maskType: "mask-type",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: Bi,
		accentHeight: N,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: N,
		amplitude: N,
		arabicForm: null,
		ascent: N,
		attributeName: null,
		attributeType: null,
		azimuth: N,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: N,
		by: null,
		calcMode: null,
		capHeight: N,
		className: Ri,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: N,
		diffuseConstant: N,
		direction: null,
		display: null,
		dur: null,
		divisor: N,
		dominantBaseline: null,
		download: M,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: N,
		enableBackground: null,
		end: null,
		event: null,
		exponent: N,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: N,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: zi,
		g2: zi,
		glyphName: zi,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: N,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: N,
		horizOriginX: N,
		horizOriginY: N,
		id: null,
		ideographic: N,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: N,
		k: N,
		k1: N,
		k2: N,
		k3: N,
		k4: N,
		kernelMatrix: Bi,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: N,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskType: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: N,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: N,
		overlineThickness: N,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: N,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: Ri,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: N,
		pointsAtY: N,
		pointsAtZ: N,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: Bi,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: Bi,
		rev: Bi,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: Bi,
		requiredFeatures: Bi,
		requiredFonts: Bi,
		requiredFormats: Bi,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: N,
		specularExponent: N,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: N,
		strikethroughThickness: N,
		string: null,
		stroke: null,
		strokeDashArray: Bi,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: N,
		strokeOpacity: N,
		strokeWidth: null,
		style: null,
		surfaceScale: N,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: Bi,
		tabIndex: N,
		tableValues: null,
		target: null,
		targetX: N,
		targetY: N,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: Bi,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: N,
		underlineThickness: N,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: N,
		values: null,
		vAlphabetic: N,
		vMathematical: N,
		vectorEffect: null,
		vHanging: N,
		vIdeographic: N,
		version: null,
		vertAdvY: N,
		vertOriginX: N,
		vertOriginY: N,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: N,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: qi
}), Zi = Gi({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(e, t) {
		return "xlink:" + t.slice(5).toLowerCase();
	}
}), Qi = Gi({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: Ji
}), $i = Gi({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(e, t) {
		return "xml:" + t.slice(3).toLowerCase();
	}
}), ea = /[A-Z]/g, ta = /-[a-z]/g, na = /^data[-\w.:]+$/i;
function ra(e, t) {
	let n = Mi(t), r = t, i = Ni;
	if (n in e.normal) return e.property[e.normal[n]];
	if (n.length > 4 && n.slice(0, 4) === "data" && na.test(t)) {
		if (t.charAt(4) === "-") {
			let e = t.slice(5).replace(ta, aa);
			r = "data" + e.charAt(0).toUpperCase() + e.slice(1);
		} else {
			let e = t.slice(4);
			if (!ta.test(e)) {
				let n = e.replace(ea, ia);
				n.charAt(0) !== "-" && (n = "-" + n), t = "data" + n;
			}
		}
		i = Ui;
	}
	return new i(r, t);
}
function ia(e) {
	return "-" + e.toLowerCase();
}
function aa(e) {
	return e.charAt(1).toUpperCase();
}
//#endregion
//#region node_modules/hast-util-to-parse5/node_modules/property-information/index.js
var oa = ji([
	Ki,
	Yi,
	Zi,
	Qi,
	$i
], "html"), sa = ji([
	Ki,
	Xi,
	Zi,
	Qi,
	$i
], "svg"), ca = {}.hasOwnProperty;
function la(e, t) {
	let n = t || {};
	function r(t, ...n) {
		let i = r.invalid, a = r.handlers;
		if (t && ca.call(t, e)) {
			let n = String(t[e]);
			i = ca.call(a, n) ? a[n] : r.unknown;
		}
		if (i) return i.call(this, t, ...n);
	}
	return r.handlers = n.handlers || {}, r.invalid = n.invalid, r.unknown = n.unknown, r;
}
//#endregion
//#region node_modules/hast-util-to-parse5/lib/index.js
var ua = {}, da = {}.hasOwnProperty, fa = la("type", { handlers: {
	root: ma,
	element: ya,
	text: _a,
	comment: va,
	doctype: ga
} });
function pa(e, t) {
	let n = (t || ua).space;
	return fa(e, n === "svg" ? sa : oa);
}
function ma(e, t) {
	let n = {
		nodeName: "#document",
		mode: (e.data || {}).quirksMode ? "quirks" : "no-quirks",
		childNodes: []
	};
	return n.childNodes = xa(e.children, n, t), Sa(e, n), n;
}
function ha(e, t) {
	let n = {
		nodeName: "#document-fragment",
		childNodes: []
	};
	return n.childNodes = xa(e.children, n, t), Sa(e, n), n;
}
function ga(e) {
	let t = {
		nodeName: "#documentType",
		name: "html",
		publicId: "",
		systemId: "",
		parentNode: null
	};
	return Sa(e, t), t;
}
function _a(e) {
	let t = {
		nodeName: "#text",
		value: e.value,
		parentNode: null
	};
	return Sa(e, t), t;
}
function va(e) {
	let t = {
		nodeName: "#comment",
		data: e.value,
		parentNode: null
	};
	return Sa(e, t), t;
}
function ya(e, t) {
	let n = t, r = n;
	e.type === "element" && e.tagName.toLowerCase() === "svg" && n.space === "html" && (r = sa);
	let i = [], a;
	if (e.properties) {
		for (a in e.properties) if (a !== "children" && da.call(e.properties, a)) {
			let t = ba(r, a, e.properties[a]);
			t && i.push(t);
		}
	}
	let o = r.space, s = {
		nodeName: e.tagName,
		tagName: e.tagName,
		attrs: i,
		namespaceURI: zn[o],
		childNodes: [],
		parentNode: null
	};
	return s.childNodes = xa(e.children, s, r), Sa(e, s), e.tagName === "template" && e.content && (s.content = ha(e.content, r)), s;
}
function ba(e, t, n) {
	let r = ra(e, t);
	if (n === !1 || n == null || typeof n == "number" && Number.isNaN(n) || !n && r.boolean) return;
	Array.isArray(n) && (n = r.commaSeparated ? wn(n) : On(n));
	let i = {
		name: r.attribute,
		value: n === !0 ? "" : String(n)
	};
	if (r.space && r.space !== "html" && r.space !== "svg") {
		let e = i.name.indexOf(":");
		e < 0 ? i.prefix = "" : (i.name = i.name.slice(e + 1), i.prefix = r.attribute.slice(0, e)), i.namespace = zn[r.space];
	}
	return i;
}
function xa(e, t, n) {
	let r = -1, i = [];
	if (e) for (; ++r < e.length;) {
		let a = fa(e[r], n);
		a.parentNode = t, i.push(a);
	}
	return i;
}
function Sa(e, t) {
	let n = e.position;
	n && n.start && n.end && (n.start.offset, n.end.offset, t.sourceCodeLocation = {
		startLine: n.start.line,
		startCol: n.start.column,
		startOffset: n.start.offset,
		endLine: n.end.line,
		endCol: n.end.column,
		endOffset: n.end.offset
	});
}
//#endregion
//#region node_modules/html-void-elements/index.js
var Ca = [
	"area",
	"base",
	"basefont",
	"bgsound",
	"br",
	"col",
	"command",
	"embed",
	"frame",
	"hr",
	"image",
	"img",
	"input",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
], wa = /* @__PURE__ */ new Set([
	65534,
	65535,
	131070,
	131071,
	196606,
	196607,
	262142,
	262143,
	327678,
	327679,
	393214,
	393215,
	458750,
	458751,
	524286,
	524287,
	589822,
	589823,
	655358,
	655359,
	720894,
	720895,
	786430,
	786431,
	851966,
	851967,
	917502,
	917503,
	983038,
	983039,
	1048574,
	1048575,
	1114110,
	1114111
]), P;
(function(e) {
	e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z";
})(P || (P = {}));
var Ta = {
	DASH_DASH: "--",
	CDATA_START: "[CDATA[",
	DOCTYPE: "doctype",
	SCRIPT: "script",
	PUBLIC: "public",
	SYSTEM: "system"
};
function Ea(e) {
	return e >= 55296 && e <= 57343;
}
function Da(e) {
	return e >= 56320 && e <= 57343;
}
function Oa(e, t) {
	return (e - 55296) * 1024 + 9216 + t;
}
function ka(e) {
	return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function Aa(e) {
	return e >= 64976 && e <= 65007 || wa.has(e);
}
//#endregion
//#region node_modules/parse5/dist/common/error-codes.js
var F;
(function(e) {
	e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(F || (F = {}));
//#endregion
//#region node_modules/parse5/dist/tokenizer/preprocessor.js
var ja = 65536, Ma = class {
	constructor(e) {
		this.handler = e, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = ja, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
	}
	get col() {
		return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
	}
	get offset() {
		return this.droppedBufferSize + this.pos;
	}
	getError(e, t) {
		let { line: n, col: r, offset: i } = this, a = r + t, o = i + t;
		return {
			code: e,
			startLine: n,
			endLine: n,
			startCol: a,
			endCol: a,
			startOffset: o,
			endOffset: o
		};
	}
	_err(e) {
		this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(e, 0)));
	}
	_addGap() {
		this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
	}
	_processSurrogate(e) {
		if (this.pos !== this.html.length - 1) {
			let t = this.html.charCodeAt(this.pos + 1);
			if (Da(t)) return this.pos++, this._addGap(), Oa(e, t);
		} else if (!this.lastChunkWritten) return this.endOfChunkHit = !0, P.EOF;
		return this._err(F.surrogateInInputStream), e;
	}
	willDropParsedChunk() {
		return this.pos > this.bufferWaterline;
	}
	dropParsedChunk() {
		this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
	}
	write(e, t) {
		this.html.length > 0 ? this.html += e : this.html = e, this.endOfChunkHit = !1, this.lastChunkWritten = t;
	}
	insertHtmlAtCurrentPos(e) {
		this.html = this.html.substring(0, this.pos + 1) + e + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
	}
	startsWith(e, t) {
		if (this.pos + e.length > this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, !1;
		if (t) return this.html.startsWith(e, this.pos);
		for (let t = 0; t < e.length; t++) if ((this.html.charCodeAt(this.pos + t) | 32) !== e.charCodeAt(t)) return !1;
		return !0;
	}
	peek(e) {
		let t = this.pos + e;
		if (t >= this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, P.EOF;
		let n = this.html.charCodeAt(t);
		return n === P.CARRIAGE_RETURN ? P.LINE_FEED : n;
	}
	advance() {
		if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, P.EOF;
		let e = this.html.charCodeAt(this.pos);
		return e === P.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, P.LINE_FEED) : e === P.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, Ea(e) && (e = this._processSurrogate(e)), this.handler.onParseError === null || e > 31 && e < 127 || e === P.LINE_FEED || e === P.CARRIAGE_RETURN || e > 159 && e < 64976 || this._checkForProblematicCharacters(e), e);
	}
	_checkForProblematicCharacters(e) {
		ka(e) ? this._err(F.controlCharacterInInputStream) : Aa(e) && this._err(F.noncharacterInInputStream);
	}
	retreat(e) {
		for (this.pos -= e; this.pos < this.lastGapPos;) this.lastGapPos = this.gapStack.pop(), this.pos--;
		this.isEol = !1;
	}
}, I;
(function(e) {
	e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION";
})(I || (I = {}));
function Na(e, t) {
	for (let n = e.attrs.length - 1; n >= 0; n--) if (e.attrs[n].name === t) return e.attrs[n].value;
	return null;
}
//#endregion
//#region node_modules/entities/dist/esm/generated/decode-data-html.js
var Pa = /* #__PURE__ */ new Uint16Array(/* #__PURE__ */ "ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻\"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻\xA0ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌".split("").map((e) => e.charCodeAt(0))), Fa = /* @__PURE__ */ new Map([
	[0, 65533],
	[128, 8364],
	[130, 8218],
	[131, 402],
	[132, 8222],
	[133, 8230],
	[134, 8224],
	[135, 8225],
	[136, 710],
	[137, 8240],
	[138, 352],
	[139, 8249],
	[140, 338],
	[142, 381],
	[145, 8216],
	[146, 8217],
	[147, 8220],
	[148, 8221],
	[149, 8226],
	[150, 8211],
	[151, 8212],
	[152, 732],
	[153, 8482],
	[154, 353],
	[155, 8250],
	[156, 339],
	[158, 382],
	[159, 376]
]);
String.fromCodePoint;
function Ia(e) {
	return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : Fa.get(e) ?? e;
}
//#endregion
//#region node_modules/entities/dist/esm/decode.js
var La;
(function(e) {
	e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(La || (La = {}));
var Ra = 32, za;
(function(e) {
	e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(za || (za = {}));
function Ba(e) {
	return e >= La.ZERO && e <= La.NINE;
}
function Va(e) {
	return e >= La.UPPER_A && e <= La.UPPER_F || e >= La.LOWER_A && e <= La.LOWER_F;
}
function Ha(e) {
	return e >= La.UPPER_A && e <= La.UPPER_Z || e >= La.LOWER_A && e <= La.LOWER_Z || Ba(e);
}
function Ua(e) {
	return e === La.EQUALS || Ha(e);
}
var Wa;
(function(e) {
	e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(Wa || (Wa = {}));
var Ga;
(function(e) {
	e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(Ga || (Ga = {}));
var Ka = class {
	constructor(e, t, n) {
		this.decodeTree = e, this.emitCodePoint = t, this.errors = n, this.state = Wa.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = Ga.Strict;
	}
	startEntity(e) {
		this.decodeMode = e, this.state = Wa.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
	}
	write(e, t) {
		switch (this.state) {
			case Wa.EntityStart: return e.charCodeAt(t) === La.NUM ? (this.state = Wa.NumericStart, this.consumed += 1, this.stateNumericStart(e, t + 1)) : (this.state = Wa.NamedEntity, this.stateNamedEntity(e, t));
			case Wa.NumericStart: return this.stateNumericStart(e, t);
			case Wa.NumericDecimal: return this.stateNumericDecimal(e, t);
			case Wa.NumericHex: return this.stateNumericHex(e, t);
			case Wa.NamedEntity: return this.stateNamedEntity(e, t);
		}
	}
	stateNumericStart(e, t) {
		return t >= e.length ? -1 : (e.charCodeAt(t) | Ra) === La.LOWER_X ? (this.state = Wa.NumericHex, this.consumed += 1, this.stateNumericHex(e, t + 1)) : (this.state = Wa.NumericDecimal, this.stateNumericDecimal(e, t));
	}
	addToNumericResult(e, t, n, r) {
		if (t !== n) {
			let i = n - t;
			this.result = this.result * r ** +i + Number.parseInt(e.substr(t, i), r), this.consumed += i;
		}
	}
	stateNumericHex(e, t) {
		let n = t;
		for (; t < e.length;) {
			let r = e.charCodeAt(t);
			if (Ba(r) || Va(r)) t += 1;
			else return this.addToNumericResult(e, n, t, 16), this.emitNumericEntity(r, 3);
		}
		return this.addToNumericResult(e, n, t, 16), -1;
	}
	stateNumericDecimal(e, t) {
		let n = t;
		for (; t < e.length;) {
			let r = e.charCodeAt(t);
			if (Ba(r)) t += 1;
			else return this.addToNumericResult(e, n, t, 10), this.emitNumericEntity(r, 2);
		}
		return this.addToNumericResult(e, n, t, 10), -1;
	}
	emitNumericEntity(e, t) {
		var n;
		if (this.consumed <= t) return (n = this.errors) == null || n.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
		if (e === La.SEMI) this.consumed += 1;
		else if (this.decodeMode === Ga.Strict) return 0;
		return this.emitCodePoint(Ia(this.result), this.consumed), this.errors && (e !== La.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
	}
	stateNamedEntity(e, t) {
		let { decodeTree: n } = this, r = n[this.treeIndex], i = (r & za.VALUE_LENGTH) >> 14;
		for (; t < e.length; t++, this.excess++) {
			let a = e.charCodeAt(t);
			if (this.treeIndex = qa(n, r, this.treeIndex + Math.max(1, i), a), this.treeIndex < 0) return this.result === 0 || this.decodeMode === Ga.Attribute && (i === 0 || Ua(a)) ? 0 : this.emitNotTerminatedNamedEntity();
			if (r = n[this.treeIndex], i = (r & za.VALUE_LENGTH) >> 14, i !== 0) {
				if (a === La.SEMI) return this.emitNamedEntityData(this.treeIndex, i, this.consumed + this.excess);
				this.decodeMode !== Ga.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
			}
		}
		return -1;
	}
	emitNotTerminatedNamedEntity() {
		var e;
		let { result: t, decodeTree: n } = this, r = (n[t] & za.VALUE_LENGTH) >> 14;
		return this.emitNamedEntityData(t, r, this.consumed), (e = this.errors) == null || e.missingSemicolonAfterCharacterReference(), this.consumed;
	}
	emitNamedEntityData(e, t, n) {
		let { decodeTree: r } = this;
		return this.emitCodePoint(t === 1 ? r[e] & ~za.VALUE_LENGTH : r[e + 1], n), t === 3 && this.emitCodePoint(r[e + 2], n), n;
	}
	end() {
		var e;
		switch (this.state) {
			case Wa.NamedEntity: return this.result !== 0 && (this.decodeMode !== Ga.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
			case Wa.NumericDecimal: return this.emitNumericEntity(0, 2);
			case Wa.NumericHex: return this.emitNumericEntity(0, 3);
			case Wa.NumericStart: return (e = this.errors) == null || e.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
			case Wa.EntityStart: return 0;
		}
	}
};
function qa(e, t, n, r) {
	let i = (t & za.BRANCH_LENGTH) >> 7, a = t & za.JUMP_TABLE;
	if (i === 0) return a !== 0 && r === a ? n : -1;
	if (a) {
		let t = r - a;
		return t < 0 || t >= i ? -1 : e[n + t] - 1;
	}
	let o = n, s = o + i - 1;
	for (; o <= s;) {
		let t = o + s >>> 1, n = e[t];
		if (n < r) o = t + 1;
		else if (n > r) s = t - 1;
		else return e[t + i];
	}
	return -1;
}
//#endregion
//#region node_modules/parse5/dist/common/html.js
var L;
(function(e) {
	e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
})(L || (L = {}));
var Ja;
(function(e) {
	e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(Ja || (Ja = {}));
var Ya;
(function(e) {
	e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks";
})(Ya || (Ya = {}));
var R;
(function(e) {
	e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SEARCH = "search", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp";
})(R || (R = {}));
var z;
(function(e) {
	e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SEARCH = 94] = "SEARCH", e[e.SECTION = 95] = "SECTION", e[e.SELECT = 96] = "SELECT", e[e.SOURCE = 97] = "SOURCE", e[e.SMALL = 98] = "SMALL", e[e.SPAN = 99] = "SPAN", e[e.STRIKE = 100] = "STRIKE", e[e.STRONG = 101] = "STRONG", e[e.STYLE = 102] = "STYLE", e[e.SUB = 103] = "SUB", e[e.SUMMARY = 104] = "SUMMARY", e[e.SUP = 105] = "SUP", e[e.TABLE = 106] = "TABLE", e[e.TBODY = 107] = "TBODY", e[e.TEMPLATE = 108] = "TEMPLATE", e[e.TEXTAREA = 109] = "TEXTAREA", e[e.TFOOT = 110] = "TFOOT", e[e.TD = 111] = "TD", e[e.TH = 112] = "TH", e[e.THEAD = 113] = "THEAD", e[e.TITLE = 114] = "TITLE", e[e.TR = 115] = "TR", e[e.TRACK = 116] = "TRACK", e[e.TT = 117] = "TT", e[e.U = 118] = "U", e[e.UL = 119] = "UL", e[e.SVG = 120] = "SVG", e[e.VAR = 121] = "VAR", e[e.WBR = 122] = "WBR", e[e.XMP = 123] = "XMP";
})(z || (z = {}));
var Xa = /* @__PURE__ */ new Map([
	[R.A, z.A],
	[R.ADDRESS, z.ADDRESS],
	[R.ANNOTATION_XML, z.ANNOTATION_XML],
	[R.APPLET, z.APPLET],
	[R.AREA, z.AREA],
	[R.ARTICLE, z.ARTICLE],
	[R.ASIDE, z.ASIDE],
	[R.B, z.B],
	[R.BASE, z.BASE],
	[R.BASEFONT, z.BASEFONT],
	[R.BGSOUND, z.BGSOUND],
	[R.BIG, z.BIG],
	[R.BLOCKQUOTE, z.BLOCKQUOTE],
	[R.BODY, z.BODY],
	[R.BR, z.BR],
	[R.BUTTON, z.BUTTON],
	[R.CAPTION, z.CAPTION],
	[R.CENTER, z.CENTER],
	[R.CODE, z.CODE],
	[R.COL, z.COL],
	[R.COLGROUP, z.COLGROUP],
	[R.DD, z.DD],
	[R.DESC, z.DESC],
	[R.DETAILS, z.DETAILS],
	[R.DIALOG, z.DIALOG],
	[R.DIR, z.DIR],
	[R.DIV, z.DIV],
	[R.DL, z.DL],
	[R.DT, z.DT],
	[R.EM, z.EM],
	[R.EMBED, z.EMBED],
	[R.FIELDSET, z.FIELDSET],
	[R.FIGCAPTION, z.FIGCAPTION],
	[R.FIGURE, z.FIGURE],
	[R.FONT, z.FONT],
	[R.FOOTER, z.FOOTER],
	[R.FOREIGN_OBJECT, z.FOREIGN_OBJECT],
	[R.FORM, z.FORM],
	[R.FRAME, z.FRAME],
	[R.FRAMESET, z.FRAMESET],
	[R.H1, z.H1],
	[R.H2, z.H2],
	[R.H3, z.H3],
	[R.H4, z.H4],
	[R.H5, z.H5],
	[R.H6, z.H6],
	[R.HEAD, z.HEAD],
	[R.HEADER, z.HEADER],
	[R.HGROUP, z.HGROUP],
	[R.HR, z.HR],
	[R.HTML, z.HTML],
	[R.I, z.I],
	[R.IMG, z.IMG],
	[R.IMAGE, z.IMAGE],
	[R.INPUT, z.INPUT],
	[R.IFRAME, z.IFRAME],
	[R.KEYGEN, z.KEYGEN],
	[R.LABEL, z.LABEL],
	[R.LI, z.LI],
	[R.LINK, z.LINK],
	[R.LISTING, z.LISTING],
	[R.MAIN, z.MAIN],
	[R.MALIGNMARK, z.MALIGNMARK],
	[R.MARQUEE, z.MARQUEE],
	[R.MATH, z.MATH],
	[R.MENU, z.MENU],
	[R.META, z.META],
	[R.MGLYPH, z.MGLYPH],
	[R.MI, z.MI],
	[R.MO, z.MO],
	[R.MN, z.MN],
	[R.MS, z.MS],
	[R.MTEXT, z.MTEXT],
	[R.NAV, z.NAV],
	[R.NOBR, z.NOBR],
	[R.NOFRAMES, z.NOFRAMES],
	[R.NOEMBED, z.NOEMBED],
	[R.NOSCRIPT, z.NOSCRIPT],
	[R.OBJECT, z.OBJECT],
	[R.OL, z.OL],
	[R.OPTGROUP, z.OPTGROUP],
	[R.OPTION, z.OPTION],
	[R.P, z.P],
	[R.PARAM, z.PARAM],
	[R.PLAINTEXT, z.PLAINTEXT],
	[R.PRE, z.PRE],
	[R.RB, z.RB],
	[R.RP, z.RP],
	[R.RT, z.RT],
	[R.RTC, z.RTC],
	[R.RUBY, z.RUBY],
	[R.S, z.S],
	[R.SCRIPT, z.SCRIPT],
	[R.SEARCH, z.SEARCH],
	[R.SECTION, z.SECTION],
	[R.SELECT, z.SELECT],
	[R.SOURCE, z.SOURCE],
	[R.SMALL, z.SMALL],
	[R.SPAN, z.SPAN],
	[R.STRIKE, z.STRIKE],
	[R.STRONG, z.STRONG],
	[R.STYLE, z.STYLE],
	[R.SUB, z.SUB],
	[R.SUMMARY, z.SUMMARY],
	[R.SUP, z.SUP],
	[R.TABLE, z.TABLE],
	[R.TBODY, z.TBODY],
	[R.TEMPLATE, z.TEMPLATE],
	[R.TEXTAREA, z.TEXTAREA],
	[R.TFOOT, z.TFOOT],
	[R.TD, z.TD],
	[R.TH, z.TH],
	[R.THEAD, z.THEAD],
	[R.TITLE, z.TITLE],
	[R.TR, z.TR],
	[R.TRACK, z.TRACK],
	[R.TT, z.TT],
	[R.U, z.U],
	[R.UL, z.UL],
	[R.SVG, z.SVG],
	[R.VAR, z.VAR],
	[R.WBR, z.WBR],
	[R.XMP, z.XMP]
]);
function Za(e) {
	return Xa.get(e) ?? z.UNKNOWN;
}
var B = z, Qa = {
	[L.HTML]: /* @__PURE__ */ new Set([
		B.ADDRESS,
		B.APPLET,
		B.AREA,
		B.ARTICLE,
		B.ASIDE,
		B.BASE,
		B.BASEFONT,
		B.BGSOUND,
		B.BLOCKQUOTE,
		B.BODY,
		B.BR,
		B.BUTTON,
		B.CAPTION,
		B.CENTER,
		B.COL,
		B.COLGROUP,
		B.DD,
		B.DETAILS,
		B.DIR,
		B.DIV,
		B.DL,
		B.DT,
		B.EMBED,
		B.FIELDSET,
		B.FIGCAPTION,
		B.FIGURE,
		B.FOOTER,
		B.FORM,
		B.FRAME,
		B.FRAMESET,
		B.H1,
		B.H2,
		B.H3,
		B.H4,
		B.H5,
		B.H6,
		B.HEAD,
		B.HEADER,
		B.HGROUP,
		B.HR,
		B.HTML,
		B.IFRAME,
		B.IMG,
		B.INPUT,
		B.LI,
		B.LINK,
		B.LISTING,
		B.MAIN,
		B.MARQUEE,
		B.MENU,
		B.META,
		B.NAV,
		B.NOEMBED,
		B.NOFRAMES,
		B.NOSCRIPT,
		B.OBJECT,
		B.OL,
		B.P,
		B.PARAM,
		B.PLAINTEXT,
		B.PRE,
		B.SCRIPT,
		B.SECTION,
		B.SELECT,
		B.SOURCE,
		B.STYLE,
		B.SUMMARY,
		B.TABLE,
		B.TBODY,
		B.TD,
		B.TEMPLATE,
		B.TEXTAREA,
		B.TFOOT,
		B.TH,
		B.THEAD,
		B.TITLE,
		B.TR,
		B.TRACK,
		B.UL,
		B.WBR,
		B.XMP
	]),
	[L.MATHML]: /* @__PURE__ */ new Set([
		B.MI,
		B.MO,
		B.MN,
		B.MS,
		B.MTEXT,
		B.ANNOTATION_XML
	]),
	[L.SVG]: /* @__PURE__ */ new Set([
		B.TITLE,
		B.FOREIGN_OBJECT,
		B.DESC
	]),
	[L.XLINK]: /* @__PURE__ */ new Set(),
	[L.XML]: /* @__PURE__ */ new Set(),
	[L.XMLNS]: /* @__PURE__ */ new Set()
}, $a = /* @__PURE__ */ new Set([
	B.H1,
	B.H2,
	B.H3,
	B.H4,
	B.H5,
	B.H6
]);
R.STYLE, R.SCRIPT, R.XMP, R.IFRAME, R.NOEMBED, R.NOFRAMES, R.PLAINTEXT;
//#endregion
//#region node_modules/parse5/dist/tokenizer/index.js
var V;
(function(e) {
	e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 72] = "AMBIGUOUS_AMPERSAND";
})(V || (V = {}));
var eo = {
	DATA: V.DATA,
	RCDATA: V.RCDATA,
	RAWTEXT: V.RAWTEXT,
	SCRIPT_DATA: V.SCRIPT_DATA,
	PLAINTEXT: V.PLAINTEXT,
	CDATA_SECTION: V.CDATA_SECTION
};
function to(e) {
	return e >= P.DIGIT_0 && e <= P.DIGIT_9;
}
function no(e) {
	return e >= P.LATIN_CAPITAL_A && e <= P.LATIN_CAPITAL_Z;
}
function ro(e) {
	return e >= P.LATIN_SMALL_A && e <= P.LATIN_SMALL_Z;
}
function io(e) {
	return ro(e) || no(e);
}
function ao(e) {
	return io(e) || to(e);
}
function oo(e) {
	return e + 32;
}
function so(e) {
	return e === P.SPACE || e === P.LINE_FEED || e === P.TABULATION || e === P.FORM_FEED;
}
function co(e) {
	return so(e) || e === P.SOLIDUS || e === P.GREATER_THAN_SIGN;
}
function lo(e) {
	return e === P.NULL ? F.nullCharacterReference : e > 1114111 ? F.characterReferenceOutsideUnicodeRange : Ea(e) ? F.surrogateCharacterReference : Aa(e) ? F.noncharacterCharacterReference : ka(e) || e === P.CARRIAGE_RETURN ? F.controlCharacterReference : null;
}
var uo = class {
	constructor(e, t) {
		this.options = e, this.handler = t, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = V.DATA, this.returnState = V.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = {
			name: "",
			value: ""
		}, this.preprocessor = new Ma(t), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new Ka(Pa, (e, t) => {
			this.preprocessor.pos = this.entityStartPos + t - 1, this._flushCodePointConsumedAsCharacterReference(e);
		}, t.onParseError ? {
			missingSemicolonAfterCharacterReference: () => {
				this._err(F.missingSemicolonAfterCharacterReference, 1);
			},
			absenceOfDigitsInNumericCharacterReference: (e) => {
				this._err(F.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + e);
			},
			validateNumericCharacterReference: (e) => {
				let t = lo(e);
				t && this._err(t, 1);
			}
		} : void 0);
	}
	_err(e, t = 0) {
		var n, r;
		(r = (n = this.handler).onParseError) == null || r.call(n, this.preprocessor.getError(e, t));
	}
	getCurrentLocation(e) {
		return this.options.sourceCodeLocationInfo ? {
			startLine: this.preprocessor.line,
			startCol: this.preprocessor.col - e,
			startOffset: this.preprocessor.offset - e,
			endLine: -1,
			endCol: -1,
			endOffset: -1
		} : null;
	}
	_runParsingLoop() {
		if (!this.inLoop) {
			for (this.inLoop = !0; this.active && !this.paused;) {
				this.consumedAfterSnapshot = 0;
				let e = this._consume();
				this._ensureHibernation() || this._callState(e);
			}
			this.inLoop = !1;
		}
	}
	pause() {
		this.paused = !0;
	}
	resume(e) {
		if (!this.paused) throw Error("Parser was already resumed");
		this.paused = !1, !this.inLoop && (this._runParsingLoop(), this.paused || e?.());
	}
	write(e, t, n) {
		this.active = !0, this.preprocessor.write(e, t), this._runParsingLoop(), this.paused || n?.();
	}
	insertHtmlAtCurrentPos(e) {
		this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(e), this._runParsingLoop();
	}
	_ensureHibernation() {
		return this.preprocessor.endOfChunkHit ? (this.preprocessor.retreat(this.consumedAfterSnapshot), this.consumedAfterSnapshot = 0, this.active = !1, !0) : !1;
	}
	_consume() {
		return this.consumedAfterSnapshot++, this.preprocessor.advance();
	}
	_advanceBy(e) {
		this.consumedAfterSnapshot += e;
		for (let t = 0; t < e; t++) this.preprocessor.advance();
	}
	_consumeSequenceIfMatch(e, t) {
		return this.preprocessor.startsWith(e, t) ? (this._advanceBy(e.length - 1), !0) : !1;
	}
	_createStartTagToken() {
		this.currentToken = {
			type: I.START_TAG,
			tagName: "",
			tagID: z.UNKNOWN,
			selfClosing: !1,
			ackSelfClosing: !1,
			attrs: [],
			location: this.getCurrentLocation(1)
		};
	}
	_createEndTagToken() {
		this.currentToken = {
			type: I.END_TAG,
			tagName: "",
			tagID: z.UNKNOWN,
			selfClosing: !1,
			ackSelfClosing: !1,
			attrs: [],
			location: this.getCurrentLocation(2)
		};
	}
	_createCommentToken(e) {
		this.currentToken = {
			type: I.COMMENT,
			data: "",
			location: this.getCurrentLocation(e)
		};
	}
	_createDoctypeToken(e) {
		this.currentToken = {
			type: I.DOCTYPE,
			name: e,
			forceQuirks: !1,
			publicId: null,
			systemId: null,
			location: this.currentLocation
		};
	}
	_createCharacterToken(e, t) {
		this.currentCharacterToken = {
			type: e,
			chars: t,
			location: this.currentLocation
		};
	}
	_createAttr(e) {
		this.currentAttr = {
			name: e,
			value: ""
		}, this.currentLocation = this.getCurrentLocation(0);
	}
	_leaveAttrName() {
		var e;
		let t = this.currentToken;
		if (Na(t, this.currentAttr.name) === null) {
			if (t.attrs.push(this.currentAttr), t.location && this.currentLocation) {
				let n = (e = t.location).attrs ?? (e.attrs = Object.create(null));
				n[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
			}
		} else this._err(F.duplicateAttribute);
	}
	_leaveAttrValue() {
		this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line, this.currentLocation.endCol = this.preprocessor.col, this.currentLocation.endOffset = this.preprocessor.offset);
	}
	prepareToken(e) {
		this._emitCurrentCharacterToken(e.location), this.currentToken = null, e.location && (e.location.endLine = this.preprocessor.line, e.location.endCol = this.preprocessor.col + 1, e.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
	}
	emitCurrentTagToken() {
		let e = this.currentToken;
		this.prepareToken(e), e.tagID = Za(e.tagName), e.type === I.START_TAG ? (this.lastStartTagName = e.tagName, this.handler.onStartTag(e)) : (e.attrs.length > 0 && this._err(F.endTagWithAttributes), e.selfClosing && this._err(F.endTagWithTrailingSolidus), this.handler.onEndTag(e)), this.preprocessor.dropParsedChunk();
	}
	emitCurrentComment(e) {
		this.prepareToken(e), this.handler.onComment(e), this.preprocessor.dropParsedChunk();
	}
	emitCurrentDoctype(e) {
		this.prepareToken(e), this.handler.onDoctype(e), this.preprocessor.dropParsedChunk();
	}
	_emitCurrentCharacterToken(e) {
		if (this.currentCharacterToken) {
			switch (e && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = e.startLine, this.currentCharacterToken.location.endCol = e.startCol, this.currentCharacterToken.location.endOffset = e.startOffset), this.currentCharacterToken.type) {
				case I.CHARACTER:
					this.handler.onCharacter(this.currentCharacterToken);
					break;
				case I.NULL_CHARACTER:
					this.handler.onNullCharacter(this.currentCharacterToken);
					break;
				case I.WHITESPACE_CHARACTER: this.handler.onWhitespaceCharacter(this.currentCharacterToken);
			}
			this.currentCharacterToken = null;
		}
	}
	_emitEOFToken() {
		let e = this.getCurrentLocation(0);
		e && (e.endLine = e.startLine, e.endCol = e.startCol, e.endOffset = e.startOffset), this._emitCurrentCharacterToken(e), this.handler.onEof({
			type: I.EOF,
			location: e
		}), this.active = !1;
	}
	_appendCharToCurrentCharacterToken(e, t) {
		if (this.currentCharacterToken) {
			if (this.currentCharacterToken.type === e) {
				this.currentCharacterToken.chars += t;
				return;
			}
			this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
		}
		this._createCharacterToken(e, t);
	}
	_emitCodePoint(e) {
		let t = so(e) ? I.WHITESPACE_CHARACTER : e === P.NULL ? I.NULL_CHARACTER : I.CHARACTER;
		this._appendCharToCurrentCharacterToken(t, String.fromCodePoint(e));
	}
	_emitChars(e) {
		this._appendCharToCurrentCharacterToken(I.CHARACTER, e);
	}
	_startCharacterReference() {
		this.returnState = this.state, this.state = V.CHARACTER_REFERENCE, this.entityStartPos = this.preprocessor.pos, this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? Ga.Attribute : Ga.Legacy);
	}
	_isCharacterReferenceInAttribute() {
		return this.returnState === V.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === V.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === V.ATTRIBUTE_VALUE_UNQUOTED;
	}
	_flushCodePointConsumedAsCharacterReference(e) {
		this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(e) : this._emitCodePoint(e);
	}
	_callState(e) {
		switch (this.state) {
			case V.DATA:
				this._stateData(e);
				break;
			case V.RCDATA:
				this._stateRcdata(e);
				break;
			case V.RAWTEXT:
				this._stateRawtext(e);
				break;
			case V.SCRIPT_DATA:
				this._stateScriptData(e);
				break;
			case V.PLAINTEXT:
				this._statePlaintext(e);
				break;
			case V.TAG_OPEN:
				this._stateTagOpen(e);
				break;
			case V.END_TAG_OPEN:
				this._stateEndTagOpen(e);
				break;
			case V.TAG_NAME:
				this._stateTagName(e);
				break;
			case V.RCDATA_LESS_THAN_SIGN:
				this._stateRcdataLessThanSign(e);
				break;
			case V.RCDATA_END_TAG_OPEN:
				this._stateRcdataEndTagOpen(e);
				break;
			case V.RCDATA_END_TAG_NAME:
				this._stateRcdataEndTagName(e);
				break;
			case V.RAWTEXT_LESS_THAN_SIGN:
				this._stateRawtextLessThanSign(e);
				break;
			case V.RAWTEXT_END_TAG_OPEN:
				this._stateRawtextEndTagOpen(e);
				break;
			case V.RAWTEXT_END_TAG_NAME:
				this._stateRawtextEndTagName(e);
				break;
			case V.SCRIPT_DATA_LESS_THAN_SIGN:
				this._stateScriptDataLessThanSign(e);
				break;
			case V.SCRIPT_DATA_END_TAG_OPEN:
				this._stateScriptDataEndTagOpen(e);
				break;
			case V.SCRIPT_DATA_END_TAG_NAME:
				this._stateScriptDataEndTagName(e);
				break;
			case V.SCRIPT_DATA_ESCAPE_START:
				this._stateScriptDataEscapeStart(e);
				break;
			case V.SCRIPT_DATA_ESCAPE_START_DASH:
				this._stateScriptDataEscapeStartDash(e);
				break;
			case V.SCRIPT_DATA_ESCAPED:
				this._stateScriptDataEscaped(e);
				break;
			case V.SCRIPT_DATA_ESCAPED_DASH:
				this._stateScriptDataEscapedDash(e);
				break;
			case V.SCRIPT_DATA_ESCAPED_DASH_DASH:
				this._stateScriptDataEscapedDashDash(e);
				break;
			case V.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
				this._stateScriptDataEscapedLessThanSign(e);
				break;
			case V.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
				this._stateScriptDataEscapedEndTagOpen(e);
				break;
			case V.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
				this._stateScriptDataEscapedEndTagName(e);
				break;
			case V.SCRIPT_DATA_DOUBLE_ESCAPE_START:
				this._stateScriptDataDoubleEscapeStart(e);
				break;
			case V.SCRIPT_DATA_DOUBLE_ESCAPED:
				this._stateScriptDataDoubleEscaped(e);
				break;
			case V.SCRIPT_DATA_DOUBLE_ESCAPED_DASH:
				this._stateScriptDataDoubleEscapedDash(e);
				break;
			case V.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH:
				this._stateScriptDataDoubleEscapedDashDash(e);
				break;
			case V.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN:
				this._stateScriptDataDoubleEscapedLessThanSign(e);
				break;
			case V.SCRIPT_DATA_DOUBLE_ESCAPE_END:
				this._stateScriptDataDoubleEscapeEnd(e);
				break;
			case V.BEFORE_ATTRIBUTE_NAME:
				this._stateBeforeAttributeName(e);
				break;
			case V.ATTRIBUTE_NAME:
				this._stateAttributeName(e);
				break;
			case V.AFTER_ATTRIBUTE_NAME:
				this._stateAfterAttributeName(e);
				break;
			case V.BEFORE_ATTRIBUTE_VALUE:
				this._stateBeforeAttributeValue(e);
				break;
			case V.ATTRIBUTE_VALUE_DOUBLE_QUOTED:
				this._stateAttributeValueDoubleQuoted(e);
				break;
			case V.ATTRIBUTE_VALUE_SINGLE_QUOTED:
				this._stateAttributeValueSingleQuoted(e);
				break;
			case V.ATTRIBUTE_VALUE_UNQUOTED:
				this._stateAttributeValueUnquoted(e);
				break;
			case V.AFTER_ATTRIBUTE_VALUE_QUOTED:
				this._stateAfterAttributeValueQuoted(e);
				break;
			case V.SELF_CLOSING_START_TAG:
				this._stateSelfClosingStartTag(e);
				break;
			case V.BOGUS_COMMENT:
				this._stateBogusComment(e);
				break;
			case V.MARKUP_DECLARATION_OPEN:
				this._stateMarkupDeclarationOpen(e);
				break;
			case V.COMMENT_START:
				this._stateCommentStart(e);
				break;
			case V.COMMENT_START_DASH:
				this._stateCommentStartDash(e);
				break;
			case V.COMMENT:
				this._stateComment(e);
				break;
			case V.COMMENT_LESS_THAN_SIGN:
				this._stateCommentLessThanSign(e);
				break;
			case V.COMMENT_LESS_THAN_SIGN_BANG:
				this._stateCommentLessThanSignBang(e);
				break;
			case V.COMMENT_LESS_THAN_SIGN_BANG_DASH:
				this._stateCommentLessThanSignBangDash(e);
				break;
			case V.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:
				this._stateCommentLessThanSignBangDashDash(e);
				break;
			case V.COMMENT_END_DASH:
				this._stateCommentEndDash(e);
				break;
			case V.COMMENT_END:
				this._stateCommentEnd(e);
				break;
			case V.COMMENT_END_BANG:
				this._stateCommentEndBang(e);
				break;
			case V.DOCTYPE:
				this._stateDoctype(e);
				break;
			case V.BEFORE_DOCTYPE_NAME:
				this._stateBeforeDoctypeName(e);
				break;
			case V.DOCTYPE_NAME:
				this._stateDoctypeName(e);
				break;
			case V.AFTER_DOCTYPE_NAME:
				this._stateAfterDoctypeName(e);
				break;
			case V.AFTER_DOCTYPE_PUBLIC_KEYWORD:
				this._stateAfterDoctypePublicKeyword(e);
				break;
			case V.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER:
				this._stateBeforeDoctypePublicIdentifier(e);
				break;
			case V.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED:
				this._stateDoctypePublicIdentifierDoubleQuoted(e);
				break;
			case V.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED:
				this._stateDoctypePublicIdentifierSingleQuoted(e);
				break;
			case V.AFTER_DOCTYPE_PUBLIC_IDENTIFIER:
				this._stateAfterDoctypePublicIdentifier(e);
				break;
			case V.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS:
				this._stateBetweenDoctypePublicAndSystemIdentifiers(e);
				break;
			case V.AFTER_DOCTYPE_SYSTEM_KEYWORD:
				this._stateAfterDoctypeSystemKeyword(e);
				break;
			case V.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER:
				this._stateBeforeDoctypeSystemIdentifier(e);
				break;
			case V.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED:
				this._stateDoctypeSystemIdentifierDoubleQuoted(e);
				break;
			case V.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED:
				this._stateDoctypeSystemIdentifierSingleQuoted(e);
				break;
			case V.AFTER_DOCTYPE_SYSTEM_IDENTIFIER:
				this._stateAfterDoctypeSystemIdentifier(e);
				break;
			case V.BOGUS_DOCTYPE:
				this._stateBogusDoctype(e);
				break;
			case V.CDATA_SECTION:
				this._stateCdataSection(e);
				break;
			case V.CDATA_SECTION_BRACKET:
				this._stateCdataSectionBracket(e);
				break;
			case V.CDATA_SECTION_END:
				this._stateCdataSectionEnd(e);
				break;
			case V.CHARACTER_REFERENCE:
				this._stateCharacterReference();
				break;
			case V.AMBIGUOUS_AMPERSAND:
				this._stateAmbiguousAmpersand(e);
				break;
			default: throw Error("Unknown state");
		}
	}
	_stateData(e) {
		switch (e) {
			case P.LESS_THAN_SIGN:
				this.state = V.TAG_OPEN;
				break;
			case P.AMPERSAND:
				this._startCharacterReference();
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this._emitCodePoint(e);
				break;
			case P.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateRcdata(e) {
		switch (e) {
			case P.AMPERSAND:
				this._startCharacterReference();
				break;
			case P.LESS_THAN_SIGN:
				this.state = V.RCDATA_LESS_THAN_SIGN;
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this._emitChars("�");
				break;
			case P.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateRawtext(e) {
		switch (e) {
			case P.LESS_THAN_SIGN:
				this.state = V.RAWTEXT_LESS_THAN_SIGN;
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this._emitChars("�");
				break;
			case P.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateScriptData(e) {
		switch (e) {
			case P.LESS_THAN_SIGN:
				this.state = V.SCRIPT_DATA_LESS_THAN_SIGN;
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this._emitChars("�");
				break;
			case P.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_statePlaintext(e) {
		switch (e) {
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this._emitChars("�");
				break;
			case P.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateTagOpen(e) {
		if (io(e)) this._createStartTagToken(), this.state = V.TAG_NAME, this._stateTagName(e);
		else switch (e) {
			case P.EXCLAMATION_MARK:
				this.state = V.MARKUP_DECLARATION_OPEN;
				break;
			case P.SOLIDUS:
				this.state = V.END_TAG_OPEN;
				break;
			case P.QUESTION_MARK:
				this._err(F.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = V.BOGUS_COMMENT, this._stateBogusComment(e);
				break;
			case P.EOF:
				this._err(F.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
				break;
			default: this._err(F.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = V.DATA, this._stateData(e);
		}
	}
	_stateEndTagOpen(e) {
		if (io(e)) this._createEndTagToken(), this.state = V.TAG_NAME, this._stateTagName(e);
		else switch (e) {
			case P.GREATER_THAN_SIGN:
				this._err(F.missingEndTagName), this.state = V.DATA;
				break;
			case P.EOF:
				this._err(F.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
				break;
			default: this._err(F.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = V.BOGUS_COMMENT, this._stateBogusComment(e);
		}
	}
	_stateTagName(e) {
		let t = this.currentToken;
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED:
				this.state = V.BEFORE_ATTRIBUTE_NAME;
				break;
			case P.SOLIDUS:
				this.state = V.SELF_CLOSING_START_TAG;
				break;
			case P.GREATER_THAN_SIGN:
				this.state = V.DATA, this.emitCurrentTagToken();
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), t.tagName += "�";
				break;
			case P.EOF:
				this._err(F.eofInTag), this._emitEOFToken();
				break;
			default: t.tagName += String.fromCodePoint(no(e) ? oo(e) : e);
		}
	}
	_stateRcdataLessThanSign(e) {
		e === P.SOLIDUS ? this.state = V.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = V.RCDATA, this._stateRcdata(e));
	}
	_stateRcdataEndTagOpen(e) {
		io(e) ? (this.state = V.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(e)) : (this._emitChars("</"), this.state = V.RCDATA, this._stateRcdata(e));
	}
	handleSpecialEndTag(e) {
		if (!this.preprocessor.startsWith(this.lastStartTagName, !1)) return !this._ensureHibernation();
		this._createEndTagToken();
		let t = this.currentToken;
		switch (t.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED: return this._advanceBy(this.lastStartTagName.length), this.state = V.BEFORE_ATTRIBUTE_NAME, !1;
			case P.SOLIDUS: return this._advanceBy(this.lastStartTagName.length), this.state = V.SELF_CLOSING_START_TAG, !1;
			case P.GREATER_THAN_SIGN: return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = V.DATA, !1;
			default: return !this._ensureHibernation();
		}
	}
	_stateRcdataEndTagName(e) {
		this.handleSpecialEndTag(e) && (this._emitChars("</"), this.state = V.RCDATA, this._stateRcdata(e));
	}
	_stateRawtextLessThanSign(e) {
		e === P.SOLIDUS ? this.state = V.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = V.RAWTEXT, this._stateRawtext(e));
	}
	_stateRawtextEndTagOpen(e) {
		io(e) ? (this.state = V.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(e)) : (this._emitChars("</"), this.state = V.RAWTEXT, this._stateRawtext(e));
	}
	_stateRawtextEndTagName(e) {
		this.handleSpecialEndTag(e) && (this._emitChars("</"), this.state = V.RAWTEXT, this._stateRawtext(e));
	}
	_stateScriptDataLessThanSign(e) {
		switch (e) {
			case P.SOLIDUS:
				this.state = V.SCRIPT_DATA_END_TAG_OPEN;
				break;
			case P.EXCLAMATION_MARK:
				this.state = V.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
				break;
			default: this._emitChars("<"), this.state = V.SCRIPT_DATA, this._stateScriptData(e);
		}
	}
	_stateScriptDataEndTagOpen(e) {
		io(e) ? (this.state = V.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(e)) : (this._emitChars("</"), this.state = V.SCRIPT_DATA, this._stateScriptData(e));
	}
	_stateScriptDataEndTagName(e) {
		this.handleSpecialEndTag(e) && (this._emitChars("</"), this.state = V.SCRIPT_DATA, this._stateScriptData(e));
	}
	_stateScriptDataEscapeStart(e) {
		e === P.HYPHEN_MINUS ? (this.state = V.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = V.SCRIPT_DATA, this._stateScriptData(e));
	}
	_stateScriptDataEscapeStartDash(e) {
		e === P.HYPHEN_MINUS ? (this.state = V.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = V.SCRIPT_DATA, this._stateScriptData(e));
	}
	_stateScriptDataEscaped(e) {
		switch (e) {
			case P.HYPHEN_MINUS:
				this.state = V.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
				break;
			case P.LESS_THAN_SIGN:
				this.state = V.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this._emitChars("�");
				break;
			case P.EOF:
				this._err(F.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateScriptDataEscapedDash(e) {
		switch (e) {
			case P.HYPHEN_MINUS:
				this.state = V.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
				break;
			case P.LESS_THAN_SIGN:
				this.state = V.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this.state = V.SCRIPT_DATA_ESCAPED, this._emitChars("�");
				break;
			case P.EOF:
				this._err(F.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this.state = V.SCRIPT_DATA_ESCAPED, this._emitCodePoint(e);
		}
	}
	_stateScriptDataEscapedDashDash(e) {
		switch (e) {
			case P.HYPHEN_MINUS:
				this._emitChars("-");
				break;
			case P.LESS_THAN_SIGN:
				this.state = V.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case P.GREATER_THAN_SIGN:
				this.state = V.SCRIPT_DATA, this._emitChars(">");
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this.state = V.SCRIPT_DATA_ESCAPED, this._emitChars("�");
				break;
			case P.EOF:
				this._err(F.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this.state = V.SCRIPT_DATA_ESCAPED, this._emitCodePoint(e);
		}
	}
	_stateScriptDataEscapedLessThanSign(e) {
		e === P.SOLIDUS ? this.state = V.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : io(e) ? (this._emitChars("<"), this.state = V.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(e)) : (this._emitChars("<"), this.state = V.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
	}
	_stateScriptDataEscapedEndTagOpen(e) {
		io(e) ? (this.state = V.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(e)) : (this._emitChars("</"), this.state = V.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
	}
	_stateScriptDataEscapedEndTagName(e) {
		this.handleSpecialEndTag(e) && (this._emitChars("</"), this.state = V.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
	}
	_stateScriptDataDoubleEscapeStart(e) {
		if (this.preprocessor.startsWith(Ta.SCRIPT, !1) && co(this.preprocessor.peek(Ta.SCRIPT.length))) {
			this._emitCodePoint(e);
			for (let e = 0; e < Ta.SCRIPT.length; e++) this._emitCodePoint(this._consume());
			this.state = V.SCRIPT_DATA_DOUBLE_ESCAPED;
		} else this._ensureHibernation() || (this.state = V.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
	}
	_stateScriptDataDoubleEscaped(e) {
		switch (e) {
			case P.HYPHEN_MINUS:
				this.state = V.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
				break;
			case P.LESS_THAN_SIGN:
				this.state = V.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this._emitChars("�");
				break;
			case P.EOF:
				this._err(F.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateScriptDataDoubleEscapedDash(e) {
		switch (e) {
			case P.HYPHEN_MINUS:
				this.state = V.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
				break;
			case P.LESS_THAN_SIGN:
				this.state = V.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this.state = V.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars("�");
				break;
			case P.EOF:
				this._err(F.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this.state = V.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(e);
		}
	}
	_stateScriptDataDoubleEscapedDashDash(e) {
		switch (e) {
			case P.HYPHEN_MINUS:
				this._emitChars("-");
				break;
			case P.LESS_THAN_SIGN:
				this.state = V.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
				break;
			case P.GREATER_THAN_SIGN:
				this.state = V.SCRIPT_DATA, this._emitChars(">");
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this.state = V.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars("�");
				break;
			case P.EOF:
				this._err(F.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this.state = V.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(e);
		}
	}
	_stateScriptDataDoubleEscapedLessThanSign(e) {
		e === P.SOLIDUS ? (this.state = V.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = V.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(e));
	}
	_stateScriptDataDoubleEscapeEnd(e) {
		if (this.preprocessor.startsWith(Ta.SCRIPT, !1) && co(this.preprocessor.peek(Ta.SCRIPT.length))) {
			this._emitCodePoint(e);
			for (let e = 0; e < Ta.SCRIPT.length; e++) this._emitCodePoint(this._consume());
			this.state = V.SCRIPT_DATA_ESCAPED;
		} else this._ensureHibernation() || (this.state = V.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(e));
	}
	_stateBeforeAttributeName(e) {
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED: break;
			case P.SOLIDUS:
			case P.GREATER_THAN_SIGN:
			case P.EOF:
				this.state = V.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(e);
				break;
			case P.EQUALS_SIGN:
				this._err(F.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = V.ATTRIBUTE_NAME;
				break;
			default: this._createAttr(""), this.state = V.ATTRIBUTE_NAME, this._stateAttributeName(e);
		}
	}
	_stateAttributeName(e) {
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED:
			case P.SOLIDUS:
			case P.GREATER_THAN_SIGN:
			case P.EOF:
				this._leaveAttrName(), this.state = V.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(e);
				break;
			case P.EQUALS_SIGN:
				this._leaveAttrName(), this.state = V.BEFORE_ATTRIBUTE_VALUE;
				break;
			case P.QUOTATION_MARK:
			case P.APOSTROPHE:
			case P.LESS_THAN_SIGN:
				this._err(F.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(e);
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this.currentAttr.name += "�";
				break;
			default: this.currentAttr.name += String.fromCodePoint(no(e) ? oo(e) : e);
		}
	}
	_stateAfterAttributeName(e) {
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED: break;
			case P.SOLIDUS:
				this.state = V.SELF_CLOSING_START_TAG;
				break;
			case P.EQUALS_SIGN:
				this.state = V.BEFORE_ATTRIBUTE_VALUE;
				break;
			case P.GREATER_THAN_SIGN:
				this.state = V.DATA, this.emitCurrentTagToken();
				break;
			case P.EOF:
				this._err(F.eofInTag), this._emitEOFToken();
				break;
			default: this._createAttr(""), this.state = V.ATTRIBUTE_NAME, this._stateAttributeName(e);
		}
	}
	_stateBeforeAttributeValue(e) {
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED: break;
			case P.QUOTATION_MARK:
				this.state = V.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
				break;
			case P.APOSTROPHE:
				this.state = V.ATTRIBUTE_VALUE_SINGLE_QUOTED;
				break;
			case P.GREATER_THAN_SIGN:
				this._err(F.missingAttributeValue), this.state = V.DATA, this.emitCurrentTagToken();
				break;
			default: this.state = V.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(e);
		}
	}
	_stateAttributeValueDoubleQuoted(e) {
		switch (e) {
			case P.QUOTATION_MARK:
				this.state = V.AFTER_ATTRIBUTE_VALUE_QUOTED;
				break;
			case P.AMPERSAND:
				this._startCharacterReference();
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this.currentAttr.value += "�";
				break;
			case P.EOF:
				this._err(F.eofInTag), this._emitEOFToken();
				break;
			default: this.currentAttr.value += String.fromCodePoint(e);
		}
	}
	_stateAttributeValueSingleQuoted(e) {
		switch (e) {
			case P.APOSTROPHE:
				this.state = V.AFTER_ATTRIBUTE_VALUE_QUOTED;
				break;
			case P.AMPERSAND:
				this._startCharacterReference();
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this.currentAttr.value += "�";
				break;
			case P.EOF:
				this._err(F.eofInTag), this._emitEOFToken();
				break;
			default: this.currentAttr.value += String.fromCodePoint(e);
		}
	}
	_stateAttributeValueUnquoted(e) {
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED:
				this._leaveAttrValue(), this.state = V.BEFORE_ATTRIBUTE_NAME;
				break;
			case P.AMPERSAND:
				this._startCharacterReference();
				break;
			case P.GREATER_THAN_SIGN:
				this._leaveAttrValue(), this.state = V.DATA, this.emitCurrentTagToken();
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this.currentAttr.value += "�";
				break;
			case P.QUOTATION_MARK:
			case P.APOSTROPHE:
			case P.LESS_THAN_SIGN:
			case P.EQUALS_SIGN:
			case P.GRAVE_ACCENT:
				this._err(F.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(e);
				break;
			case P.EOF:
				this._err(F.eofInTag), this._emitEOFToken();
				break;
			default: this.currentAttr.value += String.fromCodePoint(e);
		}
	}
	_stateAfterAttributeValueQuoted(e) {
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED:
				this._leaveAttrValue(), this.state = V.BEFORE_ATTRIBUTE_NAME;
				break;
			case P.SOLIDUS:
				this._leaveAttrValue(), this.state = V.SELF_CLOSING_START_TAG;
				break;
			case P.GREATER_THAN_SIGN:
				this._leaveAttrValue(), this.state = V.DATA, this.emitCurrentTagToken();
				break;
			case P.EOF:
				this._err(F.eofInTag), this._emitEOFToken();
				break;
			default: this._err(F.missingWhitespaceBetweenAttributes), this.state = V.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(e);
		}
	}
	_stateSelfClosingStartTag(e) {
		switch (e) {
			case P.GREATER_THAN_SIGN: {
				let e = this.currentToken;
				e.selfClosing = !0, this.state = V.DATA, this.emitCurrentTagToken();
				break;
			}
			case P.EOF:
				this._err(F.eofInTag), this._emitEOFToken();
				break;
			default: this._err(F.unexpectedSolidusInTag), this.state = V.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(e);
		}
	}
	_stateBogusComment(e) {
		let t = this.currentToken;
		switch (e) {
			case P.GREATER_THAN_SIGN:
				this.state = V.DATA, this.emitCurrentComment(t);
				break;
			case P.EOF:
				this.emitCurrentComment(t), this._emitEOFToken();
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), t.data += "�";
				break;
			default: t.data += String.fromCodePoint(e);
		}
	}
	_stateMarkupDeclarationOpen(e) {
		this._consumeSequenceIfMatch(Ta.DASH_DASH, !0) ? (this._createCommentToken(Ta.DASH_DASH.length + 1), this.state = V.COMMENT_START) : this._consumeSequenceIfMatch(Ta.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(Ta.DOCTYPE.length + 1), this.state = V.DOCTYPE) : this._consumeSequenceIfMatch(Ta.CDATA_START, !0) ? this.inForeignNode ? this.state = V.CDATA_SECTION : (this._err(F.cdataInHtmlContent), this._createCommentToken(Ta.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = V.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(F.incorrectlyOpenedComment), this._createCommentToken(2), this.state = V.BOGUS_COMMENT, this._stateBogusComment(e));
	}
	_stateCommentStart(e) {
		switch (e) {
			case P.HYPHEN_MINUS:
				this.state = V.COMMENT_START_DASH;
				break;
			case P.GREATER_THAN_SIGN: {
				this._err(F.abruptClosingOfEmptyComment), this.state = V.DATA;
				let e = this.currentToken;
				this.emitCurrentComment(e);
				break;
			}
			default: this.state = V.COMMENT, this._stateComment(e);
		}
	}
	_stateCommentStartDash(e) {
		let t = this.currentToken;
		switch (e) {
			case P.HYPHEN_MINUS:
				this.state = V.COMMENT_END;
				break;
			case P.GREATER_THAN_SIGN:
				this._err(F.abruptClosingOfEmptyComment), this.state = V.DATA, this.emitCurrentComment(t);
				break;
			case P.EOF:
				this._err(F.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
				break;
			default: t.data += "-", this.state = V.COMMENT, this._stateComment(e);
		}
	}
	_stateComment(e) {
		let t = this.currentToken;
		switch (e) {
			case P.HYPHEN_MINUS:
				this.state = V.COMMENT_END_DASH;
				break;
			case P.LESS_THAN_SIGN:
				t.data += "<", this.state = V.COMMENT_LESS_THAN_SIGN;
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), t.data += "�";
				break;
			case P.EOF:
				this._err(F.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
				break;
			default: t.data += String.fromCodePoint(e);
		}
	}
	_stateCommentLessThanSign(e) {
		let t = this.currentToken;
		switch (e) {
			case P.EXCLAMATION_MARK:
				t.data += "!", this.state = V.COMMENT_LESS_THAN_SIGN_BANG;
				break;
			case P.LESS_THAN_SIGN:
				t.data += "<";
				break;
			default: this.state = V.COMMENT, this._stateComment(e);
		}
	}
	_stateCommentLessThanSignBang(e) {
		e === P.HYPHEN_MINUS ? this.state = V.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = V.COMMENT, this._stateComment(e));
	}
	_stateCommentLessThanSignBangDash(e) {
		e === P.HYPHEN_MINUS ? this.state = V.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = V.COMMENT_END_DASH, this._stateCommentEndDash(e));
	}
	_stateCommentLessThanSignBangDashDash(e) {
		e !== P.GREATER_THAN_SIGN && e !== P.EOF && this._err(F.nestedComment), this.state = V.COMMENT_END, this._stateCommentEnd(e);
	}
	_stateCommentEndDash(e) {
		let t = this.currentToken;
		switch (e) {
			case P.HYPHEN_MINUS:
				this.state = V.COMMENT_END;
				break;
			case P.EOF:
				this._err(F.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
				break;
			default: t.data += "-", this.state = V.COMMENT, this._stateComment(e);
		}
	}
	_stateCommentEnd(e) {
		let t = this.currentToken;
		switch (e) {
			case P.GREATER_THAN_SIGN:
				this.state = V.DATA, this.emitCurrentComment(t);
				break;
			case P.EXCLAMATION_MARK:
				this.state = V.COMMENT_END_BANG;
				break;
			case P.HYPHEN_MINUS:
				t.data += "-";
				break;
			case P.EOF:
				this._err(F.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
				break;
			default: t.data += "--", this.state = V.COMMENT, this._stateComment(e);
		}
	}
	_stateCommentEndBang(e) {
		let t = this.currentToken;
		switch (e) {
			case P.HYPHEN_MINUS:
				t.data += "--!", this.state = V.COMMENT_END_DASH;
				break;
			case P.GREATER_THAN_SIGN:
				this._err(F.incorrectlyClosedComment), this.state = V.DATA, this.emitCurrentComment(t);
				break;
			case P.EOF:
				this._err(F.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
				break;
			default: t.data += "--!", this.state = V.COMMENT, this._stateComment(e);
		}
	}
	_stateDoctype(e) {
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED:
				this.state = V.BEFORE_DOCTYPE_NAME;
				break;
			case P.GREATER_THAN_SIGN:
				this.state = V.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(e);
				break;
			case P.EOF: {
				this._err(F.eofInDoctype), this._createDoctypeToken(null);
				let e = this.currentToken;
				e.forceQuirks = !0, this.emitCurrentDoctype(e), this._emitEOFToken();
				break;
			}
			default: this._err(F.missingWhitespaceBeforeDoctypeName), this.state = V.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(e);
		}
	}
	_stateBeforeDoctypeName(e) {
		if (no(e)) this._createDoctypeToken(String.fromCharCode(oo(e))), this.state = V.DOCTYPE_NAME;
		else switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED: break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), this._createDoctypeToken("�"), this.state = V.DOCTYPE_NAME;
				break;
			case P.GREATER_THAN_SIGN: {
				this._err(F.missingDoctypeName), this._createDoctypeToken(null);
				let e = this.currentToken;
				e.forceQuirks = !0, this.emitCurrentDoctype(e), this.state = V.DATA;
				break;
			}
			case P.EOF: {
				this._err(F.eofInDoctype), this._createDoctypeToken(null);
				let e = this.currentToken;
				e.forceQuirks = !0, this.emitCurrentDoctype(e), this._emitEOFToken();
				break;
			}
			default: this._createDoctypeToken(String.fromCodePoint(e)), this.state = V.DOCTYPE_NAME;
		}
	}
	_stateDoctypeName(e) {
		let t = this.currentToken;
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED:
				this.state = V.AFTER_DOCTYPE_NAME;
				break;
			case P.GREATER_THAN_SIGN:
				this.state = V.DATA, this.emitCurrentDoctype(t);
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), t.name += "�";
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: t.name += String.fromCodePoint(no(e) ? oo(e) : e);
		}
	}
	_stateAfterDoctypeName(e) {
		let t = this.currentToken;
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED: break;
			case P.GREATER_THAN_SIGN:
				this.state = V.DATA, this.emitCurrentDoctype(t);
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._consumeSequenceIfMatch(Ta.PUBLIC, !1) ? this.state = V.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(Ta.SYSTEM, !1) ? this.state = V.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(F.invalidCharacterSequenceAfterDoctypeName), t.forceQuirks = !0, this.state = V.BOGUS_DOCTYPE, this._stateBogusDoctype(e));
		}
	}
	_stateAfterDoctypePublicKeyword(e) {
		let t = this.currentToken;
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED:
				this.state = V.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case P.QUOTATION_MARK:
				this._err(F.missingWhitespaceAfterDoctypePublicKeyword), t.publicId = "", this.state = V.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case P.APOSTROPHE:
				this._err(F.missingWhitespaceAfterDoctypePublicKeyword), t.publicId = "", this.state = V.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
				break;
			case P.GREATER_THAN_SIGN:
				this._err(F.missingDoctypePublicIdentifier), t.forceQuirks = !0, this.state = V.DATA, this.emitCurrentDoctype(t);
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(F.missingQuoteBeforeDoctypePublicIdentifier), t.forceQuirks = !0, this.state = V.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateBeforeDoctypePublicIdentifier(e) {
		let t = this.currentToken;
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED: break;
			case P.QUOTATION_MARK:
				t.publicId = "", this.state = V.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case P.APOSTROPHE:
				t.publicId = "", this.state = V.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
				break;
			case P.GREATER_THAN_SIGN:
				this._err(F.missingDoctypePublicIdentifier), t.forceQuirks = !0, this.state = V.DATA, this.emitCurrentDoctype(t);
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(F.missingQuoteBeforeDoctypePublicIdentifier), t.forceQuirks = !0, this.state = V.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateDoctypePublicIdentifierDoubleQuoted(e) {
		let t = this.currentToken;
		switch (e) {
			case P.QUOTATION_MARK:
				this.state = V.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), t.publicId += "�";
				break;
			case P.GREATER_THAN_SIGN:
				this._err(F.abruptDoctypePublicIdentifier), t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = V.DATA;
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: t.publicId += String.fromCodePoint(e);
		}
	}
	_stateDoctypePublicIdentifierSingleQuoted(e) {
		let t = this.currentToken;
		switch (e) {
			case P.APOSTROPHE:
				this.state = V.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), t.publicId += "�";
				break;
			case P.GREATER_THAN_SIGN:
				this._err(F.abruptDoctypePublicIdentifier), t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = V.DATA;
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: t.publicId += String.fromCodePoint(e);
		}
	}
	_stateAfterDoctypePublicIdentifier(e) {
		let t = this.currentToken;
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED:
				this.state = V.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
				break;
			case P.GREATER_THAN_SIGN:
				this.state = V.DATA, this.emitCurrentDoctype(t);
				break;
			case P.QUOTATION_MARK:
				this._err(F.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), t.systemId = "", this.state = V.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case P.APOSTROPHE:
				this._err(F.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), t.systemId = "", this.state = V.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(F.missingQuoteBeforeDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = V.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateBetweenDoctypePublicAndSystemIdentifiers(e) {
		let t = this.currentToken;
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED: break;
			case P.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(t), this.state = V.DATA;
				break;
			case P.QUOTATION_MARK:
				t.systemId = "", this.state = V.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case P.APOSTROPHE:
				t.systemId = "", this.state = V.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(F.missingQuoteBeforeDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = V.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateAfterDoctypeSystemKeyword(e) {
		let t = this.currentToken;
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED:
				this.state = V.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case P.QUOTATION_MARK:
				this._err(F.missingWhitespaceAfterDoctypeSystemKeyword), t.systemId = "", this.state = V.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case P.APOSTROPHE:
				this._err(F.missingWhitespaceAfterDoctypeSystemKeyword), t.systemId = "", this.state = V.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case P.GREATER_THAN_SIGN:
				this._err(F.missingDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = V.DATA, this.emitCurrentDoctype(t);
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(F.missingQuoteBeforeDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = V.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateBeforeDoctypeSystemIdentifier(e) {
		let t = this.currentToken;
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED: break;
			case P.QUOTATION_MARK:
				t.systemId = "", this.state = V.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case P.APOSTROPHE:
				t.systemId = "", this.state = V.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case P.GREATER_THAN_SIGN:
				this._err(F.missingDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = V.DATA, this.emitCurrentDoctype(t);
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(F.missingQuoteBeforeDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = V.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateDoctypeSystemIdentifierDoubleQuoted(e) {
		let t = this.currentToken;
		switch (e) {
			case P.QUOTATION_MARK:
				this.state = V.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), t.systemId += "�";
				break;
			case P.GREATER_THAN_SIGN:
				this._err(F.abruptDoctypeSystemIdentifier), t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = V.DATA;
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: t.systemId += String.fromCodePoint(e);
		}
	}
	_stateDoctypeSystemIdentifierSingleQuoted(e) {
		let t = this.currentToken;
		switch (e) {
			case P.APOSTROPHE:
				this.state = V.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter), t.systemId += "�";
				break;
			case P.GREATER_THAN_SIGN:
				this._err(F.abruptDoctypeSystemIdentifier), t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = V.DATA;
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: t.systemId += String.fromCodePoint(e);
		}
	}
	_stateAfterDoctypeSystemIdentifier(e) {
		let t = this.currentToken;
		switch (e) {
			case P.SPACE:
			case P.LINE_FEED:
			case P.TABULATION:
			case P.FORM_FEED: break;
			case P.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(t), this.state = V.DATA;
				break;
			case P.EOF:
				this._err(F.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(F.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = V.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateBogusDoctype(e) {
		let t = this.currentToken;
		switch (e) {
			case P.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(t), this.state = V.DATA;
				break;
			case P.NULL:
				this._err(F.unexpectedNullCharacter);
				break;
			case P.EOF: this.emitCurrentDoctype(t), this._emitEOFToken();
		}
	}
	_stateCdataSection(e) {
		switch (e) {
			case P.RIGHT_SQUARE_BRACKET:
				this.state = V.CDATA_SECTION_BRACKET;
				break;
			case P.EOF:
				this._err(F.eofInCdata), this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateCdataSectionBracket(e) {
		e === P.RIGHT_SQUARE_BRACKET ? this.state = V.CDATA_SECTION_END : (this._emitChars("]"), this.state = V.CDATA_SECTION, this._stateCdataSection(e));
	}
	_stateCdataSectionEnd(e) {
		switch (e) {
			case P.GREATER_THAN_SIGN:
				this.state = V.DATA;
				break;
			case P.RIGHT_SQUARE_BRACKET:
				this._emitChars("]");
				break;
			default: this._emitChars("]]"), this.state = V.CDATA_SECTION, this._stateCdataSection(e);
		}
	}
	_stateCharacterReference() {
		let e = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
		if (e < 0) {
			if (this.preprocessor.lastChunkWritten) e = this.entityDecoder.end();
			else {
				this.active = !1, this.preprocessor.pos = this.preprocessor.html.length - 1, this.consumedAfterSnapshot = 0, this.preprocessor.endOfChunkHit = !0;
				return;
			}
		}
		e === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(P.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && ao(this.preprocessor.peek(1)) ? V.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
	}
	_stateAmbiguousAmpersand(e) {
		ao(e) ? this._flushCodePointConsumedAsCharacterReference(e) : (e === P.SEMICOLON && this._err(F.unknownNamedCharacterReference), this.state = this.returnState, this._callState(e));
	}
}, fo = /* @__PURE__ */ new Set([
	z.DD,
	z.DT,
	z.LI,
	z.OPTGROUP,
	z.OPTION,
	z.P,
	z.RB,
	z.RP,
	z.RT,
	z.RTC
]), po = /* @__PURE__ */ new Set([
	...fo,
	z.CAPTION,
	z.COLGROUP,
	z.TBODY,
	z.TD,
	z.TFOOT,
	z.TH,
	z.THEAD,
	z.TR
]), mo = /* @__PURE__ */ new Set([
	z.APPLET,
	z.CAPTION,
	z.HTML,
	z.MARQUEE,
	z.OBJECT,
	z.TABLE,
	z.TD,
	z.TEMPLATE,
	z.TH
]), ho = /* @__PURE__ */ new Set([
	...mo,
	z.OL,
	z.UL
]), go = /* @__PURE__ */ new Set([...mo, z.BUTTON]), _o = /* @__PURE__ */ new Set([
	z.ANNOTATION_XML,
	z.MI,
	z.MN,
	z.MO,
	z.MS,
	z.MTEXT
]), vo = /* @__PURE__ */ new Set([
	z.DESC,
	z.FOREIGN_OBJECT,
	z.TITLE
]), yo = /* @__PURE__ */ new Set([
	z.TR,
	z.TEMPLATE,
	z.HTML
]), bo = /* @__PURE__ */ new Set([
	z.TBODY,
	z.TFOOT,
	z.THEAD,
	z.TEMPLATE,
	z.HTML
]), xo = /* @__PURE__ */ new Set([
	z.TABLE,
	z.TEMPLATE,
	z.HTML
]), So = /* @__PURE__ */ new Set([z.TD, z.TH]), Co = class {
	get currentTmplContentOrNode() {
		return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
	}
	constructor(e, t, n) {
		this.treeAdapter = t, this.handler = n, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = z.UNKNOWN, this.current = e;
	}
	_indexOf(e) {
		return this.items.lastIndexOf(e, this.stackTop);
	}
	_isInTemplate() {
		return this.currentTagId === z.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === L.HTML;
	}
	_updateCurrentElement() {
		this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
	}
	push(e, t) {
		this.stackTop++, this.items[this.stackTop] = e, this.current = e, this.tagIDs[this.stackTop] = t, this.currentTagId = t, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(e, t, !0);
	}
	pop() {
		let e = this.current;
		this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(e, !0);
	}
	replace(e, t) {
		let n = this._indexOf(e);
		this.items[n] = t, n === this.stackTop && (this.current = t);
	}
	insertAfter(e, t, n) {
		let r = this._indexOf(e) + 1;
		this.items.splice(r, 0, t), this.tagIDs.splice(r, 0, n), this.stackTop++, r === this.stackTop && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, r === this.stackTop);
	}
	popUntilTagNamePopped(e) {
		let t = this.stackTop + 1;
		do
			t = this.tagIDs.lastIndexOf(e, t - 1);
		while (t > 0 && this.treeAdapter.getNamespaceURI(this.items[t]) !== L.HTML);
		this.shortenToLength(Math.max(t, 0));
	}
	shortenToLength(e) {
		for (; this.stackTop >= e;) {
			let t = this.current;
			this.tmplCount > 0 && this._isInTemplate() && --this.tmplCount, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, this.stackTop < e);
		}
	}
	popUntilElementPopped(e) {
		let t = this._indexOf(e);
		this.shortenToLength(Math.max(t, 0));
	}
	popUntilPopped(e, t) {
		let n = this._indexOfTagNames(e, t);
		this.shortenToLength(Math.max(n, 0));
	}
	popUntilNumberedHeaderPopped() {
		this.popUntilPopped($a, L.HTML);
	}
	popUntilTableCellPopped() {
		this.popUntilPopped(So, L.HTML);
	}
	popAllUpToHtmlElement() {
		this.tmplCount = 0, this.shortenToLength(1);
	}
	_indexOfTagNames(e, t) {
		for (let n = this.stackTop; n >= 0; n--) if (e.has(this.tagIDs[n]) && this.treeAdapter.getNamespaceURI(this.items[n]) === t) return n;
		return -1;
	}
	clearBackTo(e, t) {
		let n = this._indexOfTagNames(e, t);
		this.shortenToLength(n + 1);
	}
	clearBackToTableContext() {
		this.clearBackTo(xo, L.HTML);
	}
	clearBackToTableBodyContext() {
		this.clearBackTo(bo, L.HTML);
	}
	clearBackToTableRowContext() {
		this.clearBackTo(yo, L.HTML);
	}
	remove(e) {
		let t = this._indexOf(e);
		t >= 0 && (t === this.stackTop ? this.pop() : (this.items.splice(t, 1), this.tagIDs.splice(t, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(e, !1)));
	}
	tryPeekProperlyNestedBodyElement() {
		return this.stackTop >= 1 && this.tagIDs[1] === z.BODY ? this.items[1] : null;
	}
	contains(e) {
		return this._indexOf(e) > -1;
	}
	getCommonAncestor(e) {
		let t = this._indexOf(e) - 1;
		return t >= 0 ? this.items[t] : null;
	}
	isRootHtmlElementCurrent() {
		return this.stackTop === 0 && this.tagIDs[0] === z.HTML;
	}
	hasInDynamicScope(e, t) {
		for (let n = this.stackTop; n >= 0; n--) {
			let r = this.tagIDs[n];
			switch (this.treeAdapter.getNamespaceURI(this.items[n])) {
				case L.HTML:
					if (r === e) return !0;
					if (t.has(r)) return !1;
					break;
				case L.SVG:
					if (vo.has(r)) return !1;
					break;
				case L.MATHML: if (_o.has(r)) return !1;
			}
		}
		return !0;
	}
	hasInScope(e) {
		return this.hasInDynamicScope(e, mo);
	}
	hasInListItemScope(e) {
		return this.hasInDynamicScope(e, ho);
	}
	hasInButtonScope(e) {
		return this.hasInDynamicScope(e, go);
	}
	hasNumberedHeaderInScope() {
		for (let e = this.stackTop; e >= 0; e--) {
			let t = this.tagIDs[e];
			switch (this.treeAdapter.getNamespaceURI(this.items[e])) {
				case L.HTML:
					if ($a.has(t)) return !0;
					if (mo.has(t)) return !1;
					break;
				case L.SVG:
					if (vo.has(t)) return !1;
					break;
				case L.MATHML: if (_o.has(t)) return !1;
			}
		}
		return !0;
	}
	hasInTableScope(e) {
		for (let t = this.stackTop; t >= 0; t--) if (this.treeAdapter.getNamespaceURI(this.items[t]) === L.HTML) switch (this.tagIDs[t]) {
			case e: return !0;
			case z.TABLE:
			case z.HTML: return !1;
		}
		return !0;
	}
	hasTableBodyContextInTableScope() {
		for (let e = this.stackTop; e >= 0; e--) if (this.treeAdapter.getNamespaceURI(this.items[e]) === L.HTML) switch (this.tagIDs[e]) {
			case z.TBODY:
			case z.THEAD:
			case z.TFOOT: return !0;
			case z.TABLE:
			case z.HTML: return !1;
		}
		return !0;
	}
	hasInSelectScope(e) {
		for (let t = this.stackTop; t >= 0; t--) if (this.treeAdapter.getNamespaceURI(this.items[t]) === L.HTML) switch (this.tagIDs[t]) {
			case e: return !0;
			case z.OPTION:
			case z.OPTGROUP: break;
			default: return !1;
		}
		return !0;
	}
	generateImpliedEndTags() {
		for (; this.currentTagId !== void 0 && fo.has(this.currentTagId);) this.pop();
	}
	generateImpliedEndTagsThoroughly() {
		for (; this.currentTagId !== void 0 && po.has(this.currentTagId);) this.pop();
	}
	generateImpliedEndTagsWithExclusion(e) {
		for (; this.currentTagId !== void 0 && this.currentTagId !== e && po.has(this.currentTagId);) this.pop();
	}
}, wo = 3, To;
(function(e) {
	e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})(To || (To = {}));
var Eo = { type: To.Marker }, Do = class {
	constructor(e) {
		this.treeAdapter = e, this.entries = [], this.bookmark = null;
	}
	_getNoahArkConditionCandidates(e, t) {
		let n = [], r = t.length, i = this.treeAdapter.getTagName(e), a = this.treeAdapter.getNamespaceURI(e);
		for (let e = 0; e < this.entries.length; e++) {
			let t = this.entries[e];
			if (t.type === To.Marker) break;
			let { element: o } = t;
			if (this.treeAdapter.getTagName(o) === i && this.treeAdapter.getNamespaceURI(o) === a) {
				let t = this.treeAdapter.getAttrList(o);
				t.length === r && n.push({
					idx: e,
					attrs: t
				});
			}
		}
		return n;
	}
	_ensureNoahArkCondition(e) {
		if (this.entries.length < wo) return;
		let t = this.treeAdapter.getAttrList(e), n = this._getNoahArkConditionCandidates(e, t);
		if (n.length < wo) return;
		let r = new Map(t.map((e) => [e.name, e.value])), i = 0;
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			t.attrs.every((e) => r.get(e.name) === e.value) && (i += 1, i >= wo && this.entries.splice(t.idx, 1));
		}
	}
	insertMarker() {
		this.entries.unshift(Eo);
	}
	pushElement(e, t) {
		this._ensureNoahArkCondition(e), this.entries.unshift({
			type: To.Element,
			element: e,
			token: t
		});
	}
	insertElementAfterBookmark(e, t) {
		let n = this.entries.indexOf(this.bookmark);
		this.entries.splice(n, 0, {
			type: To.Element,
			element: e,
			token: t
		});
	}
	removeEntry(e) {
		let t = this.entries.indexOf(e);
		t !== -1 && this.entries.splice(t, 1);
	}
	clearToLastMarker() {
		let e = this.entries.indexOf(Eo);
		e === -1 ? this.entries.length = 0 : this.entries.splice(0, e + 1);
	}
	getElementEntryInScopeWithTagName(e) {
		let t = this.entries.find((t) => t.type === To.Marker || this.treeAdapter.getTagName(t.element) === e);
		return t && t.type === To.Element ? t : null;
	}
	getElementEntry(e) {
		return this.entries.find((t) => t.type === To.Element && t.element === e);
	}
}, Oo = {
	createDocument() {
		return {
			nodeName: "#document",
			mode: Ya.NO_QUIRKS,
			childNodes: []
		};
	},
	createDocumentFragment() {
		return {
			nodeName: "#document-fragment",
			childNodes: []
		};
	},
	createElement(e, t, n) {
		return {
			nodeName: e,
			tagName: e,
			attrs: n,
			namespaceURI: t,
			childNodes: [],
			parentNode: null
		};
	},
	createCommentNode(e) {
		return {
			nodeName: "#comment",
			data: e,
			parentNode: null
		};
	},
	createTextNode(e) {
		return {
			nodeName: "#text",
			value: e,
			parentNode: null
		};
	},
	appendChild(e, t) {
		e.childNodes.push(t), t.parentNode = e;
	},
	insertBefore(e, t, n) {
		let r = e.childNodes.indexOf(n);
		e.childNodes.splice(r, 0, t), t.parentNode = e;
	},
	setTemplateContent(e, t) {
		e.content = t;
	},
	getTemplateContent(e) {
		return e.content;
	},
	setDocumentType(e, t, n, r) {
		let i = e.childNodes.find((e) => e.nodeName === "#documentType");
		if (i) i.name = t, i.publicId = n, i.systemId = r;
		else {
			let i = {
				nodeName: "#documentType",
				name: t,
				publicId: n,
				systemId: r,
				parentNode: null
			};
			Oo.appendChild(e, i);
		}
	},
	setDocumentMode(e, t) {
		e.mode = t;
	},
	getDocumentMode(e) {
		return e.mode;
	},
	detachNode(e) {
		if (e.parentNode) {
			let t = e.parentNode.childNodes.indexOf(e);
			e.parentNode.childNodes.splice(t, 1), e.parentNode = null;
		}
	},
	insertText(e, t) {
		if (e.childNodes.length > 0) {
			let n = e.childNodes[e.childNodes.length - 1];
			if (Oo.isTextNode(n)) {
				n.value += t;
				return;
			}
		}
		Oo.appendChild(e, Oo.createTextNode(t));
	},
	insertTextBefore(e, t, n) {
		let r = e.childNodes[e.childNodes.indexOf(n) - 1];
		r && Oo.isTextNode(r) ? r.value += t : Oo.insertBefore(e, Oo.createTextNode(t), n);
	},
	adoptAttributes(e, t) {
		let n = new Set(e.attrs.map((e) => e.name));
		for (let r = 0; r < t.length; r++) n.has(t[r].name) || e.attrs.push(t[r]);
	},
	getFirstChild(e) {
		return e.childNodes[0];
	},
	getChildNodes(e) {
		return e.childNodes;
	},
	getParentNode(e) {
		return e.parentNode;
	},
	getAttrList(e) {
		return e.attrs;
	},
	getTagName(e) {
		return e.tagName;
	},
	getNamespaceURI(e) {
		return e.namespaceURI;
	},
	getTextNodeContent(e) {
		return e.value;
	},
	getCommentNodeContent(e) {
		return e.data;
	},
	getDocumentTypeNodeName(e) {
		return e.name;
	},
	getDocumentTypeNodePublicId(e) {
		return e.publicId;
	},
	getDocumentTypeNodeSystemId(e) {
		return e.systemId;
	},
	isTextNode(e) {
		return e.nodeName === "#text";
	},
	isCommentNode(e) {
		return e.nodeName === "#comment";
	},
	isDocumentTypeNode(e) {
		return e.nodeName === "#documentType";
	},
	isElementNode(e) {
		return Object.prototype.hasOwnProperty.call(e, "tagName");
	},
	setNodeSourceCodeLocation(e, t) {
		e.sourceCodeLocation = t;
	},
	getNodeSourceCodeLocation(e) {
		return e.sourceCodeLocation;
	},
	updateNodeSourceCodeLocation(e, t) {
		e.sourceCodeLocation = {
			...e.sourceCodeLocation,
			...t
		};
	}
}, ko = "html", Ao = "about:legacy-compat", jo = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", Mo = /* @__PURE__ */ "+//silmaril//dtd html pro v0r11 19970101//,-//as//dtd html 3.0 aswedit + extensions//,-//advasoft ltd//dtd html 3.0 aswedit + extensions//,-//ietf//dtd html 2.0 level 1//,-//ietf//dtd html 2.0 level 2//,-//ietf//dtd html 2.0 strict level 1//,-//ietf//dtd html 2.0 strict level 2//,-//ietf//dtd html 2.0 strict//,-//ietf//dtd html 2.0//,-//ietf//dtd html 2.1e//,-//ietf//dtd html 3.0//,-//ietf//dtd html 3.2 final//,-//ietf//dtd html 3.2//,-//ietf//dtd html 3//,-//ietf//dtd html level 0//,-//ietf//dtd html level 1//,-//ietf//dtd html level 2//,-//ietf//dtd html level 3//,-//ietf//dtd html strict level 0//,-//ietf//dtd html strict level 1//,-//ietf//dtd html strict level 2//,-//ietf//dtd html strict level 3//,-//ietf//dtd html strict//,-//ietf//dtd html//,-//metrius//dtd metrius presentational//,-//microsoft//dtd internet explorer 2.0 html strict//,-//microsoft//dtd internet explorer 2.0 html//,-//microsoft//dtd internet explorer 2.0 tables//,-//microsoft//dtd internet explorer 3.0 html strict//,-//microsoft//dtd internet explorer 3.0 html//,-//microsoft//dtd internet explorer 3.0 tables//,-//netscape comm. corp.//dtd html//,-//netscape comm. corp.//dtd strict html//,-//o'reilly and associates//dtd html 2.0//,-//o'reilly and associates//dtd html extended 1.0//,-//o'reilly and associates//dtd html extended relaxed 1.0//,-//sq//dtd html 2.0 hotmetal + extensions//,-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//,-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//,-//spyglass//dtd html 2.0 extended//,-//sun microsystems corp.//dtd hotjava html//,-//sun microsystems corp.//dtd hotjava strict html//,-//w3c//dtd html 3 1995-03-24//,-//w3c//dtd html 3.2 draft//,-//w3c//dtd html 3.2 final//,-//w3c//dtd html 3.2//,-//w3c//dtd html 3.2s draft//,-//w3c//dtd html 4.0 frameset//,-//w3c//dtd html 4.0 transitional//,-//w3c//dtd html experimental 19960712//,-//w3c//dtd html experimental 970421//,-//w3c//dtd w3 html//,-//w3o//dtd w3 html 3.0//,-//webtechs//dtd mozilla html 2.0//,-//webtechs//dtd mozilla html//".split(","), No = [
	...Mo,
	"-//w3c//dtd html 4.01 frameset//",
	"-//w3c//dtd html 4.01 transitional//"
], Po = /* @__PURE__ */ new Set([
	"-//w3o//dtd w3 html strict 3.0//en//",
	"-/w3c/dtd html 4.0 transitional/en",
	"html"
]), Fo = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], Io = [
	...Fo,
	"-//w3c//dtd html 4.01 frameset//",
	"-//w3c//dtd html 4.01 transitional//"
];
function Lo(e, t) {
	return t.some((t) => e.startsWith(t));
}
function Ro(e) {
	return e.name === ko && e.publicId === null && (e.systemId === null || e.systemId === Ao);
}
function zo(e) {
	if (e.name !== ko) return Ya.QUIRKS;
	let { systemId: t } = e;
	if (t && t.toLowerCase() === jo) return Ya.QUIRKS;
	let { publicId: n } = e;
	if (n !== null) {
		if (n = n.toLowerCase(), Po.has(n)) return Ya.QUIRKS;
		let e = t === null ? No : Mo;
		if (Lo(n, e)) return Ya.QUIRKS;
		if (e = t === null ? Fo : Io, Lo(n, e)) return Ya.LIMITED_QUIRKS;
	}
	return Ya.NO_QUIRKS;
}
//#endregion
//#region node_modules/parse5/dist/common/foreign-content.js
var Bo = {
	TEXT_HTML: "text/html",
	APPLICATION_XML: "application/xhtml+xml"
}, Vo = "definitionurl", Ho = "definitionURL", Uo = new Map((/* @__PURE__ */ "attributeName.attributeType.baseFrequency.baseProfile.calcMode.clipPathUnits.diffuseConstant.edgeMode.filterUnits.glyphRef.gradientTransform.gradientUnits.kernelMatrix.kernelUnitLength.keyPoints.keySplines.keyTimes.lengthAdjust.limitingConeAngle.markerHeight.markerUnits.markerWidth.maskContentUnits.maskUnits.numOctaves.pathLength.patternContentUnits.patternTransform.patternUnits.pointsAtX.pointsAtY.pointsAtZ.preserveAlpha.preserveAspectRatio.primitiveUnits.refX.refY.repeatCount.repeatDur.requiredExtensions.requiredFeatures.specularConstant.specularExponent.spreadMethod.startOffset.stdDeviation.stitchTiles.surfaceScale.systemLanguage.tableValues.targetX.targetY.textLength.viewBox.viewTarget.xChannelSelector.yChannelSelector.zoomAndPan".split(".")).map((e) => [e.toLowerCase(), e])), Wo = /* @__PURE__ */ new Map([
	["xlink:actuate", {
		prefix: "xlink",
		name: "actuate",
		namespace: L.XLINK
	}],
	["xlink:arcrole", {
		prefix: "xlink",
		name: "arcrole",
		namespace: L.XLINK
	}],
	["xlink:href", {
		prefix: "xlink",
		name: "href",
		namespace: L.XLINK
	}],
	["xlink:role", {
		prefix: "xlink",
		name: "role",
		namespace: L.XLINK
	}],
	["xlink:show", {
		prefix: "xlink",
		name: "show",
		namespace: L.XLINK
	}],
	["xlink:title", {
		prefix: "xlink",
		name: "title",
		namespace: L.XLINK
	}],
	["xlink:type", {
		prefix: "xlink",
		name: "type",
		namespace: L.XLINK
	}],
	["xml:lang", {
		prefix: "xml",
		name: "lang",
		namespace: L.XML
	}],
	["xml:space", {
		prefix: "xml",
		name: "space",
		namespace: L.XML
	}],
	["xmlns", {
		prefix: "",
		name: "xmlns",
		namespace: L.XMLNS
	}],
	["xmlns:xlink", {
		prefix: "xmlns",
		name: "xlink",
		namespace: L.XMLNS
	}]
]), Go = new Map((/* @__PURE__ */ "altGlyph.altGlyphDef.altGlyphItem.animateColor.animateMotion.animateTransform.clipPath.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.foreignObject.glyphRef.linearGradient.radialGradient.textPath".split(".")).map((e) => [e.toLowerCase(), e])), Ko = /* @__PURE__ */ new Set([
	z.B,
	z.BIG,
	z.BLOCKQUOTE,
	z.BODY,
	z.BR,
	z.CENTER,
	z.CODE,
	z.DD,
	z.DIV,
	z.DL,
	z.DT,
	z.EM,
	z.EMBED,
	z.H1,
	z.H2,
	z.H3,
	z.H4,
	z.H5,
	z.H6,
	z.HEAD,
	z.HR,
	z.I,
	z.IMG,
	z.LI,
	z.LISTING,
	z.MENU,
	z.META,
	z.NOBR,
	z.OL,
	z.P,
	z.PRE,
	z.RUBY,
	z.S,
	z.SMALL,
	z.SPAN,
	z.STRONG,
	z.STRIKE,
	z.SUB,
	z.SUP,
	z.TABLE,
	z.TT,
	z.U,
	z.UL,
	z.VAR
]);
function qo(e) {
	let t = e.tagID;
	return t === z.FONT && e.attrs.some(({ name: e }) => e === Ja.COLOR || e === Ja.SIZE || e === Ja.FACE) || Ko.has(t);
}
function Jo(e) {
	for (let t = 0; t < e.attrs.length; t++) if (e.attrs[t].name === Vo) {
		e.attrs[t].name = Ho;
		break;
	}
}
function Yo(e) {
	for (let t = 0; t < e.attrs.length; t++) {
		let n = Uo.get(e.attrs[t].name);
		n != null && (e.attrs[t].name = n);
	}
}
function Xo(e) {
	for (let t = 0; t < e.attrs.length; t++) {
		let n = Wo.get(e.attrs[t].name);
		n && (e.attrs[t].prefix = n.prefix, e.attrs[t].name = n.name, e.attrs[t].namespace = n.namespace);
	}
}
function Zo(e) {
	let t = Go.get(e.tagName);
	t != null && (e.tagName = t, e.tagID = Za(e.tagName));
}
function Qo(e, t) {
	return t === L.MATHML && (e === z.MI || e === z.MO || e === z.MN || e === z.MS || e === z.MTEXT);
}
function $o(e, t, n) {
	if (t === L.MATHML && e === z.ANNOTATION_XML) {
		for (let e = 0; e < n.length; e++) if (n[e].name === Ja.ENCODING) {
			let t = n[e].value.toLowerCase();
			return t === Bo.TEXT_HTML || t === Bo.APPLICATION_XML;
		}
	}
	return t === L.SVG && (e === z.FOREIGN_OBJECT || e === z.DESC || e === z.TITLE);
}
function es(e, t, n, r) {
	return (!r || r === L.HTML) && $o(e, t, n) || (!r || r === L.MATHML) && Qo(e, t);
}
//#endregion
//#region node_modules/parse5/dist/parser/index.js
var ts = "hidden", ns = 8, rs = 3, H;
(function(e) {
	e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(H || (H = {}));
var is = {
	startLine: -1,
	startCol: -1,
	startOffset: -1,
	endLine: -1,
	endCol: -1,
	endOffset: -1
}, as = /* @__PURE__ */ new Set([
	z.TABLE,
	z.TBODY,
	z.TFOOT,
	z.THEAD,
	z.TR
]), os = {
	scriptingEnabled: !0,
	sourceCodeLocationInfo: !1,
	treeAdapter: Oo,
	onParseError: null
}, ss = class {
	constructor(e, t, n = null, r = null) {
		this.fragmentContext = n, this.scriptHandler = r, this.currentToken = null, this.stopped = !1, this.insertionMode = H.INITIAL, this.originalInsertionMode = H.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
			...os,
			...e
		}, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = t ?? this.treeAdapter.createDocument(), this.tokenizer = new uo(this.options, this), this.activeFormattingElements = new Do(this.treeAdapter), this.fragmentContextID = n ? Za(this.treeAdapter.getTagName(n)) : z.UNKNOWN, this._setContextModes(n ?? this.document, this.fragmentContextID), this.openElements = new Co(this.document, this.treeAdapter, this);
	}
	static parse(e, t) {
		let n = new this(t);
		return n.tokenizer.write(e, !0), n.document;
	}
	static getFragmentParser(e, t) {
		let n = {
			...os,
			...t
		};
		e ?? (e = n.treeAdapter.createElement(R.TEMPLATE, L.HTML, []));
		let r = n.treeAdapter.createElement("documentmock", L.HTML, []), i = new this(n, r, e);
		return i.fragmentContextID === z.TEMPLATE && i.tmplInsertionModeStack.unshift(H.IN_TEMPLATE), i._initTokenizerForFragmentParsing(), i._insertFakeRootElement(), i._resetInsertionMode(), i._findFormInFragmentContext(), i;
	}
	getFragment() {
		let e = this.treeAdapter.getFirstChild(this.document), t = this.treeAdapter.createDocumentFragment();
		return this._adoptNodes(e, t), t;
	}
	_err(e, t, n) {
		if (!this.onParseError) return;
		let r = e.location ?? is, i = {
			code: t,
			startLine: r.startLine,
			startCol: r.startCol,
			startOffset: r.startOffset,
			endLine: n ? r.startLine : r.endLine,
			endCol: n ? r.startCol : r.endCol,
			endOffset: n ? r.startOffset : r.endOffset
		};
		this.onParseError(i);
	}
	onItemPush(e, t, n) {
		var r, i;
		(i = (r = this.treeAdapter).onItemPush) == null || i.call(r, e), n && this.openElements.stackTop > 0 && this._setContextModes(e, t);
	}
	onItemPop(e, t) {
		var n, r;
		if (this.options.sourceCodeLocationInfo && this._setEndLocation(e, this.currentToken), (r = (n = this.treeAdapter).onItemPop) == null || r.call(n, e, this.openElements.current), t) {
			let e, t;
			this.openElements.stackTop === 0 && this.fragmentContext ? (e = this.fragmentContext, t = this.fragmentContextID) : {current: e, currentTagId: t} = this.openElements, this._setContextModes(e, t);
		}
	}
	_setContextModes(e, t) {
		let n = e === this.document || e && this.treeAdapter.getNamespaceURI(e) === L.HTML;
		this.currentNotInHTML = !n, this.tokenizer.inForeignNode = !n && e !== void 0 && t !== void 0 && !this._isIntegrationPoint(t, e);
	}
	_switchToTextParsing(e, t) {
		this._insertElement(e, L.HTML), this.tokenizer.state = t, this.originalInsertionMode = this.insertionMode, this.insertionMode = H.TEXT;
	}
	switchToPlaintextParsing() {
		this.insertionMode = H.TEXT, this.originalInsertionMode = H.IN_BODY, this.tokenizer.state = eo.PLAINTEXT;
	}
	_getAdjustedCurrentElement() {
		return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
	}
	_findFormInFragmentContext() {
		let e = this.fragmentContext;
		for (; e;) {
			if (this.treeAdapter.getTagName(e) === R.FORM) {
				this.formElement = e;
				break;
			}
			e = this.treeAdapter.getParentNode(e);
		}
	}
	_initTokenizerForFragmentParsing() {
		if (this.fragmentContext && this.treeAdapter.getNamespaceURI(this.fragmentContext) === L.HTML) switch (this.fragmentContextID) {
			case z.TITLE:
			case z.TEXTAREA:
				this.tokenizer.state = eo.RCDATA;
				break;
			case z.STYLE:
			case z.XMP:
			case z.IFRAME:
			case z.NOEMBED:
			case z.NOFRAMES:
			case z.NOSCRIPT:
				this.tokenizer.state = eo.RAWTEXT;
				break;
			case z.SCRIPT:
				this.tokenizer.state = eo.SCRIPT_DATA;
				break;
			case z.PLAINTEXT: this.tokenizer.state = eo.PLAINTEXT;
		}
	}
	_setDocumentType(e) {
		let t = e.name || "", n = e.publicId || "", r = e.systemId || "";
		if (this.treeAdapter.setDocumentType(this.document, t, n, r), e.location) {
			let t = this.treeAdapter.getChildNodes(this.document).find((e) => this.treeAdapter.isDocumentTypeNode(e));
			t && this.treeAdapter.setNodeSourceCodeLocation(t, e.location);
		}
	}
	_attachElementToTree(e, t) {
		if (this.options.sourceCodeLocationInfo) {
			let n = t && {
				...t,
				startTag: t
			};
			this.treeAdapter.setNodeSourceCodeLocation(e, n);
		}
		if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(e);
		else {
			let t = this.openElements.currentTmplContentOrNode;
			this.treeAdapter.appendChild(t ?? this.document, e);
		}
	}
	_appendElement(e, t) {
		let n = this.treeAdapter.createElement(e.tagName, t, e.attrs);
		this._attachElementToTree(n, e.location);
	}
	_insertElement(e, t) {
		let n = this.treeAdapter.createElement(e.tagName, t, e.attrs);
		this._attachElementToTree(n, e.location), this.openElements.push(n, e.tagID);
	}
	_insertFakeElement(e, t) {
		let n = this.treeAdapter.createElement(e, L.HTML, []);
		this._attachElementToTree(n, null), this.openElements.push(n, t);
	}
	_insertTemplate(e) {
		let t = this.treeAdapter.createElement(e.tagName, L.HTML, e.attrs), n = this.treeAdapter.createDocumentFragment();
		this.treeAdapter.setTemplateContent(t, n), this._attachElementToTree(t, e.location), this.openElements.push(t, e.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, null);
	}
	_insertFakeRootElement() {
		let e = this.treeAdapter.createElement(R.HTML, L.HTML, []);
		this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(e, null), this.treeAdapter.appendChild(this.openElements.current, e), this.openElements.push(e, z.HTML);
	}
	_appendCommentNode(e, t) {
		let n = this.treeAdapter.createCommentNode(e.data);
		this.treeAdapter.appendChild(t, n), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, e.location);
	}
	_insertCharacters(e) {
		let t, n;
		if (this._shouldFosterParentOnInsertion() ? ({parent: t, beforeElement: n} = this._findFosterParentingLocation(), n ? this.treeAdapter.insertTextBefore(t, e.chars, n) : this.treeAdapter.insertText(t, e.chars)) : (t = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(t, e.chars)), !e.location) return;
		let r = this.treeAdapter.getChildNodes(t), i = r[(n ? r.lastIndexOf(n) : r.length) - 1];
		if (this.treeAdapter.getNodeSourceCodeLocation(i)) {
			let { endLine: t, endCol: n, endOffset: r } = e.location;
			this.treeAdapter.updateNodeSourceCodeLocation(i, {
				endLine: t,
				endCol: n,
				endOffset: r
			});
		} else this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(i, e.location);
	}
	_adoptNodes(e, t) {
		for (let n = this.treeAdapter.getFirstChild(e); n; n = this.treeAdapter.getFirstChild(e)) this.treeAdapter.detachNode(n), this.treeAdapter.appendChild(t, n);
	}
	_setEndLocation(e, t) {
		if (this.treeAdapter.getNodeSourceCodeLocation(e) && t.location) {
			let n = t.location, r = this.treeAdapter.getTagName(e), i = t.type === I.END_TAG && r === t.tagName ? {
				endTag: { ...n },
				endLine: n.endLine,
				endCol: n.endCol,
				endOffset: n.endOffset
			} : {
				endLine: n.startLine,
				endCol: n.startCol,
				endOffset: n.startOffset
			};
			this.treeAdapter.updateNodeSourceCodeLocation(e, i);
		}
	}
	shouldProcessStartTagTokenInForeignContent(e) {
		if (!this.currentNotInHTML) return !1;
		let t, n;
		return this.openElements.stackTop === 0 && this.fragmentContext ? (t = this.fragmentContext, n = this.fragmentContextID) : {current: t, currentTagId: n} = this.openElements, e.tagID === z.SVG && this.treeAdapter.getTagName(t) === R.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(t) === L.MATHML ? !1 : this.tokenizer.inForeignNode || (e.tagID === z.MGLYPH || e.tagID === z.MALIGNMARK) && n !== void 0 && !this._isIntegrationPoint(n, t, L.HTML);
	}
	_processToken(e) {
		switch (e.type) {
			case I.CHARACTER:
				this.onCharacter(e);
				break;
			case I.NULL_CHARACTER:
				this.onNullCharacter(e);
				break;
			case I.COMMENT:
				this.onComment(e);
				break;
			case I.DOCTYPE:
				this.onDoctype(e);
				break;
			case I.START_TAG:
				this._processStartTag(e);
				break;
			case I.END_TAG:
				this.onEndTag(e);
				break;
			case I.EOF:
				this.onEof(e);
				break;
			case I.WHITESPACE_CHARACTER: this.onWhitespaceCharacter(e);
		}
	}
	_isIntegrationPoint(e, t, n) {
		return es(e, this.treeAdapter.getNamespaceURI(t), this.treeAdapter.getAttrList(t), n);
	}
	_reconstructActiveFormattingElements() {
		let e = this.activeFormattingElements.entries.length;
		if (e) {
			let t = this.activeFormattingElements.entries.findIndex((e) => e.type === To.Marker || this.openElements.contains(e.element)), n = t === -1 ? e - 1 : t - 1;
			for (let e = n; e >= 0; e--) {
				let t = this.activeFormattingElements.entries[e];
				this._insertElement(t.token, this.treeAdapter.getNamespaceURI(t.element)), t.element = this.openElements.current;
			}
		}
	}
	_closeTableCell() {
		this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = H.IN_ROW;
	}
	_closePElement() {
		this.openElements.generateImpliedEndTagsWithExclusion(z.P), this.openElements.popUntilTagNamePopped(z.P);
	}
	_resetInsertionMode() {
		for (let e = this.openElements.stackTop; e >= 0; e--) switch (e === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[e]) {
			case z.TR:
				this.insertionMode = H.IN_ROW;
				return;
			case z.TBODY:
			case z.THEAD:
			case z.TFOOT:
				this.insertionMode = H.IN_TABLE_BODY;
				return;
			case z.CAPTION:
				this.insertionMode = H.IN_CAPTION;
				return;
			case z.COLGROUP:
				this.insertionMode = H.IN_COLUMN_GROUP;
				return;
			case z.TABLE:
				this.insertionMode = H.IN_TABLE;
				return;
			case z.BODY:
				this.insertionMode = H.IN_BODY;
				return;
			case z.FRAMESET:
				this.insertionMode = H.IN_FRAMESET;
				return;
			case z.SELECT:
				this._resetInsertionModeForSelect(e);
				return;
			case z.TEMPLATE:
				this.insertionMode = this.tmplInsertionModeStack[0];
				return;
			case z.HTML:
				this.insertionMode = this.headElement ? H.AFTER_HEAD : H.BEFORE_HEAD;
				return;
			case z.TD:
			case z.TH:
				if (e > 0) {
					this.insertionMode = H.IN_CELL;
					return;
				}
				break;
			case z.HEAD: if (e > 0) {
				this.insertionMode = H.IN_HEAD;
				return;
			}
		}
		this.insertionMode = H.IN_BODY;
	}
	_resetInsertionModeForSelect(e) {
		if (e > 0) for (let t = e - 1; t > 0; t--) {
			let e = this.openElements.tagIDs[t];
			if (e === z.TEMPLATE) break;
			if (e === z.TABLE) {
				this.insertionMode = H.IN_SELECT_IN_TABLE;
				return;
			}
		}
		this.insertionMode = H.IN_SELECT;
	}
	_isElementCausesFosterParenting(e) {
		return as.has(e);
	}
	_shouldFosterParentOnInsertion() {
		return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
	}
	_findFosterParentingLocation() {
		for (let e = this.openElements.stackTop; e >= 0; e--) {
			let t = this.openElements.items[e];
			switch (this.openElements.tagIDs[e]) {
				case z.TEMPLATE:
					if (this.treeAdapter.getNamespaceURI(t) === L.HTML) return {
						parent: this.treeAdapter.getTemplateContent(t),
						beforeElement: null
					};
					break;
				case z.TABLE: {
					let n = this.treeAdapter.getParentNode(t);
					return n ? {
						parent: n,
						beforeElement: t
					} : {
						parent: this.openElements.items[e - 1],
						beforeElement: null
					};
				}
			}
		}
		return {
			parent: this.openElements.items[0],
			beforeElement: null
		};
	}
	_fosterParentElement(e) {
		let t = this._findFosterParentingLocation();
		t.beforeElement ? this.treeAdapter.insertBefore(t.parent, e, t.beforeElement) : this.treeAdapter.appendChild(t.parent, e);
	}
	_isSpecialElement(e, t) {
		return Qa[this.treeAdapter.getNamespaceURI(e)].has(t);
	}
	onCharacter(e) {
		if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
			Tl(this, e);
			return;
		}
		switch (this.insertionMode) {
			case H.INITIAL:
				bs(this, e);
				break;
			case H.BEFORE_HTML:
				Cs(this, e);
				break;
			case H.BEFORE_HEAD:
				Es(this, e);
				break;
			case H.IN_HEAD:
				As(this, e);
				break;
			case H.IN_HEAD_NO_SCRIPT:
				Ns(this, e);
				break;
			case H.AFTER_HEAD:
				Is(this, e);
				break;
			case H.IN_BODY:
			case H.IN_CAPTION:
			case H.IN_CELL:
			case H.IN_TEMPLATE:
				zs(this, e);
				break;
			case H.TEXT:
			case H.IN_SELECT:
			case H.IN_SELECT_IN_TABLE:
				this._insertCharacters(e);
				break;
			case H.IN_TABLE:
			case H.IN_TABLE_BODY:
			case H.IN_ROW:
				Pc(this, e);
				break;
			case H.IN_TABLE_TEXT:
				qc(this, e);
				break;
			case H.IN_COLUMN_GROUP:
				el(this, e);
				break;
			case H.AFTER_BODY:
				gl(this, e);
				break;
			case H.AFTER_AFTER_BODY: Sl(this, e);
		}
	}
	onNullCharacter(e) {
		if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
			wl(this, e);
			return;
		}
		switch (this.insertionMode) {
			case H.INITIAL:
				bs(this, e);
				break;
			case H.BEFORE_HTML:
				Cs(this, e);
				break;
			case H.BEFORE_HEAD:
				Es(this, e);
				break;
			case H.IN_HEAD:
				As(this, e);
				break;
			case H.IN_HEAD_NO_SCRIPT:
				Ns(this, e);
				break;
			case H.AFTER_HEAD:
				Is(this, e);
				break;
			case H.TEXT:
				this._insertCharacters(e);
				break;
			case H.IN_TABLE:
			case H.IN_TABLE_BODY:
			case H.IN_ROW:
				Pc(this, e);
				break;
			case H.IN_COLUMN_GROUP:
				el(this, e);
				break;
			case H.AFTER_BODY:
				gl(this, e);
				break;
			case H.AFTER_AFTER_BODY: Sl(this, e);
		}
	}
	onComment(e) {
		if (this.skipNextNewLine = !1, this.currentNotInHTML) {
			hs(this, e);
			return;
		}
		switch (this.insertionMode) {
			case H.INITIAL:
			case H.BEFORE_HTML:
			case H.BEFORE_HEAD:
			case H.IN_HEAD:
			case H.IN_HEAD_NO_SCRIPT:
			case H.AFTER_HEAD:
			case H.IN_BODY:
			case H.IN_TABLE:
			case H.IN_CAPTION:
			case H.IN_COLUMN_GROUP:
			case H.IN_TABLE_BODY:
			case H.IN_ROW:
			case H.IN_CELL:
			case H.IN_SELECT:
			case H.IN_SELECT_IN_TABLE:
			case H.IN_TEMPLATE:
			case H.IN_FRAMESET:
			case H.AFTER_FRAMESET:
				hs(this, e);
				break;
			case H.IN_TABLE_TEXT:
				Jc(this, e);
				break;
			case H.AFTER_BODY:
				gs(this, e);
				break;
			case H.AFTER_AFTER_BODY:
			case H.AFTER_AFTER_FRAMESET: _s(this, e);
		}
	}
	onDoctype(e) {
		switch (this.skipNextNewLine = !1, this.insertionMode) {
			case H.INITIAL:
				ys(this, e);
				break;
			case H.BEFORE_HEAD:
			case H.IN_HEAD:
			case H.IN_HEAD_NO_SCRIPT:
			case H.AFTER_HEAD:
				this._err(e, F.misplacedDoctype);
				break;
			case H.IN_TABLE_TEXT: Jc(this, e);
		}
	}
	onStartTag(e) {
		this.skipNextNewLine = !1, this.currentToken = e, this._processStartTag(e), e.selfClosing && !e.ackSelfClosing && this._err(e, F.nonVoidHtmlElementStartTagWithTrailingSolidus);
	}
	_processStartTag(e) {
		this.shouldProcessStartTagTokenInForeignContent(e) ? Dl(this, e) : this._startTagOutsideForeignContent(e);
	}
	_startTagOutsideForeignContent(e) {
		switch (this.insertionMode) {
			case H.INITIAL:
				bs(this, e);
				break;
			case H.BEFORE_HTML:
				xs(this, e);
				break;
			case H.BEFORE_HEAD:
				ws(this, e);
				break;
			case H.IN_HEAD:
				Ds(this, e);
				break;
			case H.IN_HEAD_NO_SCRIPT:
				js(this, e);
				break;
			case H.AFTER_HEAD:
				Ps(this, e);
				break;
			case H.IN_BODY:
				vc(this, e);
				break;
			case H.IN_TABLE:
				Uc(this, e);
				break;
			case H.IN_TABLE_TEXT:
				Jc(this, e);
				break;
			case H.IN_CAPTION:
				Xc(this, e);
				break;
			case H.IN_COLUMN_GROUP:
				Qc(this, e);
				break;
			case H.IN_TABLE_BODY:
				tl(this, e);
				break;
			case H.IN_ROW:
				rl(this, e);
				break;
			case H.IN_CELL:
				al(this, e);
				break;
			case H.IN_SELECT:
				sl(this, e);
				break;
			case H.IN_SELECT_IN_TABLE:
				ll(this, e);
				break;
			case H.IN_TEMPLATE:
				dl(this, e);
				break;
			case H.AFTER_BODY:
				ml(this, e);
				break;
			case H.IN_FRAMESET:
				_l(this, e);
				break;
			case H.AFTER_FRAMESET:
				yl(this, e);
				break;
			case H.AFTER_AFTER_BODY:
				xl(this, e);
				break;
			case H.AFTER_AFTER_FRAMESET: Cl(this, e);
		}
	}
	onEndTag(e) {
		this.skipNextNewLine = !1, this.currentToken = e, this.currentNotInHTML ? Ol(this, e) : this._endTagOutsideForeignContent(e);
	}
	_endTagOutsideForeignContent(e) {
		switch (this.insertionMode) {
			case H.INITIAL:
				bs(this, e);
				break;
			case H.BEFORE_HTML:
				Ss(this, e);
				break;
			case H.BEFORE_HEAD:
				Ts(this, e);
				break;
			case H.IN_HEAD:
				Os(this, e);
				break;
			case H.IN_HEAD_NO_SCRIPT:
				Ms(this, e);
				break;
			case H.AFTER_HEAD:
				Fs(this, e);
				break;
			case H.IN_BODY:
				Ac(this, e);
				break;
			case H.TEXT:
				Mc(this, e);
				break;
			case H.IN_TABLE:
				Wc(this, e);
				break;
			case H.IN_TABLE_TEXT:
				Jc(this, e);
				break;
			case H.IN_CAPTION:
				Zc(this, e);
				break;
			case H.IN_COLUMN_GROUP:
				$c(this, e);
				break;
			case H.IN_TABLE_BODY:
				nl(this, e);
				break;
			case H.IN_ROW:
				il(this, e);
				break;
			case H.IN_CELL:
				ol(this, e);
				break;
			case H.IN_SELECT:
				cl(this, e);
				break;
			case H.IN_SELECT_IN_TABLE:
				ul(this, e);
				break;
			case H.IN_TEMPLATE:
				fl(this, e);
				break;
			case H.AFTER_BODY:
				hl(this, e);
				break;
			case H.IN_FRAMESET:
				vl(this, e);
				break;
			case H.AFTER_FRAMESET:
				bl(this, e);
				break;
			case H.AFTER_AFTER_BODY: Sl(this, e);
		}
	}
	onEof(e) {
		switch (this.insertionMode) {
			case H.INITIAL:
				bs(this, e);
				break;
			case H.BEFORE_HTML:
				Cs(this, e);
				break;
			case H.BEFORE_HEAD:
				Es(this, e);
				break;
			case H.IN_HEAD:
				As(this, e);
				break;
			case H.IN_HEAD_NO_SCRIPT:
				Ns(this, e);
				break;
			case H.AFTER_HEAD:
				Is(this, e);
				break;
			case H.IN_BODY:
			case H.IN_TABLE:
			case H.IN_CAPTION:
			case H.IN_COLUMN_GROUP:
			case H.IN_TABLE_BODY:
			case H.IN_ROW:
			case H.IN_CELL:
			case H.IN_SELECT:
			case H.IN_SELECT_IN_TABLE:
				jc(this, e);
				break;
			case H.TEXT:
				Nc(this, e);
				break;
			case H.IN_TABLE_TEXT:
				Jc(this, e);
				break;
			case H.IN_TEMPLATE:
				pl(this, e);
				break;
			case H.AFTER_BODY:
			case H.IN_FRAMESET:
			case H.AFTER_FRAMESET:
			case H.AFTER_AFTER_BODY:
			case H.AFTER_AFTER_FRAMESET: vs(this, e);
		}
	}
	onWhitespaceCharacter(e) {
		if (this.skipNextNewLine && (this.skipNextNewLine = !1, e.chars.charCodeAt(0) === P.LINE_FEED)) {
			if (e.chars.length === 1) return;
			e.chars = e.chars.substr(1);
		}
		if (this.tokenizer.inForeignNode) {
			this._insertCharacters(e);
			return;
		}
		switch (this.insertionMode) {
			case H.IN_HEAD:
			case H.IN_HEAD_NO_SCRIPT:
			case H.AFTER_HEAD:
			case H.TEXT:
			case H.IN_COLUMN_GROUP:
			case H.IN_SELECT:
			case H.IN_SELECT_IN_TABLE:
			case H.IN_FRAMESET:
			case H.AFTER_FRAMESET:
				this._insertCharacters(e);
				break;
			case H.IN_BODY:
			case H.IN_CAPTION:
			case H.IN_CELL:
			case H.IN_TEMPLATE:
			case H.AFTER_BODY:
			case H.AFTER_AFTER_BODY:
			case H.AFTER_AFTER_FRAMESET:
				Rs(this, e);
				break;
			case H.IN_TABLE:
			case H.IN_TABLE_BODY:
			case H.IN_ROW:
				Pc(this, e);
				break;
			case H.IN_TABLE_TEXT: Kc(this, e);
		}
	}
};
function cs(e, t) {
	let n = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
	return n ? e.openElements.contains(n.element) ? e.openElements.hasInScope(t.tagID) || (n = null) : (e.activeFormattingElements.removeEntry(n), n = null) : kc(e, t), n;
}
function ls(e, t) {
	let n = null, r = e.openElements.stackTop;
	for (; r >= 0; r--) {
		let i = e.openElements.items[r];
		if (i === t.element) break;
		e._isSpecialElement(i, e.openElements.tagIDs[r]) && (n = i);
	}
	return n || (e.openElements.shortenToLength(Math.max(r, 0)), e.activeFormattingElements.removeEntry(t)), n;
}
function us(e, t, n) {
	let r = t, i = e.openElements.getCommonAncestor(t);
	for (let a = 0, o = i; o !== n; a++, o = i) {
		i = e.openElements.getCommonAncestor(o);
		let n = e.activeFormattingElements.getElementEntry(o), s = n && a >= rs;
		!n || s ? (s && e.activeFormattingElements.removeEntry(n), e.openElements.remove(o)) : (o = ds(e, n), r === t && (e.activeFormattingElements.bookmark = n), e.treeAdapter.detachNode(r), e.treeAdapter.appendChild(o, r), r = o);
	}
	return r;
}
function ds(e, t) {
	let n = e.treeAdapter.getNamespaceURI(t.element), r = e.treeAdapter.createElement(t.token.tagName, n, t.token.attrs);
	return e.openElements.replace(t.element, r), t.element = r, r;
}
function fs(e, t, n) {
	let r = Za(e.treeAdapter.getTagName(t));
	if (e._isElementCausesFosterParenting(r)) e._fosterParentElement(n);
	else {
		let i = e.treeAdapter.getNamespaceURI(t);
		r === z.TEMPLATE && i === L.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, n);
	}
}
function ps(e, t, n) {
	let r = e.treeAdapter.getNamespaceURI(n.element), { token: i } = n, a = e.treeAdapter.createElement(i.tagName, r, i.attrs);
	e._adoptNodes(t, a), e.treeAdapter.appendChild(t, a), e.activeFormattingElements.insertElementAfterBookmark(a, i), e.activeFormattingElements.removeEntry(n), e.openElements.remove(n.element), e.openElements.insertAfter(t, a, i.tagID);
}
function ms(e, t) {
	for (let n = 0; n < ns; n++) {
		let n = cs(e, t);
		if (!n) break;
		let r = ls(e, n);
		if (!r) break;
		e.activeFormattingElements.bookmark = n;
		let i = us(e, r, n.element), a = e.openElements.getCommonAncestor(n.element);
		e.treeAdapter.detachNode(i), a && fs(e, a, i), ps(e, r, n);
	}
}
function hs(e, t) {
	e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function gs(e, t) {
	e._appendCommentNode(t, e.openElements.items[0]);
}
function _s(e, t) {
	e._appendCommentNode(t, e.document);
}
function vs(e, t) {
	if (e.stopped = !0, t.location) {
		let n = e.fragmentContext ? 0 : 2;
		for (let r = e.openElements.stackTop; r >= n; r--) e._setEndLocation(e.openElements.items[r], t);
		if (!e.fragmentContext && e.openElements.stackTop >= 0) {
			let n = e.openElements.items[0], r = e.treeAdapter.getNodeSourceCodeLocation(n);
			if (r && !r.endTag && (e._setEndLocation(n, t), e.openElements.stackTop >= 1)) {
				let n = e.openElements.items[1], r = e.treeAdapter.getNodeSourceCodeLocation(n);
				r && !r.endTag && e._setEndLocation(n, t);
			}
		}
	}
}
function ys(e, t) {
	e._setDocumentType(t);
	let n = t.forceQuirks ? Ya.QUIRKS : zo(t);
	Ro(t) || e._err(t, F.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, n), e.insertionMode = H.BEFORE_HTML;
}
function bs(e, t) {
	e._err(t, F.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, Ya.QUIRKS), e.insertionMode = H.BEFORE_HTML, e._processToken(t);
}
function xs(e, t) {
	t.tagID === z.HTML ? (e._insertElement(t, L.HTML), e.insertionMode = H.BEFORE_HEAD) : Cs(e, t);
}
function Ss(e, t) {
	let n = t.tagID;
	(n === z.HTML || n === z.HEAD || n === z.BODY || n === z.BR) && Cs(e, t);
}
function Cs(e, t) {
	e._insertFakeRootElement(), e.insertionMode = H.BEFORE_HEAD, e._processToken(t);
}
function ws(e, t) {
	switch (t.tagID) {
		case z.HTML:
			vc(e, t);
			break;
		case z.HEAD:
			e._insertElement(t, L.HTML), e.headElement = e.openElements.current, e.insertionMode = H.IN_HEAD;
			break;
		default: Es(e, t);
	}
}
function Ts(e, t) {
	let n = t.tagID;
	n === z.HEAD || n === z.BODY || n === z.HTML || n === z.BR ? Es(e, t) : e._err(t, F.endTagWithoutMatchingOpenElement);
}
function Es(e, t) {
	e._insertFakeElement(R.HEAD, z.HEAD), e.headElement = e.openElements.current, e.insertionMode = H.IN_HEAD, e._processToken(t);
}
function Ds(e, t) {
	switch (t.tagID) {
		case z.HTML:
			vc(e, t);
			break;
		case z.BASE:
		case z.BASEFONT:
		case z.BGSOUND:
		case z.LINK:
		case z.META:
			e._appendElement(t, L.HTML), t.ackSelfClosing = !0;
			break;
		case z.TITLE:
			e._switchToTextParsing(t, eo.RCDATA);
			break;
		case z.NOSCRIPT:
			e.options.scriptingEnabled ? e._switchToTextParsing(t, eo.RAWTEXT) : (e._insertElement(t, L.HTML), e.insertionMode = H.IN_HEAD_NO_SCRIPT);
			break;
		case z.NOFRAMES:
		case z.STYLE:
			e._switchToTextParsing(t, eo.RAWTEXT);
			break;
		case z.SCRIPT:
			e._switchToTextParsing(t, eo.SCRIPT_DATA);
			break;
		case z.TEMPLATE:
			e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = H.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(H.IN_TEMPLATE);
			break;
		case z.HEAD:
			e._err(t, F.misplacedStartTagForHeadElement);
			break;
		default: As(e, t);
	}
}
function Os(e, t) {
	switch (t.tagID) {
		case z.HEAD:
			e.openElements.pop(), e.insertionMode = H.AFTER_HEAD;
			break;
		case z.BODY:
		case z.BR:
		case z.HTML:
			As(e, t);
			break;
		case z.TEMPLATE:
			ks(e, t);
			break;
		default: e._err(t, F.endTagWithoutMatchingOpenElement);
	}
}
function ks(e, t) {
	e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== z.TEMPLATE && e._err(t, F.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(z.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, F.endTagWithoutMatchingOpenElement);
}
function As(e, t) {
	e.openElements.pop(), e.insertionMode = H.AFTER_HEAD, e._processToken(t);
}
function js(e, t) {
	switch (t.tagID) {
		case z.HTML:
			vc(e, t);
			break;
		case z.BASEFONT:
		case z.BGSOUND:
		case z.HEAD:
		case z.LINK:
		case z.META:
		case z.NOFRAMES:
		case z.STYLE:
			Ds(e, t);
			break;
		case z.NOSCRIPT:
			e._err(t, F.nestedNoscriptInHead);
			break;
		default: Ns(e, t);
	}
}
function Ms(e, t) {
	switch (t.tagID) {
		case z.NOSCRIPT:
			e.openElements.pop(), e.insertionMode = H.IN_HEAD;
			break;
		case z.BR:
			Ns(e, t);
			break;
		default: e._err(t, F.endTagWithoutMatchingOpenElement);
	}
}
function Ns(e, t) {
	let n = t.type === I.EOF ? F.openElementsLeftAfterEof : F.disallowedContentInNoscriptInHead;
	e._err(t, n), e.openElements.pop(), e.insertionMode = H.IN_HEAD, e._processToken(t);
}
function Ps(e, t) {
	switch (t.tagID) {
		case z.HTML:
			vc(e, t);
			break;
		case z.BODY:
			e._insertElement(t, L.HTML), e.framesetOk = !1, e.insertionMode = H.IN_BODY;
			break;
		case z.FRAMESET:
			e._insertElement(t, L.HTML), e.insertionMode = H.IN_FRAMESET;
			break;
		case z.BASE:
		case z.BASEFONT:
		case z.BGSOUND:
		case z.LINK:
		case z.META:
		case z.NOFRAMES:
		case z.SCRIPT:
		case z.STYLE:
		case z.TEMPLATE:
		case z.TITLE:
			e._err(t, F.abandonedHeadElementChild), e.openElements.push(e.headElement, z.HEAD), Ds(e, t), e.openElements.remove(e.headElement);
			break;
		case z.HEAD:
			e._err(t, F.misplacedStartTagForHeadElement);
			break;
		default: Is(e, t);
	}
}
function Fs(e, t) {
	switch (t.tagID) {
		case z.BODY:
		case z.HTML:
		case z.BR:
			Is(e, t);
			break;
		case z.TEMPLATE:
			ks(e, t);
			break;
		default: e._err(t, F.endTagWithoutMatchingOpenElement);
	}
}
function Is(e, t) {
	e._insertFakeElement(R.BODY, z.BODY), e.insertionMode = H.IN_BODY, Ls(e, t);
}
function Ls(e, t) {
	switch (t.type) {
		case I.CHARACTER:
			zs(e, t);
			break;
		case I.WHITESPACE_CHARACTER:
			Rs(e, t);
			break;
		case I.COMMENT:
			hs(e, t);
			break;
		case I.START_TAG:
			vc(e, t);
			break;
		case I.END_TAG:
			Ac(e, t);
			break;
		case I.EOF: jc(e, t);
	}
}
function Rs(e, t) {
	e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function zs(e, t) {
	e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function Bs(e, t) {
	e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function Vs(e, t) {
	let n = e.openElements.tryPeekProperlyNestedBodyElement();
	n && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(n, t.attrs));
}
function Hs(e, t) {
	let n = e.openElements.tryPeekProperlyNestedBodyElement();
	e.framesetOk && n && (e.treeAdapter.detachNode(n), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, L.HTML), e.insertionMode = H.IN_FRAMESET);
}
function Us(e, t) {
	e.openElements.hasInButtonScope(z.P) && e._closePElement(), e._insertElement(t, L.HTML);
}
function Ws(e, t) {
	e.openElements.hasInButtonScope(z.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && $a.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, L.HTML);
}
function Gs(e, t) {
	e.openElements.hasInButtonScope(z.P) && e._closePElement(), e._insertElement(t, L.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function Ks(e, t) {
	let n = e.openElements.tmplCount > 0;
	(!e.formElement || n) && (e.openElements.hasInButtonScope(z.P) && e._closePElement(), e._insertElement(t, L.HTML), n || (e.formElement = e.openElements.current));
}
function qs(e, t) {
	e.framesetOk = !1;
	let n = t.tagID;
	for (let t = e.openElements.stackTop; t >= 0; t--) {
		let r = e.openElements.tagIDs[t];
		if (n === z.LI && r === z.LI || (n === z.DD || n === z.DT) && (r === z.DD || r === z.DT)) {
			e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.popUntilTagNamePopped(r);
			break;
		}
		if (r !== z.ADDRESS && r !== z.DIV && r !== z.P && e._isSpecialElement(e.openElements.items[t], r)) break;
	}
	e.openElements.hasInButtonScope(z.P) && e._closePElement(), e._insertElement(t, L.HTML);
}
function Js(e, t) {
	e.openElements.hasInButtonScope(z.P) && e._closePElement(), e._insertElement(t, L.HTML), e.tokenizer.state = eo.PLAINTEXT;
}
function Ys(e, t) {
	e.openElements.hasInScope(z.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(z.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, L.HTML), e.framesetOk = !1;
}
function Xs(e, t) {
	let n = e.activeFormattingElements.getElementEntryInScopeWithTagName(R.A);
	n && (ms(e, t), e.openElements.remove(n.element), e.activeFormattingElements.removeEntry(n)), e._reconstructActiveFormattingElements(), e._insertElement(t, L.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Zs(e, t) {
	e._reconstructActiveFormattingElements(), e._insertElement(t, L.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Qs(e, t) {
	e._reconstructActiveFormattingElements(), e.openElements.hasInScope(z.NOBR) && (ms(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, L.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function $s(e, t) {
	e._reconstructActiveFormattingElements(), e._insertElement(t, L.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function ec(e, t) {
	e.treeAdapter.getDocumentMode(e.document) !== Ya.QUIRKS && e.openElements.hasInButtonScope(z.P) && e._closePElement(), e._insertElement(t, L.HTML), e.framesetOk = !1, e.insertionMode = H.IN_TABLE;
}
function tc(e, t) {
	e._reconstructActiveFormattingElements(), e._appendElement(t, L.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function nc(e) {
	let t = Na(e, Ja.TYPE);
	return t != null && t.toLowerCase() === ts;
}
function rc(e, t) {
	e._reconstructActiveFormattingElements(), e._appendElement(t, L.HTML), nc(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function ic(e, t) {
	e._appendElement(t, L.HTML), t.ackSelfClosing = !0;
}
function ac(e, t) {
	e.openElements.hasInButtonScope(z.P) && e._closePElement(), e._appendElement(t, L.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function oc(e, t) {
	t.tagName = R.IMG, t.tagID = z.IMG, tc(e, t);
}
function sc(e, t) {
	e._insertElement(t, L.HTML), e.skipNextNewLine = !0, e.tokenizer.state = eo.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = H.TEXT;
}
function cc(e, t) {
	e.openElements.hasInButtonScope(z.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, eo.RAWTEXT);
}
function lc(e, t) {
	e.framesetOk = !1, e._switchToTextParsing(t, eo.RAWTEXT);
}
function uc(e, t) {
	e._switchToTextParsing(t, eo.RAWTEXT);
}
function dc(e, t) {
	e._reconstructActiveFormattingElements(), e._insertElement(t, L.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === H.IN_TABLE || e.insertionMode === H.IN_CAPTION || e.insertionMode === H.IN_TABLE_BODY || e.insertionMode === H.IN_ROW || e.insertionMode === H.IN_CELL ? H.IN_SELECT_IN_TABLE : H.IN_SELECT;
}
function fc(e, t) {
	e.openElements.currentTagId === z.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, L.HTML);
}
function pc(e, t) {
	e.openElements.hasInScope(z.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, L.HTML);
}
function mc(e, t) {
	e.openElements.hasInScope(z.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(z.RTC), e._insertElement(t, L.HTML);
}
function hc(e, t) {
	e._reconstructActiveFormattingElements(), Jo(t), Xo(t), t.selfClosing ? e._appendElement(t, L.MATHML) : e._insertElement(t, L.MATHML), t.ackSelfClosing = !0;
}
function gc(e, t) {
	e._reconstructActiveFormattingElements(), Yo(t), Xo(t), t.selfClosing ? e._appendElement(t, L.SVG) : e._insertElement(t, L.SVG), t.ackSelfClosing = !0;
}
function _c(e, t) {
	e._reconstructActiveFormattingElements(), e._insertElement(t, L.HTML);
}
function vc(e, t) {
	switch (t.tagID) {
		case z.I:
		case z.S:
		case z.B:
		case z.U:
		case z.EM:
		case z.TT:
		case z.BIG:
		case z.CODE:
		case z.FONT:
		case z.SMALL:
		case z.STRIKE:
		case z.STRONG:
			Zs(e, t);
			break;
		case z.A:
			Xs(e, t);
			break;
		case z.H1:
		case z.H2:
		case z.H3:
		case z.H4:
		case z.H5:
		case z.H6:
			Ws(e, t);
			break;
		case z.P:
		case z.DL:
		case z.OL:
		case z.UL:
		case z.DIV:
		case z.DIR:
		case z.NAV:
		case z.MAIN:
		case z.MENU:
		case z.ASIDE:
		case z.CENTER:
		case z.FIGURE:
		case z.FOOTER:
		case z.HEADER:
		case z.HGROUP:
		case z.DIALOG:
		case z.DETAILS:
		case z.ADDRESS:
		case z.ARTICLE:
		case z.SEARCH:
		case z.SECTION:
		case z.SUMMARY:
		case z.FIELDSET:
		case z.BLOCKQUOTE:
		case z.FIGCAPTION:
			Us(e, t);
			break;
		case z.LI:
		case z.DD:
		case z.DT:
			qs(e, t);
			break;
		case z.BR:
		case z.IMG:
		case z.WBR:
		case z.AREA:
		case z.EMBED:
		case z.KEYGEN:
			tc(e, t);
			break;
		case z.HR:
			ac(e, t);
			break;
		case z.RB:
		case z.RTC:
			pc(e, t);
			break;
		case z.RT:
		case z.RP:
			mc(e, t);
			break;
		case z.PRE:
		case z.LISTING:
			Gs(e, t);
			break;
		case z.XMP:
			cc(e, t);
			break;
		case z.SVG:
			gc(e, t);
			break;
		case z.HTML:
			Bs(e, t);
			break;
		case z.BASE:
		case z.LINK:
		case z.META:
		case z.STYLE:
		case z.TITLE:
		case z.SCRIPT:
		case z.BGSOUND:
		case z.BASEFONT:
		case z.TEMPLATE:
			Ds(e, t);
			break;
		case z.BODY:
			Vs(e, t);
			break;
		case z.FORM:
			Ks(e, t);
			break;
		case z.NOBR:
			Qs(e, t);
			break;
		case z.MATH:
			hc(e, t);
			break;
		case z.TABLE:
			ec(e, t);
			break;
		case z.INPUT:
			rc(e, t);
			break;
		case z.PARAM:
		case z.TRACK:
		case z.SOURCE:
			ic(e, t);
			break;
		case z.IMAGE:
			oc(e, t);
			break;
		case z.BUTTON:
			Ys(e, t);
			break;
		case z.APPLET:
		case z.OBJECT:
		case z.MARQUEE:
			$s(e, t);
			break;
		case z.IFRAME:
			lc(e, t);
			break;
		case z.SELECT:
			dc(e, t);
			break;
		case z.OPTION:
		case z.OPTGROUP:
			fc(e, t);
			break;
		case z.NOEMBED:
		case z.NOFRAMES:
			uc(e, t);
			break;
		case z.FRAMESET:
			Hs(e, t);
			break;
		case z.TEXTAREA:
			sc(e, t);
			break;
		case z.NOSCRIPT:
			e.options.scriptingEnabled ? uc(e, t) : _c(e, t);
			break;
		case z.PLAINTEXT:
			Js(e, t);
			break;
		case z.COL:
		case z.TH:
		case z.TD:
		case z.TR:
		case z.HEAD:
		case z.FRAME:
		case z.TBODY:
		case z.TFOOT:
		case z.THEAD:
		case z.CAPTION:
		case z.COLGROUP: break;
		default: _c(e, t);
	}
}
function yc(e, t) {
	if (e.openElements.hasInScope(z.BODY) && (e.insertionMode = H.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
		let n = e.openElements.tryPeekProperlyNestedBodyElement();
		n && e._setEndLocation(n, t);
	}
}
function bc(e, t) {
	e.openElements.hasInScope(z.BODY) && (e.insertionMode = H.AFTER_BODY, hl(e, t));
}
function xc(e, t) {
	let n = t.tagID;
	e.openElements.hasInScope(n) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(n));
}
function Sc(e) {
	let t = e.openElements.tmplCount > 0, { formElement: n } = e;
	t || (e.formElement = null), (n || t) && e.openElements.hasInScope(z.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(z.FORM) : n && e.openElements.remove(n));
}
function Cc(e) {
	e.openElements.hasInButtonScope(z.P) || e._insertFakeElement(R.P, z.P), e._closePElement();
}
function wc(e) {
	e.openElements.hasInListItemScope(z.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(z.LI), e.openElements.popUntilTagNamePopped(z.LI));
}
function Tc(e, t) {
	let n = t.tagID;
	e.openElements.hasInScope(n) && (e.openElements.generateImpliedEndTagsWithExclusion(n), e.openElements.popUntilTagNamePopped(n));
}
function Ec(e) {
	e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function Dc(e, t) {
	let n = t.tagID;
	e.openElements.hasInScope(n) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(n), e.activeFormattingElements.clearToLastMarker());
}
function Oc(e) {
	e._reconstructActiveFormattingElements(), e._insertFakeElement(R.BR, z.BR), e.openElements.pop(), e.framesetOk = !1;
}
function kc(e, t) {
	let n = t.tagName, r = t.tagID;
	for (let t = e.openElements.stackTop; t > 0; t--) {
		let i = e.openElements.items[t], a = e.openElements.tagIDs[t];
		if (r === a && (r !== z.UNKNOWN || e.treeAdapter.getTagName(i) === n)) {
			e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.stackTop >= t && e.openElements.shortenToLength(t);
			break;
		}
		if (e._isSpecialElement(i, a)) break;
	}
}
function Ac(e, t) {
	switch (t.tagID) {
		case z.A:
		case z.B:
		case z.I:
		case z.S:
		case z.U:
		case z.EM:
		case z.TT:
		case z.BIG:
		case z.CODE:
		case z.FONT:
		case z.NOBR:
		case z.SMALL:
		case z.STRIKE:
		case z.STRONG:
			ms(e, t);
			break;
		case z.P:
			Cc(e);
			break;
		case z.DL:
		case z.UL:
		case z.OL:
		case z.DIR:
		case z.DIV:
		case z.NAV:
		case z.PRE:
		case z.MAIN:
		case z.MENU:
		case z.ASIDE:
		case z.BUTTON:
		case z.CENTER:
		case z.FIGURE:
		case z.FOOTER:
		case z.HEADER:
		case z.HGROUP:
		case z.DIALOG:
		case z.ADDRESS:
		case z.ARTICLE:
		case z.DETAILS:
		case z.SEARCH:
		case z.SECTION:
		case z.SUMMARY:
		case z.LISTING:
		case z.FIELDSET:
		case z.BLOCKQUOTE:
		case z.FIGCAPTION:
			xc(e, t);
			break;
		case z.LI:
			wc(e);
			break;
		case z.DD:
		case z.DT:
			Tc(e, t);
			break;
		case z.H1:
		case z.H2:
		case z.H3:
		case z.H4:
		case z.H5:
		case z.H6:
			Ec(e);
			break;
		case z.BR:
			Oc(e);
			break;
		case z.BODY:
			yc(e, t);
			break;
		case z.HTML:
			bc(e, t);
			break;
		case z.FORM:
			Sc(e);
			break;
		case z.APPLET:
		case z.OBJECT:
		case z.MARQUEE:
			Dc(e, t);
			break;
		case z.TEMPLATE:
			ks(e, t);
			break;
		default: kc(e, t);
	}
}
function jc(e, t) {
	e.tmplInsertionModeStack.length > 0 ? pl(e, t) : vs(e, t);
}
function Mc(e, t) {
	var n;
	t.tagID === z.SCRIPT && ((n = e.scriptHandler) == null || n.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function Nc(e, t) {
	e._err(t, F.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function Pc(e, t) {
	if (e.openElements.currentTagId !== void 0 && as.has(e.openElements.currentTagId)) switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = H.IN_TABLE_TEXT, t.type) {
		case I.CHARACTER:
			qc(e, t);
			break;
		case I.WHITESPACE_CHARACTER: Kc(e, t);
	}
	else Gc(e, t);
}
function Fc(e, t) {
	e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, L.HTML), e.insertionMode = H.IN_CAPTION;
}
function Ic(e, t) {
	e.openElements.clearBackToTableContext(), e._insertElement(t, L.HTML), e.insertionMode = H.IN_COLUMN_GROUP;
}
function Lc(e, t) {
	e.openElements.clearBackToTableContext(), e._insertFakeElement(R.COLGROUP, z.COLGROUP), e.insertionMode = H.IN_COLUMN_GROUP, Qc(e, t);
}
function Rc(e, t) {
	e.openElements.clearBackToTableContext(), e._insertElement(t, L.HTML), e.insertionMode = H.IN_TABLE_BODY;
}
function zc(e, t) {
	e.openElements.clearBackToTableContext(), e._insertFakeElement(R.TBODY, z.TBODY), e.insertionMode = H.IN_TABLE_BODY, tl(e, t);
}
function Bc(e, t) {
	e.openElements.hasInTableScope(z.TABLE) && (e.openElements.popUntilTagNamePopped(z.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function Vc(e, t) {
	nc(t) ? e._appendElement(t, L.HTML) : Gc(e, t), t.ackSelfClosing = !0;
}
function Hc(e, t) {
	!e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, L.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function Uc(e, t) {
	switch (t.tagID) {
		case z.TD:
		case z.TH:
		case z.TR:
			zc(e, t);
			break;
		case z.STYLE:
		case z.SCRIPT:
		case z.TEMPLATE:
			Ds(e, t);
			break;
		case z.COL:
			Lc(e, t);
			break;
		case z.FORM:
			Hc(e, t);
			break;
		case z.TABLE:
			Bc(e, t);
			break;
		case z.TBODY:
		case z.TFOOT:
		case z.THEAD:
			Rc(e, t);
			break;
		case z.INPUT:
			Vc(e, t);
			break;
		case z.CAPTION:
			Fc(e, t);
			break;
		case z.COLGROUP:
			Ic(e, t);
			break;
		default: Gc(e, t);
	}
}
function Wc(e, t) {
	switch (t.tagID) {
		case z.TABLE:
			e.openElements.hasInTableScope(z.TABLE) && (e.openElements.popUntilTagNamePopped(z.TABLE), e._resetInsertionMode());
			break;
		case z.TEMPLATE:
			ks(e, t);
			break;
		case z.BODY:
		case z.CAPTION:
		case z.COL:
		case z.COLGROUP:
		case z.HTML:
		case z.TBODY:
		case z.TD:
		case z.TFOOT:
		case z.TH:
		case z.THEAD:
		case z.TR: break;
		default: Gc(e, t);
	}
}
function Gc(e, t) {
	let n = e.fosterParentingEnabled;
	e.fosterParentingEnabled = !0, Ls(e, t), e.fosterParentingEnabled = n;
}
function Kc(e, t) {
	e.pendingCharacterTokens.push(t);
}
function qc(e, t) {
	e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function Jc(e, t) {
	let n = 0;
	if (e.hasNonWhitespacePendingCharacterToken) for (; n < e.pendingCharacterTokens.length; n++) Gc(e, e.pendingCharacterTokens[n]);
	else for (; n < e.pendingCharacterTokens.length; n++) e._insertCharacters(e.pendingCharacterTokens[n]);
	e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
var Yc = /* @__PURE__ */ new Set([
	z.CAPTION,
	z.COL,
	z.COLGROUP,
	z.TBODY,
	z.TD,
	z.TFOOT,
	z.TH,
	z.THEAD,
	z.TR
]);
function Xc(e, t) {
	let n = t.tagID;
	Yc.has(n) ? e.openElements.hasInTableScope(z.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(z.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = H.IN_TABLE, Uc(e, t)) : vc(e, t);
}
function Zc(e, t) {
	let n = t.tagID;
	switch (n) {
		case z.CAPTION:
		case z.TABLE:
			e.openElements.hasInTableScope(z.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(z.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = H.IN_TABLE, n === z.TABLE && Wc(e, t));
			break;
		case z.BODY:
		case z.COL:
		case z.COLGROUP:
		case z.HTML:
		case z.TBODY:
		case z.TD:
		case z.TFOOT:
		case z.TH:
		case z.THEAD:
		case z.TR: break;
		default: Ac(e, t);
	}
}
function Qc(e, t) {
	switch (t.tagID) {
		case z.HTML:
			vc(e, t);
			break;
		case z.COL:
			e._appendElement(t, L.HTML), t.ackSelfClosing = !0;
			break;
		case z.TEMPLATE:
			Ds(e, t);
			break;
		default: el(e, t);
	}
}
function $c(e, t) {
	switch (t.tagID) {
		case z.COLGROUP:
			e.openElements.currentTagId === z.COLGROUP && (e.openElements.pop(), e.insertionMode = H.IN_TABLE);
			break;
		case z.TEMPLATE:
			ks(e, t);
			break;
		case z.COL: break;
		default: el(e, t);
	}
}
function el(e, t) {
	e.openElements.currentTagId === z.COLGROUP && (e.openElements.pop(), e.insertionMode = H.IN_TABLE, e._processToken(t));
}
function tl(e, t) {
	switch (t.tagID) {
		case z.TR:
			e.openElements.clearBackToTableBodyContext(), e._insertElement(t, L.HTML), e.insertionMode = H.IN_ROW;
			break;
		case z.TH:
		case z.TD:
			e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(R.TR, z.TR), e.insertionMode = H.IN_ROW, rl(e, t);
			break;
		case z.CAPTION:
		case z.COL:
		case z.COLGROUP:
		case z.TBODY:
		case z.TFOOT:
		case z.THEAD:
			e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = H.IN_TABLE, Uc(e, t));
			break;
		default: Uc(e, t);
	}
}
function nl(e, t) {
	let n = t.tagID;
	switch (t.tagID) {
		case z.TBODY:
		case z.TFOOT:
		case z.THEAD:
			e.openElements.hasInTableScope(n) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = H.IN_TABLE);
			break;
		case z.TABLE:
			e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = H.IN_TABLE, Wc(e, t));
			break;
		case z.BODY:
		case z.CAPTION:
		case z.COL:
		case z.COLGROUP:
		case z.HTML:
		case z.TD:
		case z.TH:
		case z.TR: break;
		default: Wc(e, t);
	}
}
function rl(e, t) {
	switch (t.tagID) {
		case z.TH:
		case z.TD:
			e.openElements.clearBackToTableRowContext(), e._insertElement(t, L.HTML), e.insertionMode = H.IN_CELL, e.activeFormattingElements.insertMarker();
			break;
		case z.CAPTION:
		case z.COL:
		case z.COLGROUP:
		case z.TBODY:
		case z.TFOOT:
		case z.THEAD:
		case z.TR:
			e.openElements.hasInTableScope(z.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = H.IN_TABLE_BODY, tl(e, t));
			break;
		default: Uc(e, t);
	}
}
function il(e, t) {
	switch (t.tagID) {
		case z.TR:
			e.openElements.hasInTableScope(z.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = H.IN_TABLE_BODY);
			break;
		case z.TABLE:
			e.openElements.hasInTableScope(z.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = H.IN_TABLE_BODY, nl(e, t));
			break;
		case z.TBODY:
		case z.TFOOT:
		case z.THEAD:
			(e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(z.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = H.IN_TABLE_BODY, nl(e, t));
			break;
		case z.BODY:
		case z.CAPTION:
		case z.COL:
		case z.COLGROUP:
		case z.HTML:
		case z.TD:
		case z.TH: break;
		default: Wc(e, t);
	}
}
function al(e, t) {
	let n = t.tagID;
	Yc.has(n) ? (e.openElements.hasInTableScope(z.TD) || e.openElements.hasInTableScope(z.TH)) && (e._closeTableCell(), rl(e, t)) : vc(e, t);
}
function ol(e, t) {
	let n = t.tagID;
	switch (n) {
		case z.TD:
		case z.TH:
			e.openElements.hasInTableScope(n) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(n), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = H.IN_ROW);
			break;
		case z.TABLE:
		case z.TBODY:
		case z.TFOOT:
		case z.THEAD:
		case z.TR:
			e.openElements.hasInTableScope(n) && (e._closeTableCell(), il(e, t));
			break;
		case z.BODY:
		case z.CAPTION:
		case z.COL:
		case z.COLGROUP:
		case z.HTML: break;
		default: Ac(e, t);
	}
}
function sl(e, t) {
	switch (t.tagID) {
		case z.HTML:
			vc(e, t);
			break;
		case z.OPTION:
			e.openElements.currentTagId === z.OPTION && e.openElements.pop(), e._insertElement(t, L.HTML);
			break;
		case z.OPTGROUP:
			e.openElements.currentTagId === z.OPTION && e.openElements.pop(), e.openElements.currentTagId === z.OPTGROUP && e.openElements.pop(), e._insertElement(t, L.HTML);
			break;
		case z.HR:
			e.openElements.currentTagId === z.OPTION && e.openElements.pop(), e.openElements.currentTagId === z.OPTGROUP && e.openElements.pop(), e._appendElement(t, L.HTML), t.ackSelfClosing = !0;
			break;
		case z.INPUT:
		case z.KEYGEN:
		case z.TEXTAREA:
		case z.SELECT:
			e.openElements.hasInSelectScope(z.SELECT) && (e.openElements.popUntilTagNamePopped(z.SELECT), e._resetInsertionMode(), t.tagID !== z.SELECT && e._processStartTag(t));
			break;
		case z.SCRIPT:
		case z.TEMPLATE: Ds(e, t);
	}
}
function cl(e, t) {
	switch (t.tagID) {
		case z.OPTGROUP:
			e.openElements.stackTop > 0 && e.openElements.currentTagId === z.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === z.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === z.OPTGROUP && e.openElements.pop();
			break;
		case z.OPTION:
			e.openElements.currentTagId === z.OPTION && e.openElements.pop();
			break;
		case z.SELECT:
			e.openElements.hasInSelectScope(z.SELECT) && (e.openElements.popUntilTagNamePopped(z.SELECT), e._resetInsertionMode());
			break;
		case z.TEMPLATE: ks(e, t);
	}
}
function ll(e, t) {
	let n = t.tagID;
	n === z.CAPTION || n === z.TABLE || n === z.TBODY || n === z.TFOOT || n === z.THEAD || n === z.TR || n === z.TD || n === z.TH ? (e.openElements.popUntilTagNamePopped(z.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : sl(e, t);
}
function ul(e, t) {
	let n = t.tagID;
	n === z.CAPTION || n === z.TABLE || n === z.TBODY || n === z.TFOOT || n === z.THEAD || n === z.TR || n === z.TD || n === z.TH ? e.openElements.hasInTableScope(n) && (e.openElements.popUntilTagNamePopped(z.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : cl(e, t);
}
function dl(e, t) {
	switch (t.tagID) {
		case z.BASE:
		case z.BASEFONT:
		case z.BGSOUND:
		case z.LINK:
		case z.META:
		case z.NOFRAMES:
		case z.SCRIPT:
		case z.STYLE:
		case z.TEMPLATE:
		case z.TITLE:
			Ds(e, t);
			break;
		case z.CAPTION:
		case z.COLGROUP:
		case z.TBODY:
		case z.TFOOT:
		case z.THEAD:
			e.tmplInsertionModeStack[0] = H.IN_TABLE, e.insertionMode = H.IN_TABLE, Uc(e, t);
			break;
		case z.COL:
			e.tmplInsertionModeStack[0] = H.IN_COLUMN_GROUP, e.insertionMode = H.IN_COLUMN_GROUP, Qc(e, t);
			break;
		case z.TR:
			e.tmplInsertionModeStack[0] = H.IN_TABLE_BODY, e.insertionMode = H.IN_TABLE_BODY, tl(e, t);
			break;
		case z.TD:
		case z.TH:
			e.tmplInsertionModeStack[0] = H.IN_ROW, e.insertionMode = H.IN_ROW, rl(e, t);
			break;
		default: e.tmplInsertionModeStack[0] = H.IN_BODY, e.insertionMode = H.IN_BODY, vc(e, t);
	}
}
function fl(e, t) {
	t.tagID === z.TEMPLATE && ks(e, t);
}
function pl(e, t) {
	e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(z.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : vs(e, t);
}
function ml(e, t) {
	t.tagID === z.HTML ? vc(e, t) : gl(e, t);
}
function hl(e, t) {
	if (t.tagID === z.HTML) {
		if (e.fragmentContext || (e.insertionMode = H.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === z.HTML) {
			e._setEndLocation(e.openElements.items[0], t);
			let n = e.openElements.items[1];
			n && !e.treeAdapter.getNodeSourceCodeLocation(n)?.endTag && e._setEndLocation(n, t);
		}
	} else gl(e, t);
}
function gl(e, t) {
	e.insertionMode = H.IN_BODY, Ls(e, t);
}
function _l(e, t) {
	switch (t.tagID) {
		case z.HTML:
			vc(e, t);
			break;
		case z.FRAMESET:
			e._insertElement(t, L.HTML);
			break;
		case z.FRAME:
			e._appendElement(t, L.HTML), t.ackSelfClosing = !0;
			break;
		case z.NOFRAMES: Ds(e, t);
	}
}
function vl(e, t) {
	t.tagID === z.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== z.FRAMESET && (e.insertionMode = H.AFTER_FRAMESET));
}
function yl(e, t) {
	switch (t.tagID) {
		case z.HTML:
			vc(e, t);
			break;
		case z.NOFRAMES: Ds(e, t);
	}
}
function bl(e, t) {
	t.tagID === z.HTML && (e.insertionMode = H.AFTER_AFTER_FRAMESET);
}
function xl(e, t) {
	t.tagID === z.HTML ? vc(e, t) : Sl(e, t);
}
function Sl(e, t) {
	e.insertionMode = H.IN_BODY, Ls(e, t);
}
function Cl(e, t) {
	switch (t.tagID) {
		case z.HTML:
			vc(e, t);
			break;
		case z.NOFRAMES: Ds(e, t);
	}
}
function wl(e, t) {
	t.chars = "�", e._insertCharacters(t);
}
function Tl(e, t) {
	e._insertCharacters(t), e.framesetOk = !1;
}
function El(e) {
	for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== L.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current);) e.openElements.pop();
}
function Dl(e, t) {
	if (qo(t)) El(e), e._startTagOutsideForeignContent(t);
	else {
		let n = e._getAdjustedCurrentElement(), r = e.treeAdapter.getNamespaceURI(n);
		r === L.MATHML ? Jo(t) : r === L.SVG && (Zo(t), Yo(t)), Xo(t), t.selfClosing ? e._appendElement(t, r) : e._insertElement(t, r), t.ackSelfClosing = !0;
	}
}
function Ol(e, t) {
	if (t.tagID === z.P || t.tagID === z.BR) {
		El(e), e._endTagOutsideForeignContent(t);
		return;
	}
	for (let n = e.openElements.stackTop; n > 0; n--) {
		let r = e.openElements.items[n];
		if (e.treeAdapter.getNamespaceURI(r) === L.HTML) {
			e._endTagOutsideForeignContent(t);
			break;
		}
		let i = e.treeAdapter.getTagName(r);
		if (i.toLowerCase() === t.tagName) {
			t.tagName = i, e.openElements.shortenToLength(n);
			break;
		}
	}
}
R.AREA, R.BASE, R.BASEFONT, R.BGSOUND, R.BR, R.COL, R.EMBED, R.FRAME, R.HR, R.IMG, R.INPUT, R.KEYGEN, R.LINK, R.META, R.PARAM, R.SOURCE, R.TRACK, R.WBR;
//#endregion
//#region node_modules/unist-util-position/lib/index.js
var kl = jl("end"), Al = jl("start");
function jl(e) {
	return t;
	function t(t) {
		let n = t && t.position && t.position[e] || {};
		if (typeof n.line == "number" && n.line > 0 && typeof n.column == "number" && n.column > 0) return {
			line: n.line,
			column: n.column,
			offset: typeof n.offset == "number" && n.offset > -1 ? n.offset : void 0
		};
	}
}
function Ml(e) {
	let t = Al(e), n = kl(e);
	if (t && n) return {
		start: t,
		end: n
	};
}
//#endregion
//#region node_modules/hast-util-raw/node_modules/unist-util-visit/lib/index.js
function Nl(e, t, n, r) {
	let i, a, o;
	typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), kt(e, a, s, i);
	function s(e, t) {
		let n = t[t.length - 1], r = n ? n.children.indexOf(e) : void 0;
		return o(e, r, n);
	}
}
//#endregion
//#region node_modules/hast-util-raw/lib/index.js
var Pl = /<(\/?)(iframe|noembed|noframes|plaintext|script|style|textarea|title|xmp)(?=[\t\n\f\r />])/gi, Fl = /* @__PURE__ */ new Set([
	"mdxFlowExpression",
	"mdxJsxFlowElement",
	"mdxJsxTextElement",
	"mdxTextExpression",
	"mdxjsEsm"
]), Il = {
	sourceCodeLocationInfo: !0,
	scriptingEnabled: !1
};
function Ll(e, t) {
	let n = Zl(e), r = la("type", {
		handlers: {
			root: zl,
			element: Bl,
			text: Vl,
			comment: Wl,
			doctype: Hl,
			raw: Gl
		},
		unknown: Kl
	}), i = {
		parser: n ? new ss(Il) : ss.getFragmentParser(void 0, Il),
		handle(e) {
			r(e, i);
		},
		stitches: !1,
		options: t || {}
	};
	r(e, i), ql(i, Al());
	let a = Si(n ? i.parser.document : i.parser.getFragment(), { file: i.options.file });
	return i.stitches && Nl(a, "comment", function(e, t, n) {
		let r = e;
		if (r.value.stitch && n && t !== void 0) {
			let e = n.children;
			return e[t] = r.value.stitch, t;
		}
	}), a.type === "root" && a.children.length === 1 && a.children[0].type === e.type ? a.children[0] : a;
}
function Rl(e, t) {
	let n = -1;
	/* istanbul ignore else - invalid nodes, see rehypejs/rehype-raw#7. */
	if (e) for (; ++n < e.length;) t.handle(e[n]);
}
function zl(e, t) {
	Rl(e.children, t);
}
function Bl(e, t) {
	Yl(e, t), Rl(e.children, t), Xl(e, t);
}
function Vl(e, t) {
	t.parser.tokenizer.state > 4 && (t.parser.tokenizer.state = 0);
	let n = {
		type: I.CHARACTER,
		chars: e.value,
		location: Ql(e)
	};
	ql(t, Al(e)), t.parser.currentToken = n, t.parser._processToken(t.parser.currentToken);
}
function Hl(e, t) {
	let n = {
		type: I.DOCTYPE,
		name: "html",
		forceQuirks: !1,
		publicId: "",
		systemId: "",
		location: Ql(e)
	};
	ql(t, Al(e)), t.parser.currentToken = n, t.parser._processToken(t.parser.currentToken);
}
function Ul(e, t) {
	t.stitches = !0;
	let n = $l(e);
	"children" in e && "children" in n && (n.children = Ll({
		type: "root",
		children: e.children
	}, t.options).children), Wl({
		type: "comment",
		value: { stitch: n }
	}, t);
}
function Wl(e, t) {
	let n = e.value, r = {
		type: I.COMMENT,
		data: n,
		location: Ql(e)
	};
	ql(t, Al(e)), t.parser.currentToken = r, t.parser._processToken(t.parser.currentToken);
}
function Gl(e, t) {
	/* c8 ignore next 12 -- removed in <https://github.com/inikulin/parse5/pull/897> */
	if (t.parser.tokenizer.preprocessor.html = "", t.parser.tokenizer.preprocessor.pos = -1, t.parser.tokenizer.preprocessor.lastGapPos = -2, t.parser.tokenizer.preprocessor.gapStack = [], t.parser.tokenizer.preprocessor.skipNextNewLine = !1, t.parser.tokenizer.preprocessor.lastChunkWritten = !1, t.parser.tokenizer.preprocessor.endOfChunkHit = !1, t.parser.tokenizer.preprocessor.isEol = !1, Jl(t, Al(e)), t.parser.tokenizer.write(t.options.tagfilter ? e.value.replace(Pl, "&lt;$1$2") : e.value, !1), t.parser.tokenizer._runParsingLoop(), t.parser.tokenizer.state === 72 || t.parser.tokenizer.state === 78) {
		t.parser.tokenizer.preprocessor.lastChunkWritten = !0;
		let e = t.parser.tokenizer._consume();
		t.parser.tokenizer._callState(e);
	}
}
function Kl(e, t) {
	let n = e;
	if (t.options.passThrough && t.options.passThrough.includes(n.type)) Ul(n, t);
	else {
		let e = "";
		throw Fl.has(n.type) && (e = ". It looks like you are using MDX nodes with `hast-util-raw` (or `rehype-raw`). If you use this because you are using remark or rehype plugins that inject `'html'` nodes, then please raise an issue with that plugin, as its a bad and slow idea. If you use this because you are using markdown syntax, then you have to configure this utility (or plugin) to pass through these nodes (see `passThrough` in docs), but you can also migrate to use the MDX syntax"), Error("Cannot compile `" + n.type + "` node" + e);
	}
}
function ql(e, t) {
	Jl(e, t);
	let n = e.parser.tokenizer.currentCharacterToken;
	n && n.location && (n.location.endLine = e.parser.tokenizer.preprocessor.line, n.location.endCol = e.parser.tokenizer.preprocessor.col + 1, n.location.endOffset = e.parser.tokenizer.preprocessor.offset + 1, e.parser.currentToken = n, e.parser._processToken(e.parser.currentToken)), e.parser.tokenizer.paused = !1, e.parser.tokenizer.inLoop = !1, e.parser.tokenizer.active = !1, e.parser.tokenizer.returnState = eo.DATA, e.parser.tokenizer.charRefCode = -1, e.parser.tokenizer.consumedAfterSnapshot = -1, e.parser.tokenizer.currentLocation = null, e.parser.tokenizer.currentCharacterToken = null, e.parser.tokenizer.currentToken = null, e.parser.tokenizer.currentAttr = {
		name: "",
		value: ""
	};
}
function Jl(e, t) {
	if (t && t.offset !== void 0) {
		let n = {
			startLine: t.line,
			startCol: t.column,
			startOffset: t.offset,
			endLine: -1,
			endCol: -1,
			endOffset: -1
		};
		e.parser.tokenizer.preprocessor.lineStartPos = -t.column + 1, e.parser.tokenizer.preprocessor.droppedBufferSize = t.offset, e.parser.tokenizer.preprocessor.line = t.line, e.parser.tokenizer.currentLocation = n;
	}
}
function Yl(e, t) {
	let n = e.tagName.toLowerCase();
	if (t.parser.tokenizer.state === eo.PLAINTEXT) return;
	ql(t, Al(e));
	let r = t.parser.openElements.current, i = "namespaceURI" in r ? r.namespaceURI : zn.html;
	i === zn.html && n === "svg" && (i = zn.svg);
	let a = pa({
		...e,
		children: []
	}, { space: i === zn.svg ? "svg" : "html" }), o = {
		type: I.START_TAG,
		tagName: n,
		tagID: Za(n),
		selfClosing: !1,
		ackSelfClosing: !1,
		/* c8 ignore next */
		attrs: "attrs" in a ? a.attrs : [],
		location: Ql(e)
	};
	t.parser.currentToken = o, t.parser._processToken(t.parser.currentToken), t.parser.tokenizer.lastStartTagName = n;
}
function Xl(e, t) {
	let n = e.tagName.toLowerCase();
	if (!t.parser.tokenizer.inForeignNode && Ca.includes(n) || t.parser.tokenizer.state === eo.PLAINTEXT) return;
	ql(t, kl(e));
	let r = {
		type: I.END_TAG,
		tagName: n,
		tagID: Za(n),
		selfClosing: !1,
		ackSelfClosing: !1,
		attrs: [],
		location: Ql(e)
	};
	t.parser.currentToken = r, t.parser._processToken(t.parser.currentToken), n === t.parser.tokenizer.lastStartTagName && (t.parser.tokenizer.state === eo.RCDATA || t.parser.tokenizer.state === eo.RAWTEXT || t.parser.tokenizer.state === eo.SCRIPT_DATA) && (t.parser.tokenizer.state = eo.DATA);
}
function Zl(e) {
	let t = e.type === "root" ? e.children[0] : e;
	return !!(t && (t.type === "doctype" || t.type === "element" && t.tagName.toLowerCase() === "html"));
}
function Ql(e) {
	let t = Al(e) || {
		line: void 0,
		column: void 0,
		offset: void 0
	}, n = kl(e) || {
		line: void 0,
		column: void 0,
		offset: void 0
	};
	return {
		startLine: t.line,
		startCol: t.column,
		startOffset: t.offset,
		endLine: n.line,
		endCol: n.column,
		endOffset: n.offset
	};
}
function $l(e) {
	return "children" in e ? zr({
		...e,
		children: []
	}) : zr(e);
}
//#endregion
//#region node_modules/rehype-raw/lib/index.js
function eu(e) {
	return function(t, n) {
		return Ll(t, {
			...e,
			file: n
		});
	};
}
//#endregion
//#region node_modules/hast-util-sanitize/lib/schema.js
var tu = [
	"ariaDescribedBy",
	"ariaLabel",
	"ariaLabelledBy"
], nu = {
	ancestors: {
		tbody: ["table"],
		td: ["table"],
		th: ["table"],
		thead: ["table"],
		tfoot: ["table"],
		tr: ["table"]
	},
	attributes: {
		a: [
			...tu,
			"dataFootnoteBackref",
			"dataFootnoteRef",
			["className", "data-footnote-backref"],
			"href"
		],
		blockquote: ["cite"],
		code: [["className", /^language-./]],
		del: ["cite"],
		div: ["itemScope", "itemType"],
		dl: [...tu],
		h2: [["className", "sr-only"]],
		img: [
			...tu,
			"longDesc",
			"src"
		],
		input: [["disabled", !0], ["type", "checkbox"]],
		ins: ["cite"],
		li: [["className", "task-list-item"]],
		ol: [...tu, ["className", "contains-task-list"]],
		q: ["cite"],
		section: ["dataFootnotes", ["className", "footnotes"]],
		source: ["srcSet"],
		summary: [...tu],
		table: [...tu],
		ul: [...tu, ["className", "contains-task-list"]],
		"*": /* @__PURE__ */ "abbr.accept.acceptCharset.accessKey.action.align.alt.axis.border.cellPadding.cellSpacing.char.charOff.charSet.checked.clear.colSpan.color.cols.compact.coords.dateTime.dir.encType.frame.hSpace.headers.height.hrefLang.htmlFor.id.isMap.itemProp.label.lang.maxLength.media.method.multiple.name.noHref.noShade.noWrap.open.prompt.readOnly.rev.rowSpan.rows.rules.scope.selected.shape.size.span.start.summary.tabIndex.title.useMap.vAlign.value.width".split(".")
	},
	clobber: [
		"ariaDescribedBy",
		"ariaLabelledBy",
		"id",
		"name"
	],
	clobberPrefix: "user-content-",
	protocols: {
		cite: ["http", "https"],
		href: [
			"http",
			"https",
			"irc",
			"ircs",
			"mailto",
			"xmpp"
		],
		longDesc: ["http", "https"],
		src: ["http", "https"]
	},
	required: { input: {
		disabled: !0,
		type: "checkbox"
	} },
	strip: ["script"],
	tagNames: /* @__PURE__ */ "a.b.blockquote.br.code.dd.del.details.div.dl.dt.em.h1.h2.h3.h4.h5.h6.hr.i.img.input.ins.kbd.li.ol.p.picture.pre.q.rp.rt.ruby.s.samp.section.source.span.strike.strong.sub.summary.sup.table.tbody.td.tfoot.th.thead.tr.tt.ul.var".split(".")
}, ru = {}.hasOwnProperty;
function iu(e, t) {
	let n = {
		type: "root",
		children: []
	}, r = au({
		schema: t ? {
			...nu,
			...t
		} : nu,
		stack: []
	}, e);
	return r && (Array.isArray(r) ? r.length === 1 ? n = r[0] : n.children = r : n = r), n;
}
function au(e, t) {
	if (t && typeof t == "object") {
		let n = t;
		switch (typeof n.type == "string" ? n.type : "") {
			case "comment": return ou(e, n);
			case "doctype": return su(e, n);
			case "element": return cu(e, n);
			case "root": return lu(e, n);
			case "text": return uu(e, n);
		}
	}
}
function ou(e, t) {
	if (e.schema.allowComments) {
		let e = typeof t.value == "string" ? t.value : "", n = e.indexOf("-->"), r = {
			type: "comment",
			value: n < 0 ? e : e.slice(0, n)
		};
		return _u(r, t), r;
	}
}
function su(e, t) {
	if (e.schema.allowDoctypes) {
		let e = { type: "doctype" };
		return _u(e, t), e;
	}
}
function cu(e, t) {
	let n = typeof t.tagName == "string" ? t.tagName : "";
	e.stack.push(n);
	let r = du(e, t.children), i = fu(e, t.properties);
	e.stack.pop();
	let a = !1;
	if (n && n !== "*" && (!e.schema.tagNames || e.schema.tagNames.includes(n)) && (a = !0, e.schema.ancestors && ru.call(e.schema.ancestors, n))) {
		let t = e.schema.ancestors[n], r = -1;
		for (a = !1; ++r < t.length;) e.stack.includes(t[r]) && (a = !0);
	}
	if (!a) return e.schema.strip && !e.schema.strip.includes(n) ? r : void 0;
	let o = {
		type: "element",
		tagName: n,
		properties: i,
		children: r
	};
	return _u(o, t), o;
}
function lu(e, t) {
	let n = {
		type: "root",
		children: du(e, t.children)
	};
	return _u(n, t), n;
}
function uu(e, t) {
	let n = {
		type: "text",
		value: typeof t.value == "string" ? t.value : ""
	};
	return _u(n, t), n;
}
function du(e, t) {
	let n = [];
	if (Array.isArray(t)) {
		let r = t, i = -1;
		for (; ++i < r.length;) {
			let t = au(e, r[i]);
			t && (Array.isArray(t) ? n.push(...t) : n.push(t));
		}
	}
	return n;
}
function fu(e, t) {
	let n = e.stack[e.stack.length - 1], r = e.schema.attributes, i = e.schema.required, a = r && ru.call(r, n) ? r[n] : void 0, o = r && ru.call(r, "*") ? r["*"] : void 0, s = t && typeof t == "object" ? t : {}, c = {}, l;
	for (l in s) if (ru.call(s, l)) {
		let t = s[l], n = pu(e, vu(a, l), l, t);
		n ?? (n = pu(e, vu(o, l), l, t)), n != null && (c[l] = n);
	}
	if (i && ru.call(i, n)) {
		let e = i[n];
		for (l in e) ru.call(e, l) && !ru.call(c, l) && (c[l] = e[l]);
	}
	return c;
}
function pu(e, t, n, r) {
	return t ? Array.isArray(r) ? mu(e, t, n, r) : hu(e, t, n, r) : void 0;
}
function mu(e, t, n, r) {
	let i = -1, a = [];
	for (; ++i < r.length;) {
		let o = hu(e, t, n, r[i]);
		(typeof o == "number" || typeof o == "string") && a.push(o);
	}
	return a;
}
function hu(e, t, n, r) {
	if ((typeof r == "boolean" || typeof r == "number" || typeof r == "string") && gu(e, n, r)) {
		if (typeof t == "object" && t.length > 1) {
			let e = !1, n = 0;
			for (; ++n < t.length;) {
				let i = t[n];
				if (i && typeof i == "object" && "flags" in i) {
					if (i.test(String(r))) {
						e = !0;
						break;
					}
				} else if (i === r) {
					e = !0;
					break;
				}
			}
			if (!e) return;
		}
		return e.schema.clobber && e.schema.clobberPrefix && e.schema.clobber.includes(n) ? e.schema.clobberPrefix + r : r;
	}
}
function gu(e, t, n) {
	let r = e.schema.protocols && ru.call(e.schema.protocols, t) ? e.schema.protocols[t] : void 0;
	if (!r || r.length === 0) return !0;
	let i = String(n), a = i.indexOf(":"), o = i.indexOf("?"), s = i.indexOf("#"), c = i.indexOf("/");
	if (a < 0 || c > -1 && a > c || o > -1 && a > o || s > -1 && a > s) return !0;
	let l = -1;
	for (; ++l < r.length;) {
		let e = r[l];
		if (a === e.length && i.slice(0, e.length) === e) return !0;
	}
	return !1;
}
function _u(e, t) {
	let n = Ml(t);
	t.data && (e.data = zr(t.data)), n && (e.position = n);
}
function vu(e, t) {
	let n, r = -1;
	if (e) for (; ++r < e.length;) {
		let i = e[r], a = typeof i == "string" ? i : i[0];
		if (a === t) return i;
		a === "data*" && (n = i);
	}
	if (t.length > 4 && t.slice(0, 4).toLowerCase() === "data") return n;
}
//#endregion
//#region node_modules/rehype-sanitize/lib/index.js
function yu(e) {
	return function(t) {
		return iu(t, e);
	};
}
//#endregion
//#region node_modules/micromark-util-symbol/lib/codes.js
var bu = {
	carriageReturn: -5,
	lineFeed: -4,
	carriageReturnLineFeed: -3,
	horizontalTab: -2,
	virtualSpace: -1,
	eof: null,
	nul: 0,
	soh: 1,
	stx: 2,
	etx: 3,
	eot: 4,
	enq: 5,
	ack: 6,
	bel: 7,
	bs: 8,
	ht: 9,
	lf: 10,
	vt: 11,
	ff: 12,
	cr: 13,
	so: 14,
	si: 15,
	dle: 16,
	dc1: 17,
	dc2: 18,
	dc3: 19,
	dc4: 20,
	nak: 21,
	syn: 22,
	etb: 23,
	can: 24,
	em: 25,
	sub: 26,
	esc: 27,
	fs: 28,
	gs: 29,
	rs: 30,
	us: 31,
	space: 32,
	exclamationMark: 33,
	quotationMark: 34,
	numberSign: 35,
	dollarSign: 36,
	percentSign: 37,
	ampersand: 38,
	apostrophe: 39,
	leftParenthesis: 40,
	rightParenthesis: 41,
	asterisk: 42,
	plusSign: 43,
	comma: 44,
	dash: 45,
	dot: 46,
	slash: 47,
	digit0: 48,
	digit1: 49,
	digit2: 50,
	digit3: 51,
	digit4: 52,
	digit5: 53,
	digit6: 54,
	digit7: 55,
	digit8: 56,
	digit9: 57,
	colon: 58,
	semicolon: 59,
	lessThan: 60,
	equalsTo: 61,
	greaterThan: 62,
	questionMark: 63,
	atSign: 64,
	uppercaseA: 65,
	uppercaseB: 66,
	uppercaseC: 67,
	uppercaseD: 68,
	uppercaseE: 69,
	uppercaseF: 70,
	uppercaseG: 71,
	uppercaseH: 72,
	uppercaseI: 73,
	uppercaseJ: 74,
	uppercaseK: 75,
	uppercaseL: 76,
	uppercaseM: 77,
	uppercaseN: 78,
	uppercaseO: 79,
	uppercaseP: 80,
	uppercaseQ: 81,
	uppercaseR: 82,
	uppercaseS: 83,
	uppercaseT: 84,
	uppercaseU: 85,
	uppercaseV: 86,
	uppercaseW: 87,
	uppercaseX: 88,
	uppercaseY: 89,
	uppercaseZ: 90,
	leftSquareBracket: 91,
	backslash: 92,
	rightSquareBracket: 93,
	caret: 94,
	underscore: 95,
	graveAccent: 96,
	lowercaseA: 97,
	lowercaseB: 98,
	lowercaseC: 99,
	lowercaseD: 100,
	lowercaseE: 101,
	lowercaseF: 102,
	lowercaseG: 103,
	lowercaseH: 104,
	lowercaseI: 105,
	lowercaseJ: 106,
	lowercaseK: 107,
	lowercaseL: 108,
	lowercaseM: 109,
	lowercaseN: 110,
	lowercaseO: 111,
	lowercaseP: 112,
	lowercaseQ: 113,
	lowercaseR: 114,
	lowercaseS: 115,
	lowercaseT: 116,
	lowercaseU: 117,
	lowercaseV: 118,
	lowercaseW: 119,
	lowercaseX: 120,
	lowercaseY: 121,
	lowercaseZ: 122,
	leftCurlyBrace: 123,
	verticalBar: 124,
	rightCurlyBrace: 125,
	tilde: 126,
	del: 127,
	byteOrderMarker: 65279,
	replacementCharacter: 65533
}, xu = {
	attentionSideAfter: 2,
	attentionSideBefore: 1,
	atxHeadingOpeningFenceSizeMax: 6,
	autolinkDomainSizeMax: 63,
	autolinkSchemeSizeMax: 32,
	cdataOpeningString: "CDATA[",
	characterGroupPunctuation: 2,
	characterGroupWhitespace: 1,
	characterReferenceDecimalSizeMax: 7,
	characterReferenceHexadecimalSizeMax: 6,
	characterReferenceNamedSizeMax: 31,
	codeFencedSequenceSizeMin: 3,
	contentTypeContent: "content",
	contentTypeDocument: "document",
	contentTypeFlow: "flow",
	contentTypeString: "string",
	contentTypeText: "text",
	hardBreakPrefixSizeMin: 2,
	htmlBasic: 6,
	htmlCdata: 5,
	htmlComment: 2,
	htmlComplete: 7,
	htmlDeclaration: 4,
	htmlInstruction: 3,
	htmlRawSizeMax: 8,
	htmlRaw: 1,
	linkResourceDestinationBalanceMax: 32,
	linkReferenceSizeMax: 999,
	listItemValueSizeMax: 10,
	numericBaseDecimal: 10,
	numericBaseHexadecimal: 16,
	tabSize: 4,
	thematicBreakMarkerCountMin: 3,
	v8MaxSafeChunkSize: 1e4
}, Su = {
	data: "data",
	whitespace: "whitespace",
	lineEnding: "lineEnding",
	lineEndingBlank: "lineEndingBlank",
	linePrefix: "linePrefix",
	lineSuffix: "lineSuffix",
	atxHeading: "atxHeading",
	atxHeadingSequence: "atxHeadingSequence",
	atxHeadingText: "atxHeadingText",
	autolink: "autolink",
	autolinkEmail: "autolinkEmail",
	autolinkMarker: "autolinkMarker",
	autolinkProtocol: "autolinkProtocol",
	characterEscape: "characterEscape",
	characterEscapeValue: "characterEscapeValue",
	characterReference: "characterReference",
	characterReferenceMarker: "characterReferenceMarker",
	characterReferenceMarkerNumeric: "characterReferenceMarkerNumeric",
	characterReferenceMarkerHexadecimal: "characterReferenceMarkerHexadecimal",
	characterReferenceValue: "characterReferenceValue",
	codeFenced: "codeFenced",
	codeFencedFence: "codeFencedFence",
	codeFencedFenceSequence: "codeFencedFenceSequence",
	codeFencedFenceInfo: "codeFencedFenceInfo",
	codeFencedFenceMeta: "codeFencedFenceMeta",
	codeFlowValue: "codeFlowValue",
	codeIndented: "codeIndented",
	codeText: "codeText",
	codeTextData: "codeTextData",
	codeTextPadding: "codeTextPadding",
	codeTextSequence: "codeTextSequence",
	content: "content",
	definition: "definition",
	definitionDestination: "definitionDestination",
	definitionDestinationLiteral: "definitionDestinationLiteral",
	definitionDestinationLiteralMarker: "definitionDestinationLiteralMarker",
	definitionDestinationRaw: "definitionDestinationRaw",
	definitionDestinationString: "definitionDestinationString",
	definitionLabel: "definitionLabel",
	definitionLabelMarker: "definitionLabelMarker",
	definitionLabelString: "definitionLabelString",
	definitionMarker: "definitionMarker",
	definitionTitle: "definitionTitle",
	definitionTitleMarker: "definitionTitleMarker",
	definitionTitleString: "definitionTitleString",
	emphasis: "emphasis",
	emphasisSequence: "emphasisSequence",
	emphasisText: "emphasisText",
	escapeMarker: "escapeMarker",
	hardBreakEscape: "hardBreakEscape",
	hardBreakTrailing: "hardBreakTrailing",
	htmlFlow: "htmlFlow",
	htmlFlowData: "htmlFlowData",
	htmlText: "htmlText",
	htmlTextData: "htmlTextData",
	image: "image",
	label: "label",
	labelText: "labelText",
	labelLink: "labelLink",
	labelImage: "labelImage",
	labelMarker: "labelMarker",
	labelImageMarker: "labelImageMarker",
	labelEnd: "labelEnd",
	link: "link",
	paragraph: "paragraph",
	reference: "reference",
	referenceMarker: "referenceMarker",
	referenceString: "referenceString",
	resource: "resource",
	resourceDestination: "resourceDestination",
	resourceDestinationLiteral: "resourceDestinationLiteral",
	resourceDestinationLiteralMarker: "resourceDestinationLiteralMarker",
	resourceDestinationRaw: "resourceDestinationRaw",
	resourceDestinationString: "resourceDestinationString",
	resourceMarker: "resourceMarker",
	resourceTitle: "resourceTitle",
	resourceTitleMarker: "resourceTitleMarker",
	resourceTitleString: "resourceTitleString",
	setextHeading: "setextHeading",
	setextHeadingText: "setextHeadingText",
	setextHeadingLine: "setextHeadingLine",
	setextHeadingLineSequence: "setextHeadingLineSequence",
	strong: "strong",
	strongSequence: "strongSequence",
	strongText: "strongText",
	thematicBreak: "thematicBreak",
	thematicBreakSequence: "thematicBreakSequence",
	blockQuote: "blockQuote",
	blockQuotePrefix: "blockQuotePrefix",
	blockQuoteMarker: "blockQuoteMarker",
	blockQuotePrefixWhitespace: "blockQuotePrefixWhitespace",
	listOrdered: "listOrdered",
	listUnordered: "listUnordered",
	listItemIndent: "listItemIndent",
	listItemMarker: "listItemMarker",
	listItemPrefix: "listItemPrefix",
	listItemPrefixWhitespace: "listItemPrefixWhitespace",
	listItemValue: "listItemValue",
	chunkDocument: "chunkDocument",
	chunkContent: "chunkContent",
	chunkFlow: "chunkFlow",
	chunkText: "chunkText",
	chunkString: "chunkString"
}, Cu = Mu(/[A-Za-z]/), wu = Mu(/[\dA-Za-z]/), Tu = Mu(/[#-'*+\--9=?A-Z^-~]/);
function Eu(e) {
	return e !== null && (e < 32 || e === 127);
}
var Du = Mu(/\d/), Ou = Mu(/[\dA-Fa-f]/), ku = Mu(/[!-/:-@[-`{-~]/);
function U(e) {
	return e !== null && e < -2;
}
function W(e) {
	return e !== null && (e < 0 || e === 32);
}
function G(e) {
	return e === -2 || e === -1 || e === 32;
}
var Au = Mu(/\p{P}|\p{S}/u), ju = Mu(/\s/);
function Mu(e) {
	return t;
	function t(t) {
		return t !== null && t > -1 && e.test(String.fromCharCode(t));
	}
}
var Nu = [
	161,
	161,
	164,
	164,
	167,
	168,
	170,
	170,
	173,
	174,
	176,
	180,
	182,
	186,
	188,
	191,
	198,
	198,
	208,
	208,
	215,
	216,
	222,
	225,
	230,
	230,
	232,
	234,
	236,
	237,
	240,
	240,
	242,
	243,
	247,
	250,
	252,
	252,
	254,
	254,
	257,
	257,
	273,
	273,
	275,
	275,
	283,
	283,
	294,
	295,
	299,
	299,
	305,
	307,
	312,
	312,
	319,
	322,
	324,
	324,
	328,
	331,
	333,
	333,
	338,
	339,
	358,
	359,
	363,
	363,
	462,
	462,
	464,
	464,
	466,
	466,
	468,
	468,
	470,
	470,
	472,
	472,
	474,
	474,
	476,
	476,
	593,
	593,
	609,
	609,
	708,
	708,
	711,
	711,
	713,
	715,
	717,
	717,
	720,
	720,
	728,
	731,
	733,
	733,
	735,
	735,
	768,
	879,
	913,
	929,
	931,
	937,
	945,
	961,
	963,
	969,
	1025,
	1025,
	1040,
	1103,
	1105,
	1105,
	8208,
	8208,
	8211,
	8214,
	8216,
	8217,
	8220,
	8221,
	8224,
	8226,
	8228,
	8231,
	8240,
	8240,
	8242,
	8243,
	8245,
	8245,
	8251,
	8251,
	8254,
	8254,
	8308,
	8308,
	8319,
	8319,
	8321,
	8324,
	8364,
	8364,
	8451,
	8451,
	8453,
	8453,
	8457,
	8457,
	8467,
	8467,
	8470,
	8470,
	8481,
	8482,
	8486,
	8486,
	8491,
	8491,
	8531,
	8532,
	8539,
	8542,
	8544,
	8555,
	8560,
	8569,
	8585,
	8585,
	8592,
	8601,
	8632,
	8633,
	8658,
	8658,
	8660,
	8660,
	8679,
	8679,
	8704,
	8704,
	8706,
	8707,
	8711,
	8712,
	8715,
	8715,
	8719,
	8719,
	8721,
	8721,
	8725,
	8725,
	8730,
	8730,
	8733,
	8736,
	8739,
	8739,
	8741,
	8741,
	8743,
	8748,
	8750,
	8750,
	8756,
	8759,
	8764,
	8765,
	8776,
	8776,
	8780,
	8780,
	8786,
	8786,
	8800,
	8801,
	8804,
	8807,
	8810,
	8811,
	8814,
	8815,
	8834,
	8835,
	8838,
	8839,
	8853,
	8853,
	8857,
	8857,
	8869,
	8869,
	8895,
	8895,
	8978,
	8978,
	9312,
	9449,
	9451,
	9547,
	9552,
	9587,
	9600,
	9615,
	9618,
	9621,
	9632,
	9633,
	9635,
	9641,
	9650,
	9651,
	9654,
	9655,
	9660,
	9661,
	9664,
	9665,
	9670,
	9672,
	9675,
	9675,
	9678,
	9681,
	9698,
	9701,
	9711,
	9711,
	9733,
	9734,
	9737,
	9737,
	9742,
	9743,
	9756,
	9756,
	9758,
	9758,
	9792,
	9792,
	9794,
	9794,
	9824,
	9825,
	9827,
	9829,
	9831,
	9834,
	9836,
	9837,
	9839,
	9839,
	9886,
	9887,
	9919,
	9919,
	9926,
	9933,
	9935,
	9939,
	9941,
	9953,
	9955,
	9955,
	9960,
	9961,
	9963,
	9969,
	9972,
	9972,
	9974,
	9977,
	9979,
	9980,
	9982,
	9983,
	10045,
	10045,
	10102,
	10111,
	11094,
	11097,
	12872,
	12879,
	57344,
	63743,
	65024,
	65039,
	65533,
	65533,
	127232,
	127242,
	127248,
	127277,
	127280,
	127337,
	127344,
	127373,
	127375,
	127376,
	127387,
	127404,
	917760,
	917999,
	983040,
	1048573,
	1048576,
	1114109
], Pu = [
	12288,
	12288,
	65281,
	65376,
	65504,
	65510
], Fu = [
	8361,
	8361,
	65377,
	65470,
	65474,
	65479,
	65482,
	65487,
	65490,
	65495,
	65498,
	65500,
	65512,
	65518
], Iu = [
	32,
	126,
	162,
	163,
	165,
	166,
	172,
	172,
	175,
	175,
	10214,
	10221,
	10629,
	10630
], Lu = [
	4352,
	4447,
	8986,
	8987,
	9001,
	9002,
	9193,
	9196,
	9200,
	9200,
	9203,
	9203,
	9725,
	9726,
	9748,
	9749,
	9776,
	9783,
	9800,
	9811,
	9855,
	9855,
	9866,
	9871,
	9875,
	9875,
	9889,
	9889,
	9898,
	9899,
	9917,
	9918,
	9924,
	9925,
	9934,
	9934,
	9940,
	9940,
	9962,
	9962,
	9970,
	9971,
	9973,
	9973,
	9978,
	9978,
	9981,
	9981,
	9989,
	9989,
	9994,
	9995,
	10024,
	10024,
	10060,
	10060,
	10062,
	10062,
	10067,
	10069,
	10071,
	10071,
	10133,
	10135,
	10160,
	10160,
	10175,
	10175,
	11035,
	11036,
	11088,
	11088,
	11093,
	11093,
	11904,
	11929,
	11931,
	12019,
	12032,
	12245,
	12272,
	12287,
	12289,
	12350,
	12353,
	12438,
	12441,
	12543,
	12549,
	12591,
	12593,
	12686,
	12688,
	12773,
	12783,
	12830,
	12832,
	12871,
	12880,
	42124,
	42128,
	42182,
	43360,
	43388,
	44032,
	55203,
	63744,
	64255,
	65040,
	65049,
	65072,
	65106,
	65108,
	65126,
	65128,
	65131,
	94176,
	94180,
	94192,
	94198,
	94208,
	101589,
	101631,
	101662,
	101760,
	101874,
	110576,
	110579,
	110581,
	110587,
	110589,
	110590,
	110592,
	110882,
	110898,
	110898,
	110928,
	110930,
	110933,
	110933,
	110948,
	110951,
	110960,
	111355,
	119552,
	119638,
	119648,
	119670,
	126980,
	126980,
	127183,
	127183,
	127374,
	127374,
	127377,
	127386,
	127488,
	127490,
	127504,
	127547,
	127552,
	127560,
	127568,
	127569,
	127584,
	127589,
	127744,
	127776,
	127789,
	127797,
	127799,
	127868,
	127870,
	127891,
	127904,
	127946,
	127951,
	127955,
	127968,
	127984,
	127988,
	127988,
	127992,
	128062,
	128064,
	128064,
	128066,
	128252,
	128255,
	128317,
	128331,
	128334,
	128336,
	128359,
	128378,
	128378,
	128405,
	128406,
	128420,
	128420,
	128507,
	128591,
	128640,
	128709,
	128716,
	128716,
	128720,
	128722,
	128725,
	128728,
	128732,
	128735,
	128747,
	128748,
	128756,
	128764,
	128992,
	129003,
	129008,
	129008,
	129292,
	129338,
	129340,
	129349,
	129351,
	129535,
	129648,
	129660,
	129664,
	129674,
	129678,
	129734,
	129736,
	129736,
	129741,
	129756,
	129759,
	129770,
	129775,
	129784,
	131072,
	196605,
	196608,
	262141
], Ru = (e, t) => {
	let n = 0, r = Math.floor(e.length / 2) - 1;
	for (; n <= r;) {
		let i = Math.floor((n + r) / 2), a = i * 2;
		if (t < e[a]) r = i - 1;
		else if (t > e[a + 1]) n = i + 1;
		else return !0;
	}
	return !1;
}, zu = 19968, [Bu, Vu] = /* #__PURE__ */ Hu(Lu);
function Hu(e) {
	let t = e[0], n = e[1];
	for (let r = 0; r < e.length; r += 2) {
		let i = e[r], a = e[r + 1];
		if (zu >= i && zu <= a) return [i, a];
		a - i > n - t && (t = i, n = a);
	}
	return [t, n];
}
var Uu = (e) => e < 161 || e > 1114109 ? !1 : Ru(Nu, e), Wu = (e) => e < 12288 || e > 65510 ? !1 : Ru(Pu, e), Gu = (e) => e < 8361 || e > 65518 ? !1 : Ru(Fu, e), Ku = (e) => e < 32 || e > 10630 ? !1 : Ru(Iu, e), qu = (e) => e >= Bu && e <= Vu ? !0 : e < 4352 || e > 262141 ? !1 : Ru(Lu, e);
function Ju(e) {
	return Uu(e) ? "ambiguous" : Wu(e) ? "fullwidth" : Gu(e) ? "halfwidth" : Ku(e) ? "narrow" : qu(e) ? "wide" : "neutral";
}
//#endregion
//#region node_modules/get-east-asian-width/index.js
function Yu(e) {
	if (!Number.isSafeInteger(e)) throw TypeError(`Expected a code point, got \`${typeof e}\`.`);
}
function Xu(e) {
	return Yu(e), Ju(e);
}
//#endregion
//#region node_modules/micromark-extension-cjk-friendly-util/dist/index.js
var Zu = Object.defineProperty, Qu = (e, t, n) => t in e ? Zu(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, $u = (e, t, n) => Qu(e, typeof t == "symbol" ? t : t + "", n);
function ed(e) {
	return /^\p{Emoji_Presentation}/u.test(String.fromCodePoint(e));
}
function td(e) {
	if (!e || e < 4352) return !1;
	switch (Xu(e)) {
		case "fullwidth":
		case "halfwidth": return !0;
		case "wide": return !ed(e);
		case "narrow": return !1;
		case "ambiguous": return 917760 <= e && e <= 917999 && null;
		case "neutral": return /^\p{sc=Hangul}/u.test(String.fromCodePoint(e));
	}
}
function nd(e, t) {
	return t !== 65025 || !e || e < 8216 ? !1 : e === 8216 || e === 8217 || e === 8220 || e === 8221;
}
function rd(e) {
	return e !== null && e >= 65024 && e <= 65038;
}
var id = od(/\p{P}|\p{S}/u), ad = od(/\s/);
function od(e) {
	return t;
	function t(t) {
		return t !== null && t > -1 && e.test(String.fromCodePoint(t));
	}
}
var sd;
((e) => {
	e.spaceOrPunctuation = 3, e.cjk = 4096, e.cjkPunctuation = 4098, e.ivs = 8192, e.cjkOrIvs = 12288, e.nonEmojiGeneralUseVS = 16384, e.variationSelector = 24576, e.ivsToCjkRightShift = 1;
})(sd || (sd = {}));
function cd(e) {
	if (e === bu.eof || W(e) || ad(e)) return xu.characterGroupWhitespace;
	let t = 0;
	if (e >= 4352) {
		if (rd(e)) return sd.nonEmojiGeneralUseVS;
		switch (td(e)) {
			case null: return sd.ivs;
			case !0: t |= sd.cjk;
		}
	}
	return id(e) && (t |= xu.characterGroupPunctuation), t;
}
function ld(e, t, n) {
	if (!gd(e)) return e;
	let r = t(), i = cd(r);
	return !r || dd(i) ? e : nd(r, n) ? sd.cjkPunctuation : ud(i);
}
function ud(e) {
	return e & ~sd.ivs;
}
function dd(e) {
	return !!(e & xu.characterGroupWhitespace);
}
function fd(e) {
	return (e & sd.cjkPunctuation) === xu.characterGroupPunctuation;
}
function pd(e) {
	return !!(e & sd.cjk);
}
function md(e) {
	return e === sd.ivs;
}
function hd(e) {
	return !!(e & sd.cjkOrIvs);
}
function gd(e) {
	return e === sd.nonEmojiGeneralUseVS;
}
function _d(e) {
	return !!(e & sd.spaceOrPunctuation);
}
function vd(e) {
	return !!(e && e >= 55296 && e <= 56319);
}
function yd(e) {
	return !!(e && e >= 56320 && e <= 57343);
}
function bd(e, t, n) {
	if (t._bufferIndex < 2) return e;
	let r = n({
		start: {
			...t,
			_bufferIndex: t._bufferIndex - 2
		},
		end: t
	}).codePointAt(0);
	return r && r >= 65536 ? r : e;
}
function xd(e, t, n) {
	let r = e >= 65536 ? 2 : 1;
	if (t._bufferIndex < 1 + r) return null;
	let i = t._bufferIndex - r - 2, a = n({
		start: {
			...t,
			_bufferIndex: i >= 0 ? i : 0
		},
		end: {
			...t,
			_bufferIndex: t._bufferIndex - r
		}
	}), o = a.charCodeAt(a.length - 1);
	if (Number.isNaN(o)) return null;
	if (a.length < 2 || o < 56320 || 57343 < o) return o;
	let s = a.codePointAt(0);
	return s && s >= 65536 ? s : o;
}
var Sd = class {
	constructor(e, t, n) {
		this.previousCode = e, this.nowPoint = t, this.sliceSerialize = n, $u(this, "cachedValue");
	}
	value() {
		return this.cachedValue === void 0 && (this.cachedValue = xd(this.previousCode, this.nowPoint, this.sliceSerialize)), this.cachedValue;
	}
};
function Cd(e, t, n) {
	let r = n({
		start: t,
		end: {
			...t,
			_bufferIndex: t._bufferIndex + 2
		}
	}).codePointAt(0);
	return r && r >= 65536 ? r : e;
}
//#endregion
//#region node_modules/micromark-util-chunked/index.js
function wd(e, t, n, r) {
	let i = e.length, a = 0, o;
	if (t = t < 0 ? -t > i ? 0 : i + t : t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) o = Array.from(r), o.unshift(t, n), e.splice(...o);
	else for (n && e.splice(t, n); a < r.length;) o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function Td(e, t) {
	return e.length > 0 ? (wd(e, e.length, 0, t), e) : t;
}
//#endregion
//#region node_modules/micromark-util-resolve-all/index.js
function Ed(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) {
		let a = e[i].resolveAll;
		a && !r.includes(a) && (t = a(t, n), r.push(a));
	}
	return t;
}
//#endregion
//#region node_modules/micromark-extension-cjk-friendly/dist/index.js
var Dd = {
	name: "attention",
	resolveAll: Od,
	tokenize: kd
};
function Od(e, t) {
	let n = -1, r, i, a, o, s, c, l, u;
	for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
		for (r = n; r--;) if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
			if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) continue;
			c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
			let d = { ...e[r][1].end }, f = { ...e[n][1].start };
			Ad(d, -c), Ad(f, c), o = {
				type: c > 1 ? Su.strongSequence : Su.emphasisSequence,
				start: d,
				end: { ...e[r][1].end }
			}, s = {
				type: c > 1 ? Su.strongSequence : Su.emphasisSequence,
				start: { ...e[n][1].start },
				end: f
			}, a = {
				type: c > 1 ? Su.strongText : Su.emphasisText,
				start: { ...e[r][1].end },
				end: { ...e[n][1].start }
			}, i = {
				type: c > 1 ? Su.strong : Su.emphasis,
				start: { ...o.start },
				end: { ...s.end }
			}, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = Td(l, [[
				"enter",
				e[r][1],
				t
			], [
				"exit",
				e[r][1],
				t
			]])), l = Td(l, [
				[
					"enter",
					i,
					t
				],
				[
					"enter",
					o,
					t
				],
				[
					"exit",
					o,
					t
				],
				[
					"enter",
					a,
					t
				]
			]), t.parser.constructs.insideSpan.null, l = Td(l, Ed(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), l = Td(l, [
				[
					"exit",
					a,
					t
				],
				[
					"enter",
					s,
					t
				],
				[
					"exit",
					s,
					t
				],
				[
					"exit",
					i,
					t
				]
			]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, l = Td(l, [[
				"enter",
				e[n][1],
				t
			], [
				"exit",
				e[n][1],
				t
			]])) : u = 0, wd(e, r - 1, n - r + 3, l), n = r + l.length - u - 2;
			break;
		}
	}
	for (n = -1; ++n < e.length;) e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
	return e;
}
function kd(e, t) {
	let n = this.parser.constructs.attentionMarkers.null, { now: r, sliceSerialize: i, previous: a } = this, o = yd(a) ? bd(a, r(), i) : a, s = cd(o), c = new Sd(o, r(), i), l = ld(s, c.value.bind(c), o), u;
	return d;
	function d(t) {
		return t === bu.asterisk || bu.underscore, u = t, e.enter("attentionSequence"), f(t);
	}
	function f(a) {
		if (a === u) return e.consume(a), f;
		let s = e.exit("attentionSequence"), c = cd(vd(a) ? Cd(a, r(), i) : a), d = fd(l), p = d || dd(l), m = fd(c), h = m || dd(c), g = hd(l), _ = !h || m && (p || g) || n.includes(a), v = !p || d && (h || pd(c)) || n.includes(o);
		return s._open = !!(u === bu.asterisk ? _ : _ && (_d(l) || !v)), s._close = !!(u === bu.asterisk ? v : v && (_d(c) || !_)), t(a);
	}
}
function Ad(e, t) {
	e.column += t, e.offset += t, e._bufferIndex += t;
}
function jd() {
	return {
		text: {
			[bu.asterisk]: Dd,
			[bu.underscore]: Dd
		},
		insideSpan: { null: [Dd] }
	};
}
//#endregion
//#region node_modules/streamdown/node_modules/remark-cjk-friendly/dist/index.js
function Md() {
	let e = this.data();
	(e.micromarkExtensions || (e.micromarkExtensions = [])).push(jd());
}
//#endregion
//#region node_modules/micromark-extension-cjk-friendly-gfm-strikethrough/dist/index.js
function Nd(e) {
	let t = (e || {}).singleTilde, n = {
		name: "strikethrough",
		tokenize: i,
		resolveAll: r
	};
	return t ?? (t = !0), {
		text: { [bu.tilde]: n },
		insideSpan: { null: [n] },
		attentionMarkers: { null: [bu.tilde] }
	};
	function r(e, t) {
		let n = -1;
		for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "strikethroughSequenceTemporary" && e[n][1]._close) {
			let r = n;
			for (; r--;) if (e[r][0] === "exit" && e[r][1].type === "strikethroughSequenceTemporary" && e[r][1]._open && e[n][1].end.offset - e[n][1].start.offset === e[r][1].end.offset - e[r][1].start.offset) {
				e[n][1].type = "strikethroughSequence", e[r][1].type = "strikethroughSequence";
				let i = {
					type: "strikethrough",
					start: Object.assign({}, e[r][1].start),
					end: Object.assign({}, e[n][1].end)
				}, a = {
					type: "strikethroughText",
					start: Object.assign({}, e[r][1].end),
					end: Object.assign({}, e[n][1].start)
				}, o = [
					[
						"enter",
						i,
						t
					],
					[
						"enter",
						e[r][1],
						t
					],
					[
						"exit",
						e[r][1],
						t
					],
					[
						"enter",
						a,
						t
					]
				], s = t.parser.constructs.insideSpan.null;
				s && wd(o, o.length, 0, Ed(s, e.slice(r + 1, n), t)), wd(o, o.length, 0, [
					[
						"exit",
						a,
						t
					],
					[
						"enter",
						e[n][1],
						t
					],
					[
						"exit",
						e[n][1],
						t
					],
					[
						"exit",
						i,
						t
					]
				]), wd(e, r - 1, n - r + 3, o), n = r + o.length - 2;
				break;
			}
		}
		for (n = -1; ++n < e.length;) e[n][1].type === "strikethroughSequenceTemporary" && (e[n][1].type = Su.data);
		return e;
	}
	function i(e, n, r) {
		let { now: i, sliceSerialize: a, previous: o } = this, s = yd(o) ? bd(o, i(), a) : o, c = cd(s), l = new Sd(s, i(), a), u = ld(c, l.value.bind(l), s), d = this.events, f = 0;
		return p;
		function p(t) {
			return bu.tilde, s === bu.tilde && d[d.length - 1][1].type !== Su.characterEscape ? r(t) : (e.enter("strikethroughSequenceTemporary"), m(t));
		}
		function m(o) {
			let c = cd(s);
			if (o === bu.tilde) return f > 1 ? r(o) : (e.consume(o), f++, m);
			if (f < 2 && !t) return r(o);
			let l = e.exit("strikethroughSequenceTemporary"), d = cd(vd(o) ? Cd(o, i(), a) : o), p = fd(u) || dd(u), h = fd(d) || dd(d), g = pd(u) || md(c);
			return l._open = !h || d === xu.attentionSideAfter && (p || g), l._close = !p || c === xu.attentionSideAfter && (h || pd(d)), n(o);
		}
	}
}
//#endregion
//#region node_modules/streamdown/node_modules/remark-cjk-friendly-gfm-strikethrough/dist/index.js
function Pd(e) {
	let t = this.data();
	(t.micromarkExtensions || (t.micromarkExtensions = [])).push(Nd(e));
}
//#endregion
//#region node_modules/ccount/index.js
function Fd(e, t) {
	let n = String(e);
	if (typeof t != "string") throw TypeError("Expected character");
	let r = 0, i = n.indexOf(t);
	for (; i !== -1;) r++, i = n.indexOf(t, i + t.length);
	return r;
}
//#endregion
//#region node_modules/escape-string-regexp/index.js
function Id(e) {
	if (typeof e != "string") throw TypeError("Expected a string");
	return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
//#endregion
//#region node_modules/mdast-util-find-and-replace/lib/index.js
function Ld(e, t, n) {
	let r = yt((n || {}).ignore || []), i = Rd(t), a = -1;
	for (; ++a < i.length;) kt(e, "text", o);
	function o(e, t) {
		let n = -1, i;
		for (; ++n < t.length;) {
			let e = t[n], a = i ? i.children : void 0;
			if (r(e, a ? a.indexOf(e) : void 0, i)) return;
			i = e;
		}
		if (i) return s(e, t);
	}
	function s(e, t) {
		let n = t[t.length - 1], r = i[a][0], o = i[a][1], s = 0, c = n.children.indexOf(e), l = !1, u = [];
		r.lastIndex = 0;
		let d = r.exec(e.value);
		for (; d;) {
			let n = d.index, i = {
				index: d.index,
				input: d.input,
				stack: [...t, e]
			}, a = o(...d, i);
			if (typeof a == "string" && (a = a.length > 0 ? {
				type: "text",
				value: a
			} : void 0), a === !1 ? r.lastIndex = n + 1 : (s !== n && u.push({
				type: "text",
				value: e.value.slice(s, n)
			}), Array.isArray(a) ? u.push(...a) : a && u.push(a), s = n + d[0].length, l = !0), !r.global) break;
			d = r.exec(e.value);
		}
		return l ? (s < e.value.length && u.push({
			type: "text",
			value: e.value.slice(s)
		}), n.children.splice(c, 1, ...u)) : u = [e], c + u.length;
	}
}
function Rd(e) {
	let t = [];
	if (!Array.isArray(e)) throw TypeError("Expected find and replace tuple or list of tuples");
	let n = !e[0] || Array.isArray(e[0]) ? e : [e], r = -1;
	for (; ++r < n.length;) {
		let e = n[r];
		t.push([zd(e[0]), Bd(e[1])]);
	}
	return t;
}
function zd(e) {
	return typeof e == "string" ? new RegExp(Id(e), "g") : e;
}
function Bd(e) {
	return typeof e == "function" ? e : function() {
		return e;
	};
}
//#endregion
//#region node_modules/mdast-util-gfm-autolink-literal/lib/index.js
var Vd = "phrasing", Hd = [
	"autolink",
	"link",
	"image",
	"label"
];
function Ud() {
	return {
		transforms: [Zd],
		enter: {
			literalAutolink: Gd,
			literalAutolinkEmail: Kd,
			literalAutolinkHttp: Kd,
			literalAutolinkWww: Kd
		},
		exit: {
			literalAutolink: Xd,
			literalAutolinkEmail: Yd,
			literalAutolinkHttp: qd,
			literalAutolinkWww: Jd
		}
	};
}
function Wd() {
	return { unsafe: [
		{
			character: "@",
			before: "[+\\-.\\w]",
			after: "[\\-.\\w]",
			inConstruct: Vd,
			notInConstruct: Hd
		},
		{
			character: ".",
			before: "[Ww]",
			after: "[\\-.\\w]",
			inConstruct: Vd,
			notInConstruct: Hd
		},
		{
			character: ":",
			before: "[ps]",
			after: "\\/",
			inConstruct: Vd,
			notInConstruct: Hd
		}
	] };
}
function Gd(e) {
	this.enter({
		type: "link",
		title: null,
		url: "",
		children: []
	}, e);
}
function Kd(e) {
	this.config.enter.autolinkProtocol.call(this, e);
}
function qd(e) {
	this.config.exit.autolinkProtocol.call(this, e);
}
function Jd(e) {
	this.config.exit.data.call(this, e);
	let t = this.stack[this.stack.length - 1];
	t.type, t.url = "http://" + this.sliceSerialize(e);
}
function Yd(e) {
	this.config.exit.autolinkEmail.call(this, e);
}
function Xd(e) {
	this.exit(e);
}
function Zd(e) {
	Ld(e, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Qd], [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, $d]], { ignore: ["link", "linkReference"] });
}
function Qd(e, t, n, r, i) {
	let a = "";
	if (!nf(i) || (/^w/i.test(t) && (n = t + n, t = "", a = "http://"), !ef(n))) return !1;
	let o = tf(n + r);
	if (!o[0]) return !1;
	let s = {
		type: "link",
		title: null,
		url: a + t + o[0],
		children: [{
			type: "text",
			value: t + o[0]
		}]
	};
	return o[1] ? [s, {
		type: "text",
		value: o[1]
	}] : s;
}
function $d(e, t, n, r) {
	return !nf(r, !0) || /[-\d_]$/.test(n) ? !1 : {
		type: "link",
		title: null,
		url: "mailto:" + t + "@" + n,
		children: [{
			type: "text",
			value: t + "@" + n
		}]
	};
}
function ef(e) {
	let t = e.split(".");
	return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function tf(e) {
	let t = /[!"&'),.:;<>?\]}]+$/.exec(e);
	if (!t) return [e, void 0];
	e = e.slice(0, t.index);
	let n = t[0], r = n.indexOf(")"), i = Fd(e, "("), a = Fd(e, ")");
	for (; r !== -1 && i > a;) e += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), a++;
	return [e, n];
}
function nf(e, t) {
	let n = e.input.charCodeAt(e.index - 1);
	return (e.index === 0 || ju(n) || Au(n)) && (!t || n !== 47);
}
//#endregion
//#region node_modules/micromark-util-normalize-identifier/index.js
function rf(e) {
	return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
//#endregion
//#region node_modules/mdast-util-gfm-footnote/lib/index.js
mf.peek = pf;
function af() {
	this.buffer();
}
function of(e) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, e);
}
function sf() {
	this.buffer();
}
function cf(e) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, e);
}
function lf(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = rf(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function uf(e) {
	this.exit(e);
}
function df(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = rf(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function ff(e) {
	this.exit(e);
}
function pf() {
	return "[";
}
function mf(e, t, n, r) {
	let i = n.createTracker(r), a = i.move("[^"), o = n.enter("footnoteReference"), s = n.enter("reference");
	return a += i.move(n.safe(n.associationId(e), {
		after: "]",
		before: a
	})), s(), o(), a += i.move("]"), a;
}
function hf() {
	return {
		enter: {
			gfmFootnoteCallString: af,
			gfmFootnoteCall: of,
			gfmFootnoteDefinitionLabelString: sf,
			gfmFootnoteDefinition: cf
		},
		exit: {
			gfmFootnoteCallString: lf,
			gfmFootnoteCall: uf,
			gfmFootnoteDefinitionLabelString: df,
			gfmFootnoteDefinition: ff
		}
	};
}
function gf(e) {
	let t = !1;
	return e && e.firstLineBlank && (t = !0), {
		handlers: {
			footnoteDefinition: n,
			footnoteReference: mf
		},
		unsafe: [{
			character: "[",
			inConstruct: [
				"label",
				"phrasing",
				"reference"
			]
		}]
	};
	function n(e, n, r, i) {
		let a = r.createTracker(i), o = a.move("[^"), s = r.enter("footnoteDefinition"), c = r.enter("label");
		return o += a.move(r.safe(r.associationId(e), {
			before: o,
			after: "]"
		})), c(), o += a.move("]:"), e.children && e.children.length > 0 && (a.shift(4), o += a.move((t ? "\n" : " ") + r.indentLines(r.containerFlow(e, a.current()), t ? vf : _f))), s(), o;
	}
}
function _f(e, t, n) {
	return t === 0 ? e : vf(e, t, n);
}
function vf(e, t, n) {
	return (n ? "" : "    ") + e;
}
//#endregion
//#region node_modules/mdast-util-gfm-strikethrough/lib/index.js
var yf = [
	"autolink",
	"destinationLiteral",
	"destinationRaw",
	"reference",
	"titleQuote",
	"titleApostrophe"
];
wf.peek = Tf;
function bf() {
	return {
		canContainEols: ["delete"],
		enter: { strikethrough: Sf },
		exit: { strikethrough: Cf }
	};
}
function xf() {
	return {
		unsafe: [{
			character: "~",
			inConstruct: "phrasing",
			notInConstruct: yf
		}],
		handlers: { delete: wf }
	};
}
function Sf(e) {
	this.enter({
		type: "delete",
		children: []
	}, e);
}
function Cf(e) {
	this.exit(e);
}
function wf(e, t, n, r) {
	let i = n.createTracker(r), a = n.enter("strikethrough"), o = i.move("~~");
	return o += n.containerPhrasing(e, {
		...i.current(),
		before: o,
		after: "~"
	}), o += i.move("~~"), a(), o;
}
function Tf() {
	return "~";
}
//#endregion
//#region node_modules/markdown-table/index.js
function Ef(e) {
	return e.length;
}
function Df(e, t) {
	let n = t || {}, r = (n.align || []).concat(), i = n.stringLength || Ef, a = [], o = [], s = [], c = [], l = 0, u = -1;
	for (; ++u < e.length;) {
		let t = [], r = [], a = -1;
		for (e[u].length > l && (l = e[u].length); ++a < e[u].length;) {
			let o = Of(e[u][a]);
			if (n.alignDelimiters !== !1) {
				let e = i(o);
				r[a] = e, (c[a] === void 0 || e > c[a]) && (c[a] = e);
			}
			t.push(o);
		}
		o[u] = t, s[u] = r;
	}
	let d = -1;
	if (typeof r == "object" && "length" in r) for (; ++d < l;) a[d] = kf(r[d]);
	else {
		let e = kf(r);
		for (; ++d < l;) a[d] = e;
	}
	d = -1;
	let f = [], p = [];
	for (; ++d < l;) {
		let e = a[d], t = "", r = "";
		e === 99 ? (t = ":", r = ":") : e === 108 ? t = ":" : e === 114 && (r = ":");
		let i = n.alignDelimiters === !1 ? 1 : Math.max(1, c[d] - t.length - r.length), o = t + "-".repeat(i) + r;
		n.alignDelimiters !== !1 && (i = t.length + i + r.length, i > c[d] && (c[d] = i), p[d] = i), f[d] = o;
	}
	o.splice(1, 0, f), s.splice(1, 0, p), u = -1;
	let m = [];
	for (; ++u < o.length;) {
		let e = o[u], t = s[u];
		d = -1;
		let r = [];
		for (; ++d < l;) {
			let i = e[d] || "", o = "", s = "";
			if (n.alignDelimiters !== !1) {
				let e = c[d] - (t[d] || 0), n = a[d];
				n === 114 ? o = " ".repeat(e) : n === 99 ? e % 2 ? (o = " ".repeat(e / 2 + .5), s = " ".repeat(e / 2 - .5)) : (o = " ".repeat(e / 2), s = o) : s = " ".repeat(e);
			}
			n.delimiterStart !== !1 && !d && r.push("|"), n.padding !== !1 && (n.alignDelimiters !== !1 || i !== "") && (n.delimiterStart !== !1 || d) && r.push(" "), n.alignDelimiters !== !1 && r.push(o), r.push(i), n.alignDelimiters !== !1 && r.push(s), n.padding !== !1 && r.push(" "), (n.delimiterEnd !== !1 || d !== l - 1) && r.push("|");
		}
		m.push(n.delimiterEnd === !1 ? r.join("").replace(/ +$/, "") : r.join(""));
	}
	return m.join("\n");
}
function Of(e) {
	return e == null ? "" : String(e);
}
function kf(e) {
	let t = typeof e == "string" ? e.codePointAt(0) : 0;
	return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
function Af(e, t, n, r) {
	let i = n.enter("blockquote"), a = n.createTracker(r);
	a.move("> "), a.shift(2);
	let o = n.indentLines(n.containerFlow(e, a.current()), jf);
	return i(), o;
}
function jf(e, t, n) {
	return ">" + (n ? "" : " ") + e;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
function Mf(e, t) {
	return Nf(e, t.inConstruct, !0) && !Nf(e, t.notInConstruct, !1);
}
function Nf(e, t, n) {
	if (typeof t == "string" && (t = [t]), !t || t.length === 0) return n;
	let r = -1;
	for (; ++r < t.length;) if (e.includes(t[r])) return !0;
	return !1;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/break.js
function Pf(e, t, n, r) {
	let i = -1;
	for (; ++i < n.unsafe.length;) if (n.unsafe[i].character === "\n" && Mf(n.stack, n.unsafe[i])) return /[ \t]/.test(r.before) ? "" : " ";
	return "\\\n";
}
//#endregion
//#region node_modules/longest-streak/index.js
function Ff(e, t) {
	let n = String(e), r = n.indexOf(t), i = r, a = 0, o = 0;
	if (typeof t != "string") throw TypeError("Expected substring");
	for (; r !== -1;) r === i ? ++a > o && (o = a) : a = 1, i = r + t.length, r = n.indexOf(t, i);
	return o;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
function If(e, t) {
	return !(t.options.fences !== !1 || !e.value || e.lang || !/[^ \r\n]/.test(e.value) || /^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-fence.js
function Lf(e) {
	let t = e.options.fence || "`";
	if (t !== "`" && t !== "~") throw Error("Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/code.js
function Rf(e, t, n, r) {
	let i = Lf(n), a = e.value || "", o = i === "`" ? "GraveAccent" : "Tilde";
	if (If(e, n)) {
		let e = n.enter("codeIndented"), t = n.indentLines(a, zf);
		return e(), t;
	}
	let s = n.createTracker(r), c = i.repeat(Math.max(Ff(a, i) + 1, 3)), l = n.enter("codeFenced"), u = s.move(c);
	if (e.lang) {
		let t = n.enter(`codeFencedLang${o}`);
		u += s.move(n.safe(e.lang, {
			before: u,
			after: " ",
			encode: ["`"],
			...s.current()
		})), t();
	}
	if (e.lang && e.meta) {
		let t = n.enter(`codeFencedMeta${o}`);
		u += s.move(" "), u += s.move(n.safe(e.meta, {
			before: u,
			after: "\n",
			encode: ["`"],
			...s.current()
		})), t();
	}
	return u += s.move("\n"), a && (u += s.move(a + "\n")), u += s.move(c), l(), u;
}
function zf(e, t, n) {
	return (n ? "" : "    ") + e;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-quote.js
function Bf(e) {
	let t = e.options.quote || "\"";
	if (t !== "\"" && t !== "'") throw Error("Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/definition.js
function Vf(e, t, n, r) {
	let i = Bf(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("definition"), s = n.enter("label"), c = n.createTracker(r), l = c.move("[");
	return l += c.move(n.safe(n.associationId(e), {
		before: l,
		after: "]",
		...c.current()
	})), l += c.move("]: "), s(), !e.url || /[\0- \u007F]/.test(e.url) ? (s = n.enter("destinationLiteral"), l += c.move("<"), l += c.move(n.safe(e.url, {
		before: l,
		after: ">",
		...c.current()
	})), l += c.move(">")) : (s = n.enter("destinationRaw"), l += c.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : "\n",
		...c.current()
	}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(" " + i), l += c.move(n.safe(e.title, {
		before: l,
		after: i,
		...c.current()
	})), l += c.move(i), s()), o(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js
function Hf(e) {
	let t = e.options.emphasis || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js
function Uf(e) {
	return "&#x" + e.toString(16).toUpperCase() + ";";
}
//#endregion
//#region node_modules/micromark-util-classify-character/index.js
function Wf(e) {
	if (e === null || W(e) || ju(e)) return 1;
	if (Au(e)) return 2;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/encode-info.js
function Gf(e, t, n) {
	let r = Wf(e), i = Wf(t);
	return r === void 0 ? i === void 0 ? n === "_" ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !0
	} : r === 1 ? i === void 0 ? {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !1
	} : i === void 0 ? {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !1
	} : {
		inside: !1,
		outside: !1
	};
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/emphasis.js
Kf.peek = qf;
function Kf(e, t, n, r) {
	let i = Hf(n), a = n.enter("emphasis"), o = n.createTracker(r), s = o.move(i), c = o.move(n.containerPhrasing(e, {
		after: i,
		before: s,
		...o.current()
	})), l = c.charCodeAt(0), u = Gf(r.before.charCodeAt(r.before.length - 1), l, i);
	u.inside && (c = Uf(l) + c.slice(1));
	let d = c.charCodeAt(c.length - 1), f = Gf(r.after.charCodeAt(0), d, i);
	f.inside && (c = c.slice(0, -1) + Uf(d));
	let p = o.move(i);
	return a(), n.attentionEncodeSurroundingInfo = {
		after: f.outside,
		before: u.outside
	}, s + c + p;
}
function qf(e, t, n) {
	return n.options.emphasis || "*";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/node_modules/unist-util-visit/lib/index.js
function Jf(e, t, n, r) {
	let i, a, o;
	typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), kt(e, a, s, i);
	function s(e, t) {
		let n = t[t.length - 1], r = n ? n.children.indexOf(e) : void 0;
		return o(e, r, n);
	}
}
//#endregion
//#region node_modules/mdast-util-to-string/lib/index.js
var Yf = {};
function Xf(e, t) {
	let n = t || Yf;
	return Zf(e, typeof n.includeImageAlt != "boolean" || n.includeImageAlt, typeof n.includeHtml != "boolean" || n.includeHtml);
}
function Zf(e, t, n) {
	if ($f(e)) {
		if ("value" in e) return e.type === "html" && !n ? "" : e.value;
		if (t && "alt" in e && e.alt) return e.alt;
		if ("children" in e) return Qf(e.children, t, n);
	}
	return Array.isArray(e) ? Qf(e, t, n) : "";
}
function Qf(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) r[i] = Zf(e[i], t, n);
	return r.join("");
}
function $f(e) {
	return !!(e && typeof e == "object");
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
function ep(e, t) {
	let n = !1;
	return Jf(e, function(e) {
		if ("value" in e && /\r?\n|\r/.test(e.value) || e.type === "break") return n = !0, !1;
	}), !!((!e.depth || e.depth < 3) && Xf(e) && (t.options.setext || n));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/heading.js
function tp(e, t, n, r) {
	let i = Math.max(Math.min(6, e.depth || 1), 1), a = n.createTracker(r);
	if (ep(e, n)) {
		let t = n.enter("headingSetext"), r = n.enter("phrasing"), o = n.containerPhrasing(e, {
			...a.current(),
			before: "\n",
			after: "\n"
		});
		return r(), t(), o + "\n" + (i === 1 ? "=" : "-").repeat(o.length - (Math.max(o.lastIndexOf("\r"), o.lastIndexOf("\n")) + 1));
	}
	let o = "#".repeat(i), s = n.enter("headingAtx"), c = n.enter("phrasing");
	a.move(o + " ");
	let l = n.containerPhrasing(e, {
		before: "# ",
		after: "\n",
		...a.current()
	});
	return /^[\t ]/.test(l) && (l = Uf(l.charCodeAt(0)) + l.slice(1)), l = l ? o + " " + l : o, n.options.closeAtx && (l += " " + o), c(), s(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/html.js
np.peek = rp;
function np(e) {
	return e.value || "";
}
function rp() {
	return "<";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/image.js
ip.peek = ap;
function ip(e, t, n, r) {
	let i = Bf(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("image"), s = n.enter("label"), c = n.createTracker(r), l = c.move("![");
	return l += c.move(n.safe(e.alt, {
		before: l,
		after: "]",
		...c.current()
	})), l += c.move("]("), s(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (s = n.enter("destinationLiteral"), l += c.move("<"), l += c.move(n.safe(e.url, {
		before: l,
		after: ">",
		...c.current()
	})), l += c.move(">")) : (s = n.enter("destinationRaw"), l += c.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : ")",
		...c.current()
	}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(" " + i), l += c.move(n.safe(e.title, {
		before: l,
		after: i,
		...c.current()
	})), l += c.move(i), s()), l += c.move(")"), o(), l;
}
function ap() {
	return "!";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
op.peek = sp;
function op(e, t, n, r) {
	let i = e.referenceType, a = n.enter("imageReference"), o = n.enter("label"), s = n.createTracker(r), c = s.move("!["), l = n.safe(e.alt, {
		before: c,
		after: "]",
		...s.current()
	});
	c += s.move(l + "]["), o();
	let u = n.stack;
	n.stack = [], o = n.enter("reference");
	let d = n.safe(n.associationId(e), {
		before: c,
		after: "]",
		...s.current()
	});
	return o(), n.stack = u, a(), i === "full" || !l || l !== d ? c += s.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function sp() {
	return "!";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
cp.peek = lp;
function cp(e, t, n) {
	let r = e.value || "", i = "`", a = -1;
	for (; RegExp("(^|[^`])" + i + "([^`]|$)").test(r);) i += "`";
	for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++a < n.unsafe.length;) {
		let e = n.unsafe[a], t = n.compilePattern(e), i;
		if (e.atBreak) for (; i = t.exec(r);) {
			let e = i.index;
			r.charCodeAt(e) === 10 && r.charCodeAt(e - 1) === 13 && e--, r = r.slice(0, e) + " " + r.slice(i.index + 1);
		}
	}
	return i + r + i;
}
function lp() {
	return "`";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
function up(e, t) {
	let n = Xf(e);
	return !(t.options.resourceLink || !e.url || e.title || !e.children || e.children.length !== 1 || e.children[0].type !== "text" || n !== e.url && "mailto:" + n !== e.url || !/^[a-z][a-z+.-]+:/i.test(e.url) || /[\0- <>\u007F]/.test(e.url));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/link.js
dp.peek = fp;
function dp(e, t, n, r) {
	let i = Bf(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.createTracker(r), s, c;
	if (up(e, n)) {
		let t = n.stack;
		n.stack = [], s = n.enter("autolink");
		let r = o.move("<");
		return r += o.move(n.containerPhrasing(e, {
			before: r,
			after: ">",
			...o.current()
		})), r += o.move(">"), s(), n.stack = t, r;
	}
	s = n.enter("link"), c = n.enter("label");
	let l = o.move("[");
	return l += o.move(n.containerPhrasing(e, {
		before: l,
		after: "](",
		...o.current()
	})), l += o.move("]("), c(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (c = n.enter("destinationLiteral"), l += o.move("<"), l += o.move(n.safe(e.url, {
		before: l,
		after: ">",
		...o.current()
	})), l += o.move(">")) : (c = n.enter("destinationRaw"), l += o.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : ")",
		...o.current()
	}))), c(), e.title && (c = n.enter(`title${a}`), l += o.move(" " + i), l += o.move(n.safe(e.title, {
		before: l,
		after: i,
		...o.current()
	})), l += o.move(i), c()), l += o.move(")"), s(), l;
}
function fp(e, t, n) {
	return up(e, n) ? "<" : "[";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
pp.peek = mp;
function pp(e, t, n, r) {
	let i = e.referenceType, a = n.enter("linkReference"), o = n.enter("label"), s = n.createTracker(r), c = s.move("["), l = n.containerPhrasing(e, {
		before: c,
		after: "]",
		...s.current()
	});
	c += s.move(l + "]["), o();
	let u = n.stack;
	n.stack = [], o = n.enter("reference");
	let d = n.safe(n.associationId(e), {
		before: c,
		after: "]",
		...s.current()
	});
	return o(), n.stack = u, a(), i === "full" || !l || l !== d ? c += s.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function mp() {
	return "[";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
function hp(e) {
	let t = e.options.bullet || "*";
	if (t !== "*" && t !== "+" && t !== "-") throw Error("Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
function gp(e) {
	let t = hp(e), n = e.options.bulletOther;
	if (!n) return t === "*" ? "-" : "*";
	if (n !== "*" && n !== "+" && n !== "-") throw Error("Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
	if (n === t) throw Error("Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different");
	return n;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
function _p(e) {
	let t = e.options.bulletOrdered || ".";
	if (t !== "." && t !== ")") throw Error("Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-rule.js
function vp(e) {
	let t = e.options.rule || "*";
	if (t !== "*" && t !== "-" && t !== "_") throw Error("Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/list.js
function yp(e, t, n, r) {
	let i = n.enter("list"), a = n.bulletCurrent, o = e.ordered ? _p(n) : hp(n), s = e.ordered ? o === "." ? ")" : "." : gp(n), c = t && n.bulletLastUsed ? o === n.bulletLastUsed : !1;
	if (!e.ordered) {
		let t = e.children ? e.children[0] : void 0;
		if ((o === "*" || o === "-") && t && (!t.children || !t.children[0]) && n.stack[n.stack.length - 1] === "list" && n.stack[n.stack.length - 2] === "listItem" && n.stack[n.stack.length - 3] === "list" && n.stack[n.stack.length - 4] === "listItem" && n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0 && (c = !0), vp(n) === o && t) {
			let t = -1;
			for (; ++t < e.children.length;) {
				let n = e.children[t];
				if (n && n.type === "listItem" && n.children && n.children[0] && n.children[0].type === "thematicBreak") {
					c = !0;
					break;
				}
			}
		}
	}
	c && (o = s), n.bulletCurrent = o;
	let l = n.containerFlow(e, r);
	return n.bulletLastUsed = o, n.bulletCurrent = a, i(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
function bp(e) {
	let t = e.options.listItemIndent || "one";
	if (t !== "tab" && t !== "one" && t !== "mixed") throw Error("Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/list-item.js
function xp(e, t, n, r) {
	let i = bp(n), a = n.bulletCurrent || hp(n);
	t && t.type === "list" && t.ordered && (a = (typeof t.start == "number" && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === !1 ? 0 : t.children.indexOf(e)) + a);
	let o = a.length + 1;
	(i === "tab" || i === "mixed" && (t && t.type === "list" && t.spread || e.spread)) && (o = Math.ceil(o / 4) * 4);
	let s = n.createTracker(r);
	s.move(a + " ".repeat(o - a.length)), s.shift(o);
	let c = n.enter("listItem"), l = n.indentLines(n.containerFlow(e, s.current()), u);
	return c(), l;
	function u(e, t, n) {
		return t ? (n ? "" : " ".repeat(o)) + e : (n ? a : a + " ".repeat(o - a.length)) + e;
	}
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/paragraph.js
function Sp(e, t, n, r) {
	let i = n.enter("paragraph"), a = n.enter("phrasing"), o = n.containerPhrasing(e, r);
	return a(), i(), o;
}
//#endregion
//#region node_modules/mdast-util-phrasing/lib/index.js
var Cp = yt([
	"break",
	"delete",
	"emphasis",
	"footnote",
	"footnoteReference",
	"image",
	"imageReference",
	"inlineCode",
	"inlineMath",
	"link",
	"linkReference",
	"mdxJsxTextElement",
	"mdxTextExpression",
	"strong",
	"text",
	"textDirective"
]);
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/root.js
function wp(e, t, n, r) {
	return (e.children.some(function(e) {
		return Cp(e);
	}) ? n.containerPhrasing : n.containerFlow).call(n, e, r);
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-strong.js
function Tp(e) {
	let t = e.options.strong || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/strong.js
Ep.peek = Dp;
function Ep(e, t, n, r) {
	let i = Tp(n), a = n.enter("strong"), o = n.createTracker(r), s = o.move(i + i), c = o.move(n.containerPhrasing(e, {
		after: i,
		before: s,
		...o.current()
	})), l = c.charCodeAt(0), u = Gf(r.before.charCodeAt(r.before.length - 1), l, i);
	u.inside && (c = Uf(l) + c.slice(1));
	let d = c.charCodeAt(c.length - 1), f = Gf(r.after.charCodeAt(0), d, i);
	f.inside && (c = c.slice(0, -1) + Uf(d));
	let p = o.move(i + i);
	return a(), n.attentionEncodeSurroundingInfo = {
		after: f.outside,
		before: u.outside
	}, s + c + p;
}
function Dp(e, t, n) {
	return n.options.strong || "*";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/text.js
function Op(e, t, n, r) {
	return n.safe(e.value, r);
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
function kp(e) {
	let t = e.options.ruleRepetition || 3;
	if (t < 3) throw Error("Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
function Ap(e, t, n) {
	let r = (vp(n) + (n.options.ruleSpaces ? " " : "")).repeat(kp(n));
	return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/index.js
var jp = {
	blockquote: Af,
	break: Pf,
	code: Rf,
	definition: Vf,
	emphasis: Kf,
	hardBreak: Pf,
	heading: tp,
	html: np,
	image: ip,
	imageReference: op,
	inlineCode: cp,
	link: dp,
	linkReference: pp,
	list: yp,
	listItem: xp,
	paragraph: Sp,
	root: wp,
	strong: Ep,
	text: Op,
	thematicBreak: Ap
}, Mp = document.createElement("i");
function Np(e) {
	let t = "&" + e + ";";
	Mp.innerHTML = t;
	let n = Mp.textContent;
	return n.charCodeAt(n.length - 1) === 59 && e !== "semi" ? !1 : n !== t && n;
}
//#endregion
//#region node_modules/micromark-util-decode-numeric-character-reference/index.js
function Pp(e, t) {
	let n = Number.parseInt(e, t);
	return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) == 65535 || (n & 65535) == 65534 || n > 1114111 ? "�" : String.fromCodePoint(n);
}
//#endregion
//#region node_modules/micromark-util-decode-string/index.js
var Fp = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Ip(e) {
	return e.replace(Fp, Lp);
}
function Lp(e, t, n) {
	if (t) return t;
	if (n.charCodeAt(0) === 35) {
		let e = n.charCodeAt(1), t = e === 120 || e === 88;
		return Pp(n.slice(t ? 2 : 1), t ? 16 : 10);
	}
	return Np(n) || e;
}
//#endregion
//#region node_modules/mdast-util-gfm-table/lib/index.js
function Rp() {
	return {
		enter: {
			table: zp,
			tableData: Up,
			tableHeader: Up,
			tableRow: Vp
		},
		exit: {
			codeText: Wp,
			table: Bp,
			tableData: Hp,
			tableHeader: Hp,
			tableRow: Hp
		}
	};
}
function zp(e) {
	let t = e._align;
	this.enter({
		type: "table",
		align: t.map(function(e) {
			return e === "none" ? null : e;
		}),
		children: []
	}, e), this.data.inTable = !0;
}
function Bp(e) {
	this.exit(e), this.data.inTable = void 0;
}
function Vp(e) {
	this.enter({
		type: "tableRow",
		children: []
	}, e);
}
function Hp(e) {
	this.exit(e);
}
function Up(e) {
	this.enter({
		type: "tableCell",
		children: []
	}, e);
}
function Wp(e) {
	let t = this.resume();
	this.data.inTable && (t = t.replace(/\\([\\|])/g, Gp));
	let n = this.stack[this.stack.length - 1];
	n.type, n.value = t, this.exit(e);
}
function Gp(e, t) {
	return t === "|" ? t : e;
}
function Kp(e) {
	let t = e || {}, n = t.tableCellPadding, r = t.tablePipeAlign, i = t.stringLength, a = n ? " " : "|";
	return {
		unsafe: [
			{
				character: "\r",
				inConstruct: "tableCell"
			},
			{
				character: "\n",
				inConstruct: "tableCell"
			},
			{
				atBreak: !0,
				character: "|",
				after: "[	 :-]"
			},
			{
				character: "|",
				inConstruct: "tableCell"
			},
			{
				atBreak: !0,
				character: ":",
				after: "-"
			},
			{
				atBreak: !0,
				character: "-",
				after: "[:|-]"
			}
		],
		handlers: {
			inlineCode: f,
			table: o,
			tableCell: c,
			tableRow: s
		}
	};
	function o(e, t, n, r) {
		return l(u(e, n, r), e.align);
	}
	function s(e, t, n, r) {
		let i = l([d(e, n, r)]);
		return i.slice(0, i.indexOf("\n"));
	}
	function c(e, t, n, r) {
		let i = n.enter("tableCell"), o = n.enter("phrasing"), s = n.containerPhrasing(e, {
			...r,
			before: a,
			after: a
		});
		return o(), i(), s;
	}
	function l(e, t) {
		return Df(e, {
			align: t,
			alignDelimiters: r,
			padding: n,
			stringLength: i
		});
	}
	function u(e, t, n) {
		let r = e.children, i = -1, a = [], o = t.enter("table");
		for (; ++i < r.length;) a[i] = d(r[i], t, n);
		return o(), a;
	}
	function d(e, t, n) {
		let r = e.children, i = -1, a = [], o = t.enter("tableRow");
		for (; ++i < r.length;) a[i] = c(r[i], e, t, n);
		return o(), a;
	}
	function f(e, t, n) {
		let r = jp.inlineCode(e, t, n);
		return n.stack.includes("tableCell") && (r = r.replace(/\|/g, "\\$&")), r;
	}
}
//#endregion
//#region node_modules/mdast-util-gfm-task-list-item/lib/index.js
function qp() {
	return { exit: {
		taskListCheckValueChecked: Yp,
		taskListCheckValueUnchecked: Yp,
		paragraph: Xp
	} };
}
function Jp() {
	return {
		unsafe: [{
			atBreak: !0,
			character: "-",
			after: "[:|-]"
		}],
		handlers: { listItem: Zp }
	};
}
function Yp(e) {
	let t = this.stack[this.stack.length - 2];
	t.type, t.checked = e.type === "taskListCheckValueChecked";
}
function Xp(e) {
	let t = this.stack[this.stack.length - 2];
	if (t && t.type === "listItem" && typeof t.checked == "boolean") {
		let e = this.stack[this.stack.length - 1];
		e.type;
		let n = e.children[0];
		if (n && n.type === "text") {
			let r = t.children, i = -1, a;
			for (; ++i < r.length;) {
				let e = r[i];
				if (e.type === "paragraph") {
					a = e;
					break;
				}
			}
			a === e && (n.value = n.value.slice(1), n.value.length === 0 ? e.children.shift() : e.position && n.position && typeof n.position.start.offset == "number" && (n.position.start.column++, n.position.start.offset++, e.position.start = Object.assign({}, n.position.start)));
		}
	}
	this.exit(e);
}
function Zp(e, t, n, r) {
	let i = e.children[0], a = typeof e.checked == "boolean" && i && i.type === "paragraph", o = "[" + (e.checked ? "x" : " ") + "] ", s = n.createTracker(r);
	a && s.move(o);
	let c = jp.listItem(e, t, n, {
		...r,
		...s.current()
	});
	return a && (c = c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, l)), c;
	function l(e) {
		return e + o;
	}
}
//#endregion
//#region node_modules/mdast-util-gfm/lib/index.js
function Qp() {
	return [
		Ud(),
		hf(),
		bf(),
		Rp(),
		qp()
	];
}
function $p(e) {
	return { extensions: [
		Wd(),
		gf(e),
		xf(),
		Kp(e),
		Jp()
	] };
}
//#endregion
//#region node_modules/micromark-util-combine-extensions/index.js
var em = {}.hasOwnProperty;
function tm(e) {
	let t = {}, n = -1;
	for (; ++n < e.length;) nm(t, e[n]);
	return t;
}
function nm(e, t) {
	let n;
	for (n in t) {
		let r = (em.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n], a;
		if (i) for (a in i) {
			em.call(r, a) || (r[a] = []);
			let e = i[a];
			rm(r[a], Array.isArray(e) ? e : e ? [e] : []);
		}
	}
}
function rm(e, t) {
	let n = -1, r = [];
	for (; ++n < t.length;) (t[n].add === "after" ? e : r).push(t[n]);
	wd(e, 0, 0, r);
}
//#endregion
//#region node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js
var im = {
	tokenize: vm,
	partial: !0
}, am = {
	tokenize: ym,
	partial: !0
}, om = {
	tokenize: bm,
	partial: !0
}, sm = {
	tokenize: xm,
	partial: !0
}, cm = {
	tokenize: Sm,
	partial: !0
}, lm = {
	name: "wwwAutolink",
	tokenize: gm,
	previous: Cm
}, um = {
	name: "protocolAutolink",
	tokenize: _m,
	previous: wm
}, dm = {
	name: "emailAutolink",
	tokenize: hm,
	previous: Tm
}, fm = {};
function pm() {
	return { text: fm };
}
for (var mm = 48; mm < 123;) fm[mm] = dm, mm++, mm === 58 ? mm = 65 : mm === 91 && (mm = 97);
fm[43] = dm, fm[45] = dm, fm[46] = dm, fm[95] = dm, fm[72] = [dm, um], fm[104] = [dm, um], fm[87] = [dm, lm], fm[119] = [dm, lm];
function hm(e, t, n) {
	let r = this, i, a;
	return o;
	function o(t) {
		return !Em(t) || !Tm.call(r, r.previous) || Dm(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), s(t));
	}
	function s(t) {
		return Em(t) ? (e.consume(t), s) : t === 64 ? (e.consume(t), c) : n(t);
	}
	function c(t) {
		return t === 46 ? e.check(cm, u, l)(t) : t === 45 || t === 95 || wu(t) ? (a = !0, e.consume(t), c) : u(t);
	}
	function l(t) {
		return e.consume(t), i = !0, c;
	}
	function u(o) {
		return a && i && Cu(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(o)) : n(o);
	}
}
function gm(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t !== 87 && t !== 119 || !Cm.call(r, r.previous) || Dm(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(im, e.attempt(am, e.attempt(om, a), n), n)(t));
	}
	function a(n) {
		return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(n);
	}
}
function _m(e, t, n) {
	let r = this, i = "", a = !1;
	return o;
	function o(t) {
		return (t === 72 || t === 104) && wm.call(r, r.previous) && !Dm(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(t), e.consume(t), s) : n(t);
	}
	function s(t) {
		if (Cu(t) && i.length < 5) return i += String.fromCodePoint(t), e.consume(t), s;
		if (t === 58) {
			let n = i.toLowerCase();
			if (n === "http" || n === "https") return e.consume(t), c;
		}
		return n(t);
	}
	function c(t) {
		return t === 47 ? (e.consume(t), a ? l : (a = !0, c)) : n(t);
	}
	function l(t) {
		return t === null || Eu(t) || W(t) || ju(t) || Au(t) ? n(t) : e.attempt(am, e.attempt(om, u), n)(t);
	}
	function u(n) {
		return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(n);
	}
}
function vm(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return (t === 87 || t === 119) && r < 3 ? (r++, e.consume(t), i) : t === 46 && r === 3 ? (e.consume(t), a) : n(t);
	}
	function a(e) {
		return e === null ? n(e) : t(e);
	}
}
function ym(e, t, n) {
	let r, i, a;
	return o;
	function o(t) {
		return t === 46 || t === 95 ? e.check(sm, c, s)(t) : t === null || W(t) || ju(t) || t !== 45 && Au(t) ? c(t) : (a = !0, e.consume(t), o);
	}
	function s(t) {
		return t === 95 ? r = !0 : (i = r, r = void 0), e.consume(t), o;
	}
	function c(e) {
		return i || r || !a ? n(e) : t(e);
	}
}
function bm(e, t) {
	let n = 0, r = 0;
	return i;
	function i(o) {
		return o === 40 ? (n++, e.consume(o), i) : o === 41 && r < n ? a(o) : o === 33 || o === 34 || o === 38 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 60 || o === 63 || o === 93 || o === 95 || o === 126 ? e.check(sm, t, a)(o) : o === null || W(o) || ju(o) ? t(o) : (e.consume(o), i);
	}
	function a(t) {
		return t === 41 && r++, e.consume(t), i;
	}
}
function xm(e, t, n) {
	return r;
	function r(o) {
		return o === 33 || o === 34 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 63 || o === 95 || o === 126 ? (e.consume(o), r) : o === 38 ? (e.consume(o), a) : o === 93 ? (e.consume(o), i) : o === 60 || o === null || W(o) || ju(o) ? t(o) : n(o);
	}
	function i(e) {
		return e === null || e === 40 || e === 91 || W(e) || ju(e) ? t(e) : r(e);
	}
	function a(e) {
		return Cu(e) ? o(e) : n(e);
	}
	function o(t) {
		return t === 59 ? (e.consume(t), r) : Cu(t) ? (e.consume(t), o) : n(t);
	}
}
function Sm(e, t, n) {
	return r;
	function r(t) {
		return e.consume(t), i;
	}
	function i(e) {
		return wu(e) ? n(e) : t(e);
	}
}
function Cm(e) {
	return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || W(e);
}
function wm(e) {
	return !Cu(e);
}
function Tm(e) {
	return !(e === 47 || Em(e));
}
function Em(e) {
	return e === 43 || e === 45 || e === 46 || e === 95 || wu(e);
}
function Dm(e) {
	let t = e.length, n = !1;
	for (; t--;) {
		let r = e[t][1];
		if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
			n = !0;
			break;
		}
		if (r._gfmAutolinkLiteralWalkedInto) {
			n = !1;
			break;
		}
	}
	return e.length > 0 && !n && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), n;
}
//#endregion
//#region node_modules/micromark-util-sanitize-uri/index.js
function Om(e) {
	let t = [], n = -1, r = 0, i = 0;
	for (; ++n < e.length;) {
		let a = e.charCodeAt(n), o = "";
		if (a === 37 && wu(e.charCodeAt(n + 1)) && wu(e.charCodeAt(n + 2))) i = 2;
		else if (a < 128) /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
		else if (a > 55295 && a < 57344) {
			let t = e.charCodeAt(n + 1);
			a < 56320 && t > 56319 && t < 57344 ? (o = String.fromCharCode(a, t), i = 1) : o = "�";
		} else o = String.fromCharCode(a);
		o && (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, o = ""), i && (n += i, i = 0);
	}
	return t.join("") + e.slice(r);
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/attention.js
var km = {
	name: "attention",
	resolveAll: Am,
	tokenize: jm
};
function Am(e, t) {
	let n = -1, r, i, a, o, s, c, l, u;
	for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
		for (r = n; r--;) if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
			if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) continue;
			c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
			let d = { ...e[r][1].end }, f = { ...e[n][1].start };
			Mm(d, -c), Mm(f, c), o = {
				type: c > 1 ? "strongSequence" : "emphasisSequence",
				start: d,
				end: { ...e[r][1].end }
			}, s = {
				type: c > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...e[n][1].start },
				end: f
			}, a = {
				type: c > 1 ? "strongText" : "emphasisText",
				start: { ...e[r][1].end },
				end: { ...e[n][1].start }
			}, i = {
				type: c > 1 ? "strong" : "emphasis",
				start: { ...o.start },
				end: { ...s.end }
			}, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = Td(l, [[
				"enter",
				e[r][1],
				t
			], [
				"exit",
				e[r][1],
				t
			]])), l = Td(l, [
				[
					"enter",
					i,
					t
				],
				[
					"enter",
					o,
					t
				],
				[
					"exit",
					o,
					t
				],
				[
					"enter",
					a,
					t
				]
			]), l = Td(l, Ed(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), l = Td(l, [
				[
					"exit",
					a,
					t
				],
				[
					"enter",
					s,
					t
				],
				[
					"exit",
					s,
					t
				],
				[
					"exit",
					i,
					t
				]
			]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, l = Td(l, [[
				"enter",
				e[n][1],
				t
			], [
				"exit",
				e[n][1],
				t
			]])) : u = 0, wd(e, r - 1, n - r + 3, l), n = r + l.length - u - 2;
			break;
		}
	}
	for (n = -1; ++n < e.length;) e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
	return e;
}
function jm(e, t) {
	let n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Wf(r), a;
	return o;
	function o(t) {
		return a = t, e.enter("attentionSequence"), s(t);
	}
	function s(o) {
		if (o === a) return e.consume(o), s;
		let c = e.exit("attentionSequence"), l = Wf(o), u = !l || l === 2 && i || n.includes(o), d = !i || i === 2 && l || n.includes(r);
		return c._open = !!(a === 42 ? u : u && (i || !d)), c._close = !!(a === 42 ? d : d && (l || !u)), t(o);
	}
}
function Mm(e, t) {
	e.column += t, e.offset += t, e._bufferIndex += t;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/autolink.js
var Nm = {
	name: "autolink",
	tokenize: Pm
};
function Pm(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(t), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
	}
	function a(t) {
		return Cu(t) ? (e.consume(t), o) : t === 64 ? n(t) : l(t);
	}
	function o(e) {
		return e === 43 || e === 45 || e === 46 || wu(e) ? (r = 1, s(e)) : l(e);
	}
	function s(t) {
		return t === 58 ? (e.consume(t), r = 0, c) : (t === 43 || t === 45 || t === 46 || wu(t)) && r++ < 32 ? (e.consume(t), s) : (r = 0, l(t));
	}
	function c(r) {
		return r === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(r), e.exit("autolinkMarker"), e.exit("autolink"), t) : r === null || r === 32 || r === 60 || Eu(r) ? n(r) : (e.consume(r), c);
	}
	function l(t) {
		return t === 64 ? (e.consume(t), u) : Tu(t) ? (e.consume(t), l) : n(t);
	}
	function u(e) {
		return wu(e) ? d(e) : n(e);
	}
	function d(n) {
		return n === 46 ? (e.consume(n), r = 0, u) : n === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(n), e.exit("autolinkMarker"), e.exit("autolink"), t) : f(n);
	}
	function f(t) {
		if ((t === 45 || wu(t)) && r++ < 63) {
			let n = t === 45 ? f : d;
			return e.consume(t), n;
		}
		return n(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-space/index.js
function K(e, t, n, r) {
	let i = r ? r - 1 : Infinity, a = 0;
	return o;
	function o(r) {
		return G(r) ? (e.enter(n), s(r)) : t(r);
	}
	function s(r) {
		return G(r) && a++ < i ? (e.consume(r), s) : (e.exit(n), t(r));
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/blank-line.js
var Fm = {
	partial: !0,
	tokenize: Im
};
function Im(e, t, n) {
	return r;
	function r(t) {
		return G(t) ? K(e, i, "linePrefix")(t) : i(t);
	}
	function i(e) {
		return e === null || U(e) ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/block-quote.js
var Lm = {
	continuation: { tokenize: zm },
	exit: Bm,
	name: "blockQuote",
	tokenize: Rm
};
function Rm(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		if (t === 62) {
			let n = r.containerState;
			return n.open || (e.enter("blockQuote", { _container: !0 }), n.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(t), e.exit("blockQuoteMarker"), a;
		}
		return n(t);
	}
	function a(n) {
		return G(n) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(n), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(n));
	}
}
function zm(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return G(t) ? K(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : a(t);
	}
	function a(r) {
		return e.attempt(Lm, t, n)(r);
	}
}
function Bm(e) {
	e.exit("blockQuote");
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/character-escape.js
var Vm = {
	name: "characterEscape",
	tokenize: Hm
};
function Hm(e, t, n) {
	return r;
	function r(t) {
		return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(t), e.exit("escapeMarker"), i;
	}
	function i(r) {
		return ku(r) ? (e.enter("characterEscapeValue"), e.consume(r), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/character-reference.js
var Um = {
	name: "characterReference",
	tokenize: Wm
};
function Wm(e, t, n) {
	let r = this, i = 0, a, o;
	return s;
	function s(t) {
		return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(t), e.exit("characterReferenceMarker"), c;
	}
	function c(t) {
		return t === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(t), e.exit("characterReferenceMarkerNumeric"), l) : (e.enter("characterReferenceValue"), a = 31, o = wu, u(t));
	}
	function l(t) {
		return t === 88 || t === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(t), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = Ou, u) : (e.enter("characterReferenceValue"), a = 7, o = Du, u(t));
	}
	function u(s) {
		if (s === 59 && i) {
			let i = e.exit("characterReferenceValue");
			return o === wu && !Np(r.sliceSerialize(i)) ? n(s) : (e.enter("characterReferenceMarker"), e.consume(s), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
		}
		return o(s) && i++ < a ? (e.consume(s), u) : n(s);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-fenced.js
var Gm = {
	partial: !0,
	tokenize: Jm
}, Km = {
	concrete: !0,
	name: "codeFenced",
	tokenize: qm
};
function qm(e, t, n) {
	let r = this, i = {
		partial: !0,
		tokenize: b
	}, a = 0, o = 0, s;
	return c;
	function c(e) {
		return l(e);
	}
	function l(t) {
		let n = r.events[r.events.length - 1];
		return a = n && n[1].type === "linePrefix" ? n[2].sliceSerialize(n[1], !0).length : 0, s = t, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(t);
	}
	function u(t) {
		return t === s ? (o++, e.consume(t), u) : o < 3 ? n(t) : (e.exit("codeFencedFenceSequence"), G(t) ? K(e, d, "whitespace")(t) : d(t));
	}
	function d(n) {
		return n === null || U(n) ? (e.exit("codeFencedFence"), r.interrupt ? t(n) : e.check(Gm, h, ee)(n)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), f(n));
	}
	function f(t) {
		return t === null || U(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(t)) : G(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), K(e, p, "whitespace")(t)) : t === 96 && t === s ? n(t) : (e.consume(t), f);
	}
	function p(t) {
		return t === null || U(t) ? d(t) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), m(t));
	}
	function m(t) {
		return t === null || U(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(t)) : t === 96 && t === s ? n(t) : (e.consume(t), m);
	}
	function h(t) {
		return e.attempt(i, ee, g)(t);
	}
	function g(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), _;
	}
	function _(t) {
		return a > 0 && G(t) ? K(e, v, "linePrefix", a + 1)(t) : v(t);
	}
	function v(t) {
		return t === null || U(t) ? e.check(Gm, h, ee)(t) : (e.enter("codeFlowValue"), y(t));
	}
	function y(t) {
		return t === null || U(t) ? (e.exit("codeFlowValue"), v(t)) : (e.consume(t), y);
	}
	function ee(n) {
		return e.exit("codeFenced"), t(n);
	}
	function b(e, t, n) {
		let i = 0;
		return a;
		function a(t) {
			return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c;
		}
		function c(t) {
			return e.enter("codeFencedFence"), G(t) ? K(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : l(t);
		}
		function l(t) {
			return t === s ? (e.enter("codeFencedFenceSequence"), u(t)) : n(t);
		}
		function u(t) {
			return t === s ? (i++, e.consume(t), u) : i >= o ? (e.exit("codeFencedFenceSequence"), G(t) ? K(e, d, "whitespace")(t) : d(t)) : n(t);
		}
		function d(r) {
			return r === null || U(r) ? (e.exit("codeFencedFence"), t(r)) : n(r);
		}
	}
}
function Jm(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t === null ? n(t) : (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-indented.js
var Ym = {
	name: "codeIndented",
	tokenize: Zm
}, Xm = {
	partial: !0,
	tokenize: Qm
};
function Zm(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("codeIndented"), K(e, a, "linePrefix", 5)(t);
	}
	function a(e) {
		let t = r.events[r.events.length - 1];
		return t && t[1].type === "linePrefix" && t[2].sliceSerialize(t[1], !0).length >= 4 ? o(e) : n(e);
	}
	function o(t) {
		return t === null ? c(t) : U(t) ? e.attempt(Xm, o, c)(t) : (e.enter("codeFlowValue"), s(t));
	}
	function s(t) {
		return t === null || U(t) ? (e.exit("codeFlowValue"), o(t)) : (e.consume(t), s);
	}
	function c(n) {
		return e.exit("codeIndented"), t(n);
	}
}
function Qm(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return r.parser.lazy[r.now().line] ? n(t) : U(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), i) : K(e, a, "linePrefix", 5)(t);
	}
	function a(e) {
		let a = r.events[r.events.length - 1];
		return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(e) : U(e) ? i(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-text.js
var $m = {
	name: "codeText",
	previous: th,
	resolve: eh,
	tokenize: nh
};
function eh(e) {
	let t = e.length - 4, n = 3, r, i;
	if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (r = n; ++r < t;) if (e[r][1].type === "codeTextData") {
			e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
			break;
		}
	}
	for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
	return e;
}
function th(e) {
	return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function nh(e, t, n) {
	let r = 0, i, a;
	return o;
	function o(t) {
		return e.enter("codeText"), e.enter("codeTextSequence"), s(t);
	}
	function s(t) {
		return t === 96 ? (e.consume(t), r++, s) : (e.exit("codeTextSequence"), c(t));
	}
	function c(t) {
		return t === null ? n(t) : t === 32 ? (e.enter("space"), e.consume(t), e.exit("space"), c) : t === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(t)) : U(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c) : (e.enter("codeTextData"), l(t));
	}
	function l(t) {
		return t === null || t === 32 || t === 96 || U(t) ? (e.exit("codeTextData"), c(t)) : (e.consume(t), l);
	}
	function u(n) {
		return n === 96 ? (e.consume(n), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(n)) : (a.type = "codeTextData", l(n));
	}
}
//#endregion
//#region node_modules/micromark-util-subtokenize/lib/splice-buffer.js
var rh = class {
	constructor(e) {
		this.left = e ? [...e] : [], this.right = [];
	}
	get(e) {
		if (e < 0 || e >= this.left.length + this.right.length) throw RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
		return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
	}
	get length() {
		return this.left.length + this.right.length;
	}
	shift() {
		return this.setCursor(0), this.right.pop();
	}
	slice(e, t) {
		let n = t ?? Infinity;
		return n < this.left.length ? this.left.slice(e, n) : e > this.left.length ? this.right.slice(this.right.length - n + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
	}
	splice(e, t, n) {
		let r = t || 0;
		this.setCursor(Math.trunc(e));
		let i = this.right.splice(this.right.length - r, Infinity);
		return n && ih(this.left, n), i.reverse();
	}
	pop() {
		return this.setCursor(Infinity), this.left.pop();
	}
	push(e) {
		this.setCursor(Infinity), this.left.push(e);
	}
	pushMany(e) {
		this.setCursor(Infinity), ih(this.left, e);
	}
	unshift(e) {
		this.setCursor(0), this.right.push(e);
	}
	unshiftMany(e) {
		this.setCursor(0), ih(this.right, e.reverse());
	}
	setCursor(e) {
		if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0)) {
			if (e < this.left.length) {
				let t = this.left.splice(e, Infinity);
				ih(this.right, t.reverse());
			} else {
				let t = this.right.splice(this.left.length + this.right.length - e, Infinity);
				ih(this.left, t.reverse());
			}
		}
	}
};
function ih(e, t) {
	let n = 0;
	if (t.length < 1e4) e.push(...t);
	else for (; n < t.length;) e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
//#endregion
//#region node_modules/micromark-util-subtokenize/index.js
function ah(e) {
	let t = {}, n = -1, r, i, a, o, s, c, l, u = new rh(e);
	for (; ++n < u.length;) {
		for (; n in t;) n = t[n];
		if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content")) for (; ++a < c.length && c[a][1].type !== "content";) c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
		if (r[0] === "enter") r[1].contentType && (Object.assign(t, oh(u, n)), n = t[n], l = !0);
		else if (r[1]._container) {
			for (a = n, i = void 0; a--;) if (o = u.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank") o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
			else if (o[1].type !== "linePrefix" && o[1].type !== "listItemIndent") break;
			i && (r[1].end = { ...u.get(i)[1].start }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
		}
	}
	return wd(e, 0, Infinity, u.slice(0)), !l;
}
function oh(e, t) {
	let n = e.get(t)[1], r = e.get(t)[2], i = t - 1, a = [], o = n._tokenizer;
	o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
	let s = o.events, c = [], l = {}, u, d, f = -1, p = n, m = 0, h = 0, g = [h];
	for (; p;) {
		for (; e.get(++i)[1] !== p;);
		a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
	}
	for (p = n; ++f < s.length;) s[f][0] === "exit" && s[f - 1][0] === "enter" && s[f][1].type === s[f - 1][1].type && s[f][1].start.line !== s[f][1].end.line && (h = f + 1, g.push(h), p._tokenizer = void 0, p.previous = void 0, p = p.next);
	for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : g.pop(), f = g.length; f--;) {
		let t = s.slice(g[f], g[f + 1]), n = a.pop();
		c.push([n, n + t.length - 1]), e.splice(n, 2, t);
	}
	for (c.reverse(), f = -1; ++f < c.length;) l[m + c[f][0]] = m + c[f][1], m += c[f][1] - c[f][0] - 1;
	return l;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/content.js
var sh = {
	resolve: lh,
	tokenize: uh
}, ch = {
	partial: !0,
	tokenize: dh
};
function lh(e) {
	return ah(e), e;
}
function uh(e, t) {
	let n;
	return r;
	function r(t) {
		return e.enter("content"), n = e.enter("chunkContent", { contentType: "content" }), i(t);
	}
	function i(t) {
		return t === null ? a(t) : U(t) ? e.check(ch, o, a)(t) : (e.consume(t), i);
	}
	function a(n) {
		return e.exit("chunkContent"), e.exit("content"), t(n);
	}
	function o(t) {
		return e.consume(t), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
			contentType: "content",
			previous: n
		}), n = n.next, i;
	}
}
function dh(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), K(e, a, "linePrefix");
	}
	function a(i) {
		if (i === null || U(i)) return n(i);
		let a = r.events[r.events.length - 1];
		return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(i) : e.interrupt(r.parser.constructs.flow, n, t)(i);
	}
}
//#endregion
//#region node_modules/micromark-factory-destination/index.js
function fh(e, t, n, r, i, a, o, s, c) {
	let l = c || Infinity, u = 0;
	return d;
	function d(t) {
		return t === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(t), e.exit(a), f) : t === null || t === 32 || t === 41 || Eu(t) ? n(t) : (e.enter(r), e.enter(o), e.enter(s), e.enter("chunkString", { contentType: "string" }), h(t));
	}
	function f(n) {
		return n === 62 ? (e.enter(a), e.consume(n), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter("chunkString", { contentType: "string" }), p(n));
	}
	function p(t) {
		return t === 62 ? (e.exit("chunkString"), e.exit(s), f(t)) : t === null || t === 60 || U(t) ? n(t) : (e.consume(t), t === 92 ? m : p);
	}
	function m(t) {
		return t === 60 || t === 62 || t === 92 ? (e.consume(t), p) : p(t);
	}
	function h(i) {
		return !u && (i === null || i === 41 || W(i)) ? (e.exit("chunkString"), e.exit(s), e.exit(o), e.exit(r), t(i)) : u < l && i === 40 ? (e.consume(i), u++, h) : i === 41 ? (e.consume(i), u--, h) : i === null || i === 32 || i === 40 || Eu(i) ? n(i) : (e.consume(i), i === 92 ? g : h);
	}
	function g(t) {
		return t === 40 || t === 41 || t === 92 ? (e.consume(t), h) : h(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-label/index.js
function ph(e, t, n, r, i, a) {
	let o = this, s = 0, c;
	return l;
	function l(t) {
		return e.enter(r), e.enter(i), e.consume(t), e.exit(i), e.enter(a), u;
	}
	function u(l) {
		return s > 999 || l === null || l === 91 || l === 93 && !c || 
		/* c8 ignore next 3 */
		l === 94 && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(l) : l === 93 ? (e.exit(a), e.enter(i), e.consume(l), e.exit(i), e.exit(r), t) : U(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), u) : (e.enter("chunkString", { contentType: "string" }), d(l));
	}
	function d(t) {
		return t === null || t === 91 || t === 93 || U(t) || s++ > 999 ? (e.exit("chunkString"), u(t)) : (e.consume(t), c || (c = !G(t)), t === 92 ? f : d);
	}
	function f(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), s++, d) : d(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-title/index.js
function mh(e, t, n, r, i, a) {
	let o;
	return s;
	function s(t) {
		return t === 34 || t === 39 || t === 40 ? (e.enter(r), e.enter(i), e.consume(t), e.exit(i), o = t === 40 ? 41 : t, c) : n(t);
	}
	function c(n) {
		return n === o ? (e.enter(i), e.consume(n), e.exit(i), e.exit(r), t) : (e.enter(a), l(n));
	}
	function l(t) {
		return t === o ? (e.exit(a), c(o)) : t === null ? n(t) : U(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), K(e, l, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), u(t));
	}
	function u(t) {
		return t === o || t === null || U(t) ? (e.exit("chunkString"), l(t)) : (e.consume(t), t === 92 ? d : u);
	}
	function d(t) {
		return t === o || t === 92 ? (e.consume(t), u) : u(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-whitespace/index.js
function hh(e, t) {
	let n;
	return r;
	function r(i) {
		return U(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : G(i) ? K(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/definition.js
var gh = {
	name: "definition",
	tokenize: vh
}, _h = {
	partial: !0,
	tokenize: yh
};
function vh(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("definition"), o(t);
	}
	function o(t) {
		return ph.call(r, e, s, n, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(t);
	}
	function s(t) {
		return i = rf(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), c) : n(t);
	}
	function c(t) {
		return W(t) ? hh(e, l)(t) : l(t);
	}
	function l(t) {
		return fh(e, u, n, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(t);
	}
	function u(t) {
		return e.attempt(_h, d, d)(t);
	}
	function d(t) {
		return G(t) ? K(e, f, "whitespace")(t) : f(t);
	}
	function f(a) {
		return a === null || U(a) ? (e.exit("definition"), r.parser.defined.push(i), t(a)) : n(a);
	}
}
function yh(e, t, n) {
	return r;
	function r(t) {
		return W(t) ? hh(e, i)(t) : n(t);
	}
	function i(t) {
		return mh(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(t);
	}
	function a(t) {
		return G(t) ? K(e, o, "whitespace")(t) : o(t);
	}
	function o(e) {
		return e === null || U(e) ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var bh = {
	name: "hardBreakEscape",
	tokenize: xh
};
function xh(e, t, n) {
	return r;
	function r(t) {
		return e.enter("hardBreakEscape"), e.consume(t), i;
	}
	function i(r) {
		return U(r) ? (e.exit("hardBreakEscape"), t(r)) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/heading-atx.js
var Sh = {
	name: "headingAtx",
	resolve: Ch,
	tokenize: wh
};
function Ch(e, t) {
	let n = e.length - 2, r = 3, i, a;
	return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
		type: "atxHeadingText",
		start: e[r][1].start,
		end: e[n][1].end
	}, a = {
		type: "chunkText",
		start: e[r][1].start,
		end: e[n][1].end,
		contentType: "text"
	}, wd(e, r, n - r + 1, [
		[
			"enter",
			i,
			t
		],
		[
			"enter",
			a,
			t
		],
		[
			"exit",
			a,
			t
		],
		[
			"exit",
			i,
			t
		]
	])), e;
}
function wh(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("atxHeading"), a(t);
	}
	function a(t) {
		return e.enter("atxHeadingSequence"), o(t);
	}
	function o(t) {
		return t === 35 && r++ < 6 ? (e.consume(t), o) : t === null || W(t) ? (e.exit("atxHeadingSequence"), s(t)) : n(t);
	}
	function s(n) {
		return n === 35 ? (e.enter("atxHeadingSequence"), c(n)) : n === null || U(n) ? (e.exit("atxHeading"), t(n)) : G(n) ? K(e, s, "whitespace")(n) : (e.enter("atxHeadingText"), l(n));
	}
	function c(t) {
		return t === 35 ? (e.consume(t), c) : (e.exit("atxHeadingSequence"), s(t));
	}
	function l(t) {
		return t === null || t === 35 || W(t) ? (e.exit("atxHeadingText"), s(t)) : (e.consume(t), l);
	}
}
//#endregion
//#region node_modules/micromark-util-html-tag-name/index.js
var Th = /* @__PURE__ */ "address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul".split("."), Eh = [
	"pre",
	"script",
	"style",
	"textarea"
], Dh = {
	concrete: !0,
	name: "htmlFlow",
	resolveTo: Ah,
	tokenize: jh
}, Oh = {
	partial: !0,
	tokenize: Nh
}, kh = {
	partial: !0,
	tokenize: Mh
};
function Ah(e) {
	let t = e.length;
	for (; t-- && (e[t][0] !== "enter" || e[t][1].type !== "htmlFlow"););
	return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function jh(e, t, n) {
	let r = this, i, a, o, s, c;
	return l;
	function l(e) {
		return u(e);
	}
	function u(t) {
		return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(t), d;
	}
	function d(s) {
		return s === 33 ? (e.consume(s), f) : s === 47 ? (e.consume(s), a = !0, h) : s === 63 ? (e.consume(s), i = 3, r.interrupt ? t : w) : Cu(s) ? (e.consume(s), o = String.fromCharCode(s), g) : n(s);
	}
	function f(a) {
		return a === 45 ? (e.consume(a), i = 2, p) : a === 91 ? (e.consume(a), i = 5, s = 0, m) : Cu(a) ? (e.consume(a), i = 4, r.interrupt ? t : w) : n(a);
	}
	function p(i) {
		return i === 45 ? (e.consume(i), r.interrupt ? t : w) : n(i);
	}
	function m(i) {
		return i === "CDATA[".charCodeAt(s++) ? (e.consume(i), s === 6 ? r.interrupt ? t : C : m) : n(i);
	}
	function h(t) {
		return Cu(t) ? (e.consume(t), o = String.fromCharCode(t), g) : n(t);
	}
	function g(s) {
		if (s === null || s === 47 || s === 62 || W(s)) {
			let c = s === 47, l = o.toLowerCase();
			return !c && !a && Eh.includes(l) ? (i = 1, r.interrupt ? t(s) : C(s)) : Th.includes(o.toLowerCase()) ? (i = 6, c ? (e.consume(s), _) : r.interrupt ? t(s) : C(s)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(s) : a ? v(s) : y(s));
		}
		return s === 45 || wu(s) ? (e.consume(s), o += String.fromCharCode(s), g) : n(s);
	}
	function _(i) {
		return i === 62 ? (e.consume(i), r.interrupt ? t : C) : n(i);
	}
	function v(t) {
		return G(t) ? (e.consume(t), v) : re(t);
	}
	function y(t) {
		return t === 47 ? (e.consume(t), re) : t === 58 || t === 95 || Cu(t) ? (e.consume(t), ee) : G(t) ? (e.consume(t), y) : re(t);
	}
	function ee(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || wu(t) ? (e.consume(t), ee) : b(t);
	}
	function b(t) {
		return t === 61 ? (e.consume(t), te) : G(t) ? (e.consume(t), b) : y(t);
	}
	function te(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), c = t, ne) : G(t) ? (e.consume(t), te) : x(t);
	}
	function ne(t) {
		return t === c ? (e.consume(t), c = null, S) : t === null || U(t) ? n(t) : (e.consume(t), ne);
	}
	function x(t) {
		return t === null || t === 34 || t === 39 || t === 47 || t === 60 || t === 61 || t === 62 || t === 96 || W(t) ? b(t) : (e.consume(t), x);
	}
	function S(e) {
		return e === 47 || e === 62 || G(e) ? y(e) : n(e);
	}
	function re(t) {
		return t === 62 ? (e.consume(t), ie) : n(t);
	}
	function ie(t) {
		return t === null || U(t) ? C(t) : G(t) ? (e.consume(t), ie) : n(t);
	}
	function C(t) {
		return t === 45 && i === 2 ? (e.consume(t), ce) : t === 60 && i === 1 ? (e.consume(t), le) : t === 62 && i === 4 ? (e.consume(t), fe) : t === 63 && i === 3 ? (e.consume(t), w) : t === 93 && i === 5 ? (e.consume(t), de) : U(t) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Oh, pe, ae)(t)) : t === null || U(t) ? (e.exit("htmlFlowData"), ae(t)) : (e.consume(t), C);
	}
	function ae(t) {
		return e.check(kh, oe, pe)(t);
	}
	function oe(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), se;
	}
	function se(t) {
		return t === null || U(t) ? ae(t) : (e.enter("htmlFlowData"), C(t));
	}
	function ce(t) {
		return t === 45 ? (e.consume(t), w) : C(t);
	}
	function le(t) {
		return t === 47 ? (e.consume(t), o = "", ue) : C(t);
	}
	function ue(t) {
		if (t === 62) {
			let n = o.toLowerCase();
			return Eh.includes(n) ? (e.consume(t), fe) : C(t);
		}
		return Cu(t) && o.length < 8 ? (e.consume(t), o += String.fromCharCode(t), ue) : C(t);
	}
	function de(t) {
		return t === 93 ? (e.consume(t), w) : C(t);
	}
	function w(t) {
		return t === 62 ? (e.consume(t), fe) : t === 45 && i === 2 ? (e.consume(t), w) : C(t);
	}
	function fe(t) {
		return t === null || U(t) ? (e.exit("htmlFlowData"), pe(t)) : (e.consume(t), fe);
	}
	function pe(n) {
		return e.exit("htmlFlow"), t(n);
	}
}
function Mh(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return U(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a) : n(t);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
function Nh(e, t, n) {
	return r;
	function r(r) {
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), e.attempt(Fm, t, n);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/html-text.js
var Ph = {
	name: "htmlText",
	tokenize: Fh
};
function Fh(e, t, n) {
	let r = this, i, a, o;
	return s;
	function s(t) {
		return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(t), c;
	}
	function c(t) {
		return t === 33 ? (e.consume(t), l) : t === 47 ? (e.consume(t), b) : t === 63 ? (e.consume(t), y) : Cu(t) ? (e.consume(t), x) : n(t);
	}
	function l(t) {
		return t === 45 ? (e.consume(t), u) : t === 91 ? (e.consume(t), a = 0, m) : Cu(t) ? (e.consume(t), v) : n(t);
	}
	function u(t) {
		return t === 45 ? (e.consume(t), p) : n(t);
	}
	function d(t) {
		return t === null ? n(t) : t === 45 ? (e.consume(t), f) : U(t) ? (o = d, le(t)) : (e.consume(t), d);
	}
	function f(t) {
		return t === 45 ? (e.consume(t), p) : d(t);
	}
	function p(e) {
		return e === 62 ? ce(e) : e === 45 ? f(e) : d(e);
	}
	function m(t) {
		return t === "CDATA[".charCodeAt(a++) ? (e.consume(t), a === 6 ? h : m) : n(t);
	}
	function h(t) {
		return t === null ? n(t) : t === 93 ? (e.consume(t), g) : U(t) ? (o = h, le(t)) : (e.consume(t), h);
	}
	function g(t) {
		return t === 93 ? (e.consume(t), _) : h(t);
	}
	function _(t) {
		return t === 62 ? ce(t) : t === 93 ? (e.consume(t), _) : h(t);
	}
	function v(t) {
		return t === null || t === 62 ? ce(t) : U(t) ? (o = v, le(t)) : (e.consume(t), v);
	}
	function y(t) {
		return t === null ? n(t) : t === 63 ? (e.consume(t), ee) : U(t) ? (o = y, le(t)) : (e.consume(t), y);
	}
	function ee(e) {
		return e === 62 ? ce(e) : y(e);
	}
	function b(t) {
		return Cu(t) ? (e.consume(t), te) : n(t);
	}
	function te(t) {
		return t === 45 || wu(t) ? (e.consume(t), te) : ne(t);
	}
	function ne(t) {
		return U(t) ? (o = ne, le(t)) : G(t) ? (e.consume(t), ne) : ce(t);
	}
	function x(t) {
		return t === 45 || wu(t) ? (e.consume(t), x) : t === 47 || t === 62 || W(t) ? S(t) : n(t);
	}
	function S(t) {
		return t === 47 ? (e.consume(t), ce) : t === 58 || t === 95 || Cu(t) ? (e.consume(t), re) : U(t) ? (o = S, le(t)) : G(t) ? (e.consume(t), S) : ce(t);
	}
	function re(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || wu(t) ? (e.consume(t), re) : ie(t);
	}
	function ie(t) {
		return t === 61 ? (e.consume(t), C) : U(t) ? (o = ie, le(t)) : G(t) ? (e.consume(t), ie) : S(t);
	}
	function C(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), i = t, ae) : U(t) ? (o = C, le(t)) : G(t) ? (e.consume(t), C) : (e.consume(t), oe);
	}
	function ae(t) {
		return t === i ? (e.consume(t), i = void 0, se) : t === null ? n(t) : U(t) ? (o = ae, le(t)) : (e.consume(t), ae);
	}
	function oe(t) {
		return t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 96 ? n(t) : t === 47 || t === 62 || W(t) ? S(t) : (e.consume(t), oe);
	}
	function se(e) {
		return e === 47 || e === 62 || W(e) ? S(e) : n(e);
	}
	function ce(r) {
		return r === 62 ? (e.consume(r), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(r);
	}
	function le(t) {
		return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), ue;
	}
	function ue(t) {
		return G(t) ? K(e, de, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : de(t);
	}
	function de(t) {
		return e.enter("htmlTextData"), o(t);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-end.js
var Ih = {
	name: "labelEnd",
	resolveAll: Bh,
	resolveTo: Vh,
	tokenize: Hh
}, Lh = { tokenize: Uh }, Rh = { tokenize: Wh }, zh = { tokenize: Gh };
function Bh(e) {
	let t = -1, n = [];
	for (; ++t < e.length;) {
		let r = e[t][1];
		if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
			let e = r.type === "labelImage" ? 4 : 2;
			r.type = "data", t += e;
		}
	}
	return e.length !== n.length && wd(e, 0, e.length, n), e;
}
function Vh(e, t) {
	let n = e.length, r = 0, i, a, o, s;
	for (; n--;) if (i = e[n][1], a) {
		if (i.type === "link" || i.type === "labelLink" && i._inactive) break;
		e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
	} else if (o) {
		if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (a = n, i.type !== "labelLink")) {
			r = 2;
			break;
		}
	} else i.type === "labelEnd" && (o = n);
	let c = {
		type: e[a][1].type === "labelLink" ? "link" : "image",
		start: { ...e[a][1].start },
		end: { ...e[e.length - 1][1].end }
	}, l = {
		type: "label",
		start: { ...e[a][1].start },
		end: { ...e[o][1].end }
	}, u = {
		type: "labelText",
		start: { ...e[a + r + 2][1].end },
		end: { ...e[o - 2][1].start }
	};
	return s = [[
		"enter",
		c,
		t
	], [
		"enter",
		l,
		t
	]], s = Td(s, e.slice(a + 1, a + r + 3)), s = Td(s, [[
		"enter",
		u,
		t
	]]), s = Td(s, Ed(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), s = Td(s, [
		[
			"exit",
			u,
			t
		],
		e[o - 2],
		e[o - 1],
		[
			"exit",
			l,
			t
		]
	]), s = Td(s, e.slice(o + 1)), s = Td(s, [[
		"exit",
		c,
		t
	]]), wd(e, a, e.length, s), e;
}
function Hh(e, t, n) {
	let r = this, i = r.events.length, a, o;
	for (; i--;) if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
		a = r.events[i][1];
		break;
	}
	return s;
	function s(t) {
		return a ? a._inactive ? d(t) : (o = r.parser.defined.includes(rf(r.sliceSerialize({
			start: a.end,
			end: r.now()
		}))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelEnd"), c) : n(t);
	}
	function c(t) {
		return t === 40 ? e.attempt(Lh, u, o ? u : d)(t) : t === 91 ? e.attempt(Rh, u, o ? l : d)(t) : o ? u(t) : d(t);
	}
	function l(t) {
		return e.attempt(zh, u, d)(t);
	}
	function u(e) {
		return t(e);
	}
	function d(e) {
		return a._balanced = !0, n(e);
	}
}
function Uh(e, t, n) {
	return r;
	function r(t) {
		return e.enter("resource"), e.enter("resourceMarker"), e.consume(t), e.exit("resourceMarker"), i;
	}
	function i(t) {
		return W(t) ? hh(e, a)(t) : a(t);
	}
	function a(t) {
		return t === 41 ? u(t) : fh(e, o, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(t);
	}
	function o(t) {
		return W(t) ? hh(e, c)(t) : u(t);
	}
	function s(e) {
		return n(e);
	}
	function c(t) {
		return t === 34 || t === 39 || t === 40 ? mh(e, l, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(t) : u(t);
	}
	function l(t) {
		return W(t) ? hh(e, u)(t) : u(t);
	}
	function u(r) {
		return r === 41 ? (e.enter("resourceMarker"), e.consume(r), e.exit("resourceMarker"), e.exit("resource"), t) : n(r);
	}
}
function Wh(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return ph.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(t);
	}
	function a(e) {
		return r.parser.defined.includes(rf(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(e) : n(e);
	}
	function o(e) {
		return n(e);
	}
}
function Gh(e, t, n) {
	return r;
	function r(t) {
		return e.enter("reference"), e.enter("referenceMarker"), e.consume(t), e.exit("referenceMarker"), i;
	}
	function i(r) {
		return r === 93 ? (e.enter("referenceMarker"), e.consume(r), e.exit("referenceMarker"), e.exit("reference"), t) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-start-image.js
var Kh = {
	name: "labelStartImage",
	resolveAll: Ih.resolveAll,
	tokenize: qh
};
function qh(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(t), e.exit("labelImageMarker"), a;
	}
	function a(t) {
		return t === 91 ? (e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelImage"), o) : n(t);
	}
	function o(e) {
		/* c8 ignore next 3 */
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-start-link.js
var Jh = {
	name: "labelStartLink",
	resolveAll: Ih.resolveAll,
	tokenize: Yh
};
function Yh(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("labelLink"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelLink"), a;
	}
	function a(e) {
		/* c8 ignore next 3 */
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/line-ending.js
var Xh = {
	name: "lineEnding",
	tokenize: Zh
};
function Zh(e, t) {
	return n;
	function n(n) {
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), K(e, t, "linePrefix");
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/thematic-break.js
var Qh = {
	name: "thematicBreak",
	tokenize: $h
};
function $h(e, t, n) {
	let r = 0, i;
	return a;
	function a(t) {
		return e.enter("thematicBreak"), o(t);
	}
	function o(e) {
		return i = e, s(e);
	}
	function s(a) {
		return a === i ? (e.enter("thematicBreakSequence"), c(a)) : r >= 3 && (a === null || U(a)) ? (e.exit("thematicBreak"), t(a)) : n(a);
	}
	function c(t) {
		return t === i ? (e.consume(t), r++, c) : (e.exit("thematicBreakSequence"), G(t) ? K(e, s, "whitespace")(t) : s(t));
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/list.js
var eg = {
	continuation: { tokenize: ig },
	exit: og,
	name: "list",
	tokenize: rg
}, tg = {
	partial: !0,
	tokenize: sg
}, ng = {
	partial: !0,
	tokenize: ag
};
function rg(e, t, n) {
	let r = this, i = r.events[r.events.length - 1], a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
	return s;
	function s(t) {
		let i = r.containerState.type || (t === 42 || t === 43 || t === 45 ? "listUnordered" : "listOrdered");
		if (i === "listUnordered" ? !r.containerState.marker || t === r.containerState.marker : Du(t)) {
			if (r.containerState.type || (r.containerState.type = i, e.enter(i, { _container: !0 })), i === "listUnordered") return e.enter("listItemPrefix"), t === 42 || t === 45 ? e.check(Qh, n, l)(t) : l(t);
			if (!r.interrupt || t === 49) return e.enter("listItemPrefix"), e.enter("listItemValue"), c(t);
		}
		return n(t);
	}
	function c(t) {
		return Du(t) && ++o < 10 ? (e.consume(t), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? t === r.containerState.marker : t === 41 || t === 46) ? (e.exit("listItemValue"), l(t)) : n(t);
	}
	function l(t) {
		return e.enter("listItemMarker"), e.consume(t), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || t, e.check(Fm, r.interrupt ? n : u, e.attempt(tg, f, d));
	}
	function u(e) {
		return r.containerState.initialBlankLine = !0, a++, f(e);
	}
	function d(t) {
		return G(t) ? (e.enter("listItemPrefixWhitespace"), e.consume(t), e.exit("listItemPrefixWhitespace"), f) : n(t);
	}
	function f(n) {
		return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(n);
	}
}
function ig(e, t, n) {
	let r = this;
	return r.containerState._closeFlow = void 0, e.check(Fm, i, a);
	function i(n) {
		return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, K(e, t, "listItemIndent", r.containerState.size + 1)(n);
	}
	function a(n) {
		return r.containerState.furtherBlankLines || !G(n) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(n)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(ng, t, o)(n));
	}
	function o(i) {
		return r.containerState._closeFlow = !0, r.interrupt = void 0, K(e, e.attempt(eg, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i);
	}
}
function ag(e, t, n) {
	let r = this;
	return K(e, i, "listItemIndent", r.containerState.size + 1);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? t(e) : n(e);
	}
}
function og(e) {
	e.exit(this.containerState.type);
}
function sg(e, t, n) {
	let r = this;
	return K(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return !G(e) && i && i[1].type === "listItemPrefixWhitespace" ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/setext-underline.js
var cg = {
	name: "setextUnderline",
	resolveTo: lg,
	tokenize: ug
};
function lg(e, t) {
	let n = e.length, r, i, a;
	for (; n--;) if (e[n][0] === "enter") {
		if (e[n][1].type === "content") {
			r = n;
			break;
		}
		e[n][1].type === "paragraph" && (i = n);
	} else e[n][1].type === "content" && e.splice(n, 1), !a && e[n][1].type === "definition" && (a = n);
	let o = {
		type: "setextHeading",
		start: { ...e[r][1].start },
		end: { ...e[e.length - 1][1].end }
	};
	return e[i][1].type = "setextHeadingText", a ? (e.splice(i, 0, [
		"enter",
		o,
		t
	]), e.splice(a + 1, 0, [
		"exit",
		e[r][1],
		t
	]), e[r][1].end = { ...e[a][1].end }) : e[r][1] = o, e.push([
		"exit",
		o,
		t
	]), e;
}
function ug(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		let a = r.events.length, s;
		for (; a--;) if (r.events[a][1].type !== "lineEnding" && r.events[a][1].type !== "linePrefix" && r.events[a][1].type !== "content") {
			s = r.events[a][1].type === "paragraph";
			break;
		}
		return !r.parser.lazy[r.now().line] && (r.interrupt || s) ? (e.enter("setextHeadingLine"), i = t, o(t)) : n(t);
	}
	function o(t) {
		return e.enter("setextHeadingLineSequence"), s(t);
	}
	function s(t) {
		return t === i ? (e.consume(t), s) : (e.exit("setextHeadingLineSequence"), G(t) ? K(e, c, "lineSuffix")(t) : c(t));
	}
	function c(r) {
		return r === null || U(r) ? (e.exit("setextHeadingLine"), t(r)) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-footnote/lib/syntax.js
var dg = {
	tokenize: yg,
	partial: !0
};
function fg() {
	return {
		document: { 91: {
			name: "gfmFootnoteDefinition",
			tokenize: gg,
			continuation: { tokenize: _g },
			exit: vg
		} },
		text: {
			91: {
				name: "gfmFootnoteCall",
				tokenize: hg
			},
			93: {
				name: "gfmPotentialFootnoteCall",
				add: "after",
				tokenize: pg,
				resolveTo: mg
			}
		}
	};
}
function pg(e, t, n) {
	let r = this, i = r.events.length, a = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), o;
	for (; i--;) {
		let e = r.events[i][1];
		if (e.type === "labelImage") {
			o = e;
			break;
		}
		if (e.type === "gfmFootnoteCall" || e.type === "labelLink" || e.type === "label" || e.type === "image" || e.type === "link") break;
	}
	return s;
	function s(i) {
		if (!o || !o._balanced) return n(i);
		let s = rf(r.sliceSerialize({
			start: o.end,
			end: r.now()
		}));
		return s.codePointAt(0) !== 94 || !a.includes(s.slice(1)) ? n(i) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(i), e.exit("gfmFootnoteCallLabelMarker"), t(i));
	}
}
function mg(e, t) {
	let n = e.length;
	for (; n--;) if (e[n][1].type === "labelImage" && e[n][0] === "enter") {
		e[n][1];
		break;
	}
	e[n + 1][1].type = "data", e[n + 3][1].type = "gfmFootnoteCallLabelMarker";
	let r = {
		type: "gfmFootnoteCall",
		start: Object.assign({}, e[n + 3][1].start),
		end: Object.assign({}, e[e.length - 1][1].end)
	}, i = {
		type: "gfmFootnoteCallMarker",
		start: Object.assign({}, e[n + 3][1].end),
		end: Object.assign({}, e[n + 3][1].end)
	};
	i.end.column++, i.end.offset++, i.end._bufferIndex++;
	let a = {
		type: "gfmFootnoteCallString",
		start: Object.assign({}, i.end),
		end: Object.assign({}, e[e.length - 1][1].start)
	}, o = {
		type: "chunkString",
		contentType: "string",
		start: Object.assign({}, a.start),
		end: Object.assign({}, a.end)
	}, s = [
		e[n + 1],
		e[n + 2],
		[
			"enter",
			r,
			t
		],
		e[n + 3],
		e[n + 4],
		[
			"enter",
			i,
			t
		],
		[
			"exit",
			i,
			t
		],
		[
			"enter",
			a,
			t
		],
		[
			"enter",
			o,
			t
		],
		[
			"exit",
			o,
			t
		],
		[
			"exit",
			a,
			t
		],
		e[e.length - 2],
		e[e.length - 1],
		[
			"exit",
			r,
			t
		]
	];
	return e.splice(n, e.length - n + 1, ...s), e;
}
function hg(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a = 0, o;
	return s;
	function s(t) {
		return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(t), e.exit("gfmFootnoteCallLabelMarker"), c;
	}
	function c(t) {
		return t === 94 ? (e.enter("gfmFootnoteCallMarker"), e.consume(t), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", l) : n(t);
	}
	function l(s) {
		if (a > 999 || s === 93 && !o || s === null || s === 91 || W(s)) return n(s);
		if (s === 93) {
			e.exit("chunkString");
			let a = e.exit("gfmFootnoteCallString");
			return i.includes(rf(r.sliceSerialize(a))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : n(s);
		}
		return W(s) || (o = !0), a++, e.consume(s), s === 92 ? u : l;
	}
	function u(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), a++, l) : l(t);
	}
}
function gg(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a, o = 0, s;
	return c;
	function c(t) {
		return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), l;
	}
	function l(t) {
		return t === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", u) : n(t);
	}
	function u(t) {
		if (o > 999 || t === 93 && !s || t === null || t === 91 || W(t)) return n(t);
		if (t === 93) {
			e.exit("chunkString");
			let n = e.exit("gfmFootnoteDefinitionLabelString");
			return a = rf(r.sliceSerialize(n)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), f;
		}
		return W(t) || (s = !0), o++, e.consume(t), t === 92 ? d : u;
	}
	function d(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), o++, u) : u(t);
	}
	function f(t) {
		return t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), i.includes(a) || i.push(a), K(e, p, "gfmFootnoteDefinitionWhitespace")) : n(t);
	}
	function p(e) {
		return t(e);
	}
}
function _g(e, t, n) {
	return e.check(Fm, t, e.attempt(dg, t, n));
}
function vg(e) {
	e.exit("gfmFootnoteDefinition");
}
function yg(e, t, n) {
	let r = this;
	return K(e, i, "gfmFootnoteDefinitionIndent", 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js
function bg(e) {
	let t = (e || {}).singleTilde, n = {
		name: "strikethrough",
		tokenize: i,
		resolveAll: r
	};
	return t ?? (t = !0), {
		text: { 126: n },
		insideSpan: { null: [n] },
		attentionMarkers: { null: [126] }
	};
	function r(e, t) {
		let n = -1;
		for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "strikethroughSequenceTemporary" && e[n][1]._close) {
			let r = n;
			for (; r--;) if (e[r][0] === "exit" && e[r][1].type === "strikethroughSequenceTemporary" && e[r][1]._open && e[n][1].end.offset - e[n][1].start.offset === e[r][1].end.offset - e[r][1].start.offset) {
				e[n][1].type = "strikethroughSequence", e[r][1].type = "strikethroughSequence";
				let i = {
					type: "strikethrough",
					start: Object.assign({}, e[r][1].start),
					end: Object.assign({}, e[n][1].end)
				}, a = {
					type: "strikethroughText",
					start: Object.assign({}, e[r][1].end),
					end: Object.assign({}, e[n][1].start)
				}, o = [
					[
						"enter",
						i,
						t
					],
					[
						"enter",
						e[r][1],
						t
					],
					[
						"exit",
						e[r][1],
						t
					],
					[
						"enter",
						a,
						t
					]
				], s = t.parser.constructs.insideSpan.null;
				s && wd(o, o.length, 0, Ed(s, e.slice(r + 1, n), t)), wd(o, o.length, 0, [
					[
						"exit",
						a,
						t
					],
					[
						"enter",
						e[n][1],
						t
					],
					[
						"exit",
						e[n][1],
						t
					],
					[
						"exit",
						i,
						t
					]
				]), wd(e, r - 1, n - r + 3, o), n = r + o.length - 2;
				break;
			}
		}
		for (n = -1; ++n < e.length;) e[n][1].type === "strikethroughSequenceTemporary" && (e[n][1].type = "data");
		return e;
	}
	function i(e, n, r) {
		let i = this.previous, a = this.events, o = 0;
		return s;
		function s(t) {
			return i === 126 && a[a.length - 1][1].type !== "characterEscape" ? r(t) : (e.enter("strikethroughSequenceTemporary"), c(t));
		}
		function c(a) {
			let s = Wf(i);
			if (a === 126) return o > 1 ? r(a) : (e.consume(a), o++, c);
			if (o < 2 && !t) return r(a);
			let l = e.exit("strikethroughSequenceTemporary"), u = Wf(a);
			return l._open = !u || u === 2 && !!s, l._close = !s || s === 2 && !!u, n(a);
		}
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/edit-map.js
var xg = class {
	constructor() {
		this.map = [], this.index = /* @__PURE__ */ new Map();
	}
	add(e, t, n) {
		Sg(this, e, t, n);
	}
	consume(e) {
		/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
		if (this.map.sort(function(e, t) {
			return e[0] - t[0];
		}), this.map.length === 0) return;
		let t = this.map.length, n = [];
		for (; t > 0;) --t, n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
		n.push(e.slice()), e.length = 0;
		let r = n.pop();
		for (; r;) {
			for (let t of r) e.push(t);
			r = n.pop();
		}
		this.map.length = 0, this.index.clear();
	}
};
function Sg(e, t, n, r) {
	/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
	if (n === 0 && r.length === 0) return;
	let i = e.index.get(t);
	if (i) {
		i[1] += n, i[2].push(...r);
		return;
	}
	let a = [
		t,
		n,
		r
	];
	e.map.push(a), e.index.set(t, a);
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/infer.js
function Cg(e, t) {
	let n = !1, r = [];
	for (; t < e.length;) {
		let i = e[t];
		if (n) {
			if (i[0] === "enter") i[1].type === "tableContent" && r.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			else if (i[1].type === "tableContent") {
				if (e[t - 1][1].type === "tableDelimiterMarker") {
					let e = r.length - 1;
					r[e] = r[e] === "left" ? "center" : "right";
				}
			} else if (i[1].type === "tableDelimiterRow") break;
		} else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = !0);
		t += 1;
	}
	return r;
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/syntax.js
function wg() {
	return { flow: { null: {
		name: "table",
		tokenize: Tg,
		resolveAll: Eg
	} } };
}
function Tg(e, t, n) {
	let r = this, i = 0, a = 0, o;
	return s;
	function s(e) {
		let t = r.events.length - 1;
		for (; t > -1;) {
			let { type: e } = r.events[t][1];
			if (e === "lineEnding" || e === "linePrefix") t--;
			else break;
		}
		let i = t > -1 ? r.events[t][1].type : null, a = i === "tableHead" || i === "tableRow" ? te : c;
		return a === te && r.parser.lazy[r.now().line] ? n(e) : a(e);
	}
	function c(t) {
		return e.enter("tableHead"), e.enter("tableRow"), l(t);
	}
	function l(e) {
		return e === 124 ? u(e) : (o = !0, a += 1, u(e));
	}
	function u(t) {
		return t === null ? n(t) : U(t) ? a > 1 ? (a = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), p) : n(t) : G(t) ? K(e, u, "whitespace")(t) : (a += 1, o && (o = !1, i += 1), t === 124 ? (e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), o = !0, u) : (e.enter("data"), d(t)));
	}
	function d(t) {
		return t === null || t === 124 || W(t) ? (e.exit("data"), u(t)) : (e.consume(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === 92 || t === 124 ? (e.consume(t), d) : d(t);
	}
	function p(t) {
		return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(t) : (e.enter("tableDelimiterRow"), o = !1, G(t) ? K(e, m, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : m(t));
	}
	function m(t) {
		return t === 45 || t === 58 ? g(t) : t === 124 ? (o = !0, e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), h) : b(t);
	}
	function h(t) {
		return G(t) ? K(e, g, "whitespace")(t) : g(t);
	}
	function g(t) {
		return t === 58 ? (a += 1, o = !0, e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), _) : t === 45 ? (a += 1, _(t)) : t === null || U(t) ? ee(t) : b(t);
	}
	function _(t) {
		return t === 45 ? (e.enter("tableDelimiterFiller"), v(t)) : b(t);
	}
	function v(t) {
		return t === 45 ? (e.consume(t), v) : t === 58 ? (o = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), y) : (e.exit("tableDelimiterFiller"), y(t));
	}
	function y(t) {
		return G(t) ? K(e, ee, "whitespace")(t) : ee(t);
	}
	function ee(n) {
		return n === 124 ? m(n) : n === null || U(n) ? !o || i !== a ? b(n) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(n)) : b(n);
	}
	function b(e) {
		return n(e);
	}
	function te(t) {
		return e.enter("tableRow"), ne(t);
	}
	function ne(n) {
		return n === 124 ? (e.enter("tableCellDivider"), e.consume(n), e.exit("tableCellDivider"), ne) : n === null || U(n) ? (e.exit("tableRow"), t(n)) : G(n) ? K(e, ne, "whitespace")(n) : (e.enter("data"), x(n));
	}
	function x(t) {
		return t === null || t === 124 || W(t) ? (e.exit("data"), ne(t)) : (e.consume(t), t === 92 ? S : x);
	}
	function S(t) {
		return t === 92 || t === 124 ? (e.consume(t), x) : x(t);
	}
}
function Eg(e, t) {
	let n = -1, r = !0, i = 0, a = [
		0,
		0,
		0,
		0
	], o = [
		0,
		0,
		0,
		0
	], s = !1, c = 0, l, u, d, f = new xg();
	for (; ++n < e.length;) {
		let p = e[n], m = p[1];
		p[0] === "enter" ? m.type === "tableHead" ? (s = !1, c !== 0 && (Og(f, t, c, l, u), u = void 0, c = 0), l = {
			type: "table",
			start: Object.assign({}, m.start),
			end: Object.assign({}, m.end)
		}, f.add(n, 0, [[
			"enter",
			l,
			t
		]])) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (r = !0, d = void 0, a = [
			0,
			0,
			0,
			0
		], o = [
			0,
			n + 1,
			0,
			0
		], s && (s = !1, u = {
			type: "tableBody",
			start: Object.assign({}, m.start),
			end: Object.assign({}, m.end)
		}, f.add(n, 0, [[
			"enter",
			u,
			t
		]])), i = m.type === "tableDelimiterRow" ? 2 : u ? 3 : 1) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") ? (r = !1, o[2] === 0 && (a[1] !== 0 && (o[0] = o[1], d = Dg(f, t, a, i, void 0, d), a = [
			0,
			0,
			0,
			0
		]), o[2] = n)) : m.type === "tableCellDivider" && (r ? r = !1 : (a[1] !== 0 && (o[0] = o[1], d = Dg(f, t, a, i, void 0, d)), a = o, o = [
			a[1],
			n,
			0,
			0
		])) : m.type === "tableHead" ? (s = !0, c = n) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (c = n, a[1] === 0 ? o[1] !== 0 && (d = Dg(f, t, o, i, n, d)) : (o[0] = o[1], d = Dg(f, t, a, i, n, d)), i = 0) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") && (o[3] = n);
	}
	for (c !== 0 && Og(f, t, c, l, u), f.consume(t.events), n = -1; ++n < t.events.length;) {
		let e = t.events[n];
		e[0] === "enter" && e[1].type === "table" && (e[1]._align = Cg(t.events, n));
	}
	return e;
}
function Dg(e, t, n, r, i, a) {
	let o = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData";
	n[0] !== 0 && (a.end = Object.assign({}, kg(t.events, n[0])), e.add(n[0], 0, [[
		"exit",
		a,
		t
	]]));
	let s = kg(t.events, n[1]);
	if (a = {
		type: o,
		start: Object.assign({}, s),
		end: Object.assign({}, s)
	}, e.add(n[1], 0, [[
		"enter",
		a,
		t
	]]), n[2] !== 0) {
		let i = kg(t.events, n[2]), a = kg(t.events, n[3]), o = {
			type: "tableContent",
			start: Object.assign({}, i),
			end: Object.assign({}, a)
		};
		if (e.add(n[2], 0, [[
			"enter",
			o,
			t
		]]), r !== 2) {
			let r = t.events[n[2]], i = t.events[n[3]];
			if (r[1].end = Object.assign({}, i[1].end), r[1].type = "chunkText", r[1].contentType = "text", n[3] > n[2] + 1) {
				let t = n[2] + 1, r = n[3] - n[2] - 1;
				e.add(t, r, []);
			}
		}
		e.add(n[3] + 1, 0, [[
			"exit",
			o,
			t
		]]);
	}
	return i !== void 0 && (a.end = Object.assign({}, kg(t.events, i)), e.add(i, 0, [[
		"exit",
		a,
		t
	]]), a = void 0), a;
}
function Og(e, t, n, r, i) {
	let a = [], o = kg(t.events, n);
	i && (i.end = Object.assign({}, o), a.push([
		"exit",
		i,
		t
	])), r.end = Object.assign({}, o), a.push([
		"exit",
		r,
		t
	]), e.add(n + 1, 0, a);
}
function kg(e, t) {
	let n = e[t], r = n[0] === "enter" ? "start" : "end";
	return n[1][r];
}
//#endregion
//#region node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js
var Ag = {
	name: "tasklistCheck",
	tokenize: Mg
};
function jg() {
	return { text: { 91: Ag } };
}
function Mg(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return r.previous !== null || !r._gfmTasklistFirstContentOfListItem ? n(t) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), a);
	}
	function a(t) {
		return W(t) ? (e.enter("taskListCheckValueUnchecked"), e.consume(t), e.exit("taskListCheckValueUnchecked"), o) : t === 88 || t === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(t), e.exit("taskListCheckValueChecked"), o) : n(t);
	}
	function o(t) {
		return t === 93 ? (e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), s) : n(t);
	}
	function s(r) {
		return U(r) ? t(r) : G(r) ? e.check({ tokenize: Ng }, t, n)(r) : n(r);
	}
}
function Ng(e, t, n) {
	return K(e, r, "whitespace");
	function r(e) {
		return e === null ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm/index.js
function Pg(e) {
	return tm([
		pm(),
		fg(),
		bg(e),
		wg(),
		jg()
	]);
}
//#endregion
//#region node_modules/remark-gfm/lib/index.js
var Fg = {};
function Ig(e) {
	let t = this, n = e || Fg, r = t.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), a = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), o = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
	i.push(Pg(n)), a.push(Qp()), o.push($p(n));
}
//#endregion
//#region node_modules/mdast-util-math/lib/index.js
function Lg() {
	return {
		enter: {
			mathFlow: e,
			mathFlowFenceMeta: t,
			mathText: a
		},
		exit: {
			mathFlow: i,
			mathFlowFence: r,
			mathFlowFenceMeta: n,
			mathFlowValue: s,
			mathText: o,
			mathTextData: s
		}
	};
	function e(e) {
		this.enter({
			type: "math",
			meta: null,
			value: "",
			data: {
				hName: "pre",
				hChildren: [{
					type: "element",
					tagName: "code",
					properties: { className: ["language-math", "math-display"] },
					children: []
				}]
			}
		}, e);
	}
	function t() {
		this.buffer();
	}
	function n() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.type, t.meta = e;
	}
	function r() {
		this.data.mathFlowInside || (this.buffer(), this.data.mathFlowInside = !0);
	}
	function i(e) {
		let t = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), n = this.stack[this.stack.length - 1];
		n.type, this.exit(e), n.value = t;
		let r = n.data.hChildren[0];
		r.type, r.tagName, r.children.push({
			type: "text",
			value: t
		}), this.data.mathFlowInside = void 0;
	}
	function a(e) {
		this.enter({
			type: "inlineMath",
			value: "",
			data: {
				hName: "code",
				hProperties: { className: ["language-math", "math-inline"] },
				hChildren: []
			}
		}, e), this.buffer();
	}
	function o(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.type, this.exit(e), n.value = t, n.data.hChildren.push({
			type: "text",
			value: t
		});
	}
	function s(e) {
		this.config.enter.data.call(this, e), this.config.exit.data.call(this, e);
	}
}
function Rg(e) {
	let t = (e || {}).singleDollarTextMath;
	return t ?? (t = !0), r.peek = i, {
		unsafe: [
			{
				character: "\r",
				inConstruct: "mathFlowMeta"
			},
			{
				character: "\n",
				inConstruct: "mathFlowMeta"
			},
			{
				character: "$",
				after: t ? void 0 : "\\$",
				inConstruct: "phrasing"
			},
			{
				character: "$",
				inConstruct: "mathFlowMeta"
			},
			{
				atBreak: !0,
				character: "$",
				after: "\\$"
			}
		],
		handlers: {
			math: n,
			inlineMath: r
		}
	};
	function n(e, t, n, r) {
		let i = e.value || "", a = n.createTracker(r), o = "$".repeat(Math.max(Ff(i, "$") + 1, 2)), s = n.enter("mathFlow"), c = a.move(o);
		if (e.meta) {
			let t = n.enter("mathFlowMeta");
			c += a.move(n.safe(e.meta, {
				after: "\n",
				before: c,
				encode: ["$"],
				...a.current()
			})), t();
		}
		return c += a.move("\n"), i && (c += a.move(i + "\n")), c += a.move(o), s(), c;
	}
	function r(e, n, r) {
		let i = e.value || "", a = 1;
		for (t || a++; RegExp("(^|[^$])" + "\\$".repeat(a) + "([^$]|$)").test(i);) a++;
		let o = "$".repeat(a);
		/[^ \r\n]/.test(i) && (/^[ \r\n]/.test(i) && /[ \r\n]$/.test(i) || /^\$|\$$/.test(i)) && (i = " " + i + " ");
		let s = -1;
		for (; ++s < r.unsafe.length;) {
			let e = r.unsafe[s];
			if (!e.atBreak) continue;
			let t = r.compilePattern(e), n;
			for (; n = t.exec(i);) {
				let e = n.index;
				i.codePointAt(e) === 10 && i.codePointAt(e - 1) === 13 && e--, i = i.slice(0, e) + " " + i.slice(n.index + 1);
			}
		}
		return o + i + o;
	}
	function i() {
		return "$";
	}
}
//#endregion
//#region node_modules/micromark-extension-math/lib/math-flow.js
var zg = {
	tokenize: Vg,
	concrete: !0,
	name: "mathFlow"
}, Bg = {
	tokenize: Hg,
	partial: !0
};
function Vg(e, t, n) {
	let r = this, i = r.events[r.events.length - 1], a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
	return s;
	function s(t) {
		return e.enter("mathFlow"), e.enter("mathFlowFence"), e.enter("mathFlowFenceSequence"), c(t);
	}
	function c(t) {
		return t === 36 ? (e.consume(t), o++, c) : o < 2 ? n(t) : (e.exit("mathFlowFenceSequence"), K(e, l, "whitespace")(t));
	}
	function l(t) {
		return t === null || U(t) ? d(t) : (e.enter("mathFlowFenceMeta"), e.enter("chunkString", { contentType: "string" }), u(t));
	}
	function u(t) {
		return t === null || U(t) ? (e.exit("chunkString"), e.exit("mathFlowFenceMeta"), d(t)) : t === 36 ? n(t) : (e.consume(t), u);
	}
	function d(n) {
		return e.exit("mathFlowFence"), r.interrupt ? t(n) : e.attempt(Bg, f, g)(n);
	}
	function f(t) {
		return e.attempt({
			tokenize: _,
			partial: !0
		}, g, p)(t);
	}
	function p(t) {
		return (a ? K(e, m, "linePrefix", a + 1) : m)(t);
	}
	function m(t) {
		return t === null ? g(t) : U(t) ? e.attempt(Bg, f, g)(t) : (e.enter("mathFlowValue"), h(t));
	}
	function h(t) {
		return t === null || U(t) ? (e.exit("mathFlowValue"), m(t)) : (e.consume(t), h);
	}
	function g(n) {
		return e.exit("mathFlow"), t(n);
	}
	function _(e, t, n) {
		let i = 0;
		return K(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
		function a(t) {
			return e.enter("mathFlowFence"), e.enter("mathFlowFenceSequence"), s(t);
		}
		function s(t) {
			return t === 36 ? (i++, e.consume(t), s) : i < o ? n(t) : (e.exit("mathFlowFenceSequence"), K(e, c, "whitespace")(t));
		}
		function c(r) {
			return r === null || U(r) ? (e.exit("mathFlowFence"), t(r)) : n(r);
		}
	}
}
function Hg(e, t, n) {
	let r = this;
	return i;
	function i(n) {
		return n === null ? t(n) : (e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), a);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-math/lib/math-text.js
function Ug(e) {
	let t = (e || {}).singleDollarTextMath;
	return t ?? (t = !0), {
		tokenize: n,
		resolve: Wg,
		previous: Gg,
		name: "mathText"
	};
	function n(e, n, r) {
		let i = 0, a, o;
		return s;
		function s(t) {
			return e.enter("mathText"), e.enter("mathTextSequence"), c(t);
		}
		function c(n) {
			return n === 36 ? (e.consume(n), i++, c) : i < 2 && !t ? r(n) : (e.exit("mathTextSequence"), l(n));
		}
		function l(t) {
			return t === null ? r(t) : t === 36 ? (o = e.enter("mathTextSequence"), a = 0, d(t)) : t === 32 ? (e.enter("space"), e.consume(t), e.exit("space"), l) : U(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), l) : (e.enter("mathTextData"), u(t));
		}
		function u(t) {
			return t === null || t === 32 || t === 36 || U(t) ? (e.exit("mathTextData"), l(t)) : (e.consume(t), u);
		}
		function d(t) {
			return t === 36 ? (e.consume(t), a++, d) : a === i ? (e.exit("mathTextSequence"), e.exit("mathText"), n(t)) : (o.type = "mathTextData", u(t));
		}
	}
}
function Wg(e) {
	let t = e.length - 4, n = 3, r, i;
	if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (r = n; ++r < t;) if (e[r][1].type === "mathTextData") {
			e[t][1].type = "mathTextPadding", e[n][1].type = "mathTextPadding", n += 2, t -= 2;
			break;
		}
	}
	for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "mathTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
	return e;
}
function Gg(e) {
	return e !== 36 || this.events[this.events.length - 1][1].type === "characterEscape";
}
//#endregion
//#region node_modules/micromark-extension-math/lib/syntax.js
function Kg(e) {
	return {
		flow: { 36: zg },
		text: { 36: Ug(e) }
	};
}
//#endregion
//#region node_modules/remark-math/lib/index.js
var qg = {};
function Jg(e) {
	let t = this, n = e || qg, r = t.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), a = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), o = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
	i.push(Kg(n)), a.push(Lg()), o.push(Rg(n));
}
//#endregion
//#region node_modules/remend/dist/index.js
var Yg = /(\*\*)([^*]*?)$/, Xg = /(__)([^_]*?)$/, Zg = /(\*\*\*)([^*]*?)$/, Qg = /(\*)([^*]*?)$/, $g = /(_)([^_]*?)$/, e_ = /(`)([^`]*?)$/, t_ = /(~~)([^~]*?)$/, n_ = /^[\s_~*`]*$/, r_ = /^[\s]*[-*+][\s]+$/, i_ = /[\p{L}\p{N}_]/u, a_ = /^```[^`\n]*```?$/, o_ = /^\*{4,}$/, s_ = (e) => {
	if (!e) return !1;
	let t = e.charCodeAt(0);
	return t >= 48 && t <= 57 || t >= 65 && t <= 90 || t >= 97 && t <= 122 || t === 95 || i_.test(e);
}, c_ = (e) => {
	let t = (e.match(/```/g) || []).length;
	return t > 0 && t % 2 == 0 && e.includes("\n");
}, l_ = (e, t) => {
	let n = 1;
	for (let r = t - 1; r >= 0; --r) if (e[r] === "]") n += 1;
	else if (e[r] === "[" && (--n, n === 0)) return r;
	return -1;
}, u_ = (e, t) => {
	let n = 1;
	for (let r = t + 1; r < e.length; r += 1) if (e[r] === "[") n += 1;
	else if (e[r] === "]" && (--n, n === 0)) return r;
	return -1;
}, d_ = (e, t) => {
	let n = !1, r = !1;
	for (let i = 0; i < e.length && i < t; i += 1) {
		if (e[i] === "\\" && e[i + 1] === "$") {
			i += 1;
			continue;
		}
		e[i] === "$" && (e[i + 1] === "$" ? (r = !r, i += 1, n = !1) : r || (n = !n));
	}
	return n || r;
}, f_ = (e, t, n) => {
	if (n !== " " && n !== "	") return !1;
	let r = 0;
	for (let n = t - 1; n >= 0; --n) if (e[n] === "\n") {
		r = n + 1;
		break;
	}
	for (let n = r; n < t; n += 1) if (e[n] !== " " && e[n] !== "	") return !1;
	return !0;
}, p_ = (e, t, n, r) => !!(n === "\\" || n === "*" || r === "*" || n && r && s_(n) && s_(r) || f_(e, t, r)), m_ = (e) => {
	let t = 0, n = e.length;
	for (let r = 0; r < n; r += 1) {
		if (e[r] !== "*") continue;
		let i = r > 0 ? e[r - 1] : "", a = r < n - 1 ? e[r + 1] : "";
		p_(e, r, i, a) || (t += 1);
	}
	return t;
}, h_ = (e, t, n, r) => !!(n === "\\" || e.includes("$") && d_(e, t) || n === "_" || r === "_" || n && r && s_(n) && s_(r)), g_ = (e) => {
	let t = 0, n = e.length;
	for (let r = 0; r < n; r += 1) {
		if (e[r] !== "_") continue;
		let i = r > 0 ? e[r - 1] : "", a = r < n - 1 ? e[r + 1] : "";
		h_(e, r, i, a) || (t += 1);
	}
	return t;
}, __ = (e) => {
	let t = 0, n = 0;
	for (let r = 0; r < e.length; r += 1) e[r] === "*" ? n += 1 : (n >= 3 && (t += Math.floor(n / 3)), n = 0);
	return n >= 3 && (t += Math.floor(n / 3)), t;
}, v_ = (e) => {
	if (c_(e)) return e;
	let t = e.match(Yg);
	if (t) {
		let n = t[2];
		if (!n || n_.test(n)) return e;
		let r = e.lastIndexOf(t[1]), i = e.substring(0, r).lastIndexOf("\n"), a = i === -1 ? 0 : i + 1, o = e.substring(a, r);
		if (r_.test(o) && n.includes("\n")) return e;
		if ((e.match(/\*\*/g) || []).length % 2 == 1) return `${e}**`;
	}
	return e;
}, y_ = (e) => {
	let t = e.match(Xg);
	if (t) {
		let n = t[2];
		if (!n || n_.test(n)) return e;
		let r = e.lastIndexOf(t[1]), i = e.substring(0, r).lastIndexOf("\n"), a = i === -1 ? 0 : i + 1, o = e.substring(a, r);
		if (r_.test(o) && n.includes("\n")) return e;
		if ((e.match(/__/g) || []).length % 2 == 1) return `${e}__`;
	}
	return e;
}, b_ = (e) => {
	for (let t = 0; t < e.length; t += 1) if (e[t] === "*" && e[t - 1] !== "*" && e[t + 1] !== "*" && e[t - 1] !== "\\") {
		let n = t > 0 ? e[t - 1] : "", r = t < e.length - 1 ? e[t + 1] : "";
		if (n && r && s_(n) && s_(r)) continue;
		return t;
	}
	return -1;
}, x_ = (e) => {
	if (c_(e) || !e.match(Qg)) return e;
	let t = b_(e);
	if (t === -1) return e;
	let n = e.substring(t + 1);
	return !n || n_.test(n) ? e : m_(e) % 2 == 1 ? `${e}*` : e;
}, S_ = (e) => {
	for (let t = 0; t < e.length; t += 1) if (e[t] === "_" && e[t - 1] !== "_" && e[t + 1] !== "_" && e[t - 1] !== "\\" && !d_(e, t)) {
		let n = t > 0 ? e[t - 1] : "", r = t < e.length - 1 ? e[t + 1] : "";
		if (n && r && s_(n) && s_(r)) continue;
		return t;
	}
	return -1;
}, C_ = (e) => {
	let t = e.length;
	for (; t > 0 && e[t - 1] === "\n";) --t;
	return t < e.length ? `${e.slice(0, t)}_${e.slice(t)}` : `${e}_`;
}, w_ = (e) => {
	if (c_(e) || !e.match($g)) return e;
	let t = S_(e);
	if (t === -1) return e;
	let n = e.substring(t + 1);
	return !n || n_.test(n) ? e : g_(e) % 2 == 1 ? C_(e) : e;
}, T_ = (e) => {
	if (c_(e) || o_.test(e)) return e;
	let t = e.match(Zg);
	if (t) {
		let n = t[2];
		if (!n || n_.test(n)) return e;
		if (__(e) % 2 == 1) return `${e}***`;
	}
	return e;
}, E_ = (e, t) => {
	let n = !1, r = !1;
	for (let i = 0; i < t; i += 1) {
		if (e.substring(i, i + 3) === "```") {
			r = !r, i += 2;
			continue;
		}
		!r && e[i] === "`" && (n = !n);
	}
	return n || r;
}, D_ = (e, t) => {
	let n = e.substring(t, t + 3) === "```", r = t > 0 && e.substring(t - 1, t + 2) === "```", i = t > 1 && e.substring(t - 2, t + 1) === "```";
	return n || r || i;
}, O_ = (e) => {
	let t = 0;
	for (let n = 0; n < e.length; n += 1) e[n] === "`" && !D_(e, n) && (t += 1);
	return t;
}, k_ = (e) => !e.match(a_) || e.includes("\n") ? null : e.endsWith("``") && !e.endsWith("```") ? `${e}\`` : e, A_ = (e) => {
	let t = (e.match(/```/g) || []).length;
	return !!(t > 0 && t % 2 == 0 && e.includes("\n") || (e.endsWith("```\n") || e.endsWith("```")) && t % 2 == 0);
}, j_ = (e) => (e.match(/```/g) || []).length % 2 == 1, M_ = (e) => {
	let t = k_(e);
	if (t !== null) return t;
	if (A_(e)) return e;
	let n = e.match(e_);
	if (n && !j_(e)) {
		let t = n[2];
		if (!t || n_.test(t)) return e;
		if (O_(e) % 2 == 1) return `${e}\``;
	}
	return e;
}, N_ = (e) => {
	if ((e.match(/\$\$/g) || []).length % 2 == 0) return e;
	let t = e.indexOf("$$");
	return t !== -1 && e.indexOf("\n", t) !== -1 && !e.endsWith("\n") ? `${e}
$$` : `${e}$$`;
}, P_ = (e, t) => {
	if (e.substring(t + 2).includes(")")) return null;
	let n = l_(e, t);
	if (n === -1 || E_(e, n)) return null;
	let r = n > 0 && e[n - 1] === "!", i = r ? n - 1 : n, a = e.substring(0, i);
	return r ? a : `${a}[${e.substring(n + 1, t)}](streamdown:incomplete-link)`;
}, F_ = (e, t) => {
	let n = t > 0 && e[t - 1] === "!", r = n ? t - 1 : t;
	if (!e.substring(t + 1).includes("]")) {
		let t = e.substring(0, r);
		return n ? t : `${e}](streamdown:incomplete-link)`;
	}
	if (u_(e, t) === -1) {
		let t = e.substring(0, r);
		return n ? t : `${e}](streamdown:incomplete-link)`;
	}
	return null;
}, I_ = (e) => {
	let t = e.lastIndexOf("](");
	if (t !== -1 && !E_(e, t)) {
		let n = P_(e, t);
		if (n !== null) return n;
	}
	for (let t = e.length - 1; t >= 0; --t) if (e[t] === "[" && !E_(e, t)) {
		let n = F_(e, t);
		if (n !== null) return n;
	}
	return e;
}, L_ = (e) => {
	let t = e.match(t_);
	if (t) {
		let n = t[2];
		if (!n || n_.test(n)) return e;
		if ((e.match(/~~/g) || []).length % 2 == 1) return `${e}~~`;
	}
	return e;
}, R_ = (e) => {
	if (!e || typeof e != "string") return e;
	let t = e, n = I_(t);
	return n.endsWith("](streamdown:incomplete-link)") ? n : (t = n, t = T_(t), t = v_(t), t = y_(t), t = x_(t), t = w_(t), t = M_(t), t = L_(t), t = N_(t), t);
}, z_ = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), B_ = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), V_ = (e) => {
	let t = B_(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, H_ = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), U_ = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
}, W_ = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, G_ = (0, s.forwardRef)(({ color: e = "currentColor", size: t = 24, strokeWidth: n = 2, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...c }, l) => (0, s.createElement)("svg", {
	ref: l,
	...W_,
	width: t,
	height: t,
	stroke: e,
	strokeWidth: r ? Number(n) * 24 / Number(t) : n,
	className: H_("lucide", i),
	...!a && !U_(c) && { "aria-hidden": "true" },
	...c
}, [...o.map(([e, t]) => (0, s.createElement)(e, t)), ...Array.isArray(a) ? a : [a]])), K_ = (e, t) => {
	let n = (0, s.forwardRef)(({ className: n, ...r }, i) => (0, s.createElement)(G_, {
		ref: i,
		iconNode: t,
		className: H_(`lucide-${z_(V_(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = V_(e), n;
}, q_ = K_("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), J_ = K_("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]), Y_ = K_("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]), X_ = K_("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), Z_ = K_("maximize-2", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "m21 3-7 7",
		key: "1l2asr"
	}],
	["path", {
		d: "m3 21 7-7",
		key: "tjx5ai"
	}],
	["path", {
		d: "M9 21H3v-6",
		key: "wtvkvv"
	}]
]), Q_ = K_("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), $_ = K_("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), ev = K_("zoom-in", [
	["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}],
	["line", {
		x1: "21",
		x2: "16.65",
		y1: "21",
		y2: "16.65",
		key: "13gj7c"
	}],
	["line", {
		x1: "11",
		x2: "11",
		y1: "8",
		y2: "14",
		key: "1vmskp"
	}],
	["line", {
		x1: "8",
		x2: "14",
		y1: "11",
		y2: "11",
		key: "durymu"
	}]
]), tv = K_("zoom-out", [
	["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}],
	["line", {
		x1: "21",
		x2: "16.65",
		y1: "21",
		y2: "16.65",
		key: "13gj7c"
	}],
	["line", {
		x1: "8",
		x2: "14",
		y1: "11",
		y2: "11",
		key: "durymu"
	}]
]), nv = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, rv = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, iv = {};
function av(e, t) {
	return ((t || iv).jsx ? rv : nv).test(e);
}
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/hast-util-whitespace/lib/index.js
var ov = /[ \t\n\f\r]/g;
function sv(e) {
	return typeof e == "object" ? e.type === "text" && cv(e.value) : cv(e);
}
function cv(e) {
	return e.replace(ov, "") === "";
}
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/property-information/lib/util/schema.js
var lv = class {
	constructor(e, t, n) {
		this.normal = t, this.property = e, n && (this.space = n);
	}
};
lv.prototype.normal = {}, lv.prototype.property = {}, lv.prototype.space = void 0;
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/property-information/lib/util/merge.js
function uv(e, t) {
	let n = {}, r = {};
	for (let t of e) Object.assign(n, t.property), Object.assign(r, t.normal);
	return new lv(n, r, t);
}
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/property-information/lib/normalize.js
function dv(e) {
	return e.toLowerCase();
}
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/property-information/lib/util/info.js
var fv = class {
	constructor(e, t) {
		this.attribute = t, this.property = e;
	}
};
fv.prototype.attribute = "", fv.prototype.booleanish = !1, fv.prototype.boolean = !1, fv.prototype.commaOrSpaceSeparated = !1, fv.prototype.commaSeparated = !1, fv.prototype.defined = !1, fv.prototype.mustUseProperty = !1, fv.prototype.number = !1, fv.prototype.overloadedBoolean = !1, fv.prototype.property = "", fv.prototype.spaceSeparated = !1, fv.prototype.space = void 0;
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/property-information/lib/util/types.js
var pv = /* @__PURE__ */ t({
	boolean: () => q,
	booleanish: () => hv,
	commaOrSpaceSeparated: () => vv,
	commaSeparated: () => _v,
	number: () => J,
	overloadedBoolean: () => gv,
	spaceSeparated: () => Y
}), mv = 0, q = yv(), hv = yv(), gv = yv(), J = yv(), Y = yv(), _v = yv(), vv = yv();
function yv() {
	return 2 ** ++mv;
}
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/property-information/lib/util/defined-info.js
var bv = Object.keys(pv), xv = class extends fv {
	constructor(e, t, n, r) {
		let i = -1;
		if (super(e, t), Sv(this, "space", r), typeof n == "number") for (; ++i < bv.length;) {
			let e = bv[i];
			Sv(this, bv[i], (n & pv[e]) === pv[e]);
		}
	}
};
xv.prototype.defined = !0;
function Sv(e, t, n) {
	n && (e[t] = n);
}
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/property-information/lib/util/create.js
function Cv(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e.properties)) {
		let a = new xv(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[dv(r)] = r, n[dv(a.attribute)] = r;
	}
	return new lv(t, n, e.space);
}
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/property-information/lib/aria.js
var wv = Cv({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: hv,
		ariaAutoComplete: null,
		ariaBusy: hv,
		ariaChecked: hv,
		ariaColCount: J,
		ariaColIndex: J,
		ariaColSpan: J,
		ariaControls: Y,
		ariaCurrent: null,
		ariaDescribedBy: Y,
		ariaDetails: null,
		ariaDisabled: hv,
		ariaDropEffect: Y,
		ariaErrorMessage: null,
		ariaExpanded: hv,
		ariaFlowTo: Y,
		ariaGrabbed: hv,
		ariaHasPopup: null,
		ariaHidden: hv,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: Y,
		ariaLevel: J,
		ariaLive: null,
		ariaModal: hv,
		ariaMultiLine: hv,
		ariaMultiSelectable: hv,
		ariaOrientation: null,
		ariaOwns: Y,
		ariaPlaceholder: null,
		ariaPosInSet: J,
		ariaPressed: hv,
		ariaReadOnly: hv,
		ariaRelevant: null,
		ariaRequired: hv,
		ariaRoleDescription: Y,
		ariaRowCount: J,
		ariaRowIndex: J,
		ariaRowSpan: J,
		ariaSelected: hv,
		ariaSetSize: J,
		ariaSort: null,
		ariaValueMax: J,
		ariaValueMin: J,
		ariaValueNow: J,
		ariaValueText: null,
		role: null
	},
	transform(e, t) {
		return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
	}
});
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/property-information/lib/util/case-sensitive-transform.js
function Tv(e, t) {
	return t in e ? e[t] : t;
}
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/property-information/lib/util/case-insensitive-transform.js
function Ev(e, t) {
	return Tv(e, t.toLowerCase());
}
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/property-information/lib/html.js
var Dv = Cv({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: _v,
		acceptCharset: Y,
		accessKey: Y,
		action: null,
		allow: null,
		allowFullScreen: q,
		allowPaymentRequest: q,
		allowUserMedia: q,
		alpha: q,
		alt: null,
		as: null,
		async: q,
		autoCapitalize: null,
		autoComplete: Y,
		autoFocus: q,
		autoPlay: q,
		blocking: Y,
		capture: null,
		charSet: null,
		checked: q,
		cite: null,
		className: Y,
		closedBy: null,
		colorSpace: null,
		cols: J,
		colSpan: J,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: hv,
		controls: q,
		controlsList: Y,
		coords: J | _v,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: q,
		defer: q,
		dir: null,
		dirName: null,
		disabled: q,
		download: gv,
		draggable: hv,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: q,
		formTarget: null,
		headers: Y,
		height: J,
		hidden: gv,
		high: J,
		href: null,
		hrefLang: null,
		htmlFor: Y,
		httpEquiv: Y,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: q,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: q,
		itemId: null,
		itemProp: Y,
		itemRef: Y,
		itemScope: q,
		itemType: Y,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: q,
		low: J,
		manifest: null,
		max: null,
		maxLength: J,
		media: null,
		method: null,
		min: null,
		minLength: J,
		multiple: q,
		muted: q,
		name: null,
		nonce: null,
		noModule: q,
		noValidate: q,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: q,
		optimum: J,
		pattern: null,
		ping: Y,
		placeholder: null,
		playsInline: q,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: q,
		referrerPolicy: null,
		rel: Y,
		required: q,
		reversed: q,
		rows: J,
		rowSpan: J,
		sandbox: Y,
		scope: null,
		scoped: q,
		seamless: q,
		selected: q,
		shadowRootClonable: q,
		shadowRootCustomElementRegistry: q,
		shadowRootDelegatesFocus: q,
		shadowRootMode: null,
		shadowRootSerializable: q,
		shape: null,
		size: J,
		sizes: null,
		slot: null,
		span: J,
		spellCheck: hv,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: J,
		step: null,
		style: null,
		tabIndex: J,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: q,
		useMap: null,
		value: hv,
		width: J,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: Y,
		axis: null,
		background: null,
		bgColor: null,
		border: J,
		borderColor: null,
		bottomMargin: J,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: q,
		declare: q,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: J,
		leftMargin: J,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: J,
		marginWidth: J,
		noResize: q,
		noHref: q,
		noShade: q,
		noWrap: q,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: J,
		rules: null,
		scheme: null,
		scrolling: hv,
		standby: null,
		summary: null,
		text: null,
		topMargin: J,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: J,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: q,
		disablePictureInPicture: q,
		disableRemotePlayback: q,
		exportParts: _v,
		part: Y,
		prefix: null,
		property: null,
		results: J,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: Ev
}), Ov = Cv({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		maskType: "mask-type",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: vv,
		accentHeight: J,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: J,
		amplitude: J,
		arabicForm: null,
		ascent: J,
		attributeName: null,
		attributeType: null,
		azimuth: J,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: J,
		by: null,
		calcMode: null,
		capHeight: J,
		className: Y,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: J,
		diffuseConstant: J,
		direction: null,
		display: null,
		dur: null,
		divisor: J,
		dominantBaseline: null,
		download: q,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: J,
		enableBackground: null,
		end: null,
		event: null,
		exponent: J,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: J,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: _v,
		g2: _v,
		glyphName: _v,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: J,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: J,
		horizOriginX: J,
		horizOriginY: J,
		id: null,
		ideographic: J,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: J,
		k: J,
		k1: J,
		k2: J,
		k3: J,
		k4: J,
		kernelMatrix: vv,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: J,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskType: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: J,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: J,
		overlineThickness: J,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: J,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: Y,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: J,
		pointsAtY: J,
		pointsAtZ: J,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: vv,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: vv,
		rev: vv,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: vv,
		requiredFeatures: vv,
		requiredFonts: vv,
		requiredFormats: vv,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: J,
		specularExponent: J,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: J,
		strikethroughThickness: J,
		string: null,
		stroke: null,
		strokeDashArray: vv,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: J,
		strokeOpacity: J,
		strokeWidth: null,
		style: null,
		surfaceScale: J,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: vv,
		tabIndex: J,
		tableValues: null,
		target: null,
		targetX: J,
		targetY: J,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: vv,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: J,
		underlineThickness: J,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: J,
		values: null,
		vAlphabetic: J,
		vMathematical: J,
		vectorEffect: null,
		vHanging: J,
		vIdeographic: J,
		version: null,
		vertAdvY: J,
		vertOriginX: J,
		vertOriginY: J,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: J,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: Tv
}), kv = Cv({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(e, t) {
		return "xlink:" + t.slice(5).toLowerCase();
	}
}), Av = Cv({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: Ev
}), jv = Cv({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(e, t) {
		return "xml:" + t.slice(3).toLowerCase();
	}
}), Mv = {
	classId: "classID",
	dataType: "datatype",
	itemId: "itemID",
	strokeDashArray: "strokeDasharray",
	strokeDashOffset: "strokeDashoffset",
	strokeLineCap: "strokeLinecap",
	strokeLineJoin: "strokeLinejoin",
	strokeMiterLimit: "strokeMiterlimit",
	typeOf: "typeof",
	xLinkActuate: "xlinkActuate",
	xLinkArcRole: "xlinkArcrole",
	xLinkHref: "xlinkHref",
	xLinkRole: "xlinkRole",
	xLinkShow: "xlinkShow",
	xLinkTitle: "xlinkTitle",
	xLinkType: "xlinkType",
	xmlnsXLink: "xmlnsXlink"
}, Nv = /[A-Z]/g, Pv = /-[a-z]/g, Fv = /^data[-\w.:]+$/i;
function Iv(e, t) {
	let n = dv(t), r = t, i = fv;
	if (n in e.normal) return e.property[e.normal[n]];
	if (n.length > 4 && n.slice(0, 4) === "data" && Fv.test(t)) {
		if (t.charAt(4) === "-") {
			let e = t.slice(5).replace(Pv, Rv);
			r = "data" + e.charAt(0).toUpperCase() + e.slice(1);
		} else {
			let e = t.slice(4);
			if (!Pv.test(e)) {
				let n = e.replace(Nv, Lv);
				n.charAt(0) !== "-" && (n = "-" + n), t = "data" + n;
			}
		}
		i = xv;
	}
	return new i(r, t);
}
function Lv(e) {
	return "-" + e.toLowerCase();
}
function Rv(e) {
	return e.charAt(1).toUpperCase();
}
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/node_modules/property-information/index.js
var zv = uv([
	wv,
	Dv,
	kv,
	Av,
	jv
], "html"), Bv = uv([
	wv,
	Ov,
	kv,
	Av,
	jv
], "svg"), Vv = /* @__PURE__ */ n(((e, t) => {
	var n = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, r = /\n/g, i = /^\s*/, a = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, o = /^:\s*/, s = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, c = /^[;\s]*/, l = /^\s+|\s+$/g;
	function u(e, t) {
		if (typeof e != "string") throw TypeError("First argument must be a string");
		if (!e) return [];
		t = t || {};
		var l = 1, u = 1;
		function f(e) {
			var t = e.match(r);
			t && (l += t.length);
			var n = e.lastIndexOf("\n");
			u = ~n ? e.length - n : u + e.length;
		}
		function p() {
			var e = {
				line: l,
				column: u
			};
			return function(t) {
				return t.position = new m(e), _(), t;
			};
		}
		function m(e) {
			this.start = e, this.end = {
				line: l,
				column: u
			}, this.source = t.source;
		}
		m.prototype.content = e;
		function h(n) {
			var r = /* @__PURE__ */ Error(t.source + ":" + l + ":" + u + ": " + n);
			if (r.reason = n, r.filename = t.source, r.line = l, r.column = u, r.source = e, !t.silent) throw r;
		}
		function g(t) {
			var n = t.exec(e);
			if (n) {
				var r = n[0];
				return f(r), e = e.slice(r.length), n;
			}
		}
		function _() {
			g(i);
		}
		function v(e) {
			var t;
			for (e = e || []; t = y();) t !== !1 && e.push(t);
			return e;
		}
		function y() {
			var t = p();
			if (e.charAt(0) == "/" && e.charAt(1) == "*") {
				for (var n = 2; e.charAt(n) != "" && (e.charAt(n) != "*" || e.charAt(n + 1) != "/");) ++n;
				if (n += 2, e.charAt(n - 1) === "") return h("End of comment missing");
				var r = e.slice(2, n - 2);
				return u += 2, f(r), e = e.slice(n), u += 2, t({
					type: "comment",
					comment: r
				});
			}
		}
		function ee() {
			var e = p(), t = g(a);
			if (t) {
				if (y(), !g(o)) return h("property missing ':'");
				var r = g(s), i = e({
					type: "declaration",
					property: d(t[0].replace(n, "")),
					value: r ? d(r[0].replace(n, "")) : ""
				});
				return g(c), i;
			}
		}
		function b() {
			var e = [];
			v(e);
			for (var t; t = ee();) t !== !1 && (e.push(t), v(e));
			return e;
		}
		return _(), b();
	}
	function d(e) {
		return e ? e.replace(l, "") : "";
	}
	t.exports = u;
})), Hv = /* @__PURE__ */ n(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = r;
	var n = t(Vv());
	function r(e, t) {
		let r = null;
		if (!e || typeof e != "string") return r;
		let i = (0, n.default)(e), a = typeof t == "function";
		return i.forEach((e) => {
			if (e.type !== "declaration") return;
			let { property: n, value: i } = e;
			a ? t(n, i, e) : i && (r = r || {}, r[n] = i);
		}), r;
	}
})), Uv = /* @__PURE__ */ n(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.camelCase = void 0;
	var t = /^--[a-zA-Z0-9_-]+$/, n = /-([a-z])/g, r = /^[^-]+$/, i = /^-(webkit|moz|ms|o|khtml)-/, a = /^-(ms)-/, o = function(e) {
		return !e || r.test(e) || t.test(e);
	}, s = function(e, t) {
		return t.toUpperCase();
	}, c = function(e, t) {
		return `${t}-`;
	};
	e.camelCase = function(e, t) {
		return t === void 0 && (t = {}), o(e) ? e : (e = e.toLowerCase(), e = t.reactCompat ? e.replace(a, c) : e.replace(i, c), e.replace(n, s));
	};
})), Wv = /* @__PURE__ */ n(((e, t) => {
	var n = (e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	})(Hv()), r = Uv();
	function i(e, t) {
		var i = {};
		return !e || typeof e != "string" || (0, n.default)(e, function(e, n) {
			e && n && (i[(0, r.camelCase)(e, t)] = n);
		}), i;
	}
	i.default = i, t.exports = i;
}));
//#endregion
//#region node_modules/unist-util-stringify-position/lib/index.js
function Gv(e) {
	return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? qv(e.position) : "start" in e || "end" in e ? qv(e) : "line" in e || "column" in e ? Kv(e) : "";
}
function Kv(e) {
	return Jv(e && e.line) + ":" + Jv(e && e.column);
}
function qv(e) {
	return Kv(e && e.start) + "-" + Kv(e && e.end);
}
function Jv(e) {
	return e && typeof e == "number" ? e : 1;
}
//#endregion
//#region node_modules/vfile-message/lib/index.js
var Yv = class extends Error {
	constructor(e, t, n) {
		super(), typeof t == "string" && (n = t, t = void 0);
		let r = "", i = {}, a = !1;
		if (t && (i = "line" in t && "column" in t || "start" in t && "end" in t ? { place: t } : "type" in t ? {
			ancestors: [t],
			place: t.position
		} : { ...t }), typeof e == "string" ? r = e : !i.cause && e && (a = !0, r = e.message, i.cause = e), !i.ruleId && !i.source && typeof n == "string") {
			let e = n.indexOf(":");
			e === -1 ? i.ruleId = n : (i.source = n.slice(0, e), i.ruleId = n.slice(e + 1));
		}
		if (!i.place && i.ancestors && i.ancestors) {
			let e = i.ancestors[i.ancestors.length - 1];
			e && (i.place = e.position);
		}
		let o = i.place && "start" in i.place ? i.place.start : i.place;
		this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = r, this.line = o ? o.line : void 0, this.name = Gv(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = a && i.cause && typeof i.cause.stack == "string" ? i.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
	}
};
Yv.prototype.file = "", Yv.prototype.name = "", Yv.prototype.reason = "", Yv.prototype.message = "", Yv.prototype.stack = "", Yv.prototype.column = void 0, Yv.prototype.line = void 0, Yv.prototype.ancestors = void 0, Yv.prototype.cause = void 0, Yv.prototype.fatal = void 0, Yv.prototype.place = void 0, Yv.prototype.ruleId = void 0, Yv.prototype.source = void 0;
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/lib/index.js
var Xv = /* @__PURE__ */ e(Wv(), 1), Zv = {}.hasOwnProperty, Qv = /* @__PURE__ */ new Map(), $v = /[A-Z]/g, ey = /* @__PURE__ */ new Set([
	"table",
	"tbody",
	"thead",
	"tfoot",
	"tr"
]), ty = /* @__PURE__ */ new Set(["td", "th"]), ny = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function ry(e, t) {
	if (!t || t.Fragment === void 0) throw TypeError("Expected `Fragment` in options");
	let n = t.filePath || void 0, r;
	if (t.development) {
		if (typeof t.jsxDEV != "function") throw TypeError("Expected `jsxDEV` in options when `development: true`");
		r = my(n, t.jsxDEV);
	} else {
		if (typeof t.jsx != "function") throw TypeError("Expected `jsx` in production options");
		if (typeof t.jsxs != "function") throw TypeError("Expected `jsxs` in production options");
		r = py(n, t.jsx, t.jsxs);
	}
	let i = {
		Fragment: t.Fragment,
		ancestors: [],
		components: t.components || {},
		create: r,
		elementAttributeNameCase: t.elementAttributeNameCase || "react",
		evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
		filePath: n,
		ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
		passKeys: t.passKeys !== !1,
		passNode: t.passNode || !1,
		schema: t.space === "svg" ? Bv : zv,
		stylePropertyNameCase: t.stylePropertyNameCase || "dom",
		tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
	}, a = iy(i, e, void 0);
	return a && typeof a != "string" ? a : i.create(e, i.Fragment, { children: a || void 0 }, void 0);
}
function iy(e, t, n) {
	if (t.type === "element") return ay(e, t, n);
	if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression") return oy(e, t);
	if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement") return cy(e, t, n);
	if (t.type === "mdxjsEsm") return sy(e, t);
	if (t.type === "root") return ly(e, t, n);
	if (t.type === "text") return uy(e, t);
}
function ay(e, t, n) {
	let r = e.schema, i = r;
	t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Bv, e.schema = i), e.ancestors.push(t);
	let a = by(e, t.tagName, !1), o = hy(e, t), s = _y(e, t);
	return ey.has(t.tagName) && (s = s.filter(function(e) {
		return typeof e != "string" || !sv(e);
	})), dy(e, o, a, t), fy(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function oy(e, t) {
	if (t.data && t.data.estree && e.evaluater) {
		let n = t.data.estree.body[0];
		return n.type, e.evaluater.evaluateExpression(n.expression);
	}
	xy(e, t.position);
}
function sy(e, t) {
	if (t.data && t.data.estree && e.evaluater) return e.evaluater.evaluateProgram(t.data.estree);
	xy(e, t.position);
}
function cy(e, t, n) {
	let r = e.schema, i = r;
	t.name === "svg" && r.space === "html" && (i = Bv, e.schema = i), e.ancestors.push(t);
	let a = t.name === null ? e.Fragment : by(e, t.name, !0), o = gy(e, t), s = _y(e, t);
	return dy(e, o, a, t), fy(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function ly(e, t, n) {
	let r = {};
	return fy(r, _y(e, t)), e.create(t, e.Fragment, r, n);
}
function uy(e, t) {
	return t.value;
}
function dy(e, t, n, r) {
	typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function fy(e, t) {
	if (t.length > 0) {
		let n = t.length > 1 ? t : t[0];
		n && (e.children = n);
	}
}
function py(e, t, n) {
	return r;
	function r(e, r, i, a) {
		let o = Array.isArray(i.children) ? n : t;
		return a ? o(r, i, a) : o(r, i);
	}
}
function my(e, t) {
	return n;
	function n(n, r, i, a) {
		let o = Array.isArray(i.children), s = Al(n);
		return t(r, i, a, o, {
			columnNumber: s ? s.column - 1 : void 0,
			fileName: e,
			lineNumber: s ? s.line : void 0
		}, void 0);
	}
}
function hy(e, t) {
	let n = {}, r, i;
	for (i in t.properties) if (i !== "children" && Zv.call(t.properties, i)) {
		let a = vy(e, i, t.properties[i]);
		if (a) {
			let [i, o] = a;
			e.tableCellAlignToStyle && i === "align" && typeof o == "string" && ty.has(t.tagName) ? r = o : n[i] = o;
		}
	}
	if (r) {
		let t = n.style || (n.style = {});
		t[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
	}
	return n;
}
function gy(e, t) {
	let n = {};
	for (let r of t.attributes) if (r.type === "mdxJsxExpressionAttribute") {
		if (r.data && r.data.estree && e.evaluater) {
			let t = r.data.estree.body[0];
			t.type;
			let i = t.expression;
			i.type;
			let a = i.properties[0];
			a.type, Object.assign(n, e.evaluater.evaluateExpression(a.argument));
		} else xy(e, t.position);
	} else {
		let i = r.name, a;
		if (r.value && typeof r.value == "object") {
			if (r.value.data && r.value.data.estree && e.evaluater) {
				let t = r.value.data.estree.body[0];
				t.type, a = e.evaluater.evaluateExpression(t.expression);
			} else xy(e, t.position);
		} else a = r.value === null || r.value;
		n[i] = a;
	}
	return n;
}
function _y(e, t) {
	let n = [], r = -1, i = e.passKeys ? /* @__PURE__ */ new Map() : Qv;
	for (; ++r < t.children.length;) {
		let a = t.children[r], o;
		if (e.passKeys) {
			let e = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
			if (e) {
				let t = i.get(e) || 0;
				o = e + "-" + t, i.set(e, t + 1);
			}
		}
		let s = iy(e, a, o);
		s !== void 0 && n.push(s);
	}
	return n;
}
function vy(e, t, n) {
	let r = Iv(e.schema, t);
	if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
		if (Array.isArray(n) && (n = r.commaSeparated ? wn(n) : On(n)), r.property === "style") {
			let t = typeof n == "object" ? n : yy(e, String(n));
			return e.stylePropertyNameCase === "css" && (t = Sy(t)), ["style", t];
		}
		return [e.elementAttributeNameCase === "react" && r.space ? Mv[r.property] || r.property : r.attribute, n];
	}
}
function yy(e, t) {
	try {
		return (0, Xv.default)(t, { reactCompat: !0 });
	} catch (t) {
		if (e.ignoreInvalidStyle) return {};
		let n = t, r = new Yv("Cannot parse `style` attribute", {
			ancestors: e.ancestors,
			cause: n,
			ruleId: "style",
			source: "hast-util-to-jsx-runtime"
		});
		throw r.file = e.filePath || void 0, r.url = ny + "#cannot-parse-style-attribute", r;
	}
}
function by(e, t, n) {
	let r;
	if (!n) r = {
		type: "Literal",
		value: t
	};
	else if (t.includes(".")) {
		let e = t.split("."), n = -1, i;
		for (; ++n < e.length;) {
			let t = av(e[n]) ? {
				type: "Identifier",
				name: e[n]
			} : {
				type: "Literal",
				value: e[n]
			};
			i = i ? {
				type: "MemberExpression",
				object: i,
				property: t,
				computed: !!(n && t.type === "Literal"),
				optional: !1
			} : t;
		}
		r = i;
	} else r = av(t) && !/^[a-z]/.test(t) ? {
		type: "Identifier",
		name: t
	} : {
		type: "Literal",
		value: t
	};
	if (r.type === "Literal") {
		let t = r.value;
		return Zv.call(e.components, t) ? e.components[t] : t;
	}
	if (e.evaluater) return e.evaluater.evaluateExpression(r);
	xy(e);
}
function xy(e, t) {
	let n = new Yv("Cannot handle MDX estrees without `createEvaluater`", {
		ancestors: e.ancestors,
		place: t,
		ruleId: "mdx-estree",
		source: "hast-util-to-jsx-runtime"
	});
	throw n.file = e.filePath || void 0, n.url = ny + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Sy(e) {
	let t = {}, n;
	for (n in e) Zv.call(e, n) && (t[Cy(n)] = e[n]);
	return t;
}
function Cy(e) {
	let t = e.replace($v, wy);
	return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function wy(e) {
	return "-" + e.toLowerCase();
}
//#endregion
//#region node_modules/micromark/lib/initialize/content.js
var Ty = { tokenize: Ey };
function Ey(e) {
	let t = e.attempt(this.parser.constructs.contentInitial, r, i), n;
	return t;
	function r(n) {
		if (n === null) {
			e.consume(n);
			return;
		}
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), K(e, t, "linePrefix");
	}
	function i(t) {
		return e.enter("paragraph"), a(t);
	}
	function a(t) {
		let r = e.enter("chunkText", {
			contentType: "text",
			previous: n
		});
		return n && (n.next = r), n = r, o(t);
	}
	function o(t) {
		if (t === null) {
			e.exit("chunkText"), e.exit("paragraph"), e.consume(t);
			return;
		}
		return U(t) ? (e.consume(t), e.exit("chunkText"), a) : (e.consume(t), o);
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/document.js
var Dy = { tokenize: ky }, Oy = { tokenize: Ay };
function ky(e) {
	let t = this, n = [], r = 0, i, a, o;
	return s;
	function s(i) {
		if (r < n.length) {
			let a = n[r];
			return t.containerState = a[1], e.attempt(a[0].continuation, c, l)(i);
		}
		return l(i);
	}
	function c(e) {
		if (r++, t.containerState._closeFlow) {
			t.containerState._closeFlow = void 0, i && v();
			let n = t.events.length, a = n, o;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				o = t.events[a][1].end;
				break;
			}
			_(r);
			let s = n;
			for (; s < t.events.length;) t.events[s][1].end = { ...o }, s++;
			return wd(t.events, a + 1, 0, t.events.slice(n)), t.events.length = s, l(e);
		}
		return s(e);
	}
	function l(a) {
		if (r === n.length) {
			if (!i) return f(a);
			if (i.currentConstruct && i.currentConstruct.concrete) return m(a);
			t.interrupt = !(!i.currentConstruct || i._gfmTableDynamicInterruptHack);
		}
		return t.containerState = {}, e.check(Oy, u, d)(a);
	}
	function u(e) {
		return i && v(), _(r), f(e);
	}
	function d(e) {
		return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, m(e);
	}
	function f(n) {
		return t.containerState = {}, e.attempt(Oy, p, m)(n);
	}
	function p(e) {
		return r++, n.push([t.currentConstruct, t.containerState]), f(e);
	}
	function m(n) {
		if (n === null) {
			i && v(), _(0), e.consume(n);
			return;
		}
		return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
			_tokenizer: i,
			contentType: "flow",
			previous: a
		}), h(n);
	}
	function h(n) {
		if (n === null) {
			g(e.exit("chunkFlow"), !0), _(0), e.consume(n);
			return;
		}
		return U(n) ? (e.consume(n), g(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, s) : (e.consume(n), h);
	}
	function g(e, n) {
		let s = t.sliceStream(e);
		if (n && s.push(null), e.previous = a, a && (a.next = e), a = e, i.defineSkip(e.start), i.write(s), t.parser.lazy[e.start.line]) {
			let e = i.events.length;
			for (; e--;) if (i.events[e][1].start.offset < o && (!i.events[e][1].end || i.events[e][1].end.offset > o)) return;
			let n = t.events.length, a = n, s, c;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				if (s) {
					c = t.events[a][1].end;
					break;
				}
				s = !0;
			}
			for (_(r), e = n; e < t.events.length;) t.events[e][1].end = { ...c }, e++;
			wd(t.events, a + 1, 0, t.events.slice(n)), t.events.length = e;
		}
	}
	function _(r) {
		let i = n.length;
		for (; i-- > r;) {
			let r = n[i];
			t.containerState = r[1], r[0].exit.call(t, e);
		}
		n.length = r;
	}
	function v() {
		i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
	}
}
function Ay(e, t, n) {
	return K(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
//#endregion
//#region node_modules/micromark/lib/initialize/flow.js
var jy = { tokenize: My };
function My(e) {
	let t = this, n = e.attempt(Fm, r, e.attempt(this.parser.constructs.flowInitial, i, K(e, e.attempt(this.parser.constructs.flow, i, e.attempt(sh, i)), "linePrefix")));
	return n;
	function r(r) {
		if (r === null) {
			e.consume(r);
			return;
		}
		return e.enter("lineEndingBlank"), e.consume(r), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
	}
	function i(r) {
		if (r === null) {
			e.consume(r);
			return;
		}
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), t.currentConstruct = void 0, n;
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/text.js
var Ny = { resolveAll: Ly() }, Py = Iy("string"), Fy = Iy("text");
function Iy(e) {
	return {
		resolveAll: Ly(e === "text" ? Ry : void 0),
		tokenize: t
	};
	function t(t) {
		let n = this, r = this.parser.constructs[e], i = t.attempt(r, a, o);
		return a;
		function a(e) {
			return c(e) ? i(e) : o(e);
		}
		function o(e) {
			if (e === null) {
				t.consume(e);
				return;
			}
			return t.enter("data"), t.consume(e), s;
		}
		function s(e) {
			return c(e) ? (t.exit("data"), i(e)) : (t.consume(e), s);
		}
		function c(e) {
			if (e === null) return !0;
			let t = r[e], i = -1;
			if (t) for (; ++i < t.length;) {
				let e = t[i];
				if (!e.previous || e.previous.call(n, n.previous)) return !0;
			}
			return !1;
		}
	}
}
function Ly(e) {
	return t;
	function t(t, n) {
		let r = -1, i;
		for (; ++r <= t.length;) i === void 0 ? t[r] && t[r][1].type === "data" && (i = r, r++) : (!t[r] || t[r][1].type !== "data") && (r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), r = i + 2), i = void 0);
		return e ? e(t, n) : t;
	}
}
function Ry(e, t) {
	let n = 0;
	for (; ++n <= e.length;) if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
		let r = e[n - 1][1], i = t.sliceStream(r), a = i.length, o = -1, s = 0, c;
		for (; a--;) {
			let e = i[a];
			if (typeof e == "string") {
				for (o = e.length; e.charCodeAt(o - 1) === 32;) s++, o--;
				if (o) break;
				o = -1;
			} else if (e === -2) c = !0, s++;
			else if (e !== -1) {
				a++;
				break;
			}
		}
		if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
			let i = {
				type: n === e.length || c || s < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					_bufferIndex: a ? o : r.start._bufferIndex + o,
					_index: r.start._index + a,
					line: r.end.line,
					column: r.end.column - s,
					offset: r.end.offset - s
				},
				end: { ...r.end }
			};
			r.end = { ...i.start }, r.start.offset === r.end.offset ? Object.assign(r, i) : (e.splice(n, 0, [
				"enter",
				i,
				t
			], [
				"exit",
				i,
				t
			]), n += 2);
		}
		n++;
	}
	return e;
}
//#endregion
//#region node_modules/micromark/lib/constructs.js
var zy = /* @__PURE__ */ t({
	attentionMarkers: () => qy,
	contentInitial: () => Vy,
	disable: () => Jy,
	document: () => By,
	flow: () => Uy,
	flowInitial: () => Hy,
	insideSpan: () => Ky,
	string: () => Wy,
	text: () => Gy
}), By = {
	42: eg,
	43: eg,
	45: eg,
	48: eg,
	49: eg,
	50: eg,
	51: eg,
	52: eg,
	53: eg,
	54: eg,
	55: eg,
	56: eg,
	57: eg,
	62: Lm
}, Vy = { 91: gh }, Hy = {
	[-2]: Ym,
	[-1]: Ym,
	32: Ym
}, Uy = {
	35: Sh,
	42: Qh,
	45: [cg, Qh],
	60: Dh,
	61: cg,
	95: Qh,
	96: Km,
	126: Km
}, Wy = {
	38: Um,
	92: Vm
}, Gy = {
	[-5]: Xh,
	[-4]: Xh,
	[-3]: Xh,
	33: Kh,
	38: Um,
	42: km,
	60: [Nm, Ph],
	91: Jh,
	92: [bh, Vm],
	93: Ih,
	95: km,
	96: $m
}, Ky = { null: [km, Ny] }, qy = { null: [42, 95] }, Jy = { null: [] };
//#endregion
//#region node_modules/micromark/lib/create-tokenizer.js
function Yy(e, t, n) {
	let r = {
		_bufferIndex: -1,
		_index: 0,
		line: n && n.line || 1,
		column: n && n.column || 1,
		offset: n && n.offset || 0
	}, i = {}, a = [], o = [], s = [], c = {
		attempt: ne(b),
		check: ne(te),
		consume: v,
		enter: y,
		exit: ee,
		interrupt: ne(te, { interrupt: !0 })
	}, l = {
		code: null,
		containerState: {},
		defineSkip: h,
		events: [],
		now: m,
		parser: e,
		previous: null,
		sliceSerialize: f,
		sliceStream: p,
		write: d
	}, u = t.tokenize.call(l, c);
	return t.resolveAll && a.push(t), l;
	function d(e) {
		return o = Td(o, e), g(), o[o.length - 1] === null ? (x(t, 0), l.events = Ed(a, l.events, l), l.events) : [];
	}
	function f(e, t) {
		return Zy(p(e), t);
	}
	function p(e) {
		return Xy(o, e);
	}
	function m() {
		let { _bufferIndex: e, _index: t, line: n, column: i, offset: a } = r;
		return {
			_bufferIndex: e,
			_index: t,
			line: n,
			column: i,
			offset: a
		};
	}
	function h(e) {
		i[e.line] = e.column, re();
	}
	function g() {
		let e;
		for (; r._index < o.length;) {
			let t = o[r._index];
			if (typeof t == "string") for (e = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === e && r._bufferIndex < t.length;) _(t.charCodeAt(r._bufferIndex));
			else _(t);
		}
	}
	function _(e) {
		u = u(e);
	}
	function v(e) {
		U(e) ? (r.line++, r.column = 1, r.offset += e === -3 ? 2 : 1, re()) : e !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = e;
	}
	function y(e, t) {
		let n = t || {};
		return n.type = e, n.start = m(), l.events.push([
			"enter",
			n,
			l
		]), s.push(n), n;
	}
	function ee(e) {
		let t = s.pop();
		return t.end = m(), l.events.push([
			"exit",
			t,
			l
		]), t;
	}
	function b(e, t) {
		x(e, t.from);
	}
	function te(e, t) {
		t.restore();
	}
	function ne(e, t) {
		return n;
		function n(n, r, i) {
			let a, o, s, u;
			return Array.isArray(n) ? f(n) : "tokenize" in n ? f([n]) : d(n);
			function d(e) {
				return t;
				function t(t) {
					let n = t !== null && e[t], r = t !== null && e.null;
					return f([...Array.isArray(n) ? n : n ? [n] : [], ...Array.isArray(r) ? r : r ? [r] : []])(t);
				}
			}
			function f(e) {
				return a = e, o = 0, e.length === 0 ? i : p(e[o]);
			}
			function p(e) {
				return n;
				function n(n) {
					return u = S(), s = e, e.partial || (l.currentConstruct = e), e.name && l.parser.constructs.disable.null.includes(e.name) ? h(n) : e.tokenize.call(t ? Object.assign(Object.create(l), t) : l, c, m, h)(n);
				}
			}
			function m(t) {
				return e(s, u), r;
			}
			function h(e) {
				return u.restore(), ++o < a.length ? p(a[o]) : i;
			}
		}
	}
	function x(e, t) {
		e.resolveAll && !a.includes(e) && a.push(e), e.resolve && wd(l.events, t, l.events.length - t, e.resolve(l.events.slice(t), l)), e.resolveTo && (l.events = e.resolveTo(l.events, l));
	}
	function S() {
		let e = m(), t = l.previous, n = l.currentConstruct, i = l.events.length, a = Array.from(s);
		return {
			from: i,
			restore: o
		};
		function o() {
			r = e, l.previous = t, l.currentConstruct = n, l.events.length = i, s = a, re();
		}
	}
	function re() {
		r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
	}
}
function Xy(e, t) {
	let n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex, o;
	if (n === i) o = [e[n].slice(r, a)];
	else {
		if (o = e.slice(n, i), r > -1) {
			let e = o[0];
			typeof e == "string" ? o[0] = e.slice(r) : o.shift();
		}
		a > 0 && o.push(e[i].slice(0, a));
	}
	return o;
}
function Zy(e, t) {
	let n = -1, r = [], i;
	for (; ++n < e.length;) {
		let a = e[n], o;
		if (typeof a == "string") o = a;
		else switch (a) {
			case -5:
				o = "\r";
				break;
			case -4:
				o = "\n";
				break;
			case -3:
				o = "\r\n";
				break;
			case -2:
				o = t ? " " : "	";
				break;
			case -1:
				if (!t && i) continue;
				o = " ";
				break;
			default: o = String.fromCharCode(a);
		}
		i = a === -2, r.push(o);
	}
	return r.join("");
}
//#endregion
//#region node_modules/micromark/lib/parse.js
function Qy(e) {
	let t = {
		constructs: tm([zy, ...(e || {}).extensions || []]),
		content: n(Ty),
		defined: [],
		document: n(Dy),
		flow: n(jy),
		lazy: {},
		string: n(Py),
		text: n(Fy)
	};
	return t;
	function n(e) {
		return n;
		function n(n) {
			return Yy(t, e, n);
		}
	}
}
//#endregion
//#region node_modules/micromark/lib/postprocess.js
function $y(e) {
	for (; !ah(e););
	return e;
}
//#endregion
//#region node_modules/micromark/lib/preprocess.js
var eb = /[\0\t\n\r]/g;
function tb() {
	let e = 1, t = "", n = !0, r;
	return i;
	function i(i, a, o) {
		let s = [], c, l, u, d, f;
		for (i = t + (typeof i == "string" ? i.toString() : new TextDecoder(a || void 0).decode(i)), u = 0, t = "", n && (i.charCodeAt(0) === 65279 && u++, n = void 0); u < i.length;) {
			if (eb.lastIndex = u, c = eb.exec(i), d = c && c.index !== void 0 ? c.index : i.length, f = i.charCodeAt(d), !c) {
				t = i.slice(u);
				break;
			}
			if (f === 10 && u === d && r) s.push(-3), r = void 0;
			else switch (r && (s.push(-5), r = void 0), u < d && (s.push(i.slice(u, d)), e += d - u), f) {
				case 0:
					s.push(65533), e++;
					break;
				case 9:
					for (l = Math.ceil(e / 4) * 4, s.push(-2); e++ < l;) s.push(-1);
					break;
				case 10:
					s.push(-4), e = 1;
					break;
				default: r = !0, e = 1;
			}
			u = d + 1;
		}
		return o && (r && s.push(-5), t && s.push(t), s.push(null)), s;
	}
}
//#endregion
//#region node_modules/mdast-util-from-markdown/lib/index.js
var nb = {}.hasOwnProperty;
function rb(e, t, n) {
	return t && typeof t == "object" && (n = t, t = void 0), ib(n)($y(Qy(n).document().write(tb()(e, t, !0))));
}
function ib(e) {
	let t = {
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: a(ke),
			autolinkProtocol: S,
			autolinkEmail: S,
			atxHeading: a(T),
			blockQuote: a(xe),
			characterEscape: S,
			characterReference: S,
			codeFenced: a(Se),
			codeFencedFenceInfo: o,
			codeFencedFenceMeta: o,
			codeIndented: a(Se, o),
			codeText: a(Ce, o),
			codeTextData: S,
			data: S,
			codeFlowValue: S,
			definition: a(we),
			definitionDestinationString: o,
			definitionLabelString: o,
			definitionTitleString: o,
			emphasis: a(Te),
			hardBreakEscape: a(Ee),
			hardBreakTrailing: a(Ee),
			htmlFlow: a(De, o),
			htmlFlowData: S,
			htmlText: a(De, o),
			htmlTextData: S,
			image: a(Oe),
			label: o,
			link: a(ke),
			listItem: a(je),
			listItemValue: f,
			listOrdered: a(Ae, d),
			listUnordered: a(Ae),
			paragraph: a(Me),
			reference: me,
			referenceString: o,
			resourceDestinationString: o,
			resourceTitleString: o,
			setextHeading: a(T),
			strong: a(Ne),
			thematicBreak: a(Fe)
		},
		exit: {
			atxHeading: c(),
			atxHeadingSequence: b,
			autolink: c(),
			autolinkEmail: be,
			autolinkProtocol: ye,
			blockQuote: c(),
			characterEscapeValue: re,
			characterReferenceMarkerHexadecimal: ge,
			characterReferenceMarkerNumeric: ge,
			characterReferenceValue: _e,
			characterReference: ve,
			codeFenced: c(g),
			codeFencedFence: h,
			codeFencedFenceInfo: p,
			codeFencedFenceMeta: m,
			codeFlowValue: re,
			codeIndented: c(_),
			codeText: c(se),
			codeTextData: re,
			data: re,
			definition: c(),
			definitionDestinationString: ee,
			definitionLabelString: v,
			definitionTitleString: y,
			emphasis: c(),
			hardBreakEscape: c(C),
			hardBreakTrailing: c(C),
			htmlFlow: c(ae),
			htmlFlowData: re,
			htmlText: c(oe),
			htmlTextData: re,
			image: c(le),
			label: de,
			labelText: ue,
			lineEnding: ie,
			link: c(ce),
			listItem: c(),
			listOrdered: c(),
			listUnordered: c(),
			paragraph: c(),
			referenceString: he,
			resourceDestinationString: w,
			resourceTitleString: fe,
			resource: pe,
			setextHeading: c(x),
			setextHeadingLineSequence: ne,
			setextHeadingText: te,
			strong: c(),
			thematicBreak: c()
		}
	};
	ob(t, (e || {}).mdastExtensions || []);
	let n = {};
	return r;
	function r(e) {
		let r = {
			type: "root",
			children: []
		}, a = {
			stack: [r],
			tokenStack: [],
			config: t,
			enter: s,
			exit: l,
			buffer: o,
			resume: u,
			data: n
		}, c = [], d = -1;
		for (; ++d < e.length;) (e[d][1].type === "listOrdered" || e[d][1].type === "listUnordered") && (e[d][0] === "enter" ? c.push(d) : d = i(e, c.pop(), d));
		for (d = -1; ++d < e.length;) {
			let n = t[e[d][0]];
			nb.call(n, e[d][1].type) && n[e[d][1].type].call(Object.assign({ sliceSerialize: e[d][2].sliceSerialize }, a), e[d][1]);
		}
		if (a.tokenStack.length > 0) {
			let e = a.tokenStack[a.tokenStack.length - 1];
			(e[1] || cb).call(a, void 0, e[0]);
		}
		for (r.position = {
			start: ab(e.length > 0 ? e[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: ab(e.length > 0 ? e[e.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		}, d = -1; ++d < t.transforms.length;) r = t.transforms[d](r) || r;
		return r;
	}
	function i(e, t, n) {
		let r = t - 1, i = -1, a = !1, o, s, c, l;
		for (; ++r <= n;) {
			let t = e[r];
			switch (t[1].type) {
				case "listUnordered":
				case "listOrdered":
				case "blockQuote":
					t[0] === "enter" ? i++ : i--, l = void 0;
					break;
				case "lineEndingBlank":
					t[0] === "enter" && (o && !l && !i && !c && (c = r), l = void 0);
					break;
				case "linePrefix":
				case "listItemValue":
				case "listItemMarker":
				case "listItemPrefix":
				case "listItemPrefixWhitespace": break;
				default: l = void 0;
			}
			if (!i && t[0] === "enter" && t[1].type === "listItemPrefix" || i === -1 && t[0] === "exit" && (t[1].type === "listUnordered" || t[1].type === "listOrdered")) {
				if (o) {
					let i = r;
					for (s = void 0; i--;) {
						let t = e[i];
						if (t[1].type === "lineEnding" || t[1].type === "lineEndingBlank") {
							if (t[0] === "exit") continue;
							s && (e[s][1].type = "lineEndingBlank", a = !0), t[1].type = "lineEnding", s = i;
						} else if (t[1].type !== "linePrefix" && t[1].type !== "blockQuotePrefix" && t[1].type !== "blockQuotePrefixWhitespace" && t[1].type !== "blockQuoteMarker" && t[1].type !== "listItemIndent") break;
					}
					c && (!s || c < s) && (o._spread = !0), o.end = Object.assign({}, s ? e[s][1].start : t[1].end), e.splice(s || r, 0, [
						"exit",
						o,
						t[2]
					]), r++, n++;
				}
				if (t[1].type === "listItemPrefix") {
					let i = {
						type: "listItem",
						_spread: !1,
						start: Object.assign({}, t[1].start),
						end: void 0
					};
					o = i, e.splice(r, 0, [
						"enter",
						i,
						t[2]
					]), r++, n++, c = void 0, l = !0;
				}
			}
		}
		return e[t][1]._spread = a, n;
	}
	function a(e, t) {
		return n;
		function n(n) {
			s.call(this, e(n), n), t && t.call(this, n);
		}
	}
	function o() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	function s(e, t, n) {
		this.stack[this.stack.length - 1].children.push(e), this.stack.push(e), this.tokenStack.push([t, n || void 0]), e.position = {
			start: ab(t.start),
			end: void 0
		};
	}
	function c(e) {
		return t;
		function t(t) {
			e && e.call(this, t), l.call(this, t);
		}
	}
	function l(e, t) {
		let n = this.stack.pop(), r = this.tokenStack.pop();
		if (r) r[0].type !== e.type && (t ? t.call(this, e, r[0]) : (r[1] || cb).call(this, e, r[0]));
		else throw Error("Cannot close `" + e.type + "` (" + Gv({
			start: e.start,
			end: e.end
		}) + "): it’s not open");
		n.position.end = ab(e.end);
	}
	function u() {
		return Xf(this.stack.pop());
	}
	function d() {
		this.data.expectingFirstListItemValue = !0;
	}
	function f(e) {
		if (this.data.expectingFirstListItemValue) {
			let t = this.stack[this.stack.length - 2];
			t.start = Number.parseInt(this.sliceSerialize(e), 10), this.data.expectingFirstListItemValue = void 0;
		}
	}
	function p() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.lang = e;
	}
	function m() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.meta = e;
	}
	function h() {
		this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
	}
	function g() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
	}
	function _() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/(\r?\n|\r)$/g, "");
	}
	function v(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = rf(this.sliceSerialize(e)).toLowerCase();
	}
	function y() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function ee() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function b(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth || (t.depth = this.sliceSerialize(e).length);
	}
	function te() {
		this.data.setextHeadingSlurpLineEnding = !0;
	}
	function ne(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth = this.sliceSerialize(e).codePointAt(0) === 61 ? 1 : 2;
	}
	function x() {
		this.data.setextHeadingSlurpLineEnding = void 0;
	}
	function S(e) {
		let t = this.stack[this.stack.length - 1].children, n = t[t.length - 1];
		(!n || n.type !== "text") && (n = Pe(), n.position = {
			start: ab(e.start),
			end: void 0
		}, t.push(n)), this.stack.push(n);
	}
	function re(e) {
		let t = this.stack.pop();
		t.value += this.sliceSerialize(e), t.position.end = ab(e.end);
	}
	function ie(e) {
		let n = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			let t = n.children[n.children.length - 1];
			t.position.end = ab(e.end), this.data.atHardBreak = void 0;
			return;
		}
		!this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(n.type) && (S.call(this, e), re.call(this, e));
	}
	function C() {
		this.data.atHardBreak = !0;
	}
	function ae() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function oe() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function se() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function ce() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function le() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function ue(e) {
		let t = this.sliceSerialize(e), n = this.stack[this.stack.length - 2];
		n.label = Ip(t), n.identifier = rf(t).toLowerCase();
	}
	function de() {
		let e = this.stack[this.stack.length - 1], t = this.resume(), n = this.stack[this.stack.length - 1];
		this.data.inReference = !0, n.type === "link" ? n.children = e.children : n.alt = t;
	}
	function w() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function fe() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function pe() {
		this.data.inReference = void 0;
	}
	function me() {
		this.data.referenceType = "collapsed";
	}
	function he(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = rf(this.sliceSerialize(e)).toLowerCase(), this.data.referenceType = "full";
	}
	function ge(e) {
		this.data.characterReferenceType = e.type;
	}
	function _e(e) {
		let t = this.sliceSerialize(e), n = this.data.characterReferenceType, r;
		n ? (r = Pp(t, n === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : r = Np(t);
		let i = this.stack[this.stack.length - 1];
		i.value += r;
	}
	function ve(e) {
		let t = this.stack.pop();
		t.position.end = ab(e.end);
	}
	function ye(e) {
		re.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = this.sliceSerialize(e);
	}
	function be(e) {
		re.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = "mailto:" + this.sliceSerialize(e);
	}
	function xe() {
		return {
			type: "blockquote",
			children: []
		};
	}
	function Se() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: ""
		};
	}
	function Ce() {
		return {
			type: "inlineCode",
			value: ""
		};
	}
	function we() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: ""
		};
	}
	function Te() {
		return {
			type: "emphasis",
			children: []
		};
	}
	function T() {
		return {
			type: "heading",
			depth: 0,
			children: []
		};
	}
	function Ee() {
		return { type: "break" };
	}
	function De() {
		return {
			type: "html",
			value: ""
		};
	}
	function Oe() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null
		};
	}
	function ke() {
		return {
			type: "link",
			title: null,
			url: "",
			children: []
		};
	}
	function Ae(e) {
		return {
			type: "list",
			ordered: e.type === "listOrdered",
			start: null,
			spread: e._spread,
			children: []
		};
	}
	function je(e) {
		return {
			type: "listItem",
			spread: e._spread,
			checked: null,
			children: []
		};
	}
	function Me() {
		return {
			type: "paragraph",
			children: []
		};
	}
	function Ne() {
		return {
			type: "strong",
			children: []
		};
	}
	function Pe() {
		return {
			type: "text",
			value: ""
		};
	}
	function Fe() {
		return { type: "thematicBreak" };
	}
}
function ab(e) {
	return {
		line: e.line,
		column: e.column,
		offset: e.offset
	};
}
function ob(e, t) {
	let n = -1;
	for (; ++n < t.length;) {
		let r = t[n];
		Array.isArray(r) ? ob(e, r) : sb(e, r);
	}
}
function sb(e, t) {
	let n;
	for (n in t) if (nb.call(t, n)) switch (n) {
		case "canContainEols": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "transforms": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "enter":
		case "exit": {
			let r = t[n];
			r && Object.assign(e[n], r);
			break;
		}
	}
}
function cb(e, t) {
	throw Error(e ? "Cannot close `" + e.type + "` (" + Gv({
		start: e.start,
		end: e.end
	}) + "): a different token (`" + t.type + "`, " + Gv({
		start: t.start,
		end: t.end
	}) + ") is open" : "Cannot close document, a token (`" + t.type + "`, " + Gv({
		start: t.start,
		end: t.end
	}) + ") is still open");
}
//#endregion
//#region node_modules/streamdown/node_modules/remark-parse/lib/index.js
function lb(e) {
	let t = this;
	t.parser = n;
	function n(n) {
		return rb(n, {
			...t.data("settings"),
			...e,
			extensions: t.data("micromarkExtensions") || [],
			mdastExtensions: t.data("fromMarkdownExtensions") || []
		});
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
function ub(e, t) {
	let n = {
		type: "element",
		tagName: "blockquote",
		properties: {},
		children: e.wrap(e.all(t), !0)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/break.js
function db(e, t) {
	let n = {
		type: "element",
		tagName: "br",
		properties: {},
		children: []
	};
	return e.patch(t, n), [e.applyData(t, n), {
		type: "text",
		value: "\n"
	}];
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/code.js
function fb(e, t) {
	let n = t.value ? t.value + "\n" : "", r = {}, i = t.lang ? t.lang.split(/\s+/) : [];
	i.length > 0 && (r.className = ["language-" + i[0]]);
	let a = {
		type: "element",
		tagName: "code",
		properties: r,
		children: [{
			type: "text",
			value: n
		}]
	};
	return t.meta && (a.data = { meta: t.meta }), e.patch(t, a), a = e.applyData(t, a), a = {
		type: "element",
		tagName: "pre",
		properties: {},
		children: [a]
	}, e.patch(t, a), a;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/delete.js
function pb(e, t) {
	let n = {
		type: "element",
		tagName: "del",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
function mb(e, t) {
	let n = {
		type: "element",
		tagName: "em",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
function hb(e, t) {
	let n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Om(r.toLowerCase()), a = e.footnoteOrder.indexOf(r), o, s = e.footnoteCounts.get(r);
	s === void 0 ? (s = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = a + 1, s += 1, e.footnoteCounts.set(r, s);
	let c = {
		type: "element",
		tagName: "a",
		properties: {
			href: "#" + n + "fn-" + i,
			id: n + "fnref-" + i + (s > 1 ? "-" + s : ""),
			dataFootnoteRef: !0,
			ariaDescribedBy: ["footnote-label"]
		},
		children: [{
			type: "text",
			value: String(o)
		}]
	};
	e.patch(t, c);
	let l = {
		type: "element",
		tagName: "sup",
		properties: {},
		children: [c]
	};
	return e.patch(t, l), e.applyData(t, l);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/heading.js
function gb(e, t) {
	let n = {
		type: "element",
		tagName: "h" + t.depth,
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/html.js
function _b(e, t) {
	if (e.options.allowDangerousHtml) {
		let n = {
			type: "raw",
			value: t.value
		};
		return e.patch(t, n), e.applyData(t, n);
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/revert.js
function vb(e, t) {
	let n = t.referenceType, r = "]";
	if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference") return [{
		type: "text",
		value: "![" + t.alt + r
	}];
	let i = e.all(t), a = i[0];
	a && a.type === "text" ? a.value = "[" + a.value : i.unshift({
		type: "text",
		value: "["
	});
	let o = i[i.length - 1];
	return o && o.type === "text" ? o.value += r : i.push({
		type: "text",
		value: r
	}), i;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
function yb(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return vb(e, t);
	let i = {
		src: Om(r.url || ""),
		alt: t.alt
	};
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "img",
		properties: i,
		children: []
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/image.js
function bb(e, t) {
	let n = { src: Om(t.url) };
	t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "img",
		properties: n,
		children: []
	};
	return e.patch(t, r), e.applyData(t, r);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
function xb(e, t) {
	let n = {
		type: "text",
		value: t.value.replace(/\r?\n|\r/g, " ")
	};
	e.patch(t, n);
	let r = {
		type: "element",
		tagName: "code",
		properties: {},
		children: [n]
	};
	return e.patch(t, r), e.applyData(t, r);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
function Sb(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return vb(e, t);
	let i = { href: Om(r.url || "") };
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "a",
		properties: i,
		children: e.all(t)
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/link.js
function Cb(e, t) {
	let n = { href: Om(t.url) };
	t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "a",
		properties: n,
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/list-item.js
function wb(e, t, n) {
	let r = e.all(t), i = n ? Tb(n) : Eb(t), a = {}, o = [];
	if (typeof t.checked == "boolean") {
		let e = r[0], n;
		e && e.type === "element" && e.tagName === "p" ? n = e : (n = {
			type: "element",
			tagName: "p",
			properties: {},
			children: []
		}, r.unshift(n)), n.children.length > 0 && n.children.unshift({
			type: "text",
			value: " "
		}), n.children.unshift({
			type: "element",
			tagName: "input",
			properties: {
				type: "checkbox",
				checked: t.checked,
				disabled: !0
			},
			children: []
		}), a.className = ["task-list-item"];
	}
	let s = -1;
	for (; ++s < r.length;) {
		let e = r[s];
		(i || s !== 0 || e.type !== "element" || e.tagName !== "p") && o.push({
			type: "text",
			value: "\n"
		}), e.type === "element" && e.tagName === "p" && !i ? o.push(...e.children) : o.push(e);
	}
	let c = r[r.length - 1];
	c && (i || c.type !== "element" || c.tagName !== "p") && o.push({
		type: "text",
		value: "\n"
	});
	let l = {
		type: "element",
		tagName: "li",
		properties: a,
		children: o
	};
	return e.patch(t, l), e.applyData(t, l);
}
function Tb(e) {
	let t = !1;
	if (e.type === "list") {
		t = e.spread || !1;
		let n = e.children, r = -1;
		for (; !t && ++r < n.length;) t = Eb(n[r]);
	}
	return t;
}
function Eb(e) {
	return e.spread ?? e.children.length > 1;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/list.js
function Db(e, t) {
	let n = {}, r = e.all(t), i = -1;
	for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length;) {
		let e = r[i];
		if (e.type === "element" && e.tagName === "li" && e.properties && Array.isArray(e.properties.className) && e.properties.className.includes("task-list-item")) {
			n.className = ["contains-task-list"];
			break;
		}
	}
	let a = {
		type: "element",
		tagName: t.ordered ? "ol" : "ul",
		properties: n,
		children: e.wrap(r, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
function Ob(e, t) {
	let n = {
		type: "element",
		tagName: "p",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/root.js
function kb(e, t) {
	let n = {
		type: "root",
		children: e.wrap(e.all(t))
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/strong.js
function Ab(e, t) {
	let n = {
		type: "element",
		tagName: "strong",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/table.js
function jb(e, t) {
	let n = e.all(t), r = n.shift(), i = [];
	if (r) {
		let n = {
			type: "element",
			tagName: "thead",
			properties: {},
			children: e.wrap([r], !0)
		};
		e.patch(t.children[0], n), i.push(n);
	}
	if (n.length > 0) {
		let r = {
			type: "element",
			tagName: "tbody",
			properties: {},
			children: e.wrap(n, !0)
		}, a = Al(t.children[1]), o = kl(t.children[t.children.length - 1]);
		a && o && (r.position = {
			start: a,
			end: o
		}), i.push(r);
	}
	let a = {
		type: "element",
		tagName: "table",
		properties: {},
		children: e.wrap(i, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/table-row.js
function Mb(e, t, n) {
	let r = n ? n.children : void 0, i = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", a = n && n.type === "table" ? n.align : void 0, o = a ? a.length : t.children.length, s = -1, c = [];
	for (; ++s < o;) {
		let n = t.children[s], r = {}, o = a ? a[s] : void 0;
		o && (r.align = o);
		let l = {
			type: "element",
			tagName: i,
			properties: r,
			children: []
		};
		n && (l.children = e.all(n), e.patch(n, l), l = e.applyData(n, l)), c.push(l);
	}
	let l = {
		type: "element",
		tagName: "tr",
		properties: {},
		children: e.wrap(c, !0)
	};
	return e.patch(t, l), e.applyData(t, l);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
function Nb(e, t) {
	let n = {
		type: "element",
		tagName: "td",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/trim-lines/index.js
var Pb = 9, Fb = 32;
function Ib(e) {
	let t = String(e), n = /\r?\n|\r/g, r = n.exec(t), i = 0, a = [];
	for (; r;) a.push(Lb(t.slice(i, r.index), i > 0, !0), r[0]), i = r.index + r[0].length, r = n.exec(t);
	return a.push(Lb(t.slice(i), i > 0, !1)), a.join("");
}
function Lb(e, t, n) {
	let r = 0, i = e.length;
	if (t) {
		let t = e.codePointAt(r);
		for (; t === Pb || t === Fb;) r++, t = e.codePointAt(r);
	}
	if (n) {
		let t = e.codePointAt(i - 1);
		for (; t === Pb || t === Fb;) i--, t = e.codePointAt(i - 1);
	}
	return i > r ? e.slice(r, i) : "";
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/text.js
function Rb(e, t) {
	let n = {
		type: "text",
		value: Ib(String(t.value))
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
function zb(e, t) {
	let n = {
		type: "element",
		tagName: "hr",
		properties: {},
		children: []
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/index.js
var Bb = {
	blockquote: ub,
	break: db,
	code: fb,
	delete: pb,
	emphasis: mb,
	footnoteReference: hb,
	heading: gb,
	html: _b,
	imageReference: yb,
	image: bb,
	inlineCode: xb,
	linkReference: Sb,
	link: Cb,
	listItem: wb,
	list: Db,
	paragraph: Ob,
	root: kb,
	strong: Ab,
	table: jb,
	tableCell: Nb,
	tableRow: Mb,
	text: Rb,
	thematicBreak: zb,
	toml: Vb,
	yaml: Vb,
	definition: Vb,
	footnoteDefinition: Vb
};
function Vb() {}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/footer.js
function Hb(e, t) {
	let n = [{
		type: "text",
		value: "↩"
	}];
	return t > 1 && n.push({
		type: "element",
		tagName: "sup",
		properties: {},
		children: [{
			type: "text",
			value: String(t)
		}]
	}), n;
}
function Ub(e, t) {
	return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Wb(e) {
	let t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || Hb, r = e.options.footnoteBackLabel || Ub, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || { className: ["sr-only"] }, s = [], c = -1;
	for (; ++c < e.footnoteOrder.length;) {
		let i = e.footnoteById.get(e.footnoteOrder[c]);
		if (!i) continue;
		let a = e.all(i), o = String(i.identifier).toUpperCase(), l = Om(o.toLowerCase()), u = 0, d = [], f = e.footnoteCounts.get(o);
		for (; f !== void 0 && ++u <= f;) {
			d.length > 0 && d.push({
				type: "text",
				value: " "
			});
			let e = typeof n == "string" ? n : n(c, u);
			typeof e == "string" && (e = {
				type: "text",
				value: e
			}), d.push({
				type: "element",
				tagName: "a",
				properties: {
					href: "#" + t + "fnref-" + l + (u > 1 ? "-" + u : ""),
					dataFootnoteBackref: "",
					ariaLabel: typeof r == "string" ? r : r(c, u),
					className: ["data-footnote-backref"]
				},
				children: Array.isArray(e) ? e : [e]
			});
		}
		let p = a[a.length - 1];
		if (p && p.type === "element" && p.tagName === "p") {
			let e = p.children[p.children.length - 1];
			e && e.type === "text" ? e.value += " " : p.children.push({
				type: "text",
				value: " "
			}), p.children.push(...d);
		} else a.push(...d);
		let m = {
			type: "element",
			tagName: "li",
			properties: { id: t + "fn-" + l },
			children: e.wrap(a, !0)
		};
		e.patch(i, m), s.push(m);
	}
	if (s.length !== 0) return {
		type: "element",
		tagName: "section",
		properties: {
			dataFootnotes: !0,
			className: ["footnotes"]
		},
		children: [
			{
				type: "element",
				tagName: a,
				properties: {
					...zr(o),
					id: "footnote-label"
				},
				children: [{
					type: "text",
					value: i
				}]
			},
			{
				type: "text",
				value: "\n"
			},
			{
				type: "element",
				tagName: "ol",
				properties: {},
				children: e.wrap(s, !0)
			},
			{
				type: "text",
				value: "\n"
			}
		]
	};
}
//#endregion
//#region node_modules/mdast-util-to-hast/node_modules/unist-util-visit/lib/index.js
function Gb(e, t, n, r) {
	let i, a, o;
	typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), kt(e, a, s, i);
	function s(e, t) {
		let n = t[t.length - 1], r = n ? n.children.indexOf(e) : void 0;
		return o(e, r, n);
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/state.js
var Kb = {}.hasOwnProperty, qb = {};
function Jb(e, t) {
	let n = t || qb, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = {
		all: s,
		applyData: Xb,
		definitionById: r,
		footnoteById: i,
		footnoteCounts: /* @__PURE__ */ new Map(),
		footnoteOrder: [],
		handlers: {
			...Bb,
			...n.handlers
		},
		one: o,
		options: n,
		patch: Yb,
		wrap: Qb
	};
	return Gb(e, function(e) {
		if (e.type === "definition" || e.type === "footnoteDefinition") {
			let t = e.type === "definition" ? r : i, n = String(e.identifier).toUpperCase();
			t.has(n) || t.set(n, e);
		}
	}), a;
	function o(e, t) {
		let n = e.type, r = a.handlers[n];
		if (Kb.call(a.handlers, n) && r) return r(a, e, t);
		if (a.options.passThrough && a.options.passThrough.includes(n)) {
			if ("children" in e) {
				let { children: t, ...n } = e, r = zr(n);
				return r.children = a.all(e), r;
			}
			return zr(e);
		}
		return (a.options.unknownHandler || Zb)(a, e, t);
	}
	function s(e) {
		let t = [];
		if ("children" in e) {
			let n = e.children, r = -1;
			for (; ++r < n.length;) {
				let i = a.one(n[r], e);
				if (i) {
					if (r && n[r - 1].type === "break" && (!Array.isArray(i) && i.type === "text" && (i.value = $b(i.value)), !Array.isArray(i) && i.type === "element")) {
						let e = i.children[0];
						e && e.type === "text" && (e.value = $b(e.value));
					}
					Array.isArray(i) ? t.push(...i) : t.push(i);
				}
			}
		}
		return t;
	}
}
function Yb(e, t) {
	e.position && (t.position = Ml(e));
}
function Xb(e, t) {
	let n = t;
	if (e && e.data) {
		let t = e.data.hName, r = e.data.hChildren, i = e.data.hProperties;
		typeof t == "string" && (n.type === "element" ? n.tagName = t : n = {
			type: "element",
			tagName: t,
			properties: {},
			children: "children" in n ? n.children : [n]
		}), n.type === "element" && i && Object.assign(n.properties, zr(i)), "children" in n && n.children && r != null && (n.children = r);
	}
	return n;
}
function Zb(e, t) {
	let n = t.data || {}, r = "value" in t && !(Kb.call(n, "hProperties") || Kb.call(n, "hChildren")) ? {
		type: "text",
		value: t.value
	} : {
		type: "element",
		tagName: "div",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
function Qb(e, t) {
	let n = [], r = -1;
	for (t && n.push({
		type: "text",
		value: "\n"
	}); ++r < e.length;) r && n.push({
		type: "text",
		value: "\n"
	}), n.push(e[r]);
	return t && e.length > 0 && n.push({
		type: "text",
		value: "\n"
	}), n;
}
function $b(e) {
	let t = 0, n = e.charCodeAt(t);
	for (; n === 9 || n === 32;) t++, n = e.charCodeAt(t);
	return e.slice(t);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/index.js
function ex(e, t) {
	let n = Jb(e, t), r = n.one(e, void 0), i = Wb(n), a = Array.isArray(r) ? {
		type: "root",
		children: r
	} : r || {
		type: "root",
		children: []
	};
	return i && ("children" in a, a.children.push({
		type: "text",
		value: "\n"
	}, i)), a;
}
//#endregion
//#region node_modules/streamdown/node_modules/remark-rehype/lib/index.js
function tx(e, t) {
	return e && "run" in e ? async function(n, r) {
		let i = ex(n, {
			file: r,
			...t
		});
		await e.run(i, r);
	} : function(n, r) {
		return ex(n, {
			file: r,
			...e || t
		});
	};
}
//#endregion
//#region node_modules/bail/index.js
function nx(e) {
	if (e) throw e;
}
//#endregion
//#region node_modules/is-plain-obj/index.js
var rx = /* @__PURE__ */ e((/* @__PURE__ */ n(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = Object.prototype.toString, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = function(e) {
		return typeof Array.isArray == "function" ? Array.isArray(e) : r.call(e) === "[object Array]";
	}, s = function(e) {
		if (!e || r.call(e) !== "[object Object]") return !1;
		var t = n.call(e, "constructor"), i = e.constructor && e.constructor.prototype && n.call(e.constructor.prototype, "isPrototypeOf");
		if (e.constructor && !t && !i) return !1;
		for (var a in e);
		return a === void 0 || n.call(e, a);
	}, c = function(e, t) {
		i && t.name === "__proto__" ? i(e, t.name, {
			enumerable: !0,
			configurable: !0,
			value: t.newValue,
			writable: !0
		}) : e[t.name] = t.newValue;
	}, l = function(e, t) {
		if (t === "__proto__") {
			if (!n.call(e, t)) return;
			if (a) return a(e, t).value;
		}
		return e[t];
	};
	t.exports = function e() {
		var t, n, r, i, a, u, d = arguments[0], f = 1, p = arguments.length, m = !1;
		for (typeof d == "boolean" && (m = d, d = arguments[1] || {}, f = 2), (d == null || typeof d != "object" && typeof d != "function") && (d = {}); f < p; ++f) if (t = arguments[f], t != null) for (n in t) r = l(d, n), i = l(t, n), d !== i && (m && i && (s(i) || (a = o(i))) ? (a ? (a = !1, u = r && o(r) ? r : []) : u = r && s(r) ? r : {}, c(d, {
			name: n,
			newValue: e(m, u, i)
		})) : i !== void 0 && c(d, {
			name: n,
			newValue: i
		}));
		return d;
	};
})))(), 1);
function ix(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
//#endregion
//#region node_modules/trough/lib/index.js
function ax() {
	let e = [], t = {
		run: n,
		use: r
	};
	return t;
	function n(...t) {
		let n = -1, r = t.pop();
		if (typeof r != "function") throw TypeError("Expected function as last argument, not " + r);
		i(null, ...t);
		function i(a, ...o) {
			let s = e[++n], c = -1;
			if (a) {
				r(a);
				return;
			}
			for (; ++c < t.length;) (o[c] === null || o[c] === void 0) && (o[c] = t[c]);
			t = o, s ? ox(s, i)(...o) : r(null, ...o);
		}
	}
	function r(n) {
		if (typeof n != "function") throw TypeError("Expected `middelware` to be a function, not " + n);
		return e.push(n), t;
	}
}
function ox(e, t) {
	let n;
	return r;
	function r(...t) {
		let r = e.length > t.length, o;
		r && t.push(i);
		try {
			o = e.apply(this, t);
		} catch (e) {
			let t = e;
			if (r && n) throw t;
			return i(t);
		}
		r || (o && o.then && typeof o.then == "function" ? o.then(a, i) : o instanceof Error ? i(o) : a(o));
	}
	function i(e, ...r) {
		n || (n = !0, t(e, ...r));
	}
	function a(e) {
		i(null, e);
	}
}
//#endregion
//#region node_modules/streamdown/node_modules/vfile/lib/minpath.browser.js
var sx = {
	basename: cx,
	dirname: lx,
	extname: ux,
	join: dx,
	sep: "/"
};
function cx(e, t) {
	if (t !== void 0 && typeof t != "string") throw TypeError("\"ext\" argument must be a string");
	mx(e);
	let n = 0, r = -1, i = e.length, a;
	if (t === void 0 || t.length === 0 || t.length > e.length) {
		for (; i--;) if (e.codePointAt(i) === 47) {
			if (a) {
				n = i + 1;
				break;
			}
		} else r < 0 && (a = !0, r = i + 1);
		return r < 0 ? "" : e.slice(n, r);
	}
	if (t === e) return "";
	let o = -1, s = t.length - 1;
	for (; i--;) if (e.codePointAt(i) === 47) {
		if (a) {
			n = i + 1;
			break;
		}
	} else o < 0 && (a = !0, o = i + 1), s > -1 && (e.codePointAt(i) === t.codePointAt(s--) ? s < 0 && (r = i) : (s = -1, r = o));
	return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
}
function lx(e) {
	if (mx(e), e.length === 0) return ".";
	let t = -1, n = e.length, r;
	for (; --n;) if (e.codePointAt(n) === 47) {
		if (r) {
			t = n;
			break;
		}
	} else r || (r = !0);
	return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function ux(e) {
	mx(e);
	let t = e.length, n = -1, r = 0, i = -1, a = 0, o;
	for (; t--;) {
		let s = e.codePointAt(t);
		if (s === 47) {
			if (o) {
				r = t + 1;
				break;
			}
			continue;
		}
		n < 0 && (o = !0, n = t + 1), s === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
	}
	return i < 0 || n < 0 || a === 0 || a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function dx(...e) {
	let t = -1, n;
	for (; ++t < e.length;) mx(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
	return n === void 0 ? "." : fx(n);
}
function fx(e) {
	mx(e);
	let t = e.codePointAt(0) === 47, n = px(e, !t);
	return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function px(e, t) {
	let n = "", r = 0, i = -1, a = 0, o = -1, s, c;
	for (; ++o <= e.length;) {
		if (o < e.length) s = e.codePointAt(o);
		else if (s === 47) break;
		else s = 47;
		if (s === 47) {
			if (i !== o - 1 && a !== 1) {
				if (i !== o - 1 && a === 2) {
					if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
						if (n.length > 2) {
							if (c = n.lastIndexOf("/"), c !== n.length - 1) {
								c < 0 ? (n = "", r = 0) : (n = n.slice(0, c), r = n.length - 1 - n.lastIndexOf("/")), i = o, a = 0;
								continue;
							}
						} else if (n.length > 0) {
							n = "", r = 0, i = o, a = 0;
							continue;
						}
					}
					t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
				} else n.length > 0 ? n += "/" + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
			}
			i = o, a = 0;
		} else s === 46 && a > -1 ? a++ : a = -1;
	}
	return n;
}
function mx(e) {
	if (typeof e != "string") throw TypeError("Path must be a string. Received " + JSON.stringify(e));
}
//#endregion
//#region node_modules/streamdown/node_modules/vfile/lib/minproc.browser.js
var hx = { cwd: gx };
function gx() {
	return "/";
}
//#endregion
//#region node_modules/streamdown/node_modules/vfile/lib/minurl.shared.js
function _x(e) {
	return !!(typeof e == "object" && e && "href" in e && e.href && "protocol" in e && e.protocol && e.auth === void 0);
}
//#endregion
//#region node_modules/streamdown/node_modules/vfile/lib/minurl.browser.js
function vx(e) {
	if (typeof e == "string") e = new URL(e);
	else if (!_x(e)) {
		let t = /* @__PURE__ */ TypeError("The \"path\" argument must be of type string or an instance of URL. Received `" + e + "`");
		throw t.code = "ERR_INVALID_ARG_TYPE", t;
	}
	if (e.protocol !== "file:") {
		let e = /* @__PURE__ */ TypeError("The URL must be of scheme file");
		throw e.code = "ERR_INVALID_URL_SCHEME", e;
	}
	return yx(e);
}
function yx(e) {
	if (e.hostname !== "") {
		let e = /* @__PURE__ */ TypeError("File URL host must be \"localhost\" or empty on darwin");
		throw e.code = "ERR_INVALID_FILE_URL_HOST", e;
	}
	let t = e.pathname, n = -1;
	for (; ++n < t.length;) if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
		let e = t.codePointAt(n + 2);
		if (e === 70 || e === 102) {
			let e = /* @__PURE__ */ TypeError("File URL path must not include encoded / characters");
			throw e.code = "ERR_INVALID_FILE_URL_PATH", e;
		}
	}
	return decodeURIComponent(t);
}
//#endregion
//#region node_modules/streamdown/node_modules/vfile/lib/index.js
var bx = [
	"history",
	"path",
	"basename",
	"stem",
	"extname",
	"dirname"
], xx = class {
	constructor(e) {
		let t;
		t = e ? _x(e) ? { path: e } : typeof e == "string" || Tx(e) ? { value: e } : e : {}, this.cwd = "cwd" in t ? "" : hx.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
		let n = -1;
		for (; ++n < bx.length;) {
			let e = bx[n];
			e in t && t[e] !== void 0 && t[e] !== null && (this[e] = e === "history" ? [...t[e]] : t[e]);
		}
		let r;
		for (r in t) bx.includes(r) || (this[r] = t[r]);
	}
	get basename() {
		return typeof this.path == "string" ? sx.basename(this.path) : void 0;
	}
	set basename(e) {
		Cx(e, "basename"), Sx(e, "basename"), this.path = sx.join(this.dirname || "", e);
	}
	get dirname() {
		return typeof this.path == "string" ? sx.dirname(this.path) : void 0;
	}
	set dirname(e) {
		wx(this.basename, "dirname"), this.path = sx.join(e || "", this.basename);
	}
	get extname() {
		return typeof this.path == "string" ? sx.extname(this.path) : void 0;
	}
	set extname(e) {
		if (Sx(e, "extname"), wx(this.dirname, "extname"), e) {
			if (e.codePointAt(0) !== 46) throw Error("`extname` must start with `.`");
			if (e.includes(".", 1)) throw Error("`extname` cannot contain multiple dots");
		}
		this.path = sx.join(this.dirname, this.stem + (e || ""));
	}
	get path() {
		return this.history[this.history.length - 1];
	}
	set path(e) {
		_x(e) && (e = vx(e)), Cx(e, "path"), this.path !== e && this.history.push(e);
	}
	get stem() {
		return typeof this.path == "string" ? sx.basename(this.path, this.extname) : void 0;
	}
	set stem(e) {
		Cx(e, "stem"), Sx(e, "stem"), this.path = sx.join(this.dirname || "", e + (this.extname || ""));
	}
	fail(e, t, n) {
		let r = this.message(e, t, n);
		throw r.fatal = !0, r;
	}
	info(e, t, n) {
		let r = this.message(e, t, n);
		return r.fatal = void 0, r;
	}
	message(e, t, n) {
		let r = new Yv(e, t, n);
		return this.path && (r.name = this.path + ":" + r.name, r.file = this.path), r.fatal = !1, this.messages.push(r), r;
	}
	toString(e) {
		return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
	}
};
function Sx(e, t) {
	if (e && e.includes(sx.sep)) throw Error("`" + t + "` cannot be a path: did not expect `" + sx.sep + "`");
}
function Cx(e, t) {
	if (!e) throw Error("`" + t + "` cannot be empty");
}
function wx(e, t) {
	if (!e) throw Error("Setting `" + t + "` requires `path` to be set too");
}
function Tx(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
//#endregion
//#region node_modules/streamdown/node_modules/unified/lib/callable-instance.js
var Ex = (function(e) {
	let t = this.constructor.prototype, n = t[e], r = function() {
		return n.apply(r, arguments);
	};
	return Object.setPrototypeOf(r, t), r;
}), Dx = {}.hasOwnProperty, Ox = new class e extends Ex {
	constructor() {
		super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = ax();
	}
	copy() {
		let t = new e(), n = -1;
		for (; ++n < this.attachers.length;) {
			let e = this.attachers[n];
			t.use(...e);
		}
		return t.data((0, rx.default)(!0, {}, this.namespace)), t;
	}
	data(e, t) {
		return typeof e == "string" ? arguments.length === 2 ? (jx("data", this.frozen), this.namespace[e] = t, this) : Dx.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (jx("data", this.frozen), this.namespace = e, this) : this.namespace;
	}
	freeze() {
		if (this.frozen) return this;
		let e = this;
		for (; ++this.freezeIndex < this.attachers.length;) {
			let [t, ...n] = this.attachers[this.freezeIndex];
			if (n[0] === !1) continue;
			n[0] === !0 && (n[0] = void 0);
			let r = t.call(e, ...n);
			typeof r == "function" && this.transformers.use(r);
		}
		return this.frozen = !0, this.freezeIndex = Infinity, this;
	}
	parse(e) {
		this.freeze();
		let t = Px(e), n = this.parser || this.Parser;
		return kx("parse", n), n(String(t), t);
	}
	process(e, t) {
		let n = this;
		return this.freeze(), kx("process", this.parser || this.Parser), Ax("process", this.compiler || this.Compiler), t ? r(void 0, t) : new Promise(r);
		function r(r, i) {
			let a = Px(e), o = n.parse(a);
			n.run(o, a, function(e, t, r) {
				if (e || !t || !r) return s(e);
				let i = t, a = n.stringify(i, r);
				Ix(a) ? r.value = a : r.result = a, s(e, r);
			});
			function s(e, n) {
				e || !n ? i(e) : r ? r(n) : t(void 0, n);
			}
		}
	}
	processSync(e) {
		let t = !1, n;
		return this.freeze(), kx("processSync", this.parser || this.Parser), Ax("processSync", this.compiler || this.Compiler), this.process(e, r), Nx("processSync", "process", t), n;
		function r(e, r) {
			t = !0, nx(e), n = r;
		}
	}
	run(e, t, n) {
		Mx(e), this.freeze();
		let r = this.transformers;
		return !n && typeof t == "function" && (n = t, t = void 0), n ? i(void 0, n) : new Promise(i);
		function i(i, a) {
			let o = Px(t);
			r.run(e, o, s);
			function s(t, r, o) {
				let s = r || e;
				t ? a(t) : i ? i(s) : n(void 0, s, o);
			}
		}
	}
	runSync(e, t) {
		let n = !1, r;
		return this.run(e, t, i), Nx("runSync", "run", n), r;
		function i(e, t) {
			nx(e), r = t, n = !0;
		}
	}
	stringify(e, t) {
		this.freeze();
		let n = Px(t), r = this.compiler || this.Compiler;
		return Ax("stringify", r), Mx(e), r(e, n);
	}
	use(e, ...t) {
		let n = this.attachers, r = this.namespace;
		if (jx("use", this.frozen), e != null) {
			if (typeof e == "function") s(e, t);
			else if (typeof e == "object") Array.isArray(e) ? o(e) : a(e);
			else throw TypeError("Expected usable value, not `" + e + "`");
		}
		return this;
		function i(e) {
			if (typeof e == "function") s(e, []);
			else if (typeof e == "object") {
				if (Array.isArray(e)) {
					let [t, ...n] = e;
					s(t, n);
				} else a(e);
			} else throw TypeError("Expected usable value, not `" + e + "`");
		}
		function a(e) {
			if (!("plugins" in e) && !("settings" in e)) throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
			o(e.plugins), e.settings && (r.settings = (0, rx.default)(!0, r.settings, e.settings));
		}
		function o(e) {
			let t = -1;
			if (e != null) {
				if (Array.isArray(e)) for (; ++t < e.length;) {
					let n = e[t];
					i(n);
				}
				else throw TypeError("Expected a list of plugins, not `" + e + "`");
			}
		}
		function s(e, t) {
			let r = -1, i = -1;
			for (; ++r < n.length;) if (n[r][0] === e) {
				i = r;
				break;
			}
			if (i === -1) n.push([e, ...t]);
			else if (t.length > 0) {
				let [r, ...a] = t, o = n[i][1];
				ix(o) && ix(r) && (r = (0, rx.default)(!0, o, r)), n[i] = [
					e,
					r,
					...a
				];
			}
		}
	}
}().freeze();
function kx(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `parser`");
}
function Ax(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `compiler`");
}
function jx(e, t) {
	if (t) throw Error("Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function Mx(e) {
	if (!ix(e) || typeof e.type != "string") throw TypeError("Expected node, got `" + e + "`");
}
function Nx(e, t, n) {
	if (!n) throw Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function Px(e) {
	return Fx(e) ? e : new xx(e);
}
function Fx(e) {
	return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Ix(e) {
	return typeof e == "string" || Lx(e);
}
function Lx(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
//#endregion
//#region node_modules/streamdown/node_modules/marked/lib/marked.esm.js
var X = gt(), Rx;
function zx() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var Bx = zx();
function Vx(e) {
	Bx = e;
}
var Hx = { exec: () => null };
function Z(e, t = "") {
	let n = typeof e == "string" ? e : e.source, r = {
		replace: (e, t) => {
			let i = typeof t == "string" ? t : t.source;
			return i = i.replace(Wx.caret, "$1"), n = n.replace(e, i), r;
		},
		getRegex: () => new RegExp(n, t)
	};
	return r;
}
var Ux = (() => {
	try {
		return !0;
	} catch {
		return !1;
	}
})(), Wx = {
	codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	listReplaceTabs: /^\t+/,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\] /,
	listReplaceTask: /^\[[ xX]\] +/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: (e) => RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
	nextBulletRegex: (e) => RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
	hrRegex: (e) => RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
	fencesBeginRegex: (e) => RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`),
	headingBeginRegex: (e) => RegExp(`^ {0,${Math.min(3, e - 1)}}#`),
	htmlBeginRegex: (e) => RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i")
}, Gx = /^(?:[ \t]*(?:\n|$))+/, Kx = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, qx = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Jx = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Yx = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Xx = /(?:[*+-]|\d{1,9}[.)])/, Zx = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Qx = Z(Zx).replace(/bull/g, Xx).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), $x = Z(Zx).replace(/bull/g, Xx).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), eS = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, tS = /^[^\n]+/, nS = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, rS = Z(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", nS).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), iS = Z(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Xx).getRegex(), aS = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", oS = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, sS = Z("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", oS).replace("tag", aS).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), cS = Z(eS).replace("hr", Jx).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", aS).getRegex(), lS = {
	blockquote: Z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", cS).getRegex(),
	code: Kx,
	def: rS,
	fences: qx,
	heading: Yx,
	hr: Jx,
	html: sS,
	lheading: Qx,
	list: iS,
	newline: Gx,
	paragraph: cS,
	table: Hx,
	text: tS
}, uS = Z("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Jx).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", aS).getRegex(), dS = {
	...lS,
	lheading: $x,
	table: uS,
	paragraph: Z(eS).replace("hr", Jx).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", uS).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", aS).getRegex()
}, fS = {
	...lS,
	html: Z("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", oS).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: Hx,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: Z(eS).replace("hr", Jx).replace("heading", " *#{1,6} *[^\n]").replace("lheading", Qx).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, pS = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, mS = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, hS = /^( {2,}|\\)\n(?!\s*$)/, gS = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, _S = /[\p{P}\p{S}]/u, vS = /[\s\p{P}\p{S}]/u, yS = /[^\s\p{P}\p{S}]/u, bS = Z(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, vS).getRegex(), xS = /(?!~)[\p{P}\p{S}]/u, SS = /(?!~)[\s\p{P}\p{S}]/u, CS = /(?:[^\s\p{P}\p{S}]|~)/u, wS = Z(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Ux ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), TS = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, ES = Z(TS, "u").replace(/punct/g, _S).getRegex(), DS = Z(TS, "u").replace(/punct/g, xS).getRegex(), OS = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", kS = Z(OS, "gu").replace(/notPunctSpace/g, yS).replace(/punctSpace/g, vS).replace(/punct/g, _S).getRegex(), AS = Z(OS, "gu").replace(/notPunctSpace/g, CS).replace(/punctSpace/g, SS).replace(/punct/g, xS).getRegex(), jS = Z("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, yS).replace(/punctSpace/g, vS).replace(/punct/g, _S).getRegex(), MS = Z(/\\(punct)/, "gu").replace(/punct/g, _S).getRegex(), NS = Z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), PS = Z(oS).replace("(?:-->|$)", "-->").getRegex(), FS = Z("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", PS).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), IS = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, LS = Z(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", IS).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), RS = Z(/^!?\[(label)\]\[(ref)\]/).replace("label", IS).replace("ref", nS).getRegex(), zS = Z(/^!?\[(ref)\](?:\[\])?/).replace("ref", nS).getRegex(), BS = Z("reflink|nolink(?!\\()", "g").replace("reflink", RS).replace("nolink", zS).getRegex(), VS = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, HS = {
	_backpedal: Hx,
	anyPunctuation: MS,
	autolink: NS,
	blockSkip: wS,
	br: hS,
	code: mS,
	del: Hx,
	emStrongLDelim: ES,
	emStrongRDelimAst: kS,
	emStrongRDelimUnd: jS,
	escape: pS,
	link: LS,
	nolink: zS,
	punctuation: bS,
	reflink: RS,
	reflinkSearch: BS,
	tag: FS,
	text: gS,
	url: Hx
}, US = {
	...HS,
	link: Z(/^!?\[(label)\]\((.*?)\)/).replace("label", IS).getRegex(),
	reflink: Z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", IS).getRegex()
}, WS = {
	...HS,
	emStrongRDelimAst: AS,
	emStrongLDelim: DS,
	url: Z(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", VS).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: Z(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", VS).getRegex()
}, GS = {
	...WS,
	br: Z(hS).replace("{2,}", "*").getRegex(),
	text: Z(WS.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, KS = {
	normal: lS,
	gfm: dS,
	pedantic: fS
}, qS = {
	normal: HS,
	gfm: WS,
	breaks: GS,
	pedantic: US
}, JS = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, YS = (e) => JS[e];
function XS(e, t) {
	if (t) {
		if (Wx.escapeTest.test(e)) return e.replace(Wx.escapeReplace, YS);
	} else if (Wx.escapeTestNoEncode.test(e)) return e.replace(Wx.escapeReplaceNoEncode, YS);
	return e;
}
function ZS(e) {
	try {
		e = encodeURI(e).replace(Wx.percentDecode, "%");
	} catch {
		return null;
	}
	return e;
}
function QS(e, t) {
	let n = e.replace(Wx.findPipe, (e, t, n) => {
		let r = !1, i = t;
		for (; --i >= 0 && n[i] === "\\";) r = !r;
		return r ? "|" : " |";
	}).split(Wx.splitPipe), r = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), t) {
		if (n.length > t) n.splice(t);
		else for (; n.length < t;) n.push("");
	}
	for (; r < n.length; r++) n[r] = n[r].trim().replace(Wx.slashPipe, "|");
	return n;
}
function $S(e, t, n) {
	let r = e.length;
	if (r === 0) return "";
	let i = 0;
	for (; i < r;) {
		let a = e.charAt(r - i - 1);
		if (a === t && !n) i++;
		else if (a !== t && n) i++;
		else break;
	}
	return e.slice(0, r - i);
}
function eC(e, t) {
	if (e.indexOf(t[1]) === -1) return -1;
	let n = 0;
	for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
	else if (e[r] === t[0]) n++;
	else if (e[r] === t[1] && (n--, n < 0)) return r;
	return n > 0 ? -2 : -1;
}
function tC(e, t, n, r, i) {
	let a = t.href, o = t.title || null, s = e[1].replace(i.other.outputLinkReplace, "$1");
	r.state.inLink = !0;
	let c = {
		type: e[0].charAt(0) === "!" ? "image" : "link",
		raw: n,
		href: a,
		title: o,
		text: s,
		tokens: r.inlineTokens(s)
	};
	return r.state.inLink = !1, c;
}
function nC(e, t, n) {
	let r = e.match(n.other.indentCodeCompensation);
	if (r === null) return t;
	let i = r[1];
	return t.split("\n").map((e) => {
		let t = e.match(n.other.beginningSpace);
		if (t === null) return e;
		let [r] = t;
		return r.length >= i.length ? e.slice(i.length) : e;
	}).join("\n");
}
var rC = class {
	constructor(e) {
		r(this, "options", void 0), r(this, "rules", void 0), r(this, "lexer", void 0), this.options = e || Bx;
	}
	space(e) {
		let t = this.rules.block.newline.exec(e);
		if (t && t[0].length > 0) return {
			type: "space",
			raw: t[0]
		};
	}
	code(e) {
		let t = this.rules.block.code.exec(e);
		if (t) {
			let e = t[0].replace(this.rules.other.codeRemoveIndent, "");
			return {
				type: "code",
				raw: t[0],
				codeBlockStyle: "indented",
				text: this.options.pedantic ? e : $S(e, "\n")
			};
		}
	}
	fences(e) {
		let t = this.rules.block.fences.exec(e);
		if (t) {
			let e = t[0], n = nC(e, t[3] || "", this.rules);
			return {
				type: "code",
				raw: e,
				lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
				text: n
			};
		}
	}
	heading(e) {
		let t = this.rules.block.heading.exec(e);
		if (t) {
			let e = t[2].trim();
			if (this.rules.other.endingHash.test(e)) {
				let t = $S(e, "#");
				(this.options.pedantic || !t || this.rules.other.endingSpaceChar.test(t)) && (e = t.trim());
			}
			return {
				type: "heading",
				raw: t[0],
				depth: t[1].length,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	hr(e) {
		let t = this.rules.block.hr.exec(e);
		if (t) return {
			type: "hr",
			raw: $S(t[0], "\n")
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let e = $S(t[0], "\n").split("\n"), n = "", r = "", i = [];
			for (; e.length > 0;) {
				let t = !1, a = [], o = 0;
				for (; o < e.length; o++) if (this.rules.other.blockquoteStart.test(e[o])) a.push(e[o]), t = !0;
				else if (!t) a.push(e[o]);
				else break;
				e = e.slice(o);
				let s = a.join("\n"), c = s.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
				n = n ? `${n}
${s}` : s, r = r ? `${r}
${c}` : c;
				let l = this.lexer.state.top;
				if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = l, e.length === 0) break;
				let u = i.at(-1);
				if (u?.type === "code") break;
				if (u?.type === "blockquote") {
					let t = u, a = t.raw + "\n" + e.join("\n"), o = this.blockquote(a);
					i[i.length - 1] = o, n = n.substring(0, n.length - t.raw.length) + o.raw, r = r.substring(0, r.length - t.text.length) + o.text;
					break;
				}
				if (u?.type === "list") {
					let t = u, a = t.raw + "\n" + e.join("\n"), o = this.list(a);
					i[i.length - 1] = o, n = n.substring(0, n.length - u.raw.length) + o.raw, r = r.substring(0, r.length - t.raw.length) + o.raw, e = a.substring(i.at(-1).raw.length).split("\n");
					continue;
				}
			}
			return {
				type: "blockquote",
				raw: n,
				tokens: i,
				text: r
			};
		}
	}
	list(e) {
		let t = this.rules.block.list.exec(e);
		if (t) {
			let n = t[1].trim(), r = n.length > 1, i = {
				type: "list",
				raw: "",
				ordered: r,
				start: r ? +n.slice(0, -1) : "",
				loose: !1,
				items: []
			};
			n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
			let a = this.rules.other.listItemRegex(n), o = !1;
			for (; e;) {
				let n = !1, r = "", s = "";
				if (!(t = a.exec(e)) || this.rules.block.hr.test(e)) break;
				r = t[0], e = e.substring(r.length);
				let c = t[2].split("\n", 1)[0].replace(this.rules.other.listReplaceTabs, (e) => " ".repeat(3 * e.length)), l = e.split("\n", 1)[0], u = !c.trim(), d = 0;
				if (this.options.pedantic ? (d = 2, s = c.trimStart()) : u ? d = t[1].length + 1 : (d = t[2].search(this.rules.other.nonSpaceChar), d = d > 4 ? 1 : d, s = c.slice(d), d += t[1].length), u && this.rules.other.blankLine.test(l) && (r += l + "\n", e = e.substring(l.length + 1), n = !0), !n) {
					let t = this.rules.other.nextBulletRegex(d), n = this.rules.other.hrRegex(d), i = this.rules.other.fencesBeginRegex(d), a = this.rules.other.headingBeginRegex(d), o = this.rules.other.htmlBeginRegex(d);
					for (; e;) {
						let f = e.split("\n", 1)[0], p;
						if (l = f, this.options.pedantic ? (l = l.replace(this.rules.other.listReplaceNesting, "  "), p = l) : p = l.replace(this.rules.other.tabCharGlobal, "    "), i.test(l) || a.test(l) || o.test(l) || t.test(l) || n.test(l)) break;
						if (p.search(this.rules.other.nonSpaceChar) >= d || !l.trim()) s += "\n" + p.slice(d);
						else {
							if (u || c.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || i.test(c) || a.test(c) || n.test(c)) break;
							s += "\n" + l;
						}
						!u && !l.trim() && (u = !0), r += f + "\n", e = e.substring(f.length + 1), c = p.slice(d);
					}
				}
				i.loose || (o ? i.loose = !0 : this.rules.other.doubleBlankLine.test(r) && (o = !0));
				let f = null, p;
				this.options.gfm && (f = this.rules.other.listIsTask.exec(s), f && (p = f[0] !== "[ ] ", s = s.replace(this.rules.other.listReplaceTask, ""))), i.items.push({
					type: "list_item",
					raw: r,
					task: !!f,
					checked: p,
					loose: !1,
					text: s,
					tokens: []
				}), i.raw += r;
			}
			let s = i.items.at(-1);
			if (s) s.raw = s.raw.trimEnd(), s.text = s.text.trimEnd();
			else return;
			i.raw = i.raw.trimEnd();
			for (let e = 0; e < i.items.length; e++) if (this.lexer.state.top = !1, i.items[e].tokens = this.lexer.blockTokens(i.items[e].text, []), !i.loose) {
				let t = i.items[e].tokens.filter((e) => e.type === "space");
				i.loose = t.length > 0 && t.some((e) => this.rules.other.anyLine.test(e.raw));
			}
			if (i.loose) for (let e = 0; e < i.items.length; e++) i.items[e].loose = !0;
			return i;
		}
	}
	html(e) {
		let t = this.rules.block.html.exec(e);
		if (t) return {
			type: "html",
			block: !0,
			raw: t[0],
			pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
			text: t[0]
		};
	}
	def(e) {
		let t = this.rules.block.def.exec(e);
		if (t) {
			let e = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: e,
				raw: t[0],
				href: n,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = QS(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [], a = {
			type: "table",
			raw: t[0],
			header: [],
			align: [],
			rows: []
		};
		if (n.length === r.length) {
			for (let e of r) this.rules.other.tableAlignRight.test(e) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(e) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(e) ? a.align.push("left") : a.align.push(null);
			for (let e = 0; e < n.length; e++) a.header.push({
				text: n[e],
				tokens: this.lexer.inline(n[e]),
				header: !0,
				align: a.align[e]
			});
			for (let e of i) a.rows.push(QS(e, a.header.length).map((e, t) => ({
				text: e,
				tokens: this.lexer.inline(e),
				header: !1,
				align: a.align[t]
			})));
			return a;
		}
	}
	lheading(e) {
		let t = this.rules.block.lheading.exec(e);
		if (t) return {
			type: "heading",
			raw: t[0],
			depth: t[2].charAt(0) === "=" ? 1 : 2,
			text: t[1],
			tokens: this.lexer.inline(t[1])
		};
	}
	paragraph(e) {
		let t = this.rules.block.paragraph.exec(e);
		if (t) {
			let e = t[1].charAt(t[1].length - 1) === "\n" ? t[1].slice(0, -1) : t[1];
			return {
				type: "paragraph",
				raw: t[0],
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	text(e) {
		let t = this.rules.block.text.exec(e);
		if (t) return {
			type: "text",
			raw: t[0],
			text: t[0],
			tokens: this.lexer.inline(t[0])
		};
	}
	escape(e) {
		let t = this.rules.inline.escape.exec(e);
		if (t) return {
			type: "escape",
			raw: t[0],
			text: t[1]
		};
	}
	tag(e) {
		let t = this.rules.inline.tag.exec(e);
		if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
			type: "html",
			raw: t[0],
			inLink: this.lexer.state.inLink,
			inRawBlock: this.lexer.state.inRawBlock,
			block: !1,
			text: t[0]
		};
	}
	link(e) {
		let t = this.rules.inline.link.exec(e);
		if (t) {
			let e = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(e)) {
				if (!this.rules.other.endAngleBracket.test(e)) return;
				let t = $S(e.slice(0, -1), "\\");
				if ((e.length - t.length) % 2 == 0) return;
			} else {
				let e = eC(t[2], "()");
				if (e === -2) return;
				if (e > -1) {
					let n = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + e;
					t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = "";
				}
			}
			let n = t[2], r = "";
			if (this.options.pedantic) {
				let e = this.rules.other.pedanticHrefTitle.exec(n);
				e && (n = e[1], r = e[3]);
			} else r = t[3] ? t[3].slice(1, -1) : "";
			return n = n.trim(), this.rules.other.startAngleBracket.test(n) && (n = this.options.pedantic && !this.rules.other.endAngleBracket.test(e) ? n.slice(1) : n.slice(1, -1)), tC(t, {
				href: n && n.replace(this.rules.inline.anyPunctuation, "$1"),
				title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let e = t[(n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " ").toLowerCase()];
			if (!e) {
				let e = n[0].charAt(0);
				return {
					type: "text",
					raw: e,
					text: e
				};
			}
			return tC(n, e, n[0], this.lexer, this.rules);
		}
	}
	emStrong(e, t, n = "") {
		let r = this.rules.inline.emStrongLDelim.exec(e);
		if (!(!r || r[3] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(r[1] || r[2]) || !n || this.rules.inline.punctuation.exec(n))) {
			let n = [...r[0]].length - 1, i, a, o = n, s = 0, c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
			for (c.lastIndex = 0, t = t.slice(-1 * e.length + n); (r = c.exec(t)) != null;) {
				if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i) continue;
				if (a = [...i].length, r[3] || r[4]) {
					o += a;
					continue;
				}
				if ((r[5] || r[6]) && n % 3 && !((n + a) % 3)) {
					s += a;
					continue;
				}
				if (o -= a, o > 0) continue;
				a = Math.min(a, a + o + s);
				let t = [...r[0]][0].length, c = e.slice(0, n + r.index + t + a);
				if (Math.min(n, a) % 2) {
					let e = c.slice(1, -1);
					return {
						type: "em",
						raw: c,
						text: e,
						tokens: this.lexer.inlineTokens(e)
					};
				}
				let l = c.slice(2, -2);
				return {
					type: "strong",
					raw: c,
					text: l,
					tokens: this.lexer.inlineTokens(l)
				};
			}
		}
	}
	codespan(e) {
		let t = this.rules.inline.code.exec(e);
		if (t) {
			let e = t[2].replace(this.rules.other.newLineCharGlobal, " "), n = this.rules.other.nonSpaceChar.test(e), r = this.rules.other.startingSpaceChar.test(e) && this.rules.other.endingSpaceChar.test(e);
			return n && r && (e = e.substring(1, e.length - 1)), {
				type: "codespan",
				raw: t[0],
				text: e
			};
		}
	}
	br(e) {
		let t = this.rules.inline.br.exec(e);
		if (t) return {
			type: "br",
			raw: t[0]
		};
	}
	del(e) {
		let t = this.rules.inline.del.exec(e);
		if (t) return {
			type: "del",
			raw: t[0],
			text: t[2],
			tokens: this.lexer.inlineTokens(t[2])
		};
	}
	autolink(e) {
		let t = this.rules.inline.autolink.exec(e);
		if (t) {
			let e, n;
			return t[2] === "@" ? (e = t[1], n = "mailto:" + e) : (e = t[1], n = e), {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	url(e) {
		let t;
		if (t = this.rules.inline.url.exec(e)) {
			let e, n;
			if (t[2] === "@") e = t[0], n = "mailto:" + e;
			else {
				let r;
				do
					r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
				while (r !== t[0]);
				e = t[0], n = t[1] === "www." ? "http://" + t[0] : t[0];
			}
			return {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	inlineText(e) {
		let t = this.rules.inline.text.exec(e);
		if (t) {
			let e = this.lexer.state.inRawBlock;
			return {
				type: "text",
				raw: t[0],
				text: t[0],
				escaped: e
			};
		}
	}
}, iC = class e {
	constructor(e) {
		r(this, "tokens", void 0), r(this, "options", void 0), r(this, "state", void 0), r(this, "tokenizer", void 0), r(this, "inlineQueue", void 0), this.tokens = [], this.tokens.links = Object.create(null), this.options = e || Bx, this.options.tokenizer = this.options.tokenizer || new rC(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			top: !0
		};
		let t = {
			other: Wx,
			block: KS.normal,
			inline: qS.normal
		};
		this.options.pedantic ? (t.block = KS.pedantic, t.inline = qS.pedantic) : this.options.gfm && (t.block = KS.gfm, t.inline = this.options.breaks ? qS.breaks : qS.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: KS,
			inline: qS
		};
	}
	static lex(t, n) {
		return new e(n).lex(t);
	}
	static lexInline(t, n) {
		return new e(n).inlineTokens(t);
	}
	lex(e) {
		e = e.replace(Wx.carriageReturn, "\n"), this.blockTokens(e, this.tokens);
		for (let e = 0; e < this.inlineQueue.length; e++) {
			let t = this.inlineQueue[e];
			this.inlineTokens(t.src, t.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = [], n = !1) {
		for (this.options.pedantic && (e = e.replace(Wx.tabCharGlobal, "    ").replace(Wx.spaceLine, "")); e;) {
			let r;
			if (this.options.extensions?.block?.some((n) => (r = n.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), !0) : !1)) continue;
			if (r = this.tokenizer.space(e)) {
				e = e.substring(r.raw.length);
				let n = t.at(-1);
				r.raw.length === 1 && n !== void 0 ? n.raw += "\n" : t.push(r);
				continue;
			}
			if (r = this.tokenizer.code(e)) {
				e = e.substring(r.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + r.raw, n.text += "\n" + r.text, this.inlineQueue.at(-1).src = n.text) : t.push(r);
				continue;
			}
			if (r = this.tokenizer.fences(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.heading(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.hr(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.blockquote(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.list(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.html(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.def(e)) {
				e = e.substring(r.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + r.raw, n.text += "\n" + r.raw, this.inlineQueue.at(-1).src = n.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
					href: r.href,
					title: r.title
				}, t.push(r));
				continue;
			}
			if (r = this.tokenizer.table(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.lheading(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			let i = e;
			if (this.options.extensions?.startBlock) {
				let t = 1 / 0, n = e.slice(1), r;
				this.options.extensions.startBlock.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < 1 / 0 && t >= 0 && (i = e.substring(0, t + 1));
			}
			if (this.state.top && (r = this.tokenizer.paragraph(i))) {
				let a = t.at(-1);
				n && a?.type === "paragraph" ? (a.raw += (a.raw.endsWith("\n") ? "" : "\n") + r.raw, a.text += "\n" + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : t.push(r), n = i.length !== e.length, e = e.substring(r.raw.length);
				continue;
			}
			if (r = this.tokenizer.text(e)) {
				e = e.substring(r.raw.length);
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + r.raw, n.text += "\n" + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = n.text) : t.push(r);
				continue;
			}
			if (e) {
				let t = "Infinite loop on byte: " + e.charCodeAt(0);
				if (this.options.silent) {
					console.error(t);
					break;
				}
				throw Error(t);
			}
		}
		return this.state.top = !0, t;
	}
	inline(e, t = []) {
		return this.inlineQueue.push({
			src: e,
			tokens: t
		}), t;
	}
	inlineTokens(e, t = []) {
		let n = e, r = null;
		if (this.tokens.links) {
			let e = Object.keys(this.tokens.links);
			if (e.length > 0) for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null;) e.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
		}
		for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null;) n = n.slice(0, r.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
		let i;
		for (; (r = this.tokenizer.rules.inline.blockSkip.exec(n)) != null;) i = r[2] ? r[2].length : 0, n = n.slice(0, r.index + i) + "[" + "a".repeat(r[0].length - i - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
		n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
		let a = !1, o = "";
		for (; e;) {
			a || (o = ""), a = !1;
			let r;
			if (this.options.extensions?.inline?.some((n) => (r = n.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), !0) : !1)) continue;
			if (r = this.tokenizer.escape(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.tag(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.link(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.reflink(e, this.tokens.links)) {
				e = e.substring(r.raw.length);
				let n = t.at(-1);
				r.type === "text" && n?.type === "text" ? (n.raw += r.raw, n.text += r.text) : t.push(r);
				continue;
			}
			if (r = this.tokenizer.emStrong(e, n, o)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.codespan(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.br(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.del(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.autolink(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (!this.state.inLink && (r = this.tokenizer.url(e))) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			let i = e;
			if (this.options.extensions?.startInline) {
				let t = 1 / 0, n = e.slice(1), r;
				this.options.extensions.startInline.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < 1 / 0 && t >= 0 && (i = e.substring(0, t + 1));
			}
			if (r = this.tokenizer.inlineText(i)) {
				e = e.substring(r.raw.length), r.raw.slice(-1) !== "_" && (o = r.raw.slice(-1)), a = !0;
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += r.raw, n.text += r.text) : t.push(r);
				continue;
			}
			if (e) {
				let t = "Infinite loop on byte: " + e.charCodeAt(0);
				if (this.options.silent) {
					console.error(t);
					break;
				}
				throw Error(t);
			}
		}
		return t;
	}
}, aC = class {
	constructor(e) {
		r(this, "options", void 0), r(this, "parser", void 0), this.options = e || Bx;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let r = (t || "").match(Wx.notSpaceStart)?.[0], i = e.replace(Wx.endingNewline, "") + "\n";
		return r ? "<pre><code class=\"language-" + XS(r) + "\">" + (n ? i : XS(i, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? i : XS(i, !0)) + "</code></pre>\n";
	}
	blockquote({ tokens: e }) {
		return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
	}
	html({ text: e }) {
		return e;
	}
	def(e) {
		return "";
	}
	heading({ tokens: e, depth: t }) {
		return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
	}
	hr(e) {
		return "<hr>\n";
	}
	list(e) {
		let t = e.ordered, n = e.start, r = "";
		for (let t = 0; t < e.items.length; t++) {
			let n = e.items[t];
			r += this.listitem(n);
		}
		let i = t ? "ol" : "ul", a = t && n !== 1 ? " start=\"" + n + "\"" : "";
		return "<" + i + a + ">\n" + r + "</" + i + ">\n";
	}
	listitem(e) {
		let t = "";
		if (e.task) {
			let n = this.checkbox({ checked: !!e.checked });
			e.loose ? e.tokens[0]?.type === "paragraph" ? (e.tokens[0].text = n + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = n + " " + XS(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
				type: "text",
				raw: n + " ",
				text: n + " ",
				escaped: !0
			}) : t += n + " ";
		}
		return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
	}
	checkbox({ checked: e }) {
		return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\">";
	}
	paragraph({ tokens: e }) {
		return `<p>${this.parser.parseInline(e)}</p>
`;
	}
	table(e) {
		let t = "", n = "";
		for (let t = 0; t < e.header.length; t++) n += this.tablecell(e.header[t]);
		t += this.tablerow({ text: n });
		let r = "";
		for (let t = 0; t < e.rows.length; t++) {
			let i = e.rows[t];
			n = "";
			for (let e = 0; e < i.length; e++) n += this.tablecell(i[e]);
			r += this.tablerow({ text: n });
		}
		return r && (r = `<tbody>${r}</tbody>`), "<table>\n<thead>\n" + t + "</thead>\n" + r + "</table>\n";
	}
	tablerow({ text: e }) {
		return `<tr>
${e}</tr>
`;
	}
	tablecell(e) {
		let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
		return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
	}
	strong({ tokens: e }) {
		return `<strong>${this.parser.parseInline(e)}</strong>`;
	}
	em({ tokens: e }) {
		return `<em>${this.parser.parseInline(e)}</em>`;
	}
	codespan({ text: e }) {
		return `<code>${XS(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, tokens: n }) {
		let r = this.parser.parseInline(n), i = ZS(e);
		if (i === null) return r;
		e = i;
		let a = "<a href=\"" + e + "\"";
		return t && (a += " title=\"" + XS(t) + "\""), a += ">" + r + "</a>", a;
	}
	image({ href: e, title: t, text: n, tokens: r }) {
		r && (n = this.parser.parseInline(r, this.parser.textRenderer));
		let i = ZS(e);
		if (i === null) return XS(n);
		e = i;
		let a = `<img src="${e}" alt="${n}"`;
		return t && (a += ` title="${XS(t)}"`), a += ">", a;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : XS(e.text);
	}
}, oC = class {
	strong({ text: e }) {
		return e;
	}
	em({ text: e }) {
		return e;
	}
	codespan({ text: e }) {
		return e;
	}
	del({ text: e }) {
		return e;
	}
	html({ text: e }) {
		return e;
	}
	text({ text: e }) {
		return e;
	}
	link({ text: e }) {
		return "" + e;
	}
	image({ text: e }) {
		return "" + e;
	}
	br() {
		return "";
	}
}, sC = class e {
	constructor(e) {
		r(this, "options", void 0), r(this, "renderer", void 0), r(this, "textRenderer", void 0), this.options = e || Bx, this.options.renderer = this.options.renderer || new aC(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new oC();
	}
	static parse(t, n) {
		return new e(n).parse(t);
	}
	static parseInline(t, n) {
		return new e(n).parseInline(t);
	}
	parse(e, t = !0) {
		let n = "";
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.options.extensions?.renderers?.[i.type]) {
				let e = i, t = this.options.extensions.renderers[e.type].call({ parser: this }, e);
				if (t !== !1 || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"html",
					"def",
					"paragraph",
					"text"
				].includes(e.type)) {
					n += t || "";
					continue;
				}
			}
			let a = i;
			switch (a.type) {
				case "space":
					n += this.renderer.space(a);
					continue;
				case "hr":
					n += this.renderer.hr(a);
					continue;
				case "heading":
					n += this.renderer.heading(a);
					continue;
				case "code":
					n += this.renderer.code(a);
					continue;
				case "table":
					n += this.renderer.table(a);
					continue;
				case "blockquote":
					n += this.renderer.blockquote(a);
					continue;
				case "list":
					n += this.renderer.list(a);
					continue;
				case "html":
					n += this.renderer.html(a);
					continue;
				case "def":
					n += this.renderer.def(a);
					continue;
				case "paragraph":
					n += this.renderer.paragraph(a);
					continue;
				case "text": {
					let i = a, o = this.renderer.text(i);
					for (; r + 1 < e.length && e[r + 1].type === "text";) i = e[++r], o += "\n" + this.renderer.text(i);
					n += t ? this.renderer.paragraph({
						type: "paragraph",
						raw: o,
						text: o,
						tokens: [{
							type: "text",
							raw: o,
							text: o,
							escaped: !0
						}]
					}) : o;
					continue;
				}
				default: {
					let e = "Token with \"" + a.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return n;
	}
	parseInline(e, t = this.renderer) {
		let n = "";
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.options.extensions?.renderers?.[i.type]) {
				let e = this.options.extensions.renderers[i.type].call({ parser: this }, i);
				if (e !== !1 || ![
					"escape",
					"html",
					"link",
					"image",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(i.type)) {
					n += e || "";
					continue;
				}
			}
			let a = i;
			switch (a.type) {
				case "escape":
					n += t.text(a);
					break;
				case "html":
					n += t.html(a);
					break;
				case "link":
					n += t.link(a);
					break;
				case "image":
					n += t.image(a);
					break;
				case "strong":
					n += t.strong(a);
					break;
				case "em":
					n += t.em(a);
					break;
				case "codespan":
					n += t.codespan(a);
					break;
				case "br":
					n += t.br(a);
					break;
				case "del":
					n += t.del(a);
					break;
				case "text":
					n += t.text(a);
					break;
				default: {
					let e = "Token with \"" + a.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return n;
	}
}, cC = (Rx = class {
	constructor(e) {
		r(this, "options", void 0), r(this, "block", void 0), this.options = e || Bx;
	}
	preprocess(e) {
		return e;
	}
	postprocess(e) {
		return e;
	}
	processAllTokens(e) {
		return e;
	}
	emStrongMask(e) {
		return e;
	}
	provideLexer() {
		return this.block ? iC.lex : iC.lexInline;
	}
	provideParser() {
		return this.block ? sC.parse : sC.parseInline;
	}
}, r(Rx, "passThroughHooks", /* @__PURE__ */ new Set([
	"preprocess",
	"postprocess",
	"processAllTokens",
	"emStrongMask"
])), r(Rx, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set([
	"preprocess",
	"postprocess",
	"processAllTokens"
])), Rx), lC = new class {
	constructor(...e) {
		r(this, "defaults", zx()), r(this, "options", this.setOptions), r(this, "parse", this.parseMarkdown(!0)), r(this, "parseInline", this.parseMarkdown(!1)), r(this, "Parser", sC), r(this, "Renderer", aC), r(this, "TextRenderer", oC), r(this, "Lexer", iC), r(this, "Tokenizer", rC), r(this, "Hooks", cC), this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let r of e) switch (n = n.concat(t.call(this, r)), r.type) {
			case "table": {
				let e = r;
				for (let r of e.header) n = n.concat(this.walkTokens(r.tokens, t));
				for (let r of e.rows) for (let e of r) n = n.concat(this.walkTokens(e.tokens, t));
				break;
			}
			case "list": {
				let e = r;
				n = n.concat(this.walkTokens(e.items, t));
				break;
			}
			default: {
				let e = r;
				this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r) => {
					let i = e[r].flat(1 / 0);
					n = n.concat(this.walkTokens(i, t));
				}) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)));
			}
		}
		return n;
	}
	use(...e) {
		let t = this.defaults.extensions || {
			renderers: {},
			childTokens: {}
		};
		return e.forEach((e) => {
			let n = { ...e };
			if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((e) => {
				if (!e.name) throw Error("extension name required");
				if ("renderer" in e) {
					let n = t.renderers[e.name];
					n ? t.renderers[e.name] = function(...t) {
						let r = e.renderer.apply(this, t);
						return r === !1 && (r = n.apply(this, t)), r;
					} : t.renderers[e.name] = e.renderer;
				}
				if ("tokenizer" in e) {
					if (!e.level || e.level !== "block" && e.level !== "inline") throw Error("extension level must be 'block' or 'inline'");
					let n = t[e.level];
					n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && (e.level === "block" ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : e.level === "inline" && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
				}
				"childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
			}), n.extensions = t), e.renderer) {
				let t = this.defaults.renderer || new aC(this.defaults);
				for (let n in e.renderer) {
					if (!(n in t)) throw Error(`renderer '${n}' does not exist`);
					if (["options", "parser"].includes(n)) continue;
					let r = n, i = e.renderer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n || "";
					};
				}
				n.renderer = t;
			}
			if (e.tokenizer) {
				let t = this.defaults.tokenizer || new rC(this.defaults);
				for (let n in e.tokenizer) {
					if (!(n in t)) throw Error(`tokenizer '${n}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(n)) continue;
					let r = n, i = e.tokenizer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.tokenizer = t;
			}
			if (e.hooks) {
				let t = this.defaults.hooks || new cC();
				for (let n in e.hooks) {
					if (!(n in t)) throw Error(`hook '${n}' does not exist`);
					if (["options", "block"].includes(n)) continue;
					let r = n, i = e.hooks[r], a = t[r];
					t[r] = cC.passThroughHooks.has(n) ? (e) => {
						if (this.defaults.async && cC.passThroughHooksRespectAsync.has(n)) return (async () => {
							let n = await i.call(t, e);
							return a.call(t, n);
						})();
						let r = i.call(t, e);
						return a.call(t, r);
					} : (...e) => {
						if (this.defaults.async) return (async () => {
							let n = await i.apply(t, e);
							return n === !1 && (n = await a.apply(t, e)), n;
						})();
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.hooks = t;
			}
			if (e.walkTokens) {
				let t = this.defaults.walkTokens, r = e.walkTokens;
				n.walkTokens = function(e) {
					let n = [];
					return n.push(r.call(this, e)), t && (n = n.concat(t.call(this, e))), n;
				};
			}
			this.defaults = {
				...this.defaults,
				...n
			};
		}), this;
	}
	setOptions(e) {
		return this.defaults = {
			...this.defaults,
			...e
		}, this;
	}
	lexer(e, t) {
		return iC.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return sC.parse(e, t ?? this.defaults);
	}
	parseMarkdown(e) {
		return (t, n) => {
			let r = { ...n }, i = {
				...this.defaults,
				...r
			}, a = this.onError(!!i.silent, !!i.async);
			if (this.defaults.async === !0 && r.async === !1) return a(/* @__PURE__ */ Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
			if (typeof t > "u" || t === null) return a(/* @__PURE__ */ Error("marked(): input parameter is undefined or null"));
			if (typeof t != "string") return a(/* @__PURE__ */ Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
			if (i.hooks && (i.hooks.options = i, i.hooks.block = e), i.async) return (async () => {
				let n = i.hooks ? await i.hooks.preprocess(t) : t, r = await (i.hooks ? await i.hooks.provideLexer() : e ? iC.lex : iC.lexInline)(n, i), a = i.hooks ? await i.hooks.processAllTokens(r) : r;
				i.walkTokens && await Promise.all(this.walkTokens(a, i.walkTokens));
				let o = await (i.hooks ? await i.hooks.provideParser() : e ? sC.parse : sC.parseInline)(a, i);
				return i.hooks ? await i.hooks.postprocess(o) : o;
			})().catch(a);
			try {
				i.hooks && (t = i.hooks.preprocess(t));
				let n = (i.hooks ? i.hooks.provideLexer() : e ? iC.lex : iC.lexInline)(t, i);
				i.hooks && (n = i.hooks.processAllTokens(n)), i.walkTokens && this.walkTokens(n, i.walkTokens);
				let r = (i.hooks ? i.hooks.provideParser() : e ? sC.parse : sC.parseInline)(n, i);
				return i.hooks && (r = i.hooks.postprocess(r)), r;
			} catch (e) {
				return a(e);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
				let e = "<p>An error occurred:</p><pre>" + XS(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(e) : e;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
}();
function Q(e, t) {
	return lC.parse(e, t);
}
Q.options = Q.setOptions = function(e) {
	return lC.setOptions(e), Q.defaults = lC.defaults, Vx(Q.defaults), Q;
}, Q.getDefaults = zx, Q.defaults = Bx, Q.use = function(...e) {
	return lC.use(...e), Q.defaults = lC.defaults, Vx(Q.defaults), Q;
}, Q.walkTokens = function(e, t) {
	return lC.walkTokens(e, t);
}, Q.parseInline = lC.parseInline, Q.Parser = sC, Q.parser = sC.parse, Q.Renderer = aC, Q.TextRenderer = oC, Q.Lexer = iC, Q.lexer = iC.lex, Q.Tokenizer = rC, Q.Hooks = cC, Q.parse = Q, Q.options, Q.setOptions, Q.use, Q.walkTokens, Q.parseInline, sC.parse, iC.lex;
//#endregion
//#region node_modules/streamdown/dist/chunk-JAPRZBRM.js
var $ = (...e) => mt(vt(e)), uC = (e, t, n) => {
	let r = typeof t == "string" ? new Blob([t], { type: n }) : t, i = URL.createObjectURL(r), a = document.createElement("a");
	a.href = i, a.download = e, document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(i);
}, dC = (0, s.createContext)({ code: "" }), fC = () => (0, s.useContext)(dC), pC = ({ onCopy: e, onError: t, timeout: n = 2e3, children: r, className: i, code: a, ...o }) => {
	let [c, l] = (0, s.useState)(!1), u = (0, s.useRef)(0), { code: d } = fC(), { isAnimating: f } = (0, s.useContext)(Nw), p = a ?? d, m = async () => {
		var r;
		if (typeof window > "u" || !((r = navigator == null ? void 0 : navigator.clipboard) != null && r.writeText)) {
			t?.(/* @__PURE__ */ Error("Clipboard API not available"));
			return;
		}
		try {
			c || (await navigator.clipboard.writeText(p), l(!0), e?.(), u.current = window.setTimeout(() => l(!1), n));
		} catch (e) {
			t?.(e);
		}
	};
	(0, s.useEffect)(() => () => {
		window.clearTimeout(u.current);
	}, []);
	let h = c ? q_ : J_;
	return (0, X.jsx)("button", {
		className: $("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", i),
		"data-streamdown": "code-block-copy-button",
		disabled: f,
		onClick: m,
		title: "Copy Code",
		type: "button",
		...o,
		children: r ?? (0, X.jsx)(h, { size: 14 })
	});
}, mC = {
	"1c": "1c",
	"1c-query": "1cq",
	abap: "abap",
	"actionscript-3": "as",
	ada: "ada",
	adoc: "adoc",
	"angular-html": "html",
	"angular-ts": "ts",
	apache: "conf",
	apex: "cls",
	apl: "apl",
	applescript: "applescript",
	ara: "ara",
	asciidoc: "adoc",
	asm: "asm",
	astro: "astro",
	awk: "awk",
	ballerina: "bal",
	bash: "sh",
	bat: "bat",
	batch: "bat",
	be: "be",
	beancount: "beancount",
	berry: "berry",
	bibtex: "bib",
	bicep: "bicep",
	blade: "blade.php",
	bsl: "bsl",
	c: "c",
	"c#": "cs",
	"c++": "cpp",
	cadence: "cdc",
	cairo: "cairo",
	cdc: "cdc",
	clarity: "clar",
	clj: "clj",
	clojure: "clj",
	"closure-templates": "soy",
	cmake: "cmake",
	cmd: "cmd",
	cobol: "cob",
	codeowners: "CODEOWNERS",
	codeql: "ql",
	coffee: "coffee",
	coffeescript: "coffee",
	"common-lisp": "lisp",
	console: "sh",
	coq: "v",
	cpp: "cpp",
	cql: "cql",
	crystal: "cr",
	cs: "cs",
	csharp: "cs",
	css: "css",
	csv: "csv",
	cue: "cue",
	cypher: "cql",
	d: "d",
	dart: "dart",
	dax: "dax",
	desktop: "desktop",
	diff: "diff",
	docker: "dockerfile",
	dockerfile: "dockerfile",
	dotenv: "env",
	"dream-maker": "dm",
	edge: "edge",
	elisp: "el",
	elixir: "ex",
	elm: "elm",
	"emacs-lisp": "el",
	erb: "erb",
	erl: "erl",
	erlang: "erl",
	f: "f",
	"f#": "fs",
	f03: "f03",
	f08: "f08",
	f18: "f18",
	f77: "f77",
	f90: "f90",
	f95: "f95",
	fennel: "fnl",
	fish: "fish",
	fluent: "ftl",
	for: "for",
	"fortran-fixed-form": "f",
	"fortran-free-form": "f90",
	fs: "fs",
	fsharp: "fs",
	fsl: "fsl",
	ftl: "ftl",
	gdresource: "tres",
	gdscript: "gd",
	gdshader: "gdshader",
	genie: "gs",
	gherkin: "feature",
	"git-commit": "gitcommit",
	"git-rebase": "gitrebase",
	gjs: "js",
	gleam: "gleam",
	"glimmer-js": "js",
	"glimmer-ts": "ts",
	glsl: "glsl",
	gnuplot: "plt",
	go: "go",
	gql: "gql",
	graphql: "graphql",
	groovy: "groovy",
	gts: "gts",
	hack: "hack",
	haml: "haml",
	handlebars: "hbs",
	haskell: "hs",
	haxe: "hx",
	hbs: "hbs",
	hcl: "hcl",
	hjson: "hjson",
	hlsl: "hlsl",
	hs: "hs",
	html: "html",
	"html-derivative": "html",
	http: "http",
	hxml: "hxml",
	hy: "hy",
	imba: "imba",
	ini: "ini",
	jade: "jade",
	java: "java",
	javascript: "js",
	jinja: "jinja",
	jison: "jison",
	jl: "jl",
	js: "js",
	json: "json",
	json5: "json5",
	jsonc: "jsonc",
	jsonl: "jsonl",
	jsonnet: "jsonnet",
	jssm: "jssm",
	jsx: "jsx",
	julia: "jl",
	kotlin: "kt",
	kql: "kql",
	kt: "kt",
	kts: "kts",
	kusto: "kql",
	latex: "tex",
	lean: "lean",
	lean4: "lean",
	less: "less",
	liquid: "liquid",
	lisp: "lisp",
	lit: "lit",
	llvm: "ll",
	log: "log",
	logo: "logo",
	lua: "lua",
	luau: "luau",
	make: "mak",
	makefile: "mak",
	markdown: "md",
	marko: "marko",
	matlab: "m",
	md: "md",
	mdc: "mdc",
	mdx: "mdx",
	mediawiki: "wiki",
	mermaid: "mmd",
	mips: "s",
	mipsasm: "s",
	mmd: "mmd",
	mojo: "mojo",
	move: "move",
	nar: "nar",
	narrat: "narrat",
	nextflow: "nf",
	nf: "nf",
	nginx: "conf",
	nim: "nim",
	nix: "nix",
	nu: "nu",
	nushell: "nu",
	objc: "m",
	"objective-c": "m",
	"objective-cpp": "mm",
	ocaml: "ml",
	pascal: "pas",
	perl: "pl",
	perl6: "p6",
	php: "php",
	plsql: "pls",
	po: "po",
	polar: "polar",
	postcss: "pcss",
	pot: "pot",
	potx: "potx",
	powerquery: "pq",
	powershell: "ps1",
	prisma: "prisma",
	prolog: "pl",
	properties: "properties",
	proto: "proto",
	protobuf: "proto",
	ps: "ps",
	ps1: "ps1",
	pug: "pug",
	puppet: "pp",
	purescript: "purs",
	py: "py",
	python: "py",
	ql: "ql",
	qml: "qml",
	qmldir: "qmldir",
	qss: "qss",
	r: "r",
	racket: "rkt",
	raku: "raku",
	razor: "cshtml",
	rb: "rb",
	reg: "reg",
	regex: "regex",
	regexp: "regexp",
	rel: "rel",
	riscv: "s",
	rs: "rs",
	rst: "rst",
	ruby: "rb",
	rust: "rs",
	sas: "sas",
	sass: "sass",
	scala: "scala",
	scheme: "scm",
	scss: "scss",
	sdbl: "sdbl",
	sh: "sh",
	shader: "shader",
	shaderlab: "shader",
	shell: "sh",
	shellscript: "sh",
	shellsession: "sh",
	smalltalk: "st",
	solidity: "sol",
	soy: "soy",
	sparql: "rq",
	spl: "spl",
	splunk: "spl",
	sql: "sql",
	"ssh-config": "config",
	stata: "do",
	styl: "styl",
	stylus: "styl",
	svelte: "svelte",
	swift: "swift",
	"system-verilog": "sv",
	systemd: "service",
	talon: "talon",
	talonscript: "talon",
	tasl: "tasl",
	tcl: "tcl",
	templ: "templ",
	terraform: "tf",
	tex: "tex",
	tf: "tf",
	tfvars: "tfvars",
	toml: "toml",
	ts: "ts",
	"ts-tags": "ts",
	tsp: "tsp",
	tsv: "tsv",
	tsx: "tsx",
	turtle: "ttl",
	twig: "twig",
	typ: "typ",
	typescript: "ts",
	typespec: "tsp",
	typst: "typ",
	v: "v",
	vala: "vala",
	vb: "vb",
	verilog: "v",
	vhdl: "vhdl",
	vim: "vim",
	viml: "vim",
	vimscript: "vim",
	vue: "vue",
	"vue-html": "html",
	"vue-vine": "vine",
	vy: "vy",
	vyper: "vy",
	wasm: "wasm",
	wenyan: "wy",
	wgsl: "wgsl",
	wiki: "wiki",
	wikitext: "wiki",
	wit: "wit",
	wl: "wl",
	wolfram: "wl",
	xml: "xml",
	xsl: "xsl",
	yaml: "yaml",
	yml: "yml",
	zenscript: "zs",
	zig: "zig",
	zsh: "zsh",
	文言: "wy"
}, hC = ({ onDownload: e, onError: t, language: n, children: r, className: i, code: a, ...o }) => {
	let { code: c } = fC(), { isAnimating: l } = (0, s.useContext)(Nw), u = a ?? c, d = `file.${n && n in mC ? mC[n] : "txt"}`;
	return (0, X.jsx)("button", {
		className: $("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", i),
		"data-streamdown": "code-block-download-button",
		disabled: l,
		onClick: () => {
			try {
				uC(d, u, "text/plain"), e?.();
			} catch (e) {
				t?.(e);
			}
		},
		title: "Download file",
		type: "button",
		...o,
		children: r ?? (0, X.jsx)(Y_, { size: 14 })
	});
}, gC = () => (0, X.jsxs)("div", {
	className: "w-full divide-y divide-border overflow-hidden rounded-xl border border-border",
	children: [(0, X.jsx)("div", { className: "h-[46px] w-full bg-muted/80" }), (0, X.jsx)("div", {
		className: "flex w-full items-center justify-center p-4",
		children: (0, X.jsx)(X_, { className: "size-4 animate-spin" })
	})]
}), _C = /\.[^/.]+$/, vC = ({ node: e, className: t, src: n, alt: r, ...i }) => {
	let a = async () => {
		if (n) try {
			let e = await (await fetch(n)).blob(), t = new URL(n, window.location.origin).pathname.split("/").pop() || "", i = t.split(".").pop(), a = t.includes(".") && i !== void 0 && i.length <= 4, o = "";
			if (a) o = t;
			else {
				let n = e.type, i = "png";
				n.includes("jpeg") || n.includes("jpg") ? i = "jpg" : n.includes("png") ? i = "png" : n.includes("svg") ? i = "svg" : n.includes("gif") ? i = "gif" : n.includes("webp") && (i = "webp"), o = `${(r || t || "image").replace(_C, "")}.${i}`;
			}
			uC(o, e, e.type);
		} catch (e) {
			console.error("Failed to download image:", e);
		}
	};
	return n ? (0, X.jsxs)("div", {
		className: "group relative my-4 inline-block",
		"data-streamdown": "image-wrapper",
		children: [
			(0, X.jsx)("img", {
				alt: r,
				className: $("max-w-full rounded-lg", t),
				"data-streamdown": "image",
				src: n,
				...i
			}),
			(0, X.jsx)("div", { className: "pointer-events-none absolute inset-0 hidden rounded-lg bg-black/10 group-hover:block" }),
			(0, X.jsx)("button", {
				className: $("absolute right-2 bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border bg-background/90 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-background", "opacity-0 group-hover:opacity-100"),
				onClick: a,
				title: "Download image",
				type: "button",
				children: (0, X.jsx)(Y_, { size: 14 })
			})
		]
	}) : null;
}, yC = async (e) => {
	let t = {
		startOnLoad: !1,
		theme: "default",
		securityLevel: "strict",
		fontFamily: "monospace",
		suppressErrorRendering: !0,
		...e
	}, n = (await import("./mermaid.core-DuekSTCI.mjs")).default;
	return n.initialize(t), n;
}, bC = (e, t) => new Promise((t, n) => {
	let r = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(e))), i = new Image();
	i.crossOrigin = "anonymous", i.onload = () => {
		let e = document.createElement("canvas"), r = i.width * 5, a = i.height * 5;
		e.width = r, e.height = a;
		let o = e.getContext("2d");
		if (!o) {
			n(/* @__PURE__ */ Error("Failed to create 2D canvas context for PNG export"));
			return;
		}
		o.drawImage(i, 0, 0, r, a), e.toBlob((e) => {
			if (!e) {
				n(/* @__PURE__ */ Error("Failed to create PNG blob"));
				return;
			}
			t(e);
		}, "image/png");
	}, i.onerror = () => n(/* @__PURE__ */ Error("Failed to load SVG image")), i.src = r;
}), xC = ({ chart: e, children: t, className: n, onDownload: r, config: i, onError: a }) => {
	let [o, c] = (0, s.useState)(!1), l = (0, s.useRef)(null), { isAnimating: u } = (0, s.useContext)(Nw), d = async (t) => {
		try {
			if (t === "mmd") {
				uC("diagram.mmd", e, "text/plain"), c(!1), r?.(t);
				return;
			}
			let n = await yC(i), o = e.split("").reduce((e, t) => (e << 5) - e + t.charCodeAt(0) | 0, 0), s = `mermaid-${Math.abs(o)}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, { svg: l } = await n.render(s, e);
			if (!l) {
				a?.(/* @__PURE__ */ Error("SVG not found. Please wait for the diagram to render."));
				return;
			}
			if (t === "svg") {
				uC("diagram.svg", l, "image/svg+xml"), c(!1), r?.(t);
				return;
			}
			if (t === "png") {
				uC("diagram.png", await bC(l), "image/png"), r?.(t), c(!1);
				return;
			}
		} catch (e) {
			a?.(e);
		}
	};
	return (0, s.useEffect)(() => {
		let e = (e) => {
			l.current && !l.current.contains(e.target) && c(!1);
		};
		return document.addEventListener("mousedown", e), () => {
			document.removeEventListener("mousedown", e);
		};
	}, []), (0, X.jsxs)("div", {
		className: "relative",
		ref: l,
		children: [(0, X.jsx)("button", {
			className: $("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", n),
			disabled: u,
			onClick: () => c(!o),
			title: "Download diagram",
			type: "button",
			children: t ?? (0, X.jsx)(Y_, { size: 14 })
		}), o && (0, X.jsxs)("div", {
			className: "absolute top-full right-0 z-10 mt-1 min-w-[120px] overflow-hidden rounded-md border border-border bg-background shadow-lg",
			children: [
				(0, X.jsx)("button", {
					className: "w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40",
					onClick: () => d("svg"),
					title: "Download diagram as SVG",
					type: "button",
					children: "SVG"
				}),
				(0, X.jsx)("button", {
					className: "w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40",
					onClick: () => d("png"),
					title: "Download diagram as PNG",
					type: "button",
					children: "PNG"
				}),
				(0, X.jsx)("button", {
					className: "w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40",
					onClick: () => d("mmd"),
					title: "Download diagram as MMD",
					type: "button",
					children: "MMD"
				})
			]
		})]
	});
}, SC = 0, CC = () => {
	SC += 1, SC === 1 && (document.body.style.overflow = "hidden");
}, wC = () => {
	SC = Math.max(0, SC - 1), SC === 0 && (document.body.style.overflow = "");
}, TC = ({ chart: e, config: t, onFullscreen: n, onExit: r, className: i, ...a }) => {
	let [o, c] = (0, s.useState)(!1), { isAnimating: l, controls: u } = (0, s.useContext)(Nw), d = (() => {
		if (typeof u == "boolean") return u;
		let e = u.mermaid;
		return e === !1 ? !1 : e === !0 || e === void 0 || e.panZoom !== !1;
	})(), f = () => {
		c(!o);
	};
	return (0, s.useEffect)(() => {
		if (o) {
			CC();
			let e = (e) => {
				e.key === "Escape" && c(!1);
			};
			return document.addEventListener("keydown", e), () => {
				document.removeEventListener("keydown", e), wC();
			};
		}
	}, [o]), (0, s.useEffect)(() => {
		o ? n?.() : r && r();
	}, [
		o,
		n,
		r
	]), (0, X.jsxs)(X.Fragment, { children: [(0, X.jsx)("button", {
		className: $("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", i),
		disabled: l,
		onClick: f,
		title: "View fullscreen",
		type: "button",
		...a,
		children: (0, X.jsx)(Z_, { size: 14 })
	}), o && (0, X.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm",
		onClick: f,
		onKeyDown: (e) => {
			e.key === "Escape" && f();
		},
		role: "button",
		tabIndex: 0,
		children: [(0, X.jsx)("button", {
			className: "absolute top-4 right-4 z-10 rounded-md p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground",
			onClick: f,
			title: "Exit fullscreen",
			type: "button",
			children: (0, X.jsx)($_, { size: 20 })
		}), (0, X.jsx)("div", {
			className: "flex h-full w-full items-center justify-center p-4",
			onClick: (e) => e.stopPropagation(),
			onKeyDown: (e) => e.stopPropagation(),
			role: "presentation",
			children: (0, X.jsx)(Rw, {
				chart: e,
				className: "h-full w-full [&>div]:h-full [&>div]:overflow-hidden [&_svg]:h-auto [&_svg]:w-auto",
				config: t,
				fullscreen: !0,
				showControls: d
			})
		})]
	})] });
}, EC = (e) => {
	let t = [], n = [], r = e.querySelectorAll("thead th");
	for (let e of r) t.push(e.textContent?.trim() || "");
	let i = e.querySelectorAll("tbody tr");
	for (let e of i) {
		let t = [], r = e.querySelectorAll("td");
		for (let e of r) t.push(e.textContent?.trim() || "");
		n.push(t);
	}
	return {
		headers: t,
		rows: n
	};
}, DC = (e) => {
	let { headers: t, rows: n } = e, r = (e) => {
		let t = !1, n = !1;
		for (let r = 0; r < e.length; r += 1) {
			let i = e[r];
			if (i === "\"") {
				t = !0, n = !0;
				break;
			}
			(i === "," || i === "\n") && (t = !0);
		}
		return t ? n ? `"${e.replace(/"/g, "\"\"")}"` : `"${e}"` : e;
	}, i = t.length > 0 ? n.length + 1 : n.length, a = Array(i), o = 0;
	t.length > 0 && (a[o] = t.map(r).join(","), o += 1);
	for (let e of n) a[o] = e.map(r).join(","), o += 1;
	return a.join("\n");
}, OC = (e) => {
	let { headers: t, rows: n } = e, r = (e) => {
		let t = !1;
		for (let n = 0; n < e.length; n += 1) {
			let r = e[n];
			if (r === "	" || r === "\n" || r === "\r") {
				t = !0;
				break;
			}
		}
		if (!t) return e;
		let n = [];
		for (let t = 0; t < e.length; t += 1) {
			let r = e[t];
			r === "	" ? n.push("\\t") : r === "\n" ? n.push("\\n") : r === "\r" ? n.push("\\r") : n.push(r);
		}
		return n.join("");
	}, i = t.length > 0 ? n.length + 1 : n.length, a = Array(i), o = 0;
	t.length > 0 && (a[o] = t.map(r).join("	"), o += 1);
	for (let e of n) a[o] = e.map(r).join("	"), o += 1;
	return a.join("\n");
}, kC = (e) => {
	let t = !1;
	for (let n = 0; n < e.length; n += 1) {
		let r = e[n];
		if (r === "\\" || r === "|") {
			t = !0;
			break;
		}
	}
	if (!t) return e;
	let n = [];
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t];
		r === "\\" ? n.push("\\\\") : r === "|" ? n.push("\\|") : n.push(r);
	}
	return n.join("");
}, AC = (e) => {
	let { headers: t, rows: n } = e;
	if (t.length === 0) return "";
	let r = Array(n.length + 2), i = 0, a = t.map((e) => kC(e));
	r[i] = `| ${a.join(" | ")} |`, i += 1;
	let o = Array(t.length);
	for (let e = 0; e < t.length; e += 1) o[e] = "---";
	r[i] = `| ${o.join(" | ")} |`, i += 1;
	for (let e of n) if (e.length < t.length) {
		let n = Array(t.length);
		for (let r = 0; r < t.length; r += 1) n[r] = r < e.length ? kC(e[r]) : "";
		r[i] = `| ${n.join(" | ")} |`, i += 1;
	} else {
		let t = e.map((e) => kC(e));
		r[i] = `| ${t.join(" | ")} |`, i += 1;
	}
	return r.join("\n");
}, jC = ({ children: e, className: t, onCopy: n, onError: r, timeout: i = 2e3 }) => {
	let [a, o] = (0, s.useState)(!1), [c, l] = (0, s.useState)(!1), u = (0, s.useRef)(null), d = (0, s.useRef)(0), { isAnimating: f } = (0, s.useContext)(Nw), p = async (e) => {
		var t;
		if (typeof window > "u" || !((t = navigator == null ? void 0 : navigator.clipboard) != null && t.write)) {
			r?.(/* @__PURE__ */ Error("Clipboard API not available"));
			return;
		}
		try {
			let t = (u.current?.closest("[data-streamdown=\"table-wrapper\"]"))?.querySelector("table");
			if (!t) {
				r?.(/* @__PURE__ */ Error("Table not found"));
				return;
			}
			let a = EC(t), s = e === "csv" ? DC(a) : OC(a), c = new ClipboardItem({
				"text/plain": new Blob([s], { type: "text/plain" }),
				"text/html": new Blob([t.outerHTML], { type: "text/html" })
			});
			await navigator.clipboard.write([c]), l(!0), o(!1), n?.(e), d.current = window.setTimeout(() => l(!1), i);
		} catch (e) {
			r?.(e);
		}
	};
	(0, s.useEffect)(() => {
		let e = (e) => {
			u.current && !u.current.contains(e.target) && o(!1);
		};
		return document.addEventListener("mousedown", e), () => {
			document.removeEventListener("mousedown", e), window.clearTimeout(d.current);
		};
	}, []);
	let m = c ? q_ : J_;
	return (0, X.jsxs)("div", {
		className: "relative",
		ref: u,
		children: [(0, X.jsx)("button", {
			className: $("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", t),
			disabled: f,
			onClick: () => o(!a),
			title: "Copy table",
			type: "button",
			children: e ?? (0, X.jsx)(m, { size: 14 })
		}), a && (0, X.jsxs)("div", {
			className: "absolute top-full right-0 z-10 mt-1 min-w-[120px] overflow-hidden rounded-md border border-border bg-background shadow-lg",
			children: [(0, X.jsx)("button", {
				className: "w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40",
				onClick: () => p("csv"),
				title: "Copy table as CSV",
				type: "button",
				children: "CSV"
			}), (0, X.jsx)("button", {
				className: "w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40",
				onClick: () => p("tsv"),
				title: "Copy table as TSV",
				type: "button",
				children: "TSV"
			})]
		})]
	});
}, MC = ({ children: e, className: t, onDownload: n, onError: r }) => {
	let [i, a] = (0, s.useState)(!1), o = (0, s.useRef)(null), { isAnimating: c } = (0, s.useContext)(Nw), l = (e) => {
		try {
			let t = (o.current?.closest("[data-streamdown=\"table-wrapper\"]"))?.querySelector("table");
			if (!t) {
				r?.(/* @__PURE__ */ Error("Table not found"));
				return;
			}
			let i = EC(t), s = e === "csv" ? DC(i) : AC(i);
			uC(`table.${e === "csv" ? "csv" : "md"}`, s, e === "csv" ? "text/csv" : "text/markdown"), a(!1), n?.(e);
		} catch (e) {
			r?.(e);
		}
	};
	return (0, s.useEffect)(() => {
		let e = (e) => {
			o.current && !o.current.contains(e.target) && a(!1);
		};
		return document.addEventListener("mousedown", e), () => {
			document.removeEventListener("mousedown", e);
		};
	}, []), (0, X.jsxs)("div", {
		className: "relative",
		ref: o,
		children: [(0, X.jsx)("button", {
			className: $("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", t),
			disabled: c,
			onClick: () => a(!i),
			title: "Download table",
			type: "button",
			children: e ?? (0, X.jsx)(Y_, { size: 14 })
		}), i && (0, X.jsxs)("div", {
			className: "absolute top-full right-0 z-10 mt-1 min-w-[120px] overflow-hidden rounded-md border border-border bg-background shadow-lg",
			children: [(0, X.jsx)("button", {
				className: "w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40",
				onClick: () => l("csv"),
				title: "Download table as CSV",
				type: "button",
				children: "CSV"
			}), (0, X.jsx)("button", {
				className: "w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40",
				onClick: () => l("markdown"),
				title: "Download table as Markdown",
				type: "button",
				children: "Markdown"
			})]
		})]
	});
}, NC = ({ children: e, className: t, showControls: n, ...r }) => (0, X.jsxs)("div", {
	className: "my-4 flex flex-col space-y-2",
	"data-streamdown": "table-wrapper",
	children: [n && (0, X.jsxs)("div", {
		className: "flex items-center justify-end gap-1",
		children: [(0, X.jsx)(jC, {}), (0, X.jsx)(MC, {})]
	}), (0, X.jsx)("div", {
		className: "overflow-x-auto",
		children: (0, X.jsx)("table", {
			className: $("w-full border-collapse border border-border", t),
			"data-streamdown": "table",
			...r,
			children: e
		})
	})]
}), PC = (0, s.lazy)(() => import("./code-block-IT6T5CEO-6UUXpEgr.mjs").then((e) => ({ default: e.CodeBlock }))), FC = (0, s.lazy)(() => import("./mermaid-VLURNSYL-BaWCr5ei.mjs").then((e) => ({ default: e.Mermaid }))), IC = /language-([^\s]+)/;
function LC(e, t) {
	if (!(e != null && e.position || t != null && t.position)) return !0;
	if (!(e != null && e.position && t != null && t.position)) return !1;
	let n = e.position.start, r = t.position.start, i = e.position.end, a = t.position.end;
	return n?.line === r?.line && n?.column === r?.column && i?.line === a?.line && i?.column === a?.column;
}
function RC(e, t) {
	return e.className === t.className && LC(e.node, t.node);
}
var zC = (e, t) => typeof e == "boolean" ? e : e[t] !== !1, BC = (e, t) => {
	if (typeof e == "boolean") return e;
	let n = e.mermaid;
	return n === !1 ? !1 : n === !0 || n === void 0 || n[t] !== !1;
}, VC = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("ol", {
	className: $("list-inside list-decimal whitespace-normal", t),
	"data-streamdown": "ordered-list",
	...r,
	children: e
}), (e, t) => RC(e, t));
VC.displayName = "MarkdownOl";
var HC = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("li", {
	className: $("py-1 [&>p]:inline", t),
	"data-streamdown": "list-item",
	...r,
	children: e
}), (e, t) => e.className === t.className && LC(e.node, t.node));
HC.displayName = "MarkdownLi";
var UC = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("ul", {
	className: $("list-inside list-disc whitespace-normal", t),
	"data-streamdown": "unordered-list",
	...r,
	children: e
}), (e, t) => RC(e, t));
UC.displayName = "MarkdownUl";
var WC = (0, s.memo)(({ className: e, node: t, ...n }) => (0, X.jsx)("hr", {
	className: $("my-6 border-border", e),
	"data-streamdown": "horizontal-rule",
	...n
}), (e, t) => RC(e, t));
WC.displayName = "MarkdownHr";
var GC = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("span", {
	className: $("font-semibold", t),
	"data-streamdown": "strong",
	...r,
	children: e
}), (e, t) => RC(e, t));
GC.displayName = "MarkdownStrong";
var KC = (0, s.memo)(({ children: e, className: t, href: n, node: r, ...i }) => {
	let a = n === "streamdown:incomplete-link";
	return (0, X.jsx)("a", {
		className: $("wrap-anywhere font-medium text-primary underline", t),
		"data-incomplete": a,
		"data-streamdown": "link",
		href: n,
		rel: "noreferrer",
		target: "_blank",
		...i,
		children: e
	});
}, (e, t) => RC(e, t) && e.href === t.href);
KC.displayName = "MarkdownA";
var qC = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("h1", {
	className: $("mt-6 mb-2 font-semibold text-3xl", t),
	"data-streamdown": "heading-1",
	...r,
	children: e
}), (e, t) => RC(e, t));
qC.displayName = "MarkdownH1";
var JC = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("h2", {
	className: $("mt-6 mb-2 font-semibold text-2xl", t),
	"data-streamdown": "heading-2",
	...r,
	children: e
}), (e, t) => RC(e, t));
JC.displayName = "MarkdownH2";
var YC = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("h3", {
	className: $("mt-6 mb-2 font-semibold text-xl", t),
	"data-streamdown": "heading-3",
	...r,
	children: e
}), (e, t) => RC(e, t));
YC.displayName = "MarkdownH3";
var XC = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("h4", {
	className: $("mt-6 mb-2 font-semibold text-lg", t),
	"data-streamdown": "heading-4",
	...r,
	children: e
}), (e, t) => RC(e, t));
XC.displayName = "MarkdownH4";
var ZC = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("h5", {
	className: $("mt-6 mb-2 font-semibold text-base", t),
	"data-streamdown": "heading-5",
	...r,
	children: e
}), (e, t) => RC(e, t));
ZC.displayName = "MarkdownH5";
var QC = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("h6", {
	className: $("mt-6 mb-2 font-semibold text-sm", t),
	"data-streamdown": "heading-6",
	...r,
	children: e
}), (e, t) => RC(e, t));
QC.displayName = "MarkdownH6";
var $C = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => {
	let { controls: i } = (0, s.useContext)(Nw), a = zC(i, "table");
	return (0, X.jsx)(NC, {
		className: t,
		"data-streamdown": "table-wrapper",
		showControls: a,
		...r,
		children: e
	});
}, (e, t) => RC(e, t));
$C.displayName = "MarkdownTable";
var ew = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("thead", {
	className: $("bg-muted/80", t),
	"data-streamdown": "table-header",
	...r,
	children: e
}), (e, t) => RC(e, t));
ew.displayName = "MarkdownThead";
var tw = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("tbody", {
	className: $("divide-y divide-border bg-muted/40", t),
	"data-streamdown": "table-body",
	...r,
	children: e
}), (e, t) => RC(e, t));
tw.displayName = "MarkdownTbody";
var nw = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("tr", {
	className: $("border-border border-b", t),
	"data-streamdown": "table-row",
	...r,
	children: e
}), (e, t) => RC(e, t));
nw.displayName = "MarkdownTr";
var rw = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("th", {
	className: $("whitespace-nowrap px-4 py-2 text-left font-semibold text-sm", t),
	"data-streamdown": "table-header-cell",
	...r,
	children: e
}), (e, t) => RC(e, t));
rw.displayName = "MarkdownTh";
var iw = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("td", {
	className: $("px-4 py-2 text-sm", t),
	"data-streamdown": "table-cell",
	...r,
	children: e
}), (e, t) => RC(e, t));
iw.displayName = "MarkdownTd";
var aw = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("blockquote", {
	className: $("my-4 border-muted-foreground/30 border-l-4 pl-4 text-muted-foreground italic", t),
	"data-streamdown": "blockquote",
	...r,
	children: e
}), (e, t) => RC(e, t));
aw.displayName = "MarkdownBlockquote";
var ow = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("sup", {
	className: $("text-sm", t),
	"data-streamdown": "superscript",
	...r,
	children: e
}), (e, t) => RC(e, t));
ow.displayName = "MarkdownSup";
var sw = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => (0, X.jsx)("sub", {
	className: $("text-sm", t),
	"data-streamdown": "subscript",
	...r,
	children: e
}), (e, t) => RC(e, t));
sw.displayName = "MarkdownSub";
var cw = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => {
	if ("data-footnotes" in r) {
		let n = (e) => {
			if (!(0, s.isValidElement)(e)) return !1;
			let t = Array.isArray(e.props.children) ? e.props.children : [e.props.children], n = !1, r = !1;
			for (let e of t) if (e) {
				if (typeof e == "string") e.trim() !== "" && (n = !0);
				else if ((0, s.isValidElement)(e)) {
					if (e.props?.["data-footnote-backref"] !== void 0) r = !0;
					else {
						let t = Array.isArray(e.props.children) ? e.props.children : [e.props.children];
						for (let e of t) {
							if (typeof e == "string" && e.trim() !== "") {
								n = !0;
								break;
							}
							if ((0, s.isValidElement)(e) && e.props?.["data-footnote-backref"] === void 0) {
								n = !0;
								break;
							}
						}
					}
				}
			}
			return r && !n;
		}, i = Array.isArray(e) ? e.map((e) => {
			if (!(0, s.isValidElement)(e)) return e;
			if (e.type === VC) {
				let t = (Array.isArray(e.props.children) ? e.props.children : [e.props.children]).filter((e) => !n(e));
				return t.length === 0 ? null : {
					...e,
					props: {
						...e.props,
						children: t
					}
				};
			}
			return e;
		}) : e;
		return (Array.isArray(i) ? i.some((e) => e !== null) : i !== null) ? (0, X.jsx)("section", {
			className: t,
			...r,
			children: i
		}) : null;
	}
	return (0, X.jsx)("section", {
		className: t,
		...r,
		children: e
	});
}, (e, t) => RC(e, t));
cw.displayName = "MarkdownSection";
var lw = (0, s.memo)(({ node: e, className: t, children: n, ...r }) => {
	let i = (e?.position)?.start.line === (e?.position)?.end.line, { mermaid: a, controls: o } = (0, s.useContext)(Nw);
	if (i) return (0, X.jsx)("code", {
		className: $("rounded bg-muted px-1.5 py-0.5 font-mono text-sm", t),
		"data-streamdown": "inline-code",
		...r,
		children: n
	});
	let c = (t?.match(IC))?.at(1) ?? "", l = "";
	if ((0, s.isValidElement)(n) && n.props && typeof n.props == "object" && "children" in n.props && typeof n.props.children == "string" ? l = n.props.children : typeof n == "string" && (l = n), c === "mermaid") {
		let e = zC(o, "mermaid"), n = BC(o, "download"), r = BC(o, "copy"), i = BC(o, "fullscreen"), c = BC(o, "panZoom");
		return (0, X.jsx)(s.Suspense, {
			fallback: (0, X.jsx)(gC, {}),
			children: (0, X.jsxs)("div", {
				className: $("group relative my-4 h-auto rounded-xl border p-4", t),
				"data-streamdown": "mermaid-block",
				children: [e && (n || r || i) && (0, X.jsxs)("div", {
					className: "flex items-center justify-end gap-2",
					children: [
						n && (0, X.jsx)(xC, {
							chart: l,
							config: a?.config
						}),
						r && (0, X.jsx)(pC, { code: l }),
						i && (0, X.jsx)(TC, {
							chart: l,
							config: a?.config
						})
					]
				}), (0, X.jsx)(FC, {
					chart: l,
					config: a?.config,
					showControls: c
				})]
			})
		});
	}
	let u = zC(o, "code");
	return (0, X.jsx)(s.Suspense, {
		fallback: (0, X.jsx)(gC, {}),
		children: (0, X.jsx)(PC, {
			className: $("overflow-x-auto border-border border-t", t),
			code: l,
			language: c,
			children: u && (0, X.jsxs)(X.Fragment, { children: [(0, X.jsx)(hC, {
				code: l,
				language: c
			}), (0, X.jsx)(pC, {})] })
		})
	});
}, (e, t) => e.className === t.className && LC(e.node, t.node));
lw.displayName = "MarkdownCode";
var uw = (0, s.memo)(vC, (e, t) => e.className === t.className && LC(e.node, t.node));
uw.displayName = "MarkdownImg";
var dw = (0, s.memo)(({ children: e, className: t, node: n, ...r }) => {
	let i = (Array.isArray(e) ? e : [e]).filter((e) => e != null && e !== "");
	return i.length === 1 && (0, s.isValidElement)(i[0]) && i[0].props.node?.tagName === "img" ? (0, X.jsx)(X.Fragment, { children: e }) : (0, X.jsx)("p", {
		className: t,
		...r,
		children: e
	});
}, (e, t) => RC(e, t));
dw.displayName = "MarkdownParagraph";
var fw = {
	ol: VC,
	li: HC,
	ul: UC,
	hr: WC,
	strong: GC,
	a: KC,
	h1: qC,
	h2: JC,
	h3: YC,
	h4: XC,
	h5: ZC,
	h6: QC,
	table: $C,
	thead: ew,
	tbody: tw,
	tr: nw,
	th: rw,
	td: iw,
	blockquote: aw,
	code: lw,
	img: uw,
	pre: ({ children: e }) => e,
	sup: ow,
	sub: sw,
	p: dw,
	section: cw
}, pw = [], mw = { allowDangerousHtml: !0 }, hw = /* @__PURE__ */ new WeakMap(), gw = new class {
	constructor() {
		this.cache = /* @__PURE__ */ new Map(), this.keyCache = /* @__PURE__ */ new WeakMap(), this.maxSize = 100;
	}
	generateCacheKey(e) {
		let t = this.keyCache.get(e);
		if (t) return t;
		let n = e.rehypePlugins, r = e.remarkPlugins, i = e.remarkRehypeOptions;
		if (!(n || r || i)) {
			let t = "default";
			return this.keyCache.set(e, t), t;
		}
		let a = (e) => {
			if (!e || e.length === 0) return "";
			let t = "";
			for (let n = 0; n < e.length; n += 1) {
				let r = e[n];
				if (n > 0 && (t += ","), Array.isArray(r)) {
					let [e, n] = r;
					if (typeof e == "function") {
						let n = hw.get(e);
						n || (n = e.name, hw.set(e, n)), t += n;
					} else t += String(e);
					t += ":", t += JSON.stringify(n);
				} else if (typeof r == "function") {
					let e = hw.get(r);
					e || (e = r.name, hw.set(r, e)), t += e;
				} else t += String(r);
			}
			return t;
		}, o = a(n), s = `${a(r)}::${o}::${i ? JSON.stringify(i) : ""}`;
		return this.keyCache.set(e, s), s;
	}
	get(e) {
		let t = this.generateCacheKey(e), n = this.cache.get(t);
		return n && (this.cache.delete(t), this.cache.set(t, n)), n;
	}
	set(e, t) {
		let n = this.generateCacheKey(e);
		if (this.cache.size >= this.maxSize) {
			let e = this.cache.keys().next().value;
			e && this.cache.delete(e);
		}
		this.cache.set(n, t);
	}
	clear() {
		this.cache.clear();
	}
}(), _w = (e) => {
	let t = vw(e), n = e.children || "";
	return bw(t.runSync(t.parse(n), n), e);
}, vw = (e) => {
	let t = gw.get(e);
	if (t) return t;
	let n = yw(e);
	return gw.set(e, n), n;
}, yw = (e) => {
	let t = e.rehypePlugins || pw, n = e.remarkPlugins || pw, r = e.remarkRehypeOptions ? {
		...mw,
		...e.remarkRehypeOptions
	} : mw;
	return Ox().use(lb).use(n).use(tx, r).use(t);
}, bw = (e, t) => ry(e, {
	Fragment: X.Fragment,
	components: t.components,
	ignoreInvalidStyle: !0,
	jsx: X.jsx,
	jsxs: X.jsxs,
	passKeys: !0,
	passNode: !0
}), xw = /\[\^[^\]\s]{1,200}\](?!:)/, Sw = /\[\^[^\]\s]{1,200}\]:/, Cw = /<\/(\w+)>/, ww = /<(\w+)[\s>]/, Tw = (e) => {
	let t = 0;
	for (; t < e.length && (e[t] === " " || e[t] === "	" || e[t] === "\n" || e[t] === "\r");) t += 1;
	return t + 1 < e.length && e[t] === "$" && e[t + 1] === "$";
}, Ew = (e) => {
	let t = e.length - 1;
	for (; t >= 0 && (e[t] === " " || e[t] === "	" || e[t] === "\n" || e[t] === "\r");) --t;
	return t >= 1 && e[t] === "$" && e[t - 1] === "$";
}, Dw = (e) => {
	let t = 0;
	for (let n = 0; n < e.length - 1; n += 1) e[n] === "$" && e[n + 1] === "$" && (t += 1, n += 1);
	return t;
}, Ow = (e) => {
	let t = xw.test(e), n = Sw.test(e);
	if (t || n) return [e];
	let r = iC.lex(e, { gfm: !0 }), i = [], a = [];
	for (let e of r) {
		let t = e.raw, n = i.length;
		if (a.length > 0) {
			if (i[n - 1] += t, e.type === "html") {
				let e = t.match(Cw);
				if (e) {
					let t = e[1];
					a.at(-1) === t && a.pop();
				}
			}
			continue;
		}
		if (e.type === "html" && e.block) {
			let e = t.match(ww);
			if (e) {
				let n = e[1];
				t.includes(`</${n}>`) || a.push(n);
			}
		}
		if (t.trim() === "$$" && n > 0) {
			let e = i[n - 1], r = Tw(e), a = Dw(e);
			if (r && a % 2 == 1) {
				i[n - 1] = e + t;
				continue;
			}
		}
		if (n > 0 && Ew(t)) {
			let e = i[n - 1], r = Tw(e), a = Dw(e), o = Dw(t);
			if (r && a % 2 == 1 && !Tw(t) && o === 1) {
				i[n - 1] = e + t;
				continue;
			}
		}
		i.push(t);
	}
	return i;
}, kw = {
	raw: eu,
	katex: [Tr, { errorColor: "var(--color-muted-foreground)" }],
	sanitize: [yu, {}],
	harden: [Nt, {
		allowedImagePrefixes: ["*"],
		allowedLinkPrefixes: ["*"],
		allowedProtocols: ["*"],
		defaultOrigin: void 0,
		allowDataImages: !0
	}]
}, Aw = {
	gfm: [Ig, {}],
	math: [Jg, { singleDollarTextMath: !1 }],
	cjkFriendly: [Md, {}],
	cjkFriendlyGfmStrikethrough: [Pd, {}]
}, jw = Object.values(kw), Mw = Object.values(Aw), Nw = (0, s.createContext)({
	shikiTheme: ["github-light", "github-dark"],
	controls: !0,
	isAnimating: !1,
	mode: "streaming",
	mermaid: void 0
}), Pw = (0, s.memo)(({ content: e, shouldParseIncompleteMarkdown: t, ...n }) => {
	let r = (0, s.useMemo)(() => typeof e == "string" && t ? R_(e.trim()) : e, [e, t]);
	return (0, X.jsx)(_w, {
		...n,
		children: r
	});
}, (e, t) => {
	if (e.content !== t.content || e.shouldParseIncompleteMarkdown !== t.shouldParseIncompleteMarkdown || e.index !== t.index) return !1;
	if (e.components !== t.components) {
		let n = Object.keys(e.components || {}), r = Object.keys(t.components || {});
		if (n.length !== r.length || n.some((n) => e.components?.[n] !== t.components?.[n])) return !1;
	}
	return e.rehypePlugins === t.rehypePlugins && e.remarkPlugins === t.remarkPlugins;
});
Pw.displayName = "Block";
var Fw = ["github-light", "github-dark"], Iw = (0, s.memo)(({ children: e, mode: t = "streaming", parseIncompleteMarkdown: n = !0, components: r, rehypePlugins: i = jw, remarkPlugins: a = Mw, className: o, shikiTheme: c = Fw, mermaid: l, controls: u = !0, isAnimating: d = !1, BlockComponent: f = Pw, parseMarkdownIntoBlocksFn: p = Ow, ...m }) => {
	let h = (0, s.useId)(), [g, _] = (0, s.useTransition)(), [v, y] = (0, s.useState)([]), ee = (0, s.useMemo)(() => p(typeof e == "string" ? e : ""), [e, p]);
	(0, s.useEffect)(() => {
		t === "streaming" ? _(() => {
			y(ee);
		}) : y(ee);
	}, [ee, t]);
	let b = t === "streaming" ? v : ee, te = (0, s.useMemo)(() => b.map((e, t) => `${h}-${t}`), [b.length, h]), ne = (0, s.useMemo)(() => ({
		shikiTheme: c,
		controls: u,
		isAnimating: d,
		mode: t,
		mermaid: l
	}), [
		c,
		u,
		d,
		t,
		l
	]), x = (0, s.useMemo)(() => ({
		...fw,
		...r
	}), [r]);
	return (0, s.useEffect)(() => {
		if (!(Array.isArray(i) && i.some((e) => Array.isArray(e) ? e[0] === Tr : e === Tr))) return;
		let t = !1;
		if (Array.isArray(a)) {
			let e = a.find((e) => Array.isArray(e) ? e[0] === Jg : e === Jg);
			e && Array.isArray(e) && e[1] && (t = e[1].singleDollarTextMath === !0);
		}
		let n = typeof e == "string" ? e : "", r = n.includes("$$"), o = t && (/[^$]\$[^$]/.test(n) || /^\$[^$]/.test(n) || /[^$]\$$/.test(n));
		(r || o) && Promise.resolve({           });
	}, [
		i,
		a,
		e
	]), t === "static" ? (0, X.jsx)(Nw.Provider, {
		value: ne,
		children: (0, X.jsx)("div", {
			className: $("space-y-4 whitespace-normal", o),
			children: (0, X.jsx)(_w, {
				components: x,
				rehypePlugins: i,
				remarkPlugins: a,
				...m,
				children: e
			})
		})
	}) : (0, X.jsx)(Nw.Provider, {
		value: ne,
		children: (0, X.jsx)("div", {
			className: $("space-y-4 whitespace-normal", o),
			children: b.map((e, t) => (0, X.jsx)(f, {
				components: x,
				content: e,
				index: t,
				rehypePlugins: i,
				remarkPlugins: a,
				shouldParseIncompleteMarkdown: n,
				...m
			}, te[t]))
		})
	});
}, (e, t) => e.children === t.children && e.shikiTheme === t.shikiTheme && e.isAnimating === t.isAnimating && e.mode === t.mode);
Iw.displayName = "Streamdown";
var Lw = ({ children: e, className: t, minZoom: n = .5, maxZoom: r = 3, zoomStep: i = .1, showControls: a = !0, initialZoom: o = 1, fullscreen: c = !1 }) => {
	let l = (0, s.useRef)(null), u = (0, s.useRef)(null), [d, f] = (0, s.useState)(o), [p, m] = (0, s.useState)({
		x: 0,
		y: 0
	}), [h, g] = (0, s.useState)(!1), [_, v] = (0, s.useState)({
		x: 0,
		y: 0
	}), [y, ee] = (0, s.useState)({
		x: 0,
		y: 0
	}), b = (0, s.useCallback)((e) => {
		f((t) => Math.max(n, Math.min(r, t + e)));
	}, [n, r]), te = (0, s.useCallback)(() => {
		b(i);
	}, [b, i]), ne = (0, s.useCallback)(() => {
		b(-i);
	}, [b, i]), x = (0, s.useCallback)(() => {
		f(o), m({
			x: 0,
			y: 0
		});
	}, [o]), S = (0, s.useCallback)((e) => {
		e.preventDefault();
		let t = e.deltaY > 0 ? -i : i;
		b(t);
	}, [b, i]), re = (0, s.useCallback)((e) => {
		if (e.button !== 0 || e.isPrimary === !1) return;
		g(!0), v({
			x: e.clientX,
			y: e.clientY
		}), ee(p);
		let t = e.currentTarget;
		t instanceof HTMLElement && t.setPointerCapture(e.pointerId);
	}, [p]), ie = (0, s.useCallback)((e) => {
		if (!h) return;
		e.preventDefault();
		let t = e.clientX - _.x, n = e.clientY - _.y;
		m({
			x: y.x + t,
			y: y.y + n
		});
	}, [
		h,
		_,
		y
	]), C = (0, s.useCallback)((e) => {
		g(!1);
		let t = e.currentTarget;
		t instanceof HTMLElement && t.releasePointerCapture(e.pointerId);
	}, []);
	return (0, s.useEffect)(() => {
		let e = l.current;
		if (e) return e.addEventListener("wheel", S, { passive: !1 }), () => {
			e.removeEventListener("wheel", S);
		};
	}, [S]), (0, s.useEffect)(() => {
		let e = u.current;
		if (e && h) return document.body.style.userSelect = "none", e.addEventListener("pointermove", ie, { passive: !1 }), e.addEventListener("pointerup", C), e.addEventListener("pointercancel", C), () => {
			document.body.style.userSelect = "", e.removeEventListener("pointermove", ie), e.removeEventListener("pointerup", C), e.removeEventListener("pointercancel", C);
		};
	}, [
		h,
		ie,
		C
	]), (0, X.jsxs)("div", {
		className: $("relative", c ? "h-full w-full" : "w-full", t),
		ref: l,
		style: { cursor: h ? "grabbing" : "grab" },
		children: [a && (0, X.jsxs)("div", {
			className: $("absolute z-10 flex flex-col gap-1 rounded-md border border-border bg-background/90 p-1 shadow-sm backdrop-blur-sm", c ? "bottom-4 left-4" : "bottom-2 left-2"),
			children: [
				(0, X.jsx)("button", {
					className: "flex items-center justify-center rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
					disabled: d >= r,
					onClick: te,
					title: "Zoom in",
					type: "button",
					children: (0, X.jsx)(ev, { size: 16 })
				}),
				(0, X.jsx)("button", {
					className: "flex items-center justify-center rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
					disabled: d <= n,
					onClick: ne,
					title: "Zoom out",
					type: "button",
					children: (0, X.jsx)(tv, { size: 16 })
				}),
				(0, X.jsx)("button", {
					className: "flex items-center justify-center rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
					onClick: x,
					title: "Reset zoom and pan",
					type: "button",
					children: (0, X.jsx)(Q_, { size: 16 })
				})
			]
		}), (0, X.jsx)("div", {
			className: $("origin-center transition-transform duration-150 ease-out", c && "flex w-full items-center justify-center"),
			onPointerDown: re,
			ref: u,
			role: "application",
			style: {
				transform: `translate(${p.x}px, ${p.y}px) scale(${d})`,
				transformOrigin: "center center",
				touchAction: "none",
				willChange: "transform"
			},
			children: e
		})]
	});
}, Rw = ({ chart: e, className: t, config: n, fullscreen: r = !1, showControls: i = !0 }) => {
	let [a, o] = (0, s.useState)(null), [c, l] = (0, s.useState)(!0), [u, d] = (0, s.useState)(""), [f, p] = (0, s.useState)(""), [m, h] = (0, s.useState)(0), { mermaid: g } = (0, s.useContext)(Nw), _ = g?.errorComponent;
	if ((0, s.useEffect)(() => {
		(async () => {
			try {
				o(null), l(!0);
				let t = await yC(n), r = e.split("").reduce((e, t) => (e << 5) - e + t.charCodeAt(0) | 0, 0), i = `mermaid-${Math.abs(r)}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, { svg: a } = await t.render(i, e);
				d(a), p(a);
			} catch (e) {
				if (!(f || u)) {
					let t = e instanceof Error ? e.message : "Failed to render Mermaid chart";
					o(t);
				}
			} finally {
				l(!1);
			}
		})();
	}, [
		e,
		n,
		m
	]), c && !u && !f) return (0, X.jsx)("div", {
		className: $("my-4 flex justify-center p-4", t),
		children: (0, X.jsxs)("div", {
			className: "flex items-center space-x-2 text-muted-foreground",
			children: [(0, X.jsx)("div", { className: "h-4 w-4 animate-spin rounded-full border-current border-b-2" }), (0, X.jsx)("span", {
				className: "text-sm",
				children: "Loading diagram..."
			})]
		})
	});
	if (a && !u && !f) return _ ? (0, X.jsx)(_, {
		chart: e,
		error: a,
		retry: () => h((e) => e + 1)
	}) : (0, X.jsxs)("div", {
		className: $("rounded-lg border border-red-200 bg-red-50 p-4", t),
		children: [(0, X.jsxs)("p", {
			className: "font-mono text-red-700 text-sm",
			children: ["Mermaid Error: ", a]
		}), (0, X.jsxs)("details", {
			className: "mt-2",
			children: [(0, X.jsx)("summary", {
				className: "cursor-pointer text-red-600 text-xs",
				children: "Show Code"
			}), (0, X.jsx)("pre", {
				className: "mt-2 overflow-x-auto rounded bg-red-100 p-2 text-red-800 text-xs",
				children: e
			})]
		})]
	});
	let v = u || f;
	return (0, X.jsx)(Lw, {
		className: $(r ? "h-full w-full overflow-hidden" : "my-4 overflow-hidden", t),
		fullscreen: r,
		maxZoom: 3,
		minZoom: .5,
		showControls: i,
		zoomStep: .1,
		children: (0, X.jsx)("div", {
			"aria-label": "Mermaid chart",
			className: $("flex justify-center", r && "h-full w-full items-center"),
			dangerouslySetInnerHTML: { __html: v },
			role: "img"
		})
	});
};
//#endregion
export { $ as a, la as c, vt as d, gt as f, o as h, Iw as i, On as l, mt as m, dC as n, Fd as o, pt as p, Rw as r, Ca as s, Nw as t, wn as u };
