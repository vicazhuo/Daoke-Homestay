function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}
var a = getApp();
var e = t(require("../../../apiFetch/userApi.js"));
var i = t(require("../../../apiFetch/tjFetch2"));
Page({
  data: {
    memberCode: "",
    headPortrait: "",
    memberImg: "https://oss.localhome.cn/new_icon/normal.png",
    levalInfo: '',
    levelList: [],
    islevel: 1,
    userInfo: '',
    levelTile: '普通会员',
    headPortrait: '',
    spinShow: true,
  },
  onShow: function () {

  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中....',
    })
    this.getMemnerData();
  },
  getMemnerData: function () {
    var t = this;
    this.setData({
      loadingHidden: !0
    }), e.default.getMemberConfig().then(function (e) {
      var userInfo = a.globalUserInfo.tjUserInfo;
      var img = '';
     
      for (var i in e.list) {
        if (e.list[i].level == userInfo.userLevel) {
          img = e.list[i].images;
        }
      }
      wx.hideLoading();
      t.setData({
        spinShow: false,
        levelTile: userInfo.userTitle,
        levalInfo: e.rule.introduction,
        levelList: e.list,
        memberImg: img
      })

      console.log(t.data.isloading)


    }).catch(function () {



    })
  }
});