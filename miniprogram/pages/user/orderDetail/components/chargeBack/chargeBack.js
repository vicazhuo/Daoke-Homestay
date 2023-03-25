var  t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./../../../../../common/js/utils.js"));

Component({
    properties: {
        fineAmount: {
            type: Number,
            value: 0,
            observer: function(e) {
                this.formatFineAmount(e);
            }
        },
        depositRefundDes: String,
        depositRefundTip: String
    },
    data: {
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl,
        fineAmountText: "0",
        showPopup: !1
    },
    methods: {
        formatFineAmount: function(e) {
            this.setData({
                fineAmountText: t.default.toDecimal(e, 2)
            });
        },
        disagree: function() {
            this.triggerEvent("chargebackEvent", {
                agree: !1
            });
        },
        approve: function() {
            this.triggerEvent("chargebackEvent", {
                agree: !0
            });
        }
    }
});