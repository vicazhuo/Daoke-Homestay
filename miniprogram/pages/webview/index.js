function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../apiFetch/wechatShareApi")), a = (e(require("../../common/js/utils")), 
e(require("../../common/js/cookieRecord"))), n = getApp(), i = 0;

Page({
    data: {
        tjuserid: "",
        tjusertoken: "",
        weburl: "",
        shareimageurl: "",
        sharepathurl: "",
        sharetit: "",
        groupGuid: "",
        storeGuid: "",
        hasBind: !1
    },
    onLoad: function(e) {
        var t = this, o = a.default.getH5UrlCode(e.h5url);
        a.default.setTjCodeSite(o);
        var s = n.globalUserInfo.tjUserInfo.userId, r = n.globalUserInfo.tjUserInfo.userToken;
        if (this.setData({
            tjuserid: s,
            tjusertoken: r
        }), e.scene) {
            var d = e.scene, u = (d = d.split("_"))[0].replace("gcd", ""), l = "";
            e.scene.indexOf("fvt") > -1 && (l = ".fvt"), e.scene.indexOf("t1") > -1 && (l = "1.fvt"), 
            e.scene.indexOf("t2") > -1 && (l = "2.fvt");
            var h = "https://go" + l + ".tujia.com/" + u + "/?mref=wxclient&tjuserid=" + this.data.tjuserid + "&tjusertoken=" + this.data.tjusertoken + "&hasbind=" + this.data.hasbind + "&groupguid=" + this.data.groupGuid + "&storeguid=" + this.data.storeGuid;
            this.setData({
                weburl: h
            });
        }
        if (this.setData({
            sharetit: e.sharetit ? decodeURIComponent(e.sharetit) : "",
            sharepathurl: e.sharepath ? decodeURIComponent(e.sharepath) : "",
            shareimageurl: e.shareimageurl ? decodeURIComponent(e.shareimageurl) : "",
            loginType: e.loginType ? decodeURIComponent(e.loginType) : ""
        }), e.h5url) {
            var c = decodeURIComponent(e.h5url);
            console.log("origin assigned url ", c);
            var g = -1 == (c = this._cleanupUserIdAndToken(c)).indexOf("?") ? "?" : "&", p = getApp().globalSceneCode;
            if (1036 == p || 1069 == p ? i = 1 : 1038 != p && 1089 != p && 1090 != p && (i = 0), 
            console.log("this.data.loginType", this.data.loginType), 1 == this.data.loginType || 2 == this.data.loginType) if (this.data.tjusertoken) this.setData({
                weburl: decodeURIComponent(c)
            }), console.log("after cleanup, h5url=", c, "; and renderurl=", this.data.weburl), 
            this.initAuthor(c, g); else {
                var f = "/pages/webview/index?h5url=" + c;
                wx.redirectTo({
                    url: "/pages/wifi_v2/matAndWifi/wifiLogin/index?nextPath=" + encodeURIComponent(f) + "&openType=redirect"
                });
            } else {
                c = c + g + "mref=wxclient&tjuserid=" + this.data.tjuserid + "&tjusertoken=" + this.data.tjusertoken + "&hasbind=" + this.data.hasBind + "&groupGuid=" + this.data.groupGuid + "&storeGuid=" + this.data.storeGuid + "&flag=" + i, 
                this.setData({
                    weburl: decodeURIComponent(c)
                });
                c.includes("/h5/appw/landloardInvite/index") && this.checkAuthor().then(function(e) {
                    e.hasBind || t.showNotbindModal();
                });
            }
        }
        n.initWxUserInfo();
    },
    initAuthor: function(e, t) {
        var a = this;
        this.checkAuthor().then(function(n) {
            console.log("this.data.loginType", a.data.loginType, !n.hasBind), 2 != a.data.loginType || n.hasBind || a.showNotbindModal(), 
            e = e + t + "mref=wxclient&tjuserid=" + a.data.tjuserid + "&tjusertoken=" + a.data.tjusertoken + "&hasbind=" + a.data.hasBind + "&groupGuid=" + a.data.groupGuid + "&storeGuid=" + a.data.storeGuid + "&flag=" + i, 
            a.setData({
                weburl: decodeURIComponent(e)
            }), console.log("after cleanup, h5url=", e, "; and renderurl=", a.data.weburl);
        }).catch(function(n) {
            if (2 == a.data.loginType) {
                var o = "/pages/webview/index?h5url=" + e + "&loginType=2";
                wx.redirectTo({
                    url: "/pages/user/login/login?nextPath=" + encodeURIComponent(o) + "&openType=redirect"
                });
            } else e = e + t + "mref=wxclient&tjuserid=" + a.data.tjuserid + "&tjusertoken=" + a.data.tjusertoken + "&flag=" + i, 
            a.setData({
                weburl: decodeURIComponent(e)
            });
            console.log("after cleanup, h5url=", e, "; and renderurl=", a.data.weburl);
        });
    },
    checkAuthor: function() {
        var e = this;
        return new Promise(function(a, i) {
            t.default.haspullnewauthory({
                userToken: n.globalUserInfo.tjUserInfo.userToken
            }).then(function(t) {
                e.setData({
                    groupGuid: t.groupGuid || "",
                    storeGuid: t.storeGuid || "",
                    hasBind: t.hasBind
                }), a(t);
            }).catch(function(e) {
                i();
            });
        });
    },
    _cleanupUserIdAndToken: function(e) {
        var t = -1;
        if (-1 != (t = e.indexOf("?")) && t < e.length - 1) {
            var a = e.substring(t + 1).split("&").filter(function(e) {
                return 0 != e.indexOf("tjuserid") && 0 != e.indexOf("tjusertoken");
            });
            e = e.substring(0, t), a.length > 0 && (e += "?" + a.join("&"));
        }
        return e;
    },
    getmessage: function(e) {
        if (console.log("getmessage=", e), this.data.tjusertoken) console.log(e); else {
            this.setData({
                tjuserid: e.detail.data[0] ? e.detail.data[0].userId : ""
            }), this.setData({
                tjusertoken: e.detail.data[0] ? e.detail.data[0].userToken : ""
            });
            var t = {
                userId: this.data.tjuserid,
                userToken: this.data.tjusertoken
            };
            console.log("getmessage,,userinfo=", t), n.setTjUserInfo(t);
        }
    },
    onShareAppMessage: function(e) {},
    showNotbindModal: function() {
        wx.showModal({
            title: "提示",
            content: "请使用房东身份登录",
            showCancel: !1,
            complete: function() {
                wx.switchTab({
                    url: "/pages/index/index"
                });
            }
        });
    }
});