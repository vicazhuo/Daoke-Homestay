var t = getApp(), memberVip = require("../../../apiFetch/member.js"), u = require("../../../common/js/utils.js");

Page({
  data: {
    userInfo: null,
    isLogin: !1,
    isAuth: !1,
    isGetUserInfoPopup: true,
    notSubscribed: false,
    wapUrl: t.globalData.wapUrl,
    swiperCurrent: 0,
    nickname: "",
    headImageUrl: "",
    userLevel: 0,
    userLevelName: "",
    totalBackAmount: 0,
    payRemainAmount: 0,
    backRemainAmount: 0,
    couponCount: 0,
    isFirstPayActivityOnline: !1,
    isFirstPayActivityJoin: !1,
    vipIntroList: [],
    payActivityIntroList: [],
    from: 0,
    globalName: '',
    nextLevel: 1
  },
  onLoad: function (a) {
    a && a.inviterUserId && wx.setStorageSync("inviterUserId", a.inviterUserId);
    var e = a.from || 0;
    var user = t.globalUserInfo.tjUserInfo;

    user && this.setData({
      nickname: user.nickname,
      headImageUrl: user.avatarUrl,
      userLevel: user.userLevel,
      userLevelName: user.userTitle,
      nextLevel: user.userLevel + 1 < 4 ? user.userLevel + 1 : 4
    });
    this.setData({
      globalName: t.globalData.globalName,
      isLogin: t.userIsLogin(),
      isAuth: t.userIsLogin(),
      swiperCurrent: 0,
      from: e
    });
    this.getData();

  },
  onReady: function () { },
  onShow: function () {
    wx.getStorageSync("memberPageRefresh") ? this.getData() : wx.getStorageSync("memberPageRefreshNeedLogin") && (this.setData({
      userInfo: t.globalData.userInfo,
      isLogin: t.userIsLogin(),
      isAuth: t.userIsLogin()
    }))
  },
  onHide: function () {
    wx.removeStorageSync("memberPageRefresh"), wx.removeStorageSync("memberPageRefreshNeedLogin");
  },
  onUnload: function () { },
  onPullDownRefresh: function () {
    this.data.isLogin ? this.getData() : wx.stopPullDownRefresh();
  },
  goAuthorize: function () {

  },
  getUserInfo: function (a) {
    var e = this;
    //判断登录
    if (this.data.isLogin) {

    } else {
      wx.login({
        success: function (res) {
          memberApi.get_wx_memberOpenId({ code: res.code, parentsId: parentsId }).then((res) => {
            console.log(res)
            if (res.errcode == 0) {
              //没有微信用户信息
              if (res.data.nickname == '') {
                e.setData({
                  isGetUserInfoPopup: false,
                  notSubscribed: true
                })
              }
              //没有手机号码
              if (res.data.showMobile == '') {
                e.setData({
                  isGetUserInfoPopup: false
                })
              }
            }
          })
        }
      })
    }
  },
  swiperFinish: function (t) {
    this.setData({
      swiperCurrent: t.detail.current
    });
  },
  getData: function () {
    var a = this;
    memberVip.getvipInfo().then(function (res) {
      var t = res;
      if (console.log(t), wx.stopPullDownRefresh(), 0 == t.errcode) {
        var e = 0;
        a.setData({
          totalBackAmount: t.data.totalBackAmount,
          payRemainAmount: t.data.payRemainAmount,
          backRemainAmount: t.data.backRemainAmount,
          couponCount: t.data.couponCount,
          isFirstPayActivityOnline: t.data.isFirstPayActivityOnline,
          isFirstPayActivityJoin: t.data.isFirstPayActivityJoin,
          vipIntroList: t.data.vipIntroList,
          payActivityIntroList: t.data.payActivityIntroList,
          swiperCurrent: e
        });
      }
    }).catch(function (t) {
      console.log(t, 999);
    });
  },
  goTeturnCash: function () {
    var h5Url = t.siteInfo.apiurl + 'v2.wxh5/member_rule?appid=' + t.siteInfo.appid;
    (0, u.openWebview)(h5Url);
  },
  goRecharge: function (t) {
    var a = t.currentTarget.dataset.id, e = a >= 20 ? 0 : 1, i = 10 == a ? 2 : 0;
    wx.navigateTo({
      url: "/pages/user_v2/recharge/index?id=" + a + "&isDirect=" + e + "&from=" + i
    });
  },
  goWallet: function () {
    wx.navigateTo({
      url: "/pages/user_v2/wallet/wallet"
    });
  },
  gofreeRoom: function () {
    wx.navigateTo({
      url: "/pages/freeRoom/index/index"
    });
  }
});