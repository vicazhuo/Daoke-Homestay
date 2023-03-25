Component({
    properties: {
        isShow: {
            type: Boolean,
            value: !1
        },
        popTitle: {
            type: String,
            value: "标题"
        },
        popupText: {
            type: String,
            value: "总要传点什么吧！"
        },
        cancelText: {
            type: String,
            value: "点错了"
        },
        okText: {
            type: String,
            value: "同意"
        },
        extra: {
            type: Object,
            value: {}
        }
    },
    methods: {
        cancel: function(t) {
            this.triggerEvent("popupCancelEvent", this.data.extra);
        },
        ok: function(t) {
            this.triggerEvent("popupOkEvent", this.data.extra);
        }
    }
});