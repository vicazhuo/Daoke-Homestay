var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../apiFetch/unitDetailsApi"));

Page({
    data: {
        unitId: "",
        unitFacilityGroups: [],
        isNeedShiPei: !1
    },
    onLoad: function(t) {
        this.setData({
            unitId: t.unitId
        }), this._getUnitFacilityGroups(), this._getSystemInfo();
    },
    _getSystemInfo: function() {
        this.setData({
            isNeedShiPei: getApp().globalData.systemInfo.isNeedShiPei
        });
    },
    _getUnitFacilityGroups: function() {
        var i = this;
        t.default.getUnit({
            unitId: this.data.unitId
        }).then(function(t) {
            t.unitFacilityGroups && t.unitFacilityGroups.length > 0 && i.setData({
                unitFacilityGroups: t.unitFacilityGroups
            });
        }).catch(function(t) {}).finally(function() {});
    }
});