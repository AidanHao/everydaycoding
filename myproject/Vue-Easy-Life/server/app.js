const Koa = require('koa');// 引入koa
const app = new Koa();// 声明一个实例
const bodyParser = require('koa-bodyparser')//让koa可以解析post请求的参数

const machine = require('./routes/machine.js')// 引入machine.js

const cors = require('koa2-cors')//解决跨域问题，告诉浏览器允许跨域
app.use(cors())//cors是函数体，要调用








// 使用以下
app.use(bodyParser())

// 主要逻辑
// const main = (ctx) => {
// ctx.body = 'hello world'
// }
// app.use(main)
// 路由要这样调用,且允许所有请求方式
app.use(machine.routes(),machine.allowedMethods())//使用掉machine




// 监听项目的运行
app.listen(3000,()=>{
console.log('项目已启动');
});