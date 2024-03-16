function Parent(){
    this.name = 'Tom'
    this.like = [1,2]
}
// Child.prototype = new Parent()
function  Child(){
    this.age =  18
}
let child = new Child()
let child2 = new Child()

// child.__proto__ =new Parent()

console.log(child.name);//'Tom'