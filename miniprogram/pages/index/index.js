function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

var e = t(require("../../api/searchApi.js")),
  a = t(require("../../apiFetch/searchApi.js")),
  i = (require("../../common/js/tjRequest.js"), require("../../common/js/utils.js")),
  n = (require("../../components/toast/toast.js"), void 0);

Page({
  data: {
    tjUser: {},
    dest: {},
    dates: {},
    curDest: {},
    isPositionLoading: !1,
    imgConfig: {},
    hotRecommendLoading: false,
    shareTitle: '稻客民宿，专注民宿平台解决方案',
    bannerManage: null,
    activityInfo:{},
    geoConfig: {
      text: "我的位置",
      isWxAuth: !0,
      isSystemAuth: !0
    },
    weekData: {
      neighborhoodItems: {},
      weekendPlayItems: {},
      neighborhoodScrollX: 0,
      weekendPlayScrollX: 0
    },
    topBanners: [],
    hotRecommendData: {
      cityAreaItems: {
        items: [],
        title: "市区推荐",
        text: "说走就走，繁华中体会不一样的家"
      },
      hotItems: {
        items: [],
        title: "热门入住",
        text: "住进超人气民宿，一秒变身偶像剧主角"
      },
      suburbsItems: {
        items: [],
        title: "近郊热门",
        text: "忘却平日烦恼，来一场回血之旅"
      }
    },
    serviceEnsureItems: [],
    bottomBannerItems: [],
    isAliApp: i.isAliApp,
    loactionSetting: !1,
    isNextPath: !1,
    isShowNewUserArea: true
  },
  _nextPath: "",
  _nextPars: "",
  _myLocation: {},
  _myLocationType: 45,
  _isClickedMyLocation: !1,
  isLoadHotRecomendData: !1,
  activeHotRecommentCityId: 48,
  housePriceFilters: [],
  onLoad: function (t) {
    var i = getApp();
    var e = this, a = this._nextPath = decodeURIComponent(t.nextPath || "");
    this._nextPars = t.nextPars || "";

    this.initSearch(), i.initCfgAndCode(t),
      this.getHomeCityLocationStorage().then(function () {
        e.loadHotRecommend();
      }).catch(function () {
        e.getGeo();
      }), this.getportal(a), this.onNetworkType();
  },
  onModalCloseEvent: function () {
    this.data.imgConfig.microPictureUrl && this.selectComponent("#btnFloatLayer").show();
  },
  getHomeCityLocationStorage: function () {
    var t = this;
    return new Promise(function (e, a) {
      wx.getStorage({
        key: "homeCityLocation",
        success: function (i) {
          i.data ? (t.setData({
            dest: i.data
          }), e()) : a();
        },
        fail: function (t) {
          a();
        }
      });
    });
  },
  newUserTap: function () {

  },
  getportal: function (t) {
    var e = this;
    a.default.getportal().then(function (a) {
      if (a) {

        var i = a.advertisement,
          n = void 0 === i ? {} : i,
          o = a.serviceEnsure,
          s = void 0 === o ? {} : o,
          d = (a.bottomBanner,
            a.topBanner),
          r = void 0 === d ? {} : d,
          c = !(!a.wxPopupConfig || "/pages/unitDetails_v2/unitDetails" === t),
          u = { isShow: c };

        if ({}.params = u, c) {

          var g = a.wxPopupConfig,
            m = g.pictureUrl,
            l = g.navigateUrl,
            h = g.microPictureUrl;
          l = l + (l.includes("?") ? "&" : "?") + "userId=" + e.data.tjUser.userId + "&userToken=" + e.data.tjUser.userToken,
            Object.assign(u, {
              pictureUrl: m,
              navigateUrl: l,
              microPictureUrl: h
            }), e.setActivePopup(m);
        }
        e.setData({
          imgConfig: u,
          shareTitle: a.shareTitle,
          topBanners: r ? r.navigations : [],
          bannerManage: a.getBannerManage,
          serviceEnsureItems: s && s.navigations ? s.navigations : [],
          bottomBannerItems: n && n.navigations ? n.navigations : []
        });
        //设置全局广告数据
        wx.setStorageSync("getBannerManage", a.getBannerManage);

      }
    }).catch(function (t) {
      console.log(t, "获取index首页配置项出错信息");
    });
  },
  onShow: function () {
    wx.setStorageSync("messageTabBackRoute", this.route);

    var t = this.data.geoConfig, 
    e = t.isWxAuth, 
    a = t.isSystemAuth;
    this.initHouseTags();
    var i = this;
    i._nextPath && wx.navigateTo({
      url: i._nextPath + "?nextPars=" + i._nextPars,
      success: function () {
        i._nextPath = "", i._nextPars = "";
      }
    }), e && a || setTimeout(this.getGeo, 500);
  },
  onShareAppMessage: function () {
    var t = getApp();
    return {
      title: this.data.shareTitle,
      path: "/pages/index/index?pid=" + t.globalUserInfo.tjUserInfo.userId
    };
  },
  loadHotRecommend: function () {
    var t = this.data.dest.destId, e = this.activeHotRecommentCityId, a = this.isLoadHotRecomendData;
    t == e && a || (this.loadWeekData(), this.loadHotRecommendData());
  },
  loadWeekData: function () {
    var t = this, e = this.data.dest, i = e.destId, n = e.keywordSuggestType;
    return a.default.getWeekAndPlay({
      cityId: i,
      oversea: 2 == n
    }).then(function (e) {
      e && (e.neighborhoodScrollX = 0, e.weekendPlayScrollX = 0, t.setData({
        weekData: e
      }), t.isLoadHotRecomendData = !0, t.activeHotRecommentCityId = i);
    });
  },
  loadHotRecommendData: function () {
    var t = this,
      e = this.data.dest,
      i = e.destId,
      n = e.keywordSuggestType;
    return a.default.getHotRecommend(i, 2 == n).then(function (e) {
      if (e) {
        var a = t.data.hotRecommendData, i = [];
        for (var n in a) a[n].items = e[n] || [], e[n] && e[n].forEach(function (t) {
          i = i.concat(t.unitProductFilters);
        });
        t.updateHotRecommendHousePrice(null, i, a).finally(function () {
          t.setData({
            hotRecommendLoading: false
          });
        });
      }
    }).catch(function () {
      t.setData({
        hotRecommendLoading: false
      });
    });
  },
  updateHotRecommendHousePrice: function (t, e, i) {
    var n = this, o = t = t || this.data.dates, s = o.beginDate, d = o.endDate;
    e = e || this.housePriceFilters, i = i || this.data.hotRecommendData;
    var r = void 0;
    return a.default.getHousePrice(s, d, e).then(function (t) {
      var a = t.items;
      for (var o in i) i[o].items && i[o].items.length && i[o].items.forEach(function (t) {
        t.items.forEach(function (t) {
          (r = a.find(function (e) {
            return e.houseId === t.unitId;
          })) && (t.finalPrice = r.finalPrice, t.productPrice = r.productPrice, t.promotionPicUrl = r.promotionPicUrl);
        });
      });
      n.housePriceFilters = e, n.setData({
        hotRecommendData: i
      });
    });
  },
  getGeo: function (t) {
    var e = this, i = this, n = !!t && "myLocation" == t.currentTarget.id;
    getApp().validTab(t, 800) && !i._isClickedMyLocation && "网络无法连接" !== this.data.geoConfig.text && (i._isClickedMyLocation = !0,
      i.setData({
        isPositionLoading: !0
      }), i.getNetworkType().then(function () {
        wx.getLocation({
          type: "wgs84",
          success: function (t) {
            var o = t.latitude, s = t.longitude;
            a.default.geoToAddress({
              lat: o,
              lng: s
            }).then(function (t) {
              if (!t || !t.cityId) return i.setData({
                "geoConfig.text": "定位失败，请重试"
              });
              var a = t.cityId, d = t.cityName, r = t.address, c = "", u = 0, g = t.oversea ? 2 : 1;
              n ? (e._myLocation = t, c = r, u = 45) : (o = "", s = ""), i.setData({
                curDest: {
                  destId: a,
                  destName: d
                },
                geoConfig: {
                  text: "全球民宿预订",
                  isWxAuth: !0,
                  isSystemAuth: !0
                }
              }), e.setDest(a, d, c, u, o, s, g), e.removeSearchMessage();
            }).catch(function (t) {
              console.log(t), i.setData({
                "geoConfig.text": "定位失败，请重试"
              });
            }).finally(function () {
              e.loadHotRecommend(), i.setData({
                isPositionLoading: !1
              });
            });
          },
          fail: function (t) {
            i.setData({
              isPositionLoading: !1
            }), e.loadHotRecommend(), e.setGeoFail(t.errMsg);
          },
          complete: function () {
            e._isClickedMyLocation = !1;
          }
        });
      }));
  },
  setGeoFail: function (t) {
    var e = this, a = {}, i = function (t, i, n) {
      a.text = t, a.isWxAuth = i, a.isSystemAuth = n, e.setData({
        geoConfig: a
      });
    };
    /auth/.test(t) ? i("定位权限未开启，点击授权", !1, !0) : /system/.test(t) ? i("定位权限未开启", !1, !1) : i("定位失败，请重试", !0, !0);
  },
  onNetworkType: function () {
    var t = this;
    wx.onNetworkStatusChange(function (e) {
      var a = "none" === e.networkType ? "网络无法连接" : "网络无法连接" == t.data.geoConfig.text ? "全球民宿预订" : "";
      a && t.setData({
        "geoConfig.text": a
      });
    });
  },
  getNetworkType: function () {
    var t = this;
    return new Promise(function (e, a) {
      wx.getNetworkType({
        success: function (i) {
          "none" === i.networkType ? (t.setData({
            "geoConfig.text": "网络无法连接",
            isPositionLoading: !1
          }), a()) : e(i.networkType);
        }
      });
    });
  },
  initHouseTags: function () {
    var t = getApp().globalHouseTags, a = wx.getStorageSync(t);
    a ? n = a : e.default.getCommonConfig(function (e, a, i) {
      n = a.data.unitTagBadges, wx.setStorageSync(t, a.data.unitTagBadges);
    });
  },
  initSearch: function () {
    var t = new Date(), e = new Date(new Date().getTime() + 864e5), a = getApp(), i = a.curCity, n = a.lastSelectDate;
    n.begin && (t = n.begin < t ? t : n.begin, e = n.end), this.setDest(i.id, i.name),
      this.setDate(t, e);
  },
  setDest: function (t, e, a, i, n, o, s) {
    var a = a || null, i = i || 0, n = n || "", o = o || "";
    this.setData({
      dest: {
        destId: t,
        destName: e,
        name: a,
        cType: i,
        latitude: n,
        longitude: o,
        keywordSuggestType: s
      }
    }), t != getApp().curCity.id && (getApp().curCity = {
      id: t,
      name: e
    });
  },
  setDate: function (t, e) {
    var a, n;
    a = i.dateIsEqual(t, new Date()) ? "今天" : i.dateIsEqual(t, new Date().addDays(1)) ? "明天" : i.dateIsEqual(t, new Date().addDays(2)) ? "后天" : i.getWeekCN(t),
      n = i.dateIsEqual(e, new Date()) ? "今天" : i.dateIsEqual(e, new Date().addDays(1)) ? "明天" : i.dateIsEqual(e, new Date().addDays(2)) ? "后天" : i.getWeekCN(e),
      this.setData({
        dates: {
          sDate: t,
          eDate: e,
          beginDate: i.dateFormat(t, "yyyy-MM-dd"),
          endDate: i.dateFormat(e, "yyyy-MM-dd"),
          start: i.dateFormat(t, "MM月dd日"),
          end: i.dateFormat(e, "MM月dd日"),
          interval: parseInt((e - t) / 864e5),
          sWeek: a,
          eWeek: n
        }
      });
  },
  select: function (t) {
    if (getApp().validTab(t, 800)) {
      var e = this.data.dates, a = e.beginDate, i = e.endDate, n = t.currentTarget.dataset, o = n.url, s = n.type, d = n.title, r = this.data.dest.id;
      wx.navigateTo({
        url: o + "?selectType=" + s + "&beginDate=" + a + "&endDate=" + i + "&title=" + d + "&id=" + r
      });
    }
  },
  dateSelectCallback: function (t, e) {
    this.setDate(t, e), this.updateHotRecommendHousePrice({
      sDate: t,
      eDate: e
    });
  },
  destinationSelectCallback: function (t) {
    console.log(t), t.destName = t.destinationName ? t.destinationName : t.destName,
      t.destId = t.destinationId ? t.destinationId : t.destId, t.cType = t.enumSuggestionConditionType ? t.enumSuggestionConditionType : t.cType,
      t.name = "city" === t.myLocationType ? "" : t.name, t.cType === this._myLocationType && (this._myLocation = {
        Address: t.name,
        CityName: t.destName
      }), this.setData({
        dest: t
      }), this.loadHotRecommend(), this.saveSearchMessage();
  },
  unitsCallback: function (t, e) {
    this.setDate(t, e);
  },
  btnSubmit: function (t) {
    if (getApp().validTab(t, 800)) {
      var e = this.data, a = e.dest, n = e.dates, o = a.destId, s = void 0 === o ? 48 : o, d = a.destName, r = void 0 === d ? "北京" : d, c = a.cType, u = void 0 === c ? 1 : c, g = a.latitude, m = a.longitude, l = a.suggestionConditionValue, h = a.value, y = a.conditionTypeName, f = a.name, p = a.keywordSuggestType, D = n.beginDate, v = n.endDate;
      h = l || h || "48", u === this._myLocationType && (f = this._myLocation.address || f,
        r = this._myLocation.cityName || r), wx.navigateTo({
          url: i.createUrlParamsString("/pages/units/units", {
            destId: s,
            destName: r,
            value: h,
            cType: u,
            beginDate: D,
            endDate: v,
            name: f,
            cTypeName: y,
            latitude: g,
            longitude: m,
            keywordSuggestType: p,
            isSearch: 1
          })
        });
    }
  },
  goSearch: function (t) {
    if (getApp().validTab(t, 800)) {
      var e = this.data.dates, a = e.beginDate, n = e.endDate, o = t.currentTarget.dataset, s = o.url, d = o.searchtype, r = this.data.dest, c = r.destId, u = r.destName, g = r.name, m = r.keywordSuggestType, l = this.data.curDest, h = l.curDestId, y = l.curDestName;
      wx.navigateTo({
        url: i.createUrlParamsString(s, {
          searchType: d,
          cityId: c,
          name: g,
          cityName: u,
          curDestId: h,
          curDestName: y,
          beginDate: a,
          endDate: n,
          isHome: 1,
          keywordSuggestType: m
        })
      });
    }
  },
  setActivePopup: function (t) {
    var e = "isOrderPopup:" + t.substring(15);
    wx.setStorage({
      key: e,
      data: 1
    });
  },
  clearSearchCondition: function () {
    this.setData({
      "dest.name": "",
      "dest.cType": "",
      "dest.latitude": "",
      "dest.longitude": "",
      "dest.suggestionConditionValue": "",
      "dest.value": "",
      "dest.keywordSuggestType": ""
    }), this.saveSearchMessage();
  },
  saveSearchMessage: function () {
    var t = this.data, e = t.dest, a = t.curDest, i = e.cType == this._myLocationType;
    if (i || e.destId == a.destId) return this.removeSearchMessage();
    i || wx.setStorage({
      key: "homeCityLocation",
      data: e
    });
  },
  removeSearchMessage: function () {
    wx.removeStorage({
      key: "homeCityLocation"
    });
  },
  toWebviewPage: function (t) {
    var e = t.currentTarget.dataset.url;
    e && openWebview(e);
  },
  houseJump: function (t) {
    var e = t.currentTarget.dataset.unitid;
    if (e) {
      var a = this.data.dates, n = a.beginDate, o = a.endDate;
      wx.navigateTo({
        url: i.createUrlParamsString("/pages/unitDetails_v2/unitDetails", {
          beginDate: n,
          endDate: o,
          unitId: e
        })
      });
    }
  },
  toUnitSearchPage: function (t) {
    var e = t.currentTarget.dataset, a = e.url, n = e.cityname;

    if ((a = i.parseQuery(a) || {}).url) {
      var o = this.data.dates, s = o.beginDate, d = o.endDate;
      wx.navigateTo({
        url: i.createUrlParamsString("/pages/units/units", {
          beginDate: s,
          endDate: d,
          condintionUrl: a.url,
          destName: n
        })
      });
    }
  },
  clearInput: function () {
    var t = this.data.dest;
    t.name = "", t.cType = "", t.latitude = "", t.longitude = "", this.setData({
      dest: t
    });
  }
});