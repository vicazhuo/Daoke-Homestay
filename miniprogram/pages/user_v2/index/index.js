function t(t, e, a) {
  return e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}

var e = getApp(),
  s = require("../../../common/js/tjRequest.js"),
  u = require("../../../common/js/utils.js"),
  memberApi = require("../../../apiFetch/member.js");
Page({
  data: {
    userInfo: null,
    userId: "",
    isLogin: !1,
    isGetUserInfoPopup: true,
    notSubscribed: false,
    skinColor: e.skinColor,//背景颜色
    investmentintroUrl: '',
    landlordintroUrl: '',
    serverPhone: '',
    userInfoObj: {},
    isAuth: !1,
    loginIsAuth: !1,
    activeInfo: null,
    mobile: "",
    nickname: "",
    headImageUrl: "",
    userLevel: 0,
    userLevelName: "",
    payGiftRemainAmount: 0,
    backRemainAmount: 0,
    totalSaveAmount: 0,
    couponCount: 0,
    payActivityIntroList: [],
    inviteModalIsShow: !1,
    mergeImgIsShow: !1,
    writePhotosAlbumIsAllow: !1,
    mergeImgPath: "",
    isInvestors: !1,
    bannerManage: null,
    backgroundImageUrl: '',
    isShowrechange:true, 
    isShowinves: true,
    isShowlandlord: true,
    isShowcolle: true,
    isShowserver: true
  },
  onLoad: function (t) {
    var a = this, g = wx.getStorageSync("globalConfig");
    this.setData({
      landlordintroUrl: g.landlord,
      investmentintroUrl: g.investment
    });
    // 设置导航条
    wx.setNavigationBarTitle({
      title: "个人中心",
    });
    if (e.userIsLogin()) {
      this.getData();
    }
    //获取广告数据
    e.getBannerManage((bannerData) => {
      this.setData({ bannerManage: bannerData })
    })
  },
  onReady: function () {

  },
  onShow: function () {
    var t = this;
    //获取用户信息
    t.getWxUser();
  },
  onHide: function () {
    wx.removeStorageSync("ownPageRefresh");
  },
  onUnload: function () { },
  onPullDownRefresh: function () {

    this.getData();
  },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    return {
      title: "【" + e.globalData.globalName + "】储值升级VIP，单单返现金，预订民宿更划算！",
      path: "/pages/index/index?return_share=" + this.data.userId,
      imageUrl: 'https://m.iyoujia.com/images/vip/fxhy@2x.png'
    };
  },
  phoneCall: function () {
    wx.navigateTo({
      url: "/pages/user/customerService/customerService"
    });
  },
  collection: function () {
    wx.navigateTo({
      url: "/pages/collection/collection"
    });
  },
  getWxUser: function () {
    this.setData({
      userInfo: e.globalUserInfo.tjUserInfo,
      isLogin: e.userIsLogin(),
      isAuth: true,
      serverPhone: e.globalserviceline
    });
    console.log(this.data.userInfo)

  },
  getData: function () {
    memberApi.get_wallet().then((res) => {
      console.log(res.data)
      if (res.errcode == 0) {
        this.setData({
          payGiftRemainAmount: res.data.payGiftRemainAmount,
          backRemainAmount: res.data.backRemainAmount,
          couponCount: res.data.couponCount,
          totalSaveAmount: res.data.totalBackAmount,
          activeInfo: res.data.activeInfo,
          backgroundImageUrl: res.data.backgroundImageUrl,
          investmentintroUrl: res.data.webview1,
          landlordintroUrl: res.data.webview2,
          isShowrechange: res.data.isShowrechange,
          isShowinves: res.data.isShowinves,
          isShowlandlord: res.data.isShowlandlord,
          isShowcolle: res.data.isShowcolle,
          isShowserver: res.data.isShowserver
        });

      }
    })

  },
  getAssets: function () {
    wx.navigateTo({
      url: "/pages/user_v2/wallet/wallet"
    });
  },
  goCoupon: function () {
    wx.navigateTo({
      url: "/pages/user/redpacket/redpacket"
    });

  },
  goAuthorize: function () {
    var e = this;
    var parentsId = wx.getStorageSync("parentsId") ? wx.getStorageSync("parentsId") : 0;
    //判断登录
    if (this.data.isLogin) {


    } else {
      wx.login({
        success: function (res) {
          memberApi.get_wx_memberOpenId({ code: res.code, parentsId: parentsId }).then((res) => {
            if (res.errcode == 0) {
              //没有微信用户信息
              if (res.data.nickname == '') {
                e.setData({
                  isGetUserInfoPopup: false,
                  notSubscribed: true
                })
              }
              //没有手机号码
              if (res.data.showMobile == '') {
                e.setData({
                  isGetUserInfoPopup: false
                })
              }


              //设置登录信息
              getApp().setTjUserInfo(res.data);
              //执行登录
              e.getWxUser();
              wx.showToast({
                title: '登录成功',
                icon: 'none'
              });
              e.getData();
            }
          })
        }
      })

    }
  },
  /**
   * 登录组件回调方法
   * 
   * **/
  callbackEvent: function (e) {

    console.log(e)
  },
  /****
   *H5网页
   *****/
  goWebView: function (event) {
    var h5Url = event.currentTarget.dataset.url;
    t && (0, u.openWebview)(h5Url);
  },
  logout: function () {
    var e = this;
    wx.showModal({
      content: "请确认是否退出登录？",
      cancelText: "否",
      confirmText: "是",
      success: function (t) {
        if (t.confirm) {
          var a = getApp(),
            n = a.globalConfig;
          a.userIsLogin() && (e.setData({
            loadingHidden: !0
          }),
            s.tjPost({
              url: n.WechatCustomerUri + n.LogOff,
              data: {
                appid: a.siteInfo.appid,
                appkey: a.siteInfo.appkey
              },
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
  modalLeftEvent: function (e) {
    this.setData(t({}, "modalSetting.modalIsShow", !1));
  },
  goNewPullMain: function () {
    wx.navigateTo({
      url: "/pages/activity/newPullMain/newPullMain"
    });
  },
  goMember: function () {
    wx.navigateTo({
      url: "/pages/user_v2/member/index"
    });
  },
  goMember2: function () {
    wx.navigateTo({
      url: "/pages/user_v2/member/index?from=0"
    });
  },
  goWallet: function () {
    wx.navigateTo({
      url: "/pages/user_v2/wallet/wallet"
    });
  },
  showInviteModal: function () {
    wx.showShareMenu(), this.setData({
      inviteModalIsShow: !0
    });
  },
  hideInviteModal: function () {
    wx.hideShareMenu(), this.setData({
      inviteModalIsShow: !1
    });
  },
  showMergeImg: function () {
    var t = this;
    this.setData({
      mergeImgIsShow: !0,
      inviteModalIsShow: !1
    }, function () {
      t.mergeImg();
    });
  },
  hideMergeImg: function () {
    this.setData({
      mergeImgIsShow: !1
    });
  },
  mergeImg: function () {
    var t = this;
    wx.showLoading({
      title: "正在加载"
    });
    var a = e.siteInfo.apiurl + "v2.wxmember/invitePayAppCode?appid=" + e.siteInfo.appid + "&userId=" + this.data.userInfo.userId;
    console.log(a), a ? wx.downloadFile({
      url: a,
      success: function (e) {
        var a = this;
        if (console.log(e, 888), 200 == e.statusCode) {
          var o = e.tempFilePath,
            i = wx.createCanvasContext("myCanvas");
          i.drawImage("../../images/activity/pyq1@2x.png", 0, 0, 300, 340), i.drawImage(o, 100, 180, 100, 100),
            i.draw(!1, function () {
              wx.hideLoading(), wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function (e) {
                  t.setData({
                    mergeImgPath: e.tempFilePath
                  }), t.getSaveScope();
                }
              }, a);
            });
        } else wx.hideLoading();
      }
    }) : wx.hideLoading();
  },
  getSaveScope: function () {
    var t = this;
    wx.getSetting({
      success: function (e) {
        e.authSetting["scope.writePhotosAlbum"] ? t.setData({
          writePhotosAlbumIsAllow: !0
        }) : wx.authorize({
          scope: "scope.writePhotosAlbum",
          success: function (e) {
            t.setData({
              writePhotosAlbumIsAllow: !0
            });
          },
          fail: function (e) {
            t.setData({
              writePhotosAlbumIsAllow: !1
            });
          }
        });
      }
    });
  },
  opensettingCbk: function (t) {
    t.detail.authSetting["scope.writePhotosAlbum"] && (this.setData({
      writePhotosAlbumIsAllow: !0
    }), this.saveMergeImg());
  },
  saveMergeImg: function () {
    var t = this;
    wx.saveImageToPhotosAlbum({
      filePath: this.data.mergeImgPath,
      success: function (e) {
        wx.showToast({
          title: "图片保存成功"
        }), setTimeout(function () {
          t.setData({
            mergeImgIsShow: !1,
            inviteModalIsShow: !1,
            getCouponPopIsShow: !1
          });
        }, 1e3);
      }
    });
  },
  preventTouchMove: function () { },

});