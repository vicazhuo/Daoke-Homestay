var e = function() {
    function e(e, t) {
        var n = [], i = !0, r = !1, o = void 0;
        try {
            for (var l, a = e[Symbol.iterator](); !(i = (l = a.next()).done) && (n.push(l.value), 
            !t || n.length !== t); i = !0) ;
        } catch (e) {
            r = !0, o = e;
        } finally {
            try {
                !i && a.return && a.return();
            } finally {
                if (r) throw o;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = require("../../common/js/utils");

Component({
    properties: {
        text: {
            type: String,
            value: ""
        },
        textLink: {
            type: Object,
            value: {}
        },
        isShow: {
            type: Boolean,
            value: !1
        }
    },
    eventHandle: null,
    ready: function() {
        var e = this;
        this._getElementHeight();
        var n = this;
        this.eventHandle = function() {
            e._handleTap();
        }, t.event.on("closePeopleReception", n.eventHandle);
    },
    detached: function() {
        var e = this;
        t.event.clear(e.eventHandle, "closePeopleReception");
    },
    data: {
        receptionTipStyles: "",
        tipArrowStyle: "",
        isHide: !0
    },
    methods: {
        _handleTap: function() {
            this.triggerEvent("click");
        },
        _getElementHeight: function() {
            var n = this;
            if (this.properties.textLink.title) return new Promise(function(i, r) {
                wx.createSelectorQuery().in(n).selectAll(".rece-item").boundingClientRect().exec(function(i) {
                    var r = e(i[0], 2), o = r[0], l = r[1], a = t.systemInfo.windowWidth, c = l.left;
                    a - l.left <= o.width && (c = a - o.width - 20), n.setData({
                        receptionTipStyles: "top:" + (l.top - o.height - 10) + "px;left:" + c + "px",
                        tipArrowStyle: "top:" + (l.top - 10) + "px;left:" + (l.left + l.width / 2 - 5) + "px",
                        isHide: !1
                    });
                });
            });
        }
    }
});