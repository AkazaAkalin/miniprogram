//index.js
const app = getApp()
const images = require('../../utils/image.js')
const tabbar = require('../../components/tabbar/tabbar.js')
const getTabHeight = require('../../utils/getTabbarHeight.js')
const request = require('../../utils/request.js')
Page({
  data: {
    indexImg: images.images.index.indexImg,
    solar:'',
    lunar:'',
    tabbarHeight: 0,
    statusBarHeight: app.globalData.statusBarHeight
  },
  //事件处理函数
  onLoad: function () {
    tabbar.tabbar("tabBar", 0, this) // 这是tab为当前选中页， 0代表第一个tab
    let query = wx.createSelectorQuery()
    getTabHeight.getTabHeight(query, this) // 获取tab
    this.demo()
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url)
  },
  bindLunarChange(e){
    this.setData({
      lunar: e.detail.value
    });
  },
  bindSolarChange(e){
    this.setData({
      solar: e.detail.value
    });
  },
  // 一个测试请求的demo
  demo() {
    let url = '/v2/movie/comming_soon'
    let data = {
      city: 'gz',
      start: 0,
      count: 10
    }
    request.request(url, data).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
})
