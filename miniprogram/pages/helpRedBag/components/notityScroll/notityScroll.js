var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../apiFetch/helpRedbagApi"));

Component({
    properties: {
        activityId: {
            type: String,
            observer: function(e) {
                console.log(e), this.getPowerDynamicInfo(e);
            }
        }
    },
    data: {
        list: [],
        PWA_STATIC_TUJIA_HOST:""
    },
    methods: {
        toRulePage: function() {
            wx.navigateTo({
                url: "/pages/user/webView/webView?webUrl=" + encodeURIComponent(e.PWA_TUJIA_HOST + "/h5/promotion/redpacket/ruleinfo")
            });
        },
        getPowerDynamicInfo: function(e) {
            var o = this;
            t.default.queryPowerDynamicInfo(e).then(function(e) {
                var t = e.infos;
                t && (1 == t.length && t.push(t[0]), o.setData({
                    list: t
                }));
            });
        },
        formBtn: function(e) {
            var t = e.detail.formId;
            t && "the formId is a mock one" !== t && this.triggerEvent("setFormEvent", {
                formId: t
            });
        }
    }
});