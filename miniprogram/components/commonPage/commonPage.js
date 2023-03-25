Component({
    properties: {
        isError: {
            type: Boolean,
            value: !1
        },
        errorText: {
            type: String,
            value: "当前链接已失效"
        },
        btnText: {
            type: String,
            value: "去逛逛"
        },
        btnType: {
            type: String,
            value: "navigate"
        },
        navigateType: {
            type: String,
            value: "switchTab"
        },
        url: {
            type: String,
            value: "/pages/index/index"
        }
    },
    data: {
        PWA_STATIC_TUJIA_HOST: ''
    },
    methods: {
        errorBtnHandle: function() {
           
        }
    }
});