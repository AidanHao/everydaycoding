const Koa = require('koa');//中间建的概念

const fa = (ctx,next)=>{
    console.log('a');
    next()
    console.log(1);
}
const fb =(ctx,next)=>{
    console.log('b');
    next()
    console.log(2);
}
const fc = (ctx,next)=>{
    console.log('c');
    next()
    console.log(3);
}
// 中间件的执行顺序有点像递归，执行到next就进入下一层，再一步一步往外层函数跳
// 这种方式叫洋葱模型
const app = new Koa()
app.use(fa)// 所有的被use的函数都叫中间件函数，中间件执行是有规则的
app.use(fb)
app.use(fc)

app.listen(3000,()=>{
    console.log('项目运行在3000端口');
})