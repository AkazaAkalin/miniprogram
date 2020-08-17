const tabbar = require('../../components/tabbar/tabbar.js')
const getTabHeight = require('../../utils/getTabbarHeight.js')
const navigator = require('../../components/navigation/navigation')
const app = getApp()
Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    naviHeight: app.globalData.naviHeight, // 导航栏高度
    title:['中心简介','数据共享','设置','意见反馈']
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url)
  },
  onLoad: function (options) {
    let pages = getCurrentPages()
    navigator.navigator(this, '更多', pages) // 设置导航
    tabbar.tabbar("tabBar", 4, this) // 设置底部tab页
    let query = wx.createSelectorQuery()
    getTabHeight.getTabHeight(query, this) // 获取tab高度

  },
})