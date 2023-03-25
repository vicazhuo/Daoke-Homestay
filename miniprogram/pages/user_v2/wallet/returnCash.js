var t = getApp();

Page({
  data: {
    totalPrice: 0,
    totalRefundFee: 0,
    backRate: 0,
    backAmount: 0,
    isShow: !1,
    appName: t.globalData.globalName,
    days:0,
    backRateIntroList: []
  },
  onLoad: function (t) {
    t && t.totalPrice && this.setData({
      totalPrice: t.totalPrice,
      totalRefundFee: t.totalRefundFee,
      backRate: t.backRate,
      backAmount: t.backAmount,
      isShow: !0
    }), this.getData();
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },
  getData: function () {
    var o = this;
    t.ajax({
      url: "/miniprogram/user/vipBackRateIntro"
    }).then(function (t) {
      console.log(t), 1 == t.code ? o.setData({
        days: t.data.days,
        backRateIntroList: t.data.backRateIntroList
      }) : wx.showToast({
        title: t.message,
        icon: "none"
      });
    }).catch(function (t) {
      console.log(t, 999);
    });
  }
});