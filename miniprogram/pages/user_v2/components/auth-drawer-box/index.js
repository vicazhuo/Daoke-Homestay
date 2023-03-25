var a = getApp(), memberApi = require("../../../../apiFetch/member.js");

Component({
  properties: {
    isGetUserInfoPopup: {
      type: Boolean,
      value: !1
    },
    bindMobile: {
      type: Boolean,
      value: !0
    },
    isCanCancel: {
      type: Boolean,
      value: !1
    },
    notSubscribed: {
      type: Boolean,
      value: false
    }
  },
  data: {
    code: "",
    phone: "",
    mobile: "",
    overTime: 60,
    weixinUserInfo: {},
    userInfo: {},
    isClickHidden: !0,
    isCancelBindMobile: !1,
    isLogin: false,
    hasBindMobile: !1,
    tpData: {
      appName: a.globalData.globalName,
      logoUrl: a.globalData.globalLogo,
      canIUse: true,
      mobile: '',
      overTime: false
    }
  },
  ready: function () {
    this.showLoadingToastTimes = 0;
 
  },
  methods: {
    checkRole: function () {
      var e = this;
      return t(o.mark(function t() {
        var n, i;
        return o.wrap(function (t) {
          for (; ;) switch (t.prev = t.next) {
            case 0:
              return n = u(), e.setData({
                isLogin: n,
                isCancelBindMobile: !1
              }), t.next = 4, e.codeExchangeUserInfo();

            case 4:
              if ((i = t.sent) || n) {
                t.next = 8;
                break;
              }
              return e.setMobileDisplayStatus(i), t.abrupt("return", !1);

            case 8:
              n ? e.setAuthSuccess() : (e.showLoadingToastTimes < 1 && (r("登录中..."), e.showLoadingToastTimes++),
                wx.getSetting({
                  success: function (t) {
                    var n = wx.getStorageSync("isUserClickLoginOut");
                    i && t.authSetting["scope.userInfo"] && !n ? (wx.setStorageSync("isUserClickLoginOut", !1),
                      e.wechatLogin(e.setUserInfo.bind(e))) : e.setMobileDisplayStatus(i);
                  },
                  fail: function (t) {
                    console.log("fail getSetting", t), e.setMobileDisplayStatus(i);
                  }
                }));

            case 9:
            case "end":
              return t.stop();
          }
        }, t, e);
      }))();
    },
    setMobileDisplayStatus: function (e) {
      var t = null, n = new RegExp(/^1[3-9]\d{9}$/);
      e && n.test(e.mobile) ? (this.hasBindMobile = !0, t = (t = e.mobile) ? t.slice(0, 3) + "****" + t.slice(7) : "") : (this.hasBindMobile = !1,
        t = ""), this.setAuthFail({
          mobile: t
        });
    },
    signInSuccessCallback: function () {
      u() ? this.signInCallback() : this.showAuthBox();
    },
    showAuthBox: function () {
      var e = this;
      return t(o.mark(function t() {
        var n, i;
        return o.wrap(function (t) {
          for (; ;) switch (t.prev = t.next) {
            case 0:
              return r("登录中..."), t.next = 3, e.codeExchangeUserInfo();

            case 3:
              n = t.sent, i = "", n && (i = n.mobile), e.setData({
                mobile: i ? i.slice(0, 3) + "****" + i.slice(7) : "",
                isGetUserInfoPopup: !1,
                isClickHidden: !1,
                isCancelBindMobile: !1,
                isLogin: u()
              }), wx.hideLoading();

            case 8:
            case "end":
              return t.stop();
          }
        }, t, e);
      }))();
    },
    signInCallback: function () {
      this.triggerEvent("cancelEvent", i.globalData.userInfo);
    },
    setAuthFail: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = {
        isLogin: !1,
        isGetUserInfoPopup: !1,
        isClickHidden: !1,
        showBindMobile: !1,
        isCancelBindMobile: !1
      };
      t = n({}, t, e), this.setData(t), wx.hideLoading();
    },
    setAuthSuccess: function () {
      this.setData({
        isLogin: !0,
        isGetUserInfoPopup: !0,
        isClickHidden: !0
      }), this.signInCallback();
    },
    codeExchangeUserInfo: function () {
      var e = this;
      return t(o.mark(function t() {
        var n, a, s, r, c;
        return o.wrap(function (t) {
          for (; ;) switch (t.prev = t.next) {
            case 0:
              return t.prev = 0, t.next = 3, i.wechat.login();

            case 3:
              if (n = t.sent, a = n.code) {
                t.next = 7;
                break;
              }
              throw new Error("无法获取code，登录失败!");

            case 7:
              if (s = i.globalData.appId) {
                t.next = 10;
                break;
              }
              throw new Error("appId丢失!");

            case 10:
              return t.next = 12, f({
                code: a,
                appId: s
              });

            case 12:
              return r = t.sent, c = r.data, t.abrupt("return", c);

            case 17:
              t.prev = 17, t.t0 = t.catch(0), "request:fail timeout" !== t.t0 && e.setAuthFail({
                notSubscribed: !0
              });

            case 20:
            case "end":
              return t.stop();
          }
        }, t, e, [[0, 17]]);
      }))();
    },
    wechatLogin: function (e) {
      var a = this, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return t(o.mark(function t() {
        var r, l, u, d, h, f, g, p;
        return o.wrap(function (t) {
          for (; ;) switch (t.prev = t.next) {
            case 0:
              if (t.prev = 0, r = null, s.code) {
                t.next = 9;
                break;
              }
              return t.next = 5, i.wechat.login();

            case 5:
              l = t.sent, r = l.code, t.next = 10;
              break;

            case 9:
              r = s.code;

            case 10:
              if (r) {
                t.next = 12;
                break;
              }
              throw new Error("无法获取code，登录失败!");

            case 12:
              if (u = s, d = u.loginType, h = [2, 3], s.code = r, !(h.indexOf(d) > -1)) {
                t.next = 19;
                break;
              }
              a.getToken(e, s), t.next = 25;
              break;

            case 19:
              return t.next = 21, i.wechat.getUserInfo();

            case 21:
              f = t.sent, g = f.encryptedData, p = f.iv, s = n({}, s, {
                iv: p,
                encryptedData: g,
                loginType: 1,
                withCredentials: !0
              }), a.getToken(e, s);

            case 25:
              t.next = 31;
              break;

            case 27:
              t.prev = 27, t.t0 = t.catch(0), a.setAuthFail(), c(t.t0, 3e3);

            case 31:
            case "end":
              return t.stop();
          }
        }, t, a, [[0, 27]]);
      }))();
    },
    getToken: function (e, n) {
      var a = this;
      return t(o.mark(function t() {
        var s, r, l, u, d, f, g, p, b, v, w, x;
        return o.wrap(function (t) {
          for (; ;) switch (t.prev = t.next) {
            case 0:
              return t.prev = 0, s = n.code, r = n.encryptedData, l = n.iv, u = n.phone, d = n.validCode,
                f = n.loginType, g = n.withCredentials, p = n.mobileIv, b = n.mobileEncryptedData,
                v = {
                  iv: l,
                  code: s,
                  loginType: f,
                  validCode: d,
                  mobileIv: p,
                  mobile: u,
                  encryptedData: r,
                  mobileEncryptedData: b,
                  withCredentials: g,
                  platform: "NEW_MINI",
                  appId: i.globalData.appId
                }, !a.hasBindMobile && i.globalData.sid && (v.traceId = i.globalData.sid), t.next = 6,
                h(v);

            case 6:
              w = t.sent, x = w.data, a.setTokenToStorage(x), i.getUserInfoDetail(function (t) {
                e && e(t);
              }), t.next = 17;
              break;

            case 12:
              t.prev = 12, t.t0 = t.catch(0), console.log(t.t0), a.setAuthFail(), c(t.t0, 5e3);

            case 17:
            case "end":
              return t.stop();
          }
        }, t, a, [[0, 12]]);
      }))();
    },
    setTokenToStorage: function (e) {
      var t = new Date();
      wx.setStorageSync("token", e), wx.setStorageSync("token_expire", t.getTime()), i.globalData.token = e;
    },
    notSubscribedGetUserInfo: function (e) {
      var n = this, userInfo = e.detail.userInfo;
      memberApi.refresh_member_account_info(userInfo).then((res) => {
        if (res.errcode == 0){
            this.triggerEvent("callbackEvent", res.data);
         }else{
           wx.showModal({
             title: '系统提示',
             content: '网络异常，错误代码：1004',
           })
         }
      
      });

    },
    bindGetUserInfo: function (e) {
      var n = this;
      return t(o.mark(function t() {
        var a, s, l, u, d, h;
        return o.wrap(function (t) {
          for (; ;) switch (t.prev = t.next) {
            case 0:
              if (t.prev = 0, "getUserInfo:ok" !== e.detail.errMsg) {
                t.next = 12;
                break;
              }
              return r("登录中..."), t.next = 5, i.wechat.login();

            case 5:
              a = t.sent, s = a.code, l = e.detail, u = l.encryptedData, d = l.iv, h = {
                iv: d,
                code: s,
                loginType: 1,
                encryptedData: u,
                withCredentials: !0
              }, n.wechatLogin(n.loginSuccess.bind(n), h), t.next = 14;
              break;

            case 12:
              n.setAuthFail(), c("登录失败!");

            case 14:
              t.next = 21;
              break;

            case 16:
              t.prev = 16, t.t0 = t.catch(0), console.log("bindGetUserInfo", t.t0), n.setAuthFail(),
                c(t.t0);

            case 21:
            case "end":
              return t.stop();
          }
        }, t, n, [[0, 16]]);
      }))();
    },
    /***
     * 手机授权登录
     * ***/
    bindGetPhoneNumber: function (e) {
      var a = this, detail = e.detail;
      console.log(detail);
      memberApi.authorization_mobile(detail).then((res) => {

      })
    },
    loginByMobile: function () {
      var e = this.data, t = e.phone, i = e.code;
      if (!l(t, "phone")) return !1;
      if (i.length < 3) return wx.showToast({
        icon: "none",
        title: "请输入验证码"
      }), !1;
      var a = {
        phone: t,
        validCode: i,
        loginType: 2
      };
      if (this.data.notSubscribed) {
        var o = this.willLoginParams, s = o.iv, c = o.encryptedData, u = o.withCredentials, d = o.code;
        a = n({}, a, {
          iv: s,
          code: d,
          encryptedData: c,
          withCredentials: u
        });
      }
      r("登录中..."), this.wechatLogin(this.loginSuccess.bind(this), a);
    },
    loginSuccess: function (e) {
      this.setUserInfo(e), wx.showToast({
        icon: "success",
        title: "登录成功!"
      });
    },
    changeAccountLogin: function () {
      this.setData({
        isCancelBindMobile: !0
      });
    },
    updateMobile: function (e) {
      var t = this;
      a.put("platform/user/user-info-wechat-mobile", e).then(function (e) {
        t.bingPhoneSuccess(e);
      }).catch(function (e) {
        t.setAuthFail(), c(e.errorDetail + ",绑定失败!", 5e3);
      });
    },
    setUserInfo: function (e) {
      !e.mobile && this.data.bindMobile ? (wx.hideLoading(), this.setData({
        userInfo: e,
        mobile: "",
        isGetUserInfoPopup: !1,
        isClickHidden: !1
      })) : (this.setData({
        userInfo: e
      }), this.setAuthSuccess());
    },
    changeInput: function (t) {
      var n = t.currentTarget.dataset.name, i = t.detail.value;
      this.setData(e({}, n, i));
    },
    getCode: function () {
      var e = this.data.phone, t = this.data.overTime, n = this;
      if (l(e, "phone") && 60 == t) {
        n.setData({
          overTime: this.data.overTime - 1
        });
        var i = setInterval(function () {
          var e = n.data.overTime;
          e > 0 ? n.setData({
            overTime: e - 1
          }) : (clearInterval(i), n.setData({
            overTime: 60
          }));
        }, 1e3);
        a.post("/platform/auth/auth-code/send", {
          mobile: e
        }).then(function (e) {
          e.success && wx.showToast({
            icon: "success",
            title: e.data,
            duration: 3e3
          });
        });
      }
    },
    bingPhoneAntCode: function (e) {
      var t = this, n = this.data, i = n.phone, o = n.code;
      l(i, "phone") && o.length > 3 && a.put("/platform/user/user-info-mobile", {
        mobile: i,
        code: o
      }).then(function (e) {
        t.bingPhoneSuccess(e);
      }).catch(function (e) {
        c(e, 5e3);
      });
    },
    bingPhoneSuccess: function (e) {
      wx.hideLoading(), e.success && e.data && (i.getUserInfoDetail(this.setUserInfo.bind(this)),
        wx.showToast({
          icon: "success",
          title: "绑定成功!"
        }));
    },
    stopWxBind: function () {
      this.setData({
        isCancelBindMobile: !0
      });
    },
    bindPhoneCancal: function () {
      this.setData({
        isCancelBindMobile: !1
      });
    },
    stopTouchMove: function () {
      return !1;
    },
    cancelLogin: function () {
      this.data.isCanCancel && (this.setData({
        isGetUserInfoPopup: !0
      }), this.signInCallback());
    }
  }
});