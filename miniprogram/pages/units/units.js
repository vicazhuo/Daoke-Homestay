function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}
function e(t) {
  if (Array.isArray(t)) {
    for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
    return i;
  }
  return Array.from(t);
}

function i(t) {
  return s({
    expressBooking: !1,
    font: null,
    gType: 0,
    hotRecommend: !1,
    isLandmark: !1,
    isNew: !1,
    isSelected: !1,
    label: null,
    labelDesc: null,
    percentageUser: null,
    pingYin: null,
    sentValue: null,
    type: 0,
    value: ""
  }, t);
}

var s = Object.assign || function (t) {
  for (var e = 1; e < arguments.length; e++) {
    var i = arguments[e];
    for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
  }
  return t;
}, n = t(require("../../apiFetch/searchApi")),
  a = t(require("../../common/js/utils.js")),
  couponApi = require("../../apiFetch/couponApi.js");

Page({
  data: {
    houseList: [],
    houseListIsLoading: !0,
    houseListIsEnd: !1,
    houseListPageSize: 20,
    isPopupShow: false,
    conponList: false,
    optionsParams: {
      searchText: "",
      locationText: "",
      sortText: "",
      moreSelectText: "",
      isOverseas: !1,
      cityLatitude: "",
      cityLongitude: ""
    },
    mortSelectCondintionList: [],
    noHouseFilterTypes: [],
    hotTags: [],
    isFixed: !1,
    isNoHouseList: !1,
    condintionUrl: "",
    allConditionList: [],
    PWA_STATIC_TUJIA_HOST: getApp().globalStaticDaoke
  },
  conditionsTypeList: [],
  headerHeight: 0,
  houseListPageIndex: 0,
  moreSelectCount: 0,
  destId: 48,
  isBackUpdate: !1,
  isUpdateHouseList: !1,
  isHouseLoadError: !1,
  _isFromSearchWidget: !1,
  houseListStartY: 0,
  isFirstLoad: !0,
  setNavTitTimer: null,
  bannerManage:null,
  onLoad: function (t) {
    var e = this;
    1035 == getApp().globalSceneCode && "near" === t.fromType ? a.default.getGeo().then(function (t) {
      t.isDistance = !0, e.initData(t);
    }).catch(function () {
      return e.initData(t);
    }) : this.initData(t);

    //广告配置
    getApp().getBannerManage((res)=>{
       e.setData({
         bannerManage: res
       })

    })
  },
  onShow: function () {
    this.isBackUpdate && (this.isBackUpdate = !1, this.backUpdateCallback()), this.isUpdateHouseList && (this.isUpdateHouseList = !1,
      this.getHouseList(0));
  },
  onUnload: function () {
    this.setNavTitTimer && (clearTimeout(this.setNavTitTimer), this.setNavTitTimer = null);
    var t = this.data.optionsParams, e = t.searchText, i = t.locationText, s = t.date;
    this.initSearchAndLocationText !== e + i + s + this.destId && this.updateIndexPageLocation();
  },
  onPageScroll: function (t) {
    var e = t.scrollTop, i = this.data, s = i.isHouseLoadError, n = i.houseList, a = i.houseListIsLoading;
    if (!(!this.headerHeight || e < 0 || s || n.length < 2 || a)) {
      var o = this.scrollTop - e;
      o < -10 ? this.data.isFixed || this.setFixed(!0) : (o > 10 || 0 == o) && this.data.isFixed && this.setFixed(!1),
        this.scrollTop = e;
    }
  },
  onReachBottom: function () {
    this.data.houseListIsLoading || this.getHouseList();
  },
  onShareAppMessage: function () {
    var t = encodeURIComponent("/pages/units/units"), e = (this.destId, this.conditionsTypeList), i = this.data.optionsParams, s = {
      optionsParams: i,
      conditions: e
    }, n = encodeURIComponent(JSON.stringify(s)), a = getApp().getGlobalCode(), ap = getApp();
    console.log(a)
    return {
      title: i.destName + "公寓民宿精选",
      desc: "于偌大的世界之中，屹立在城市的各个角落，宿梦家，等待您归来的理想之家。",
      path: "/pages/index/index?nextPath=" + t + "&nextPars=" + n + "&code=" + a + '&pid=' + ap.globalUserInfo.tjUserInfo.userId
    };
  },
  /**
   * 广告加载失败
   **/ 
  binderror:function(e){
   
    var data = this.data.bannerManage;
    if (data.unitList && data.unitList.adShow){
      data.unitList.adShow = false;
      this.setData({ bannerManage: data})
    }
  },
  initShareFilter: function (t) {
    var e = JSON.parse(decodeURIComponent(t)), i = e.optionsParams, s = e.conditions, n = void 0 === s ? [] : s, a = i.destId, o = i.destName;
    this.conditionsTypeList = n, this.destId = a, this.getHouseList(0), this.setData({
      optionsParams: i
    }), this.resetSearchStatus(), wx.setNavigationBarTitle({
      title: o
    });
  },
  getHouseList: function (t) {

    var e = this, i = this.houseListPageIndex, s = this.conditionsTypeList, a = this._isFromSearchWidget, o = this.data, r = (o.hotTags, o.isHouseLoadError), u = o.condintionUrl;
    this.setData({
      houseListIsLoading: !0
    });
    var d = 0 === t;
    var p = t;
    t = d ? t : i;
    var param = {
      conditions: s,
      noStop: !!a,
      onlyReturnTotalCount: !1,
      pageIndex: t,
      pageSize: 20,
      returnFilterConditions: !0,
      returnGeoConditions: !0,
      returnNavigations: !0,
      url: u
    };
    n.default.getDaokeHouseList(param, d).then(function (i) {
      var n = {};
 
      i.couponList&&e.setData({ conponList: i.couponList})
      if (d && (e.setData({
        houseList: []
      }), e.houseListPageIndex = t, n.isFixed = !1), i) {
        var a = i.items || [], o = a.length, l = void 0;
        d && i.recommendNavigations && i.totalCount && o && i.recommendNavigations.forEach(function (t) {
          5 == t.index && i.totalCount <= 4 || 9 == t.index && i.totalCount <= 8 || (t.showTip = !0,
            a.splice(t.index - 1, 0, t));
        }), i.allConditions && (n.conditionsGroups = i.allConditions.reverse(), l = i.allConditions.find(function (t) {
          return 1 == t.gType;
        }), e.setData({
          oldFilterConditionGroup: e.cloneObj(l)
        })),
          u && (n.condintionUrl = ""),
          n.houseList = d ? a : e.data.houseList.concat(a),
          n.hotTags = i.hotFilters || [],
          r && (n.isHouseLoadError = !1),
          n["optionsParams.total"] = i.totalCount || 0,
          n.isNoHouseList = d && !o,
          n.isNoHouseList && e.getNoHouseFilterTypes(),
          n.houseListIsEnd = o < e.data.houseListPageSize,
          e.setData(n), u ? e.condintionUrlAfterUpdate(i.conditions) : e.setHotBagStatus(s),
          o && e.houseListPageIndex++ ,
          e.isFirstLoad = !1,
          e.updateCityCoordinate(i.conditions);
          
      }
    }).catch(function (t) {
      console.log(t), e.setData({
        isHouseLoadError: !0,
        isFixed: !1
      });
    }).finally(function () {
      e.setData({
        houseListIsLoading: !1
      });
    });
  },
  dateSelectCallback: function (t, e) {
    t = a.default.dateFormat(t, "yyyy-MM-dd"), e = a.default.dateFormat(e, "yyyy-MM-dd"),
      this.updateDate(t, e), this.getHouseList(0);
  },
  updateCityCoordinate: function (t) {
    var e = this.data.optionsParams, i = e.cityLatitude, s = e.cityLongitude, n = t.find(function (t) {
      return 1 == t.type;
    }), o = n.latitude, r = n.longitude;
    if (o && r && (o != i || r != s)) {
      var u = a.default.bd_decrypt_go(o, r), d = u.latitude, l = u.longitude;
      this.setData({
        "optionsParams.cityLatitude": d,
        "optionsParams.cityLongitude": l
      });
    }
  },
  getNoHouseFilterTypes: function () {
    var t = this.conditionsTypeList.filter(function (t) {
      return 1 != t.type && 2 != t.type && 3 != t.type && 4 != t.type;
    });
    this.setData({
      noHouseFilterTypes: t
    });
  },
  openCouponPopup: function () {
    this.setData({ isPopupShow: true });

  },
  /**
   * 用户点击领取优惠劵
   */
  pickUp: function (e) {

    var id = e.currentTarget.dataset.index, g = e.currentTarget.dataset.isget;
    var s = 'unusedlist[' + id + '].isGet';
    if (g) {
      wx.showToast({
        title: '你已经领取过了',
        icon: 'none'
      });
      return false;
    }
    var param = {
      coupon_id: e.currentTarget.dataset.id
    }
    couponApi.getcoupon(param).then((res) => {

      if (res.errcode == 0) {
        wx.showToast({
          title: '领取成功',
        })
        this.setData({ [s]: true })

      } else {
        wx.showModal({
          title: '系统提示',
          content: res.errmsg,
        })

      }

    })

  },
  initData: function (t) {
    console.log(t);
    var e = t.nextPars;
    if (e) return this.initShareFilter(e);
    var s = t.destId || t.destinationId, n = t.destName || t.destinationName, o = t.cType || t.conditionType;
    this._isFromSearchWidget = t.noStop || !1, n = n && "undefined" !== n ? n : "北京",
      s = s && "undefined" !== s ? s : 48;
    var r = new Date(), u = new Date(r.getTime() + 864e5);
    if (t.beginDate && t.endDate) {
      var d = new Date(t.beginDate), l = new Date(t.endDate);
      d && (u = (r = r > d ? r : d) > l ? u : l);
    }
    if (this.conditionsTypeList.push(i({
      gType: 0,
      type: 1,
      value: s,
      label: n
    })), t.name && t.value && o && 1 != t.cType) {
      if (45 == t.cType && t.longitude && t.latitude) {
        var c = a.default.go_decrypt_bd(t.latitude, t.longitude);
        this.conditionsTypeList.push(i({
          gType: 0,
          label: t.name,
          type: 5,
          longitude: t.longitude,
          latitude: t.latitude,
          isItemType: "search",
          value: "14_" + c.longitude + "," + c.latitude
        }));
      } else this.conditionsTypeList.push(i({
        gType: 5 == o ? 2 : 10 == o ? null : 1,
        label: t.name,
        type: o,
        value: t.value,
        isItemType: t.isSearch ? "search" : null
      }));
      5 != o && 45 != o || this.setData({
        "optionsParams.locationText": 45 == o ? "" : t.name
      }), this.setData({
        "optionsParams.searchText": t.name || ""
      });
    }
    t.condintionUrl && this.setData({
      condintionUrl: decodeURIComponent(t.condintionUrl)
    }), this.setData({
      "optionsParams.sortText": t.isDistance ? "距离优先" : "推荐排序"
    }), t.isDistance && this.conditionsTypeList.push(i({
      label: "距离优先",
      type: 4,
      gType: 4,
      value: 4
    })), this.updateCity(n, s, t.keywordSuggestType), r = a.default.dateFormat(r, "yyyy-MM-dd"),
      u = a.default.dateFormat(u, "yyyy-MM-dd"), this.updateDate(r, u), this.resetSearchStatus(),
      this.getHouseList(0), this.saveInitSearchInfo();
  },
  backUpdateCallback: function () {
    var t = this.conditionsTypeList, e = (t.findIndex(function (t) {
      return 8 == t.type;
    }), t.find(function (t) {
      return 1 == t.type;
    }));
    this.destId != e.value && this.updateCity(e.label, e.value), this.setMoreSelectCount(this.getFilterCondintion().length),
      this.setHotBagStatus(t), this.getHouseList(0);
  },
  saveInitSearchInfo: function () {
    var t = this.data.optionsParams, e = t.searchText, i = t.locationText, s = t.date;
    this.initSearchAndLocationText = e + i + s + this.destId;
  },
  updateCity: function (t, e, i) {
    var s = {
      "optionsParams.destId": e,
      "optionsParams.destName": t
    };
    this.destId = e, i && (s["optionsParams.keywordSuggestType"] = i, s["optionsParams.isOverseas"] = 2 == i),
      this.setData(s), this.setNavTitTimer = setTimeout(function () {
        wx.setNavigationBarTitle({
          title: t
        });
      }, 0);
  },
  updateDate: function (t, e) {
    var s = this.conditionsTypeList, n = s.find(function (t) {
      return 2 === t.type;
    }), a = s.find(function (t) {
      return 3 === t.type;
    });
    n && a ? (n.value = t, a.value = e) : s.push(i({
      gType: 0,
      value: t,
      type: 2,
      label: "入住日期"
    }), i({
      gType: 0,
      value: e,
      type: 3,
      label: "离店日期"
    })), this.setData({
      "optionsParams.beginDate": t,
      "optionsParams.endDate": e
    }), this.setDateCondition(t, e);
  },
  setDateCondition: function (t, e) {
    var i = (t = t.split("-"))[1] + "." + t[2], s = (e = e.split("-"))[1] + "." + e[2];
    this.setData({
      "optionsParams.date": i + "-" + s
    });
  },
  getHeaderHeight: function (t) {
    this.headerHeight = t.detail;
  },
  setFixed: function (t) {
    this.setData({
      isFixed: t
    });
  },
  destinationSelectCallback: function (t) {
    var s = this.conditionsTypeList;
    this.data.conditionsGroups;
    if (t.cType = t.enumSuggestionConditionType || t.cType, t.destId = t.destinationId || t.destId,
      t.destName = t.destinationName || t.destName, t.cTypeName = t.conditionTypeName || t.cTypeName,
      1 != t.cType && t.suggestionConditionValue || (t.cType = "1", t.value = "", t.name = ""),
      this.destId != t.destId) {
      var n = s.filter(function (t) {
        return 2 == t.type || 3 == t.type;
      });
      this.conditionsTypeList = [i({
        gType: 0,
        type: 1,
        value: t.destId,
        label: t.destName
      })].concat(e(n)), this.updateCity(t.destName, t.destId, t.keywordSuggestType),
        this.resetSearchStatus(0);
    }
    if (45 == t.cType && this.conditionsTypeList.push({
      type: 5,
      label: t.name,
      value: "14_" + t.latitude + "," + t.longitude
    }), t.cType && t.cType && 0 != t.cType && 45 != t.cType && t.suggestionConditionValue) {
      var a = i({
        gType: this.queryItemGtype(t.name, this.data.conditionsGroups),
        value: t.suggestionConditionValue,
        label: t.name,
        type: t.cType,
        isItemType: "search"
      });
      5 == a.type && t.latitude && t.longitude && (a.latitude = t.latitude, a.longitude = t.longitude);
      var o = this.conditionsTypeList.filter(function (t) {
        return 1 == t.type || 2 == t.type || 3 == t.type;
      });
      this.conditionsTypeList = o, this.conditionsTypeList.push(a);
      var r = {
        "optionsParams.searchText": a.label,
        "optionsParams.sortText": "推荐排序",
        "optionsParams.locationText": 5 == a.type ? a.label : ""
      };
      this.resetSearchStatus(), this.setData(r);
    }
    this.getHouseList(0);
  },
  resetSearchStatus: function (t) {
    this.setHotBagStatus(this.conditionsTypeList), this.setMoreSelectCount(0 === t ? 0 : this.conditionsTypeList.filter(function (t) {
      return 1 == t.gType;
    }).length);
  },
  updateCondintionItem: function (t, e, i, s) {
    var n = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], a = this.moreSelectCount;
    if (t ? (e.value = i.value, e.type = i.type, e.label = i.label) : (this.conditionsTypeList.push(i),
      s && 1 == s && (a++ , this.setHotBagStatus(this.conditionsTypeList), this.setMoreSelectCount(a))),
      n) {
      var o = {};
      o["optionsParams.searchText"] = "", o["optionsParams.locationText"] = 2 == s ? i.label : "",
        this.setData(o);
    }
  },
  moreSelectCallback: function (t, e) {
    this.conditionsTypeList;
    this.setMoreSelectCount(t), this.conditionsTypeList = e, this.setData({
      mortSelectCondintionList: []
    }), this.setHotBagStatus(e), this.getHouseList(0);
  },
  locationSelectCallback: function (t) {
    var e = this.conditionsTypeList, i = e.findIndex(function (t) {
      return 5 == t.type;
    });
    (t || -1 != i) && (t || -1 == i ? -1 != i ? e[i] = t : e.push(t) : e.splice(i, 1),
      this.setData({
        "optionsParams.locationText": t ? t.label : "",
        "optionsParams.searchText": ""
      }), this.getHouseList(0));
  },
  sortSelectCallback: function (t) {
    var e = this.conditionsTypeList, i = e.findIndex(function (t) {
      return 4 == t.gType;
    });
    -1 == i ? e.push(t) : e[i] = t, this.setData({
      "optionsParams.sortText": t ? t.label : "推荐排序"
    }), this.getHouseList(0);
  },
  setHotBagStatus: function (t) {
    var e = this.data.hotTags;
    e.forEach(function (e) {
      e.selected = !!t.find(function (t) {
        return t.value === e.value;
      });
    }), this.setData({
      hotTags: e
    });
  },
  headerCreateConditions: function (t) {
    var e = t.detail, i = this.conditionsTypeList, s = this.moreSelectCount, n = 1206 == e.value, a = i.findIndex(function (t) {
      return t.value === e.value;
    });
    -1 == a ? (!n && s++ , i.push(e)) : (s && !n && s-- , i.splice(a, 1)), !n && this.setMoreSelectCount(s),
      this.getHouseList(0);
  },
  setMoreSelectCount: function (t) {
    this.moreSelectCount = t, this.setData({
      "optionsParams.moreSelectText": t ? "筛选·" + t : "筛选"
    });
  },
  queryItemGtype: function (t, e) {
    var i = this, s = void 0;
    return e.findIndex(function (e) {
      if (e.label === t) return s = e.gType;
      if (e.subGroups && e.items) return s = e.subGroups.length ? i.queryItemGtype(t, e.subGroups) : e.items.length ? i.queryItemGtype(t, e.items) : "";
    }), s;
  },
  updateIndexPageLocation: function () {
    var t = getCurrentPages(), e = this.conditionsTypeList, i = this.data.optionsParams, s = this.prePage || t[t.length - 2];
    if (s) {
      var n = e.find(function (t) {
        return 1 == t.type;
      }), a = e.find(function (t) {
        return 5 == t.type;
      }), o = e.find(function (t) {
        return "search" == t.isItemType;
      }), r = {
        destName: n.label,
        destId: n.value,
        cType: a ? /14\_/.test(a.value) ? 45 : a.type : o ? o.type : "",
        name: a ? a.label : o ? o.label : "",
        value: a ? a.value : o ? o.value : "",
        longitude: a && a.longitude ? a.longitude : "",
        latitude: a && a.latitude ? a.latitude : "",
        keywordSuggestType: i.keywordSuggestType
      };
      s.unitsCallback && s.unitsCallback(this.dateFilter(i.beginDate), this.dateFilter(i.endDate)),
        s.destinationSelectCallback && s.destinationSelectCallback(r);
    }
  },
  dateFilter: function (t) {
    return new Date(t.replace(/-/g, "/"));
  },
  condintionUrlAfterUpdate: function (t) {
    if (t) {
      var e = [], i = [], s = this.data.oldFilterConditionGroup;
      if (t.filter(function (t) {
        return 1 == t.gType;
      }).length) {
        i = t.filter(function (t) {
          return 1 != t.gType;
        }), e = i;
        var n = void 0;
        s.subGroups.forEach(function (i, s) {
          i.subGroups.length ? i.subGroups.forEach(function (i) {
            i.items.forEach(function (i) {
              (n = t.find(function (t) {
                return t.value === i.value;
              })) && !e.find(function (t) {
                return t.value == n.value;
              }) && e.push(n);
            });
          }) : i.items.forEach(function (i) {
            (n = t.find(function (t) {
              return t.value === i.value;
            })) && !e.find(function (t) {
              return t.value == n.value;
            }) && e.push(n);
          });
        });
      } else e = t;
      console.log(e), this.conditionsTypeList = e;
      var a = t.find(function (t) {
        return 5 == t.type;
      }), o = t.find(function (t) {
        return 1 == t.type;
      });
      o.value != this.destId && this.updateCity(o.label, o.value), a && this.setData({
        "optionsParams.searchText": "",
        "optionsParams.locationText": a.label
      }), this.isFirstLoad && this.saveInitSearchInfo(), this.resetSearchStatus();
    }
  },
  recommendNavigationTap: function (t) {
    var e = t.currentTarget.dataset, i = e.url, s = e.type, n = e.name, o = e.gtype, r = void 0, u = {
      gType: o
    };
    this.searchHeaderComponent || (this.searchHeaderComponent = this.selectComponent("#searchHeader"));
    var d = this.searchHeaderComponent;
    if ("all" == s) d.locationSelected(); else {
      if (!(u = a.default.typeUrlToCondintion(i))) return;
      if (u.gType = o, u.label = n, !(r = i ? a.default.parseQuery(i) : null)) return;
      r.url = decodeURIComponent(r.url), this.setData({
        condintionUrl: r.url
      }), this.getHouseList(0);
    }
  },
  getFilterCondintion: function () {
    return this.conditionsTypeList.filter(function (t) {
      return 1 == t.gType || 1206 == t.value;
    });
  },
  clearSearchCondition: function (t) {
    var e = {
      "optionsParams.searchText": ""
    }, i = this.conditionsTypeList, s = i.findIndex(function (t) {
      return 5 == t.type;
    });
    -1 != s && i.splice(s, 1);
    var n = i.findIndex(function (t) {
      return "search" === t.isItemType;
    });
    -1 != n && i.splice(n, 1), e["optionsParams.locationText"] = "", this.resetSearchStatus(),
      this.setData(e), t && this.getHouseList(0);
  },
  clearFilterCondition: function () {
    var t = this.conditionsTypeList, e = this.getFilterCondintion();
    e.length && (e.forEach(function (e) {
      return t.splice(t.findIndex(function (t) {
        return t.value === e.value;
      }), 1);
    }), this.setMoreSelectCount(0), this.setHotBagStatus(t));
  },
  noListDelCondintion: function (t) {
    console.log("=====>", t)
    var e = t.currentTarget.dataset.item, i = this.conditionsTypeList, s = {};
    i.splice(i.findIndex(function (t) {
      return t.value == e.value;
    }), 1), "search" === e.isItemType && (s["optionsParams.searchText"] = ""), 5 == e.type && (s["optionsParams.locationText"] = ""),
      Object.keys(s).length && this.setData(s), this.getHouseList(0);
  },
  cloneObj: function (t) {
    return JSON.parse(JSON.stringify(t));
  }
});