Page({
    data: {
        options: "",
        sence: ""
    },
    onLoad: function(e) {
        console.log(e), e.sence && this.setData({
            sence: decodeURIComponent(e.sence)
        }), this.setData({
            options: JSON.stringify(e)
        });
    }
});