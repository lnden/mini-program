// components/swiper/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true, //是否显示面板指示点
    indicatorColor: '#eee', //指示点颜色
    indicatorActiveColor: 'red', //当前选中的指示点颜色
    vertical: false, //切换方向
    autoplay: true, //自动播放
    interval: 3000, //自动切换时间间隔
    duration: 800 //滑动动画时长
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})