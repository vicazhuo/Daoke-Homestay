var t = require("../../../common/js/tjRequest.js");

Page({
    data: {
        currentTab: 0,
        winWidth: 0,
        winHeight: 0,
        swiperHeight: 0,
        totalRemainAmount: "0.00",
        loadingHidden: !1,
        canUseCardList: [],
        invaludCardList: []
    },
    onLoad: function(t) {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    winWidth: t.windowWidth,
                    winHeight: t.windowHeight
                });
            }
        }), a.getCards();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    swichNav: function(t) {
        var a = this, e = t.currentTarget.dataset.current;
        if (a.data.currentTab === e) return !1;
        a.setData({
            currentTab: e
        });
    },
    bindChange: function(t) {
        var a = this, e = 0, n = 0;
        n = 1 == t.detail.current ? a.data.invaludCardList.length : a.data.canUseCardList.length, 
        e = 232 * parseFloat(n > 3 ? n : 3.5) - 20, a.setData({
            currentTab: t.detail.current,
            swiperHeight: e
        });
    },
    getCards: function() {
        var a = this, e = getApp();
        if (e.userIsLogin()) {
            var n = e.globalConfig;
            a.setData({
                loadingHidden: !0
            }), t.tjPost({
                url: n.WechatCustomerUri + n.PrepayCardList,
                data: [],
                success: function(t) {
                    if (a.setData({
                        loadingHidden: !1
                    }), t.data.isSuccess) {
                        var n = t.data.data;
                        n.invaludCardList && n.invaludCardList.length > 0 || n.canUseCardList && n.canUseCardList.length > 0 ? a.setData({
                            totalRemainAmount: n.totalRemainAmount,
                            canUseCardList: n.canUseCardList,
                            invaludCardList: n.invaludCardList,
                            swiperHeight: 232 * (n.canUseCardList.length > 3 ? n.canUseCardList.length : 3.5) - 20
                        }) : a.setData({
                            swiperHeight: 792
                        });
                    } else wx.showModal({
                        content: e.netFailMsg,
                        showCancel: !1
                    });
                },
                fail: function() {
                    a.setData({
                        loadingHidden: !1
                    }), wx.showModal({
                        content: e.netFailMsg,
                        showCancel: !1
                    });
                }
            });
        } else wx.redirectTo({
            url: "/pages/user/login/login?nextPath=/pages/user/prepayCard/prepayCard&openType=redirect"
        });
    }
});