var b = 1
function foo(a,b){//这里的参数是形参
    //编译要干的是找到当前域中的有效标识符
    console.log(a+b)
}
foo(2)//里面的参数实参,实参传到形参

//NaN也是个值，代表没有值，是Number类型
//空数组[]==![]非空数组为true
//空数组[]==[]空数组为false