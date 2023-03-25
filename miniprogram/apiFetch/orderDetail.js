Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./tjFetch.js")), r = e.default.host, a = ({
  getOrderDetail:"v2.wxorder/getorderdetailv2",
  setChargeback: "v2.wxorder/agreechargebacks",
  getDepositeDetail: "v2.wxorder/getrefunddetail",
  cancelOrder:"v2.wxorder/cancelorder"
}), d = {};

d.getOrderDetail = function(r) {
    return e.default.post(a.getOrderDetail, {
        params: {
            orderId: r
        }
    });
}, d.setChargeback = function(r, t, d, o) {
    return e.default.post(a.setChargeback, {
        params: {
            agree: r,
            fineAmount: t,
            orderid: d,
            remark: o
        }
    });
}, d.getDepositeDetail = function(r) {
    return e.default.post(a.getDepositeDetail, {
        params: {
            orderId: r
        }
    });
}, d.cancelOrder = function(r, t) {
    return e.default.post(a.cancelOrder, {
        params: {
            orderId: r,
            remarks: t
        }
    });
}, exports.default = d;