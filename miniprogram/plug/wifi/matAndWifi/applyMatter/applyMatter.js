function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

t(require("../../../../components/toast/toast"));

var e = t(require("../../../../apiFetch/wifiApi.js")), i = require("../../../../common/js/utils"), a = require("../../../../common/js/utils.js"), o = "pages/wifi_v2/matAndWifi/applyMatter/applyMatter";

Page({
    data: {
        applyCount: null,
        maxNumber: 1,
        customItem: "",
        region: [ "", "", "请选择" ],
        isCanSubmitPhone: !1,
        mobile: "",
        detailAddress: "",
        recipient: "",
        hotelName: "",
        hotelId: 0,
        hotelList: [],
        user: {},
        applynumtext: "",
        canSubmit: !1,
        isSingleStore: !1,
        apply: 0
    },
    onLoad: function(t) {
        var e = getApp();
        this.setData({
            user: e.globalUserInfo.tjUserInfo
        }), this.setData({
            hotelName: t.hotelname || "",
            applyCount: t.applycount || "",
            maxNumber: t.instancecount || "",
            detailAddress: t.detailaddress || "",
            province: t.province || "",
            city: t.city || "",
            district: t.district || "",
            hotelId: t.hotelid || "",
            recipient: t.recipient || "",
            apply: t.apply || ""
        }), t.recipient && "undefined" == t.recipient && this.setData({
            recipient: ""
        }), t.detailaddress && "undefined" == t.detailaddress && this.setData({
            detailAddress: ""
        }), t.applycount && "undefined" == t.applycount && this.setData({
            applyCount: ""
        }), t.apply && ("undefined" == t.apply ? this.setData({
            apply: ""
        }) : this.setData({
            apply: t.apply
        })), t.instancecount && this.setData({
            applynumtext: "最多申请" + t.instancecount
        }), this.data.district && this.setData({
            region: [ t.province, t.city, t.district ]
        }), t.contactphone && this.setData({
            isCanSubmitPhone: a.checkMobile(t.contactphone),
            mobile: a.checkMobile(t.contactphone) ? t.contactphone : ""
        }), this._getHotels();
    },
    formBtn: function(t) {
        console.log("form id=", t), a.formBtn(t);
    },
    selectStoreList: function() {
        console.log("选择门店列表"), this.data.hotelList.length > 1 && wx.navigateTo({
            url: "/pages/wifi_v2/matAndWifi/storeList/index?hotelid=" + this.data.hotelId + "&issource=matter"
        });
    },
    bindRegionChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            region: t.detail.value
        });
    },
    getNumbers: function(t) {
        console.log("获取用户输入的申请数量", t), this.setData({
            applyCount: t.detail.value
        }), t.detail.value > this.data.maxNumber && (wx.showToast({
            title: "最多申请" + this.data.maxNumber + "套",
            icon: "none"
        }), this.setData({
            applyCount: this.data.maxNumber
        })), t.detail.value < 1 && wx.showToast({
            title: "请填写申请套数",
            icon: "none"
        });
    },
    getAddressInfo: function(t) {
        this.setData({
            detailAddress: t.detail.value.trim()
        });
    },
    getAcceptName: function(t) {
        this.setData({
            recipient: t.detail.value.trim()
        });
    },
    bindphone: function(t) {
        console.log(t);
        var e = t.detail.value;
        this.setData({
            mobile: e,
            isCanSubmitPhone: a.checkMobile(e)
        }), console.log(this.data.isCanSubmitPhone);
    },
    submitInfo: function(t) {
        this._savemateriel();
    },
    _getHotels: function() {
        var t = this;
        e.default.getHotels({}).then(function(e) {
            if (console.log(e), 0 === e.list.length && wx.showToast({
                title: "暂无可申请在线门店",
                icon: "none"
            }), t.setData({
                hotelList: e.list
            }), 1 == e.list.length) {
                var i = e.list[0], o = i.province || "", n = i.city || "", s = i.district || "", l = [ "", "", "请选择" ];
                s && (l = [ o, n, s ]), t.setData({
                    recipient: i.recipient || "",
                    region: l,
                    hotelName: i.hotelName || "",
                    detailAddress: i.detailAddress || "",
                    hotelId: i.hotelId,
                    maxNumber: i.instanceCount,
                    applynumtext: "最多申请" + i.instanceCount,
                    isSingleStore: !0,
                    apply: i.apply
                }), i.contactPhone && t.setData({
                    isCanSubmitPhone: a.checkMobile(i.contactPhone),
                    mobile: a.checkMobile(i.contactPhone) ? i.contactPhone : ""
                }), t.data.mobile && t.setData({
                    isCanSubmitPhone: a.checkMobile(i.contactPhone)
                });
            }
        }).catch(function(t) {
            if (console.log("getHotels error:", t), 60012 == t.errorNo) {
                var e = encodeURIComponent("/pages/wifi_v2/wifiList/wifiList");
                wx.redirectTo({
                    url: "/pages/wifi_v2/matAndWifi/wifiLogin/index?nextPath=" + e
                });
            } else (0, i.setTjLog)({
                page: o,
                errorType: "applyMatter getHotels",
                errorMsg: t
            });
        });
    },
    _savemateriel: function() {
        if (this.data.isCanSubmitPhone && this.data.detailAddress && this.data.recipient && this.data.region[0] && this.data.hotelName && this.data.applyCount) {
            var t = this;
            wx.showModal({
                title: "",
                content: "提交信息后无法修改，请仔细核对，确定提交吗？",
                success: function(e) {
                    e.confirm ? t._tosavematerielapi() : e.cancel && console.log("cancel");
                }
            });
        } else wx.showToast({
            title: "请填写正确信息 ",
            icon: "none"
        });
    },
    _tosavematerielapi: function() {
        var t = this;
        wx.showLoading();
        var a = {
            applyCount: this.data.applyCount,
            city: this.data.region[1],
            province: this.data.region[0],
            district: this.data.region[2],
            contactPhone: this.data.mobile,
            detailAddress: this.data.detailAddress,
            hotelId: this.data.hotelId,
            hotelName: this.data.hotelName,
            recipient: this.data.recipient
        };
        e.default.saveMateriel(a).then(function(e) {
            var i = t;
            wx.showModal({
                title: "申请成功",
                content: "收到物料后请先扫码激活才可使用哦",
                showCancel: !1,
                confirmText: "知道了",
                success: function(t) {
                    t.confirm && (i.data.isSingleStore ? wx.navigateBack({
                        url: "/pages/wifi_v2/matAndWifi/applyMatterList/applyMatterList"
                    }) : wx.redirectTo({
                        url: "/pages/wifi_v2/matAndWifi/applyMatterList/applyMatterList"
                    }));
                }
            });
        }).catch(function(t) {
            if (console.log(t), 60012 == t.errorNo) {
                var e = encodeURIComponent("/pages/wifi_v2/wifiList/wifiList");
                wx.redirectTo({
                    url: "/pages/wifi_v2/matAndWifi/wifiLogin/index?nextPath=" + e
                });
            } else (0, i.setTjLog)({
                page: o,
                errorType: "applyMatter savemateriel",
                errorMsg: t
            });
        }).finally(function() {
            wx.hideLoading();
        });
    },
    _trim: function(t) {
        return t = t.replace(/ /g, "");
    }
});