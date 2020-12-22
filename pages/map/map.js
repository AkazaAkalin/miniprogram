// pages/page2/page2.js
// const tabbar = require('../../components/tabbar/tabbar.js')
const baseUrl = require('../../utils/config.js')
const check_grey = require('../../utils/checkGrey')
Page({
  data: {
    webUrl: `${baseUrl.baseUrl}map`,
    // webUrl:'https://m.bilibili.com/',
    is_grey:''
  },
  onLoad: function () {
    check_grey.is_grey(this).then(res=>{
      // console.log(res)
      res && wx.setNavigationBarColor({
        frontColor: '#ffffff', 
        backgroundColor: '#BEBEBE', 
      })
    }) // 置灰
    // console.log(this.data, check_grey.is_grey(this))
  },
})