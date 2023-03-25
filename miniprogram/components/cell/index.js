var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = function(t, e) {
    console.warn(t), console.log("接受到的值为：", e);
};

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        title: {
            type: String
        },
        label: {
            type: String
        },
        value: {
            type: String
        },
        onlyTapFooter: {
            type: Boolean
        },
        isLastCell: {
            type: Boolean,
            value: !1
        },
        isLink: {
            type: null,
            value: ""
        },
        isArrowImg: {
            type: Boolean,
            value: !1
        },
        linkType: {
            type: String,
            value: "navigateTo"
        },
        url: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        navigateTo: function() {
            var i = this.data.url, o = t(this.data.isLink);
            this.triggerEvent("click", {}), this.data.isLink && i && "true" !== i && "false" !== i && ("boolean" === o || "string" === o ? -1 !== [ "navigateTo", "redirectTo", "switchTab", "reLaunch" ].indexOf(this.data.linkType) ? wx[this.data.linkType].call(wx, {
                url: i
            }) : e("linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch", this.data.linkType) : e("isLink 属性值必须是一个字符串或布尔值", this.data.isLink));
        },
        handleTap: function() {
            this.data.onlyTapFooter || this.navigateTo();
        }
    }
});