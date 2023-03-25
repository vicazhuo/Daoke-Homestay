var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
  return typeof t;
} : function (t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = function () {
  var e = {},
    o = function (o, r) {

      if (!e[o]) {
        return false;//require(r);
      }
      if (!e[o].status) {
        var n = {
          exports: {}
        };
        e[o].status = 1, e[o].func(e[o].req, n, n.exports), "object" === t(n.exports) ? (Object.keys(n.exports).forEach(function (t) {
          e[o].m.exports[t] = n.exports[t];
        }), n.exports.__esModule && Object.defineProperty(e[o].m.exports, "__esModule", {
          value: !0
        })) : e[o].m.exports = n.exports;
      }
      return e[o].m.exports;
    };
  return function (t, o, r) {
    var n = {
      exports: {}
    };
    e[t] = {
      status: 0,
      func: o,
      req: r,
      m: n
    };
  }(1553225125229, function (t, e, o) {
    function r(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    var n = {
      wx: "途家微信小程序",
      zfb: "途家支付宝小程序"
    }, s = function () {
      function t(e) {
        var o = e.platform, s = e.mode;
        r(this, t), o = o || "wx", this._site = n[o], this._mode = s, this._reportUrl = "build" === s ? "https://tracelog.tujia.com" : "https://tracelog.fvt.tujia.com";
      }
      return t.prototype.tfmReport = function (t) {
        t.pid, t.page, t.type, t.keyReason, t.level, t.log, t.data, t.site, t.userId;
        var e = this.getPage() || {}, o = {
          pid: 1002,
          page: e.route || "",
          type: 1,
          log: "",
          keyReason: "",
          level: 1,
          data: e.options || "",
          site: this._site,
          userId: ""
        };
        Object.assign(o, arguments[0]), console.log("error data:", o), wx.request({
          url: this._reportUrl + "/webErrorLog",
          method: "post",
          data: o
        });
      }, t.prototype.tfmErrorReport = function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (t) {
          var o = {
            type: 1,
            log: t,
            keyReason: this.getKeyReason(t)
          };
          Object.assign(o, e), this.tfmReport(o);
        }
      }, t.prototype.getPage = function () {
        if (!getCurrentPages) return "";
        var t = getCurrentPages();
        return t.length ? t[t.length - 1] : "";
      }, t.prototype.getKeyReason = function (t) {
        if (t) {
          var e = "";
          try {
            e = t.split("\n").slice(0, 4).join(";");
          } catch (t) { }
          return e || t;
        }
      }, t;
    }();
    e.exports = s;
  }, function (t) {
    return o({}[t], t);
  }), o(1553225125229);
}();