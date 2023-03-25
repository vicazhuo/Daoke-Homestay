function e(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

var t = "destHistoryKey", o = {
    setHistory: function(o, i) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t;
        console.log(n);
        var s = n === t ? 8 : 4, r = n;
        i = n !== t && "overseasDestHistoryKey" !== n ? this.cityItemFilter(i) : i;
        var a = wx.getStorageSync(r) || [], d = a.find(function(e) {
            return e.destinationId === i.destinationId && e.value === i.value;
        });
        d && a.splice(a.indexOf(d), 1), a.unshift(i), a.length > s && a.splice(s, 1), wx.setStorage({
            key: r,
            data: a
        }), o.setData(e({}, "historyGroup." + n, a)), console.log("---------------------------"), 
        console.log(o.data.historyGroup), console.log("---------------------------");
    },
    initHistory: function(o) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t;
        console.log(i), wx.getStorage({
            key: i,
            success: function(t) {
                o.setData(e({}, "historyGroup." + i, t.data));
            }
        });
    },
    clearHistory: function(o) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t;
        wx.removeStorage({
            key: i,
            success: function() {
                o.setData(e({}, "historyGroup." + i, []));
            }
        });
    },
    cityItemFilter: function(e) {
        var t = e.conditionType, o = e.destinationId, i = e.destinationName, n = e.destId, s = e.destName, r = e.keywordSuggestType;
        return o = o || n, i = i || s, {
            conditionType: t,
            keywordSuggestType: r,
            destId: o,
            destName: i,
            destinationId: o,
            destinationName: i,
            value: o
        };
    }
};

module.exports = o;