function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

function e(t, e) {
  var i = {};
  for (var n in t) e.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
  return i;
}

function i(t) {
  if (Array.isArray(t)) {
    for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
    return i;
  }
  return Array.from(t);
}

function n(t) {
  return o({
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
    type: 2,
    value: ""
  }, t);
}

var o = Object.assign || function (t) {
  for (var e = 1; e < arguments.length; e++) {
    var i = arguments[e];
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
  }
  return t;
}, s = t(require("../../../apiFetch/searchApi")), a = t(require("../../../common/js/utils.js")), u = ["VTR-AL00"], app = getApp();

Page({
  data: {
    houseList: [],
    houseItemData: {
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
    },
    PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl,
    houseListIsLoading: !1,
    conditionsGroups: [],
    optionsParams: {},
    mortSelectCondintionList: [],
    hotTags: [],
    houseMarkerList: [],
    circles: [],
    myLocation: {},
    nowShowHouseIndex: 0,
    isMapTouch: !1,
    isShowHouseScrollView: !1,
    myLocationInfo: {},
    selectCityInfo: {},
    distanceList: [],
    coverViewDistanceIndex: 0,
    mapScale: 13,
    isSelectedDestination: !1,
    isDestination: !1,
    isShowMarkerIcon: !1,
    houseToastTexts: {
      mainText: "",
      subText: ""
    },
    isGeoAuth: !1,
    isShowMap: !1,
    isPhoneModelMask: !1
  },
  conditionsTypeList: [],
  moreSelectCount: 0,
  destId: 48,
  tjMap: null,
  nowMarkerActiveId: "",
  isUpdateHouseList: !1,
  houseSelectFlag: !1,
  includePointsFlag: !1,
  isFirstLoadMap: !0,
  isMapYellowScreen: !1,
  isDelayCloseHouseView: !1,
  onLoad: function (t) {
    var e = t.lat, i = t.lng;
    e && i && this.setData({
      myLocation: {
        longitude: i,
        latitude: e
      }
    }), this.checkMapYellowScreenPhoneModel();
  },
  onReady: function () {
    this.tjMap = wx.createMapContext("tjMap"), this.pageReload();
  },
  onShow: function () {
    this.isUpdateHouseList && (this.isUpdateHouseList = !1, this.getHouseList(0)), this.data.isPhoneModelMask && this.setData({
      isPhoneModelMask: !1
    });
  },
  onUnload: function () {
    this.prePage && (this.prePage.setData({
      optionsParams: this.data.optionsParams
    }), this.prePage.conditionsTypeList = this.conditionsTypeList, this.prePage.isBackUpdate = !0);
  },
  onShareAppMessage: function () {
    var t = encodeURIComponent("/pages/units/units"), e = (this.destId, this.conditionsTypeList), i = this.data.optionsParams, n = {
      optionsParams: i,
      conditions: e.filter(function (t) {
        return !(8 == t.type && 5e3 == t.value);
      })
    }, o = encodeURIComponent(JSON.stringify(n)), s = getApp().getGlobalCode();
    return {
      title: i.destName + "公寓民宿精选",
      desc: "厌倦了千篇一律的酒店？试试途家吧，客栈、民宿、公寓、最美房东，除了酒店，这里什么都有~",
      path: "/pages/index/index?nextPath=" + t + "&nextPars=" + o + "&code=" + s
    };
  },
  pageReload: function () {
    var t = this, e = getCurrentPages(), i = this.prePage = e[e.length - 2], n = i.data, o = n.conditionsGroups, s = n.hotTags, a = n.optionsParams;
    if (this.conditionsTypeList = i.conditionsTypeList, !o || !o.length) return this.getHouseList("onlyFilterConditions").then(function () {
      t.mapPageInit({
        optionsParams: a
      });
    });
    this.mapPageInit({
      conditionsGroups: o,
      optionsParams: a,
      hotTags: s
    });
  },
  mapPageInit: function (t) {
    this.setData(t);
    var e = 4, i = this.conditionsTypeList.find(function (t) {
      return 8 == t.type;
    }), n = this.conditionsTypeList.find(function (t) {
      return 1 == t.type;
    }), o = !!this.conditionsTypeList.find(function (t) {
      return 5 == t.type;
    });
    this.updateCity(n.label, n.value), i || (e = 4), this.setData({
      coverViewDistanceIndex: i ? parseInt(i.label) - 1 : e,
      selectCityInfo: n || {},
      isSelectedDestination: !o,
      isShowMarkerIcon: o
    }), this.createDisSlider(), this.resetSearchStatus(), this.initMap(o);
  },
  resetSearchStatus: function (t) {
    this.setHotBagStatus(this.conditionsTypeList), this.setMoreSelectCount(0 === t ? 0 : this.conditionsTypeList.filter(function (t) {
      return 1 == t.gType;
    }).length);
  },
  getHouseList: function (t) {
    var p = t;
    var e = this, i = this.data, n = (i.hotTags, i.isGeoAuth, this.conditionsTypeList), o = "onlyFilterConditions" === t;
    return this.setData({
      houseListIsLoading: !0,
      isShowHouseScrollView: !1
    }), this.mapRequest({
      url: s.default.apiConfig.getDaokeList,
      data: {
        conditions: this.conditionsTypeList,
        noStop: !1,
        onlyReturnTotalCount: o,
        pageIndex: 0,
        pageSize: 30,
        returnFilterConditions: !0,
        returnGeoConditions: !0,
        returnNavigations: !1
      },
      taskType: "houseListTask"
    }).then(function (t) {

      e.getHouseList2(p, t);

    }).catch(function (t) {
      console.log(t), e.openHouseToast({
        mainText: "加载失败啦，请重试"
      }, 3e3);
    }).finally(function () {
      e.setData({
        houseListIsLoading: !1
      });
    });
  },
  getHouseList2: function (t, data) {

    var e = this, i = this.data, n = (i.hotTags, i.isGeoAuth, this.conditionsTypeList), o = "onlyFilterConditions" === t;
    return this.setData({
      houseListIsLoading: !0,
      isShowHouseScrollView: !1
    }), this.mapRequest({
      url: s.default.apiConfig.getDaokeList,
      data: {
        conditions: this.conditionsTypeList,
        noStop: !1,
        onlyReturnTotalCount: o,
        pageIndex: 0,
        pageSize: 30,
        returnFilterConditions: !0,
        returnGeoConditions: !0,
        returnNavigations: !1
      },
      taskType: "houseListTask"
    }).then(function (t) {
      t.allConditions = data.allConditions;
      var i = {};
      if (t) {
        var s = t.items || [], r = t.conditions.find(function (t) {
          return 5 == t.type;
        }), u = !1, l = [];
        if (u = r && r.latitude ? !/^12_/.test(r.value) : r && /14\_/.test(r.value), o) return e.filterConditionData(t),
          Promise.resolve();
        if (s = e.houseListPriceFilter(s), e.data.distanceList.length || (i.conditionsGroups = t.allConditions.reverse(),
          e.createDisSlider(i.conditionsGroups)), t.allConditions && e.setData({
            oldFilterConditionGroup: e.cloneObj(t.allConditions.find(function (t) {
              return 1 == t.gType;
            }))
          }), i.houseList = s, i.hotTags = t.hotFilters || [], i["optionsParams.total"] = t.totalCount || 0,
          i.isDestination = !!r, l = a.default.batchDecryptMapCoordinate(s, 1), i.houseMarkerList = s.map(function (t, e) {
            return {
              id: t.unitId,
              latitude: l[e].latitude,
              longitude: l[e].longitude,
              iconPath: "/common/images/icon_marker_normal.png",
              callout: {
                content: t.finalPrice,
                color: "#ffffff",
                bgColor: "#d6525f",
                padding: 4,
                fontSize: 14,
                borderRadius: 4,
                anchorX: -22,
                anchorY: -100,
                x: -22,
                y: -100,
                display: "ALWAYS",
                zIndex: 1
              }
            };
          }), !s.length && e.updateCityCoordinate(t.conditions), e.setData(i), e.setHotBagStatus(n),
          e.createHouseToastText(t.conditions, s.length, t.totalCount), u) {
          var c = e.locationConditionLngLagFilter(r);
          c && (e.setData({
            myLocation: c,
            mapScale: 13
          }), e.createCirclesToMap(c));
        } else e.removeHouseCicle(), e.includePointsFlag = !0, l.length && e.includePoints(l);
        return Promise.resolve();
      }
    }).catch(function (t) {
      console.log(t), e.openHouseToast({
        mainText: "加载失败啦，请重试"
      }, 3e3);
    }).finally(function () {
      e.setData({
        houseListIsLoading: !1
      });
    });
  },
  updateCityCoordinate: function (t) {
    var e = this.data.optionsParams, i = e.cityLatitude, n = e.cityLongitude, o = t.find(function (t) {
      return 1 == t.type;
    }), s = o.latitude, r = o.longitude;
    if (s && r && (s != i || r != n)) {
      var u = a.default.bd_decrypt_go(s, r), l = u.latitude, c = u.longitude;
      this.setData({
        "optionsParams.cityLatitude": l,
        "optionsParams.cityLongitude": c
      });
    }
  },
  searchHeadGoPage: function () {
    this.isMapYellowScreen && this.setData({
      isPhoneModelMask: !0
    }), this.isMapYellowScreen = !1;
  },
  checkMapYellowScreenPhoneModel: function () {
    var t = getApp().globalData.systemInfo;
    t && -1 != u.findIndex(function (e) {
      return t.model === e;
    }) && (this.isMapYellowScreen = !0);
  },
  filterConditionData: function (t) {
    this.setData({
      conditionsGroups: t.allConditions || [],
      hotTags: t.hotFilters || [],
      oldFilterConditionGroup: this.cloneObj(t.allConditions.find(function (t) {
        return 1 == t.gType;
      })) || []
    });
  },
  houseListPriceFilter: function (t) {
    return t.filter(function (t) {
      var e = t.finalPrice && t.finalPrice > 0;
      return e && (t.productPrice = t.finalPrice === t.productPrice ? "" : "￥" + t.productPrice,
        t.finalPrice = "￥" + t.finalPrice), e;
    });
  },
  locationConditionLngLagFilter: function (t) {
    var e = t, i = e.latitude, n = e.longitude;
    e.value;
    return i && n ? a.default.bd_decrypt_go(i, n) : (t = this.conditionsTypeList.find(function (t) {
      return 5 == t.type;
    })).latitude ? {
        latitude: t.latitude,
        longitude: t.longitude
      } : void 0;
  },
  dateSelectCallback: function (t, e) {
    t = a.default.dateFormat(t, "yyyy-MM-dd"), e = a.default.dateFormat(e, "yyyy-MM-dd"),
      this.updateDate(t, e), this.getHouseList(0);
  },
  updateDate: function (t, e) {
    var i = this.conditionsTypeList, o = i.find(function (t) {
      return 2 === t.type;
    }), s = i.find(function (t) {
      return 3 === t.type;
    });
    o && s ? (o.value = t, s.value = e) : i.push(n({
      gType: 0,
      value: t,
      type: 2,
      label: "入住日期"
    }), n({
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
    t = t.split("-");
    var i = parseInt(t[1]) + "." + parseInt(t[2]);
    e = e.split("-");
    var n = parseInt(e[1]) + "." + parseInt(e[2]);
    this.setData({
      "optionsParams.date": i + "-" + n
    });
  },
  destinationSelectCallback: function (t, e) {
    console.log(t);
    var o = this.conditionsTypeList;
    this.data.conditionsGroups;
    t.cType = t.enumSuggestionConditionType ? t.enumSuggestionConditionType : t.cType,
      t.destId = t.destinationId ? t.destinationId : t.destId, t.destName = t.destinationName ? t.destinationName : t.destName,
      t.cTypeName = t.conditionTypeName ? t.conditionTypeName : t.cTypeName, 1 != t.cType && t.suggestionConditionValue || (t.cType = "1",
        t.value = "", t.name = "");
    var s = 45 == t.cType;
    if (this.destId != t.destId) {
      var a = o.filter(function (t) {
        return 2 == t.type || 3 == t.type;
      });
      this.conditionsTypeList = [n({
        gType: 0,
        type: 1,
        value: t.destId,
        label: t.destName
      })].concat(i(a)), this.updateCity(t.destName, t.destId, t.keywordSuggestType),
        this.resetSearchStatus(0);
    }
    if (t.cType && 0 != t.cType && t.suggestionConditionValue) {
      var r = n({
        gType: this.queryItemGtype(t.name, this.data.conditionsGroups),
        value: t.suggestionConditionValue,
        label: t.name,
        type: s ? 5 : t.cType,
        isItemType: "search"
      });
      5 == r.type && t.latitude && t.longitude && (r.latitude = t.latitude, r.longitude = t.longitude);
      var u = this.conditionsTypeList.filter(function (t) {
        return 1 == t.type || 2 == t.type || 3 == t.type || 8 == t.type;
      });
      this.conditionsTypeList = u, this.conditionsTypeList.push(r);
      var l = {
        "optionsParams.searchText": r.label,
        "optionsParams.sortText": "推荐排序",
        "optionsParams.locationText": 5 != t.cType ? "" : r.label
      };
      this.resetSearchStatus(), this.setData(l);
    }
    this.getHouseList(0);
  },
  updateCity: function (t, e, i) {
    var n = {
      "optionsParams.destId": e,
      "optionsParams.destName": t
    };
    this.destId = e, i && (n.keywordSuggestType = i, n.isOverseas = 2 == i), this.setData(n),
      setTimeout(function () {
        wx.setNavigationBarTitle({
          title: t
        });
      }, 0);
  },
  updateCondintionItem: function (t, e, i, n) {
    var o = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], s = this.moreSelectCount;
    t ? (e.value = i.value, e.type = i.type, e.label = i.label) : (this.conditionsTypeList.push(i),
      n && 1 == n && (s++ , this.setHotBagStatus(this.conditionsTypeList), this.setMoreSelectCount(s)));
    var a = {};
    a["optionsParams.searchText"] = i.label && o ? i.label : "", 2 == n && (a["optionsParams.locationText"] = i.label ? i.label : i.name),
      (o || 2 == n) && this.setData(a);
  },
  moreSelectCallback: function (t, e) {
    this.conditionsTypeList;
    this.setMoreSelectCount(t), this.conditionsTypeList = e, this.setData({
      mortSelectCondintionList: []
    }), this.updateDistance(), this.setHotBagStatus(e), this.getHouseList(0);
  },
  updateDistance: function () {
    var t = this.conditionsTypeList.find(function (t) {
      return 8 == t.type;
    });
    t && this.setData({
      coverViewDistanceIndex: parseInt(t.label) - 1
    });
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
    var e = t.detail, i = this.conditionsTypeList, n = this.moreSelectCount, o = 1206 == e.value, s = i.findIndex(function (t) {
      return t.value === e.value;
    });
    -1 == s ? (!o && n++ , i.push(e)) : (n && !o && n-- , i.splice(s, 1)), !o && this.setMoreSelectCount(n),
      this.getHouseList(0);
  },
  setMoreSelectCount: function (t) {
    this.moreSelectCount = t, this.setData({
      "optionsParams.moreSelectText": t ? "筛选·" + t : "筛选"
    });
  },
  queryItemGtype: function (t, e) {
    var i = this, n = void 0;
    return e.findIndex(function (e) {
      if (e.label === t) return n = e.gType;
      if (e.subGroups && e.items) return n = e.subGroups.length ? i.queryItemGtype(t, e.subGroups) : e.items.length ? i.queryItemGtype(t, e.items) : "";
    }), n;
  },
  getFilterCondintion: function () {
    return this.conditionsTypeList.filter(function (t) {
      return 1 == t.gType || 1206 == t.value;
    });
  },
  clearSearchCondition: function (t) {
    var e = {
      "optionsParams.searchText": ""
    }, i = this.conditionsTypeList;
    this.removeHouseCicle();
    var n = i.findIndex(function (t) {
      return 5 == t.type;
    });
    -1 != n && i.splice(n, 1);
    var o = i.findIndex(function (t) {
      return "search" === t.isItemType;
    });
    -1 != o && i.splice(o, 1), e.isShowHouseScrollView = !1, e["optionsParams.locationText"] = "",
      e.isShowMarkerIcon = !1, this.resetSearchStatus(), this.setData(e), t && this.getHouseList(0);
  },
  removeHouseCicle: function () {
    var t = this.data.circles, e = t.findIndex(function (t) {
      return 0 === t.strokeWidth;
    });
    -1 != e && t.splice(e, 1), this.setData({
      circles: t
    });
  },
  clearFilterCondition: function () {
    var t = this.conditionsTypeList, e = this.getFilterCondintion();
    e.length && (e.forEach(function (e) {
      return t.splice(t.findIndex(function (t) {
        return t.value === e.value;
      }), 1);
    }), this.setMoreSelectCount(0), this.setHotBagStatus(t));
  },
  initMap: function () {
    var t = this;
    this.createMyLocationCirclesToMap().then(this.getAddress).then(function (e) {
      t.setData({
        myLocationInfo: e
      }), t.getHouseList();
    }).catch(function (e) {
      t.getHouseList();
    });
  },
  selectHouse: function (t) {
    var e = t.currentTarget.dataset.type, i = this.data, n = i.nowShowHouseIndex, o = i.houseList;
    "+" === e && n >= o.length - 1 ? n = 0 : "-" == e && 0 == n ? n = o.length - 1 : "+" === e ? n++ : n-- ,
      this.markerTap({
        markerId: o[n].unitId
      }), this.setCenterLocation({
        latitude: o[n].latitude,
        longitude: o[n].longitude
      }), this.setData({
        nowShowHouseIndex: n,
        houseSelectFlag: !0
      }), this.houseSelectFlag = !0;
  },
  createCirclesToMap: function (t) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = t.latitude, s = t.longitude, a = t.radius, r = void 0 === a ? 1e3 * (this.data.coverViewDistanceIndex + 1) : a, u = t.strokeWidth, l = void 0 === u ? 0 : u, c = t.color, d = void 0 === c ? "#00000000" : c, h = t.fillColor, p = void 0 === h ? "#4a90e21a" : h, f = e(t, ["latitude", "longitude", "radius", "strokeWidth", "color", "fillColor"]), g = this.data.circles, y = o({
      latitude: n,
      longitude: s,
      fillColor: p,
      strokeWidth: l,
      radius: r,
      color: d
    }, f);
    g.length ? g[i] = y : g.push(y), this.setData({
      circles: g
    });
  },
  createMyLocationCirclesToMap: function () {
    var t = this;
    return this.getMyLocation().then(function (e) {
      var i = e.latitude, n = e.longitude;
      return t.createCirclesToMap({
        latitude: i,
        longitude: n,
        color: "#4A90E2AA",
        fillColor: "#4a90e24d",
        radius: 800,
        strokeWidth: 1
      }, 1), Promise.resolve({
        latitude: i,
        longitude: n
      });
    });
  },
  getCenterMarkes: function () {
    var t = this;
    return new Promise(function (e, i) {
      t.tjMap.getCenterLocation({
        success: function (t) {
          e(t);
        },
        fail: function (t) {
          i(t);
        }
      });
    });
  },
  myLocationTap: function () {
    var t = this;
    this.tjMap.moveToLocation(), this.setData({
      mapScale: 13,
      isSelectedDestination: !1
    }), this.createMyLocationCirclesToMap().then(function (e) {
      t.loadDestinationHouseList(e), t.createCirclesToMap(e), t.setCenterLocation(e);
    });
  },
  markerTap: function (t) {
    var e = t.markerId, i = this.data.houseMarkerList, n = this.nowMarkerActiveId, o = n === e, s = i.findIndex(function (t) {
      return t.id === e;
    }), a = n && !o ? i.find(function (t) {
      return t.id === n;
    }) : null;
    if (-1 != s) {
      var r = i[s];
      this.nowMarkerActiveId = o ? "" : e, this.setCalloutStyle(r, {
        bgColor: o ? "#d6525f" : "#eb8d96",
        fontSize: o ? 14 : 16,
        padding: 4,
        borderRadius: 4,
        zIndex: o ? 1 : 100
      }), a && this.resetCalloutStyle(a), o || this.setData({
        myLocation: {
          latitude: r.latitude,
          longitude: r.longitude
        }
      }), this.setData({
        houseMarkerList: i,
        isShowHouseScrollView: !!this.nowMarkerActiveId
      }), !o && this.setDelayCloseHouseView(), this.nowMarkerActiveId && this.openHouseScrollView(s);
    }
  },
  setDelayCloseHouseView: function () {
    var t = this;
    this.isDelayCloseHouseView = !0, setTimeout(function () {
      t.isDelayCloseHouseView = !1;
    }, 1e3);
  },
  openHouseScrollView: function (t) {
    this.setData({
      nowShowHouseIndex: t
    });
  },
  resetCalloutStyle: function (t) {
    this.setCalloutStyle(t, {
      bgColor: "#e7846b",
      fontSize: 14,
      padding: 4,
      zIndex: 1
    });
  },
  setCalloutStyle: function (t, e) {
    var i = e.bgColor, n = e.fontSize, o = e.padding;
    t.callout.bgColor = i, t.callout.fontSize = n, t.callout.padding = o;
  },
  clearDestination: function () {
    this.setData({
      houseList: [],
      "optionsParams.searchText": "",
      houseMarkerList: [],
      isSelectedDestination: !1
    });
  },
  setCenterLocation: function (t) {
    var e = t.latitude, i = t.longitude;
    this.setData({
      myLocation: {
        latitude: e,
        longitude: i
      }
    });
  },
  setDestination: function (t) {
    var e = this, i = this.data;
    i.optionsParams, i.coverViewDistanceIndex;
    this.getCenterMarkes().then(function (t) {
      var i = {
        latitude: t.latitude,
        longitude: t.longitude
      };
      e.setData({
        isShowHouseScrollView: !1,
        isSelectedDestination: !1,
        mapScale: 13,
        myLocation: i
      }), e.createCirclesToMap(i), e.addressRequestTask && e.addressRequestTask.abort(),
        e.houseListTask && e.houseListTask.abort(), e.loadDestinationHouseList(i);
    });
  },
  loadDestinationHouseList: function (t) {
    var e = this, i = t.latitude, n = t.longitude;
    this.getAddress({
      latitude: i,
      longitude: n
    }).then(function (t) {
      var o = a.default.go_decrypt_bd(n, i);
      t.suggestionConditionValue = "14_" + o.latitude + "," + o.longitude, e.destinationSelectCallback(t, 1);
    });
  },
  getAddress: function (t) {
    var e = this, i = t.latitude, n = t.longitude, o = {};
    console.log(s.default)
    return this.mapRequest({
      url: s.default.apiConfig.geoToAddress,
      data: {
        latitude: i,
        longitude: n
      },
      taskType: "addressRequestTask"
    }).then(function (t) {
      return t.address ? (o.destId = t.cityId, o.value = t.cityId, o.destName = t.cityName,
        o.name = t.address, o.cType = 45, o.latitude = i, o.longitude = n, Promise.resolve(o)) : (e.openHouseToast({
          mainText: "位置查询失败"
        }, 3e3), Promise.reject());
    }).catch(function (t) {
      return Promise.reject(t);
    });
  },
  mapRequest: function (t) {
    var e = this, i = t.taskType, n = t.data, o = app.siteInfo.apiurl + t.url;
    n['appid'] = app.siteInfo.appid;
    n['appkey'] = app.siteInfo.appkey;
    return new Promise(function (t, s) {
      wx.showNavigationBarLoading(), e.openHouseToast({
        mainText: "正在加载中..."
      }, 0), e[i] = wx.request({
        data: n,
        url: o + "?_apitsp=" + +new Date(),
        method: "POST",
        success: function (e) {
          var i = e.data;
          i.isSuccess || i.ret ? t(i.data) : s(i);
        },
        fail: function (t) {
          s(t), e.openHouseToast({
            mainText: "加载失败啦，请重试"
          }, 3e3);
        },
        complete: function () {
          e[i] = null, wx.hideNavigationBarLoading(), wx.hideLoading();
        }
      });
    });
  },
  openHouseToast: function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3;
    this.setData({
      houseToastTexts: t
    }), e && this.closeHouseToast();
  },
  closeHouseToast: function () {
    var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2e3;
    setTimeout(function () {
      t.setData({
        "houseToastTexts.mainText": ""
      });
    }, e);
  },
  getMyLocation: function () {
    var t = this;
    return new Promise(function (e, i) {
      wx.getLocation({
        type: "gcj02",
        success: function (i) {
          e(i), !t.data.isGeoAuth && t.setData({
            isGeoAuth: !0
          });
        },
        fail: function (t) {
          i(t);
        }
      });
    });
  },
  includePoints: function (t) {
    this.tjMap.includePoints({
      points: t,
      padding: [40, 40, 40, 40]
    });
  },
  createDisSlider: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.conditionsGroups;
    this.data.conditionTypes;
    if (t) {
      var e = t.find(function (t) {
        return 1 == t.gType;
      }).subGroups.find(function (t) {
        return "房屋要求" === t.label;
      }).subGroups.find(function (t) {
        return "距离" === t.label;
      });
      if (e) {
        var i = e.items.map(function (t) {
          return t.label;
        });
        this.setData({
          distanceList: i
        });
      }
    }
  },
  bindregionchange: function (t) {
    if (console.log(t), "scale" != t.causedBy && "update" != t.causedBy) {
      var e = "begin" === t.type, i = "end" === t.type;
      i && this.isDelayCloseHouseView || (this.setData({
        isMapTouch: e,
        isShowMarkerIcon: i || this.data.isShowMarkerIcon,
        isSelectedDestination: i || this.data.isSelectedDestination
      }), i && this.closeHouseToast(0), i && "update" != t.causedBy && this.closeShowHouse());
    }
  },
  distanceSliderChange: function (t) {
    var e = this.conditionsTypeList, i = this.data, o = (i.distanceList, i.myLocation), s = i.coverViewDistanceIndex, a = i.circles;
    if (s != t.detail) {
      var r = parseInt(t.detail) + 1, u = e[e.findIndex(function (t) {
        return 8 == t.type;
      })], l = e.find(function (t) {
        return 5 == t.type;
      }), c = 1e3 * r, d = r + "km";
      u ? (u.value = c, u.label = d) : e.push(n({
        value: c,
        label: d,
        gType: 1,
        isItemType: "1km",
        type: 8
      })), this.resetSearchStatus(), this.setData({
        coverViewDistanceIndex: r - 1,
        myLocation: o
      }), a[0] && this.createCirclesToMap({
        latitude: a[0].latitude,
        longitude: a[0].longitude
      }), l && this.setData({
        mapScale: 13
      }), this.getHouseList();
    }
  },
  closeShowHouse: function () {
    this.data.isShowHouseScrollView && (this.setData({
      isShowHouseScrollView: !1
    }), this.markerTap({
      markerId: this.nowMarkerActiveId
    }));
  },
  createHouseToastText: function (t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, n = t.find(function (t) {
      return 1 == t.type;
    }), o = t.find(function (t) {
      return 5 == t.type;
    }), s = t.find(function (t) {
      return 8 == t.type;
    });
    this.openHouseToast({
      mainText: e ? "已展示" + (o ? "目的地附近" : n.label) + e + "套房屋" : "没有找到房源," + (o && s && "5km" != s.label ? "试试扩大范围吧" : "试试换个位置吧"),
      subText: e ? "当前地区共" + i + "套" : ""
    }, e ? 2e3 : 0);
  },
  goToDetail: function (t) {
    var e = this.data.optionsParams, i = e.beginDate, n = e.endDate, o = t.currentTarget.dataset, s = o.unitid, a = o.intns ? "/pages/unitDetails_v2/unitDetails" : "/pages/unitDetails/unitDetails";
    wx.navigateTo({
      url: a + "?unitId=" + s + "&beginDate=" + i + "&endDate=" + n
    });
  },
  cloneObj: function (t) {
    return JSON.parse(JSON.stringify(t));
  }
});