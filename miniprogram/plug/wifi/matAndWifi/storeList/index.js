var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../apiFetch/wifiApi"));

Page({
    data: {
        storeList: [],
        isSource: "",
        wifiId: "",
        scene: "",
        loginUrl: "/pages/wifi_v2/matAndWifi/wifiLogin/index",
        indexUrl: "/pages/wifi_v2/wifiList/wifiList"
    },
    onLoad: function(t) {
        this.setData({
            hotelId: t.hotelid,
            wifiId: t.wifiid,
            isSource: t.issource || "",
            scene: t.scene || ""
        }), this._getStoreList();
    },
    dataHanlder: function(t) {
        var e = this;
        t.forEach(function(t, i) {
            e.data.hotelId == t.hotelId ? t.selected = !0 : t.selected = !1;
        }), this.setData({
            storeList: t || []
        });
    },
    selectedStore: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.storeList[t.currentTarget.dataset.index];
        (i.active || "matter" != this.data.isSource) && (this.data.storeList.forEach(function(t, i) {
            t.selected = i == e;
        }), this.setData({
            storeList: this.data.storeList
        }), "qrcode" == this.data.isSource ? wx.redirectTo({
            url: "/pages/wifi_v2/matAndWifi/applyQrCode/addQrCode/index?hotelid=" + i.hotelId + "&hotelname=" + i.hotelName + "&wifiid=" + (this.data.wifiId || "") + "&scene=" + (this.data.scene || "") + "&mock=1"
        }) : "matter" == this.data.isSource && (console.log("/pages/wifi_v2/matAndWifi/applyMatter/applyMatter?city=" + i.city + "&contactphone=" + i.contactPhone + "&detailaddress=" + i.detailAddress + "&district=" + i.district + "&hotelid=" + i.hotelId + "&hotelname=" + i.hotelName + "&instancecount=" + i.instanceCount + "&province=" + i.province + "&recipient=" + i.recipient + "&apply=" + i.apply), 
        wx.redirectTo({
            url: "/pages/wifi_v2/matAndWifi/applyMatter/applyMatter?city=" + i.city + "&contactphone=" + i.contactPhone + "&detailaddress=" + i.detailAddress + "&district=" + i.district + "&hotelid=" + i.hotelId + "&hotelname=" + i.hotelName + "&instancecount=" + i.instanceCount + "&province=" + i.province + "&recipient=" + i.recipient + "&apply=" + i.apply
        })));
    },
    _getStoreList: function() {
        var e = this, i = (getApp().globalUserInfo.tjUserInfo, {});
        "qrcode" == this.data.isSource ? (wx.showLoading(), t.default.getHotelsForWifi(i).then(function(t) {
            e.dataHanlder(t.list || []);
        }).catch(function(t) {
            var i = t.errorNo, a = t.errorMsg;
            "60012" == i ? e._tokenOverdueHandler() : wx.showToast({
                title: a || "获取门店列表失败",
                icon: "none"
            });
        }).finally(function() {
            wx.hideLoading();
        })) : "matter" == this.data.isSource && (wx.showLoading(), t.default.getHotels(i).then(function(t) {
            e.dataHanlder(t.list || []);
        }).catch(function(t) {
            var i = t.errorNo, a = t.errorMsg;
            "60012" == i ? e._tokenOverdueHandler() : wx.showToast({
                title: a || "获取门店列表失败",
                icon: "none"
            });
        }).finally(function() {
            wx.hideLoading();
        }));
    },
    _tokenOverdueHandler: function() {
        wx.redirectTo({
            url: this.data.loginUrl + "?nextPath=" + this.data.indexUrl
        });
    }
});