// 实现一个new操作符
function Car(name,price) {
    this.name = name;
    this.price = price
    return {};
  }

function myNew(fn,...arguments){
    let obj = {}
    obj.__proto__ = fn.protptype
    let res = fn.call(obj,...arguments) 
    return res instanceof Object? res : obj
}

let car = myNew(Car, "宝马",12000000);
console.log(car);

// 二刷
function myNew(fn, ...args){
  let obj = {}
  obj.__proto__ = fn.prototype;
  let result = fn.call(obj, ...args);
  return result instanceof Object ? result : obj;
}

function myNew(fn, ...args){
  let obj = {};
  obj.__proto__ = fn.prototype;
  let result = fn.call(obj, ...args);
  return result instanceof Object ? result : obj;
}