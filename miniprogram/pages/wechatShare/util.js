var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../apiFetch/wechatShareApi.js")), o = {};

o.formBtn = function(o) {
    var r = o.detail.formId;
    console.log("formId:", r);
    var t = getApp();
    try {
        var n = t.globalUserInfo.tjUserInfo.openId;
        if (!r || "the formId is a mock one" === r || !n) return;
        e.default.setFormId(n, r);
    } catch (e) {
        console.log(e);
    }
}, module.exports = o;