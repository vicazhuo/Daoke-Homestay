

Component({
    properties: {
        latitude: Number,
        longitude: Number,
        unitName: String,
        address: String,
        unitId: String,
        unitSummary: String,
        hotelName: String,
        hotelSummary: String,
        realTimeServiceHotlinePattern: String,
        hotelPhonePaySuccess: String

    },
    data: {
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
    },
    methods: {
        openHouseDetail: function() {
          console.log("==============",this.data)
          if(!this.data.unitId){
            wx.showToast({
              title: '参数有误',
              icon:'none'
            })
           return false;
          }
            wx.navigateTo({
                url: "/pages/unitDetails_v2/unitDetails?unitId=" + this.data.unitId
            });
        },
        openPhoneCall: function() {
            wx.navigateTo({
              url: "/pages/unitDetails_v2/common/unitCallPhone/unitCallPhone?&realTimeServiceHotlinePattern=" + this.data.realTimeServiceHotlinePattern + '&hotelPhonePaySuccess=' + this.data.hotelPhonePaySuccess
            });
        },
        navAddress: function() {
            var t = this.bd_decrypt_go(this.properties.latitude, this.properties.longitude), e = t.latitude, i = t.longitude, n = this.properties.unitName, a = this.properties.address;
            wx.openLocation({
                latitude: e,
                longitude: i,
                scale: 32,
                name: n,
                address: a
            });
        },
        bd_decrypt_go: function(t, e) {
            var i = 3e3 * Math.PI / 180, n = e - .0065, a = t - .006, r = Math.sqrt(n * n + a * a) - 2e-5 * Math.sin(a * i), o = Math.atan2(a, n) - 3e-6 * Math.cos(n * i);
            return e = r * Math.cos(o), t = r * Math.sin(o), {
                latitude: t,
                longitude: e
            };
        }
    }
});