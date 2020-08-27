const navigator = require('../../components/navigation/navigation')
Page({
  data: {},
  onLoad: function () {
    let pages = getCurrentPages() // 获取当前的页面栈
    navigator.navigator(this, '数据共享', pages)
  },
  // 左上角返回方法 
  back: function() { 
    navigator.back(getCurrentPages())
  },
})