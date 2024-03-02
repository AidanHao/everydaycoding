// promise维护了一个状态
class MyPormise {
    // 构造器 接收一个回调函数
    constructor(executor){
        // 维护了一个状态，保证promise的状态被修改后，无法再回头
        this.state = 'pending';//promise的状态
        this.value = undefined//初始变量，存resolve传过来的参数
        this.reason = undefined//初始变量，存reject传过来的参数
        this.onFulfilledCallbacks = []//用数组的原因是可能有多个回调！
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

    // 分成两个模块，一个是promise的语法，一个是.then的语法  .then会默认抛出一个promise对象出来,且状态默认是fulfilled，第二个.then直接接到第一.then后面，第二个.then不会等第一个.then的回调执行完
    // 第二个.then传的不是回调，就不会执行！
    // 写再类体里面的函数等同于写在了类的显示原型上
    then(onFulfilled, onRejected){
        // 不能调用回调
        // 把 onFulfilled 存起来，供resolve 调用
        // then里面的回调是微任务，因为状态变更后，这个回调就立马调用了 .then的调用是立即被调用的
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled: value=>value
        onRejected = typeof onRejected === 'function' ? onRejected: reason=>{throw reason}

        // 返回一个promise
        const newPromise = new MyPormise((resolve,reject)=>{
            if(this.state === 'fulfilled'){//then前面的promise对象状态是同步变更完成了
                // onFulfilled()//如果这样直接调用，这个回调就不算是微任务了
                // 通常我们直接写成宏任务
                setTimeout(()=>{//模拟异步，官方是微任务，我们用宏任务简化一下
                    try{
                    const result = onFulfilled(this.value)
                    resolve(result)//默认为fulfilled 应该放result里面的ressolve中的参数
                    // 正常情况下会判断返回的是不是promise
                    }catch(error){
                        reject(error)
                    }
                })
            }

            if(this.state === 'rejected'){
                setTimeout(()=>{
                    try{
                        const result = onRejected(this.reason)
                        resolve(result)
                    }catch(error){
                        reject(error)
                    }
                })
            }

            if(this.state==='pending'){//缓存then中的回调
                this.onFulfilledCallbacks.push((value)=>{
                    setTimeout(()=>{//保障onFulfilled在resolve中被调用时是一个异步函数
                        try{
                            const result = onFulfilled(value)
                            resolve(result)
                        }catch(error){
                            reject(error)
                        }
                    })
                })
                this.onRejectedCallbacks.push((reason)=>{
                    setTimeout(()=>{
                        try{
                            const result = onRejected(reason)
                            resolve(result)
                        }catch(error){
                            reject(error)
                        }
                    })
                })
            }
        })
        return newPromise

    }
// 比较重要的race方法
    static race(promises){
        return new MyPormise((resolve,reject)=>{
            // 判断promises里面的哪个对象的状态先变更 判断哪个
            for(let promise of promises){
                promise.then(//如果promise接一个.then，如果哪个.then执行并且回调也执行了，就是先执行了
                    (value)=>{//value有值就说明promise一定resolve出来了一个值
                        resolve(value)

                    },
                    (reason)=>{// 谁先reject谁先执行then第二个参数
                        reject(reason)
                    }
                )
            }
            // resolve()
        })
    }

    // 比较重要的all方法
    static all(promises){
        return new MyPormise((resolve,reject)=>{
            let count = 0,arr = []
            // resolve || reject
            for(let i= 0; i<promises.length;i++)//for..of只能遍历迭代器属性，for..in可以对象也可以数组
            {
                promises[i].then(
                    (value)=>{
                        count++
                        arr[i] = value
                        if(count===promises.length){
                            resolve(arr)
                        }
                    },
                    (reason)=>{
                        reject(reason)
                    }
                )
            }
        })
    }

    // 实现一个any方法!
    static any(promises){
        return new MyPormise((resolve,reject)=>{
            let count = 0,arr = []
            for(let i= 0; i<promises.length;i++){
                promises[i].then(//如果promise接一个.then，如果哪个.then执行并且回调也执行了，就是先执行了
                    (value)=>{//value有值就说明promise一定resolve出来了一个值
                        resolve(value)
                    },
                    (reason)=>{// 谁先reject谁先执行then第二个参数
                        count++
                        arr[i] = reason
                        if(count===promises.length){
                            reject( arr )
                        }
                    }
                )
            }
        })
    }
}


// let p =new MyPormise((resolve,reject)=>{
//     resolve('1')
//     // reject('2')
// })
// // 只有当p里面的状态变为了fulfilled的时候 .then 才有意义
// p.then()
// console.log(p);




// function MyPormise(executor){
//     function resolve(){

//     }
//     function reject(){}
//     executor(resolve,reject)
// }
// MyPormise.prototype.then()













function a(){
    return new MyPormise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('a');
            // resolve('a')
            reject('a')
        },1000)
    })
}
function b(){
    return new MyPormise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('b');
            // resolve('b')
            reject('b')
        },500)
    })
}
function c(){
    console.log('c');
}

MyPormise.any([a(),b()]).then(res=>{
    c()
},
(err)=>{
    console.log(err);
}
)