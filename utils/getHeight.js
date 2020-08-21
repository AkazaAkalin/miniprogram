const getHeight = (query, className) => {
  return new Promise(resolve => {
    query.select(`.${className}`).boundingClientRect(rect => {
      resolve(rect.height)
    }).exec()
  })
}
module.exports = {
  getHeight
}