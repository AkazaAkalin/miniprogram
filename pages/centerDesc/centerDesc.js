const navigator = require('../../components/navigation/navigation')
const check_grey = require('../../utils/checkGrey')
Page({
  data: {
    centerImg: 'images.images.centerDesc.centerImg'
  },
  onLoad: function () {
    let pages = getCurrentPages()
    // 设置导航
    // navigator.navigator(this, '中心简介', pages) 
    check_grey.is_grey(this).then((res => {
      navigator.navigator(this, '中心简介', pages, res) 
    })) // 置灰
  },
  // 返回
  back: function() { 
    navigator.back(getCurrentPages())
  },
})