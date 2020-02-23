// components/pay-layer/pay-layer.js
import {
  getOrderNumber,
  getPaySignReq,
  getVerifyPay
} from '../../api/pay.js'
import {
  regYuanToFen,
  randomNum
} from '../../utils/util.js' 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModal: {
      type: Boolean,
      value: true
    },
    payInfo: {
      type: Object,
      value: {
        picImg: String,
        title: String,
        platform: String
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    money: 9.9,
    moneyValue: Number,
    focus: false,
    isAgreement: false,
    isAnon: false,
    payLoading: true,
    placeholder: "自定义金额"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭弹框
    hideModal(e) {
      this.triggerEvent('sendState', {
        value: false
      })
    },
    // 金额tab切换
    handleClickTab(e) {
      let query = e.currentTarget.dataset.value;
      this.setData({
        money: query,
        moneyValue: query
      })
    },
    // 是否获取input焦点
    isFocus() {
      this.setData({
        focus: !this.data.focus,
        placeholder: !this.data.focus ? '' : '自定义金额'
      })
    },
    // input框内金额改变，保留两位小数 
    handleChange: function(e) {
      const value = e.detail.value;
      let money;
      if (/^(\d?)+(\.\d{0,2})?$/.test(value)) {
        money = value;
      } else {
        money = value.substring(0, value.length - 1);
      }
      this.setData({
        money: money,
        moneyValue: money
      })
    },
    // 选框按钮状态
    handleSwitch(e) {
      const query = e.currentTarget.dataset.state;
      switch (query) {
        case 'isAgreement':
          this.setData({
            isAgreement: !this.data.isAgreement
          });
          break;
        case 'isAnon':
          this.setData({
            isAnon: !this.data.isAnon
          });
          break;
      }
    },
    // 协议跳转
    handleClickTo() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    },
    // 获取统一下单接口
    requestOrdNumr(data) {
      getOrderNumber(data).then(res => {
        this.setData({
          payLoading: true
        })
        this.requestWechatPay(res.data)
      })
    },
    // 拿到凭证(单号)拉起微信支付请求
    requestWechatPay(data) {
      const _this = this;
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: 'MD5',
        paySign: data.paySign,
        success(res) {
          console.log(res)
          _this.verifyPay(data)
        },
        fail(error) {
          console.log(error)
        }
      })
      // 此处容错处理，Android 可以获取支付状态，ios跳转safari支付，无法获取支付状态
      if (this.data.payInfo.platform == 'ios') {
        setTimeout(() => {
          wx.showModal({
            title: '支付提示',
            content: '如果支付完成了可以查看订单',
            success(res) {
              if (res.confirm) {
                // console.log('用户点击确定')
                _this.verifyPay(data)
              } else if (res.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
          // 支付弹框弹层消失
          _this.triggerEvent('sendState', {
            value: false
          })
        }, 2000)
      }
    },
    // 向后台拉取请求，验看交易是否成功， Android、ios都会调用此接口进行验证，Android会直接验证，ios还要通过弹框进行验证
    verifyPay(data) {
      getVerifyPay({
        appid: data.appId,
        out_trade_no: data.trade_no //该字段用户查询订单是否完成标识
      }).then(res => {
        if (res.Data && res.Data && res.Data.TradeState) {
          if (res.Data.TradeState != "NOTPAY") {
            wx.redirectTo({
              url: `/pages/result/index?out_trade_no=${data.trade_no}`
            })
          } else {
            wx.showModal({
              title: '温馨提示',
              content: '正在确认捐赠结果，请以捐赠记录为准',
              success(res) {
                if (res.confirm) {
                  // console.log('用户点击确定')
                  wx.switchTab({
                    url: '/pages/mycenter/index'
                  })
                } else if (res.cancel) {
                  // console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    },
    handleClickEnsure() {
      const _this = this;
      const appId = wx.getStorageSync('token') || 'wxc38437ef221ea607';
      const openId = wx.getStorageSync('openId') || '';
      const {
        isAgreement,
        isAnon,
        payInfo: {
          platform,
          pid
        },
        money,
        payLoading
      } = this.data;
      if (!isAgreement) {
        wx.showModal({
          title: '温馨提示',
          content: '同意并接受《用户协议》和《委托代扣协议》',
          success({
            cancel,
            confirm
          }) {
            if (confirm) {
              _this.setData({
                isAgreement: true
              })
            }
          }
        })
        return
      }
      let newDate = {
        appid: appId,
        oid: openId,
        device: platform,
        actid: pid,
        money: regYuanToFen(money, 100),
        trade_type: 'JSAPI',
        check_token: '',
        opar: encodeURIComponent(JSON.stringify({
          "money": `${money.toString()}`
        })),
        btr: randomNum(),
        battach: `anon=${isAnon ? 1 : 0}`
      }

      if (payLoading) {
        this.setData({
          payLoading: false
        })
        this.requestOrdNumr(newDate)
      }
    }
  }
})