var a, n = require("../../../apiFetch/userApi.js"),
  o = require("../../../apiFetch/tjFetch2"),
  s = require("../../../common/js/tjRequest.js"),
  r = require("../../../common/js/utils.js");

Page({
  data: (
    a = {
    user: {
      status: 0,
      avatarUrl: "",
      nickName: "",
      mobile: "",
      userTitle: ""
    },
    DAOKE_STATIC_HOST: getApp().globalStaticUrl,
    showRecommendQuickbass: true,
    loadingHidden: !1,
    assets: {
      integrationCount: "0",
      accBalanceCount: "0.00",
      giftCardAmountCount: "0.00",
      prepayCardAmountCount: "0.00"
    },
    isLogin: !1,
    isAlreadyLogin: !1,
    openId: "",
    userStatus: "1",
    redPacketCount: 0,
    isBtnShow: !1
  }),
  onLoad: function (e) { },
  onReady: function () { },
  onShow: function () {
    var e = this, t = this;
    t.getWxUser(), t.getAssets(), t.setData({
      isBtnShow: !1
    });
    try {
      wx.getStorageSync("tjUserInfoKey") ? t.setData({
        isBtnShow: !0
      }) : t.userAuthCheck();
    } catch (e) {
      t.userAuthCheck();
    }
    n.default.getredpacketcount().then(function (t) {
      e.setData({
        redPacketCount: t.redPacketCount
      });
    });
  },
  onHide: function () { },
  onUnload: function () { },
  getWxUser: function () {
    var e = this, t = getApp(), a = 0, n = "", o = t.globalData.globalLogo, s = "", r = "", m = '',
      i = t.globalUserInfo.wxUserInfo, u = t.globalUserInfo.tjUserInfo, c = t.curUserLogoff, g = t.userIsLogin();
    i && !c && (a = 1, n = i.nickName, o = i.avatarUrl, m = i.memberCardImg), g && (a = 2, s = u.mobile,
      r = u.userTitle, null == i && "" != u.avatarUrl && (o = u.avatarUrl));
    if (u.memberCardImg) {
      m = u.memberCardImg
    }
    e.setData({
      user: {
        status: a,
        nickName: n,
        avatarUrl: o,
        mobile: s,
        memberCardImg: m,
        userTitle: r
      },
      isLogin: g
    });
    console.log(e.data.user)

  },
  getAssets: function () {
    var e = this, a = getApp(), n = a.globalConfig;
    a.userIsLogin;
    a.userIsLogin() ? (e.setData({
      loadingHidden: !0
    }), s.tjPost({
      url: n.WechatCustomerUri + n.UserAssets,
      data: { appid: a.siteInfo.appid, appkey: a.siteInfo.appkey },
      openLoginType: "no",
      success: function (a) {
        if (e.setData({
          loadingHidden: !1
        }), 1001 == a.data.errorCode) e.onShow(); else if (a.data.isSuccess) {
          var n = a.data.data;
          null != n && e.setData({
            assets: t({
              integrationCount: parseInt(n.integrationCount),
              accBalanceCount: parseFloat(n.accBalanceCount).toFixed(2),
              giftCardAmountCount: parseFloat(n.giftCardAmountCount).toFixed(2),
              prepayCardAmountCount: parseFloat(n.prepayCardAmountCount).toFixed(2)
            }, "prepayCardAmountCount", parseFloat(n.prepayCardAmountCount).toFixed(2))
          });
        }
      },
      fail: function () {
        e.setData({
          loadingHidden: !1
        }), wx.showModal({
          content: a.netFailMsg,
          showCancel: !1
        });
      }
    })) : e.setData({
      assets: {
        integrationCount: 0,
        accBalanceCount: "0.00",
        giftCardAmountCount: "0.00",
        prepayCardAmountCount: "0.00",
        redpacketCount: 0
      }
    });
  },
  logOff: function () {
    var e = this;
    wx.showModal({
      content: "请确认是否退出登录？",
      cancelText: "否",
      confirmText: "是",
      success: function (t) {
        if (t.confirm) {
          var a = getApp(), n = a.globalConfig;
          a.userIsLogin() && (e.setData({
            loadingHidden: !0
          }), s.tjPost({
            url: n.WechatCustomerUri + n.LogOff,
            data: { appid: a.siteInfo.appid, appkey: a.siteInfo.appkey },
            success: function (t) {
              e.setData({
                loadingHidden: !1
              }), t.data.isSuccess && a.logOffTjUser(e.onShow);
            },
            fail: function () {
              e.setData({
                loadingHidden: !1
              }), wx.showModal({
                content: a.netFailMsg,
                showCancel: !1
              });
            }
          }));
        }
      }
    });
  },
  showintegrationToast: function () {
    getApp().userIsLogin() ? wx.showModal({
      content: "迟一点会加入微信卡包功能，里面会有积分",
      confirmText: "知道了",
      showCancel: !1
    }) : wx.navigateTo({
      url: "/pages/user/login/login"
    });
  },
  showRedBagPage: function () {
    getApp().userIsLogin() ? wx.navigateTo({
      url: "/pages/user/redpacket/redpacket"
    }) : wx.navigateTo({
      url: "/pages/user/login/login?nextPath=/pages/user/redpacket/redpacket&openType=redirect"
    });
  },
  playbus: function () {
    wx.showToast({
      title: '功能正在开发中',
      icon: 'none'
    })
  },
  toulsCrad: function () {
    getApp().userIsLogin() ? wx.navigateTo({
      url: "/pages/user/card/card"
    }) : wx.navigateTo({
      url: "/pages/user/login/login?nextPath=/pages/user/redpacket/redpacket&openType=redirect"
    });
  },
  showMemberInerests: function () {

    getApp().userIsLogin() ? wx.navigateTo({
      url: "/pages/user/interests/interests"
    }) : wx.navigateTo({
      url: "/pages/user/login/login?nextPath=/package/pages/user/interests/interests"
    });

  },
  showFapiaoPage: function () {

    getApp().userIsLogin() ? wx.navigateTo({
      url: "/pages/user/invoice/index"
    }) : wx.navigateTo({
        url: "/pages/user/login/login?nextPath=/package/pages/user/invoice/index"
    });
  },
  showMomeyPage: function () {

    getApp().userIsLogin() ? wx.navigateTo({
      url: "/pages/user/money/index"
    }) : wx.navigateTo({
      url: "/pages/user/login/login?nextPath=/pages/user/money/index"
    });

  },
  showRedBagToast: function () {
    getApp().userIsLogin() ? wx.showModal({
      content: "迟一点会加入微信卡包功能，里面会有优惠劵",
      confirmText: "知道了",
      showCancel: !1
    }) : wx.navigateTo({
      url: "/pages/user/login/login"
    });
  },
  showaccBalanceToast: function () {
    getApp().userIsLogin() ? wx.showModal({
      content: "迟一点会加入微信卡包功能，里面会有余额",
      confirmText: "知道了",
      showCancel: !1
    }) : wx.navigateTo({
      url: "/pages/user/login/login"
    });
  },
  showCardToast: function () {
    getApp().userIsLogin() ? wx.navigateTo({
      url: "/pages/user/card/card"
    }) : wx.navigateTo({
      url: "/pages/user/login/login?nextPath=/pages/user/card/card&openType=redirect"
    });
  },
  showPrePayCardToast: function () {
    getApp().userIsLogin() ? wx.navigateTo({
      url: "/pages/user/prepayCard/prepayCard"
    }) : wx.navigateTo({
      url: "/pages/user/login/login?nextPath=/pages/user/prepayCard/prepayCard&openType=redirect"
    });
  },
  showInvoice: function () {
    wx.navigateTo({
      url: "/package/pages/user/invoice/invoice"
    });
  },
  goOrderList: function (e) {
    var t = getApp(), a = parseInt(e.currentTarget.dataset.current);
    t.myOrderSelectTab = a, 0 == a ? wx.navigateTo({
      url: "/pages/user/orderList/getAllOrders/index"
    }) : wx.switchTab({
      url: "/pages/user/orderList/orderList"
    });
  },
  userAuthCheck: function () {
    var e = this;
    getApp().checkLogin(function (t) {
      t.userId ? e.setData({
        openId: t.openId,
        isAlreadyLogin: !0,
        userStatus: "2",
        isBtnShow: !0
      }) : e.setData({
        openId: t.openId,
        isAlreadyLogin: !1,
        userStatus: "1",
        isBtnShow: !0
      });
    }, function (t) {
      console.log("checkLogin fail"), e.setData({
        isAlreadyLogin: !0,
        isBtnShow: !0
      });
    });
  },
  openDataError: function (e) {
    console.log("openDataError:--监听开放功能的错误", e);
  },
  getPhoneNumber: function (e) {
    var t = this;
    e.userStatus = this.data.userStatus, console.log("openID:", this.data.openId), e.openId = this.data.openId;
    var a = getApp();
    wx.showLoading({
      title: "加载中..."
    }), this.isAlreadyLogin ? wx.hideLoading() : a.decryptPhoneNumber(e).then(function () {
      a.initWxUserInfo(null, function () {
        t.setData({
          isGetUserInfoPopup: !0
        });
      }), wx.hideLoading(), t.getWxUser();
    }).catch(function () {
      wx.hideLoading(), wx.navigateTo({
        url: "/pages/user/login/login"
      }), t.getWxUser();
    });
  },
  getUserInfoPopupClose: function () {
    this.setData({
      isGetUserInfoPopup: !1
    });
  },
  getUserInfoPopupSuccess: function (e) {
    var t = e.detail;
    t && t.avatarUrl && this.setData({
      "user.avatarUrl": t.avatarUrl
    });
  }
});