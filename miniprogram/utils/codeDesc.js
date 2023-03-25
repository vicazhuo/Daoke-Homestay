module.exports = {
  chaeck: function (e) {

    if (e.errcode ==1001){
      wx.showModal({
        title: '系统提示',
        content: '登录已过期，请重新登',
        confirmText: '去登陆',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/user/login/login"
            });
          } else if (res.cancel) {
            wx.navigateBack()
          }
        }
      });
      return false;
    }
    return true;
  }


}