// path 模块 
//node 模块化语法的标准：common 
const path = require('path') //node 引入模块化语句 ，在js中不能用

// console.log(path.join('a','b','c')); //path里面有很多方法，里面的方法都是与操作系统打交道
// windows使用path.join会输出的反斜杠\
// console.log(process.cwd());//整个项目的根目录  c:\Users\www16\Desktop\培训\codespace\node\learn_node 
// console.log(path.join(process.cwd(),'model','index'));//将项目根目录和后面的字符串用\拼接    c:\Users\www16\Desktop\培训\codespace\node\learn_node\model\index
// console.log(path.resolve('a','model','index'));//拿到当前的根目录 c:\Users\www16\Desktop\培训\codespace\node\learn_node\a\model\index
// console.log(path.dirname(process.cwd()));//返回路径的目录名c:\Users\www16\Desktop\培训\codespace\node
// console.log(path.dirname('a/b/c'));//返回路径的目录名a/b
// console.log(path.basename('a/b/c.js'));//返回文件名 返回c.js
// console.log(path.basename(__filename));//__filename是全局变量，作用就是读到当前文件的绝对路径 index.js
// console.log(path.basename(__filename,'.js'));//这样就只取到文件名没有后缀index

// console.log(path.extname(__filename));//获取文件的扩展名 .js 可以通过这个读取文件的后缀

// console.log(path.normalize('a//b/c.js'));//把路径中不规范的调整成规范的，格式化 ，将路径格式化成标准的路径 输出a\b\c.js

// console.log(path.parse(__filename));//会把路径对应的文件解析出来 输出的是一个对象，例如根路径，路径，文件名.后缀，后缀，文件名

// console.log('foo\\bar\\baz'.split(path.sep));//提供特定于平台的路径片段分隔符：Windows 上是 \ POSIX 上是 /



