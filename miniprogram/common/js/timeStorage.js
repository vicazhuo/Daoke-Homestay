function e(e, t) {
    if (void 0 !== e.timeStorageTime) {
        var n = +new Date();
        return e.timeStorageTime - n > 0 ? e.value : (r.remove(t), null);
    }
    return e;
}

function t(e) {
    var t = +new Date() + 1e3 * e[2];
    n.setStorage({
        key: e[0],
        data: {
            value: e[1],
            timeStorageTime: t
        }
    });
}

var n = wx, r = {
    get: function(t) {
        return new Promise(function(r, a) {
            if (!t) return a("no arguments name");
            n.getStorage({
                key: t,
                success: function(n) {
                    null === n.data && a(null);
                    var o = e(n.data, t);
                    null === o ? a(null) : r(o);
                },
                fail: function(e) {
                    a(null);
                }
            });
        });
    },
    set: function(e, r, a) {
        if (!e) throw "no argument name";
        if (!r) throw "no arguments value";
        if (a) return t(arguments);
        n.setStorage({
            key: e,
            data: r
        });
    },
    remove: function(e) {
        n.removeStorage({
            key: e
        });
    },
    clear: function() {
        n.clearStorage();
    }
};

module.exports = r;