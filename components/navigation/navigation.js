const app = getApp();
function navigator(context, title = '', pages, res, home) {
  let showBack, showHome
  pages.length > 1 ? showBack = true : showBack = false
  home ? showHome = true : showHome = false
  context.setData({
    naviData: {
      height: app.globalData.statusBarHeight + app.globalData.naviHeight,
      title,
      margin: app.globalData.navTop,
      showBack,
      showHome,
      grey: res || ''
    },
  })
}
function back(pages) {
  wx.navigateBack({
    url: pages[pages.length-2].route
  })
}
function backHome() {
  wx.switchTab({
    url: '/pages/dynamic/dynamic',
  })
}
module.exports = {
  navigator,
  back,
  backHome
}