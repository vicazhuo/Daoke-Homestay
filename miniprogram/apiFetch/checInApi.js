var request = require("../utils/request.js");
module.exports = {
  getchecInData: function (param) {//获取订单和管家信息
    var api = 'v2.wxcomment/get_order_comment';
    return request.method('post', api);
  },
  userContacts: function (param) {//提交评论信息
    var api = 'v2.wxcomment/submit_comment';
    return request.method('post', api, param);
  }
};