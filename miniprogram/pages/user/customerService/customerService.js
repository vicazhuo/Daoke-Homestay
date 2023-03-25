function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

var e = t(require("../../../apiFetch/userApi.js")), a = t(require("../../../apiFetch/tjFetch2"));
var globalData = getApp().globalData; 

Page({
    data: {
      phoneNumber: "",
      mobileNumber: "",
      desc1: "客服热线",
      desc2: "投诉电话"
    },
  /**
* 生命周期函数--监听页面加载
*/
  onLoad: function (options) {

      this._getAbout();
  },

    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    _getAbout:function(){
      var t = this;
      this.setData({
        loadingHidden: !0
      }), e.default.getAboutinfo().then(function (e) {
        t.setData({
          phoneNumber: e.phone,
          mobileNumber: e.mobile
        });
      }).catch(function () { }).finally(function () {

      });
    },
    makeInternalPhone: function() {
        wx.makePhoneCall({
          phoneNumber: this.data.phoneNumber
        });
    },
    makeOverseasPhone: function() {
        wx.makePhoneCall({
          phoneNumber: this.data.mobileNumber
        });
    }
});