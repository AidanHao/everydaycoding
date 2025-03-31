class Mypromise{
    constructor(executor){
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];

        const resolve = (value) => {
            if(this.state === 'pending'){
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallback.forEach((callback) => {
                    callback(value);
                });
            }
        };

        const reject = (reason) => {
            if(this.state === 'pending'){
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallback.forEach((callback) => {
                    callback(reason);
                })
            }
        }
        executor(resolve, reject)
    }

    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => {throw reason};
        const newPromise = new Mypromise((resolve, reject) => {
            if(this.state === 'fulfilled'){
                setTimeout(() => {
                    try{
                        const result = onFulfilled(this.value);
                        resolve(result);
                    }catch(error){
                        reject(error)
                    }
                })
            }
            if(this.state === 'rejected'){
                setTimeout(() => {
                    try{
                        const result = onRejected(this.reason);
                        resolve(result)
                    }catch(error){
                        reject(error)
                    }
                })
            }
            if(this.state === 'pending'){
                this.onFulfilledCallback.push((value) => {
                    setTimeout(() => {
                        try{
                            const result = onFulfilled(value);
                            resolve(result)
                        }catch(error){ 
                            reject(error)
                        }
                    })
                });
                this.onRejectedCallback.push((reason) => {
                    setTimeout(() => {
                        try{
                            const result = onRejected(reason);
                            resolve(result)
                        }catch(error){
                            reject(error)
                        }
                    })
                })
            }
        });
        return newPromise;
    }
}