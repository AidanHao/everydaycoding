pages 用于存放业务页面文件的目录
static 用于放一些静态资源

main.js 中包括了vue2 和 vue3 的内容
mainfest 多端配置文件
pages.json 配置页面路由导航信息的地方
uni.promisify 是一个兼容性配置
uni.scss 是一个内置的scss的css开发 已经做成全局了，里面的变量可以直接拿着去用
用终端开打 输出pwd能看到安装路径
要写官方能够编译的标签

#vue生命周期
- vue 自带的生命周期在uniapp都能使用

#页面生命周期
- uniapp 提供了页面生命周期，比如上拉加载，下拉刷新，页面渲染完成等等钩子函数

#应用生命周期
- 整个app应用的状态变化，只能在App.vue 里面使用

# 全局变量
1、Vue.prototype.name = '测试名称' （在options API 中这样干）

2、在App.vue中设置 （ 这个在vue中是不存在的，是uniapp中提供的 ）
```javascript
globalData:{
	name:'全局名称',
},
```
然后在页面上调用不需要引用
```vue
const name = getApp().globalData.name
```

3、Vuex


在uniapp是不需要引入vue router的直接使用
我们可以在pages.json里面看到路由配置
"navigationBarTitleText" : "关于",是关于小程序端的头部

```javascript
const goAbout = ()=>{
	uni.navigateTo({
		url:'/pages/about/about'
	})
}
```


还有第二种跳转方式：<navigator url="/pages/about/about">去关于页面</navigator>
相当于vue中的router-link to=""

还有页面请求
