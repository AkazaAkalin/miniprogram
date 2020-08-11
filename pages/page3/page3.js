// pages/page3/page3.js
const tabbar = require('../../components/tabbar/tabbar.js')
const getTabHeight = require('../../utils/getTabbarHeight.js')
const app = getApp()
Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    tabbarHeight: 0,
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url)
  },
  onLoad: function (options) {
    tabbar.tabbar("tabBar", 3, this)
    let query = wx.createSelectorQuery()
    getTabHeight.getTabHeight(query, this) // 获取tab
  },
})