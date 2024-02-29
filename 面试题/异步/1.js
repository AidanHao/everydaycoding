let a = 1
// js有自己的执行引擎

// 假设是多线程
setTimeout(()=>{//线程1 锁 -> 解锁
    a=10
    console.log(2);
},1000)
setTimeout(()=>{//线程2
    a=20
    console.log(2);
},1000)

let b = 3
console.log(3);