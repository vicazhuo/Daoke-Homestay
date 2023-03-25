function e(e, o, r) {
    var t = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "POST";
    console.log("request URL=" + e + " params="), console.log(o), a.tjRequest({
        url: e,
        data: {
            orderId: o.parameter.orderId
        },
        method: t,
        success: function(e) {
            e.data.isSuccess ? r(!0, e.data) : (wx.showModal({
                title: "提示",
                content: e.data.errorMessage,
                showCancel: !1
            }), r(!1, e.data)), console.log("request success result="), console.log(e.data);
        },
        fail: function() {
            r(!1, {
                errorCode: "-1000",
                errorMessage: "网络请求失败"
            });
        }
    });
}

var a = require("../../../common/js/tjRequest.js");

module.exports = {
    getGiftCardForPay: function(a, o) {
        var r = getApp().globalConfig;
        e(r.WechatPayUri + r.GetGiftCardForPay, a, o);
    },
    getPreapyCardForPay: function(a, o) {
        var r = getApp().globalConfig;
        e(r.WechatPayUri + r.GetPrepayCardForPay, a, o);
    }
};