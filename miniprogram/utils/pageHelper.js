module.exports = {
    getCurrentPageUrl: function() {
        var r = getCurrentPages();
        return "/" + r[r.length - 1].route;
    },
    getCurrentPageUrlWithArgs: function() {
        var r = getCurrentPages(), t = r[r.length - 1], e = t.route, n = t.options, g = e + "?";
        for (var u in n) g += u + "=" + n[u] + "&";
        return g = "/" + g.substring(0, g.length - 1);
    }
};