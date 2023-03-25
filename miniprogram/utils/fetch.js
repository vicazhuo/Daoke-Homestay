function e(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var t = function () {
  function e(e, t) {
    for (var n = 0; n < t.length; n++) {
      var o = t[n];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0),
        Object.defineProperty(e, o.key, o);
    }
  }
  return function (t, n, o) {
    return n && e(t.prototype, n), o && e(t, o), t;
  };
}(), n = function () {
  function n(t) {
    var o = t.resHandle, a = t.reqHandle;
    e(this, n), this.httpReqLoadingCount = 0, this.reqHandle = a, this.resHandle = o;
  }
  return t(n, [{
    key: "post",
    value: function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        app = getApp(),
        n = t.data, o = t.params,
        a = t.headers,
        i = t.withCredentials,
        r = void 0 !== i && i,
        s = t.timeout,
        d = void 0 === s ? 1e4 : s,
        l = t.isLoading,
        u = void 0 !== l && l,
        h = t.loadingDelayTime,
        g = void 0 === h ? 200 : h,
        c = t.loadingText,
        p = void 0 === c ? "请稍候..." : c,
        f = t.dataType, m = void 0 === f ? "json" : f;

      return this.http({
        url: e,
        method: "post",
        data: n,
        params: o,
        headers: a,
        withCredentials: r,
        timeout: d,
        isLoading: u,
        loadingDelayTime: g,
        loadingText: p,
        dataType: m
      });
    }
  }, {
    key: "get",
    value: function (e) {
      app = getApp()
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        app = getApp(),
        n = t.data,
        o = t.params,
        a = t.headers,
        i = t.withCredentials,
        r = void 0 !== i && i,
        s = t.timeout,
        d = void 0 === s ? 1e4 : s,
        l = t.isLoading,
        u = void 0 !== l && l,
        h = t.loadingDelayTime,
        g = void 0 === h ? 300 : h,
        c = t.loadingText,
        p = void 0 === c ? "请稍候..." : c;

      return this.http({
        url: e,
        method: "get",
        data: n,
        params: o,
        headers: a,
        withCredentials: r,
        timeout: d,
        isLoading: u,
        loadingText: p,
        loadingDelayTime: g
      });
    }
  }, {
    key: "http",
    value: function (e) {
      var t = this, app = getApp(), n = this.setLoading(e);
      if (typeof e.params == 'undefined') {
        e.params = {};
      };

      return e.params = e.params || {},
        this.reqHandle && this.reqHandle(e),
        new Promise(function (o, a) {
          e.params.appid = app.siteInfo.appid;
          e.params.appkey = app.siteInfo.appkey;
          // console.log("headers-------"), console.log(e.headers), console.log(e.url + "?_apitsp=" + new Date().getTime());
          if (e.url.indexOf("http") == -1) {
            e.url = app.siteInfo.apiurl + e.url;
          }
          wx.request({
            url: e.url + "?_apitsp=" + new Date().getTime(),
            data: e.params,
            method: e.method,
            dataType: e.dataType || "json",
            header: e.headers,
            success: function (n) {
              //console.log("返回数据：", n.data);

              if (n.data.errcode == 1001) {
                wx.showModal({
                  title: '系统提示',
                  content:'登录已过期，请重新登',
                  confirmText:'去登陆',
                  success: function (res){
                    if (res.confirm) {
                      wx.navigateTo({
                        url: "/pages/user/login/login"
                      });
                    } else if (res.cancel) {
                       wx.navigateBack()
                    }
         
                  }
                })
                return false;
              }
              if (t.resHandle) return t.resHandle(n.data, {
                resolve: o,
                reject: a
              }, e);
              o(n.data);
            },
            fail: function (e) {
              a(e.response || e.request ? {
                errorNo: -1e3,
                errorMsg: "网络请求错误"
              } : e);
            },
            complete: function () {
              e.isLoading && t.removeLoading(n);
            }
          });
        });
    }
  }, {
    key: "setLoading",
    value: function (e) {
      var t = this, n = e.isLoading, o = e.loadingDelayTime, a = e.loadingText;
      if (n) return this.loadingTimer = setTimeout(function () {
        t.httpReqLoadingCount || wx.showLoading({
          title: a,
          mask: !0
        }), t.httpReqLoadingCount++;
      }, o);
    }
  }, {
    key: "removeLoading",
    value: function (e) {
      clearTimeout(e), this.httpReqLoadingCount && this.httpReqLoadingCount-- , this.httpReqLoadingCount || wx.hideLoading();
    }
  }]), n;
}();

exports.default = n, Promise.prototype.finally || (Promise.prototype.finally = function (e) {
  var t = this.constructor;
  return this.then(function (n) {
    return t.resolve(e()).then(function () {
      return n;
    });
  }, function (n) {
    return t.resolve(e()).then(function () {
      throw n;
    });
  });
});