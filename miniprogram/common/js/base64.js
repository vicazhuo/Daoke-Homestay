function r() {
    this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
}

r.prototype.encode = function(r) {
    var t, e, o, h, n, a, i, d = "", C = 0;
    for (r = this._utf8_encode(r); C < r.length; ) h = (t = r.charCodeAt(C++)) >> 2, 
    n = (3 & t) << 4 | (e = r.charCodeAt(C++)) >> 4, a = (15 & e) << 2 | (o = r.charCodeAt(C++)) >> 6, 
    i = 63 & o, isNaN(e) ? a = i = 64 : isNaN(o) && (i = 64), d = d + this._keyStr.charAt(h) + this._keyStr.charAt(n) + this._keyStr.charAt(a) + this._keyStr.charAt(i);
    return d;
}, r.prototype.decode = function(r) {
    var t, e, o, h, n, a, i = "", d = 0;
    for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); d < r.length; ) t = this._keyStr.indexOf(r.charAt(d++)) << 2 | (h = this._keyStr.indexOf(r.charAt(d++))) >> 4, 
    e = (15 & h) << 4 | (n = this._keyStr.indexOf(r.charAt(d++))) >> 2, o = (3 & n) << 6 | (a = this._keyStr.indexOf(r.charAt(d++))), 
    i += String.fromCharCode(t), 64 != n && (i += String.fromCharCode(e)), 64 != a && (i += String.fromCharCode(o));
    return i = this._utf8_decode(i);
}, r.prototype._utf8_encode = function(r) {
    r = r.replace(/\r\n/g, "\n");
    for (var t = "", e = 0; e < r.length; e++) {
        var o = r.charCodeAt(e);
        o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), 
        t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), 
        t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128));
    }
    return t;
}, r.prototype._utf8_decode = function(r) {
    for (var t = "", e = 0, o = 0, h = 0, n = 0; e < r.length; ) (o = r.charCodeAt(e)) < 128 ? (t += String.fromCharCode(o), 
    e++) : o > 191 && o < 224 ? (h = r.charCodeAt(e + 1), t += String.fromCharCode((31 & o) << 6 | 63 & h), 
    e += 2) : (h = r.charCodeAt(e + 1), n = r.charCodeAt(e + 2), t += String.fromCharCode((15 & o) << 12 | (63 & h) << 6 | 63 & n), 
    e += 3);
    return t;
}, module.exports = r;