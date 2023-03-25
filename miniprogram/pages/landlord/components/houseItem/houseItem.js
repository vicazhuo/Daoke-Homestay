Component({
    properties: {
        houseInfo: {
            type: Object,
            value: {}
        },
        pageType: {
            type: String,
            value: 1
        },
        landlordId: {
            type: String,
            value: ""
        }
    },
    data: {
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
    },
    methods: {
        goDetail: function(e) {
            console.log(e);
            var t = e.currentTarget.dataset.unitid, a = this.data.landlordId, i = "/pages/unitDetails_v2/unitDetails";
            1 == this.data.pageType ? i += "?scene=" + t + "_1_" + a : i += "?unitId=" + t, 
            wx.navigateTo({
                url: i
            });
        }
    }
});