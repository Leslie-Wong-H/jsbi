'use strict';
var extendStatics = function (_, t) {
    return extendStatics = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function (_, t) {
        _.__proto__ = t
    } || function (_, t) {
        for (var i in t) t.hasOwnProperty(i) && (_[i] = t[i])
    }, extendStatics(_, t)
};

function __extends(_, t) {
    function i() {
        this.constructor = _
    }
    extendStatics(_, t), _.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
}

function __values(_) {
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

function __read(_, t) {
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
var JSBI = function (_) {
    var t = Math.imul,
        i = Math.clz32,
        e = Math.abs,
        n = Math.max,
        g = Math.floor;

    function o(t, i) {
        var e = _.call(this, t) || this;
        if (e.sign = i, t > o.__kMaxLength) throw new RangeError("Maximum BigInt size exceeded");
        return e
    }
    return __extends(o, _), o.BigInt = function (_) {
            var t = Number.isFinite;
            if ("number" == typeof _) {
                if (0 === _) return o.__zero();
                if (o.__isOneDigitInt(_)) return 0 > _ ? o.__oneDigit(-_, !0) : o.__oneDigit(_, !1);
                if (!t(_) || g(_) !== _) throw new RangeError("The number " + _ +
                    " cannot be converted to BigInt because it is not an integer");
                return o.__fromDouble(_)
            }
            if ("string" == typeof _) {
                var i = o.__fromString(_);
                if (null === i) throw new SyntaxError("Cannot convert " + _ + " to a BigInt");
                return i
            }
            if ("boolean" == typeof _) return !0 === _ ? o.__oneDigit(1, !1) : o.__zero();
            if ("object" == typeof _) {
                if (_.constructor === o) return _;
                var e = o.__toPrimitive(_);
                return o.BigInt(e)
            }
            throw new TypeError("Cannot convert " + _ + " to a BigInt")
        }, o.prototype.toDebugString = function () {
            var _, t, i = ["BigInt["];
            try {
                for (var e, n = __values(this), g = n.next(); !g.done; g = n.next()) e = g.value, i.push((e ? (e >>>
                    0).toString(16) : e) + ", ")
            } catch (t) {
                _ = {
                    error: t
                }
            } finally {
                try {
                    g && !g.done && (t = n.return) && t.call(n)
                } finally {
                    if (_) throw _.error
                }
            }
            return i.push("]"), i.join("")
        }, o.prototype.toString = function (_) {
            if (void 0 === _ && (_ = 10), 2 > _ || 36 < _) throw new RangeError(
                "toString() radix argument must be between 2 and 36");
            return 0 === this.length ? "0" : 0 == (_ & _ - 1) ? o.__toStringBasePowerOfTwo(this, _) : o.__toStringGeneric(
                this, _, !1)
        }, o.prototype.valueOf = function () {
            throw new Error("Convert JSBI instances to native numbers using `toNumber`.")
        }, o.toNumber = function (_) {
            var t = _.length;
            if (0 === t) return 0;
            if (1 === t) {
                var i = _.__unsignedDigit(0);
                return _.sign ? -i : i
            }
            var e = _.__digit(t - 1),
                n = o.__clz30(e),
                g = 30 * t - n;
            if (1024 < g) return _.sign ? -Infinity : 1 / 0;
            var s = g - 1,
                l = e,
                r = t - 1,
                a = n + 3,
                u = 32 === a ? 0 : l << a;
            u >>>= 12;
            var d = a - 12,
                h = 12 <= a ? 0 : l << 20 + a,
                b = 20 + a;
            for (0 < d && 0 < r && (r--, l = _.__digit(r), u |= l >>> 30 - d, h = l << d + 2, b = d + 2); 0 < b &&
                0 < r;) r--, l = _.__digit(r), h |= 30 <= b ? l << b - 30 : l >>> 30 - b, b -= 30;
            var m = o.__decideRounding(_, b, r, l);
            if ((1 === m || 0 === m && 1 == (1 & h)) && (h = h + 1 >>> 0, 0 === h && (u++, 0 != u >>> 20 && (u = 0,
                    s++, 1023 < s)))) return _.sign ? -Infinity : 1 / 0;
            var c = _.sign ? -2147483648 : 0;
            return s = s + 1023 << 20, o.__kBitConversionInts[1] = c | s | u, o.__kBitConversionInts[0] = h, o.__kBitConversionDouble[
                0]
        }, o.unaryMinus = function (_) {
            if (0 === _.length) return _;
            var t = _.__copy();
            return t.sign = !_.sign, t
        }, o.bitwiseNot = function (_) {
            return _.sign ? o.__absoluteSubOne(_).__trim() : o.__absoluteAddOne(_, !0)
        }, o.exponentiate = function (_, t) {
            if (t.sign) throw new RangeError("Exponent must be positive");
            if (0 === t.length) return o.__oneDigit(1, !1);
            if (0 === _.length) return _;
            if (1 === _.length && 1 === _.__digit(0)) return _.sign && 0 == (1 & t.__digit(0)) ? o.unaryMinus(_) :
                _;
            if (1 < t.length) throw new RangeError("BigInt too big");
            var i = t.__unsignedDigit(0);
            if (1 === i) return _;
            if (i >= o.__kMaxLengthBits) throw new RangeError("BigInt too big");
            if (1 === _.length && 2 === _.__digit(0)) {
                var e = 1 + (0 | i / 30),
                    n = _.sign && 0 != (1 & i),
                    g = new o(e, n);
                g.__initializeDigits();
                var s = 1 << i % 30;
                return g.__setDigit(e - 1, s), g
            }
            var l = null,
                r = _;
            for (0 != (1 & i) && (l = _), i >>= 1; 0 !== i; i >>= 1) r = o.multiply(r, r), 0 != (1 & i) && (null ===
                l ? l = r : l = o.multiply(l, r));
            return l
        }, o.multiply = function (_, t) {
            if (0 === _.length) return _;
            if (0 === t.length) return t;
            var e = _.length + t.length;
            30 <= _.__clzmsd() + t.__clzmsd() && e--;
            var n = new o(e, _.sign !== t.sign);
            n.__initializeDigits();
            for (var g = 0; g < _.length; g++) o.__multiplyAccumulate(t, _.__digit(g), n, g);
            return n.__trim()
        }, o.divide = function (_, t) {
            if (0 === t.length) throw new RangeError("Division by zero");
            if (0 > o.__absoluteCompare(_, t)) return o.__zero();
            var i, e = _.sign !== t.sign,
                n = t.__unsignedDigit(0);
            if (1 === t.length && 32767 >= n) {
                if (1 === n) return e === _.sign ? _ : o.unaryMinus(_);
                i = o.__absoluteDivSmall(_, n, null)
            } else i = o.__absoluteDivLarge(_, t, !0, !1);
            return i.sign = e, i.__trim()
        }, o.remainder = function (_, t) {
            if (0 === t.length) throw new RangeError("Division by zero");
            if (0 > o.__absoluteCompare(_, t)) return _;
            var i = t.__unsignedDigit(0);
            if (1 === t.length && 32767 >= i) {
                if (1 === i) return o.__zero();
                var e = o.__absoluteModSmall(_, i);
                return 0 === e ? o.__zero() : o.__oneDigit(e, _.sign)
            }
            var n = o.__absoluteDivLarge(_, t, !1, !0);
            return n.sign = _.sign, n.__trim()
        }, o.add = function (_, t) {
            var i = _.sign;
            return i === t.sign ? o.__absoluteAdd(_, t, i) : 0 <= o.__absoluteCompare(_, t) ? o.__absoluteSub(_, t,
                i) : o.__absoluteSub(t, _, !i)
        }, o.subtract = function (_, t) {
            var i = _.sign;
            return i === t.sign ? 0 <= o.__absoluteCompare(_, t) ? o.__absoluteSub(_, t, i) : o.__absoluteSub(t, _,
                !i) : o.__absoluteAdd(_, t, i)
        }, o.leftShift = function (_, t) {
            return 0 === t.length || 0 === _.length ? _ : t.sign ? o.__rightShiftByAbsolute(_, t) : o.__leftShiftByAbsolute(
                _, t)
        }, o.signedRightShift = function (_, t) {
            return 0 === t.length || 0 === _.length ? _ : t.sign ? o.__leftShiftByAbsolute(_, t) : o.__rightShiftByAbsolute(
                _, t)
        }, o.unsignedRightShift = function () {
            throw new TypeError("BigInts have no unsigned right shift; use >> instead")
        }, o.lessThan = function (_, t) {
            return 0 > o.__compareToBigInt(_, t)
        }, o.lessThanOrEqual = function (_, t) {
            return 0 >= o.__compareToBigInt(_, t)
        }, o.greaterThan = function (_, t) {
            return 0 < o.__compareToBigInt(_, t)
        }, o.greaterThanOrEqual = function (_, t) {
            return 0 <= o.__compareToBigInt(_, t)
        }, o.equal = function (_, t) {
            if (_.sign !== t.sign) return !1;
            if (_.length !== t.length) return !1;
            for (var e = 0; e < _.length; e++)
                if (_.__digit(e) !== t.__digit(e)) return !1;
            return !0
        }, o.notEqual = function (_, t) {
            return !o.equal(_, t)
        }, o.bitwiseAnd = function (_, t) {
            var i;
            if (!_.sign && !t.sign) return o.__absoluteAnd(_, t).__trim();
            if (_.sign && t.sign) {
                var e = n(_.length, t.length) + 1,
                    g = o.__absoluteSubOne(_, e),
                    s = o.__absoluteSubOne(t);
                return g = o.__absoluteOr(g, s, g), o.__absoluteAddOne(g, !0, g).__trim()
            }
            return _.sign && (i = __read([t, _], 2), _ = i[0], t = i[1]), o.__absoluteAndNot(_, o.__absoluteSubOne(
                t)).__trim()
        }, o.bitwiseXor = function (_, t) {
            var i;
            if (!_.sign && !t.sign) return o.__absoluteXor(_, t).__trim();
            if (_.sign && t.sign) {
                var e = n(_.length, t.length),
                    g = o.__absoluteSubOne(_, e),
                    s = o.__absoluteSubOne(t);
                return o.__absoluteXor(g, s, g).__trim()
            }
            var l = n(_.length, t.length) + 1;
            _.sign && (i = __read([t, _], 2), _ = i[0], t = i[1]);
            var r = o.__absoluteSubOne(t, l);
            return r = o.__absoluteXor(r, _, r), o.__absoluteAddOne(r, !0, r).__trim()
        }, o.bitwiseOr = function (_, t) {
            var i, e = n(_.length, t.length);
            if (!_.sign && !t.sign) return o.__absoluteOr(_, t).__trim();
            if (_.sign && t.sign) {
                var g = o.__absoluteSubOne(_, e),
                    s = o.__absoluteSubOne(t);
                return g = o.__absoluteAnd(g, s, g), o.__absoluteAddOne(g, !0, g).__trim()
            }
            _.sign && (i = __read([t, _], 2), _ = i[0], t = i[1]);
            var l = o.__absoluteSubOne(t, e);
            return l = o.__absoluteAndNot(l, _, l), o.__absoluteAddOne(l, !0, l).__trim()
        }, o.asIntN = function (_, t) {
            if (0 === t.length) return t;
            if (_ = g(_), 0 > _) throw new RangeError("Invalid value: not (convertible to) a safe integer");
            if (0 === _) return o.__zero();
            if (_ >= o.__kMaxLengthBits) return t;
            var e = 0 | (_ + 29) / 30;
            if (t.length < e) return t;
            var s = t.__unsignedDigit(e - 1),
                l = 1 << (_ - 1) % 30;
            if (t.length === e && s < l) return t;
            if (!((s & l) === l)) return o.__truncateToNBits(_, t);
            if (!t.sign) return o.__truncateAndSubFromPowerOfTwo(_, t, !0);
            if (0 == (s & l - 1)) {
                for (var r = e - 2; 0 <= r; r--)
                    if (0 !== t.__digit(r)) return o.__truncateAndSubFromPowerOfTwo(_, t, !1);
                return t.length === e && s === l ? t : o.__truncateToNBits(_, t)
            }
            return o.__truncateAndSubFromPowerOfTwo(_, t, !1)
        }, o.asUintN = function (_, t) {
            if (0 === t.length) return t;
            if (_ = g(_), 0 > _) throw new RangeError("Invalid value: not (convertible to) a safe integer");
            if (0 === _) return o.__zero();
            if (t.sign) {
                if (_ > o.__kMaxLengthBits) throw new RangeError("BigInt too big");
                return o.__truncateAndSubFromPowerOfTwo(_, t, !1)
            }
            if (_ >= o.__kMaxLengthBits) return t;
            var i = 0 | (_ + 29) / 30;
            if (t.length < i) return t;
            var e = _ % 30;
            if (t.length == i) {
                if (0 === e) return t;
                var s = t.__digit(i - 1);
                if (0 == s >>> e) return t
            }
            return o.__truncateToNBits(_, t)
        }, o.ADD = function (_, t) {
            if (_ = o.__toPrimitive(_), t = o.__toPrimitive(t), "string" == typeof _) return "string" != typeof t &&
                (t = t.toString()), _ + t;
            if ("string" == typeof t) return _.toString() + t;
            if (_ = o.__toNumeric(_), t = o.__toNumeric(t), o.__isBigInt(_) && o.__isBigInt(t)) return o.add(_, t);
            if ("number" == typeof _ && "number" == typeof t) return _ + t;
            throw new TypeError("Cannot mix BigInt and other types, use explicit conversions")
        }, o.LT = function (_, t) {
            return o.__compare(_, t, 0)
        }, o.LE = function (_, t) {
            return o.__compare(_, t, 1)
        }, o.GT = function (_, t) {
            return o.__compare(_, t, 2)
        }, o.GE = function (_, t) {
            return o.__compare(_, t, 3)
        }, o.EQ = function (_, t) {
            for (;;) {
                if (o.__isBigInt(_)) return o.__isBigInt(t) ? o.equal(_, t) : o.EQ(t, _);
                if ("number" == typeof _) {
                    if (o.__isBigInt(t)) return o.__equalToNumber(t, _);
                    if ("object" != typeof t) return _ == t;
                    t = o.__toPrimitive(t)
                } else if ("string" == typeof _) {
                    if (o.__isBigInt(t)) return _ = o.__fromString(_), null !== _ && o.equal(_, t);
                    if ("object" != typeof t) return _ == t;
                    t = o.__toPrimitive(t)
                } else if ("boolean" == typeof _) {
                    if (o.__isBigInt(t)) return o.__equalToNumber(t, +_);
                    if ("object" != typeof t) return _ == t;
                    t = o.__toPrimitive(t)
                } else if ("symbol" == typeof _) {
                    if (o.__isBigInt(t)) return !1;
                    if ("object" != typeof t) return _ == t;
                    t = o.__toPrimitive(t)
                } else if ("object" == typeof _) {
                    if ("object" == typeof t && t.constructor !== o) return _ == t;
                    _ = o.__toPrimitive(_)
                } else return _ == t
            }
        }, o.NE = function (_, t) {
            return !o.EQ(_, t)
        }, o.__zero = function () {
            return new o(0, !1)
        }, o.__oneDigit = function (_, t) {
            var i = new o(1, t);
            return i.__setDigit(0, _), i
        }, o.prototype.__copy = function () {
            for (var _ = new o(this.length, this.sign), t = 0; t < this.length; t++) _[t] = this[t];
            return _
        }, o.prototype.__trim = function () {
            for (var _ = this.length, t = this[_ - 1]; 0 === t;) _--, t = this[_ - 1], this.pop();
            return 0 === _ && (this.sign = !1), this
        }, o.prototype.__initializeDigits = function () {
            for (var _ = 0; _ < this.length; _++) this[_] = 0
        }, o.__decideRounding = function (_, t, i, e) {
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
        }, o.__fromDouble = function (_) {
            o.__kBitConversionDouble[0] = _;
            var t, i = 2047 & o.__kBitConversionInts[1] >>> 20,
                e = i - 1023,
                n = (0 | e / 30) + 1,
                g = new o(n, 0 > _),
                s = 1048575 & o.__kBitConversionInts[1] | 1048576,
                l = o.__kBitConversionInts[0],
                r = 20,
                a = e % 30,
                u = 0;
            if (a < r) {
                var d = r - a;
                u = d + 32, t = s >>> d, s = s << 32 - d | l >>> d, l <<= 32 - d
            } else if (a === r) u = 32, t = s, s = l, l = 0;
            else {
                var d = a - r;
                u = 32 - d, t = s << d | l >>> 32 - d, s = l << d, l = 0
            }
            g.__setDigit(n - 1, t);
            for (var h = n - 2; 0 <= h; h--) 0 < u ? (u -= 30, t = s >>> 2, s = s << 30 | l >>> 2, l <<= 30) : t =
                0, g.__setDigit(h, t);
            return g.__trim()
        }, o.__isWhitespace = function (_) {
            return !!(13 >= _ && 9 <= _) || (159 >= _ ? 32 == _ : 131071 >= _ ? 160 == _ || 5760 == _ : 196607 >= _ ?
                (_ &= 131071, 10 >= _ || 40 == _ || 41 == _ || 47 == _ || 95 == _ || 4096 == _) : 65279 == _)
        }, o.__fromString = function (_, t) {
            void 0 === t && (t = 0);
            var i = 0,
                e = _.length,
                n = 0;
            if (n === e) return o.__zero();
            for (var g = _.charCodeAt(n); o.__isWhitespace(g);) {
                if (++n === e) return o.__zero();
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
                    if (++n === e) return o.__zero();
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
                if (++n === e) return o.__zero();
                if (g = _.charCodeAt(n), 88 === g || 120 === g) {
                    if (++n === e) return null;
                    g = _.charCodeAt(n)
                }
            }
            if (0 != i && 10 !== t) return null;
            for (; 48 === g;) {
                if (++n === e) return o.__zero();
                g = _.charCodeAt(n)
            }
            var s = e - n,
                l = o.__kMaxBitsPerChar[t],
                r = o.__kBitsPerCharTableMultiplier - 1;
            if (s > 1073741824 / l) return null;
            var a = l * s + r >>> o.__kBitsPerCharTableShift,
                u = new o(0 | (a + 29) / 30, !1),
                h = 10 > t ? t : 10,
                b = 10 < t ? t - 10 : 0;
            if (0 == (t & t - 1)) {
                l >>= o.__kBitsPerCharTableShift;
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
                        if (S += l, B = B << l | f, ++n === e) {
                            D = !0;
                            break
                        }
                        if (g = _.charCodeAt(n), 30 < S + l) break
                    }
                    c.push(B), p.push(S)
                } while (!D);
                o.__fillFromParts(u, c, p)
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
                    r = 30 * o.__kBitsPerCharTableMultiplier - 1;
                    var m = 0 | (l * v + r >>> o.__kBitsPerCharTableShift) / 30;
                    u.__inplaceMultiplyAdd(C, B, m)
                } while (!D)
            }
            if (n !== e) {
                if (!o.__isWhitespace(g)) return null;
                for (n++; n < e; n++)
                    if (g = _.charCodeAt(n), !o.__isWhitespace(g)) return null
            }
            return u.sign = -1 == i, u.__trim()
        }, o.__fillFromParts = function (_, t, e) {
            for (var n = 0, g = 0, o = 0, s = t.length - 1; 0 <= s; s--) {
                var l = t[s],
                    r = e[s];
                g |= l << o, o += r, 30 === o ? (_.__setDigit(n++, g), o = 0, g = 0) : 30 < o && (_.__setDigit(n++,
                    1073741823 & g), o -= 30, g = l >>> r - o)
            }
            if (0 !== g) {
                if (n >= _.length) throw new Error("implementation bug");
                _.__setDigit(n++, g)
            }
            for (; n < _.length; n++) _.__setDigit(n, 0)
        }, o.__toStringBasePowerOfTwo = function (_, t) {
            var e = _.length,
                n = t - 1;
            n = (85 & n >>> 1) + (85 & n), n = (51 & n >>> 2) + (51 & n), n = (15 & n >>> 4) + (15 & n);
            var g = n,
                s = t - 1,
                l = _.__digit(e - 1),
                r = o.__clz30(l),
                a = 0 | (30 * e - r + g - 1) / g;
            if (_.sign && a++, 268435456 < a) throw new Error("string too long");
            for (var u = Array(a), d = a - 1, h = 0, b = 0, m = 0; m < e - 1; m++) {
                var c = _.__digit(m),
                    p = (h | c << b) & s;
                u[d--] = o.__kConversionChars[p];
                var D = g - b;
                for (h = c >>> D, b = 30 - D; b >= g;) u[d--] = o.__kConversionChars[h & s], h >>>= g, b -= g
            }
            var f = (h | l << b) & s;
            for (u[d--] = o.__kConversionChars[f], h = l >>> g - b; 0 !== h;) u[d--] = o.__kConversionChars[h & s],
                h >>>= g;
            if (_.sign && (u[d--] = "-"), -1 !== d) throw new Error("implementation bug");
            return u.join("")
        }, o.__toStringGeneric = function (_, t, e) {
            var n = _.length;
            if (0 === n) return "";
            if (1 === n) {
                var g = _.__unsignedDigit(0).toString(t);
                return !1 === e && _.sign && (g = "-" + g), g
            }
            var s = 30 * n - o.__clz30(_.__digit(n - 1)),
                l = o.__kMaxBitsPerChar[t],
                r = l - 1,
                a = s * o.__kBitsPerCharTableMultiplier;
            a += r - 1, a = 0 | a / r;
            var u, d, h = a + 1 >> 1,
                b = o.exponentiate(o.__oneDigit(t, !1), o.__oneDigit(h, !1)),
                m = b.__unsignedDigit(0);
            if (1 === b.length && 32767 >= m) {
                u = new o(_.length, !1), u.__initializeDigits();
                for (var c, p = 0, D = 2 * _.length - 1; 0 <= D; D--) c = p << 15 | _.__halfDigit(D), u.__setHalfDigit(
                    D, 0 | c / m), p = 0 | c % m;
                d = p.toString(t)
            } else {
                var f = o.__absoluteDivLarge(_, b, !0, !0);
                u = f.quotient;
                var p = f.remainder.__trim();
                d = o.__toStringGeneric(p, t, !0)
            }
            u.__trim();
            for (var B = o.__toStringGeneric(u, t, !0); d.length < h;) d = "0" + d;
            return !1 === e && _.sign && (B = "-" + B), B + d
        }, o.__unequalSign = function (_) {
            return _ ? -1 : 1
        }, o.__absoluteGreater = function (_) {
            return _ ? -1 : 1
        }, o.__absoluteLess = function (_) {
            return _ ? 1 : -1
        }, o.__compareToBigInt = function (_, t) {
            var i = _.sign;
            if (i !== t.sign) return o.__unequalSign(i);
            var e = o.__absoluteCompare(_, t);
            return 0 < e ? o.__absoluteGreater(i) : 0 > e ? o.__absoluteLess(i) : 0
        }, o.__compareToNumber = function (_, t) {
            if (o.__isOneDigitInt(t)) {
                var i = _.sign,
                    n = 0 > t;
                if (i !== n) return o.__unequalSign(i);
                if (0 === _.length) {
                    if (n) throw new Error("implementation bug");
                    return 0 === t ? 0 : -1
                }
                if (1 < _.length) return o.__absoluteGreater(i);
                var g = e(t),
                    s = _.__unsignedDigit(0);
                return s > g ? o.__absoluteGreater(i) : s < g ? o.__absoluteLess(i) : 0
            }
            return o.__compareToDouble(_, t)
        }, o.__compareToDouble = function (_, t) {
            if (t !== t) return t;
            if (t === 1 / 0) return -1;
            if (t === -Infinity) return 1;
            var i = _.sign;
            if (i !== 0 > t) return o.__unequalSign(i);
            if (0 === t) throw new Error("implementation bug: should be handled elsewhere");
            if (0 === _.length) return -1;
            o.__kBitConversionDouble[0] = t;
            var e = 2047 & o.__kBitConversionInts[1] >>> 20;
            if (2047 == e) throw new Error("implementation bug: handled elsewhere");
            var n = e - 1023;
            if (0 > n) return o.__absoluteGreater(i);
            var g = _.length,
                s = _.__digit(g - 1),
                l = o.__clz30(s),
                r = 30 * g - l,
                a = n + 1;
            if (r < a) return o.__absoluteLess(i);
            if (r > a) return o.__absoluteGreater(i);
            var u = 1048576 | 1048575 & o.__kBitConversionInts[1],
                d = o.__kBitConversionInts[0],
                h = 20,
                b = 29 - l;
            if (b !== (0 | (r - 1) % 30)) throw new Error("implementation bug");
            var m, c = 0;
            if (b < h) {
                var p = h - b;
                c = p + 32, m = u >>> p, u = u << 32 - p | d >>> p, d <<= 32 - p
            } else if (b === h) c = 32, m = u, u = d, d = 0;
            else {
                var p = b - h;
                c = 32 - p, m = u << p | d >>> 32 - p, u = d << p, d = 0
            }
            if (s >>>= 0, m >>>= 0, s > m) return o.__absoluteGreater(i);
            if (s < m) return o.__absoluteLess(i);
            for (var D = g - 2; 0 <= D; D--) {
                0 < c ? (c -= 30, m = u >>> 2, u = u << 30 | d >>> 2, d <<= 30) : m = 0;
                var f = _.__unsignedDigit(D);
                if (f > m) return o.__absoluteGreater(i);
                if (f < m) return o.__absoluteLess(i)
            }
            if (0 !== u || 0 !== d) {
                if (0 === c) throw new Error("implementation bug");
                return o.__absoluteLess(i)
            }
            return 0
        }, o.__equalToNumber = function (_, t) {
            return o.__isOneDigitInt(t) ? 0 === t ? 0 === _.length : 1 === _.length && _.sign === 0 > t && _.__unsignedDigit(
                0) === e(t) : 0 === o.__compareToDouble(_, t)
        }, o.__comparisonResultToBool = function (_, t) {
            return 0 === t ? 0 > _ : 1 === t ? 0 >= _ : 2 === t ? 0 < _ : 3 === t ? 0 <= _ : void 0
        }, o.__compare = function (_, t, i) {
            if (_ = o.__toPrimitive(_), t = o.__toPrimitive(t), "string" == typeof _ && "string" == typeof t) switch (
                i) {
                case 0:
                    return _ < t;
                case 1:
                    return _ <= t;
                case 2:
                    return _ > t;
                case 3:
                    return _ >= t;
            }
            if (o.__isBigInt(_) && "string" == typeof t) return t = o.__fromString(t), null !== t && o.__comparisonResultToBool(
                o.__compareToBigInt(_, t), i);
            if ("string" == typeof _ && o.__isBigInt(t)) return _ = o.__fromString(_), null !== _ && o.__comparisonResultToBool(
                o.__compareToBigInt(_, t), i);
            if (_ = o.__toNumeric(_), t = o.__toNumeric(t), o.__isBigInt(_)) {
                if (o.__isBigInt(t)) return o.__comparisonResultToBool(o.__compareToBigInt(_, t), i);
                if ("number" != typeof t) throw new Error("implementation bug");
                return o.__comparisonResultToBool(o.__compareToNumber(_, t), i)
            }
            if ("number" != typeof _) throw new Error("implementation bug");
            if (o.__isBigInt(t)) return o.__comparisonResultToBool(o.__compareToNumber(t, _), 2 ^ i);
            if ("number" != typeof t) throw new Error("implementation bug");
            return 0 === i ? _ < t : 1 === i ? _ <= t : 2 === i ? _ > t : 3 === i ? _ >= t : void 0
        }, o.prototype.__clzmsd = function () {
            return o.__clz30(this.__digit(this.length - 1))
        }, o.__absoluteAdd = function (_, t, e) {
            if (_.length < t.length) return o.__absoluteAdd(t, _, e);
            if (0 === _.length) return _;
            if (0 === t.length) return _.sign === e ? _ : o.unaryMinus(_);
            var n = _.length;
            (0 === _.__clzmsd() || t.length === _.length && 0 === t.__clzmsd()) && n++;
            for (var g, s = new o(n, e), l = 0, a = 0; a < t.length; a++) g = _.__digit(a) + t.__digit(a) + l, l =
                g >>> 30, s.__setDigit(a, 1073741823 & g);
            for (; a < _.length; a++) {
                var g = _.__digit(a) + l;
                l = g >>> 30, s.__setDigit(a, 1073741823 & g)
            }
            return a < s.length && s.__setDigit(a, l), s.__trim()
        }, o.__absoluteSub = function (_, t, e) {
            if (0 === _.length) return _;
            if (0 === t.length) return _.sign === e ? _ : o.unaryMinus(_);
            for (var n, g = new o(_.length, e), s = 0, l = 0; l < t.length; l++) n = _.__digit(l) - t.__digit(l) -
                s, s = 1 & n >>> 30, g.__setDigit(l, 1073741823 & n);
            for (; l < _.length; l++) {
                var n = _.__digit(l) - s;
                s = 1 & n >>> 30, g.__setDigit(l, 1073741823 & n)
            }
            return g.__trim()
        }, o.__absoluteAddOne = function (_, t, e) {
            void 0 === e && (e = null);
            var n = _.length;
            null === e ? e = new o(n, t) : e.sign = t;
            for (var g, s = 1, l = 0; l < n; l++) g = _.__digit(l) + s, s = g >>> 30, e.__setDigit(l, 1073741823 &
                g);
            return 0 !== s && e.__setDigitGrow(n, 1), e
        }, o.__absoluteSubOne = function (_, t) {
            var e = _.length;
            t = t || e;
            for (var n, g = new o(t, !1), s = 1, l = 0; l < e; l++) n = _.__digit(l) - s, s = 1 & n >>> 30, g.__setDigit(
                l, 1073741823 & n);
            if (0 !== s) throw new Error("implementation bug");
            for (var l = e; l < t; l++) g.__setDigit(l, 0);
            return g
        }, o.__absoluteAnd = function (_, t, e) {
            void 0 === e && (e = null);
            var n = _.length,
                g = t.length,
                s = g;
            if (n < g) {
                s = n;
                var l = _,
                    r = n;
                _ = t, n = g, t = l, g = r
            }
            var a = s;
            null === e ? e = new o(a, !1) : a = e.length;
            for (var u = 0; u < s; u++) e.__setDigit(u, _.__digit(u) & t.__digit(u));
            for (; u < a; u++) e.__setDigit(u, 0);
            return e
        }, o.__absoluteAndNot = function (_, t, e) {
            void 0 === e && (e = null);
            var n = _.length,
                g = t.length,
                s = g;
            n < g && (s = n);
            var l = n;
            null === e ? e = new o(l, !1) : l = e.length;
            for (var r = 0; r < s; r++) e.__setDigit(r, _.__digit(r) & ~t.__digit(r));
            for (; r < n; r++) e.__setDigit(r, _.__digit(r));
            for (; r < l; r++) e.__setDigit(r, 0);
            return e
        }, o.__absoluteOr = function (_, t, e) {
            void 0 === e && (e = null);
            var n = _.length,
                g = t.length,
                s = g;
            if (n < g) {
                s = n;
                var l = _,
                    r = n;
                _ = t, n = g, t = l, g = r
            }
            var a = n;
            null === e ? e = new o(a, !1) : a = e.length;
            for (var u = 0; u < s; u++) e.__setDigit(u, _.__digit(u) | t.__digit(u));
            for (; u < n; u++) e.__setDigit(u, _.__digit(u));
            for (; u < a; u++) e.__setDigit(u, 0);
            return e
        }, o.__absoluteXor = function (_, t, e) {
            void 0 === e && (e = null);
            var n = _.length,
                g = t.length,
                s = g;
            if (n < g) {
                s = n;
                var l = _,
                    r = n;
                _ = t, n = g, t = l, g = r
            }
            var a = n;
            null === e ? e = new o(a, !1) : a = e.length;
            for (var u = 0; u < s; u++) e.__setDigit(u, _.__digit(u) ^ t.__digit(u));
            for (; u < n; u++) e.__setDigit(u, _.__digit(u));
            for (; u < a; u++) e.__setDigit(u, 0);
            return e
        }, o.__absoluteCompare = function (_, t) {
            var e = _.length - t.length;
            if (0 != e) return e;
            for (var n = _.length - 1; 0 <= n && _.__digit(n) === t.__digit(n);) n--;
            return 0 > n ? 0 : _.__unsignedDigit(n) > t.__unsignedDigit(n) ? 1 : -1
        }, o.__multiplyAccumulate = function (_, t, e, n) {
            if (0 !== t) {
                for (var g = 32767 & t, s = t >>> 15, l = 0, r = 0, a = 0; a < _.length; a++, n++) {
                    var u = e.__digit(n),
                        d = _.__digit(a),
                        h = 32767 & d,
                        b = d >>> 15,
                        m = o.__imul(h, g),
                        c = o.__imul(h, s),
                        p = o.__imul(b, g),
                        D = o.__imul(b, s);
                    u += r + m + l, l = u >>> 30, u &= 1073741823, u += ((32767 & c) << 15) + ((32767 & p) << 15),
                        l += u >>> 30, r = D + (c >>> 15) + (p >>> 15), e.__setDigit(n, 1073741823 & u)
                }
                for (; 0 !== l || 0 !== r; n++) {
                    var u = e.__digit(n);
                    u += l + r, r = 0, l = u >>> 30, e.__setDigit(n, 1073741823 & u)
                }
            }
        }, o.__internalMultiplyAdd = function (_, t, e, g, s) {
            for (var l = e, a = 0, u = 0; u < g; u++) {
                var d = _.__digit(u),
                    h = o.__imul(32767 & d, t),
                    b = o.__imul(d >>> 15, t),
                    m = h + ((32767 & b) << 15) + a + l;
                l = m >>> 30, a = b >>> 15, s.__setDigit(u, 1073741823 & m)
            }
            if (s.length > g)
                for (s.__setDigit(g++, l + a); g < s.length;) s.__setDigit(g++, 0);
            else if (0 !== l + a) throw new Error("implementation bug")
        }, o.prototype.__inplaceMultiplyAdd = function (_, t, e) {
            e > this.length && (e = this.length);
            for (var n = 32767 & _, g = _ >>> 15, s = 0, l = t, r = 0; r < e; r++) {
                var a = this.__digit(r),
                    u = 32767 & a,
                    d = a >>> 15,
                    h = o.__imul(u, n),
                    b = o.__imul(u, g),
                    m = o.__imul(d, n),
                    c = o.__imul(d, g),
                    p = l + h + s;
                s = p >>> 30, p &= 1073741823, p += ((32767 & b) << 15) + ((32767 & m) << 15), s += p >>> 30, l = c +
                    (b >>> 15) + (m >>> 15), this.__setDigit(r, 1073741823 & p)
            }
            if (0 !== s || 0 !== l) throw new Error("implementation bug")
        }, o.__absoluteDivSmall = function (_, t, e) {
            void 0 === e && (e = null), null === e && (e = new o(_.length, !1));
            for (var n = 0, g = 2 * _.length - 1; 0 <= g; g -= 2) {
                var s = (n << 15 | _.__halfDigit(g)) >>> 0,
                    l = 0 | s / t;
                n = 0 | s % t, s = (n << 15 | _.__halfDigit(g - 1)) >>> 0;
                var r = 0 | s / t;
                n = 0 | s % t, e.__setDigit(g >>> 1, l << 15 | r)
            }
            return e
        }, o.__absoluteModSmall = function (_, t) {
            for (var e, n = 0, g = 2 * _.length - 1; 0 <= g; g--) e = (n << 15 | _.__halfDigit(g)) >>> 0, n = 0 | e %
                t;
            return n
        }, o.__absoluteDivLarge = function (_, t, i, e) {
            var g = t.__halfDigitLength(),
                n = t.length,
                s = _.__halfDigitLength() - g,
                l = null;
            i && (l = new o(s + 2 >>> 1, !1), l.__initializeDigits());
            var r = new o(g + 2 >>> 1, !1);
            r.__initializeDigits();
            var a = o.__clz15(t.__halfDigit(g - 1));
            0 < a && (t = o.__specialLeftShift(t, a, 0));
            for (var d = o.__specialLeftShift(_, a, 1), u = t.__halfDigit(g - 1), h = 0, b = s; 0 <= b; b--) {
                var m = 32767,
                    p = d.__halfDigit(b + g);
                if (p !== u) {
                    var D = (p << 15 | d.__halfDigit(b + g - 1)) >>> 0;
                    m = 0 | D / u;
                    for (var f = 0 | D % u, B = t.__halfDigit(g - 2), S = d.__halfDigit(b + g - 2); o.__imul(m, B) >>>
                        0 > (f << 16 | S) >>> 0 && (m--, f += u, !(32767 < f)););
                }
                o.__internalMultiplyAdd(t, m, 0, n, r);
                var v = d.__inplaceSub(r, b, g + 1);
                0 !== v && (v = d.__inplaceAdd(t, b, g), d.__setHalfDigit(b + g, 32767 & d.__halfDigit(b + g) + v),
                    m--), i && (1 & b ? h = m << 15 : l.__setDigit(b >>> 1, h | m))
            }
            if (e) return d.__inplaceRightShift(a), i ? {
                quotient: l,
                remainder: d
            } : d;
            if (i) return l;
            throw new Error("unreachable")
        }, o.__clz15 = function (_) {
            return o.__clz30(_) - 15
        }, o.prototype.__inplaceAdd = function (_, t, e) {
            for (var n, g = 0, o = 0; o < e; o++) n = this.__halfDigit(t + o) + _.__halfDigit(o) + g, g = n >>> 15,
                this.__setHalfDigit(t + o, 32767 & n);
            return g
        }, o.prototype.__inplaceSub = function (_, t, e) {
            var n = 0;
            if (1 & t) {
                t >>= 1;
                for (var g = this.__digit(t), o = 32767 & g, s = 0; s < e - 1 >>> 1; s++) {
                    var l = _.__digit(s),
                        r = (g >>> 15) - (32767 & l) - n;
                    n = 1 & r >>> 15, this.__setDigit(t + s, (32767 & r) << 15 | 32767 & o), g = this.__digit(t + s +
                        1), o = (32767 & g) - (l >>> 15) - n, n = 1 & o >>> 15
                }
                var a = _.__digit(s),
                    u = (g >>> 15) - (32767 & a) - n;
                n = 1 & u >>> 15, this.__setDigit(t + s, (32767 & u) << 15 | 32767 & o);
                var d = a >>> 15;
                if (t + s + 1 >= this.length) throw new RangeError("out of bounds");
                0 == (1 & e) && (g = this.__digit(t + s + 1), o = (32767 & g) - d - n, n = 1 & o >>> 15, this.__setDigit(
                    t + _.length, 1073709056 & g | 32767 & o))
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
                0 == (1 & e) && (u = (g >>> 15) - (a >>> 15) - n, n = 1 & u >>> 15), this.__setDigit(t + s, (32767 &
                    u) << 15 | 32767 & o)
            }
            return n
        }, o.prototype.__inplaceRightShift = function (_) {
            if (0 !== _) {
                for (var t, e = this.__digit(0) >>> _, n = this.length - 1, g = 0; g < n; g++) t = this.__digit(g +
                    1), this.__setDigit(g, 1073741823 & t << 30 - _ | e), e = t >>> _;
                this.__setDigit(n, e)
            }
        }, o.__specialLeftShift = function (_, t, e) {
            var g = _.length,
                n = new o(g + e, !1);
            if (0 === t) {
                for (var s = 0; s < g; s++) n.__setDigit(s, _.__digit(s));
                return 0 < e && n.__setDigit(g, 0), n
            }
            for (var l, r = 0, s = 0; s < g; s++) l = _.__digit(s), n.__setDigit(s, 1073741823 & l << t | r), r = l >>>
                30 - t;
            return 0 < e && n.__setDigit(g, r), n
        }, o.__leftShiftByAbsolute = function (_, t) {
            var e = o.__toShiftAmount(t);
            if (0 > e) throw new RangeError("BigInt too big");
            var n = 0 | e / 30,
                g = e % 30,
                s = _.length,
                l = 0 !== g && 0 != _.__digit(s - 1) >>> 30 - g,
                r = s + n + (l ? 1 : 0),
                a = new o(r, _.sign);
            if (0 === g) {
                for (var u = 0; u < n; u++) a.__setDigit(u, 0);
                for (; u < r; u++) a.__setDigit(u, _.__digit(u - n))
            } else {
                for (var h = 0, u = 0; u < n; u++) a.__setDigit(u, 0);
                for (var b, u = 0; u < s; u++) b = _.__digit(u), a.__setDigit(u + n, 1073741823 & b << g | h), h =
                    b >>> 30 - g;
                if (l) a.__setDigit(s + n, h);
                else if (0 !== h) throw new Error("implementation bug")
            }
            return a.__trim()
        }, o.__rightShiftByAbsolute = function (_, t) {
            var e = _.length,
                n = _.sign,
                g = o.__toShiftAmount(t);
            if (0 > g) return o.__rightShiftByMaximum(n);
            var s = 0 | g / 30,
                l = g % 30,
                r = e - s;
            if (0 >= r) return o.__rightShiftByMaximum(n);
            var a = !1;
            if (n) {
                if (0 != (_.__digit(s) & (1 << l) - 1)) a = !0;
                else
                    for (var u = 0; u < s; u++)
                        if (0 !== _.__digit(u)) {
                            a = !0;
                            break
                        }
            }
            if (a && 0 === l) {
                var h = _.__digit(e - 1);
                0 == ~h && r++
            }
            var b = new o(r, n);
            if (0 === l) {
                b.__setDigit(r - 1, 0);
                for (var u = s; u < e; u++) b.__setDigit(u - s, _.__digit(u))
            } else {
                for (var m, c = _.__digit(s) >>> l, p = e - s - 1, u = 0; u < p; u++) m = _.__digit(u + s + 1), b.__setDigit(
                    u, 1073741823 & m << 30 - l | c), c = m >>> l;
                b.__setDigit(p, c)
            }
            return a && (b = o.__absoluteAddOne(b, !0, b)), b.__trim()
        }, o.__rightShiftByMaximum = function (_) {
            return _ ? o.__oneDigit(1, !0) : o.__zero()
        }, o.__toShiftAmount = function (_) {
            if (1 < _.length) return -1;
            var t = _.__unsignedDigit(0);
            return t > o.__kMaxLengthBits ? -1 : t
        }, o.__toPrimitive = function (_, t) {
            if (void 0 === t && (t = "default"), "object" != typeof _) return _;
            if (_.constructor === o) return _;
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
        }, o.__toNumeric = function (_) {
            return o.__isBigInt(_) ? _ : +_
        }, o.__isBigInt = function (_) {
            return "object" == typeof _ && null !== _ && _.constructor === o
        }, o.__truncateToNBits = function (_, t) {
            for (var e = 0 | (_ + 29) / 30, n = new o(e, t.sign), g = e - 1, s = 0; s < g; s++) n.__setDigit(s, t.__digit(
                s));
            var l = t.__digit(g);
            if (0 != _ % 30) {
                var r = 32 - _ % 30;
                l = l << r >>> r
            }
            return n.__setDigit(g, l), n.__trim()
        }, o.__truncateAndSubFromPowerOfTwo = function (_, t, e) {
            for (var n = Math.min, g, s = 0 | (_ + 29) / 30, l = new o(s, e), a = 0, u = s - 1, d = 0, h = n(u, t.length); a <
                h; a++) g = 0 - t.__digit(a) - d, d = 1 & g >>> 30, l.__setDigit(a, 1073741823 & g);
            for (; a < u; a++) l.__setDigit(a, 0 | 1073741823 & -d);
            var b, m = u < t.length ? t.__digit(u) : 0,
                c = _ % 30;
            if (0 === c) b = 0 - m - d, b &= 1073741823;
            else {
                var p = 32 - c;
                m = m << p >>> p;
                var D = 1 << 32 - p;
                b = D - m - d, b &= D - 1
            }
            return l.__setDigit(u, b), l.__trim()
        }, o.prototype.__digit = function (_) {
            return this[_]
        }, o.prototype.__unsignedDigit = function (_) {
            return this[_] >>> 0
        }, o.prototype.__setDigit = function (_, t) {
            this[_] = 0 | t
        }, o.prototype.__setDigitGrow = function (_, t) {
            this[_] = 0 | t
        }, o.prototype.__halfDigitLength = function () {
            var _ = this.length;
            return 32767 >= this.__unsignedDigit(_ - 1) ? 2 * _ - 1 : 2 * _
        }, o.prototype.__halfDigit = function (_) {
            return 32767 & this[_ >>> 1] >>> 15 * (1 & _)
        }, o.prototype.__setHalfDigit = function (_, t) {
            var i = _ >>> 1,
                e = this.__digit(i),
                n = 1 & _ ? 32767 & e | t << 15 : 1073709056 & e | 32767 & t;
            this.__setDigit(i, n)
        }, o.__digitPow = function (_, t) {
            for (var i = 1; 0 < t;) 1 & t && (i *= _), t >>>= 1, _ *= _;
            return i
        }, o.__isOneDigitInt = function (_) {
            return (1073741823 & _) === _
        }, o.__kMaxLength = 33554432, o.__kMaxLengthBits = o.__kMaxLength << 5, o.__kMaxBitsPerChar = [0, 0, 32, 51,
            64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149,
            151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166], o.__kBitsPerCharTableShift = 5, o.__kBitsPerCharTableMultiplier =
        1 << o.__kBitsPerCharTableShift, o.__kConversionChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
            "v", "w", "x", "y", "z"], o.__kBitConversionBuffer = new ArrayBuffer(8), o.__kBitConversionDouble = new Float64Array(
            o.__kBitConversionBuffer), o.__kBitConversionInts = new Int32Array(o.__kBitConversionBuffer), o.__clz30 =
        i ? function (_) {
            return i(_) - 2
        } : function (_) {
            var t = Math.LN2,
                i = Math.log;
            return 0 === _ ? 30 : 0 | 29 - (0 | i(_ >>> 0) / t)
        }, o.__imul = t || function (_, t) {
            return 0 | _ * t
        }, o
}(Array);
module.exports = JSBI;
//# sourceMappingURL=jsbi-cjs.js.map