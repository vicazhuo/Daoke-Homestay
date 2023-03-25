var e = getApp();

Component({
    properties: {
        params: {
            type: Object,
            value: {}
        },
        hotTags: {
            type: Array,
            value: []
        },
        isheaderFixed: {
            type: Boolean,
            value: !1
        },
        isOpenFixed: {
            type: Boolean,
            value: !1
        },
        conditionsGroups: {
            type: Array,
            value: []
        },
        pageType: {
            type: String,
            value: "house"
        }
    },
    currentPage: null,
    data: {
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl,
      DAOKE_STATIC_HOST: getApp().globalStaticDaoke ,
        hotTagStatus: []
    },
    ready: function() {
        var t = getCurrentPages(), e = t[t.length - 1];
        this.currentPage = e, this.data.isOpenFixed && this.getElementHeight();
    },
    methods: {
        emitGoPageEvent: function() {
            console.log(88888, this.data.pageType), "maps" === this.data.pageType && this.triggerEvent("goPageEvent");
        },
        dataSelected: function(t) {
            if (e.validTab(t, 800)) {
                var a = this.data.params, n = a.beginDate, i = a.endDate;
                this.emitGoPageEvent(), wx.navigateTo({
                    url: "/pages/common/dateSelect/dateSelect?beginDate=" + n + "&endDate=" + i
                });
            }
        },
        moreSelected: function(t) {
            if (e.validTab(t, 800)) {
                var a = this.data.params.total, n = this.data.conditionsGroups;
                n && 0 != n.length && (this.emitGoPageEvent(), wx.navigateTo({
                    url: "/pages/units/moreSelect/moreSelect?total=" + a
                }));
            }
        },
        moreSelectInit: function() {
            var t = this.getOptionItem(1), e = t.groups, a = (t.locationDataIndex, t.locationData), n = t.currentPage, i = n.conditionsTypeList.filter(function(t) {
                return 1 == t.gType || 6 == t.type;
            });
         
            a.subGroups.forEach(function(t) {
                t.subGroups.forEach(function(t) {
                    t.items.forEach(function(t) {
                        t.selected = !!i.find(function(e) {
                            return e.value === t.value || t.label === e.label;
                        });
                    });
                });
            }), n.setData({
                conditionsGroups: e,
                mortSelectCondintionList: i
            });
        },
        sortSelected: function(t) {
            if (getApp().validTab(t, 800)) {
                var e = this.data.conditionsGroups;
                e && 0 != e.length && (this.emitGoPageEvent(), this.sortSelectInit(), wx.navigateTo({
                    url: "/pages/units/components/sortSelect/sortSelect"
                }));
            }
        },
        sortSelectInit: function() {
            var t = this.getOptionItem(4), e = t.groups, a = (t.locationDataIndex, t.locationData), n = t.currentPage, i = n.conditionsTypeList.find(function(t) {
                return 4 == t.gType;
            });
            if (i) {
                a.items.forEach(function(t) {
                    return t.selected = t.value == i.value;
                });
                n.setData({
                    conditionsGroups: e
                });
            }
        },
        locationSelected: function(t) {
            if (getApp().validTab(t, 800)) {
                this.data.params.total;
                var e = this.data.conditionsGroups;
                this.currentPage;
                e && 0 != e.length && (this.emitGoPageEvent(), this.locationSelectedInit(), wx.navigateTo({
                    url: "/pages/units/components/locationSelect/locationSelect"
                }));
            }
        },
        locationSelectedInit: function() {
            var t = this.getOptionItem(2), e = t.groups, a = (t.locationDataIndex, t.locationData), n = t.currentPage, i = n.conditionsTypeList.find(function(t) {
                return 5 == t.type;
            });
            this.setSelectStatus(i, a), n.setData({
                conditionsGroups: e
            });
        },
        goSearch: function(t) {
            if (getApp().validTab(t, 800)) {
                var e = this.data.params, a = e.beginDate, n = e.endDate, i = e.searchText, o = void 0 === i ? "" : i, s = e.destId, r = e.destName, c = e.isOverseas;
                t.currentTarget.dataset;
                this.emitGoPageEvent(), wx.navigateTo({
                    url: "/pages/common/search/search?searchType=2&cityId=" + s + "&cityName=" + r + "&name=" + o + "&beginDate=" + a + "&endDate=" + n + "&keywordSuggestType=" + (c ? 2 : 1)
                });
            }
        },
        hotTagTap: function(t) {
            var e = t.currentTarget.dataset.index, a = this.data.hotTags;
            a[e].selected = !a[e].selected, this.triggerEvent("conditionsChange", a[e]), this.setData({
                hotTags: a
            });
        },
        toOptionPage: function(t) {
            switch (t.currentTarget.dataset.gtype) {
              case 1:
                this.moreSelected();
                break;

              case 2:
                this.locationSelected();
                break;

              case 4:
                this.sortSelected();
                break;

              default:
                return;
            }
        },
        getElementHeight: function() {
            var t = this;
            return new Promise(function(e, a) {
                wx.createSelectorQuery().in(t).select("#searchHeader").boundingClientRect().exec(function(n) {
                    var i = n[0];
                    if (!i) return a(i);
                    e(i.height), t.triggerEvent("getHeaderHeight", i.height);
                });
            });
        },
        setSelectStatus: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
            console.log(t, e);
            this.data.filterConditionGroup;
            var a = !1;
            console.log("====>",e)
            e.subGroups.forEach(function(e, n) {
                e.subGroups.length ? e.subGroups.forEach(function(n) {
                    n.items.forEach(function(i) {
                        e.selected = n.selected = i.selected = i.value === t.value && !a, a = a || e.selected;
                    });
                }) : e.items.forEach(function(n) {
                    e.selected = n.selected = n.value === t.value && !a, a = a || e.selected;
                });
            });
        },
        getOptionItem: function(t) {
            var e = this.currentPage, a = e.data.conditionsGroups, n = a.findIndex(function(e) {
                return e.gType == t;
            });
            return {
                groups: a,
                locationDataIndex: n,
                locationData: e.data.conditionsGroups[n],
                currentPage: e
            };
        },
        headMapBtn: function() {
            if ("house" === this.data.pageType) {
                var t = this.data.params, e = t.cityLatitude, a = t.cityLongitude;
                wx.navigateTo({
                    url: "/pages/units/maps/maps?lat=" + e + "&lng=" + a
                });
            } else wx.navigateBack();
        },
        clearInput: function() {
            this.triggerEvent("clearSearchEvent", 1);
        }
    }
});