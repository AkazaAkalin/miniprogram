const getTabHeight = (query, context) => {
  query.select('.barBackGround').boundingClientRect(rect => {
    context.setData({
      tabbarHeight: rect.height
    })
  }).exec()
}
module.exports = {
  getTabHeight
}