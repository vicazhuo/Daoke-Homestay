var e = require("./../../../../common/js/utils.js");

Component({
    properties: {
        navigations: {
            type: Array,
            value: []
        }
    },
    data: {
        current: 0
    },
    methods: {
        swiperChange: function(e) {
            var r = e.detail;
            this.setData({
                current: r.current
            });
        },
        headerBannerJump: function(r) {
            var t = r.currentTarget.dataset.url;
            t && (0, e.openWebview)(t);
        }
    }
});