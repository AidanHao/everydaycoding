class myPromise{
    constructor(executor){
        this.state = 'pending'
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallback = []
        this.onRejectedCallback = []

        const resolve = (value) => {
            if(this.state === 'pending'){
                this.state = 'fulfilled'
                this.value = value
                this.onResolvedCallback.forEach((cb) => {
                    cb(value)
                })
            }
        }
        const reject = (reason) => {
            if(this.state === 'pending'){
                this.state = 'rejected'
                this.reason = reason
                this.onRejectedCallback.forEach((cb) => {
                    cb(reason)
                })
            }
        }
        executor(resolve, reject)
    }
    then(onFulfilled, onRejected){
        typeof onFulfilled === 'function' ? onFulfilled : (value) => value
        typeof onRejected === 'function' ? onRejected : (reason) => {throw reason}
        return new myPromise((resolve, reject) => {
            if(this.state === 'fulfilled'){
                setTimeout(() => {
                    try{
                      const result = onFulfilled(this.value)
                      resolve(result)  
                    }catch(err){
                        reject(err)
                    }
                }, 0)
            }
            if(this.state === 'rejected'){
                setTimeout(() => {
                    try{
                        const result = onRejected(this.reason)
                        resolve(result)
                    }catch(err){
                        reject(err)
                    }
                }, 0)
            }
            if(this.state === 'pending'){
                this.onResolvedCallback.push((value) => {
                    setTimeout(() => {
                        try{
                            const result = onFulfilled(value)
                            resolve(result)
                        }catch(err){
                            reject(err)
                        }
                    }, 0)
                })
                this.onRejectedCallback.push((reason) => {
                    setTimeout(() => {
                        try{
                            const result = onRejected(reason)
                            resolve(result)
                        }catch(err){
                            reject(err)
                        }
                    }, 0)
                })
            }

        })
    }
}
const p = new myPromise((resolve, reject) => {
    resolve(1)
}).then((res) => {
    console.log(res)
    return 2
}).then((res) => {
    console.log(res)
})
