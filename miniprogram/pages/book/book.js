function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function t(e, t, o) {
  return t in e ? Object.defineProperty(e, t, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = o, e;
}

function o(e, t) {
  return parseInt((e - t) / 864e5);
}

function a(e) {
  var t = (e = e.split("-"))[1],
    o = e[2];
  return e ? (t || "--") + "月" + (o || "--") + "日" : "--月--日";
}

function i(e) {
  return e = e.replace(/\//g, "-");
}

function n(e) {
  return e = e.replace(/\-/g, "/");
}

var r = function () {
  function e(e, t) {
    var o = [],
      a = !0,
      i = !1,
      n = void 0;
    try {
      for (var r, s = e[Symbol.iterator](); !(a = (r = s.next()).done) && (o.push(r.value), !t || o.length !== t); a = !0);
    } catch (e) {
      i = !0, n = e;
    } finally {
      try {
        !a && s.return && s.return();
      } finally {
        if (i) throw n;
      }
    }
    return o;
  }
  return function (t, o) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return e(t, o);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
}(),
  s = e(require("../../apiFetch/bookApi")),
  c = e(require("../../apiFetch/unitDetailsApi")),
  u = e(require("../../common/js/utils.js")),
  l = e(require("../../common/js/cookieRecord")),
  h = require("./utils/index"),
  p = require("./utils/fit"),
  f = getApp();

f.globalData.bookingData = {
  setContactList: function (e) {
    this.contactList = e;
  }
}, Page({
  data: {
    houseInfo: {},
    productInfo: {},
    promotion: {},
    insurance: {},
    bookingRule: {},
    priceDetail: {},
    showBeginDate: "",
    showEndDate: "",
    nightNumber: 1,
    bookingCount: 1,
    peopleCount: 1,
    guestName: "",
    guests: {},
    email: "",
    guestsLastIdType: 1,
    insuranceSwitchValue: !1,
    PWA_STATIC_TUJIA_HOST: "",
    isShowPopup: !1,
    showPopType: 1,
    insuranceLength: 0,
    isRecetionShow: !1,
    isLoading: !0,
    isUserGrayCheck: !1,
    isAliApp: u.default.isAliApp,
    isAliIos: u.default.systemInfo.isAliIos,
    isAcceptRuleShow: !1
  },
  isSeaOver: !1,
  activityInfo: "",
  productId: "",
  beginDate: "",
  endDate: "",
  tjUserPhone: "",
  ids: [],
  isLandlordNewActive: !1,
  onLoad: function (e) {
    var t = this;
    if (console.log(e), !f.userIsLogin()) return this.noLoginJump(e);
    this.options = this.initOption(e), this.options && (this.urlParamsSenceFilter(e.scene),
      this.getOrderForm().then(function (res) {
        t.getContactList();
      }).finally(function () {
        t.setData({
          isLoading: !1
        });
      }));
  },
  initOption: function (e) {
    var t = e.bookingCount,
      o = (e.peopleCount, e.end),
      n = e.start,
      r = e.unitid,
      s = e.productid,
      c = e.activityInfo; {
      if (r && s) {
        var l = f.globalUserInfo.tjUserInfo;
        return e.bookingCount = t || 1, e.peopleCount = 0, this.activityInfo = c, this.productId = s,
          n = n ? i(n) : u.default.dateFormat(new Date(), "yyyy-MM-dd"), o = o ? i(o) : u.default.dateFormat(new Date().addDays(1), "yyyy-MM-dd"),
          e.start = n, e.end = o, this.cacelendarHandle(n, o), this.setData({
            showBeginDate: a(n),
            showEndDate: a(o),
            bookingCount: e.bookingCount,
            peopleCount: e.peopleCount,
            tjUserPhone: l.mobile
          }), e;
      }
      u.default.errorShowTip("缺少房屋参数");
    }
  },
  getOrderForm: function () {
    var e = this,
      t = this.options.unitid,
      o = this.productId,
      a = this.activityInfo,
      i = this.beginDate,
      n = this.endDate,
      r = this.data,
      c = {
        bookingInfo: {
          bookingCount: r.bookingCount,
          peopleCount: r.peopleCount,
          checkInDate: i,
          checkOutDate: n
        },
        houseProductInfo: {
          activityInfo: a || "",
          houseId: t,
          productId: o,
          totalAmount: 0
        }
      };
    return s.default.getOrderForm(c).then(function (t) {
      return e.isSeaOver = 1 !== t.houseInfo.cityTerritoryType,
         t.peopleCount = t.productInfo.productFilter.currentPeopleCount,
        t.isSeaOver = e.isSeaOver, e.setData(t), 
        f.globalData.bookingData.orderData = t,
        Promise.resolve();
    }).catch(function (t) {
      if (e.checkLogin(t)) return u.default.errorShowTip(t.errorMsg || "订单信息异常，请重试"),
        Promise.reject();
    });
  },
  checkLogin: function (e) {
    var t = e.errorNo,
      o = e.errorMsg;
    return console.log(t, o), 55004 != t || (u.default.toast(o), f.clearTjUserInfo(),
      this.noLoginJump(), !1);
  },
  getProduct: function () {
    var e = this,
      t = this.data,
      o = t.bookingCount,
      a = t.peopleCount,
      i = t.houseInfo,
      n = {
        bookingCount: o,
        peopleCount: a,
        checkInDate: this.beginDate,
        checkOutDate: this.endDate,
        unitId: i.houseId
      };
    c.default.getProducts(n).then(function (t) {
      console.log(t);
      var o = t.products[0];
      e.activityInfo = o.activityInfo, e.productId = o.id, e.getOrderForm();
    }).catch(function (t) {
      e.checkLogin(t) && (u.default.errorShowTip(t.errorMsg || "订单信息异常，请重试."), reject(t));
    });
  },
  getOrderPrice: function () {
    var e = this,
      t = this.data,
      o = t.bookingCount,
      a = t.peopleCount,
      i = t.houseInfo,
      n = t.productInfo,
      r = t.promotion,
      c = {
        bookingInfo: {
          bookingCount: o,
          peopleCount: a,
          checkInDate: this.beginDate,
          checkOutDate: this.endDate
        },
        deposit: i.deposit,
        productInfo: n,
        promotion: r
      };
    s.default.getOrderPrice(c).then(function (t) {
      if (!t) return u.default.errorShowTip("价格信息异常，请重试");
      e.setData(t), Object.assign(f.globalData.bookingData.orderData, t);
    }).catch(function (t) {
      e.checkLogin(t) && u.default.errorShowTip(t.errorMsg || "价格信息异常，请重试");
    });
  },
  cacelendarHandle: function (e, t, i) {
    i || (i = o(new Date(n(t)), new Date(n(e)))), this.setData({
      nightNumber: i,
      showBeginDate: a(e),
      showEndDate: a(t)
    }), this.beginDate = e, this.endDate = t;
  },
  urlParamsSenceFilter: function (e) {
    if (e) {
      var t = u.default.senceFilter(e),
        o = r(t, 3),
        a = (o[0], o[1]),
        i = o[2];
      1 == a && (this.landlordId = i, this.isLandlordNewActive = !0);
    }
  },
  noLoginJump: function (e) {
    var t = "/pages/book/book" + u.default.urlParams(e || this.options);
    wx.redirectTo({
      url: "/pages/user/login/login?nextPath=" + encodeURIComponent(t) + "&openType=redirect"
    });
  },
  selectInputTap: function (e) {
    var o = e.detail,
      a = o.type,
      i = o.btn,
      n = o.min,
      r = o.max;
    a = "套" === a ? "bookingCount" : "peopleCount";
    var s = this.data[a],
      c = "+" === i;
    !c && s == n || c && s == r || (c ? s++ : s-- , this[a] = s, this.setData(t({}, a, s)),
      "bookingCount" === a && this.data.insuranceSwitchValue && this.setData({
        insuranceSwitchValue: !1
      }), this.getProduct());
  },
  saleRadioChange: function (e) {
    var o = e.detail,
      a = "promotion.items[" + o + "].select";
    this.setData(t({}, a, !this.data.promotion.items[o].select)), this.getOrderPrice();
  },
  insuranceSwtichChange: function (e) {
    var t = this.data,
      o = t.guestsLastIdType,
      a = t.guests,
      i = a.name,
      n = a.contactId,
      r = a.familyName,
      s = a.firstName,
      c = o,
      u = {
        insuranceSwitchValue: e.detail.value
      },
      l = a[h.idTypeKeys[c]],
      d = l && !l.idNumber || !n;
    u.insuranceLength = d ? 0 : 1, u.guestName = d ? "请添加" : 3 == c ? (0, h.passportName)(r, s) : i,
      this.setData(u), this.ids = d ? [] : [n];
  },
  getContactList: function () {
    var e = this;
    s.default.getContactList().then(function (t) {
      var o = (t = t || {}).data || [];
      e.isEmptyContact = !o.length;
      var a = (0, h.bookingContactFilter)(o, e.isSeaOver);
      e.setData(a), f.globalData.bookingData.setContactList(t.data);
    });
  },
  selectPeople: function () {
    this.setData({
      insuranceSwitchValue: !1
    });
    var e = this.isEmptyContact ? u.default.createUrlParamsString("/pages/book/pages/addPeople/addPeople", {
      isSeaOver: this.isSeaOver,
      from: "index"
    }) : u.default.createUrlParamsString("/pages/book/pages/peopleList/peopleList", {
      ids: this.data.guests.contactId,
      isSeaOver: this.isSeaOver
    });
    wx.navigateTo({
      url: e
    });
  },
  selectSale: function () {
    wx.navigateTo({
      url: u.default.createUrlParamsString("/pages/book/pages/redpacket/redpacket")
    });
  },
  changedDate: function () {
    var e = this.data.houseInfo,
      t = this.beginDate,
      o = this.endDate,
      a = u.default.createUrlParamsString("/pages/common/dateSelect/dateSelect", {
        beginDate: t,
        endDate: o,
        unitId: e.houseId
      });
    wx.navigateTo({
      url: a
    });
  },
  showPricePop: function () {
    this.setData({
      isShowPopup: !this.data.isShowPopup,
      showPopType: 1,
      isShowAll: !1
    });
  },
  inputChange: function (e) {
    var o = e.detail,
      a = o.name,
      i = o.value;
    this.setData(t({}, a, i));
  },
  orderSubmit: function (e, t) {

    var o = this,
      a = this.data,
      i = a.guests,
      n = a.email,
      r = a.guestsLastIdType,
      c = a.bookingCount,
      l = a.peopleCount,
      d = a.productInfo,
      p = a.houseInfo,
      f = a.priceDetail,
      g = a.promotion,
      m = a.insurance,
      y = a.tjUserPhone,
      v = a.insuranceSwitchValue,
      b = h.idTypeKeys[r],
      I = "请完善入住人信息",
      C = i.countryCode || "86",
      k = this.beginDate,
      D = this.endDate,
      S = this.ids;

    if (!i.contactId) return u.default.toast(I);
    if (!i.mobile) return u.default.toast("请输入手机号");
    if ("86" == C) {
      if (!u.default.checkMobile(i.mobile)) return u.default.toast("手机号格式不正确，请重新输入");
    } else if (!/^\d{6,}$/.test(i.mobile)) return u.default.toast("手机号格式不正确，请重新输入");
    if (this.isSeaOver || 3 == r) {
      if (!i.firstName || !i.familyName) return u.default.toast(I);
      if (this.isSeaOver && !n) return u.default.toast("请输入邮箱");
      if (this.isSeaOver && !u.default.checkEmail(n)) return u.default.toast("请输入正确的邮箱");
    } else if (!i.name || !i[b] || !i[b].idNumber) return u.default.toast(I);
    var w = {
      formId: e.detail.formId,
      bookingInfo: {
        bookingCount: c,
        checkInDate: k,
        checkOutDate: D,
        peopleCount: l
      },
      houseProductInfo: {
        activityInfo: d.activityInfo,
        houseId: p.houseId,
        productId: d.productId,
        totalAmount: f.totalAmount
      },
      guests: [{
        cardNo: i[b] ? i[b].idNumber || "" : "",
        certType: r,
        countryCode: C,
        email: n,
        mobile: i.mobile,
        name: 3 == r ? (0, h.passportName)(i.familyName, i.firstName) : i.name
      }],
      insurances: m && v ? this.getInsurances(S, m.insuranceName) : [],
      promotion: g,
      securityCheck: {
        cacheKey: d.cacheKey,
        code: t || "",
        currentMobile: y
      }
    };
    this.landlordAndCookieFilter(w), console.log("create:", w), s.default.createOrder(w).then(function (e) {
      o.createOrderSuccess(e), s.default.lastContact({
        contactId: i.contactId,
        lastIdType: r
      }).catch(function (e) {
        console.log("update contact err:", e);
      });
    }).catch(function (e) {
      if (console.log("create order error:", e), o.checkLogin(e)) return 56001 == e.errorNo ? o.setData({
        isUserGrayCheck: !0
      }) : void u.default.errorShowTip(e.errorMsg || "订单提交失败，请重试", !1);
    });
  },
  createOrderSuccess: function (e) {
    e.orderNo;
    var t = e.orderId,
      o = e.orderStatus,
      a = "",
      i = "?orderId=" + t;
    1 === o || 7 === o ? a = "/pages/pay_v2/index/index" : 11 === o ? a = "/pages/pay_v2/success/success" : 2 === o && (a = "/pages/pay_v2/confirm/confirm"),
      wx.redirectTo({
        url: a + i
      });
  },
  getInsurances: function (e, t) {
    var o = this;
    console.log(e);
    var a = [],
      i = null,
      n = getApp().globalData.bookingData.contactList,
      r = 0,
      s = void 0;
    return e.forEach(function (e) {
      (i = n.find(function (t) {
        return t.contactId === e;
      })) && (r = i.idType || (0, h.checkIdType)(i, o.isSeaOver), s = h.idTypeKeys[r],
        a.push({
          birthDay: i.birthDay,
          gender: i.sexType,
          insuredCertiNo: i[s] ? i[s].idNumber || "" : "",
          insuredCertiType: r,
          insurenceName: t,
          userName: 3 == r ? (0, h.passportName)(i.familyName, i.firstName) : i.name
        }));
    }), a;
  },
  landlordAndCookieFilter: function (e) {
    var t = l.default.getCookieRecord() || {},
      o = getApp().globalData.shareparams;
    if (this.isLandlordNewActive) e.landlordSourceChannelCode = "fdlx010901", e.orderSourceLandlordId = this.landlordId;
    else if (console.log("urlPathQuery:", o),
      o) try {
        var a = o.split("_"),
          i = r(a, 5),
          n = i[0],
          s = i[2],
          c = i[3],
          u = i[4],
          d = {
            checkInDate: s,
            checkOutDate: c,
            city: u,
            keyword: u
          };
        e.landlordSearchInfo = d, e.landlordSourceChannelCode = "tjfy010901", e.orderSourceLandlordId = n;
      } catch (e) {
        console.log("err-share-house", e);
      }
    var h = "";
    try {
      h = JSON.stringify(t);
    } catch (e) { }
    e.cookieRecord = h || {};
  },
  dateSelectCallback: function (e, t) {
    var a = u.default.dateFormat(e, "yyyy-MM-dd"),
      i = u.default.dateFormat(t, "yyyy-MM-dd"),
      n = o(e);
    this.cacelendarHandle(a, i, n), this.getProduct();
  },
  selectPeopleCallBack: function (e, t) {
    this.isEmptyContact = !1, console.log(e);
    var o = e.length;
    if (t) {
      var a = [],
        i = [];
      e.forEach(function (e, t) {
        i.push(e.contactId), a.push(3 == e.idType ? (0, h.passportName)(e.familyName, e.firstName) : e.name);
      }), this.setData({
        guestName: a.join("、"),
        insuranceLength: e && o || 1
      }), this.ids = i;
    } else {
      var n = (0, h.bookingContactFilter)(e, this.isSeaOver);
      this.isSeaOver && (n.email = e[0].passportTypeInfo && e[0].passportTypeInfo.email || ""),
        this.setData(n);
    }
  },
  selectAreaCode: function () {
    wx.navigateTo({
      url: "/pages/book/pages/areaCode/areaCode"
    });
  },
  areaCodeCallback: function (e) {
    this.setData({
      "guests.countryCode": e
    });
  },
  saleCallback: function (e, t) {
    console.log(e);
    var o = this.data.promotion.items[e],
      a = o.subItems.findIndex(function (e) {
        return e.select;
      });
    a !== t && (-1 != a && (o.subItems[a].select = !1), null !== t && (o.subItems[t].select = !0),
      this.getOrderPrice());
  },
  travelCardCallback: function (e, t) {
    console.log(t), this.data.promotion.items[e].subItems.forEach(function (e, o) {
      e.select = -1 !== t.indexOf(o);
    }), this.getOrderPrice();
  },
  goToInsurance: function () {
    var e = this.isEmptyContact ? u.default.createUrlParamsString("/pages/book/pages/addPeople/addPeople", {
      type: 1,
      isSeaOver: this.isSeaOver,
      from: "index"
    }) : u.default.createUrlParamsString("/pages/book/pages/peopleList/peopleList", {
      type: 1,
      houseCount: this.data.bookingCount,
      ids: this.ids.join(",")
    });
    wx.navigateTo({
      url: e
    });
  },
  goToInsurDetail: function () {
    this.data.insurance.detail && this.setData({
      isShowPopup: !0,
      showPopType: 2
    });
  },
  navback: function () {
    if (this.data.isShowPopup) return this.showPricePop();
    wx.showModal({
      title: "提示",
      confirmText: "继续预订",
      confirmColor: "#d7616d",
      cancelText: "狠心离开",
      content: "旅程近在眼前，确定现在要离开吗？",
      success: function (e) {
        e.cancel && wx.navigateBack({
          delta: 1
        });
      }
    });
  },
  getPhoneContact: function () {
    p.getPhoneContact.call(this, u.default);
  },
  userGrayCheck: function () {
    this.setData({
      isUserGrayCheck: !this.data.isUserGrayCheck
    });
  },
  getGaryCode: function (e) {
    this.orderSubmit({}, e.detail), this.userGrayCheck();
  },
  bookingRuleNav: function (e) {
    var t = e.currentTarget.dataset.url;
    t && u.default.openWebview(t);
  },
  globalTap: function () {
    this.data.isAcceptRuleShow && u.default.event.emit("closePeopleReception");
  },
  onPageScroll: function () {
    this.data.isAcceptRuleShow && u.default.event.emit("closePeopleReception");
  },
  tapAcceptRule: function (e) {
    var t = e.detail.isAcceptRuleShow;
    this.setData({
      isAcceptRuleShow: t
    });
  }
});