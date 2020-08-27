const navigator = require('../../components/navigation/navigation')
Page({
  data: {
    centerImg: 'images.images.centerDesc.centerImg'
  },
  onLoad: function () {
    let pages = getCurrentPages()
    // 设置导航
    navigator.navigator(this, '中心简介', pages) 
  },
  // 底部切换tab
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url,  getCurrentPages()[0].route)
  },
  // 返回
  back: function() { 
    navigator.back(getCurrentPages())
  },
})