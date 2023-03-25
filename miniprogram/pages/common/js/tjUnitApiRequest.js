function e() {
    if (!o) {
        var e = getApp().globalConfig;
        r = e.WechatPortalUri, o = {
            unitList: r + e.UnitList,
            unitComments: r + e.UnitComments,
            unitServiceHotline: r + e.UnitServiceHotline,
            unit: r + e.Unit,
            unitCalendar: r + e.UnitCalendar,
            unitProductInventory: r + e.UnitProductInventory,
            unitSaleProduct: r + e.UnitSaleProduct
        };
    }
    return o;
}

function t(e, t, o) {
    var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "POST";
    console.log("request URL=" + e + " params="), console.log(t), i.tjRequest({
        url: e,
        data: t,
        method: a,
        success: function(e) {
            e.data.isSuccess ? o(!0, e.data) : n(e.data.errorCode, e.data.errorMessage, e.data, o, r), 
            console.log("request result="), console.log(e.data);
        },
        fail: function() {
            n(-1e3, "", null, o, r);
        }
    });
}

function n(e, t, n, i) {
    var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
    t = "囧rz....数据无法加载，请检查网络是否正常，或者退出小程序后再重新进入~", console.log("error code=" + e + " errorMessage=" + t), 
    o ? wx.showModal({
        title: "提示",
        content: t,
        showCancel: !1,
        success: function(n) {
            i(!1, {
                errorCode: e,
                errorMessage: t
            });
        }
    }) : i(!1, n);
}

var i = require("../../../common/js/tjRequest.js"), o = void 0, r = "";

module.exports = {
    getUnit: function(n, i, o, r) {
        var a = {
            unitId: n,
            checkInDate: i,
            checkOutDate: o
        };
        t(e().unit, {
            parameter: a
        }, r, !0);
    },
    getUnitList: function(n, i, o, r) {
        var a = {
            pageIndex: o,
            pageSize: 20,
            conditions: n,
            returnAllConditions: i
        };
        t(e().unitList, {
            parameter: a
        }, r, !0);
    },
    getUnitComments: function(n, i, o, r) {
        var a = {
            pageIndex: o,
            pageSize: 20,
            unitId: n,
            hasPicture: i
        };
        t(e().unitComments, {
            parameter: a
        }, r, !0);
    },
    getServiceHotline: function(n, i, o) {
        var data={
          "realTimeServiceHotlinePattern": i,
          "customerPhoneNumber": n.phone,
          "hotelPhonePaySuccess":n.hotelPhonePaySuccess
        }
      console.log(data,o)
      t(e().unitServiceHotline, data, o, !1, "post");
    },
    getUnitCalendar: function(n, i, o, r, a) {
        var u = void 0, c = "";
        i ? (u = {
            unitId: n,
            productId: i,
            productPackageId: o,
            beginDate: r,
            isLoadPrice: !0
        }, c = e().unitProductInventory) : (u = {
            unitId: n
        }, c = e().unitCalendar), t(c, {
            parameter: u
        }, a);
    },
    getUnitSaleProduct: function(n, i, o, r) {
        var a = {
            unitId: n,
            checkInDate: i,
            checkOutDate: o
        };
        t(e().unitSaleProduct, {
            parameter: a
        }, r, !0);
    }
};