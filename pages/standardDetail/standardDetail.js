const navigator = require('../../components/navigation/navigation')
const request = require('../../utils/request')
var WxParse = require('../../wxParse/wxParse.js')
const check_grey = require('../../utils/checkGrey')
Page({
  data: {
    href: '',
    fullurl:''
  },
  type:'',
  id:'',
  onLoad: function(options) {
    this.type = options.type 
    this.id = options.id
    let pages = getCurrentPages() // 获取当前的页面栈
    this.getData()
    check_grey.is_grey(this).then(res => {
      navigator.navigator(this, '地震活动断层探察数据中心', pages, res)
    }) // 置灰
  },
  onShareAppMessage: function() {},
  onShareTimeline: function() {},
  getData() {
    let url = `standard_detail_api/${this.id}`
    request.request(url).then(res => {
      // console.log(res.data.data.news_info.attachment_info.full_path)
      let fullurl = res.data.data.news_info.attachment_info.full_path || ''
      // let content = res.data.data.news_info.content
      fullurl = fullurl.replace(/http:/, 'https:')
      this.setData({ fullurl })
      if(fullurl) {
        wx.downloadFile({
          url: fullurl,
          success: function (res) {
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath: filePath,
              success: function (res) {
                console.log('打开文档成功')
              },
              fail: function(err) {
                console.log(err)
                wx.showToast({
                  title: '打开文件失败',
                  icon: 'none'
                })
              }
            })
          },
          fail: res => {
            console.log(res)
            wx.showToast({
              title: '下载文件失败',
              icon: 'none'
            })
          }
        })
      }
      var article = res.data.data.news_info.content
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
  check() {
    wx.navigateTo({
      url: `/pages/webView/webView?url=${this.data.href}`,
    })
  },
  // 左上角返回方法 
  back: function() { 
    navigator.back(getCurrentPages())
  },
  wxParseTagATap(e) {
    // console.log(e.currentTarget.dataset.src)
    let url = e.currentTarget.dataset.src
    wx.navigateTo({
      url: `/pages/webView/webView?url=${url}`,
    })
  }
})