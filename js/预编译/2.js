function fn(a)
{
    console.log(a) //function a(){}
    var a = 123 
    console.log(a)
    function a(){}//函数声明
    var b = function(){} //函数表达式
    console.log(b)
    function d(){}
    var d =a
    console.log(d)
}
//fn的作用域就是fn的AO对象
// AO:{
//     a:undefined 1 function a(){} 123;
//     b:undefined; function b(){}
//     d:undefined function(){} 123
// }
fn(1)