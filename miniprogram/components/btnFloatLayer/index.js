Component({
    properties: {
        btnAnim: {
            type: Boolean,
            value: !0
        },
        btnImgSrc: {
            type: String,
            value: "http://pwastatic.tujia.com//static/wechat/promotion/dacu/1806/active_small_img.png"
        },
        modalUrl: {
            type: String,
            value: ""
        }
    },
    data: {
        HOST_STATIC: "https://pwastatic.tujia.com/static/wechat/tujia/common/",
        animationData: {},
        isAnim: !1,
        setIntervaler: null,
        timer: null,
        btnShow: !1
    },
    methods: {
        closeBtn: function() {
            this.setData({
                btnShow: !1,
                isAnim: !1
            }), clearInterval(this.data.setIntervaler);
        },
        show: function() {
            this.setData({
                btnShow: !0
            }), this.data.btnAnim && this._btnAnim();
        },
        _btnAnim: function() {
            var t = this, e = null;
            this.setData({
                isAnim: !0
            }), e = this._setTimeoutAnim();
            var i = setInterval(function() {
                t.setData({
                    isAnim: !0
                }), clearTimeout(e), clearTimeout(t.data.timer), e = t._setTimeoutAnim();
            }, 3e3);
            this.setData({
                setIntervaler: i,
                timer: e
            });
        },
        _routeToWeb: function() {
            wx.navigateTo({
                url: "/pages/user/webView/webView?webUrl=" + encodeURIComponent(this.properties.modalUrl)
            });
        },
        _setTimeoutAnim: function() {
            var t = this;
            return setTimeout(function() {
                t.setData({
                    isAnim: !1
                });
            }, 1e3);
        }
    }
});