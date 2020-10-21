// pages/projectList/projectList.js
const navigator = require('../../components/navigation/navigation')
const request = require('../../utils/request')
const check_grey = require('../../utils/checkGrey')
Page({
  data: {

  },
  onLoad: function (options) {
    let pages = getCurrentPages()
    // 设置导航
    navigator.navigator(this, '活动断层探察项目清单', pages) 
    this.getData()
    check_grey.is_grey(this) // 置灰
  },
  // 返回
  back: function() { 
    navigator.back(getCurrentPages())
  },
  getData() {
    let url = `project_list_api`
    request.request(url).then(res => {
      // console.log(res.data.data.project_list[0].attachment_url)
      let attachment_url = res.data.data.project_list[0].attachment_url.replace(/http:/,'http:')
      console.log(attachment_url)
      wx.downloadFile({
        url: attachment_url,
        success: function (res) {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            },
            fail: function(err) {
              console.log(err)
              wx.showToast({
                title: '打开文件失败',
                icon: 'none'
              })
            }
          })
        },
        fail: res => {
          console.log(res)
          wx.showToast({
            title: '下载文件失败',
            icon: 'none'
          })
        }
      })
    })
  }
})