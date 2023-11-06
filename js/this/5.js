function foo() {
    // var a = 1
    // //定时器也是函数，没有词法作用域
    // setTimeout(function(){
    //     console.log(this.a)
    // },1000)
    var a = 1
    var bar = function() {
        console.log(this.a)
    }
    var baz = bar.bind(foo)
    setTimeout(baz,1000)
}
//函数身上有length属性，表示接收参数的个数
foo()