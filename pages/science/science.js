const tabbar = require('../../components/tabbar/tabbar.js')
const getTabHeight = require('../../utils/getTabbarHeight.js')
const getHeight = require('../../utils/getHeight.js')
const navigator = require('../../components/navigation/navigation')
const app = getApp()
const request = require('../../utils/request')
Page({
  data: {
    dataList:[],
  },
  onLoad: function () {
    let pages = getCurrentPages()
    let query = wx.createSelectorQuery()
    navigator.navigator(this, '地震活动断层探察数据中心', pages)
    tabbar.tabbar("tabBar", 3, this)
    getTabHeight.getTabHeight(query, this) // 获取tab
    this.setScollHeight(query)
    this.getData()
  },
  setScollHeight(query) {
    let p1 = getHeight.getHeight(query, 'barBackGround') // 底部tab高度
    Promise.all([p1]).then(res => {
      let { statusBarHeight, naviHeight, screenHeight } = app.globalData
      let scrollHeight = screenHeight - naviHeight - statusBarHeight -res
      this.setData({ scrollHeight })
    })
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url,  getCurrentPages()[0].route)
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id || 0
    wx.navigateTo({
      url: `/pages/scienceDetail/scienceDetail?id=${id}`,
    })
  },
  getData() {
    let url = 'application_api'
    request.request(url).then(res => {
      let dataList = res.data.data.application
      dataList.forEach(item => {
        item.published_time = item.published_time.slice(0, 10)
      })
      this.setData({dataList})
    })
  },
})