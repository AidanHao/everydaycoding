function add(a,b,c){
    return a + b + c 
}
//有时候不会一次性给到，前端的交互
//js curry 柯里化
// 每次接受一个参数
//add(1)(2)(3)

//函数的柯里化
function curry(fn){
    //收集参数 到位了就运行 arr.length === fn.length fn(...arr)
    // 返回收集参数的函数 使用闭包 数组
    // rest 运算符 args是数组 闭包空间 自由变量
    let judge = (...args)=>{//...是展开运算符 但这里是 args是函数定义时就有的形参 [...arr]就是展开 但是这里是rest运算符变成数组
        // let a = 1
        if(args.length === fn.length) return fn(...args)///退出条件
        //返回函数，继续收集参数
        return (...arg)=>judge(...args,...arg)
    }
    return judge


}

// add(1)(2)(3)
const curryAdd = curry(add)
console.log(curryAdd(1)(2)(3));