const navigator = require('../../components/navigation/navigation')
const request = require('../../utils/request')
var WxParse = require('../../wxParse/wxParse.js')
const check_grey = require('../../utils/checkGrey')
const images = require('../../utils/image')
const app = getApp()
Page({
  data: {
    title:'',
    column: false,
    shareImg: images.images.shareImg
  },
  type:'',
  id:'',
  showHome: false,
  onLoad: function (options) {
    let scene = app.globalData.scene
    let pageLength = getCurrentPages().length
    if(scene == '1007'&& pageLength == 1 || scene == '1008'&& pageLength == 1) {
      this.showHome = true
    }
    // console.log(options,getCurrentPages()[getCurrentPages().length-1].route,getCurrentPages())
    this.type = options.type 
    this.id = options.id
    let pages = getCurrentPages() // 获取当前的页面栈
    // navigator.navigator(this, '地震活动断层探察数据中心', pages)
    this.getData()
    check_grey.is_grey(this).then((res => {
      navigator.navigator(this, '地震活动断层探察数据中心', pages, res, this.showHome)
    })) // 置灰
  },
  onShareAppMessage: function(e) {
    // console.log('share', this.data.title)
    return {
      title: this.data.title,
      path: `${getCurrentPages()[getCurrentPages().length-1].route}?type=${this.type}&id=${this.id}`,
      imageUrl: '../../images/default.png'
    }
  },
  onShareTimeline: function(e) {
    // console.log('share', this.data.title)
    return {
      title: this.data.title,
      path: `${getCurrentPages()[getCurrentPages().length-1].route}?type=${this.type}&id=${this.id}`,
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
  getData() {
    let url = `news_detail_api/${this.id}`
      request.request(url).then(res => {
        // console.log(res,base)
        let { title, published_time, source_arr } = res.data.data.news_info 
        published_time = published_time.substr(0,10)
        this.setData({title, published_time, source_arr})
        var article = res.data.data.news_info.content
        article = article.replace(/font-size: 14pt;/g,'font-size: 36rpx')
        article = article.replace(/line-height: 1.5;/g,'')
        article = article.replace(/text-indent: 2em;/g,'text-indent: 72rpx;')
        /*
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
    // console.log(e.currentTarget.dataset.src)
    let url = e.currentTarget.dataset.src
    wx.navigateTo({
      url: `/pages/webView/webView?url=${url}`,
    })
  },
})