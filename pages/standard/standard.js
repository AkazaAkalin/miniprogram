const tabbar = require('../../components/tabbar/tabbar.js')
const getTabHeight = require('../../utils/getTabbarHeight.js')
const navigator = require('../../components/navigation/navigation')
const app = getApp()
Page({
  data: {
    naviHeight: app.globalData.naviHeight, // 导航栏高度
    statusBarHeight: app.globalData.statusBarHeight,
    tab: 0,
    dataList: [{text:'DB/T 83-2020 活动断层探察 数据库质量检测'},
    {text:'DB/T 53-2013 1：50000活动断层填图'},{text:'我是消息列表3我是消息列表3我是消息列表3我是消息列表3我是消息列表3'},{text:'我是消息列表4'},{text:'我是消息列表5'},{text:'我是消息列表6'},{text:'我是消息列表7'},{text:'我是消息列表8'},{text:'我是消息列表9'},{text:'我是消息列表9'},{text:'我是消息列表9'},{text:'我是消息列表9'},{text:'我是消息列表999'}]
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url)
  },
  onLoad: function (options) {
    let pages = getCurrentPages()
    navigator.navigator(this, '地震活动断层探察数据中心', pages) // 设置当前导航
    tabbar.tabbar("tabBar", 1, this) // 设置当前tab页
    let query = wx.createSelectorQuery()
    getTabHeight.getTabHeight(query, this) // 获取tab
  },
  changeTab(e) {
    let tab = e.currentTarget.dataset.index
    if (this.data.tab !== tab ) {
      this.setData({ tab })
    }
  }
})