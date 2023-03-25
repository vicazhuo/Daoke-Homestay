var o = function (e) {
  return e && e.__esModule ? e : {
    default: e
  };
}(require("../../../../apiFetch/orderDetail"));

Page({
  data: {
    PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl,
    goodsOrderDetails: null,
    isFromList: !1
  },
  onLoad: function (e) {
    var t = this, a = e.orderId, n = "list" == e.from, i = null;
    o.default.getOrderDetail(a).then(function (e) {
      console.log("附加产品",e)
      var o = e.tyingGoodsOrderDetail;
          o && ((i = o).items = i.items.map(function (e) {
             var o = e;
        return o.tyingGoodsSnapshot.intros.map(function (e) {
          if (e.value) {
            var o = encodeURIComponent(e.value);
            if ((o = o.replace(/%5Cn|%0A/g, "@@@@@")).indexOf("@@@@@") > -1) {
              var t = o.split("@@@@@");
              e.value = decodeURIComponent(t[0]), e.value2 = decodeURIComponent(t[1]);
            } else e.key = e.key, console.log(e.value), e.value = decodeURIComponent(e.value),
              e.value2 = "";
          } else e.value = "";
        }), o;
      })), t.setData({
        goodsOrderDetails: i,
        isFromList: n
      });
    }).catch(function (e) {
      wx.showToast({
        title: "获取订单信息失败，请重新尝试。"
      });
    });
  }
});