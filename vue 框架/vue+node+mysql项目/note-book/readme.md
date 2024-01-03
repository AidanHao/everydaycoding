1. 移动端适配 
    直接装依赖yarn add amfe-flexible
2. 常见标签样式初始化 reset.css
3. vant UI 安装了一个前端框架
4. axios 封装 
    axios可以做拦截操作 ，可以在请求发出去的中途拦截下来，拦截之后可以进行一系列的自定义的操作，响应的时候也可以拦截下来可以干啥呢 比如判断，把异常的情况处理掉



# server
1. navicat 连接mysql
2. 创建一个 名为 noteBook 的库
3. 在noteBook上右键导入sql文件 运行sql文件

4. 配置了路由，router接口 > routes
5. 创建mysql的配置文件  > config    index.js
6. 做mysql的连接 > controllers

7. 封装了登录sql函数,拿到业务逻辑里面使用了

# 跨域问题
- 是浏览器的同源策略
    一个接口地址包含：
    https://127.0.0.1:3000/login

    https:  协议
    127.0.0.1:  域名
    3000: 端口

    在浏览器眼里这三者全部相同视为同源
    电脑上的端口是唯一的 解决跨越有多种方法，我们使用让后端响应体设置告诉浏览器不要启动跨域机制了,前端基本没有解决跨越问题的方法，有特殊情况
1. cors 直接在后端安装npm i koa2-cors 使用这个插件解决后端跨域问题














# 后端初始化 npm init -y //-y表示后面全为yes
给后端装饰koa npm i koa koa是node的一个框架
安装一个路由npm i @koa/router
npm install nodemon -g解决一种要重启项目
npm i koa-bodyparser 解决koa无法解析post请求的参数

npm i mysql安装名为mysql的第三方库

后端的目录结构
控制层：
路由层：
服务层


要注意安装的是mysql2

接下来安装的是axios

浏览器存储 浏览器内存中的数据不是响应式的
Local Storage 本地存储 无穷大，不手动删除一致在
Session storage  会话存储  手动删除，关闭浏览器就消失
cookie  手动删除，关闭浏览器就消失
web storage  无穷大，不手动删除一致在
web sql  浏览器提供的数据库，可以存储大量数据，但是不支持事务，不支持跨域，不支持索引，不支持存储过程，不支持触发器 

前端无安全性可言，前端开发就不是安全的
由后端判断你登没登陆才是安全的
路由守卫的作用
一般设置页面的头部标签标题




1. 移动端适配 // 之前是rem    // https://www.npmjs.com/package/amfe-flexible  // yarn add amfe-flexible
2. 常见标签样式初始化  reset.css  // https://meyerweb.com/eric/tools/css/reset/
3. 用一个移动端的UI框架 // vue的UI框架 https://vant-contrib.gitee.io/vant/#/zh-CN  vant4适用于vue3 vant3适用于vue2
    这个框架打造的公司是有赞 ，技术很强，但是没有饿了么有名
    - vant还可以写小程序  公司写小程序都是用vue，不是原生js
    安装： yarn add vant
    引入路由：yarn add vue-router@4
    安装less：
    按道理先进首页，之前判断是否登录
    数据库中先写死一个账号，脏数据用来测试