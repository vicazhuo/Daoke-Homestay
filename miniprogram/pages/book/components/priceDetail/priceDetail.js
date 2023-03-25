Component({
    properties: {
        isShowPopup: {
            type: Boolean,
            value: !1
        },
        showPopType: {
            type: String,
            value: "1"
        },
        priceDetail: {
            type: Object,
            value: {}
        },
        insurance: {
            type: Object,
            value: {}
        }
    },
    data: {
        isShowAll: !1
    },
    methods: {
        showPricePop: function() {
            var e = this;
            this.triggerEvent("priceClose"), setTimeout(function() {
                e.setData({
                    isShowAll: !1
                });
            }, 200);
        },
        showAll: function() {
            this.setData({
                isShowAll: !0
            });
        }
    }
});