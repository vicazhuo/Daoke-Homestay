

Component({
    properties: {
        unitFacilityGroups: Array,
        unitId: String,
        houseSafeDescription: String
    },
    data: {
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
    },
    methods: {
        gotoHouseDetailFaility: function() {
            wx.navigateTo({
                url: "/pages/unitDetails_v2/common/unitServiceSetting/unitServiceSetting?unitId=" + this.data.unitId
            });
        }
    }
});