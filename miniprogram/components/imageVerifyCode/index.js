var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../apiFetch/wifiApi"));

Component({
    properties: {
        isShow: {
            type: Boolean,
            value: !1,
            observer: function(e) {
                e && this._getPicVerCode();
            }
        }
    },
    data: {
        verifyCode: "",
        picVerCodeUrl: "",
        picVerCodeToken: ""
    },
    methods: {
        _getPicVerCode: function() {
            var t = this;
            this.setData({
                verifyCode: ""
            }), e.default.getImageVerifyCode({
                data: ""
            }).then(function(e) {
                t.setData({
                    picVerCodeUrl: "data:image/png;base64," + e.image,
                    picVerCodeToken: e.token
                });
            }).catch(function(e) {
                console.log(e);
            });
        },
        _getVerCode: function(e) {
            var t = this.data;
            e && this.triggerEvent("getCodeChange", {
                code: e,
                token: t.picVerCodeToken
            });
        },
        _closeModal: function() {
            this.setData({
                isShow: !1
            });
        },
        formSubmit: function(e) {
            this._getVerCode(e.detail.value.picVerCode);
        }
    }
});