function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = getApp();

Page({
    data: {
        orderId: "",
        isTempNum: "",
        type: 0,
        imgArr: [],
        returnImgArr: [],
        isOk: !1,
        imgIds: [],
        guideProgressIsShow: !1,
        guideDownloadProgress: 0,
        imgSize: 0
    },
    onLoad: function(e) {
        e.orderId && (this.setData({
            orderId: e.orderId,
            isTempNum: e.isTemp
        }), e.type && this.getData());
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    selCard: function(e) {
        var t = e.currentTarget.dataset.type;
        this.data.type != t && (this.setData({
            imgArr: [],
            returnImgArr: [],
            type: t,
            isOk: !1
        }), wx.createSelectorQuery().select(".top").fields({
            size: !0
        }, function(e) {
            wx.pageScrollTo({
                scrollTop: e.height
            });
        }).exec());
    },
    chooseImg: function(t) {
        var a = t.currentTarget.dataset, o = a.type, s = a.num, r = this, i = "imgArr[" + s + "]", n = "returnImgArr[" + s + "]";
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var a, s = t.tempFilePaths[0];
                r.setData((a = {}, e(a, i, s), e(a, n, s), a), function() {
                    r.checkIsOk(o);
                });
            }
        });
    },
    checkIsOk: function(e) {
        var t = this.data.imgArr, a = t.length, o = !0;
        if (4 == e) {
            if (4 == a) {
                for (var s = 0; s < 4; s++) if (!t[s]) return void (o = !1);
                o && this.setData({
                    isOk: !0
                });
            }
        } else if (3 == a) {
            for (var r = 0; r < 3; r++) if (!t[r]) return void (o = !1);
            o && this.setData({
                isOk: !0
            });
        }
    },
    uploadImg: function() {
        var e = this;
        e.setData({
            guideDownloadProgress: 0,
            imgSize: 0,
            guideProgressIsShow: !0
        }), wx.uploadFile({
            url: t.globalData.baseUrl + "/wechat/app/common/uploadImage",
            filePath: e.data.returnImgArr[e.data.imgIds.length],
            name: "file",
            formData: {
                path: "m0"
            },
            success: function(t) {
                console.log(t, 888);
                var a = JSON.parse(t.data);
                if (200 == t.statusCode && 1 == a.code) {
                    var o = JSON.parse(JSON.stringify(e.data.imgIds));
                    o.push(a.data.id), e.setData({
                        imgIds: o
                    }), o.length < e.data.returnImgArr.length ? e.uploadImg() : (e.setData({
                        guideProgressIsShow: !1
                    }), wx.showLoading({
                        title: "加载中",
                        mask: !0
                    }), e.sendData());
                } else console.log("success中出错了"), e.setData({
                    guideProgressIsShow: !1
                }), wx.showToast({
                    title: "当前网络不佳，请稍后重试",
                    icon: "none"
                });
            },
            fail: function(t) {
                console.log(t, 666), e.setData({
                    guideProgressIsShow: !1
                }), wx.showToast({
                    title: "当前网络不佳，请稍后重试",
                    icon: "none"
                });
            }
        }).onProgressUpdate(function(t) {
            console.log(t), e.setData({
                guideDownloadProgress: t.progress,
                imgSize: parseInt(t.totalBytesExpectedToSend / 1e3)
            });
        });
    },
    upload: function() {
        this.data.isOk && (this.setData({
            imgIds: []
        }), this.uploadImg());
    },
    sendData: function() {
        var e = this;
        t.ajax({
            url: "/miniprogram/order/uploadTenantPapers",
            data: {
                orderId: e.data.orderId,
                idType: e.data.type,
                imageIds: e.data.imgIds.join(",")
            }
        }).then(function(t) {
            1 == t.code ? (wx.showToast({
                title: "上传成功"
            }), wx.setStorageSync("personPageRefresh", 1), wx.setStorageSync("orderListPageRefresh", 1), 
            setTimeout(function() {
                if (t.data.isFreeDeposit) {
                    var a = encodeURIComponent("/pages/checkin/getPwd/getPwd?orderId=" + e.data.orderId + "&look=&isTemp=" + e.data.isTempNum);
                    wx.redirectTo({
                        url: "/pages/checkin/freeDepositSuccess/freeDepositSuccess?url=" + a
                    });
                } else wx.redirectTo({
                    url: "/pages/checkin/getPwd/getPwd?orderId=" + e.data.orderId + "&look=&isTemp=" + e.data.isTempNum
                });
            }, 500)) : wx.showToast({
                title: t.message,
                icon: "none"
            });
        }).catch(function(e) {
            console.log(e, 999);
        });
    },
    getData: function() {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), t.ajax({
            url: "/miniprogram/order/updatePapersPicture/" + e.data.orderId,
            data: {
                id: e.data.orderId
            }
        }).then(function(t) {
            1 == t.code ? (e.setData({
                type: t.data.certType,
                imgArr: t.data.imageUrlList
            }), e.downloadImg()) : (wx.hideLoading(), wx.showToast({
                title: t.message,
                icon: "none"
            }));
        }).catch(function(e) {
            console.log(e, 999);
        });
    },
    downloadImg: function() {
        var e = this;
        console.log("-----"), wx.showLoading({
            title: "加载中"
        }), wx.downloadFile({
            url: e.data.imgArr[e.data.returnImgArr.length].split("?")[0],
            success: function(t) {
                if (200 === t.statusCode) {
                    var a = JSON.parse(JSON.stringify(e.data.returnImgArr));
                    a.push(t.tempFilePath), e.setData({
                        returnImgArr: a
                    }), a.length < e.data.imgArr.length ? e.downloadImg() : (wx.hideLoading(), e.setData({
                        isOk: !0
                    }));
                } else wx.hideLoading(), wx.showToast({
                    title: "当前网络不佳，请稍后重试",
                    icon: "none"
                });
            },
            fail: function(e) {
                console.log(e), wx.hideLoading(), wx.showToast({
                    title: "当前网络不佳，请稍后重试",
                    icon: "none"
                });
            }
        });
    }
});