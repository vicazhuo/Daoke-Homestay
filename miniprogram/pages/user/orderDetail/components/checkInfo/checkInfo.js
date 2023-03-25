function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

Component({
    properties: {
        infoData: {
            type: Object,
            value: {},
            observer: function(e, t, n) {
                this.toTimerString(e);
            }
        }
    },
    data: {
        checkInDate: {},
        checkOutDate: {}
    },
    methods: {
        onTap: function(e) {
            var t = {}, n = {};
            this.triggerEvent("returnOrderEvent", t, n), console.log("收到", this.data.infoData);
        },
        toTimerString: function(t) {
            var indate = new Date(t.checkInDate);
            var outdate = new Date(t.checkOutDate);
            
            t.checkInDate = '/Date('+ indate.getTime() +'+0800)/';
          t.checkOutDate = '/Date(' + outdate.getTime() +'+0800)/';

            console.log("datasd-------", t);

            var n = [ "日", "一", "二", "三", "四", "五", "六" ];
            for (var a in t) {
                var r, i = void 0;
                t[a] && (i = t[a].slice(6, 24));
                var o = new Date(parseInt(i)), c = o.getMonth() + 1, s = o.getDate(), u = o.getDay();
                this.setData(e({}, a, (r = {}, e(r, a, c + "月" + s + "日"), e(r, a + "Time", "周" + n[u] + " "), 
                r)));
            }
        }
    }
});