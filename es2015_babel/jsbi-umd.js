(function (i, _) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = _() : "function" == typeof define &&
        define.amd ? define(_) : (i = i || self, i.JSBI = _())
})(this, function () {
    'use strict';
    var i = Math.imul,
        _ = Math.clz32,
        t = Math.abs,
        e = Math.max,
        g = Math.floor;
    class s extends Array {
        constructor(i, _) {
            if (super(i), this.sign = _, i > s.__kMaxLength) throw new RangeError(
                "Maximum BigInt size exceeded")
        }
        static BigInt(i) {
            var _ = Number.isFinite;
            if ("number" == typeof i) {
                if (0 === i) return s.__zero();
                if (s.__isOneDigitInt(i)) return 0 > i ? s.__oneDigit(-i, !0) : s.__oneDigit(i, !1);
                if (!_(i) || g(i) !== i) throw new RangeError("The number " + i +
                    " cannot be converted to BigInt because it is not an integer");
                return s.__fromDouble(i)
            }
            if ("string" == typeof i) {
                const _ = s.__fromString(i);
                if (null === _) throw new SyntaxError("Cannot convert " + i + " to a BigInt");
                return _
            }
            if ("boolean" == typeof i) return !0 === i ? s.__oneDigit(1, !1) : s.__zero();
            if ("object" == typeof i) {
                if (i.constructor === s) return i;
                const _ = s.__toPrimitive(i);
                return s.BigInt(_)
            }
            throw new TypeError("Cannot convert " + i + " to a BigInt")
        }
        toDebugString() {
            const i = ["BigInt["];
            for (const _ of this) i.push((_ ? (_ >>> 0).toString(16) : _) + ", ");
            return i.push("]"), i.join("")
        }
        toString(i = 10) {
            if (2 > i || 36 < i) throw new RangeError("toString() radix argument must be between 2 and 36");
            return 0 === this.length ? "0" : 0 == (i & i - 1) ? s.__toStringBasePowerOfTwo(this, i) : s.__toStringGeneric(
                this, i, !1)
        }
        valueOf() {
            throw new Error("Convert JSBI instances to native numbers using `toNumber`.")
        }
        static toNumber(i) {
            const _ = i.length;
            if (0 === _) return 0;
            if (1 === _) {
                const _ = i.__unsignedDigit(0);
                return i.sign ? -_ : _
            }
            const t = i.__digit(_ - 1),
                e = s.__clz30(t),
                n = 30 * _ - e;
            if (1024 < n) return i.sign ? -Infinity : 1 / 0;
            let g = n - 1,
                o = t,
                l = _ - 1;
            const r = e + 3;
            let a = 32 === r ? 0 : o << r;
            a >>>= 12;
            const u = r - 12;
            let d = 12 <= r ? 0 : o << 20 + r,
                h = 20 + r;
            for (0 < u && 0 < l && (l--, o = i.__digit(l), a |= o >>> 30 - u, d = o << u + 2, h = u + 2); 0 < h &&
                0 < l;) l--, o = i.__digit(l), d |= 30 <= h ? o << h - 30 : o >>> 30 - h, h -= 30;
            const m = s.__decideRounding(i, h, l, o);
            if ((1 === m || 0 === m && 1 == (1 & d)) && (d = d + 1 >>> 0, 0 === d && (a++, 0 != a >>> 20 && (a =
                    0, g++, 1023 < g)))) return i.sign ? -Infinity : 1 / 0;
            const b = i.sign ? -2147483648 : 0;
            return g = g + 1023 << 20, s.__kBitConversionInts[1] = b | g | a, s.__kBitConversionInts[0] = d, s.__kBitConversionDouble[
                0]
        }
        static unaryMinus(i) {
            if (0 === i.length) return i;
            const _ = i.__copy();
            return _.sign = !i.sign, _
        }
        static bitwiseNot(i) {
            return i.sign ? s.__absoluteSubOne(i).__trim() : s.__absoluteAddOne(i, !0)
        }
        static exponentiate(i, _) {
            if (_.sign) throw new RangeError("Exponent must be positive");
            if (0 === _.length) return s.__oneDigit(1, !1);
            if (0 === i.length) return i;
            if (1 === i.length && 1 === i.__digit(0)) return i.sign && 0 == (1 & _.__digit(0)) ? s.unaryMinus(i) :
                i;
            if (1 < _.length) throw new RangeError("BigInt too big");
            let t = _.__unsignedDigit(0);
            if (1 === t) return i;
            if (t >= s.__kMaxLengthBits) throw new RangeError("BigInt too big");
            if (1 === i.length && 2 === i.__digit(0)) {
                const _ = 1 + (0 | t / 30),
                    e = i.sign && 0 != (1 & t),
                    n = new s(_, e);
                n.__initializeDigits();
                const g = 1 << t % 30;
                return n.__setDigit(_ - 1, g), n
            }
            let e = null,
                n = i;
            for (0 != (1 & t) && (e = i), t >>= 1; 0 !== t; t >>= 1) n = s.multiply(n, n), 0 != (1 & t) && (
                null === e ? e = n : e = s.multiply(e, n));
            return e
        }
        static multiply(_, t) {
            if (0 === _.length) return _;
            if (0 === t.length) return t;
            let i = _.length + t.length;
            30 <= _.__clzmsd() + t.__clzmsd() && i--;
            const e = new s(i, _.sign !== t.sign);
            e.__initializeDigits();
            for (let n = 0; n < _.length; n++) s.__multiplyAccumulate(t, _.__digit(n), e, n);
            return e.__trim()
        }
        static divide(i, _) {
            if (0 === _.length) throw new RangeError("Division by zero");
            if (0 > s.__absoluteCompare(i, _)) return s.__zero();
            const t = i.sign !== _.sign,
                e = _.__unsignedDigit(0);
            let n;
            if (1 === _.length && 32767 >= e) {
                if (1 === e) return t === i.sign ? i : s.unaryMinus(i);
                n = s.__absoluteDivSmall(i, e, null)
            } else n = s.__absoluteDivLarge(i, _, !0, !1);
            return n.sign = t, n.__trim()
        }
        static remainder(i, _) {
            if (0 === _.length) throw new RangeError("Division by zero");
            if (0 > s.__absoluteCompare(i, _)) return i;
            const t = _.__unsignedDigit(0);
            if (1 === _.length && 32767 >= t) {
                if (1 === t) return s.__zero();
                const _ = s.__absoluteModSmall(i, t);
                return 0 === _ ? s.__zero() : s.__oneDigit(_, i.sign)
            }
            const e = s.__absoluteDivLarge(i, _, !1, !0);
            return e.sign = i.sign, e.__trim()
        }
        static add(i, _) {
            const t = i.sign;
            return t === _.sign ? s.__absoluteAdd(i, _, t) : 0 <= s.__absoluteCompare(i, _) ? s.__absoluteSub(i,
                _, t) : s.__absoluteSub(_, i, !t)
        }
        static subtract(i, _) {
            const t = i.sign;
            return t === _.sign ? 0 <= s.__absoluteCompare(i, _) ? s.__absoluteSub(i, _, t) : s.__absoluteSub(_,
                i, !t) : s.__absoluteAdd(i, _, t)
        }
        static leftShift(i, _) {
            return 0 === _.length || 0 === i.length ? i : _.sign ? s.__rightShiftByAbsolute(i, _) : s.__leftShiftByAbsolute(
                i, _)
        }
        static signedRightShift(i, _) {
            return 0 === _.length || 0 === i.length ? i : _.sign ? s.__leftShiftByAbsolute(i, _) : s.__rightShiftByAbsolute(
                i, _)
        }
        static unsignedRightShift() {
            throw new TypeError("BigInts have no unsigned right shift; use >> instead")
        }
        static lessThan(i, _) {
            return 0 > s.__compareToBigInt(i, _)
        }
        static lessThanOrEqual(i, _) {
            return 0 >= s.__compareToBigInt(i, _)
        }
        static greaterThan(i, _) {
            return 0 < s.__compareToBigInt(i, _)
        }
        static greaterThanOrEqual(i, _) {
            return 0 <= s.__compareToBigInt(i, _)
        }
        static equal(_, t) {
            if (_.sign !== t.sign) return !1;
            if (_.length !== t.length) return !1;
            for (let e = 0; e < _.length; e++)
                if (_.__digit(e) !== t.__digit(e)) return !1;
            return !0
        }
        static notEqual(i, _) {
            return !s.equal(i, _)
        }
        static bitwiseAnd(i, _) {
            if (!i.sign && !_.sign) return s.__absoluteAnd(i, _).__trim();
            if (i.sign && _.sign) {
                const t = e(i.length, _.length) + 1;
                let n = s.__absoluteSubOne(i, t);
                const g = s.__absoluteSubOne(_);
                return n = s.__absoluteOr(n, g, n), s.__absoluteAddOne(n, !0, n).__trim()
            }
            return i.sign && ([i, _] = [_, i]), s.__absoluteAndNot(i, s.__absoluteSubOne(_)).__trim()
        }
        static bitwiseXor(i, _) {
            if (!i.sign && !_.sign) return s.__absoluteXor(i, _).__trim();
            if (i.sign && _.sign) {
                const t = e(i.length, _.length),
                    n = s.__absoluteSubOne(i, t),
                    g = s.__absoluteSubOne(_);
                return s.__absoluteXor(n, g, n).__trim()
            }
            const t = e(i.length, _.length) + 1;
            i.sign && ([i, _] = [_, i]);
            let n = s.__absoluteSubOne(_, t);
            return n = s.__absoluteXor(n, i, n), s.__absoluteAddOne(n, !0, n).__trim()
        }
        static bitwiseOr(i, _) {
            const t = e(i.length, _.length);
            if (!i.sign && !_.sign) return s.__absoluteOr(i, _).__trim();
            if (i.sign && _.sign) {
                let e = s.__absoluteSubOne(i, t);
                const n = s.__absoluteSubOne(_);
                return e = s.__absoluteAnd(e, n, e), s.__absoluteAddOne(e, !0, e).__trim()
            }
            i.sign && ([i, _] = [_, i]);
            let n = s.__absoluteSubOne(_, t);
            return n = s.__absoluteAndNot(n, i, n), s.__absoluteAddOne(n, !0, n).__trim()
        }
        static asIntN(_, t) {
            if (0 === t.length) return t;
            if (_ = g(_), 0 > _) throw new RangeError("Invalid value: not (convertible to) a safe integer");
            if (0 === _) return s.__zero();
            if (_ >= s.__kMaxLengthBits) return t;
            const e = 0 | (_ + 29) / 30;
            if (t.length < e) return t;
            const o = t.__unsignedDigit(e - 1),
                l = 1 << (_ - 1) % 30;
            if (t.length === e && o < l) return t;
            if (!((o & l) === l)) return s.__truncateToNBits(_, t);
            if (!t.sign) return s.__truncateAndSubFromPowerOfTwo(_, t, !0);
            if (0 == (o & l - 1)) {
                for (let n = e - 2; 0 <= n; n--)
                    if (0 !== t.__digit(n)) return s.__truncateAndSubFromPowerOfTwo(_, t, !1);
                return t.length === e && o === l ? t : s.__truncateToNBits(_, t)
            }
            return s.__truncateAndSubFromPowerOfTwo(_, t, !1)
        }
        static asUintN(i, _) {
            if (0 === _.length) return _;
            if (i = g(i), 0 > i) throw new RangeError("Invalid value: not (convertible to) a safe integer");
            if (0 === i) return s.__zero();
            if (_.sign) {
                if (i > s.__kMaxLengthBits) throw new RangeError("BigInt too big");
                return s.__truncateAndSubFromPowerOfTwo(i, _, !1)
            }
            if (i >= s.__kMaxLengthBits) return _;
            const t = 0 | (i + 29) / 30;
            if (_.length < t) return _;
            const e = i % 30;
            if (_.length == t) {
                if (0 === e) return _;
                const i = _.__digit(t - 1);
                if (0 == i >>> e) return _
            }
            return s.__truncateToNBits(i, _)
        }
        static ADD(i, _) {
            if (i = s.__toPrimitive(i), _ = s.__toPrimitive(_), "string" == typeof i) return "string" != typeof _ &&
                (_ = _.toString()), i + _;
            if ("string" == typeof _) return i.toString() + _;
            if (i = s.__toNumeric(i), _ = s.__toNumeric(_), s.__isBigInt(i) && s.__isBigInt(_)) return s.add(i,
                _);
            if ("number" == typeof i && "number" == typeof _) return i + _;
            throw new TypeError("Cannot mix BigInt and other types, use explicit conversions")
        }
        static LT(i, _) {
            return s.__compare(i, _, 0)
        }
        static LE(i, _) {
            return s.__compare(i, _, 1)
        }
        static GT(i, _) {
            return s.__compare(i, _, 2)
        }
        static GE(i, _) {
            return s.__compare(i, _, 3)
        }
        static EQ(i, _) {
            for (;;) {
                if (s.__isBigInt(i)) return s.__isBigInt(_) ? s.equal(i, _) : s.EQ(_, i);
                if ("number" == typeof i) {
                    if (s.__isBigInt(_)) return s.__equalToNumber(_, i);
                    if ("object" != typeof _) return i == _;
                    _ = s.__toPrimitive(_)
                } else if ("string" == typeof i) {
                    if (s.__isBigInt(_)) return i = s.__fromString(i), null !== i && s.equal(i, _);
                    if ("object" != typeof _) return i == _;
                    _ = s.__toPrimitive(_)
                } else if ("boolean" == typeof i) {
                    if (s.__isBigInt(_)) return s.__equalToNumber(_, +i);
                    if ("object" != typeof _) return i == _;
                    _ = s.__toPrimitive(_)
                } else if ("symbol" == typeof i) {
                    if (s.__isBigInt(_)) return !1;
                    if ("object" != typeof _) return i == _;
                    _ = s.__toPrimitive(_)
                } else if ("object" == typeof i) {
                    if ("object" == typeof _ && _.constructor !== s) return i == _;
                    i = s.__toPrimitive(i)
                } else return i == _
            }
        }
        static NE(i, _) {
            return !s.EQ(i, _)
        }
        static __zero() {
            return new s(0, !1)
        }
        static __oneDigit(i, _) {
            const t = new s(1, _);
            return t.__setDigit(0, i), t
        }
        __copy() {
            const _ = new s(this.length, this.sign);
            for (let t = 0; t < this.length; t++) _[t] = this[t];
            return _
        }
        __trim() {
            let i = this.length,
                _ = this[i - 1];
            for (; 0 === _;) i--, _ = this[i - 1], this.pop();
            return 0 === i && (this.sign = !1), this
        }
        __initializeDigits() {
            for (let _ = 0; _ < this.length; _++) this[_] = 0
        }
        static __decideRounding(i, _, t, e) {
            if (0 < _) return -1;
            let n;
            if (0 > _) n = -_ - 1;
            else {
                if (0 === t) return -1;
                t--, e = i.__digit(t), n = 29
            }
            let g = 1 << n;
            if (0 == (e & g)) return -1;
            if (g -= 1, 0 != (e & g)) return 1;
            for (; 0 < t;)
                if (t--, 0 !== i.__digit(t)) return 1;
            return 0
        }
        static __fromDouble(i) {
            s.__kBitConversionDouble[0] = i;
            const _ = 2047 & s.__kBitConversionInts[1] >>> 20,
                t = _ - 1023,
                e = (0 | t / 30) + 1,
                n = new s(e, 0 > i);
            let g = 1048575 & s.__kBitConversionInts[1] | 1048576,
                o = s.__kBitConversionInts[0];
            const l = 20,
                r = t % 30;
            let a, u = 0;
            if (20 > r) {
                const i = l - r;
                u = i + 32, a = g >>> i, g = g << 32 - i | o >>> i, o <<= 32 - i
            } else if (20 === r) u = 32, a = g, g = o, o = 0;
            else {
                const i = r - l;
                u = 32 - i, a = g << i | o >>> 32 - i, g = o << i, o = 0
            }
            n.__setDigit(e - 1, a);
            for (let _ = e - 2; 0 <= _; _--) 0 < u ? (u -= 30, a = g >>> 2, g = g << 30 | o >>> 2, o <<= 30) :
                a = 0, n.__setDigit(_, a);
            return n.__trim()
        }
        static __isWhitespace(i) {
            return !!(13 >= i && 9 <= i) || (159 >= i ? 32 == i : 131071 >= i ? 160 == i || 5760 == i : 196607 >=
                i ? (i &= 131071, 10 >= i || 40 == i || 41 == i || 47 == i || 95 == i || 4096 == i) : 65279 ==
                i)
        }
        static __fromString(i, _ = 0) {
            let t = 0;
            const e = i.length;
            let n = 0;
            if (n === e) return s.__zero();
            let g = i.charCodeAt(n);
            for (; s.__isWhitespace(g);) {
                if (++n === e) return s.__zero();
                g = i.charCodeAt(n)
            }
            if (43 === g) {
                if (++n === e) return null;
                g = i.charCodeAt(n), t = 1
            } else if (45 === g) {
                if (++n === e) return null;
                g = i.charCodeAt(n), t = -1
            }
            if (0 === _) {
                if (_ = 10, 48 === g) {
                    if (++n === e) return s.__zero();
                    if (g = i.charCodeAt(n), 88 === g || 120 === g) {
                        if (_ = 16, ++n === e) return null;
                        g = i.charCodeAt(n)
                    } else if (79 === g || 111 === g) {
                        if (_ = 8, ++n === e) return null;
                        g = i.charCodeAt(n)
                    } else if (66 === g || 98 === g) {
                        if (_ = 2, ++n === e) return null;
                        g = i.charCodeAt(n)
                    }
                }
            } else if (16 === _ && 48 === g) {
                if (++n === e) return s.__zero();
                if (g = i.charCodeAt(n), 88 === g || 120 === g) {
                    if (++n === e) return null;
                    g = i.charCodeAt(n)
                }
            }
            if (0 != t && 10 !== _) return null;
            for (; 48 === g;) {
                if (++n === e) return s.__zero();
                g = i.charCodeAt(n)
            }
            const o = e - n;
            let l = s.__kMaxBitsPerChar[_],
                r = s.__kBitsPerCharTableMultiplier - 1;
            if (o > 1073741824 / l) return null;
            const a = l * o + r >>> s.__kBitsPerCharTableShift,
                u = new s(0 | (a + 29) / 30, !1),
                h = 10 > _ ? _ : 10,
                b = 10 < _ ? _ - 10 : 0;
            if (0 == (_ & _ - 1)) {
                l >>= s.__kBitsPerCharTableShift;
                const _ = [],
                    t = [];
                let o = !1;
                do {
                    let s = 0,
                        r = 0;
                    for (;;) {
                        let _;
                        if (g - 48 >>> 0 < h) _ = g - 48;
                        else if ((32 | g) - 97 >>> 0 < b) _ = (32 | g) - 87;
                        else {
                            o = !0;
                            break
                        }
                        if (r += l, s = s << l | _, ++n === e) {
                            o = !0;
                            break
                        }
                        if (g = i.charCodeAt(n), 30 < r + l) break
                    }
                    _.push(s), t.push(r)
                } while (!o);
                s.__fillFromParts(u, _, t)
            } else {
                u.__initializeDigits();
                let t = !1,
                    o = 0;
                do {
                    let a = 0,
                        D = 1;
                    for (;;) {
                        let s;
                        if (g - 48 >>> 0 < h) s = g - 48;
                        else if ((32 | g) - 97 >>> 0 < b) s = (32 | g) - 87;
                        else {
                            t = !0;
                            break
                        }
                        const l = D * _;
                        if (1073741823 < l) break;
                        if (D = l, a = a * _ + s, o++, ++n === e) {
                            t = !0;
                            break
                        }
                        g = i.charCodeAt(n)
                    }
                    r = 30 * s.__kBitsPerCharTableMultiplier - 1;
                    const c = 0 | (l * o + r >>> s.__kBitsPerCharTableShift) / 30;
                    u.__inplaceMultiplyAdd(D, a, c)
                } while (!t)
            }
            if (n !== e) {
                if (!s.__isWhitespace(g)) return null;
                for (n++; n < e; n++)
                    if (g = i.charCodeAt(n), !s.__isWhitespace(g)) return null
            }
            return u.sign = -1 == t, u.__trim()
        }
        static __fillFromParts(_, t, e) {
            let n = 0,
                g = 0,
                s = 0;
            for (let o = t.length - 1; 0 <= o; o--) {
                const i = t[o],
                    l = e[o];
                g |= i << s, s += l, 30 === s ? (_.__setDigit(n++, g), s = 0, g = 0) : 30 < s && (_.__setDigit(
                    n++, 1073741823 & g), s -= 30, g = i >>> l - s)
            }
            if (0 !== g) {
                if (n >= _.length) throw new Error("implementation bug");
                _.__setDigit(n++, g)
            }
            for (; n < _.length; n++) _.__setDigit(n, 0)
        }
        static __toStringBasePowerOfTwo(_, i) {
            const t = _.length;
            let e = i - 1;
            e = (85 & e >>> 1) + (85 & e), e = (51 & e >>> 2) + (51 & e), e = (15 & e >>> 4) + (15 & e);
            const n = e,
                g = i - 1,
                o = _.__digit(t - 1),
                l = s.__clz30(o);
            let r = 0 | (30 * t - l + n - 1) / n;
            if (_.sign && r++, 268435456 < r) throw new Error("string too long");
            const a = Array(r);
            let u = r - 1,
                d = 0,
                h = 0;
            for (let e = 0; e < t - 1; e++) {
                const i = _.__digit(e),
                    t = (d | i << h) & g;
                a[u--] = s.__kConversionChars[t];
                const o = n - h;
                for (d = i >>> o, h = 30 - o; h >= n;) a[u--] = s.__kConversionChars[d & g], d >>>= n, h -= n
            }
            const m = (d | o << h) & g;
            for (a[u--] = s.__kConversionChars[m], d = o >>> n - h; 0 !== d;) a[u--] = s.__kConversionChars[d &
                g], d >>>= n;
            if (_.sign && (a[u--] = "-"), -1 != u) throw new Error("implementation bug");
            return a.join("")
        }
        static __toStringGeneric(_, i, t) {
            const e = _.length;
            if (0 === e) return "";
            if (1 === e) {
                let e = _.__unsignedDigit(0).toString(i);
                return !1 === t && _.sign && (e = "-" + e), e
            }
            const n = 30 * e - s.__clz30(_.__digit(e - 1)),
                g = s.__kMaxBitsPerChar[i],
                o = g - 1;
            let l = n * s.__kBitsPerCharTableMultiplier;
            l += o - 1, l = 0 | l / o;
            const r = l + 1 >> 1,
                a = s.exponentiate(s.__oneDigit(i, !1), s.__oneDigit(r, !1));
            let u, d;
            const h = a.__unsignedDigit(0);
            if (1 === a.length && 32767 >= h) {
                u = new s(_.length, !1), u.__initializeDigits();
                let t = 0;
                for (let e = 2 * _.length - 1; 0 <= e; e--) {
                    const i = t << 15 | _.__halfDigit(e);
                    u.__setHalfDigit(e, 0 | i / h), t = 0 | i % h
                }
                d = t.toString(i)
            } else {
                const t = s.__absoluteDivLarge(_, a, !0, !0);
                u = t.quotient;
                const e = t.remainder.__trim();
                d = s.__toStringGeneric(e, i, !0)
            }
            u.__trim();
            let m = s.__toStringGeneric(u, i, !0);
            for (; d.length < r;) d = "0" + d;
            return !1 === t && _.sign && (m = "-" + m), m + d
        }
        static __unequalSign(i) {
            return i ? -1 : 1
        }
        static __absoluteGreater(i) {
            return i ? -1 : 1
        }
        static __absoluteLess(i) {
            return i ? 1 : -1
        }
        static __compareToBigInt(i, _) {
            const t = i.sign;
            if (t !== _.sign) return s.__unequalSign(t);
            const e = s.__absoluteCompare(i, _);
            return 0 < e ? s.__absoluteGreater(t) : 0 > e ? s.__absoluteLess(t) : 0
        }
        static __compareToNumber(i, _) {
            if (s.__isOneDigitInt(_)) {
                const e = i.sign,
                    n = 0 > _;
                if (e !== n) return s.__unequalSign(e);
                if (0 === i.length) {
                    if (n) throw new Error("implementation bug");
                    return 0 === _ ? 0 : -1
                }
                if (1 < i.length) return s.__absoluteGreater(e);
                const g = t(_),
                    o = i.__unsignedDigit(0);
                return o > g ? s.__absoluteGreater(e) : o < g ? s.__absoluteLess(e) : 0
            }
            return s.__compareToDouble(i, _)
        }
        static __compareToDouble(i, _) {
            if (_ !== _) return _;
            if (_ === 1 / 0) return -1;
            if (_ === -Infinity) return 1;
            const t = i.sign;
            if (t !== 0 > _) return s.__unequalSign(t);
            if (0 === _) throw new Error("implementation bug: should be handled elsewhere");
            if (0 === i.length) return -1;
            s.__kBitConversionDouble[0] = _;
            const e = 2047 & s.__kBitConversionInts[1] >>> 20;
            if (2047 == e) throw new Error("implementation bug: handled elsewhere");
            const n = e - 1023;
            if (0 > n) return s.__absoluteGreater(t);
            const g = i.length;
            let o = i.__digit(g - 1);
            const l = s.__clz30(o),
                r = 30 * g - l,
                a = n + 1;
            if (r < a) return s.__absoluteLess(t);
            if (r > a) return s.__absoluteGreater(t);
            let u = 1048576 | 1048575 & s.__kBitConversionInts[1],
                d = s.__kBitConversionInts[0];
            const h = 20,
                m = 29 - l;
            if (m !== (0 | (r - 1) % 30)) throw new Error("implementation bug");
            let b, D = 0;
            if (20 > m) {
                const i = h - m;
                D = i + 32, b = u >>> i, u = u << 32 - i | d >>> i, d <<= 32 - i
            } else if (20 === m) D = 32, b = u, u = d, d = 0;
            else {
                const i = m - h;
                D = 32 - i, b = u << i | d >>> 32 - i, u = d << i, d = 0
            }
            if (o >>>= 0, b >>>= 0, o > b) return s.__absoluteGreater(t);
            if (o < b) return s.__absoluteLess(t);
            for (let e = g - 2; 0 <= e; e--) {
                0 < D ? (D -= 30, b = u >>> 2, u = u << 30 | d >>> 2, d <<= 30) : b = 0;
                const _ = i.__unsignedDigit(e);
                if (_ > b) return s.__absoluteGreater(t);
                if (_ < b) return s.__absoluteLess(t)
            }
            if (0 !== u || 0 !== d) {
                if (0 === D) throw new Error("implementation bug");
                return s.__absoluteLess(t)
            }
            return 0
        }
        static __equalToNumber(i, _) {
            return s.__isOneDigitInt(_) ? 0 === _ ? 0 === i.length : 1 === i.length && i.sign === 0 > _ && i.__unsignedDigit(
                0) === t(_) : 0 === s.__compareToDouble(i, _)
        }
        static __comparisonResultToBool(i, _) {
            return 0 === _ ? 0 > i : 1 === _ ? 0 >= i : 2 === _ ? 0 < i : 3 === _ ? 0 <= i : void 0
        }
        static __compare(i, _, t) {
            if (i = s.__toPrimitive(i), _ = s.__toPrimitive(_), "string" == typeof i && "string" == typeof _)
                switch (t) {
                    case 0:
                        return i < _;
                    case 1:
                        return i <= _;
                    case 2:
                        return i > _;
                    case 3:
                        return i >= _;
                }
            if (s.__isBigInt(i) && "string" == typeof _) return _ = s.__fromString(_), null !== _ && s.__comparisonResultToBool(
                s.__compareToBigInt(i, _), t);
            if ("string" == typeof i && s.__isBigInt(_)) return i = s.__fromString(i), null !== i && s.__comparisonResultToBool(
                s.__compareToBigInt(i, _), t);
            if (i = s.__toNumeric(i), _ = s.__toNumeric(_), s.__isBigInt(i)) {
                if (s.__isBigInt(_)) return s.__comparisonResultToBool(s.__compareToBigInt(i, _), t);
                if ("number" != typeof _) throw new Error("implementation bug");
                return s.__comparisonResultToBool(s.__compareToNumber(i, _), t)
            }
            if ("number" != typeof i) throw new Error("implementation bug");
            if (s.__isBigInt(_)) return s.__comparisonResultToBool(s.__compareToNumber(_, i), 2 ^ t);
            if ("number" != typeof _) throw new Error("implementation bug");
            return 0 === t ? i < _ : 1 === t ? i <= _ : 2 === t ? i > _ : 3 === t ? i >= _ : void 0
        }
        __clzmsd() {
            return s.__clz30(this.__digit(this.length - 1))
        }
        static __absoluteAdd(_, t, e) {
            if (_.length < t.length) return s.__absoluteAdd(t, _, e);
            if (0 === _.length) return _;
            if (0 === t.length) return _.sign === e ? _ : s.unaryMinus(_);
            let n = _.length;
            (0 === _.__clzmsd() || t.length === _.length && 0 === t.__clzmsd()) && n++;
            const g = new s(n, e);
            let o = 0,
                l = 0;
            for (; l < t.length; l++) {
                const i = _.__digit(l) + t.__digit(l) + o;
                o = i >>> 30, g.__setDigit(l, 1073741823 & i)
            }
            for (; l < _.length; l++) {
                const i = _.__digit(l) + o;
                o = i >>> 30, g.__setDigit(l, 1073741823 & i)
            }
            return l < g.length && g.__setDigit(l, o), g.__trim()
        }
        static __absoluteSub(_, t, e) {
            if (0 === _.length) return _;
            if (0 === t.length) return _.sign === e ? _ : s.unaryMinus(_);
            const n = new s(_.length, e);
            let g = 0,
                o = 0;
            for (; o < t.length; o++) {
                const i = _.__digit(o) - t.__digit(o) - g;
                g = 1 & i >>> 30, n.__setDigit(o, 1073741823 & i)
            }
            for (; o < _.length; o++) {
                const i = _.__digit(o) - g;
                g = 1 & i >>> 30, n.__setDigit(o, 1073741823 & i)
            }
            return n.__trim()
        }
        static __absoluteAddOne(_, i, t = null) {
            const e = _.length;
            null === t ? t = new s(e, i) : t.sign = i;
            let n = 1;
            for (let g = 0; g < e; g++) {
                const i = _.__digit(g) + n;
                n = i >>> 30, t.__setDigit(g, 1073741823 & i)
            }
            return 0 != n && t.__setDigitGrow(e, 1), t
        }
        static __absoluteSubOne(_, t) {
            const e = _.length;
            t = t || e;
            const n = new s(t, !1);
            let g = 1;
            for (let s = 0; s < e; s++) {
                const i = _.__digit(s) - g;
                g = 1 & i >>> 30, n.__setDigit(s, 1073741823 & i)
            }
            if (0 != g) throw new Error("implementation bug");
            for (let g = e; g < t; g++) n.__setDigit(g, 0);
            return n
        }
        static __absoluteAnd(_, t, e = null) {
            let n = _.length,
                g = t.length,
                o = g;
            if (n < g) {
                o = n;
                const i = _,
                    e = n;
                _ = t, n = g, t = i, g = e
            }
            let l = o;
            null === e ? e = new s(l, !1) : l = e.length;
            let r = 0;
            for (; r < o; r++) e.__setDigit(r, _.__digit(r) & t.__digit(r));
            for (; r < l; r++) e.__setDigit(r, 0);
            return e
        }
        static __absoluteAndNot(_, t, e = null) {
            const n = _.length,
                g = t.length;
            let o = g;
            n < g && (o = n);
            let l = n;
            null === e ? e = new s(l, !1) : l = e.length;
            let r = 0;
            for (; r < o; r++) e.__setDigit(r, _.__digit(r) & ~t.__digit(r));
            for (; r < n; r++) e.__setDigit(r, _.__digit(r));
            for (; r < l; r++) e.__setDigit(r, 0);
            return e
        }
        static __absoluteOr(_, t, e = null) {
            let n = _.length,
                g = t.length,
                o = g;
            if (n < g) {
                o = n;
                const i = _,
                    e = n;
                _ = t, n = g, t = i, g = e
            }
            let l = n;
            null === e ? e = new s(l, !1) : l = e.length;
            let r = 0;
            for (; r < o; r++) e.__setDigit(r, _.__digit(r) | t.__digit(r));
            for (; r < n; r++) e.__setDigit(r, _.__digit(r));
            for (; r < l; r++) e.__setDigit(r, 0);
            return e
        }
        static __absoluteXor(_, t, e = null) {
            let n = _.length,
                g = t.length,
                o = g;
            if (n < g) {
                o = n;
                const i = _,
                    e = n;
                _ = t, n = g, t = i, g = e
            }
            let l = n;
            null === e ? e = new s(l, !1) : l = e.length;
            let r = 0;
            for (; r < o; r++) e.__setDigit(r, _.__digit(r) ^ t.__digit(r));
            for (; r < n; r++) e.__setDigit(r, _.__digit(r));
            for (; r < l; r++) e.__setDigit(r, 0);
            return e
        }
        static __absoluteCompare(_, t) {
            const e = _.length - t.length;
            if (0 != e) return e;
            let n = _.length - 1;
            for (; 0 <= n && _.__digit(n) === t.__digit(n);) n--;
            return 0 > n ? 0 : _.__unsignedDigit(n) > t.__unsignedDigit(n) ? 1 : -1
        }
        static __multiplyAccumulate(_, t, e, n) {
            if (0 === t) return;
            const g = 32767 & t,
                o = t >>> 15;
            let l = 0,
                r = 0;
            for (let a, u = 0; u < _.length; u++, n++) {
                a = e.__digit(n);
                const i = _.__digit(u),
                    t = 32767 & i,
                    d = i >>> 15,
                    h = s.__imul(t, g),
                    m = s.__imul(t, o),
                    b = s.__imul(d, g),
                    D = s.__imul(d, o);
                a += r + h + l, l = a >>> 30, a &= 1073741823, a += ((32767 & m) << 15) + ((32767 & b) << 15),
                    l += a >>> 30, r = D + (m >>> 15) + (b >>> 15), e.__setDigit(n, 1073741823 & a)
            }
            for (; 0 != l || 0 !== r; n++) {
                let i = e.__digit(n);
                i += l + r, r = 0, l = i >>> 30, e.__setDigit(n, 1073741823 & i)
            }
        }
        static __internalMultiplyAdd(_, t, e, g, o) {
            let l = e,
                a = 0;
            for (let n = 0; n < g; n++) {
                const i = _.__digit(n),
                    e = s.__imul(32767 & i, t),
                    g = s.__imul(i >>> 15, t),
                    u = e + ((32767 & g) << 15) + a + l;
                l = u >>> 30, a = g >>> 15, o.__setDigit(n, 1073741823 & u)
            }
            if (o.length > g)
                for (o.__setDigit(g++, l + a); g < o.length;) o.__setDigit(g++, 0);
            else if (0 !== l + a) throw new Error("implementation bug")
        }
        __inplaceMultiplyAdd(i, _, t) {
            t > this.length && (t = this.length);
            const e = 32767 & i,
                n = i >>> 15;
            let g = 0,
                o = _;
            for (let l = 0; l < t; l++) {
                const i = this.__digit(l),
                    _ = 32767 & i,
                    t = i >>> 15,
                    r = s.__imul(_, e),
                    a = s.__imul(_, n),
                    u = s.__imul(t, e),
                    d = s.__imul(t, n);
                let h = o + r + g;
                g = h >>> 30, h &= 1073741823, h += ((32767 & a) << 15) + ((32767 & u) << 15), g += h >>> 30, o =
                    d + (a >>> 15) + (u >>> 15), this.__setDigit(l, 1073741823 & h)
            }
            if (0 != g || 0 !== o) throw new Error("implementation bug")
        }
        static __absoluteDivSmall(_, t, e = null) {
            null === e && (e = new s(_.length, !1));
            let n = 0;
            for (let g, s = 2 * _.length - 1; 0 <= s; s -= 2) {
                g = (n << 15 | _.__halfDigit(s)) >>> 0;
                const i = 0 | g / t;
                n = 0 | g % t, g = (n << 15 | _.__halfDigit(s - 1)) >>> 0;
                const o = 0 | g / t;
                n = 0 | g % t, e.__setDigit(s >>> 1, i << 15 | o)
            }
            return e
        }
        static __absoluteModSmall(_, t) {
            let e = 0;
            for (let n = 2 * _.length - 1; 0 <= n; n--) {
                const i = (e << 15 | _.__halfDigit(n)) >>> 0;
                e = 0 | i % t
            }
            return e
        }
        static __absoluteDivLarge(i, _, t, e) {
            const g = _.__halfDigitLength(),
                n = _.length,
                o = i.__halfDigitLength() - g;
            let l = null;
            t && (l = new s(o + 2 >>> 1, !1), l.__initializeDigits());
            const r = new s(g + 2 >>> 1, !1);
            r.__initializeDigits();
            const a = s.__clz15(_.__halfDigit(g - 1));
            0 < a && (_ = s.__specialLeftShift(_, a, 0));
            const d = s.__specialLeftShift(i, a, 1),
                u = _.__halfDigit(g - 1);
            let h = 0;
            for (let a, m = o; 0 <= m; m--) {
                a = 32767;
                const i = d.__halfDigit(m + g);
                if (i !== u) {
                    const t = (i << 15 | d.__halfDigit(m + g - 1)) >>> 0;
                    a = 0 | t / u;
                    let e = 0 | t % u;
                    const n = _.__halfDigit(g - 2),
                        o = d.__halfDigit(m + g - 2);
                    for (; s.__imul(a, n) >>> 0 > (e << 16 | o) >>> 0 && (a--, e += u, !(32767 < e)););
                }
                s.__internalMultiplyAdd(_, a, 0, n, r);
                let e = d.__inplaceSub(r, m, g + 1);
                0 !== e && (e = d.__inplaceAdd(_, m, g), d.__setHalfDigit(m + g, 32767 & d.__halfDigit(m + g) +
                    e), a--), t && (1 & m ? h = a << 15 : l.__setDigit(m >>> 1, h | a))
            }
            if (e) return d.__inplaceRightShift(a), t ? {
                quotient: l,
                remainder: d
            } : d;
            if (t) return l;
            throw new Error("unreachable")
        }
        static __clz15(i) {
            return s.__clz30(i) - 15
        }
        __inplaceAdd(_, t, e) {
            let n = 0;
            for (let g = 0; g < e; g++) {
                const i = this.__halfDigit(t + g) + _.__halfDigit(g) + n;
                n = i >>> 15, this.__setHalfDigit(t + g, 32767 & i)
            }
            return n
        }
        __inplaceSub(_, t, e) {
            let n = 0;
            if (1 & t) {
                t >>= 1;
                let g = this.__digit(t),
                    s = 32767 & g,
                    o = 0;
                for (; o < e - 1 >>> 1; o++) {
                    const i = _.__digit(o),
                        e = (g >>> 15) - (32767 & i) - n;
                    n = 1 & e >>> 15, this.__setDigit(t + o, (32767 & e) << 15 | 32767 & s), g = this.__digit(t +
                        o + 1), s = (32767 & g) - (i >>> 15) - n, n = 1 & s >>> 15
                }
                const i = _.__digit(o),
                    l = (g >>> 15) - (32767 & i) - n;
                n = 1 & l >>> 15, this.__setDigit(t + o, (32767 & l) << 15 | 32767 & s);
                if (t + o + 1 >= this.length) throw new RangeError("out of bounds");
                0 == (1 & e) && (g = this.__digit(t + o + 1), s = (32767 & g) - (i >>> 15) - n, n = 1 & s >>>
                    15, this.__setDigit(t + _.length, 1073709056 & g | 32767 & s))
            } else {
                t >>= 1;
                let g = 0;
                for (; g < _.length - 1; g++) {
                    const i = this.__digit(t + g),
                        e = _.__digit(g),
                        s = (32767 & i) - (32767 & e) - n;
                    n = 1 & s >>> 15;
                    const o = (i >>> 15) - (e >>> 15) - n;
                    n = 1 & o >>> 15, this.__setDigit(t + g, (32767 & o) << 15 | 32767 & s)
                }
                const i = this.__digit(t + g),
                    s = _.__digit(g),
                    o = (32767 & i) - (32767 & s) - n;
                n = 1 & o >>> 15;
                let l = 0;
                0 == (1 & e) && (l = (i >>> 15) - (s >>> 15) - n, n = 1 & l >>> 15), this.__setDigit(t + g, (
                    32767 & l) << 15 | 32767 & o)
            }
            return n
        }
        __inplaceRightShift(_) {
            if (0 === _) return;
            let t = this.__digit(0) >>> _;
            const e = this.length - 1;
            for (let n = 0; n < e; n++) {
                const i = this.__digit(n + 1);
                this.__setDigit(n, 1073741823 & i << 30 - _ | t), t = i >>> _
            }
            this.__setDigit(e, t)
        }
        static __specialLeftShift(_, t, e) {
            const g = _.length,
                n = new s(g + e, !1);
            if (0 === t) {
                for (let t = 0; t < g; t++) n.__setDigit(t, _.__digit(t));
                return 0 < e && n.__setDigit(g, 0), n
            }
            let o = 0;
            for (let s = 0; s < g; s++) {
                const i = _.__digit(s);
                n.__setDigit(s, 1073741823 & i << t | o), o = i >>> 30 - t
            }
            return 0 < e && n.__setDigit(g, o), n
        }
        static __leftShiftByAbsolute(_, i) {
            const t = s.__toShiftAmount(i);
            if (0 > t) throw new RangeError("BigInt too big");
            const e = 0 | t / 30,
                n = t % 30,
                g = _.length,
                o = 0 !== n && 0 != _.__digit(g - 1) >>> 30 - n,
                l = g + e + (o ? 1 : 0),
                r = new s(l, _.sign);
            if (0 === n) {
                let t = 0;
                for (; t < e; t++) r.__setDigit(t, 0);
                for (; t < l; t++) r.__setDigit(t, _.__digit(t - e))
            } else {
                let t = 0;
                for (let _ = 0; _ < e; _++) r.__setDigit(_, 0);
                for (let s = 0; s < g; s++) {
                    const i = _.__digit(s);
                    r.__setDigit(s + e, 1073741823 & i << n | t), t = i >>> 30 - n
                }
                if (o) r.__setDigit(g + e, t);
                else if (0 !== t) throw new Error("implementation bug")
            }
            return r.__trim()
        }
        static __rightShiftByAbsolute(_, i) {
            const t = _.length,
                e = _.sign,
                n = s.__toShiftAmount(i);
            if (0 > n) return s.__rightShiftByMaximum(e);
            const g = 0 | n / 30,
                o = n % 30;
            let l = t - g;
            if (0 >= l) return s.__rightShiftByMaximum(e);
            let r = !1;
            if (e) {
                if (0 != (_.__digit(g) & (1 << o) - 1)) r = !0;
                else
                    for (let t = 0; t < g; t++)
                        if (0 !== _.__digit(t)) {
                            r = !0;
                            break
                        }
            }
            if (r && 0 === o) {
                const i = _.__digit(t - 1);
                0 == ~i && l++
            }
            let a = new s(l, e);
            if (0 === o) {
                a.__setDigit(l - 1, 0);
                for (let e = g; e < t; e++) a.__setDigit(e - g, _.__digit(e))
            } else {
                let e = _.__digit(g) >>> o;
                const n = t - g - 1;
                for (let t = 0; t < n; t++) {
                    const i = _.__digit(t + g + 1);
                    a.__setDigit(t, 1073741823 & i << 30 - o | e), e = i >>> o
                }
                a.__setDigit(n, e)
            }
            return r && (a = s.__absoluteAddOne(a, !0, a)), a.__trim()
        }
        static __rightShiftByMaximum(i) {
            return i ? s.__oneDigit(1, !0) : s.__zero()
        }
        static __toShiftAmount(i) {
            if (1 < i.length) return -1;
            const _ = i.__unsignedDigit(0);
            return _ > s.__kMaxLengthBits ? -1 : _
        }
        static __toPrimitive(i, _ = "default") {
            if ("object" != typeof i) return i;
            if (i.constructor === s) return i;
            if ("undefined" != typeof Symbol && "symbol" == typeof Symbol.toPrimitive) {
                const t = i[Symbol.toPrimitive];
                if (t) {
                    const i = t(_);
                    if ("object" != typeof i) return i;
                    throw new TypeError("Cannot convert object to primitive value")
                }
            }
            const t = i.valueOf;
            if (t) {
                const _ = t.call(i);
                if ("object" != typeof _) return _
            }
            const e = i.toString;
            if (e) {
                const _ = e.call(i);
                if ("object" != typeof _) return _
            }
            throw new TypeError("Cannot convert object to primitive value")
        }
        static __toNumeric(i) {
            return s.__isBigInt(i) ? i : +i
        }
        static __isBigInt(i) {
            return "object" == typeof i && null !== i && i.constructor === s
        }
        static __truncateToNBits(i, _) {
            const t = 0 | (i + 29) / 30,
                e = new s(t, _.sign),
                n = t - 1;
            for (let t = 0; t < n; t++) e.__setDigit(t, _.__digit(t));
            let g = _.__digit(n);
            if (0 != i % 30) {
                const _ = 32 - i % 30;
                g = g << _ >>> _
            }
            return e.__setDigit(n, g), e.__trim()
        }
        static __truncateAndSubFromPowerOfTwo(_, t, e) {
            var n = Math.min;
            const g = 0 | (_ + 29) / 30,
                o = new s(g, e);
            let l = 0;
            const r = g - 1;
            let a = 0;
            for (const i = n(r, t.length); l < i; l++) {
                const i = 0 - t.__digit(l) - a;
                a = 1 & i >>> 30, o.__setDigit(l, 1073741823 & i)
            }
            for (; l < r; l++) o.__setDigit(l, 0 | 1073741823 & -a);
            let u = r < t.length ? t.__digit(r) : 0;
            const d = _ % 30;
            let h;
            if (0 == d) h = 0 - u - a, h &= 1073741823;
            else {
                const i = 32 - d;
                u = u << i >>> i;
                const _ = 1 << 32 - i;
                h = _ - u - a, h &= _ - 1
            }
            return o.__setDigit(r, h), o.__trim()
        }
        __digit(_) {
            return this[_]
        }
        __unsignedDigit(_) {
            return this[_] >>> 0
        }
        __setDigit(_, i) {
            this[_] = 0 | i
        }
        __setDigitGrow(_, i) {
            this[_] = 0 | i
        }
        __halfDigitLength() {
            const i = this.length;
            return 32767 >= this.__unsignedDigit(i - 1) ? 2 * i - 1 : 2 * i
        }
        __halfDigit(_) {
            return 32767 & this[_ >>> 1] >>> 15 * (1 & _)
        }
        __setHalfDigit(_, i) {
            const t = _ >>> 1,
                e = this.__digit(t),
                n = 1 & _ ? 32767 & e | i << 15 : 1073709056 & e | 32767 & i;
            this.__setDigit(t, n)
        }
        static __digitPow(i, _) {
            let t = 1;
            for (; 0 < _;) 1 & _ && (t *= i), _ >>>= 1, i *= i;
            return t
        }
        static __isOneDigitInt(i) {
            return (1073741823 & i) === i
        }
    }
    return s.__kMaxLength = 33554432, s.__kMaxLengthBits = s.__kMaxLength << 5, s.__kMaxBitsPerChar = [0, 0, 32, 51,
            64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149,
            151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166], s.__kBitsPerCharTableShift = 5, s.__kBitsPerCharTableMultiplier =
        1 << s.__kBitsPerCharTableShift, s.__kConversionChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
            "v", "w", "x", "y", "z"], s.__kBitConversionBuffer = new ArrayBuffer(8), s.__kBitConversionDouble = new Float64Array(
            s.__kBitConversionBuffer), s.__kBitConversionInts = new Int32Array(s.__kBitConversionBuffer), s.__clz30 =
        _ ? function (i) {
            return _(i) - 2
        } : function (i) {
            var _ = Math.LN2,
                t = Math.log;
            return 0 === i ? 30 : 0 | 29 - (0 | t(i >>> 0) / _)
        }, s.__imul = i || function (i, _) {
            return 0 | i * _
        }, s
});
//# sourceMappingURL=jsbi-umd.js.map