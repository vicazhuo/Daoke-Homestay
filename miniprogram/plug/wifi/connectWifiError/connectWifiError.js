function i(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}

var e = i(require("../../../common/js/utils"));

i(require("../../../apiFetch/wifiApi"));

Page({
    data: {
        redPacketAmount: 0,
        inviterId: "",
        inviterType: "",
        wifiListObj: {},
        noIosVernLow: !0,
        fail: !1,
        failText: "",
        isLogin: !1,
        wifiId: "",
        newUserRedpacketAmount: 300,
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
    },
    onLoad: function(i) {
        this.setData({
            fail: i.fail || "",
            noIosVernLow: i.noIosWifi || "",
            wifiId: i.wifiid || "",
            redPacketAmount: i.redPacketAmount || 0,
            inviterType: i.inviterType || "",
            inviterId: i.inviterId || ""
        }), i.wifiliststring && this.setData({
            wifiListObj: JSON.parse(decodeURIComponent(i.wifiliststring))
        }), this._checkPhoneVern(), this._connectWifiErrorBurying();
    },
    _checkPhoneVern: function() {
        this.data.noIosVernLow ? this.setData({
            failText: "您的iOS系统版本过低，无法自动连接Wi-Fi"
        }) : this.setData({
            failText: "连接失败"
        });
    },
    _connectWifiErrorBurying: function() {
        var i = getApp();
        i.globalGio("track", "wifi_connect_fail", {
            wifiId: this.data.wifiid,
            openId: i.globalUserInfo.tjUserInfo.openId
        }), i.userIsLogin() && this.setData({
            isLogin: !0
        });
    },
    formBtn: function(i) {
        console.log("form id=", i), e.default.formBtn(i);
    },
    loginSucess: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    copyText: function(i) {
        var t = i.target.dataset.param;
        wx.setClipboardData({
            data: t,
            success: function(i) {
                wx.getClipboardData({
                    success: function(i) {}
                });
            },
            fail: function(i) {
                console.log(i);
            }
        });
    },
    toEditWifiInfo: function() {
        wx.redirectTo({
            url: "/pages/wifi_v2/matAndWifi/applyQrCode/addQrCode/index?wifiid=" + this.data.wifiId
        });
    }
});