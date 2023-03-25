var t = function(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}(require("../../../apiFetch/wifiApi")), e = require("../../../common/js/utils.js");

Page({
    data: {
        wifiListObj: {},
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl,
        wifiId: ""
    },
    onLoad: function(i) {
        var t = i.wifiid;
        this.setData({
            wifiId: t
        }), this._getDetail();
    },
    _getDetail: function() {
        var i = this, n = {
            wifiId: this.data.wifiId
        }, o = new e.Base64();
        wx.showLoading(), t.default.getWifiById(n).then(function(t) {
            t.password = o.decode(o.decode(t.password)), i.setData({
                wifiListObj: t
            });
        }).catch(function(t) {
            var e = t.errorNo, n = t.errorMsg;
            "60012" == e ? i._tokenOverdueHandler() : wx.showToast({
                title: n || "获取详情失败",
                icon: "none"
            });
        }).finally(function() {
            wx.hideLoading();
        });
    },
    _tokenOverdueHandler: function() {
        wx.redirectTo({
            url: "/pages/wifi_v2/matAndWifi/wifiLogin/index?nextPath=/pages/wifi_v2/wifiList/wifiList"
        });
    },
    gotoWifiList: function() {
        wx.redirectTo({
            url: "/pages/wifi_v2/wifiList/wifiList"
        });
    }
});