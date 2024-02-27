const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const path = require('path');

function rewriteImport(content) {
    // [0-9]一个 数字 |或者  
    // [] | [0|1|2|3] [^] () 分组 g 全文 \n   
    return content.replace(/ from ['|"]([^'"]+)['|"]/g, function(s0, s1) {
        // console.log(s0, s1)
        if (s1[0]!=='.' && s1[1] !== '/') {
            return `from '/@modules/${s1}'`
        } else {
            return s0
        }
    })
}
// / 后端路由
// 中间件 middleware 洋葱模型 
app.use(async ctx => {
    // 如果/
    // 上下文请求 + 响应对象 es6高级结构功能
    const { request: { url, query } } = ctx

    if (url === '/') {
        // 设置响应头
        ctx.type = "text/html"
        let content = fs.readFileSync('./index.html', 'utf-8');
        ctx.body = content        
    } else if (url.endsWith('.js')) {
        // resolve 有用的物理地址
        // console.log(__dirname, url.slice(1))
        const p = path.resolve(__dirname, url.slice(1))
        ctx.type = 'application/javascript'
        const content = fs.readFileSync(p, 'utf-8')
        ctx.body = rewriteImport(content)
    }
})

app.listen(5173, () => {
    console.log('快来一起手写vite， 拿下美团')
})