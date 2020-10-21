Page({
  data: {
    webUrl: ''
  },
  onLoad: function (options) {
    let url = decodeURI(options.url)
    let webUrl = url.replace(/http:/g, 'https:')
    console.log(webUrl)
    this.setData({webUrl})
  },
})