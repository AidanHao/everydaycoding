const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
let mime = require('mime-types')
const checksum = require('checksum');

const server = http.createServer((req, res) => {
  let filePath = path.resolve(__dirname,path.join("www", url.fileURLToPath(`file:/${req.url}`)));// __dirname当前js文件的绝对路径，将前端请求的地址转换成url格式，再拼接www这个路径，最后读取整个文件的绝对路径
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath); //文件的详细参数
    
    const isDir = stats.isDirectory(); //判断文件还是文件夹
    if (isDir) {
      filePath = path.join(filePath, "index.html");
    }
    // -------------------------------------------------------------------------------------------------
    if (!isDir || fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath); //读取文件 
      const {ext} = path.parse(filePath)
    //   拿到请求头里面的if-modified-since
    const timeStamp = req.headers['if-modified-since']
    let status = 200
    if(timeStamp && Number(timeStamp)===stats.mtimeMs){
        // 状态码变成了304的话浏览器就会去缓存里面取资源
        status = 304
    }

    // checksum.file(filePath,(err,sum)=>{
    //     const resStream = fs.createReadStream(filePath)
    //     sum = `"${sum}"`
    //     if(req.headers['if-none-match']===sum){
    //         res.writeHead(304,{
    //             'Content-Type':mime.lookup(ext),//告诉前端文件格式
    //             'etag': sum  //签名
    //         })
    //     }else{
    //         res.writeHead(200,{
    //             'Content-Type':mime.lookup(ext),//告诉前端文件格式
    //             'etag': sum  //签名
    //         })
    //         return resStream.pipe(res)
    //     }
    // })

    res.writeHead(status,{
        'Content-Type':mime.lookup(ext),//告诉前端文件格式
        'Cache-Control':'max-age=86400', // 一天 强缓存
        // 'Last-Modified':stats.mtimeMs,//放一个时间戳 资源的修改时间 1711626118916.4207 1711768099681.1292
        // 'etag': `${content}`  //签名
    })

      return res.end(content)

    }
  }
  res.writeHead(404,{'Content-Type':'text/html'})
  res.end('<h1>Not Found</h1>')
});

server.listen(3000, () => {
  console.log("server is running at port 3000");
});
