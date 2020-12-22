const request = require('./request')
let is_grey = (context) => {
  return request.request('defaultSetting_api').then(res=>{
    // console.log(res.data.data.defaultSetting.is_grey)
    let grey = res.data.data.defaultSetting.is_grey
    if(grey == 2) {
      context.setData({is_grey: true})
      return true
    }
  })
}
module.exports = {
  is_grey,
}