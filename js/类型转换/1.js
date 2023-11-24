let num = 123
let str = 'hello world'
let flag = true
let un = undefined
let n = null

// // 原始值转布尔值
// console.log(Boolean(false));//false
// // 直接调用Boolean()是false
// console.log(Boolean());//false
// console.log(Boolean(1));//true
// console.log(Boolean(0));//false
// console.log(Boolean(-1));//true
// console.log(Boolean(undefined));//false
// console.log(Boolean(null));//false
// console.log(Boolean('123'));//true
// console.log(Boolean(''));//false
// console.log(Boolean('0'));//true
// console.log(Boolean(NaN));//false



// 原始值转数字
// +'123' = 123
// console.log(Number());//0
// console.log(Number('123'));//123
// console.log(Number('hello'));//NaN 属于Number 代表无法表示的值
// console.log(Number(undefined));//Nan
// console.log(Number(null));//0
// console.log(Number(true));//1
// console.log(Number(false));//0
// console.log(Number('12.14'));//12.14
// console.log(Number('0012.14'));//12.14
// console.log(Number('-12'));//12.14

//字符串是数字就能转，还是是其他的字符串就不能转

//转字符串
//new String不传实参是一个空对象
// console.log(String());//''
// console.log(String(123));//'123'
// console.log(String(NaN));//NaN
// console.log(String(Infinity));//Infinity
// console.log(String(undefined));//undefined
// console.log(String(null));//null
// console.log(String(true));//true

// new Null()

// //转对象
console.log(Object());//{}
console.log(Object('123'));//[String: '123']
console.log(Object(123));//[Number: 123]
console.log(Object(null));//{}
console.log(Object(undefined));//{}
console.log(Object(true));//[Boolean: true]
console.log(Object(NaN));//[Number: NaN]

console.log(new Number(123));//[Number: 123]










// let big = 123n
// let sy = Symbol(123)