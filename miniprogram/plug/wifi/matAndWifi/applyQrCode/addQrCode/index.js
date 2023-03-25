function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var t, i = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s]);
    }
    return e;
}, s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../../apiFetch/wifiApi")), a = require("../../../../../common/js/utils.js");

Page({
    data: (t = {
        submitActive: !0,
        isShowPopup: !1,
        systemInfo: {},
        wifiName: "",
        wifiPassword: "",
        wifiNote: ""
    }, e(t, "systemInfo", {}), e(t, "nowWifi", {}), e(t, "wifiList", []), e(t, "selectStatus", !1), 
    e(t, "optionselectedHotelId", ""), e(t, "optionSelectedHotelName", ""), e(t, "optionSelectedHouseName", ""), 
    e(t, "optionSelectedHouseId", ""), e(t, "selectedHotelId", ""), e(t, "originHotelId", ""), 
    e(t, "selectedHotelName", ""), e(t, "selectedHouseId", ""), e(t, "selectedHouseName", ""), 
    e(t, "wifiId", ""), e(t, "pageType", ""), e(t, "wifiInfo", {}), e(t, "scene", ""), 
    e(t, "storeList", []), e(t, "loginUrl", "/pages/wifi_v2/matAndWifi/wifiLogin/index"), 
    e(t, "indexUrl", "/pages/wifi_v2/wifiList/wifiList"), e(t, "houseSizeList", []), 
    e(t, "mockNosub", ""), e(t, "activeCount", ""), t),
    onLoad: function(e) {
        var t = "";
        this.setData({
            optionSelectedHotelName: e.hotelname || "",
            optionselectedHotelId: e.hotelid || "",
            selectedHotelId: e.hotelid || "",
            selectedHotelName: e.hotelname || "",
            optionSelectedHouseName: e.housename || "",
            optionSelectedHouseId: e.houseid || "",
            selectedHouseId: e.houseid || "",
            selectedHouseName: e.housename || "",
            wifiId: e.wifiid || "",
            scene: e.scene || "",
            mockNosub: e.mock || "",
            activeCount: e.activecount || ""
        }), this.data.wifiId ? (t = "edit", this._getDetail()) : t = "add", this.data.scene && wx.setNavigationBarTitle({
            title: "设置激活台卡"
        }), this.setData({
            pageType: t
        }), this._init(), this._getStoreList(), this._getConnectedWifi();
    },
    selectHouseSize: function() {
        this.data.houseSizeList && 0 == this.data.houseSizeList.length ? wx.showToast({
            title: "暂无房屋信息",
            icon: "none"
        }) : this.data.houseSizeList && 1 == this.data.houseSizeList.length || (this.data.scene ? wx.navigateTo({
            url: "/pages/wifi_v2/matAndWifi/houseListForWifi/index?hotelid=" + this.data.selectedHotelId + "&hotelname=" + this.data.selectedHotelName + "&scene=" + this.data.scene + "&houseid=" + this.data.selectedHouseId + "&activecount=" + this.data.activeCount
        }) : wx.navigateTo({
            url: "/pages/wifi_v2/matAndWifi/houseListForWifi/index?hotelid=" + this.data.selectedHotelId + "&hotelname=" + this.data.selectedHotelName + "&houseid=" + this.data.selectedHouseId + "&wifiid=" + this.data.wifiId + "&activecount=" + this.data.activeCount
        }));
    },
    selectStore: function() {
        this.data.storeList && 1 == this.data.storeList.length || (this.data.scene ? wx.navigateTo({
            url: "/pages/wifi_v2/matAndWifi/storeList/index?hotelid=" + this.data.selectedHotelId + "&issource=qrcode&scene=" + this.data.scene
        }) : wx.navigateTo({
            url: "/pages/wifi_v2/matAndWifi/storeList/index?hotelid=" + this.data.selectedHotelId + "&issource=qrcode&wifiid=" + this.data.wifiId
        }));
    },
    selectWifi: function(e) {
        this.setData({
            selectStatus: !1,
            wifiName: this.data.wifiList[e.currentTarget.dataset.index || 0].SSID
        });
    },
    _routeToJumpHandler: function(e) {
        "add" == this.data.pageType ? this.data.scene ? wx.navigateTo({
            url: "/pages/wifi_v2/landlordActivateConfirm/index?wifiid=" + (e.hotelWifi && e.hotelWifi.hotelWifiId)
        }) : wx.redirectTo({
            url: "/pages/wifi_v2/matAndWifi/applyQrCode/completeQrCode/index?wifiid=" + (e.hotelWifi && e.hotelWifi.hotelWifiId)
        }) : "edit" == this.data.pageType && wx.redirectTo({
            url: "/pages/wifi_v2/wifiList/wifiList"
        });
    },
    submitBtn: function() {
        var e = this, t = this._parameterHandler();
        t && (wx.showLoading(), s.default.savehotelwifi(t).then(function(t) {
            e._routeToJumpHandler(t);
        }).catch(function(t) {
            var i = t.errorNo, s = t.errorMsg;
            "60012" == i ? e._tokenOverdueHandler() : wx.showToast({
                title: s || "提交失败",
                icon: "none"
            }), (0, a.setTjLog)({
                page: "/pages/wifi_v2/matAndWifi/applyQrCode/addQrCode/index",
                errorType: "addQrCode",
                errorMsg: s
            });
        }).finally(function() {
            wx.hideLoading();
        }));
    },
    wifiBindFocus: function(e) {
        this.setData({
            selectStatus: !0
        });
    },
    bindPassword: function(e) {
        this.setData({
            wifiPassword: e.detail.value
        });
    },
    bindWifiNote: function(e) {
        this.setData({
            wifiNote: e.detail.value
        });
    },
    bindName: function(e) {
        this.setData({
            wifiName: e.detail.value,
            selectStatus: !1
        });
    },
    _init: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    systemInfo: t
                }), "ios" === t.platform || e._initWifi();
            }
        });
    },
    _initWifi: function() {
        var e = this;
        wx.startWifi({
            success: function(t) {
                e._getWifiList();
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    _getWifiList: function() {
        var e = this;
        wx.getWifiList({
            success: function(t) {
                wx.onGetWifiList(function(t) {
                    t.wifiList && e._setWifiList(t.wifiList);
                });
            },
            fail: function(e) {}
        });
    },
    _setWifiList: function(e) {
        var t = [];
        e.forEach(function(e, i) {
            -1 == t.findIndex(function(t) {
                return t.SSID === e.SSID;
            }) && (e.SSID = e.SSID ? e.SSID.trim() : e.SSID, t.push(e));
        }), e = (e = t.filter(function(e) {
            return e.SSID;
        })).splice(0, 5), this.setData({
            wifiList: e
        });
    },
    _getStoreList: function() {
        var e = this;
        s.default.getHotelsForWifi({}).then(function(t) {
            e.setData({
                storeList: t.list || []
            }), e._storeHandler();
        }).catch(function(t) {
            var i = t.errorNo, s = t.errorMsg;
            "60012" == i ? e._tokenOverdueHandler() : wx.showToast({
                title: s || "获取门店列表失败",
                icon: "none"
            });
        }).finally(function() {
            wx.hideLoading();
        });
    },
    _storeHandler: function() {
        var e = this;
        this.data.storeList && this.data.storeList.length >= 1 && "add" == this.data.pageType && 1 != this.data.mockNosub && (this.setData({
            selectedHotelId: this.data.storeList[0].hotelId,
            selectedHotelName: this.data.storeList[0].hotelName,
            houseSizeList: this.data.storeList[0].houses || []
        }), this.data.storeList[0].houses && this.data.storeList[0].houses.length && this.setData({
            selectedHouseId: this.data.storeList[0].houses[0].houseId,
            selectedHouseName: this.data.storeList[0].houses[0].houseName,
            activeCount: this.data.storeList[0].houses[0].activeCount
        }));
        var t = this.data.storeList.find(function(t) {
            return e.data.selectedHotelId == t.hotelId;
        });
        this.setData({
            houseSizeList: t && t.houses || []
        }), 1 == this.data.mockNosub && t.houses && t.houses.length && this.setData({
            selectedHouseId: this.data.selectedHouseId || t.houses[0].houseId,
            selectedHouseName: this.data.selectedHouseName || t.houses[0].houseName,
            activeCount: this.data.activeCount || t.houses[0].activeCount
        });
    },
    _getDetail: function() {
        var e = this, t = new a.Base64(), i = {
            wifiId: this.data.wifiId
        };
        wx.showLoading(), s.default.getWifiById(i).then(function(i) {
            e.setData({
                originHotelId: i.hotelId,
                wifiInfo: i,
                wifiNote: i.houseNo,
                selectedHotelId: i.hotelId,
                selectedHotelName: i.hotelName,
                selectedHouseId: i.houseId,
                selectedHouseName: i.houseName,
                wifiName: i.name,
                wifiPassword: t.decode(t.decode(i.password))
            }), e.data.optionselectedHotelId && e.setData({
                selectedHotelId: e.data.optionselectedHotelId,
                selectedHotelName: e.data.optionSelectedHotelName
            }), 1 == e.data.mockNosub && e.setData({
                selectedHouseId: e.data.optionSelectedHouseId,
                selectedHouseName: e.data.optionSelectedHouseName
            });
        }).catch(function(t) {
            var i = t.errorNo, s = t.errorMsg;
            "60012" == i ? e._tokenOverdueHandler() : wx.showToast({
                title: s || "获取详情失败",
                icon: "none"
            });
        }).finally(function() {
            wx.hideLoading();
        });
    },
    _getConnectedWifi: function() {
        var e = this;
        console.log("getConnectedWifi"), wx.getConnectedWifi({
            success: function(t) {
                console.log("getConnectedWifi", t), t.wifi && t.wifi.SSID && e.setData({
                    nowWifi: t.wifi,
                    wifiName: t.wifi.SSID
                });
            },
            fail: function(e) {}
        });
    },
    _tokenOverdueHandler: function() {
        wx.redirectTo({
            url: this.data.loginUrl + "?nextPath=" + this.data.indexUrl
        });
    },
    _parameterHandler: function() {
        var e = {}, t = void 0;
        return "add" == this.data.pageType ? (t = !0, e = {
            hotelId: this.data.selectedHotelId,
            hotelName: this.data.selectedHotelName,
            name: this.data.wifiName,
            password: this.data.wifiPassword,
            hotelWifiId: this.data.scene || "",
            houseId: this.data.selectedHouseId,
            houseNo: this.data.wifiNote
        }) : "edit" == this.data.pageType && (t = this.data.originHotelId != this.data.selectedHotelId, 
        this.data.wifiInfo.houseNo = this.data.wifiNote, this.data.wifiInfo.hotelId = this.data.selectedHotelId, 
        this.data.wifiInfo.hotelName = this.data.selectedHotelName, this.data.wifiInfo.name = this.data.wifiName, 
        this.data.wifiInfo.houseId = this.data.selectedHouseId, this.data.wifiInfo.password = this.data.wifiPassword, 
        e = i({}, this.data.wifiInfo)), e.hotelId ? e.name && e.name.trim() ? {
            changeHotel: t,
            hotelWifi: i({}, e)
        } : (wx.showToast({
            title: "请填写wifi名称",
            icon: "none"
        }), !1) : (wx.showToast({
            title: "请选择门店",
            icon: "none"
        }), !1);
    }
});