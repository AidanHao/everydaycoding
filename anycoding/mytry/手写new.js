function myNew(fn, ...args){
    let obj = {};
    obj.__proto__ = fn.prototype;
    let res = fn.call(obj, ...args);
    return res instanceof Object ? res : obj;
}