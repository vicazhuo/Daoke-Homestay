function o(o, e, t) {
    return e in o ? Object.defineProperty(o, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[e] = t, o;
}

var e = getApp();

Page({
    data: {
        modalSetting: {
            modalTitle: "密码为什么仅当天有效？",
            modalContent: "• 由于当前网络状况不佳，门锁处于离线状态，无法获得在线密码。为了不影响您的使用，系统生成离线密码方便您进出房间。\n• 离线密码仅当天有效，次日零点将会以短信形式发送给您最新的密码，请注意查收。",
            modalOnlyContent: "",
            modalCenterBtn: "我知道了"
        },
        modalBtnEvent: "modalBtnEvent",
        orderId: "",
        look: !1,
        lookNum: "",
        isTemp: !1,
        isTempNum: "",
        dataObj: null,
        wapUrl: e.globalData.wapUrl
    },
    onLoad: function(o) {
        var e = this, t = o.orderId, a = !!o.look, n = !!o.isTemp;
        this.setData({
            orderId: t,
            look: a,
            isTemp: n,
            lookNum: o.look,
            isTempNum: o.isTemp
        }, function() {
            e.getData();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getData: function() {
        var o = this;
        wx.showLoading({
            title: "加载中"
        }), e.ajax({
            url: "/miniprogram/lock/lockPass",
            data: {
                orderId: o.data.orderId,
                look: o.data.look,
                isTemp: o.data.isTemp
            }
        }).then(function(e) {
            console.log(e, 888), 1 == e.code ? o.setData({
                dataObj: e.data
            }) : 4001 == e.code ? wx.redirectTo({
                url: "/pages/checkin/getPwdFail/getPwdFail?orderId=" + o.data.orderId + "&look=" + o.data.lookNum + "&isTemp=" + o.data.isTempNum
            }) : 4002 == e.code ? (wx.showToast({
                title: "您尚未通过人脸实名认证",
                icon: "none"
            }), setTimeout(function() {
                wx.redirectTo({
                    url: "/pages/checkin/personDetail/personDetail?orderId=" + o.data.orderId + "&isTemp=" + o.data.isTempNum
                });
            }, 1e3)) : 4003 == e.code ? (wx.showToast({
                title: "您尚未通过人脸实名认证",
                icon: "none"
            }), setTimeout(function() {
                wx.redirectTo({
                    url: "/pages/checkin/personList/personList?orderId=" + o.data.orderId + "&isTemp=" + o.data.isTempNum
                });
            }, 1e3)) : wx.showToast({
                title: e.message,
                icon: "none"
            });
        }).catch(function(o) {
            console.log(o, 999);
        });
    },
    modalBtnEvent: function(e) {
        this.setData(o({}, "modalSetting.modalIsShow", !1));
    },
    showPwdTip: function() {
        this.setData(o({}, "modalSetting.modalIsShow", !0), function() {});
    },
    callServer: function() {
        wx.makePhoneCall({
            phoneNumber: "400-606-6767"
        });
    },
    callButler: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.dataObj.offlineMobile
        });
    },
    goDeposit: function() {
        wx.navigateTo({
            url: "/pages/checkin/deposit/deposit?orderId=" + this.data.orderId + "&repay=1&type=1"
        });
    },
    applyCheckInOut: function(o) {
        var t = this, a = o.currentTarget.dataset.type;
        wx.showLoading({
            title: "加载中"
        }), e.ajax({
            url: "/miniprogram/lock/applyCheckInOut",
            data: {
                orderId: this.data.orderId,
                applyType: a,
                isTempPassword: this.data.isTemp
            }
        }).then(function(o) {
            wx.hideLoading(), 1 == o.code ? (wx.showToast({
                title: o.data.tip,
                icon: "none"
            }), o.data.isApplySuccess && setTimeout(function() {
                t.getData();
            }, 800)) : wx.showToast({
                title: o.message,
                icon: "none"
            });
        }).catch(function(o) {
            console.log(o, 999);
        });
    }
});