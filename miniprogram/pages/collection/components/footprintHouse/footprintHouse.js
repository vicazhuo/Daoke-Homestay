(function(t) {
    t && t.__esModule;
})(require("../../../../apiFetch/collectionApi")), require("../../../../common/js/utils.js"), 
getApp();

Component({
    properties: {
        houseInfo: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        footprintGoToDetail: function(t) {
            var e = t.currentTarget.dataset, i = e.unitid, n = "/pages/unitDetails_v2/unitDetails";
            wx.navigateTo({
                url: n + "?unitId=" + i
            });
        },
        removeFavorite: function(t) {
            this.triggerEvent("removeFavorite", t.detail);
        }
    }
});