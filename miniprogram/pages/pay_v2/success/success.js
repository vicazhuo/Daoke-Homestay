var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../api/payApi.js")), t = (require("../../../common/js/tjRequest.js"), 
require("../../../common/js/utils.js"));

Page({
    data: {
        loadingHidden: !1,
        order: [],
        checkInDate: "",
        checkOutDate: "",
        stayNight: ""
    },
    orderId: 0,
    onLoad: function(e) {
        var t = this;
        t.orderId = e.orderId || t.orderId;
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
        var a = this, n = getApp();
        if (n.userIsLogin()) {
            n.globalConfig;
            a.setData({
                loadingHidden: !0
            }), e.default.getOrderdetail(a.orderId, function(e, o, r) {
                if (a.setData({
                    loadingHidden: !1
                }), e && null == o.errmsg) {
                    a.setData({
                        order: o.data
                    });
                    var s = t.dateFormat(a.formatMSDate(o.data.checkInDate), "yyyy-MM-dd"), i = t.dateFormat(a.formatMSDate(o.data.checkOutDate), "yyyy-MM-dd");
                    a.setData({
                        checkInDate: s
                    }), a.setData({
                        checkOutDate: i
                    });
                    var c = a.getStayNightsDes(s, i);
                    a.setData({
                        stayNight: c
                    }), console.log("间夜数"), console.log(a.data.stayNight), console.log(a.data.checkInDate), 
                    console.log(start);
                } else {
                    wx.showModal({
                        content: "获取订单失败，跳转到订单列表查看",
                        showCancel: !1,
                        success: function(e) {
                            confirm && (n.myOrderSelectTab = 0, wx.switchTab({
                                url: "/pages/user/orderList/orderList"
                            }));
                        }
                    });
                }
            });
        } else wx.redirectTo({
            url: "/pages/user/login/login?nextPath=/pages/pay_v2/success/success?orderId=" + a.orderId + "&openType=redirect"
        });
    },
    formatMSDate: function(e) {
        var t = /\d+(?=\+)/.exec(e);
        return new Date(+t);
    },
    genCheckInCheckOutDate: function(e) {
        return new Date(e + " 00:00:00");
    },
    getStayNightsDes: function(e, t) {
        var a = new Date(e).getTime(), n = (new Date(t).getTime() - a) / 1e3;
        return "共" + parseInt(n / 86400) + "晚";
    },
    makeMerchantPhoto: function() {
        var e = this.data.order;
        null != e.hotelPhone && wx.getSystemInfo({
            success: function(t) {
                var a = e.hotelPhone.replace("转", " ").split(" ");
                /(iPhone|iPad|iPod|iOS)/i.test(t.model) ? wx.makePhoneCall({
                    phoneNumber: a[0]
                }) : a.length > 1 && wx.showModal({
                    content: "拨通电话后请输入分机号-" + a[1],
                    cancelText: "取消",
                    confirmText: "拨打电话",
                    success: function(e) {
                        e.confirm && wx.makePhoneCall({
                            phoneNumber: a[0]
                        });
                    }
                });
            }
        });
    }
});