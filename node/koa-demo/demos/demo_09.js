

const Koa = require('koa');
const app = new Koa()
//常见的处理
const main = (ctx)=>{
const n = Number(ctx.cookies.get('view')||0)+1
ctx.cookies.set('view',n)
ctx.body= n +'view'
// cookies 用于存放一些关键的凭证，令牌，由后端控制
}

app.use(main)

app.listen(3000,()=>{
    console.log('项目运行在3000端口');
})