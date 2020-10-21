const navigator = require('../../components/navigation/navigation')
const baseUrl = require('../../utils/config.js').baseUrl
const check_grey = require('../../utils/checkGrey')
const request = require('../../utils/request')
Page({
  data: {
    docList:[]
  },
  onLoad: function () {
    let pages = getCurrentPages() // 获取当前的页面栈
    navigator.navigator(this, '数据共享', pages)
    check_grey.is_grey(this) // 置灰
    this.getDocumentData()
  },
  // 左上角返回方法 
  back: function() { 
    navigator.back(getCurrentPages())
  },
  // 获取常用文件下载模块的数据
  getDocumentData() {
    let url = `file_download_api`
    request.request(url).then(res => {
      // console.log(res.data.data.file_downloads)
      this.setData({
        docList:res.data.data.file_downloads
      })
    })
  },
  // 下载文档并打开
  dowmload(e) {
    let id = e.currentTarget.dataset.id
    wx.downloadFile({
      url: `${baseUrl}handout_down/${id}`,
      success: res => {
        console.log(res.tempFilePath, 'success')
        let tempPath = res.tempFilePath
        wx.openDocument({
          filePath: tempPath,
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
      fail: err => {
        console.log('fail')
      }
    })
  },
  // 预览图片
  // preview(e) {
  //   let { src }  = e.currentTarget.dataset
  //   wx.previewImage({
  //     urls: [src],
  //   })
  // }
})