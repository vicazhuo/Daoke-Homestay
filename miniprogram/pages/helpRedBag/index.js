function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a = e(require("../../apiFetch/helpRedbagApi")), o = e(require("../../apiFetch/commonApi")), i = e(require("./util")), n = require("../../common/js/utils"), r = e(n), u = getApp();

Page({
    data: {
        nowRedBagActive: 1,
        redbagProgressList: [ 0, 10, 20, 50, 100, 300 ],
        redbagProgressLeftList: [ 0, 0, 80, 208, 340, 400 ],
        helpFriendList: [],
        helpMessageList: [],
        isShowHotel: !1,
        activeStatus: 0,
        activeTime: [ "00", "00" ],
        activeDetail: {},
        popupStatus: 0,
        isShowPopup: !1,
        orderNo: "",
        isPage: "init",
        PWA_STATIC_TUJIA_HOST: "",
        pageErrorData: {
            imgHost: ""
        },
        numQuantityVal: "",
        activeErrMsg: ""
    },
    countTime: 0,
    countTimer: null,
    orderNo: "",
    onLoad: function(e) {
        var t = e.orderno, a = e.iscreate;
        console.log(e), this.senceString = (0, n.urlParams)(e), this.orderNo = t, this.isCreate = "true" === a, 
        this.checkLogin();
    },
    onReady: function() {
        this.pageReload();
    },
    onUnload: function() {
        this.clearCountTimer();
    },
    onShareAppMessage: function() {
        var e = this.data, t = e.isShowHotel, a = e.activeDetail;
        return i.default.renderShareData({
            isShowHouse: t,
            nickname: a.nickname,
            orderNo: this.orderNo
        });
    },
    pageReload: function() {
        var e = this, t = this.orderNo;
        wx.getStorage({
            key: "wxUserInfo",
            fail: function() {
                u.initWxUserInfo();
            }
        }), a.default.createHelpActive(t, this.isCreate).then(function(o) {
            a.default.queryHelpActiveDetail(t).then(function(a) {
                if (console.log(a), !a) return e.setIsPage("fail");
                var o = {
                    activeDetail: a,
                    orderNo: t,
                    isCreate: e.isCreate
                }, i = e.data.redbagProgressList.indexOf(a.alreadyHaveAmount);
                o.nowRedBagActive = i, o.activeStatus = a.refusedOrder ? 1 : 0, a.countdown <= 0 && (o.activeStatus = 2), 
                50 == a.alreadyHaveAmount && (300 == a.availableAmount ? e.showRedBagNumPopup(o, 100) : a.availableAmount <= 50 && e.showRedBagNumPopup(o, "all")), 
                100 == a.alreadyHaveAmount && a.availableAmount <= 100 && e.showRedBagNumPopup(o, 300), 
                3 == a.endCause && (o.activeStatus = 3), e.setData(o), e.countTime = a.countdown, 
                a.countdown > 0 && (e.s2Time(a.countdown), e.startCountTimer(), e.setIsShowHouseStatus()), 
                e.setIsPage(), e.isCreate = !0;
            }).catch(function(t) {
                console.log(t), wx.showToast({
                    title: t.errorMsg,
                    icon: "none"
                }), e.setIsPage("fail");
            });
        }).catch(function(t) {
            console.log(t), e.setData({
                activeErrMsg: t.errorMsg,
                popupStatus: 2,
                isShowPopup: !0
            });
        });
    },
    checkLogin: function() {
        var e = this;
        u.userIsLogin() || o.default.checkLogin().then(function(t) {
            if (t.userId) u.setTjUserInfo(t); else {
                var a = "/pages/helpRedBag/index" + e.senceString;
                wx.redirectTo({
                    url: "/pages/user/login/login?nextPath=" + encodeURIComponent(a) + "&openType=redirect"
                });
            }
        }).catch(function(e) {
            console.log(e);
        });
    },
    checkTap: function() {
        var e = this, o = !this.data.isShowHotel;
        this.setData({
            isShowHotel: o
        }), a.default.updateActive(this.orderNo, o).then(function(a) {
            var i = e.orderNo;
            wx.getStorage({
                key: "helpRedBagIsShowHouse",
                success: function(e) {
                    e.data[i] = o, wx.setStorage({
                        key: "helpRedBagIsShowHouse",
                        data: e.data
                    });
                },
                fail: function(e) {
                    wx.setStorage({
                        key: "helpRedBagIsShowHouse",
                        data: t({}, i, o)
                    });
                }
            });
        }).catch(function(t) {
            console.log(t), wx.showToast({
                title: t.errorMsg || "更改失败",
                icon: "none"
            }), e.setData({
                isShowHotel: !o
            });
        });
    },
    activeEndBtn: function() {
        this.setData({
            isShowPopup: !1
        });
    },
    setIsShowHouseStatus: function() {
        var e = this, t = this.orderNo;
        wx.getStorage({
            key: "helpRedBagIsShowHouse",
            success: function(a) {
                a.data[t] && e.setData({
                    isShowHotel: !0
                });
            }
        });
    },
    toFirendShare: function() {
        var e = this.data.activeDetail, t = e.nickname, a = e.picUrl;
        wx.navigateTo({
            url: "./friends/index?nickname=" + t + "&picurl=" + a + "&id=" + this.orderNo
        });
    },
    clearCountTimer: function() {
        clearInterval(this.countTimer);
    },
    startCountTimer: function(e) {
        var t = this;
        this.countTimer = setInterval(function() {
            t.countTime -= 6e4, t.s2Time(t.countTime);
        }, 6e4);
    },
    activeTimeEnd: function() {
        this.clearCountTimer(), this.pageReload();
    },
    s2Time: function(e) {
        if (e <= 0) return this.activeTimeEnd();
        var t = function(e) {
            return e < 10 ? "0" + e.toString() : e;
        };
        if (!(e = Math.floor(Number(e) / 1e3)) || e < 0) return [ "00", "00" ];
        var a = 0, o = 0;
        o = Math.floor(e / 3600), a = Math.floor(e % 3600 / 60), this.setData({
            activeTime: [ t(o), t(a) ]
        });
    },
    showRedBagNumPopup: function(e, t) {
        var a = wx.getStorageSync("helpRebBagNum");
        a[this.orderNo] && a[this.orderNo] == t || (e.popupStatus = 0, e.isShowPopup = !0, 
        this.setData({
            numQuantityVal: t
        }), this.setRebBagNumAlert(t));
    },
    setRebBagNumAlert: function(e) {
        var a = this.orderNo, o = function(e) {
            wx.setStorage({
                key: "helpRebBagNum",
                data: e
            });
        };
        wx.getStorage({
            key: "helpRebBagNum",
            success: function(t) {
                var i = {};
                t.data && (i = t.data), i[a] = e, o(i);
            },
            fail: function(i) {
                o(t({}, a, e));
            }
        });
    },
    setIsPage: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "success";
        this.setData({
            isPage: e
        });
    },
    formBtn: function(e) {
        r.default.formBtn(e);
    },
    closePage: function() {
        wx.navigateBack();
    }
});