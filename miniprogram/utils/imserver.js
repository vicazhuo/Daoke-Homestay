const websoket = {
  sock: {},
  moeth:{},
  init: function (text,fn,t) {
    this.moeth = t;
    var that = this;
    wx.connectSocket({
      url: 'wss://im.05178.top?token=' + t.data.userToken,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log('连接成功' + res)
        console.log(JSON.stringify(res))
      },
      fail: function (res) {
        console.log('连接失败' + res)
      }
    });
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！');
      if (text) {
        that.sendMsg(text,fn,t);
      }
    })

    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })

    wx.onSocketMessage(function (res) {
      that.moeth.getsendInfo(res.data);
    })
  },
  sendMsg: function (msg,fn,t) {
    if(typeof t =='object'){
      this.moeth = t;
    }
    var that = this;
    if (typeof msg == 'object') {
      msg = JSON.stringify(msg)
    }
    function callback(res) {
     fn(res)
    }
    wx.sendSocketMessage({
      data: msg,
      success: function (res) {
        callback(res);
      },
      fail: function (res) {
        that.init(msg,fn,t);
      }
    })
  },
  startHeartBeat: function () {

  }
}

module.exports = {
  websoket: websoket
}