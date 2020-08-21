const tabbar = require('../../components/tabbar/tabbar.js')
const getHeight = require('../../utils/getHeight.js')
const getTabHeight = require('../../utils/getTabbarHeight')
const navigator = require('../../components/navigation/navigation')
const app = getApp()
Page({
  data: {
    tab: 0, // 当前的页面tab指数 0代表标准规范 1代表管理文件
    scrollHeight: 0,
    dataList: [{text:'DB/T 83-2020 活动断层探察 数据库质量检测'},
    {text:'DB/T 53-2013 1：50000活动断层填图'},{text:'我是消息列表3我是消息列表3我是消息列表3我是消息列表3我是消息列表3'},{text:'我是消息列表4'},{text:'我是消息列表5'},{text:'我是消息列表6'},{text:'我是消息列表7'},{text:'我是消息列表8'},{text:'我是消息列表9'},{text:'我是消息列表9'},{text:'我是消息列表9'},{text:'我是消息列表9'},{text:'我是消息列表999'}]
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url,  getCurrentPages()[0].route)
  },
  onLoad: function (options) {
    let pages = getCurrentPages()
    navigator.navigator(this, '地震活动断层探察数据中心', pages) // 设置当前导航
    tabbar.tabbar("tabBar", 1, this) // 设置当前tab页
    let query = wx.createSelectorQuery()
    getTabHeight.getTabHeight(query, this) // 获取tabBarHeight
    this.setScollHeight(query) // 设置滚动区域的高度
  },
  changeTab(e) {
    let tab = e.currentTarget.dataset.index
    if (this.data.tab !== tab ) {
      this.setData({ tab })
    }
  },
  setScollHeight(query) {
    let p1 = getHeight.getHeight(query, 'barBackGround') // 底部tab高度
    let p2 = getHeight.getHeight(query, 'tabContianer')  // 头部tab高度
    Promise.all([p1,p2]).then(res => {
      let { statusBarHeight, naviHeight, screenHeight } = app.globalData
      let scrollHeight = screenHeight - naviHeight - statusBarHeight -res[0] - res[1]
      this.setData({ scrollHeight })
    })
  },
  goDetail(e) {
    let {type, id} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/standardDetail/standardDetail?type=${type}&id=${id}`,
    })
  }
})