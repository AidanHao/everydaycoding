let str = 'hello'//string
let str2 = 'hello'//string
let num = 12//number
let flag = false //boolean
let und = undefined //undefined
let nul = null //null

let big  = 1232n //big integer  big number用于存2**53以上或者2**-53以下
let s = Symbol('hello') //Symbol不参与逻辑运算
let s2 = Symbol('hello') //Symbol不参与逻辑运算,用于定义独一无二的值，哪怕别人和你值相等就是不一样，独一无二的值

console.log(s)
console.log(s===s2);//两个等号值相等，三个等号类型和值都相等