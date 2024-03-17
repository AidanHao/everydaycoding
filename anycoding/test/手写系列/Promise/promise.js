// 手写Promise
class MyPromise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fullfilled';
        this.value = value;
        this.onFulfilledCallback.forEach(callbcak => callbcak());
      }
    }

    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.value = reason;
        this.onRejectedCallback.forEach(callbcak => callbcak());
      }
    }

    executor(resolve, reject);
  }



  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => reason

    const newPromise = new MyPromise((resolve, reject) => {
      if (this.status === 'fullfilled') {
        setTimeout(() => {
          try{
            const result = onFulfilled(this.value)
            resolve(result)
          }catch(err){
            reject(err)
          }
        }, 0);
      }else if(this.status === 'rejected'){
        setTimeout(()=>{
          try{
            const result = onRejected(this.reason);
            resolve(result)
          }catch(err){
            reject(err)
          }
        },0)
      }else{
        this.onFulfilledCallback.push((value)=>{
          setTimeout(() => {
            try{
              const result = onFulfilled(this.value)
              resolve(result)
            }catch(err){
              reject(err)
            }
          }, 0);
        })
        
        this.onRejectedCallback.push((reason)=>{
          setTimeout(()=>{
            try{
              const result = onRejected(this.reason);
              resolve(result)
            }catch(err){
              reject(err)
            }
          },0)
        })
      }
    })

    return newPromise;
  }

  catch(onRejected){
    onRejected = typeof onRejected === 'function' ? onRejected : reason=>reason;
    return new MyPromise((resolve,reject)=>{
      if(this.status === 'rejected'){
        setTimeout(()=>{
          try{
            const result = onRejected(this.reason);
            resolve(result);
          }catch(err){
            reject(err)
          }
        },0)
      }else{
        this.onRejectedCallback.push(
          (reason)=>{
            setTimeout(()=>{
              try{
                const result = onRejected(this.reason);
                resolve(result);
              }catch(err){
                reject(err)
              }
            },0)
          }
        )
      }
    })
  }
}



// 测试
let p = new MyPromise((resolve, reject) =>{
  resolve()
})

p.then(() =>{
  console.log('2');
},
() =>{
  console.log('error');
}
)