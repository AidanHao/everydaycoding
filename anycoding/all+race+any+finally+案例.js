// all
function all(promises){
    return new Promise((resolve,reject)=>{
        let count = 0
        let arr = []
        for(let i = 0;i<promises.length;i++){
            promises[i].then(
                (value)=>{
                    count++
                    arr[i] = value
                    if(count === promises.length){
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
// race
function race(promises){
    return new Promise((resolve,reject)=>{
        for(let promise of promises){
            promise.then(
                (value)=>{resolve(value)},
                (reason)=>{reject(reason)}
            )
        }
    })
}

// any
function any(promises){
    return new Promise((resolve,reject)=>{
        let count = 0
        let arr = []
        for(let i = 0;i<promises.length;i++){
            promises[i].then(
                (value)=>{resolve(value)},
                (reason)=>{
                    count++
                    arr[i] = reason
                    if(count===promises.length){
                        reject(new AggregateError(arr))
                    }
                }
            )
        }
    })
}




// 测试位置
function timer(delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve(delay)},delay)
    })
}
function timer2(delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{reject(delay)},delay)
    })
}
let arr = []
arr.push(timer(1000))
arr.push(timer(100))
arr.push(timer(2000))
// arr.push(timer2(2000))

// all测试
// all(arr).then((res)=>{
//     console.log(res);
// },(err)=>{
//     console.log(err);
// });

// race测试
// race(arr).then(
//     (res)=>{console.log(res);},
//     (err)=>{console.log(err);}
// )

// any测试
any(arr).then(
    (res)=>{
        console.log(res);
    },
    (err)=>{
        console.log(err);
    }
)