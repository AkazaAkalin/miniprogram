//index.js
//获取应用实例
const app = getApp()
const images = require('../../utils/image.js')
const tabbar = require('../../components/tabbar/tabbar.js')
Page({
  data: {
    indexImg: images.images.index.indexImg
  },
  //事件处理函数
  onLoad: function () {
    tabbar.tabbar("tabBar", 0, this)
  },
  navi(e) {
    console.log(e)
    tabbar.navi(e.currentTarget.dataset.url)
  },
})
