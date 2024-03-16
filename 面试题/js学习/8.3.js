Parent.prototype.getName = function () {
    return this.name
}
function Parent(){
    this.name = 'Tom'
}
Child.prototype = new Parent()
Child.prototype.constructor = Child//解决构造器的指向问题
function  Child(){
    Parent.call(this)
    this.age =  18
}

let c = new Child()
console.log(c.name);