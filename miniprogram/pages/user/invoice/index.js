var e = getApp(), invoice = require("../../../apiFetch/invoiceApi.js")
Page({
  data: {
    isInvoice: !1,
    invoiceId: "",
    type: 1,
    company: "",
    taxpayerNumber: "",
    title: "",
    receiveMobile: "",
    receiveMail: "",
    detailRemark: "",
    invoiceList: [],
    invoiceAmount: 0
  },
  onLoad: function () {

    this.getData();
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  invoiceIsFalse: function () {
    this.setData({
      isInvoice: !1
    });
  },
  invoiceIsTrue: function () {
    this.data.isInvoice || (this.setData({
      isInvoice: !0
    }), this.setInvoiceInfo());
  },
  changeCompany: function () {
    1 != this.data.type && (this.setData({
      type: 1
    }), this.setInvoiceInfo());
  },
  changeOwn: function () {
    2 != this.data.type && (this.setData({
      type: 2
    }), this.setInvoiceInfo());
  },
  setInvoiceInfo: function () {
    var e = this, t = this.data, i = t.type, a = t.invoiceList;
    this.setData({
      invoiceId: ""
    }), 0 != a.length && a.forEach(function (t) {
      t.type == i && e.setData({
        isInvoice: !0,
        invoiceId: t.id,
        company: t.company,
        taxpayerNumber: t.taxpayerNumber,
        title: t.title,
        receiveMobile: t.receiveMobile,
        receiveMail: t.receiveMail,
        detailRemark: t.detailRemark
      });
    });
  },
  companyInput: function (e) {
    this.setData({
      company: e.detail.value
    });
  },
  taxpayerNumberInput: function (e) {
    var t = e.detail.value.replace(/\W/g, "");
    return this.setData({
      taxpayerNumber: t
    }), t;
  },
  titleInput: function (e) {
    this.setData({
      title: e.detail.value
    });
  },
  receiveMobileInput: function (e) {
    this.setData({
      receiveMobile: e.detail.value
    });
  },
  receiveMailInput: function (e) {
    this.setData({
      receiveMail: e.detail.value
    });
  },
  detailRemarkInput: function (e) {
    this.setData({
      detailRemark: e.detail.value
    });
  },
  goInvoiceIntro: function () {
    wx.navigateTo({
      url: "/pages/user/invoice/invoice-info"
    });
  },
  formSubmit: function (t) {
    var i = this.data, a = i.isInvoice, n = i.invoiceId, o = i.type, c = i.company, s = i.taxpayerNumber, l = i.title, r = i.receiveMobile, v = i.receiveMail, u = t.detail.value.textarea;
    if (a) {
      if (1 == o) {
        if (!c) return void wx.showToast({
          title: "请填写单位名称",
          icon: "none"
        });
        if (!s) return void wx.showToast({
          title: "请填写纳税人识别号",
          icon: "none"
        });
      } else if (2 == o && !l) return void wx.showToast({
        title: "请输入发票抬头",
        icon: "none"
      });
      if (r && !/^1[3|4|5|6|7|8|9]\d{9}$/.test(r)) return void wx.showToast({
        title: "手机号码格式不正确",
        icon: "none"
      });
      if (!/.com$/.test(v)) return void wx.showToast({
        title: "请输入以 .com 结尾的邮箱",
        icon: "none"
      });
      invoice.setInvoiceDeafult({
        invoiceId: n,
        type: o,
        company: c,
        taxpayerNumber: s,
        title: l,
        receiveMobile: r,
        receiveMail: v,
        detailRemark: u
      }).then(function (e) {
        console.log(e),
          wx.showToast({
            title: e.message,
            icon: "none"
          });
      }).catch(function (e) {
        console.log(e, 999);
      });
    } else console.log(1), wx.setStorageSync("invoiceDetailId", ""), wx.setStorageSync("changeType", 4),
      wx.navigateBack();
  },
  getData: function () {
    var t = this;
    invoice.getInvoiceDeafult().then(function (e) {
      console.log(e), 0 == e.errcode ? (t.setData({
        invoiceList: e.data
      }), t.echoData()) : wx.showToast({
        title: e.errmsg,
        icon: "none"
      });
    }).catch(function (e) {
      console.log(e, 999);
    });
  },
  echoData: function () {
    var e = this, t = this.data, i = t.invoiceId, a = t.invoiceList;
    i ? a.forEach(function (t) {
      t.id == i && e.setData({
        isInvoice: !0,
        type: t.type,
        company: t.company,
        taxpayerNumber: t.taxpayerNumber,
        title: t.title,
        receiveMobile: t.receiveMobile,
        receiveMail: t.receiveMail,
        detailRemark: t.detailRemark
      });
    }) : this.setData({
      isInvoice: !1
    });
  }
});