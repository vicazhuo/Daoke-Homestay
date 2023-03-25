Component({
    properties: {
        briefIntroduction: String,
        houseBrief: Object,
        unitId: String,
        realPhoto: Boolean,
        unitTrafficInfos: Array
    },
    ready: function() {},
    data: {},
    methods: {
        gotoHouseDetailDesc: function() {
            wx.navigateTo({
                url: "/pages/unitDetails_v2/common/unitHouseDesc/unitHouseDesc?unitId=" + this.data.unitId
            });
        }
    }
});