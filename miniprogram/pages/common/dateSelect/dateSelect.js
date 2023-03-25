function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../apiFetch/unitDetailsApi")), s = t(require("@tujia/fe_wx_mp_com/js/g.date")), n = require("../../../common/js/utils.js");

Page({
    data: {
        selectDate: {
            begin: null,
            end: null
        },
        showSelectDateText: {
            beginText: "",
            endText: "",
            interval: 0,
            sWeekText: "",
            eWeekText: ""
        },
        unitId: "",
        actionStatus: {
            text: "请选择入住日期",
            status: !1
        },
        showMonths: [],
        scrollIntoView: "",
        fullHouse: {},
        productsList: [],
        activityInfo: "",
        todayDate: "",
        restDay: {},
        platform: "",
        footerStatus: !1,
        isNeedShiPei: !1,
        PWA_STATIC_TUJIA_HOST: ''
    },
    _isClicked: !1,
    _selectedDateS: n.dateFormat(new Date(), "yyyy-MM-dd"),
    _selectedDate: new Date(),
    _showMonthNum: 6,
    onLoad: function(t) {
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            mask: !0
        });
        var e = new Date(t.beginDate) || new Date(n.dateFormat(new Date(), "yyyy-MM-dd")), a = new Date(t.endDate) || new Date(n.dateFormat(new Date().addDays(1), "yyyy-MM-dd"));
        this._showMonthNum = t._showMonthNum || 6, this.changeSelectDate({
            sd: e,
            ed: a
        }), this.initShowMonths(), this.setData({
            scrollIntoView: e.getFullYear() + "" + (e.getMonth() + 1),
            activityInfo: t.activityInfo || "",
            todayDate: n.dateFormat(new Date(), "yyyy-MM-dd")
        }), wx.hideToast(), this.initPrices(t), this._getRestDayHandler(), this._getSystemInfo();
    },
    _getSystemInfo: function() {
        var t = getApp().globalData.systemInfo;
        console.log(t), this.setData({
            platform: t.platform,
            isNeedShiPei: t.isNeedShiPei
        });
    },
    _getRestDayHandler: function() {
        var t = this;
        wx.request({
            url: a.PWA_STATIC_TUJIA_HOST + "/static/wechat/js/day.json",
            method: "get",
            success: function(e) {
                e.data && e.data.length && t._restDataHandler(e.data);
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    _restDataHandler: function(t) {
        var e = {};
        t.forEach(function(t, a) {
            e[t.date] = !0;
        }), this.setData({
            restDay: e
        });
    },
    initPrices: function(t) {
        var a = this;
        "0" == t.unitId && (t.unitId = "");
        var s = t.unitId || "", i = getApp();
        this.setData({
            unitId: s
        }), this.data.unitId && (wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), e.default.getunitcalendar({
            unitId: s
        }).then(function(t) {
            if (t && t.length) {
                var e = {};
                t.forEach(function(t, a) {
                    var s = new Date();
                    s.setDate(1), t || (e[n.dateFormat(s.addDays(a), "yyyy-MM-dd")] = !0);
                }), a.setData({
                    fullHouse: e
                });
            }
        }).catch(function(t) {
            wx.showModal({
                content: i.netFailMsg,
                showCancel: !1,
                success: function(t) {
                    t.confirm && wx.navigateBack({
                        delta: 1
                    });
                }
            });
        }).finally(function(t) {
            wx.hideToast();
        }));
    },
    changeSelectDate: function(t) {
        var e = t.sd, a = t.ed, s = e && n.dateFormat(e, "MM月dd日") || "", i = a && n.dateFormat(a, "MM月dd日") || "", o = void 0, d = void 0, c = void 0, h = void 0, l = void 0, r = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ];
        e && a ? (c = new Date(n.dateFormat(e, "yyyy-MM-dd")), d = new Date(n.dateFormat(a, "yyyy-MM-dd")), 
        o = parseInt((d - c) / 864e5)) : o = 0, e && (h = r[(c = new Date(n.dateFormat(e, "yyyy-MM-dd"))).getDay()]), 
        a && (l = r[(d = new Date(n.dateFormat(a, "yyyy-MM-dd"))).getDay()]), this.setData({
            selectDate: {
                begin: e && e.getTime() || null,
                end: a && a.getTime() || null
            },
            showSelectDateText: {
                beginText: s,
                endText: i,
                interval: o,
                sWeekText: h,
                eWeekText: l
            }
        }), this._actionStatusHandler();
    },
    _actionStatusHandler: function() {
        this.data.selectDate.begin && this.data.selectDate.end ? this.setData({
            actionStatus: {
                text: "确定",
                status: !0
            }
        }) : this.data.selectDate.begin ? this.setData({
            actionStatus: {
                text: "请选择离店日期",
                status: !1
            }
        }) : (this.data.selectDate.end, this.setData({
            actionStatus: {
                text: "请选择入住日期",
                status: !1
            }
        }));
    },
    initShowMonths: function() {
        for (var t, e, a, i = (u = new Date()).getFullYear(), o = u.getMonth(), d = [], c = {}, h = [], l = {}, r = 0; r < this._showMonthNum; r++) {
            c = {}, h = [], o > 11 && (o %= 12, i += 1), c.month = o + 1, c.year = i, c.firstDayWeek = new Date(i, o, 1).getDay(), 
            t = n.getDays(i, o), c.lastDayWeek = new Date(i, o, t).getDay();
            for (var u = 1; u <= t; u++) {
                var D = s.default.date.formatLunar(i, o + 1, u);
                e = new Date(i, o, u), a = n.dateFormat(e, "yyyy-MM-dd"), l = {};
                var y = new Date(e).getDay();
                l.isWeekend = 0 == y || 6 == y, l.date = new Date(a).getTime(), l.dateS = a, l.jrDate = D.gf || D.cf || "", 
                l.festival = "", l.isDisable = new Date(i, o, u + 1) < new Date(), h.push(l);
            }
            c.allDays = h, d.push(c), o++;
        }
        this.setData({
            showMonths: d,
            footerStatus: !0
        });
    },
    dateSelected: function(t) {
        var e, a, s = t.currentTarget.dataset.item, i = new Date(s.date);
        this.checkDate(i, s) && (this._isClicked ? (i > this._selectedDate ? (e = this._selectedDate, 
        a = i, this._isClicked = !1, this.changeSelectDate({
            sd: e,
            ed: a
        })) : (this._isClicked = !0, this._selectedDate = i, e = i, this.changeSelectDate({
            sd: e
        }), this.changeNoHouseStatus(i)), this.clearDurationAndCan()) : (this._isClicked = !0, 
        this._selectedDate = i, this._selectedDateS = n.dateFormat(this._selectedDate, "yyyy-MM-dd"), 
        this.changeSelectDate({
            sd: i
        })));
    },
    checkDate: function(t, e) {
        var a = this.data.fullHouse;
        if (t.getTime() + 576e5 < new Date().getTime()) return !1;
        if (this._isClicked && t.getTime() == this._selectedDate.getTime()) return !1;
        if (a[n.dateFormat(t, "yyyy-MM-dd")] && !e.isCancelNoHouse) return wx.showToast({
            title: "选择的日期部分订满，请重新选择",
            icon: "none"
        }), !1;
        if (e.isDuration) return wx.showToast({
            title: "选择的日期部分订满，请重新选择",
            icon: "none"
        }), !1;
        if (this._isClicked) {
            var s, i;
            if (t > this._selectedDate) for (s = new Date(this._selectedDate).addDays(1), i = t; s.getTime() < i.getTime(); s.addDays(1)) if (a[n.dateFormat(s, "yyyy-MM-dd")]) return wx.showToast({
                title: "选择的日期部分订满，请重新选择",
                icon: "none"
            }), !1;
        } else {
            if (a[n.dateFormat(t, "yyyy-MM-dd")]) return !1;
            this.changeNoHouseStatus(t);
        }
        return !0;
    },
    changeNoHouseStatus: function(t) {
        var e = this.data.fullHouse;
        for (var a in e) if (new Date(a) > new Date(t) && e[a]) {
            this.changeMonths(new Date(a));
            break;
        }
    },
    clearDurationAndCan: function() {
        this.data.showMonths.forEach(function(t, e) {
            t.allDays.forEach(function(t, e) {
                t.isDuration && delete t.isDuration, t.isCancelNoHouse && delete t.isCancelNoHouse;
            });
        }), this.setData({
            showMonths: this.data.showMonths
        });
    },
    changeMonths: function(t) {
        var e = void 0, a = !1, s = void 0, i = void 0;
        this.data.showMonths.forEach(function(o, d) {
            o.allDays.forEach(function(s, i) {
                s.dateS == n.dateFormat(t, "yyyy-MM-dd") && (e = i, a = !0);
            }), a && (a = !1, s = o.month, i = o.year);
        }), this.data.showMonths.forEach(function(t, a) {
            t.month == s && t.year == i && t.allDays.forEach(function(t, a) {
                a == e && (t.isCancelNoHouse = !0), a > e && (t.isDuration = !0), t.isDuration && t.isCancelNoHouse && delete t.isCancelNoHouse;
            }), (t.month > s && t.year == i || t.year > i) && t.allDays.forEach(function(t, e) {
                t.isDuration = !0, t.isDuration && t.isCancelNoHouse && delete t.isCancelNoHouse;
            });
        }), this.setData({
            showMonths: this.data.showMonths
        });
    },
    clearStatus: function() {
        this.setData({
            showSelectDateText: {
                beginText: "",
                endText: "",
                interval: 0,
                sWeekText: "",
                eWeekText: ""
            },
            selectDate: {
                begin: null,
                end: null
            },
            actionStatus: {
                text: "请选择入住日期",
                status: !1
            }
        }), this._isClicked = !1, this.clearDurationAndCan();
    },
    goBack: function() {
        var t = this, a = new Date(this.data.selectDate.begin), s = new Date(this.data.selectDate.end);
        if (this.data.actionStatus.status) if (this.data.unitId) {
            var i = {
                checkInDate: n.dateFormat(a, "yyyy-MM-dd"),
                checkOutDate: n.dateFormat(s, "yyyy-MM-dd"),
                unitId: this.data.unitId,
                activityInfo: this.data.activityInfo
            };
            e.default.getProducts(i).then(function(e) {
                t.setData({
                    productsList: e.products || []
                }), t._gohandler({
                    sd: a,
                    ed: s
                });
            }).catch(function(t) {
                wx.showToast({
                    title: t.errorMsg,
                    icon: "none"
                });
            }).finally(function() {});
        } else this._commonGoHandler(a, s);
    },
    _gohandler: function(t) {
        var e = t.sd, a = t.ed;
        0 == this.data.productsList.length ? wx.showToast({
            title: "暂无价格",
            icon: "none"
        }) : this.data.productsList[0].allowBooking ? this._commonGoHandler(e, a) : wx.showToast({
            title: "" + (this.data.productsList[0].disallowBookingReason || "不可预定"),
            icon: "none"
        });
    },
    _commonGoHandler: function(t, e) {
        var a = getCurrentPages(), s = a[a.length - 2];
        wx.navigateBack({
            delta: 1,
            success: function(a) {
                s && s.dateSelectCallback && s.dateSelectCallback(t, e);
            }
        });
    }
});