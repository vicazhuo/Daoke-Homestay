var t = getApp();

Page({
    data: {
        orderId: "",
        butlerInfo: null
    },
    onLoad: function(t) {
        var o = this;
        t && t.orderId && this.setData({
            orderId: t.orderId
        }, function() {
            o.getContactButler();
        });
    },
    onReady: function() {},
    onShow: function() {},
    callServer: function() {
        wx.makePhoneCall({
            phoneNumber: "400-606-6767"
        });
    },
    callButler: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.butlerInfo.mobile
        });
    },
    getContactButler: function() {
        var o = this, e = this;
        t.ajax({
            url: "/miniprogram/face/contactButler",
            data: {
                orderId: e.data.orderId
            }
        }).then(function(t) {
            console.log(t, 888), 1 == t.code ? o.setData({
                butlerInfo: t.data
            }) : wx.showToast({
                title: t.message,
                icon: "none"
            });
        }).catch(function(t) {
            console.log(t, 999);
        });
    }
});