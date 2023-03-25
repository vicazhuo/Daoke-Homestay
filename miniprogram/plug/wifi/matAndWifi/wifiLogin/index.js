var e = getApp();

Page({
    data: {
        nextPath: "",
        wifiId: "",
        inviterId: "",
        inviterType: ""
    },
    onLoad: function(i) {
        var t = "";
        t = i.nextPath ? i.nextPath : "", this.setData({
            nextPath: decodeURIComponent(t),
            wifiId: i.wifiid || "",
            scene: i.scene || "",
            inviterId: i.inviterid || "",
            inviterType: i.invitertype || ""
        }), i.scene && (e.globalGio("track", "saomao_laxin"), e.userIsLogin() && wx.switchTab({
            url: "/pages/index/index"
        }));
    },
    loginSucess: function() {
        if (this.data.nextPath && ((e = getApp()).globalGio("track", "wifi_login", {
            wifiId: this.data.wifiId,
            openId: e.globalUserInfo.tjUserInfo.openId
        }), wx.redirectTo({
            url: this.data.nextPath
        })), "6wd_login" == this.data.scene) {
            var e = getApp();
            e.globalGio("track", "saoma_laxin_success", {
                userId: e.globalUserInfo.tjUserInfo.userId,
                openId: e.globalUserInfo.tjUserInfo.openId,
                mobile: e.globalUserInfo.tjUserInfo.mobile
            }), wx.switchTab({
                url: "/pages/index/index"
            });
        }
    }
});