const Koa = require('koa');
const app = new Koa()
//常见的处理
const main = (ctx)=>{
    // throw(500)//人为的让程序崩掉
    
    ctx.response.status = 404
    ctx.body = 'page is not found'
}

app.use(main)

app.listen(3000,()=>{
    console.log('项目运行在3000端口');
})