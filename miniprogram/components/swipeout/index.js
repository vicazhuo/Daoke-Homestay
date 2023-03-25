function t(t, a, e, o) {
    return Math.abs(t - a) >= Math.abs(e - o) ? t - a > 0 ? "Left" : "Right" : e - o > 0 ? "Up" : "Down";
}

Component({
    externalClasses: [ "i-class" ],
    properties: {
        actions: {
            value: [],
            type: Array,
            observer: "_updateButtonSize"
        },
        unclosable: {
            value: !1,
            type: Boolean
        },
        toggle: {
            value: !1,
            type: Boolean,
            observer: "closeButtonGroup"
        },
        operateWidth: {
            type: Number,
            value: 160
        }
    },
    options: {
        multipleSlots: !0
    },
    data: {
        tStart: {
            pageX: 0,
            pageY: 0
        },
        limitMove: 0,
        position: {
            pageX: 0,
            pageY: 0
        }
    },
    methods: {
        loop: function() {},
        _updateButtonSize: function() {
            var t = this.data.actions;
            if (t.length > 0) {
                var a = 0;
                t.forEach(function(t) {
                    a += t.width || 0;
                }), this.data.limitMove = a;
            } else this.data.limitMove = this.data.operateWidth;
        },
        handleWarpTap: function() {
            this.closeButtonGroup();
        },
        handlerTouchstart: function(t) {
            var a = t.touches ? t.touches[0] : {}, e = this.data.tStart;
            if (a) for (var o in e) a[o] && (e[o] = a[o]);
        },
        swipper: function(t) {
            var a = this.data, e = a.tStart, o = {
                pageX: t.pageX - e.pageX,
                pageY: t.pageY - e.pageY
            };
            a.limitMove < Math.abs(o.pageX) && (o.pageX = -a.limitMove), this.setData({
                position: o
            });
        },
        handlerTouchmove: function(a) {
            var e = this.data.tStart, o = a.touches ? a.touches[0] : {};
            o && "Left" === t(e.pageX, o.pageX, e.pageY, o.pageY) && this.swipper(o);
        },
        handlerTouchend: function(a) {
            var e = this.data.tStart, o = a.changedTouches ? a.changedTouches[0] : {};
            if (o) {
                var i = t(e.pageX, o.pageX, e.pageY, o.pageY), n = {
                    pageX: o.pageX - e.pageX,
                    pageY: o.pageY - e.pageY
                };
                Math.abs(n.pageX) >= 40 && "Left" === i ? n.pageX = n.pageX < 0 ? -this.data.limitMove : this.data.limitMove : n.pageX = 0, 
                this.setData({
                    position: n
                });
            }
        },
        handlerButton: function(t) {
            this.data.unclosable || this.closeButtonGroup();
            var a = t.currentTarget.dataset;
            this.triggerEvent("change", {
                index: a.index
            });
        },
        closeButtonGroup: function() {
            this.setData({
                position: {
                    pageX: 0,
                    pageY: 0
                }
            });
        },
        handlerParentButton: function(t) {
            this.data.unclosable || this.closeButtonGroup();
        }
    },
    ready: function() {
        this._updateButtonSize();
    }
});