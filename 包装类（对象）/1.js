//原始数据类型

// let a = 'hello'
// let b = 123
// let c = true
// let u = undefined
// let n = null

// // 引用类型
// 引用类型不能放在调用栈里面，防止内存泄漏
// V8会开辟一个新的内存空间，叫做 堆 用来存放引用数据类型！然后给引用类型的变量赋一个地址，调用的时候就将地址赋给别的变量
//调用的时候，顺着地址先判断它是不是对象，在取值
//数字最大2^53次方
// let obj = {
//     name:'老王'
// }
// let a = 1
// let b = a
// a=2
// console.log(b)
let obj = {
    name:'小花'
}
let lw = obj
obj.name='小红'
console.log(lw.name)