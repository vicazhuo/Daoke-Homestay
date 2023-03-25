var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../api/payApi.js"));

require("../../../common/js/tjRequest.js"), require("../../../common/js/utils.js");

Page({
    data: {
        order: []
    },
    orderId: 0,
    onLoad: function(e) {
        var o = this;
        o.orderId = e.orderId || o.orderId;
    },
    onReady: function() {},
    onShow: function() {
        this.getOrderInfo();
    },
    onHide: function() {},
    onUnload: function() {},
    indexClick: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    orderClick: function() {
        getApp().myOrderSelectTab = 0, wx.switchTab({
            url: "/pages/user/orderList/orderList"
        });
    },
    getOrderInfo: function() {
        var o = this, r = getApp();
        if (r.userIsLogin()) {
            r.globalConfig;
            o.setData({
                loadingHidden: !0
            }), e.default.getOrderdetail(o.orderId, function(e, n, t) {
                if (o.setData({
                    loadingHidden: !1
                }), e && null == n.errmsg) o.setData({
                    order: n.data
                }); else {
                    wx.showModal({
                        content: "获取订单失败，跳转到订单列表查看",
                        showCancel: !1,
                        success: function(e) {
                            confirm && (r.myOrderSelectTab = 0, wx.switchTab({
                                url: "/pages/user/orderList/orderList"
                            }));
                        }
                    });
                }
            });
        } else wx.redirectTo({
            url: "/pages/user/login/login?nextPath=/pages/pay_v2/confirm/confirm?orderId=" + o.orderId + "&openType=redirect"
        });
    },
    makeMerchantPhoto: function() {
        var e = this.data.order;
        null != e.hotelPhone && wx.getSystemInfo({
            success: function(o) {
                var r = e.hotelPhone.replace("转", " ").split(" ");
                /(iPhone|iPad|iPod|iOS)/i.test(o.model) ? wx.makePhoneCall({
                    phoneNumber: r[0]
                }) : r.length > 1 && wx.showModal({
                    content: "拨通电话后请输入分机号-" + r[1],
                    cancelText: "取消",
                    confirmText: "拨打电话",
                    success: function(e) {
                        e.confirm && wx.makePhoneCall({
                            phoneNumber: r[0]
                        });
                    }
                });
            }
        });
    }
});