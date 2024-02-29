// promise维护了一个状态
class MyPormise {
    // 构造器 接收一个回调函数
    constructor(executor){
        // 维护了一个状态，保证promise的状态被修改后，无法再回头
        this.state = 'pending';//promise的状态
        this.value = undefined//初始变量，存resolve传过来的参数
        this.reason = undefined//初始变量，存reject传过来的参数
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        //then里面有一个或者两个或者多个回调
        const resolve = (value)=>{
            if(this.state == 'pending'){
                this.state = 'fulfilled';
                this.value = value;
                // 把then中的回调触发掉
                // forEach的原因是可能then后面又接了then，就是有多个then
                this.onFulfilledCallbacks.forEach((cb)=>{
                    cb(value)//value就是resolve的值
                })
            }
        }
        const reject = (reason)=>{
            if(this.state == 'pending'){
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach((cb)=>{
                    cb(reason)//reason就是reject的值
                })
            }
        }
        // promise的回调会自动执行，我们给它触发掉
        executor(resolve,reject)//有可能执行不出来
    }
    then(onFulfilled, onRejected){
        // 不能调用回调
        // 把 onFulfilled 存起来，供resolve 调用


    }
}


let p =new MyPormise((resolve,reject)=>{
    resolve('1')
    // reject('2')
})
// 只有当p里面的状态变为了fulfilled的时候 .then 才有意义
p.then()
console.log(p);




// function MyPormise(executor){
//     function resolve(){

//     }
//     function reject(){}
//     executor(resolve,reject)
// }
// MyPormise.prototype.then()