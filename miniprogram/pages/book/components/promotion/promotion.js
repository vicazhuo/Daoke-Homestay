var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../common/js/utils")), a = {
    1: "/pages/book/pages/redpacket/redpacket",
    2: "/pages/book/pages/travelCard/travelCard",
    3: "/pages/book/pages/redpacket/redpacket"
};

Component({
    properties: {
        promotion: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        promotionHandleTap: function(e) {
            var t = e.currentTarget.dataset, r = t.subtype, o = t.index, n = a[r];
            n && wx.navigateTo({
                url: n + "?index=" + o
            });
        },
        saleRadioChange: function(e) {
            var a = e.currentTarget.dataset.index;
            this.triggerEvent("saleRadioChange", a);
        },
        bookingRuleItem: function(a) {
            var t = a.currentTarget.dataset.url;
            t && e.default.openWebview(t);
        }
    }
});