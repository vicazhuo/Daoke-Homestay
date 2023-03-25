function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./tjFetch2.js")), o = e(require("./tjFetch.js")), r = e(require("./tjFetch3.js")),  c = {
  checkLogin:"v2.User/CheckLogin",
  queryshareactivitywechatcode:"v2.bingo.redpacket/queryshareactivitywechatcode",
  setFormId: "v2.bingo/addforminfo",
  haspullnewauthory:"v2.bingo/haspullnewauthory"
}, s = {};

s.setFormId = function(e, t) {
    return console.log(e, t), o.default.post(c.setFormId, {
        params: {
            openId: e,
            formId: t
        }
    });
}, s.checkLogin = function() {
    return new Promise(function(e, o) {
        wx.login({
            success: function(r) {
                var n = getApp().globalUserInfo.wxUserInfo;
                t.default.post(c.checkLogin, {
                    params: {
                        code: r.code,
                        userInfo: n ? JSON.stringify(n) : ""
                    },
                    isLoading: !0,
                    loadingDelayTime: 100
                }).then(function(t) {
                    e(t);
                }).catch(function(e) {
                    o(e);
                });
            }
        });
    });
}, s.queryshareactivitywechatcode = function(e) {
    e.activeId;
    return o.default.post(c.queryshareactivitywechatcode, {
        data: arguments[0]
    });
}, s.haspullnewauthory = function(e) {
    var t = e.userToken;
    return r.default.post(c.haspullnewauthory, {
        data: {
            client: {},
            user: {
                userToken: t
            }
        }
    });
}, exports.default = s;