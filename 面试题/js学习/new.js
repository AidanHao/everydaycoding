function Car(name){
    this.name = name
}
function myNew(...args){
    // let obj = Object.create(args[0])
    let obj = {}
    obj.__proto__ = args[0].prototype
    const res = args[0].call(obj,...args.slice(1))
    return res instanceof Object ? res:obj
}
let car = myNew(Car,'BMW')
console.log(car);