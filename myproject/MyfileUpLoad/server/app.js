const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');//让koa能解析post参数



// // 解决跨域
// res.setHeader('Access-Control-Allow-Origin', '*') // 允许所有的请求源来跨域
// res.setHeader('Access-Control-Allow-Headers', '*') // 允许所有的请求头来跨域 


// 拿到对应模块
const user = require("./routes/user.js")
const upload = require("./routes/bigfiles.js")


const cors = require('koa2-cors')//解决跨域问题，告诉浏览器允许跨域
app.use(cors())//cors是函数体，要调用

//调用bodyParser
app.use(bodyParser())



//必须.routes调用,允许所有请求方法 调用routes里面的内容
app.use(user.routes(),user.allowedMethods())
app.use(upload.routes(),upload.allowedMethods())


// 3000表示3000端口
app.listen(3000,()=>{
    console.log('项目已启动');
})