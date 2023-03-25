function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../utils/fetch.js"));

exports.default = new r.default({
    reqHandle: function(e) {
        e.data;
        var r = getApp().globalUserInfo.tjUserInfo || {}, t = r.userToken || "", a = {
            userId: r.userId || "",
            userToken: t,
            openId: r.openId || "",
            appVersion: "1.16"
        };
        e.data && (e.params = e.data), e.headers = a;
    },
    resHandle: function(e, r) {
        e.isSuccess ? r.resolve(e.data) : r.reject({
            errorNo: e.errorCode,
            errorMsg: e.errorMessage,
            data: e.data
        });
    }
});