var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../common/js/utils"));

Component({
    properties: {
        cancelRules: Array,
        cancelTexts: Array
    },
    data: {
        odrerProcess: [],
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
    },
    methods: {
        openH5page: function(e) {
            e.target.dataset && e.target.dataset.url && wx.navigateTo({
                url: "/pages/unitDetails_v2/common/unitWebview/unitWebview?ruleUrl=" + encodeURIComponent(e.target.dataset.url)
            });
        },
        openShuoMing: function() {
            this.data.cancelTexts.length && this.data.cancelTexts[1] && t.default.timeStorage.set("DESPOIT_DATA", this.data.cancelTexts[1]), 
            wx.navigateTo({
                url: "/pages/unitDetails_v2/common/unitDeposit/unitDeposit"
            });
        }
    }
});