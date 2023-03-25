var e = getApp();

Component({
    properties: {
        isShow: {
            type: Boolean,
            value: !1
        },
        title: {
            type: String,
            value: "登录成功"
        },
        text: {
            type: String,
          value: "为了给你提供更好的服务，"+e.globalData.globalName+"申请获取你的公开信息\n（微信头像、昵称等）"
        }
    },
    data: {},
    methods: {
        _getUserInfo: function(t) {
            var n = t.detail.userInfo;
            n ? (e.globalUserInfo.wxUserInfo = n, wx.setStorage({
                key: "wxUserInfo",
                data: n
            }), this.triggerEvent("successEvent", n)) : this.triggerEvent("failEvent"), this._close();
        },
        _close: function() {
            this.triggerEvent("closeEvent");
        }
    }
});