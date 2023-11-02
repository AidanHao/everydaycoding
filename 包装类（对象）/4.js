// 构造函数
//可以用new调用普通函数
// function Person(name,age,sex){
//     this.name = name
//     this.age = age
//     this.sex = sex
    // new就相当于执行下面，生成一个this对象,第二步去执行函数体内的逻辑
    // let this = {
    // name:name,
    // }
    //最后 return this

    //
// }
// let p = new Person('海军',18,'boy')
// console.log(p)
function Person(name,age,sex){
    var that = {}
    that.name = name
    that.age = age
    that.sex = sex
    return that
}
let p1 = Person('小五',18,'boy')