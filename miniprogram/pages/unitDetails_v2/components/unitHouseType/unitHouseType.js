

Component({
    properties: {
        baseBrief: Array,
        promotionLinks: Array
    },
    data: {
        showTipsStatus: !1,
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
    },
  ready: function () {

    console.log(this)
  },
    methods: {
        showTipsMore: function() {
            var s = !this.data.showTipsStatus;
            this.setData({
                showTipsStatus: s
            });
        },
        closeTips: function() {
            this.data.showTipsStatus && this.setData({
                showTipsStatus: !1
            });
        }
    }
});