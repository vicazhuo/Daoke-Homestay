var t = {
    showToast: function(t) {
        try {
            t.title;
            var o = t.duration || 2e3, e = t.position || "middle", s = getCurrentPages(), a = s[s.length - 1];
            a.setData({
                toastTitle: t.title,
                showToast: !0,
                position: e
            }), clearTimeout(a.data.timer);
            var i = setTimeout(function() {
                a.setData({
                    showToast: !1
                });
            }, o);
            a.setData({
                timer: i
            }), "function" == typeof t.success && t.success();
        } catch (o) {
            console.log("tjToast.showToast catch ex:"), console.log(o), a.setData({
                showToast: !1
            }), "function" == typeof t.fail && t.fail();
        }
        "function" == typeof t.complete && t.complete();
    },
    hideToast: function() {
        var t = getCurrentPages();
        t[t.length - 1].setData({
            showToast: !1
        });
    }
};

module.exports = t;