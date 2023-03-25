var i = 0, e = 0, r = "";

Component({
  properties: {
    unitVrUrl: String,
    unitVideoUrl: String,
    pictureList: Array,
    isVideoOrVR: Boolean,
    touchDot: Number,
    unitid: {
      type: Number,
      value: 0
    }
  },
  data: {
    animationPicSwiper: {},
    animationVideoOrVR: {},
    pictureListCurrentIndex: 1,
    picActiveStatus: !0,
    videoActiveStatus: !1,
    PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
  },
  ready: function () {
    console.log(this.data.unitVrUrl + "vrurl----------"), this.animation = wx.createAnimation({
      duration: 350,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: "100% 100%"
    }), this.setData({
      animationVideoOrVR: this.animation.export(),
      animationPicSwiper: this.animation.export()
    });
  },
  methods: {
    translatePicture: function (t) {
      this.animation.translate(t, 0).step({
        duration: 350
      }), this.setData({
        animationPicSwiper: this.animation.export()
      });
    },
    translateVideoOrVR: function (t) {
      this.animation.translate(t, 0).step({
        duration: 350
      }), this.setData({
        animationVideoOrVR: this.animation.export()
      });
    },
    selectTabVideoOrVR: function () {
      this.translateVideoOrVR(0), this.translatePicture("100%"), this.setData({
        picActiveStatus: !1,
        videoActiveStatus: !0
      });
    },
    selectTabPicture: function () {
      this.translateVideoOrVR("-100%"), this.translatePicture(0), this.setData({
        picActiveStatus: !0,
        videoActiveStatus: !1
      });
    },
    goVideoOrVR: function () {
      var t = "";
      this.properties.unitVideoUrl ? t = this.properties.unitVideoUrl : this.properties.unitVrUrl && (t = this.properties.unitVrUrl),
        wx.navigateTo({
          url: "./common/unitWebview/unitWebview?videoUrl=" + t
        });
    },
    touchStartVideoOrVR: function (t) {
      i = t.touches[0].pageX, r = setInterval(function () {
        e++;
      }, 100);
    },
    touchMoveVideoOrVR: function (t) {
      var r = t.touches[0].pageX;
      r - i <= -40 && e < 10 && this.selectTabPicture();
    },
    touchEndVideoOrVR: function (t) {
      clearInterval(r), e = 0;
    },
    pictureListChuanged: function (t) {
      this.setData({
        pictureListCurrentIndex: t.detail.current + 1
      }), t.detail.current + 1 == this.data.pictureList.length && this.data.isVideoOrVR && this.selectTabVideoOrVR();
    },
    goPictureListPage: function () {
      var t = JSON.stringify(this.properties.pictureList);
      wx.navigateTo({
        url: "./common/unitPictureList/unitPictureList?pictureList=" + t
      });
    }
  }
});