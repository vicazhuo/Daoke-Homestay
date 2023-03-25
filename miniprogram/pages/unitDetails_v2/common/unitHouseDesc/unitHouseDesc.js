var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../apiFetch/unitDetailsApi"));

Page({
    data: {
        unitId: "",
        unitTrafficInfos: [],
        isNeedShiPei: !1
    },
    onLoad: function(t) {
        this.setData({
            unitId: t.unitId
        }), this._fetchUnitDetail(), this._getSystemInfo();
    },
    _getSystemInfo: function() {
        var t = getApp().globalData.systemInfo;
        console.log(t), this.setData({
            isNeedShiPei: getApp().globalData.systemInfo.isNeedShiPei
        });
    },
    _fetchUnitDetail: function() {
        var i = this;
        t.default.getUnit({
            unitId: this.data.unitId
        }).then(function(t) {
            t.unitTrafficInfos && t.unitTrafficInfos.length && i.setData({
                unitTrafficInfos: t.unitTrafficInfos
            });
        }).catch(function(t) {}).finally(function() {});
    }
});