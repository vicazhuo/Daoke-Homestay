!function(t) {
    t && t.__esModule;
}(require("../../../apiFetch/wifiApi"));

var a = getApp();

Page({
    data: {
        navbar: [ "途家寄送", "自行制作" ],
        currentTab: 0,
      PWA_STATIC_TUJIA_HOST:a.globalStaticUrl
    },
    onLoad: function(t) {
        var e = a.globalUserInfo.tjUserInfo.userId, r = a.globalUserInfo.tjUserInfo.userToken;
        this.setData({
            tjuserid: e,
            tjusertoken: r
        });
    },
    navbarTap: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.idx
        });
    },
    goApplyMatter: function() {
        wx.navigateTo({
            url: "/pages/wifi_v2/matAndWifi/applyMatterList/applyMatterList"
        });
    },
    goMakeQR: function() {
        wx.navigateTo({
            url: "/pages/wifi_v2/matAndWifi/applyQrCode/addQrCode/index"
        });
    }
});