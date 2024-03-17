function any(promises){
  if(!Array.isArray(promises)){
    return new Error('Promise must be a array');
  }

  return new Promise((resolve,reject)=>{
    let count = 0 , arr = [];
    for(let i = 0; i < promises.length; i++){
      promises[i].then(
        (value)=>{
          resolve(value);
        },
        (reason)=>{
          count++;
          arr[i] = reason;
          if(promises.length === count){
            reject(reason);
          }
        }
      )
    }
  })
}


const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise1');
  }, 1000)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('promise2');
  }, 1500)
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise3');
  }, 500)
})


any([promise1, promise2, promise3]).then(value => {
  console.log(value);
})