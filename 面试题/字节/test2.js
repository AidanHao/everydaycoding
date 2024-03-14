let arr = [1,2,3]
let obj = {
    a:1,
    b:2,
    c:3,
    
}
for(let item in obj){
    console.log(item);
}
console.log(arr.__proto__[Symbol.iterator]());//可以拿到数组身上的迭代器