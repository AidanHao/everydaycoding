# 后端初始化
npm init -y -y表示后面的问题都为yes

# 创建一个app.js

# 安装koa
npm i koa

# koa路由
npm i @koa/router
配置了路由

# koa无法解析post请求的参数 然后再app中使用
npm i koa-bodyparser

# 怎么去数据库拿数据
声明了一个config定义数据库的配置文件

再做一次封装 controllers 用于放sql语句逻辑，封装和数据库连接的相关操作

安装一个mysql
 npm i mysql

解决跨越问题
安装cors  npm i koa2-cors 