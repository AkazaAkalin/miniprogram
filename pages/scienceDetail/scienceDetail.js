const navigator = require('../../components/navigation/navigation')
const request = require('../../utils/request')
var WxParse = require('../../wxParse/wxParse.js')
Page({
  data: {

  },
  id: '',
  onLoad: function (options) {
    this.id = options.id
    let pages = getCurrentPages() // 获取当前的页面栈
    navigator.navigator(this, '地震活动断层探察数据中心', pages)
    this.getData()
  },

  // 左上角返回方法 
  back: function() { 
    navigator.back(getCurrentPages())
  },
  getData(){
    let url = `subject_detail_api/${this.id}`
    request.request(url).then(res => {
      // this.setData({ text: res.data.data.application_info.content })
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
    // console.log(e.currentTarget.dataset.src)
    let url = e.currentTarget.dataset.src
    wx.navigateTo({
      url: `/pages/webView/webView?url=${url}`,
    })
  }
})