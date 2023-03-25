function t(t, a) {
    var e = getApp(), i = 0;
    return new Promise(function(n, s) {
        return (i = e.globalPxAndRpxRatio) ? n({
            px: t * i,
            ratio: i
        }) : a ? (i = a / 750, n({
            px: t * i,
            ratio: i
        })) : void wx.getSystemInfo({
            success: function(a) {
                i = a.windowWidth / 750, e.globalPxAndRpxRatio = i, n({
                    px: t * i,
                    ratio: i
                });
            },
            fail: function(t) {
                s(t);
            }
        });
    });
}

Component({
    properties: {
        navigations: {
            type: Array,
            value: [],
            observer: function(t) {
                t.length && this.init();
            }
        },
        autoplay: {
            type: Boolean,
            value: !0
        },
        interval: {
            type: Number,
            value: 3e3
        }
    },
    data: {
        adSwiperCurrent: 0,
        activeOpacityValue: 1,
        isTouch: !1,
        zIndexItems: []
    },
    bottomBannerStartX: 0,
    bottomBannerWidth: 0,
    bottomBannerStartTime: 0,
    isSelect: !1,
    isAdd: !1,
    isAllowSelect: !0,
    autoplayTimer: null,
    created: function() {
        var a = this;
        t(670).then(function(t) {
            var e = t.px;
            t.ratio;
            a.bottomBannerWidth = e;
        });
    },
    methods: {
        init: function() {
            var t = this.data.navigations, a = t.length;
            a && 1 !== a ? (this.isAllowSelect = !0, this.setData({
                zIndexItems: t.map(function(t, e) {
                    return a - e;
                })
            }), this.data.autoplay && this.autoPlay()) : this.isAllowSelect = !1;
        },
        touchstart: function(t) {
            this.isAllowSelect && (this.bottomBannerStartX = t.changedTouches[0].clientX, this.bottomBannerStartTime = +new Date(), 
            this.setData({
                isTouch: !0
            }), this.data.autoplay && (clearInterval(this.autoplayTimer), this.autoplayTimer = null));
        },
        touchmove: function(t) {
            if (this.isAllowSelect) {
                var a = t.changedTouches[0].clientX - this.bottomBannerStartX;
                if (a) {
                    var e = (Math.abs(a) / this.bottomBannerWidth).toFixed(2);
                    this.isSelect && this.updateZindex(a < 0), this.isAdd = a < 0, this.isSelect = !0, 
                    this.setData({
                        activeOpacityValue: e > 1 ? 1 : 1 - e
                    });
                }
            }
        },
        touchend: function(t) {
            var a = this;
            if (this.isAllowSelect && (this.isSelect || !t)) {
                t || this.updateZindex(!0), this.data.autoplay && this.autoPlay();
                var e = this.data, i = e.activeOpacityValue, n = e.adSwiperCurrent, s = e.navigations, o = e.zIndexItems, r = s.length - 1, l = 0, h = t ? t.changedTouches[0].clientX - this.bottomBannerStartX : "";
                if (h && !(Math.abs(h) < 8) || !t) {
                    var u = t ? +new Date() - this.bottomBannerStartTime : 0;
                    if ((i = u < 200 ? 0 : i >= .5 ? 1 : 0) || (l = this.isAdd || !t ? n == r ? 0 : n + 1 : n ? n - 1 : r), 
                    this.isSelect = !1, this.setData({
                        activeOpacityValue: i,
                        isTouch: !1
                    }), !i) {
                        var c = o[l];
                        o[l] = o[n], o[n] = c, this.isAllowSelect = !1, setTimeout(function() {
                            a.setData({
                                zIndexItems: o,
                                activeOpacityValue: 1,
                                adSwiperCurrent: i ? n : l
                            }), a.isAllowSelect = !0;
                        }, 300);
                    }
                }
            }
        },
        updateZindex: function(t) {
            var a = this.data, e = a.adSwiperCurrent, i = a.navigations, n = a.zIndexItems, s = 0, o = i.length - 1, r = n[e] - 1;
            s = t ? e == o ? 0 : e + 1 : e ? e - 1 : o, n[n.findIndex(function(t) {
                return t == r;
            })] = n[s], n[s] = r, this.setData({
                zIndexItems: n
            });
        },
        bottomBannerJump: function(t) {
            this.data.autoplay && this.autoPlay();
            var a = t.currentTarget.dataset.index;
            this.triggerEvent("click", {
                index: a
            });
        },
        autoPlay: function() {
            var t = this;
            this.autoplayTimer || (this.autoplayTimer = setInterval(function() {
                t.touchend();
            }, this.data.interval));
        }
    }
});