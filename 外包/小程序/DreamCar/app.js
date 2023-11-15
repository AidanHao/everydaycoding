// 应用
// Page()页面
//配置
App({
  globalData:{
    
  },
  //打开的时候，触发onLaunch事件,首先发生
  onLaunch(){
    // console.log('应用启动了');
    //发送一个远程请求！
    wx.request({
      url: 'https://resources.ninghao.net/wxapp-case/db.json',
      success:(response)=>{
        //在应用启动时，发送接口请求
        //前后端接口连调
        // console.log(response);
        //写assign 代替new
        Object.assign(this.globalData,response.data)
        // console.log(this,'-----');
      }
    })
  }

})