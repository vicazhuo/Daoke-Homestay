function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

e(require("./tjFetch2.js"));

var r = e(require("./tjFetch.js")), t = require("../common/js/utils"),u = ({
    createHelpActive: "wxorder/createredpacketpower",
    queryPowerDynamicInfo: "bingo.wx.redpacket/querypowerdynamicinfo",
    queryPowerHelpers: "bingo.wx.redpacket/querypowerhelpers",
    queryHelpActiveDetail: "wxorder/queryredpacketpower",
    getHelperCount: "bingo.wx.redpacket/getpowerhelperactcount",
    createHelper: "bingo.wx.redpacket/createpowerhelper",
    createQrCode: "bingo.wx.redpacket/getpowerwechatcode",
    setFormId: "bingo.wx.formInfo/addforminfo",
    updateActive: "bingo.wx.redpacket/modifypower"
  }), n = {};

n.createHelpActive = function (e, t) {
  return t ? Promise.resolve() : r.default.post(u.createHelpActive, {
    params: {
      orderNo: e,
      scene: e + "_1"
    },
    isLoading: !0
  });
}, n.queryPowerDynamicInfo = function (e) {
  return r.default.post(u.queryPowerDynamicInfo, {
    params: {
      orderNo: e
    },
    isLoading: !1
  });
}, n.queryPowerHelpers = function (e) {
  return r.default.post(u.queryPowerHelpers, {
    params: {
      orderNo: e
    },
    isLoading: !0
  });
}, n.queryHelpActiveDetail = function (e) {
  return r.default.post(u.queryHelpActiveDetail, {
    params: {
      orderNo: e
    },
    isLoading: !0
  }).then(function (e) {
    return e && e.house && (e.house.defaultPicture = (0, t.housePicutreOption)(e.house.defaultPicture, 700, 467)),
      Promise.resolve(e);
  }).catch(function (e) {
    return Promise.reject(e);
  });
}, n.getHelperCount = function () {
  return r.default.post(u.getHelperCount, {
    isLoading: !0
  });
}, n.createHelper = function (e) {
  return r.default.post(u.createHelper, {
    params: {
      orderNo: e
    },
    isLoading: !0
  });
}, n.createQrCode = function (e) {
  return console.log(e), r.default.post(u.createQrCode, {
    params: {
      orderNo: e
    },
    isLoading: !0
  });
}, n.updateActive = function (e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  return r.default.post(u.updateActive, {
    params: {
      houseVisible: t,
      orderNo: e
    }
  });
}, exports.default = n;