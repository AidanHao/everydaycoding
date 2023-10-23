//js中不用声明就能使用，自动声明
//如果没有声明使用的变量，一定会把该变量默认为该变量为全局
function foo(){
    a= 2
}
foo()
console.log(a)