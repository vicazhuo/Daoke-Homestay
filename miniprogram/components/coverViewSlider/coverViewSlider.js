var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../common/js/utils"));

Component({
    properties: {
        rangeWidth: {
            type: Number,
            value: 498
        },
        btnWidth: {
            type: Number,
            value: 28
        },
        rangeList: {
            type: Array,
            value: []
        },
        defaultIndex: {
            type: Number,
            value: 0,
            observer: function(t, e) {
                this.btnWidth && t && this.itemTap();
            }
        }
    },
    ready: function() {
        var e = this, i = this.data, a = i.rangeWidth, n = i.btnWidth, h = i.rangeList;
        this.maxLen = h.length - 1, t.default.rpxToPx(a - n).then(function(t) {
            t.px;
            var i = t.ratio, h = void 0;
            e.btnWidth = n * i / 2, e.itemWidth = a / e.maxLen * i, e.maxScrollViewWidth = e.maxLen * e.itemWidth - e.btnWidth;
            var s = e.data.defaultIndex;
            h = s ? s * e.itemWidth - e.btnWidth : e.data.leftDeviation, s == e.maxLen && (h -= 5), 
            e.setData({
                nowIndex: s,
                scrollX: h
            }), e.endDistance = h;
        });
    },
    data: {
        nowIndex: 0,
        scrollX: 0,
        isTouch: !1,
        PWA_STATIC_TUJIA_HOST:'',
        leftDeviation: -2
    },
    endDistance: 0,
    startX: 0,
    itemWidth: 0,
    maxLen: 0,
    maxScrollViewWidth: 0,
    methods: {
        itemTap: function(t) {
            var e = t ? t.currentTarget.dataset.index : this.data.defaultIndex;
            if (e != this.data.nowIndex) {
                var i = e ? e * this.itemWidth - this.btnWidth : this.data.leftDeviation;
                e == this.maxLen && (i -= 5), this.setData({
                    nowIndex: e,
                    scrollX: i
                }), this.endDistance = i, t && this.triggerEvent("sliderChange", e);
            }
        },
        handleTouchStart: function(t) {
            this.startX = t.changedTouches[0].clientX, this.setData({
                isTouch: !1
            });
        },
        handleTouchMove: function(t) {
            var e = this.maxScrollViewWidth, i = this.endDistance, a = this.data.scrollX, n = t.changedTouches[0].clientX - this.startX;
            a <= 0 && n < 0 || a >= e && n > 0 || (n = (n += i) < 0 ? this.data.leftDeviation : Math.abs(n) > e ? e : n, 
            this.setData({
                scrollX: n
            }));
        },
        handleTouchEnd: function(t) {
            var e = this.itemWidth, i = this.maxLen, a = this.btnWidth, n = this.data, h = n.scrollX, s = n.nowIndex, d = t.changedTouches[0].clientX - this.startX, r = Math.round(d / e);
            h = (r = (r = s + r) > i && r > 0 ? i : r < 0 && r > -i ? 0 : r) ? e * r - a : this.data.leftDeviation, 
            r == this.maxLen && (h -= 5), this.setData({
                nowIndex: r,
                scrollX: h,
                isTouch: !0
            }), this.triggerEvent("sliderChange", r), this.endDistance = h;
        }
    }
});