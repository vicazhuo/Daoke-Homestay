var  e = require("../../../../common/js/utils.js"),
 i = function (t) {
  return t && t.__esModule ? t : {
    default: t
  };
}(require("../../../../apiFetch/bookApi")), a = require("../../utils/index");

Page({
  data: {
    contactList: [],
    selectPeople: [],
    isSelectNumber: !1,
    title: "",
    isLoading: !1,
    PWA_STATIC_TUJIA_HOST:""
  },
  prevId: "",
  isIns: "",
  isSeaOver: !1,
  oldContactList: {},
  onLoad: function (t) {
    console.log("======>", t)
    this.init(t);
    this.getContactList(t);
  },
  init: function (t) {
    var e = t.type, i = t.houseCount, a = void 0 === i ? 1 : i, n = t.isSeaOver, s = void 0 !== n && n, o = "1" === e;
    this.isIns = "1" === e;
    var c = o ? "投保人" : "入住人";
    this.isSeaOver = s, o && wx.setNavigationBarTitle({
      title: c
    }), this.setData({
      title: c,
      houseCount: a,
      isIns: o
    });
  },
  radioChange: function (t) {
    var i = this, a = t.currentTarget.dataset.index, n = this.data, s = n.houseCount, o = n.isIns, c = n.contactList, r = c[a];
    if (r.isNoInfo) return this.peopleItemClick({
      currentTarget: {
        dataset: {
          id: r.contactId
        }
      }
    });
    var l = !r.isSelect;
    if (l && s > 1 && c.filter(function (t) {
      return t.isSelect;
    }).length == s) return (0, e.toast)("投保人至多只能添加" + s + "个");
    if (l && o && !r.idTypeInfo) return (0, e.toast)("证件号码不能为空");
    var d = {};
    if (r.isSelect = l, 1 == s && l && "" !== this.prevId) {
      var u = c.find(function (t) {
        return t && t.contactId === i.prevId;
      });
      u ? u.isSelect = !1 : this.prevId = "";
    }
    d.contactList = c, d.isSelectNumber = this.computedIsSelect(c), this.setData(d),
      this.prevId = l ? r.contactId : "";
  },
  computedIsSelect: function (t) {
    return !!t.find(function (t) {
      return t && t.isSelect;
    }) || null;
  },
  delPeople: function (t) {
    var a = this, n = t.currentTarget.dataset.index, s = this.data, o = (s.isSelectNumber,
      s.contactList), c = o[n];
    i.default.delContact(c.contactId).then(function () {
      (0, e.toast)("删除成功");
      var t = {};
      c.isSelect && (o[n].isSelect = !1, t.isSelectNumber = a.computedIsSelect(o)), o.splice(n, 1),
        t.contactList = o, a.setData(t), a.oldContactList.splice(n, 1);
    }).catch(function (t) {
      (0, e.toast)(t.errorMsg || "删除失败");
    });
  },
  getContactList: function (t) {

    var n = this, s = typeof t.ids == "string" ? t.ids : String(t.ids), o = getApp();
 
    this.setData({
      isLoading: !0
    }), wx.showLoading({
      title: "加载中..."
    });
    i.default.getContactList(!1).then(function (t) {

      if (t) {
        var e = t.data, i = void 0, c = !1;
        var lsd;
        if (o.globalData.bookingData.setContactList(e || []), e) {
          n.oldContactList = e;
          var r = (e = (0, a.contactListFilter)(e, n.isSeaOver))[0];
            s || 1 !== e.length || r.isNoInfo || n.isIns && !r.idTypeInfo || (s = r.contactId);
            lsd = s = "string" == typeof s ? s.split(",") : s ; 
          console.log(lsd)
            s && lsd.forEach(function (t) {
              if (-1 !== (i = e.findIndex(function (e) {
                return e.contactId === t;
              }))) {
                if (n.isIns && !e[i].idTypeInfo) return;
                c = !0, e[i].isSelect = !0, n.prevId = e[i].contactId;
              }
            });
            n.setData({
              contactList: e,
              isSelectNumber: c
            });
        }
      }
    }).catch(function (t) {
      console.log(t), (0, e.errorShowTip)(t.errorMsg || "入住人数据异常，请重试");
    }).finally(function () {
      n.setData({
        isLoading: !1
      }), wx.hideLoading();
    });
  },
  peopleListSubmit: function () {
    var t = this, i = this.data.contactList;
    if (this.data.isSelectNumber) {
      var a = [];
      i.forEach(function (e, i) {
        e && e.isSelect && (t.oldContactList[i].idType = e.lastIdType, a.push(t.oldContactList[i]));
      }), (0, e.execPrevPageCallback)("selectPeopleCallBack", a, this.isIns);
    }
  },
  peopleItemClick: function (t) {
    var i = t.currentTarget.dataset.id, a = this.isIns, n = this.isSeaOver;
    wx.navigateTo({
      url: (0, e.createUrlParamsString)("/pages/book/pages/addPeople/addPeople", {
        id: i,
        type: a ? 1 : null,
        isSeaOver: n
      })
    });
  },
  addPeople: function () {
    var t = this.isIns, i = this.isSeaOver;
    wx.navigateTo({
      url: (0, e.createUrlParamsString)("/pages/book/pages/addPeople/addPeople", {
        type: t ? 1 : null,
        isSeaOver: i
      })
    });
  },
  formBtn: function (t) {
    (0, e.formBtn)(t);
  },
  addPeopleCallback: function (t, e) {

    var i = this.data.contactList.filter(function (t) {
      return t && t.isSelect;
    }).map(function (t) {
      return t.contactId;
    }).join(",");
    
    if(i==''){
      i = String(t.contactId);
    }
    this.getContactList({ ids: i })
    
  }
});