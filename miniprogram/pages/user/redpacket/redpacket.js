function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../apiFetch/userApi.js")), a = t(require("../../../apiFetch/tjFetch2"));
var couponApi = require("../../../apiFetch/couponApi.js");
Page({
    data: {
        loadingHidden: !1,
        navbar: [ "未使用", "已使用", "已失效" ],
        curIndex: 0,
        style: "style01",
        isFold: !1,
        currentTab: 0,
        isShowAll: !1,
        unusedlist: [],
        usedlist: [],
        invalidlist: [],
        bgColor: "",
        code: "",
        amount: 0,
        currency: "¥",
        showExpire: !1,
        expir: "即将到期",
        showLimitRules: !0,
        rules: "看看谁的风景，水淀粉水淀粉。。。看看谁的风景，水淀粉水淀粉",
        getlist01: 0,
        getlist02: 0,
        getlist03: 0,
        validPeriod: "",
        endDate: "",
        beginDate: "",
        content: "",
        title: "老用户专享",
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
    },
    onLoad: function(t) {
        this._checkRuleLength(), this._getRedpacketDataList();
    },
    goindex: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    showAll: function(t) {
        var e = this.data.curIndex, a = t.currentTarget.dataset.index;
        this.setData({
            curIndex: a
        }), this.data.isShowAll ? this.data.curIndex != e ? this.setData({
            isShowAll: !0
        }) : this.setData({
            isShowAll: !1
        }) : this.setData({
            isShowAll: !0
        });
    },
    navbarTap: function(t) {
        var e = this;
        e.setData({
            currentTab: t.currentTarget.dataset.idx,
            TypeItem: e.data.navbar[e.data.currentTab]
        }), 0 === this.data.currentTab && (this.setData({
            style: "style01"
        }), this.data.showExpire && this.setData({
            style: "style02"
        })), 1 !== this.data.currentTab && 2 !== this.data.currentTab || this.setData({
            style: "style03"
        });
    },
    _getRedpacketDataList: function() {
        var t = this;
        console.log("红包列表"), this.setData({
            loadingHidden: !0
        }), couponApi.getredpacketlist().then(function(e) {
            e = e.data;
          console.log(e)
            t.setData({
                unusedlist: e.unusedlist
            }), t.setData({
                usedlist: e.usedlist
            }), t.setData({
                invalidlist: e.invalidlist
            }), 0 == e.unusedlist.length && t.setData({
                getlist01: 1
            }), 0 == e.usedlist.length && t.setData({
                getlist02: 1
            }), 0 == e.invalidlist.length && t.setData({
                getlist03: 1
            });
            console.log(this.data)
        }).catch(function() {}).finally(function() {
            t.setData({
                loadingHidden: !1
            });
        });
    },
    _getLen: function(t) {
        return null == t ? 0 : ("string" != typeof t && (t += ""), t.replace(/[^\x00-\xff]/g, "01").length);
    },
    _checkRuleLength: function() {
        this._getLen(this.data.rules) > 49 && this.setData({
            isFold: !0
        });
    }
});