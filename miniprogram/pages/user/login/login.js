var e = require("../../../common/js/tjRequest.js"), t = require("../../../common/js/utils.js"), o = require("../../../common/js/cookieRecord.js"), i = require("../../../components/toast/showToast.js");
var app = getApp();
Page({
    data: {
        isShowForm: !1,
        isShowChangeBtn: !1,
        user: {},
        wxUser: {},
        btnVerCodeLoading: !1,
        btnBindLoading: !1,
        isLoading: !1,
        btnBindDisabled: !1,
        verCodeTitle: "获取验证码",
        verCodeDisabled: !1,
        isShowImgVerifyCode: !1,
        picVerCode: "",
        picVerCodeToken: "",
        isGetUserInfoPopup: !1
    },
    registerFormCode: "",
    _nextPath: "/pages/user/index/index",
    _openType: "back",
    onLoad: function(e) {
        this._nextPath = decodeURIComponent(e.nextPath || this._nextPath), this._openType = e.openType || this._openType, 
        this.registerFormCode = e.code && "undefined" != e.code ? e.code : "", getApp().initWxUserInfo(this.initWxUserInfoCB, this.initWxUserInfoCB), 
        console.log(e);
    },
    initWxUserInfoCB: function(e) {
        var t = getApp(), o = this;
        o.setData({
            wxUser: e || "",
            isLoading: !0
        }), t.userIsLogin() ? (o.setData({
            user: t.globalUserInfo.tjUserInfo,
            isShowChangeBtn: !0
        }), o.setData({
            isLoading: !1
        })) : t.checkLogin(o.ckLgnSC, o.ckLgnFC);
    },
    ckLgnSC: function(e) {
        e.userId > 0 ? this.setData({
            user: e,
            isShowChangeBtn: !0,
            isLoading: !1
        }) : this.setData({
            user: e,
            isShowForm: !0,
            isLoading: !1
        });
    },
    ckLgnFC: function(e) {
        this.setData({
            user: e || {},
            isShowForm: !0,
            isLoading: !1
        });
    },
    changeUser: function(e) {
        this.setData({
            isShowForm: !0,
            isShowChangeBtn: !1
        });
    },
    immediateLogin: function(e) {
        getApp().setTjUserInfo(this.data.user), this.getWxUserInfo();
    },
    checkMobile: function(e) {
        return !(!e || 0 == e.length || !t.checkMobile(e)) || (i.showToast({
            title: "请输入正确的手机号"
        }), !1);
    },
    checkVerCode: function(e) {
        return !(!e || 0 == e.length) || (i.showToast({
            title: "请输入验证码"
        }), !1);
    },
    sendVerCode: function(e) {
        getApp().globalConfig;
        var t = e.detail.value.mobile;
        e.detail.formId;
        this.checkMobile(t) && (this.setData({
            isShowImgVerifyCode: !0
        }), e.detail.value.picVerCode = "", this.getPicVerCode());
    },
    getVerCode: function(t) {
        this.setData({
            isShowImgVerifyCode: !1
        });
        var o = getApp().globalConfig, a = t.detail.value.mobile, s = t.detail.formId || "", n = this.data.picVerCodeToken, r = t.detail.value.picVerCode, c = this;
        e.tjPost({
            url: o.WechatCustomerUri + o.SendVerCode,
            data: {
                mobile: a,
                formId: s,
                token: n,
                code: r
            },
            success: function(e) {
                e.data.isSuccess ? (i.showToast({
                    title: "验证码已发送"
                }), c.setVerCodeInterval()) : i.showToast({
                    title: e.data.errmsg
                });
            },
            fail: function(e) {
                i.showToast({
                  title: e.data.errmsg
                });
            },
            complete: function() {}
        });
    },
    getPicVerCode: function() {
        var t = this, o = getApp().globalConfig;
        e.tjPost({
            url: o.WechatCustomerUri + o.GetImageVerifyCode,
            data: "",
            success: function(e) {
                e.data.isSuccess && t.setData({
                    picVerCode:e.data.data.image,
                    picVerCodeToken: e.data.data.token
                });
            }
        });
    },
    setVerCodeInterval: function() {
        var e, o = this, i = 60, a = !0, s = setInterval(function() {
            i <= 0 ? (a = !1, clearInterval(s), e = "获取验证码") : e = t.strFormat("已发送({0}s)", i), 
            o.setData({
                verCodeDisabled: a,
                verCodeTitle: e
            }), i--;
        }, 1e3);
    },
    login: function(t) {
        var a = getApp(), s = this.data.user, n = a.globalConfig, r = t.detail.value.mobile, c = t.detail.value.vercode, d = t.detail.formId || "", l = this.registerFormCode || a.getGlobalCode() || "", g = this.data.wxUser, h = this;
        h.data.btnBindLoading || h.checkMobile(r) && h.checkVerCode(c) && (h.setData({
            btnBindLoading: !0
        }), e.tjPost({
            url: n.WechatCustomerUri + n.BindAndLogin,
            data: {
                mobile: r,
                verCode: c,
                openId: s.openId,
                globalCode: l,
                userInfo: g,
                formId: d,
                cookieRecord: o.getCookieRecord()
            },
            success: function(e) {
              console.log(e.data.data)
                if (e.data.isSuccess) a.setTjUserInfo(e.data.data), i.showToast({
                    title: "登录成功"
                }), h.getWxUserInfo(); else {
                    
                       wx.showToast({
                         title: e.data.errmsg,
                         icon:'none'
                       })
                     
                }
            },
            fail: function() {
                i.showToast({
                    title: "手机号或验证码错误"
                });
            },
            complete: function() {
                h.setData({
                    btnBindLoading: !1
                });
            }
        }));
    },
    formSubmit: function(e) {
        "btnsubmit" == e.detail.target.id ? this.login(e) : "picVerBtn" == e.detail.target.id ? this.getPicVerCode(e) : "picVerSureBtn" == e.detail.target.id ? this.getVerCode(e) : this.sendVerCode(e);
    },
    goNextPath: function() {
        var e = this;
        switch (this._openType) {
          case "redirect":
            wx.redirectTo({
                url: this._nextPath,
                success: function() {
                    e.callback();
                }
            });
            break;

          case "navigate":
            wx.navigateTo({
                url: this._nextPath,
                success: function() {
                    e.callback();
                }
            });
            break;

          case "switchTab":
            wx.switchTab({
                url: this._nextPath,
                success: function() {
                    e.callback();
                }
            });
            break;

          case "back":
            wx.navigateBack({
                delta: 1,
                success: function() {
                    e.callback();
                }
            });
        }
    },
    callback: function() {
        var e = getCurrentPages(), t = e[e.length - 2];
        t && t.loginCallback && t.loginCallback();
    },
    goRoleH5Page: function(e) {

      var t = "1" === e.target.dataset.type ? "https://wxapi.05178.top/api/minsu.h5/service?appid=" + app.siteInfo.appid : "https://wxapi.05178.top/api/minsu.h5/?appid="+ app.siteInfo.appid;
        wx.navigateTo({
            url: "/pages/user/webView/webView?webUrl=" + encodeURIComponent(t)
        });
    },
    getUserInfoPopupClose: function() {
        this.goNextPath();
    },
    getWxUserInfo: function() {
        var e = this;
        getApp().initWxUserInfo(function() {
            e.goNextPath();
        }, function() {
            e.setData({
                isGetUserInfoPopup: !0
            });
        });
    }
});