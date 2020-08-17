import {baseUrl} from "./config"
const request = (requestUrl = '', data = '', method = 'get') => {
  let url  = baseUrl + requestUrl
  return new Promise((resolve, reject) => {
    wx.request({
      url, data, method,
      success: res => { resolve(res) },
      fail: reason => { reject(reason) }
    })
  })
}
module.exports = {
  request
}