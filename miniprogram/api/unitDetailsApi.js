var t = new (function (t) {
  return t && t.__esModule ? t : {
    default: t
  };
}(require("./tjRequest")).default)(), e = {
  getIsTnsUnit: "v2.wxunit/istnsunit",
  getUnit: "v2.wxunit/getunit",
  getSimilarUnits: "v2.wxunit/getsimilarunits",
  getunitcalendar: "v2.wxunit/getunitcalendar",
  searchUnitComments: "v2.wxcomment/searchunitcomments",
  getProducts: "v2.wxproduct/getproducts",
  getCommonConfig: "v2.wxconfig/getcommonconfigs"
};

module.exports = {
  getIsTnsUnit: function (n, i) {
    t.postRequest(e.getIsTnsUnit, {
      unitId: n
    }, i);
  },
  getUnit: function (n, i) {
    t.postRequest(e.getUnit, {
      unitId: n
    }, i);
  },
  getSimilarUnits: function (n, i) {
    t.postRequest(e.getSimilarUnits, {
      unitId: n
    }, i);
  },
  getUnitCalendar: function (n, i) {
    t.postRequest(e.getunitcalendar, {
      unitId: n
    }, i);
  },
  searchUnitComments: function (n, i, u, s) {
    t.postRequest(e.searchUnitComments, {
      unitId: n,
      pageIndex: i,
      pageSize: u
    }, s);
  },
  getProducts: function (n, i, u, s, o) {
    t.postRequest(e.getProducts, {
      checkInDate: n,
      checkOutDate: i,
      unitId: u,
      activityInfo: s
    }, o);
  },
  getCommonConfig: function (n) {
    t.postRequest(e.getCommonConfig, null, n);
  }
};