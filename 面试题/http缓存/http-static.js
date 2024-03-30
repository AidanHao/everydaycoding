const http = require("http");
const url = require("url");
// 绝对路径相对路径
const path = require("path");
// node 自带的文件系统
const fs = require("fs");
// 引入一个后缀判断的轮子
let mime = require('mime-types')

// 前后端不分离，把一个静态资源返回给前端
const server = http.createServer((req, res) => {
  // windows系统和苹果系统的原因，windows系统只要一个/
  let filePath = path.resolve(__dirname,path.join("www", url.fileURLToPath(`file:/${req.url}`)));// __dirname当前js文件的绝对路径，将前端请求的地址转换成url格式，再拼接www这个路径，最后读取整个文件的绝对路径
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath); //读取文件的详细参数
    const isDir = stats.isDirectory(); // 用来判断读到的是文件还是文件夹
    if (isDir) {
      filePath = path.join(filePath, "index.html");// path.join 类似于字符串拼接的效果
    }
    if (!isDir || fs.existsSync(filePath)) {//前后端不分离的就叫服务端渲染，页面都是由服务器提供的
      // 读取资源文件向前端返回
      const content = fs.readFileSync(filePath); //读取文件 是一个buffer流 十六进制数据流 
      //读到文件后判断后缀
      const {ext} = path.parse(filePath)
      console.log(ext);

    //   if(ext==='.jpg'){
    //         res.writeHead(200,{'Conten-Type':'image/jpg'})
    //   }else{
    //     res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    //   }

    res.writeHead(200,{'Content-Type':mime.lookup(ext)})

      return res.end(content)

    //   启用掉了
    // const fileStream = fs.createReadStream(filePath)//读取文件将文件读成流类型
    // console.log(fileStream);
    // fileStream.pipe(res) //将流类型资源汇入到响应体当中

    }
    // console.log(stats);
  }
  // 如果走不通就是not fount
  res.writeHead(404,{'Content-Type':'text/html'})
  res.end('<h1>Not Found</h1>')
});

server.listen(3000, () => {
  console.log("server is running at port 3000");
});
