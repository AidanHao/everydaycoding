function A(){
    return  new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('异步A完成');
            resolve()
        },1000)
        
    })
}
function B(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('异步B完成');
            resolve()
        },500)
        
    })
}
function C(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('异步C完成');
            resolve()
        },250)
    })
}
//async可以单独出现，但是await不能单独出现
async function foo(){
    // return new Promise((resolve,reject)=>{})//等同于
    //一定会返回一个promise对象
    //await后面要接的也是一个要返回promise对象
    //await就相当于.then
    //await有一个特点，额外的功能，会阻塞后续代码，将后续代码推入到微任务堆中
    await A()
    console.log(1);
    await B()
    await C()
}
foo()