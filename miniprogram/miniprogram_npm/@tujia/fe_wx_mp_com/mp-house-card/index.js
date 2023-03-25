function e(e, t) {
    if (!e || !t) return e;
    var a = [];
    for (var i in t) (t[i] || 0 === t[i]) && a.push(i + "=" + t[i]);
    return e + "?" + a.join("&");
}

var t = require("../../../../common/js/utils.js"), a = getApp().globalHost.PWA_STATIC_TUJIA_HOST;

Component({
    properties: {
        houseInfo: {
            type: Object,
            value: {}
        },
        date: {
            type: Object,
            value: {}
        },
        beginDate: {
            type: String,
            value: ""
        },
        endDate: {
            type: String,
            value: ""
        },
        isAliApp: {
            type: Boolean,
            value: !1
        },
        isFavoritePage: {
            type: Boolean,
            value: !1
        },
        pageType: {
            type: String,
            value: "2"
        },
        landlordId: {
            type: String,
            value: ""
        },
        peopleCount: {
            type: Number,
            value: 1
        }
    },
    data: {
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl,
        defaultLanlordUserImg: "https://staticfile.tujia.com/Mobile/Images/avatar/hotel.png",
        isAliAndroid: t.systemInfo.isAliAndroid,
        current: 0,
        isAliApp: t.isAliApp
    },
    methods: {
        goToDetail: function(t) {
            var a = this.properties, i = a.landlordId, n = a.pageType, r = a.peopleCount, o = a.date, l = o.beginDate, p = o.endDate, s = this.properties.beginDate, u = this.properties.endDate;
            l = l || s, p = p || u;
            var d = t.currentTarget.dataset.unitid, v = 1 == n;
            wx.navigateTo({
                url: e("/pages/unitDetails_v2/unitDetails", {
                    beginDate: l,
                    endDate: p,
                    unitId: v ? null : d,
                    scene: v ? d + "_1_" + i : null,
                    peopleCount: r
                })
            });
        },
        removeFavorite: function(e) {
            this.triggerEvent("removeFavorite", e.detail);
        },
        swiperChange: function(e) {
            var t = e.detail.current;
            this.data.current != t && this.setData({
                current: t
            });
        }
    }
});