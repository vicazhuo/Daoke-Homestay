Page({
    data: {
        orderNew: {},
        isShowChargeItem: !0
    },
    onLoad: function() {
        this.updateData();
    },
    updateData: function() {
        var t = getCurrentPages(), a = t[t.length - 2];
     
        this.setData({
            orderNew: a.data.orderNew
        });
    },
    isShowChargeDetail: function() {
        this.setData({
            isShowChargeItem: !this.data.isShowChargeItem
        });
    }
});