var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/fetch.js")), n = new e.default({
    reqHandle: function(e) {
        e.data && (e.params = e.data);
    }
  }), o = "https://api.05178.top/record", t = function() {
    return new Promise(function(e, r) {
        wx.getSystemInfo({
            success: function(r) {
                e(r);
            },
            fail: function(r) {
                e(null);
            }
        });
    });
};

module.exports = function(e) {
    var r = e.page, u = void 0 === r ? "" : r, s = e.errorType, a = void 0 === s ? "" : s, i = e.errorMsg, f = void 0 === i ? "" : i, c = {}, d = getApp().globalUserInfo.tjUserInfo || {};
    return c.token = d.userToken || "", c.userId = d.userId || "", c.openId = d.openId || "", 
    c.errorMsg = f, c.errorType = a, c.page = u, t().then(function(e) {
        return c.deviceInfo = e, n.post(o, {
            params: {
                channel: "mp",
                type: 0,
                name: "fe_wechat_app_" + a,
                log: JSON.stringify(c)
            }
        });
    });
};