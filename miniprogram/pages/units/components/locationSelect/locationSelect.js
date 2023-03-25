Page({
    data: {
        firstSubItems: null,
        secondSubItems: null,
        items: null,
        prePage: null,
        isNoLocationSelected: !1,
        secondItemScrollTop: 0,
        lastItemScrollTop: 0
    },
    onLoad: function(e) {
        var t = getCurrentPages(), s = t[t.length - 2].data.conditionsGroups.filter(function(e) {
            return 2 == e.gType;
        })[0];
        this.setData({
            secondItemScrollTop: 0,
            lastItemScrollTop: 0
        }), this.resetConditions(s.subGroups) || (console.log("系统默认未设置 location condition"), 
        console.log(s), s.subGroups[0].selected = !0, s.subGroups[0].subGroups.length > 0 && (s.subGroups[0].subGroups[0].selected = !0), 
        this.setData({
            isNoLocationSelected: !0
        })), this.setData({
            firstSubItems: s.subGroups
        });
        var n, i, o = this.data.firstSubItems.filter(function(e) {
            return e.selected;
        })[0];
        if (o.subGroups && o.subGroups.length > 0) {
            this.setData({
                secondSubItems: o.subGroups
            });
            var u = o.subGroups.filter(function(e) {
                return e.selected;
            })[0], l = o.subGroups.indexOf(u);
            n = u.items.filter(function(e) {
                return e.selected;
            })[0], i = u.items.indexOf(n), this.setData({
                items: u.items
            });
        } else n = o.items.filter(function(e) {
            return e.selected;
        })[0], i = o.items.indexOf(n), this.setData({
            items: o.items
        });
        this.setData({
            secondItemScrollTop: 44 * l,
            lastItemScrollTop: 44 * i
        });
    },
    firstSubItemsSelected: function(e) {
        var t = {}, s = e.currentTarget.dataset.index;
        console.log("firstSubItemsSelected " + s);
        var n = this.data.firstSubItems.filter(function(e) {
            return e.selected;
        })[0], i = this.data.firstSubItems.indexOf(n), o = this.data.firstSubItems[s];
        if (o != n) {
            console.log("currentSelectedItem!=preSelectedItem"), n && (this.resetConditions([ n ], !1, !1), 
            t["firstSubItems[" + i + "].selected"] = !1), t["firstSubItems[" + s + "].selected"] = !0;
            var u = this.resetConditions([ o ]);
            o.selected = !0;
            var l = null, r = null;
            null != o.subGroups && o.subGroups.length > 0 ? (u ? l = o.subGroups.filter(function(e) {
                return e.selected;
            })[0].items : (o.subGroups[0].selected = !0, l = o.subGroups[0].items), r = o.subGroups) : (r = null, 
            l = o.items), t.secondSubItems = r, t.items = l, this.setData(t);
        }
    },
    secondSubItemsSelected: function(e) {
        var t = {}, s = e.currentTarget.dataset.index, n = this.data.secondSubItems.filter(function(e) {
            return e.selected;
        })[0], i = this.data.secondSubItems[s];
        if (n != i) {
            n.selected = !1, i.selected = !0;
            var o = this.data.secondSubItems.indexOf(n);
            t["secondSubItems[" + s + "].selected"] = !0, t["secondSubItems[" + o + "].selected"] = !1;
        }
        t.items = i.items, this.setData(t);
    },
    itemsSelected: function(e) {
        var t = e.currentTarget.dataset.index, s = this, n = getCurrentPages(), i = n[n.length - 2];
        wx.navigateBack({
            delta: 1,
            success: function(e) {
                i && i.locationSelectCallback && i.locationSelectCallback(s.data.items[t]);
            }
        });
    },
    resetConditions: function(e) {
        var t = this, s = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], i = !1;
        if (e) for (var o = 0; o < e.length; o++) !function(o) {
            var u = e[o];
            u.selected = !1;
            var l = !1;
            null != u.subGroups && u.subGroups.length > 0 ? t.resetConditions(u.subGroups, s) && !l && (l = !0) : null != u.items && u.items.length > 0 && u.items.map(function(e) {
                s ? e.selected = !1 : l || (l = 1 == e.selected);
            }), l && !s && (n && (u.selected = !0), i = !0);
        }(o);
        return console.log(e), i;
    }
});