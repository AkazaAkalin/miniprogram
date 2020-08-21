const tabbar = require('../../components/tabbar/tabbar.js')
const getTabHeight = require('../../utils/getTabbarHeight.js')
const navigator = require('../../components/navigation/navigation')
const images = require('../../utils/image')
const app = getApp()
Page({
  data: {
    statusBarHeight: app.globalData.statusBarHeight, // 状态栏高度
    naviHeight: app.globalData.naviHeight, // 导航栏高度
    right: images.images.more.right,
    title: [
      {name:'中心简介', url:'/pages/centerDesc/centerDesc',},
      {name:'数据共享', url:'/pages/dataShare/dataShare',},
      {name:'设置', url:'/pages/setting/setting',},
      {name:'意见反馈', url:'/pages/suggestionFeedback/suggestionFeedback',}
    ]
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url,  getCurrentPages()[0].route)
  },
  onLoad: function (options) {
    let pages = getCurrentPages()
    navigator.navigator(this, '更多', pages) // 设置导航
    tabbar.tabbar("tabBar", 4, this) // 设置底部tab页
    let query = wx.createSelectorQuery()
    getTabHeight.getTabHeight(query, this) // 获取tab高度
  },
  tapItem(e) {
    let url = e.currentTarget.dataset.url
    if(url === '/pages/setting/setting') {
      wx.openSetting({
        success (res) {
          console.log(res.authSetting)
        },
        fail(res) {
          // console.log(res)
        }
      })
    } else {
      wx.navigateTo({ url })
    }
  }
})