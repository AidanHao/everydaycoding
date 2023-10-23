var obj = {
    a:1,
    b:2,
    c:3
}//键值对
// obj.a = 2
// obj.b = 3
// obj.c = 4
// with(obj){//本身以块级批量操作对象的值
//     a=2,
//     b=3,
//     c=4
// }
function foo(obj){
    with(obj){
        a= 2
    }

}
var o1={a:3}
var o2 ={b:3}
foo(o2)
console.log(o2)
console.log(a)//with把a的属性泄露到了全局作用域