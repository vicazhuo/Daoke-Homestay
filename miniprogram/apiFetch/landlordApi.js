function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

e(require("./tjFetch2.js"));

var t = e(require("./tjFetch.js")),  s = {
  getHotel:"v3.wxhotel/gethotel",
  getHotelComments:"v3.wxcomment/searchunitcomments",
  searchHouseByHotel:"v3.wxsearch/searchhousebyhotel"
}, r = {};

r.getHotel = function(e) {
    return t.default.post(s.getHotel, {
        params: {
            hotelId: e
        },
        isLoading: !0
    });
}, r.getHotelComments = function(e) {
    var o = e.hotelId, r = e.index;
    return t.default.post(s.getHotelComments, {
        params: {
            hotelId: o,
            pageSize: 10,
            pageIndex: r
        }
    });
}, r.searchHouseByHotel = function(e) {
    var o = e.hotelId, r = e.index;
    return t.default.post(s.searchHouseByHotel, {
        params: {
            hotelId: o,
            pageSize: 10,
            pageIndex: r
        }
    });
}, exports.default = r;