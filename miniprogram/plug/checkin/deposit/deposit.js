var e = getApp(), checInApi = require("../../../apiFetch/checInApi");;
Page({
  data: {
    wapUrl: e.globalData.wapUrl,
    orderId: "",
    repay: "",
    type: 1,
    appname: e.globalData.globalName,
    dataObj: { depositAmount: 0.00 },
    vipModalIsShow: false,
    vipPaySuccess: true
  },
  onLoad: function (e) {
    var t = this;
    this.setData({
      orderId: e.orderId,
      repay: e.repay,
      type: e.type
    }, function () {
      t.getData();
    });
  },
  onReady: function () { },
  onShow: function () {
    wx.getStorageSync("depositPageVipRefresh") && this.setData({
      vipPaySuccess: true
    });
  },
  onHide: function () {
    wx.removeStorageSync("depositPageVipRefresh");
  },
  onUnload: function () {
    wx.removeStorageSync("depositPageVipRefresh");
  },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  getData: function () {
    var t = this;
    checInApi.userContacts({
        orderId: this.data.orderId
      }).then(function (e) {
      console.log(e, 888), 1 == e.code && t.setData({
        dataObj: e.data
      });
    }).catch(function (e) {
      console.log(e, 999);
    });
  },
  selWechatPay: function () {
    var t = this, a = this;
    e.ajax({
      url: "/miniprogram/order/payDeposit/param",
      data: {
        orderId: this.data.orderId,
        sourceFrom: 6
      }
    }).then(function (e) {
      console.log(e, 888), 1 == e.code ? t.goPay(e.data) : a.setData({
        type: 3
      });
    }).catch(function (e) {
      console.log(e, 999);
    });
  },
  goPay: function (e) {
    var t = this;
    wx.requestPayment({
      timeStamp: e.timeStamp,
      nonceStr: e.nonceStr,
      package: "prepay_id=" + e.prepayId,
      signType: "MD5",
      paySign: e.sign,
      success: function (e) {
        console.log(e, "res"), wx.setStorageSync("orderListPageRefresh", 1), t.setData({
          type: 2
        }, function () {
          t.getData();
        });
      },
      fail: function (e) {
        t.setData({
          type: 3
        });
      }
    });
  },
  goPerson: function () {
    var e = this.data.orderId;
    wx.redirectTo({
      url: "/plug/checkin/personList/personList?orderId=" + e
    });
   
    // checInApi.userContacts({orderId:e}).then(function (t) {
    //   t ? wx.redirectTo({
    //     url: "../personList/personList/personList/personList?orderId=" + e 
    //   }) : wx.redirectTo({
    //       url: "../personList/personList/personDetail/personDetail?orderId=" + e
    //   });
    // });
  },
  goRecharge: function () {
    wx.navigateTo({
      url: "/pages/vip/recharge/recharge?id=10&isDirect=1&from=1&orderId=" + this.data.orderId
    }), this.closeVipModal();
  },
  openVipModal: function () {
    this.setData({
      vipModalIsShow: true
    });
  },
  closeVipModal: function () {
    this.setData({
      vipModalIsShow: false
    });
  }
});