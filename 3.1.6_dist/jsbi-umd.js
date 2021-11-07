(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define &&
        define.amd ? define(t) : (e = e || self, e.JSBI = t())
})(this, function () {
    'use strict';
    var e = Math.imul,
        t = Math.clz32;

    function i(e) {
        "@babel/helpers - typeof";
        return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ?
                "symbol" : typeof e
        }, i(e)
    }

    function _(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function n(e, t) {
        for (var _, n = 0; n < t.length; n++) _ = t[n], _.enumerable = _.enumerable || !1, _.configurable = !0,
            "value" in _ && (_.writable = !0), Object.defineProperty(e, _.key, _)
    }

    function l(e, t, i) {
        return t && n(e.prototype, t), i && n(e, i), e
    }

    function g(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError(
            "Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), t && u(e, t)
    }

    function a(e) {
        return a = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, a(e)
    }

    function u(e, t) {
        return u = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        }, u(e, t)
    }

    function s() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
        } catch (t) {
            return !1
        }
    }

    function r() {
        return r = s() ? Reflect.construct : function (e, t, i) {
            var _ = [null];
            _.push.apply(_, t);
            var n = Function.bind.apply(e, _),
                l = new n;
            return i && u(l, i.prototype), l
        }, r.apply(null, arguments)
    }

    function d(e) {
        return -1 !== Function.toString.call(e).indexOf("[native code]")
    }

    function h(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return h = function (e) {
            function i() {
                return r(e, arguments, a(this).constructor)
            }
            if (null === e || !d(e)) return e;
            if ("function" != typeof e) throw new TypeError(
                "Super expression must either be null or a function");
            if ("undefined" != typeof t) {
                if (t.has(e)) return t.get(e);
                t.set(e, i)
            }
            return i.prototype = Object.create(e.prototype, {
                constructor: {
                    value: i,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), u(i, e)
        }, h(e)
    }

    function b(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function m(e, t) {
        if (t && ("object" == typeof t || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return b(e)
    }

    function c(e) {
        var t = s();
        return function () {
            var i, _ = a(e);
            if (t) {
                var n = a(this).constructor;
                i = Reflect.construct(_, arguments, n)
            } else i = _.apply(this, arguments);
            return m(this, i)
        }
    }

    function v(e, t) {
        if (e) {
            if ("string" == typeof e) return f(e, t);
            var i = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === i && e.constructor && (i = e.constructor.name), "Map" === i || "Set" === i ? Array.from(
                e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? f(e, t) : void 0
        }
    }

    function f(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var _ = 0, n = Array(t); _ < t; _++) n[_] = e[_];
        return n
    }

    function y(e, t) {
        var _ = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (!_) {
            if (Array.isArray(e) || (_ = v(e)) || t && e && "number" == typeof e.length) {
                _ && (e = _);
                var n = 0,
                    l = function () {};
                return {
                    s: l,
                    n: function () {
                        return n >= e.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: e[n++]
                        }
                    },
                    e: function (t) {
                        throw t
                    },
                    f: l
                }
            }
            throw new TypeError(
                "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            )
        }
        var g, a = !0,
            u = !1;
        return {
            s: function () {
                _ = _.call(e)
            },
            n: function () {
                var e = _.next();
                return a = e.done, e
            },
            e: function (t) {
                u = !0, g = t
            },
            f: function () {
                try {
                    a || null == _.return || _.return()
                } finally {
                    if (u) throw g
                }
            }
        }
    }
    var D = function (e) {
        var t = Math.abs,
            n = Math.max;

        function o(e, t) {
            var i;
            if (_(this, o), e > o.__kMaxLength) throw new RangeError("Maximum BigInt size exceeded");
            return i = a.call(this, e), i.sign = t, i
        }
        g(o, e);
        var a = c(o);
        return l(o, [{
            key: "toDebugString",
            value: function () {
                var e, t = ["BigInt["],
                    i = y(this);
                try {
                    for (i.s(); !(e = i.n()).done;) {
                        var _ = e.value;
                        t.push((_ ? (_ >>> 0).toString(16) : _) + ", ")
                    }
                } catch (e) {
                    i.e(e)
                } finally {
                    i.f()
                }
                return t.push("]"), t.join("")
            }
        }, {
            key: "toString",
            value: function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 10;
                if (2 > e || 36 < e) throw new RangeError(
                    "toString() radix argument must be between 2 and 36");
                return 0 === this.length ? "0" : 0 == (e & e - 1) ? o.__toStringBasePowerOfTwo(
                    this, e) : o.__toStringGeneric(this, e, !1)
            }
        }, {
            key: "__copy",
            value: function () {
                for (var e = new o(this.length, this.sign), t = 0; t < this.length; t++) e[t] =
                    this[t];
                return e
            }
        }, {
            key: "__trim",
            value: function () {
                for (var e = this.length, t = this[e - 1]; 0 === t;) e--, t = this[e - 1], this
                    .pop();
                return 0 === e && (this.sign = !1), this
            }
        }, {
            key: "__initializeDigits",
            value: function () {
                for (var e = 0; e < this.length; e++) this[e] = 0
            }
        }, {
            key: "__clzmsd",
            value: function () {
                return o.__clz32(this[this.length - 1])
            }
        }, {
            key: "__inplaceMultiplyAdd",
            value: function (e, t, _) {
                _ > this.length && (_ = this.length);
                for (var n = 65535 & e, l = e >>> 16, g = 0, a = 65535 & t, u = t >>> 16, s = 0; s <
                    _; s++) {
                    var r = this.__digit(s),
                        d = 65535 & r,
                        h = r >>> 16,
                        b = o.__imul(d, n),
                        m = o.__imul(d, l),
                        c = o.__imul(h, n),
                        v = o.__imul(h, l),
                        f = a + (65535 & b),
                        y = u + g + (f >>> 16) + (b >>> 16) + (65535 & m) + (65535 & c);
                    a = (m >>> 16) + (c >>> 16) + (65535 & v) + (y >>> 16), g = a >>> 16, a &=
                        65535, u = v >>> 16;
                    this.__setDigit(s, 65535 & f | y << 16)
                }
                if (0 !== g || 0 !== a || 0 !== u) throw new Error("implementation bug")
            }
        }, {
            key: "__inplaceAdd",
            value: function (e, t, _) {
                for (var n, l = 0, g = 0; g < _; g++) n = this.__halfDigit(t + g) + e.__halfDigit(
                    g) + l, l = n >>> 16, this.__setHalfDigit(t + g, n);
                return l
            }
        }, {
            key: "__inplaceSub",
            value: function (e, t, _) {
                var n = 0;
                if (1 & t) {
                    t >>= 1;
                    for (var l = this.__digit(t), g = 65535 & l, o = 0; o < _ - 1 >>> 1; o++) {
                        var a = e.__digit(o),
                            u = (l >>> 16) - (65535 & a) - n;
                        n = 1 & u >>> 16, this.__setDigit(t + o, u << 16 | 65535 & g), l = this
                            .__digit(t + o + 1), g = (65535 & l) - (a >>> 16) - n, n = 1 & g >>>
                            16
                    }
                    var s = e.__digit(o),
                        r = (l >>> 16) - (65535 & s) - n;
                    n = 1 & r >>> 16, this.__setDigit(t + o, r << 16 | 65535 & g);
                    if (t + o + 1 >= this.length) throw new RangeError("out of bounds");
                    0 == (1 & _) && (l = this.__digit(t + o + 1), g = (65535 & l) - (s >>> 16) -
                        n, n = 1 & g >>> 16, this.__setDigit(t + e.length, 4294901760 & l |
                            65535 & g))
                } else {
                    t >>= 1;
                    for (var d = 0; d < e.length - 1; d++) {
                        var h = this.__digit(t + d),
                            b = e.__digit(d),
                            m = (65535 & h) - (65535 & b) - n;
                        n = 1 & m >>> 16;
                        var c = (h >>> 16) - (b >>> 16) - n;
                        n = 1 & c >>> 16, this.__setDigit(t + d, c << 16 | 65535 & m)
                    }
                    var v = this.__digit(t + d),
                        f = e.__digit(d),
                        y = (65535 & v) - (65535 & f) - n;
                    n = 1 & y >>> 16;
                    var D = 0;
                    0 == (1 & _) && (D = (v >>> 16) - (f >>> 16) - n, n = 1 & D >>> 16), this.__setDigit(
                        t + d, D << 16 | 65535 & y)
                }
                return n
            }
        }, {
            key: "__inplaceRightShift",
            value: function (e) {
                if (0 !== e) {
                    for (var t, _ = this.__digit(0) >>> e, n = this.length - 1, l = 0; l < n; l++)
                        t = this.__digit(l + 1), this.__setDigit(l, t << 32 - e | _), _ = t >>>
                        e;
                    this.__setDigit(n, _)
                }
            }
        }, {
            key: "__digit",
            value: function (e) {
                return this[e]
            }
        }, {
            key: "__unsignedDigit",
            value: function (e) {
                return this[e] >>> 0
            }
        }, {
            key: "__setDigit",
            value: function (e, t) {
                this[e] = 0 | t
            }
        }, {
            key: "__setDigitGrow",
            value: function (e, t) {
                this[e] = 0 | t
            }
        }, {
            key: "__halfDigitLength",
            value: function () {
                var e = this.length;
                return 65535 >= this.__unsignedDigit(e - 1) ? 2 * e - 1 : 2 * e
            }
        }, {
            key: "__halfDigit",
            value: function (e) {
                return 65535 & this[e >>> 1] >>> ((1 & e) << 4)
            }
        }, {
            key: "__setHalfDigit",
            value: function (e, t) {
                var i = e >>> 1,
                    _ = this.__digit(i),
                    n = 1 & e ? 65535 & _ | t << 16 : 4294901760 & _ | 65535 & t;
                this.__setDigit(i, n)
            }
        }], [{
            key: "BigInt",
            value: function (e) {
                var t = Math.floor,
                    _ = Number.isFinite;
                if ("number" == typeof e) {
                    if (0 === e) return o.__zero();
                    if ((0 | e) === e) return 0 > e ? o.__oneDigit(-e, !0) : o.__oneDigit(e, !1);
                    if (!_(e) || t(e) !== e) throw new RangeError("The number " + e +
                        " cannot be converted to BigInt because it is not an integer");
                    return o.__fromDouble(e)
                }
                if ("string" == typeof e) {
                    var n = o.__fromString(e);
                    if (null === n) throw new SyntaxError("Cannot convert " + e +
                        " to a BigInt");
                    return n
                }
                if ("boolean" == typeof e) return !0 === e ? o.__oneDigit(1, !1) : o.__zero();
                if ("object" === i(e)) {
                    if (e.constructor === o) return e;
                    var l = o.__toPrimitive(e);
                    return o.BigInt(l)
                }
                throw new TypeError("Cannot convert " + e + " to a BigInt")
            }
        }, {
            key: "toNumber",
            value: function (e) {
                var t = e.length;
                if (0 === t) return 0;
                if (1 === t) {
                    var i = e.__unsignedDigit(0);
                    return e.sign ? -i : i
                }
                var _ = e.__digit(t - 1),
                    n = o.__clz32(_),
                    l = 32 * t - n;
                if (1024 < l) return e.sign ? -Infinity : 1 / 0;
                var g = l - 1,
                    a = _,
                    u = t - 1,
                    s = n + 1,
                    r = 32 === s ? 0 : a << s;
                r >>>= 12;
                var d = s - 12,
                    h = 12 <= s ? 0 : a << 20 + s,
                    b = 20 + s;
                0 < d && 0 < u && (u--, a = e.__digit(u), r |= a >>> 32 - d, h = a << d, b = d),
                    0 < b && 0 < u && (u--, a = e.__digit(u), h |= a >>> 32 - b, b -= 32);
                var m = o.__decideRounding(e, b, u, a);
                if ((1 === m || 0 === m && 1 == (1 & h)) && (h = h + 1 >>> 0, 0 === h && (r++,
                        0 != r >>> 20 && (r = 0, g++, 1023 < g)))) return e.sign ? -Infinity :
                    1 / 0;
                var c = e.sign ? -2147483648 : 0;
                return g = g + 1023 << 20, o.__kBitConversionInts[1] = c | g | r, o.__kBitConversionInts[
                    0] = h, o.__kBitConversionDouble[0]
            }
        }, {
            key: "unaryMinus",
            value: function (e) {
                if (0 === e.length) return e;
                var t = e.__copy();
                return t.sign = !e.sign, t
            }
        }, {
            key: "bitwiseNot",
            value: function (e) {
                return e.sign ? o.__absoluteSubOne(e).__trim() : o.__absoluteAddOne(e, !0)
            }
        }, {
            key: "exponentiate",
            value: function (e, t) {
                if (t.sign) throw new RangeError("Exponent must be positive");
                if (0 === t.length) return o.__oneDigit(1, !1);
                if (0 === e.length) return e;
                if (1 === e.length && 1 === e.__digit(0)) return e.sign && 0 == (1 & t.__digit(
                    0)) ? o.unaryMinus(e) : e;
                if (1 < t.length) throw new RangeError("BigInt too big");
                var i = t.__unsignedDigit(0);
                if (1 === i) return e;
                if (i >= o.__kMaxLengthBits) throw new RangeError("BigInt too big");
                if (1 === e.length && 2 === e.__digit(0)) {
                    var _ = 1 + (i >>> 5),
                        n = e.sign && 0 != (1 & i),
                        l = new o(_, n);
                    l.__initializeDigits();
                    var g = 1 << (31 & i);
                    return l.__setDigit(_ - 1, g), l
                }
                var a = null,
                    u = e;
                for (0 != (1 & i) && (a = e), i >>= 1; 0 !== i; i >>= 1) u = o.multiply(u, u),
                    0 != (1 & i) && (null === a ? a = u : a = o.multiply(a, u));
                return a
            }
        }, {
            key: "multiply",
            value: function (e, t) {
                if (0 === e.length) return e;
                if (0 === t.length) return t;
                var _ = e.length + t.length;
                32 <= e.__clzmsd() + t.__clzmsd() && _--;
                var n = new o(_, e.sign !== t.sign);
                n.__initializeDigits();
                for (var l = 0; l < e.length; l++) o.__multiplyAccumulate(t, e.__digit(l), n, l);
                return n.__trim()
            }
        }, {
            key: "divide",
            value: function (e, t) {
                if (0 === t.length) throw new RangeError("Division by zero");
                if (0 > o.__absoluteCompare(e, t)) return o.__zero();
                var i, _ = e.sign !== t.sign,
                    n = t.__unsignedDigit(0);
                if (1 === t.length && 65535 >= n) {
                    if (1 === n) return _ === e.sign ? e : o.unaryMinus(e);
                    i = o.__absoluteDivSmall(e, n, null)
                } else i = o.__absoluteDivLarge(e, t, !0, !1);
                return i.sign = _, i.__trim()
            }
        }, {
            key: "remainder",
            value: function i(e, t) {
                if (0 === t.length) throw new RangeError("Division by zero");
                if (0 > o.__absoluteCompare(e, t)) return e;
                var _ = t.__unsignedDigit(0);
                if (1 === t.length && 65535 >= _) {
                    if (1 === _) return o.__zero();
                    var n = o.__absoluteModSmall(e, _);
                    return 0 === n ? o.__zero() : o.__oneDigit(n, e.sign)
                }
                var i = o.__absoluteDivLarge(e, t, !1, !0);
                return i.sign = e.sign, i.__trim()
            }
        }, {
            key: "add",
            value: function (e, t) {
                var i = e.sign;
                return i === t.sign ? o.__absoluteAdd(e, t, i) : 0 <= o.__absoluteCompare(e, t) ?
                    o.__absoluteSub(e, t, i) : o.__absoluteSub(t, e, !i)
            }
        }, {
            key: "subtract",
            value: function (e, t) {
                var i = e.sign;
                return i === t.sign ? 0 <= o.__absoluteCompare(e, t) ? o.__absoluteSub(e, t, i) :
                    o.__absoluteSub(t, e, !i) : o.__absoluteAdd(e, t, i)
            }
        }, {
            key: "leftShift",
            value: function (e, t) {
                return 0 === t.length || 0 === e.length ? e : t.sign ? o.__rightShiftByAbsolute(
                    e, t) : o.__leftShiftByAbsolute(e, t)
            }
        }, {
            key: "signedRightShift",
            value: function (e, t) {
                return 0 === t.length || 0 === e.length ? e : t.sign ? o.__leftShiftByAbsolute(
                    e, t) : o.__rightShiftByAbsolute(e, t)
            }
        }, {
            key: "unsignedRightShift",
            value: function () {
                throw new TypeError("BigInts have no unsigned right shift; use >> instead")
            }
        }, {
            key: "lessThan",
            value: function (e, t) {
                return 0 > o.__compareToBigInt(e, t)
            }
        }, {
            key: "lessThanOrEqual",
            value: function (e, t) {
                return 0 >= o.__compareToBigInt(e, t)
            }
        }, {
            key: "greaterThan",
            value: function (e, t) {
                return 0 < o.__compareToBigInt(e, t)
            }
        }, {
            key: "greaterThanOrEqual",
            value: function (e, t) {
                return 0 <= o.__compareToBigInt(e, t)
            }
        }, {
            key: "equal",
            value: function (e, t) {
                if (e.sign !== t.sign) return !1;
                if (e.length !== t.length) return !1;
                for (var _ = 0; _ < e.length; _++)
                    if (e.__digit(_) !== t.__digit(_)) return !1;
                return !0
            }
        }, {
            key: "notEqual",
            value: function (e, t) {
                return !o.equal(e, t)
            }
        }, {
            key: "bitwiseAnd",
            value: function (e, t) {
                if (!e.sign && !t.sign) return o.__absoluteAnd(e, t).__trim();
                if (e.sign && t.sign) {
                    var i = n(e.length, t.length) + 1,
                        _ = o.__absoluteSubOne(e, i),
                        l = o.__absoluteSubOne(t);
                    return _ = o.__absoluteOr(_, l, _), o.__absoluteAddOne(_, !0, _).__trim()
                }
                if (e.sign) {
                    var g = [t, e];
                    e = g[0], t = g[1]
                }
                return o.__absoluteAndNot(e, o.__absoluteSubOne(t)).__trim()
            }
        }, {
            key: "bitwiseXor",
            value: function (e, t) {
                if (!e.sign && !t.sign) return o.__absoluteXor(e, t).__trim();
                if (e.sign && t.sign) {
                    var i = n(e.length, t.length),
                        _ = o.__absoluteSubOne(e, i),
                        l = o.__absoluteSubOne(t);
                    return o.__absoluteXor(_, l, _).__trim()
                }
                var g = n(e.length, t.length) + 1;
                if (e.sign) {
                    var a = [t, e];
                    e = a[0], t = a[1]
                }
                var u = o.__absoluteSubOne(t, g);
                return u = o.__absoluteXor(u, e, u), o.__absoluteAddOne(u, !0, u).__trim()
            }
        }, {
            key: "bitwiseOr",
            value: function (e, t) {
                var i = n(e.length, t.length);
                if (!e.sign && !t.sign) return o.__absoluteOr(e, t).__trim();
                if (e.sign && t.sign) {
                    var _ = o.__absoluteSubOne(e, i),
                        l = o.__absoluteSubOne(t);
                    return _ = o.__absoluteAnd(_, l, _), o.__absoluteAddOne(_, !0, _).__trim()
                }
                if (e.sign) {
                    var g = [t, e];
                    e = g[0], t = g[1]
                }
                var a = o.__absoluteSubOne(t, i);
                return a = o.__absoluteAndNot(a, e, a), o.__absoluteAddOne(a, !0, a).__trim()
            }
        }, {
            key: "asIntN",
            value: function (e, t) {
                if (0 === t.length) return t;
                if (0 === e) return o.__zero();
                if (e >= o.__kMaxLengthBits) return t;
                var _ = e + 31 >>> 5;
                if (t.length < _) return t;
                var n = t.__unsignedDigit(_ - 1),
                    l = 1 << (31 & e - 1);
                if (t.length === _ && n < l) return t;
                if (!((n & l) === l)) return o.__truncateToNBits(e, t);
                if (!t.sign) return o.__truncateAndSubFromPowerOfTwo(e, t, !0);
                if (0 == (n & l - 1)) {
                    for (var g = _ - 2; 0 <= g; g--)
                        if (0 !== t.__digit(g)) return o.__truncateAndSubFromPowerOfTwo(e, t, !
                            1);
                    return t.length === _ && n === l ? t : o.__truncateToNBits(e, t)
                }
                return o.__truncateAndSubFromPowerOfTwo(e, t, !1)
            }
        }, {
            key: "asUintN",
            value: function (e, t) {
                if (0 === t.length) return t;
                if (0 === e) return o.__zero();
                if (t.sign) {
                    if (e > o.__kMaxLengthBits) throw new RangeError("BigInt too big");
                    return o.__truncateAndSubFromPowerOfTwo(e, t, !1)
                }
                if (e >= o.__kMaxLengthBits) return t;
                var i = e + 31 >>> 5;
                if (t.length < i) return t;
                var _ = 31 & e;
                if (t.length == i) {
                    if (0 === _) return t;
                    var n = t.__digit(i - 1);
                    if (0 == n >>> _) return t
                }
                return o.__truncateToNBits(e, t)
            }
        }, {
            key: "ADD",
            value: function (e, t) {
                if (e = o.__toPrimitive(e), t = o.__toPrimitive(t), "string" == typeof e) return "string" !=
                    typeof t && (t = t.toString()), e + t;
                if ("string" == typeof t) return e.toString() + t;
                if (e = o.__toNumeric(e), t = o.__toNumeric(t), o.__isBigInt(e) && o.__isBigInt(
                        t)) return o.add(e, t);
                if ("number" == typeof e && "number" == typeof t) return e + t;
                throw new TypeError(
                    "Cannot mix BigInt and other types, use explicit conversions")
            }
        }, {
            key: "LT",
            value: function (e, t) {
                return o.__compare(e, t, 0)
            }
        }, {
            key: "LE",
            value: function (e, t) {
                return o.__compare(e, t, 1)
            }
        }, {
            key: "GT",
            value: function (e, t) {
                return o.__compare(e, t, 2)
            }
        }, {
            key: "GE",
            value: function (e, t) {
                return o.__compare(e, t, 3)
            }
        }, {
            key: "EQ",
            value: function (e, t) {
                for (;;) {
                    if (o.__isBigInt(e)) return o.__isBigInt(t) ? o.equal(e, t) : o.EQ(t, e);
                    if ("number" == typeof e) {
                        if (o.__isBigInt(t)) return o.__equalToNumber(t, e);
                        if ("object" !== i(t)) return e == t;
                        t = o.__toPrimitive(t)
                    } else if ("string" == typeof e) {
                        if (o.__isBigInt(t)) return e = o.__fromString(e), null !== e && o.equal(
                            e, t);
                        if ("object" !== i(t)) return e == t;
                        t = o.__toPrimitive(t)
                    } else if ("boolean" == typeof e) {
                        if (o.__isBigInt(t)) return o.__equalToNumber(t, +e);
                        if ("object" !== i(t)) return e == t;
                        t = o.__toPrimitive(t)
                    } else if ("symbol" === i(e)) {
                        if (o.__isBigInt(t)) return !1;
                        if ("object" !== i(t)) return e == t;
                        t = o.__toPrimitive(t)
                    } else if ("object" === i(e)) {
                        if ("object" === i(t) && t.constructor !== o) return e == t;
                        e = o.__toPrimitive(e)
                    } else return e == t
                }
            }
        }, {
            key: "NE",
            value: function (e, t) {
                return !o.EQ(e, t)
            }
        }, {
            key: "__zero",
            value: function () {
                return new o(0, !1)
            }
        }, {
            key: "__oneDigit",
            value: function (e, t) {
                var i = new o(1, t);
                return i.__setDigit(0, e), i
            }
        }, {
            key: "__decideRounding",
            value: function (e, t, i, _) {
                if (0 < t) return -1;
                var n;
                if (0 > t) n = -t - 1;
                else {
                    if (0 === i) return -1;
                    i--, _ = e.__digit(i), n = 31
                }
                var l = 1 << n;
                if (0 == (_ & l)) return -1;
                if (l -= 1, 0 != (_ & l)) return 1;
                for (; 0 < i;)
                    if (i--, 0 !== e.__digit(i)) return 1;
                return 0
            }
        }, {
            key: "__fromDouble",
            value: function (e) {
                o.__kBitConversionDouble[0] = e;
                var t, i = 2047 & o.__kBitConversionInts[1] >>> 20,
                    _ = i - 1023,
                    n = (_ >>> 5) + 1,
                    l = new o(n, 0 > e),
                    g = 1048575 & o.__kBitConversionInts[1] | 1048576,
                    a = o.__kBitConversionInts[0],
                    u = 20,
                    s = 31 & _,
                    r = 0;
                if (s < u) {
                    var d = u - s;
                    r = d + 32, t = g >>> d, g = g << 32 - d | a >>> d, a <<= 32 - d
                } else if (s === u) r = 32, t = g, g = a;
                else {
                    var h = s - u;
                    r = 32 - h, t = g << h | a >>> 32 - h, g = a << h
                }
                l.__setDigit(n - 1, t);
                for (var b = n - 2; 0 <= b; b--) 0 < r ? (r -= 32, t = g, g = a) : t = 0, l.__setDigit(
                    b, t);
                return l.__trim()
            }
        }, {
            key: "__isWhitespace",
            value: function (e) {
                return !!(13 >= e && 9 <= e) || (159 >= e ? 32 == e : 131071 >= e ? 160 == e ||
                    5760 == e : 196607 >= e ? (e &= 131071, 10 >= e || 40 == e || 41 == e ||
                        47 == e || 95 == e || 4096 == e) : 65279 == e)
            }
        }, {
            key: "__fromString",
            value: function (e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                    i = 0,
                    _ = e.length,
                    n = 0;
                if (n === _) return o.__zero();
                for (var l = e.charCodeAt(n); o.__isWhitespace(l);) {
                    if (++n === _) return o.__zero();
                    l = e.charCodeAt(n)
                }
                if (43 === l) {
                    if (++n === _) return null;
                    l = e.charCodeAt(n), i = 1
                } else if (45 === l) {
                    if (++n === _) return null;
                    l = e.charCodeAt(n), i = -1
                }
                if (0 === t) {
                    if (t = 10, 48 === l) {
                        if (++n === _) return o.__zero();
                        if (l = e.charCodeAt(n), 88 === l || 120 === l) {
                            if (t = 16, ++n === _) return null;
                            l = e.charCodeAt(n)
                        } else if (79 === l || 111 === l) {
                            if (t = 8, ++n === _) return null;
                            l = e.charCodeAt(n)
                        } else if (66 === l || 98 === l) {
                            if (t = 2, ++n === _) return null;
                            l = e.charCodeAt(n)
                        }
                    }
                } else if (16 === t && 48 === l) {
                    if (++n === _) return o.__zero();
                    if (l = e.charCodeAt(n), 88 === l || 120 === l) {
                        if (++n === _) return null;
                        l = e.charCodeAt(n)
                    }
                }
                for (; 48 === l;) {
                    if (++n === _) return o.__zero();
                    l = e.charCodeAt(n)
                }
                var g = _ - n,
                    a = o.__kMaxBitsPerChar[t],
                    u = o.__kBitsPerCharTableMultiplier - 1;
                if (g > 1073741824 / a) return null;
                var s = a * g + u >>> o.__kBitsPerCharTableShift,
                    r = new o(s + 31 >>> 5, !1),
                    h = 10 > t ? t : 10,
                    b = 10 < t ? t - 10 : 0;
                if (0 == (t & t - 1)) {
                    a >>= o.__kBitsPerCharTableShift;
                    var c = [],
                        v = [],
                        f = !1;
                    do {
                        for (var y, D = 0, k = 0;;) {
                            if (y = void 0, l - 48 >>> 0 < h) y = l - 48;
                            else if ((32 | l) - 97 >>> 0 < b) y = (32 | l) - 87;
                            else {
                                f = !0;
                                break
                            }
                            if (k += a, D = D << a | y, ++n === _) {
                                f = !0;
                                break
                            }
                            if (l = e.charCodeAt(n), 32 < k + a) break
                        }
                        c.push(D), v.push(k)
                    } while (!f);
                    o.__fillFromParts(r, c, v)
                } else {
                    r.__initializeDigits();
                    var p = !1,
                        B = 0;
                    do {
                        for (var S, C = 0, A = 1;;) {
                            if (S = void 0, l - 48 >>> 0 < h) S = l - 48;
                            else if ((32 | l) - 97 >>> 0 < b) S = (32 | l) - 87;
                            else {
                                p = !0;
                                break
                            }
                            var T = A * t;
                            if (4294967295 < T) break;
                            if (A = T, C = C * t + S, B++, ++n === _) {
                                p = !0;
                                break
                            }
                            l = e.charCodeAt(n)
                        }
                        u = 32 * o.__kBitsPerCharTableMultiplier - 1;
                        var m = a * B + u >>> o.__kBitsPerCharTableShift + 5;
                        r.__inplaceMultiplyAdd(A, C, m)
                    } while (!p)
                }
                if (n !== _) {
                    if (!o.__isWhitespace(l)) return null;
                    for (n++; n < _; n++)
                        if (l = e.charCodeAt(n), !o.__isWhitespace(l)) return null
                }
                return 0 !== i && 10 !== t ? null : (r.sign = -1 === i, r.__trim())
            }
        }, {
            key: "__fillFromParts",
            value: function (e, t, _) {
                for (var n = 0, l = 0, g = 0, o = t.length - 1; 0 <= o; o--) {
                    var a = t[o],
                        u = _[o];
                    l |= a << g, g += u, 32 === g ? (e.__setDigit(n++, l), g = 0, l = 0) : 32 <
                        g && (e.__setDigit(n++, l), g -= 32, l = a >>> u - g)
                }
                if (0 !== l) {
                    if (n >= e.length) throw new Error("implementation bug");
                    e.__setDigit(n++, l)
                }
                for (; n < e.length; n++) e.__setDigit(n, 0)
            }
        }, {
            key: "__toStringBasePowerOfTwo",
            value: function (e, t) {
                var _ = e.length,
                    n = t - 1;
                n = (85 & n >>> 1) + (85 & n), n = (51 & n >>> 2) + (51 & n), n = (15 & n >>>
                    4) + (15 & n);
                var l = n,
                    g = t - 1,
                    a = e.__digit(_ - 1),
                    u = o.__clz32(a),
                    s = 0 | (32 * _ - u + l - 1) / l;
                if (e.sign && s++, 268435456 < s) throw new Error("string too long");
                for (var r = Array(s), d = s - 1, h = 0, b = 0, m = 0; m < _ - 1; m++) {
                    var c = e.__digit(m),
                        v = (h | c << b) & g;
                    r[d--] = o.__kConversionChars[v];
                    var f = l - b;
                    for (h = c >>> f, b = 32 - f; b >= l;) r[d--] = o.__kConversionChars[h & g],
                        h >>>= l, b -= l
                }
                var y = (h | a << b) & g;
                for (r[d--] = o.__kConversionChars[y], h = a >>> l - b; 0 !== h;) r[d--] = o.__kConversionChars[
                    h & g], h >>>= l;
                if (e.sign && (r[d--] = "-"), -1 !== d) throw new Error("implementation bug");
                return r.join("")
            }
        }, {
            key: "__toStringGeneric",
            value: function (e, t, _) {
                var n = e.length;
                if (0 === n) return "";
                if (1 === n) {
                    var l = e.__unsignedDigit(0).toString(t);
                    return !1 === _ && e.sign && (l = "-" + l), l
                }
                var g = 32 * n - o.__clz32(e.__digit(n - 1)),
                    a = o.__kMaxBitsPerChar[t],
                    u = a - 1,
                    s = g * o.__kBitsPerCharTableMultiplier;
                s += u - 1, s = 0 | s / u;
                var r, d, h = s + 1 >> 1,
                    b = o.exponentiate(o.__oneDigit(t, !1), o.__oneDigit(h, !1)),
                    m = b.__unsignedDigit(0);
                if (1 === b.length && 65535 >= m) {
                    r = new o(e.length, !1), r.__initializeDigits();
                    for (var c, v = 0, f = 2 * e.length - 1; 0 <= f; f--) c = v << 16 | e.__halfDigit(
                        f), r.__setHalfDigit(f, 0 | c / m), v = 0 | c % m;
                    d = v.toString(t)
                } else {
                    var y = o.__absoluteDivLarge(e, b, !0, !0);
                    r = y.quotient;
                    var D = y.remainder.__trim();
                    d = o.__toStringGeneric(D, t, !0)
                }
                r.__trim();
                for (var k = o.__toStringGeneric(r, t, !0); d.length < h;) d = "0" + d;
                return !1 === _ && e.sign && (k = "-" + k), k + d
            }
        }, {
            key: "__unequalSign",
            value: function (e) {
                return e ? -1 : 1
            }
        }, {
            key: "__absoluteGreater",
            value: function (e) {
                return e ? -1 : 1
            }
        }, {
            key: "__absoluteLess",
            value: function (e) {
                return e ? 1 : -1
            }
        }, {
            key: "__compareToBigInt",
            value: function (e, t) {
                var i = e.sign;
                if (i !== t.sign) return o.__unequalSign(i);
                var _ = o.__absoluteCompare(e, t);
                return 0 < _ ? o.__absoluteGreater(i) : 0 > _ ? o.__absoluteLess(i) : 0
            }
        }, {
            key: "__compareToNumber",
            value: function (e, i) {
                if (!0 | i) {
                    var _ = e.sign,
                        n = 0 > i;
                    if (_ !== n) return o.__unequalSign(_);
                    if (0 === e.length) {
                        if (n) throw new Error("implementation bug");
                        return 0 === i ? 0 : -1
                    }
                    if (1 < e.length) return o.__absoluteGreater(_);
                    var l = t(i),
                        g = e.__unsignedDigit(0);
                    return g > l ? o.__absoluteGreater(_) : g < l ? o.__absoluteLess(_) : 0
                }
                return o.__compareToDouble(e, i)
            }
        }, {
            key: "__compareToDouble",
            value: function (e, t) {
                if (t !== t) return t;
                if (t === 1 / 0) return -1;
                if (t === -Infinity) return 1;
                var i = e.sign;
                if (i !== 0 > t) return o.__unequalSign(i);
                if (0 === t) throw new Error("implementation bug: should be handled elsewhere");
                if (0 === e.length) return -1;
                o.__kBitConversionDouble[0] = t;
                var _ = 2047 & o.__kBitConversionInts[1] >>> 20;
                if (2047 == _) throw new Error("implementation bug: handled elsewhere");
                var n = _ - 1023;
                if (0 > n) return o.__absoluteGreater(i);
                var l = e.length,
                    g = e.__digit(l - 1),
                    a = o.__clz32(g),
                    u = 32 * l - a,
                    s = n + 1;
                if (u < s) return o.__absoluteLess(i);
                if (u > s) return o.__absoluteGreater(i);
                var r = 1048576 | 1048575 & o.__kBitConversionInts[1],
                    d = o.__kBitConversionInts[0],
                    h = 20,
                    b = 31 - a;
                if (b !== (u - 1) % 31) throw new Error("implementation bug");
                var m, c = 0;
                if (b < h) {
                    var v = h - b;
                    c = v + 32, m = r >>> v, r = r << 32 - v | d >>> v, d <<= 32 - v
                } else if (b === h) c = 32, m = r, r = d;
                else {
                    var f = b - h;
                    c = 32 - f, m = r << f | d >>> 32 - f, r = d << f
                }
                if (g >>>= 0, m >>>= 0, g > m) return o.__absoluteGreater(i);
                if (g < m) return o.__absoluteLess(i);
                for (var y = l - 2; 0 <= y; y--) {
                    0 < c ? (c -= 32, m = r >>> 0, r = d, d = 0) : m = 0;
                    var D = e.__unsignedDigit(y);
                    if (D > m) return o.__absoluteGreater(i);
                    if (D < m) return o.__absoluteLess(i)
                }
                if (0 !== r || 0 !== d) {
                    if (0 === c) throw new Error("implementation bug");
                    return o.__absoluteLess(i)
                }
                return 0
            }
        }, {
            key: "__equalToNumber",
            value: function (e, i) {
                return i | 0 === i ? 0 === i ? 0 === e.length : 1 === e.length && e.sign === 0 >
                    i && e.__unsignedDigit(0) === t(i) : 0 === o.__compareToDouble(e, i)
            }
        }, {
            key: "__comparisonResultToBool",
            value: function (e, t) {
                switch (t) {
                    case 0:
                        return 0 > e;
                    case 1:
                        return 0 >= e;
                    case 2:
                        return 0 < e;
                    case 3:
                        return 0 <= e;
                }
                throw new Error("unreachable")
            }
        }, {
            key: "__compare",
            value: function (e, t, i) {
                if (e = o.__toPrimitive(e), t = o.__toPrimitive(t), "string" == typeof e &&
                    "string" == typeof t) switch (i) {
                    case 0:
                        return e < t;
                    case 1:
                        return e <= t;
                    case 2:
                        return e > t;
                    case 3:
                        return e >= t;
                }
                if (o.__isBigInt(e) && "string" == typeof t) return t = o.__fromString(t), null !==
                    t && o.__comparisonResultToBool(o.__compareToBigInt(e, t), i);
                if ("string" == typeof e && o.__isBigInt(t)) return e = o.__fromString(e), null !==
                    e && o.__comparisonResultToBool(o.__compareToBigInt(e, t), i);
                if (e = o.__toNumeric(e), t = o.__toNumeric(t), o.__isBigInt(e)) {
                    if (o.__isBigInt(t)) return o.__comparisonResultToBool(o.__compareToBigInt(
                        e, t), i);
                    if ("number" != typeof t) throw new Error("implementation bug");
                    return o.__comparisonResultToBool(o.__compareToNumber(e, t), i)
                }
                if ("number" != typeof e) throw new Error("implementation bug");
                if (o.__isBigInt(t)) return o.__comparisonResultToBool(o.__compareToNumber(t, e),
                    2 ^ i);
                if ("number" != typeof t) throw new Error("implementation bug");
                return 0 === i ? e < t : 1 === i ? e <= t : 2 === i ? e > t : 3 === i ? e >= t :
                    void 0
            }
        }, {
            key: "__absoluteAdd",
            value: function (e, t, _) {
                if (e.length < t.length) return o.__absoluteAdd(t, e, _);
                if (0 === e.length) return e;
                if (0 === t.length) return e.sign === _ ? e : o.unaryMinus(e);
                var n = e.length;
                (0 === e.__clzmsd() || t.length === e.length && 0 === t.__clzmsd()) && n++;
                for (var l = new o(n, _), g = 0, a = 0; a < t.length; a++) {
                    var u = t.__digit(a),
                        s = e.__digit(a),
                        r = (65535 & s) + (65535 & u) + g,
                        d = (s >>> 16) + (u >>> 16) + (r >>> 16);
                    g = d >>> 16, l.__setDigit(a, 65535 & r | d << 16)
                }
                for (; a < e.length; a++) {
                    var h = e.__digit(a),
                        b = (65535 & h) + g,
                        m = (h >>> 16) + (b >>> 16);
                    g = m >>> 16, l.__setDigit(a, 65535 & b | m << 16)
                }
                return a < l.length && l.__setDigit(a, g), l.__trim()
            }
        }, {
            key: "__absoluteSub",
            value: function (e, t, _) {
                if (0 === e.length) return e;
                if (0 === t.length) return e.sign === _ ? e : o.unaryMinus(e);
                for (var n = new o(e.length, _), l = 0, g = 0; g < t.length; g++) {
                    var a = e.__digit(g),
                        u = t.__digit(g),
                        s = (65535 & a) - (65535 & u) - l;
                    l = 1 & s >>> 16;
                    var r = (a >>> 16) - (u >>> 16) - l;
                    l = 1 & r >>> 16, n.__setDigit(g, 65535 & s | r << 16)
                }
                for (; g < e.length; g++) {
                    var d = e.__digit(g),
                        h = (65535 & d) - l;
                    l = 1 & h >>> 16;
                    var b = (d >>> 16) - l;
                    l = 1 & b >>> 16, n.__setDigit(g, 65535 & h | b << 16)
                }
                return n.__trim()
            }
        }, {
            key: "__absoluteAddOne",
            value: function (e, t) {
                var _ = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
                    n = e.length;
                null === _ ? _ = new o(n, t) : _.sign = t;
                for (var l, g = !0, a = 0; a < n; a++) {
                    if (l = e.__digit(a), g) {
                        var u = -1 === l;
                        l = 0 | l + 1, g = u
                    }
                    _.__setDigit(a, l)
                }
                return g && _.__setDigitGrow(n, 1), _
            }
        }, {
            key: "__absoluteSubOne",
            value: function (e, t) {
                var _ = e.length;
                t = t || _;
                for (var n, l = new o(t, !1), g = !0, a = 0; a < _; a++) {
                    if (n = e.__digit(a), g) {
                        var u = 0 === n;
                        n = 0 | n - 1, g = u
                    }
                    l.__setDigit(a, n)
                }
                if (g) throw new Error("implementation bug");
                for (var s = _; s < t; s++) l.__setDigit(s, 0);
                return l
            }
        }, {
            key: "__absoluteAnd",
            value: function (e, t) {
                var _ = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
                    n = e.length,
                    l = t.length,
                    g = l;
                if (n < l) {
                    g = n;
                    var a = e,
                        u = n;
                    e = t, n = l, t = a, l = u
                }
                var s = g;
                null === _ ? _ = new o(s, !1) : s = _.length;
                for (var r = 0; r < g; r++) _.__setDigit(r, e.__digit(r) & t.__digit(r));
                for (; r < s; r++) _.__setDigit(r, 0);
                return _
            }
        }, {
            key: "__absoluteAndNot",
            value: function (e, t) {
                var _ = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
                    n = e.length,
                    l = t.length,
                    g = l;
                n < l && (g = n);
                var a = n;
                null === _ ? _ = new o(a, !1) : a = _.length;
                for (var u = 0; u < g; u++) _.__setDigit(u, e.__digit(u) & ~t.__digit(u));
                for (; u < n; u++) _.__setDigit(u, e.__digit(u));
                for (; u < a; u++) _.__setDigit(u, 0);
                return _
            }
        }, {
            key: "__absoluteOr",
            value: function (e, t) {
                var _ = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
                    n = e.length,
                    l = t.length,
                    g = l;
                if (n < l) {
                    g = n;
                    var a = e,
                        u = n;
                    e = t, n = l, t = a, l = u
                }
                var s = n;
                null === _ ? _ = new o(s, !1) : s = _.length;
                for (var r = 0; r < g; r++) _.__setDigit(r, e.__digit(r) | t.__digit(r));
                for (; r < n; r++) _.__setDigit(r, e.__digit(r));
                for (; r < s; r++) _.__setDigit(r, 0);
                return _
            }
        }, {
            key: "__absoluteXor",
            value: function (e, t) {
                var _ = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
                    n = e.length,
                    l = t.length,
                    g = l;
                if (n < l) {
                    g = n;
                    var a = e,
                        u = n;
                    e = t, n = l, t = a, l = u
                }
                var s = n;
                null === _ ? _ = new o(s, !1) : s = _.length;
                for (var r = 0; r < g; r++) _.__setDigit(r, e.__digit(r) ^ t.__digit(r));
                for (; r < n; r++) _.__setDigit(r, e.__digit(r));
                for (; r < s; r++) _.__setDigit(r, 0);
                return _
            }
        }, {
            key: "__absoluteCompare",
            value: function (e, t) {
                var _ = e.length - t.length;
                if (0 != _) return _;
                for (var n = e.length - 1; 0 <= n && e.__digit(n) === t.__digit(n);) n--;
                return 0 > n ? 0 : e.__unsignedDigit(n) > t.__unsignedDigit(n) ? 1 : -1
            }
        }, {
            key: "__multiplyAccumulate",
            value: function (e, t, _, n) {
                if (0 !== t) {
                    for (var l = 65535 & t, g = t >>> 16, a = 0, u = 0, s = 0, r = 0; r < e.length; r++,
                        n++) {
                        var d = _.__digit(n),
                            h = 65535 & d,
                            b = d >>> 16,
                            m = e.__digit(r),
                            c = 65535 & m,
                            v = m >>> 16,
                            f = o.__imul(c, l),
                            y = o.__imul(c, g),
                            D = o.__imul(v, l),
                            k = o.__imul(v, g);
                        h += u + (65535 & f), b += s + a + (h >>> 16) + (f >>> 16) + (65535 & y) +
                            (65535 & D), a = b >>> 16, u = (y >>> 16) + (D >>> 16) + (65535 & k) +
                            a, a = u >>> 16, u &= 65535, s = k >>> 16, d = 65535 & h | b << 16,
                            _.__setDigit(n, d)
                    }
                    for (; 0 !== a || 0 !== u || 0 !== s; n++) {
                        var p = _.__digit(n),
                            B = (65535 & p) + u,
                            S = (p >>> 16) + (B >>> 16) + s + a;
                        u = 0, s = 0, a = S >>> 16, p = 65535 & B | S << 16, _.__setDigit(n, p)
                    }
                }
            }
        }, {
            key: "__internalMultiplyAdd",
            value: function (e, t, _, l, g) {
                for (var a = _, u = 0, s = 0; s < l; s++) {
                    var r = e.__digit(s),
                        d = o.__imul(65535 & r, t),
                        h = (65535 & d) + u + a;
                    a = h >>> 16;
                    var b = o.__imul(r >>> 16, t),
                        m = (65535 & b) + (d >>> 16) + a;
                    a = m >>> 16, u = b >>> 16, g.__setDigit(s, m << 16 | 65535 & h)
                }
                if (g.length > l)
                    for (g.__setDigit(l++, a + u); l < g.length;) g.__setDigit(l++, 0);
                else if (0 !== a + u) throw new Error("implementation bug")
            }
        }, {
            key: "__absoluteDivSmall",
            value: function (e, t, _) {
                null === _ && (_ = new o(e.length, !1));
                for (var n = 0, l = 2 * e.length - 1; 0 <= l; l -= 2) {
                    var g = (n << 16 | e.__halfDigit(l)) >>> 0,
                        a = 0 | g / t;
                    n = 0 | g % t, g = (n << 16 | e.__halfDigit(l - 1)) >>> 0;
                    var u = 0 | g / t;
                    n = 0 | g % t, _.__setDigit(l >>> 1, a << 16 | u)
                }
                return _
            }
        }, {
            key: "__absoluteModSmall",
            value: function (e, t) {
                for (var _, n = 0, l = 2 * e.length - 1; 0 <= l; l--) _ = (n << 16 | e.__halfDigit(
                    l)) >>> 0, n = 0 | _ % t;
                return n
            }
        }, {
            key: "__absoluteDivLarge",
            value: function (e, t, i, _) {
                var l = t.__halfDigitLength(),
                    n = t.length,
                    g = e.__halfDigitLength() - l,
                    a = null;
                i && (a = new o(g + 2 >>> 1, !1), a.__initializeDigits());
                var s = new o(l + 2 >>> 1, !1);
                s.__initializeDigits();
                var r = o.__clz16(t.__halfDigit(l - 1));
                0 < r && (t = o.__specialLeftShift(t, r, 0));
                for (var d = o.__specialLeftShift(e, r, 1), u = t.__halfDigit(l - 1), h = 0, b =
                        g; 0 <= b; b--) {
                    var m = 65535,
                        v = d.__halfDigit(b + l);
                    if (v !== u) {
                        var f = (v << 16 | d.__halfDigit(b + l - 1)) >>> 0;
                        m = 0 | f / u;
                        for (var y = 0 | f % u, D = t.__halfDigit(l - 2), k = d.__halfDigit(b +
                                l - 2); o.__imul(m, D) >>> 0 > (y << 16 | k) >>> 0 && (m--, y +=
                                u, !(65535 < y)););
                    }
                    o.__internalMultiplyAdd(t, m, 0, n, s);
                    var p = d.__inplaceSub(s, b, l + 1);
                    0 !== p && (p = d.__inplaceAdd(t, b, l), d.__setHalfDigit(b + l, d.__halfDigit(
                        b + l) + p), m--), i && (1 & b ? h = m << 16 : a.__setDigit(b >>>
                        1, h | m))
                }
                return _ ? (d.__inplaceRightShift(r), i ? {
                    quotient: a,
                    remainder: d
                } : d) : i ? a : void 0
            }
        }, {
            key: "__clz16",
            value: function (e) {
                return o.__clz32(e) - 16
            }
        }, {
            key: "__specialLeftShift",
            value: function (e, t, _) {
                var l = e.length,
                    n = new o(l + _, !1);
                if (0 === t) {
                    for (var g = 0; g < l; g++) n.__setDigit(g, e.__digit(g));
                    return 0 < _ && n.__setDigit(l, 0), n
                }
                for (var a, u = 0, s = 0; s < l; s++) a = e.__digit(s), n.__setDigit(s, a << t |
                    u), u = a >>> 32 - t;
                return 0 < _ && n.__setDigit(l, u), n
            }
        }, {
            key: "__leftShiftByAbsolute",
            value: function (e, t) {
                var _ = o.__toShiftAmount(t);
                if (0 > _) throw new RangeError("BigInt too big");
                var n = _ >>> 5,
                    l = 31 & _,
                    g = e.length,
                    a = 0 !== l && 0 != e.__digit(g - 1) >>> 32 - l,
                    u = g + n + (a ? 1 : 0),
                    s = new o(u, e.sign);
                if (0 === l) {
                    for (var r = 0; r < n; r++) s.__setDigit(r, 0);
                    for (; r < u; r++) s.__setDigit(r, e.__digit(r - n))
                } else {
                    for (var h = 0, b = 0; b < n; b++) s.__setDigit(b, 0);
                    for (var m, c = 0; c < g; c++) m = e.__digit(c), s.__setDigit(c + n, m << l |
                        h), h = m >>> 32 - l;
                    if (a) s.__setDigit(g + n, h);
                    else if (0 !== h) throw new Error("implementation bug")
                }
                return s.__trim()
            }
        }, {
            key: "__rightShiftByAbsolute",
            value: function (e, t) {
                var _ = e.length,
                    n = e.sign,
                    l = o.__toShiftAmount(t);
                if (0 > l) return o.__rightShiftByMaximum(n);
                var g = l >>> 5,
                    a = 31 & l,
                    u = _ - g;
                if (0 >= u) return o.__rightShiftByMaximum(n);
                var s = !1;
                if (n) {
                    if (0 != (e.__digit(g) & (1 << a) - 1)) s = !0;
                    else
                        for (var r = 0; r < g; r++)
                            if (0 !== e.__digit(r)) {
                                s = !0;
                                break
                            }
                }
                if (s && 0 === a) {
                    var h = e.__digit(_ - 1);
                    0 == ~h && u++
                }
                var b = new o(u, n);
                if (0 === a) {
                    b.__setDigit(u - 1, 0);
                    for (var m = g; m < _; m++) b.__setDigit(m - g, e.__digit(m))
                } else {
                    for (var c, v = e.__digit(g) >>> a, f = _ - g - 1, y = 0; y < f; y++) c = e
                        .__digit(y + g + 1), b.__setDigit(y, c << 32 - a | v), v = c >>> a;
                    b.__setDigit(f, v)
                }
                return s && (b = o.__absoluteAddOne(b, !0, b)), b.__trim()
            }
        }, {
            key: "__rightShiftByMaximum",
            value: function (e) {
                return e ? o.__oneDigit(1, !0) : o.__zero()
            }
        }, {
            key: "__toShiftAmount",
            value: function (e) {
                if (1 < e.length) return -1;
                var t = e.__unsignedDigit(0);
                return t > o.__kMaxLengthBits ? -1 : t
            }
        }, {
            key: "__toPrimitive",
            value: function (e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] :
                    "default";
                if ("object" !== i(e)) return e;
                if (e.constructor === o) return e;
                var _ = e[Symbol.toPrimitive];
                if (_) {
                    var n = _(t);
                    if ("object" !== i(n)) return n;
                    throw new TypeError("Cannot convert object to primitive value")
                }
                var l = e.valueOf;
                if (l) {
                    var g = l.call(e);
                    if ("object" !== i(g)) return g
                }
                var a = e.toString;
                if (a) {
                    var u = a.call(e);
                    if ("object" !== i(u)) return u
                }
                throw new TypeError("Cannot convert object to primitive value")
            }
        }, {
            key: "__toNumeric",
            value: function (e) {
                return o.__isBigInt(e) ? e : +e
            }
        }, {
            key: "__isBigInt",
            value: function (e) {
                return "object" === i(e) && null !== e && e.constructor === o
            }
        }, {
            key: "__truncateToNBits",
            value: function (e, t) {
                for (var _ = e + 31 >>> 5, n = new o(_, t.sign), l = _ - 1, g = 0; g < l; g++) n
                    .__setDigit(g, t.__digit(g));
                var a = t.__digit(l);
                if (0 != (31 & e)) {
                    var u = 32 - (31 & e);
                    a = a << u >>> u
                }
                return n.__setDigit(l, a), n.__trim()
            }
        }, {
            key: "__truncateAndSubFromPowerOfTwo",
            value: function (e, t, _) {
                for (var n = Math.min, l = e + 31 >>> 5, g = new o(l, _), a = 0, u = l - 1, s =
                        0, r = n(u, t.length); a < r; a++) {
                    var d = t.__digit(a),
                        h = 0 - (65535 & d) - s;
                    s = 1 & h >>> 16;
                    var b = 0 - (d >>> 16) - s;
                    s = 1 & b >>> 16, g.__setDigit(a, 65535 & h | b << 16)
                }
                for (; a < u; a++) g.__setDigit(a, 0 | -s);
                var m, c = u < t.length ? t.__digit(u) : 0,
                    v = 31 & e;
                if (0 === v) {
                    var f = 0 - (65535 & c) - s;
                    s = 1 & f >>> 16;
                    var y = 0 - (c >>> 16) - s;
                    m = 65535 & f | y << 16
                } else {
                    var D = 32 - v;
                    c = c << D >>> D;
                    var k = 1 << 32 - D,
                        p = (65535 & k) - (65535 & c) - s;
                    s = 1 & p >>> 16;
                    var B = (k >>> 16) - (c >>> 16) - s;
                    m = 65535 & p | B << 16, m &= k - 1
                }
                return g.__setDigit(u, m), g.__trim()
            }
        }, {
            key: "__digitPow",
            value: function (e, t) {
                for (var i = 1; 0 < t;) 1 & t && (i *= e), t >>>= 1, e *= e;
                return i
            }
        }]), o
    }(h(Array));
    return D.__kMaxLength = 33554432, D.__kMaxLengthBits = D.__kMaxLength << 5, D.__kMaxBitsPerChar = [0, 0, 32, 51,
            64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149,
            151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166], D.__kBitsPerCharTableShift = 5, D.__kBitsPerCharTableMultiplier =
        1 << D.__kBitsPerCharTableShift, D.__kConversionChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
            "v", "w", "x", "y", "z"], D.__kBitConversionBuffer = new ArrayBuffer(8), D.__kBitConversionDouble = new Float64Array(
            D.__kBitConversionBuffer), D.__kBitConversionInts = new Int32Array(D.__kBitConversionBuffer), D.__clz32 =
        t || function (e) {
            var t = Math.LN2,
                i = Math.log;
            return 0 === e ? 32 : 0 | 31 - (0 | i(e >>> 0) / t)
        }, D.__imul = e || function (e, t) {
            return 0 | e * t
        }, D
});