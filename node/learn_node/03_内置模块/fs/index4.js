const fs = require("fs");

//writeFile 会把原有的文件覆盖掉
// fs.appendFileSync('./data.txt','我是你爹')//添加，在原有的文件上追加内容

//I/O属于宏任务
// fs.renameSync('./data.txt','./data.md')//可以用这个办法修改文件
// fs.renameSync('./data.md','./pic/data.md')//这样就能实现文件的移动

// fs.unlinkSync('./pic/data.md');//这个是删除文件
// fs.rmSync('pic',{recursive:true})//不仅能删文件，甚至能删整个目录(删除目录要加第二个参数：recursive:true)
