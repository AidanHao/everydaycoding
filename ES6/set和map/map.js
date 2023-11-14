// let obj  ={
//     a:1,
//     b:2
// }
// //里面的key为字符串
// //没有办法让数组这种类型的数值作为key值，会把数组转为字符串
// var arr =[1,2]
// obj[arr]=3
// console.log(obj);


//map的key可以是任意数据结构
//初始化要用二维数组
let map = new Map([
    ['name','老王']
])
let obj = {a:1}
map.set(obj,'hello')//key是一个对象，value是一个字符串，用箭头给你表达sa
map.get('name')//读到map里面key为name的值
// 引用数据类型引用的是地址,类型相等，引用地址相等，值相等，才叫相等
console.log(map.get(obj));
map.forEach((item,index,map)=>{
console.log(map);
})

// //解构 还是一个二维数组！！
// console.log([...map]);
