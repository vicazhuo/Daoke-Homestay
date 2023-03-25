var e = require("../../../apiFetch/userApi.js"), a = require("../../../apiFetch/tjFetch2");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: { money: 0.00, score: 0.00 }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getUserMoney();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取用户余额
   */
  _getUserMoney: function () {
    var t = this;
    this.setData({
      loadingHidden: !0
    }), e.default.getuserMoney().then(function (e) {
      t.setData({
        user: e
      });
    }).catch(function () { }).finally(function () {

    });
  }
})