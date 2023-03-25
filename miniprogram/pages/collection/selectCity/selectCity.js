function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function i(t) {
    if (Array.isArray(t)) {
        for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
        return i;
    }
    return Array.from(t);
}

var r = t(require("../../../apiFetch/collectionApi")), a = t(require("../../../common/js/utils")), s = [];

Page({
    data: {
        cityList: [],
        isError: !1
    },
    cityHouseList: [],
    allIds: [],
    onLoad: function(t) {
        var r = this, s = a.default.getPrevPage().cityList;
        if (!s) return a.default.toast(e.errorMsg || "获取收藏数据失败");
        var n = [];
        s.forEach(function(t) {
            n.push.apply(n, i(t.houseIdList));
        }), this.allIds = n, this.getFavoriteIds().then(function(t) {
            r.allIds = r.filterList(t, n);
        });
        var u = t.name || "";
        this.getCityIds(s, u);
    },
    selectCity: function(t) {
        var e = t.currentTarget.dataset.index;
        a.default.execPrevPageCallback("selectCityCallBack", e ? s[e - 1] : {
            houseIdList: this.allIds
        });
    },
    filterList: function(t, e) {
        return t.filter(function(t) {
            return -1 != e.indexOf(t);
        });
    },
    getFavoriteIds: function() {
        return r.default.getFavorite(!0).then(function(t) {
            return Promise.resolve(t.houseIdList || []);
        }).catch(function(t) {
            a.default.toast(t.errorMsg || "获取收藏数据失败");
        });
    },
    getCityIds: function(t, e) {
        s = t;
        var i = t.map(function(t) {
            return {
                name: t.cityName,
                val: t.houseIdList.length,
                isSelect: e === t.cityName
            };
        });
        i.unshift({
            name: "全部城市",
            val: this.allIds.length,
            isSelect: !e
        }), this.setData({
            cityList: i
        });
    }
});