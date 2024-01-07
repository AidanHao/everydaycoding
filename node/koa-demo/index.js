// 后端启动一个一一直运行的服务，提供接口给前端请求-
// 想办法提供多个不同的接口
const http=require('http');

//第一个参数是请求体 第二个是响应体
const server=http.createServer((req,res)=>{
    res.end('welcome to the node server')//只要有前端访问接口就会返回这一句话
    // 提供不同的接口地址
    if(req.url.startsWith('/home')){
        res.end('welcome to the home')
    }else if(req.url.startsWith('/detail')){
        res.end('welcome to detail')
    }else{
        res.end('not find')
    }
})

server.listen(3000,()=>{
    console.log('server listenning run');
})