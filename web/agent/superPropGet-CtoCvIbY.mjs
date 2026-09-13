//#region \0@oxc-project+runtime@0.149.0/helpers/esm/checkPrivateRedeclaration.js
function e(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
//#endregion
//#region \0@oxc-project+runtime@0.149.0/helpers/esm/classPrivateFieldInitSpec.js
function t(t, n, r) {
	e(t, n), n.set(t, r);
}
//#endregion
//#region \0@oxc-project+runtime@0.149.0/helpers/esm/assertClassBrand.js
function n(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
//#endregion
//#region \0@oxc-project+runtime@0.149.0/helpers/esm/classPrivateFieldSet2.js
function r(e, t, r) {
	return e.set(n(e, t), r), r;
}
//#endregion
//#region \0@oxc-project+runtime@0.149.0/helpers/esm/classPrivateFieldGet2.js
function i(e, t) {
	return e.get(n(e, t));
}
//#endregion
//#region \0@oxc-project+runtime@0.149.0/helpers/esm/classPrivateMethodInitSpec.js
function a(t, n) {
	e(t, n), n.add(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.149.0/helpers/esm/getPrototypeOf.js
function o(e) {
	return o = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, o(e);
}
//#endregion
//#region \0@oxc-project+runtime@0.149.0/helpers/esm/superPropBase.js
function s(e, t) {
	for (; !{}.hasOwnProperty.call(e, t) && (e = o(e)) !== null;);
	return e;
}
//#endregion
//#region \0@oxc-project+runtime@0.149.0/helpers/esm/get.js
function c() {
	return c = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(e, t, n) {
		var r = s(e, t);
		if (r) {
			var i = Object.getOwnPropertyDescriptor(r, t);
			return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
		}
	}, c.apply(null, arguments);
}
//#endregion
//#region \0@oxc-project+runtime@0.149.0/helpers/esm/superPropGet.js
function l(e, t, n, r) {
	var i = c(o(1 & r ? e.prototype : e), t, n);
	return 2 & r && typeof i == "function" ? function(e) {
		return i.apply(n, e);
	} : i;
}
//#endregion
export { n as a, r as i, a as n, t as o, i as r, l as t };
