function e(e) {
    var t = void 0;
    switch (e) {
      case n:
        t = "护照";
        break;

      case i:
        t = "军官证";
        break;

      default:
        t = "身份证";
    }
    return t;
}

function t(e) {
    var t = void 0;
    switch (e) {
      case 0:
        t = "男";
        break;

      case 1:
        t = "女";
        break;

      default:
        t = "未知";
    }
    return t;
}

function s(s, o) {
    s.sexType = t(s.sexType), s.lastIdType = s.lastIdType || a(s, o);
    var p = u[s.lastIdType];
    return s.mobile || (s.isNoInfo = !0), o ? (r(s), s.lastIdTypeName = "护照") : (s.lastIdType = s.lastIdType || a(s), 
    s.lastIdType !== n ? (s[p] = s[p] || {}, s.name && s[p] && s[p].idNumber || (s.isNoInfo = !0), 
    s.name = s.firstName ? (s.name ? s.name + "/" : "") + s.familyName + " " + s.firstName : s.name || "", 
    s.idTypeInfo = s[p].idNumber) : r(s), s.lastIdTypeName = e(s.lastIdType)), s;
}

function a(e, t) {
    return t ? n : e.officerTypeInfo && e.officerTypeInfo.idNumber ? i : e.passportTypeInfo && e.passportTypeInfo.email ? n : f;
}

function r(e) {
    return e.passportTypeInfo = e.passportTypeInfo || {}, e.firstName && e.familyName && e.passportTypeInfo && e.passportTypeInfo.email || (e.isNoInfo = !0), 
    e.idTypeInfo = e.passportTypeInfo.idNumber, e.name = e.firstName ? (e.name ? e.name + "/" : "") + o(e.familyName, e.firstName) : e.name || "", 
    e;
}

function o(e, t) {
    return e + " " + t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.idTypeKeys = exports.idTypeList = void 0, exports.idTypeFilter = e, 
exports.sexTypeFilter = t, exports.contactListFilter = function(e, t) {
    return (e = (0, p.cloneObj)(e)).forEach(function(e) {
        s(e, t);
    }), e;
}, exports.contactFilter = s, exports.checkIdType = a, exports.bookingContactFilter = function(e, t) {
    var s = {
        guests: {}
    }, r = e[0], o = {};
    if (t) s.guests = e.find(function(e) {
        return e.firstName && e.familyName && e.passportTypeInfo;
    }) || {}, s.email = s.guests && s.guests.passportTypeInfo ? s.guests.passportTypeInfo.email : "", 
    s.guestsLastIdType = n; else if (r && r.contactId) {
        var p = s.guestsLastIdType = r.lastIdType || a(r);
        console.log(p), p == n ? o = r.familyName && r.firstName ? r : {} : p != f && p != i || (o = r.name && r[u[p]] && r[u[p]].idNumber ? r : {}), 
        s.guests = o;
    }
    return s.guests.contactId && !s.guests.idType && (s.guests.idType = s.guestsLastIdType), 
    s;
}, exports.passportCheck = r, exports.computedCardNumber = function(e, t) {
    var s = e.lastIdType;
    return t && (s = n), u[s] && e[u[s]] ? e[u[s]].idNumber : "";
}, exports.gradRedPacketFilter = function(e) {
    var t = [];
    if (/\,/.test(e)) for (var s = e.split(","), a = Math.ceil(s.length / 2), r = 0; r < a; r++) t.push(s[2 * r] + " " + (s[2 * r + 1] || "")); else t = [ e ];
    return t;
}, exports.passportName = o;

var p = require("../../../common/js/utils"), n = 3, i = 2, f = 1, u = (exports.idTypeList = [ {
    name: "身份证",
    value: f
}, {
    name: "护照",
    value: n
}, {
    name: "军官证",
    value: i
}, {
    name: "台胞证",
    value: 4
}, {
    name: "港澳证",
    value: 5
} ], exports.idTypeKeys = [ "", "idTypeInfo", "officerTypeInfo", "passportTypeInfo" ]);