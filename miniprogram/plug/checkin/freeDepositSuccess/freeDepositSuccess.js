Page({
    data: {
        url: ""
    },
    onLoad: function(n) {
        this.setData({
            url: n.url
        });
    },
    go: function() {
        var n = decodeURIComponent(this.data.url);
        wx.redirectTo({
            url: n
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});