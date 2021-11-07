class JSBI extends Array {
    constructor(i, _) {
        if (super(i), this.sign = _, i > JSBI.__kMaxLength) throw new RangeError("Maximum BigInt size exceeded")
    }
    static BigInt(i) {
        var _ = Math.floor,
            t = Number.isFinite;
        if ("number" == typeof i) {
            if (0 === i) return JSBI.__zero();
            if (JSBI.__isOneDigitInt(i)) return 0 > i ? JSBI.__oneDigit(-i, !0) : JSBI.__oneDigit(i, !1);
            if (!t(i) || _(i) !== i) throw new RangeError("The number " + i +
                " cannot be converted to BigInt because it is not an integer");
            return JSBI.__fromDouble(i)
        }
        if ("string" == typeof i) {
            const _ = JSBI.__fromString(i);
            if (null === _) throw new SyntaxError("Cannot convert " + i + " to a BigInt");
            return _
        }
        if ("boolean" == typeof i) return !0 === i ? JSBI.__oneDigit(1, !1) : JSBI.__zero();
        if ("object" == typeof i) {
            if (i.constructor === JSBI) return i;
            const _ = JSBI.__toPrimitive(i);
            return JSBI.BigInt(_)
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
        return 0 === this.length ? "0" : 0 == (i & i - 1) ? JSBI.__toStringBasePowerOfTwo(this, i) : JSBI.__toStringGeneric(
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
            e = JSBI.__clz30(t),
            n = 30 * _ - e;
        if (1024 < n) return i.sign ? -Infinity : 1 / 0;
        let g = n - 1,
            o = t,
            s = _ - 1;
        const l = e + 3;
        let r = 32 === l ? 0 : o << l;
        r >>>= 12;
        const a = l - 12;
        let u = 12 <= l ? 0 : o << 20 + l,
            d = 20 + l;
        for (0 < a && 0 < s && (s--, o = i.__digit(s), r |= o >>> 30 - a, u = o << a + 2, d = a + 2); 0 < d && 0 <
            s;) s--, o = i.__digit(s), u |= 30 <= d ? o << d - 30 : o >>> 30 - d, d -= 30;
        const h = JSBI.__decideRounding(i, d, s, o);
        if ((1 === h || 0 === h && 1 == (1 & u)) && (u = u + 1 >>> 0, 0 === u && (r++, 0 != r >>> 20 && (r = 0, g++,
                1023 < g)))) return i.sign ? -Infinity : 1 / 0;
        const m = i.sign ? -2147483648 : 0;
        return g = g + 1023 << 20, JSBI.__kBitConversionInts[1] = m | g | r, JSBI.__kBitConversionInts[0] = u, JSBI
            .__kBitConversionDouble[0]
    }
    static unaryMinus(i) {
        if (0 === i.length) return i;
        const _ = i.__copy();
        return _.sign = !i.sign, _
    }
    static bitwiseNot(i) {
        return i.sign ? JSBI.__absoluteSubOne(i).__trim() : JSBI.__absoluteAddOne(i, !0)
    }
    static exponentiate(i, _) {
        if (_.sign) throw new RangeError("Exponent must be positive");
        if (0 === _.length) return JSBI.__oneDigit(1, !1);
        if (0 === i.length) return i;
        if (1 === i.length && 1 === i.__digit(0)) return i.sign && 0 == (1 & _.__digit(0)) ? JSBI.unaryMinus(i) : i;
        if (1 < _.length) throw new RangeError("BigInt too big");
        let t = _.__unsignedDigit(0);
        if (1 === t) return i;
        if (t >= JSBI.__kMaxLengthBits) throw new RangeError("BigInt too big");
        if (1 === i.length && 2 === i.__digit(0)) {
            const _ = 1 + (0 | t / 30),
                e = i.sign && 0 != (1 & t),
                n = new JSBI(_, e);
            n.__initializeDigits();
            const g = 1 << t % 30;
            return n.__setDigit(_ - 1, g), n
        }
        let e = null,
            n = i;
        for (0 != (1 & t) && (e = i), t >>= 1; 0 !== t; t >>= 1) n = JSBI.multiply(n, n), 0 != (1 & t) && (null ===
            e ? e = n : e = JSBI.multiply(e, n));
        return e
    }
    static multiply(_, t) {
        if (0 === _.length) return _;
        if (0 === t.length) return t;
        let i = _.length + t.length;
        30 <= _.__clzmsd() + t.__clzmsd() && i--;
        const e = new JSBI(i, _.sign !== t.sign);
        e.__initializeDigits();
        for (let n = 0; n < _.length; n++) JSBI.__multiplyAccumulate(t, _.__digit(n), e, n);
        return e.__trim()
    }
    static divide(i, _) {
        if (0 === _.length) throw new RangeError("Division by zero");
        if (0 > JSBI.__absoluteCompare(i, _)) return JSBI.__zero();
        const t = i.sign !== _.sign,
            e = _.__unsignedDigit(0);
        let n;
        if (1 === _.length && 32767 >= e) {
            if (1 === e) return t === i.sign ? i : JSBI.unaryMinus(i);
            n = JSBI.__absoluteDivSmall(i, e, null)
        } else n = JSBI.__absoluteDivLarge(i, _, !0, !1);
        return n.sign = t, n.__trim()
    }
    static remainder(i, _) {
        if (0 === _.length) throw new RangeError("Division by zero");
        if (0 > JSBI.__absoluteCompare(i, _)) return i;
        const t = _.__unsignedDigit(0);
        if (1 === _.length && 32767 >= t) {
            if (1 === t) return JSBI.__zero();
            const _ = JSBI.__absoluteModSmall(i, t);
            return 0 === _ ? JSBI.__zero() : JSBI.__oneDigit(_, i.sign)
        }
        const e = JSBI.__absoluteDivLarge(i, _, !1, !0);
        return e.sign = i.sign, e.__trim()
    }
    static add(i, _) {
        const t = i.sign;
        return t === _.sign ? JSBI.__absoluteAdd(i, _, t) : 0 <= JSBI.__absoluteCompare(i, _) ? JSBI.__absoluteSub(
            i, _, t) : JSBI.__absoluteSub(_, i, !t)
    }
    static subtract(i, _) {
        const t = i.sign;
        return t === _.sign ? 0 <= JSBI.__absoluteCompare(i, _) ? JSBI.__absoluteSub(i, _, t) : JSBI.__absoluteSub(
            _, i, !t) : JSBI.__absoluteAdd(i, _, t)
    }
    static leftShift(i, _) {
        return 0 === _.length || 0 === i.length ? i : _.sign ? JSBI.__rightShiftByAbsolute(i, _) : JSBI.__leftShiftByAbsolute(
            i, _)
    }
    static signedRightShift(i, _) {
        return 0 === _.length || 0 === i.length ? i : _.sign ? JSBI.__leftShiftByAbsolute(i, _) : JSBI.__rightShiftByAbsolute(
            i, _)
    }
    static unsignedRightShift() {
        throw new TypeError("BigInts have no unsigned right shift; use >> instead")
    }
    static lessThan(i, _) {
        return 0 > JSBI.__compareToBigInt(i, _)
    }
    static lessThanOrEqual(i, _) {
        return 0 >= JSBI.__compareToBigInt(i, _)
    }
    static greaterThan(i, _) {
        return 0 < JSBI.__compareToBigInt(i, _)
    }
    static greaterThanOrEqual(i, _) {
        return 0 <= JSBI.__compareToBigInt(i, _)
    }
    static equal(_, t) {
        if (_.sign !== t.sign) return !1;
        if (_.length !== t.length) return !1;
        for (let e = 0; e < _.length; e++)
            if (_.__digit(e) !== t.__digit(e)) return !1;
        return !0
    }
    static notEqual(i, _) {
        return !JSBI.equal(i, _)
    }
    static bitwiseAnd(i, _) {
        var t = Math.max;
        if (!i.sign && !_.sign) return JSBI.__absoluteAnd(i, _).__trim();
        if (i.sign && _.sign) {
            const e = t(i.length, _.length) + 1;
            let n = JSBI.__absoluteSubOne(i, e);
            const g = JSBI.__absoluteSubOne(_);
            return n = JSBI.__absoluteOr(n, g, n), JSBI.__absoluteAddOne(n, !0, n).__trim()
        }
        return i.sign && ([i, _] = [_, i]), JSBI.__absoluteAndNot(i, JSBI.__absoluteSubOne(_)).__trim()
    }
    static bitwiseXor(i, _) {
        var t = Math.max;
        if (!i.sign && !_.sign) return JSBI.__absoluteXor(i, _).__trim();
        if (i.sign && _.sign) {
            const e = t(i.length, _.length),
                n = JSBI.__absoluteSubOne(i, e),
                g = JSBI.__absoluteSubOne(_);
            return JSBI.__absoluteXor(n, g, n).__trim()
        }
        const e = t(i.length, _.length) + 1;
        i.sign && ([i, _] = [_, i]);
        let n = JSBI.__absoluteSubOne(_, e);
        return n = JSBI.__absoluteXor(n, i, n), JSBI.__absoluteAddOne(n, !0, n).__trim()
    }
    static bitwiseOr(i, _) {
        var t = Math.max;
        const e = t(i.length, _.length);
        if (!i.sign && !_.sign) return JSBI.__absoluteOr(i, _).__trim();
        if (i.sign && _.sign) {
            let t = JSBI.__absoluteSubOne(i, e);
            const n = JSBI.__absoluteSubOne(_);
            return t = JSBI.__absoluteAnd(t, n, t), JSBI.__absoluteAddOne(t, !0, t).__trim()
        }
        i.sign && ([i, _] = [_, i]);
        let n = JSBI.__absoluteSubOne(_, e);
        return n = JSBI.__absoluteAndNot(n, i, n), JSBI.__absoluteAddOne(n, !0, n).__trim()
    }
    static asIntN(_, t) {
        var i = Math.floor;
        if (0 === t.length) return t;
        if (_ = i(_), 0 > _) throw new RangeError("Invalid value: not (convertible to) a safe integer");
        if (0 === _) return JSBI.__zero();
        if (_ >= JSBI.__kMaxLengthBits) return t;
        const e = 0 | (_ + 29) / 30;
        if (t.length < e) return t;
        const g = t.__unsignedDigit(e - 1),
            o = 1 << (_ - 1) % 30;
        if (t.length === e && g < o) return t;
        if (!((g & o) === o)) return JSBI.__truncateToNBits(_, t);
        if (!t.sign) return JSBI.__truncateAndSubFromPowerOfTwo(_, t, !0);
        if (0 == (g & o - 1)) {
            for (let n = e - 2; 0 <= n; n--)
                if (0 !== t.__digit(n)) return JSBI.__truncateAndSubFromPowerOfTwo(_, t, !1);
            return t.length === e && g === o ? t : JSBI.__truncateToNBits(_, t)
        }
        return JSBI.__truncateAndSubFromPowerOfTwo(_, t, !1)
    }
    static asUintN(i, _) {
        var t = Math.floor;
        if (0 === _.length) return _;
        if (i = t(i), 0 > i) throw new RangeError("Invalid value: not (convertible to) a safe integer");
        if (0 === i) return JSBI.__zero();
        if (_.sign) {
            if (i > JSBI.__kMaxLengthBits) throw new RangeError("BigInt too big");
            return JSBI.__truncateAndSubFromPowerOfTwo(i, _, !1)
        }
        if (i >= JSBI.__kMaxLengthBits) return _;
        const e = 0 | (i + 29) / 30;
        if (_.length < e) return _;
        const g = i % 30;
        if (_.length == e) {
            if (0 === g) return _;
            const i = _.__digit(e - 1);
            if (0 == i >>> g) return _
        }
        return JSBI.__truncateToNBits(i, _)
    }
    static ADD(i, _) {
        if (i = JSBI.__toPrimitive(i), _ = JSBI.__toPrimitive(_), "string" == typeof i) return "string" != typeof _ &&
            (_ = _.toString()), i + _;
        if ("string" == typeof _) return i.toString() + _;
        if (i = JSBI.__toNumeric(i), _ = JSBI.__toNumeric(_), JSBI.__isBigInt(i) && JSBI.__isBigInt(_)) return JSBI
            .add(i, _);
        if ("number" == typeof i && "number" == typeof _) return i + _;
        throw new TypeError("Cannot mix BigInt and other types, use explicit conversions")
    }
    static LT(i, _) {
        return JSBI.__compare(i, _, 0)
    }
    static LE(i, _) {
        return JSBI.__compare(i, _, 1)
    }
    static GT(i, _) {
        return JSBI.__compare(i, _, 2)
    }
    static GE(i, _) {
        return JSBI.__compare(i, _, 3)
    }
    static EQ(i, _) {
        for (;;) {
            if (JSBI.__isBigInt(i)) return JSBI.__isBigInt(_) ? JSBI.equal(i, _) : JSBI.EQ(_, i);
            if ("number" == typeof i) {
                if (JSBI.__isBigInt(_)) return JSBI.__equalToNumber(_, i);
                if ("object" != typeof _) return i == _;
                _ = JSBI.__toPrimitive(_)
            } else if ("string" == typeof i) {
                if (JSBI.__isBigInt(_)) return i = JSBI.__fromString(i), null !== i && JSBI.equal(i, _);
                if ("object" != typeof _) return i == _;
                _ = JSBI.__toPrimitive(_)
            } else if ("boolean" == typeof i) {
                if (JSBI.__isBigInt(_)) return JSBI.__equalToNumber(_, +i);
                if ("object" != typeof _) return i == _;
                _ = JSBI.__toPrimitive(_)
            } else if ("symbol" == typeof i) {
                if (JSBI.__isBigInt(_)) return !1;
                if ("object" != typeof _) return i == _;
                _ = JSBI.__toPrimitive(_)
            } else if ("object" == typeof i) {
                if ("object" == typeof _ && _.constructor !== JSBI) return i == _;
                i = JSBI.__toPrimitive(i)
            } else return i == _
        }
    }
    static NE(i, _) {
        return !JSBI.EQ(i, _)
    }
    static __zero() {
        return new JSBI(0, !1)
    }
    static __oneDigit(i, _) {
        const t = new JSBI(1, _);
        return t.__setDigit(0, i), t
    }
    __copy() {
        const _ = new JSBI(this.length, this.sign);
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
        JSBI.__kBitConversionDouble[0] = i;
        const _ = 2047 & JSBI.__kBitConversionInts[1] >>> 20,
            t = _ - 1023,
            e = (0 | t / 30) + 1,
            n = new JSBI(e, 0 > i);
        let g = 1048575 & JSBI.__kBitConversionInts[1] | 1048576,
            o = JSBI.__kBitConversionInts[0];
        const s = 20,
            l = t % 30;
        let r, a = 0;
        if (l < 20) {
            const i = s - l;
            a = i + 32, r = g >>> i, g = g << 32 - i | o >>> i, o <<= 32 - i
        } else if (l === 20) a = 32, r = g, g = o, o = 0;
        else {
            const i = l - s;
            a = 32 - i, r = g << i | o >>> 32 - i, g = o << i, o = 0
        }
        n.__setDigit(e - 1, r);
        for (let _ = e - 2; 0 <= _; _--) 0 < a ? (a -= 30, r = g >>> 2, g = g << 30 | o >>> 2, o <<= 30) : r = 0, n
            .__setDigit(_, r);
        return n.__trim()
    }
    static __isWhitespace(i) {
        return !!(13 >= i && 9 <= i) || (159 >= i ? 32 == i : 131071 >= i ? 160 == i || 5760 == i : 196607 >= i ? (
            i &= 131071, 10 >= i || 40 == i || 41 == i || 47 == i || 95 == i || 4096 == i) : 65279 == i)
    }
    static __fromString(i, _ = 0) {
        let t = 0;
        const e = i.length;
        let n = 0;
        if (n === e) return JSBI.__zero();
        let g = i.charCodeAt(n);
        for (; JSBI.__isWhitespace(g);) {
            if (++n === e) return JSBI.__zero();
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
                if (++n === e) return JSBI.__zero();
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
            if (++n === e) return JSBI.__zero();
            if (g = i.charCodeAt(n), 88 === g || 120 === g) {
                if (++n === e) return null;
                g = i.charCodeAt(n)
            }
        }
        if (0 != t && 10 !== _) return null;
        for (; 48 === g;) {
            if (++n === e) return JSBI.__zero();
            g = i.charCodeAt(n)
        }
        const o = e - n;
        let s = JSBI.__kMaxBitsPerChar[_],
            l = JSBI.__kBitsPerCharTableMultiplier - 1;
        if (o > 1073741824 / s) return null;
        const r = s * o + l >>> JSBI.__kBitsPerCharTableShift,
            a = new JSBI(0 | (r + 29) / 30, !1),
            u = 10 > _ ? _ : 10,
            h = 10 < _ ? _ - 10 : 0;
        if (0 == (_ & _ - 1)) {
            s >>= JSBI.__kBitsPerCharTableShift;
            const _ = [],
                t = [];
            let o = !1;
            do {
                let l = 0,
                    r = 0;
                for (;;) {
                    let _;
                    if (g - 48 >>> 0 < u) _ = g - 48;
                    else if ((32 | g) - 97 >>> 0 < h) _ = (32 | g) - 87;
                    else {
                        o = !0;
                        break
                    }
                    if (r += s, l = l << s | _, ++n === e) {
                        o = !0;
                        break
                    }
                    if (g = i.charCodeAt(n), 30 < r + s) break
                }
                _.push(l), t.push(r)
            } while (!o);
            JSBI.__fillFromParts(a, _, t)
        } else {
            a.__initializeDigits();
            let t = !1,
                o = 0;
            do {
                let r = 0,
                    b = 1;
                for (;;) {
                    let s;
                    if (g - 48 >>> 0 < u) s = g - 48;
                    else if ((32 | g) - 97 >>> 0 < h) s = (32 | g) - 87;
                    else {
                        t = !0;
                        break
                    }
                    const l = b * _;
                    if (1073741823 < l) break;
                    if (b = l, r = r * _ + s, o++, ++n === e) {
                        t = !0;
                        break
                    }
                    g = i.charCodeAt(n)
                }
                l = 30 * JSBI.__kBitsPerCharTableMultiplier - 1;
                const D = 0 | (s * o + l >>> JSBI.__kBitsPerCharTableShift) / 30;
                a.__inplaceMultiplyAdd(b, r, D)
            } while (!t)
        }
        if (n !== e) {
            if (!JSBI.__isWhitespace(g)) return null;
            for (n++; n < e; n++)
                if (g = i.charCodeAt(n), !JSBI.__isWhitespace(g)) return null
        }
        return a.sign = -1 == t, a.__trim()
    }
    static __fillFromParts(_, t, e) {
        let n = 0,
            g = 0,
            o = 0;
        for (let s = t.length - 1; 0 <= s; s--) {
            const i = t[s],
                l = e[s];
            g |= i << o, o += l, 30 === o ? (_.__setDigit(n++, g), o = 0, g = 0) : 30 < o && (_.__setDigit(n++,
                1073741823 & g), o -= 30, g = i >>> l - o)
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
            s = JSBI.__clz30(o);
        let l = 0 | (30 * t - s + n - 1) / n;
        if (_.sign && l++, 268435456 < l) throw new Error("string too long");
        const r = Array(l);
        let a = l - 1,
            u = 0,
            d = 0;
        for (let e = 0; e < t - 1; e++) {
            const i = _.__digit(e),
                t = (u | i << d) & g;
            r[a--] = JSBI.__kConversionChars[t];
            const o = n - d;
            for (u = i >>> o, d = 30 - o; d >= n;) r[a--] = JSBI.__kConversionChars[u & g], u >>>= n, d -= n
        }
        const h = (u | o << d) & g;
        for (r[a--] = JSBI.__kConversionChars[h], u = o >>> n - d; 0 !== u;) r[a--] = JSBI.__kConversionChars[u & g],
            u >>>= n;
        if (_.sign && (r[a--] = "-"), -1 != a) throw new Error("implementation bug");
        return r.join("")
    }
    static __toStringGeneric(_, i, t) {
        const e = _.length;
        if (0 === e) return "";
        if (1 === e) {
            let e = _.__unsignedDigit(0).toString(i);
            return !1 === t && _.sign && (e = "-" + e), e
        }
        const n = 30 * e - JSBI.__clz30(_.__digit(e - 1)),
            g = JSBI.__kMaxBitsPerChar[i],
            o = g - 1;
        let s = n * JSBI.__kBitsPerCharTableMultiplier;
        s += o - 1, s = 0 | s / o;
        const l = s + 1 >> 1,
            r = JSBI.exponentiate(JSBI.__oneDigit(i, !1), JSBI.__oneDigit(l, !1));
        let a, u;
        const d = r.__unsignedDigit(0);
        if (1 === r.length && 32767 >= d) {
            a = new JSBI(_.length, !1), a.__initializeDigits();
            let t = 0;
            for (let e = 2 * _.length - 1; 0 <= e; e--) {
                const i = t << 15 | _.__halfDigit(e);
                a.__setHalfDigit(e, 0 | i / d), t = 0 | i % d
            }
            u = t.toString(i)
        } else {
            const t = JSBI.__absoluteDivLarge(_, r, !0, !0);
            a = t.quotient;
            const e = t.remainder.__trim();
            u = JSBI.__toStringGeneric(e, i, !0)
        }
        a.__trim();
        let h = JSBI.__toStringGeneric(a, i, !0);
        for (; u.length < l;) u = "0" + u;
        return !1 === t && _.sign && (h = "-" + h), h + u
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
        if (t !== _.sign) return JSBI.__unequalSign(t);
        const e = JSBI.__absoluteCompare(i, _);
        return 0 < e ? JSBI.__absoluteGreater(t) : 0 > e ? JSBI.__absoluteLess(t) : 0
    }
    static __compareToNumber(i, _) {
        if (JSBI.__isOneDigitInt(_)) {
            const t = i.sign,
                e = 0 > _;
            if (t !== e) return JSBI.__unequalSign(t);
            if (0 === i.length) {
                if (e) throw new Error("implementation bug");
                return 0 === _ ? 0 : -1
            }
            if (1 < i.length) return JSBI.__absoluteGreater(t);
            const n = Math.abs(_),
                g = i.__unsignedDigit(0);
            return g > n ? JSBI.__absoluteGreater(t) : g < n ? JSBI.__absoluteLess(t) : 0
        }
        return JSBI.__compareToDouble(i, _)
    }
    static __compareToDouble(i, _) {
        if (_ !== _) return _;
        if (_ === 1 / 0) return -1;
        if (_ === -Infinity) return 1;
        const t = i.sign;
        if (t !== 0 > _) return JSBI.__unequalSign(t);
        if (0 === _) throw new Error("implementation bug: should be handled elsewhere");
        if (0 === i.length) return -1;
        JSBI.__kBitConversionDouble[0] = _;
        const e = 2047 & JSBI.__kBitConversionInts[1] >>> 20;
        if (2047 == e) throw new Error("implementation bug: handled elsewhere");
        const n = e - 1023;
        if (0 > n) return JSBI.__absoluteGreater(t);
        const g = i.length;
        let o = i.__digit(g - 1);
        const s = JSBI.__clz30(o),
            l = 30 * g - s,
            r = n + 1;
        if (l < r) return JSBI.__absoluteLess(t);
        if (l > r) return JSBI.__absoluteGreater(t);
        let a = 1048576 | 1048575 & JSBI.__kBitConversionInts[1],
            u = JSBI.__kBitConversionInts[0];
        const d = 20,
            h = 29 - s;
        if (h !== (0 | (l - 1) % 30)) throw new Error("implementation bug");
        let m, b = 0;
        if (20 > h) {
            const i = d - h;
            b = i + 32, m = a >>> i, a = a << 32 - i | u >>> i, u <<= 32 - i
        } else if (20 === h) b = 32, m = a, a = u, u = 0;
        else {
            const i = h - d;
            b = 32 - i, m = a << i | u >>> 32 - i, a = u << i, u = 0
        }
        if (o >>>= 0, m >>>= 0, o > m) return JSBI.__absoluteGreater(t);
        if (o < m) return JSBI.__absoluteLess(t);
        for (let e = g - 2; 0 <= e; e--) {
            0 < b ? (b -= 30, m = a >>> 2, a = a << 30 | u >>> 2, u <<= 30) : m = 0;
            const _ = i.__unsignedDigit(e);
            if (_ > m) return JSBI.__absoluteGreater(t);
            if (_ < m) return JSBI.__absoluteLess(t)
        }
        if (0 !== a || 0 !== u) {
            if (0 === b) throw new Error("implementation bug");
            return JSBI.__absoluteLess(t)
        }
        return 0
    }
    static __equalToNumber(i, _) {
        var t = Math.abs;
        return JSBI.__isOneDigitInt(_) ? 0 === _ ? 0 === i.length : 1 === i.length && i.sign === 0 > _ && i.__unsignedDigit(
            0) === t(_) : 0 === JSBI.__compareToDouble(i, _)
    }
    static __comparisonResultToBool(i, _) {
        return 0 === _ ? 0 > i : 1 === _ ? 0 >= i : 2 === _ ? 0 < i : 3 === _ ? 0 <= i : void 0
    }
    static __compare(i, _, t) {
        if (i = JSBI.__toPrimitive(i), _ = JSBI.__toPrimitive(_), "string" == typeof i && "string" == typeof _)
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
        if (JSBI.__isBigInt(i) && "string" == typeof _) return _ = JSBI.__fromString(_), null !== _ && JSBI.__comparisonResultToBool(
            JSBI.__compareToBigInt(i, _), t);
        if ("string" == typeof i && JSBI.__isBigInt(_)) return i = JSBI.__fromString(i), null !== i && JSBI.__comparisonResultToBool(
            JSBI.__compareToBigInt(i, _), t);
        if (i = JSBI.__toNumeric(i), _ = JSBI.__toNumeric(_), JSBI.__isBigInt(i)) {
            if (JSBI.__isBigInt(_)) return JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(i, _), t);
            if ("number" != typeof _) throw new Error("implementation bug");
            return JSBI.__comparisonResultToBool(JSBI.__compareToNumber(i, _), t)
        }
        if ("number" != typeof i) throw new Error("implementation bug");
        if (JSBI.__isBigInt(_)) return JSBI.__comparisonResultToBool(JSBI.__compareToNumber(_, i), 2 ^ t);
        if ("number" != typeof _) throw new Error("implementation bug");
        return 0 === t ? i < _ : 1 === t ? i <= _ : 2 === t ? i > _ : 3 === t ? i >= _ : void 0
    }
    __clzmsd() {
        return JSBI.__clz30(this.__digit(this.length - 1))
    }
    static __absoluteAdd(_, t, e) {
        if (_.length < t.length) return JSBI.__absoluteAdd(t, _, e);
        if (0 === _.length) return _;
        if (0 === t.length) return _.sign === e ? _ : JSBI.unaryMinus(_);
        let n = _.length;
        (0 === _.__clzmsd() || t.length === _.length && 0 === t.__clzmsd()) && n++;
        const g = new JSBI(n, e);
        let o = 0,
            s = 0;
        for (; s < t.length; s++) {
            const i = _.__digit(s) + t.__digit(s) + o;
            o = i >>> 30, g.__setDigit(s, 1073741823 & i)
        }
        for (; s < _.length; s++) {
            const i = _.__digit(s) + o;
            o = i >>> 30, g.__setDigit(s, 1073741823 & i)
        }
        return s < g.length && g.__setDigit(s, o), g.__trim()
    }
    static __absoluteSub(_, t, e) {
        if (0 === _.length) return _;
        if (0 === t.length) return _.sign === e ? _ : JSBI.unaryMinus(_);
        const n = new JSBI(_.length, e);
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
        null === t ? t = new JSBI(e, i) : t.sign = i;
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
        const n = new JSBI(t, !1);
        let g = 1;
        for (let o = 0; o < e; o++) {
            const i = _.__digit(o) - g;
            g = 1 & i >>> 30, n.__setDigit(o, 1073741823 & i)
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
        let s = o;
        null === e ? e = new JSBI(s, !1) : s = e.length;
        let l = 0;
        for (; l < o; l++) e.__setDigit(l, _.__digit(l) & t.__digit(l));
        for (; l < s; l++) e.__setDigit(l, 0);
        return e
    }
    static __absoluteAndNot(_, t, e = null) {
        const n = _.length,
            g = t.length;
        let o = g;
        n < g && (o = n);
        let s = n;
        null === e ? e = new JSBI(s, !1) : s = e.length;
        let l = 0;
        for (; l < o; l++) e.__setDigit(l, _.__digit(l) & ~t.__digit(l));
        for (; l < n; l++) e.__setDigit(l, _.__digit(l));
        for (; l < s; l++) e.__setDigit(l, 0);
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
        let s = n;
        null === e ? e = new JSBI(s, !1) : s = e.length;
        let l = 0;
        for (; l < o; l++) e.__setDigit(l, _.__digit(l) | t.__digit(l));
        for (; l < n; l++) e.__setDigit(l, _.__digit(l));
        for (; l < s; l++) e.__setDigit(l, 0);
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
        let s = n;
        null === e ? e = new JSBI(s, !1) : s = e.length;
        let l = 0;
        for (; l < o; l++) e.__setDigit(l, _.__digit(l) ^ t.__digit(l));
        for (; l < n; l++) e.__setDigit(l, _.__digit(l));
        for (; l < s; l++) e.__setDigit(l, 0);
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
        let s = 0,
            l = 0;
        for (let r, a = 0; a < _.length; a++, n++) {
            r = e.__digit(n);
            const i = _.__digit(a),
                t = 32767 & i,
                u = i >>> 15,
                d = JSBI.__imul(t, g),
                h = JSBI.__imul(t, o),
                m = JSBI.__imul(u, g),
                b = JSBI.__imul(u, o);
            r += l + d + s, s = r >>> 30, r &= 1073741823, r += ((32767 & h) << 15) + ((32767 & m) << 15), s += r >>>
                30, l = b + (h >>> 15) + (m >>> 15), e.__setDigit(n, 1073741823 & r)
        }
        for (; 0 != s || 0 !== l; n++) {
            let i = e.__digit(n);
            i += s + l, l = 0, s = i >>> 30, e.__setDigit(n, 1073741823 & i)
        }
    }
    static __internalMultiplyAdd(_, t, e, g, o) {
        let s = e,
            l = 0;
        for (let n = 0; n < g; n++) {
            const i = _.__digit(n),
                e = JSBI.__imul(32767 & i, t),
                g = JSBI.__imul(i >>> 15, t),
                a = e + ((32767 & g) << 15) + l + s;
            s = a >>> 30, l = g >>> 15, o.__setDigit(n, 1073741823 & a)
        }
        if (o.length > g)
            for (o.__setDigit(g++, s + l); g < o.length;) o.__setDigit(g++, 0);
        else if (0 !== s + l) throw new Error("implementation bug")
    }
    __inplaceMultiplyAdd(i, _, t) {
        t > this.length && (t = this.length);
        const e = 32767 & i,
            n = i >>> 15;
        let g = 0,
            o = _;
        for (let s = 0; s < t; s++) {
            const i = this.__digit(s),
                _ = 32767 & i,
                t = i >>> 15,
                l = JSBI.__imul(_, e),
                r = JSBI.__imul(_, n),
                a = JSBI.__imul(t, e),
                u = JSBI.__imul(t, n);
            let d = o + l + g;
            g = d >>> 30, d &= 1073741823, d += ((32767 & r) << 15) + ((32767 & a) << 15), g += d >>> 30, o = u + (
                r >>> 15) + (a >>> 15), this.__setDigit(s, 1073741823 & d)
        }
        if (0 != g || 0 !== o) throw new Error("implementation bug")
    }
    static __absoluteDivSmall(_, t, e = null) {
        null === e && (e = new JSBI(_.length, !1));
        let n = 0;
        for (let g, o = 2 * _.length - 1; 0 <= o; o -= 2) {
            g = (n << 15 | _.__halfDigit(o)) >>> 0;
            const i = 0 | g / t;
            n = 0 | g % t, g = (n << 15 | _.__halfDigit(o - 1)) >>> 0;
            const s = 0 | g / t;
            n = 0 | g % t, e.__setDigit(o >>> 1, i << 15 | s)
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
        let s = null;
        t && (s = new JSBI(o + 2 >>> 1, !1), s.__initializeDigits());
        const l = new JSBI(g + 2 >>> 1, !1);
        l.__initializeDigits();
        const r = JSBI.__clz15(_.__halfDigit(g - 1));
        0 < r && (_ = JSBI.__specialLeftShift(_, r, 0));
        const a = JSBI.__specialLeftShift(i, r, 1),
            u = _.__halfDigit(g - 1);
        let d = 0;
        for (let r, h = o; 0 <= h; h--) {
            r = 32767;
            const i = a.__halfDigit(h + g);
            if (i !== u) {
                const t = (i << 15 | a.__halfDigit(h + g - 1)) >>> 0;
                r = 0 | t / u;
                let e = 0 | t % u;
                const n = _.__halfDigit(g - 2),
                    o = a.__halfDigit(h + g - 2);
                for (; JSBI.__imul(r, n) >>> 0 > (e << 16 | o) >>> 0 && (r--, e += u, !(32767 < e)););
            }
            JSBI.__internalMultiplyAdd(_, r, 0, n, l);
            let e = a.__inplaceSub(l, h, g + 1);
            0 !== e && (e = a.__inplaceAdd(_, h, g), a.__setHalfDigit(h + g, 32767 & a.__halfDigit(h + g) + e), r--),
                t && (1 & h ? d = r << 15 : s.__setDigit(h >>> 1, d | r))
        }
        if (e) return a.__inplaceRightShift(r), t ? {
            quotient: s,
            remainder: a
        } : a;
        if (t) return s;
        throw new Error("unreachable")
    }
    static __clz15(i) {
        return JSBI.__clz30(i) - 15
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
                o = 32767 & g,
                s = 0;
            for (; s < e - 1 >>> 1; s++) {
                const i = _.__digit(s),
                    e = (g >>> 15) - (32767 & i) - n;
                n = 1 & e >>> 15, this.__setDigit(t + s, (32767 & e) << 15 | 32767 & o), g = this.__digit(t + s + 1),
                    o = (32767 & g) - (i >>> 15) - n, n = 1 & o >>> 15
            }
            const i = _.__digit(s),
                l = (g >>> 15) - (32767 & i) - n;
            n = 1 & l >>> 15, this.__setDigit(t + s, (32767 & l) << 15 | 32767 & o);
            if (t + s + 1 >= this.length) throw new RangeError("out of bounds");
            0 == (1 & e) && (g = this.__digit(t + s + 1), o = (32767 & g) - (i >>> 15) - n, n = 1 & o >>> 15, this.__setDigit(
                t + _.length, 1073709056 & g | 32767 & o))
        } else {
            t >>= 1;
            let g = 0;
            for (; g < _.length - 1; g++) {
                const i = this.__digit(t + g),
                    e = _.__digit(g),
                    o = (32767 & i) - (32767 & e) - n;
                n = 1 & o >>> 15;
                const s = (i >>> 15) - (e >>> 15) - n;
                n = 1 & s >>> 15, this.__setDigit(t + g, (32767 & s) << 15 | 32767 & o)
            }
            const i = this.__digit(t + g),
                o = _.__digit(g),
                s = (32767 & i) - (32767 & o) - n;
            n = 1 & s >>> 15;
            let l = 0;
            0 == (1 & e) && (l = (i >>> 15) - (o >>> 15) - n, n = 1 & l >>> 15), this.__setDigit(t + g, (32767 & l) <<
                15 | 32767 & s)
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
            n = new JSBI(g + e, !1);
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
        const t = JSBI.__toShiftAmount(i);
        if (0 > t) throw new RangeError("BigInt too big");
        const e = 0 | t / 30,
            n = t % 30,
            g = _.length,
            o = 0 !== n && 0 != _.__digit(g - 1) >>> 30 - n,
            s = g + e + (o ? 1 : 0),
            l = new JSBI(s, _.sign);
        if (0 === n) {
            let t = 0;
            for (; t < e; t++) l.__setDigit(t, 0);
            for (; t < s; t++) l.__setDigit(t, _.__digit(t - e))
        } else {
            let t = 0;
            for (let _ = 0; _ < e; _++) l.__setDigit(_, 0);
            for (let o = 0; o < g; o++) {
                const i = _.__digit(o);
                l.__setDigit(o + e, 1073741823 & i << n | t), t = i >>> 30 - n
            }
            if (o) l.__setDigit(g + e, t);
            else if (0 !== t) throw new Error("implementation bug")
        }
        return l.__trim()
    }
    static __rightShiftByAbsolute(_, i) {
        const t = _.length,
            e = _.sign,
            n = JSBI.__toShiftAmount(i);
        if (0 > n) return JSBI.__rightShiftByMaximum(e);
        const g = 0 | n / 30,
            o = n % 30;
        let s = t - g;
        if (0 >= s) return JSBI.__rightShiftByMaximum(e);
        let l = !1;
        if (e) {
            if (0 != (_.__digit(g) & (1 << o) - 1)) l = !0;
            else
                for (let t = 0; t < g; t++)
                    if (0 !== _.__digit(t)) {
                        l = !0;
                        break
                    }
        }
        if (l && 0 === o) {
            const i = _.__digit(t - 1);
            0 == ~i && s++
        }
        let r = new JSBI(s, e);
        if (0 === o) {
            r.__setDigit(s - 1, 0);
            for (let e = g; e < t; e++) r.__setDigit(e - g, _.__digit(e))
        } else {
            let e = _.__digit(g) >>> o;
            const n = t - g - 1;
            for (let t = 0; t < n; t++) {
                const i = _.__digit(t + g + 1);
                r.__setDigit(t, 1073741823 & i << 30 - o | e), e = i >>> o
            }
            r.__setDigit(n, e)
        }
        return l && (r = JSBI.__absoluteAddOne(r, !0, r)), r.__trim()
    }
    static __rightShiftByMaximum(i) {
        return i ? JSBI.__oneDigit(1, !0) : JSBI.__zero()
    }
    static __toShiftAmount(i) {
        if (1 < i.length) return -1;
        const _ = i.__unsignedDigit(0);
        return _ > JSBI.__kMaxLengthBits ? -1 : _
    }
    static __toPrimitive(i, _ = "default") {
        if ("object" != typeof i) return i;
        if (i.constructor === JSBI) return i;
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
        return JSBI.__isBigInt(i) ? i : +i
    }
    static __isBigInt(i) {
        return "object" == typeof i && null !== i && i.constructor === JSBI
    }
    static __truncateToNBits(i, _) {
        const t = 0 | (i + 29) / 30,
            e = new JSBI(t, _.sign),
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
            o = new JSBI(g, e);
        let s = 0;
        const l = g - 1;
        let a = 0;
        for (const i = n(l, t.length); s < i; s++) {
            const i = 0 - t.__digit(s) - a;
            a = 1 & i >>> 30, o.__setDigit(s, 1073741823 & i)
        }
        for (; s < l; s++) o.__setDigit(s, 0 | 1073741823 & -a);
        let u = l < t.length ? t.__digit(l) : 0;
        const d = _ % 30;
        let h;
        if (0 == d) h = 0 - u - a, h &= 1073741823;
        else {
            const i = 32 - d;
            u = u << i >>> i;
            const _ = 1 << 32 - i;
            h = _ - u - a, h &= _ - 1
        }
        return o.__setDigit(l, h), o.__trim()
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
JSBI.__kMaxLength = 33554432, JSBI.__kMaxLengthBits = JSBI.__kMaxLength << 5, JSBI.__kMaxBitsPerChar = [0, 0, 32, 51,
        64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149, 151,
        153, 154, 156, 158, 159, 160, 162, 163, 165, 166], JSBI.__kBitsPerCharTableShift = 5, JSBI.__kBitsPerCharTableMultiplier =
    1 << JSBI.__kBitsPerCharTableShift, JSBI.__kConversionChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
        "w", "x", "y", "z"], JSBI.__kBitConversionBuffer = new ArrayBuffer(8), JSBI.__kBitConversionDouble = new Float64Array(
        JSBI.__kBitConversionBuffer), JSBI.__kBitConversionInts = new Int32Array(JSBI.__kBitConversionBuffer), JSBI.__clz30 =
    Math.clz32 ? function (i) {
        return Math.clz32(i) - 2
    } : function (i) {
        return 0 === i ? 30 : 0 | 29 - (0 | Math.log(i >>> 0) / Math.LN2)
    }, JSBI.__imul = Math.imul || function (i, _) {
        return 0 | i * _
    };
export default JSBI;
//# sourceMappingURL=jsbi.mjs.map