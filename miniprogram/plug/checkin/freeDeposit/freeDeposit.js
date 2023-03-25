Page({
    data: {
        orderId: "",
        depositAmount: ""
    },
    onLoad: function(d) {
        this.setData({
            orderId: d.orderId,
            depositAmount: d.depositAmount
        });
    },
    goGetPwd: function() {
        wx.redirectTo({
            url: "/pages/checkin/getPwd/getPwd?orderId=" + this.data.orderId + "&look=&isTemp="
        });
    }
});