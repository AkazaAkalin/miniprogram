// pages/page2/page2.js
const tabbar = require('../../components/tabbar/tabbar.js')
const baseUrl = require('../../utils/config.js')
Page({
  data: {
    // webUrl:'https://www.activefault-datacenter.cn/',
    // webUrl: 'https://mp.weixin.qq.com'
    webUrl: `${baseUrl.baseUrl}map`
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url)
  },
  onLoad: function () {
    console.log(this.data.webUrl)
  },
})