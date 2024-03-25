const express = require('express')//老牌的 node 框架
const app = express()// 实例化应用
const Vue = require('vue')
const renderer3 = require('@vue/server-renderer')//从vue模块之中引入server-renderer模块
// ssr 来做编译 string
const vue3Compile = require('@vue/compiler-ssr')


const vueapp = {
    template:`
        <div>
            <h1 @clicl = "add">{{num}}</h1>
            <ul>
                <li v-for= "(todo,n) in todos">{{n+1}}---{{todo}}</li>
            </ul>
        </div>
    `,
    data(){
        return {
            num:1,
            todos:['吃饭','睡觉','打豆豆']
        }
    },
    methods:{
        add(){
            this.num++
        }
    }
}
// 服务器渲染
vueapp.ssrRender = new Function('require',vue3Compile.compile(vueapp.template).code)(require)

// 添加一个路由中间件
app.get('/',async function(req,res){
    let vapp = Vue.createSSRApp(vueapp)
    let html = await renderer3.renderToString(vapp)
    const title = "Vue SSR"
    // viewport是视窗，是响应式的关键 移动端适配里面比较重要的东西
    // 标题是网页seo最关键的一个内容
    let ret = `
        <!DOCTYPE html>
        <head>
            <meta charset = "UTF-8"/>
            <meta name = "viewport" content = "width=device-width,initial-scale=1.0"/>
            <title>${title}</title>
        </head>
        <body>
            <div id="app">
                ${html}
            </div>
        </body>
    </html>
    `
    // 相当于koa的ctx.body
    res.send(ret)

})

app.listen(1234,()=>{
    console.log('listen 1234');
})