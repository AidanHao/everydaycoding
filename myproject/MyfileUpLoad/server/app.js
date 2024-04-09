const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');//让koa能解析post参数

// 拿到对应模块
const user = require("./routes/user.js")


const cors = require('koa2-cors')//解决跨域问题，告诉浏览器允许跨域
app.use(cors())//cors是函数体，要调用
//调用bodyParser
app.use(bodyParser())


//必须.routes调用,允许所有请求方法 调用routes里面的内容
app.use(user.routes(),user.allowedMethods())


// 3000表示3000端口
app.listen(3000,()=>{
    console.log('项目已启动');
})