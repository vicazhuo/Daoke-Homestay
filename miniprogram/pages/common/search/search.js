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

var i = t(require("../../../api/searchApi")), s = t(require("./history.js")), a = t(require("../../../apiFetch/searchApi")), o = t(require("../../../common/js/utils"));

require("../../../common/js/tjRequest.js");

Page({
    data: {
        historyGroup: {
            destHistoryKey: [],
            cityHistoryKey: [],
            overseasCityHistoryKey: [],
            overseasDestHistoryKey: []
        },
        guessLikeGroup: [],
        suggestionsGroup: [],
        activeCityOutsideGroup: [],
        overseasCityGroup: [],
        overseasHotCityGroup: [],
        curDest: {},
        beginDate: "",
        endDate: "",
        winHeight: 0,
        winWidth: 0,
        isTabSelected: 0,
        translateDistance: 0,
        isLoading: !1,
        searchBox: {},
        searchInput: "",
        keyword: "",
        hot: [],
        group: [],
        leters: "",
        overseasLetters: "",
        PWA_STATIC_TUJIA_HOST: '',
        locationStatus: 0,
        locationInfo: {},
        scrollTops: {
            searchCityTop: 0,
            searchOverseaTop: 0
        },
        isAliApp: o.default.isAliApp
    },
    historyActiveKey: "",
    cityId: 48,
    timer: null,
    isOverseas: !1,
    onLoad: function(t) {
        var e = t.searchType, i = t.keywordSuggestType, a = t.isHome, o = t.curDestId, n = t.curDestName, r = t.beginDate, c = t.endDate, u = t.name, h = t.cityName, d = t.cityId, l = getCurrentPages();
        this.prePage = l[l.length - 2], this.cityId = d || 48, this.isOverseas = 2 == i, 
        this.isHome = !!a;
        var g = 2 == e ? u : "";
        this.setData({
            curDest: {
                destId: o || d,
                destName: n || h
            },
            isOverseas: this.isOverseas,
            beginDate: r,
            endDate: c,
            isTabSelected: this.isOverseas && 1 == e ? 1 : 0,
            searchInput: g || ""
        }), this.initSearchBox(t), this.historyActiveKey = 2 == e ? this.isOverseas ? "overseasDestHistoryKey" : "destHistoryKey" : this.isOverseas ? "overseasCityHistoryKey" : "cityHistoryKey", 
        s.default.initHistory(this, this.historyActiveKey), 1 == e ? (this.getLocation(), 
        this.getCitys(), s.default.initHistory(this, this.isOverseas ? "cityHistoryKey" : "overseasCityHistoryKey")) : this.getGuessLikeList();
        var y = this;
        wx.getSystemInfo({
            success: function(t) {
                y.setData({
                    winHeight: t.windowHeight,
                    winWidth: t.windowWidth
                });
            }
        });
    },
    onShow: function() {
        3 != this.data.locationStatus && 0 != this.data.locationStatus && setTimeout(this.getLocation, 500);
    },
    initSearchBox: function(t) {
        var e = {
            defaultTitle: "",
            searchType: t.searchType
        };
        switch (t.searchType) {
          case "1":
            e.defaultTitle = "城市/区域/位置";
            break;

          case "2":
            e.defaultTitle = "关键字/位置/房屋";
            break;

          default:
            return;
        }
        this.setData({
            searchBox: e
        });
    },
    getNetworkType: function() {
        return new Promise(function(t, e) {
            wx.getNetworkType({
                success: function(i) {
                    "none" === i.networkType ? e() : t(i.networkType);
                }
            });
        });
    },
    getLocation: function() {
        var t = this;
        this.getNetworkType().then(function() {
            o.default.checkApiAuth("userLocation").then(function() {
                t.getGeo();
            }).catch(function() {
                t.setLocationInfo(2), o.default.isAliApp && t.getGeo();
            });
        }).catch(function() {
            t.setLocationInfo(4);
        });
    },
    getGeo: function() {
        var t = this;
        this.setLocationInfo(0), o.default.getGeo().then(function(e) {
            t.setLocationInfo(3, e);
        }).catch(function(e) {
            console.log(e);
            var i = e.errMsg;
            return 2001 === e.error ? t.setLocationInfo(2) : 11 == e.error || i && (/system/.test(i) || "getLocation:fail 1" === i) ? t.setLocationInfo(5) : void t.setLocationInfo(1, e);
        });
    },
    goOpenSettingTap: function() {
        o.default.isAliApp && this.getGeo(), this.isToOpenSetting = !0;
    },
    myLocationBarTap: function(t) {
        var e = this.data.locationStatus;
        if (3 == e) {
            var i = t.currentTarget.dataset, s = i.item, a = i.type;
            s.myLocationType = a, this.clickDest(t);
        } else 1 == e && this.getLocation();
    },
    setLocationInfo: function(t, e) {
        var i = {
            locationStatus: t
        };
        e && (i.locationInfo = e), this.setData(i);
    },
    switchTap: function(t) {
        var e = t.currentTarget.dataset.index;
        this.historyActiveKey = 0 == e ? "cityHistoryKey" : "overseasCityHistoryKey", this.setData({
            translateDistance: -50 * e + "%",
            isTabSelected: e
        });
    },
    clickLeters: function(t) {
        var i = 1 == this.data.isTabSelected, s = t.currentTarget.dataset.leters;
        this.setData(e({}, i ? "overseasLetters" : "leters", i ? "oversea" + s : s));
    },
    clickCity: function(t) {
        var e = t.currentTarget.dataset;
        e.keywordSuggestType = 1 == this.data.isTabSelected ? 2 : 1, this.goJump(this.cityFilter(e));
    },
    cityFilter: function(t) {
        var e = t.destid || t.destinationId;
        return {
            destinationId: e,
            destinationName: t.destname || t.destinationName,
            conditionType: 42,
            keywordSuggestType: t.keywordSuggestType,
            value: e.toString()
        };
    },
    getCitys: function() {
        var t = this;
        o.default.timeStorage.get("CITY_DATA").then(function(e) {
            e && t.setData(e);
        }).catch(function() {
            a.default.getCitys().then(function(e) {
                if (!e) throw 1;
                var i = e.cityGroup, s = e.cityGroupOverSea, a = {};
                i && (i.cities && (a.group = i.cities), i.hotCities && (a.hot = i.hotCities), a.chinaCityTabText = i.title), 
                s && (s.cities && (a.overseasCityGroup = s.cities), s.hotCities && (a.overseasHotCityGroup = s.hotCities), 
                a.overSeaCityTabText = s.title), t.setData(a), a.group && o.default.timeStorage.set("CITY_DATA", a, 600);
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    getOverseasCitys: function() {},
    getGuessLikeList: function() {
        var t = this;
        a.default.getGuessuKike({
            cityId: this.cityId,
            keywordSuggesttype: this.isOverseas ? 2 : 1
        }).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            console.log(e), (e.groups || []).forEach(function(t) {
                var e = Math.ceil(t.suggests.length / 4);
                t.showAllBtnSelected = !1, t.lineCount = e, t.defaultLineCount = e >= 2 ? 2 : e, 
                t.isShowAllBtn = e > 2;
            }), t.setData({
                guessLikeGroup: e.groups
            });
        });
    },
    getSearchItems: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        if (e) {
            var i = "", s = this.data.searchBox.searchType, o = 1 != s || e ? this.cityId : this.data.curDest.destId;
            o = isNaN(o) ? 0 : o;
            this.isOverseas, this.isHome;
            var n = 1 == s, r = [], c = [];
            i = n ? "WX_Home_City" : "WX_UnitListV2_Mainland", this.setData({
                isLoading: !0
            }), a.default.getKeywordSearchSuggest({
                cityId: n ? 0 : o,
                keyword: e,
                latitude: null,
                longitude: null,
                sourceCode: i
            }).then(function(e) {
                e && (e.suggests.forEach(function(t) {
                    t.nameArr = t.name && t.name.split("") || [], t.descriptionArr = t.description && t.description.split("") || [], 
                    t.childSuggests && t.childSuggests.forEach(function(t) {
                        t.nameArr = t.name && t.name.split("") || [], t.descriptionArr = t.description && t.description.split("") || [], 
                        t.isChild = !0;
                    }), t.childSuggestGroups && t.childSuggestGroups.forEach(function(t) {
                        t.nameArr = t.name && t.name.split("") || [], t.descriptionArr = t.description && t.description.split("") || [], 
                        t.isChildGroups = !0;
                    }), 2 == s ? t.destinationId == o ? r.push(t) : c.push(t) : r.push(t);
                }), console.info(r, c), t.setData({
                    suggestionsGroup: r,
                    activeCityOutsideGroup: c
                }));
            }).finally(function() {
                t.setData({
                    isLoading: !1
                });
            }).catch(function(e) {
                t.setData({
                    suggestionsGroup: []
                });
            });
        }
    },
    getInputSearch: function(t) {
        var e = this;
        clearTimeout(this.timer), this.timer = setTimeout(function() {
            e.getSearchItems(t.detail.value);
        }, 300), this.setData({
            keyword: t.detail.value,
            searchInput: t.detail.value
        });
    },
    inputConfirm: function() {
        if (!(this.data.suggestionsGroup.length < 0) && this.data.keyword) {
            var t = this.data.suggestionsGroup[0];
            t && this.goJump(t);
        }
    },
    clearInput: function() {
        var t = this.prePage, e = this.data.searchBox.searchType;
        this.setData({
            searchInput: "",
            keyword: "",
            suggestionsGroup: []
        }), t && 2 == e && (void 0 != t.isUpdateHouseList && (t.isUpdateHouseList = !0), 
        t.clearSearchCondition && t.clearSearchCondition());
    },
    cancel: function() {
        wx.navigateBack();
    },
    clickDest: function(t) {
        var e = t.currentTarget.dataset.item;
        "city" === e.myLocationType && (e.conditionType = 42), this.goJump(e);
    },
    goJump: function(t) {
        var e = this, a = this.isHome, o = (this.isOverseas, this.historyActiveKey, this.data), n = o.beginDate, r = o.endDate, c = o.searchBox;
        o.isTabSelected;
        if (("city" === t.myLocationType || t.value && t.conditionType) && s.default.setHistory(this, t, 2 == t.keywordSuggestType ? 1 == c.searchType ? "overseasCityHistoryKey" : "overseasDestHistoryKey" : 1 == c.searchType ? "cityHistoryKey" : "destHistoryKey"), 
        9 === t.enumSuggestionConditionType) {
            var u = !1, h = t.value || t.suggestionConditionValue;
            i.default.getIstnsunit(h, function(t, e, i) {
                var s = (u = !!t && e.data) ? "/pages/unitDetails_v2/unitDetails" : "/pages/unitDetails/unitDetails";
                wx.navigateTo({
                    url: s + "?unitId=" + h + "&beginDate=" + n + "&endDate=" + r
                });
            });
        } else {
            if (t.suggests && t.suggests.length > 0) return;
            if (10 == t.enumSuggestionConditionType && 2 == c.searchType && a) return void wx.navigateTo({
                url: "/pages/units/units?destinationId=" + t.destinationId + "&destinationName=" + t.destinationName + "&value=" + (t.suggestionConditionValue || t.value) + "&beginDate=" + n + "&endDate=" + r + "&name=" + t.name + "&cType=" + (t.cType || t.enumSuggestionConditionType) + "&isSearch=1"
            });
            1 == t.enumSuggestionConditionType && (t = this.cityFilter(t)), wx.navigateBack({
                delta: 1,
                success: function(i) {
                    var s = e.prePage;
                    s && (void 0 != s.isUpdateHouseList && (s.isUpdateHouseList = !1), s.destinationSelectCallback && s.destinationSelectCallback(t));
                }
            });
        }
    },
    clearHistory: function(t) {
        var e = t.currentTarget.dataset.historykey, i = this;
        wx.showModal({
            title: "",
            content: "确认清除全部历史记录？",
            success: function(t) {
                t.confirm ? s.default.clearHistory(i, e) : t.cancel;
            }
        });
    },
    clickMyPosition: function(t) {
        var e = getCurrentPages(), i = e[e.length - 2];
        wx.navigateBack({
            delta: 1,
            success: function(e) {
                i && i.getGeo && i.getGeo(t);
            }
        });
    },
    showAllTap: function(t) {
        var i = t.currentTarget.dataset.index, s = this.data.guessLikeGroup;
        this.setData(e({}, "guessLikeGroup[" + i + "].showAllBtnSelected", !s[i].showAllBtnSelected));
    },
    toTop: function() {
        var t = this.data.isTabSelected, i = 1 == t ? "overseasLetters" : "leters";
        this.setData(e({}, i, 1 == t ? "topOversea" : "top"));
    }
});