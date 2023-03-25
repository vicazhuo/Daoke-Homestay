var t = require("../../common/js/utils");

Component({
    properties: {
        isPopupShow: {
            type: Boolean,
            value: !1
        },
        isClose: {
            type: Boolean,
            value: !0
        },
        isNavBar: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        isShow: !1,
        bgOpactify: 0,
        panelAnimFlag: !1,
        navHeight: 0
    },
    bgTranstionStatus: !1,
    ready: function() {
        t.systemInfo.isCanUseNavBar && this.setData({
            navHeight: (0, t.getNavHeight)()
        });
    },
    methods: {
        open: function() {
            var t = this;
            if (this.data.isShow) return this.close();
            this.setData({
                isShow: !0
            }), setTimeout(function() {
                t.setData({
                    bgOpacity: 1,
                    panelAnimFlag: !0
                });
            }, 100);
        },
        _bgTranstionend: function(t) {
            this.bgTranstionStatus && (this.setData({
                isShow: !1
            }), this.bgTranstionStatus = !1);
        },
        close: function() {
            this.triggerEvent("closeEvent");
        }
    }
});