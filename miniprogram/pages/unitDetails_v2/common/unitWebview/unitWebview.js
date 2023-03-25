Page({
    data: {
        navigateUrl: "",
        systemInfo: {},
        wxloading: !1
    },
    onLoad: function(t) {
        t.videoUrl && (wx.getSystemInfo({
            success: function(t) {
                "android" == t.platform && wx.showToast({
                    title: "请稍后",
                    icon: "loading",
                    mask: !0,
                    duration: 3e3
                });
            }
        }), this.setData({
            navigateUrl: decodeURIComponent(t.videoUrl)
        })), t.navigateUrl && this.setData({
            navigateUrl: t.navigateUrl
        }), t.promotionUrl && this.setData({
            navigateUrl: t.promotionUrl
        }), t.ruleUrl && this.setData({
            navigateUrl: decodeURIComponent(t.ruleUrl)
        });
    }
});