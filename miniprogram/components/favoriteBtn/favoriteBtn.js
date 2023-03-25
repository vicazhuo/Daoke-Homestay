function t() {
  wx.navigateTo({
    url: "/pages/user/login/login"
  });
}

var e = function (t) {
  return t && t.__esModule ? t : {
    default: t
  };
}(require("../../apiFetch/collectionApi.js")), i = require("../../common/js/utils.js"), o = getApp();

o.globalHost.PWA_STATIC_TUJIA_HOST;

Component({
  properties: {
    isFavoritePage: {
      type: Boolean,
      value: !1
    },
    unitid: {
      type: Number,
      value: ""
    },
    styles: {
      type: String,
      value: ""
    }
  },
  data: {
    isFavorite: !1
  },
  favoriteEventName: "",
  isActionFavoriteComponent: !1,
  favoriteFn: function () { },
  ready: function () {
    var t = this;
    if (this.setListener(), o.userIsLogin()) {
      var e = o.globalData.getFavoriteList() || [];
      e.length ? this.checkFavotite(e) : o.globalData.requestFavoriteData().then(function (e) {
        t.checkFavotite(e);
      });
    }
  },
  detached: function () {
    i.event.clear(this.favoriteFn, this.favoriteEventName);
  },
  methods: {
    checkFavotite: function () {
      -1 != (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).indexOf(parseInt(this.properties.unitid)) && this.setData({
        isFavorite: !0
      });
    },
    setListener: function () {
      this.favoriteFn = this.favoriteEventHandle(), this.favoriteEventName = "favoriteEvent_" + this.properties.unitid,
        i.event.on(this.favoriteEventName, this.favoriteFn);
    },
    favoriteEventHandle: function () {
      var t = this, e = this.properties, i = e.isFavoritePage, o = e.unitid;
      return function (e) {
        return t.isActionFavoriteComponent ? t.isActionFavoriteComponent = !1 : i && !e ? t.triggerEvent("removeFavorite", o) : void t.setData({
          isFavorite: e
        });
      };
    },
    favoriteHandle: function () {
      var e = this;
      if (!o.userIsLogin()) return t();
      var i = this.data.isFavorite, a = this.properties.isFavoritePage;
      i && a ? wx.showModal({
        title: "",
        confirmText: "移除",
        confirmColor: "#FF9645",
        cancelText: "再想想",
        content: "要从收藏里移除这个房屋吗？",
        success: function (t) {
          t.confirm && e.setFavorite();
        }
      }) : this.setFavorite();
    },
    setFavorite: function () {
      var a = this, r = this.properties, n = r.unitid, s = r.isFavoritePage, v = this.data.isFavorite;
      e.default[v ? "deleteFavorite" : "addFavorite"](n).then(function (t) {
        (0, i.toast)(v ? "取消收藏成功" : "收藏成功"), s && v && a.triggerEvent("removeFavorite", n),
          s && v || a.setData({
            isFavorite: !v
          }), v ? o.globalData.deleteFavorite(n) : (a.triggerEvent("addFavorite", n), o.globalData.addFavorite(n)),
          a.isActionFavoriteComponent = !0, i.event.emit(a.favoriteEventName, !v), i.event.emit("favoriteStatusUpdate", {
            unitid: n,
            isFavorite: !v
          });
      }).catch(function (e) {
        if (console.log(e), 55004 == e.errorNo) return t();
        (0, i.toast)(e.errorMsg || "操作失败");
      });
    }
  }
});