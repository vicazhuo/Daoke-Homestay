function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

function e(t, e, i) {
  return e in t ? Object.defineProperty(t, e, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = i, t;
}

function i(t) {
  if (Array.isArray(t)) {
    for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
    return i;
  }
  return Array.from(t);
}

function a(t) {
  return (t = t.split("-")).splice(1, 2).join(".");
}

function s(t) {
  return t.filter(function (t) {
    return t;
  });
}

var o, r = t(require("../../apiFetch/collectionApi")),
  n = t(require("../../apiFetch/searchApi.js")),
  d = t(require("../../common/js/utils")),
  c = getApp(), u = d.default.event, l = function () { };

Page((o = {
  data: {
    activeBar: 0,
    showBeginDate: "",
    showEndDate: "",
    beginDate: "",
    endDate: "",
    favoriteHouseList: [],
    recordList: [],
    isFavoriteEnd: !1,
    isFavoriteLoading: !0,
    isRecordEnd: !1,
    isRecordLoading: !1,
    cityNameText: "全部城市",
    dateText: "入离日期",
    isPageError: !1,
    isRecordError: !1,
    isLogin: !0,
    activeListCount: 0,
    pullDownList: [],
    isFixed: !1
  },
  activeCityId: "",
  favoritePageIndex: 0,
  recordListIndex: 0,
  activeListCount: 0,
  isLoginOut: !1,
  favoriteIdList: [],
  listScrollTops: [],
  isSetEventListeners: [],
  awaitHouseRecordList: [],
  awaitHouseFavoriteList: [],
  favoriteLifeScrollTop: 0,
  userId: 0,
  loginOutCallback: null,
  cityList: [],
  init: function (t) {
    !this.data.beginDate && this.getDate(), this.getFavoriteIds(null, t);
  },
  onShow: function () {
    this.isLoginOut, this.isSetEventListener;
    var t = this.data, e = t.activeBar, i = t.favoriteHouseList, a = t.recordList, o = t.isLogin;
    if (wx.setStorageSync("messageTabBackRoute", 'pages/index/index'), c.userIsLogin()) {
      o || this.setData({
        isLogin: !0,
        isPageError: !1,
        isRecordError: !1
      }), this.loginOutListen();
      var r = c.globalUserInfo.tjUserInfo.userId;
      if (r !== this.userId && this.setData({
        favoriteHouseList: [],
        recordList: []
      }), this.userId = r, this.isNoUpdate) return void (this.isNoUpdate = !1);
      0 == e ? s(i).length ? this.favoriteListUpdate() : this.init() : a.length ? this.recordListUpdate() : this.getHouseRecord("start");
    } else this.userId = "", this.resetStatus();
  },
  onUnload: function () {
    u.remove("addHouseRecord"), u.remove("favoriteStatusUpdate"), this.loginOutCallback && u.clear(this.loginOutCallback, "loginOut");
  },
  onLoad: function (t) {
    console.log(t)
  },
  getFavoriteIds: function (t, e) {
    var i = this;
    this.setData({
      isFavoriteLoading: !0,
      isFavoriteEnd: !1,
      isLogin: !0
    }), t ? this.getFavoriteSuccess(t) : r.default.getFavorite().then(function (t) {
      if (i.allFavoriteIds = t.houseIdList || [], c.globalData.setFavoriteList(i.allFavoriteIds),
        !i.allFavoriteIds.length) return i.stopPullDownRefresh(), void i.setData({
          isFavoriteLoading: !1
        });
      if (i.isSetEventListeners[0] || i.openEventListener(0), !i.allFavoriteIds.length && s(i.data.favoriteHouseList).length) return i.setData({
        favoriteHouseList: [],
        isFavoriteEnd: !1,
        isFavoriteLoading: !1
      });
      var a = "全部城市" !== i.data.cityNameText;
      i.getCityHouseIdList().then(function (t) {
        i.allFavoriteIds = a ? t : i.filterList(i.allFavoriteIds, t), i.getFavoriteSuccess(i.allFavoriteIds, e);
      });
    }).catch(function (t) {
      i.requestErrorHandle(t), i.stopPullDownRefresh();
    });
  },
  filterList: function (t, e) {
    return t.filter(function (t) {
      return -1 != e.indexOf(t);
    });
  },
  getCityHouseIdList: function (t) {
    var e = this, a = t || this.allFavoriteIds, s = this.data.cityNameText;
    return r.default.searchHouseCity(a).then(function (t) {
      var a = t || [];
      e.cityList = a;
      var o = void 0, r = [];
      if ("全部城市" === s) a.forEach(function (t) {
        r.push.apply(r, i(t.houseIdList));
      }); else if (!(o = a.find(function (t) {
        return t.cityName === s;
      }))) return;
      return Promise.resolve(o ? o.houseIdList : r);
    }).catch(function (t) {
      return e.requestErrorHandle(t), e.stopPullDownRefresh(), Promise.reject(t);
    });
  },
  getFavoriteSuccess: function (t, e) {
    this.favoriteIdList = t, this.activeListCount = t.length, this.setData({
      activeListCount: this.activeListCount,
      isPageError: !1
    }), this.loadFavoriteList(e ? "" : "start", !1, e);
  },
  getFavoriteHouseById: function (t, e) {
    var i = this, a = this.data, s = a.beginDate, o = a.endDate;
    return e && this.setData({
      isFavoriteLoading: !0
    }), r.default.searchHouseByHouseIdList({
      houseIdList: t,
      checkInDate: s,
      checkOutDate: o
    }, this.isPullDownRefresh).then(function (t) {
      return t = t || {
        items: []
      }, Promise.resolve(t.items);
    }).catch(function (t) {
      return i.setData({
        isPageError: !0
      }), Promise.reject(t);
    });
  },
  getDate: function (t, e) {
    var i = this, s = c.globalData.getGlobalSearchData(), o = t || s.beginDate || d.default.dateFormat(new Date(), "yyyy-MM-dd"), r = e || s.endDate || d.default.dateFormat(new Date().addDays(1), "yyyy-MM-dd");
    t ? this.setData({
      showBeginDate: a(o),
      showEndDate: a(r)
    }) : this.data.beginDate || (this.recordBeginDate = o, this.recordEndDate = r),
      this.setData({
        beginDate: o,
        endDate: r
      }), this.isUpdateGlobalDate || (this.isUpdateGlobalDate = !0, l = function (t) {
        var e = t.beginDate, a = t.endDate;
        e && a && (i.data.showBeginDate || i.setData({
          beginDate: e,
          endDate: a
        }), i.recordBeginDate = e, i.recordEndDate = a);
      }, u.on("updateGlobalDate", l));
  }
}, e(o, "onUnload", function () {
  u.clear(l, "updateGlobalDate");
}), e(o, "onPullDownRefresh", function () {
  this.isPullDownRefresh = !0, 0 == this.data.activeBar ? this.init() : this.getHouseRecord("start");
}), e(o, "onReachBottom", function () {
  0 == this.data.activeBar ? this.favoriteScrolltolower() : this.recordScrolltolower();
}), e(o, "loadFavoriteList", function (t) {
  var e = this, a = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], o = arguments[2], r = this.data, n = r.favoriteHouseList;
  r.isFavoriteEnd;
  t && this.favoritePageIndex && (this.favoritePageIndex = 0, this.setData({
    isFavoriteEnd: !1
  }), this.isPullDownRefresh || (this.listScrollTops[0] = 0, this.setData({
    favoriteScrollTop: this.data.favoriteScrollTop ? 0 : 1
  })));
  var d = o ? 0 : this.favoritePageIndex, c = this.favoriteIdList.slice(10 * d, 10 * d + 10);
  if (!c.length) return this.setData({
    isFavoriteEnd: !0,
    isFavoriteLoading: !1
  });
  this.getFavoriteHouseById(c, a).then(function (a) {
    if (o) {
      var r;
      (r = n).splice.apply(r, [d, 10].concat(i(a)));
    } else t && s(n).length && e.setData({
      favoriteHouseList: []
    }), n = t ? a : n.concat(a), e.favoritePageIndex++;
    e.setData({
      favoriteHouseList: n,
      isFavoriteEnd: s(n).length == e.activeListCount,
      isPageError: !1
    });
  }).catch(function (t) {
    e.requestErrorHandle(t);
  }).finally(function () {
    e.setData({
      isFavoriteLoading: !1
    }), e.stopPullDownRefresh();
  });
}), e(o, "stopPullDownRefresh", function () {
  var t = this.data.activeBar;
  this.isPullDownRefresh && (this.isPullDownRefresh = !1, this.setData(e({}, "pullDownList[" + t + "]", !this.data.pullDownList[t])));
}), e(o, "getHouseRecord", function (t, e) {
  var i = this, a = this.data.recordList;
  this.setData({
    isRecordLoading: !0
  }), t && (this.recordListIndex = 0, this.setData({
    isRecordEnd: !1
  })), r.default.getHouseRecord({
    pageSize: 10,
    pageIndex: this.recordListIndex
  }, this.isPullDownRefresh).then(function (e) {
    var s = e.items || [], o = s.length < 10 || !s.length;
    if (!s.length) {
      var r = {
        isRecordEnd: !0,
        isRecordLoading: !1
      };
      return t && (r.recordList = []), i.stopPullDownRefresh(), i.setData(r);
    }
    i.isSetEventListeners[1] || i.openEventListener(1), !i.recordListIndex && a.length && i.setData({
      recordList: []
    }), i.updateRecordHousePrice(s).then(function (e) {
      a = t ? e : a.concat(e), i.recordListIndex++ , i.setData({
        recordList: a,
        isRecordEnd: o,
        isLogin: !0,
        isRecordError: !1
      });
    }).catch(function (t) {
      i.requestErrorHandle(t);
    }).finally(function () {
      i.setData({
        isRecordLoading: !1
      }), i.stopPullDownRefresh();
    });
  }).catch(function (t) {
    i.requestErrorHandle(t), i.stopPullDownRefresh();
  });
}), e(o, "updateRecordHousePrice", function (t, e) {
  var i = this.recordBeginDate, a = this.recordEndDate, s = void 0, o = t.map(function (t) {
    return {
      unitId: e ? t : t.unitId
    };
  });
  return n.default.getHousePrice(i, a, o).then(function (e) {
    var i = e.items;
    return t.forEach(function (t) {
      (s = i.find(function (e) {
        return e.houseId === t.unitId;
      })) && (t.finalPrice = s.finalPrice, t.productPrice = s.productPrice, t.priceTags = s.priceTags);
    }), Promise.resolve(t);
  }).catch(function (t) {
    return Promise.reject(t);
  });
}), e(o, "onShareAppMessage", function () { }), e(o, "selectTabBar", function (t) {
  var e = t.currentTarget.dataset.index;
  this.selectList(e);
}), e(o, "swiperChange", function (t) {
  var e = t.detail.current;
  this.selectList(e);
}), e(o, "selectList", function (t) {
  var e = this, i = this.data, a = i.favoriteHouseList, o = i.recordList, r = i.isLogin, n = i.isFavoriteLoading, d = i.isRecordLoading;
  i.activeBar != t && (this.setData({
    activeBar: t
  }), r && (1 != t || d || (o.length ? this.recordListUpdate() : this.getHouseRecord("start")),
    setTimeout(function () {
      0 != t || n || (s(a).length ? e.favoriteListUpdate() : e.init());
    }, 100)));
}), e(o, "selectCity", function () {
  var t = this.data.cityNameText;
  this.isNoUpdate = !0, wx.navigateTo({
    url: d.default.createUrlParamsString("/pages/collection/selectCity/selectCity", {
      name: "全部城市" === t ? "" : t
    })
  });
}), e(o, "selectCityCallBack", function (t) {
  var e = this.data.cityNameText, i = t.cityName ? t.cityName : "全部城市";
  e !== i && (this.setData({
    cityNameText: i,
    favoriteHouseList: []
  }), this.getFavoriteIds(t.houseIdList));
}), e(o, "removeFavorite", function (t) {
  var e = t.detail, i = this.favoriteIdList, a = this.data, s = a.favoriteHouseList, o = a.activeListCount, r = a.cityNameText, n = s.findIndex(function (t) {
    return t && t.unitId == e;
  });
  -1 !== n && (s[n] = "", o-- , this.setData({
    favoriteHouseList: s,
    activeListCount: o
  }), this.activeListCount = o), o || "全部城市" === r ? -1 !== i.findIndex(function (t) {
    return t == e;
  }) && (i.splice(n, 1), this.allFavoriteIds = i) : (this.setData({
    cityNameText: "全部城市"
  }), this.init());
}), e(o, "favoriteScrolltolower", function () {
  var t = this.data, e = t.isFavoriteLoading, i = (t.isRecordLoading, t.favoriteHouseList,
    t.activeBar, t.isFavoriteEnd);
  e || i || this.loadFavoriteList();
}), e(o, "recordScrolltolower", function () {
  var t = this.data, e = t.isRecordEnd, i = t.isRecordLoading;
  t.recordList, t.activeBar;
  i || e || this.getHouseRecord();
}), e(o, "recordListUpdate", function () {
  var t = this.awaitHouseRecordList, e = this.data, i = e.isRecordError, a = e.isRecordLoading;
  e.recordList;
  t.length && (this.awaitHouseRecordList = []), !t.length || i || a || this.getHouseRecord("start");
}), e(o, "favoriteListUpdate", function () {
  var t = this.awaitHouseFavoriteList, e = this.data, i = e.isPageError, a = e.isFavoriteLoading, s = (e.cityNameText,
    t.length);
  s && (this.awaitHouseFavoriteList = []), !s || i || a || this.init();
}), e(o, "favoriteUpdateLoadList", function (t) {
  var e = this, a = this.data.favoriteHouseList;
  this.getFavoriteHouseById(t).then(function (t) {
    t && t.length && (e.activeListCount += t.length, e.setData({
      favoriteHouseList: [],
      isFavoriteLoading: !0
    }), a.unshift.apply(a, i(t)), e.setData({
      isFavoriteLoading: !1,
      favoriteHouseList: a,
      activeListCount: e.activeListCount
    }));
  }).catch(function (t) {
    console.log("farovite await error:", t);
  });
}), e(o, "errorBtnHandle", function () {
  var t = this.data, e = t.isLogin, i = t.activeBar, a = t.isPageError, s = t.isRecordError;
  t.favoriteHouseList;
  e ? 0 == i && a ? this.init() : 1 == i && s ? this.getHouseRecord("start") : wx.switchTab({
    url: "/pages/index/index"
  }) : (this.isLoginOut = !0, wx.navigateTo({
    url: "/pages/user/login/login"
  }));
}), e(o, "toDatePage", function () {
  this.data.houseInfo;
  var t = this.data, e = t.beginDate, i = t.endDate, a = d.default.createUrlParamsString("/pages/common/dateSelect/dateSelect", {
    beginDate: e,
    endDate: i
  });
  this.isNoUpdate = !0, wx.navigateTo({
    url: a
  });
}), e(o, "dateSelectCallback", function (t, e) {
  var i = this.data, a = i.beginDate, s = i.endDate, o = d.default.dateFormat(t, "yyyy-MM-dd"), r = d.default.dateFormat(e, "yyyy-MM-dd");
  this.getDate(o, r), a === o && s === r || (this.setData({
    isFavoriteLoading: !0,
    favoriteHouseList: []
  }), this.loadFavoriteList("start", !1));
}), e(o, "openEventListener", function (t) {
  var e = this;
  this.isSetEventListeners[t] = !0;
  this.awaitHouseRecordList, this.awaitHouseFavoriteList, this.allFavoriteIds;
  var i = this.data;
  i.isLogin, i.recordList;
  t ? u.on("addHouseRecord", function (t) {
    e.data.isLogin && t && -1 == e.data.recordList.findIndex(function (e) {
      return e.unitId == t;
    }) && e.awaitHouseRecordList.unshift(t);
  }) : u.on("favoriteStatusUpdate", function (t) {
    var i = t.unitid, a = t.isFavorite;
    if (e.data.isLogin && i) {
      var s = e.awaitHouseFavoriteList.indexOf(i);
      -1 == e.allFavoriteIds.indexOf(i) && a && -1 == s && e.awaitHouseFavoriteList.unshift(i),
        a || -1 != s && e.awaitHouseFavoriteList.splice(s, 1);
    }
  });
}), e(o, "requestErrorHandle", function (t) {
  console.log("collcetion error:", t);
  var e = this.data.activeBar, i = 55004 === t.errorNo, a = {
    isLogin: !i
  };
  i && c.clearTjUserInfo(), a[0 == e ? "isPageError" : "isRecordError"] = !0, a[0 == e ? "isFavoriteLoading" : "isRecordLoading"] = !1,
    a[0 == e ? "favoriteHouseList" : "recordList"] = [], this.setData(a);
}), e(o, "getFavoriteScollTop", function (t) {
  var e = t.detail, i = this.data, a = i.isPageError, o = i.favoriteHouseList, r = i.isFavoriteLoading, n = i.isFixed;
  if (!i.isLogin || e <= 0 || a || s(o).length < 2 || r) n && this.setFixed(!1); else {
    var d = this.favoriteLifeScrollTop - e;
    d < -6 ? n || this.setFixed(!0) : d > 10 && n && this.setFixed(!1), this.favoriteLifeScrollTop = e;
  }
}), e(o, "setFixed", function (t) {
  this.setData({
    isFixed: t
  });
}), e(o, "loginOutListen", function () {
  var t = this;
  this.loginOutCallback || (this.loginOutCallback = function () {
    t.resetStatus();
  }, u.on("loginOut", this.loginOutCallback));
}), e(o, "resetStatus", function () {
  this.data.isLogin && this.setData({
    favoriteHouseList: [],
    recordList: [],
    isLogin: !1,
    isPageError: !0,
    isRecordError: !0,
    isFavoriteEnd: !1,
    isRecordEnd: !1,
    isFavoriteLoading: !1,
    isRecordLoading: !1
  });
}), o));