var e = require("../../common/js/utils");

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        isLoading: {
            type: Boolean,
            value: !1
        },
        isEnd: {
            type: Boolean,
            value: !1
        },
        endText: {
            type: String,
            value: "End"
        },
        isNullContent: {
            type: Boolean,
            value: !1
        },
        isError: {
            type: Boolean,
            value: !1
        },
        nullTitle: {
            type: String,
            value: ""
        },
        nullText: {
            type: String,
            value: ""
        },
        btnText: {
            type: String,
            value: ""
        },
        errorText: {
            type: String,
            value: ""
        },
        errorTitle: {
            type: String,
            value: ""
        },
        nullIcon: {
            type: String,
            value: ""
        },
        scrollTop: {
            type: String,
            value: 0
        },
        heightValue: {
            type: String,
            value: "100vh"
        },
        isPullDown: {
            type: Boolean,
            value: !0
        },
        isClosePullDown: {
            type: Boolean,
            value: !1,
            observer: function() {
                this.stopPullDownRefesh();
            }
        },
        isScroll: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        isWxApp: e.isWxApp,
        isPullDownRefesh: !1,
        isRefeshEnd: !1
    },
    scrollViewTop: 0,
    methods: {
        stopPullDownRefesh: function() {
            var e = this;
            this.setData({
                isRefeshEnd: !0
            }), setTimeout(function() {
                e.setData({
                    isPullDownRefesh: !1
                });
            }, 1e3);
        },
        errorBtnHandle: function() {
            this.triggerEvent("errorBtnHandle");
        },
        bindscrolltolower: function() {
            this.triggerEvent("scrolltolowerChange");
        },
        scrollChange: function(e) {
            this.scrollViewTop = e.detail.scrollTop, this.properties.isScroll && this.triggerEvent("getScrollTop", e.detail.scrollTop);
        },
        touchStart: function(e) {
            if (this.properties.isPullDown) {
                var t = e.changedTouches ? e.changedTouches[0] : {};
                this.tStart = t;
            }
        },
        touchEnd: function(t) {
            var l = this;
            if (this.properties.isPullDown && (this.scrollViewTop = this.scrollViewTop || 0, 
            this.scrollViewTop <= 0 && !this.data.isPullDownRefesh)) {
                var o = t.changedTouches ? t.changedTouches[0] : {}, i = this.tStart;
                "Down" === (0, e.swipeDirection)(i.pageX, o.pageX, i.pageY, o.pageY) && Math.abs(i.pageY - o.pageY) > 80 && (this.setData({
                    isRefeshEnd: !1,
                    isPullDownRefesh: !0
                }), setTimeout(function() {
                    l.triggerEvent("pullDownRefesh");
                }, 500));
            }
        }
    }
});