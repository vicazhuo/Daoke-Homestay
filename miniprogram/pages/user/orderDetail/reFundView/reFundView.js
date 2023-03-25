var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../apiFetch/orderDetail"));

Page({
    data: {
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl,
        depositDetail: Object,
        orderId: Number
    },
    onLoad: function(t) {
        var i = this, o = t.orderId;
        e.default.getDepositeDetail(o).then(function(e) {
            i.setData({
                depositDetail: e,
                orderId: o
            });
        }).catch(function(e) {
            wx.showToast({
                title: "操作失败"
            });
        });
    }
});