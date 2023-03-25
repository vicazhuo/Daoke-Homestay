function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var t = e(require("./tjFetch.js")), s = e(require("./tjFetch2.js")), u = {}, r = {
  searchhousebyhouseidlist: "v2.wxsearch/searchhousebyhouseidlist",
  getWeekAndPlay: "v2.wxportal/getweekendplay",
  getHotRecommend: "v2.wxportal/getrecommendlandmark",
  getportal: "v2.wxportal/getportal",
  getOrderDetailPopup: "v2.wxportal/getwxpopup",
  geoToAddress: "v2.bingo/geocoder",
  getDaokeList: "v2.wxsearch/searchhouse",
  getGuessuKike: "v2.wxsuggest/guessulike",
  getCitys: "v2.bingo.wx/city/",
  getOverseasCitys: "v2.bingo.app.suggest/getOtherCitys",
  getKeywordSearchSuggest: "v2.wxkeyword/keywordsearchsuggest",
  getHousePrice: "v2.wxportal/gethousespricebyunitproductfilter",
  getportal: "v2.wxportal/getportal",
};

u.searchhousebyhouseidlist = function (e) {
  var s = e.houseIdList;
  return t.default.post(r.searchhousebyhouseidlist, {
    params: {
      houseIdList: s
    }
  });
}, u.getportal = function () {
  return t.default.post(r.getportal);
}, u.geoToAddress = function (e) {
  var s = {
    latitude: e.lat,
    longitude: e.lng,
    coordType: 2
  };
  return t.default.post(r.geoToAddress, {
    params: s
  });
},
  u.getDaokeHouseList = function (e) {
    var s = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    return t.default.post(r.getDaokeList, { params: e, isLoading: s });
  },
  u.getGuessuKike = function (e) {
    var s = e.cityId, o = e.keywordSuggestType, u = void 0 === o ? 1 : o;
    return t.default.post(r.getGuessuKike, {
      params: {
        cityId: s,
        keywordSuggestType: u
      },
      isLoading: !0
    });
  }, u.getKeywordSearchSuggest = function (e) {
    var s = e.cityId, o = e.keyword, u = e.latitude, a = void 0 === u ? null : u, i = e.longitude, d = void 0 === i ? null : i, g = e.sourceCode;
    return t.default.post(r.getKeywordSearchSuggest, {
      params: {
        cityId: s,
        keyword: o,
        latitude: a,
        longitude: d,
        sourceCode: g
      }
    });
  }, u.getOverseasCitys = function () {
    return t.default.post(r.getOverseasCitys);
  }, u.getCitys = function () {
    return t.default.post(r.getCitys, {
      isLoading: !0
    });
  }, u.getOrderDetailPopup = function () {
    return t.default.post(r.getOrderDetailPopup, {
      params: {
        popupPostionType: 2
      }
    });
  }, u.getWeekAndPlay = function (e) {
    var s = e.cityId, o = e.overseas, u = void 0 !== o && o;
    return t.default.post(r.getWeekAndPlay, {
      params: {
        cityId: s,
        overseas: u
      }
    });
  }, u.getHotRecommend = function (e, s) {
    var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
    return t.default.post(r.getHotRecommend, {
      params: {
        cityId: e,
        overseas: s,
        suggest: o
      }
    });
  }, u.getHousePrice = function (e, s, o) {
    return t.default.post(r.getHousePrice, {
      params: {
        checkInDate: e,
        checkOutDate: s,
        unitProductFilters: o
      }
    });
  }, u.apiConfig = r, exports.default = u;