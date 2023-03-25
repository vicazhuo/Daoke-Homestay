

Component({
  properties: {
    latitude: Number,
    longitude: Number,
    unitName: String,
    address: String,
    unitId: String,
    geoHandPosition: Array,
    cityTerritoryType: Number
  },
  data: {
    PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
  },
  methods: {
    navAddress: function () {
      var t, e, i, o = this.properties.unitName, s = this.properties.address;
      console.log("441426", this.properties);
      1 == this.properties.cityTerritoryType ? (e = (t = this._bd_decrypt_go(this.properties.latitude, this.properties.longitude)).latitude,
        i = t.longitude) : (e = this.properties.latitude, i = this.properties.longitude),
        wx.openLocation({
          latitude: e,
          longitude: i,
          scale: 17,
          name: o,
          address: s
        });
    },
    _bd_decrypt_go: function (t, e) {
      var i = 3e3 * Math.PI / 180, o = e - .0065, s = t - .006, a = Math.sqrt(o * o + s * s) - 2e-5 * Math.sin(s * i), r = Math.atan2(s, o) - 3e-6 * Math.cos(o * i);
      return e = a * Math.cos(r), t = a * Math.sin(r), {
        latitude: t,
        longitude: e
      };
    },
    gotoHouseDetailPosition: function () {
      wx.navigateTo({
        url: "/pages/unitDetails_v2/common/unitHousePosition/unitHousePosition?unitId=" + this.data.unitId
      });
    },
    copyAddress: function (t) {
      var e = t.currentTarget.dataset.param;
      wx.setClipboardData({
        data: e,
        success: function (t) {
          "ios" == getApp().globalData.systemInfo.platform && wx.showToast({
            title: "复制成功",
            icon: "none"
          });
        },
        fail: function (t) {
          console.log(t);
        }
      });
    }
  }
});