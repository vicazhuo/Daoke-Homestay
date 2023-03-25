

Component({
  properties: {
    landlordInfo: Object,
    businessTypeName: String
  },
  data: {
    PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
  },
  methods: {
    toLandlordPage: function () {
     
      var e = this.properties.landlordInfo;
      e && e.id && wx.navigateTo({
        url: "/pages/landlord/index?hotelId=" + e.id
      });
    }
  }

});