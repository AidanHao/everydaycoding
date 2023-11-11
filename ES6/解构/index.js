// let arr = ['a', 'b', 'c', 'd', 'e', 'f']
//这种赋值是一一对应原则，后面的'd','e'没有对应变量指定
// let [x,y,z]=[ 'a', 'b', 'c', 'd', 'e']
// console.log(x,y,z);


// let arr =[1,2,3,4,5,6,7,8,9]
// let newArr=[0]
// //assign对象拼接
// // console.log(...arr);//解构数组
// console.log([...newArr, ...arr]);


//对象解构，自己声明的key要与要解构的对象的key值相同，name(name = name一一呼应):name(name='小花')
// let {name:name,age:age} = {name:'小花',age:19}
// console.log(name,age);
// let {name,age} = {name:'小花',age:19}
// console.log(name,age);

//小明为默认值，如果解构找不到name一个新的值，我就采用默认值，找到了就用新值顶替掉
let {name = '小明',age:age} = {name:'小花',age:19}
console.log(name,age);


