Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./tjFetch.js")), o = {
  addFavorite: "v2.bingo.wx/addfavorite",
  deleteFavorite:"v2.bingo.wx/deletefavorite",
  getFavorite: "v2.bingo.wx/getfavorite",
  searchHouseByHouseIdList:"v2.wxsearch/searchhousebyhouseidlist",
  searchHouseByHouseIdListAndCityId:"v2.wxsearch/searchhousebyhouseidlistandcityid",
  searchHouseCity:  "v2.wxsearch/searchhousecity",
  getHouseRecord:"v2.bingo.wx/housefoot",
  setHouseRecord: "v2.bingo.wx/visithouse"
}, s = {};

s.addFavorite = function(t) {
    return e.default.post(o.addFavorite, {
        params: {
            houseId: t
        },
        isLoading: !0
    });
}, s.deleteFavorite = function(t) {
    return e.default.post(o.deleteFavorite, {
        params: {
            houseId: t
        },
        isLoading: !0
    });
}, s.getFavorite = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    return e.default.post(o.getFavorite, {
        isLoading: t
    });
}, s.searchHouseByHouseIdList = function(t) {
    var s = t.checkInDate, a = t.checkOutDate, i = t.houseIdList;
    arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    return e.default.post(o.searchHouseByHouseIdList, {
        params: {
            checkInDate: s,
            checkOutDate: a,
            houseIdList: i,
            needUnactive: !0,
            noNeedPrice: !1
        },
        isLoading: !1
    });
}, s.searchHouseByHouseIdListAndCityId = function(t) {
    t.checkInDate, t.checkOutDate, t.houseIdList, t.cityId;
    return e.default.post(o.searchHouseByHouseIdListAndCityId, {
        params: arguments[0],
        isLoading: !0
    });
}, s.searchHouseCity = function(t) {
    arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    return e.default.post(o.searchHouseCity, {
        params: {
            houseIdList: t
        },
        isLoading: !1
    });
}, s.getHouseRecord = function(t) {
    t.pageIndex, t.pageSize, arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    return e.default.post(o.getHouseRecord, {
        params: arguments[0],
        isLoading: !1
    });
}, s.setHouseRecord = function(t, s) {
    return e.default.post(o.setHouseRecord, {
        params: {
            hotelId: s,
            houseId: t
        }
    });
}, exports.default = s;