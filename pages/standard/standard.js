const tabbar = require('../../components/tabbar/tabbar.js')
const getHeight = require('../../utils/getHeight.js')
const getTabHeight = require('../../utils/getTabbarHeight')
const navigator = require('../../components/navigation/navigation')
const request = require('../../utils/request')
const app = getApp()
const check_grey = require('../../utils/checkGrey')
Page({
  data: {
    tab: 0, // 当前的页面tab指数 0代表标准规范 1代表管理文件
    scrollHeight: 0,
    standardList: [],
    dataList: []
  },
  nextUrl: '',
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url,  getCurrentPages()[0].route)
  },
  onLoad: function () {
    let pages = getCurrentPages()
    let query = wx.createSelectorQuery()
    navigator.navigator(this, '地震活动断层探察数据中心', pages) // 设置当前导航
    tabbar.tabbar("tabBar", 1, this) // 设置当前tab页
    getTabHeight.getTabHeight(query, this) // 获取tabBarHeight
    check_grey.is_grey(this) // 置灰
    this.setScollHeight(query) // 设置滚动区域的高度
    this.getData(0)
  },
  changeTab(e) {
    let tab = e.currentTarget.dataset.index
    if (this.data.tab !== tab ) {
      this.setData({ tab })
      this.getData(tab)
    }
  },
  setScollHeight(query) {
    let p1 = getHeight.getHeight(query, 'barBackGround') // 底部tab高度
    let p2 = getHeight.getHeight(query, 'tabContianer')  // 头部tab高度
    Promise.all([p1,p2]).then(res => {
      let { statusBarHeight, naviHeight, screenHeight } = app.globalData
      let scrollHeight = screenHeight - naviHeight - statusBarHeight -res[0] - res[1] + 30
      this.setData({ scrollHeight })
    })
  },
  goDetail(e) {
    let {type, id} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/standardDetail/standardDetail?type=${type}&id=${id}`,
    })
  },
  getData(tab){
    if(tab == 0) {
      let url = 'standard_list_api?cid=36'
      request.request(url).then(res => {
        console.log(res.data.data)
        this.nextUrl = res.data.data.pages.next_page_url || ''
        let standardList = res.data.data.news_list
        standardList.forEach(item => {
          item.published_time = item.published_time.slice(0, 10)
        })
        // console.log(standardList)
        this.setData({ standardList })
      })
    } else if(tab == 1) {
      let url = 'standard_list_api?cid=34'
      request.request(url).then(res => {
        // console.log(res.data.data)
        this.nextUrl = res.data.data.pages.next_page_url || ''
        let dataList = res.data.data.news_list
        dataList.forEach(item => {
          item.published_time = item.published_time.slice(0, 10)
        })
        this.setData({ dataList })
      })
    }
  },
  load() {
    if(this.nextUrl) {
      let url = this.nextUrl.replace(/standard_list/, "/standard_list_api")
      request.request(url).then(res => {
        let newList = res.data.data.news_list
        newList.forEach(item => {
          item.published_time = item.published_time.slice(0, 10)
        })
        this.nextUrl = res.data.data.pages.next_page_url || ''
        if(this.data.tab == 0) {
          this.setData({standardList: [...this.data.standardList,...newList]})
        } else if (this.data.tab == 1) {
          this.setData({dataList: [...this.data.dataList,...newList]})
        }
      })
    }
  }
})