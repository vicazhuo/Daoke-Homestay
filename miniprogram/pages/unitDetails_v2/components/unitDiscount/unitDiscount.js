

Component({
  properties: {
    promotionLinks: Array,
    promotionLinksForUnit: Array
  },
  data: {
    navigateUrl: "",
    PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
  },
  ready: function () {


  },
  methods: {
    _goPromotionLink: function (i) {
      var t = i.currentTarget.dataset.index;
      this.properties.promotionLinks && 0 != this.properties.promotionLinks.length && this.properties.promotionLinks[t].navigateUrl && wx.navigateTo({
        url: "/pages/unitDetails_v2/common/unitWebview/unitWebview?navigateUrl=" + this.properties.promotionLinks[t].navigateUrl
      });
    },
    _goPromotionLinkForUnit: function (i) {
      var t = i.currentTarget.dataset.index;
      this.properties.promotionLinksForUnit && 0 != this.properties.promotionLinksForUnit.length && this.properties.promotionLinksForUnit[t].navigateUrl && wx.navigateTo({
        url: "/pages/unitDetails_v2/common/unitWebview/unitWebview?navigateUrl=" + this.properties.promotionLinksForUnit[t].navigateUrl
      });
    }
  }
});