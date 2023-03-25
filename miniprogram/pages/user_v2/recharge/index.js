function t(t, e, a) {
  return e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}

var e = getApp(), memberAip = require("../../../apiFetch/member.js");

Page({
  data: {
    modalLeftEvent: "modalLeftEvent",
    modalRightEvent: "modalRightEvent",
    selId: "",
    selMoney: "",
    isDirect: !1,
    wapUrl: e.globalData.wapUrl,
    storeList: [],
    directObj: null,
    saleVip: null,
    directActivityObj: null,
    from: 0,
    orderId: null,
    userLevel: 0,
    userLevelName: ""
  },
  onLoad: function (t) {
    if (t && t.id) {
      var e = 1 == t.isDirect, a = t.orderId ? t.orderId : null, i = t.from ? t.from : 0;
      this.setData({
        selId: t.id,
        isDirect: e,
        from: i,
        orderId: a
      });
    }
    this.getData();
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  getData: function () {
    var t = this;
    memberAip.get_payActivityList({}).then(function (e) {
      if (0 == e.errcode) {
        console.log(e)
        var a = e.data.payActivityList;
        if (a && a.length > 0) {
          var i = [], n = null, o = null;
          a.forEach(function (t) {
            1 == t.is_mark ? o = t : -1 == t.sort ? n = t : i.push(t);
          }), t.setData({
            storeList: i,
            directObj: n,
            saleVip: e.data.saleVip,
            directActivityObj: o,
            userLevel: e.data.userLevel,
            userLevelName: e.data.userLevelName
          });
        }
        var s = t.data.selId;
 
        if (s) if (t.data.isDirect) t.change2(1); else {
          var r = t.data.storeList.filter(function (t) {
            return t.id == s;
          });
          r && r.length > 0 ? t.setData({
            selId: r[0].id,
            selMoney: r[0].payAmount
          }) : t.change1(1);
        } else t.change1(1);
      } else wx.showToast({
        title: e.errmsg,
        icon: "none"
      });
    }).catch(function (t) {
      console.log(t, 999);
    });
  },
  selFun: function (t) {
    var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.m;
    this.setData({
      selId: e,
      selMoney: a
    });
  },
  selWechatPayBtnFun: function () {
    if (12 == this.data.selId && this.data.userLevel > 0) {
      var e;
      this.setData((e = {},
        t(e, "modalSetting.modalContent", "您已经是" + this.data.userLevelName + "VIP，确认继续购买白银VIP吗？购买后将以较高等级为准\n"),
        t(e, "modalSetting.modalIsShow", !0), e));
    } else this.selWechatPay();
  },
  selWechatPay: function () {
    var t = this;
    var isChange = this.data.selId == t.data.directObj.id ? 0 : 1;
    memberAip.member_rechange_buy({
      activityId: this.data.selId,
      isChange: isChange
    }).then(function (e) {
      console.log(e, 888),
        0 == e.errcode ? t.goPay(e.data) : wx.showToast({
          title: e.errmsg || "支付失败",
          icon: "none"
        });
    }).catch(function (t) {
      console.log(t, 999);
    });

  },
  goPay: function (t) {
    var e = this;
    wx.requestPayment({
      timeStamp: t.timeStamp,
      nonceStr: t.nonceStr,
      package: "prepay_id=" + t.prepayId,
      signType: "MD5",
      paySign: t.sign,
      success: function (t) {

        1 == e.data.from ? wx.navigateBack() : wx.navigateTo({
          url: "/pages/vip/paySuccess/paySuccess?from=" + e.data.from
        });

      },
      fail: function (t) {
        wx.showToast({
          title: t.err_desc || "支付失败",
          icon: "none"
        });
      }
    });
  },

  change1: function (t) {

    (this.data.isDirect || t) && this.setData({
      isDirect: !1,
      selId: this.data.storeList[0].id,
      selMoney: this.data.storeList[0].payAmount
    });
  },
  change2: function (t) {
    this.data.isDirect && !t || (this.data.directActivityObj ? this.setData({
      isDirect: !0,
      selId: this.data.directActivityObj.id,
      selMoney: this.data.directActivityObj.payAmount
    }) : this.setData({
      isDirect: !0,
      selId: this.data.directObj.id,
      selMoney: this.data.directObj.payAmount
    }));
  },
  modalLeftEvent: function (e) {
    this.setData(t({}, "modalSetting.modalIsShow", !1));
  },
  modalRightEvent: function (t) {
    this.modalLeftEvent(), this.selWechatPay();
  }
});