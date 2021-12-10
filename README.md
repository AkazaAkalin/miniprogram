# activefaultMiniprogram
地震活动断层微信小程序项目
********************************************
1. 图片资源尽量先进行裁剪再丢到云服务器上，转换成链接资源使用
  本地图片 在images文件下 
  网络图片资源在使用时 
  1.引入utils文件下的image.js
  2.在image.js中放入图片的链接，注意命名时的可读性
  3. 在使用图片的页面对应的js文件中引入依赖
    const images = require('../../utils/image.js')
  4. 获取资源链接时按对象中获取属性的方式获取
********************************************
自定义tabbar
0. 在app.wxss下 引入依赖 
    @import "/components/tabbar/tabbar.wxss";
1. 组件路径在components/tabbar下
2. 自定义的tab 文字 图标 方法的定义在 tabbar.js中 样式问题在wxss文件中修改
2、引入依赖时js中 const tabbar = require('../../components/tabbar/tabbar.js') 
   并在onload中执行 tabbar.tabbar("tabBar", 0, this)
    在对应的wxml文件中
    <import src='../../components/tabbar/tabbar.wxml'/>
    <template is="tabbar" data="{{tabBar:bindData.tabBar}}"/>
    * tabbar 设置的每一个tab都需要引入
3.tabbar的方法 在使用时在组件中添加事件，然后暴露给父组件，
父组件获取子组件的方法并在自身定义的方法中使用子组件的方法
eg  tab组件下的switchTab功能的实现： 
1.在组件中绑定tap、 
2.在组件JS文件中添加事件，并通过 module.exports 暴露
3.父组件接受暴露出来的事件后 在自身文件下定义方法 并执行 子组件的事件
**********************************************
