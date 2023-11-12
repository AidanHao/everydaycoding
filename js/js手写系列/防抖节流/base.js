// function foo()
// {
//     //arguments内置的对象，存参数,类数组
//     // console.log(arguments);//类数组，是对象，长得像数组,具有数组某些基本方法
//     console.log(Array.from(arguments))
//     //Array.from()把类数组转换为数组
// };
// foo(1,2)

let arr = [1,2,3,4]
console.log(...arr);//解构数组