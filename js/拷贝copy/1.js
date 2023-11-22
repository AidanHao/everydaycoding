let a = 1
let b = a
a = 2
console.log(b);
//b是原始数据类型，存在调用栈当中，会直接取到a的值存到b中


let obj ={
    age:18
}
//可以说obj2浅拷贝obj
let obj2 = obj
obj.age = 20
console.log(obj2.age);
//调用栈不能设计地很大，效率问题！