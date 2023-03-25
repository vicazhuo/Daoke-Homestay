function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var t = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t];
    for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i]);
  }
  return e;
}, o = e(require("./tjFetch2.js")), i = e(require("./tjFetch.js")), r = e(require("./tjFetch3.js")), 
l = function (e) {
  return {
    storeGuid: wx.getStorageSync("storeGuid") || "",
    userToken: wx.getStorageSync("userToken") || "",
    parameter: t({}, e)
  };
}, g = {
  getHotelWifi: "v2.bingo.wx.customer/gethotelwifi",
  getUnionLogin: "v2.user/login",
  setFollowNum: "v2.bingo.wx/updatewifiregister",
  getSMSCode: "v2.user/SendVerCode",
  bindAndLogin: "v2.user/BindAndLogin",
  getImageVerifyCode: "v2.User/GetImageVerifyCode",
  getHotelWifiList: "v2.bingo.wx/gethotelwifilist",
  deleteHotelWifi: "v2.bingo.wx/deletehotelwifi",
  getHotels: "v2.bingo.wx/gethotels",
  getMaterielList: "v2.bingo,wx/getmateriellist",
  saveMateriel: "v2.bingo.wx/savemateriel",
  getStoreHomeInfo: "v2.bingo.wx/getstoreguid",
  getHotelWifiInfo: "v2.bingo.wx/gethotelwifiinfo",
  savehotelwifi: "v2.bingo.wx/savehotelwifi",
  getHotelsForWifi: "v2.bingo.wx/gethotelsforwifi",
  getWifiById: "v2.bingo.wx/gethotelwifi",
  buryUsingGET: "v2.bingo.wx/bury"
}, d = {};

d.getHotelWifi = function (e) {
  return i.default.post(g.getHotelWifi, {
    params: {
      sceneId: e
    }
  });
}, d.getUnionLogin = function (e) {
  return o.default.post(g.getUnionLogin, {
    params: e
  });
}, d.setFollowNum = function (e) {
  return r.default.post(g.setFollowNum, {
    params: e
  });
}, d.getSMSCode = function (e) {
  return o.default.post(g.getSMSCode, {
    params: e
  });
}, d.bindAndLogin = function (e) {
  return o.default.post(g.bindAndLogin, {
    params: e
  });
}, d.getImageVerifyCode = function (e) {
  return o.default.post(g.getImageVerifyCode, {
    params: e
  });
}, d.getHotelWifiList = function (e) {
  var t = e.storeGuid, o = e.userToken, i = e.pageIndex, n = e.pageSize;
  return r.default.post(g.getHotelWifiList, {
    data: {
      storeGuid: t,
      userToken: o,
      parameter: {
        pageIndex: i,
        pageSize: n
      }
    }
  });
}, d.deleteHotelWifi = function (e) {
  var t = e.storeGuid, o = e.userToken, i = e.wifiId;
  return r.default.post(g.deleteHotelWifi, {
    data: {
      storeGuid: t,
      userToken: o,
      parameter: {
        wifiId: i
      }
    }
  });
}, d.getMaterielList = function (e) {
  return r.default.post(g.getMaterielList, {
    params: l(e)
  });
}, d.getHotels = function (e) {
  return r.default.post(g.getHotels, {
    params: l(e)
  });
}, d.saveMateriel = function (e) {
  return r.default.post(g.saveMateriel, {
    params: l(e)
  });
}, d.getStoreHomeInfo = function (e) {
  var t = e.userToken;
  return r.default.post(g.getStoreHomeInfo, {
    data: {
      client: {},
      user: {
        userToken: t
      }
    }
  });
}, d.getHotelWifiInfo = function (e) {
  return r.default.post(g.getHotelWifiInfo, {
    params: l(e)
  });
}, d.savehotelwifi = function (e) {
  return r.default.post(g.savehotelwifi, {
    params: l(e)
  });
}, d.getHotelsForWifi = function (e) {
  return r.default.post(g.getHotelsForWifi, {
    params: l(e)
  });
}, d.getWifiById = function (e) {
  return r.default.post(g.getWifiById, {
    params: l(e)
  });
}, d.buryUsingGET = function (e) {
  return r.default.post(g.buryUsingGET, {
    params: l(e)
  });
}, exports.default = d;