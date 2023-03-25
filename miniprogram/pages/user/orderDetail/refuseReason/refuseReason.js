function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../../apiFetch/orderDetail")), a = t(require("../../../../components/toast/toast.js"));

Page({
    data: {
        orderId: "",
        onlineDeposit: "",
        textData: "",
        moneyData: "",
        isAgree: !1
    },
    onLoad: function(t) {
        var e = t.orderId || "", a = t.onlineDeposit || "";
        this.setData({
            orderId: e,
            onlineDeposit: a
        });
    },
    refuseReasonText: function(t) {
        var e = t.detail.value;
        e.length <= 100 && this.setData({
            textData: e
        });
    },
    moneyText: function(t) {
        var e = t.detail.value;
        this.setData({
            moneyData: e
        });
    },
    postNotAgree: function() {
        var t = this, a = this.data, o = a.isAgree, n = a.moneyData, i = a.orderId, s = a.textData, r = a.onlineDeposit;
        console.log(o, n, i, s), this.isCanSubmit(s.length, n, r) ? e.default.setChargeback(o, n, i, s).then(function(t) {
            wx.navigateBack({
                delta: 1
            });
        }).catch(function(e) {
            t.showToast(e);
        }) : this.showToast("输入有误");
    },
    isCanSubmit: function(t, e, a) {
        var o = t <= 100 && t > 0, n = e <= a && e > 0;
        return o && n;
    },
    showToast: function(t) {
        a.default.showToast({
            title: t,
            duration: 1e3
        });
    }
});