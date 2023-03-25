function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

module.exports = {
    init: function(e, a, n, r, i, s) {
        var o, l = arguments.length > 6 && void 0 !== arguments[6] && arguments[6], u = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "", d = 0, c = 0, g = a, h = 30, f = 0, v = l, S = s, _ = n, I = r, D = u + "_rangeSlider_data", T = 0;
        wx.getSystemInfo({
            success: function(t) {
                console.log(t.windowWidth), c = t.windowWidth, T = i * (c / 750), console.log("padding=" + T + " p=" + i);
                var a = (d = c - 2 * T) / (g - 1);
                f = -h / 2;
                var n = {};
                n[D] = {
                    comKey: u,
                    translateLeft: f + _ * a,
                    translateRight: f + (g - 1 - I) * a,
                    isSingoBtn: v,
                    rangeSliderIsDurtion: e.rangeSliderIsDurtion || !1,
                    PWA_STATIC_TUJIA_HOST: e.data.PWA_STATIC_TUJIA_HOST
                }, e.setData(n);
            }
        }), e[u + "_buttonStart"] = function(t) {
            console.log("buttonStart"), o = t.touches[0];
        }, e[u + "_buttonMove"] = function(t) {
            var e = "left" == t.currentTarget.dataset.key, a = t.touches[t.touches.length - 1], n = a.clientX - o.clientX;
            o = a;
            var r = this.data[D];
            if (e) {
                var i = r.translateLeft + n;
                i - f < 0 ? i = f : (u = d + f, v || (u -= d / (g - 1) * (g - I)), i > u && (i = u));
                var s = {};
                s[D + ".translateLeft"] = i, s[D + ".rangeSliderIsDurtion"] = !0, this.setData(s);
            } else {
                var l = r.translateRight - n;
                if (l - f < 0) l = f; else {
                    var u = d + f;
                    v || (u -= (_ + 1) * (d / (g - 1))), l > u && (l = u);
                }
                var c = {};
                c[D + ".translateRight"] = l, c[D + ".rangeSliderIsDurtion"] = !0, this.setData(c);
            }
        }, e[u + "_buttonEnd"] = function(e) {
            var a = this.data[D], n = "left" == e.currentTarget.dataset.key, r = n ? a.translateLeft : a.translateRight, i = d / (g - 1), s = parseInt((r + h / 2 + i / 2) / i);
            if (this.setData(t({}, D + ".rangeSliderIsDurtion", !1)), n) {
                _ = s;
                var o = {};
                o[D + ".translateLeft"] = f + s * i, this.setData(o);
            } else {
                I = g - 1 - s;
                var l = {};
                l[D + ".translateRight"] = f + s * i, this.setData(l);
            }
            S(_, I);
        }, e[u + "_resetIndex"] = function(t, e) {
            _ = t, I = e;
            var a = d / (g - 1), n = {};
            n[D + ".translateLeft"] = f + _ * a, n[D + ".translateRight"] = f + (g - 1 - I) * a, 
            this.setData(n);
        }, e[u + "_itemTap"] = function(t) {
            var e = t.currentTarget.dataset.index;
            this[u + "_resetIndex"](0, e), S(0, e);
        };
    }
};