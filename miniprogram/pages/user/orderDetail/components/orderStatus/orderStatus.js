

Component({
    properties: {
        status: String,
        statusText: {
            type: String,
            value: "",
            observer: function(t, e, r) {
                this.setData({
                    statusTitle: t
                });
            }
        },
        statusColor: String,
        statusInfo: String,
        askEntry: Array,
        summory: String,
        help: {
            type: Array,
            value: []
        },
        countdown: {
            type: Number,
            observer: function() {
                this.data.countdown > 0 && (this.setData({
                    timeNumber: parseInt(this.data.countdown, 10)
                }), this.updateTimer());
            }
        },
        totalNeedPay: {
            type: Number,
            value: 0
        },
        enumOrderOperationFlag: {
            type: Number,
            value: 0
        },
        isExempteDeposit: Boolean,
        onlineDeposit: Number
    },
    data: {
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl,
        statusTitle: String,
        deadLineText: String,
        timer: Number,
        timeNumber: Number
    },
    methods: {
        depositCallback: function() {
            this.triggerEvent("depositEvent");
        },
        updateTimer: function() {
            var t = this.data.timeNumber, e = Math.floor(t % 60), r = Math.floor((t - e) / 60) + "分" + e + "秒";
            t >= 0 ? (this.setData({
                deadLineText: r,
                timeNumber: t - 1
            }), setTimeout(this.updateTimer.bind(this), 1e3)) : this.triggerEvent("refreshEvent");
        },
        navTo: function(t) {
            var e = t.target.dataset;
            wx.navigateTo({
                url: "/pages/user/webView/webView?webUrl=" + encodeURIComponent(e.url)
            });
        }
    }
});