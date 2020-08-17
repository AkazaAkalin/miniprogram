function tabbarinit() {
  return [
    { "current":0,
      "tabBarPath": "/pages/dynamic/dynamic",
      "iconPath": "../../images/tabBar/dynamicoff.png",
      "selectedIconPath": "../../images/tabBar/dynamicon.png",
      "text": "动态"
    },
    {
      "current": 0,
      "tabBarPath": "/pages/standard/standard",
      "iconPath": "../../images/tabBar/standardoff.png",
      "selectedIconPath": "../../images/tabBar/standardon.png",
      "text": "标准"
    },
    {
      "current": 0,
      "tabBarPath": "/pages/map/map",
      "iconPath": "../../images/tabBar/mapoff.png",
      "selectedIconPath": "../../images/tabBar/mapon.png",
      "text": "地图"
    },
    {
    "current": 0,
    "tabBarPath": "/pages/science/science",
    "iconPath": "../../images/tabBar/scienceoff.png",
    "selectedIconPath": "../../images/tabBar/scienceon.png",
    "text": "科普"
    },{
    "current": 0,
    "tabBarPath": "/pages/more/more",
    "iconPath": "../../images/tabBar/moreoff.png",
    "selectedIconPath": "../../images/tabBar/moreon.png",
    "text": "更多"
    }
  ]
 }
 //tabbar 主入口
  function tabbarmain(bindName = "tabdata", id, target) {
    var that = target;
    var bindData = {};
    var otabbar = tabbarinit();
    otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath'] //换当前的icon
    otabbar[id]['current'] = 1;
    bindData[bindName] = otabbar
    that.setData({ bindData });
  }
 function navi(url) {
   url === '/pages/map/map' ? wx.navigateTo( {url} ) : wx.switchTab( {url} )
 } 
 module.exports = {
   tabbar: tabbarmain,
   navi: navi
 }