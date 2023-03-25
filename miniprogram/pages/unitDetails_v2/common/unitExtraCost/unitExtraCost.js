var t = Object.assign || function(t) {
    for (var n = 1; n < arguments.length; n++) {
        var e = arguments[n];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
}, n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../apiFetch/unitDetailsApi"));

Page({
    data: {
        unitId: "",
        checkinOtherInfo: []
    },
    onLoad: function(t) {
        this.setData({
            unitId: t.unitId
        }), this._fetchUnitDetail();
    },
    _fetchUnitDetail: function() {
        var e = this;
        n.default.getUnit({
            unitId: this.data.unitId
        }).then(function(n) {
            if (n.checkinOtherInfo && 0 != n.checkinOtherInfo.length) {
                var i = [];
                n.checkinOtherInfo.forEach(function(n, e) {
                    if (n.items[0]) {
                        var a = t({}, n.items[0]);
                        delete n.items, a = t({}, a, n), i.push(a);
                    }
                }), e.setData({
                    checkinOtherInfo: i
                });
            }
        }).catch(function(t) {}).finally(function() {});
    }
});