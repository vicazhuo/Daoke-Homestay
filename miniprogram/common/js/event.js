function r(r, n) {
    var e = t[r];
    Array.isArray(e) && (t[r] = n ? e.filter(function(r) {
        return r[0] !== n;
    }) : []);
}

var t = {};

exports.on = function(r, n, e) {
    var o = [ n, e ], i = t[r];
    Array.isArray(i) ? i.push(o) : t[r] = [ o ];
}, exports.get = function(r) {
    return t[r];
}, exports.remove = r, exports.emit = function(r, n) {
    var e = t[r];
    Array.isArray(e) && e.forEach(function(r) {
        r[0].call(r[1] || null, n);
    });
}, exports.isEventExisted = function(r) {
    var n = t[r];
    return Array.isArray(n) && n.length > 0;
}, exports.clear = function(n, e) {
    e ? r(e, n) : Object.keys(t).forEach(function(t) {
        r(t, n);
    });
}, exports.clearAll = function() {
    t = {};
};