//对象转数字
// console.log(Number({}));//NaN
// console.log(Number([]));//0

// 转字符串 toString

// let a = {}
// console.log(a.toString());//[object Object]
// Object.prototype.toString.call(a)//[object Object]
//返回一个可以代表这个对象的字符串、

// let arr = [1,1,2,2]
//数组调用toString是把数组里面的元素全部拿出来，以逗号进行拼接成一个字符串！
// console.log(arr.toString())

//toString传进来会先进行分类,如果是数组就把你的元素挑出来，用逗号连接成字符串

// let time = new Date()
// console.log(time.toString());//Tue Nov 21 2023 19:53:24 GMT+0800 (GMT+08:00)

// console.log(String({}));//[object Object]

// var fn = function () {}
// console.log(fn.toString());//function () {}

//转数字 valueOf

// let a = {}
// console.log(a.valueOf);//转不了[Function: valueOf]

//valueOf只堆包装类有用
let a = new String('123')
console.log(a.valueOf());//123

let b = new Number(123);
console.log(b.valueOf());//123

// console.log(Number({}));//NaN

//对象转布尔都是true
// console.log(Boolean({}));//true

// let c = new Number(123)
// console.log(c.toString())