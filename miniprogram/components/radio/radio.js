Component({
    properties: {
        checked: {
            type: Boolean,
            value: !1
        },
        color: {
            type: String,
            value: "#d7616d"
        },
        label: {
            type: String,
            value: ""
        },
        styleType: {
            type: String,
            value: "default"
        },
        disabled: {
            type: Boolean,
            value: !1
        }
    },
    data: {
      colorStyle: "background-color:#d7616d;border-color:#d7616d"
    },
    created: function() {
        var e = this.properties.color;
        "#FF9645" !== e && this.setData({
            colorStyle: "'background-color:" + e + ";border-color:#" + e
        });
    },
    methods: {
        change: function() {
            this.properties.disabled || this.triggerEvent("change");
        }
    }
});