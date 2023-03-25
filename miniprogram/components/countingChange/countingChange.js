Component({
    properties: {
        max: {
            type: Number,
            value: 10
        },
        min: {
            type: Number,
            value: 0
        },
        n: {
            type: Number,
            value: 1,
            observer: function() {
                this.updateStatus();
            }
        }
    },
    data: {
        lessDisabled: !1,
        moreDisabled: !1
    },
    methods: {
        updateStatus: function() {
            var t = this.properties, e = t.n, s = t.min, a = t.max;
            this.setData({
                moreDisabled: e >= a
            }), this.setData({
                lessDisabled: e <= s
            });
        },
        lessChange: function() {
            var t = this.properties, e = t.n;
            e > t.min && (e--, this.triggerEvent("countingChange", {
                n: e
            }), this.updateStatus());
        },
        moreChange: function() {
            var t = this.properties, e = t.n;
            e < t.max && (e++, this.triggerEvent("countingChange", {
                n: e
            }), this.updateStatus());
        }
    }
});