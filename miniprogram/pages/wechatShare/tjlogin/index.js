function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var o = e(require("../../../apiFetch/wechatShareApi.js")), t = e(require("../util.js")),  n = getApp();

Page({
    data: {
        fromid: 0,
        gourl: "",
        openId: "",
        urlid: "",
        tjuserid: "",
        tjusertoken: "",
        PWA_STATIC_TUJIA_HOST: '',
        promotionCode: "pintuanCode",
        loginBtnText: "点击领取途家住宿红包"
    },
    onLoad: function(e) {
        var o = e.type, t = e.gourl, r = e.refresh, i = e.fromid, a = e.code, d = {
            gourl: t
        };
        "public" === o ? (d.loginBtnText = "微信一键登录", d.promotionCode = a || this.data.promotionCode) : (d.fromid = i, 
        d.promotionCode = 0 == i ? "pintuanCode" : 2 == i ? "dacuCode" : this.data.promotionCode), 
        this.setData(d), r && 1 == r && n.clearTjUserInfo(), this.checkLogin();
    },
    backurl: function() {
        wx.redirectTo({
            url: "/pages/wechatShareWebview/index?gourl=" + this.data.gourl + "&fromid=" + this.data.fromid
        });
    },
    formBtn: function(e) {
        console.log(e), t.default.formBtn(e);
    },
    checkLogin: function() {
        var e = this;
        return o.default.checkLogin().then(function(o) {
            return o.userId && (n.setTjUserInfo(o), e.setData({
                tjuserid: o.userId,
                tjusertoken: o.userToken
            })), e.setData({
                openId: o.openId
            }), Promise.resolve(o);
        }).catch(function(e) {
            return console.log(e), Promise.reject(e);
        });
    },
    getPhoneNumber: function(e) {
        var o = this;
        console.log(e), n.decryptPhoneNumber({
            detail: e.detail,
            userStatus: "1",
            openId: this.data.openId,
            globalCode: this.data.promotionCode
        }).then(function() {
            "getphonenumber" === e.type && e.detail.encryptedData && wx.redirectTo({
                url: "/pages/wechatShareWebview/index?gourl=" + o.data.gourl + "&fromid=" + o.data.fromid
            });
        }).catch(function(e) {
            console.log(e), wx.redirectTo({
                url: "/pages/user/login/login?nextPath=" + encodeURIComponent("/pages/wechatShareWebview/index?gourl=" + o.data.gourl) + "&fromid=" + o.data.fromid + "&openType=redirect&code=" + o.data.promotionCode
            });
        });
    }
});