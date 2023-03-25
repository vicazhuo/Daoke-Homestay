var t = require("../../common/js/utils");

getApp();

Component({
    properties: {
        isNextPath: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        isShow: !1
    },
    ready: function() {
        var e = this, a = getApp();
        a.globalData.favoriteTipStatus || !t.isWxApp || this.properties.isNextPath || wx.getStorage({
            key: "WX_FAVORITE_STATUS",
            fail: function(t) {
                e.setData({
                    isShow: !0
                }), a.globalData.setFavoriteTip(!0);
            }
        });
    },
    methods: {
        closeTip: function() {
            this.setData({
                isShow: !1
            }), wx.setStorage({
                key: "WX_FAVORITE_STATUS",
                data: 1
            });
        }
    }
});