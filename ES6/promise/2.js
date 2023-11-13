//异步解决方案
function xq(){
    //返回了一个promise的实例对象
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('龙哥相亲了!');
            resolve('相亲成功啦！')//里面的参数可以传给then(随便加一个形参),抛出一个值
            //resolve()不用你传，源码已经打造好了，直接用
        },2000)
    })//promise是ES6新增加的构造函数，要new一下
    
}
function marry() {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('龙哥结婚了');
            resolve('结婚完成了')
        },1000)
    })
}
//then(res)中的res接收的是resolve('相亲成功了')中的相亲成功了
// function baby(){
//     setTimeout(()=>{
//         console.log('生个Baby');
//     },500)
// }
// xq().then((res)=>{
//     console.log(res);
//     marry().then(res2=>{
//         baby()
//     })
// })
//promise就是把异步捋成同步执行

//用链式
//.then天生会返回一个promise对象,
function baby(){
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('生个Baby');
        resolve('准备二胎')
    },500)
    
    }
    )
}
function baby2(){
    setTimeout(()=>{
        console.log('生个Baby2');
    },500)
}
xq()
.then((res)=>{
    console.log(res);
    return marry()//我们改为return，会覆盖掉.then默认返回的promise,你写了就用你的，会等你返回，如果没写就用默认的
    //不写return相当于异步
})//上一个.then一定返回一个promise对象,.then会默认返回一个promise对象，只是为了保证后面的.then能够执行，但是这个返回的对象不是相亲中的promise对象,保证
//它与marry的对象相同一致
.then(res2=>{
    console.log(res2);
    return baby()
})
.then(res3=>{
    console.log(res3);
    baby2()
})