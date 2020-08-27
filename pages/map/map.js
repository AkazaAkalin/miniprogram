// pages/page2/page2.js
const tabbar = require('../../components/tabbar/tabbar.js')
Page({
  data: {
    webUrl:'http://www.activefault-datacenter.cn/',
    // webUrl: 'https://mp.weixin.qq.com'
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url)
  },
  onLoad: function (options) {

  },
})