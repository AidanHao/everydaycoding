var Foo = ()=>{

}
// console.log(new Foo())//这里会报错，箭头函数不承认this，new使用的是构造函数，构造函数一定有this，箭头函数不能被当作this
// var a = 1
// function Obj(a){
//     this.a =a
//     console.log(this.a)
// }
// var obj = new Obj(10)
// obj


// a = 5
// var obj = function(){
//     a= 10
//     var foo = ()=>{
//         console.log(this.a)
//     }
//     foo()
// }
// obj()

var a = 5
var foo = ()=>{
        console.log(this.a)
    }
foo()