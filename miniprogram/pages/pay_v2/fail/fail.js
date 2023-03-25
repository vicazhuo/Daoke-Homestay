Page({
    data: {},
    orderId: 0,
    onLoad: function(o) {
        var r = this;
        r.orderId = o.orderId, console.log("支付失败 orderid"), console.log(r.orderId);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    orderClick: function() {
        getApp().myOrderSelectTab = 0, wx.switchTab({
            url: "/pages/user/orderList/orderList"
        });
    },
    goPayClick: function() {
        var o = this;
        wx.redirectTo({
            url: "/pages/pay_v2/index/index?orderId=" + o.orderId
        });
    }
});