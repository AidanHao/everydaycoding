// console.log(

//     Object.prototype.toString.call(123)
// );
// console.log(
//     Object.prototype.toString.call('dd')
// );
// console.log(
//     Object.prototype.toString.call(undefined)
// );
// console.log(
//     Object.prototype.toString.call(null)
// );
// console.log(
//     Object.prototype.toString.call({})
// );
// console.log(
//     Object.prototype.toString.call([])
// );
// console.log(
//     Object.prototype.toString.call(new Date())
// );
// console.log(
//     Object.prototype.toString.call(function() {})
// );
// console.log(
//     Object.prototype.toString.call(123)
// );
//s.slice(8,-1)-1表示倒数第二个
function isType(s) {
    return Object.prototype.toString.call(s).slice(8,-1)

};
isType('1455')
console.log(
    Object.prototype.toString.call(undefined)//null没有为什么，官方定死了，call显式绑定 toOject转成对象
);


//!!!为什么要加.call()呢？把this指向你那个参数

Object.prototype.toString('12')//因为toString天生就挂在Object.prototype上
//toString()就是把调用它的人转换为字符串
//toString()不接收值
//
function isType(s) {
    return Object.prototype.toString.call(s).slice(8,-1)

};
