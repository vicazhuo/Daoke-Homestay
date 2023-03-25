Component({
    properties: {
        checkinOtherInfo: Array,
        unitId: String
    },
    methods: {
        seeUnitExtraCost: function() {
            wx.navigateTo({
                url: "/pages/unitDetails_v2/common/unitExtraCost/unitExtraCost?unitId=" + this.data.unitId
            });
        }
    }
});