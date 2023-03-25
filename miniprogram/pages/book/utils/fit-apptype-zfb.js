Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getPhoneContact = function() {
    var e = this;
    wx.choosePhoneContact().then(function(t) {
        t.mobile && e.setData({
            "guests.mobile": t.mobile.replace(/\s|\-/g, "")
        });
    }).catch(function(e) {
        console.log(e);
    });
};