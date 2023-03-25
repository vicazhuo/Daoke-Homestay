function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

var o = require("../../../../common/js/utils"), n = (e(o), e(require("../../../../apiFetch/wifiApi"))), a = getApp();

Component({
    properties: {
        ifWiFi: {
            type: Boolean
        },
        wifiId: {
            type: String,
            value: ""
        },
        inviterId: {
            type: String,
            value: ""
        },
        inviterType: {
            type: String,
            value: ""
        }
    },
    ready: function() {
        this.checkLogin();
    },
    data: {
        isLoading: !1,
        phone: "",
        code: "",
        openId: "",
        isCountDown: !1,
        isImageVerCode: !1,
        countDownTimer: null,
        countDownTime: 60,
      PWA_STATIC_TUJIA_HOST: a.globalStaticUrl,
        formId: "",
        inputDisabled: !1
    },
    methods: {
        blurFocus: function() {
            this.setData({
                inputDisabled: !0
            });
        },
        checkLogin: function() {
            this.initWxUserInfoCB();
        },
        formBtn1: function(e) {
            console.log("form id=", e), this.setData({
                formId: e.detail && e.detail.formId || ""
            }), this.login();
        },
        formBtn: function(e) {
            console.log("form id=", e), this.setData({
                formId: e.detail && e.detail.formId || ""
            });
        },
        initWxUserInfoCB: function() {
            var e = this;
            wx.showLoading({
                mask: !0,
                title: "请稍后..."
            }), a.checkLogin(function(t) {
                e.setData({
                    openId: t.openId
                }), a.setTjUserInfo(t), wx.hideLoading();
            }, function(t) {
                t.openId && e.setData({
                    openId: t.openId
                }), wx.hideLoading();
            });
        },
        getImageVerCode: function() {
            var e = this.data, t = e.phone, n = e.isCountDown;
            if (t && !n) return (0, o.checkMobile)(t) ? void this.setData({
                isImageVerCode: !0
            }) : wx.showToast({
                title: "请输入正确的手机号",
                icon: "none"
            });
        },
        getSMSCode: function(e) {
            var t = this;
            this.setData({
                isImageVerCode: !1
            });
            var o = this.data, i = o.phone, a = (o.isCountDown, e.detail), s = a.token, r = a.code;
            this.setData({
                isLoading: !0
            }), console.log(888, i, s, r), n.default.getSMSCode({
                mobile: i,
                token: s,
                code: r
            }).then(function() {
                wx.showToast({
                    title: "发送验证码成功",
                    icon: "none"
                }), t.setData({
                    isCountDown: !0
                }), t.countDown();
            }).catch(function(e) {
                e.errorNo;
                var t = e.errorMsg;
                wx.showToast({
                    title: t,
                    icon: "none"
                });
            }).finally(function() {
                t.setData({
                    isLoading: !1
                });
            });
        },
        countDown: function() {
            var e = this, t = setInterval(function() {
                var t = e.data.countDownTime;
                t <= 0 ? (clearInterval(e.data.countDownTimer), e.setData({
                    countDownTime: 60,
                    isCountDown: !1
                })) : e.setData({
                    countDownTime: --t
                });
            }, 1e3);
            this.setData({
                countDownTimer: t
            });
        },
        getPhoneNumber: function(e) {
            var t = this.data.openId;
            this.setData({
                inputDisabled: !1
            });
            var o = "WxAppWifiCode";
            "6wd_login" == this.data.scene && (o = "WLGL");
            var n = e.detail, i = n.encryptedData, a = n.iv;
            i && this.decodePhoneAndLogin({
                wifiId: this.data.wifiId,
                formId: this.data.formId,
                globalCode: o,
                openId: t,
                inviterId: this.data.inviterId,
                inviterType: this.data.inviterType,
                iv: encodeURIComponent(a),
                encryptedData: encodeURIComponent(i)
            });
        },
        decodePhoneAndLogin: function(e) {
            var t = this, o = a.globalUserInfo.wxUserInfo;
            o && (e.userInfo = JSON.stringify(o)), console.log("decodePhoneAndLogin:", e), wx.showLoading({
                mask: !0,
                title: "请稍后..."
            }), n.default.getUnionLogin(e).then(function(e) {
                wx.setStorageSync("userToken", e.userToken), a.setTjUserInfo(e), t.loginSucess();
            }).catch(function(e) {
                e.errorNo;
                var t = e.errorMsg;
                wx.showToast({
                    title: t,
                    icon: "none"
                });
            }).finally(function() {
                wx.hideLoading();
            });
        },
        login: function(e) {
            var t = this, i = this.data.openId, s = this.data, r = s.phone, d = s.code;
            if (r && d) {
                if (!(0, o.checkMobile)(r)) return wx.showToast({
                    title: "请输入正确的手机号",
                    icon: "none"
                });
                this.setData({
                    isLoading: !0
                });
                var c = "WxAppWifiCode";
                "6wd_login" == this.data.scene && (c = "WLGL"), console.log(this.data.wifiId + "wifiid"), 
                console.log(this.data.inviterType + "inviterType"), n.default.bindAndLogin({
                    mobile: r,
                    verCode: d,
                    openId: i,
                    globalCode: c,
                    wifiId: this.data.wifiId,
                    formId: this.data.formId,
                    inviterId: this.data.inviterId,
                    inviterType: this.data.inviterType
                }).then(function(e) {
                    console.log(e), wx.showToast({
                        title: "登陆成功！",
                        icon: "none"
                    }), wx.setStorageSync("userToken", e.userToken), a.setTjUserInfo(e), t.loginSucess();
                }).catch(function(e) {
                    e.errorNo;
                    var t = e.errorMsg;
                    wx.showToast({
                        title: t || "登陆失败",
                        icon: "none"
                    });
                }).finally(function() {
                    return t.setData({
                        isLoading: !1
                    });
                });
            }
        },
        bindInputText: function(e) {
            var o = e.target.dataset.type, n = e.detail.value;
            this.setData(t({}, o, n));
        },
        goRoleH5Page: function(e) {
            var t = "1" === e.target.dataset.type ? "https://passport.tujia.com/H5Site/ServicePage?mref=client" : "https://pwa.tujia.com/h5/mob/protocol/registerprivacy?mref=wxclient";
            wx.navigateTo({
                url: "/pages/user/webView/webView?webUrl=" + encodeURIComponent(t)
            });
        },
        loginSucess: function() {
            this.triggerEvent("loginSucess", {});
        }
    }
});