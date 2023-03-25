!function(e) {
    e && e.__esModule;
}(require("../../apiFetch/wechatShareApi.js"));

var t = getApp();

Page({
    data: {
        tjuserid: "",
        tjusertoken: "",
        openType: 0,
        activeid: "",
        weburl: "",
        fromid: ""
    },
    onLoad: function(a) {
        var i = t.globalUserInfo.tjUserInfo.userId, r = t.globalUserInfo.tjUserInfo.userToken;
        if (this.setData({
            tjuserid: i,
            tjusertoken: r
        }), console.log(this.data.tjuserid), t.initWxUserInfo(), a.gourl) {
            var s = decodeURIComponent(a.gourl);
            console.log("origin assigned url ", s);
            var n = -1 == (s = this._cleanupUserIdAndToken(s)).indexOf("?") ? "?" : "&";
            this.setData({
                weburl: s + n + "tjuserid=" + this.data.tjuserid + "&tjusertoken=" + this.data.tjusertoken
            }), console.log(this.data.weburl), console.log("after cleanup, h5url=", s, "; and renderurl=", this.data.weburl), 
            this.setData({
                fromid: a.fromid
            });
        } else if (a.scene) {
            var o = decodeURIComponent(a.scene);
            (o = o.split("_")).length > 1 ? this.setData({
                activeid: o[0],
                fromid: o[1],
                weburl:"/h5/appw/gatheractivity/detail?fromid=0&activeid=" + o[0]
            }) : 1 == o.length && (10 == o[0] ? this.setData({
                weburl:"/h5/appw/gatheractivity/index?fromid=0"
            }) : 11 == o[0] && this.setData({
                weburl: "/h5/promotion/dacu/1809/index?fromid=2"
            }));
        }
    },
    _cleanupUserIdAndToken: function(e) {
        var t = -1;
        if (-1 != (t = e.indexOf("?")) && t < e.length - 1) {
            var a = e.substring(t + 1).split("&").filter(function(e) {
                return 0 != e.indexOf("tjuserid") && 0 != e.indexOf("tjusertoken");
            });
            e = e.substring(0, t), a.length > 0 && (e += "?" + a.join("&"));
        }
        return e;
    },
    onShareAppMessage: function(t) {
        var a = this._cleanupUserIdAndToken(this.data.weburl) + "&activeid=" + this.data.activeid;
        console.log("before share, shareurl ", a);
        var i = "", r = "", s = void 0;
        if (0 == this.data.fromid) {
            r = "/pages/wechatShareWebview/index?fromid=0&gourl=" + a;
            var n = new Date().getTime(), o = new Date(2018, 10, 28, 0, 0, 0).getTime(), d = new Date(2018, 11, 6, 0, 0, 0).getTime(), l = new Date(2018, 11, 11, 23, 59, 59).getTime();
            o < n && n < d ? (i = "全靠你了！一起躺赢途家住宿红包～", s ="/static/wechat/gather/friendBg-yr.jpg") : n < l && n > d ? (i = "全靠你了！一起躺赢途家住宿红包～", 
            s = "/static/wechat/gather/friendBg.jpg") : (i = "就差你了\n一起拼团躺赢途家住宿红包", 
            s = "/static/wechat/gather/icon_share.png");
        } else 2 == this.data.fromid && (i = "【1折起睡全球】秋日奇遇记 住进不可思议", r = "/pages/wechatShareWebview/index?fromid=2&gourl=" + this.data.gourl, 
        s = "/static/images/h5/pages/page-dacu1809/share-miniprogram.jpg");
        return console.log(i), {
            title: i,
            path: r,
            imageUrl: s
        };
    }
});