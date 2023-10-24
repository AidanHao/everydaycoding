// var a = 1
// var a =2
// console.log(a)//可以用var重复声明对象
// let a1 =1
// let a1 =2
// console.log(a1)//let 声明的变量无法重复声明对象
// let a1 = 1
// function foo(){
//     console.log(a1)
//     // var a1 = 2//编译的时候，不会执行赋值，声明提升
//     let a1 = 2//暂时性死区
// }
// foo()
function foo(){
    console.log(a1)
    var a1 = 2//编译的时候，不会执行赋值，声明提升
}
foo()