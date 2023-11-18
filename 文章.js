

// let {toString: num} = 666;
// console.log( num === Number.prototype.toString) //输出：true
// let {toString: bol} = true;
// console.log( bol === Boolean.prototype.toString) //输出：true

// let {toString: bol} = true;
// bo === Boolean.prototype.toString // true

// let obj = {}
// let obj2 ={fn:function(){}}
// Object.setPrototypeOf(obj, obj2);//将obj的原型设为obj2
// let {fn} = obj
// console.log(fn);//输出：[Function: fn]



// let {max} = Math
// console.log(max(1,100));


// let obj = {name:'小明'}
// let {name='小红',age = 19}=obj
// console.log(name);//输出：小明
// console.log(age);//输出：19



// let obj = {like:{like1:'coding'}}
// let {like,like:{like1}} = obj
// console.log(like);//输出：{ like1: 'coding' }
// console.log(like1);//输出：coding



// let obj = 
// {name:'小明',
// age:19,
// like:{
//     like1:'coding',
//     unlike:{
//         unlike1:'play games'
//     }
// }
// }
// let {
//     name,
//     age,
//     like:{
//         like1,
//         unlike:{
//             unlike1
//         }
//     }
// } = obj;
// console.log(name);//输出：小明
// console.log(age);//输出：19
// console.log(like1);//输出：coding
// console.log(unlike1);//输出：play games