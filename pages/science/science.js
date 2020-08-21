const tabbar = require('../../components/tabbar/tabbar.js')
const getTabHeight = require('../../utils/getTabbarHeight.js')
const getHeight = require('../../utils/getHeight.js')
const navigator = require('../../components/navigation/navigation')
const app = getApp()
const request = require('../../utils/request')
Page({
  data: {
    dataList:[
      {
        title:"龙门山断裂带研究综述",
        imgUrl:'../../newImage/newImg.png',
        content:'在汶川地震十二周年之际，中国地震局地质研究所张会平研究员归纳和总结龙门山逆冲带的18篇Tectonics和8篇JGR文章，结合近年来新在汶川地震十二周年之际，中国地震局地质研究所张会平研究员归纳和总结龙门山逆冲带的18篇Tectonics和8篇JGR文章，结合近年来新数',
        pubTime:"2020-08-11"
      }, 
      {
        title:"1668年郯城8.5级地震，蒲松龄经历的一次的一次的一次的一次大震",
        imgUrl:'../../newImage/newImg.png',
        content:'康熙七年,蒲松龄时年二十八岁,在他找表哥李笃之喝酒时遭遇地震。后来他在《聊斋志异》写下《地震》一文,短短一则小文按照震前,蒲松龄时年二十八岁,在他找表哥李笃之喝酒时遭遇地震。后来他在《聊斋志异》写下,蒲松龄时年二十八岁,在他找表哥李笃之喝酒时遭遇地震。后来他在《聊斋志异》写下',
        pubTime:"2020-08-12"
      }
    ],
  },
  onLoad: function (options) {
    let pages = getCurrentPages()
    navigator.navigator(this, '地震活动断层探察数据中心', pages)
    tabbar.tabbar("tabBar", 3, this)
    let query = wx.createSelectorQuery()
    getTabHeight.getTabHeight(query, this) // 获取tab
    this.setScollHeight(query)
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
  }
})