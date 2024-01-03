1. 移动端适配 
    直接装依赖yarn add amfe-flexible
2. 常见标签样式初始化 reset.css
3. 



# server
1. navicat 连接mysql
2. 创建一个 名为 noteBook 的库
3. 在noteBook上右键导入sql文件 运行sql文件

4. 配置了路由，router接口 > routes
5. 创建mysql的配置文件  > config    index.js
6. 做mysql的连接 > controllers


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