// 不需要安装，node自带的模块
const http = require('http');
const url = require('url');

const responseData = {
    ID:'zhangsan',
    Name:'张三',
    RegisterDate:'2024年3月28日'
}
function toHTML(data){
    return `
        <ul>
            <li><span>账户：</spam><span>${data.ID}</spam></li>
            <li><span>昵称：</spam><span>${data.Name}</spam></li>
            <li><span>注册时间：</spam><span>${data.RegisterDate}</spam></li>
        </ul>
    `
}

// 前后端不分离，把一个静态资源返回给前端



// 通过http 请求头做内容协商


const server = http.createServer((req, res)=>{
    // url.path会把一个字符串转为一个url该有的样子
    // 如果我们不这样干的话，就无法拿到一个干净的url地址 如果直接req.url可能会拿到参数之类的
    const {pathname}=url.parse(`http://${req.headers.host}${req.url}`)

    if(pathname==='/'){
        // 后端返回数据的时候业不知道要返回什么类型的数据，可以通过accept去做判断之类的
        const accept = req.headers.accept
        if(accept.indexOf('application/json')!==-1){
            res.writeHead(200,{'Content-Type':'application/json'})
            // 我们无法返回一个对象，用JSON转义成字符串
            res.end(JSON.stringify(responseData))
        }else{
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            // 我们无法返回一个对象，用JSON转义成字符串
            res.end(toHTML(responseData))
        }

        // 需要做一下处理，写一下响应头
        // res.writeHead(200,{'Content-Type':'application/json'})
        // 这样写的话会是一个字符串，浏览器默认会以加载html的形式加载字符串
        // res.end('<h1>hello world</h1>')
        // res.end('hello world')

    }else{
        // 状态码是受人为控制的！请求头和响应头又叫内容协商机制
        res.writeHead(404,{'Content-Type':'text/html'})
        res.end('not find')

    }

    console.log(pathname);
    console.log(req.url.headers.host);
})

server.listen(3000,()=>{
    console.log('server is running at port 3000')
});