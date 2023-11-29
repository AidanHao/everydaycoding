let a = 1
//在具有锁的语言当中可以把代码锁起来
console.log(a);
// v8决定定时器耗时
setTimeout(()=>{
    console.log(a);
},1000)
let b = 2
// for循环是由我们CPU说要耗时的，v8眼里它是不耗时的
for(let i = 0;i<5;i++)
{
    console.log(b);
}

// js只有一条腿走路