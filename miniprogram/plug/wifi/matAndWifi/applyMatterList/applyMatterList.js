function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../../../components/toast/toast"));

var e = t(require("../../../../apiFetch/wifiApi.js")), a = require("../../../../common/js/utils");

getApp();

Page({
    data: {
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl,
        count: "",
        mobileEncry: "",
        materieList: [],
        storelist: [],
        dataErr: !1,
        isCanApply: !1
    },
    onLoad: function(t) {
        this._getMaterielList();
    },
    onShow: function() {
        this._getMaterielList();
    },
    applyMatter: function() {
        wx.navigateTo({
            url: "/pages/wifi_v2/matAndWifi/applyMatter/applyMatter"
        });
    },
    goHelp: function() {
        var t = i.PWA_TUJIA_HOST + "/h5/appw/wifitwo/index?pagetype=smallapp";
        wx.navigateTo({
            url: "/pages/user/webView/webView?webUrl=" + encodeURIComponent(t)
        });
    },
    _getMaterielList: function() {
        var t = this;
        wx.showLoading(), e.default.getMaterielList({}).then(function(e) {
            e.list.forEach(function(t, e) {
                t.contactPhone = t.contactPhone.substr(0, 3) + "****" + t.contactPhone.substr(7), 
                console.log("after encode phone", t.contactPhone);
            }), t.setData({
                materieList: e.list,
                count: e.count
            });
            var i = 0;
            e.list.forEach(function(t, e) {
                i = t.applyCount + i;
            }), console.log("res.totalcount-", e.totalCount), e.totalCount > 0 && t.setData({
                isCanApply: !0
            }), console.log(i), t.setData({
                count: i
            }), 0 === e.list.length && wx.redirectTo({
                url: "/pages/wifi_v2/matAndWifi/applyMatter/applyMatter"
            });
        }).catch(function(e) {
            if (console.log("获取物料列表:", e), 60012 == e.errorNo) {
                var i = encodeURIComponent("/pages/wifi_v2/wifiList/wifiList");
                wx.redirectTo({
                    url: "/pages/wifi_v2/matAndWifi/wifiLogin/index?nextPath=" + i
                });
            } else t.setData({
                dataErr: !0
            }), (0, a.setTjLog)({
                page: "pages/wifi_v2/matAndWifi/applyMatterList/applyMatterList",
                errorType: "getMaterielList",
                errorMsg: e
            });
        }).finally(function() {
            wx.hideLoading();
        });
    }
});