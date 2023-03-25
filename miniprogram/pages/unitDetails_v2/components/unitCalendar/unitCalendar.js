Component({
    properties: {
        unitId: String,
        selectBegin: String,
        selectEnd: String,
        sWeekText: String,
        eWeekText: String,
        interval: Number
    },
    data: {},
    methods: {
        onTap: function() {
            this.triggerEvent("changedate", {});
        }
    }
});