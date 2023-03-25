var o = (function(e) {
    e && e.__esModule;
}(require("../../apiFetch/commonApi")), {});

o.renderShareData = function(o) {
    o.isShowHouse;
    var t = {
        title: "[有人@你] " + o.nickname + "请你来砍价，一起赢钱",
        path: "/pages/helpRedBag/helper/index?scene=" + o.orderNo + "_2",
        imageUrl:"/static/wechat/promotion/redpacket/icon_active_share.png"
    };
    return console.log(t), t;
}, o.picWHOption = function(o, t, n) {
    if (!o) return "";
    var i = o.split(".");
    return i[0] = i[0] + "_" + t + "_" + n, i = i.join("."), e.PIC_TUJIA_HOST + i;
}, o.toast = function(e) {
    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "none";
    wx.showToast({
        title: e,
        icon: o
    });
}, module.exports = o;