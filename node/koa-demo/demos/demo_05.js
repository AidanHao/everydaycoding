const Koa = require('koa');
const app = new Koa()
const Router = require('@koa/router')//引入koa路由
const router = new Router

const logger = (ctx,next)=>{//日志
    // Date.now()直接获得一个时间戳
    console.log(`${ctx.url}-${ctx.method}-${Date.now()}`);
    next()
}

const main = (ctx)=>{
    ctx.body = '首页页面'
}
const about = (ctx)=>{ 
    ctx.body = 'about page'
    
}

app.use(logger)//调用日志函数

router.get('/main',main)
router.get('/about',about)

//app.use 只有最上面的use会生效 想让第二个use生效 要在use调用的函数中调用next()
app.use(router.routes())//让所有的路由都生效 所有配置的路由都生效
app.use(router.allowedMethods())// 允许所有的方法都生效，请求方式 



app.listen(3000,()=>{
    console.log('项目运行在3000端口');
})