const images = require('../../utils/image')
const navigator = require('../../components/navigation/navigation')
const check_grey = require('../../utils/checkGrey')
Page({
  data: {
    tip: images.images.suggestionFeedback.tip
  },
  onLoad: function () {
    let pages = getCurrentPages() // 获取当前的页面栈
    navigator.navigator(this, '地震活动断层勘察数据中心', pages)
    check_grey.is_grey(this) // 置灰
  },
  // 左上角返回方法 
  back: function() { 
    navigator.back(getCurrentPages())
  }
})