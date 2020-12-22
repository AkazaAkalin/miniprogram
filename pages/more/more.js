const tabbar = require('../../components/tabbar/tabbar.js')
const getTabHeight = require('../../utils/getTabbarHeight.js')
const navigator = require('../../components/navigation/navigation')
const images = require('../../utils/image')
const check_grey = require('../../utils/checkGrey')
Page({
  data: {
    right: images.images.more.right,
    title: [
      {name:'中心简介', url:'/pages/centerDesc/centerDesc'},
      {name:'数据共享', url:'/pages/dataShare/dataShare'},
      {name:'活动断层探查项目清单', url:'/pages/projectList/projectList'},
      {name:'设置', url:'/pages/setting/setting'},
      {name:'意见反馈', url:'/pages/suggestionFeedback/suggestionFeedback'}
    ]
  },
  navi(e) {
    tabbar.navi(e.currentTarget.dataset.url,  getCurrentPages()[0].route)
  },
  onLoad: function () {
    let pages = getCurrentPages()
    // navigator.navigator(this, '更多', pages) // 设置导航
    // tabbar.tabbar("tabBar", 4, this) // 设置底部tab页
    let query = wx.createSelectorQuery()
    getTabHeight.getTabHeight(query, this) // 获取tab高度
    check_grey.is_grey(this).then((res => {
      navigator.navigator(this, '更多', pages, res) // 设置导航
      tabbar.tabbar("tabBar", 4, this, res) // 这是tab为当前选中页， 0代表第一个tab
    })) // 置灰
  },
  tapItem(e) {
    let url = e.currentTarget.dataset.url
    if(url === '/pages/setting/setting') {
      wx.openSetting({
        success (res) {
          // console.log(res.authSetting)
        }
      })
    } else {
      wx.navigateTo({ url })
    }
  },
  onShareAppMessage: function() {},
  onShareTimeline: function() {},
})