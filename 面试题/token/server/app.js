const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const userRouter = require('./routes/user')

const app = new Koa()

// cors无法解析post请求装一个koa-bodyparser

// 解析post请求传递的参数
app.use(bodyParser())

//处理跨域
app.use(cors())

//让接口生效
app.use(userRouter.routes(),userRouter.allowedMethods())


app.listen(3000,()=>{
    console.log('项目启动在3000端口');
})