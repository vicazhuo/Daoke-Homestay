function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
        return i;
    }
    return Array.from(t);
}

require("../../../common/js/tjUnitApiRequest.js");

var e = require("../../../../api/unitDetailsApi.js"), i = (require("../../../../common/js/utils.js"), 
!0), s = void 0, n = 0, a = !0;

Page({
    data: {
        unitCommentSummary: {},
        comments: null,
        showPictureGroup: !1,
        isMoreLoading: !1,
        isLoading: !1,
        pictureCommentCount: 0,
        isNeedMoreLoading: !0,
        replayText: "",
        isShowEmpty: !1,
        isNeedShiPei: !1
    },
    onLoad: function(t) {
        i = !0, a = !0, s = t.unitId;
        var e = getCurrentPages(), n = e[e.length - 2].data.unit;
        this.setData({
            unitCommentSummary: n.unitCommentSummary
        }), this.setData({
            replayText: 4 == t.businessType ? "房东回复" : "商户回复"
        });
        var o = t.pictureCommentCount;
        o && this.setData({
            pictureCommentCount: o
        }), this.getComments(!0), this._getSystemInfo();
    },
    _getSystemInfo: function() {
        var t = getApp().globalData.systemInfo;
        console.log(t), this.setData({
            isNeedShiPei: t.isNeedShiPei
        });
    },
    getComments: function(o) {
        var r = this;
        o ? (n = 0, a = !0, r.setData({
            unitList: null,
            isLoading: !0,
            isNeedMoreLoading: !1
        })) : this.setData({
            isMoreLoading: !0,
            isLoading: !0,
            isNeedMoreLoading: a
        }), this.setData({
            isShowEmpty: !1
        }), e.searchUnitComments(s, n, 20, function(e, s) {
            if (r.setData({
                isLoading: !1,
                isMoreLoading: !1
            }), !i || e) {
                i = !1, n = ++n;
                var m = s.data, u = [];
                if (o) u = m; else {
                    var c;
                    (c = u = r.data.comments || []).push.apply(c, t(m));
                }
                a = m.length >= 20, r.setData({
                    comments: u,
                    isNeedMoreLoading: a,
                    isShowEmpty: 0 == u.length
                });
            } else wx.navigateBack({
                delta: 1
            });
        });
    },
    loadMoreEvent: function() {
        !this.data.isLoading && a && this.getComments(!1);
    },
    showAllComments: function(t) {
        this.data.showPictureGroup && (this.setData({
            showPictureGroup: !1,
            comments: []
        }), this.getComments(!0));
    },
    showPictureComments: function(t) {
        this.data.showPictureGroup || (this.setData({
            showPictureGroup: !0,
            comments: []
        }), this.getComments(!0));
    },
    showMoreImages: function(t) {
        var e = t.currentTarget.dataset.index, i = t.currentTarget.dataset.commentId, s = this.data.comments.filter(function(t, e) {
            return e == i;
        })[0];
        wx.previewImage({
            current: s.pictureList.filter(function(t, i) {
                return i == e;
            })[0].albumUrl,
            urls: s.pictureList.map(function(t) {
                return t.albumUrl;
            })
        });
    }
});