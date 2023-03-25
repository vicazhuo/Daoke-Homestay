Page({
    data: {
        depositOnlineStr: [],
        onlineDeposit: 0
    },
    onLoad: function() {
        this.updateData();
    },
    updateData: function() {
        var t = getCurrentPages(), e = t[t.length - 2];
        e.data.depositOnlineStr, this.setData({
            depositOnlineStr: e.data.depositOnlineStr,
            onlineDeposit: e.data.onlineDeposit
        });
    }
});