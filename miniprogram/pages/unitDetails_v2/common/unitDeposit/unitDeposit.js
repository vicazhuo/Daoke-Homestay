function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../../../apiFetch/unitDetailsApi"));

var e = t(require("../../../../common/js/utils"));

Page({
    data: {
        deposit: {},
        depositTip: []
    },
    onLoad: function() {
        this._getDeposit();
    },
    _getDeposit: function() {
        var t = this;
        e.default.timeStorage.get("DESPOIT_DATA").then(function(e) {
            e && t.setData({
                deposit: e,
                depositTip: e.tips || []
            });
        }).catch(function() {});
    },
    onHide: function() {
        e.default.timeStorage.remove("DESPOIT_DATA");
    }
});