# vue 全家桶   MVVM

- vue 响应式组件开发
    - components
        - common
        - 业务组件
    - views/
        - UI组件库 element-plus
- vue-router
    前端有了路由
    SPA 快！不需要做传统 的 http request+response
    页面不会白一下
    缺点：SEO 搜索引擎优化不够好！

- vuex/pinia        就好像是一家公司的财务 小项目可以不用vuex v-router是标配
    前端可以管理数据
    - 确保数据流的正确性
        数组在组件里叫什么？ 状态
    - 将数据与组件剥离 ，UI组件更单纯

- vue 项目 数据 从后端到页面显示 经过的所有流程和关键环节
    todos 
    mysql/mongondb db/todos table
    sql 语句
    java/node 内存 MVC模式 
    router 后端的路由叫给controler
    res
    http GET : 3000/todos
    axios http.js index.js getTodoList
    store action -> mutations->state
    组件 由外到内 由页面去做数据请求 由views/通过-> props 传给子组件（UI化）
    UI Component + State +Router = SPA
    UI Component + State = App

- pinia?
    - 更简单
        store/todo.js defineStore 返回值命名 use 开头 useTodoStore
        函数返回 state
        import {useTodoStore} from './store/todo.js'
        const {todos } = useTodoStore()
    - 更现代
        hooks编程 use 开头
    - 讲数据和UI组件分离