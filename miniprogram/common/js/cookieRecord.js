function e(e) {
    if (e) {
        var t = e.split("?");
        if (!(t.length > 2)) {
            for (var o = t[t.length - 1], i = /([^=&\s]+)[=\s]*([^&\s]*)/g, n = {}; i.exec(o); ) n[RegExp.$1] = RegExp.$2;
            return n;
        }
    }
}

function t(e) {
    if (e) {
        var t = e.split("__");
        if (t.length) {
            for (var o = {}, i = 0; i < t.length; i++) {
                var n = t[i].split("_");
                o[n[0]] = n[1];
            }
            return o;
        }
    }
}

var o = {};

module.exports = {
    initTjCookieRecord: function(e) {
        var t = e.scene, i = e.path, n = e.code;
        o = {
            tujia_out_site_referrerUrl: "",
            tujia_out_site_landingUrl: i,
            tujia_utm: "",
            tujia_code: n,
            tujia_code_site: "WeChatSmallApp",
            tujia_mpScene: t
        }, console.log("cookieRecord-initTjCookieRecord", o);
    },
    setTjCodeSite: function(e) {
        e && (1 !== getCurrentPages().length && (o.tujia_code_site = e), console.log("cookieRecord-setTjWebViewCode", o));
    },
    getQrScene: function(e) {
        return e ? t(decodeURIComponent(e)) : "";
    },
    getH5UrlCode: function(t) {
        var o = e(decodeURIComponent(t));
        return o && o.code ? o.code : "";
    },
    getCookieRecord: function() {
        return o;
    }
};