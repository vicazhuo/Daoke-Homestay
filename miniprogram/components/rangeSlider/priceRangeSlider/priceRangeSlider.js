var e = require("../rangeSlider/rangeSlider.js"), n = "priceRangeSlider";

module.exports = {
    init: function(t, r, i, o, a, s) {
        function d(e, r) {
            var i = {};
            i[n + "LeftIndex"] = e, i[n + "RightIndex"] = r, t.setData(i);
        }
        var l = {};
        return l[n + "LeftIndex"] = i, l[n + "RightIndex"] = o, l[n + "TextDatas"] = r, 
        l[n + "Text"] = a, t.setData(l), e.init(t, r.length, i, o, 100, function(e, n) {
            d(e, n), console.log("priceRangeSlider"), s(e, n);
        }, !1, n), function(e, r) {
            console.log("reset rice range slider=" + e + " rIndex=" + r), console.log(t[n + "_resetIndex"]), 
            t[n + "_resetIndex"](e, r), d(e, r);
        };
    }
};