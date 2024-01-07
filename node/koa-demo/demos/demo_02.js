const Koa = require('koa');

const app = new Koa()

//返回数据怎么写
//自带一个参数 ctx 上下文
const main = (ctx)=>{//只要被app use 掉 的函数一定具有一个ctx参数 ctx == koa
    // 在koa body就是用于向前端提供数据的方法 和原生node 的res.end 一样
    if(ctx.url.startsWith('/home')){
        ctx.response.type='json'//设置响应体的类型
        ctx.body = '<h2>hello world</h2>'
    }else if(ctx.url.startsWith('/detail')){
        ctx.body = 'detail'
    }else{
        ctx.body = '404'
    }
}
app.use(main)

app.listen(3000,()=>{
    console.log('项目运行在3000端口');
})