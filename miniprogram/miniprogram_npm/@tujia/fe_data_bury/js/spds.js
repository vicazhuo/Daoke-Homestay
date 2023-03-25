function e(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});
var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
  return typeof e;
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = function () {
  function e(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0),
        Object.defineProperty(e, i.key, i);
    }
  }
  return function (t, n, i) {
    return n && e(t.prototype, n), i && e(t, i), t;
  };
}(), i = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
  }
  return e;
}, s = require("./env").default, a = s.isWxApp, r = s.isAliApp, u = function () {
  function t() {
    e(this, t), this.url = wx.getStorageSync("_tj_burydomain_"), this.messageQueue = [],
      this.uploadQueue = [], this.commonParams = {};
  }
  return n(t, [{
    key: "upload",
    value: function (e, t) {
      var n = this;
      this.messageQueue.push(e), this.commonParams = t || {}, this.uploadTimer || (this.uploadTimer = setTimeout(function () {
        n._request(), n.uploadTimer = null;
      }, 1e3));
    }
  }, {
    key: "forceFlush",
    value: function () {
      this.uploadTimer && (clearTimeout(this.uploadTimer), this.uploadTimer = null), this._request();
    }
  }, {
    key: "_request",
    value: function () {
      var e = this;
      this.uploadingQueue = this.messageQueue.slice(), this.messageQueue = [];
      var t = i({}, this.commonParams, {
        events: this.uploadingQueue
      });
      this.uploadingQueue.length > 0 && wx.request({
        url: this.url + "?stm=" + Date.now(),
        header: {
          "content-type": "application/json"
        },
        method: "POST",
        data: t,
        success: function () {
          e.messageQueue.length > 0 && e._request();
        },
        fail: function () {
          e.messageQueue = e.uploadingQueue.concat(e.messageQueue);
        }
      });
    }
  }]), t;
}(), o = {
  isObjectEmpty: function (e) {
    return !e || 0 === Object.keys(e).length;
  },
  getOS: function (e) {
    return (a ? "Weixin" : r ? "zfb" : "") + e;
  },
  guid: function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
      var t = 16 * Math.random() | 0;
      return ("x" == e ? t : 3 & t | 8).toString(16);
    });
  }
}, c = function () {
  function t() {
    e(this, t), this._location = null, this._systemInfo = null, this._openId = null,
      this.userInfoKey = wx.getStorageSync("_tj_userInfoKey_"), this._uid = wx.getStorageSync("_tj_uid_");
  }
  return n(t, [{
    key: "requestLocation",
    value: function () {
      var e = this;
      return new Promise(function (t) {
        e._getSetting().then(function (n) {
          if (!(n && n.authSetting && n.authSetting["scope.userLocation"])) return t(null);
          e._getLocation().then(function (n) {
            return e._location = n, t(n);
          });
        });
      });
    }
  }, {
    key: "getNetworkType",
    value: function () {
      return new Promise(function (e) {
        wx.getNetworkType({
          success: function (t) {
            return e(t);
          },
          fail: function () {
            return e(null);
          }
        });
      });
    }
  }, {
    key: "_getSetting",
    value: function () {
      return new Promise(function (e) {
        wx.getSetting({
          success: e,
          fail: e
        });
      });
    }
  }, {
    key: "_getLocation",
    value: function () {
      return new Promise(function (e) {
        wx.getLocation({
          success: e,
          fail: function () {
            return e(null);
          }
        });
      });
    }
  }, {
    key: "location",
    get: function () {
      return this._location;
    }
  }, {
    key: "systemInfo",
    get: function () {
      return null == this._systemInfo && (this._systemInfo = wx.getSystemInfoSync()),
        this._systemInfo;
    }
  }, {
    key: "openId",
    get: function () {
      return this.userInfoKey && (this._openId = wx.getStorageSync(this.userInfoKey) && wx.getStorageSync(this.userInfoKey).openId),
        this._openId;
    }
  }, {
    key: "userId",
    get: function () {
      return this.userInfoKey && (this._userId = wx.getStorageSync(this.userInfoKey) && wx.getStorageSync(this.userInfoKey).userId),
        this._userId;
    }
  }, {
    key: "uid",
    set: function (e) {
      this._uid = e, wx.setStorageSync("_tj_uid_", this._uid);
    },
    get: function () {
      return this._uid || (this.uid = o.guid()), this._uid;
    }
  }]), t;
}(), l = function () {
  function i(t) {
    e(this, i), this.currentPage = new h(), this.uploader = new u(), this.tjWeiXin = t.tjWeiXin,
      this.databurying = t, this.isPauseSend = !1, this._sessionId = null, this.lastPageEvent = void 0,
      this.scene = null, this.latitude = null, this.longitude = null, this.networkType = null;
  }
  return n(i, [{
    key: "pauseSession",
    value: function () {
      this.isPauseSend = !0;
    }
  }, {
    key: "appListener",
    value: function (e, t, n) {
      this.isPauseSend || ("onShow" == t ? this.sendVisitEvent(n) : "onHide" == t ? (this.uploader.forceFlush(),
        this.isPauseSend || this.sendVisitCloseEvent()) : "onError" == t && this.sendErrorEvent(n));
    }
  }, {
    key: "pageListener",
    value: function (e, t, n) {
      if ("onShow" === t) this.isPauseSend ? this.isPauseSend = !1 : (this.currentPage.pageInit(e),
        this.sendPage(e)); else if ("onLoad" === t) o.isObjectEmpty(n[0]) || this.currentPage.addQuery(e, n[0]); else if ("onShareAppMessage" === t) {
          var i = null, s = null;
          n.length < 2 ? 1 === n.length && (n[0].from ? i = n[0] : n[0].title && (s = n[0])) : (i = n[0],
            s = n[1]), this.pauseSession(), this.sendPageShare(e, i, s);
        } else "onTabItemTap" === t && this.sendTabClick(n);
    }
  }, {
    key: "actionListener",
    value: function (e, t) {
      "tap" === e.type || "longpress" === e.type ? this.sendClick(e, t) : -1 !== ["change", "confirm", "blur"].indexOf(e.type) ? this.sendChange(e, t) : "getuserinfo" === e.type ? e.detail && e.detail.userInfo && this.setVisitor(e, t) : "getphonenumber" === e.type ? "decryptPhoneNumber" !== t && this.sendPhoneNumber(e, t) : "submit" === e.type && this.sendSubmit(e, t);
    }
  }, {
    key: "track",
    value: function (e, n) {
      if (null !== e && void 0 !== e && 0 !== e.length) {
        var i = {
          ty: "cstm",
          tm: this.currentPage.pagetimeStamp,
          ctm: Date.now(),
          p: this.currentPage.pageRoute,
          q: this.currentPage.pageQuery,
          n: e
        };
        null !== n && "object" == (void 0 === n ? "undefined" : t(n)) && (i.exmes = n),
          this._sendParams(i);
      }
    }
  }, {
    key: "sendChange",
    value: function (e, t) {
      var n = {
        ty: "chng",
        tm: this.currentPage.pagetimeStamp,
        ctm: Date.now(),
        p: this.currentPage.pageRoute,
        q: this.currentPage.pageQuery
      }, i = e.currentTarget, s = {};
      if (s.tl = i.dataset.title, s.href = i.dataset.src, s.fn = i.id + " #" + t, s.idx = i.dataset.index,
        -1 !== ["blur", "change", "confirm"].indexOf(e.type) && i.dataset.buryTrack) {
        if (!e.detail.value || 0 === e.detail.value.length) return;
        "string" == typeof e.detail.value ? s.v = e.detail.value : "[object Array]" === Object.prototype.toString.call(e.detail.value) && (s.v = e.detail.value.join(","));
      }
      "change" === e.type && e.detail && e.detail.source && "autoplay" === e.detail.source || (n.e = [s],
        this._sendParams(n));
    }
  }, {
    key: "sendPhoneNumber",
    value: function (e, t) {
      var n = {
        ty: "click",
        tm: this.currentPage.pagetimeStamp,
        ctm: Date.now(),
        p: this.currentPage.pageRoute,
        q: this.currentPage.pageQuery
      }, i = e.currentTarget, s = {};
      s.tl = e.detail.iv && e.detail.encryptedData ? "允许授权手机号" : "拒绝解密手机号", s.href = i.dataset.src,
        s.fn = i.id + " #" + t, s.idx = i.dataset.index, n.e = [s], this._sendParams(n);
    }
  }, {
    key: "setVisitor",
    value: function (e, t) {
      var n = {
        ty: "click",
        tm: this.currentPage.pagetimeStamp,
        ctm: Date.now(),
        p: this.currentPage.pageRoute,
        q: this.currentPage.pageQuery
      }, i = e.currentTarget, s = {};
      s.tl = i.dataset.title, s.href = i.dataset.src, s.fn = i.id + " #" + t, s.idx = i.dataset.index,
        s.userInfo = e.detail.userInfo, n.e = [s], this._sendParams(n);
    }
  }, {
    key: "sendPage",
    value: function () {
      var e = {
        ty: "page",
        tm: this.currentPage.pagetimeStamp,
        p: this.currentPage.pageRoute,
        q: this.currentPage.pageQuery,
        sc: this.scene,
        sid: this.sessionId
      };
      if (this.lastPageEvent) {
        var t = this.lastPageEvent, n = t.ty, i = t.tm, s = t.p, a = t.q, r = t.sc;
        e.refer = {
          ty: n,
          tm: i,
          p: s,
          q: a,
          sc: r
        };
      } else e.refer = this.scene ? "scn:" + this.scene : null;
      this._sendParams(e), this.lastPageEvent = e;
    }
  }, {
    key: "sendClick",
    value: function (e, t) {
      var n = {
        ty: "click",
        tm: this.currentPage.pagetimeStamp,
        ctm: Date.now(),
        p: this.currentPage.pageRoute,
        q: this.currentPage.pageQuery
      }, i = e.currentTarget, s = {};
      s.tl = i.dataset.title, s.href = i.dataset.src, s.fn = i.id + " #" + t, s.idx = i.dataset.index,
        n.e = [s], this._sendParams(n);
    }
  }, {
    key: "sendSubmit",
    value: function (e, t) {
      var n = {
        ty: "click",
        tm: this.currentPage.pagetimeStamp,
        ctm: Date.now(),
        p: this.currentPage.pageRoute,
        q: this.currentPage.pageQuery
      }, i = e.detail.target || e.buttonTarget || {
        dataset: {}
      }, s = {};
      s.tl = i.dataset.title, s.href = i.dataset.src, s.fn = i.id + " #" + t, s.idx = i.dataset.index,
        s.id = i.dataset.id, "string" == typeof e.detail.value ? s.v = e.detail.value : "[object Array]" === Object.prototype.toString.call(e.detail.value) && (s.v = e.detail.value.join(",")),
        n.e = [s], this._sendParams(n);
    }
  }, {
    key: "sendVisitEvent",
    value: function (e) {
      var t = this, n = this.tjWeiXin.systemInfo, i = {
        ty: "vst",
        tm: Date.now(),
        sys: n.system,
        os: o.getOS(n.version),
        ver: wx.getStorageSync("_tj_ver_"),
        mb: n.model.replace(/<.*>/, ""),
        sid: this.sessionId
      };
      if (e.length > 0) {
        var s = e[0];
        i.p = s.path, i.q = null, o.isObjectEmpty(s.query) || (i.q = this.currentPage._getQuery(s.query)),
          i.sc = "scn:" + (s.scene || null), this.scene = s.scene || null;
      }
      this.tjWeiXin.requestLocation().then(function (e) {
        null != e && (i.lat = e.latitude, t.latitude = e.latitude, i.lng = e.longitude,
          t.longitude = e.longitude), t.tjWeiXin.getNetworkType().then(function (e) {
            e && (i.nt = e.networkType, t.networkType = e.networkType);
          }), t._sendParams(i);
      });
    }
  }, {
    key: "sendTabClick",
    value: function (e) {
      var t = {
        ty: "click",
        tm: this.currentPage.pagetimeStamp,
        ctm: Date.now(),
        p: this.currentPage.pageRoute,
        q: this.currentPage.pageQuery
      }, n = e[0], i = {};
      i.tl = n.text, i.idx = n.index, i.href = n.pagePath, i.fn = "#onTabItemTap", t.e = [i],
        this._sendParams(t);
    }
  }, {
    key: "sendVisitCloseEvent",
    value: function () {
      var e = this.tjWeiXin.systemInfo, t = {
        ty: "vcls",
        tm: this.currentPage.pagetimeStamp,
        sys: e.system,
        os: o.getOS(e.version),
        ver: wx.getStorageSync("_tj_ver_"),
        mb: e.model.replace(/<.*>/, ""),
        p: this.currentPage.pageRoute,
        q: this.currentPage.pageQuery,
        sc: this.scene,
        lat: this.latitude,
        lng: this.longitude,
        nt: this.networkType,
        sid: this.sessionId
      };
      this._sendParams(t);
    }
  }, {
    key: "sendErrorEvent",
    value: function (e) {
      if (e && e.length > 0) {
        var t = e[0].split("\n");
        if (t && t.length > 1) {
          var n = t[1].split(";");
          if (n && n.length > 1) {
            var i = n[1].match(/at ([^ ]+) page (.*) function/), s = {
              key: t[0],
              error: n[0]
            };
            i && i.length > 2 && (s.page = i[1], s.function = i[2]), this._sendParams({
              ty: "verror",
              tm: this.currentPage.pagetimeStamp,
              p: this.currentPage.pageRoute,
              q: this.currentPage.pageQuery,
              sc: this.scene,
              sid: this.sessionId,
              exmes: s
            });
          }
        }
      }
    }
  }, {
    key: "sendPageShare",
    value: function (e, t, n) {
      var i = {
        ty: "click",
        tm: this.currentPage.pagetimeStamp,
        ctm: Date.now(),
        p: this.currentPage.pageRoute,
        q: this.currentPage.pageQuery,
        n: "onShareAppMessage"
      };
      i.exmes = {
        from: t ? t.from : void 0,
        target: t && t.target ? t.target.id : void 0,
        stl: n ? n.title : void 0,
        sph: n ? n.path : void 0
      }, this._sendParams(i);
    }
  }, {
    key: "_sendParams",
    value: function (e) {
      var t = this.tjWeiXin.systemInfo, n = {
        pf: a ? "wx" : r ? "zfb" : "",
        dm: t.platform,
        umes: {
          oid: this.tjWeiXin.openId,
          uid: this.tjWeiXin.userId,
          vid: this.tjWeiXin.uid
        },
        appid: wx.getStorageSync("_tj_appId_"),
        pid: 1003
      };
      this.uploader.upload(e, n);
    }
  }, {
    key: "sessionId",
    get: function () {
      return null === this._sessionId && (this._sessionId = o.guid()), this._sessionId;
    }
  }]), i;
}(), h = function () {
  function t() {
    e(this, t), this.queriesUrl = {};
  }
  return n(t, [{
    key: "pageInit",
    value: function (e) {
      this.pagetimeStamp = Date.now(), this.pageRoute = e.route, this.pageQuery = this.queriesUrl[e.route] ? this.queriesUrl[e.route] : null;
    }
  }, {
    key: "addQuery",
    value: function (e, t) {
      this.queriesUrl[e.route] = this._getQuery(t);
    }
  }, {
    key: "_getQuery",
    value: function (e) {
      return Object.keys(e).map(function (t) {
        return t + "=" + e[t];
      }).join("&");
    }
  }]), t;
}(), d = {
  defaultPageCallbacks: {},
  defaultAppCallbacks: {},
  appHandlers: ["onShow", "onHide", "onError"],
  pageHandlers: ["onLoad", "onShow", "onShareAppMessage", "onTabItemTap"],
  actionEventTypes: ["tap", "longpress", "blur", "change", "confirm", "getuserinfo", "submit", "getphonenumber"],
  hijack: function (e, t) {
    return function () {
      var n, i = arguments ? arguments[0] : void 0, s = Array.prototype.slice.call(arguments);
      if (n = t.apply(this, arguments), i && i.currentTarget && -1 != d.actionEventTypes.indexOf(i.type)) 
      try {

        console.log("=====>可放置监听方法", e, t);

      } catch (e) {

        console.error(e);
      }
      if (this._tj_app_ && -1 != d.appHandlers.indexOf(e)) 
        try {
          console.log("=====>可放置监听方法", e, t);
      } catch (e) {
        console.error(e);
      }
      if (this._tj_page_ && -1 != d.pageHandlers.indexOf(e)) {
        n && s.push(n);
        try {
          d.defaultPageCallbacks[e].apply(this, s);
        } catch (e) {
          console.error(e);
        }
      }
      return n;
    };
  },
  hijackComponent: function (e, t) {
    return function () {
      var n = arguments ? arguments[0] : void 0;
      if (n && n.currentTarget && -1 != d.actionEventTypes.indexOf(n.type)) try {
        d.sendData.actionListener(n, e);
      } catch (e) {
        console.error(e);
      }
      return t.apply(this, arguments);
    };
  },
  argumentsHandler: function (e) {
    for (var t in e) "function" == typeof e[t] && (e[t] = this.hijack(t, e[t]));
    return e._tj_app_ && d.appHandlers.map(function (t) {
      e[t] || (e[t] = d.defaultAppCallbacks[t]);
    }), e._tj_page_ && d.pageHandlers.map(function (t) {
      e[t] || (e[t] = d.defaultPageCallbacks[t]);
    }), e;
  },
  comArgumentsHandler: function (e) {
    if (e.methods) {
      var t = e.methods;
      for (var n in t) "function" == typeof t[n] && (e.methods[n] = this.hijackComponent(n, t[n]));
    }
    return e;
  },
  initFunction: function (e) {
    var t = this;
    this.sendData = e, this.appHandlers.forEach(function (n) {
      t.defaultAppCallbacks[n] = function () {
        e.appListener(this, n, arguments);
      };
    }), this.pageHandlers.forEach(function (n) {
      t.defaultPageCallbacks[n] = function () {
        e.pageListener(this, n, arguments);
      };
    });
  }
}, p = new (function () {
  function t() {
    e(this, t), this.uploader = null, this.tjWeiXin = null, this.sendData = null;
  }
  return n(t, [{
    key: "init",
    value: function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      this.domain = e, wx.setStorageSync("_tj_burydomain_", this.domain), this.smallAppVer = t.version,
        wx.setStorageSync("_tj_ver_", this.smallAppVer), this.userInfoKey = t.userInfoKey,
        wx.setStorageSync("_tj_userInfoKey_", this.userInfoKey), this.appId = t.appId, wx.setStorageSync("_tj_appId_", this.appId),
        a && this.initClass();
    }
  }, {
    key: "initClass",
    value: function () {
      this.uploader || (this.uploader = new u()), this.tjWeiXin || (this.tjWeiXin = new c(this)),
        this.sendData || (this.sendData = new l(this)), this._start();
    }
  }, {
    key: "proxy",
    value: function (e, t) {
      try {
        if (this.sendData && this.sendData[e]) return this.sendData[e].apply(this.sendData, t);
      } catch (e) {
        console.error(e);
      }
    }
  }, {
    key: "_start",
    value: function () {
      d.initFunction(this.sendData);
    }
  }]), t;
}())();

console.log("init tjdata.."), exports.default = {
  databurying: p,
  configFunction: d
};