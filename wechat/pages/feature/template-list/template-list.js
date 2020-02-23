// pages/feature/template-list/template-list.js
const school = require("../../../constant/school.js"); //国内学校列表
const telCountry = require("../../../constant/telCountry.js"); //电话国家列表
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1Checked: true,
    school: {
      letter: '',
      dataList: '',
      toId: 'a',
      show: true
    },
    telCountry: {
      letter: '',
      dataList: '',
      toId: 'a',
      show: true
    }
  },
  /* 点击字母检索学校 */
  searchSchool: function(e) {
    if (e.target.dataset.text == '#') {
      this.setData({
        'school.toId': 'other'
      })
    } else {
      this.setData({
        'school.toId': e.target.dataset.text
      })
    }
  },
  /* 点击选择学校 */
  selectSchool: function(e) {
    console.log('获取学校的名称:', e.target.dataset.text);
    this.setData({
      'school.show': false
    })
  },

  /* 取消选择学校 */
  cancelSelect: function(e) {
    this.setData({
      'school.show': false
    })
  },
  /* 点击字母检索电话 */
  searchTel: function(e) {
    if (e.target.dataset.text == '☆') {
      this.setData({
        'telCountry.toId': 'hot'
      })
    } else {
      this.setData({
        'telCountry.toId': e.target.dataset.text
      })
    }
  },
  /* 点击选择电话 */
  selectTel: function(e) {
    console.log(e.target.dataset.text)
  },

  // 模版切换
  switch1Change: function() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      'school.letter': school.letter,
      'school.dataList': school.dataList,
      'telCountry.letter': telCountry.letter,
      'telCountry.dataList': telCountry.dataList,
    })
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