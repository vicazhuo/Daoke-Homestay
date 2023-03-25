function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var i = t(require("../../../../common/js/utils")), 
    n = t(require("../../../../apiFetch/bookApi")), 
    r = require("../../utils/index"), 
    s = i.default.toast, o = /^[A-Za-z]+$/, c = /^\d{6,}$/;

Page({
    data: {
        activeIdTypeName: "身份证",
        activeIdType: 1,
        idTypeList: [],
        contactItem: {},
        saveInfo:{
          show:false
        },
        isIdTypeActionSheet: !1,
        email: "",
        birthDay: "",
        isShowDatePicker: !1,
        isIosCrossBar: i.default.systemInfo.isNeedShiPei,
        isAliApp: i.default.isAliApp,
        PWA_STATIC_TUJIA_HOST: "",
        title: ""
    },
    contactId: "",
    isSeaOver: !1,
    from: "",
    finalContactItem: {},
    onLoad: function(t) {
       var app = getApp();
        //保险信息
        if(app.globalOtherData.saveInfo){
          this.setData({ saveInfo: app.globalOtherData.saveInfo})
        }


        var e = t.id, a = t.type, i = t.isSeaOver, n = t.from;
        this.contactId = "";
        var s = "1" === a;
        this.isIns = s;
        var o = s ? "投保人" : "入住人", c = e ? "编辑" : "添加";
        c += o;
        var d = {
            idTypeList: []
        };
        if (this.isSeaOver = i, this.from = n, i) {
            var u = r.idTypeList[1];
            d.activeIdTypeName = u.name, d.activeIdType = u.value, d.idTypeList.push(u);
        } else d.idTypeList = r.idTypeList.slice(0, 3);
        d.title = c, this.setData(d), wx.setNavigationBarTitle({
            title: c
        }), e && (this.contactId = e, this.getContact(e));

    },
    onReady: function() {},
    onShow: function() {},
    openIdTypeActionSheet: function() {
        this.setData({
            isIdTypeActionSheet: !this.data.isIdTypeActionSheet
        });
    },
    idTypeASConfirm: function(t) {
        var e = t.detail, a = e.name, i = e.value;
        if (i !== this.data.activeIdType) {
            var n = {
                activeIdType: i,
                activeIdTypeName: a
            };
            if (this.contactId) {
                var s = this.data.contactItem[r.idTypeKeys[i]];
                n.cardNumber = s ? s.idNumber : "";
            }
            this.setData(n);
        }
        this.openIdTypeActionSheet();
    },
    bindDateChange: function(t) {
        this.setData({
            "contactItem.birthDay": t.detail.value
        });
    },
    radioChange: function(t) {
        var e = t.currentTarget.dataset.value;
        this.setData({
            "contactItem.sexType": e
        });
    },
    getContact: function(t) {
        var e = i.default.getPrevPage();
        if (!e) throw new Error("没有上级页面，无法获取数据");
        var a = e.oldContactList;
        if (a) {
            var n = this.isSeaOver, s = a.find(function(e) {
                return e.contactId == t;
            });
            (s = i.default.cloneObj(s)).lastIdType = s.lastIdType || (0, r.checkIdType)(s, n);
            var o = r.idTypeList.find(function(t) {
                return t.value == s.lastIdType;
            }) || {}, c = o.name, d = o.value;
            this.setData({
                contactItem: s,
                activeIdTypeName: n ? r.idTypeList[1].name : c || r.idTypeList[0].name,
                activeIdType: n ? r.idTypeList[1].value : d || r.idTypeList[0].value,
                cardNumber: (0, r.computedCardNumber)(s, n),
                email: s.passportTypeInfo && s.passportTypeInfo.email ? s.passportTypeInfo.email : ""
            }), this.finalContactItem = i.default.cloneObj(s);
        }
    },
    inputChange: function(t) {
        var a = t.detail, i = a.name, n = a.value;
        i && this.setData(e({}, "contactItem." + i, n));
    },
    submit: function() {
        var t = this, e = this.data, a = e.email, d = e.cardNumber, u = e.contactItem, l = e.activeIdType, f = u.name, p = u.mobile, h = u.sexType, m = u.birthDay, y = u.familyName, I = u.firstName, v = u.countryCode, T = this.contactId;
        this.tmpItem;
        v = v || 86;
        var b = 1 === l, C = 3 === l, g = 2 === l;
        if (3 !== l) {
            if (!f) return s("请输入中文姓名");
            if (/\d/.test(f)) return s("名字不能包含数字");
            if (!/^[\u4e00-\u9fa5]+$/.test(f)) return s("您输入的中文姓名有误");
            if (!d) return s("请输入证件号码");
        } else {
            if (!y) return s("请输入姓（拼音）");
            if (!o.test(y)) return s("请输入英文或拼音");
            if (!I) return s("请输入名（拼音）");
            if (!o.test(I)) return s("请输入英文或拼音");
        }
        if (b) {
            var S = i.default.checkIdCard(d, "入住人身份证");
            if (!S.rst) return s(S.msg);
        } else if (C && d) {
            if (!i.default.isPassportID(d)) return s("请输入正确的护照证件号");
        } else if (g && !i.default.isOfficerID(d)) return s("请输入正确的军官证件号");
        if (!p) return s("请输入手机号码");
        if (86 == v) {
            if (!i.default.checkMobile(p)) return s("手机号格式不正确，请重新输入");
        } else if (!c.test(p)) return s("手机号格式不正确，请重新输入");
        if (!m && g) return s("请选择出生日期");
        if (C) {
            if (!p) return s("请输入邮箱");
            if (!i.default.checkEmail(a)) return s("请输入正确的邮箱");
        }
        var D = {
            countryCode: v,
            lastIdType: l,
            mobile: p
        }, A = {
            idNumber: d
        };
        C ? (A.email = a, D.familyName = y, D.firstName = I) : D.name = f, b || (D.sexType = h || 0, 
        D.birthDay = m || ""), D[r.idTypeKeys[l]] = A, D = Object.assign(this.finalContactItem || {}, D), 
        T && (D.id = T, D.contactId = T), console.log("contact:", D), n.default.saveContact(D).then(function(e) {
          s("添加成功"), T || (D.id = e.id, D.contactId = e.contactId), "index" == t.from ? wx.redirectTo({
                url: i.default.createUrlParamsString("/pages/book/pages/peopleList/peopleList", {
                    isSeaOver: t.isSeaOver,
                    type: t.isIns ? "1" : null
                })
            }) : i.default.execPrevPageCallback("addPeopleCallback", D, T);
        }).catch(function(t) {
            console.log(t), s(t.errorMsg || "添加失败");
        });
    },
    cardInputChange: function(t) {
        var a = t.detail, i = a.name, n = a.value;
        this.setData(e({}, i, n));
    },
    nameInputBlur: function(t) {
        var a = t.detail, i = a.name, n = a.value;
        n = o.test(n) ? n.toUpperCase() : n, this.setData(e({}, "contactItem." + i, n));
    },
    openBirthPicker: function() {
        this.setData({
            isShowDatePicker: !this.data.isShowDatePicker
        });
    },
    birthdayChange: function(t) {
        this.setData({
            "contactItem.birthDay": t.detail.value,
            isShowDatePicker: !1
        });
    },
    toSelectAreaCode: function() {
        wx.navigateTo({
            url: "/pages/book/pages/areaCode/areaCode"
        });
    },
    areaCodeCallback: function(t) {
        t && this.setData({
            "contactItem.countryCode": t
        });
    },
    navback: function() {
        if (this.data.isShowPopup) return this.passportTipAction();
        wx.showModal({
            title: "提示",
            confirmText: "确定",
            confirmColor: "#FF9645",
            cancelText: "取消",
            content: "信息尚未保存，确定退出编辑吗？",
            success: function(t) {
                t.confirm && wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    passportTipAction: function() {
        this.setData({
            isShowPopup: !this.data.isShowPopup
        });
    }
});