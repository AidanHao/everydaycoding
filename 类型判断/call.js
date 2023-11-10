// var obj = {
//     a:1,
// }
// function foo(){
//     console.log(this.a);
// }
// foo.call(obj)//显式绑定






// var obj = {
//     a:1,
//     foo:foo//引用
// }
// function foo(){
//     console.log(this.a);
// }
// obj.foo()


//call()的原理
// {
//     fn:foo
// }
// obj.fn()
// delete obj.fn()

var obj = {
    a:1,
}
function foo(num1,num2){
    console.log(this.a,num1,num2);
}

//call借助隐式绑定规则

//call只能被函数调用!!
// foo.call(obj)//显式绑定
//call源码实现
Function.prototype.myCall = function(context){
    //this是这个函数，隐式绑定
    if(typeof this!='function'){//或者条件里面写this instanceof Function
        throw new TypeError('myCall is not a function')//效果和return一样，后续的逻辑不会执行
    }
    //获取实参
    //类数组不能用数组的方法，只要下标
    //Array.from(类数组)把类数组转成一个数组
    // let arge = Array.from(arguments).slice(1)//从下标一 切完最后所有,不影响原数组，得到新数组,
    let arge = [...arguments].slice(1)

    context.fn = this
    console.log(this);
    //let res = context.fn(...arge)如果有返回值，就return res
    let res = context.fn(...arge)//触发隐式绑定规则  会给对象赛东西 (...arge)结构数组
    delete context.fn
    return res
}

foo.myCall(obj,1,2);



//arguments 所有的函数都有这个关键字 是所有参数的统称 它是一个类数组
//slice只能切割显式的，不能切隐式的