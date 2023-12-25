const fs = require('fs');

// const info = fs.readdirSync('./test')//读取目录
// console.log(info)



// fs.mkdirSync('./test-dir/data/list',{recursive:true})//创建一个目录,不能一次性建多层，要建多层要声明第二个参数{recursive:true} 允许多层级

// fs.rmdirSync('./test-dir',{recursive:true})//删除目录

fs.watch('./',{ recursive:true},(eventType,filename)=>{
    console.log(`当前文件夹下${filename}文件变更为${eventType}`);//会反应文件的修改信息
})//监听器，只要有文件变更就执行回调
