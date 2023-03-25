Object.defineProperty(exports, "__esModule", {
  value: !0
});

var t = function (t) {
  return t && t.__esModule ? t : {
    default: t
  };
}(require("./tjFetch.js")),r = ({
    getAreaCode:"v2.bingo.wx.city/getcountrycodes",
  getOrderForm: "v2.wxorder/orderform",
  getOrderPrice:"v2.wxorder/calulateorderprice",
  delContact: "v2.bingo/deletecontact",
  saveContact:"v2.bingo/savecontact",
  lastContact: "v2.bingo/updatecontactlasttime",
  getContactList:"v2.bingo/querycontactlist",
  createOrder:"v2.wxorder/createorder",
  validateCode: "v2.wxorder/sendvoicevalidatecode"
  }), a = {};

a.getAreaCode = function () {
  return t.default.post(r.getAreaCode, {
    isLoading: !0
  });
}, a.getOrderForm = function (e) {
  var o = e.bookingInfo, a = e.houseProductInfo;
  return t.default.post(r.getOrderForm, {
    params: {
      bookingInfo: o,
      houseProductInfo: a
    },
    isLoading: !0
  });
}, a.createOrder = function (e) {
  e.bookingInfo, e.houseProductInfo, e.guests, e.insurances, e.promotion, e.securityCheck,
    e.landlordSourceChannelCode, e.orderSourceLandlordId, e.cookieRecord, e.landlordSearchInfo;
  return t.default.post(r.createOrder, {
    params: arguments[0],
    isLoading: !0
  });
}, a.getOrderPrice = function (e) {
  e.bookingInfo, e.deposit, e.productInfo, e.promotion;
  return t.default.post(r.getOrderPrice, {
    params: arguments[0],
    isLoading: !0
  });
}, a.getContactList = function () {
  var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
  return t.default.post(r.getContactList, {
    isLoading: e,
    params: {
      pageIndex: 0,
      pageSize: 500
    }
  });
}, a.delContact = function (e) {
  return t.default.post(r.delContact, {
    params: {
      contactId: e
    },
    isLoading: !0
  });
}, a.saveContact = function (e) {
  e.countryCode, e.lastIdType, e.mobile, e.familyName, e.firstName, e.sexType, e.birthDay,
    e.name, e.contactId, e.idTypeInfo, e.officerTypeInfo, e.passportTypeInfo;
  return t.default.post(r.saveContact, {
    params: arguments[0],
    isLoading: !0
  });
}, a.lastContact = function (e) {
  var o = e.contactId, a = e.lastIdType;
  return t.default.post(r.lastContact, {
    params: {
      contactId: o,
      lastIdType: a
    }
  });
}, a.validateCode = function (e) {
  return t.default.post(r.validateCode, {
    params: {
      currentMobile: e
    },
    isLoading: !0
  });
}, exports.default = a;