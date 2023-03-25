function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var t = e(require("../../../apiFetch/orderListApi")), r = e(require("../../../components/toast/toast.js")), a = e(require("../../../common/js/utils.js")), i = e(require("../../../apiFetch/orderDetail")), app = getApp();

Page({
  data: {
    isShowOrderBar: !1,
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
    logoUrl: "",
    orderTab: [{
      content: "近期订单",
      id: 0
    }, {
      content: "待支付",
      id: 1
    }, {
      content: "待确认",
      id: 6
    }, {
      content: "待入住",
      id: 4
    }],
    PWA_STATIC_TUJIA_HOST: app.globalStaticUrl,
    currenActiveTab: 0,
    isHaveNetWork: !0,
    OVERSEATYPE: 1,
    currentOrderId: "",
    currentSourceType: "",
    currentOrderIndex: "",
    isHaveService: !0,
    isLogin: !1,
    isGoToLogin: !1,
    isHadOrder: !0
  },
  onLoad: function (e) {
    var t = app.userIsLogin();
    this.setData({
      logoUrl: app.globalData.globalLogo,
      isLogin: t,
      isGoToLogin: !t,
      isShowOrderBar: !1
    });
  },
  onShow: function () {
    var e = this;
    wx.setStorageSync("messageTabBackRoute", 'pages/index/index');
    this.checkoutNetwork().then(function (t) {
      console.log("network", t), e.setData({
        isHaveNetWork: t
      });
    }).catch(function () {
      e.setData({
        isHaveNetWork: !1
      });
    });
    var t = getApp(), r = t.userIsLogin(), a = this.data.currenActiveTab;
    if (t.myOrderSelectTab >= 0 && (a = t.myOrderSelectTab, t.myOrderSelectTab = -1),
      this.setData({
        isLogin: r,
        currentIndex: 0,
        currenActiveTab: a,
        isHaveService: !0
      }), this.data.isLogin) {
      var i = 0;
      i = this.data.orderList.length > 0 ? this.data.orderList.length : 10, this.requestOrderList(this.data.currenActiveTab, [], 0, i, !0);
    }
  },
  /**
   * 办理入住
   * **/ 
  linkCheckInDate:function(e){
    var t = e.currentTarget.dataset, orderId = t.orderid
    wx.navigateTo({
      url: "/plug/checkin/deposit/deposit?orderId=" + orderId
    })

  },
  /**
   * 评论订单
   * **/ 
  linkComment:function(e){
    var  t = e.currentTarget.dataset,orderId = t.orderid
    wx.navigateTo({
      url: "/pages/user/orderDetail/commentSubmit/commentSubmit?orderId=" + orderId
    })
   },
  onPullDownRefresh: function () {
    var e = void 0, t = getApp().userIsLogin();
    e = this.data.currenActiveTab, this.setData({
      isLogin: t
    }), this.data.isLogin && this.requestOrderList(e, [], 0, 10, !0, function () {
      wx.stopPullDownRefresh();
    });
  },
  onReachBottom: function () {
    var e = void 0;
    e = this.data.orderList.length <= 10 ? 1 : this.data.currentIndex + 1, this.data.orderList.length < this.data.orderTotalCount && this.data.orderList.length <= 100 ? (this.requestOrderList(this.data.currenActiveTab, [], e, this.data.PAGE_SiZE, !1),
      this.setData({
        houseIsLoading: !0,
        currentIndex: this.data.currentIndex
      })) : this.setData({
        houseIsEnd: !0
      });
  },
  orderBarTap: function (e) {
    this.setData({
      currenActiveTab: e.currentTarget.id,
      houseIsEnd: !1
    });
    var t = e.currentTarget.id;
    console.log("event.currentTarget.id------------", t), this.requestOrderList(Number(t), [], 0, 10, !0);
  },
  linkOrderDetail: function (e) {
   
    var t = e.currentTarget.dataset, r = t.orderid, a = t.sourcetype, i = t.ordernumber, o = t.tnsorder, n = t.index;

    var s = 1 == a;
    o ? wx.navigateTo({
      url: "/pages/user/orderDetail/orderDetail?orderId=" + r + "&orderNumber=" + i + "&ordertype=" + s + "&index=" + n
    }) : s || wx.navigateTo({
      url: "/pages/user/orderDetails/orderDetails?orderId=" + r
    });
  },
  requestOrderList: function (e, r, i, o, n, s) {
    var d = this;
    s || this.showLoading(n), t.default.searchOrderList(e, r, i, o).then(function (e) {
      if (d.showLoading(!1), console.log("data-order", e), null !== e) {
        e.orders.map(function (e) {
          var t = new Date(e.checkInDate), r = t.getMonth() + 1, i = t.getDate(), o = t.getDay(), n = ["日", "一", "二", "三", "四", "五", "六"];
          e.checkInDate = r + "月" + i + "日", e.checkInLatestTime = "周" + n[o] + " " + e.checkInLatestTime;
          var s = new Date(e.checkOutDate), u = s.getMonth() + 1, c = s.getDate(), l = s.getDay(), h = ["日", "一", "二", "三", "四", "五", "六"];
          e.checkOutDate = u + "月" + c + "日", e.checkOutLatestTime = "周" + h[l] + " " + e.checkOutLatestTime,
            e.countdownS = d.changeSecondToMinute(e.countdown), e.totalAmount = a.default.toDecimal(e.totalAmount, 2),
            e.prepayAmount = a.default.toDecimal(e.prepayAmount, 2);
        });
        var r = void 0, o = (e.orders.length, d.data.orderList.length, e.totalCount);
        r = o >= d.data.orderList.length ? Math.ceil(o / 10) - 1 : Math.ceil(o / 10);
        var s = 0 == i ? e.orders.length : d.data.orderList.length + e.orders.length;
        i < r && d.setData({
          currentIndex: i
        }), d.setData({
          orderListObj: e,
          orderList: n ? e.orders : d.data.orderList.concat(e.orders),
          isHaveRecentOrder: !0,
          orderTotalCount: e.totalCount,
          houseIsLoading: !1,
          isShowOrderBar: !0,
          houseIsEnd: !(s < o)
        });
      } else t.default.searchOrderList(100, [], 0, 10).then(function (e) {
        null == e ? d.setData({
          isHadOrder: !1,
          isShowOrderBar: !1,
          orderListObj: {},
          orderList: []
        }) : d.setData({
          isHaveRecentOrder: !1,
          orderListObj: {},
          orderList: []
        });
      });
      d.setData({
        isHaveNetWork: !0,
        isHaveService: !0
      });
    }).catch(function (e) {
      d.showLoading(!1), d.checkoutNetwork().then(function (e) {
        console.log("network", e), d.setData({
          isHaveNetWork: e
        }), 1 == e && d.setData({
          isHaveService: !1
        });
      }).catch(function () {
        d.setData({
          isHaveNetWork: !1
        });
      }), d.setData({
        isHaveRecentOrder: !0,
        orderListObj: {},
        orderList: []
      });
    }).finally(function (e) {
      s && s();
    });
  },
  changeSecondToMinute: function (e) {
    return e ? Math.round(e / 60) : "";
  },
  toLogin: function (e) {
    wx.navigateTo({
      url: "/pages/user/login/login"
    });
  },
  linkCallPhone: function (e) {
    var t = this, r = e.currentTarget.dataset.orderid;
    this.showLoading(!0), i.default.getOrderDetail(r).then(function (e) {
      t.showLoading(!1), e && wx.navigateTo({
        url: "/pages/unitDetails_v2/common/unitCallPhone/unitCallPhone?&realTimeServiceHotlinePattern=" + e.realTimeServiceHotlinePattern + '&hotelPhonePaySuccess=' + e.hotelPhonePaySuccess
      });
    }).catch(function (e) {
      t.showToast("请稍后尝试"), t.showLoading(!1);
    });
  },
  linkGoPay: function (e) {
    var t = e.currentTarget.dataset, r = t.orderid, a = t.tnsorder ? "/pages/pay_v2/index/index?orderId=" + r : "/pages/pay/index/index?orderId=" + r;
    wx.navigateTo({
      url: a
    });
  },
  linkGoThisLocation: function (e) {
    var t = e.currentTarget.dataset, r = t.latitude, i = t.longitude, o = t.unitname, n = t.address;
    a.default.navAddress(r, i, o, n);
  },
  linkRefundView: function (e) {
    var t = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: "/pages/user/orderDetail/reFundView/reFundView?orderId=" + t
    });
  },
  delOrderAgree: function () {
    this.setData({
      isShowDelOrder: !this.data.isShowDelOrder
    });
    var e = this.data.currentSourceType === this.data.OVERSEATYPE;
    this.deleOrderApi(e, this.data.currentOrderId);
  },
  delOrderCancel: function () {
    this.setData({
      isShowDelOrder: !this.data.isShowDelOrder
    });
  },
  linkDeleteOrder: function (e) {
    var t = e.target.dataset, r = t.orderid, a = t.sourcetype, i = t.index;
    this.setData({
      isShowDelOrder: !this.data.isShowDelOrder,
      currentOrderId: r,
      currentSourceType: a,
      currentOrderIndex: i
    });
  },
  deleOrderApi: function (e, r) {
    var a = this;
    t.default.deleteOrder(e, r).then(function (e) {
      a.data.orderList.splice(a.data.currentOrderIndex, 1), a.setData({
        orderList: a.data.orderList,
        orderTotalCount: a.data.orderTotalCount - 1
      }), a.showToast("删除成功");
    }).catch(function (e) {
      a.showToast(e.errorMsg);
    }).finally(function () { });
  },
  linkOrderAgain: function (e) {
    var t = e.target.dataset.unitid;
    wx.navigateTo({
      url: "/pages/unitDetails_v2/unitDetails?unitId=" + t
    });
  },
  showLoading: function (e) {
    this.setData({
      isLoading: e
    });
  },
  showToast: function (e) {
    r.default.showToast({
      title: e,
      duration: 1e3
    });
  },
  getAllOrders: function () {
    wx.navigateTo({
      url: "/pages/user/orderList/getAllOrders/index"
    });
  },
  linkGoService: function (e) {
    var t = e.target.dataset.orderid;
    wx.navigateTo({
      url: "/pages/user/orderDetail/goodsOrder/goodsOrder?orderId=" + t + "&from=list"
    });
  },
  reloadData: function () {
    this.requestOrderList(this.data.currenActiveTab, [], 0, 10, !0);
  },
  checkoutNetwork: function () {
    return new Promise(function (e, t) {
      wx.getNetworkType({
        success: function (t) {
          var r = t.networkType;
          e("none" != r);
        },
        fail: function (e) {
          t();
        }
      });
    });
  }
});