let str = 'hello'//string
let str2 = 'hello'//string
let num = 12//number
let flag = false //boolean
let und = undefined //undefined
let nul = null //null
let big  = 1232n //big integer  big number用于存2**53以上或者2**-53以下
let s = Symbol('hello') //Symbol不参与逻辑运算


let obj = {}
let arr = []
let fn = function (){}
let date = new Date()

// console.log(obj instanceof Object);//判断obj是不是隶属于object
// console.log(arr instanceof Array);
// console.log(fn instanceof Function);
// console.log(date instanceof Date);
// console.log(str instanceof String);//判断不了原始类型
// console.log(arr instanceof Object)

// function test(obj){
//     if(obj instanceof Object)
//     {
//         return obj.name
//     }
// }
// test([5])
//instanceof会顺着隐式原型往上找,直到找到了 obj.__proto__===Object.prototype一步步找obj.__proto__.__proto__===Object.prototype


