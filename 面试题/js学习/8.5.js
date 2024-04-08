Parent.prototype.getName = function () {
    return this.name
}
function Parent(){
    this.name = 'Tom'
}
// Child.prototype = new Parent()//原型链继承
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child//解决构造器的指向问题
function Child(){
    Parent.call(this)//构造函数继承
    this.age =  18
}

console.log(c.name);
console.log();