

Component({
    properties: {
        unitCommentSummary: Object,
        commentPreviewData: Array,
        businessType: String,
        unitId: String
    },
    ready: function() {
        console.log(this.data.commentPreviewData[0]);
    },
    data: {
      PWA_STATIC_TUJIA_HOST: getApp().globalStaticUrl
    },
    methods: {}
});