// var a = 1
// function foo(){
//     console.log(this.a)
// }
// foo()//在浏览器中会会输出1,this代指的就是全局,在浏览器


// function foo(){
//     var a =2
//     // this.bar()
//     bar()//这样会输出undefined
// }
// //词法环境--没定义
// //词法作用域，任何一个东西都可以问词法作用域是什么，也就是它声明的地方
// //this写在哪就谁的，但是不代表this就是指向你的,在浏览器输出1
// function bar(){
//     console.log(this.a)//this无法代表foo,不能用this来引用一个词法作用域内部的东西
// }
// foo()

// var b = 1
// function bar(){
//     console.log(this.b)//this无法代表foo,不能用this来引用一个词法作用域内部的东西
//     //this只是个代名词,代表别人的东西
// }
// bar()//输出undefined


// //词法环境不是函数自带，不要和调用栈里面的弄混了，词法环境也就是词法作用域
// //函数只有作用域
// var b =2
// function foo(){
//    // [[scope]]是以整个属性为一个key值,没有权限访问
//     var b = 1
//     function bar(){
//         baz()
//     }
//     function baz()
//     {
//         console.log(this.b)
//     }
//     bar()//函数没有词法作用域，所以bar()会一直往外面去找
// }
// foo()//在浏览器中调用