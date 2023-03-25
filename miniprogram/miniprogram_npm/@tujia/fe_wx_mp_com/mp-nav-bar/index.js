var t = require("../../../../common/js/utils"), e = [ "pages/index/index", "pages/user/orderList/orderList", "pages/user/index/index", "" ], a = 0, n = t.systemInfo.statusBarHeight, i = t.systemInfo.isCanUseNavBar;

Component({
    properties: {
        enable: {
            type: Boolean,
            value: "true"
        },
        bgStyle: {
            type: String,
            value: "background-color:#fff;"
        },
        titleStyle: {
            type: String,
            value: "color: black;"
        },
        title: {
            type: String,
            value: "微信",
            observer: "_changeTitle"
        },
        delta: {
            type: Number,
            value: 1
        },
        showLoading: {
            type: Boolean,
            value: !1
        },
        textStyle: {
            type: String,
            value: "black",
            observer: "_changeTextStyle"
        }
    },
    data: {
        barHeight: n,
        navIconUrl: "./images/nav_icon_black.png",
        navTitleStyle: "color: black;",
        navBgStyle: "background-color:#fff;",
        isShowBackBtn: !1,
        isCanUseNavBar: i,
        isAndroid: "android" === t.systemInfo.platform
    },
    ready: function() {
        this._setIsShowBackBtn(), this.getElementHeight();
    },
    methods: {
        _changeTitle: function() {
            "" === this.data.title && this.setData({
                title: "微信"
            });
        },
        _changeTextStyle: function() {
            "black" === this.data.textStyle ? (wx.setNavigationBarColor({
                frontColor: "#000000"
            }), this.setData({
                navIconUrl: "./images/nav_icon_black.png",
                navTitleStyle: "color: black;",
                navBgStyle: "background-color:#fff;"
            })) : (wx.setNavigationBarColor({
                frontColor: "#ffffff"
            }), this.setData({
                navIconUrl: "./images/nav_icon_white.png",
                navTitleStyle: "color: white;",
                navBgStyle: "background-color:#000;"
            }));
        },
        _onTap: function() {
            this.triggerEvent("back", {}), this.data.enable && (this.data.isShowBackBtn ? wx.navigateBack({
                delta: this.data.delta
            }) : wx.switchTab({
                url: "/pages/index/index"
            }));
        },
        _setIsShowBackBtn: function() {
            var t = getCurrentPages(), a = t[t.length - 1];
            !e.find(function(t) {
                return t === a.route;
            }) && t.length > 1 && this.setData({
                isShowBackBtn: !0
            });
        },
        getElementHeight: function() {
            var e = this;
            return i ? a ? this.triggerEvent("getNavHeight", a) : void wx.createSelectorQuery().in(this).select("#nav").boundingClientRect().exec(function(n) {
                var i = n[0];
                a = i.height, (0, t.setNavHeight)(a), e.triggerEvent("getNavHeight", i.height);
            }) : this.triggerEvent("getNavHeight", 0);
        }
    }
});