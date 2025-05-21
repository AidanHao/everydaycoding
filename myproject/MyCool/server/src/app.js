const Koa = require('koa');
const app = new Koa();

//koa处理请求体中的参数
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//解决跨域
const cors = require('koa2-cors')//解决跨域问题，告诉浏览器允许跨域
app.use(cors())//cors是函数体，要调用
// res.setHeader('Access-Control-Allow-Origin', '*') // 允许所有的请求源来跨域
// res.setHeader('Access-Control-Allow-Headers', '*') // 允许所有的请求头来跨域 

//获取模块
const user = require('./routes/user');
const article = require('./routes/article');


//必须.routes调用,允许所有请求方法 调用routes里面的内容
app.use(user.routes(), user.allowedMethods());
app.use(article.routes(), article.allowedMethods());



// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 