var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../common/js/utils")), o = require("../../../components/toast/toast.js"), n = getApp();

Page({
    data: {
        openId: "",
        writePhotosAlbum: !0,
        btnText: "保存图片",
        isSaveSuccess: !1,
        PWA_STATIC_TUJIA_HOST: "",
        sharePath: "",
        btnTextLeft: "",
        btnTextRight: "",
        shareContTxt: "",
        shareImageUrl: "",
        shareBgImageUrl: "",
        canvasimgUrl: "",
        popImgUrl: "",
        popTitle: "",
        popText: "",
        miniPath: ""
    },
    onLoad: function(t) {
        console.log("options", t);
        var o = wx.getSystemInfoSync();
        this.setData({
            windowWidth: o.windowWidth,
            ratio: o.pixelRatio
        }), this.setData({
            miniPath: t.miniPath ? decodeURIComponent(t.miniPath) : "",
            shareContTxt: t.shareContTxt ? decodeURIComponent(t.shareContTxt) : "",
            popTitle: t.title ? decodeURIComponent(t.title) : "",
            popText: t.text ? decodeURIComponent(t.text) : "",
            sharePath: t.sharePath ? decodeURIComponent(t.sharePath) : "",
            btnTextLeft: t.btnTextLeft ? decodeURIComponent(t.btnTextLeft) : "保存图片分享",
            btnTextRight: t.btnTextRight ? decodeURIComponent(t.btnTextRight) : "分享给好友",
            shareBgImageUrl: t.bgImgUrl ? decodeURIComponent(t.bgImgUrl) : e.PWA_STATIC_TUJIA_HOST + "/static/wechat/tujia/share/wsharebg.jpg",
            canvasimgUrl: t.canvasimgUrl ? decodeURIComponent(t.canvasimgUrl) : "",
            shareImageUrl: t.shareImageUrl ? decodeURIComponent(t.shareImageUrl) : "",
            popImgUrl: t.imgUrl ? decodeURIComponent(t.imgUrl) : ""
        }), this.checkLogin();
    },
    checkLogin: function() {
        n.initWxUserInfo(this.initWxUserInfoCB.bind(this), this.initWxUserInfoCB.bind(this));
    },
    initWxUserInfoCB: function() {
        var t = this;
        n.userIsLogin() ? t.setData({
            openId: n.globalUserInfo.tjUserInfo.openId
        }) : n.checkLogin(function(e) {
            n.setTjUserInfo(e), t.setData({
                openId: e.openId
            });
        }, function(e) {
            0 == e.userId && t.setData({
                openId: e.openId
            });
        });
    },
    toFriendShare: function() {
        var t = this;
        this.downLoadImg(this.data.canvasimgUrl).then(function(e) {
            console.log("downloadImg", e), t.saveImageToPhotosAlbum(e);
        }).catch(function(t) {
            console.log("toFriendShare err:", t);
        });
    },
    toBackH5: function() {
        wx.redirectTo({
            url: "/pages/webview/index?h5url=" + encodeURIComponent(this.data.sharePath)
        });
    },
    saveImageToPhotosAlbum: function(t) {
        var e = this;
        console.log(t), wx.saveImageToPhotosAlbum({
            filePath: t,
            success: function(t) {
                console.log(t), wx.hideLoading(), e.setData({
                    isSaveSuccess: !0
                }), wx.showToast({
                    title: "已保存到相册"
                });
            },
            fail: function(t) {
                console.log(t), e.checkAuth().then(function() {}).catch(function(t) {
                    e.setData({
                        btnText: "去授权保存到相册的权限"
                    });
                }), wx.showToast({
                    title: "保存失败"
                });
            }
        });
    },
    getMiniPath: function() {
        return this.data.miniPath ? this.data.miniPath : "/pages/webview/index?h5url=" + encodeURIComponent(this.data.sharePath);
    },
    downLoadImg: function(t) {
        return new Promise(function(e, n) {
            wx.downloadFile({
                url: t,
                success: function(t) {
                    console.log(t), 200 === t.statusCode ? e(t.tempFilePath) : (o.showToast({
                        title: "图片生成失败",
                        duration: 2e3
                    }), n());
                },
                fail: function(t) {
                    console.log(t), o.showToast({
                        title: "图片生成失败",
                        duration: 2e3
                    }), n();
                },
                complete: function() {}
            });
        });
    },
    getSize: function(t) {
        return t * (this.data.windowWidth / 375);
    },
    onShow: function() {
        this.isFromshare && (this.toBackH5(), this.isFromshare = !1), this.data.writePhotosAlbum || this.checkAuth();
    },
    checkAuth: function() {
        var t = this;
        return new Promise(function(e, o) {
            wx.getSetting({
                success: function(e) {
                    var o = e.authSetting["scope.writePhotosAlbum"];
                    t.setData({
                        writePhotoAlbum: !1,
                        btnText: o ? "保存图片" : "去授权保存到相册的权限"
                    });
                }
            });
        });
    },
    formBtn: function(e) {
        console.log("form id=" + e), t.default.formBtn(e);
    },
    onShareAppMessage: function(t) {
        if (this.isFromshare = !0, "button" == t.from) return {
            title: this.data.shareContTxt,
            path: this.getMiniPath(),
            imageUrl: this.data.shareImageUrl,
            success: function() {
                getCurrentPages().length > 2 ? wx.navigateBack({
                    delta: 1
                }) : wx.redirectTo({
                    url: "/pages/webview/index?h5url=" + encodeURIComponent(this.data.sharePath)
                });
            }
        };
        console.log("来自右上角转发菜单");
    }
});