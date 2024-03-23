// npm init -y
// npm init express 
// npm init ejs

// express 是 koa的鼻祖 不用像koa一样装路由 自带一个路由
// ejs 是一个模板

const express = require('express')
const path = require('path')
const app = express()
const ejs = require('ejs');

app.set('views', path.join(__dirname, 'views'));//views文件都会当作模板读到
app.engine('html', ejs.__express);
app.set('view engine', 'html');//让模板引擎生效


app.get('/', function (req, res) {//定义一个根路径
  res.render('index', {title:'express', xss: req.query.xss})
})


app.listen(3000, () => {
  console.log('listening on 3000');
})