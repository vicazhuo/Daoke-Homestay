function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var t = e(require("../../../common/js/utils.js")),
  a = e(require("../../../components/toast/toast.js")),
  r = e(require("../../../apiFetch/orderDetail")),
  n = (e(require("../../../api/payApi.js")),
    e(require("../../../apiFetch/orderListApi")));

Page({
  data: {
    order: [],
    orderNew: {},
    alreadyPaidList: {},
    alreadyPaidOnlineAmount: 0,
    refundList: {},
    orderId: 0,
    isShowCancel: false,
    isShowDelete: false,
    checkInDate: "",
    checkOutDate: "",
    cancelAbstract: "",
    animation: "",
    showModalStatus: true,
    popTemplateName: "",
    cancelRules: [],
    isCancelrule: false,
    cancelTips: [],
    popupConfig: {
      isShow: false
    },
    totalNeedPay: 0,
    chargebackDlg: false,
    popupText: "",
    cancelText: "",
    okText: "",
    popupExtra: null,
    isShowMoneyDetail: false,
    isShowDepositPopup: false,
    isShowChargeItem: true,
    isShowReturnOrder: false,
    isShowReturnMoneyPopup: false,
    depositOnlineStr: [],
    enumOrderOperationFlag: 0,
    guestVos: [],
    checkInfoData: {},
    isLoading: false,
    tyingGoodsOrderDetail: null,
    goodsOrderText: "",
    isShowDelOrder: false,
    currentOrderId: "",
    isShowCancelOrder: false,
    isHWorder: false,
    orderIndex: 0,
    onlineDeposit: 0,
    appName: getApp().globalData.globalName
  },
  onLoad: function(e) {
    var t = e.orderNumber,
      a = e.orderId || this.data.orderId,
      r = e.index;
    this.setData({
      isHWorder: "true" == e.ordertype,
      orderIndex: r,
    }), wx.setNavigationBarTitle({
      title: "订单号" + t
    }), this.getOrderInfo(a);
  },
  onShow: function() {
    this.data.orderNew && this.data.orderNew.redPacketPowerNavigation && this.data.orderNew.redPacketPowerNavigation.backRefresh && this.getOrderInfo(this.data.orderId);
  },
  getOrderInfo: function(e) {
    var a = this;
    this.showLoading(true), r.default.getOrderDetail(e).then(function(r) {
      a.showLoading(false);
      var n = {},
        o = 0;
      1 !== r.enumUnitOrderStatus && 3 !== r.enumUnitOrderStatus || 3 !== r.enumPaymentStatus && r.needPayCharges.totalNeedPay > 0 && (o = r.needPayCharges.totalNeedPay),
        n.checkInDate = r.checkInDate, n.checkOutDate = r.checkOutDate, n.checkInReceptionTime = r.checkInReceptionTime,
        n.checkOutLatestTime = r.checkOutLatestTime, n.cancelAbstract = r.cancelAbstract;
      var i = r.cancelRules && r.cancelRules.find(function(e) {
          return e.isDeleted;
        }) || null,
        s = 0,
        d = 0,
        l = 0;
      r.tyingGoodsOrderDetail && r.tyingGoodsOrderDetail.items && r.tyingGoodsOrderDetail.items.forEach(function(e) {
        switch (e.tyingGoodsSnapshot.tyingProductType) {
          case 1:
            s += e.count;
            break;

          case 2:
            d += e.count;
            break;

          case 3:
            l += e.count;
        }
      });
      var c = [],
        u = "";
      s > 0 && c.push(s + "张门票"), d > 0 && c.push(d + "份礼品"), l > 0 && c.push(l + "份服务"),
        c.length >= 3 ? (c.splice(2, 1), u = c.join("、") + "等") : u = c.join("、"), r.orderOnlinePay = t.default.toDecimal(r.orderOnlinePay, 2),
        r.onlineDeposit = t.default.toDecimal(r.onlineDeposit, 2), r.orderTotal = t.default.toDecimal(r.orderTotal, 2),
        r.totalAmount = t.default.toDecimal(r.totalAmount, 2), r.returnAmount = t.default.toDecimal(r.returnAmount, 2);
      for (var h in r.needPayCharges) "number" == typeof r.needPayCharges[h] && (r.needPayCharges[h] = t.default.toDecimal(r.needPayCharges[h], 2));
      for (var g in r.orderPayInfo) "number" == typeof r.orderPayInfo[g] && (r.orderPayInfo[g] = t.default.toDecimal(r.orderPayInfo[g], 2));
      r.unitRateList.map(function(e) {
        e.value = t.default.toDecimal(e.value, 2);
      });
      for (var f = 0, D = 0; D <= r.unitRateList.length - 1; D++) f = +r.unitRateList[D].value + f;
      r.totalRoomMoney = t.default.toDecimal(f, 2), a.setData({
        orderNew: r,
        orderId: e,
        totalNeedPay: o,
        depositOnlineStr: r.depositOnlineStr,
        cancelRules: r.cancelRules,
        isCancelrule: !!i,
        cancelTips: r.cancelTips,
        enumOrderOperationFlag: r.enumOrderOperationFlag,
        guestVos: r.guestVos,
        checkInfoData: n,
        goodsOrderText: u,
        onlineDeposit: r.onlineDeposit
      });
    }).finally(function() {});
  },
  showTip: function(e) {
    wx.showModal({
      title: "提示",
      content: e,
      showCancel: false,
      complete: function() {
        wx.navigateBack({
          delta: 1
        });
      }
    });
  },
  showCancel: function() {
    this.setData({
      isShowCancel: true
    }), this.setData({
      isShowDelete: false
    });
  },
  showDelete: function() {
    this.setData({
      isShowDelete: true
    }), this.setData({
      isShowCancel: false
    });
  },
  powerDrawer: function(e) {
    var t = e.currentTarget.dataset.statu,
      a = e.currentTarget.dataset.templateName;
    this.util(t, a);
  },
  reorderUrl: function() {
    var e = this;
    wx.navigateTo({
      url: "/pages/unitDetails_v2/unitDetails?unitId=" + e.data.orderNew.unitID + "&orderNumber=" + e.data.orderNew.orderNumber
    });
  },
  toActivePage: function() {
    wx.navigateTo({
      url: this.data.orderNew.redPacketPowerNavigation.navigateUrl
    });
  },
  chargebackHandle: function(e) {
    var t = e.detail;
    this.setData({
      chargebackDlg: true,
      popupText: t.agree ? "您确定要同意房东扣除押金￥" + this.data.orderNew.fineAmount + "？" : "您确定要拒绝房东扣除押金￥" + this.data.orderNew.fineAmount + "？",
      cancelText: "点错了",
      okText: t.agree ? "同意" : "拒绝",
      popupExtra: t
    });
  },
  chargebackCancel: function(e) {
    this.setData({
      chargebackDlg: false
    });
  },
  chargebackAgree: function(e) {
    var t = this,
      n = e.detail,
      o = this.data.orderNew,
      i = o.orderID,
      s = o.onlineDeposit;
    o.fineAmount;
    n.agree ? r.default.setChargeback(true, 0, i, "").then(function() {
      t.setData({
        chargebackDlg: false
      }), a.default.showToast({
        title: "操作成功"
      }), setTimeout(function() {
        t.getOrderInfo(i);
      }, 2e3);
    }).catch(function(e) {
      a.default.showToast({
        title: "操作失败"
      });
    }) : (wx.navigateTo({
      url: "/pages/user/orderDetail/refuseReason/refuseReason?orderId=" + i + "&onlineDeposit=" + s
    }), this.setData({
      chargebackDlg: false
    }));
  },
  depositDetail: function() {
    wx.navigateTo({
      url: "/pages/user/orderDetail/reFundView/reFundView?orderId=" + this.data.orderId
    });
  },
  seeOnlineMoneyDetail: function() {
    wx.navigateTo({
      url: "/pages/user/orderDetail/detailsOfCharges/index"
    });
  },
  seeMoreDepositPopup: function() {
    wx.navigateTo({
      url: "/pages/user/orderDetail/deposit/deposit"
    });
  },
  seeReturnMoneyPopup: function() {
    wx.navigateTo({
      url: "/pages/user/orderDetail/returnMoney/index"
    });
  },
  linkInsurancePage: function() {
    wx.navigateTo({
      url: "/pages/user/orderDetail/AccidentInsurance/index"
    });
  },
  showReturnOrder: function() {
    wx.navigateTo({
      url: "/pages/user/orderDetail/returnOrder/index"
    });
  },
  toTimerString: function(e) {
    var t = new Date(e),
      a = t.getMonth() + 1,
      r = t.getDate();
    t.getDay();
    console.log("timer", a, r);
  },
  linkGoPay: function(e) {
    var t = e.currentTarget.dataset.orderid;
    t > 0 ? wx.navigateTo({
      url: "/pages/pay_v2/index/index?orderId=" + t
    }) : wx.navigateTo({
      url: "/pages/pay/index/index?orderId=" + t
    });
  },
  linkGoThisLocation: function(e) {
    var a = e.currentTarget.dataset,
      r = a.latitude,
      n = a.longitude,
      o = a.unitname,
      i = a.address;
    t.default.navAddress(r, n, o, i);
  },
  linkRefundView: function(e) {
    var t = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: "/pages/user/orderDetail/reFundView/reFundView?orderId=" + t
    }), console.log("退款详情");
  },
  delOrderAgree: function() {
    console.log("同意"), this.setData({
      isShowDelOrder: !this.data.isShowDelOrder
    });
    this.deleOrderApi(false, this.data.currentOrderId);
  },
  delOrderCancel: function() {
    console.log("取消"), this.setData({
      isShowDelOrder: !this.data.isShowDelOrder
    });
  },
  linkDeleteOrder: function(e) {
    var t = e.target.dataset.orderid;
    this.setData({
      isShowDelOrder: !this.data.isShowDelOrder,
      currentOrderId: t
    });
  },
  deleOrderApi: function(e, t) {
    var a = this;
    n.default.deleteOrder(e, t).then(function(e) {
      a.goBack(a.data.orderIndex);
    }).catch(function(e) {
      a.showToast(e.errorMsg);
    }).finally(function() {
      console.log("删除订单请求完成----", t, e);
    });
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
  goodsOrderClick: function() {
    wx.navigateTo({
      url: "/pages/user/orderDetail/goodsOrder/goodsOrder?orderId=" + this.data.orderId
    });
  },
  showToast: function(e) {
    a.default.showToast({
      title: e,
      duration: 1e3
    });
  },
  linkCancelOrder: function() {
    console.log("cancel"), this.setData({
      isShowCancelOrder: !this.data.isShowCancelOrder
    });
  },
  cancelOrderCancel: function() {
    this.setData({
      isShowCancelOrder: !this.data.isShowCancelOrder
    });
  },
  cancelOrderAgree: function() {
    var e = this,
      t = this.data.orderId;
    wx.showLoading();
    r.default.cancelOrder(t, "微信小程序取消订单").then(function(res) {
      wx.hideLoading();
      wx.showToast({
        icon: 'none',
        title: "订单取消成功",
      })
      e.getOrderInfo(t);
    }).catch(function(res) {
      wx.showToast({
        icon: 'none',
        title: "订单取消失败",
      })
    }).finally(function() {
      e.setData({
        isShowCancelOrder: !e.data.isShowCancelOrder
      });
    });
  },
  onShareAppMessage: function(e) {
    var ap = getApp();
    var baseName = ap.globalData.globalName
    return "button" === e.from && console.log("来自页面内转发按钮", e.target), {
      title: "我在" + baseName + "微信小程序预订了一家公寓",
      path: "/pages/unitDetails_v2/unitDetails?unitId=" + this.data.orderNew.unitID,
      imageUrl: this.data.orderNew.unitDefaultPicture
    };
  },
  goBack: function(e) {
    var t = getCurrentPages(),
      a = t[t.length - 2];
    wx.navigateBack({
      delta: 1,
      success: function(t) {
        a && a.deleteOrderCallback && a.deleteOrderCallback(e);
      }
    });
  }
});