function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var o = e(require("../../../apiFetch/helpRedbagApi")), t = e(require("../../../apiFetch/wifiApi")), n = e(require("../../../apiFetch/commonApi")), i = e(require("../util")), s = e(require("../../../common/js/utils")), a = getApp(), c = {
    2: "programpictures",
    1: "programfriends",
    4: "appmoments",
    3: "appfriends"
};

Page({
    data: {
        id: "",
        activeDetail: {},
        popupStatus: 0,
        isShowPopup: !1,
        isActiveHelpNum: !1,
        isShowHouse: !1,
        isOldUser: !1,
        openId: "",
        isPage: "init",
        isHelp: !1,
        helpStatus: 0,
        PWA_STATIC_TUJIA_HOST: "",
        pageErrorData: {
            imgHost: ""
        },
        isGetUserInfoPopup: !1
    },
    orderNo: "",
    onLoad: function(e) {
        try {
            var o = decodeURIComponent(e.scene);
            if (!o) return wx.showToast({
                title: "活动参数错误,请退出重试",
                icon: "none"
            }), void this.setIsPage("fail");
            o = o.split("_"), console.log("scene:", o), this.orderNo = o[0], this.formType = o[1] || 1, 
            this.formType && a.globalGio("track", c[this.formType], {
                form: this.formType
            }), wx.showLoading({
                title: "请稍候..."
            }), this.pageReload();
        } catch (e) {
            console.log(e), this.setIsPage("fail");
        }
    },
    onShareAppMessage: function() {
        var e = this.data, o = e.isShowHouse, t = e.activeDetail, n = (e.shareHousePic, 
        e.id);
        return i.default.renderShareData({
            isShowHouse: o,
            nickname: t.nickname,
            orderNo: n
        });
    },
    pageReload: function() {
        var e = this;
        this.checkLogin().then(function(t) {
            console.log("tjUser:", t), o.default.queryHelpActiveDetail(e.orderNo).then(function(o) {
                if (console.log(o), o.owner) return wx.redirectTo({
                    url: "/pages/helpRedBag/index?iscreate=true&orderno=" + e.orderNo
                });
                var n = {
                    activeDetail: o,
                    id: e.orderNo,
                    isShowHouse: !!o.house && !!o.house.houseId
                };
                o.countdown <= 0 ? n.helpStatus = 2 : o.helper ? n.helpStatus = 1 : (n.helpStatus = 0, 
                n.isShowPopup = !0, n.popupStatus = 1), n.isHelp = o.helper, t.userId && !o.helper ? e.checkHelpCount().then(function(o) {
                    o || (n.isActiveHelpNum = !0, n.isShowPopup = !1, n.helpStatus = 1), e.setData(n), 
                    e.setIsPage();
                }) : (e.setData(n), e.setIsPage()), e.getWxUserInfo();
            }).catch(function(o) {
                console.log(o), e.setIsPage("fail"), wx.showToast({
                    title: o.errorMsg,
                    icon: "none"
                });
            });
        }).catch(function(o) {
            console.log("checkLogin fail"), e.setIsPage("fail");
        });
    },
    checkHelpCount: function() {
        return o.default.getHelperCount().then(function(e) {
            return console.log(e), Promise.resolve(e);
        }).catch(function(e) {
            return Promise.reject();
        });
    },
    checkLogin: function() {
        var e = this;
        return n.default.checkLogin().then(function(o) {
            return console.log(888, o), o.userId && a.setTjUserInfo(o), e.setData({
                isOldUser: !!o.userId,
                openId: o.openId
            }), Promise.resolve(o);
        }).catch(function(e) {
            return Promise.reject(e);
        });
    },
    goHelpActive: function() {
        var e = this;
        o.default.createHelper(this.orderNo).then(function(o) {
            e.setData({
                isShowPopup: !0,
                popupStatus: 0,
                helpStatus: 1,
                isHelp: !0
            });
            try {
                e.selectComponent("#helperList").getHelpPersons();
            } catch (e) {
                console.log(e);
            }
        }).catch(function(e) {
            wx.showToast({
                title: e.errorMsg,
                icon: "none"
            });
        });
    },
    getPhoneNumber: function(e) {
        console.log(e);
        var o = this.data, t = o.helpStatus, n = o.isOldUser, i = o.isActiveHelpNum, s = o.openId;
        if ("tap" === e.type && (n || i)) 0 === t ? this.goHelpActive() : wx.switchTab({
            url: "/pages/index/index"
        }); else {
            console.log(e);
            var r = e.detail, a = r.encryptedData, c = r.iv;
            if (a) this.decodePhoneAndLogin({
                globalCode: "HelpActiveCode",
                openId: s,
                iv: encodeURIComponent(c),
                encryptedData: encodeURIComponent(a)
            }); else {
                if ("tap" === e.type) return;
                wx.showToast({
                    title: "不同意授权，就不能获得红包奖励了",
                    icon: "none"
                });
            }
        }
    },
    decodePhoneAndLogin: function(e) {
        var o = this, n = getApp(), i = n.globalUserInfo.wxUserInfo;
        i && (e.userInfo = JSON.stringify(i)), console.log("decodePhoneAndLogin:", e), wx.showLoading({
            mask: !0,
            title: "请稍后..."
        }), t.default.getUnionLogin(e).then(function(e) {
            console.log("ddd:", e), n.setTjUserInfo(e), o.setData({
                isOldUser: !0
            }), o.goHelpActive();
        }).catch(function(e) {}).finally(function() {
            wx.hideLoading();
        });
    },
    toMyRedBagPage: function() {
        this.setData({
            isShowPopup: !1
        }), wx.navigateTo({
            url: "/pages/user/redpacket/redpacket"
        });
    },
    closeHelpPopup: function() {
        this.setData({
            isShowPopup: !1
        });
    },
    setIsPage: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "success";
        this.setData({
            isPage: e
        });
    },
    formBtn: function(e) {
        s.default.formBtn(e);
    },
    getWxUserInfo: function() {
        var e = this;
        a.initWxUserInfo(null, function() {
            wx.hideLoading(), e.setData({
                isGetUserInfoPopup: !0
            });
        });
    },
    getUserInfoPopupClose: function() {
        this.setData({
            isGetUserInfoPopup: !1
        });
    }
});