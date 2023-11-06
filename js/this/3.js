// function foo()
// {
//     console.log(this.a)
// }
// var obj = {
//     a:2,
//     foo:foo//没有调用，这里是引用
// }
// //这样写不走默认规则 ,这样是
// obj.foo()


// function foo()
// {
//     console.log(this.a)
// }
// var obj = {
//     a:2,
//     foo:foo()//这里是调用
// }
// obj.foo




function foo()
{
    console.log(this.a)
}
var obj = {
    a:2,
    foo:foo
}
var obj2 = {
    a:3,
    obj:obj
}
pbj2.obj.foo()//这里是输出2