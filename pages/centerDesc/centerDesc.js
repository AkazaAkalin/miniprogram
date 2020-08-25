const navigator = require('../../components/navigation/navigation')
Page({
  data: {
    centerImg: 'images.images.centerDesc.centerImg'
  },
  onLoad: function (options) {
    let pages = getCurrentPages()
    navigator.navigator(this, '中心简介', pages) // 设置导航
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url,  getCurrentPages()[0].route)
  },
  back: function() { 
    navigator.back(getCurrentPages())
  },
})