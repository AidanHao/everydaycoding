class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined; //接收resolve的值
    this.reason = undefined; //接收reject的值
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // resolve函数
    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        // 执行.then中的回调
        this.onFulfilledCallbacks.forEach((cb) => {
          cb(value); //value 就是 resolve的值
        });
      }
    };
    // reject函数
    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        // 执行回调
        this.onRejectedCallbacks.forEach((cb) => {
          cb(reason);
        });
      }
    };
    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled == "function" ? onFulfilled : (value) => value;
    onRejected = typeof onFulfilled == "function" ? onRejected: (reason) => {throw reason;};

    const newPromise = new MyPromise((resolve, reject) => {
      if (this.state == "fulfilled") {
        // 模拟一个微任务
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state == "rejected") {
        // 模拟一个微任务
        setTimeout(() => {
          try {
            const result = onRejected(this.reason);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }
      //缓存then中的回调
      if (this.state == "pending") {
        this.onFulfilledCallbacks.push((value) => {
          setTimeout(() => {
            try {
              const result = onFulfilled(value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const result = onRejected(reason);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
    return newPromise;
  }
  // all方法
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      let arr = [];
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (value) => {
            count++;
            arr[i] = value;
            if (count === promises.length) {
              resolve(arr);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }
  //   race方法
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let promise of promises) {
        promise.then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }
  //  any方法
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      let arr = [];
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            count++;
            arr[i] = reason;
            if (count == promises.length) {
              reject(new AggregateError(arr));
            }
          }
        );
      }
    });
  }
  //   finally方法
  finally(cb) {
    return this.then(
      (value) => {
        return Promise.resolve(cb()).then(() => value);
      },
      (reason) => {
        return Promise.resolve(cb()).then(() => {
          throw reason;
        });
      }
    );
  }
  //   allSettled方法
  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      let arr = [];
      let count = 0;
      function check() {
        if (count == promises.length) {
          resolve(arr);
        }
      }
      for (let i = 0; i < promises.length; i++) {
        promises[i]
          .then((value) => {
            arr[i] = { state: "fulfilled", value };
          })
          .catch((reason) => {
            arr[i] = { state: "rejected", reason };
          })
          .finally(() => {
            count++;
            check();
          });
      }
    });
  }
}
