var e = require("../../apiFetch/landlordApi"), i = require("../../common/js/utils"), n = getApp();

Page({
  data: {
    hotelDetail: {},
    commentSummary: {},
    swiperCurrent: 0,
    hotelList: [],
    hotelTotalCount: "",
    commentList: [],
    hotelIsLoading: false,
    hotelIsEnd: false,
    commentIsLoading: false,
    commentIsEnd: false,
    commentListIsAll: [],
    isFixed: false,
    pageLoading: false,
    isMoreDescText: false,
    isShowTopScreen: false,
    commentScoreStars: [],
    PWA_STATIC_TUJIA_HOST: n.globalStaticUrl,
    pageType: 2,
    isPageError: false,
    isShare: false,
    isHide: true,
    bannerImageUrl:'',
    defaultUserImg: "https://staticfile.tujia.com/WechatApp/images/default_user.png"
  },
  hotelId: "",
  headerHeight: "",
  windowWidth: "",
  baseTextHeight: 85,
  isLandlordNew: false,
  hotelListIndex: 0,
  commentListIndex: 0,
  isCommentFirstLoad: true,
  onLoad: function (e) {
    var o = this;
    wx.getSystemInfo({
      success: function (t) {
        console.log(t), o.windowWidth = t.windowWidth;
      }
    });
    var r = e.hotelId, a = e.scene;
    if (this.urlString = (0, i.urlParams)(e), a) {
      a = (0, i.senceFilter)(a);
      var s = t(a, 2), l = s[0], h = s[1];
      if (!l) return this.pageError("参数错误");
      2 == h && n.globalGio("track", "fangdongreturnshijian", {
        fangwureturn: h
      }), 1 == h && n.setGlobalCode("WxAppfdlxCode"), this.hotelId = l, this.setData({
        isLandlordNew: true,
        hotelId: l,
        pageType: h || 2,
        isShare: true
      });
    } else {
      if (!r) return this.pageError("参数错误");
      this.hotelId = r, this.setData({
        hotelId: r
      });
    }
  },
  onReady: function () {
    this.pageReload();
  },
  onPageScroll: function (t) {
    var e = t.scrollTop;
    this.headerHeight && (this.scrollTop = e, e >= this.headerHeight ? this.data.isFixed || this.setFixed(true) : this.data.isFixed && this.setFixed(false));
  },
  onReachBottom: function () {
    if (this.data.swiperCurrent) return this.commentListTolower();
    this.hotelListTolower();
  },
  onShareAppMessage: function () {
    var t = this.data.hotelDetail, e = t.welcome, i = t.hotelName, o = t.shareSetting;
    return {
      title: o.shareTitle || e || i,
      desc: o.shareDescription || "",
      path: "/pages/landlord/index" + this.urlString
    };
  },
  pageReload: function () {
    var t = this;
    e.default.getHotel(this.hotelId).then(function (e) {
      if (!e) return t.pageError();
      console.log(e);
      var i = e.hotel, 
          o = i.commentSummary.overall = i.commentSummary.overall.toString();
      t.commentScoreFilter(o), t.setData({
        hotelDetail: i,
        bannerImageUrl: e.bannerImageUrl,
        pageLoading: true,
        commentSummary: i.commentSummary || {}
      }), t.computeDescription(), t.getHotelList(0), wx.setNavigationBarTitle({
        title: i.hotelName
      });
    }).catch(function (e) {
      console.log("landlord page error:", e), t.pageError(e.errorMsg || "服务出错，请稍候再试...");
    });
  },
  commentTextFilter: function (t) {
    return t.forEach(function (t) {
      var e = t.commentDetail;
      e.length > 120 && (t.commentDetail = e.substring(0, 120), t.commentDetailMore = e.substring(120));
    }), t;
  },
  pageError: function (t) {
    wx.showToast({
      title: t || "查无此房东",
      icon: "none",
      duration: 3e3
    }), this.data.isShare && this.setData({
      isPageError: true
    });
  },
  commentScoreFilter: function (t) {
    var e = [];
    if (t) {
      var i = t.toString().split(".");
      if (e = Array.apply(null, {
        length: 5
      }).map(function (t, e) {
        return e < i[0] ? 1 : 0;
      }), i[0] < 5 && i[1] > 0) {
        var o = i[1] >= 5 ? 2 : 0;
        e[i[0]] = o;
      }
    } else e = [0, 0, 0, 0, 0];
    this.setData({
      commentScoreStars: e
    });
  },
  setFixed: function (t) {
    this.setData({
      isFixed: t
    });
  },
  selectTab: function (t) {
    var e = t.currentTarget.dataset.index;
    if (this.setData({
      swiperCurrent: e
    }), this.setScrollTop(), e && !this.data.commentList.length) return this.getCommentList(0);
    e || this.data.hotelList.length || this.getHotelList(0);
  },
  getHotelList: function (t) {
    var i = this;
    t = 0 === t ? t : this.hotelListIndex, e.default.searchHouseByHotel({
      index: t,
      hotelId: this.hotelId
    }).then(function (e) {
      var o = e.items || [];
      t || o.length || (i.setData({
        swiperCurrent: 1
      }), i.getCommentList(0)), i.setData({
        hotelTotalCount: e.totalCount || 0,
        hotelList: t ? i.data.hotelList.concat(o) : o,
        hotelIsEnd: o.length < 10
      }), o.length && i.hotelListIndex++;
    }).finally(function () {
      i.setData({
        hotelIsLoading: false
      });
    });
  },
  getCommentList: function (t) {
    var i = this;
    t = 0 === t ? t : this.commentListIndex, e.default.getHotelComments({
      index: t,
      hotelId: this.hotelId
    }).then(function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
      i.setData({
        commentList: t ? i.data.commentList.concat(i.commentTextFilter(e)) : i.commentTextFilter(e),
        commentIsEnd: e.length < 10
      }), e.length && i.commentListIndex++;
    }).finally(function () {
      i.setData({
        commentIsLoading: false
      });
    });
  },
  hotelListTolower: function () {
    this.data.hotelIsLoading || (this.getHotelList(), this.setData({
      hotelIsLoading: true
    }));
  },
  commentListTolower: function () {
    if (this.isCommentFirstLoad) return this.isCommentFirstLoad = false;
    this.data.commentIsLoading || (this.getCommentList(), this.setData({
      commentIsLoading: true
    }));
  },
  previewImage: function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
    wx.previewImage({
      current: t,
      urls: e
    });
  },
  openPreviewImage: function (t) {
    var e = t.currentTarget.dataset, i = e.parentindex, o = e.index, n = this.data.commentList[i].pictureList.map(function (t) {
      return t.albumUrl;
    });
    this.previewImage(n[o], n);
  },
  openCommentAll: function (t) {
    var e = t.currentTarget.dataset.index, i = this.data.commentListIsAll;
    i[e] = !i[e], this.setData({
      commentListIsAll: i
    });
  },
  getElementHeight: function () {
    var t = this;
    return new Promise(function (e, i) {
      wx.createSelectorQuery().select("#page-header").boundingClientRect().exec(function (o) {
        var n = o[0];
        if (!n) return i(n);
        e(n.height), t.headerHeight = n.height;
      });
    });
  },
  computeDescription: function () {
    var t = this;
    this.windowWidth && wx.createSelectorQuery().select("#description").boundingClientRect().exec(function (e) {
      if (e) {
        e = e[0];
        var i = t.windowWidth / 375 * t.baseTextHeight;
        e.height > i && t.setData({
          isMoreDescText: true
        }), t.setData({
          isHide: false
        }), t.getElementHeight().then(function (t) {
          console.log(t);
        });
      }
    });
  },
  seeMoreDescription: function () {
    this.setData({
      isShowTopScreen: !this.data.isShowTopScreen
    });
  },
  setScrollTop: function () {
    this.scrollTop != this.headerHeight && wx.pageScrollTo({
      scrollTop: this.headerHeight,
      duration: 0
    });
  }
});