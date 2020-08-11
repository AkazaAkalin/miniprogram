const getTabHeight = (query, context) => {
  query.select('.tabBar').boundingClientRect(rect => {
    context.setData({
      tabbarHeight: rect.height
    })
  }).exec()
}
module.exports = {
  getTabHeight
}