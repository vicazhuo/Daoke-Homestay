var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../apiFetch/helpRedbagApi"));

Component({
    properties: {
        activityId: {
            type: String,
            observer: function(e) {
                console.log(e), e && this.getHelpPersons(e);
            }
        },
        isAll: {
            type: Boolean,
            value: !1
        },
        isFirst: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        helpFriendList: [],
        showHelperNum: 5,
        helpNum: 0,
        avatarUrl: "https://staticfile.tujia.com/WechatApp/images/default_user.png",
        listLoading: !1,
        PWA_STATIC_TUJIA_HOST: ''
    },
    methods: {
        getHelpPersons: function(e) {
            var t = this;
            e = e || this.data.activityId, this.setData({
                listLoading: !0
            }), this.data.isFirst ? setTimeout(function() {
                t.requsetData(e);
            }, 2e3) : this.requsetData(e);
        },
        requsetData: function(t) {
            var i = this;
            e.default.queryPowerHelpers(t).then(function(e) {
                i.setData({
                    helpFriendList: i.data.isAll || e.helpers.length < 6 ? e.helpers : e.helpers.slice(0, 6),
                    helpNum: e.helpers.length
                });
            }).finally(function() {
                i.setData({
                    listLoading: !1
                });
            });
        },
        seeAllHelp: function() {
            wx.navigateTo({
                url: "/pages/helpRedBag/moreHelper/index?orderno=" + this.data.activityId
            });
        }
    }
});