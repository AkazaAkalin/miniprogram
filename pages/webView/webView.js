Page({
  data: {
    webUrl: ''
  },
  onLoad: function (options) {
    console.log(decodeURI(options.url))
    this.setData({webUrl: options.url})
  },
})