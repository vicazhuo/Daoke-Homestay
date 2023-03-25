Page({
    data: {
        orderNew: {},
        isCancelrule: !1
    },
    onLoad: function() {
        this.updateData();
    },
    updateData: function() {
        var a = getCurrentPages(), e = a[a.length - 2];
        this.setData({
            orderNew: e.data.orderNew
        });
    }
});