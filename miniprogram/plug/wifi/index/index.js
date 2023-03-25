function i(i) {
  return i && i.__esModule ? i : {
    default: i
  };
}

var e = i(require("../../../components/toast/toast")), 
t = i(require("../../../apiFetch/wifiApi")), 
o = require("../../../common/js/utils"), 
s = i(require("../../../utils/pageHelper.js")), 
a = getApp();
console.log(a)
Page({
  data: {
    PWA_STATIC_TUJIA_HOST: a.globalStaticUrl,
    wifiList: {},
    wifiName: "",
    wifiPassword: "",
    wifiStatus: !0,
    systemInfo: {},
    isIosConnectWifi: !1,
    nowWifi: "",
    isLoading: !1,
    noIosWifi: !1,
    wifiListLoading: !1,
    openId: "",
    userInfo: "",
    sceneId: "",
    first: !1,
    userStatus: "",
    checkLoginError: !1,
    checkLoginLoading: !1,
    isGetPhoneNumber: !0,
    isActive: !1,
    user: {},
    scene: 0,
    wifisource: 0,
    redPacketAmount: 0,
    hotelId: "",
    formidEvent: {},
    inviterId: "",
    inviterType: 2,
    app_name: a.globalData.globalName
  },
  onLoad: function (i) {
    i.scene ='wifi_saomahou';
    i.wifisource
    console.log(i), i.scene && (this.setData({
      scene: i.scene
    }), a.globalGio("track", "wifi_saomahou", {
      wifiId: i.scene,
      openId: a.globalUserInfo.tjUserInfo.openId
    }), wx.showLoading(), this._getHotelWifiInfo()), 
    i.wifisource && this.setData({
      wifisource: i.wifisource
    }), 
    i.sceneId && this.setData({
      scene: i.sceneId
    });
  },
  formBtn: function (i) {
    console.log("form id=", i),
    this.setData({
      formidEvent: i
    });
  },
  getWifiById: function () {
    var i = this;
    if (!this.data.wifiStatus) return this.goSetting();
    t.default.getHotelWifiInfo({
      wifiId: this.data.scene
    }).then(function (e) {
      console.log("getWifiById success", e);
      var t = new o.Base64();
      i.setData({
        wifiList: {
          SSID: e.name,
          password: t.decode(t.decode(e.password))
        },
        wifiName: e.name,
        wifiPassword: t.decode(t.decode(e.password))
      });
    }).catch(function (e) {
      if (console.log("getWifiById err", e), 60012 == e.errorNo) {
        var t = encodeURIComponent("/pages/wifi_v2/index/index");
        wx.redirectTo({
          url: "/pages/wifi_v2/matAndWifi/wifiLogin/index?nextPath=" + t + "&wifiid=" + i.data.scene + "&inviterid=" + i.data.inviterId + "&invitertype=" + i.data.inviterType
        });
      }
    });
  },
  onShow: function () {
    this.data.isIosConnectWifi && this.setData({
      userStatus: "",
      isIosConnectWifi: !1
    }), this.data.first && !this.data.noIosWifi && this.getConnectedWifi();
  },
  _storeInfo: function () {
    var i = this;
    t.default.getStoreHomeInfo({
      userToken: wx.getStorageSync("userToken")
    }).then(function (e) {
      if (e.storeGuid) wx.setStorageSync("storeGuid", e.storeGuid), wx.redirectTo({
        url: "/pages/wifi_v2/matAndWifi/applyQrCode/addQrCode/index?scene=" + i.data.scene
      }); else {
        var t = i;
        wx.showModal({
          title: "提示",
          content: "二维码未激活，请联系商户扫码激活",
          showCancel: !1,
          success: function () {
            a.clearTjUserInfo();
            var i = encodeURIComponent(s.default.getCurrentPageUrlWithArgs() + "&wifisource=1");
            wx.redirectTo({
              url: "/pages/wifi_v2/matAndWifi/wifiLogin/index?nextPath=" + i + "&wifiid=" + t.data.scene + "&inviterid=" + t.data.inviterId + "&invitertype=" + t.data.inviterType
            });
          }
        });
      }
    }).catch(function (e) {
      var t = i;
      wx.showModal({
        title: "提示",
        content: "二维码未激活，请联系商户扫码激活",
        showCancel: !1,
        success: function () {
          a.clearTjUserInfo();
          var i = encodeURIComponent(s.default.getCurrentPageUrlWithArgs() + "&wifisource=1");
          wx.redirectTo({
            url: "/pages/wifi_v2/matAndWifi/wifiLogin/index?nextPath=" + i + "&wifiid=" + t.data.scene + "&inviterid=" + t.data.inviterId + "&invitertype=" + t.data.inviterType
          });
        }
      });
    });
  },
  _getHotelWifiInfo: function () {
    var i = this;
    t.default.getHotelWifiInfo({
      wifiId: this.data.scene || ""
    }).then(function (e) {
      if (i.setData({
        isActive: e.active,
        inviterId: e.landlordId || ""
      }), i.data.isActive) i.getWifiById(), i.setData({
        hotelId: e.hotelId
      }), i.userAuthCheck().then(function (e) {
        i.setData({
          scene: i.data.scene
        }), i.init();
      }).catch(function (i) {
        console.log("getHotelWifiInfo", i);
      }).finally(function () {
        wx.hideLoading();
      }); else if (a.userIsLogin()) i._storeInfo(); else if (1 == i.data.wifisource) i._storeInfo(); else {
        var t = encodeURIComponent(s.default.getCurrentPageUrlWithArgs() + "&wifisource=1");
        wx.redirectTo({
          url: "/pages/wifi_v2/matAndWifi/wifiLogin/index?nextPath=" + t + "&wifiid=" + i.data.scene + "&inviterid=" + i.data.inviterId + "&invitertype=" + i.data.inviterType
        });
      }
    }).catch(function (i) {
      console.log("getHotelWifiInfo", i);
    }).finally(function () {
      wx.hideLoading();
    });
  },
  init: function () {
    var i = this;
    console.log("系统版本检测"), wx.getSystemInfo({
      success: function (e) {
        if (i.setData({
          systemInfo: e
        }), console.log(e), "ios" !== e.platform || i.iosVersionCheck(e)) console.log("init else"),
          i.initWifi(); else {
          i.setData({
            isLoading: !0,
            noIosWifi: !0,
            wifiStatus: !1
          });
          var t = JSON.stringify(i.data.wifiList);
          i.data.noIosWifi && wx.redirectTo({
            url: "/pages/wifi_v2/connectWifiError/connectWifiError?wifiliststring=" + encodeURIComponent(t) + "&noIosWifi=" + i.data.noIosWifi + "&wifiid=" + i.data.scene + "&redPacketAmount=" + i.data.redPacketAmount + "&inviterId=" + i.data.inviterId + "&inviterType=" + i.data.inviterType
          });
        }
      }
    });
  },
  initWifi: function () {
    var i = this;
    console.log("initWifi"), wx.startWifi({
      success: function (e) {
        console.log(e), i.setData({
          first: !0
        }), i.onWifiConnected(), i.getConnectedWifi();
      },
      fail: function (i) {
        console.log("startWifi-err:", i);
      }
    });
  },
  goSetting: function () {
    if (console.log("gosetting"), "android" === this.data.systemInfo.platform) return e.default.showToast({
      title: "请去手机设置中开启无线网络",
      position: "bottom",
      duration: 4e3
    });
    wx.getWifiList({
      success: function (i) { },
      fail: function (i) { }
    });
  },
  onWifiConnected: function () {
    var i = this, e = this.data.systemInfo.platform;
    wx.onWifiConnected(function (t) {
      console.log("onWifiConnected--", t), "ios" === e && i.data.isIosConnectWifi && (i.setData({
        isIosConnectWifi: !1
      }), i.toConnectSuccess(i.data.userStatus));
      var o = t.wifi;
      o.BSSID && o.SSID && !i.data.noIosWifi && i.setData({
        wifiStatus: !0,
        nowWifi: o
      }), "android" === e && i.getConnectedWifi();
    });
  },
  getConnectedWifi: function (i) {
    var e = this;
    console.log("getConnectedWifi"), wx.getConnectedWifi({
      success: function (t) {
        console.log(444, t), t.wifi && t.wifi.SSID && e.setData({
          nowWifi: t.wifi,
          wifiStatus: !0
        }), i && i(t);
      },
      fail: function (i) {
        console.log("getConnectedWifi--", i);
        var t = {
          nowWifi: "",
          isIosConnectWifi: !1
        };
        12005 == i.errCode && e.setData({
          wifiStatus: !1
        }), 12010 == i.errCode && (t.wifiStatus = !0), e.setData(t), console.log(e.data.nowWifi),
          console.log(e.data.isIosConnectWifi);
      }
    });
  },
  connectWifi: function (i, e) {
    var t = this;
    console.log("connectWifi函数", i);
    var n = this.data.systemInfo.platform, s = {
      SSID: i.SSID,
      BSSID: "",
      password: i.password,
      success: function (i) {
        if (console.log("connectWifi success:", i), "ios" === n) return console.log("platform:", n),
          i.wifiMsg || (console.log("res:", i), wx.getConnectedWifi({
            success: function (i) {
              console.log("getConnectedWifi success:", i), i.wifi.SSID != t.data.wifiList.SSID && t.connectFail();
            },
            fail: function (i) {
              console.log("getConnectedWifi err:", i), t.connectFail();
            }
          })), /already/.test(i.wifiMsg) ? t.toConnectSuccess(e) : void t.setData({
            isIosConnectWifi: !0,
            userStatus: e
          });
        t.toConnectSuccess(e);
      },
      fail: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t.setData({
          isLoading: !1
        }), e.wifiInfo = i, (0, o.setTjLog)({
          page: "pages/wifi_v2/index/index",
          errorType: "connectWifi",
          errorMsg: e
        }), console.log("connectWifi err", e), 12007 != e.errCode && t.connectFail();
      },
      complete: function () { }
    };
    "android" === n && this.setData({
      isLoading: !1
    }), console.log(s), wx.connectWifi(s);
  },
  getTjWifiList: function () {
    var i = this;
    if (!this.data.wifiStatus) return this.goSetting();
    this.data.wifiListLoading || (this.data.wifiList.length || this.setData({
      wifiListLoading: !0
    }), this.setData({
      isLoading: !0
    }), t.default.getHotelWifi(this.data.scene).then(function (e) {
      console.log("wifiApis", e);
      var t = new o.Base64();
      i.setData({
        wifiList: {
          SSID: e.name,
          BSSID: "",
          password: t.decode(t.decode(e.password))
        }
      }), console.log("getTjWifiList success", i.data.wifiList);
    }).catch(function (i) {
      console.log("getTjWifiList err", i);
    }).finally(function () {
      var e = {
        wifiListLoading: !1
      };
      i.data.checkLoginLoading || (e.isLoading = !1), i.setData(e);
    }));
  },
  getPhoneNumber: function (i) {
    if (console.log("getPhoneNumber：", i.detail.errMsg), console.log(this.data.isGetPhoneNumber),
      "tap" !== i.type || !this.data.isGetPhoneNumber) {
      var e = this.data.wifiList, t = {
        SSID: e.SSID,
        password: e.password
      }, o = i.detail, n = o.encryptedData, s = o.iv, a = this.data, c = a.userStatus, r = a.openId, f = (a.userInfo,
        a.checkLoginError);
      if (this.setData({
        isLoading: !0
      }), console.log("checkLoginError:", f), f) console.log("checklogin fail:"), this.connectWifiBefore(t, "1"); else if (console.log("checkloginError:", c),
        "1" == c) if (console.log(n), n) {
          var d = getApp(), l = {
            globalCode: "WxAppWifiCode",
            openId: r,
            iv: encodeURIComponent(s),
            encryptedData: encodeURIComponent(n),
            wifiId: this.data.scene,
            formId: this.data.formidEvent.detail && this.data.formidEvent.detail.formId || "",
            inviterId: this.data.inviterId,
            inviterType: this.data.inviterType
          };
          d.globalUserInfo.wxUserInfo && (l.userInfo = d.globalUserInfo.wxUserInfo), this.decodePhoneAndLogin(l, t);
        } else this.connectWifiBefore(t, "1"); else this.connectWifiBefore(t, "2");
    }
  },
  connectFail: function () {
    this.setData({
      isLoading: !1
    });
    var i = JSON.stringify(this.data.wifiList);
    wx.navigateTo({
      url: "/pages/wifi_v2/connectWifiError/connectWifiError?wifiliststring=" + encodeURIComponent(i) + "&wifiid=" + this.data.scene + "&redPacketAmount=" + this.data.redPacketAmount + "&inviterId=" + this.data.inviterId + "&inviterType=" + this.data.inviterType
    });
  },
  connectWifiBefore: function (i, e) {
    console.log("连接成功前的页面", i), "android" === this.data.systemInfo.platform && (console.log("android"),
      this.setData({
        isLoading: !1
      })), this.connectWifi(i, e);
  },
  toConnectSuccess: function (i) {
    var e = this, t = i ? "&userStatus=" + i : "";
    setTimeout(function () {
      wx.navigateTo({
        url: "../connectWifiSuccess/connectWifiSuccess?openId=" + e.data.openId + "&sceneId=" + e.data.scene + "&redPacketAmount=" + e.data.redPacketAmount + "&inviterId=" + e.data.inviterId + "inviterType=" + e.data.inviterType + "&isLandlordUser=" + e.data.isLandlordUser + t
      });
    }, 300);
  },
  decodePhoneAndLogin: function (i, e) {
    var o = this, n = getApp();
    t.default.getUnionLogin(i).then(function (i) {
      console.log("decodePhoneAndLogin:", i), n.setTjUserInfo(i), i.isNewUser ? (console.log("formidEvent-", o.data.formidEvent),
        o.setData({
          redPacketAmount: i.redPacketAmount
        }), o.connectWifiBefore(e, "1")) : o.connectWifiBefore(e, "2");
    }).catch(function (i) {
      o.connectWifiBefore(e, "1");
    });
  },
  iosVersionCheck: function (i) {
    i.platform;
    var e = i.system;
    return e = e.split(" ")[1], !((e = e ? e.split(".") : [])[0] && e[0] <= 10) || (console.log("ios版本过低"),
      !1);
  },
  userAuthCheck: function () {
    var i = getApp();
    this.setData({
      isLoading: !0
    });
    var e = this;
    return this.setData({
      isLoading: !0,
      checkLoginLoading: !0
    }), new Promise(function (t, o) {
      i.checkLogin(function (o) {
        console.log("user:", o);
        var n;
        i.setTjUserInfo(o), n = "2", o && 0 == o.userId && (n = "1"), e.setData({
          openId: o.openId,
          isLoading: !1,
          userInfo: o,
          checkLoginError: !1,
          userStatus: n,
          checkLoginLoading: !1,
          isGetPhoneNumber: !o.userId
        }), t(o);
      }, function (i) {
        var n;
        console.log("checkLogin fail"), i && 0 == i.userId ? (n = "1", e.setData({
          openId: i.openId,
          isLoading: !1,
          userInfo: i,
          checkLoginError: !1,
          userStatus: n,
          checkLoginLoading: !1,
          isGetPhoneNumber: !i.userId
        }), t(i)) : (e.setData({
          checkLoginError: !0,
          isLoading: !1,
          checkLoginLoading: !1
        }), o(i));
      });
    });
  },
  copyText: function (i) {
    var e = i.target.dataset.param;
    console.log(e), wx.setClipboardData({
      data: e,
      success: function (i) {
        wx.getClipboardData({
          success: function (i) { }
        });
      },
      fail: function (i) {
        console.log(i);
      }
    });
  },
  openDataError: function (i) {
    console.log("openDataError:", i);
  },
  setFollowNum: function (i, e) {
    var o = this;
    console.log("wifiId:", this.data.scene), t.default.setFollowNum({
      parameter: {
        wifiId: this.data.scene
      },
      userToken: i.userToken
    }).then(function (n) {
      console.log("setFollowNum success", n), t.default.buryUsingGET({
        type: 1,
        content: {
          userId: a.globalUserInfo.tjUserInfo.userId,
          wifiId: o.data.scene,
          openId: a.globalUserInfo.tjUserInfo.openId,
          time: new Date().getTime().toString()
        }
      }).then(function (t) {
        console.log("to connectwifi"), a.setTjUserInfo(i), o.connectWifiBefore(e, "2");
      }).catch(function (i) {
        i.errorNo, i.errorMsg;
      }).finally(function () { });
    }).catch(function (i) {
      console.log("setFollowNum err", i);
    });
  }
});