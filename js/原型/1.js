//我们给函数添加的属性，不会赋给示例对象
//prototype原型,函数天生就会具有prototype属性,v8执行到该函数会自动添加
Person.prototype.say=function(){return '你好'}
// Person.say = function(){
//     return '你好'
// }
function Person()
{
    //this代表实例对象
    this.name = '肖总'
    this.age =18
    // this.say = function(){
    //     return '你好'
    // }
}
//会生成一个对象，并且把它返回出来
//p为实例对象
let p = new Person()
let p2 = new Person()
//p和p2公用say()
console.log(p2.say==p.say)//p是隐式继承原型中的属性
//示例对象会继承到函数体内的所有属性，但是不能继承到原型的属性，但是可以访问原型的属性
//原型也是对象,函数体内属性是p,p2的私有属性！