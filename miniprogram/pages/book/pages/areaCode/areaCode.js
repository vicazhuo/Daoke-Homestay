var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../apiFetch/bookApi")), e = require("../../../../common/js/utils"), n = [ "*", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ], i = [ "中国", "香港", "日本", "台湾", "泰国", "韩国", "新加坡" ], a = [], r = [], o = void 0, c = void 0;

Page({
    data: {
        words: n,
        scrollTop: 0
    },
    onLoad: function(t) {},
    onReady: function() {
        var i = this;
        !o && this.getElementRect().then(function(t) {
            c = t, o = t.height / n.length;
        }), r.length ? this.setData({
            cities: r
        }) : t.default.getAreaCode().then(function(t) {
            i.getArea(t.items);
        }).catch(function(t) {
            (0, e.errorShowTip)(t.errorMsg || "地区区号数据异常，请重试");
        });
    },
    getArea: function(t) {
        var e = this, a = new Array(26), o = [];
        n.forEach(function(t, e) {
            a[e] = {
                key: "*" === t ? "常用" : t,
                list: []
            };
        }), t.forEach(function(t) {
            var e = t.pingYin.substring(0, 1), r = n.indexOf(e), c = {
                name: t.name,
                key: e,
                code: t.code
            }, s = i.indexOf(t.name);
            -1 !== s && (o[s] = c), a[r].list.push(c);
        }), a[0].list = o, this.data.cities = a, r = a, this.setData({
            cities: this.data.cities
        }, function() {
            e.getLetterTop();
        });
    },
    letterTap: function(t) {
        var e = t.target.dataset.index, n = a[e];
        this.top !== n && this.setData({
            scrollTop: n
        });
    },
    letterMove: function(t) {
        var e = (t.touches[0] || {}).pageY;
        e -= c.top;
        var i = Math.abs(Math.ceil(e / o));
        i = i >= n.length ? n.length : i;
        var r = a[i -= 1];
        this.top !== r && (this.top = r, this.setData({
            scrollTop: r
        }));
    },
    selectItemPageBack: function(t) {
        var n = t.currentTarget.dataset.code;
        (0, e.execPrevPageCallback)("areaCodeCallback", n);
    },
    getElementRect: function() {
        var t = this;
        return new Promise(function(e, n) {
            wx.createSelectorQuery().in(t).select("#letter").boundingClientRect().exec(function(t) {
                var i = t[0];
                if (!i) return n(i);
                e(i);
            });
        });
    },
    getLetterTop: function() {
        a.length || wx.createSelectorQuery().in(this).selectAll(".area-letter-key").boundingClientRect().exec(function(t) {
            t && (a = t[0].map(function(t) {
                return t.top;
            }));
        });
    }
});