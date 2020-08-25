const app = getApp()
const images = require('../../utils/image')
const tabbar = require('../../components/tabbar/tabbar')
const getTabHeight = require('../../utils/getTabbarHeight')
const getHeight = require('../../utils/getHeight')
const navigator = require('../../components/navigation/navigation')
const request = require('../../utils/request')
Page({
  data: {
    title: '动态', //自定义导航的标题
    indexImg: images.images.index.indexImg, // 图片的路径示例
    tabbarHeight: 0, // 底部tab高度
    statusBarHeight: app.globalData.statusBarHeight, // 状态栏高度
    naviHeight: app.globalData.naviHeight, // 导航栏高度
    scrollHeight: 0, // scroll
    tabIndex: 0,  //tab的顺序指数 从0计数
    swiperImgs: [], // 轮播图片数组
    showLoadingdynamic: false,
    showLoadingprogress: false,
    showLoadingestablish: false,
    dynamicList: [],
    progressList:[],
    establishList:[]
  },
  nextUrl: '',
  //事件处理函数
  onLoad: function () {
    let pages = getCurrentPages()
    navigator.navigator(this, '地震活动断层探察数据中心', pages)
    tabbar.tabbar("tabBar", 0, this) // 这是tab为当前选中页， 0代表第一个tab
    let query = wx.createSelectorQuery()
    getTabHeight.getTabHeight(query, this) // 获取tab高度
    let swiperHeight = getHeight.getHeight(query,'swpierContainer')
    let tabHeight = getHeight.getHeight(query,'barBackGround')
    let dynamicTab = getHeight.getHeight(query, 'dynamicTab')
    Promise.all([swiperHeight, tabHeight, dynamicTab]).then(res => {
      let { statusBarHeight, naviHeight, screenHeight } = app.globalData
      let scrollHeight = screenHeight - naviHeight - statusBarHeight - 
      res[0] - res[1] - res[2]
      this.setData({ scrollHeight })
    })
    this.getData(0)
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url, getCurrentPages()[0].route)
  },
  getData(tab) {
    let url 
    let data
    if(tab == 0) {
      url = 'work_news_api?cid=31';
      request.request(url, data).then(res => {
        console.log(res.data)
        let swiperImgs = []
        res.data.data.carousel.forEach(item => {
          swiperImgs.push(item.cover_pc_url)
        })
        res.data.data.news_list.forEach(item =>{
          item.published_time = item.published_time.slice(0, 10)
        })
        this.setData({swiperImgs,
          dynamicList: res.data.data.news_list
        })
        this.nextUrl = res.data.data.pages.next_page_url || ''
      });
    } else if (tab == 1) {
      url = 'work_news_api?cid=6'
      request.request(url, data).then(res => {
        res.data.data.news_list.forEach(item =>{
          item.published_time = item.published_time.slice(0, 10)
        })
        let progressList = res.data.data.news_list
        this.nextUrl = res.data.data.pages.next_page_url || ''
        this.setData({progressList})
      })
    } else if (tab == 2) {
      url = 'work_news_api?cid=110'
      request.request(url, data).then(res => {
        // console.log(res.data.data)
        res.data.data.news_list.forEach(item =>{
          item.published_time = item.published_time.slice(0, 10)
        })
        let establishList = res.data.data.news_list
        this.nextUrl = res.data.data.pages.next_page_url || ''
        this.setData({establishList})
      })
    }
  },
  load() {
    if(this.nextUrl) {
      let url = this.nextUrl.replace(/work_news/, "work_news_api")
      request.request(url).then(res => {
        res.data.data.news_list.forEach(item =>{
          item.published_time = item.published_time.slice(0, 10)
        })
        let newList = res.data.data.news_list
        this.nextUrl = res.data.data.pages.next_page_url || ''
        if(this.data.tabIndex == 0) {
          this.setData({dynamicList: [...this.data.dynamicList,...newList]})
        } else if (this.data.tabIndex == 1) {
          this.setData({progressList: [...this.data.progressList,...newList]})
        } else if (this.data.tabIndex == 2) {
          this.setData({establishList: [...this.data.establishList,...newList]})
        }
      })
    } else {
      // LAST PAGE
    }
  },
  changeTab(e) {
    let tabIndex = e.currentTarget.dataset.index
    if(tabIndex !== this.data.tabIndex) {
      this.getData(tabIndex)
      this.setData({tabIndex}) 
    }
  },
  goDetail(e) {
    let {type, id} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/dynamicDetail/dynamicDetail?type=${type}&id=${id}`,
    })
  }
})
