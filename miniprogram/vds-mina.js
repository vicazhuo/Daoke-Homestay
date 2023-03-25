function e(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
  return e && e.$attrs ? e.$attrs.mpcomid : "0";
}

function i(e, i) {
  void 0 === i && (i = []);
  var n = i.slice(1);
  return n.length ? n.reduce(function (e, i) {
    for (var n = e.$children.length, o = 0; n > o; o++) {
      var s = e.$children[o];
      if (t(s) === i) return e = s;
    }
    return e;
  }, e) : e;
}

function n(e, t, i) {
  void 0 === i && (i = []);
  var o = [];
  if (!e || !e.tag) return o;
  var s = e || {}, r = s.data;
  void 0 === r && (r = {});
  var a = s.children;
  void 0 === a && (a = []);
  var u = s.componentInstance;
  u ? Object.keys(u.$slots).forEach(function (e) {
    var s = u.$slots[e];
    (Array.isArray(s) ? s : [s]).forEach(function (e) {
      o = o.concat(n(e, t, i));
    });
  }) : a.forEach(function (e) {
    o = o.concat(n(e, t, i));
  });
  var l = r.attrs, h = r.on;
  return l && h && l.eventid === t && i.forEach(function (e) {
    var t = h[e];
    "function" == typeof t ? o.push(t) : Array.isArray(t) && (o = o.concat(t));
  }), o;
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
  return typeof e;
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, s = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(), r = function () {
  function t(i, n) {
    var app = getApp();
    e(this, t), this.host = "https://api.05178.top", this.messageQueue = [], this.uploadingQueue = [],
      this.uploadTimer = null, this.projectId = i, this.appId = n, this.url = this.host + "/api/minsu.uploaddata/collect" + "/appid/" + this.appId;
  }
  return s(t, [{
    key: "setHost",
    value: function (e) {
      0 != e.indexOf("http") && (this.host = "https://" + e), this.url = this.host + "/api/minsu.uploaddata/collect" + "/appid/" + this.appId;
    }
  }, {
    key: "upload",
    value: function (e) {
      var t = this;
      this.messageQueue.push(e), this.uploadTimer || (this.uploadTimer = setTimeout(function () {
        t._flush(), t.uploadTimer = null;
      }, 1e3));
    }
  }, {
    key: "forceFlush",
    value: function () {
      this.uploadTimer && (clearTimeout(this.uploadTimer), this.uploadTimer = null), this._flush();
    }
  }, {
    key: "_flush",
    value: function () {
      var e = this;
      this.uploadingQueue = this.messageQueue.slice(), this.messageQueue = [], this.uploadingQueue.length > 0 && wx.request({
        url: this.url + "?stm=" + Date.now(),
        header: {
          "content-type": "application/json"
        },
        method: "POST",
        data: this.uploadingQueue,
        success: function () {
          e.messageQueue.length > 0 && e._flush();
        },
        fail: function () {
          e.messageQueue = e.uploadingQueue.concat(e.messageQueue);
        }
      });
    }
  }]), t;
}(), a = {
  sdkVer: "1.5",
  devVer: 1,
  guid: function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
      var t = 16 * Math.random() | 0;
      return ("x" == e ? t : 3 & t | 8).toString(16);
    });
  },
  getScreenHeight: function (e) {
    return Math.round(e.screenHeight * e.pixelRatio);
  },
  getScreenWidth: function (e) {
    return Math.round(e.screenWidth * e.pixelRatio);
  },
  getOS: function (e) {
    if (e) {
      var t = e.toLowerCase();
      return -1 != t.indexOf("android") ? "Weixin-Android" : -1 != t.indexOf("ios") ? "Weixin-iOS" : e;
    }
  },
  getOSV: function (e) {
    return "Weixin " + e;
  },
  isEmpty: function (e) {
    for (var t in e) if (e.hasOwnProperty(t)) return !1;
    return !0;
  }
}, u = function () {
  function t() {
    e(this, t), this.queries = {};
  }
  return s(t, [{
    key: "touch",
    value: function (e) {
      this.path = e.route, this.time = Date.now(), this.query = this.queries[e.route] ? this.queries[e.route] : void 0;
    }
  }, {
    key: "addQuery",
    value: function (e, t) {
      this.queries[e.route] = t ? this._getQuery(t) : null;
    }
  }, {
    key: "_getQuery",
    value: function (e) {
      return Object.keys(e).map(function (t) {
        return t + "=" + e[t];
      }).join("&");
    }
  }]), t;
}(), l = {
  tap: ["tap", "click"],
  longtap: ["longtap"],
  input: ["input"],
  blur: ["change", "blur"],
  submit: ["submit"],
  focus: ["focus"]
}, h = /^function[^\(]*\([^\)]+\).*[^\.]+\.([^\(]+)\(.*/, c = function () {
  function t(i) {
    e(this, t), this.vueVM = i;
  }
  return s(t, [{
    key: "getHandle",
    value: function (e) {
      var t = e.type, o = e.target;
      void 0 === o && (o = {});
      var s = (e.currentTarget || o).dataset;
      void 0 === s && (s = {});
      var r = s.comkey;
      void 0 === r && (r = "");
      var a = s.eventid, u = i(this.vueVM, r.split(","));
      if (u) {
        var c = n(u._vnode, a, l[t] || [t]);
        if (c.length) {
          var g = c[0];
          if (g.isProxied) return g.proxiedName;
          try {
            var p = ("" + g).replace("\n", "");
            if (p.match(h)) {
              var d = h.exec(p);
              if (d && d.length > 1) return d[1];
            }
          } catch (e) { }
          return g.name;
        }
      }
    }
  }]), t;
}(), g = function () {
  function t(i) {
    e(this, t), this.growingio = i, this.weixin = i.weixin, this.currentPage = new u(),
      this.scene = null, this._sessionId = null, this.cs1 = null, this.lastPageEvent = void 0,
      this.lastCloseTime = null, this.keepAlive = i.keepAlive, this.isPauseSession = !1,
      this.CLICK_TYPE = {
        tap: "clck",
        longpress: "lngprss",
        longtap: "lngprss"
      };
  }
  return s(t, [{
    key: "resetSessionId",
    value: function () {
      this._sessionId = null;
    }
  }, {
    key: "pauseSession",
    value: function () {
      this.isPauseSession = !0;
    }
  }, {
    key: "getVisitorId",
    value: function () {
      return this.weixin.uid;
    }
  }, {
    key: "getUserId",
    value: function () {
      return this.cs1;
    }
  }, {
    key: "setUserId",
    value: function (e) {
      var t = e + "";
      t && 100 > t.length && (this.cs1 = t, this.lastPageEvent && this._sendEvent(this.lastPageEvent));
    }
  }, {
    key: "clearUserId",
    value: function () {
      this.cs1 = null;
    }
  }, {
    key: "appListener",
    value: function (e, t, i) {
      this.isPauseSession || (this.growingio.debug && console.log("App.", t, Date.now()),
        "onShow" == t ? (this.lastCloseTime && Date.now() - this.lastCloseTime <= this.keepAlive || this.resetSessionId(),
          this.lastPageEvent = void 0, this.sendVisitEvent(i)) : "onHide" == t ? (this.growingio.forceFlush(),
            this.weixin.syncStorage(), this.isPauseSession || (this.lastCloseTime = Date.now(),
              this.sendVisitCloseEvent())) : "onError" == t && this.sendErrorEvent(i));
    }
  }, {
    key: "pageListener",
    value: function (e, t, i) {
      if (this.growingio.debug && console.log("Page.", e.route, "#", t, Date.now()), "onShow" === t) this.isPauseSession ? this.isPauseSession = !1 : (this.currentPage.touch(e),
        this.sendPage(e)); else if ("onLoad" === t) a.isEmpty(n = i[0]) || this.currentPage.addQuery(e, n); else if ("onShareAppMessage" === t) {
          var n = null, o = null;
          2 > i.length ? 1 === i.length && (i[0].from ? n = i[0] : i[0].title && (o = i[0])) : (n = i[0],
            o = i[1]), this.pauseSession(), this.sendPageShare(e, n, o);
        } else "onTabItemTap" === t && this.sendTabClick(i[0]);
    }
  }, {
    key: "actionListener",
    value: function (e, t) {
      if ("handleProxy" === t && this.growingio.vueRootVMs && this.growingio.vueRootVMs[this.currentPage.path]) {
        var i = new c(this.growingio.vueRootVMs[this.currentPage.path]).getHandle(e);
        i && (t = i);
      }
      this.growingio.debug && console.log("Click on ", t, Date.now()), "tap" === e.type || "longpress" === e.type ? this.sendClick(e, t) : -1 !== ["change", "confirm", "blur"].indexOf(e.type) ? this.sendChange(e, t) : "getuserinfo" === e.type && (this.sendClick(e, t),
        e.detail && e.detail.userInfo && this.setVisitor(e.detail.userInfo));
    }
  }, {
    key: "handleWebViewMessages",
    value: function (e) {
      console.log(e);
    }
  }, {
    key: "track",
    value: function (e, t) {
      if (null !== e && void 0 !== e && 0 !== e.length) {
        var i = {
          t: "cstm",
          ptm: this.currentPage.time,
          p: this.currentPage.path,
          q: this.currentPage.query,
          n: e
        };
        null !== t && "object" == (void 0 === t ? "undefined" : o(t)) && (i.var = t), this._sendEvent(i);
      }
    }
  }, {
    key: "identify",
    value: function (e, t) {
      void 0 !== e && 0 !== e.length && (this.growingio.login(e), this._sendEvent({
        t: "vstr",
        var: {
          openid: e,
          unionid: t
        }
      }));
    }
  }, {
    key: "setVisitor",
    value: function (e) {
      this._sendEvent({
        t: "vstr",
        var: e
      });
    }
  }, {
    key: "setUser",
    value: function (e) {
      this._sendEvent({
        t: "ppl",
        var: e
      });
    }
  }, {
    key: "setPage",
    value: function (e) {
      this._sendEvent({
        t: "pvar",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query,
        var: e
      });
    }
  }, {
    key: "setEvar",
    value: function (e) {
      this._sendEvent({
        t: "evar",
        var: e
      });
    }
  }, {
    key: "sendVisitEvent",
    value: function (e) {
      var t = this, i = this.weixin.systemInfo, n = {
        t: "vst",
        tm: Date.now(),
        av: a.sdkVer,
        db: i.brand,
        dm: i.model.replace(/<.*>/, ""),
        sh: a.getScreenHeight(i),
        sw: a.getScreenWidth(i),
        os: a.getOS(i.platform),
        osv: a.getOSV(i.version),
        l: i.language
      };
      if (this.growingio.appVer && (n.cv = this.growingio.appVer + ""), e.length > 0) {
        var o = e[0];
        n.p = o.path, a.isEmpty(o.query) || (n.q = this.currentPage._getQuery(o.query)),
          n.ch = "scn:" + o.scene, o.referrerInfo && o.referrerInfo.appId && (n.rf = o.referrerInfo.appId),
          this.scene = o.scene;
      }
      this.weixin.requestLocation().then(function () {
        null != t.weixin.location && (n.lat = t.weixin.location.latitude, n.lng = t.weixin.location.longitude),
          t.weixin.getNetworkType().then(function (e) {
            e && (n.nt = e.networkType), t._sendEvent(n);
          });
      });
    }
  }, {
    key: "sendVisitCloseEvent",
    value: function () {
      this._sendEvent({
        t: "cls",
        p: this.currentPage.path,
        q: this.currentPage.query
      });
    }
  }, {
    key: "sendErrorEvent",
    value: function (e) {
      if (e && e.length > 0) {
        var t = e[0].split("\n");
        if (t && t.length > 1) {
          var i = t[1].split(";");
          if (i && i.length > 1) {
            var n = i[1].match(/at ([^ ]+) page (.*) function/), o = {
              key: t[0],
              error: i[0]
            };
            n && n.length > 2 && (o.page = n[1], o.function = n[2]), this._sendEvent({
              t: "cstm",
              ptm: this.currentPage.time,
              p: this.currentPage.path,
              q: this.currentPage.query,
              n: "onError",
              var: o
            });
          }
        }
      }
    }
  }, {
    key: "sendPage",
    value: function (e) {
      var t = {
        t: "page",
        tm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query
      };
      t.rp = this.lastPageEvent ? this.lastPageEvent.p : this.scene ? "scn:" + this.scene : null,
        e.data && e.data.pvar && (t.var = e.data.pvar);
      var i = this.weixin.getPageTitle(e);
      i && i.length > 0 && (t.tl = i), this._sendEvent(t), this.lastPageEvent = t;
    }
  }, {
    key: "sendPageShare",
    value: function (e, t, i) {
      this._sendEvent({
        t: "cstm",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query,
        n: "onShareAppMessage",
        var: {
          from: t ? t.from : void 0,
          target: t && t.target ? t.target.id : void 0,
          title: i ? i.title : void 0,
          path: i ? i.path : void 0
        }
      });
    }
  }, {
    key: "sendClick",
    value: function (e, t) {
      var i = {
        t: this.CLICK_TYPE[e.type],
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query
      }, n = e.currentTarget, o = {
        x: n.id + "#" + t
      };
      n.dataset.title ? o.v = n.dataset.title : n.dataset.src && (o.h = n.dataset.src),
        void 0 !== n.dataset.index && (o.idx = n.dataset.index), i.e = [o], this._sendEvent(i);
    }
  }, {
    key: "sendChange",
    value: function (e, t) {
      var i = {
        t: "chng",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query
      }, n = e.currentTarget, o = {
        x: n.id + "#" + t
      };
      if (-1 !== ["blur", "change", "confirm"].indexOf(e.type) && n.dataset.growingTrack) {
        if (!e.detail.value || 0 === e.detail.value.length) return;
        "string" == typeof e.detail.value ? o.v = e.detail.value : "[object Array]" === Object.prototype.toString.call(e.detail.value) && (o.v = e.detail.value.join(","));
      }
      "change" === e.type && e.detail && e.detail.source && "autoplay" === e.detail.source || (i.e = [o],
        this._sendEvent(i));
    }
  }, {
    key: "sendTabClick",
    value: function (e) {
      this._sendEvent({
        t: "clck",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query,
        e: [{
          x: "#onTabItemTap",
          v: e.text,
          idx: e.index,
          h: e.pagePath
        }]
      });
    }
  }, {
    key: "_sendEvent",
    value: function (e) {
      e.u = this.weixin.uid, e.s = this.sessionId, e.tm = e.tm || Date.now(), e.d = this.growingio.appId,
        e.b = "MinP", null !== this.cs1 && (e.cs1 = this.cs1), this.growingio.upload(e);
    }
  }, {
    key: "sessionId",
    get: function () {
      return null === this._sessionId && (this._sessionId = a.guid()), this._sessionId;
    }
  }]), t;
}(), p = function () {
  function t(i) {
    e(this, t), this._location = null, this._systemInfo = null, this._uid = wx.getStorageSync("_growing_uid_"),
      this._uid && 36 !== this._uid.length && (i.forceLogin = !1), this._esid = wx.getStorageSync("_growing_esid_");
  }
  return s(t, [{
    key: "syncStorage",
    value: function () {
      wx.getStorageSync("_growing_uid_") || wx.setStorageSync("_growing_uid_", this._uid);
    }
  }, {
    key: "requestLocation",
    value: function () {
      var e = this;
      return new Promise(function (t) {
        e._getSetting().then(function (i) {
          if (!(i && i.authSetting && i.authSetting["scope.userLocation"])) return t(null);
          e._getLocation().then(function (i) {
            return e._location = i, t(i);
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
    key: "getPageTitle",
    value: function (e) {
      var t = "";
      try {
        if (e.data.title && e.data.title.length > 0 && (t = Array.isArray(e.data.title) ? e.data.title.join(" ") : e.data.title),
          0 === t.length && __wxConfig) {
          if (__wxConfig.tabBar) {
            var i = __wxConfig.tabBar.list.find(function (t) {
              return t.pathPath == e.route || t.pagePath == e.route + ".html";
            });
            i && i.text && (t = i.text);
          }
          if (0 == t.length) {
            var n = __wxConfig.page[e.route] || __wxConfig.page[e.route + ".html"];
            t = n ? n.window.navigationBarTitleText : __wxConfig.global.window.navigationBarTitleText;
          }
        }
      } catch (e) { }
      return t;
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
    key: "esid",
    set: function (e) {
      this._esid = e, wx.setStorageSync("_growing_esid_", this._esid);
    },
    get: function () {
      return this._esid || (this._esid = 1), this._esid;
    }
  }, {
    key: "uid",
    set: function (e) {
      this._uid = e, wx.setStorageSync("_growing_uid_", this._uid);
    },
    get: function () {
      return this._uid || (this.uid = a.guid()), this._uid;
    }
  }]), t;
}(), d = {
  defaultPageCallbacks: {},
  defaultAppCallbacks: {},
  appHandlers: ["onShow", "onHide", "onError"],
  pageHandlers: ["onLoad", "onShow", "onShareAppMessage", "onTabItemTap"],
  actionEventTypes: ["tap", "longpress", "blur", "change", "confirm", "getuserinfo"],
  originalPage: Page,
  originalApp: App,
  originalComponent: Component,
  hook: function (e, t) {
    return function () {
      var i, n = arguments ? arguments[0] : void 0;
      if (n && n.currentTarget && -1 != d.actionEventTypes.indexOf(n.type)) try {
        d.observer.actionListener(n, e);
      } catch (e) {
        console.error(e);
      }
      if (this._growing_app_ && "onShow" !== e ? i = t.apply(this, arguments) : this._growing_page_ && -1 === ["onShow", "onLoad", "onTabItemTap"].indexOf(e) && (i = t.apply(this, arguments)),
        this._growing_app_ && -1 !== d.appHandlers.indexOf(e)) {
        try {
          d.defaultAppCallbacks[e].apply(this, arguments);
        } catch (e) {
          console.error(e);
        }
        "onShow" === e && (i = t.apply(this, arguments));
      }
      if (this._growing_page_ && -1 !== d.pageHandlers.indexOf(e)) {
        var o = Array.prototype.slice.call(arguments);
        i && o.push(i);
        try {
          d.defaultPageCallbacks[e].apply(this, o);
        } catch (e) {
          console.error(e);
        }
        if (-1 !== ["onShow", "onLoad", "onTabItemTap"].indexOf(e)) i = t.apply(this, arguments); else {
          var s = d.observer.growingio;
          s && s.followShare && i.path && (i.path = -1 === i.path.indexOf("?") ? i.path + "?suid=" + s.weixin.uid : i.path + "&suid=" + s.weixin.uid);
        }
      }
      return i;
    };
  },
  hookComponent: function (e, t) {
    return function () {
      var i = arguments ? arguments[0] : void 0;
      if (i && i.currentTarget && -1 != d.actionEventTypes.indexOf(i.type)) try {
        d.observer.actionListener(i, e);
      } catch (e) {
        console.error(e);
      }
      return t.apply(this, arguments);
    };
  },
  instrument: function (e) {
    for (var t in e) "function" == typeof e[t] && (e[t] = this.hook(t, e[t]));
    return e._growing_app_ && d.appHandlers.map(function (t) {
      e[t] || (e[t] = d.defaultAppCallbacks[t]);
    }), e._growing_page_ && d.pageHandlers.map(function (t) {
      e[t] || "onShareAppMessage" === t || (e[t] = d.defaultPageCallbacks[t]);
    }), e;
  },
  instrumentComponent: function (e) {
    if (e.methods) {
      var t = e.methods;
      for (var i in t) "function" == typeof t[i] && (e.methods[i] = this.hookComponent(i, t[i]));
    }
    return e;
  },
  GrowingPage: function (e) {
    e._growing_page_ = !0, d.originalPage(d.instrument(e));
  },
  GrowingComponent: function (e) {
    e._growing_component_ = !0, d.originalComponent(d.instrumentComponent(e));
  },
  GrowingApp: function (e) {
    e._growing_app_ = !0, d.originalApp(d.instrument(e));
  },
  initInstrument: function (e) {
    d.observer = e, d.pageHandlers.forEach(function (e) {
      d.defaultPageCallbacks[e] = function () {
        this.__route__ && d.observer.pageListener(this, e, arguments);
      };
    }), d.appHandlers.forEach(function (e) {
      d.defaultAppCallbacks[e] = function () {
        d.observer.appListener(this, e, arguments);
      };
    }), Page = function () {
      return d.GrowingPage(arguments[0]);
    }, App = function () {
      return d.GrowingApp(arguments[0]);
    }, Component = function () {
      return d.GrowingComponent(arguments[0]);
    };
  }
}, f = new (function () {
  function t() {
    e(this, t), this.uploadingMessages = [];
  }
  return s(t, [{
    key: "init",
    value: function (e, t) {
      var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      this.projectId = e, this.appId = t, this.appVer = i.version, this.debug = i.debug || !1,
        this.forceLogin = i.forceLogin || !1, this.followShare = i.followShare || !1, this.keepAlive = +i.keepAlive || 0,
        this.weixin = new p(this), this.esid = this.weixin.esid, this.uploader = new r(this.projectId, this.appId),
        this.observer = new g(this), i.vue && (this.vueRootVMs = {}, this._proxyVue(i.vue)),
        this._start();
    }
  }, {
    key: "setHost",
    value: function (e) {
      this.uploader.setHost(e);
    }
  }, {
    key: "setVue",
    value: function (e) {
      this.vueRootVMs || (this.vueRootVMs = {}), this._proxyVue(e);
    }
  }, {
    key: "login",
    value: function (e) {
      if (this.forceLogin) {
        var t = !0, i = !1, n = void 0;
        try {
          for (var o, s = (this.weixin.uid = e, this.forceLogin = !1, this.uploadingMessages)[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
            var r = o.value;
            r.u = e, this._upload(r);
          }
        } catch (e) {
          i = !0, n = e;
        } finally {
          try {
            !t && s.return && s.return();
          } finally {
            if (i) throw n;
          }
        }
      }
    }
  }, {
    key: "upload",
    value: function (e) {
      this.forceLogin ? this.uploadingMessages.push(e) : this._upload(e);
    }
  }, {
    key: "forceFlush",
    value: function () {
      this.weixin.esid = this.esid, this.uploader.forceFlush();
    }
  }, {
    key: "proxy",
    value: function (e, t) {
      try {
        if ("setVue" === e) this.setVue(t[0]); else if (this.observer && this.observer[e]) return this.observer[e].apply(this.observer, t);
      } catch (e) {
        console.error(e);
      }
    }
  }, {
    key: "_start",
    value: function () {
      d.initInstrument(this.observer);
      try {
        global && global["__core-js_shared__"] && (global.App = App, global.Page = Page);
      } catch (e) {
        console.error(e);
      }
    }
  }, {
    key: "_upload",
    value: function (e) {
      e.esid = this.esid++ , this.debug && console.info("generate new event", JSON.stringify(e, 0, 2)),
        this.uploader.upload(e);
    }
  }, {
    key: "_proxyVue",
    value: function (e) {
      if (void 0 !== e.mixin) {
        var t = this;
        e.mixin({
          created: function () {
            if (this.$options.methods) {
              var e = Object.keys(this.$options.methods), t = !0, i = !1, n = void 0;
              try {
                for (var o, s = Object.keys(this)[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
                  var r = o.value;
                  0 > e.indexOf(r) || (Object.defineProperty(this[r], "proxiedName", {
                    value: r
                  }), Object.defineProperty(this[r], "isProxied", {
                    value: !0
                  }));
                }
              } catch (e) {
                i = !0, n = e;
              } finally {
                try {
                  !t && s.return && s.return();
                } finally {
                  if (i) throw n;
                }
              }
            }
          },
          beforeMount: function () {
            var e = this.$root;
            e.$mp && "page" === e.$mp.mpType && e.$mp.page && (t.vueRootVMs[e.$mp.page.route] = e);
          }
        });
      }
    }
  }]), t;
}())();

console.log("init growingio..."), module.exports = function () {
  var e = arguments[0];
  if (e) {
    var t = 2 > arguments.length ? [] : [].slice.call(arguments, 1);
    if ("init" !== e) return f.proxy(e, t);
    t.length < 2 ? console.log("初始化 GrowingIO SDK 失败。请使用 gio('init', '你的GrowingIO项目ID', '你的微信APP_ID', options);") : f.init(t[0], t[1], t[2]);
  }
};