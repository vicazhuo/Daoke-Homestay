var e = require("../rangeSlider/rangeSlider.js"), t = "distanceRangeSlider";

module.exports = {
    init: function(n, i, a, r, d, s) {
        var g = {};
        g[t + "LeftIndex"] = a, g[t + "Text"] = d, g[t + "RightIndex"] = r, g[t + "TextDatas"] = i, 
        n.setData(g), e.init(n, i.length, a, r, 100, function(e, i) {
            var a = {};
            a[t + "LeftIndex"] = e, a[t + "RightIndex"] = i, n.setData(a), console.log("distanceRangeSlider"), 
            s(e, i);
        }, !0, t);
    }
};