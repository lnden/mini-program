// pages/feature/canvas-share/canvas-share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    donateName: "美丽中国公益项目",
    time: '2019年1月20日',
    organName: '长沙市慈善基金会',
    canvasHidden: true,
    logo: "../../../images/share-logo.png",
    seal: "../../../images/share-seal.png",
    bgImg: "../../../images/share-bg.png",
    close: "../../../images/share-close.png"
  },
  switchMask: function() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  saveImage() {
    this.canvasImage();
  },
  savePhoto(imgs) {
    const _this = this;
    //画板路径保存成功后，调用方法吧图片保存到用户相册
    wx.saveImageToPhotosAlbum({
      filePath: imgs,
      //保存成功失败之后，都要隐藏画板，否则影响界面显示。
      success: (res) => {
        wx.hideLoading();
        _this.setData({
          canvasHidden: true
        })
      },
      fail: (err) => {
        wx.hideLoading();
        _this.setData({
          canvasHidden: true
        })
      }
    })
  },
  canvasImage() {
    const _this = this;
    const {
      logo,
      seal,
      bgImg,
      screenWidth,
      screenHeight
    } = this.data;
    const sw = screenWidth * 2;
    const sh = screenHeight * 2;
    const unit = screenWidth / 375;
    const ctx = wx.createCanvasContext('share');
    this.setData({
      ctx,
      canvasHidden: false
    })
    wx.showLoading({
      title: '图片保存中···',
    })
    // 1.绘制背景色
    ctx.setFillStyle('#D6A56F');
    ctx.fillRect(0, 0, sw, sh);
    // 2.绘制背景图
    ctx.drawImage(bgImg, 12, 24, sw - 24, sh - 182);
    // 3.绘制标题
    this.drawText({
      y: 120,
      color: '#845F1F',
      size: 96,
      align: 'center',
      baseline: 'top',
      text: '捐赠证书',
      bold: true
    })
    // 4.绘制捐款编号
    this.drawText({
      y: 230,
      color: '#404040',
      size: 26,
      align: 'center',
      baseline: 'top',
      text: '捐赠证书编号：LO123456789066',
    })
    // 5.绘制姓名
    this.drawText({
      y: 348,
      color: '#404040',
      size: 48,
      align: 'center',
      baseline: 'top',
      text: 'Mr,ding',
    })
    // 6.绘制折行内容区域1
    this.drawWrap({
      x: 86,
      y: 452,
      width: 582,
      height: 52,
      line: 2,
      color: '#404040',
      size: 36,
      align: 'left',
      baseline: 'top',
      text: ' 你为[美丽中国公益项目]贡献了一份爱心，感谢你的支持。',
    })
    // 7.绘制折行内容区域2
    this.drawWrap({
      x: 86,
      y: 606,
      width: 582,
      height: 52,
      line: 2,
      color: '#404040',
      size: 36,
      align: 'left',
      baseline: 'top',
      text: '此处机构可自定义文案- 最多字数是最多字数是最多字数是最多字数是是',
    })
    // 8.绘制署名区域-logo
    ctx.drawImage(seal, 501, sh - 355, 126, 126);
    // 8.绘制署名区域-名称
    this.drawText({
      x: 466,
      y: sh - 322,
      color: "#263238",
      size: 28,
      align: "left",
      baseline: "top",
      text: "长沙市慈善总会",
    })
    // 8.绘制署名区域-时间
    this.drawText({
      x: 466,
      y: sh - 282,
      color: '#263238',
      size: 28,
      align: 'left',
      baseline: 'top',
      text: '2019年12月01日',
    })
    // 9.二维码-logo
    ctx.drawImage(logo, 24, sh - 140, 120, 120);
    // 9.二维码-长按小程序
    this.drawText({
      x: 160,
      y: sh - 110,
      color: '#404040',
      size: 24,
      align: 'left',
      baseline: 'top',
      text: '长按小程序码',
    })
    // 9.二维码-查看项目
    this.drawText({
      x: 160,
      y: sh - 75,
      color: '#404040',
      size: 24,
      align: 'left',
      baseline: 'top',
      text: '查看项目',
    })

    ctx.draw(false, () => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: unit * sw,
        height: unit * sh,
        destWidth: unit * sw,
        destHeight: unit * sh,
        canvasId: "share",
        success(res) {
          _this.savePhoto(res.tempFilePath)
        }
      })
    })
  },
  drawText(obj) {
    const {
      ctx,
      screenWidth
    } = this.data;
    if (!obj.x) {
      obj.x = screenWidth;
    }
    if (!obj.bold) {
      obj.bold = false;
    }

    ctx.save();
    ctx.setFillStyle(obj.color);
    ctx.setFontSize(obj.size);
    ctx.setTextAlign(obj.align);
    ctx.setTextBaseline(obj.baseline);
    if (obj.bold) {
      ctx.fillText(obj.text, obj.x, obj.y - 0.5);
      ctx.fillText(obj.text, obj.x - 0.5, obj.y);
    }
    ctx.fillText(obj.text, obj.x, obj.y);
    if (obj.bold) {
      ctx.fillText(obj.text, obj.x, obj.y + 0.5);
      ctx.fillText(obj.text, obj.x + 0.5, obj.y);
    }
    ctx.restore();
  },
  drawWrap(obj) {
    var td = Math.ceil(obj.width / (obj.size));
    var tr = Math.ceil(obj.text.length / td);
    for (var i = 0; i < tr; i++) {
      var txt = {
        x: obj.x,
        y: obj.y + (i * obj.height),
        color: obj.color,
        size: obj.size,
        align: obj.align,
        baseline: obj.baseline,
        text: obj.text.substring(i * td, (i + 1) * td),
        bold: obj.bold
      };
      if (i < obj.line) {
        if (i == obj.line - 1) {
          txt.text = txt.text;
          // txt.text = txt.text.substring(0, txt.text.length - 3) + '......';
        }
        this.drawText(txt);
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight
        })
      },
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