Page({
    data: {
        conditions: []
    },
    onLoad: function(t) {
        var e = getCurrentPages(), n = e[e.length - 2].data.conditionsGroups.filter(function(t) {
            return 4 == t.gType;
        })[0], a = n.items;
        0 == n.items.filter(function(t) {
            return t.selected;
        }).length && (n.items[0].selected = !0), this.setData({
            conditions: a
        });
    },
    itemSelected: function(t) {
        var e = t.currentTarget.dataset.index, n = this, a = getCurrentPages(), i = a[a.length - 2];
        wx.navigateBack({
            delta: 1,
            success: function(t) {
                i && i.sortSelectCallback && i.sortSelectCallback(n.data.conditions[e]);
            }
        });
    }
});