function a(){
    return new Promise(
        (resolve,reject) =>{
    setTimeout(()=>{
        console.log('a');
        resolve('yes')
        // reject('no')
    },1000)
}
    )
}
function b(){
    return new Promise(
        (resolve,reject)=>{
    setTimeout(()=>{
        console.log('b');
        resolve()
        // reject('no')

    },1500)
})
}
function c() {
    console.log('c');
}
// a().then((res) => {
//     console.log(res);
//     c()
// })



/*
//
//a和b都要成功运行，.then根据最快完成执行的运行！用于优化代码！比如在接口当中，用race就可以直接拿最快的接口
Promise.race([a(),b()]).then(c)
//catch负责兜底
.catch((err)=>{
    console.log(err);
})
//只要race里面的参数只要有一个resolve运行就执行
*/


/*
//.catch获取reject()传的参数
// .catch((err) => {
//     console.log(err);
// })
//reject()是人为在告诉有错误,要想后续成功必须是resolve执行
*/

/*
// Promise.all([a(), b()]).then(c)
//all 必须要接收到的所有的promise状态都为resolve，then才会调用

//括号中放箭头函数中存c()没有区别，c不需要小括号.then会直接执行，拒绝中间商赚差价,a()和b()必须返回n一个new promise
//返回的promise里面要加resolve 和 reject 要调用resolve或者reject resolve表示一帆风顺，reject表示出错了
//可以用reject找出一个错误信息传一个参数，方便找到自己的错误
*/


//利用promise让a在b之后执行，总时间是2.5s,不能又快又行，鱼与熊掌不可兼得
//耗时为异步代码，不耗时为同步代码

//并发执行
// a()
// b()