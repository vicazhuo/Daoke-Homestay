var a = getApp();
Page({
    data: {
        orderId: "",
        pageNo: 1,
        pageSize: 10,
        totalPage: 1,
        busy: !1,
        list: [
          { name: 卓尉家, idCard: '44142***********3030', userContactsId:1}
        ],
        selUserContactsId: "",
        name: "",
        idCard: "",
        popIsShow: !1,
        failNum: 0,
        sweepFaceNum: 0,
        sweepFaceCodeIsShow: !1,
        isOk: !1,
        sendObj: null,
        butlerInfo: null,
        isTemp: !1,
        isTempNum: 0
    },
    onLoad: function(a) {
        var t = this, o = 1 == a.isTemp;
        a.orderId && this.setData({
            orderId: a.orderId,
            isTempNum: a.isTemp,
            isTemp: o
        }, function() {
            e.getContactButler(t);
        });
    },
    onReady: function() {},
    onShow: function() {
        e.sweepFaceCallback(this);
    },
    onHide: function() {
        wx.removeStorageSync("extraData");
    },
    onUnload: function() {
        wx.removeStorageSync("extraData");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.pageNo > this.data.totalPage ? this.setData({
            busy: !0
        }) : this.data.busy || this.getData();
    },
    getData: function() {
        var e = this, t = this;
        t.setData({
            busy: !0
        }), wx.showLoading({
            title: "加载中"
        }), a.ajax({
            url: "/miniprogram/face/userContacts",
            data: {
                orderId: t.data.orderId,
                pageNo: t.data.pageNo,
                pageSize: t.data.pageSize
            }
        }).then(function(a) {
            if (wx.stopPullDownRefresh(), console.log(a, 888), 1 == a.code) if (a.data) {
                if (a.data.total) {
                    var o = t.data.list.slice(0);
                    o = o.concat(a.data.listData), e.setData({
                        totalPage: Math.ceil(Number(a.data.total) / Number(t.data.pageSize)),
                        list: o,
                        pageNo: ++t.data.pageNo,
                        busy: !1
                    });
                }
            } else console.log("无数据"); else wx.showToast({
                title: a.message,
                icon: "none"
            });
            wx.hideLoading();
        }).catch(function(a) {
            console.log(a, 999);
        });
    },
    selUser: function(a) {
        var e = this, t = a.currentTarget.dataset.useid;
        t != this.data.selUserContactsId && this.setData({
            selUserContactsId: t
        }, function() {
            e.getUserInfo();
        });
    },
    getUserInfo: function() {
        var a = this, t = this.data.selUserContactsId;
        t && this.data.list.forEach(function(o) {
            o.userContactsId == t && a.setData({
                name: o.name,
                idCard: o.idCard
            }, function() {
                e.getSweepFaceNum(a, o.idCard, o.name);
            });
        });
    },
    callServer: function() {
        wx.makePhoneCall({
            phoneNumber: "400-606-6767"
        });
    },
    callButler: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.butlerInfo.mobile
        });
    },
    closePop: function() {
        this.setData({
            popIsShow: !1
        });
    },
    goPersonDetail: function() {
        wx.redirectTo({
            url: "/pages/checkin/personDetail/personDetail?orderId=" + this.data.orderId + "&isTemp=" + this.data.isTempNum
        });
    },
    goUploadCard: function() {
        wx.redirectTo({
            url: "/pages/checkin/uploadCard/uploadCard?orderId=" + this.data.orderId + "&isTemp=" + this.data.isTempNum
        });
    },
    initData: function() {
        var a = this;
        this.setData({
            pageNo: 1,
            totalPage: 1,
            busy: !1,
            list: [],
            selUserContactsId: "",
            name: "",
            idCard: "",
            popIsShow: !1,
            failNum: 0,
            sweepFaceNum: 0,
            sweepFaceCodeIsShow: !1,
            isOk: !1,
            sendObj: null
        }, function() {
            a.getData();
        });
    }
});