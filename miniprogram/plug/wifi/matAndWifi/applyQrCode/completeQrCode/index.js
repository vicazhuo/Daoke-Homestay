var  i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../../apiFetch/wifiApi")), e = require("../../../../../common/js/utils"), o = "/pages/wifi_v2/matAndWifi/applyQrCode/completeQrCode/index", n = "";

Page({
    data: {
        windowWidth: 0,
        widthHeight: "",
        ratio: "",
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl,
        wifiId: "",
        wifiName: "",
        wifiUrl: "",
        context: "",
        wifiWidth: "",
        loginUrl: "/pages/wifi_v2/matAndWifi/wifiLogin/index",
        indexUrl: "/pages/wifi_v2/wifiList/wifiList",
        enumQRCodeType: 1,
        powerfail: !1,
        btnText: "保存到相册"
    },
    onLoad: function(t) {
        var i = wx.getSystemInfoSync();
        this.setData({
            windowWidth: i.windowWidth,
            widthHeight: i.windowHeight,
            ratio: i.pixelRatio,
            wifiId: t.wifiid || ""
        }), n = this._getWexincodeTextTitle(this.data.wifiId.toString()).width + this._getWexincodeTextTitle("Wi-Fi编号：").width;
    },
    onReady: function() {
        this.data.wifiId && this._init();
    },
    onShow: function() {},
    editQrcode: function() {
        wx.redirectTo({
            url: "/pages/wifi_v2/wifiList/wifiList"
        });
    },
    savePhoto: function() {
        this._canvasReload();
    },
    _init: function() {
        this._initData();
    },
    _initData: function() {
        var t = this, e = {
            wifiId: this.data.wifiId
        };
        wx.showLoading(), i.default.getWifiById(e).then(function(i) {
            var e = t._getWexincodeTextTitle(i.name);
            t.setData({
                wifiName: e.str,
                wifiWidth: e.width,
                wifiUrl: i.url || "",
                enumQRCodeType: i.enumQRCodeType
            }), console.log(t.data.wifiWidth);
        }).catch(function(i) {
            var e = i.errorNo, o = i.errorMsg;
            "60012" == e ? t._tokenOverdueHandler() : wx.showToast({
                title: o || "获取详情失败",
                icon: "none"
            });
        }).finally(function() {
            wx.hideLoading();
        });
    },
    _getWexincodeTextTitle: function(t) {
        function i(t) {
            return !!new RegExp("[\\u4E00-\\u9FFF]").test(t);
        }
        var e = Math.floor((2 * this.data.windowWidth - 100 - 160 - 64) / 30), o = {};
        o.str = t.slice(0, e), o.width = e < o.str.length ? 30 * e : 30 * o.str.length;
        var n = "", a = 0, s = !0, r = !1, d = void 0;
        try {
            for (var l, c = o.str[Symbol.iterator](); !(s = (l = c.next()).done); s = !0) {
                var w = l.value;
                if (e < 0 || 0 == e) break;
                i(w) ? (n += w, a += 60, e -= 2) : (n += w, a += 30, e -= 1);
            }
        } catch (t) {
            r = !0, d = t;
        } finally {
            try {
                !s && c.return && c.return();
            } finally {
                if (r) throw d;
            }
        }
        return o.str = n, o.width = a, t.length > o.str.length && (i(o.str[o.str.length - 1]) || i(o.str[o.str.length]) ? (o.str = o.str.slice(0, o.str.length - 1) + "...", 
        o.width = o.width - 30) : o.str = o.str.slice(0, o.str.length - 2) + "..."), o;
    },
    _canvasReload: function() {
        var i = this, a = wx.createCanvasContext("mycanvas");
        this.setData({
            context: a
        }), this._downLoadImg(t.PWA_STATIC_TUJIA_HOST + "/static/wechat/wifitwo/wifi_qrbg.jpg").then(function(s) {
            a.drawImage(s, 0, 0, i._getSize(375), i._getSize(500)), a.setFillStyle("#fff"), 
            a.setFontSize(i._getSize(30)), a.fillText("" + i.data.wifiName, (i.data.windowWidth - i._getSize(i.data.wifiWidth / 2) - i._getSize(37)) / 2 + i._getSize(37), i._getSize(71)), 
            a.setFillStyle("#fff"), a.font = "normal 12px sans-serif", a.fillText("Wi-Fi编号：" + i.data.wifiId, (i.data.windowWidth - i._getSize(n / 2) - i._getSize(37)) / 2 + i._getSize(67), i._getSize(395)), 
            i._downLoadImg(t.PWA_STATIC_TUJIA_HOST + "/static/wechat/wifitwo/wifi.png").then(function(t) {
                a.drawImage(t, (i.data.windowWidth - i._getSize(i.data.wifiWidth / 2) - i._getSize(37)) / 2, i._getSize(44), i._getSize(32), i._getSize(32)), 
                i._downLoadImg(i.data.wifiUrl).then(function(t) {
                    1 == i.data.enumQRCodeType && (a.arc(i.data.windowWidth / 2, i._getSize(220), i._getSize(106), 0, 2 * Math.PI), 
                    a.setFillStyle("#fff"), a.fill()), a.drawImage(t, i.data.windowWidth / 2 - i._getSize(100), i._getSize(120), i._getSize(200), i._getSize(200)), 
                    a.draw(!0, function() {
                        i._canvasToTempFilePath();
                    });
                }).catch(function(t) {
                    console.log("mpqr", t), (0, e.setTjLog)({
                        page: o,
                        errorType: "createCanvas wifi_qrbg",
                        errorMsg: t
                    });
                });
            });
        }).catch(function(t) {
            console.log(t), (0, e.setTjLog)({
                page: o,
                errorType: "createCanvas wifi_qrbg",
                errorMsg: t
            });
        });
    },
    _getSize: function(t) {
        return t * (this.data.windowWidth / 375);
    },
    _downLoadImg: function(t) {
        if (t) return wx.showLoading({
            mask: !0,
            title: "请稍候..."
        }), console.log("downFile:", t), new Promise(function(i, e) {
            wx.downloadFile({
                url: t,
                success: function(t) {
                    console.log(t), 200 === t.statusCode ? i(t.tempFilePath) : (wx.showToast({
                        title: "图片生成失败",
                        icon: "none"
                    }), e());
                },
                fail: function(t) {
                    wx.showToast({
                        title: "图片生成失败",
                        icon: "none"
                    }), e();
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    _canvasToTempFilePath: function() {
        var t = this;
        console.log("canvasToTempFilePath"), wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: this._getSize(375),
            height: this._getSize(500),
            canvasId: "mycanvas",
            fileType: "jpg",
            success: function(i) {
                console.log(i), t._saveImageToPhotosAlbum(i.tempFilePath);
            },
            fail: function(t) {
                (0, e.setTjLog)({
                    page: o,
                    errorType: "save canvasurl to local fail",
                    errorMsg: t
                }), console.log(t), wx.showToast({
                    title: "保存失败",
                    icon: "none"
                });
            }
        }, this);
    },
    _saveImageToPhotosAlbum: function(t) {
        var i = this;
        console.log("saveImageToPhotosAlbum"), wx.saveImageToPhotosAlbum({
            filePath: t,
            success: function(t) {
                console.log(t), wx.showToast({
                    title: "保存成功"
                }), setTimeout(i.goToIndex, 2e3);
            },
            fail: function(t) {
                console.log(t), (0, e.setTjLog)({
                    page: o,
                    errorType: "save canvasurl to photo fail",
                    errorMsg: t
                }), i.checkAuth().then(function() {}).catch(function(t) {});
            }
        });
    },
    bindopensetting: function(t) {
        var i = t.detail.authSetting["scope.writePhotosAlbum"];
        this.setData({
            powerfail: !i
        });
    },
    checkAuth: function() {
        var t = this;
        return new Promise(function(i, e) {
            wx.getSetting({
                success: function(o) {
                    var n = o.authSetting["scope.writePhotosAlbum"];
                    t.setData({
                        powerfail: !n
                    }), console.log(n), n ? i() : e();
                }
            });
        });
    },
    goToIndex: function() {
        wx.redirectTo({
            url: "/pages/wifi_v2/wifiList/wifiList"
        });
    },
    _tokenOverdueHandler: function() {
        wx.redirectTo({
            url: this.data.loginUrl + "?nextPath=" + this.data.indexUrl
        });
    }
});