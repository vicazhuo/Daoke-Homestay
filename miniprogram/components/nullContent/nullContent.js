
Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        title: {
            type: String,
            value: "暂无内容"
        },
        text: {
            type: String,
            value: ""
        },
        btnText: {
            type: String,
            value: ""
        }
    },
    data: {
        PWA_STATIC_TUJIA_HOST:''
    },
    methods: {
        errorBtnHandle: function() {
            this.triggerEvent("errorBtnHandle");
        }
    }
});