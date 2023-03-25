var e = function (e) {
  return e && e.__esModule ? e : {
    default: e
  };
}(require("../../../api/payApi.js"));

Page({
  data: {
    fromList: !1,
    switchColor: "#fd8238",
    leftTime: 0,
    leftTimeString: "1分40秒",
    orderId: 0,
    paying: !1,
    isLoading: !1,
    saveTime: 10,
    needPayAmount: 100,
    interval: null,
    orderData: "",
    unitName: '',
    checkDate: '',
    nextPageFlag: 0,
    payType: [
      { label: '微信支付', payType: 1 ,checkd:true},
      // { label: '余额支付', payType: 2, checkd: false },
      // { label: '旅途卡支付', payType: 3, checkd: false }
    ]
  },
  onLoad: function (e) {
    this.setData({
      orderId: e.orderId
    }), this.requestOrderInfo();
  },
  requestOrderInfo: function () {
    var t = this;
    e.default.getPaymentinfo(this.data.orderId, function (e, a, i) {
      console.log(a), e ? (t.data.orderData = a, t.onGetOrderInfoSuccess(t.data.orderData)) : t.redirectTo(3);
    });
  },
  onGetOrderInfoSuccess: function (e) {
    console.log("----data----")
    console.log(e);

    this.setData({
      isLoading: !1
    }), this.setData({
      needPayAmount: e.data.needPayAmount
    }), this.setData({
      saveTime: e.data.saveTime,
      unitName: e.data.unitName,
      checkDate: e.data.checkDate,
      orderId: e.data.orderId
    }), this.updateTime(this.data.saveTime / 1e3), clearInterval(this.interval), this.interval = setInterval(this.updateLeftTime, 1e3);
  },
  loginCallback: function () {
    this.requestOrderInfo();
  },
  updateLeftTime: function () {
    this.updateTime(this.data.leftTime - 1), 0 == this.data.leftTime && (clearInterval(this.interval),
      this.redirectTo(3));
  },
  updateTime: function (e) {
    var t = Math.floor(e % 60), a = Math.floor((e - t) / 60), i = (a > 0 ? a + "分" : "") + t + "秒";
    e >= 0 ? this.setData({
      leftTime: e,
      leftTimeString: i
    }) : (this.setData({
      leftTime: 0,
      leftTimeString: "0秒"
    }), clearInterval());
  },
  submit: function (t) {
    var a = this;
    this.data.paying ? console.log("repeat paying") : (this.setData({
      paying: !0
    }), e.default.getSubmitpay(this.data.orderId, function (t, i, o) {
      if (t) {
        a.setData({
          paying: !1
        });
        var n = i.data;
        if (null != n) if (n.needPayAmount <= 0) console.log(n.needPayAmount), a.redirectTo(n.nextPageFlag); else {
          var r = i.data.wxRequestPayment.paySign, s = getApp().globalUserInfo.tjUserInfo.openId, d = {};
          a.setData({
            nextPageFlag: i.data.nextPageFlag
          }), console.log(a.data.nextPageFlag), e.default.getPay(r, s, function (e, t, i) {
            e && (d.nonceStr = t.nonceStr, d.package = t.package, d.paySign = t.paySign, d.signType = t.signType,
              d.timeStamp = t.timeStamp, a.onGetOrderInfoSuccess(a.data.orderData), d.success = a.onPaySuccess,
              d.fail = a.onPayFail, wx.requestPayment(d));
          });
        } else a.onLoad({
          orderId: a.data.orderId
        });
      } else a.redirectTo(3);
    }));
  },
  onPaySuccess: function () {
    console.log("onPaySuccess"), this.redirectTo(this.data.nextPageFlag);
  },
  onPayFail: function (e) {
    console.log("onPayFail"), this.redirectTo(3), console.log(this.data.orderId);
  },
  onPayComplete: function () { },
  redirectTo: function (e) {
    1 == e ? wx.redirectTo({
      url: "../confirm/confirm?orderId=" + this.data.orderId
    }) : 2 == e ? wx.redirectTo({
      url: "../success/success?orderId=" + this.data.orderId
    }) : 3 == e && wx.redirectTo({
      url: "../fail/fail?orderId=" + this.data.orderId
    });
  }
});