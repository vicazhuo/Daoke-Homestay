var request = require("../utils/request.js");
module.exports = {
  getcouponList: function (param) {//获取优惠劵列表
    var api = 'v2.wxcoupon/index';
    return request.method('post', api);
  },
  getcoupon: function (param) {//领取优惠
    var api = 'v2.wxcoupon/getcoupon';
    return request.method('post', api, param);
  },
  getredpacketlist: function (param){
    var api = 'v2.wxcoupon/packetlist';
    return request.method('post', api, param);
  }
};