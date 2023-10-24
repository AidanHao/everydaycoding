var a = 2
function foo(){
if(true){
    let a= 1
}//let和{}括号结合会形成块级作用域
}
console.log(a)
foo()