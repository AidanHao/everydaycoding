let obj = {
    name:'Tom',
    age:18,
    arr:[1,2]
}

let obj2 = Object.create(obj)
obj2.arr.push(3)
console.log(obj2.__proto__);