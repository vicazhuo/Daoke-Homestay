function e(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}

function t(e) {
  return e.disableText.length > 21 && (e.disableTextAll = e.disableText, e.disableText = e.disableText.substring(0, 21) + "...",
    e.isMore = !0, e.isOpen = !1), e;
}

var a = function (e) {
  return e && e.__esModule ? e : {
    default: e
  };
}(require("../../../../common/js/utils")), i = require("../../utils/index");

Page({
  data: {
    redpacketList: [],
    unRedpacketList: [],
    isOpenUnRedPacket: !1,
    PWA_STATIC_TUJIA_HOST: ''
  },
  onLoad: function (e) {
    this.init(e);
  },
  init: function (e) {
    var n = e.index, r = getApp();
    this.promotionIndex = n;
    try {
      var o = r.globalData.bookingData.orderData.promotion, s = a.default.cloneObj(o.items[n]);
      if (s) {
        s.subItems.forEach(function (e) {
          e.introduction = (0, i.gradRedPacketFilter)(e.introduction);
        });
        var u = s.subItems.filter(function (e) {
          return e.enabled;
        });
        3 == s.subType && wx.setNavigationBarTitle({
          title: "房东红包"
        }), this.setData({
          redpacketList: u,
          unRedpacketList: s.subItems.filter(function (e) {
            return !e.enabled;
          }).map(function (e) {
            return t(e);
          }),
          subTopIntroduction: s.subTopIntroduction,
          isOpenUnRedPacket: !u.length
        }), this.prevIndex = u.findIndex(function (e) {
          return e.select;
        });
      }
    } catch (e) {
      console.log(e), a.default.errorShowTip("优惠数据异常");
    }
  },
  openUnRedPacket: function () {
    var e = !this.data.isOpenUnRedPacket;
    this.setData({
      isOpenUnRedPacket: e
    });
  },
  selectRedpacket: function (e) {
    var t = e.currentTarget.dataset.index;
    a.default.execPrevPageCallback("saleCallback", this.promotionIndex, t);
  },
  toRedPacketDetail: function (e) {
    var t = e.currentTarget.dataset.url;
    t && a.default.openWebview(t);
  },
  unSelectPromotion: function () {
    a.default.execPrevPageCallback("saleCallback", this.promotionIndex, null);
  },
  moreBtnHandle: function (t) {
    var n = t.currentTarget.dataset.index, a = this.data.unRedpacketList[n];
    a.isMore && this.setData(e({}, "unRedpacketList[" + n + "].isOpen", !a.isOpen));
  }
});