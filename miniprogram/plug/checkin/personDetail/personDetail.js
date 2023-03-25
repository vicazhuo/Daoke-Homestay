getApp();

Page({
    data: {
        nameValue: "",
        idCardValue: "",
        orderId: "",
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
        var t = this, n = 1 == a.isTemp;
        a.orderId && this.setData({
            orderId: a.orderId,
            isTempNum: a.isTemp,
            isTemp: n
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
    onReachBottom: function() {},
    nameInputEvent: function(e) {
        var a = e.detail.value;
        this.setData({
            name: a,
            isOk: !1
        }, this.checkInfo);
    },
    idCardInputEvent: function(e) {
        var a = e.detail.value;
        this.setData({
            idCard: a,
            isOk: !1
        }, this.checkInfo);
    },
    checkInfo: function() {
        var a = this.data.name, t = this.data.idCard;
        return !(!a || !t) && (!!/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(t) && (console.log(222), 
        void e.getSweepFaceNum(this, t, a)));
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
    goUploadCard: function() {
        wx.redirectTo({
            url: "/pages/checkin/uploadCard/uploadCard?orderId=" + this.data.orderId + "&isTemp=" + this.data.isTempNum
        });
    },
    initData: function() {
        this.setData({
            nameValue: "",
            idCardValue: "",
            name: "",
            idCard: "",
            popIsShow: !1,
            failNum: 0,
            sweepFaceNum: 0,
            sweepFaceCodeIsShow: !1,
            isOk: !1,
            sendObj: null
        });
    }
});