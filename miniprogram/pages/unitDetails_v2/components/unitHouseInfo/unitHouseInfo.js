Component({
    properties: {
        unitDetailTags: Array,
        unitHighLights: Array,
        introduction: Array
    },
    data: {
        moreBtnText: "展开全部",
        isShowAll: !1,
        descLen: 0,
        pageScrollTop: 0,
        pageScreenHeight: 0
    },
    ready: function() {
        this.properties.introduction.length > 0 && this.properties.introduction[0].introduction.length > 0 && (this.properties.introduction.length > 1 && this.properties.introduction[0].introduction.length < 20 ? this.setData({
            descLen: this.properties.introduction[0].introduction.length + this.properties.introduction[1].introduction.length
        }) : this.setData({
            descLen: this.properties.introduction[0].introduction.length
        }));
    },
    queryMultipleNodes: function() {
        wx.createSelectorQuery().in(this).select("#the-id").boundingClientRect(function(t) {
            t.top;
        }).exec();
    },
    methods: {
        showmore: function(t) {
            if ("展开全部" == this.data.moreBtnText) {
                this.setData({
                    isShowAll: !0
                }), this.setData({
                    moreBtnText: "收起"
                });
                var e = this, i = wx.createSelectorQuery();
                i.select("#the-id").boundingClientRect(), i.selectViewport().scrollOffset(), i.exec(function(t) {
                    e.setData({
                        pageScrollTop: t[1].scrollTop
                    });
                });
            } else wx.pageScrollTo({
                scrollTop: this.data.pageScrollTop,
                duration: 1
            }), this.setData({
                isShowAll: !1
            }), this.setData({
                moreBtnText: "展开全部"
            });
        }
    }
});