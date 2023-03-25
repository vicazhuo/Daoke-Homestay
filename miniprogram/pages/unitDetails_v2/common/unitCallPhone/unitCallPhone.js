var e = require("../../../../common/js/utils.js"), t = require("../../../common/js/tjUnitApiRequest.js"), i = "";
var globalData = getApp().globalData; 
Page({
    data: {
        isCanSubmit: !1,
        mobile: "",
        isLoading: !1,
        appName: globalData.globalName
    },
    onLoad: function(t) {
      console.log(t)
        i = t.realTimeServiceHotlinePattern;
        var o = getApp().globalUserInfo.tjUserInfo.mobile;
        this.setData({
            mobile: o,
            hotelPhonePaySuccess: t.hotelPhonePaySuccess,
            isCanSubmit: e.checkMobile(o)
        });
    },
    bindKeyInput: function(t) {
        console.log(t.detail.value);
        var i = t.detail.value;
        this.setData({
            mobile: i,
            isCanSubmit: e.checkMobile(i)
        });
    },
    clearPhone: function() {
        this.setData({
            mobile: "",
            isCanSubmit: !1
        });
    },
    getServiceHotline: function(e) {
      var o = this, n = { phone: e.detail.value.phone, hotelPhonePaySuccess: this.data.hotelPhonePaySuccess};
      console.log("m" + n), console.log(e), this.setData({
            isLoading: !0
        }), t.getServiceHotline(n, i, function(e, t) {
          var phone = t.data.toString()
            o.setData({
                isLoading: !1
            }), e ? (console.log("getServiceHotline=" + t.data), wx.makePhoneCall({
              phoneNumber: phone
            })) : wx.showModal({
                content: "房东电话获取失败，请拨打" + globalData.globalName + "免费热线" + globalData.globalserviceline,
                cancelText: "取消",
                confirmText: "立即拨打",
                success: function(e) {
                    e.cancel || wx.makePhoneCall({
                      phoneNumber: globalData.globalserviceline
                    });
                }
            });
        });
    }
});