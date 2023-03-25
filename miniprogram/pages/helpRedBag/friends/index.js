var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../apiFetch/helpRedbagApi")), i = require("../util");

Page({
    data: {
        width: 315,
        height: 420,
        canvasWidth: 630,
        canvasHeight: 840,
        nickname: "",
        picurl: "",
        picurlBase64: "",
        writePhotosAlbum: !0,
        btnText: "保存图片",
        PWA_STATIC_TUJIA_HOST: '',
        isCreateError: !1,
        isPage: "init",
        pageErrorData: {
            imgHost: '',
            errorText: "图片生成失败啦"
        }
    },
    windowWidth: 0,
    windowHeight: 0,
    ctx: null,
    onLoad: function(e) {
        var i = this, o = wx.getSystemInfoSync();
        this.windowWidth = o.windowWidth, this.ratio = o.pixelRatio, this.orderNo = e.id;
        var a = "", n = "", s = wx.getStorageSync("wxUserInfo");
        s && (s.avatarUrl && (a = s.avatarUrl), s.nickName && (n = s.nickName)), a && n ? this.setUserInfo(a, n) : t.default.queryHelpActiveDetail(e.id).then(function(t) {
            var e = t.picUrl, o = t.nickname;
            i.setUserInfo(e, o);
        });
    },
    setUserInfo: function(t, e) {
        this.setData({
            nickname: e,
            picurl: t
        }), this.pageReload();
    },
    onShow: function() {
        this.data.writePhotosAlbum || this.checkAuth();
    },
    pageReload: function() {
        var t = this, i = this.data, o = i.nickname, a = i.picurl, n = wx.createCanvasContext("canvas");
        this.ctx = n, n.width = 4 * this.data.width, n.height = 4 * this.data.height, this.downLoadImg(e.PWA_STATIC_TUJIA_HOST + "/static/wechat/promotion/redpacket/bg_firend.jpg").then(function(e) {
            console.log(n), n.drawImage(e, 0, 0, t.getSize(315), t.getSize(420)), t.setUserName(n, "“" + o + "”", "在预订途家民宿，请你来帮忙"), 
            t.clipUserImg(n, a);
        });
    },
    getSize: function(t) {
        return t * (this.windowWidth / 375);
    },
    setUserName: function(t, e, i) {
        t.setFontSize(13), t.setFillStyle("#fff"), t.fillText(e, this.getSize(70), this.getSize(42)), 
        t.fillText(i, this.getSize(70), this.getSize(61));
    },
    clipUserImg: function(e, o) {
        var a = this, n = this.getSize(40);
        e.save(), e.beginPath(), e.arc(this.getSize(46), this.getSize(48), n / 2, 0, 2 * Math.PI, !1), 
        e.clip(), e.setLineWidth(2), this.downLoadImg(o).then(function(o) {
            e.drawImage(o, a.getSize(26), a.getSize(29), n, n), e.setStrokeStyle("#fff"), e.stroke(), 
            e.restore(), t.default.createQrCode(a.orderNo).then(function(t) {
                if (!t.url) return (0, i.toast)("二维码信息获取失败");
                a.setIsPage(), a.setData({
                    qrCodeUrl: t.url
                }), a.downLoadImg(t.url).then(function(t) {
                    e.drawImage(t, a.getSize(22), a.getSize(350), a.getSize(43), a.getSize(43)), e.draw();
                });
            }).catch(function(t) {
                console.error(t), a.setIsPage("fail");
            });
        }).catch(function(t) {});
    },
    backPage: function() {
        wx.navigateBack();
    },
    saveImageToPhotosAlbumTap: function() {
        var t = this;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: this.getSize(315),
            height: this.getSize(420),
            canvasId: "canvas",
            fileType: "jpg",
            success: function(e) {
                console.log(e), t.saveImageToPhotosAlbum(e.tempFilePath);
            },
            fail: function(t) {
                console.log(t), (0, i.toast)("保存失败");
            }
        }, this);
    },
    saveImageToPhotosAlbum: function(t) {
        var e = this;
        wx.saveImageToPhotosAlbum({
            filePath: t,
            success: function(t) {
                console.log(t), (0, i.toast)("保存成功");
            },
            fail: function(t) {
                console.log(t), e.checkAuth().then(function() {}).catch(function(t) {
                    e.setData({
                        btnText: "去授权保存到相册的权限"
                    });
                }), (0, i.toast)("保存失败");
            }
        });
    },
    checkAuth: function() {
        var t = this;
        return new Promise(function(e, i) {
            wx.getSetting({
                success: function(o) {
                    var a = o.authSetting["scope.writePhotosAlbum"];
                    t.setData({
                        writePhotosAlbum: !1,
                        btnText: a ? "保存图片" : "去授权保存到相册的权限"
                    }), a ? e() : i();
                }
            });
        });
    },
    downLoadImg: function(t) {
        var e = this;
        return wx.showLoading({
            mask: !0,
            title: "请稍候..."
        }), console.log("downFile:", t), new Promise(function(o, a) {
            wx.downloadFile({
                url: t,
                success: function(t) {
                    console.log(t), 200 === t.statusCode ? o(t.tempFilePath) : ((0, i.toast)("图片生成失败"), 
                    e.setIsPage("fail"), a());
                },
                fail: function(t) {
                    console.log(t), (0, i.toast)("图片生成失败"), e.setIsPage("fail"), a();
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    setIsPage: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "success";
        this.setData({
            isPage: t
        });
    }
});