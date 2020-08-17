//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取像素比
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.pixelRatio = result.pixelRatio
        this.globalData.statusBarHeight = result.statusBarHeight
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
  },
  globalData: {
    pixelRatio: null,
    statusBarHeight: null,
    naviHeight: 44
  }
})