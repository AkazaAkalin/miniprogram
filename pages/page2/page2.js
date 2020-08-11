// pages/page2/page2.js
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
    tabbar.tabbar("tabBar", 2, this)
    let query = wx.createSelectorQuery()
    getTabHeight.getTabHeight(query, this) // 获取tab
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})