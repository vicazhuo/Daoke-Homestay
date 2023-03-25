function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../../apiFetch/orderListApi")), 
r = e(require("../../../../components/toast/toast.js")), 
a = e(require("../../../../common/js/utils.js")), 
n = e(require("../../../../apiFetch/orderDetail"));

Page({
    data: {
        isShowDelOrder: !1,
        isHaveRecentOrder: !0,
        orderListObj: {},
        orderList: [],
        isLoading: !1,
        houseIsLoading: !1,
        houseIsEnd: !1,
        PAGE_SiZE: 10,
        currentIndex: 0,
        orderTotalCount: 0,
        orderTab: [ {
            content: "近期订单"
        }, {
            content: "待支付"
        }, {
            content: "待确认"
        }, {
            content: "待入住"
        } ],
        PWA_STATIC_TUJIA_HOST:'',
        currenActiveTab: 0,
        isHaveNetWork: !0,
        isHaveService: !0,
        OVERSEATYPE: 1,
        currentOrderId: "",
        currentSourceType: "",
        currentOrderIndex: "",
        currenOrderNumber: 0,
        isLogin: !1,
        isGoToLogin: !1
    },
    onLoad: function(e) {
        var t = getApp().userIsLogin();
        this.setData({
            isLogin: t,
            isGoToLogin: !t
        });
    },
    onShow: function() {
        var e = this;
        this.checkoutNetwork().then(function(t) {
            console.log("network", t), e.setData({
                isHaveNetWork: t
            });
        }).catch(function() {
            e.setData({
                isHaveNetWork: !1
            });
        }), this.setData({
            isHaveService: !0
        }), getApp().userIsLogin() && (this.setData({
            isLogin: !0,
            houseIsEnd: !1,
            currentIndex: 0
        }), this.requestOrderList(100, [], 0, 10, !0));
    },
    onReachBottom: function() {
        if (this.data.currenOrderNumber > this.data.orderList.length) return this.setData({
            currenOrderNumber: this.data.orderList.length
        });
        this.data.houseIsLoading || (this.data.orderList.length < this.data.orderTotalCount ? (this.requestOrderList(100, [], this.data.currentIndex + 1, this.data.PAGE_SiZE, !1), 
        this.setData({
            houseIsLoading: !0,
            currentIndex: this.data.currentIndex + 1
        })) : this.setData({
            houseIsEnd: !0
        }));
    },
    onPullDownRefresh: function() {
        var e = getApp().userIsLogin();
        this.setData({
            isLogin: e,
            houseIsEnd: !1,
            currentIndex: 0
        }), this.data.isLogin && this.requestOrderList(100, [], 0, 10, !0, function() {
            wx.stopPullDownRefresh();
        });
    },
    orderBarTap: function(e) {
        this.setData({
            currenActiveTab: e.currentTarget.id
        });
        var t = e.currentTarget.id;
        console.log("event.currentTarget.id------------", t), this.requestOrderList(100, [], 0, 10, !0);
    },
    linkOrderDetail: function(e) {
        var t = e.currentTarget.dataset, r = t.orderid, a = t.sourcetype, n = t.ordernumber, o = t.tnsorder, i = t.index;
        console.log("list-orderid", r);
        var s = 1 == a;
        o ? wx.navigateTo({
            url: "/pages/user/orderDetail/orderDetail?orderId=" + r + "&orderNumber=" + n + "&ordertype=" + s + "&index=" + i
        }) : s || wx.navigateTo({
            url: "/pages/user/orderDetails/orderDetails?orderId=" + r
        });
    },
    requestOrderList: function(e, r, n, o, i) {
        var s = this;
        this.showLoading(i), t.default.searchOrderList(e, r, n, o).then(function(e) {
            if (s.showLoading(!1), wx.stopPullDownRefresh(), console.log("data-order", e), e) {
                e.orders.map(function(e) {
                    var t = new Date(e.checkInDate), r = t.getMonth() + 1, n = t.getDate(), o = t.getDay(), i = [ "日", "一", "二", "三", "四", "五", "六" ];
                    e.checkInDate = r + "月" + n + "日", e.checkInLatestTime = "周" + i[o] + " " + e.checkInLatestTime;
                    var d = new Date(e.checkOutDate), u = d.getMonth() + 1, c = d.getDate(), h = d.getDay(), l = [ "日", "一", "二", "三", "四", "五", "六" ];
                    e.checkOutDate = u + "月" + c + "日", e.checkOutLatestTime = "周" + l[h] + " " + e.checkOutLatestTime, 
                    e.countdownS = s.changeSecondToMinute(e.countdown), e.prepayAmount = a.default.toDecimal(e.prepayAmount, 2);
                });
                var t = i ? e.orders : s.data.orderList.concat(e.orders);
                s.setData({
                    orderListObj: e,
                    orderList: t,
                    currenOrderNumber: t.length,
                    isHaveRecentOrder: !0,
                    orderTotalCount: e.totalCount,
                    houseIsLoading: !1
                });
            } else 0 === s.currentIndex ? s.setData({
                isHaveRecentOrder: !1,
                orderListObj: {},
                orderList: []
            }) : s.setData({
                isHaveRecentOrder: !1
            });
            s.setData({
                isHaveNetWork: !0,
                isHaveService: !0
            });
        }).catch(function(e) {
            s.showLoading(!1), s.checkoutNetwork().then(function(e) {
                s.setData({
                    isHaveNetWork: e
                }), 1 == e && s.setData({
                    isHaveService: !1
                });
            }).catch(function() {
                s.setData({
                    isHaveNetWork: !1
                });
            }), s.setData({
                isHaveRecentOrder: !0,
                orderListObj: {},
                orderList: []
            });
        }).finally(function() {});
    },
    changeSecondToMinute: function(e) {
        return e ? Math.round(e / 60) : "";
    },
    linkCallPhone: function(e) {
        var t = this, r = e.currentTarget.dataset.orderid;
        this.showLoading(!0), n.default.getOrderDetail(r).then(function(e) {
            t.showLoading(!1), e && wx.navigateTo({
                url: "/pages/unitDetails_v2/common/unitCallPhone/unitCallPhone?&realTimeServiceHotlinePattern=" + e.realTimeServiceHotlinePattern
            });
        }).catch(function(e) {
            t.showToast("请稍后尝试"), t.showLoading(!1);
        });
    },
    linkGoPay: function(e) {
        var t = e.currentTarget.dataset.orderid, r = e.currentTarget.dataset.tnsorder ? "/pages/pay_v2/index/index?orderId=" + t : "/pages/pay/index/index?orderId=" + t;
        wx.navigateTo({
            url: r
        });
    },
    linkGoThisLocation: function(e) {
        var t = e.currentTarget.dataset, r = t.latitude, n = t.longitude, o = t.unitname, i = t.address;
        a.default.navAddress(r, n, o, i);
    },
    linkRefundView: function(e) {
        var t = e.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "/pages/user/orderDetail/reFundView/reFundView?orderId=" + t
        });
    },
    delOrderAgree: function() {
        this.setData({
            isShowDelOrder: !this.data.isShowDelOrder
        });
        var e = this.data.currentSourceType === this.data.OVERSEATYPE;
        this.deleOrderApi(e, this.data.currentOrderId);
    },
    delOrderCancel: function() {
        this.setData({
            isShowDelOrder: !this.data.isShowDelOrder
        });
    },
    linkDeleteOrder: function(e) {
        var t = e.target.dataset, r = t.orderid, a = t.sourcetype, n = t.index;
        this.setData({
            isShowDelOrder: !this.data.isShowDelOrder,
            currentOrderId: r,
            currentSourceType: a,
            currentOrderIndex: n
        });
    },
    deleOrderApi: function(e, r) {
        var a = this;
        t.default.deleteOrder(e, r).then(function(e) {
            a.data.orderList.splice(a.data.currentOrderIndex, 1), a.setData({
                orderList: a.data.orderList,
                orderTotalCount: a.data.orderTotalCount - 1
            }), a.showToast("删除成功");
        }).catch(function(e) {
            a.showToast(e.errorMsg);
        }).finally(function() {});
    },
    linkOrderAgain: function(e) {
        var t = e.target.dataset.unitid;
        wx.navigateTo({
            url: "/pages/unitDetails_v2/unitDetails?unitId=" + t
        });
    },
    showLoading: function(e) {
        this.setData({
            isLoading: e
        });
    },
    showToast: function(e) {
        r.default.showToast({
            title: e,
            duration: 1e3
        });
    },
    reloadData: function() {
        this.requestOrderList(this.data.currenActiveTab, [], 0, 10, !0);
    },
    checkoutNetwork: function() {
        return new Promise(function(e, t) {
            wx.getNetworkType({
                success: function(t) {
                    var r = t.networkType;
                    e("none" != r);
                },
                fail: function(e) {
                    t();
                }
            });
        });
    },
    linkGoService: function(e) {
        var t = e.target.dataset.orderid;
        wx.navigateTo({
            url: "/pages/user/orderDetail/goodsOrder/goodsOrder?orderId=" + t + "&from=list"
        });
    },
    deleteOrderCallback: function(e) {
        this.data.orderList.splice(parseInt(e), 1), this.setData({
            orderList: this.data.orderList,
            orderTotalCount: this.data.orderTotalCount - 1
        });
    },
    toLogin: function(e) {
        wx.navigateTo({
            url: "/pages/user/login/login"
        });
    }
});