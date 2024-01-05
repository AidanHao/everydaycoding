- 什么是TypeScript?
   javaScript 的超集 让javascript变为强类型

- 如何使用ts?
   - 像js一样来写
   - 怎么加 lang = 'ts' 也可以直接用js来写
   - 加点啥？ts
      - 类型检测
         什么时候需要类型检测，你在乎的地方-> 数据
         路由中比较重要的数据是routes
      -  
## 项目亮点
- 使用了ElementPlus
   - 登录注册页 表单使用
      - 表单的目的是收集数据 :model = "" 进行双向绑定
      每一个el-input v-model =".username"
   - 表单的校验配置一下就好
   - 用户体验做好
      - 自动聚焦
      - @keyup.enter
   - ref 属性 Dom 标记
      - const login = ref();  // null
      - mouted <form ref='login'>
   - 表单提交
      - validate 校验Y