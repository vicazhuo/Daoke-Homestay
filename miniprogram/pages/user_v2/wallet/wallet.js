var a = getApp(), memberApi = require("../../../apiFetch/member.js");
function t(t) {
  if (Array.isArray(t)) {
    for (var a = 0, o = Array(t.length); a < t.length; a++) o[a] = t[a];
    return o;
  }
  return Array.from(t);
}
Page({
  data: {
    wapUrl: a.globalData.wapUrl,
    payGiftRemainAmount: 0,
    totalPayAmount: 0,
    totalGiftAmount: 0,
    backRemainAmount: 0,
    totalBackAmount: 0,
    backRate: 0,
    couponCount: 0,
    amountRecordList: [],
    amountRecordType: 1,
    pageNo: 1,
    isAllData: !1
  },
  onLoad: function (t) {
    this.getData(), this.getList();
  },
  onReady: function () { },
  onShow: function () {
    wx.getStorageSync("walletPageRefresh") && (this.setData({
      amountRecordType: 1,
      pageNo: 1,
      isAllData: !1,
      amountRecordList: []
    }), this.getList(), this.getData());
  },
  onHide: function () {
    wx.removeStorageSync("walletPageRefresh");
  },
  onUnload: function () { },
  onPullDownRefresh: function () {
    this.setData({
      amountRecordType: 1,
      pageNo: 1,
      isAllData: !1,
      amountRecordList: []
    }), this.getList(), this.getData();
  },
  onReachBottom: function () {
    this.data.isAllData || this.getList();
  },
  getData: function () {
    var t = this;
    memberApi.get_wallet({}).then(function (a) {
      wx.stopPullDownRefresh(), 0 == a.errcode ? t.setData({
        payGiftRemainAmount: a.data.payGiftRemainAmount,
        totalPayAmount: a.data.totalPayAmount,
        totalGiftAmount: a.data.totalGiftAmount,
        backRemainAmount: a.data.backRemainAmount,
        totalBackAmount: a.data.totalBackAmount,
        backRate: a.data.backRate,
        couponCount: a.data.couponCount
      }) : wx.showToast({
        title: a.message,
        icon: "none"
      });
    }).catch(function (t) {
      console.log(t, 999);
    });
  },
  getList: function () {
    var o = this;
    memberApi.get_accountRecordList({
      pageNo: this.data.pageNo,
      pageSize: 10,
      amountRecordType: this.data.amountRecordType
    }).then(function (a) {
      if (0 == a.errcode) {
        var e = a.data.amountRecordList;
        e && e.length > 0 ? (o.setData({
          amountRecordList: [].concat(t(o.data.amountRecordList), t(e)),
          pageNo: ++o.data.pageNo
        }), e.length < 10 && o.setData({
          isAllData: !0
        })) : o.setData({
          isAllData: !0
        });
      } else wx.showToast({
        title: a.message,
        icon: "none"
      });
    }).catch(function (t) {
      console.log(t, 999);
    });
  },
  goTeturnCash: function () {
    wx.navigateTo({
      url: "/pages/user_v2/wallet/returnCash"
    });
  },
  goCoupon: function () {
    wx.navigateTo({
      url: "/pages/user/redpacket/redpacket"
    });
  },
  goDrawMoney: function () {
    wx.navigateTo({
      url: "/pages/user_v2/drawMoney/drawMoney"
    });
  },
  goRecharge: function () {
    wx.navigateTo({
      url: "/pages/user_v2/recharge/index"
    });
  },
  goOrderDetail: function (t) {
    var a = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/user_v2/orderDateils/orderDateils?id=" + a
    });
  },
  changeType1: function () {
    1 != this.data.amountRecordType && (this.setData({
      amountRecordType: 1,
      pageNo: 1,
      isAllData: !1,
      amountRecordList: []
    }), this.getList());
  },
  changeType2: function () {
    2 != this.data.amountRecordType && (this.setData({
      amountRecordType: 2,
      pageNo: 1,
      isAllData: !1,
      amountRecordList: []
    }), this.getList());
  }
});