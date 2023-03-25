var o = require("../../common/js/utils.js"), e = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ];

Page({
    data: {
        unitName: "",
        totalAmount: 0,
        dailyPrice: []
    },
    onLoad: function(a) {
        var n = decodeURIComponent(a.data);
        n = n ? JSON.parse(n) : {}, console.log("price detail:", n);
        for (var t = 0; t < n.dailyPrice.length; t++) {
            var i = n.dailyPrice[t], l = new Date(i.date), c = new Date("2017-11-29");
            console.log("date2:"), console.log(c), console.log("data.dailprice:"), console.log(n.dailyPrice[t]), 
            console.log("date"), console.log(l), i.weekday = e[l.getDay()], i.price = o.toDecimal(i.price, 2);
        }
        this.setData(n);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});