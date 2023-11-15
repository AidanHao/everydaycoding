# 小程序业务架构
 

 - App和Page的概念
    APP 全局 pages共享的
    app.jsg、共享 globalDate
    app.wxss 样式 共享
    app.JSON 应用的配置 应用的顺序
  - globalData 如何来到 Page中的
    - const app = getApp()
      拿到全局的应用对象
    - data 初始化占位符
    {
      data:{
        user:{}//空的
      }
    }
    - 生命周期
      数据来自于后端接口
      onLoad wxml + wxss 生命周期 doucument加载完了会触发一个onLoad事件 显示了
      这是请求数据的最佳时机
    - this.setData({
      user:真正的值
    })
    - 页面会热更新 重新绘制{{}}这部分页面

- 循环输出的概念
  - 模板在{{直出}}外,数组列表输出的常态
  - block 只承载指令 wx:for
    不会出现在文档流中
  - item 默认
    item.image

- css 架构思路
  Dry 原则 Don`t repeat yourself!不要重复自己
  css 业务拆分 一个元素多个类名
  - app.wxss 全局样式
    -公用的样式
    - 模块化
  - page.wxss 页面业务样式