function request(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * 10)
        }, 1000)
    })
}

// await 要依赖generator
function* gen() {
    const num1 = yield request(1)
    const num2 = yield request(num1)
    const num3 = yield request(num2)
    return num3
}

// 如果一个函数接收的参数是函数体或者返回的值是一个函数体的话，这种函数称为高阶函数，async能让函数天生返回一个promise对象
// 模拟async
function generatorToAsync(generatorFn) {// 把generatorFn变更成具有async功能的函数
    return function () {//具有async功能的函数
        const gen = generatorFn()///先要把参数函数执行掉
        return new Promise(function (resolve, reject) {
           function loop(key,arg){//其实这个递归就是co模块的源码
            let res = null
            res = gen[key](arg) //gen.next(arg) //{value:Promise{},done:false}
            const {value,done} = res//解构出res的对象里面的两个
            if(done){//递归的出口
                return resolve(value)
            }else{
                Promise.resolve(value).then(val=>{
                    loop('next',val)
                })// 10 Promise.resolve接收一个promise对象为参数，会直接读取这个promise对象中的resolve的值
            }
           }
           loop('next')
            
        })
    }
}
const asyncFn = generatorToAsync(gen)
// console.log(asyncFn);//Proise {}
asyncFn().then(res=>{
    console.log(res);
})