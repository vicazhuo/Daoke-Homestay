Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        number: {
            type: Number,
            value: 0
        },
        max: {
            type: Number,
            value: 0
        },
        min: {
            type: Number,
            value: 0
        },
        unit: {
            type: String,
            value: ""
        },
        acceptRule: {
            type: Object,
            value: {}
        }
    },
    data: {
        isRecetionShow: !1
    },
    methods: {
        selectInputTap: function(t) {
            var e = t.currentTarget.dataset, i = e.type, n = e.btn, a = e.min, u = e.max;
            this.triggerEvent("selectInput", {
                type: i,
                btn: n,
                min: a,
                max: u
            });
        },
        receptionAction: function() {
            this.setData({
                isRecetionShow: !this.data.isRecetionShow
            }), this.triggerEvent("tapAcceptRule", {
                isAcceptRuleShow: this.data.isRecetionShow
            });
        }
    }
});