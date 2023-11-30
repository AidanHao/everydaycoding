// 读取文件

// node 内置的模块化系统 commonJS
// fs文件模块，内置的，把硬盘里面的东西读取到内存里面需要消耗时间，运行会放入到执行栈当中，
// 硬盘相对于内存的执行速度慢一千倍

const fs = require('fs')
// - 硬盘到内存
// - 文件的大小
// readFile有两个参数，第一个是有没有出错（错误对象），第二个才是数据
// err可能，文件找不到，无法访问，一切皆有可能
// 安全性问题，err 
// 也可以再给他传一个参数'UTF-8'告诉他，我们要的格式
fs.readFile('./a.txt','UTF-8',(err,data)=>{ 
    // 后端 稳定性排第一位
    if(err)
    {
        console.log(err);
        return
    }
    // 第二个，对拿到的数据转义
    // node 后端默认16进制 Buffer二进制流
    // 文件在硬盘中存储是二进制，以Buffer二进制流，但是用16进制存储
    // toString就会将二进制流，转换为文本
    // console.log(data.toString());
    // 控制异步就是为了让代码的编写顺序与执行顺序一致
    console.log(data);
    fs.readFile('./b.txt','utf-8',(err,data)=>{
        if(err){
            console.log(err);
            return
        }
        console.log(data);
        fs.readFile('./c.txt','utf-8',(err,data)=>{
            if(err)
            {
                return
            }
            console.log(data);
        })
    })
})
