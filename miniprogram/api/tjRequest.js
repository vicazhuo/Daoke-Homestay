function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    r.default.call(this);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("./request.js"));

(t.prototype = Object.create(r.default.prototype)).constructor = t, t.prototype.callbackHandle = function(e, t, r, o) {
    e ? t.ret ? o && o(!0, t.data) : o && o(!1, null, {
        errorNo: t.errcode,
        errorMsg: t.errmsg
    }) : o && o(e, null, r);
}, exports.default = r.default;