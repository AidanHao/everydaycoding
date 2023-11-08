//this是js最复杂的机制，一般被定义在作用域当中

//在浏览器输出会是window对象，也可以说是浏览器的全局环境

// var a = 1
// console.log(this)
// console.log(a)
//在浏览器眼里全局就是window对象,定义变量就相当于给window定义属性


function identify(context){
    // toUpperCase将小写字母变为大写
    return context.name.toUpperCase()
}
function speek(context){
    //单引号执行时间比双引号时间更断
    var greeting = "Hello, i'm  "+identify(context)
    console.log(greeting) 
}
var me = {
    name:'Tom'
}
var you = {
    name:'Jerry'
}
// console.log(identify(you))
speek(me)



// function identify(){
//     // toUpperCase将小写字母变为大写,并且只能给字符串用
//     return this.name.toUpperCase()
// }
// function speek(){
//     //单引号执行时间比双引号时间更断
//     var greeting = "Hello, i'm  "+identify.call(this)
//     console.log(greeting) 
// }
// var me = {
//     name:'Tom'
// }
// var you = {
//     name:'Jerry'
// }
// //this 的出现是为了简化代码
// // console.log(identify(you))
// speek.call(me)