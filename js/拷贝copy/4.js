let obj = {
    name:'小黑',
    age:18,
    like:{
        type:'coding'
    }
}
//深拷贝的方法
//JSON.stringify(obj)把一个对象变为字符串, JSON.parse把一个字符串变为对象
console.log(JSON.stringify(obj));
console.log(JSON.parse(JSON.stringify(obj)));
let newObj = JSON.parse(JSON.stringify(obj))
obj.like.type = 'eating'
console.log(newObj);



// let obj = {
//     name:'小黑',
//     age:18,
//     like:{
//         type:'coding'
//     },
//     a:undefined,
//     b:null,
//     c:function(){},
//     d:{n:100},
//     e:Symbol('hellp')
// }
// //----------------------------------------------------------------
// //循环引用
// obj.c = obj.d
// obj.d.m = obj.c
// //----------------------------------------------------------------
// // console.log(obj);
// let newObj = JSON.parse(JSON.stringify(obj))//对象中存在循环引用也无法拷贝
// console.log(newObj);
// //这个方法拷贝不了函数体，拷贝不了undefined,拷贝不了BigInt,拷贝不了Symbol,BigInt都处理不了