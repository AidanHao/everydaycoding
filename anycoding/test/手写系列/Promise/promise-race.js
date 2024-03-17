function race(promises){
  if(!Array.isArray(promises)){
    return new Error('promises must be an array')
  }

  return new Promise((resolve,reject) => {
    promises.forEach(promise =>{
      promise.then(
        (value) =>{
          resolve(value);
        },
        (error) =>{
          reject(error);
        }
      )
    })
  })
}

const promise1 = new Promise((resolve,reject) =>{
  setTimeout(() =>{
    resolve('promise1');
  },1000)
})

const promise2 = new Promise((resolve,reject) =>{
  setTimeout(() =>{
    resolve('promise2');
  },1500)
})

const promise3 = new Promise((resolve,reject) =>{
  setTimeout(() =>{
    resolve('promise3');
  },500)
})


race([promise1,promise2,promise3]).then(value =>{
  console.log(value);
})