var t = require("../../common/js/utils");

Component({
    properties: {
        modalShow: {
            type: Boolean,
            value: !1
        },
        modalSrc: {
            type: String,
            value: ""
        },
        modalUrl: {
            type: String,
            value: ""
        },
        modalType: {
            type: String,
            value: "navigateTo"
        },
        modalAppid: {
            type: String,
            value: ""
        }
    },
    data: {
        text: "text",
        HOST_STATIC: "https://pwastatic.tujia.com/static/wechat/tujia/common/"
    },
    methods: {
        closeModal: function() {
            this.setData({
                modalShow: !1
            }), this.triggerEvent("closeEvent");
        },
        routeToWeb: function() {
            var e = this.properties, a = e.modalUrl, o = e.modalType, i = e.modalAppid;
            this.setData({
                modalShow: !1
            }), o = o || "navigateTo", t.openWebview(a, o, i);
        }
    }
});