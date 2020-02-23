// pages/feature/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    payInfo: {
      platform: 'ios',
      picImg: '../../images/without.jpg',
      title: '您为【腾讯公益】捐赠一本书'
    }
  },
  handleConfirmPay() {
    this.setData({
      showModalStatus: true
    })
  },
  onGetState(e) {
    const types = e.detail.value;
    this.setData({
      showModalStatus: types
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})