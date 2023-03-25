function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

var e = t(require("../../../components/toast/toast")), i = t(require("../../../apiFetch/wifiApi.js")), n = require("../../../common/js/utils"), a = "pages/wifi_v2/wifiList/wifiList", s = getApp(), r = 0, l = !1;

Page({
  data: {
    isShowHelpPop: !1,
    hotelWifiList: [],
    amount: 0,
    count: 0,
    transfering_amount: 0,
    totalRegister: 0,
    wifiId: 15,
    enumWifiType: 0,
    isActive: !0,
    activeText: "",
    canvasWidth: 1242,
    canvasHeight: 1686,
    writePhotosAlbum: !0,
    isNeedMoreLoading: !1,
    isLoading: !1,
    checkLoginLoading: !1,
    PWA_STATIC_TUJIA_HOST: s.globalStaticUrl,
    windowWidth: 0,
    windowHeight: "",
    wifiListTotalCount: 0,
    wifiNumberWidth: "",
    wifiNumber: 0,
    wifiwidth: "",
    wifiname: ""
  },
  onLoad: function (t) {
    var e = this;
    console.log("wifilist", t);
    var o = wx.getSystemInfoSync();
    if (this.setData({
      windowWidth: o.windowWidth,
      windowHeight: o.windowHeight - 60
    }), t.tjusertoken && t.storeguid) wx.setStorageSync("userToken", t.tjusertoken),
      wx.setStorageSync("storeGuid", t.storeguid), this._getHotelWifiList(); else if (1 == t.scene) {
        var n = encodeURIComponent("/pages/wifi_v2/wifiList/wifiList");
        s.clearTjUserInfo(), wx.redirectTo({
          url: "/pages/wifi_v2/matAndWifi/wifiLogin/index?nextPath=" + n
        });
      } else {
      var a = "";
      a = wx.getStorageSync("userToken") ? wx.getStorageSync("userToken") : s.globalUserInfo.tjUserInfo.userToken,
        console.log(a), i.default.getStoreHomeInfo({
          userToken: wx.getStorageSync("userToken")
        }).then(function (t) {
          t.storeGuid ? (wx.setStorageSync("storeGuid", t.storeGuid), e._getHotelWifiList()) : wx.showModal({
            title: "提示",
            content: "请使用房东身份登录",
            showCancel: !1,
            success: function () {
              wx.switchTab({
                url: "/pages/index/index"
              });
            }
          });
        }).catch(function (t) {
          if (wx.showModal({
            title: "提示",
            content: "请使用房东身份登录",
            showCancel: !1,
            success: function () {
              wx.switchTab({
                url: "/pages/index/index"
              });
            }
          }), 60012 == t.errorNo) {
            var e = encodeURIComponent("/pages/wifi_v2/wifiList/wifiList");
            wx.redirectTo({
              url: "/pages/wifi_v2/matAndWifi/wifiLogin/index?nextPath=" + e
            });
          }
        });
    }
  },
  onShow: function () {
    console.log("onShow"), r = 0, this._getHotelWifiList();
  },
  onHide: function () {
    console.log("onHide");
  },
  byTujia: function () {
    wx.navigateTo({
      url: "/pages/wifi_v2/matAndWifi/applyMatterList/applyMatterList"
    });
  },
  bySelf: function () {
    wx.navigateTo({
      url: "/pages/wifi_v2/matAndWifi/applyQrCode/addQrCode/index"
    });
  },
  toQRdetail: function (t) {
    console.log(t.target.dataset.id);
    var e = t.target.dataset.id;
    wx.navigateTo({
      url: "/pages/wifi_v2/matAndWifi/applyQrCode/completeQrCode/index?wifiid=" + e
    });
  },
  toDelete: function (t) {
    var e = this.data.hotelWifiList[t.target.dataset.idx].hotelWifiId, o = this;
    wx.showModal({
      title: "提示",
      content: "当前二维码已激活成功是否确认删除",
      cancelText: "放弃",
      success: function (t) {
        t.confirm ? (wx.showLoading(), i.default.deleteHotelWifi({
          wifiId: e,
          storeGuid: wx.getStorageSync("storeGuid"),
          userToken: wx.getStorageSync("userToken")
        }).then(function (t) {
          o._getHotelWifiList();
        }).catch(function (t) {
          console.log(t), (0, n.setTjLog)({
            page: a,
            errorType: "wifiList deleteHotelWifi",
            errorMsg: t
          });
        }).finally(function () {
          wx.hideLoading();
        })) : t.cancel && console.log("点击取消");
      }
    });
  },
  toEdit: function (t) {
    console.log(t.target.dataset.idx);
    var e = this.data.hotelWifiList[t.target.dataset.idx];
    console.log(e);
    var i = e && e.hotelWifiId || "";
    wx.navigateTo({
      url: "/pages/wifi_v2/matAndWifi/applyQrCode/addQrCode/index?wifiid=" + i
    });
  },
  toSave: function (t) {
    var e = this.data.hotelWifiList[t.target.dataset.idx], i = e && e.enumQRCodeType;
    console.log(e), e && (this.setData({
      wifiname: this._getWexincodeTextTitle(e.name).str,
      wifiwidth: this._getWexincodeTextTitle(e.name).width,
      wifiNumber: e.hotelWifiId,
      wifiNumberWidth: this._getWexincodeTextTitle(e.hotelWifiId.toString()).width + this._getWexincodeTextTitle("Wi-Fi编号：").width
    }), this._createCanvas(e.url, this.data.wifiname, i, this.data.wifiNumber, this.data.wifiNumberWidth));
  },
  showHelp: function () {
    if (this.data.isShowHelpPop) this.setData({
      isShowHelpPop: !1
    }); else {
      this.setData({
        isShowHelpPop: !0
      });
      var t = this;
      setTimeout(function () {
        t.setData({
          isShowHelpPop: !1
        });
      }, 3500);
    }
  },
  onShareAppMessage: function () {
    return {
      title: "房客扫码连WiFi，房东轻松赚现金",
      imageUrl: o.PWA_TUJIA_HOST + "/static/wechat/wifitwo/wifi_share_icon.png"
    };
  },
  loadMoreEvent: function () {
    console.log("上拉加载"), l && this._getHotelWifiList(!0);
  },
  _getWexincodeTextTitle: function (t) {
    function e(t) {
      return !!new RegExp("[\\u4E00-\\u9FFF]").test(t);
    }
    var i = Math.floor((2 * this.data.windowWidth - 100 - 160 - 64) / 30), o = {};
    o.str = t.slice(0, i), o.width = i < o.str.length ? 30 * i : 30 * o.str.length;
    var n = "", a = 0, s = !0, r = !1, l = void 0;
    try {
      for (var c, d = o.str[Symbol.iterator](); !(s = (c = d.next()).done); s = !0) {
        var f = c.value;
        if (i < 0 || 0 == i) break;
        e(f) ? (n += f, a += 60, i -= 2) : (n += f, a += 30, i -= 1);
      }
    } catch (t) {
      r = !0, l = t;
    } finally {
      try {
        !s && d.return && d.return();
      } finally {
        if (r) throw l;
      }
    }
    return o.str = n, o.width = a, t.length > o.str.length && (e(o.str[o.str.length - 1]) || e(o.str[o.str.length]) ? (o.str = o.str.slice(0, o.str.length - 1) + "...",
      o.width = o.width - 30) : o.str = o.str.slice(0, o.str.length - 2) + "..."), o;
  },
  _getStrLen: function (t) {
    for (var e = 0, i = t.length, o = -1, n = 0; n < i; n++) e += (o = t.charCodeAt(n)) >= 0 && o <= 128 ? 1 : 2;
    return e;
  },
  _getHotelWifiList: function (t) {
    var e = this;
    wx.showLoading(), i.default.getHotelWifiList({
      storeGuid: wx.getStorageSync("storeGuid"),
      userToken: wx.getStorageSync("userToken"),
      pageIndex: r,
      pageSize: 10
    }).then(function (i) {
      if (console.log(i), e.setData({
        wifiListTotalCount: i.count
      }), 0 === i.count) wx.redirectTo({
        url: "/pages/wifi_v2/matAndWifi/index"
      }); else {
        var o = e.data.hotelWifiList;
        if (t && i.count > 10 && (r = ++r, e.setData({
          isNeedMoreLoading: !0
        })), r > 0) {
          var n = i.hotelWifiList;
          o = o.concat(n), e.setData({
            hotelWifiList: o
          });
        } else e.setData({
          hotelWifiList: i.hotelWifiList
        });
        e.setData({
          amount: i.amount,
          count: i.count,
          transfering_amount: i.transferingAmount,
          totalRegister: i.totalRegister
        }), l = i.hotelWifiList.length >= 10, e.setData({
          isNeedMoreLoading: l
        });
      }
    }).catch(function (t) {
      if (60012 == t.errorNo) {
        var e = encodeURIComponent("/pages/wifi_v2/wifiList/wifiList");
        wx.redirectTo({
          url: "/pages/wifi_v2/matAndWifi/wifiLogin/index?nextPath=" + e
        });
      } else (0, n.setTjLog)({
        page: a,
        errorType: "wifiList getHotelWifiList",
        errorMsg: t
      });
    }).finally(function () {
      wx.hideLoading();
    });
  },
  _createCanvas: function (t, e, i, s, r) {
    var l = this;
    console.log(this.data.windowWidth), console.log("wifiNumber-", r), this.setData({
      isLoading: !0
    });
    var c = wx.createCanvasContext("mycanvas");
    this.ctx = c, this._downLoadImg(o.PWA_STATIC_TUJIA_HOST + "/static/wechat/wifitwo/wifi_qrbg.jpg").then(function (d) {
      c.drawImage(d, 0, 0, l._getSize(375), l._getSize(500)), c.setFillStyle("#fff"),
        c.setFontSize(l._getSize(30)), c.fillText("" + e, (l.data.windowWidth - l._getSize(l.data.wifiwidth / 2) - l._getSize(37)) / 2 + l._getSize(37), l._getSize(71)),
        c.font = "normal 12px sans-serif", c.fillText("Wi-Fi编号：" + s, (l.data.windowWidth - l._getSize(r / 2) - l._getSize(37)) / 2 + l._getSize(67), l._getSize(395)),
        l._downLoadImg(o.PWA_STATIC_TUJIA_HOST + "/static/wechat/wifitwo/wifi.png").then(function (e) {
          c.drawImage(e, (l.data.windowWidth - l._getSize(l.data.wifiwidth / 2) - l._getSize(37)) / 2, l._getSize(44), l._getSize(32), l._getSize(32)),
            l._downLoadImg(t).then(function (t) {
              1 == i && (c.arc(l.data.windowWidth / 2, l._getSize(220), l._getSize(106), 0, 2 * Math.PI),
                c.setFillStyle("#fff"), c.fill()), c.drawImage(t, l.data.windowWidth / 2 - l._getSize(100), l._getSize(120), l._getSize(200), l._getSize(200)),
                c.draw(!0, function () {
                  l._saveImageToPhotosAlbumTap();
                });
            }).catch(function (t) {
              console.log("mpqr", t), (0, n.setTjLog)({
                page: a,
                errorType: "createCanvas wifi_qrbg",
                errorMsg: t
              });
            });
        });
    }).catch(function (t) {
      console.log(t), (0, n.setTjLog)({
        page: a,
        errorType: "createCanvas wifi_qrbg",
        errorMsg: t
      });
    });
  },
  _downLoadImg: function (t) {
    return new Promise(function (i, o) {
      wx.downloadFile({
        url: t,
        success: function (t) {
          console.log(t), 200 === t.statusCode ? i(t.tempFilePath) : (e.default.showToast({
            title: "图片生成失败",
            duration: 2e3
          }), o());
        },
        fail: function (t) {
          console.log(t), e.default.showToast({
            title: "图片生成失败",
            duration: 2e3
          }), o();
        },
        complete: function () { }
      });
    });
  },
  _saveImageToPhotosAlbumTap: function () {
    var t = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this._getSize(375),
      height: this._getSize(500),
      canvasId: "mycanvas",
      fileType: "jpg",
      success: function (e) {
        console.log("canvasToTempFilePath" + e), t._saveImageToPhotosAlbum(e.tempFilePath);
      },
      fail: function (e) {
        console.log(e), wx.showToast({
          title: "保存失败",
          icon: "none"
        }), t.setData({
          isLoading: !1
        });
      }
    }, this);
  },
  _saveImageToPhotosAlbum: function (t) {
    var e = this;
    console.log(t), wx.saveImageToPhotosAlbum({
      filePath: t,
      success: function (t) {
        console.log(t), e.setData({
          isLoading: !1
        }), e.setData({
          isSaveSuccess: !0
        }), wx.showToast({
          title: "保存成功"
        });
      },
      fail: function (t) {
        console.log(t), e._checkAuth().then(function () { }).catch(function (t) { }), wx.showToast({
          title: "保存失败",
          icon: "none"
        }), e.setData({
          isLoading: !1
        });
      }
    });
  },
  _getSize: function (t) {
    return t * (this.data.windowWidth / 375) + .5;
  },
  bindopensetting: function (t) {
    var e = t.detail.authSetting["scope.writePhotosAlbum"];
    this.setData({
      writePhotosAlbum: !!e
    });
  },
  _checkAuth: function () {
    var t = this;
    return new Promise(function (e, i) {
      wx.getSetting({
        success: function (o) {
          var n = o.authSetting["scope.writePhotosAlbum"];
          t.setData({
            writePhotosAlbum: !!n
          }), n ? e() : i();
        }
      });
    });
  }
});