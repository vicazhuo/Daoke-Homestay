Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = !1, t = !1;

try {
    wx && (e = !0, t = !1), my && (t = !0, e = !1);
} catch (e) {}

exports.default = {
    isWxApp: e,
    isAliApp: t
};