
Object.prototype[Symbol.iterator] = function() {
    // Object,keys 会返回一个数组 内容是对象的键名 Object.values 会返回一个数组 内容是对象的键值
    return Object.values(this)[Symbol.iterator]()
}
// for of 拿到迭代器不断去调用next 直到那个状态为true

// 解构需要迭代
var [a,b] = {a:1,b:2}
// 考迭代器属性的认识
console.log(a,b);





// iterable
// {
//     [Symbol.iterator]:function(){
//         return 迭代器
//     }
// }