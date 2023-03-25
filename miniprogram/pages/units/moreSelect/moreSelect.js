function e(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var t = function () {
  function e(e, t) {
    var n = [], i = !0, a = !1, r = void 0;
    try {
      for (var s, o = e[Symbol.iterator](); !(i = (s = o.next()).done) && (n.push(s.value),
        !t || n.length !== t); i = !0);
    } catch (e) {
      a = !0, r = e;
    } finally {
      try {
        !i && o.return && o.return();
      } finally {
        if (a) throw r;
      }
    }
    return n;
  }
  return function (t, n) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return e(t, n);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
}(), i = e(require("../../../apiFetch/searchApi")), a = e(require("../../../components/rangeSlider/priceRangeSlider/priceRangeSlider")), r = e(require("../../../components/rangeSlider/distanceRangeSlider/distanceRangeSlider")), s = getApp();

Page({
  data: {
    filterConditionGroup: [],
    PWA_STATIC_TUJIA_HOST: s.globalStaticUrl,
    conditionTypes: [],
    unitConditionTypes: [],
    isMoreSelectLoading: !1
  },
  onLoad: function (e) {
    var t = getCurrentPages(), n = t[t.length - 2], i = n.data.conditionsGroups;
    this.prePage = n;
    var a = n.conditionsTypeList, r = i.find(function (e) {
      return 1 == e.gType;
    }), s = a.filter(function (e) {
      return 1 != e.gType && "优惠" !== e.label;
    });
    this.setData({
      total: e.total || 0,
      unitConditionTypes: s
    }), r = this.setFilterSelectStatus(a, r), this.filterData(r, a);
  },
  setFilterSelectStatus: function (e, t) {
    console.log(e);
    var n = e.filter(function (e) {
      return 1 == e.gType || "优惠" === e.label;
    });
    return t.subGroups.forEach(function (e) {
      if (e.subGroups != null) {
        e.subGroups.forEach(function (e) {
          if (e.items != null) {
            e.items.forEach(function (e) {
              e.selected = !!n.find(function (t) {
                return t.value == e.value || e.label === t.label;
              });
            });
          }
        });
      }
    }), this.setData({
      conditionTypes: n
    }), t;
  },
  filterData: function (e, t) {
    var n = this.data.conditionTypes || t;
    e.subGroups.forEach(function (e, t) {
      e.subGroups.forEach(function (e, t) {
        var i = e.style;
        if (2 == e.style.displayType || 3 == i.displayType) {
          if (i.haveShowAllBtn = e.items.length > i.defaultLineCount * i.displayCountInline,
            n.length) for (var a = 0; a < e.items.length; a++) if (e.items[a].selected && a > 4) {
              i.isShowAllBtn = !0;
              break;
            }
          i.defaultLineCount = e.items.length < i.defaultLineCount ? 1 : i.defaultLineCount,
            i.lineCount = Math.ceil(e.items.length / i.displayCountInline);
        }
        6 == e.style.displayType && (e.showText = "不限", e.leftBtnDisabled = !0);
      });
    }), this.createPriceSlider(e), this.createDisSlider(e), n.length && e.subGroups.forEach(function (e, t) {
      e.subGroups.forEach(function (e, i) {
        if (6 == e.style.displayType) {
          var a = t + "_" + i, r = n.find(function (e) {
            return e.isItemType === a;
          });
          if (!r) return;
          e.showText = r.label, e.leftBtnDisabled = "不限" === e.showText, e.rightBtnDisabled = !!r && e.items[e.items.length - 1].label === r.label;
        }
      });
    }), this.setData({
      filterConditionGroup: e
    });
  },
  resetOptions: function () {
    var e = this.prePage.data.oldFilterConditionGroup;
    this.setData({
      filterConditionGroup: e,
      conditionTypes: []
    }), this.filterData(e), this.prePage.clearFilterCondition(), this.getHouseList();
  },
  unique: function (e) {
    for (var t = [], n = {}, i = 0; i < e.length; i++) n[e[i]] || (t.push(e[i]), n[e[i]] = 1);
    return t;
  },
  downIconTap: function (e) {
    var t = e.currentTarget.dataset.key, n = this.data.filterConditionGroup, i = this.findIndex(t), a = i.index, r = i.parentIndex, s = n.subGroups[r].subGroups[a].style;
    s.isShowAllBtn = !s.isShowAllBtn, this.setData({
      filterConditionGroup: n
    });
  },
  itemTap: function (e) {
    var t = e.currentTarget.dataset.key, n = this.data.filterConditionGroup, i = this.findIndex(t, 3), a = i.index, r = i.itemIndex, s = i.parentIndex, o = n.subGroups[s].subGroups[a], u = o.items[r];
    if (u.selected = !u.selected, "出租类型" === o.label) {
      var l = o.items.find(function (e) {
        return e.value != u.value;
      });
      u.selected && (l.selected = !1), u.isItemType = "buyType", this.conditionTypeChange(u, u.selected ? "replace" : "delete", "buyType");
    } else this.conditionTypeChange(u);
    this.setData({
      filterConditionGroup: n
    });
  },
  peopleLessChange: function (e) {
    var t = e.currentTarget.dataset.key, n = this.data.filterConditionGroup, i = this.findIndex(t), a = i.index, r = (i.itemIndex,
      i.parentIndex), o = r + "_" + a, u = n.subGroups[r].subGroups[a], l = u.items.findIndex(function (e) {
        return e.label == u.showText;
      }), d = void 0;
    l = "不限" === u.showText ? 1 : l, u.leftBtnDisabled || (u.showText === u.items[0].label ? (u.leftBtnDisabled = !0,
      u.showText = "不限") : (l-- , u.showText = u.items[l].label), d = u.items[l], u.rightBtnDisabled = !1,
      this.setData({
        filterConditionGroup: n
      }), d.isItemType = o, this.conditionTypeChange(d, "不限" !== u.showText ? "replace" : "delete", o),
      s.globalGio("track", "shuaixuan_weizhi_jiage_renshu_chuangpu", {
        shuaixuan_text: "shuaixuan_" + ("1_1" === d.isItemType ? "renshu" : "chuangpu") + "_" + u.showText
      }));
  },
  peopleMoreChange: function (e) {
    var t = e.currentTarget.dataset.key, n = this.data, i = n.filterConditionGroup, a = (n.conditionTypes,
      this.findIndex(t)), r = a.index, o = (a.itemIndex, a.parentIndex), u = o + "_" + r, l = i.subGroups[o].subGroups[r], d = l.items.findIndex(function (e) {
        return e.label == l.showText;
      }), c = void 0;
    d = "不限" === l.showText ? -1 : d, l.rightBtnDisabled || (d++ , c = l.items[d], l.showText = c.label,
      l.showText === l.items[l.items.length - 1].label && (l.rightBtnDisabled = !0), l.leftBtnDisabled = !1,
      this.setData({
        filterConditionGroup: i
      }), c.isItemType = u, this.conditionTypeChange(c, "replace", u), s.globalGio("track", "shuaixuan_weizhi_jiage_renshu_chuangpu", {
        shuaixuan_text: "shuaixuan_" + ("1_1" === c.isItemType ? "renshu" : "chuangpu") + "_" + l.showText
      }));
  },
  findIndex: function (e, t) {
    var n = this.data.filterConditionGroup, i = void 0, a = void 0, r = 3 === t ? n.subGroups.findIndex(function (t) {
      return -1 != (i = t.subGroups.findIndex(function (t) {
        return -1 != (a = t.items.findIndex(function (t) {
          return t.label === e;
        }));
      }));
    }) : n.subGroups.findIndex(function (t) {
      return -1 != (i = t.subGroups.findIndex(function (t) {
        return t.label === e;
      }));
    });
    return {
      index: i,
      itemIndex: a,
      parentIndex: r
    };
  },
  createDisSlider: function (e) {
    var t = this, n = this.data.conditionTypes, i = e.subGroups.find(function (e) {
      return "房屋要求" === e.label;
    }).subGroups.find(function (e) {
      return "距离" === e.label;
    });
    if (i) {
      var a = i.items.map(function (e) {
        return e.label;
      }), o = a.length - 1, u = a[0], l = n.find(function (e) {
        return 8 == e.type && e.isItemType === u;
      });
      l && (o = a.indexOf(l.label)), this.distanceRangeSliderResetIndex = r.default.init(this, a, 0, o, "距离", function (e, n) {
        var r = a[n], o = 1e3 * parseInt(a[n]), l = i.items.find(function (e) {
          return e.value == o;
        });
        l.isItemType = u, t.conditionTypeChange(l, "replace", u), s.globalGio("track", "shuaixuan_weizhi_jiage_renshu_chuangpu", {
          shuaixuan_text: "shuaixuan_juli_" + r
        });
      });
    }
  },
  createPriceSlider: function (e) {
    var n = this, i = this.data.conditionTypes, r = e.subGroups.find(function (e) {
      return "价格区间" == e.label;
    });
    if (r && r) {
      var o = [];
      if ((r = r.subGroups[0]).priceArray && r.priceArray.length ? o = r.priceArray : (r.items.forEach(function (e) {
        var t = e.value.split(",");
        o = o.concat(t);
      }), o = this.unique(o)), 0 == o.length) return;
      r.priceArray = o;
      var u = [];
      u = o.map(function (e) {
        return e >= 1e5 ? "不限" : "¥" + e;
      });
      var l = 0, d = o.length - 1, c = u[0] + u[1], h = i.find(function (e) {
        return 7 == e.type && e.isItemType === c;
      });
      if (h) {
        var p = h.value.split(","), f = t(p, 2), g = f[0], y = f[1];
        l = o.indexOf(g), d = o.indexOf(y);
      }
      this.priceRangeSliderResetIndex = a.default.init(this, u, l, d, r.label, function (e, t) {
        var i = [n.replaceStr(u[e]), t + 1 == u.length ? "100000" : n.replaceStr(u[t])], a = r.items[0];
        if (a.value = i.join(","), a.label = i.join("-"), a.isItemType = c, a.selected = !0,
          s.globalGio("track", "shuaixuan_weizhi_jiage_renshu_chuangpu", {
            shuaixuan_text: "shuaixuan_jiage_" + a.label
          }), 0 == e && t == o.length - 1) return n.conditionTypeChange(a, "delete", c);
        n.conditionTypeChange(a, "replace", c);
      });
    }
  },
  conditionTypeChange: function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "add", n = arguments[2], i = this.data.conditionTypes, a = n ? "isItemType" : "value", r = i.findIndex(function (t) {
      return t[a] === e[a];
    });
    switch (t) {
      case "add":
        -1 != r ? i.splice(r, 1) : i.push(e);
        break;

      case "delete":
        if (-1 == r) return;
        i.splice(r, 1);
        break;

      case "replace":
        -1 == r && i.push(e), i[r] = e;
    }
    this.setData({
      conditionTypes: i
    }), this.getHouseList();
  },
  submitOptions: function () {
    var e = this.prePage, t = this.data, n = t.conditionTypes, i = t.unitConditionTypes;
    wx.navigateBack({
      delta: 1,
      success: function (t) {
        var a = [].concat(i, n);
        e && e.moreSelectCallback && e.moreSelectCallback(n.length, a);
      }
    });
  },
  replaceStr: function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
    return e.substring(t, e.length);
  },
  getHouseList: function () {
    var e = this, t = this.data, n = t.conditionTypes, a = t.unitConditionTypes;
    this.setData({
      isMoreSelectLoading: !0
    }), i.default.getDaokeHouseList({
      conditions: a.concat(n),
      noStop: !1,
      onlyReturnTotalCount: !0,
      pageIndex: 0,
      pageSize: 20,
      returnFilterConditions: !1,
      returnGeoConditions: !1,
      returnNavigations: !1
    }).then(function (t) {
      t && e.setData({
        total: t.totalCount || 0
      });
    }).finally(function () {
      e.setData({
        isMoreSelectLoading: !1
      });
    });
  }
});