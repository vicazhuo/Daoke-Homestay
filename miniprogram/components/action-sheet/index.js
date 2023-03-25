var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, t = require("../../common/js/utils");

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        visible: {
            type: Boolean,
            value: !1
        },
        maskClosable: {
            type: Boolean,
            value: !0
        },
        showCancel: {
            type: Boolean,
            value: !1
        },
        cancelText: {
            type: String,
            value: "取消"
        },
        actions: {
            type: Array,
            value: []
        }
    },
    data: {
        isIosCrossBar: t.systemInfo.isNeedShiPei
    },
    methods: {
        handleClickMask: function() {
            this.data.maskClosable && this.handleClickCancel();
        },
        handleClickItem: function(t) {
            var a = t.currentTarget, n = ((void 0 === a ? {} : a).dataset || {}).index;
            this.triggerEvent("click", e({
                index: n
            }, this.properties.actions[n]));
        },
        handleClickCancel: function() {
            this.triggerEvent("cancel");
        }
    }
});