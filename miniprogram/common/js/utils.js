function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

function e(t) {
  if (Array.isArray(t)) {
    for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
    return r;
  }
  return Array.from(t);
}

function r(t, e) {
  var r = {};
  for (var n in t) e.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(t, n) && (r[n] = t[n]);
  return r;
}

function n(t, e) {
  var r = t.split("-"), n = r[0], a = r[1], i = r[2], o = e.split("-"), u = o[0], s = o[1], l = o[2];
  if (n < u) return -1;
  if (n > u) return 1;
  if (n == u) {
    if (a < s) return -1;
    if (a > s) return 1;
    if (a == s) {
      if (i < l) return -1;
      if (i > l) return 1;
      if (i == l) return 0;
    }
  }
}

function a(t) {
  if (t) {
    var e = t.split("?");
    console.log("hhhh", e)
    if (!(e.length > 2)) {
      for (var r = e[e.length - 1], n = /([^=&\s]+)[=\s]*([^&\s]*)/g, a = {}; n.exec(r);) a[RegExp.$1] = RegExp.$2;
      return a;
    }
  }
}

function i(t, e) {
  var r = 3e3 * Math.PI / 180, n = e - .0065, a = t - .006, i = Math.sqrt(n * n + a * a) - 2e-5 * Math.sin(a * r), o = Math.atan2(a, n) - 3e-6 * Math.cos(n * r);
  return e = i * Math.cos(o), t = i * Math.sin(o), {
    latitude: t,
    longitude: e
  };
}

function i(t, e) {
  var r = 3e3 * Math.PI / 180, n = e - .0065, a = t - .006, i = Math.sqrt(n * n + a * a) - 2e-5 * Math.sin(a * r), o = Math.atan2(a, n) - 3e-6 * Math.cos(n * r);
  return e = i * Math.cos(o), t = i * Math.sin(o), {
    latitude: t,
    longitude: e
  };
}

function o(t, e) {
  var r = 3e3 * Math.PI / 180, n = e, a = t, i = Math.sqrt(n * n + a * a) + 2e-5 * Math.sin(a * r), o = Math.atan2(a, n) + 3e-6 * Math.cos(n * r);
  return e = i * Math.cos(o) + .0065, t = i * Math.sin(o) + .006, {
    latitude: t,
    longitude: e
  };
}

function u() {
  return y.statusBarHeight + 96 * (y.windowWidth / 750);
}

function s(t, e) {
  var r = e || y.SDKVersion;
  if (t === r) return !0;
  for (var n = (r = r.split(".")).length, a = t.split("."), i = 0; i < n; i++) {
    if (r[i] = r[i] || 0, r[i] > a[i]) return !0;
    if (r[i] < a[i]) return !1;
  }
  return !0;
}

function l() {
  var t = getCurrentPages();
  return t[t.length - 2] || null;
}

var c = Object.assign || function (t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e];
    for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
  }
  return t;
}, g = t(require("./base64")), f = t(require("../../apiFetch/../apiFetch/searchApi")), d = t(require("./log")), p = t(require("./timeStorage")), h = t(require("./event")), m = t(require("../../apiFetch/commonApi"));

getApp();

Date.prototype.addDays = function (t) {
  return this.setTime(this.getTime() + 24 * Number(t) * 60 * 60 * 1e3), this;
};

var w = "zfb", M = true || "wx" === "wx", y = function () {
  var t = wx.getSystemInfoSync();
  return t.platform = t.platform.toLowerCase(), t.isNeedShiPei = "ios" === t.platform && (414 == t.screenWidth || 375 == t.screenWidth) && t.screenHeight > 800,
    t.isAliIos = w && "ios" === t.platform, t.isAliAndroid = w && "android" === t.platform,
    t.radio = t.windowWidth / 750, t.isCanUseNavBar = M && s("2.4.3", t.SDKVersion) && ("devtools" === t.brand || s("7.0.0", t.version)),
    t;
}(), b = u();

module.exports = {
  event: h.default,
  timeStorage: p.default,
  dateFormat: function (t, e) {
    var r = {
      "M+": t.getMonth() + 1,
      "d+": t.getDate(),
      "h+": t.getHours(),
      "m+": t.getMinutes(),
      "s+": t.getSeconds(),
      "q+": Math.floor((t.getMonth() + 3) / 3),
      S: t.getMilliseconds()
    };
    /(y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var n in r) new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? r[n] : ("00" + r[n]).substr(("" + r[n]).length)));
    return e;
  },
  strFormat: function (t, e) {
    var r = /\{([\w\.]+)\}/g, n = /^\d+$/, a = r.compile ? r.compile(r.source, "g") || r : r, i = Object.prototype.toString, o = Array.prototype.slice;
    if (void 0 === e || null === e) return string;
    var u = !0, s = i.call(e), l = "[object Object]" === s ? (u = !1, e) : "[object Array]" === s ? source : o.call(arguments, 1), c = u ? l.length : 0;
    return String(t).replace(a, function (t, e) {
      var r, a, i;
      if (n.test(e) && u) return (r = parseInt(e, 10)) < c ? l[r] : t;
      a = e.split("."), i = l;
      for (var o = 0; o < a.length; o++) i = i[a[o]];
      return void 0 === i ? t : i;
    });
  },
  checkMobile: function (t) {
    return !!new RegExp(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/).test(t);
  },
  checkIdCard: function (t, e) {
    var e = e || "证件号码", r = {};
    r.msg = "", r.rst = !0;
    var a = t.length;
    if (15 != a && 18 != a) return r.msg = e + "位数有误", r.rst = !1, r;
    var i, o, u, s;
    if (15 == a ? /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/.test(t) ? (i = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/),
      o = t.match(i), u = (s = new Date("19" + o[2] + "/" + o[3] + "/" + o[4])).getYear() == Number(o[2]) && s.getMonth() + 1 == Number(o[3]) && s.getDate() == Number(o[4])) : (r.msg = e + "位数有误",
        r.rst = !1) : 18 == a && (/^(\d{6})(19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X|x)?$/.test(t) ? (i = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/),
          o = t.match(i), u = (s = new Date(o[2] + "/" + o[3] + "/" + o[4])).getFullYear() == Number(o[2]) && s.getMonth() + 1 == Number(o[3]) && s.getDate() == Number(o[4])) : (r.msg = e + "格式有误",
            r.rst = !1)), u) {
      var l = new Date().getFullYear(), c = new Date().getMonth(), g = new Date().getDate();
      if (n(s.getFullYear() + "-" + s.getMonth() + "-" + s.getDate(), l - 102 + "-" + c + "-" + g) < 0 || n(s.getFullYear() + "-" + s.getMonth() + "-" + s.getDate(), l + "-" + c + "-" + g) > 0) r.msg = e + "格式有误",
        r.rst = !1; else {
        if (15 == a) return r;
        null == {
          11: "北京",
          12: "天津",
          13: "河北",
          14: "山西",
          15: "内蒙古",
          21: "辽宁",
          22: "吉林",
          23: "黑龙江",
          31: "上海",
          32: "江苏",
          33: "浙江",
          34: "安徽",
          35: "福建",
          36: "江西",
          37: "山东",
          41: "河南",
          42: "湖北",
          43: "湖南",
          44: "广东",
          45: "广西",
          46: "海南",
          50: "重庆",
          51: "四川",
          52: "贵州",
          53: "云南",
          54: "西藏",
          61: "陕西",
          62: "甘肃",
          63: "青海",
          64: "宁夏",
          65: "新疆",
          71: "台湾",
          81: "香港",
          82: "澳门",
          91: "国外"
        }[parseInt(t.substr(0, 2))] && (r.msg = e + "格式有误", r.rst = !1);
        for (var f = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], d = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2], p = 0, h = 0; h < t.length - 1; h++) p += parseInt(t.substr(h, 1), 10) * f[h];
        d[p % 11] != t.substr(17, 1).toUpperCase() && (r.msg = e + "格式有误", r.rst = !1);
      }
    } else r.msg = e + "格式有误", r.rst = !1;
    return r;
  },
  checkEmail: function (t) {
    return /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(t);
  },
  generateGuid: function () {
    for (var t = "", e = 1; e <= 32; e++) t += Math.floor(16 * Math.random()).toString(16),
      8 != e && 12 != e && 16 != e && 20 != e || (t += "-");
    return t;
  },
  getDays: function (t, e) {
    var r = new Date(), n = (t || r.getFullYear(), e + 1 || r.getMonth() + 1);
    return 2 === n ? t % 4 == 0 ? 29 : 28 : 1 === n || 3 === n || 5 === n || 7 === n || 8 === n || 10 === n || 12 === n ? 31 : 30;
  },
  dateIsEqual: function (t, e) {
    return t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth() && t.getDate() == e.getDate();
  },
  getWeekCN: function (t) {
    return "周" + new Array("日", "一", "二", "三", "四", "五", "六")[t.getDay()];
  },
  toDecimal: function (t, e) {
    var r = parseFloat(t);
    if (isNaN(r)) return !1;
    var n = (r = Math.round(100 * t) / 100).toString(), a = n.indexOf(".");
    for (a < 0 && (a = n.length, n += "."); n.length <= a + e;) n += "0";
    return n;
  },
  isOfficerID: function (t) {
    for (var e = t.length, r = 0, n = 0, a = 0, i = 0; i < e; i++) {
      var o = t.charAt(i);
      if (o >= "一" && o <= "龥" || o >= "豈" && o <= "鶴") r += 2; else if (o >= "a" && o <= "z" || o >= "A" && o <= "Z") n += 1; else {
        if (!(o >= "0" && o <= "9")) return !1;
        a += 1;
      }
    }
    if (0 == r || 0 == a) return !1;
    var u = r + n + a;
    return !(0 == u || u > 30);
  },
  isPassportID: function (t) {
    var e = t.length;
    if (e < 5 || e > 20) return !1;
    for (var r = 0; r < e; r++) {
      var n = t.charAt(r);
      if (!(n >= "a" && n <= "z" || n >= "A" && n <= "Z" || n >= "0" && n <= "9")) return !1;
    }
    return !0;
  },
  parseDate: function (t) {
    var e = t.replace(/\//g, "").replace(/Date\(/g, "").replace(/\)/g, "");
    return new Date(Number(e));
  },
  Base64: g.default,
  urlParams: function (t) {
    return "?" + Object.keys(t).map(function (e) {
      return e + "=" + t[e];
    }).join("&");
  },
  checkApiAuth: function (t) {
    return new Promise(function (e, r) {
      wx.getSetting({
        success: function (n) {
          n.authSetting["scope." + t] ? e() : r();
        }
      });
    });
  },
  getGeo: function () {
    var t = function (t) {
      t.destId = 48, t.value = 48, t.destName = "北京", t.name = "北京";
    };
    return new Promise(function (e, r) {
      var n = {};
      wx.getLocation({
        type: "wgs84",
        success: function (a) {
          var i = a.latitude, o = a.longitude;
          f.default.geoToAddress({
            lat: i,
            lng: o
          }).then(function (t) {
            if (!t || !t.cityId) return r(n);
            n.destId = t.cityId, n.value = t.cityId, n.destName = t.cityName, n.name = t.address,
              n.cType = 45, n.latitude = i, n.longitude = o, e(n);
          }).catch(function () {
            t(n), r(n);
          });
        },
        fail: function (t) {
          r(t);
        }
      });
    });
  },
  parseQuery: a,
  senceFilter: function (t) {
    return decodeURIComponent(t).split("_");
  },
  housePicutreOption: function (t, e, r) {
    var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : v.PIC_TUJIA_HOST;
    if (!t || !e || !r) return t;
    var a = t.split("/"), i = a.length, o = a[i - 1].split(".");
    return o[0] = o[0] + "_" + e + "_" + r, a[i - 1] = o.join("."), a.splice(i - 1, 0, "thumb"),
      n + a.join("/");
  },
  formBtn: function (t) {
    var e = t.detail.formId, r = getApp();
    try {
      var n = r.globalUserInfo.tjUserInfo.openId;
      if (!e || "the formId is a mock one" === e || !n) return;
      m.default.setFormId(n, e);
    } catch (t) {
      console.log(t);
    }
  },
  setTjLog: d.default,
  rpxToPx: function (t, e) {
    var r = getApp(), n = 0;
    return new Promise(function (a, i) {
      return (n = r.globalPxAndRpxRatio) ? a({
        px: t * n,
        ratio: n
      }) : e ? (n = e / 750, a({
        px: t * n,
        ratio: n
      })) : void wx.getSystemInfo({
        success: function (e) {
          n = e.windowWidth / 750, r.globalPxAndRpxRatio = n, a({
            px: t * n,
            ratio: n
          });
        },
        fail: function (t) {
          i(t);
        }
      });
    });
  },
  typeUrlToCondintion: function (t) {
    var e = {}, r = [], n = t ? a(t) : null;
    n.url = decodeURIComponent(n.url);
    var i = n.url ? a(n.url) : null;
    if (i && i.cds) return r = decodeURIComponent(i.cds).split("__")[0].split("_"),
      e.type = r[0], e.value = 3 == r.length ? r[1] + "_" + r[2] : r[1], e;
  },
  createUrlParamsString: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments[1];
    if (!e) return t;
    var r = [];
    for (var n in e) (e[n] || 0 === e[n]) && r.push(n + "=" + e[n]);
    return r = r.join("&"), t ? t + "?" + r : r;
  },
  go_decrypt_bd: o,
  bd_decrypt_go: i,
  batchDecryptMapCoordinate: function (t) {
    return (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0) ? t.map(function (t) {
      return i(t.latitude, t.longitude);
    }) : t.map(function (t) {
      return o(t.latitude, t.lnlongitudeg);
    });
  },
  navAddress: function (t, e, r, n) {
    var a = i(t, e), o = a.latitude, u = a.longitude;
    wx.openLocation({
      latitude: o,
      longitude: u,
      scale: 32,
      name: r,
      address: n
    });
  },
  openWebview: function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "navigateTo", r = arguments[2];
    try {
      var n = "miniProgram" === e, i = void 0;
      if (!n && /miniprogram.com/.test(t) && (n = !0, (i = a(t)) && i.appid && i.page && (r = i.appid,
        t = decodeURIComponent(i.page))), n && r) return wx.navigateToMiniProgram({
          appId: r,
          path: t
        });
      t = (/m\.tujia.com\/gongyu\/beijing\//.test(t) ? "/pages/units/units?condintionUrl=" : "/pages/webview/index?h5url=") + encodeURIComponent(t),
        wx[e]({
          url: t
        });
    } catch (t) {
      console.log("openWebview error:", t);
    }
  },
  getNavHeight: u,
  setNavHeight: function (t) {
    b = t;
  },
  toast: function (t) {
    wx.showToast({
      title: t,
      icon: "none"
    });
  },
  isAliApp: w,
  isWxApp: M,
  shareMessage: function (t) {
    var ap = getApp()
    var e = t.desc, n = t.alidesc, a = t.aliTitle, i = t.wxTitle, o = t.title, u = t.path, s = t.aliPath, l = r(t, ["desc", "alidesc", "aliTitle", "wxTitle", "title", "path", "aliPath"]), g = c({
      title: o || (w ? a || ap.globalData.globalName+"公寓民宿预订" : i || ap.globalData.globalName+"民宿公寓酒店预订"),
      desc: w ? n || "住民宿，上" + ap.globalData.globalName : e || ap.globalData.globalName+"民宿公寓酒店预订",
      path: w && s ? s : u
    }, l);
    return w && (g.content = "途家全球公寓民宿预订"), console.log("share data:", g), g;
  },
  systemInfo: y,
  cloneObj: function (t) {
    return t ? JSON.parse(JSON.stringify(t)) : null;
  },
  getPrevPage: l,
  execPrevPageCallback: function () {
    for (var t = arguments.length, r = Array(t), n = 0; n < t; n++) r[n] = arguments[n];
    var a = r[0], i = r.slice(1);
    if (!a || "string" != typeof a) throw new Error("callbackName must is a string");
    var o = l();
    wx.navigateBack({
      success: function () {
        o && o[a] && o[a].apply(o, e(i));
      }
    });
  },
  errorShowTip: function (t) {
    var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    wx.showModal({
      title: "提示",
      content: t,
      confirmColor: "#FF9645",
      showCancel: !1,
      complete: function () {
        e && wx.navigateBack({
          delta: 1
        });
      }
    });
  },
  getPageQueryParams: function (t) {
    var e = getApp(), r = e.globalData.pageQueryParams[t];
    return e.globalData.pageQueryParams = {}, r;
  },
  recordMessageTabBackRoute: function (t) {
    wx.setStorageSync("messageTabBackRoute", t);
  },
  sceneQuery: function (t) {
    if (t) {
      var e = t.split("__");
      if (e.length) {
        for (var r = {}, n = 0; n < e.length; n++) {
          var a = e[n].split("_");
          r[a[0]] = a[1];
        }
        return r;
      }
    }
  },
  swipeDirection: function (t, e, r, n) {
    return Math.abs(t - e) >= Math.abs(r - n) ? t - e > 0 ? "Left" : "Right" : r - n > 0 ? "Up" : "Down";
  }
};