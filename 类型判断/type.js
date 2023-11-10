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


//判断类型
// console.log(typeof(str));//typeof str 能得到String
// console.log(typeof(num));//number
// console.log(typeof(flag));//boolean
// console.log(typeof(und));//undefined
// console.log(typeof(nul));//object这是js中的bug，历史遗留问题
// console.log(typeof(big));//bigint
// console.log(typeof(s));//symbol 
//typeof通过判断二进制前面的三个0，引用类型前面二进制一定是三个0，而原始类型则不能是三个0，但是null全部都是0，首先搞明白前面三个是不是0，再去判断是哪一种类型
// console.log(typeof(obj));//object
// console.log(typeof(arr));//object 在typeof的眼里，所以引用类型都是对象object 判断不了引用类型
// console.log(typeof(fn));//function typeof只能判断function
// console.log(typeof(date));//object





