var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../apiFetch/unitDetailsApi"));

Page({
    data: {
        unitId: "",
        geoHousePosition: [],
        isNeedShiPei: !1,
        PWA_STATIC_TUJIA_HOST: ""
    },
    onLoad: function(t) {
        this.setData({
            unitId: t.unitId
        }), this._geoPositionHandler(), this._getSystemInfo();
    },
    _getSystemInfo: function() {
        var t = getApp().globalData.systemInfo;
        console.log(t), this.setData({
            isNeedShiPei: t.isNeedShiPei
        });
    },
    _geoPositionHandler: function() {
        var i = this;
        t.default.geohousePosition({
            unitId: this.data.unitId
        }).then(function(t) {
            t && 0 != t.length && i.setData({
                geoHousePosition: t
            });
        }).catch(function(t) {}).finally(function(t) {});
    }
});