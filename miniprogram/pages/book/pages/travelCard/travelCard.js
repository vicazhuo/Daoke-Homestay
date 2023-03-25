function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../common/js/utils.js"));

Page({
    data: {
        list: [],
        isSelected: !0
    },
    onLoad: function(t) {
        this.init(t);
    },
    init: function(t) {
        var a = t.index, i = getApp();
        this.promotionIndex = a;
        try {
            var n = i.globalData.bookingData.orderData.promotion.items[a];
            if (n) {
                var r = n.subItems.filter(function(t) {
                    return t.enabled;
                });
                this.setData({
                    list: e.default.cloneObj(r)
                });
            }
        } catch (t) {
            console.log(t), e.default.errorShowTip("订单数据异常");
        }
    },
    selectRedpacket: function(e) {
        var a = e.currentTarget.dataset.index, i = this.data, n = (i.isSelected, t({}, "list[" + a + "].select", !i.list[a].select));
        this.setData(n);
    },
    submit: function() {
        console.log(this.data.list.filter(function(t) {
            return t.select;
        }));
        var t = [];
        this.data.list.forEach(function(e, a) {
            e.select && t.push(a);
        }), e.default.execPrevPageCallback("travelCardCallback", this.promotionIndex, t);
    }
});