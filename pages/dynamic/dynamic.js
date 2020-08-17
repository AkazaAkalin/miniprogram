const app = getApp()
const images = require('../../utils/image')
const tabbar = require('../../components/tabbar/tabbar')
const getTabHeight = require('../../utils/getTabbarHeight')
const navigator = require('../../components/navigation/navigation')
const request = require('../../utils/request')
Page({
  data: {
    title: '动态', //自定义导航的标题
    indexImg: images.images.index.indexImg, // 图片的路径示例
    tabbarHeight: 0, // 底部tab高度
    statusBarHeight: app.globalData.statusBarHeight, // 状态栏高度
    naviHeight: app.globalData.naviHeight, // 导航栏高度
    tabIndex: 0,  //tab的顺序指数 从0计数
    swiperImgs:['../../images/test/s1.jpg','../../images/test/s2.jpg','../../images/test/s3.jpg'], // 轮播图片数组
  },
  //事件处理函数
  onLoad: function () {
    let pages = getCurrentPages()
    navigator.navigator(this, '动态', pages)
    tabbar.tabbar("tabBar", 0, this) // 这是tab为当前选中页， 0代表第一个tab
    let query = wx.createSelectorQuery()
    getTabHeight.getTabHeight(query, this) // 获取tab高度
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url)
  },
  // 一个测试请求的demo
  // demo() {
  //   let url = '/v2/movie/comming_soon'
  //   let data = {
  //     city: 'gz',
  //     start: 0,
  //     count: 10
  //   }
  //   request.request(url, data).then(res => {
  //     console.log(res)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }
  changeTab(e) {
    let tabIndex = e.currentTarget.dataset.index
    this.setData({tabIndex}) 
  },
})
