const fs = require('fs');

//同步
// fs.writeFileSync('./traget.md','疑是地上霜') 
// const img = fs.readFileSync('./vue.jpg')
// console.log(img);//这样是一个流类型，后端才有流类型


//默认使用buffer流,所有的文件都可以被读成流类型，流类型也是一种数据类型
// const img = fs.readFileSync('./vue.jpg')
// fs.writeFileSync('./pic/vue2.jpg',img)
// console.log(img);
// console.log(Buffer.isBuffer(img));//true 判断是否是buffer流
// console.log(img.length);//buffer流的长度
// console.log(img.toString());