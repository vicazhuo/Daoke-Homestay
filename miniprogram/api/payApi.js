Object.defineProperty(exports, "__esModule", {
  value: !0
});

var e = new (function (e) {
  return e && e.__esModule ? e : {
    default: e
  };
}(require("./tjRequest")).default)(), o = {}, d = {
  paymentinfo: "v2.wxpayment/paymentinfo",
  submitpay: "v2.wxpayment/submitpay",
  existtnsorder: "v2.wxorder/existtnsorder",
  searchorder: "v2.wxorder/searchorder",
  getorderdetail: "v2.wxorder/getorderdetail",
  cancelorder: "v2.wxorder/cancelorder",
  deleteorder: "v2.wxorder/deleteorder",
  getProductprice: "v2.wxorder/getproductprice",
  createorder: "v2.wxorder/createorder",
  pay: "v2.wxpayment/weixinpay"
};

o.getPay = function (r, t, o) {
  e.getRequest(d.pay, {
    paysign: r,
    openId: t
  }, o);
}, o.getPaymentinfo = function (r, t) {
  e.postRequest(d.paymentinfo, {
    orderId: r
  }, t);
}, o.getSubmitpay = function (r, t) {
  e.postRequest(d.submitpay, {
    orderId: r
  }, t);
}, o.getCreateorder = function (r, t) {
  e.postRequest(d.createorder, r, t);
}, o.getProductprice = function (r, t) {
  e.postRequest(d.getProductprice, r, t);
}, o.getExisttnsorder = function (r) {
  e.postRequest(d.existtnsorder, null, r);
}, o.getSearchorder = function (r, t, o, n) {
  e.postRequest(d.searchorder, {
    pageIndex: r,
    pageSize: t,
    state: o
  }, n);
}, o.getOrderdetail = function (r, t) {
  e.postRequest(d.getorderdetail, {
    orderId: r
  }, t);
}, o.getCancelorder = function (r, t, o) {
  e.postRequest(d.cancelorder, {
    orderId: r,
    remarks: t
  }, o);
}, o.getDeleteorder = function (r, t, o) {
  e.postRequest(d.deleteorder, {
    IsHWOrder: r,
    orderID: t
  }, o);
}, exports.default = o;