Component({
    properties: {
        redPacket: {
            type: Object,
            observer: function() {
              console.log("hongbao===>", this.data.redPacket)
                this.data.redPacket.countDown > 0 && (this.setData({
                    timeNumber: parseInt(this.data.redPacket.countDown, 10)
                }), this.updateTimer());
            }
        }
    }, 
    data: {
        timeNumber: Number,
        deadLineText: String,
        isShow: false
    },
    methods: {
        updateTimer: function() {
            var t = this.data.timeNumber, 
                 e = Math.floor(t % 60), 
                 a = Math.floor((t - e) / 60) + "分" + e + "秒";
                 t >= 0 ? (this.setData({
                     isShow:true,
                     deadLineText: "距离结束还剩: " + a,
                     timeNumber: t - 1
                 }), setTimeout(this.updateTimer.bind(this), 1e3)) : this.data.redPacket.disappearAfterCountDown && this.setData({
                 isShow: false
            });
      
        },
        onClick: function() {
            wx.navigateTo({
                url: this.data.redPacket.navigateUrl
            });
        }
    }
});