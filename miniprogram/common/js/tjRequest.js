function e(e) {
  var o, t, r, s, a, n = e.openLoginType || "navigate";
    t = (o = (a = getApp()).globalUserInfo.tjUserInfo || {}).userToken || "", r = o.userId || 0, 
    s = o.openId || "", e.header = e.header || {}, e.header.userId = r, e.header.userToken = t, 
    e.header.openId = s, e.header.appVersion = "1.16",wx.request({
        url: e.url + '?appid='+a.siteInfo.appid + '&appkey=' + a.siteInfo.appkey,
        data: e.data,
        method: e.method, 
        header: e.header,
        success: function(o) {
       
            if (200 == o.statusCode && o.data.isSuccess || (console.log("requrl:" + e.url + "  reqdata:" + JSON.stringify(e.data) + "  res:"), 
            console.log(o)), 1001 == o.data.errorCode) {
                a.clearTjUserInfo();
                "navigate" == n ? wx.navigateTo({
                    url: "/pages/user/login/login"
                }) : "redirect" == n ? wx.redirectTo({
                    url: "/pages/user/login/login"
                }) : "function" == typeof e.success && e.success(o);
            } else "function" == typeof e.success && e.success(o);
        },
        fail: function(o) {
            console.log("fail-requrl:" + e.url + "  reqdata:" + JSON.stringify(e.data) + "  res:"), 
            console.log(o), "function" == typeof e.fail && e.fail(o);
        },
        complete: e.complete
    });
}

var o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
};

module.exports = {
    tjRequest: e,
    tjGet: function(o) {
        o.method = "GET", e(o);
    },
    tjPost: function(o) {
        o.method = "POST", e(o);
    },
    host: o.default
};