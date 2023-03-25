var t = require("../../../../common/js/utils");

Component({
    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(t) {
                t && this.data.current && this.setData({
                    current: 0
                });
            }
        }
    },
    data: {
        current: 0
    },
    methods: {
        hotHouseRecommendChange: function(t) {
            var e = t.detail;
            "touch" === e.source && this.setData({
                current: e.current
            });
        },
        hotHouseRecommendNavTap: function(t) {
            console.log(t);
            var e = t.currentTarget.dataset.index;
            this.setData({
                current: e
            });
        },
        houseJump: function(e) {
            var a = e.currentTarget.dataset.unitid;
            a && wx.navigateTo({
                url: (0, t.createUrlParamsString)("/pages/unitDetails_v2/unitDetails", {
                    beginDate: "",
                    endDate: "",
                    unitId: a
                })
            });
        },
        toUnitSearchPage: function(e) {
            var a = e.currentTarget.dataset.url;
            (a = (0, t.parseQuery)(a) || {}).url && (console.log(a), wx.navigateTo({
                url: (0, t.createUrlParamsString)("/pages/units/units", {
                    beginDate: "",
                    endDate: "",
                    condintionUrl: a.url
                })
            }));
        }
    }
});