Component({
    properties: {
        isShow: {
            type: Boolean,
            value: !1
        },
        confirmText: {
            type: String,
            value: "确定"
        }
    },
    data: {},
    methods: {
        closeModal: function() {
            this.triggerEvent("confirm");
        }
    }
});