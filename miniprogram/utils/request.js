var app = getApp(), codeDesc = require("codeDesc.js");
module.exports = {
  //
  method: (type = 'post', api = false, param = {}) => {
    if (!api) {
      wx.showModal({
        title: '系统提示',
        content: 'url地址错误！',
      })
      return false;
    }
    var header = {};
    if (app.globalUserInfo.tjUserInfo) {
      var userInfo = app.globalUserInfo.tjUserInfo;
      header = { 'content-type': 'application/json', 'userId': userInfo.userId, 'userToken': userInfo.userToken }
    }
    param['appid'] = app.siteInfo.appid
    param['appkey'] = app.siteInfo.appkey
    wx.showLoading();
    console.log(app.siteInfo.apiurl + api)
    return new Promise(function (resolve, reject) {
      wx.request({
        url: app.siteInfo.apiurl + api, //仅为示例，并非真实的接口地址
        data: param,
        method: type,
        header: header,
        success(res) {
          wx.hideLoading();
          //请求参数检测
          if (codeDesc.chaeck(res.data)) {
            
               resolve(res.data)
          }
        },
        fail(res) {
          console.log(res)
          wx.hideLoading();
          wx.showModal({
            title: '系统提示',
            content: '请求网络错误',
            showCancel: false,
            success() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
          reject(res)
        },
        complete(res) {


        }
      })

    });
  }
}