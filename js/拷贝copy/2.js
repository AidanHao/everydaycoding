// //常见的浅拷贝
// let a = {name:'小黑'}
// let b = Object.create(a)//让b对象继承于a
// console.log(b.name) 


//浅拷贝
// let a = {name:'小黑', like:{
//     n:'coding'
// }}
// //Object.assign()将两个对象合并成一个对象
// let b = Object.assign({},a)
// // a.name = '小白'
// //b.name不受影响
// // a.like.n = 'running'
// // like也是一个对象，存的也是一个引用地址
// console.log(b);


//浅拷贝
// let arr = [1,2,3,{a:10}]
// let newArr = [].concat(arr)//concat会返回一个新的数组
// arr[3].a=100
// console.log(newArr);

// let arr = [1,2,3,{a:10}]
// //splice影响原数组  slice不影响原数组
// let newArr = arr.slice(0)
// arr[3].a = 100
// console.log(newArr);

// let arr = [ 1,2,3,{a:10}]
// let newArr = [...arr]
// arr[3].a = 100
// console.log(newArr);

//还是受影响
// let arr = [ 1,2,3,{a:10}]
// //reverse()有返回值，也会影响原数组
// // let newArr = arr.toReversed().reverse()//toReversed是一个很新的方法要去浏览器，返回倒转的数组
// arr[3].a = 100
// console.log(newArr);
