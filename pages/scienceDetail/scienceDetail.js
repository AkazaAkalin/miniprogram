const navigator = require('../../components/navigation/navigation')
const request = require('../../utils/request')
var WxParse = require('../../wxParse/wxParse.js')
const check_grey = require('../../utils/checkGrey')
const images = require('../../utils/image')
const app = getApp()
Page({
  data: {
    shareImg: images.images.shareImg,
    title: '',
  },
  id: '',
  showHome: false,
  onLoad: function (options) {
    let scene = app.globalData.scene
    let pageLength = getCurrentPages().length
    if(scene == '1007'&& pageLength == 1 || scene == '1008'&& pageLength == 1) {
      this.showHome = true
    }
    this.id = options.id
    let pages = getCurrentPages() // 获取当前的页面栈
    this.getData()
    check_grey.is_grey(this).then(res => {
      navigator.navigator(this, '地震活动断层探察数据中心', pages, res, this.showHome)
    }) // 置灰
  },
  onShareAppMessage: function(e) {
    // console.log('share', this.data.title)
    return {
      title: this.data.title,
      imageUrl: '../../images/default.png'
    }
  },
  onShareTimeline: function(e) {
    return {
      title: this.data.title,
      imageUrl: '../../images/default.png'
    }
  },
  // 左上角返回方法 
  back: function() { 
    navigator.back(getCurrentPages())
  },
  backHome: function() {
    navigator.backHome()
  },
  getData(){
    let url = `subject_detail_api/${this.id}`
    request.request(url).then(res => {
      this.setData({ title: res.data.data.application_info.title })
      var article = res.data.data.application_info.content
      /**
      * WxParse.wxParse(bindName , type, data, target,imagePadding)
      * 1.bindName绑定的数据名(必填)
      * 2.type可以为html或者md(必填)
      * 3.data为传入的具体数据(必填)
      * 4.target为Page对象,一般为this(必填)
      * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
      */
      var that = this;
      WxParse.wxParse('article', 'html', article, that, 0);
    })
  },
  wxParseTagATap(e) {
    let url = e.currentTarget.dataset.src
    wx.navigateTo({
      url: `/pages/webView/webView?url=${url}`,
    })
  }
})