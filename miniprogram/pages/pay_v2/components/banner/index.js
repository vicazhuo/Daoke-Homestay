Component({
    properties: {
        bannerData: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        toActivePage: function(t) {
            var a = t.target.dataset.index || t.currentTarget.dataset.index, e = this.data.bannerData.navigations;
            console.log(e), e && wx.redirectTo({
                url: e[a].navigateUrl
            });
        }
    }
});