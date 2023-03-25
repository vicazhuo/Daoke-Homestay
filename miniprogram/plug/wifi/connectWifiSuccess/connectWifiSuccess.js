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

var o = require("../../../common/js/utils.js"), n = e(require("../../../components/toast/toast.js")), i = e(require("../../../apiFetch/tjFetch2")), a = e(require("../../../apiFetch/wifiApi")), s = getApp().globalStaticUrl;

Page({
    data: {
        PWA_STATIC_TUJIA_HOST: s,
        userStatus: 0,
        authPhone: "",
        phone: "",
        code: "",
        countDownTimer: null,
        countDownTime: 60,
        isCountDown: !1,
        isLoading: !1,
        openId: "",
        wxUserInfo: "",
        isImageVerCode: !1,
        sceneId: "",
        isLogin: !1,
        redPacketAmount: 0,
        newUserRedpacketAmount: 300,
        inviterId: "",
        inviterType: ""
    },
    onLoad: function(e) {
        var t = e.userStatus || "1";
        console.log("success---options:", e), this.setData({
            userStatus: t,
            openId: e.openId || "",
            sceneId: e.sceneId || "",
            redPacketAmount: e.redPacketAmount || 0,
            inviterType: e.inviterType || "",
            inviterId: e.inviterId || ""
        });
        var o = getApp();
        o.globalGio("track", "wifi_connect_success", {
            wifiId: e.sceneId,
            openId: o.globalUserInfo.tjUserInfo.openId
        }), o.userIsLogin() && this.setData({
            isLogin: !0
        });
    },
    onUnLoad: function() {
        clearInterval(this.data.countDownTimer);
    },
    bindInputText: function(e) {
        var o = e.target.dataset.type, n = e.detail.value;
        this.setData(t({}, o, n));
    },
    loginSucess: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    getImageVerCode: function() {
        var e = this.data, t = e.phone, i = e.isCountDown;
        if (t && !i) return (0, o.checkMobile)(t) ? void this.setData({
            isImageVerCode: !0
        }) : n.default.showToast({
            title: "请输入正确的手机号"
        });
    },
    getSMSCode: function(e) {
        var t = this;
        this.setData({
            isImageVerCode: !1
        });
        getApp().globalConfig;
        var o = this.data, i = o.phone, s = (o.isCountDown, e.detail), r = s.token, u = s.code;
        this.setData({
            isLoading: !0
        }), console.log(888, i, r, u), a.default.getSMSCode({
            mobile: i,
            token: r,
            code: u
        }).then(function() {
            n.default.showToast({
                title: "发送验证码成功"
            }), t.setData({
                isCountDown: !0
            }), t.countDown();
        }).catch(function(e) {
            n.default.showToast({
                title: e.errorMsg
            }), console.log(e);
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
    toMainPage: function() {
        var e = "";
        e = "2" === this.data.userStatus ? "../../index/index" : "../../user/index/index", 
        wx.switchTab({
            url: e
        });
    },
    getUserInfo: function(e) {
        if (!this.data.wxUserInfo) {
            var t = getApp(), o = e.detail.userInfo;
            t.globalUserInfo.wxUserInfo = o, this.setData({
                wxUserInfo: o
            });
        }
    },
    login: function() {
        var e = this, t = this.data, i = t.phone, s = t.code, r = t.openId;
        getApp().globalConfig;
        if (i && s) {
            if (!(0, o.checkMobile)(i)) return n.default.showToast({
                title: "请输入正确的手机号"
            });
            this.setData({
                isLoading: !0
            }), a.default.bindAndLogin({
                mobile: i,
                verCode: s,
                openId: r,
                globalCode: "WxAppWifiCode",
                wifiId: this.data.sceneId
            }).then(function(t) {
                console.log("注册成功！", t);
                var o = getApp();
                n.default.showToast({
                    title: t.userId > 0 ? "注册成功！" : t.errorMessage
                }), o.setTjUserInfo(t), e.toMainPage();
            }).catch(function(e) {
                console.log("注册失败", e), n.default.showToast({
                    title: e.errorMsg || "注册失败"
                });
            }).finally(function() {
                return e.setData({
                    isLoading: !1
                });
            });
        }
    },
    goRoleH5Page: function(e) {
        var t = "1" === e.target.dataset.type ? "https://passport.tujia.com/H5Site/ServicePage?mref=client" : "https://pwa.tujia.com/h5/mob/protocol/registerprivacy?mref=wxclient";
        wx.navigateTo({
            url: "/pages/user/webView/webView?webUrl=" + encodeURIComponent(t)
        });
    }
});