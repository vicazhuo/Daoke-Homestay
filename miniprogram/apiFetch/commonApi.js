function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var o = e(require("./tjFetch2.js")), n = e(require("./tjFetch.js")), c =
{
  checkLogin: "v2.user/CheckLogin",
  setFormId: "v2.bingo/addforminfo"
}, i = {};

i.checkLogin = function () {
  return new Promise(function (e, n) {
    var r = getApp().globalUserInfo.wxUserInfo;
    wx.login({
      success: function (t) {
        o.default.post(c.checkLogin, {
          params: {
            code: t.code,
            parentsId: getApp().globalPid,
            userInfo: r ? JSON.stringify(r) : ""
          },
          isLoading: !0,
          loadingDelayTime: 100
        }).then(function (res) {
          e(res);
        }).catch(function (e) {
          n(e);
        });
      }
    });
  });
}, i.setFormId = function (e, o) {
  return n.default.post(c.setFormId, {
    params: {
      openId: e,
      formId: o
    }
  });
}, exports.default = i;