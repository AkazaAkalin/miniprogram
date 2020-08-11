function tabbarinit() {
  return [
       { "current":0,
         "tabBarPath": "/pages/index/index",
         "iconPath": "../../images/icon_API.png",
         "selectedIconPath": "../../images/icon_API_HL.png",
         "text": "主页"
       },
       {
         "current": 0,
         "tabBarPath": "/pages/page1/page1",
         "iconPath": "../../images/icon_component.png",
         "selectedIconPath": "../../images/icon_component_HL.png",
         "text": "page1"
       },
       {
          "current": 0,
          "tabBarPath": "/pages/page2/page2",
          "iconPath": "../../images/icon_component.png",
          "selectedIconPath": "../../images/icon_component_HL.png",
          "text": "page2"
       },
       {
        "current": 0,
        "tabBarPath": "/pages/page3/page3",
        "iconPath": "../../images/icon_component.png",
        "selectedIconPath": "../../images/icon_component_HL.png",
        "text": "page3"
       }
     ]
 }
 //tabbar 主入口
 function tabbarmain(bindName = "tabdata", id, target) {
   var that = target;
   var bindData = {};
   var otabbar = tabbarinit();
   otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
   otabbar[id]['current'] = 1;
   bindData[bindName] = otabbar
   that.setData({ bindData });
 }
 function navi(url) {
   wx.switchTab( {url} )
 } 
 module.exports = {
   tabbar: tabbarmain,
   navi: navi
 }