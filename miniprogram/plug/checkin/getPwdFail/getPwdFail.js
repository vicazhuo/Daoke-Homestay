var o = getApp();

Page({
    data: {
        orderId: "",
        look: "",
        isTemp: "",
        butlerInfo: null
    },
    onLoad: function(o) {
        var t = this, e = o.orderId, n = o.look, a = o.isTemp;
        this.setData({
            orderId: e,
            look: n,
            isTemp: a
        }, function() {
            t.getContactButler();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    goGetPwd: function() {
        wx.redirectTo({
            url: "/pages/checkin/getPwd/getPwd?orderId=" + this.data.orderId + "&look=" + this.data.look + "&isTemp=" + this.data.isTemp
        });
    },
    callButler: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.butlerInfo.mobile
        });
    },
    getContactButler: function() {
        var t = this, e = this;
        o.ajax({
            url: "/miniprogram/face/contactButler",
            data: {
                orderId: e.data.orderId
            }
        }).then(function(o) {
            console.log(o, 888), 1 == o.code ? t.setData({
                butlerInfo: o.data
            }) : wx.showToast({
                title: o.message,
                icon: "none"
            });
        }).catch(function(o) {
            console.log(o, 999);
        });
    }
});