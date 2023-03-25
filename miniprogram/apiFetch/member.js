var request = require("../utils/request.js");
module.exports = {
  /***
   * 会员中心获取会员等级等信息
   * ***/
  getvipInfo: function (param) {//获取优惠劵列表
    var api = 'v2.wxmember/vipInfo';
    return request.method('post', api, param);
  },
  /***
   * 通过手机授权登录接口
   * ***/
  authorization_mobile: function (param) {
    var api = 'v2.wxmember/authorization_mobile';
    return request.method('post', api, param);
  },
  /***
  * 刷新用户的微信信息
  * @ 头像
  * @ 昵称
  * @ 性别
  * @ 城市
  * ***/
  refresh_member_wx_info: function (param) {
    var api = 'v2.wxmember/refresh_member_wx_info';
    return request.method('post', api, param);
  },
  /***
  * 刷新用户的财务信息
  * @ 积分
  * @ 余额
  * @ 优惠劵
  * ***/
  refresh_member_account_info: function (param) {
    var api = 'v2.wxmember/refresh_member_account_info';
    return request.method('post', api, param);
  },
  /***
 * 用户手机号+密码登录
 * ***/
  login_account: function (param) {
    var api = 'v2.wxmember/login_account';
    return request.method('post', api, param);
  },
  /***
   * 用户通过openID 登录
   ****/
  get_wx_memberOpenId: function (param) {
    var api = 'v2.user/checkLogin';
    return request.method('post', api, param);
  },
  /***
   * 个人中心获取会员信息
   * ***/
  get_member_info: function (param) {
    var api = 'v2.wxmember/get_member_info';
    return request.method('post', api, param);
  },
  /***
  * 个人中心获取会员信息
  * ***/
  get_payActivityList: function (param) {
    var api = 'v2.wxmember/payActivityList';
    return request.method('post', api, param);
  },
  /***
 * 个人中心获取会员钱包信息
 * ***/
  get_wallet: function (param) {
    var api = 'v2.wxmember/wallet';
    return request.method('post', api, param);
  },
  /***
* 个人中心获取会员支收列表
* ***/
  get_accountRecordList: function (param) {
    var api = 'v2.wxmember/accountRecordList';
    return request.method('post', api, param);

  },
  /***
* 充值接口
* ***/
  member_rechange_buy: function (param) {
    var api = 'v2.wxmember/change';
    return request.method('post', api, param);

  }
};