// vue 跨端实现 大前端
// 浏览器端 （pc/mobile）,小程序（WXML），服务器端（没有视图Dom 有虚拟dom）
// 客户端App uniapp exe桌面端 windows,liux

// vue模块化 响应式模块 独立于其他模块的
// UI模块 独立出来

// 一份代码打包成各种应用，uniapp 的 vue UI模块独立于其他模块
// UI模块 可拔插的

// 响应式 和 虚拟dom（一般是聊性能）


// 现代UI开发的核心 = 响应式和虚拟Dom MVVM
// 聚焦于业务，而不是api effect用于依赖收集
// const {effect,reactive} = require('@vue/reactivity')
const {effect,reactive} = require('./src/reactivity')   

// SSR 服务器端 使用响应式
let dummy
// 响应式机制的主要功能是：把普通JavaScript对象封装成为响应式对象
// 拦截数据的获取 get操作和修改set操作 在get的时候依赖收集，在set的时候触发依赖，派发更新 实现依赖数据的自动化更新
const counter = reactive({num1:1,num2:2})
// 注册回调函数，响应式地通知effect 执行函数
effect(()=>{
    dummy = counter.num1 + counter.num2
    console.log(dummy);
})
setInterval(()=>{
    counter.num1++
},1000)
