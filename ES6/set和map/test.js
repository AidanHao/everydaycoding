global.gc()//global全局的意思，这行代码意思是强制执行垃圾回收机制
console.log(process.memoryUsage())//计算node中内存占用情况
//在浏览器里面会被自动清理，在node里面是手动清理

let obj = {name:'德玛西亚',age:new Array(5*1024*1024)}
let ws = new WeakSet()
ws.add(obj)

obj = null

global.gc()
console.log(process.memoryUsage());

