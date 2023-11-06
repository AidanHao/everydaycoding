// function foo(){}

// var a = 1
// var bar = function(){
//     console.log(a)
// }//函数表达式
// bar()//函数独立被调用

//箭头函数的书写方式
// var baz = ()=>{
//     console.log(this.a)//在浏览器中这个里面的this是window的
//     //在箭头函数中，不会识别this，相当于this是全局的
// }
// baz()

//obj无法形成词法作用域
// var obj = {
//     name:'TOM',
//     show:function(){
//         // console.log(this)
//         var bar = function(){
//             console.log(this.name)
//         }
//         bar()
//     }
// }
// obj.show()

var obj = {
    name:'TOM',
    show:function(){
        // console.log(this)
        var bar = ()=>{
            console.log(this.name)
        }
        bar()
    }
}
obj.show()