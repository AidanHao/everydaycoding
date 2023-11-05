// 包装类

// var obj = {}
// console.log(obj.a)
//不可以给原始数据添加属性
// var num = 123
// num.abc = 'hello'
// console.log(num.abc)

// var num = new Number(123)
// num.abc = 'hello'
// console.log(num.abc)//不参与运算时会被识别为对象
// console.log(num*2)//num参加了四则运算时会被识别为原始数据-数字


// var str = 'abcd'
// console.log(str.length)


// var num = 4
// num.len = 3
// var num = new Number(4)
// num.len = 3 //来弥补num.len的不足
// delete num.len
// new Number(4).len  //这个过程就叫隐式包装类
// console.log(num.len)
// 为什么原始值.len = null

//考点
// var arr = [1,2,3,4,5]
// arr.length = 2
// console.log(arr)

var str = 'abcd'
str.length = 2
// new String('abcd).length delete 刚生存立马会被删掉
//改变不了原始值的值
console.log(str.length)

//面试题(阿里)
// var str = 'abc'
// str +=1
// var test = typeof(str)
// if(test.length==6)
// {
//     //new String(test).length
//     test.sign = 'typeOf的返回结果可能为String'
//     //new String(test).sign 
//     //delete
// }

// console.log(test.sign)////new String(test).sign 
//对象中访问我们不存在的值，也会new一个但是不会删除
