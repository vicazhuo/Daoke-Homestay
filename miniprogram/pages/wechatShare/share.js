function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../apiFetch/wechatShareApi"));

var e = t(require("./util")), o = (require("../../common/js/utils.js")), i = require("../../components/toast/toast.js");

getApp();

Page({
    data: {
        fromid: "",
        isOldUser: !1,
        openId: "",
        writePhotosAlbum: !0,
        btnText: "保存图片",
        canvasWidth: 750,
        canvasHeight: 1334,
        windowWidth: 0,
        windowHeight: 0,
        ctx: null,
        isSaveSuccess: !1,
        activeId: "",
        qrcode: "",
        gourl: "",
        circleImgUrl: "",
        shareTitle: "",
        shareImgUrl: "",
        PWA_STATIC_TUJIA_HOST:''
    },
    onLoad: function(t) {
        console.log("options", t);
        var e = wx.getSystemInfoSync();
        if (this.setData({
            windowWidth: e.windowWidth,
            ratio: e.pixelRatio,
            fromid: t.fromid
        }), t.gourl && this.setData({
            gourl: t.gourl
        }), t.scene) {
            var i = t.scene;
            10 == (i = i.split("_"))[0] ? this.setData({
                gourl: o.PWA_TUJIA_HOST + "/h5/appw/gatheractivity/index?fromid=0"
            }) : 11 == i[0] ? this.setData({
                gourl: o.PWA_TUJIA_HOST + "/h5/promotion/dacu/1809/index?fromid=2"
            }) : this.setData({
                activeId: i[0]
            });
        }
        0 == this.data.fromid ? (t.circleimgurl && this.setData({
            circleImgUrl: decodeURIComponent(t.circleimgurl)
        }), t.sharetitle && this.setData({
            shareTitle: decodeURIComponent(t.sharetitle)
        }), t.shareimgurl && this.setData({
            shareImgUrl: decodeURIComponent(t.shareimgurl)
        }), this.setData({
            shareContTit: "邀请好友参团",
            shareContTxt: "拼团成功，人人必得"
        })) : 2 == this.data.fromid && this.setData({
            shareContTit: "爆款民宿全场1折起",
            shareContTxt: "拼团抢500元住宿红包"
        });
    },
    toFriendShare: function() {
        var t = this;
        if (2 == this.data.fromid) this.downLoadImg(o.PWA_STATIC_TUJIA_HOST + "/static/images/h5/pages/page-dacu1809/share-friend-circle.jpg").then(function(e) {
            console.log("downloadImg", e), t.saveImageToPhotosAlbum(e);
        }).catch(function(t) {
            console.log("toFriendShare err:", t);
        }); else if (0 == this.data.fromid) {
            var e = this.data.circleImgUrl;
            this.downLoadImg(e).then(function(e) {
                t.saveImageToPhotosAlbum(e);
            }).catch(function(t) {
                console.log("toFriendShare err:", t);
            });
        }
    },
    toBackH5: function() {
        0 == this.data.fromid ? wx.redirectTo({
            url: "/pages/wechatShareWebview/index?fromid=0&gourl=" + o.PWA_TUJIA_HOST + "/h5/appw/gatheractivity/index"
        }) : 2 == this.data.fromid && wx.redirectTo({
            url: "/pages/wechatShareWebview/index?fromid=2&gourl=" + o.PWA_TUJIA_HOST + "/h5/promotion/dacu/1809/index"
        });
    },
    saveImageToPhotosAlbum: function(t) {
        var e = this;
        console.log(t), wx.saveImageToPhotosAlbum({
            filePath: t,
            success: function(t) {
                console.log(t), wx.hideLoading(), wx.showToast({
                    title: "保存成功"
                }), e.setData({
                    isSaveSuccess: !0
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
    downLoadImg: function(t) {
        return new Promise(function(e, o) {
            wx.downloadFile({
                url: t,
                success: function(t) {
                    console.log(t), 200 === t.statusCode ? e(t.tempFilePath) : (i.showToast({
                        title: "图片生成失败",
                        duration: 2e3
                    }), o());
                },
                fail: function(t) {
                    console.log(t), i.showToast({
                        title: "图片生成失败",
                        duration: 2e3
                    }), o();
                },
                complete: function() {}
            });
        });
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
    formBtn: function(t) {
        console.log("form id=" + t), e.default.formBtn(t);
    },
    onShareAppMessage: function(t) {
        this.isFromshare = !0;
        var e = "", i = "", a = "";
        if (2 == this.data.fromid ? (e = "【1折起睡全球】秋日奇遇记 住进不可思议", i = "/pages/wechatShareWebview/index?fromid=2&gourl=" + this.data.gourl, 
        a = o.PWA_STATIC_TUJIA_HOST + "/static/images/h5/pages/page-dacu1809/share-miniprogram.jpg") : 0 == this.data.fromid && (i = "/pages/wechatShareWebview/index?fromid=0&gourl=" + this.data.gourl, 
        e = this.data.shareTitle || "全靠你了！一起躺赢途家住宿红包～", a = this.data.shareImgUrl || o.PWA_STATIC_TUJIA_HOST + "/static/wechat/gather/friendBg-yr.jpg"), 
        "button" == t.from) return console.log("来自页面内转发按钮"), {
            title: e,
            path: i,
            imageUrl: a,
            success: function() {
                getCurrentPages().length > 2 ? wx.navigateBack({
                    delta: 1
                }) : wx.redirectTo({
                    url: ""
                });
            }
        };
        console.log("来自右上角转发菜单");
    }
});