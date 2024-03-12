## 蔚来面试

- 合肥 蔚来 内部系统开发
    - 周三 半个月 

### 一面
- 对前端的理解
- 怎么学习
- 项目上线
- 样式布局 水平居中
- 项目中判断登录注册 jwt cookie session

### 二面
性格

提前去思考这些问题，整理话术，互相模拟面试
一面 面试官是用人的，有1个hc的人
二面一般是一面的leader 一面反馈的帮在把关 有决定权



## B站
- 时长
    70分钟 50-80分钟
    不用追问 自问自答
    拿下一面
    

- git命令 加强
    - git init .... get push git clone
    - 撤回的指令 灵机一动
    - 分支问题 branch
    - git rebase 变基

- 两个==和三个===的区别

- vue的响应式原理 ref reactive 深度 vue源码的学习
    - proxy(对象)
    - defineProperty(属性)
    - vue2/vue3 区别
        数组 增改
    - 追问 依赖收集
    - watcher

- 如何调试自己的代码
    - 断点 逐步跟进，断点的上下文变量的值
    - console.log()
    - vue调试工具 devtool 来观测代码 数据状态与界面是否统一
    - console.time console.timeEnd 性能优化 监听花销的时间
    - 浏览器自带性能面板

- 网络请求
    - postman 模拟请求 测试接口 restful 
        restful api风格，由Method + url 一切皆资源
        GET /post 列表页 读 /posst/:id
        POST /post 写
        DELETE 
        PUT/PATCH 修改 PUT 文件上传修改改头像 PATCH 部分修改改字段
        OPTIONS ...

- 常用的状态码 深入
    304 实现

- node 流 stream
    - 什么是流 JAVA 二进制流

- vuex/pinia
    - 超过了 父子，兄弟组件通信之外 vuex/pinia 让状态在啊任何组件间共享
    - store
        应用 = 状态存储 = UI组件 组件更专注于界面开发
    - 跨组件跨页面 购物车/ 登录状态
    - vuex的持久化储存
    - pinia的持久化储存 原理存储在本地有点像本地存储
    - vuex 缺点 不太好理解 mutation 
    - pinia hooks 函数化，灵活 对ts的支持更好

- 持久化
    localStorage + json.parse() + json.stringify()

- JWT

- 算法
    - 深度优先搜索 广度优先 DFS BFS
    - 用递归 

- 学习建议，机会很难得

- 不要说就学了几个月

- 为什么要学前端？AIGC 快速学习 高效开发 代码助理

- 父子组件生命周期执行顺序 深入
    - 图
    - 父 created 让父组件在内存当中
    - 子 created
    - 子 挂载
    - 父 挂载

- 手写ts 刷一点题目 
    interface type 区别
        :string[]

- 盒模型 布局 

- 是否有环 双指针

总结： 
    TOP20的面试难度主要在于全面的基础能力 算法/数据结构 、框架vue，基础JS/CSS八股


- 树的遍历
    用递归的概念来定义一棵树
    先，中，后续 根节点
    有了先序遍历，中序遍历，后续遍历，为什么还需要广度和深度算法
    BFS DFS ? 迷宫 ？ 路径问题

    想起那张图
    - 深度优先 适合递归

- 列表组装成树状结构
    - 经典题
    - 树形
    - 将常见困难开发点拿出来
        - 多级菜单、省县市选择的需求
        - 列表 后端传过来的数据项 一条条记录
        - 任务 拼成树形结构
            显示菜单，贴合地址选项等树形操作
        - 二重for循环 O(n^2)
        
- 编写一个类EventEmitter，实现自定义事件 
    - 前端 addEventListener  click内置事件  不可以写自定义事件
    - 订阅发布者模式 经典的设计模式 

    - 实现一个EventEmitter类 on emit off once方法
    - node 内置了EventEmitter 可以直接继承使用