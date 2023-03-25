Component({
    properties: {
        isPopupShow: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                if (t) return this.open();
                this.close();
            }
        },
        animType: {
            type: String,
            value: "down"
        }
    },
    data: {
        isShow: !1,
        bgOpactify: 0,
        panelAnimFlag: !1
    },
    bgFlag: !1,
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
            this.bgFlag && (this.setData({
                isShow: !1
            }), this.bgFlag = !1);
        },
        close: function() {
            this.data.isShow && (this.bgFlag = !0, this.setData({
                bgOpacity: 0,
                panelAnimFlag: !1
            }));
        }
    }
});