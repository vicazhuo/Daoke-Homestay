Page({
    data: {
        webUrl: "",
        tjuserid: "",
        tjusertoken: ""
    },
    onLoad: function(e) {
        var o = getApp(), t = o.globalUserInfo.tjUserInfo.userId, s = o.globalUserInfo.tjUserInfo.userToken, n = decodeURIComponent(e.webUrl);
        console.log(e.webUrl, "options.webUrl"), n.includes("tjusertoken") || (n = n + (n.includes("?") ? "&" : "?") + "tjuserid=" + t + "&tjusertoken=" + s + "&tjudid=" + s), 
        console.log(decodeURIComponent(n)), this.setData({
            tjuserid: t,
            tjusertoken: s,
            webUrl: n
        });
    }
});