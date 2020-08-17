// pages/page3/page3.js
const tabbar = require('../../components/tabbar/tabbar.js')
const getTabHeight = require('../../utils/getTabbarHeight.js')
const navigator = require('../../components/navigation/navigation')
const app = getApp()
Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    naviHeight: app.globalData.naviHeight, // 导航栏高度
    tabbarHeight: 0,
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url)
  },
  onLoad: function (options) {
    let pages = getCurrentPages()
    navigator.navigator(this, '科普', pages)
    tabbar.tabbar("tabBar", 3, this)
    let query = wx.createSelectorQuery()
    getTabHeight.getTabHeight(query, this) // 获取tab
    wx.setNavigationBarTitle({
      title: 'page3',
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
})