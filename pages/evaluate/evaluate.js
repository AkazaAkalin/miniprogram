const images = require('../../utils/image')
const navigator = require('../../components/navigation/navigation')
const check_grey = require('../../utils/checkGrey')
const request = require('../../utils/request')
Page({
    data: {
        tip: images.images.suggestionFeedback.tip
    },
    onLoad: function () {
        let pages = getCurrentPages() // 获取当前的页面栈
        check_grey.is_grey(this).then(res => {
            navigator.navigator(this, '地震活动断层勘察数据中心', pages, res)
        }) // 置灰
    },
    onShareAppMessage: function () {},
    // 左上角返回方法 
    back: function () {
        navigator.back(getCurrentPages())
    },
    viewReport() {
        console.log('viewReport')
        let url = `project_list_api`
        request.request(url).then(res => {
            // console.log(res.data.data.project_list[0].attachment_url)
            let attachment_url = res.data.data.project_list[0].attachment_url.replace(/http:/, 'https:')
            // console.log(attachment_url)
            wx.downloadFile({
                url: attachment_url,
                success: function (res) {
                    const filePath = res.tempFilePath
                    wx.openDocument({
                        filePath: filePath,
                        success: function (res) {
                            // console.log('打开文档成功')
                        },
                        fail: function (err) {
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