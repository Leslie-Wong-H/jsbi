(function (_, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define &&
        define.amd ? define(t) : (_ = _ || self, _.JSBI = t())
})(this, function () {
    'use strict';

    function _(_, t) {
        function i() {
            this.constructor = _
        }
        e(_, t), _.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
    }

    function t(_) {
        var t = "function" == typeof Symbol && Symbol.iterator,
            e = t && _[t],
            n = 0;
        if (e) return e.call(_);
        if (_ && "number" == typeof _.length) return {
            next: function () {
                return _ && n >= _.length && (_ = void 0), {
                    value: _ && _[n++],
                    done: !_
                }
            }
        };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }

    function i(_, t) {
        var g = "function" == typeof Symbol && _[Symbol.iterator];
        if (!g) return _;
        var o, s, l = g.call(_),
            i = [];
        try {
            for (;
                (void 0 === t || 0 < t--) && !(o = l.next()).done;) i.push(o.value)
        } catch (_) {
            s = {
                error: _
            }
        } finally {
            try {
                o && !o.done && (g = l["return"]) && g.call(l)
            } finally {
                if (s) throw s.error
            }
        }
        return i
    }
    var e = function (_, t) {
            return e = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function (_, t) {
                _.__proto__ = t
            } || function (_, t) {
                for (var i in t) t.hasOwnProperty(i) && (_[i] = t[i])
            }, e(_, t)
        },
        n = function (e) {
            var n = Math.imul,
                g = Math.clz32,
                o = Math.abs,
                s = Math.max,
                l = Math.floor;

            function a(_, t) {
                var i = e.call(this, _) || this;
                if (i.sign = t, _ > a.__kMaxLength) throw new RangeError("Maximum BigInt size exceeded");
                return i
            }
            return _(a, e), a.BigInt = function (_) {
                    var t = Number.isFinite;
                    if ("number" == typeof _) {
                        if (0 === _) return a.__zero();
                        if (a.__isOneDigitInt(_)) return 0 > _ ? a.__oneDigit(-_, !0) : a.__oneDigit(_, !1);
                        if (!t(_) || l(_) !== _) throw new RangeError("The number " + _ +
                            " cannot be converted to BigInt because it is not an integer");
                        return a.__fromDouble(_)
                    }
                    if ("string" == typeof _) {
                        var i = a.__fromString(_);
                        if (null === i) throw new SyntaxError("Cannot convert " + _ + " to a BigInt");
                        return i
                    }
                    if ("boolean" == typeof _) return !0 === _ ? a.__oneDigit(1, !1) : a.__zero();
                    if ("object" == typeof _) {
                        if (_.constructor === a) return _;
                        var e = a.__toPrimitive(_);
                        return a.BigInt(e)
                    }
                    throw new TypeError("Cannot convert " + _ + " to a BigInt")
                }, a.prototype.toDebugString = function () {
                    var _, i, e = ["BigInt["];
                    try {
                        for (var n, g = t(this), o = g.next(); !o.done; o = g.next()) n = o.value, e.push((n ? (n >>>
                            0).toString(16) : n) + ", ")
                    } catch (t) {
                        _ = {
                            error: t
                        }
                    } finally {
                        try {
                            o && !o.done && (i = g.return) && i.call(g)
                        } finally {
                            if (_) throw _.error
                        }
                    }
                    return e.push("]"), e.join("")
                }, a.prototype.toString = function (_) {
                    if (void 0 === _ && (_ = 10), 2 > _ || 36 < _) throw new RangeError(
                        "toString() radix argument must be between 2 and 36");
                    return 0 === this.length ? "0" : 0 == (_ & _ - 1) ? a.__toStringBasePowerOfTwo(this, _) : a.__toStringGeneric(
                        this, _, !1)
                }, a.prototype.valueOf = function () {
                    throw new Error("Convert JSBI instances to native numbers using `toNumber`.")
                }, a.toNumber = function (_) {
                    var t = _.length;
                    if (0 === t) return 0;
                    if (1 === t) {
                        var i = _.__unsignedDigit(0);
                        return _.sign ? -i : i
                    }
                    var e = _.__digit(t - 1),
                        n = a.__clz30(e),
                        g = 30 * t - n;
                    if (1024 < g) return _.sign ? -Infinity : 1 / 0;
                    var o = g - 1,
                        s = e,
                        l = t - 1,
                        r = n + 3,
                        u = 32 === r ? 0 : s << r;
                    u >>>= 12;
                    var d = r - 12,
                        h = 12 <= r ? 0 : s << 20 + r,
                        b = 20 + r;
                    for (0 < d && 0 < l && (l--, s = _.__digit(l), u |= s >>> 30 - d, h = s << d + 2, b = d + 2); 0 <
                        b && 0 < l;) l--, s = _.__digit(l), h |= 30 <= b ? s << b - 30 : s >>> 30 - b, b -= 30;
                    var m = a.__decideRounding(_, b, l, s);
                    if ((1 === m || 0 === m && 1 == (1 & h)) && (h = h + 1 >>> 0, 0 === h && (u++, 0 != u >>> 20 &&
                            (u = 0, o++, 1023 < o)))) return _.sign ? -Infinity : 1 / 0;
                    var c = _.sign ? -2147483648 : 0;
                    return o = o + 1023 << 20, a.__kBitConversionInts[1] = c | o | u, a.__kBitConversionInts[0] = h,
                        a.__kBitConversionDouble[0]
                }, a.unaryMinus = function (_) {
                    if (0 === _.length) return _;
                    var t = _.__copy();
                    return t.sign = !_.sign, t
                }, a.bitwiseNot = function (_) {
                    return _.sign ? a.__absoluteSubOne(_).__trim() : a.__absoluteAddOne(_, !0)
                }, a.exponentiate = function (_, t) {
                    if (t.sign) throw new RangeError("Exponent must be positive");
                    if (0 === t.length) return a.__oneDigit(1, !1);
                    if (0 === _.length) return _;
                    if (1 === _.length && 1 === _.__digit(0)) return _.sign && 0 == (1 & t.__digit(0)) ? a.unaryMinus(
                        _) : _;
                    if (1 < t.length) throw new RangeError("BigInt too big");
                    var i = t.__unsignedDigit(0);
                    if (1 === i) return _;
                    if (i >= a.__kMaxLengthBits) throw new RangeError("BigInt too big");
                    if (1 === _.length && 2 === _.__digit(0)) {
                        var e = 1 + (0 | i / 30),
                            n = _.sign && 0 != (1 & i),
                            g = new a(e, n);
                        g.__initializeDigits();
                        var o = 1 << i % 30;
                        return g.__setDigit(e - 1, o), g
                    }
                    var s = null,
                        l = _;
                    for (0 != (1 & i) && (s = _), i >>= 1; 0 !== i; i >>= 1) l = a.multiply(l, l), 0 != (1 & i) &&
                        (null === s ? s = l : s = a.multiply(s, l));
                    return s
                }, a.multiply = function (_, t) {
                    if (0 === _.length) return _;
                    if (0 === t.length) return t;
                    var e = _.length + t.length;
                    30 <= _.__clzmsd() + t.__clzmsd() && e--;
                    var n = new a(e, _.sign !== t.sign);
                    n.__initializeDigits();
                    for (var g = 0; g < _.length; g++) a.__multiplyAccumulate(t, _.__digit(g), n, g);
                    return n.__trim()
                }, a.divide = function (_, t) {
                    if (0 === t.length) throw new RangeError("Division by zero");
                    if (0 > a.__absoluteCompare(_, t)) return a.__zero();
                    var i, e = _.sign !== t.sign,
                        n = t.__unsignedDigit(0);
                    if (1 === t.length && 32767 >= n) {
                        if (1 === n) return e === _.sign ? _ : a.unaryMinus(_);
                        i = a.__absoluteDivSmall(_, n, null)
                    } else i = a.__absoluteDivLarge(_, t, !0, !1);
                    return i.sign = e, i.__trim()
                }, a.remainder = function (_, t) {
                    if (0 === t.length) throw new RangeError("Division by zero");
                    if (0 > a.__absoluteCompare(_, t)) return _;
                    var i = t.__unsignedDigit(0);
                    if (1 === t.length && 32767 >= i) {
                        if (1 === i) return a.__zero();
                        var e = a.__absoluteModSmall(_, i);
                        return 0 === e ? a.__zero() : a.__oneDigit(e, _.sign)
                    }
                    var n = a.__absoluteDivLarge(_, t, !1, !0);
                    return n.sign = _.sign, n.__trim()
                }, a.add = function (_, t) {
                    var i = _.sign;
                    return i === t.sign ? a.__absoluteAdd(_, t, i) : 0 <= a.__absoluteCompare(_, t) ? a.__absoluteSub(
                        _, t, i) : a.__absoluteSub(t, _, !i)
                }, a.subtract = function (_, t) {
                    var i = _.sign;
                    return i === t.sign ? 0 <= a.__absoluteCompare(_, t) ? a.__absoluteSub(_, t, i) : a.__absoluteSub(
                        t, _, !i) : a.__absoluteAdd(_, t, i)
                }, a.leftShift = function (_, t) {
                    return 0 === t.length || 0 === _.length ? _ : t.sign ? a.__rightShiftByAbsolute(_, t) : a.__leftShiftByAbsolute(
                        _, t)
                }, a.signedRightShift = function (_, t) {
                    return 0 === t.length || 0 === _.length ? _ : t.sign ? a.__leftShiftByAbsolute(_, t) : a.__rightShiftByAbsolute(
                        _, t)
                }, a.unsignedRightShift = function () {
                    throw new TypeError("BigInts have no unsigned right shift; use >> instead")
                }, a.lessThan = function (_, t) {
                    return 0 > a.__compareToBigInt(_, t)
                }, a.lessThanOrEqual = function (_, t) {
                    return 0 >= a.__compareToBigInt(_, t)
                }, a.greaterThan = function (_, t) {
                    return 0 < a.__compareToBigInt(_, t)
                }, a.greaterThanOrEqual = function (_, t) {
                    return 0 <= a.__compareToBigInt(_, t)
                }, a.equal = function (_, t) {
                    if (_.sign !== t.sign) return !1;
                    if (_.length !== t.length) return !1;
                    for (var e = 0; e < _.length; e++)
                        if (_.__digit(e) !== t.__digit(e)) return !1;
                    return !0
                }, a.notEqual = function (_, t) {
                    return !a.equal(_, t)
                }, a.bitwiseAnd = function (_, t) {
                    var e;
                    if (!_.sign && !t.sign) return a.__absoluteAnd(_, t).__trim();
                    if (_.sign && t.sign) {
                        var n = s(_.length, t.length) + 1,
                            g = a.__absoluteSubOne(_, n),
                            o = a.__absoluteSubOne(t);
                        return g = a.__absoluteOr(g, o, g), a.__absoluteAddOne(g, !0, g).__trim()
                    }
                    return _.sign && (e = i([t, _], 2), _ = e[0], t = e[1]), a.__absoluteAndNot(_, a.__absoluteSubOne(
                        t)).__trim()
                }, a.bitwiseXor = function (_, t) {
                    var e;
                    if (!_.sign && !t.sign) return a.__absoluteXor(_, t).__trim();
                    if (_.sign && t.sign) {
                        var n = s(_.length, t.length),
                            g = a.__absoluteSubOne(_, n),
                            o = a.__absoluteSubOne(t);
                        return a.__absoluteXor(g, o, g).__trim()
                    }
                    var l = s(_.length, t.length) + 1;
                    _.sign && (e = i([t, _], 2), _ = e[0], t = e[1]);
                    var r = a.__absoluteSubOne(t, l);
                    return r = a.__absoluteXor(r, _, r), a.__absoluteAddOne(r, !0, r).__trim()
                }, a.bitwiseOr = function (_, t) {
                    var e, n = s(_.length, t.length);
                    if (!_.sign && !t.sign) return a.__absoluteOr(_, t).__trim();
                    if (_.sign && t.sign) {
                        var g = a.__absoluteSubOne(_, n),
                            o = a.__absoluteSubOne(t);
                        return g = a.__absoluteAnd(g, o, g), a.__absoluteAddOne(g, !0, g).__trim()
                    }
                    _.sign && (e = i([t, _], 2), _ = e[0], t = e[1]);
                    var l = a.__absoluteSubOne(t, n);
                    return l = a.__absoluteAndNot(l, _, l), a.__absoluteAddOne(l, !0, l).__trim()
                }, a.asIntN = function (_, t) {
                    if (0 === t.length) return t;
                    if (_ = l(_), 0 > _) throw new RangeError("Invalid value: not (convertible to) a safe integer");
                    if (0 === _) return a.__zero();
                    if (_ >= a.__kMaxLengthBits) return t;
                    var e = 0 | (_ + 29) / 30;
                    if (t.length < e) return t;
                    var g = t.__unsignedDigit(e - 1),
                        o = 1 << (_ - 1) % 30;
                    if (t.length === e && g < o) return t;
                    if (!((g & o) === o)) return a.__truncateToNBits(_, t);
                    if (!t.sign) return a.__truncateAndSubFromPowerOfTwo(_, t, !0);
                    if (0 == (g & o - 1)) {
                        for (var s = e - 2; 0 <= s; s--)
                            if (0 !== t.__digit(s)) return a.__truncateAndSubFromPowerOfTwo(_, t, !1);
                        return t.length === e && g === o ? t : a.__truncateToNBits(_, t)
                    }
                    return a.__truncateAndSubFromPowerOfTwo(_, t, !1)
                }, a.asUintN = function (_, t) {
                    if (0 === t.length) return t;
                    if (_ = l(_), 0 > _) throw new RangeError("Invalid value: not (convertible to) a safe integer");
                    if (0 === _) return a.__zero();
                    if (t.sign) {
                        if (_ > a.__kMaxLengthBits) throw new RangeError("BigInt too big");
                        return a.__truncateAndSubFromPowerOfTwo(_, t, !1)
                    }
                    if (_ >= a.__kMaxLengthBits) return t;
                    var i = 0 | (_ + 29) / 30;
                    if (t.length < i) return t;
                    var e = _ % 30;
                    if (t.length == i) {
                        if (0 === e) return t;
                        var g = t.__digit(i - 1);
                        if (0 == g >>> e) return t
                    }
                    return a.__truncateToNBits(_, t)
                }, a.ADD = function (_, t) {
                    if (_ = a.__toPrimitive(_), t = a.__toPrimitive(t), "string" == typeof _) return "string" !=
                        typeof t && (t = t.toString()), _ + t;
                    if ("string" == typeof t) return _.toString() + t;
                    if (_ = a.__toNumeric(_), t = a.__toNumeric(t), a.__isBigInt(_) && a.__isBigInt(t)) return a.add(
                        _, t);
                    if ("number" == typeof _ && "number" == typeof t) return _ + t;
                    throw new TypeError("Cannot mix BigInt and other types, use explicit conversions")
                }, a.LT = function (_, t) {
                    return a.__compare(_, t, 0)
                }, a.LE = function (_, t) {
                    return a.__compare(_, t, 1)
                }, a.GT = function (_, t) {
                    return a.__compare(_, t, 2)
                }, a.GE = function (_, t) {
                    return a.__compare(_, t, 3)
                }, a.EQ = function (_, t) {
                    for (;;) {
                        if (a.__isBigInt(_)) return a.__isBigInt(t) ? a.equal(_, t) : a.EQ(t, _);
                        if ("number" == typeof _) {
                            if (a.__isBigInt(t)) return a.__equalToNumber(t, _);
                            if ("object" != typeof t) return _ == t;
                            t = a.__toPrimitive(t)
                        } else if ("string" == typeof _) {
                            if (a.__isBigInt(t)) return _ = a.__fromString(_), null !== _ && a.equal(_, t);
                            if ("object" != typeof t) return _ == t;
                            t = a.__toPrimitive(t)
                        } else if ("boolean" == typeof _) {
                            if (a.__isBigInt(t)) return a.__equalToNumber(t, +_);
                            if ("object" != typeof t) return _ == t;
                            t = a.__toPrimitive(t)
                        } else if ("symbol" == typeof _) {
                            if (a.__isBigInt(t)) return !1;
                            if ("object" != typeof t) return _ == t;
                            t = a.__toPrimitive(t)
                        } else if ("object" == typeof _) {
                            if ("object" == typeof t && t.constructor !== a) return _ == t;
                            _ = a.__toPrimitive(_)
                        } else return _ == t
                    }
                }, a.NE = function (_, t) {
                    return !a.EQ(_, t)
                }, a.__zero = function () {
                    return new a(0, !1)
                }, a.__oneDigit = function (_, t) {
                    var i = new a(1, t);
                    return i.__setDigit(0, _), i
                }, a.prototype.__copy = function () {
                    for (var _ = new a(this.length, this.sign), t = 0; t < this.length; t++) _[t] = this[t];
                    return _
                }, a.prototype.__trim = function () {
                    for (var _ = this.length, t = this[_ - 1]; 0 === t;) _--, t = this[_ - 1], this.pop();
                    return 0 === _ && (this.sign = !1), this
                }, a.prototype.__initializeDigits = function () {
                    for (var _ = 0; _ < this.length; _++) this[_] = 0
                }, a.__decideRounding = function (_, t, i, e) {
                    if (0 < t) return -1;
                    var n;
                    if (0 > t) n = -t - 1;
                    else {
                        if (0 === i) return -1;
                        i--, e = _.__digit(i), n = 29
                    }
                    var g = 1 << n;
                    if (0 == (e & g)) return -1;
                    if (g -= 1, 0 != (e & g)) return 1;
                    for (; 0 < i;)
                        if (i--, 0 !== _.__digit(i)) return 1;
                    return 0
                }, a.__fromDouble = function (_) {
                    a.__kBitConversionDouble[0] = _;
                    var t, i = 2047 & a.__kBitConversionInts[1] >>> 20,
                        e = i - 1023,
                        n = (0 | e / 30) + 1,
                        g = new a(n, 0 > _),
                        o = 1048575 & a.__kBitConversionInts[1] | 1048576,
                        s = a.__kBitConversionInts[0],
                        l = 20,
                        r = e % 30,
                        u = 0;
                    if (r < l) {
                        var d = l - r;
                        u = d + 32, t = o >>> d, o = o << 32 - d | s >>> d, s <<= 32 - d
                    } else if (r === l) u = 32, t = o, o = s, s = 0;
                    else {
                        var d = r - l;
                        u = 32 - d, t = o << d | s >>> 32 - d, o = s << d, s = 0
                    }
                    g.__setDigit(n - 1, t);
                    for (var h = n - 2; 0 <= h; h--) 0 < u ? (u -= 30, t = o >>> 2, o = o << 30 | s >>> 2, s <<= 30) :
                        t = 0, g.__setDigit(h, t);
                    return g.__trim()
                }, a.__isWhitespace = function (_) {
                    return !!(13 >= _ && 9 <= _) || (159 >= _ ? 32 == _ : 131071 >= _ ? 160 == _ || 5760 == _ :
                        196607 >= _ ? (_ &= 131071, 10 >= _ || 40 == _ || 41 == _ || 47 == _ || 95 == _ || 4096 ==
                            _) : 65279 == _)
                }, a.__fromString = function (_, t) {
                    void 0 === t && (t = 0);
                    var i = 0,
                        e = _.length,
                        n = 0;
                    if (n === e) return a.__zero();
                    for (var g = _.charCodeAt(n); a.__isWhitespace(g);) {
                        if (++n === e) return a.__zero();
                        g = _.charCodeAt(n)
                    }
                    if (43 === g) {
                        if (++n === e) return null;
                        g = _.charCodeAt(n), i = 1
                    } else if (45 === g) {
                        if (++n === e) return null;
                        g = _.charCodeAt(n), i = -1
                    }
                    if (0 === t) {
                        if (t = 10, 48 === g) {
                            if (++n === e) return a.__zero();
                            if (g = _.charCodeAt(n), 88 === g || 120 === g) {
                                if (t = 16, ++n === e) return null;
                                g = _.charCodeAt(n)
                            } else if (79 === g || 111 === g) {
                                if (t = 8, ++n === e) return null;
                                g = _.charCodeAt(n)
                            } else if (66 === g || 98 === g) {
                                if (t = 2, ++n === e) return null;
                                g = _.charCodeAt(n)
                            }
                        }
                    } else if (16 === t && 48 === g) {
                        if (++n === e) return a.__zero();
                        if (g = _.charCodeAt(n), 88 === g || 120 === g) {
                            if (++n === e) return null;
                            g = _.charCodeAt(n)
                        }
                    }
                    if (0 != i && 10 !== t) return null;
                    for (; 48 === g;) {
                        if (++n === e) return a.__zero();
                        g = _.charCodeAt(n)
                    }
                    var o = e - n,
                        s = a.__kMaxBitsPerChar[t],
                        l = a.__kBitsPerCharTableMultiplier - 1;
                    if (o > 1073741824 / s) return null;
                    var r = s * o + l >>> a.__kBitsPerCharTableShift,
                        u = new a(0 | (r + 29) / 30, !1),
                        h = 10 > t ? t : 10,
                        b = 10 < t ? t - 10 : 0;
                    if (0 == (t & t - 1)) {
                        s >>= a.__kBitsPerCharTableShift;
                        var c = [],
                            p = [],
                            D = !1;
                        do {
                            for (var f, B = 0, S = 0;;) {
                                if (f = void 0, g - 48 >>> 0 < h) f = g - 48;
                                else if ((32 | g) - 97 >>> 0 < b) f = (32 | g) - 87;
                                else {
                                    D = !0;
                                    break
                                }
                                if (S += s, B = B << s | f, ++n === e) {
                                    D = !0;
                                    break
                                }
                                if (g = _.charCodeAt(n), 30 < S + s) break
                            }
                            c.push(B), p.push(S)
                        } while (!D);
                        a.__fillFromParts(u, c, p)
                    } else {
                        u.__initializeDigits();
                        var D = !1,
                            v = 0;
                        do {
                            for (var f, B = 0, C = 1;;) {
                                if (f = void 0, g - 48 >>> 0 < h) f = g - 48;
                                else if ((32 | g) - 97 >>> 0 < b) f = (32 | g) - 87;
                                else {
                                    D = !0;
                                    break
                                }
                                var y = C * t;
                                if (1073741823 < y) break;
                                if (C = y, B = B * t + f, v++, ++n === e) {
                                    D = !0;
                                    break
                                }
                                g = _.charCodeAt(n)
                            }
                            l = 30 * a.__kBitsPerCharTableMultiplier - 1;
                            var m = 0 | (s * v + l >>> a.__kBitsPerCharTableShift) / 30;
                            u.__inplaceMultiplyAdd(C, B, m)
                        } while (!D)
                    }
                    if (n !== e) {
                        if (!a.__isWhitespace(g)) return null;
                        for (n++; n < e; n++)
                            if (g = _.charCodeAt(n), !a.__isWhitespace(g)) return null
                    }
                    return u.sign = -1 == i, u.__trim()
                }, a.__fillFromParts = function (_, t, e) {
                    for (var n = 0, g = 0, o = 0, s = t.length - 1; 0 <= s; s--) {
                        var l = t[s],
                            r = e[s];
                        g |= l << o, o += r, 30 === o ? (_.__setDigit(n++, g), o = 0, g = 0) : 30 < o && (_.__setDigit(
                            n++, 1073741823 & g), o -= 30, g = l >>> r - o)
                    }
                    if (0 !== g) {
                        if (n >= _.length) throw new Error("implementation bug");
                        _.__setDigit(n++, g)
                    }
                    for (; n < _.length; n++) _.__setDigit(n, 0)
                }, a.__toStringBasePowerOfTwo = function (_, t) {
                    var e = _.length,
                        n = t - 1;
                    n = (85 & n >>> 1) + (85 & n), n = (51 & n >>> 2) + (51 & n), n = (15 & n >>> 4) + (15 & n);
                    var g = n,
                        o = t - 1,
                        s = _.__digit(e - 1),
                        l = a.__clz30(s),
                        r = 0 | (30 * e - l + g - 1) / g;
                    if (_.sign && r++, 268435456 < r) throw new Error("string too long");
                    for (var u = Array(r), d = r - 1, h = 0, b = 0, m = 0; m < e - 1; m++) {
                        var c = _.__digit(m),
                            p = (h | c << b) & o;
                        u[d--] = a.__kConversionChars[p];
                        var D = g - b;
                        for (h = c >>> D, b = 30 - D; b >= g;) u[d--] = a.__kConversionChars[h & o], h >>>= g, b -=
                            g
                    }
                    var f = (h | s << b) & o;
                    for (u[d--] = a.__kConversionChars[f], h = s >>> g - b; 0 !== h;) u[d--] = a.__kConversionChars[
                        h & o], h >>>= g;
                    if (_.sign && (u[d--] = "-"), -1 !== d) throw new Error("implementation bug");
                    return u.join("")
                }, a.__toStringGeneric = function (_, t, e) {
                    var n = _.length;
                    if (0 === n) return "";
                    if (1 === n) {
                        var g = _.__unsignedDigit(0).toString(t);
                        return !1 === e && _.sign && (g = "-" + g), g
                    }
                    var o = 30 * n - a.__clz30(_.__digit(n - 1)),
                        s = a.__kMaxBitsPerChar[t],
                        l = s - 1,
                        r = o * a.__kBitsPerCharTableMultiplier;
                    r += l - 1, r = 0 | r / l;
                    var u, d, h = r + 1 >> 1,
                        b = a.exponentiate(a.__oneDigit(t, !1), a.__oneDigit(h, !1)),
                        m = b.__unsignedDigit(0);
                    if (1 === b.length && 32767 >= m) {
                        u = new a(_.length, !1), u.__initializeDigits();
                        for (var c, p = 0, D = 2 * _.length - 1; 0 <= D; D--) c = p << 15 | _.__halfDigit(D), u.__setHalfDigit(
                            D, 0 | c / m), p = 0 | c % m;
                        d = p.toString(t)
                    } else {
                        var f = a.__absoluteDivLarge(_, b, !0, !0);
                        u = f.quotient;
                        var p = f.remainder.__trim();
                        d = a.__toStringGeneric(p, t, !0)
                    }
                    u.__trim();
                    for (var B = a.__toStringGeneric(u, t, !0); d.length < h;) d = "0" + d;
                    return !1 === e && _.sign && (B = "-" + B), B + d
                }, a.__unequalSign = function (_) {
                    return _ ? -1 : 1
                }, a.__absoluteGreater = function (_) {
                    return _ ? -1 : 1
                }, a.__absoluteLess = function (_) {
                    return _ ? 1 : -1
                }, a.__compareToBigInt = function (_, t) {
                    var i = _.sign;
                    if (i !== t.sign) return a.__unequalSign(i);
                    var e = a.__absoluteCompare(_, t);
                    return 0 < e ? a.__absoluteGreater(i) : 0 > e ? a.__absoluteLess(i) : 0
                }, a.__compareToNumber = function (_, t) {
                    if (a.__isOneDigitInt(t)) {
                        var i = _.sign,
                            e = 0 > t;
                        if (i !== e) return a.__unequalSign(i);
                        if (0 === _.length) {
                            if (e) throw new Error("implementation bug");
                            return 0 === t ? 0 : -1
                        }
                        if (1 < _.length) return a.__absoluteGreater(i);
                        var n = o(t),
                            g = _.__unsignedDigit(0);
                        return g > n ? a.__absoluteGreater(i) : g < n ? a.__absoluteLess(i) : 0
                    }
                    return a.__compareToDouble(_, t)
                }, a.__compareToDouble = function (_, t) {
                    if (t !== t) return t;
                    if (t === 1 / 0) return -1;
                    if (t === -Infinity) return 1;
                    var i = _.sign;
                    if (i !== 0 > t) return a.__unequalSign(i);
                    if (0 === t) throw new Error("implementation bug: should be handled elsewhere");
                    if (0 === _.length) return -1;
                    a.__kBitConversionDouble[0] = t;
                    var e = 2047 & a.__kBitConversionInts[1] >>> 20;
                    if (2047 == e) throw new Error("implementation bug: handled elsewhere");
                    var n = e - 1023;
                    if (0 > n) return a.__absoluteGreater(i);
                    var g = _.length,
                        o = _.__digit(g - 1),
                        s = a.__clz30(o),
                        l = 30 * g - s,
                        r = n + 1;
                    if (l < r) return a.__absoluteLess(i);
                    if (l > r) return a.__absoluteGreater(i);
                    var u = 1048576 | 1048575 & a.__kBitConversionInts[1],
                        d = a.__kBitConversionInts[0],
                        h = 20,
                        b = 29 - s;
                    if (b !== (0 | (l - 1) % 30)) throw new Error("implementation bug");
                    var m, c = 0;
                    if (b < h) {
                        var p = h - b;
                        c = p + 32, m = u >>> p, u = u << 32 - p | d >>> p, d <<= 32 - p
                    } else if (b === h) c = 32, m = u, u = d, d = 0;
                    else {
                        var p = b - h;
                        c = 32 - p, m = u << p | d >>> 32 - p, u = d << p, d = 0
                    }
                    if (o >>>= 0, m >>>= 0, o > m) return a.__absoluteGreater(i);
                    if (o < m) return a.__absoluteLess(i);
                    for (var D = g - 2; 0 <= D; D--) {
                        0 < c ? (c -= 30, m = u >>> 2, u = u << 30 | d >>> 2, d <<= 30) : m = 0;
                        var f = _.__unsignedDigit(D);
                        if (f > m) return a.__absoluteGreater(i);
                        if (f < m) return a.__absoluteLess(i)
                    }
                    if (0 !== u || 0 !== d) {
                        if (0 === c) throw new Error("implementation bug");
                        return a.__absoluteLess(i)
                    }
                    return 0
                }, a.__equalToNumber = function (_, t) {
                    return a.__isOneDigitInt(t) ? 0 === t ? 0 === _.length : 1 === _.length && _.sign === 0 > t &&
                        _.__unsignedDigit(0) === o(t) : 0 === a.__compareToDouble(_, t)
                }, a.__comparisonResultToBool = function (_, t) {
                    return 0 === t ? 0 > _ : 1 === t ? 0 >= _ : 2 === t ? 0 < _ : 3 === t ? 0 <= _ : void 0
                }, a.__compare = function (_, t, i) {
                    if (_ = a.__toPrimitive(_), t = a.__toPrimitive(t), "string" == typeof _ && "string" == typeof t)
                        switch (i) {
                            case 0:
                                return _ < t;
                            case 1:
                                return _ <= t;
                            case 2:
                                return _ > t;
                            case 3:
                                return _ >= t;
                        }
                    if (a.__isBigInt(_) && "string" == typeof t) return t = a.__fromString(t), null !== t && a.__comparisonResultToBool(
                        a.__compareToBigInt(_, t), i);
                    if ("string" == typeof _ && a.__isBigInt(t)) return _ = a.__fromString(_), null !== _ && a.__comparisonResultToBool(
                        a.__compareToBigInt(_, t), i);
                    if (_ = a.__toNumeric(_), t = a.__toNumeric(t), a.__isBigInt(_)) {
                        if (a.__isBigInt(t)) return a.__comparisonResultToBool(a.__compareToBigInt(_, t), i);
                        if ("number" != typeof t) throw new Error("implementation bug");
                        return a.__comparisonResultToBool(a.__compareToNumber(_, t), i)
                    }
                    if ("number" != typeof _) throw new Error("implementation bug");
                    if (a.__isBigInt(t)) return a.__comparisonResultToBool(a.__compareToNumber(t, _), 2 ^ i);
                    if ("number" != typeof t) throw new Error("implementation bug");
                    return 0 === i ? _ < t : 1 === i ? _ <= t : 2 === i ? _ > t : 3 === i ? _ >= t : void 0
                }, a.prototype.__clzmsd = function () {
                    return a.__clz30(this.__digit(this.length - 1))
                }, a.__absoluteAdd = function (_, t, e) {
                    if (_.length < t.length) return a.__absoluteAdd(t, _, e);
                    if (0 === _.length) return _;
                    if (0 === t.length) return _.sign === e ? _ : a.unaryMinus(_);
                    var n = _.length;
                    (0 === _.__clzmsd() || t.length === _.length && 0 === t.__clzmsd()) && n++;
                    for (var g, o = new a(n, e), s = 0, l = 0; l < t.length; l++) g = _.__digit(l) + t.__digit(l) +
                        s, s = g >>> 30, o.__setDigit(l, 1073741823 & g);
                    for (; l < _.length; l++) {
                        var g = _.__digit(l) + s;
                        s = g >>> 30, o.__setDigit(l, 1073741823 & g)
                    }
                    return l < o.length && o.__setDigit(l, s), o.__trim()
                }, a.__absoluteSub = function (_, t, e) {
                    if (0 === _.length) return _;
                    if (0 === t.length) return _.sign === e ? _ : a.unaryMinus(_);
                    for (var n, g = new a(_.length, e), o = 0, s = 0; s < t.length; s++) n = _.__digit(s) - t.__digit(
                        s) - o, o = 1 & n >>> 30, g.__setDigit(s, 1073741823 & n);
                    for (; s < _.length; s++) {
                        var n = _.__digit(s) - o;
                        o = 1 & n >>> 30, g.__setDigit(s, 1073741823 & n)
                    }
                    return g.__trim()
                }, a.__absoluteAddOne = function (_, t, e) {
                    void 0 === e && (e = null);
                    var n = _.length;
                    null === e ? e = new a(n, t) : e.sign = t;
                    for (var g, o = 1, s = 0; s < n; s++) g = _.__digit(s) + o, o = g >>> 30, e.__setDigit(s,
                        1073741823 & g);
                    return 0 !== o && e.__setDigitGrow(n, 1), e
                }, a.__absoluteSubOne = function (_, t) {
                    var e = _.length;
                    t = t || e;
                    for (var n, g = new a(t, !1), o = 1, s = 0; s < e; s++) n = _.__digit(s) - o, o = 1 & n >>> 30,
                        g.__setDigit(s, 1073741823 & n);
                    if (0 !== o) throw new Error("implementation bug");
                    for (var s = e; s < t; s++) g.__setDigit(s, 0);
                    return g
                }, a.__absoluteAnd = function (_, t, e) {
                    void 0 === e && (e = null);
                    var n = _.length,
                        g = t.length,
                        o = g;
                    if (n < g) {
                        o = n;
                        var s = _,
                            l = n;
                        _ = t, n = g, t = s, g = l
                    }
                    var r = o;
                    null === e ? e = new a(r, !1) : r = e.length;
                    for (var u = 0; u < o; u++) e.__setDigit(u, _.__digit(u) & t.__digit(u));
                    for (; u < r; u++) e.__setDigit(u, 0);
                    return e
                }, a.__absoluteAndNot = function (_, t, e) {
                    void 0 === e && (e = null);
                    var n = _.length,
                        g = t.length,
                        o = g;
                    n < g && (o = n);
                    var s = n;
                    null === e ? e = new a(s, !1) : s = e.length;
                    for (var l = 0; l < o; l++) e.__setDigit(l, _.__digit(l) & ~t.__digit(l));
                    for (; l < n; l++) e.__setDigit(l, _.__digit(l));
                    for (; l < s; l++) e.__setDigit(l, 0);
                    return e
                }, a.__absoluteOr = function (_, t, e) {
                    void 0 === e && (e = null);
                    var n = _.length,
                        g = t.length,
                        o = g;
                    if (n < g) {
                        o = n;
                        var s = _,
                            l = n;
                        _ = t, n = g, t = s, g = l
                    }
                    var r = n;
                    null === e ? e = new a(r, !1) : r = e.length;
                    for (var u = 0; u < o; u++) e.__setDigit(u, _.__digit(u) | t.__digit(u));
                    for (; u < n; u++) e.__setDigit(u, _.__digit(u));
                    for (; u < r; u++) e.__setDigit(u, 0);
                    return e
                }, a.__absoluteXor = function (_, t, e) {
                    void 0 === e && (e = null);
                    var n = _.length,
                        g = t.length,
                        o = g;
                    if (n < g) {
                        o = n;
                        var s = _,
                            l = n;
                        _ = t, n = g, t = s, g = l
                    }
                    var r = n;
                    null === e ? e = new a(r, !1) : r = e.length;
                    for (var u = 0; u < o; u++) e.__setDigit(u, _.__digit(u) ^ t.__digit(u));
                    for (; u < n; u++) e.__setDigit(u, _.__digit(u));
                    for (; u < r; u++) e.__setDigit(u, 0);
                    return e
                }, a.__absoluteCompare = function (_, t) {
                    var e = _.length - t.length;
                    if (0 != e) return e;
                    for (var n = _.length - 1; 0 <= n && _.__digit(n) === t.__digit(n);) n--;
                    return 0 > n ? 0 : _.__unsignedDigit(n) > t.__unsignedDigit(n) ? 1 : -1
                }, a.__multiplyAccumulate = function (_, t, e, n) {
                    if (0 !== t) {
                        for (var g = 32767 & t, o = t >>> 15, s = 0, l = 0, r = 0; r < _.length; r++, n++) {
                            var u = e.__digit(n),
                                d = _.__digit(r),
                                h = 32767 & d,
                                b = d >>> 15,
                                m = a.__imul(h, g),
                                c = a.__imul(h, o),
                                p = a.__imul(b, g),
                                D = a.__imul(b, o);
                            u += l + m + s, s = u >>> 30, u &= 1073741823, u += ((32767 & c) << 15) + ((32767 & p) <<
                                15), s += u >>> 30, l = D + (c >>> 15) + (p >>> 15), e.__setDigit(n, 1073741823 &
                                u)
                        }
                        for (; 0 !== s || 0 !== l; n++) {
                            var u = e.__digit(n);
                            u += s + l, l = 0, s = u >>> 30, e.__setDigit(n, 1073741823 & u)
                        }
                    }
                }, a.__internalMultiplyAdd = function (_, t, e, g, o) {
                    for (var s = e, l = 0, u = 0; u < g; u++) {
                        var d = _.__digit(u),
                            h = a.__imul(32767 & d, t),
                            b = a.__imul(d >>> 15, t),
                            m = h + ((32767 & b) << 15) + l + s;
                        s = m >>> 30, l = b >>> 15, o.__setDigit(u, 1073741823 & m)
                    }
                    if (o.length > g)
                        for (o.__setDigit(g++, s + l); g < o.length;) o.__setDigit(g++, 0);
                    else if (0 !== s + l) throw new Error("implementation bug")
                }, a.prototype.__inplaceMultiplyAdd = function (_, t, e) {
                    e > this.length && (e = this.length);
                    for (var n = 32767 & _, g = _ >>> 15, o = 0, s = t, l = 0; l < e; l++) {
                        var r = this.__digit(l),
                            u = 32767 & r,
                            d = r >>> 15,
                            h = a.__imul(u, n),
                            b = a.__imul(u, g),
                            m = a.__imul(d, n),
                            c = a.__imul(d, g),
                            p = s + h + o;
                        o = p >>> 30, p &= 1073741823, p += ((32767 & b) << 15) + ((32767 & m) << 15), o += p >>>
                            30, s = c + (b >>> 15) + (m >>> 15), this.__setDigit(l, 1073741823 & p)
                    }
                    if (0 !== o || 0 !== s) throw new Error("implementation bug")
                }, a.__absoluteDivSmall = function (_, t, e) {
                    void 0 === e && (e = null), null === e && (e = new a(_.length, !1));
                    for (var n = 0, g = 2 * _.length - 1; 0 <= g; g -= 2) {
                        var o = (n << 15 | _.__halfDigit(g)) >>> 0,
                            s = 0 | o / t;
                        n = 0 | o % t, o = (n << 15 | _.__halfDigit(g - 1)) >>> 0;
                        var l = 0 | o / t;
                        n = 0 | o % t, e.__setDigit(g >>> 1, s << 15 | l)
                    }
                    return e
                }, a.__absoluteModSmall = function (_, t) {
                    for (var e, n = 0, g = 2 * _.length - 1; 0 <= g; g--) e = (n << 15 | _.__halfDigit(g)) >>> 0, n =
                        0 | e % t;
                    return n
                }, a.__absoluteDivLarge = function (_, t, i, e) {
                    var g = t.__halfDigitLength(),
                        n = t.length,
                        o = _.__halfDigitLength() - g,
                        s = null;
                    i && (s = new a(o + 2 >>> 1, !1), s.__initializeDigits());
                    var l = new a(g + 2 >>> 1, !1);
                    l.__initializeDigits();
                    var r = a.__clz15(t.__halfDigit(g - 1));
                    0 < r && (t = a.__specialLeftShift(t, r, 0));
                    for (var d = a.__specialLeftShift(_, r, 1), u = t.__halfDigit(g - 1), h = 0, b = o; 0 <= b; b--) {
                        var m = 32767,
                            p = d.__halfDigit(b + g);
                        if (p !== u) {
                            var D = (p << 15 | d.__halfDigit(b + g - 1)) >>> 0;
                            m = 0 | D / u;
                            for (var f = 0 | D % u, B = t.__halfDigit(g - 2), S = d.__halfDigit(b + g - 2); a.__imul(
                                    m, B) >>> 0 > (f << 16 | S) >>> 0 && (m--, f += u, !(32767 < f)););
                        }
                        a.__internalMultiplyAdd(t, m, 0, n, l);
                        var v = d.__inplaceSub(l, b, g + 1);
                        0 !== v && (v = d.__inplaceAdd(t, b, g), d.__setHalfDigit(b + g, 32767 & d.__halfDigit(b +
                            g) + v), m--), i && (1 & b ? h = m << 15 : s.__setDigit(b >>> 1, h | m))
                    }
                    if (e) return d.__inplaceRightShift(r), i ? {
                        quotient: s,
                        remainder: d
                    } : d;
                    if (i) return s;
                    throw new Error("unreachable")
                }, a.__clz15 = function (_) {
                    return a.__clz30(_) - 15
                }, a.prototype.__inplaceAdd = function (_, t, e) {
                    for (var n, g = 0, o = 0; o < e; o++) n = this.__halfDigit(t + o) + _.__halfDigit(o) + g, g = n >>>
                        15, this.__setHalfDigit(t + o, 32767 & n);
                    return g
                }, a.prototype.__inplaceSub = function (_, t, e) {
                    var n = 0;
                    if (1 & t) {
                        t >>= 1;
                        for (var g = this.__digit(t), o = 32767 & g, s = 0; s < e - 1 >>> 1; s++) {
                            var l = _.__digit(s),
                                r = (g >>> 15) - (32767 & l) - n;
                            n = 1 & r >>> 15, this.__setDigit(t + s, (32767 & r) << 15 | 32767 & o), g = this.__digit(
                                t + s + 1), o = (32767 & g) - (l >>> 15) - n, n = 1 & o >>> 15
                        }
                        var a = _.__digit(s),
                            u = (g >>> 15) - (32767 & a) - n;
                        n = 1 & u >>> 15, this.__setDigit(t + s, (32767 & u) << 15 | 32767 & o);
                        var d = a >>> 15;
                        if (t + s + 1 >= this.length) throw new RangeError("out of bounds");
                        0 == (1 & e) && (g = this.__digit(t + s + 1), o = (32767 & g) - d - n, n = 1 & o >>> 15,
                            this.__setDigit(t + _.length, 1073709056 & g | 32767 & o))
                    } else {
                        t >>= 1;
                        for (var s = 0; s < _.length - 1; s++) {
                            var h = this.__digit(t + s),
                                b = _.__digit(s),
                                m = (32767 & h) - (32767 & b) - n;
                            n = 1 & m >>> 15;
                            var c = (h >>> 15) - (b >>> 15) - n;
                            n = 1 & c >>> 15, this.__setDigit(t + s, (32767 & c) << 15 | 32767 & m)
                        }
                        var g = this.__digit(t + s),
                            a = _.__digit(s),
                            o = (32767 & g) - (32767 & a) - n;
                        n = 1 & o >>> 15;
                        var u = 0;
                        0 == (1 & e) && (u = (g >>> 15) - (a >>> 15) - n, n = 1 & u >>> 15), this.__setDigit(t + s,
                            (32767 & u) << 15 | 32767 & o)
                    }
                    return n
                }, a.prototype.__inplaceRightShift = function (_) {
                    if (0 !== _) {
                        for (var t, e = this.__digit(0) >>> _, n = this.length - 1, g = 0; g < n; g++) t = this.__digit(
                            g + 1), this.__setDigit(g, 1073741823 & t << 30 - _ | e), e = t >>> _;
                        this.__setDigit(n, e)
                    }
                }, a.__specialLeftShift = function (_, t, e) {
                    var g = _.length,
                        n = new a(g + e, !1);
                    if (0 === t) {
                        for (var o = 0; o < g; o++) n.__setDigit(o, _.__digit(o));
                        return 0 < e && n.__setDigit(g, 0), n
                    }
                    for (var s, l = 0, o = 0; o < g; o++) s = _.__digit(o), n.__setDigit(o, 1073741823 & s << t | l),
                        l = s >>> 30 - t;
                    return 0 < e && n.__setDigit(g, l), n
                }, a.__leftShiftByAbsolute = function (_, t) {
                    var e = a.__toShiftAmount(t);
                    if (0 > e) throw new RangeError("BigInt too big");
                    var n = 0 | e / 30,
                        g = e % 30,
                        o = _.length,
                        s = 0 !== g && 0 != _.__digit(o - 1) >>> 30 - g,
                        l = o + n + (s ? 1 : 0),
                        r = new a(l, _.sign);
                    if (0 === g) {
                        for (var u = 0; u < n; u++) r.__setDigit(u, 0);
                        for (; u < l; u++) r.__setDigit(u, _.__digit(u - n))
                    } else {
                        for (var h = 0, u = 0; u < n; u++) r.__setDigit(u, 0);
                        for (var b, u = 0; u < o; u++) b = _.__digit(u), r.__setDigit(u + n, 1073741823 & b << g |
                            h), h = b >>> 30 - g;
                        if (s) r.__setDigit(o + n, h);
                        else if (0 !== h) throw new Error("implementation bug")
                    }
                    return r.__trim()
                }, a.__rightShiftByAbsolute = function (_, t) {
                    var e = _.length,
                        n = _.sign,
                        g = a.__toShiftAmount(t);
                    if (0 > g) return a.__rightShiftByMaximum(n);
                    var o = 0 | g / 30,
                        s = g % 30,
                        l = e - o;
                    if (0 >= l) return a.__rightShiftByMaximum(n);
                    var r = !1;
                    if (n) {
                        if (0 != (_.__digit(o) & (1 << s) - 1)) r = !0;
                        else
                            for (var u = 0; u < o; u++)
                                if (0 !== _.__digit(u)) {
                                    r = !0;
                                    break
                                }
                    }
                    if (r && 0 === s) {
                        var h = _.__digit(e - 1);
                        0 == ~h && l++
                    }
                    var b = new a(l, n);
                    if (0 === s) {
                        b.__setDigit(l - 1, 0);
                        for (var u = o; u < e; u++) b.__setDigit(u - o, _.__digit(u))
                    } else {
                        for (var m, c = _.__digit(o) >>> s, p = e - o - 1, u = 0; u < p; u++) m = _.__digit(u + o +
                            1), b.__setDigit(u, 1073741823 & m << 30 - s | c), c = m >>> s;
                        b.__setDigit(p, c)
                    }
                    return r && (b = a.__absoluteAddOne(b, !0, b)), b.__trim()
                }, a.__rightShiftByMaximum = function (_) {
                    return _ ? a.__oneDigit(1, !0) : a.__zero()
                }, a.__toShiftAmount = function (_) {
                    if (1 < _.length) return -1;
                    var t = _.__unsignedDigit(0);
                    return t > a.__kMaxLengthBits ? -1 : t
                }, a.__toPrimitive = function (_, t) {
                    if (void 0 === t && (t = "default"), "object" != typeof _) return _;
                    if (_.constructor === a) return _;
                    if ("undefined" != typeof Symbol && "symbol" == typeof Symbol.toPrimitive) {
                        var i = _[Symbol.toPrimitive];
                        if (i) {
                            var e = i(t);
                            if ("object" != typeof e) return e;
                            throw new TypeError("Cannot convert object to primitive value")
                        }
                    }
                    var n = _.valueOf;
                    if (n) {
                        var e = n.call(_);
                        if ("object" != typeof e) return e
                    }
                    var g = _.toString;
                    if (g) {
                        var e = g.call(_);
                        if ("object" != typeof e) return e
                    }
                    throw new TypeError("Cannot convert object to primitive value")
                }, a.__toNumeric = function (_) {
                    return a.__isBigInt(_) ? _ : +_
                }, a.__isBigInt = function (_) {
                    return "object" == typeof _ && null !== _ && _.constructor === a
                }, a.__truncateToNBits = function (_, t) {
                    for (var e = 0 | (_ + 29) / 30, n = new a(e, t.sign), g = e - 1, o = 0; o < g; o++) n.__setDigit(
                        o, t.__digit(o));
                    var s = t.__digit(g);
                    if (0 != _ % 30) {
                        var l = 32 - _ % 30;
                        s = s << l >>> l
                    }
                    return n.__setDigit(g, s), n.__trim()
                }, a.__truncateAndSubFromPowerOfTwo = function (_, t, e) {
                    for (var n = Math.min, g, o = 0 | (_ + 29) / 30, s = new a(o, e), l = 0, u = o - 1, d = 0, h =
                            n(u, t.length); l < h; l++) g = 0 - t.__digit(l) - d, d = 1 & g >>> 30, s.__setDigit(l,
                        1073741823 & g);
                    for (; l < u; l++) s.__setDigit(l, 0 | 1073741823 & -d);
                    var b, m = u < t.length ? t.__digit(u) : 0,
                        c = _ % 30;
                    if (0 === c) b = 0 - m - d, b &= 1073741823;
                    else {
                        var p = 32 - c;
                        m = m << p >>> p;
                        var D = 1 << 32 - p;
                        b = D - m - d, b &= D - 1
                    }
                    return s.__setDigit(u, b), s.__trim()
                }, a.prototype.__digit = function (_) {
                    return this[_]
                }, a.prototype.__unsignedDigit = function (_) {
                    return this[_] >>> 0
                }, a.prototype.__setDigit = function (_, t) {
                    this[_] = 0 | t
                }, a.prototype.__setDigitGrow = function (_, t) {
                    this[_] = 0 | t
                }, a.prototype.__halfDigitLength = function () {
                    var _ = this.length;
                    return 32767 >= this.__unsignedDigit(_ - 1) ? 2 * _ - 1 : 2 * _
                }, a.prototype.__halfDigit = function (_) {
                    return 32767 & this[_ >>> 1] >>> 15 * (1 & _)
                }, a.prototype.__setHalfDigit = function (_, t) {
                    var i = _ >>> 1,
                        e = this.__digit(i),
                        n = 1 & _ ? 32767 & e | t << 15 : 1073709056 & e | 32767 & t;
                    this.__setDigit(i, n)
                }, a.__digitPow = function (_, t) {
                    for (var i = 1; 0 < t;) 1 & t && (i *= _), t >>>= 1, _ *= _;
                    return i
                }, a.__isOneDigitInt = function (_) {
                    return (1073741823 & _) === _
                }, a.__kMaxLength = 33554432, a.__kMaxLengthBits = a.__kMaxLength << 5, a.__kMaxBitsPerChar = [0, 0,
                    32, 51, 64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141,
                    143, 145, 147, 149, 151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166], a.__kBitsPerCharTableShift =
                5, a.__kBitsPerCharTableMultiplier = 1 << a.__kBitsPerCharTableShift, a.__kConversionChars = ["0",
                    "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
                    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], a.__kBitConversionBuffer =
                new ArrayBuffer(8), a.__kBitConversionDouble = new Float64Array(a.__kBitConversionBuffer), a.__kBitConversionInts =
                new Int32Array(a.__kBitConversionBuffer), a.__clz30 = g ? function (_) {
                    return g(_) - 2
                } : function (_) {
                    var t = Math.LN2,
                        i = Math.log;
                    return 0 === _ ? 30 : 0 | 29 - (0 | i(_ >>> 0) / t)
                }, a.__imul = n || function (_, t) {
                    return 0 | _ * t
                }, a
        }(Array);
    return n
});
//# sourceMappingURL=jsbi-umd.js.map