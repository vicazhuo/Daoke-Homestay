function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

var e = function () {
  function t(t, e) {
    var i = [], n = !0, a = !1, o = void 0;
    try {
      for (var r, s = t[Symbol.iterator](); !(n = (r = s.next()).done) && (i.push(r.value),
        !e || i.length !== e); n = !0);
    } catch (t) {
      a = !0, o = t;
    } finally {
      try {
        !n && s.return && s.return();
      } finally {
        if (a) throw o;
      }
    }
    return i;
  }
  return function (e, i) {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e)) return t(e, i);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
}(), i = Object.assign || function (t) {
  for (var e = 1; e < arguments.length; e++) {
    var i = arguments[e];
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
  }
  return t;
}, n = t(require("../../apiFetch/unitDetailsApi.js")),
  a = t(require("../../apiFetch/searchApi")),
  r = require("../../common/js/utils.js"),
  s = void 0,
  u = void 0,
  c = void 0,
  l = "",
  d = getApp();

Page({
  data: {
    unit: null,
    dateDescObj: {},
    houseTagsForUser: [],
    houseTags: [],
    unitTagsBitValue: "",
    commentPreviewData: [],
    similarUnitsList: [],
    productsList: [],
    unitTrafficInfos: [],
    promotionList: [],
    cancelRules: [],
    selectBegin: "",
    selectEnd: "",
    unitId: "",
    chatId: 0,
    selectDate: '',
    unitNumber: "",
    promotionLinksForUnit: [],
    isPageError: !1,
    isShare: !1,
    PWA_STATIC_TUJIA_HOST: d.globalStaticUrl,
    isVideoOrVR: !1,
    baseBrief: [],
    unitCommentSummary: {},
    cancelTexts: [],
    houseBrief: {},
    brandInfo: {},
    briefIntroduction: "",
    isGetUserInfoPopup: !1,
    popupConfig: {},
    unitFacilityGroups: [],
    geoHousePosition: [],
    geoHandPosition: [],
    checkinOtherInfo: [],
    sWeekText: "",
    eWeekText: "",
    interval: 0,
    dateObj: {},
    realPhoto: !1,
    getProductFail: !1,
    footerLoading: !0,
    houseSafeDescription: "",
    cityTerritoryType: 1,
    unitName: "",
    landlordId: "",
    checkInRules: [],
    isNeedShiPei: !1
  },
  onLoad: function (t) {
    d.initCfgAndCode(t), 
     this.optionsDataHandle(t),
     this.setData({
      unitId: t.unitId,
      houseTags: wx.getStorageSync("globalHouseTags")
    });
      this.ajaxDataHandler(t), 
      this.setDataDateText(), 
      this.getUnitV3(), 
      this.geoPositionHandler(),
      this.getCommentList(), 
      this.getProducts(u, c, !1, !1), 
      this.getSimilarUnits(),
      this.setData({
        isNeedShiPei: d.globalData.systemInfo.isNeedShiPei
      });
  },
  onReady: function () {
    this.getOrderDetailPopup();
  },
  getHouseTag: function (t) {
    t.housetag && 0 != t.housetag.length && this.setData({
      houseTagsForUser: t.housetag
    });
  },
  getDeposit: function () {
    var t = this;
    n.default.deposit({
      unitId: s,
      checkInDate: r.dateFormat(u, "yyyy-MM-dd"),
      checkOutDate: r.dateFormat(c, "yyyy-MM-dd")
    }).then(function (e) {
      t.data.cancelTexts[1].introduction = t.data.cancelTexts[1].introduction.replace('途家', '稻客民宿');
      e && (t.data.cancelTexts.splice(1, 0, e), t.setData({
        cancelTexts: t.data.cancelTexts
      }));
    }).catch(function (t) { }).finally(function () { });
  },
  getSimilarUnits: function () {
    var t = this;
    n.default.getSimilarUnits({
      unitId: s
    }).then(function (e) {
      t.setData({
        similarUnitsList: e.items || []
      });
    }).catch(function (t) { }).finally(function () { });
  },
  getWexincodeTextTitle: function (t) {
    function e(t) {
      return !!new RegExp("[\\u4E00-\\u9FFF]").test(t);
    }
    var i = Math.floor(84.6), n = {};
    n.str = t.slice(0, i);
    var a = "", o = !0, r = !1, s = void 0;
    try {
      for (var u, c = n.str[Symbol.iterator](); !(o = (u = c.next()).done); o = !0) {
        var l = u.value;
        if (i < 0 || 0 == i) break;
        e(l) ? (a += l, i -= 2) : (a += l, i -= 1);
      }
    } catch (t) {
      r = !0, s = t;
    } finally {
      try {
        !o && c.return && c.return();
      } finally {
        if (r) throw s;
      }
    }
    return n.str = a, t.length > n.str.length && (e(n.str[n.str.length - 1]) || e(n.str[n.str.length]) ? n.str = n.str.slice(0, n.str.length - 1) + "..." : n.str = n.str.slice(0, n.str.length - 2) + "..."),
      n;
  },
  getProducts: function (t, e, i, a) {

    var o = this, d = {
      checkInDate: r.dateFormat(t, "yyyy-MM-dd"),
      checkOutDate: r.dateFormat(e, "yyyy-MM-dd"),
      unitId: s,
      activityInfo: l,
      isLoading: i
    };
    n.default.getProducts(d).then(function (i) {

      a && (u = t, c = e, o.setDataDateText()), i.cancelRules && 0 != i.cancelRules.length && i.cancelRules.forEach(function (t, e) {
        t.tip && (t.tips = t.tip.split("/r/n"));
      }), i.promotionLinks && i.promotionLinks.length && i.promotionLinks.forEach(function (t, e) {
        t.text = o.getWexincodeTextTitle(t.text).str;
      });
    
      o.setData({
        selectDate: d.checkInDate + '~' + d.checkOutDate,
        productsList: i.products || [],
        promotionList: i.promotionLinks || [],
        cancelRules: i.cancelRules || [],
        cancelTexts: i.cancelTexts || [],
        getProductFail: !1
      }), o.getDeposit();

    }).catch(function (t) {
      o.setData({
        getProductFail: !1
      });
    }).finally(function () { });
  },
  getCommentList: function () {
    var t = this, e = {
      unitId: s,
      pageIndex: 0,
      pageSize: 20
    };
    n.default.searchUnitComments(e).then(function (e) {
      e && 0 != e.length && (e.forEach(function (t, e) {
        t.totalScoreDesc = r.toDecimal(t.totalScore || 0, 1);
      }), t.setData({
        commentPreviewData: e
      }));
    }).catch(function (t) { }).finally(function () { });
  },
  getUnitV3: function () {
    var t = this;
    n.default.getUnit({
      unitId: s
    }).then(function (e) {
      var i = e;
      var chatID = 0;
      if (i.chatID) {
        chatID = i.chatID;
      }
      t.setData({ unitNumber: i.unitNumber, chatId: chatID })
      t.unitCommentSummaryHandler(i), t.specialValueHandler(i), t.houseOverView(i),
        t.checkinOtherInfo(i), t.serviceHander(i), t.getHouseTag(i);
    }).catch(function (e) {
      t.data.isShare ? t.setData({
        isPageError: !0
      }) : wx.navigateBack({
        delta: 1
      });
    }).finally(function () { });
  },
  serviceHander: function (t) {
    this.setData({
      scopeData: {
        service_type: 11062,
        city: t.cityName || "",
        location: t.address || t.districtName || ""
      }
    });
  },
  checkinOtherInfo: function (t) {
    if (t.checkinOtherInfo && 0 != t.checkinOtherInfo.length) {
      var e = [];
      t.checkinOtherInfo.forEach(function (t, n) {
        if (t.items[0]) {
          var a = i({}, t.items[0]);
          delete t.items, a = i({}, a, t), e.push(a);
        }
      }), this.setData({
        checkinOtherInfo: e
      });
    }
  },
  houseOverView: function (t) {
    t.unitExtraVo && t.unitExtraVo.baseBrief && 0 != t.unitExtraVo.baseBrief.length && this.setData({
      baseBrief: t.unitExtraVo.baseBrief
    }), t.unitExtraVo && t.unitExtraVo.houseBrief && this.setData({
      houseBrief: t.unitExtraVo.houseBrief
    }), t.unitExtraVo && t.unitExtraVo.houseSafeDescription && this.setData({
      houseSafeDescription: t.unitExtraVo.houseSafeDescription
    }), t.unitExtraVo && this.setData({
      realPhoto: t.unitExtraVo.realPhoto
    });
    t.brandInfo && this.setData({
      brandInfo: t.brandInfo
    });

  },
  specialValueHandler: function (t) {
    (t.unitVRURL || t.unitVideoURL) && this.setData({
      isVideoOrVR: !0
    }), t.unitTrafficInfos && t.unitTrafficInfos.length && this.setData({
      briefIntroduction: t.unitTrafficInfos[0].introduction,
      unitTrafficInfos: t.unitTrafficInfos
    }), t.unitFacilityGroups && t.unitFacilityGroups.length > 0 && this.setData({
      unitFacilityGroups: t.unitFacilityGroups
    }), t.unitName && this.setData({
      unitName: t.unitName
    }), t.checkInRules && t.checkInRules.length && this.setData({
      checkInRules: t.checkInRules
    }), this.setData({
      cityTerritoryType: t.cityTerritoryType
    });
  },
  unitCommentSummaryHandler: function (t) {
    var e = this;
    t.unitCommentSummary && (t.unitCommentSummary.overallDesc = r.toDecimal(t.unitCommentSummary.overall || 0, 1),
      t.unitCommentSummary.cleanlinessDesc = r.toDecimal(t.unitCommentSummary.cleanliness || 0, 1),
      t.unitCommentSummary.servicesDesc = r.toDecimal(t.unitCommentSummary.services || 0, 1),
      t.unitCommentSummary.trafficDesc = r.toDecimal(t.unitCommentSummary.traffic || 0, 1),
      t.unitCommentSummary.houseDecorationDesc = r.toDecimal(t.unitCommentSummary.houseDecoration || 0, 1)),
      t.promotionLinks && t.promotionLinks.length && t.promotionLinks.forEach(function (t, i) {
        t.text = e.getWexincodeTextTitle(t.text).str;
      }),this.setData({
        unit: t,
        unitCommentSummary: t.unitCommentSummary || {},
        unitTagsBitValue: t.unitTagsBitValue
      });
  },
  geoPositionHandler: function () {
    var t = this;
    n.default.geohousePosition({
      unitId: s
    }).then(function (e) {
      var n = [];
      e && 0 != e.length && (e.forEach(function (t, e) {
        var a = {};
        t.geoPositionList && 0 != t.geoPositionList.length && ((a = i({}, t.geoPositionList[0])).groupName = t.groupName,
          a.groupIcon = t.groupIcon,
          a.positionLen = t.geoPositionList.length),
          n.push(a);
      }), t.setData({
        geoHousePosition: e,
        geoHandPosition: n
      }));
    }).catch(function (t) { }).finally(function (t) { });
  },
  optionsDataHandle: function (t) {
    if (t.beginDate) {
      var i = new Date(), n = new Date(t.beginDate).getTime();
      i.setHours(0, 0, 0, 0), n < i.getTime() && (t.beginDate = new Date().toISOString(),
        t.endDate = new Date(i.setDate(i.getDate() + 1)).toISOString());
    }
    if (t.nextPars) {
      var a = JSON.parse(decodeURIComponent(t.nextPars) || {});
      t.unitId = a.unitId, t.beginDate = a.beginDate, t.endDate = a.endDate, this.setData({
        isShare: !0
      });
    }
    var o = wx.getStorageSync("FROM_TYPE");
    if (t.scene) {
      var s = r.senceFilter(t.scene), u = e(s, 3), c = u[0], l = u[1], h = u[2];
      t.unitId = c, this.urlSence = t.scene, 2 == l && d.globalGio("track", "fangwureturnshijian", {
        fangwureturn: l
      }), 1 == l && d.setGlobalCode("WxAppfdlxCode"), 3 == l && d.setGlobalCode("WxApptjfyCode"),
        this.setData({
          isShare: !0,
          landlordId: h
        });
    } else if (3 == o) {
      var f = wx.getStorageSync("FROM_TYPE_SHARE_HOUSE_landlordId");
      d.setGlobalCode("WxApptjfyCode"), this.setData({
        isShare: !0,
        landlordId: f
      });
    }
  },
  ajaxDataHandler: function (t) {
    if (s = t.unitId, u = new Date(), c = new Date(u.getTime() + 864e5), t.beginDate && t.endDate) {
      var e = new Date(t.beginDate), i = new Date(t.endDate);
      e && (u = u > e ? u : e, c = c > i ? c : i);
    }
    l = t.activityInfo;
  },
  callPhone: function (t) {
    var e = this.data.unit.landlordInfo, i = "/pages/unitDetails_v2/unitDetails?beginDate=" + r.dateFormat(u, "yyyy/MM/dd") + "&endDate=" + r.dateFormat(c, "yyyy/MM/dd") + "&unitId=" + s;
    if (getApp().userIsLogin()) if (e.realTimeServiceHotlinePattern) wx.navigateTo({
      url: "/pages/unitDetails_v2/common/unitCallPhone/unitCallPhone?&realTimeServiceHotlinePattern=" + e.realTimeServiceHotlinePattern
    }); else {
      var n = decodeURIComponent(e.serviceHotline), a = n.replace("#", "").split(",");
      a.length > 1 ? wx.showModal({
        content: "拨通电话后请输入分机号-" + a[1],
        cancelText: "取消",
        confirmText: "拨打电话",
        success: function (t) {
          t.confirm && wx.makePhoneCall({
            phoneNumber: a[0]
          });
        }
      }) : wx.makePhoneCall({
        phoneNumber: n
      });
    } else wx.navigateTo({
      url: "/pages/user/login/login?nextPath=" + encodeURIComponent(i) + "&openType=redirect"
    });
  },
  openChat: function () {

   console.log("去聊天页面")
  },
  changedDate: function () {
    var t = "/pages/common/dateSelect/dateSelect?beginDate=" + r.dateFormat(u, "yyyy-MM-dd") + "&endDate=" + r.dateFormat(c, "yyyy-MM-dd") + "&unitId=" + s;
    this.activityInfo && (t += "activityInfo=" + this.activityInfo), wx.navigateTo({
      url: t
    });
  },
  dateSelectCallback: function (t, e) {
    this.getProducts(t, e, !0, !0);
  },
  setDataDateText: function () {
    var t = "", e = "", i = "", n = "", a = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], o = {
      monthDesc: r.dateFormat(u, "MM")
    };
    t = r.dateFormat(u, "yyyy-MM-dd"), e = r.dateFormat(c, "yyyy-MM-dd"), i = r.dateFormat(u, "MM月dd日"),
      n = r.dateFormat(c, "MM月dd日"), this.setData({
        dateDescObj: o
      });
    var s = new Date(t), l = new Date(e), d = a[s.getDay()], h = a[l.getDay()], f = {
      beginDate: t,
      endDate: e
    };
    this.setData({
      dateObj: f,
      selectBegin: i,
      selectEnd: n,
      sWeekText: d,
      eWeekText: h,
      interval: parseInt((l - s) / 864e5)
    });
  },
  initWxUserInfoCal: function (t) {
    this.setData({
      isGetUserInfoPopup: !0
    }), this.buyPageData = t;
  },
  navBuyPage: function (t) {
    var i = this, n = this.data.productsList[0];
    if (n && !(n && n.finalPrice <= 0)) if (n.allowBooking) {
      var a = "/pages/book/book?start=" + r.dateFormat(u, "yyyy/MM/dd") + "&end=" + r.dateFormat(c, "yyyy/MM/dd") + "&unitid=" + s + "&productid=" + n.id + "&activityInfo=" + n.activityInfo;
      if (this.urlSence) {
        var o = r.senceFilter(this.urlSence), l = e(o, 3), d = (l[0], l[1]);
        l[2];
        1 == d && (a += "&scene=" + this.urlSence);
      }
      getApp().userIsLogin() ? wx.navigateTo({
        url: a
      }) : wx.navigateTo({
        url: "/pages/user/login/login?nextPath=" + encodeURIComponent(a) + "&openType=redirect"
      });
    } else i.changedDate();
  },
  onShareAppMessage: function (t) {
    var e = encodeURIComponent("/pages/unitDetails_v2/unitDetails"), i = {
      unitId: s,
      beginDate: r.dateFormat(u, "yyyy-MM-dd"),
      endDate: r.dateFormat(c, "yyyy-MM-dd")
    }, n = encodeURIComponent(JSON.stringify(i)), a = getApp().getGlobalCode(), ap = getApp();
    return {
      title: this.data.unit.unitName,
      imageUrl: this.data.unit.pictureList && this.data.unit.pictureList[0] && this.data.unit.pictureList[0].url,
      desc: "稻客民宿小程序系统",
      path: "/pages/index/index?nextPath=" + e + "&nextPars=" + n + "&code=" + a + '&pid=' + ap.globalUserInfo.tjUserInfo.userId
    };
  },
  getOrderDetailPopup: function () {
    var t = this;
    a.default.getOrderDetailPopup().then(function (e) {
      if (e && e.pictureUrl) {
        var i = "isOrderPopup:" + e.pictureUrl.substring(15);
        wx.getStorage({
          key: i,
          fail: function (n) {
            t.setData({
              popupConfig: {
                navigateUrl: e.navigateUrl,
                pictureUrl: e.pictureUrl,
                isShow: !0
              }
            }), wx.setStorage({
              key: i,
              data: 1
            });
          }
        });
      }
    });
  },
  gotoHouseDetailDesc: function () {
    wx.navigateTo({
      url: "/pages/unitDetails_v2/common/unitHouseDesc/unitHouseDesc?unitId=" + s
    });
  },
  getUserInfoPopupClose: function () {
    this.setData({
      isGetUserInfoPopup: !1
    }), this.navBuyPage(this.buyPageData);
  },
  getProductAgain: function () {
    this.getProducts(u, c, !1, !1);
  },
  editFooterLoading: function (t) {
    this.setData({
      footerLoading: t.detail.status
    });
  },
  /**
   * 登录组件回调方法
   * 
   * **/
  callbackEvent: function (e) {

    console.log(e)
  },
});