//查看输出
let a = Object.prototype.toString;
console.log(a.call(1));
console.log(a.call('str'));
console.log(a.call(undefined));
console.log(a.call(null));
console.log(a.call(true));
console.log(a.call([]));
console.log(a.call(function(){}));
console.log(a.call({}));
console.log(function(){}.toString());
console.log([1,2,3].toString());
console.log(void 0);
