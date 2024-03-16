function Parent(){
    this.name = 'Tom'
    this.like = [1,2]
}
function  Child(){
    Parent.call(this)//会直接显示具有，继承
    this.age =  18
}

let c = new Child()
console.log(c.name);