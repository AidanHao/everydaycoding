const Koa = require('koa');
const fs = require('fs')//读取文件
const app = new Koa()

//返回数据怎么写
//自带一个参数 ctx 上下文
const main = (ctx)=>{//只要被app use 掉 的函数一定具有一个ctx参数 ctx == koa
    if(ctx.url.startsWith('/user')){
        const data = fs.readFileSync('./data.json','utf8')
        ctx.body = data
    }else if(ctx.url.startsWith('/home')){
        // 以前是前后端不分离的开发方式
        ctx.response.type = 'application.json'//表示响应要为json字符串
        const page = fs.readFileSync('./template.html','utf8')
        ctx.body = page
    }
}
app.use(main)

app.listen(3000,()=>{
    console.log('项目运行在3000端口');
})