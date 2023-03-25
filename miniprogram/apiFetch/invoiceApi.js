var request = require("../utils/request.js");
module.exports = {
  getInvoiceDeafult: function (param) {//获取优惠劵列表
    var api = 'v2.invoice/get_details';
    return request.method('post', api);
  },
  setInvoiceDeafult: function (param) {//获取优惠劵列表
    var api = 'v2.invoice/setInvoiceDeafult';
    return request.method('post', api, param);
  }
};