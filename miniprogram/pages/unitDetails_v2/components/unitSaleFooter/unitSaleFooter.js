function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

var e = t(require("../../../../common/js/utils")), i = t(require("../../../../apiFetch/commonApi"));

Component({
  properties: {
    productsList: Array,
    dateDescObj: Object,
    getProductFail: Boolean,
    footerLoading: Boolean,
    isNeedShiPei: Boolean,
    landlordId: String,
    selectDate:String,
    chatId: {
      type: Number,
      value: 0
    }
  },
  data: {
    isWxApp: true,
    isAlreadyLogin: !1,
    openId: "",
    userStatus: "1",
    PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
  },
  ready: function () {
    console.log(this.data)
    this.userAuthCheck();
    console.log(this.data.productsList)
  },
  methods: {
    userAuthCheck: function () {
      var t = this, e = this;
      getApp();
      this.triggerEvent("editFooterLoading", {
        status: !0
      }), i.default.checkLogin().then(function (n) {
        n.userId ? e.setData({
          openId: n.openId,
          isAlreadyLogin: !0,
          userStatus: "2"
        }) : n && n.openId && e.setData({
          userStatus: "1",
          openId: n.openId,
          isAlreadyLogin: !1
        }), t.triggerEvent("editFooterLoading", {
          status: !1
        });
      }).catch(function (n) {
        n && n.openId && e.setData({
          userStatus: "1",
          openId: dt.openId
        }), e.setData({
          isAlreadyLogin: !1
        }), t.triggerEvent("editFooterLoading", {
          status: !1
        });
      });
    },
    getPhoneNumber: function (t) {
      var e = this;
      if (t.userStatus = this.data.userStatus, t.openId = this.data.openId, t.landlordId = this.data.landlordId,
        this.data.isAlreadyLogin) this.navBuyPage(t); else {
        var n = t.detail, i = n.encryptedData;
        n.iv;
        if (i) if (this.data.openId) {
          wx.showLoading({
            title: "加载中..."
          });
          var o = getApp();
          o.decryptPhoneNumber(t).then(function () {

            o.initWxUserInfo(function () {
              e.navBuyPage(t);
            }, function () {
              e.initWxUserInfoCal(t);
            }), wx.hideLoading();
          }).catch(function () {
            wx.hideLoading();
          });
        } else wx.showToast({
          title: "用户信息获取异常",
          icon: "none"
        });
      }
    },
    navBuyPage: function (t) {
      this.triggerEvent("navBuyPage", {
        e: t
      });
    },
    initWxUserInfoCal: function (t) {
      this.triggerEvent("initWxUserInfoCal", {
        e: t
      });
    },
    formBtn: function (t) {
      e.default.formBtn(t);
    },
    callPhone: function (t) {
      this.triggerEvent("callPhone", {
        e: t
      });
    },
    openChat: function (t) {
      this.triggerEvent("openChat", {
        e: t
      });
    },
    getProductAgain: function () {
      this.triggerEvent("getProductAgain");
    }
  }
});