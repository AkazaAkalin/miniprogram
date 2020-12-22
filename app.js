//app.js
const request = require('./utils/request')
App({
  globalData: {
    pixelRatio: null,
    statusBarHeight: null,
    naviHeight: 44,
    windowHeight: null,
    screenHeight: null,
    navTop: null,
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 判断小程序是否要置灰
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.pixelRatio = result.pixelRatio
        this.globalData.statusBarHeight = result.statusBarHeight
        this.globalData.screenHeight = result.screenHeight
        this.globalData.windowHeight = result.windowHeight
        if(result.platform == "ios") {
          this.globalData.toBar = 44
        } else if(result.platform == "android"){
          this.globalData.toBar = 48
        } else {
          this.globalData.toBar = 44
        }
        // console.log(result.statusBarHeight)
      },
    })
    let menuButtonObject = wx.getMenuButtonBoundingClientRect()
    this.globalData.navTop = menuButtonObject.top
    wx.getLocation({
      // success: res => console.log(res),
      // fail: res => console.log(res)
    })
  },
  onShow: function(options) {
    // console.log(options.scene)
    this.globalData.scene = options.scene
  },
})