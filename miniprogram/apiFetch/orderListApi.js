function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

e(require("./tjFetch2.js"));

var r = e(require("./tjFetch.js")), t = require("../common/js/utils"),  s = {
  searchOrderList:"v2.wxorder/searchorderlist",
  deleteOrder:"v2.wxorder/deleteorder"
}, u = {};

u.searchOrderList = function(e, t, d, u) {
    return r.default.post(s.searchOrderList, {
        params: {
            customerSearchOrderStatus: e,
            orderIdList: t,
            pageIndex: d,
            pageSize: u
        }
    });
}, u.deleteOrder = function(e, t) {
    return r.default.post(s.deleteOrder, {
        params: {
            IsHWOrder: e,
            orderID: t
        }
    });
}, exports.default = u;