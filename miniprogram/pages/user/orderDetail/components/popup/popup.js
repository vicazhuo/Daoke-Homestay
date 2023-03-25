Component({
    properties: {
        isShow: {
            type: Boolean,
            value: !1
        },
        popupText: {
            type: String,
            value: "总要传点什么吧！",
            observer: function(t) {
                this.formatToList(t);
            }
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
    data: {
        popupTextList: []
    },
    methods: {
        cancel: function(t) {
            this.triggerEvent("popupCancelEvent", this.data.extra);
        },
        ok: function(t) {
            this.triggerEvent("popupOkEvent", this.data.extra);
        },
        formatToList: function(t) {
            if (console.log(t), -1 != t.indexOf("_")) this.setData({
                popupTextList: t.split("_")
            }); else {
                var e = [];
                e.push(t), this.setData({
                    popupTextList: e
                });
            }
        }
    }
});