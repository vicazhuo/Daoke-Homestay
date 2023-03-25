Page({
    data: {
        counts: [ "1人", "2人", "3人", "4人", "5人", "6人", "7人", "8人", "9人", "10人以上", "不限人数" ],
        isSelected: 0
    },
    onLoad: function(e) {
        if (wx.setNavigationBarTitle({
            title: "选择入住人数"
        }), e) {
            var t = this.data.counts.indexOf(e.title);
            this.setData({
                isSelected: t
            });
        }
    },
    onShow: function() {},
    selectPeople: function(e) {
        var t = getCurrentPages(), a = t[t.length - 2], s = e.currentTarget.dataset.selected, c = this.data.counts.indexOf(s);
        this.setData({
            isSelected: c
        }), wx.navigateBack({
            delta: 1,
            success: function(e) {
                a && a.peopleSelectCallback && a.peopleSelectCallback(s);
            }
        });
    }
});