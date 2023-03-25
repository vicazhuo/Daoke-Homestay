var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../apiFetch/wifiApi"));

Page({
    data: {
        hotelId: "",
        hotelName: "",
        storeList: [],
        showHouseList: [],
        wifiId: "",
        scene: "",
        selectHouseId: ""
    },
    onLoad: function(e) {
        this.setData({
            hotelId: e.hotelid,
            hotelName: e.hotelname,
            wifiId: e.wifiid,
            scene: e.scene || "",
            selectHouseId: e.houseid || ""
        }), this._getStoreList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    selectedHouse: function(e) {
        var t = e.currentTarget.dataset.index, s = this.data.showHouseList[e.currentTarget.dataset.index];
        this.data.showHouseList.forEach(function(e, s) {
            e.selected = s == t;
        }), this.setData({
            showHouseList: this.data.showHouseList
        }), wx.redirectTo({
            url: "/pages/wifi_v2/matAndWifi/applyQrCode/addQrCode/index?houseid=" + s.houseId + "&housename=" + s.houseName + "&wifiid=" + (this.data.wifiId || "") + "&hotelid=" + this.data.hotelId + "&hotelname=" + this.data.hotelName + "&scene=" + (this.data.scene || "") + "&activecount=" + s.activeCount + "&mock=1"
        });
    },
    _houseDataHandler: function() {
        var e = this, t = this.data.storeList.find(function(t) {
            return t.hotelId == e.data.hotelId;
        });
        console.log(t), t && t.houses && t.houses.length && t.houses.forEach(function(t) {
            t.houseId == e.data.selectHouseId ? t.selected = !0 : t.selected = !1;
        }), this.setData({
            showHouseList: t && t.houses || []
        });
    },
    _getStoreList: function() {
        var t = this;
        e.default.getHotelsForWifi({}).then(function(e) {
            t.setData({
                storeList: e.list || []
            }), t._houseDataHandler();
        }).catch(function(e) {
            e.errorNo, e.errorMsg;
        }).finally(function() {
            wx.hideLoading();
        });
    }
});