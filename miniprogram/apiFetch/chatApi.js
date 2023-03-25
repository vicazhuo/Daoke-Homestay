function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
Object.defineProperty(exports, "__esModule", {
  value: !0
});
e(require("./tjFetch2.js"));
var r = e(require("./tjFetch.js")), t = (require("../common/js/utils"), r.default.host), d = t.WXCLIENT_TUJIA_HOST, s = (t.WXCUSTOMER_TUJIA_HOST,
  t.PIC_TUJIA_HOST, {
  getChatlogList: "v2.wxchat/chatlist",
  getOrderChatDateils: "v2.wxchat/chatorderdateils",
  delChatlog: "v2.wxchat/deletechatlog"
  }), u = {};

u.searchChatList = function (e, t, d, u) {
  return r.default.post(s.getChatlogList, {
    params: {
      customerSearchOrderStatus: e,
      orderIdList: t,
      pageIndex: d,
      pageSize: u
    }
  });
}, u.getOrderChatDateils = function (e) {
  return r.default.post(s.getOrderChatDateils, {
    params:e
  });
}, u.deleteLog = function (e, t) {
  return r.default.post(s.delChatlog, {
    params: {
      IsHWOrder: e,
      orderID: t
    }
  });
}, exports.default = u;