function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/js/utils.js")), a = e(require("../../apiFetch/searchApi"));

Page({
    data: {
        isNoHouseList: !1,
        isHouseLoadError: !1,
        isShowTopScreen: !1,
        houseList: [],
        date: {
            beginDate: "",
            endDate: ""
        },
        params: {
            landlord: "",
            formType: "",
            beginDate: "",
            endDate: "",
            destName: "",
            destId: "",
            houseIds: []
        }
    },
    onLoad: function(e) {
        var t = this;
        if (e.shareparams) {
            var a = decodeURIComponent(e.shareparams);
            a = a.split("_"), this.setData({
                "date.beginDate": a[2],
                "date.endDate": a[3],
                "params.landlord": a[0],
                "params.formType": a[1] || 3,
                "params.beginDate": a[2],
                "params.endDate": a[3],
                "params.destName": a[4],
                "params.destId": a[5],
                "params.houseIds": a[6].split("-")
            }), setTimeout(function() {
                wx.setNavigationBarTitle({
                    title: t.data.params.destName
                });
            }, 0);
        } else wx.showToast({
            title: "活动参数错误,请退出重试",
            icon: "none"
        });
    },
    onShow: function() {
        wx.setStorage({
            key: "FROM_TYPE",
            data: this.data.params.formType
        }), wx.setStorage({
            key: "FROM_TYPE_SHARE_HOUSE_landlordId",
            data: this.data.params.landlord
        }), this.getHouseList(this.data.params.houseIds), this.ifTimeExceeding(this.data.date);
    },
    getHouseList: function(e) {
        var t = this;
        a.default.searchhousebyhouseidlist({
            houseIdList: e
        }).then(function(e) {
            e.totalCount > 0 && e.items.length > 0 ? t.setData({
                houseList: e.items
            }) : t.setData({
                isNoHouseList: !0
            });
        }).catch(function(e) {
            t.setData({
                isHouseLoadError: !0
            });
        });
    },
    ifTimeExceeding: function(e) {
        var a = new Date(e.beginDate).getTime(), s = new Date(e.endDate).getTime(), i = new Date().getTime();
        if (s < i) this.setData({
            isShowTopScreen: !0
        }); else if (a < i) {
            var o = t.default.dateFormat(new Date(), "yyyy-MM-dd");
            this.setData({
                "date.beginDate": o,
                "params.beginDate": o
            });
        }
    },
    goAllHouseList: function(e) {
        var t = e.currentTarget.dataset.type, a = this.data.params, s = "/pages/units/units?isSearch=1&destName=" + a.destName + "&destId=" + a.destId;
        "1" === t && (s += "&beginDate=" + a.beginDate + "&endDate=" + a.endDate), wx.navigateTo({
            url: s
        });
    }
});