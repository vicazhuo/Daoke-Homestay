Object.defineProperty(exports, "__esModule", {
  value: !0
});

var t = function (t) {
  return t && t.__esModule ? t : {
    default: t
  };
}(require("./tjFetch.js")), n = {};

n.searchUnitComments ="v2.wxcomment/searchunitcomments", 
  n.getCommonConfig ="v2.wxconfig/getcommonconfigs",
  n.getUnit = "v2.wxunit/getunit",
  n.getSimilarUnits = "v2.wxunit/getsimilarhouse",
  n.getProducts = "v2.wxproduct/productInfo",
  n.getunitcalendar ="v2.wxunit/getunitcalendar",
  n.getIsTnsUnit ="v2.wxunit/istnsunit", 
  n.geohousePosition ="v2.wxunit/geohouseposition",
  n.deposit = "v2.wxproduct/deposit", 
  n.houseTag ="v2.wxunit/housetag";

var u = {};

u.searchUnitComments = function (e) {
  e.pageIndex, e.pageSize, e.unitId;
  return t.default.post(n.searchUnitComments, {
    data: arguments[0]
  });
}, u.getCommonConfig = function () {
  return t.default.post(n.getCommonConfig);
}, u.getUnit = function (e) {
  e.unitId, e.isLoading;
  return t.default.post(n.getUnit, {
    data: arguments[0],
    dataType: "manualParse"
  }).then(function (t) {
    try {
      t = JSON.parse(t);
    } catch (e) {
      t = t.replace(/\s+/g, "  "), t = JSON.parse(t);
    }
    return t.ret ? t.data : Promise.reject(t);
  }).catch(function (t) {
    return Promise.reject(t);
  });
}, u.getProducts = function (e) {
  e.checkInDate, e.checkOutDate, e.unitId, e.activityInfo;
  
  return t.default.post(n.getProducts, {
    data: arguments[0]
  });
}, u.geohousePosition = function (e) {
  e.unitId;
  return t.default.post(n.geohousePosition, {
    data: arguments[0]
  });
}, u.deposit = function (e) {
  e.unitId, e.checkInDate, e.checkOutDate;
  return t.default.post(n.deposit, {
    data: arguments[0]
  });
}, u.houseTag = function (e) {
  e.unitId;
  return t.default.post(n.houseTag, {
    data: arguments[0]
  });
}, u.getSimilarUnits = function (e) {
  e.unitId;
  return t.default.post(n.getSimilarUnits, {
    data: arguments[0]
  });
}, u.getunitcalendar = function (e) {
  e.unitId;
  return t.default.post(n.getunitcalendar, {
    data: arguments[0]
  });
}, u.getIsTnsUnit = function (e) {
  e.unitId;
  return t.default.post(n.getIsTnsUnit, {
    data: arguments[0]
  });
}, exports.default = u;