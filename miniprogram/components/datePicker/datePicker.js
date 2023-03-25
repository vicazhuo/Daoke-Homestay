function t(t) {
    return t ? t.split("-").map(function(t) {
        return parseInt(t);
    }) : "";
}

function e() {
    var t = new Date();
    return [ t.getFullYear(), t.getMonth() + 1, t.getDate() ].join("-");
}

function i(t) {
    return (t = parseInt(t)) < 10 ? "0" + t : t;
}

function n(t, e) {
    return new Date(parseInt(t), parseInt(e), 0).getDate();
}

var r = function() {
    function t(t, e) {
        var i = [], n = !0, r = !1, a = void 0;
        try {
            for (var s, o = t[Symbol.iterator](); !(n = (s = o.next()).done) && (i.push(s.value), 
            !e || i.length !== e); n = !0) ;
        } catch (t) {
            r = !0, a = t;
        } finally {
            try {
                !n && o.return && o.return();
            } finally {
                if (r) throw a;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

Component({
    properties: {
        start: {
            type: String,
            value: "1920-01-01"
        },
        end: {
            type: String,
            value: e()
        },
        value: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        visible: {
            type: Boolean,
            value: !1
        },
        isAliApp: {
            type: Boolean,
            value: !1
        }
    },
    isConfirm: !1,
    isConfirmFlag: !1,
    data: {
        valueIndexs: [ 0, 0, 0 ],
        years: [],
        months: [],
        days: []
    },
    initDate: {},
    pickerYear: 0,
    pickerMonth: 0,
    pickerDay: 0,
    ready: function() {
        this.init();
    },
    methods: {
        init: function() {
            var i = this, n = t(this.properties.start), a = r(n, 3), s = a[0], o = a[1], h = a[2], p = t(this.properties.end), c = r(p, 3), u = c[0], l = c[1], f = c[2];
            if (u - s < 0) throw new Error("end 不能小于 start");
            var y = t(this.properties.value || e());
            this.initDate = {
                sy: s,
                sm: o,
                sd: h,
                ey: u,
                em: l,
                ed: f
            }, this.pickerYear = y ? y[0] : u, this.pickerMonth = y ? y[1] : l, this.pickerDay = y ? y[2] : f, 
            this.getYears(), this.getMonths(), this.getDays(u, l).then(function() {
                i.setInitValue();
            });
        },
        setInitValue: function() {
            var i = this.data, n = i.years, a = i.months, s = i.days, o = t(this.properties.value || e()), h = r(o, 3), p = h[0], c = h[1], u = h[2], l = [ n.findIndex(function(t) {
                return parseInt(t) === p;
            }), a.findIndex(function(t) {
                return parseInt(t) === c;
            }), s.findIndex(function(t) {
                return parseInt(t) === u;
            }) ];
            this.setData({
                valueIndexs: l
            });
        },
        getYears: function() {
            var t = this.initDate, e = t.ey, i = t.sy, n = e - i, r = Array.apply(null, {
                length: n + 1
            }).map(function(t, e) {
                return parseInt(i) + e;
            });
            this.pickerYear || (this.pickerYear = i), this.setData({
                years: r
            });
        },
        getMonths: function() {
            var t = this.initDate, e = t.ey, n = t.em, r = t.sy, a = t.sm;
            this.pickerMonth || (this.pickerMonth = a);
            var s = parseInt(this.pickerYear) == e ? parseInt(n) : 12, o = parseInt(this.pickerYear) == r ? parseInt(a) : 1;
            1 != o && (s -= o - 1);
            var h = Array.apply(null, {
                length: s
            }).map(function(t, e) {
                return i(o + e);
            });
            this.setData({
                months: h
            });
        },
        getDays: function() {
            var t = this;
            return new Promise(function(e, r) {
                var a = t.initDate, s = a.ey, o = a.em, h = a.ed, p = a.sy, c = a.sm, u = a.sd, l = parseInt(t.pickerYear) == p && parseInt(t.pickerMonth) == c ? parseInt(u) : 1, f = parseInt(t.pickerYear) == s && parseInt(t.pickerMonth) == o ? parseInt(h) : n(t.pickerYear, t.pickerMonth);
                1 != l && (f -= l - 1);
                var y = Array.apply(null, {
                    length: f
                }).map(function(t, e) {
                    return i(l + e);
                });
                t.setData({
                    days: y
                }, function() {
                    e();
                });
            });
        },
        dateChange: function(t) {
            console.log(t.detail.value);
            var e = r(t.detail.value, 3), i = e[0], n = e[1], a = e[2], s = this.pickerYear, o = this.pickerMonth, h = this.pickerDay, p = (this.isConfirm, 
            this.data), c = p.years, u = p.months, l = p.days;
            console.log(l, h), c[i] != s ? (this.pickerYear = c[i], this.getMonths(), this.getDays()) : u[n] != o ? (this.pickerMonth = u[n], 
            this.getDays()) : this.pickerDay = l[a];
        },
        emitChange: function() {
            var t = this.createdSelectDate();
            this.triggerEvent("change", {
                value: t
            });
        },
        handleClickMask: function() {
            this.dateCancel();
        },
        dateCancel: function() {
            this.triggerEvent("cancel"), this.isConfirm = !1;
        },
        dateConfirm: function() {
            var t = this;
            if (this.properties.isAliApp) {
                if (this.isConfirmFlag) return;
                return this.isConfirmFlag = !0, void setTimeout(function() {
                    t.isConfirmFlag = !1, t.emitChange();
                }, 400);
            }
            this.isPickStop ? this.isConfirm = !0 : this.emitChange();
        },
        pickstart: function() {
            this.isPickStop = !0;
        },
        pickend: function() {
            this.isPickStop = !1, this.isConfirm && (this.isConfirm = !1, this.emitChange());
        },
        createdSelectDate: function() {
            return [ this.pickerYear, i(this.pickerMonth), i(this.pickerDay) ].join("-");
        }
    }
});