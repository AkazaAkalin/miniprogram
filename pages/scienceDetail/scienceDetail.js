// pages/detail.js
const app = getApp()
const images = require('../../utils/image')
const navigator = require('../../components/navigation/navigation')
Page({
  data: {

  },
  onLoad: function (options) {
    let pages = getCurrentPages() // 获取当前的页面栈
    navigator.navigator(this, '地震活动断层探察数据中心', pages)
  },

  // 左上角返回方法 
  back: function() { 
    navigator.back(getCurrentPages())
  },

})