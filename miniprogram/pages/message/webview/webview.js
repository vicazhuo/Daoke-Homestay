var t = getApp();

Page({
  data: {
    webUrl: "",
    isH5SwitchTab: false
  },
  onShow: function (a) {
    if (!wx.getStorageSync("messageTabBackRoute")) return false;
    var host = t.siteInfo.apiurl.replace('minsu.v1.', '');
    var s = t.globalUserInfo.tjUserInfo.userId,
      n = t.globalUserInfo.tjUserInfo.userToken,
      i = host + "mobile.im/messagecenter?mref=wxclient&tjuserid=" + s + "&tjusertoken=" + n;
    this.setData({
      webUrl: i
    }), console.log(this.data.webUrl, "聊天页面地址");
  },
  onUnload: function () {
    var e = wx.getStorageSync("messageTabBackRoute");
    if (this.data.isH5SwitchTab) {
      return false;
    }
    if (wx.setStorageSync("messageTabBackRoute", ""), e || (e = "pages/index/index"));
    wx.switchTab({
      url: "/" + e
    });
  },
  handleBindMessage: function (e) {
    console.log(e);
    e.detail.data && e.detail.data.length > 0 && this.setData({
      isH5SwitchTab: true
    });
  }
});