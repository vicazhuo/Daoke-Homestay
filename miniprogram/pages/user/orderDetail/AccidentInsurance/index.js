

Page({
    data: {
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl,
        isShowTopScreen: !1,
        insuranceInfo: {}
    },
    seeMoreDescription: function() {
        this.setData({
            isShowTopScreen: !this.data.isShowTopScreen
        });
    },
    onLoad: function() {
        this.updateData();
    },
    updateData: function() {
        var e = getCurrentPages(), a = e[e.length - 2];
        console.log("prevPage", a.data.orderNew.insuranceList[0]), this.setData({
            insuranceInfo: a.data.orderNew.insuranceList[0]
        });
    }
});