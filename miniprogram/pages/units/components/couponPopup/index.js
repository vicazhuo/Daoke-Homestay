// components/coupon-popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isPopupShow: {
      type: Boolean,
      value: false
    },
    bgColor:{
      type: String,
      value:'white'
    },
    title:{
      type: String,
      value: '优惠劵'
    },
    CouponList:{
      type:Object,
      value:[]
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShowAll: true,
    isFold: true,
    isShowAllStatic: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hideModal: function () {
      this.setData({ isPopupShow:false});
    },
    showAll: function (t) {
      var e = this.data.curIndex, a = t.currentTarget.dataset.index;
      this.setData({
        curIndex: a
      }), this.data.isShowAll ? this.data.curIndex != e ? this.setData({
        isShowAll: !0
      }) : this.setData({
        isShowAll: !1
      }) : this.setData({
        isShowAll: !0
      });
    },
    /**
   * 领取优惠劵
   */
    pickUp:function(){

    }
  }
})
