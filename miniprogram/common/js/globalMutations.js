function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../apiFetch/collectionApi.js"));

exports.default = {
    setFavoriteTip: function(t) {
        this.favoriteTipStatus = t;
    },
    getFavoriteList: function() {
        return this.favoriteData.favoriteList;
    },
    setFavoriteList: function(e) {
        this.favoriteData.favoriteList = [].concat(t(e));
    },
    addFavorite: function(t) {
        this.favoriteData.favoriteList.unshift(parseInt(t));
    },
    deleteFavorite: function(t) {
        var e = this.favoriteData.favoriteList.indexOf(t);
        -1 !== e && (this.favoriteData.favoriteList.splice(e, 1), this.setFavoriteList(this.favoriteData.favoriteList));
    },
    requestFavoriteData: function() {
        var t = this;
        return new Promise(function(a, i) {
            var r = t.getFavoriteList();
            if (r.length) return a(r);
            t.favoriteData.requestFavoriteStatus ? t.favoriteData.requestFavoriteQueue.push(a) : (t.favoriteData.requestFavoriteStatus = !0, 
            e.default.getFavorite().then(function(e) {
              if (e){
                t.favoriteData.requestFavoriteStatus = !1, t.setFavoriteList(e.houseIdList), a(e.houseIdList), 
                t.favoriteData.requestFavoriteQueue.forEach(function(t) {
                    return t(e.houseIdList);
                }), t.favoriteData.requestFavoriteQueue = [];
              }
            }));
        });
    },
    setGlobalSearchDate: function(t, e) {
        this.globalSearchData.beginDate = t, this.globalSearchData.endDate = e;
    },
    getGlobalSearchData: function() {
        return this.globalSearchData;
    }
};