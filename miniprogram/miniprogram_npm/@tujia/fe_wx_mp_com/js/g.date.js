String.prototype.parseToArray = function(t, e) {
    var a = this.split(e || "|");
    return t ? function(e, r) {
        for (;e--; ) a[e] = parseInt(a[e], t);
        return a;
    }(a.length) : a;
}, String.trim || (String.prototype.trim = function() {
    for (var t = this, e = /\s/, a = (t = t.replace(/^\s\s*/, "")).length; e.test(t.charAt(--a)); ) ;
    return t.slice(0, a + 1);
}), String.replaceTpl || (String.prototype.replaceTpl = function(t) {
    return this.replace(/#\{([^}]*)\}/gm, function(e, a) {
        return t[a.trim()];
    });
});

var t = void 0, e = void 0;

t || (t = {}), e || (e = {});

var a = t.date = {
    days: [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
    feast: {
        "1-1": "元旦节",
        "2-14": "情人节",
        "3-5": "雷锋日",
        "3-8": "妇女节",
        "3-12": "植树节",
        "3-15": "消费日",
        "4-1": "愚人节",
        "5-1": "劳动节",
        "5-4": "青年节",
        "6-1": "儿童节",
        "7-1": "建党节",
        "8-1": "建军节",
        "9-10": "教师节",
        "10-1": "国庆节",
        "12-24": "平安夜",
        "12-25": "圣诞节"
    },
    lunar: {
        tpl: "#{y}-#{m}-#{d} 星期#{W} 农历 #{CM}#{CD} #{gy}(#{sx}) #{gm} #{gd} #{so} #{cf} #{gf}",
        leap: "ezc|esg|wog|gr9|15k0|16xc|1yl0|h40|ukw|gya|esg|wqe|wk0|15jk|2k45|zsw|16e8|yaq|tkg|1t2v|ei8|wj4|zp1|l00|lkw|2ces|8kg|tio|gdu|ei8|k12|1600|1aa8|lud|hxs|8kg|257n|t0g|2i8n|13rk|1600|2ld2|ztc|h40|2bas|7gw|t00|15ma|xg0|ztj|lgg|ztc|1v11|fc0|wr4|1sab|gcw|xig|1a34|l28|yhy|xu8|ew0|xr8|wog|g9s|1bvn|16xc|i1j|h40|tsg|fdh|es0|wk0|161g|15jk|1654|zsw|zvk|284m|tkg|ek0|xh0|wj4|z96|l00|lkw|yme|xuo|tio|et1|ei8|jw0|n1f|1aa8|l7c|gxs|xuo|tsl|t0g|13s0|16xg|1600|174g|n6a|h40|xx3|7gw|t00|141h|xg0|zog|10v8|y8g|gyh|exs|wq8|1unq|gc0|xf4|nys|l28|y8g|i1e|ew0|wyu|wkg|15k0|1aat|1640|hwg|nfn|tsg|ezb|es0|wk0|2jsm|15jk|163k|17ph|zvk|h5c|gxe|ek0|won|wj4|xn4|2dsl|lk0|yao".parseToArray(36),
        jqmap: "0|gd4|wrn|1d98|1tuh|2akm|2rfn|38g9|3plp|46vz|4o9k|55px|5n73|64o5|6m37|73fd|7kna|81qe|8io7|8zgq|9g4b|9wnk|ad3g|ath2|".parseToArray(36),
        jqnames: "小寒|大寒|立春|雨水|惊蛰|春分|清明|谷雨|立夏|小满|芒种|夏至|小暑|大暑|立秋|处暑|白露|秋分|寒露|霜降|立冬|小雪|大雪|冬至".parseToArray(),
        c1: "|一|二|三|四|五|六|七|八|九|十".parseToArray(),
        c2: "初|十|廿|卅|".parseToArray(),
        wk: "日一二三四五六",
        tg: "甲乙丙丁戊己庚辛壬癸",
        dz: "子丑寅卯辰巳午未申酉戌亥",
        sx: "鼠牛虎兔龙蛇马羊猴鸡狗猪",
        feast: {
            "1-1": "春节",
            "1-15": "元宵节",
            "5-5": "端午节",
            "8-15": "中秋节",
            "9-9": "重阳节",
            "12-8": "腊八节"
        },
        fixDate: [ "2018-1-1~2018-1-16=0|-1|0", "2018-1-16~2018-2-15=0|-1|0" ]
    }
}, r = {
    isDate: function(t) {
        return t instanceof Date && !isNaN(t);
    },
    getDate: function(t) {
        return !r.isDate(t) && (t = new Date()), {
            y: t.getFullYear(),
            m: t.getMonth() + 1,
            d: t.getDate()
        };
    },
    format: function(t, e) {
        e = e || new Date(), t = t || "yyyy-MM-dd";
        var a, n = r.getDate(e), g = {
            M: n.m,
            d: n.d,
            h: e.getHours(),
            m: e.getMinutes(),
            s: e.getSeconds()
        };
        for (var u in g) a = g[u], t = t.replace(new RegExp("(" + u + "+)", "g"), function(t, e) {
            return a < 10 && e.length > 1 ? "0" + a : a;
        });
        return t.replace(/(y+)/gi, function(t, e) {
            return (n.y + "").substr(4 - Math.min(4, e.length));
        });
    },
    getDaysByLunarMonth: function(t, e) {
        return a.lunar.leap[t - 1900] & 65536 >> e ? 30 : 29;
    },
    getLeapMonth: function(t) {
        return 15 & a.lunar.leap[t - 1900];
    },
    getLeapDays: function(t) {
        return r.getLeapMonth(t) ? 65536 & a.lunar.leap[t - 1900] ? 30 : 29 : 0;
    },
    getDaysByMonth: function(t, e) {
        return new Date(t, e, 0).getDate();
    },
    getDaysByYear: function(t) {
        for (var e = 32768, n = 348; e > 8; e >>= 1) n += a.lunar.leap[t - 1900] & e ? 1 : 0;
        return n + r.getLeapDays(t);
    },
    getDateBySolar: function(t, e) {
        var r = new Date(31556925974.7 * (t - 1900) + 6e4 * a.lunar.jqmap[e] + Date.UTC(1900, 0, 6, 2, 5));
        return {
            m: r.getUTCMonth() + 1,
            d: r.getUTCDate()
        };
    },
    getFeast: function(t, e, n, g) {
        var u = (n ? a.lunar.feast : a.feast)[t + "-" + e] || "";
        return n && g && 12 == t && r.getDaysByLunarMonth(g, 12) == e && (u = "除夕"), u;
    },
    getSolar: function(t, e, n) {
        for (var g, u = a.lunar.jqnames, o = u.length; o--; ) if ((g = r.getDateBySolar(t, o)).m == e && g.d == n) return u[o];
        return "";
    },
    cyclical: function(t) {
        return a.lunar.tg.charAt(t % 10) + a.lunar.dz.charAt(t % 12);
    },
    fixResult: function(t, e, a, r, n, g, u) {
        if (t && t.length) for (var o, s, l = t.length; l--; ) o = (s = t[l].split("="))[1].split("|"), 
        function(t, e, a, r, n, g) {
            return r = r.split("~"), r[1] = r[1] || r[0], n = r[0].split("-"), g = r[1].split("-"), 
            new Date(t, e, a) >= new Date(n[0], n[1], n[2]) && new Date(t, e, a) <= new Date(g[0], g[1], g[2]);
        }(e, a, r, s[0]) && (n += ~~o[0], g += ~~o[1], u += ~~o[2]);
        return {
            y: ~~n,
            m: ~~g,
            d: ~~u
        };
    },
    toLunar: function(t, e, n) {
        for (var g, u = 1900, o = 0, s = (new Date(t, e - 1, n) - new Date(1900, 0, 31)) / 864e5, l = r.getLeapMonth(t), i = !1; u < 2050 && s > 0; u++) s -= o = r.getDaysByYear(u);
        for (s < 0 && (s += o, u--), g = u, u = 1; u < 13 && s > 0; u++) l > 0 && u == l + 1 && !1 === i ? (--u, 
        i = !0, o = r.getLeapDays(g)) : o = r.getDaysByLunarMonth(g, u), 1 == i && u == l + 1 && (i = !1), 
        s -= o;
        0 == s && l > 0 && u == l + 1 && !i && --u, s < 0 && (s += o, --u), 0 == s && (i = u == l), 
        s += 1;
        var c = r.fixResult(a.lunar.fixDate, t, e, n, t - (e < u ? 1 : 0), u, s);
        return {
            cy: c.y,
            cm: c.m,
            cd: c.d,
            CM: (i ? "闰" : "") + ((c.m > 9 ? "十" : "") + a.lunar.c1[c.m % 10]).replace("十二", "腊").replace(/^一/, "正") + "月",
            CD: {
                10: "初十",
                20: "二十",
                30: "三十"
            }[c.d] || a.lunar.c2[Math.floor(c.d / 10)] + a.lunar.c1[~~c.d % 10],
            isleap: i
        };
    },
    formatLunar: function(t, e, n) {
        var g = r.toLunar(t, e, n), u = new Date(t, e - 1, n).getDay();
        return {
            y: t,
            m: e,
            d: n,
            w: u,
            W: a.lunar.wk.charAt(u),
            cf: r.getFeast(g.cm, g.cd, 1, g.cy),
            gf: r.getFeast(e, n),
            isleap: g.isleap
        };
    }
};

e.date = r, module.exports = e;