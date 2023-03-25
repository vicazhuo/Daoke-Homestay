var e = getApp();

Page({
    data: {
        sanitationScore: 0,
        trafficScore: 5,
        facilityScore: 5,
        environmentScore: 5,
        serviceScore: 0,
        content: "",
        meaning: [ "", "不满", "吐槽", "一般", "满意", "超赞" ],
        orderId: "",
        onlineManagerName: ""
    },
    onLoad: function(e) {
        var t = this;
        this.setData({
            orderId: e.id
        }, function() {
            t.getName();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    changeSanitationScore: function(e) {
        this.setData({
            sanitationScore: e.currentTarget.dataset.index
        }), wx.createSelectorQuery().select(".top").fields({
            size: !0
        }, function(e) {
            wx.pageScrollTo({
                scrollTop: e.height
            });
        }).exec();
    },
    changeTrafficScore: function(e) {
        this.setData({
            trafficScore: e.currentTarget.dataset.index
        });
    },
    changeFacilityScore: function(e) {
        this.setData({
            facilityScore: e.currentTarget.dataset.index
        });
    },
    changeEnvironmentScore: function(e) {
        this.setData({
            environmentScore: e.currentTarget.dataset.index
        });
    },
    changeServiceScore: function(e) {
        this.setData({
            serviceScore: e.currentTarget.dataset.index
        });
    },
    getName: function() {
        var t = this;
        e.ajax({
            url: "/comment/addInfo/" + t.data.orderId + "/data",
            data: {
                orderId: t.data.orderId
            }
        }).then(function(e) {
            1 == e.code ? t.setData({
                onlineManagerName: e.data.onlineManagerName
            }) : wx.showToast({
                title: e.message,
                icon: "none"
            });
        }).catch(function(e) {
            console.log(e, 999);
        });
    },
    formSubmit: function(t) {
        var a = t.detail.value.content;
        if (a) if (this.data.serviceScore) {
            var n = this;
            e.ajax({
                url: "/comment/submit/" + n.data.orderId + "/data",
                data: {
                    orderId: n.data.orderId,
                    sanitationScore: n.data.sanitationScore,
                    trafficScore: n.data.trafficScore,
                    facilityScore: n.data.facilityScore,
                    environmentScore: n.data.environmentScore,
                    serviceScore: n.data.serviceScore,
                    content: a
                }
            }).then(function(e) {
                1 == e.code ? (wx.setStorageSync("orderListPageRefresh", 1), wx.showToast({
                    title: "提交成功"
                }), wx.navigateBack({})) : wx.showToast({
                    title: e.message,
                    icon: "none"
                });
            }).catch(function(e) {
                console.log(e, 999);
            });
        } else wx.showToast({
            title: "请评价管家服务",
            icon: "none"
        }); else wx.showToast({
            title: "请输入入住体验",
            icon: "none"
        });
    }
});