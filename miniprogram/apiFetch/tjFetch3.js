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
        var r = getApp(), t = r.globalUserInfo.tjUserInfo || {}, o = t.userToken || "", s = {
            userId: t.userId || "",
            userToken: o,
            openId: t.openId || "",
            appVersion: r.getAppVersion,
            storeGuid: wx.getStorageSync("storeGuid")
        };
        e.data && (e.params = e.data), e.headers = s;
    },
    resHandle: function(e, r) {
        e.isSuccess ? r.resolve(e.content) : r.reject({
            errorNo: e.errorCode,
            errorMsg: e.errorMessage
        });
    }
});