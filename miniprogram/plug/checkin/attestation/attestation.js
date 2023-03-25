var e = getApp();

Page({
    data: {
        code: "",
        failNum: 1,
        isCheckinAuth: !1,
        sex: 1,
        butlerInfo: null,
        orderId: "",
        idCard: "",
        name: "",
        isTemp: !1,
        isTempNum: 0,
        sendObj: null
    },
    onLoad: function(e) {
        var t = this, n = 1 == e.isTemp, o = 1 == e.isCheckinAuth, i = this.getSex(e.idCard);
        this.setData({
            orderId: e.orderId,
            idCard: e.idCard,
            code: e.code,
            name: e.name,
            isTempNum: e.isTemp,
            isTemp: n,
            isCheckinAuth: o,
            sex: i
        }, function() {
            a.getContactButler(t), a.getSweepFaceNum(t, t.data.idCard, t.data.name, 1);
        });
    },
    onReady: function() {},
    onShow: function() {
        a.sweepFaceCallback(this, 1);
    },
    onHide: function() {
        wx.removeStorageSync("extraData");
    },
    onUnload: function() {
        wx.removeStorageSync("extraData");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getSex: function(e) {
        var a = e.toString();
        return 18 == a.length ? a.charAt(16) % 2 == 0 ? 2 : 1 : a.charAt(14) % 2 == 0 ? 2 : 1;
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
    initData: function() {},
    goGetPwd: function() {
        var e = this.data.isTemp ? 1 : "";
        wx.redirectTo({
            url: "/pages/checkin/getPwd/getPwd?orderId=" + this.data.orderId + "&look=&isTemp=" + e
        });
    },
    userContacts: function(a) {
        return new Promise(function(t, n) {
            e.ajax({
                url: "/miniprogram/face/userContacts",
                data: {
                    pageNo: "1",
                    pageSize: "10",
                    orderId: a
                }
            }).then(function(e) {
                if (1 == e.code) {
                    var a = !!e.data;
                    t(a);
                }
            });
        });
    },
    goPerson: function() {
        wx.navigateBack({});
    },
    retry: function() {
        a.getSweepFaceNum(this, this.data.idCard, this.data.name);
    },
    goUploadCard: function() {
        wx.redirectTo({
            url: "/pages/checkin/uploadCard/uploadCard?orderId=" + this.data.orderId + "&isTemp=" + this.data.isTempNum
        });
    }
});