# typescript 让工资+10%
- 让前端像写java一样写大型项目 代码一万行+

前端里面两个
- vue/react + typescript 
- es6 
   弱类型还是没有，缺点容易出问题，
   let banners:[int] = [1,2,3]
- typescript 是js 的超集
- 给项目引入前端模型层
   - 路由已经部署后端的，前端也可以有
   - 前端也可以有自己的模型，MVVM

- UI组件和数据管理的分离
   - store / components|views
   - pinia defineStore('todos',()=>{
      return {
         state,
         ...actions(各种各样的)
      }
   }) useTodosStore
   整个生命周期的数据管理
   - vue ref
   - 这里是唯一请求 axios 接口的地方
   - app.use(createPinia())全局挂载
   - 引入这个模块，执行useTodoStore 方法
   会执行两次
   const {todos} = useTodoStore()
   const {getTodos} = useTodoStore()

- vue 项目开发设计模式
   - 越复杂的，只要是流程，其实很简单，只不过需要一本说明数
   - ui组件 + 数据管理
   - 数据的流向，
      backend>models ->  api -> store -> component
   - SPA
      router -> views -> components
   - APP = VUE + VueRouter + piniaa + ts
   - 写UI组件
      ElementPlus(熟悉) + views + components(common|components) + Tailwindcss(熟悉) + 组件设计艺术

- App.vue 一个个组件慢慢搭 
   <> 定义 defineProps
   - 不要用ts
