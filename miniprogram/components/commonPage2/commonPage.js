var  t = require("../../common/js/utils"), a = (0, 
t.getNavHeight)();

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        isError: {
            type: Boolean,
            value: !1
        },
        errorText: {
            type: String,
            value: "当前链接已失效"
        },
        navTitle: {
            type: String,
            value: "途家2"
        },
        isNavBar: {
            type: Boolean,
            value: !1
        },
        isNavEnableBack: {
            type: Boolean,
            value: !0
        },
        isIosCrossBtm: {
            type: Boolean,
            value: !1
        },
        crossPagePaddingBtm: {
            type: String,
            value: 0
        },
        normalPagePaddingBtm: {
            type: String,
            value: 0
        },
        crossBtnBtm: {
            type: String,
            value: 0
        }
    },
    data: {
        PWA_STATIC_TUJIA_HOST:'',
        isIosCrossBar: t.systemInfo.isNeedShiPei,
        navHeight: a,
        isCanUseNavBar: t.systemInfo.isCanUseNavBar
    },
    methods: {
        _back: function() {
            this.triggerEvent("navback", {});
        },
        _getNavHeight: function(e) {
            this.triggerEvent("navHeight", e.detail), a !== e.detail && (a = e.detail, this.setData({
                navHeight: e.detail
            }));
        }
    }
});