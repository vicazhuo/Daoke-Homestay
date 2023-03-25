Component({
    properties: {
        value: {
            type: Boolean,
            value: !1
        },
        size: {
            type: String,
            value: "default"
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        name: {
            type: String,
            value: ""
        }
    },
    options: {
        multipleSlots: !0
    },
    methods: {
        toggle: function() {
            if (!this.properties.disabled) {
                var e = !this.properties.value;
                this.triggerEvent("change", {
                    value: e
                });
            }
        }
    }
});