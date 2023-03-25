Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {};

e.prototype.http = function(e, t, o, r) {
  var app = getApp(), n = app.globalUserInfo.tjUserInfo || {}, s = n.userToken || "", p = {
        userId: n.userId || "",
        userToken: s,
        openId: n.openId || "",
        appVersion: "1.16"
    };
 
   if (e.indexOf("http") == -1) {

       e = app.siteInfo.apiurl + e;
    }
    if (e.indexOf("05178.top") != -1 || e.indexOf("minsu.com") != -1) {
      
       e += '?appid=' + app.siteInfo.appid + '&appkey=' + app.siteInfo.appkey
    };
    wx.request({
        url: e,
        data: t,
        method: r,
        header: p,
        success: function(e) {
            o && o(!0, e.data);
        },
        fail: function(e) {
            console.log(e), e.response ? o && o(!1, null, {
                errorNo: -1e3,
                errorMsg: "网络请求错误"
            }) : e.request && o && o(!1, null, {
                errorNo: -1e3,
                errorMsg: "网络请求错误"
            });
        }
    });
}, e.prototype.httpHandle = function(e, t, o, r) {
    var n = this;
    this.http(e, t, function(e, t, r) {
        n.callbackHandle(e, t, r, o);
    }, r);
}, e.prototype.callbackHandle = function(e, t, o, r) {
    r(e, t);
}, e.prototype.postRequest = function(e, t, o) {
    this.httpHandle(e, t, o, "post");
}, e.prototype.getRequest = function(e, t, o) {
    this.httpHandle(e, t, o, "get");
}, exports.default = e;