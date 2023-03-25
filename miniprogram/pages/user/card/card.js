var t = require("../../../common/js/tjRequest.js"), a = require("../../../common/js/utils.js");

Page({
    data: {
        currentTab: 0,
        winWidth: 0,
        winHeight: 0,
        swiperHeight: 0,
        totalRemainAmount: "0.00",
        isLoadInvaludCard: !1,
        loadingHidden: !1,
        cardInfo: {
            isShowTip: !0,
            SerialNo: "",
            RemainedAmount: "",
            StartTime: "",
            EndTime: "",
            TicketDescriptionDetails: []
        },
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
        }), a.getCards(!0);
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
        1 == t.detail.current ? (n = a.data.invaludCardList.length, a.data.isLoadInvaludCard || a.getCards(!1)) : n = a.data.canUseCardList.length, 
        e = 232 * parseFloat(n > 3 ? n : 3.5) - 20, a.setData({
            currentTab: t.detail.current,
            swiperHeight: e
        });
    },
    getCards: function(a) {
        var e = this, n = getApp();
        if (n.userIsLogin()) {
            var i = n.globalConfig;
            e.setData({
                loadingHidden: !0
            }), t.tjPost({
                url: i.WechatCustomerUri + i.GiftCardList,
                data: {
                    available: a
                },
                success: function(t) {
                    if (e.setData({
                        loadingHidden: !1
                    }), t.data.isSuccess) {
                        var i = t.data.data;
                        a ? i.canUseCardList && i.canUseCardList.length > 0 ? (i.canUseCardList.map(function(t) {
                            t.RemainedAmount = parseFloat(t.RemainedAmount).toFixed(2), t.EndTime = e.jsonDateTostring(t.EndTime), 
                            t.StartTime = e.jsonDateTostring(t.StartTime);
                        }), e.setData({
                            totalRemainAmount: parseFloat(i.totalRemainAmount).toFixed(2),
                            canUseCardList: i.canUseCardList,
                            swiperHeight: 232 * (i.canUseCardList.length > 3 ? i.canUseCardList.length : 3.5) - 20
                        })) : e.setData({
                            swiperHeight: 792
                        }) : i.invaludCardList && i.invaludCardList.length > 0 ? (i.invaludCardList.map(function(t) {
                            t.RemainedAmount = parseFloat(t.RemainedAmount).toFixed(2), t.EndTime = e.jsonDateTostring(t.EndTime), 
                            t.StartTime = e.jsonDateTostring(t.StartTime);
                        }), e.setData({
                            invaludCardList: i.invaludCardList,
                            isLoadInvaludCard: !0,
                            swiperHeight: 232 * (i.invaludCardList.length > 3 ? i.invaludCardList.length : 3.5) - 20
                        })) : e.setData({
                            isLoadInvaludCard: !0,
                            swiperHeight: 792
                        });
                    } else wx.showModal({
                        content: n.netFailMsg,
                        showCancel: !1
                    });
                },
                fail: function() {
                    e.setData({
                        loadingHidden: !1
                    }), wx.showModal({
                        content: n.netFailMsg,
                        showCancel: !1
                    });
                }
            });
        } else wx.redirectTo({
            url: "/pages/user/login/login?nextPath=/pages/user/card/card&openType=redirect"
        });
    },
    showCardInfoTip: function(t) {
        var a = this, e = this.data.cardInfo;
        (e = 0 == parseInt(t.currentTarget.dataset.tap) ? this.data.canUseCardList[parseInt(t.currentTarget.dataset.current)] : this.data.invaludCardList[parseInt(t.currentTarget.dataset.current)]).isShowTip = !1, 
        a.setData({
            cardInfo: e
        });
    },
    hideCardInfoTip: function() {
        var t = this, a = this.data.cardInfo;
        a.isShowTip = !0, t.setData({
            cardInfo: a
        });
    },
    jsonDateTostring: function(t) {
        var e = new Date(parseInt(t.replace(/\D/gim, "")));
        return a.dateFormat(e, "yyyy-MM-dd");
    }
});