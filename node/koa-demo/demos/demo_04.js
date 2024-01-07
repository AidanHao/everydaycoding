const Koa = require('koa');
const app = new Koa()
const Router = require('@koa/router')//引入koa路由
const router = new Router
const main = (ctx)=>{
    ctx.body = '首页页面'
}
const about = (ctx)=>{ 
    ctx.body = 'about page'
    
}
router.get('/main',main)
router.get('/about',about)
app.use(router.routes())//让所有的路由都生效 所有配置的路由都生效
app.use(router.allowedMethods())// 允许所有的方法都生效，请求方式 



app.listen(3000,()=>{
    console.log('项目运行在3000端口');
})