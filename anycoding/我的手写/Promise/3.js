class MyPromise{
    constructor(executor){
        this.state = 'pending'//定义状态
        this.value = undefined;//存储resolve的值
        this.reason = undefined;//存储reject的值
        this.onResolveCallbacks = [];//存储resolve的回调
        this.onRejectCallbacks = [];//存储reject的回调
        const resolve = (val) => {
            if(this.state === 'pending'){
                this.state = 'fulfilled';
                this.value = val;
                this.onRejectCallbacks.forEach((fn) => fn());

            }
        };
        const reject = (val) => {
            if(this.state === 'pending'){
                this.state = 'rejected';
                this.reason = val;
                this.onResolveCallbacks.forEach((fn) => fn());
            }
        };
        executor(resolve, reject);
    }
    then(onFulfilled, onRejected){
        if(onFulfilled && typeof onFulfilled !== 'function' || onRejected && typeof onRejected !== 'function'){
            throw TypeError('then必须接受一个函数');
        }
        return new MyPromise((resolve, reject) => {
            if(this.state === 'fulfilled'){
                setTimeout(() => {
                    try{
                        const result = onFulfilled(this.value);
                        resolve(result);
                    }catch(error){
                        reject(error);
                    }
                }, 0);
            }
           if(this.state === 'rejected'){
            setTimeout(() => {
                try{
                    const res = onRejected(this.value);
                    resolve(res)
                }catch(err){
                    reject(err)
                }
            }, 0);
           }
        })
    }
}