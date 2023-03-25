function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var ng = Object.assign || function (e) {
  for (var o = 1; o < arguments.length; o++) {
    var t = arguments[o];
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
  }
  return e;
},
  t = e(require("./apiFetch/wifiApi")),
  n = e(require("./common/js/utils")),
  s = e(require("./common/js/cookieRecord")),
  a = require("./vds-mina"),
  f = e(require("./common/js/globalPageData")),
  u = require("@tujia/fe_data_bury/js"),
  g = e(require("./common/js/globalMutations")),
  r = e(require("./common/js/utils"));
  


App({
  onLaunch: function (e) {

    var scenValue = wx.getLaunchOptionsSync(),_this =this,config = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
    console.log("===>场景值获取", scenValue, e.query, config),
      config && config.apiurl && (this.siteInfo.apiurl = config.apiurl),
      config && config.appid && (this.siteInfo.appid = config.appid),
      config && config.appkey && (this.siteInfo.appkey = config.appkey),
      config && config.name && (this.globalData.globalName = config.name),
      config && config.logoUrl && (this.globalData.globalLogo = config.logoUrl),
      config && config.skinColor && (this.globalData.skinColor = config.skinColor),
      console.log("====>小程序启动", this.siteInfo),
      this.tjUserInfoKey = this.tjUserInfoKey + this.siteInfo.appid,
      this.initConfigInfo(),
      this.initTjUserInfo(),
      this.setUserStatisticCode(),
      this.initLastSelectDate(),
      this.getSystemInfo(),
      this.cookieRecordHandler(e),
      this.setUrlGlobalData(e);
      this.globalPid = e.query && e.query.parentsId;
      wx.setNavigationBarTitle({ title: this.globalData.globalName, });
      a("init", "b2a7c8206152f9d5", this.siteInfo.appid, { version: "4.4.9", forceLogin: !1 })
  },
  onShow: function (e) {
    console.log("app.onShow"), this.globalSceneCode !== e.scene && this.setScene(e);
  },
  onHide: function () {
    console.log("app.onHide"), wx.removeStorageSync(this.globalHouseTags);
  },
  siteInfo: {
    "apiurl": null,
    "appid": null,
    "appkey": null,
    "name": ""
  },
  globalData: ng({
    systemInfo: r.default.systemInfo,
    pageQueryParams: {},
    favoriteTipStatus: !1
  }, f.default, g.default),
  globalHost: 'https://api.05178.top/',
  globalStaticUrl: 'https://pwastatic.tujia.com',
  globalStaticDaoke: 'http://static.zhiyinfo.com',
  getAppVersion: "1.2.5",
  globalName: '',//平台小程序名称
  globalserviceline: '13168320604',//平台服务热线
  globalcomplaontline: '13168320604',//投诉电话
  globalGio: a,
  globalPid: 0,
  globalLogo: "",
  skinColor: '#e84358',
  globalOtherData: {},
  globalLandordId: 0,
  globalSceneCode: "",
  globalHouseTags: "globalHouseTags",
  globalPxAndRpxRatio: 0,
  globalCodeKey: "WeChatSmallApp",
  setUserStatisticCode: function () {
    var e = this.globalUserInfo.tjUserInfo;
    this.setGioUserInfo(e.userId, e.openId);
  },
  cookieRecordHandler: function (e) {
    var o = e.query.code, t = n.default.createUrlParamsString(e.path, e.query), a = s.default.getQrScene(e.query.scene), i = a && a.c ? a.c : o;
    s.default.initTjCookieRecord({
      scene: e.scene,
      code: i || "",
      path: t
    });
  },
  setUrlGlobalData: function (e) {
    var o = e.query, t = o.shareparams, n = o.h5url;
    t && (this.globalData.shareparams = t), n && (this.globalData.h5url = n), console.log("setUrlGlobalData:", this.globalData);
  },
  initCfgAndCode: function (e, o) {
    var t = e.code || "";
    this.setGlobalCode(t),
      this.initConfigInfo(o);
  },
  setGlobalCode: function (e) {
    this.globalCodeKey = e, console.log("set-globalCodeKey:", this.globalCodeKey);
  },
  getGlobalCode: function () {
    var e = this.globalCodeKey;
    return e || "WeChatSmallApp";
  },
  /**
   * 获取全局广告参数
   * **/
  getBannerManage: function (o) {
    var b = wx.getStorageSync("getBannerManage");
    b ? o(b) : null;

  },
  initConfigInfo: function (e) {

    var n = this, o = { appid: n.siteInfo.appid, appkey: n.siteInfo.appkey },
      t = wx.getStorageSync("globalConfig");
    if (!t) {
      wx.request({
        url: n.siteInfo.apiurl + "v2.config/getconfig",
        data: o,
        method: "GET",
        success: function (o) {
          o.data.data.config && (n.globalConfig = o.data.data.config, wx.setStorageSync("globalConfig", o.data.data)),
            "function" == typeof e && e();
        }
      })
    } else {
      n.globalConfig = t.config

    }

  },
  initWxUserInfo: function (e, o) {
    var t = this;
    console.log("用户信息获取", t.globalUserInfo)
    t.globalUserInfo.wxUserInfo ? "function" == typeof e && e(t.globalUserInfo.wxUserInfo) : wx.getStorage({
      key: "wxUserInfo",
      success: function (o) {
        t.globalUserInfo.wxUserInfo = o.data, "function" == typeof e && e(t.globalUserInfo.wxUserInfo);
      },
      fail: function (n) {
        wx.login({
          success: function () {
            wx.getUserInfo({
              success: function (o) {
                console.log(o);
                t.globalUserInfo.wxUserInfo = o.userInfo, wx.setStorage({
                  key: "wxUserInfo",
                  data: o.userInfo
                }), a("setVisitor", o.userInfo), "function" == typeof e && e(t.globalUserInfo.wxUserInfo);
              },
              fail: function (e) {
                console.log(e), "function" == typeof o && o();
              }
            });
          }
        });
      }
    });
  },
  tjUserInfoKey: "DkUserInfoKey_",
  initTjUserInfo: function () {
    var e = this, o = wx.getStorageSync(e.tjUserInfoKey);
    e.globalUserInfo.tjUserInfo = o || e.getDefaultTjUserInfo();
  },
  setTjUserInfo: function (e) {
    console.log("==========", e)
    this.curUserLogoff = !1, this.globalUserInfo.tjUserInfo = e, this.setUserStatisticCode(),
      wx.setStorage({
        key: this.tjUserInfoKey,
        data: e
      }), this.setGioUserInfo(e.userId, e.openId);
  },
  clearTjUserInfo: function () {
    var e = this;
    wx.removeStorageSync(e.tjUserInfoKey), e.globalUserInfo.tjUserInfo = e.getDefaultTjUserInfo();
  },
  logOffTjUser: function (e) {
    var o = this;
    wx.removeStorage({
      key: o.tjUserInfoKey,
      success: function (t) {
        o.globalUserInfo.tjUserInfo = o.getDefaultTjUserInfo(), o.curUserLogoff = !0, o.setUserStatisticCode(),
          "function" == typeof e && e();
      }
    });
  },
  checkLogin: function (e, o) {
    var t = this;
    wx.login({
      success: function (n) {
        wx.request({
          url: t.globalConfig.WechatCustomerUri + t.globalConfig.CheckLoginPath,
          data: {
            appid: t.siteInfo.appid,
            appkey: t.siteInfo.appkey,
            parentsId: t.globalPid,
            code: n.code,
            userInfo: JSON.stringify(t.globalUserInfo.wxUserInfo)
          },
          method: "POST",
          success: function (res) {
            if (res.data.errcode == 0) {

              t.setTjUserInfo(res.data.data)
            }
            res.data.isSuccess ? "function" == typeof e && e(res.data.data) : (console.log("checkloginErr：", res),
              "function" == typeof o && o(res.data.data || {}));
          },
          fail: function (e) {
            console.log("checkloginErr：", e), "function" == typeof o && o();
          }
        });
      }
    });
  },
  userIsLogin: function () {
    var e = this.globalUserInfo.tjUserInfo || {};
    return "" != e.userToken && e.userId > 0;
  },
  getDefaultTjUserInfo: function () {
    return {
      userToken: "",
      userId: 0,
      openId: "",
      mobile: "",
      userTitle: "",
      avatarUrl: "",
      userName: "",
      showMobile: ""
    };
  },
  globalUserInfo: {
    wxUserInfo: null,
    tjUserInfo: null
  },
  globalConfig: null,
  curCity: {
    id: 45,
    name: "广州"
  },
  curUserLogoff: !1,
  lastSelectDateKey: "lastSelectDateKey",
  updateLastSelectDate: function (e, o) {
    this.lastSelectDate.begin = e, this.lastSelectDate.end = o;
    var t = this.lastSelectDateKey;
    wx.setStorage({
      key: t,
      data: this.lastSelectDate
    });
  },
  initLastSelectDate: function () {
    var e = this.lastSelectDateKey, o = wx.getStorageSync(e);
    o && (this.lastSelectDate.begin = o.begin, this.lastSelectDate.end = o.end);
  },
  lastSelectDate: {
    begin: null,
    end: null
  },
  holiday: null,
  netFailMsg: "囧rz....数据无法加载，请检查网络连接，或退出小程序后再重新进入~",
  myOrderSelectTab: -1,
  lastTabTime: new Date().getTime(),
  validTab: function (e, o) {
    if (!e || !e.timeStamp) return !0;
    var t, n = this;
    return (t = new Date().getTime()) - n.lastTabTime < o ? (n.lastTabTime = t, console.log("validTab false"),
      !1) : (n.lastTabTime = t, console.log("validTab true"), !0);
  },
  setScene: function (e) {
    this.globalSceneCode = e.scene || "";
  },
  setGioUserInfo: function (e, o) {
    e > 0 && a("setUserId", e), o && a("identify", o);
  },
  decodePhoneAndLogin: function (e) {
    console.log("手机登录")
    var o = this, n = e.openId, a = e.iv, i = e.encryptedData, l = e.globalCode, r = e.inviterId;
    return new Promise(function (e, c) {
      var f = {
        openId: n,
        iv: a,
        encryptedData: i,
        globalCode: l
      };
      r && (f.inviterType = 2, f.inviterId = r);
      var g = o.getGlobalCode();
      l = l || g, f.globalCode = l, console.log("login-code:", l, "login-inviterId:", r),
        o.globalUserInfo.wxUserInfo && (f.userInfo = JSON.stringify(o.globalUserInfo.wxUserInfo)),
        f.cookieRecord = s.default.getCookieRecord(), t.default.getUnionLogin(f).then(function (t) {
          console.log("ddd:", t), o.setTjUserInfo(t), e();
        }).catch(function (e) {
          console.log(e), c();
        });
    });
  },
  decryptPhoneNumber: function (e) {
    var o = this, t = e.detail, n = e.userStatus, s = e.openId, a = e.globalCode, i = e.landlordId;
    return new Promise(function (e, l) {
      var r = t.encryptedData, c = t.iv;

      if ("1" == n) if (r) {
        var f = {
          globalCode: a,
          openId: s,
          iv: encodeURIComponent(c),
          encryptedData: encodeURIComponent(r)
        };
        i && (f.inviterType = 2, f.inviterId = i), o.decodePhoneAndLogin(f).then(function () {
          e();
        }).catch(function (e) {
          console.log(e), l();
        });
      } else l(); else console.log("userStatus !==1,------", n);
    });
  },
  getSystemInfo: function () {
    var e = this;
    wx.getSystemInfo({
      success: function (o) {
        /iphone x|iphone xr/gi.test(o.model) ? o.isNeedShiPei = !0 : o.isNeedShiPei = !1,
          e.globalData.systemInfo = o;
      }
    });
  }
});