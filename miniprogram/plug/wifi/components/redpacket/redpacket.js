var  t = require("../../../../common/js/utils.js");

Component({
    properties: {
        size: {
            type: String,
            value: "SMALL"
        },
        money: {
            type: Number
        }
    },
    data: {
        PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl,
        isOpend: !1,
      bigImg: getApp().globalStaticUrl + "/static/wechat/wifitwo/redpacket-big-close.png"
    },
    methods: {
        getRedpacket: function() {
            this.setData({
                isOpend: !0,
              bigImg: getApp().globalStaticUrl + "/static/wechat/wifitwo/redpacket-big-open.png"
            }), wx.showToast({
                title: "领取成功",
                icon: "success",
                duration: 2e3
            });
        },
        gotoUse: function() {
            wx.switchTab({
                url: "/pages/index/index"
            });
        },
        formBtn: function(e) {
            console.log(e), t.formBtn(e);
        }
    }
});