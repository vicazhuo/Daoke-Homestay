var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../api/unitDetailsApi.js")), t = require("../../../common/js/tjRequest.js"), n = require("../../../common/js/utils.js"), a = require("../../../components/toast/toast.js");

Page({
    data: {
        loadingHidden: !1,
        isLoadingView: !1,
        returnCashTip: !0,
        isRefundView: !1,
        leftTime: 0,
        leftTimeString: "0分0秒",
        order: [],
        isNewInterface: !1
    },
    orderId: 0,
    onLoad: function(e) {
        var t = this;
        t.orderId = e.orderId || t.orderId, t.getOrderInfo();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    getOrderInfo: function() {
        var n = this, a = getApp();
        if (a.userIsLogin()) {
            var i = a.globalConfig;
            n.setData({
                loadingHidden: !0
            }), t.tjPost({
                url: i.WechatOrderUri + i.GetOrderDetail,
                data: {
                    orderId: n.orderId
                },
                success: function(t) {
                    if (t.data.isSuccess) {
                        var a = t.data.data, i = n.objectJudge(a.RefundList);
                        n.setData({
                            loadingHidden: !1,
                            isLoadingView: !1,
                            isRefundView: i
                        });
                        var o = parseInt(a.OrderPay.PayTimer);
                        n.setData({
                            order: a,
                            leftTime: o
                        }), o > 0 && (n.updateTime(o), setInterval(n.updateLeftTime, 1e3)), e.default.getIsTnsUnit(a.UnitID, function(e, t, a) {
                            n.setData({
                                isNewInterface: t.data
                            });
                        });
                    } else {
                        var r = "获取订单失败，请稍后在试";
                        1e3 == t.data.errorCode && (r = t.data.errorMessage), wx.showModal({
                            content: r,
                            showCancel: !1,
                            success: function(e) {
                                e.confirm && wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    }
                },
                fail: function() {
                    n.setData({
                        loadingHidden: !1
                    }), wx.showModal({
                        content: a.netFailMsg,
                        showCancel: !1
                    });
                }
            });
        } else wx.redirectTo({
            url: "/pages/user/login/login?nextPath=/pages/user/orderDetails/orderDetails&openType=redirect"
        });
    },
    showUnitPrice: function() {
        var e = this, t = e.data.order, a = t.UnitOrderDayRateList, i = {
            unitName: t.UnitName,
            totalAmount: t.TotalUnitAmountToString,
            dailyPrice: []
        };
        if (null != a && a.length > 0) for (var o = 0; o < a.length; o++) i.dailyPrice.push({
            date: n.dateFormat(e.formatMSDate(a[o].RateDate), "yyyy-MM-dd"),
            price: a[o].UnitRate,
            bookCount: t.BookingCount
        });
        wx.navigateTo({
            url: "/components/unitPrice/unitPrice?data=" + JSON.stringify(i)
        });
    },
    cancelOrder: function() {
        var e = this, n = e.data.order, i = "请确认是否取消该订单？", o = 0;
        n.BreakRuleMoney > 0 && (o = 1, i = "根据退订规则，现在取消订单将扣除违约金¥" + n.BreakRuleMoneyToString + "，是否确认取消？"), 
        wx.showModal({
            content: i,
            cancelText: "否",
            confirmText: "是",
            success: function(i) {
                if (i.confirm) {
                    var r = e.orderId, s = getApp(), d = s.globalConfig;
                    r > 0 && (e.setData({
                        loadingHidden: !0
                    }), t.tjPost({
                        url: d.WechatOrderUri + d.CancelOrder,
                        data: {
                            id: r
                        },
                        success: function(t) {
                            if (e.setData({
                                loadingHidden: !1
                            }), t.data.isSuccess) {
                                var i = "取消成功";
                                1 == o && n.RefundAmount > 0 && (i = "取消成功，剩余费用¥" + n.RefundAmountToString + "将在7个工作日内原路退还"), 
                                a.showToast({
                                    title: i
                                }), setTimeout(e.getOrderInfo, 2e3);
                            } else a.showToast({
                                title: "取消失败"
                            });
                        },
                        fail: function() {
                            e.setData({
                                loadingHidden: !1
                            }), wx.showModal({
                                content: s.netFailMsg,
                                showCancel: !1
                            });
                        }
                    }));
                }
            }
        });
    },
    deleteOrder: function() {
        var e = this;
        wx.showModal({
            content: "请确认是否删除该订单？",
            cancelText: "否",
            confirmText: "是",
            success: function(n) {
                if (n.confirm) {
                    var i = e.orderId, o = getApp(), r = o.globalConfig;
                    i > 0 && (e.setData({
                        loadingHidden: !0
                    }), t.tjPost({
                        url: r.WechatOrderUri + r.DeleteOrder,
                        data: {
                            id: i
                        },
                        success: function(t) {
                            e.setData({
                                loadingHidden: !1
                            }), t.data.isSuccess ? (a.showToast({
                                title: "删除订单成功"
                            }), setTimeout(e.goOrder, 2e3)) : a.showToast({
                                title: "删除订单失败"
                            });
                        },
                        fail: function() {
                            e.setData({
                                loadingHidden: !1
                            }), wx.showModal({
                                content: o.netFailMsg,
                                showCancel: !1
                            });
                        }
                    }));
                }
            }
        });
    },
    agreeChargebacks: function(e) {
        var n = this, i = e.currentTarget.dataset.current, o = n.data.order.DepositRefund, r = "";
        r = i ? o.RefundAmount > 0 ? "将从您的押金中扣除¥" + o.FineAmountToString + "，剩余¥" + o.RefundAmountToString + "将在7个工作日内原路退还到账" : "您的押金¥" + o.FineAmountToString + "将全部扣除" : "拒绝商户的扣款请求，途家客服将与商户沟通取证，48小时内给您答复";
        var s = n.orderId, d = getApp(), l = d.globalConfig;
        s > 0 && wx.showModal({
            content: r,
            cancelText: "取消",
            confirmText: "确认",
            success: function(e) {
                e.confirm && (n.setData({
                    loadingHidden: !0
                }), t.tjPost({
                    url: l.WechatOrderUri + l.AgreeChargebacks,
                    data: {
                        id: s,
                        agree: i
                    },
                    success: function(e) {
                        n.setData({
                            loadingHidden: !1
                        }), e.data.isSuccess ? (a.showToast({
                            title: "操作成功"
                        }), setTimeout(n.getOrderInfo, 2e3)) : wx.showToast({
                            title: "操作失败"
                        });
                    },
                    fail: function() {
                        n.setData({
                            loadingHidden: !1
                        }), wx.showModal({
                            content: d.netFailMsg,
                            showCancel: !1
                        });
                    }
                }));
            }
        });
    },
    reorderUrl: function() {
        var e = this;
        console.log("--老订单跳转到新房屋"), console.log(e.data.isNewInterface), e.data.isNewInterface ? (console.log("1"), 
        wx.navigateTo({
            url: "/pages/unitDetails_v2/unitDetails?unitId=" + e.data.order.UnitID
        })) : (console.log("2"), wx.navigateTo({
            url: "/pages/unitDetails/unitDetails?unitId=" + e.data.order.UnitID
        }));
    },
    showReturnCashTip: function(e) {
        this.setData({
            returnCashTip: !1
        });
    },
    hideReturnCashTip: function() {
        this.setData({
            returnCashTip: !0
        });
    },
    cellPhone: function() {
        var e = this.data.order;
        e.IsMayiMobile ? wx.navigateTo({
            url: "/pages/unitDetails/common/unitCallPhone/unitCallPhone?&realTimeServiceHotlinePattern=" + e.RealTimeServiceHotlinePattern
        }) : null != e.UnitMobileNumber && "" != e.UnitMobileNumber ? wx.getSystemInfo({
            success: function(t) {
                /(iPhone|iPad|iPod|iOS)/i.test(t.model) ? wx.makePhoneCall({
                    phoneNumber: e.UnitMobile + "," + e.UnitMobileNumber + "#"
                }) : wx.showModal({
                    content: "拨通电话后请输入分机号-" + e.UnitMobileNumber,
                    cancelText: "取消",
                    confirmText: "拨打电话",
                    success: function(t) {
                        t.confirm && wx.makePhoneCall({
                            phoneNumber: e.UnitMobile
                        });
                    }
                });
            }
        }) : wx.makePhoneCall({
            phoneNumber: e.UnitMobile
        });
    },
    navAddress: function() {
        var e = this.data.order, t = this.bd_decrypt_go(e.Latitude, e.Longitude), n = t.latitude, a = t.longitude, i = e.UnitName, o = e.UnitAddress;
        wx.openLocation({
            latitude: n,
            longitude: a,
            scale: 32,
            name: i,
            address: o
        });
    },
    makeTujiaPhone: function() {
        wx.makePhoneCall({
            phoneNumber: "4001881234"
        });
    },
    goPay: function() {
        var e = this;
        wx.navigateTo({
            url: "/pages/pay/index/index?orderId=" + e.data.order.OrderID
        });
    },
    goOrder: function() {
        getApp().myOrderSelectTab = 0, wx.switchTab({
            url: "/pages/user/orderList/orderList"
        });
    },
    formatMSDate: function(e) {
        var t = e.replace(/\/Date\(/g, "").replace(/\)\//g, ""), n = Number(t);
        return new Date(n);
    },
    updateLeftTime: function() {
        this.updateTime(this.data.leftTime - 1);
    },
    updateTime: function(e) {
        var t = e % 60, n = (e - t) / 60 + "分" + t + "秒";
        e >= 0 ? this.setData({
            leftTime: e,
            leftTimeString: n
        }) : clearInterval();
    },
    objectJudge: function(e) {
        for (var t in e) return !0;
        return !1;
    },
    bd_decrypt_go: function(e, t) {
        var n = 3e3 * Math.PI / 180, a = t - .0065, i = e - .006, o = Math.sqrt(a * a + i * i) - 2e-5 * Math.sin(i * n), r = Math.atan2(i, a) - 3e-6 * Math.cos(a * n);
        return t = o * Math.cos(r), e = o * Math.sin(r), {
            latitude: e,
            longitude: t
        };
    }
});