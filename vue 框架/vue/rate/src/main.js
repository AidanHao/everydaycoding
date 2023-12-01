// main.js 入口文件
import { createApp } from 'vue'
// create app接收一个根组件，生成一个web app 挂载在#app上
// 根组件，vue开发的基本单元
import App from './App.vue'

// 原生的js不支持vue的语法，Dom编程比较低效，所以要挂载一下！
// #app 在index.html   vue的css和js和html总和为组件,vue开创新时间，没有Dom操作，由vue开启的mvvm世界，数据绑定的事件，模板编译的世界，组件式生成的世界
// 原生js 不支持mvvm
// App是js声明的
// web app
createApp(App).mount('#app')
