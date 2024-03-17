function all(promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new Error('promises must be an array'));
  }

  return new Promise((resolve, reject) => {
    let count = 0, arr = [];
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (value) => {
          count++;
          arr[i] = value;
          if (promises.length == count) {
            resolve(arr);
          }
        },
        (reason) => {
          reject(reason);
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
    resolve('promise2');
  }, 1500)
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise3');
  }, 500)
})


all([promise1, promise2, promise3]).then(value => {
  console.log(value);
})