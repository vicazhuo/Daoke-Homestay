Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        title: {
            type: String,
            value: ""
        },
        type: {
            type: String,
            value: "text"
        },
        value: {
            type: String,
            value: ""
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        placeholder: {
            type: String,
            value: ""
        },
        autofocus: {
            type: Boolean,
            value: !1
        },
        mode: {
            type: String,
            value: "normal"
        },
        right: {
            type: Boolean,
            value: !1
        },
        slotTitle: {
            type: Boolean,
            value: !1
        },
        error: {
            type: Boolean,
            value: !1
        },
        maxlength: {
            type: Number,
            value: 1e3
        },
        isBorder: {
            type: Boolean,
            value: !0
        },
        name: {
            type: String,
            value: ""
        },
        isClearBtn: {
            type: Boolean,
            value: !1
        },
        isAliApp: {
            type: Boolean,
            value: !1
        }
    },
    timer: null,
    data: {
        isFocus: !1,
        isClear: !1
    },
    methods: {
        handleInputChange: function(e) {
            var t = e.detail, i = (void 0 === t ? {} : t).value, a = void 0 === i ? "" : i;
            return this.triggerEvent("change", {
                value: e.detail.value,
                name: this.properties.name
            }), a;
        },
        handleInputFocus: function(e) {
            clearTimeout(this.timer), this.triggerEvent("focus", {
                value: e.detail.value,
                name: this.properties.name
            }), this.properties.isClearBtn && this.setData({
                isFocus: !0
            });
        },
        handleInputBlur: function(e) {
            var t = this;
            this.triggerEvent("blur", {
                value: this.isClear ? "" : e.detail.value,
                name: this.properties.name
            }), this.isClear = !1, this.properties.isClearBtn && (this.timer = setTimeout(function() {
                t.setData({
                    isFocus: !1
                });
            }, 200));
        },
        rightSlotClick: function(e) {
            this.triggerEvent("click", e);
        },
        clearInput: function(e) {
            this.data.isFocus && (this.isClear = !0, this.triggerEvent("change", {
                value: "",
                name: this.properties.name
            }));
        }
    }
});