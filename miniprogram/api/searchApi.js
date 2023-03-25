Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = new (function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./tjRequest")).default)(), n = {}, o = {
  searchUnit: "v2.wxsearch/searchunit",
  commonConfig:"v2.wxconfig/getcommonconfigs",
  keywordSearchSuggest:"v2.wxkeyword/keywordsearchsuggest",
  istnsunit:"v2.wxunit/istnsunit"
};

n.getSearchUnit = function(t, n, s, u, i, r) {
    e.postRequest(o.searchUnit, {
        pageIndex: t + 1,
        pageSize: 20,
        conditions: n,
        returnAllConditions: s,
        returnRedPacketInfo: u,
        noStop: i
    }, r);
}, n.getCommonConfig = function(t) {
    e.postRequest(o.commonConfig, null, t);
}, n.getKeywordSearchSuggest = function(t, n, s, u, i, r) {
    e.postRequest(o.keywordSearchSuggest, {
        cityId: t,
        keyword: n,
        latitude: s,
        longitude: u,
        sourceCode: i
    }, r);
}, n.getIstnsunit = function(t, n) {
    e.postRequest(o.istnsunit, {
        unitId: t
    }, n);
}, exports.default = n;