function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../../apiFetch/bookApi")), i = t(require("../../../../common/js/utils"));

Component({
    properties: {
        title: {
            type: String,
            value: "账号存在异常，请安全验证！"
        },
        phone: {
            type: String,
            value: ""
        }
    },
    data: {
        code: "",
        time: 60
    },
    timer: null,
    detached: function() {
        clearInterval(this.timer);
    },
    methods: {
        _close: function() {
            this.triggerEvent("closeEvent"), clearInterval(this.timer);
        },
        _codeChange: function(t) {
            this.setData({
                code: t.detail.value
            });
        },
        _submit: function() {
            var t = this.data.code;
            t && this.triggerEvent("getcode", t);
        },
        _startCount: function() {
            var t = this;
            this.setData({
                time: --this.data.time
            }), this.timer = setInterval(function() {
                var e = t.data.time;
                e <= 0 ? (clearInterval(t.timer), t.setData({
                    time: 60
                })) : t.setData({
                    time: --e
                });
            }, 1e3);
        },
        _getCode: function() {
            var t = this;
            60 == this.data.time && e.default.validateCode(this.properties.phone).then(function() {
                t._startCount();
            }).catch(function(t) {
                i.default.toast(t.errorMsg), console.log(t);
            });
        }
    }
});