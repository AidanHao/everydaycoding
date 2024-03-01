
const Koa = require('koa')
const app = new Koa()
const user = require('./routes/user.js')//这个地址就相当于抛出的东西，赋值给了user
const bodyParser = require('koa-bodyparser')//让koa能解析post参数
const note = require('./routes/note.js')


const cors = require('koa2-cors')//解决跨域问题，告诉浏览器允许跨域
app.use(cors())//cors是函数体，要调用

//主要逻辑
// const main = (ctx)=>{
//     // 向前端反馈
//     if(ctx.url == '/login'){
//         ctx.body = '登录成功'
//     }else if(ctx.url=='/register')
//     {
//         ctx.body='注册成功'
//     }
// }

//调用bodyParser
app.use(bodyParser())

//必须.routes调用,允许所有请求方法 调用routes里面的内容
app.use(user.routes(),user.allowedMethods())
app.use(note.routes(),note.allowedMethods())



// 3000表示3000端口
app.listen(3000,()=>{
    console.log('项目已启动');
})