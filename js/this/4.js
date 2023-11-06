function foo(n,m)
{
    console.log(this.a,n,m)
}
var obj = {
    a:2
}
//call就是强行把this掰弯，把this指向哪里去,显式绑定
//call也是个函数
// foo.call(obj,100,99)//括号运行的call

//foo是由apply调用，接收参数时要用数组
// foo.apply(obj,[100,200])

// var bar = foo.bind(obj,100,200)//结果会返回一个函数题
// bar()
//这样也是一样的
// var bar = foo.bind(obj)//结果会返回一个函数题
// bar(100,200)
//还可以这样
var bar = foo.bind(obj,100)//结果会返回一个函数题
bar(200)
//就近原则，先从bind找，没有了再找bar