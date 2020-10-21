const app = getApp();
function navigator(context, title = '', pages) {
  let showBack 
  pages.length > 1 ? showBack = true : showBack = false
  context.setData({
    naviData: {
      height: app.globalData.statusBarHeight + app.globalData.naviHeight,
      title,
      margin: app.globalData.navTop,
      showBack,
    }
  })
}
function back(pages) {
  wx.navigateBack({
    url: pages[pages.length-2].route
  })
}
module.exports = {
  navigator,
  back
}