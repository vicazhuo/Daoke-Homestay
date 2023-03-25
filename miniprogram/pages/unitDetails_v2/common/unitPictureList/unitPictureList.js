Page({
  data: {
    allPicturelist: [],
    titleTags: [],
    tagIndex: 0,
    imglist: [],
    taglines: 0,
    tabScrollTop: 0,
    fixedTab: !1
  },
  onLoad: function (t) {
    var e = JSON.parse(t.pictureList);
    this.setData({
      imglist: e
    }), this.setData({
      allPicturelist: e
    }), this.titleTagsToArr();
    var i = this;
    wx.getSystemInfo({
      success: function (t) {
        i.setData({
          scrollViewHeight: t.windowHeight - 45
        });
      }
    });
    this.typeLines();
    var a = wx.createSelectorQuery(), s = this;
    a.select("#piclist").boundingClientRect(), a.exec(function (t) {
      s.setData({
        tabScrollTop: t.top
      });
    });
  },
  titleTagsToArr: function () {
    var t = [];
    t.push("全部"), this.data.imglist.forEach(function (e, i) {
      e.title && t.push(e.title);
    });
    var e = this.uniquel(t);
    e.length > 1 && this.setData({
      titleTags: e
    });
  },
  uniquel: function (t) {
    for (var e = [], i = 0; i < t.length; i++) -1 == e.indexOf(t[i]) && e.push(t[i]);
    return e;
  },
  chooseTag: function (t) {
    var e = t.currentTarget.dataset.desc, i = [];
    console.log(t), this.setData({
      tagIndex: t.currentTarget.dataset.index
    }), this.data.allPicturelist.forEach(function (t, a) {
      t.title == e && i.push(t);
    }), "全部" == t.currentTarget.dataset.desc ? this.setData({
      imglist: this.data.allPicturelist
    }) : this.setData({
      imglist: i
    });
  },
  imageSelected: function (t) {
    var e = t.currentTarget.dataset.selectedindex, i = this.data.imglist.map(function (t) {
      return t.albumUrl;
    });
    wx.previewImage({
      current: i[e],
      urls: i
    });
  },
  typeLines: function () {
    var t = this.data.titleTags.length + 1, e = Math.floor(t / 4);
    return t % 4 && e++ , e;
  }
});