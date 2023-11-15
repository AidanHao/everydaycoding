//App -> Page的桥梁（app来到page的桥梁）
//微信提供 应用对象
const app = getApp()
Page({
  //页面的数据
  data:{
    // user:{}
    slides:null,
    entities:null
  },
  //生命周期 doucument加载完了会触发一个onLoad事件
  onLoad(){
    // console.log(app,'页面显示了');
    //this指向Page
    //响应式的页面，只要数据一到达，热更新，自动编译，
    setTimeout(()=>{
      this.setData({
        slides: app.globalData.slides,
        entities:app.globalData.vehicles
      })
    },2000)
    

  },
  onReady(){
    console.log('ready GO')
  }
})