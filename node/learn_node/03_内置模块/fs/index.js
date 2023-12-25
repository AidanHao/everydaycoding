//文件系统 操作文件系统就是用fs
// const fs = require('fs'); //引入fs模块



//同步 
//加了Sync是同步方法
// const syncData = fs.readFileSync('./data.txt','UTF-8')//runcode默认使用绝对路径

// console.log(syncData);

//异步
//异步读取，要写回调
// fs.readFile('./data.txt',{encoding:'UTF-8'},(err,res)=>{
//     // 如果err 没有值，则res必要值
//     if(!err){
//         console.log(res);
//     }
// })


//
//base64 是图片资源
// fs.promises.readFile('./data.txt','base64').then(res=>{
//     console.log(res);
// })

const fs = require('fs/promises');
fs.readFile('./data.txt',{encoding:'utf-8'}).then(res=>{
    console.log(res);
})
