class myPromise {
    constructor(executor){
        this.state = 'pending',
        this.value = null,
        this.onResolveCallback = [];
        this.onRejectCallbak = []

        resolve = (val) => {
            if(this.state==='pending'){
                this.state = 'fulfilled';
                this.value = val;
                this.onResolveCallback.forEach((cb) => cb());
            }
        }
        reject = (val) => {
            if(this.state === 'pending'){
                this.state = 'rejected';
                this.value = val;
                this.onRejectCallbak.forEach((cb) => cb())
            }
        }
        executor(resolve, reject)
    }
    then(onResolve, onReject){
        if(onResolve && typeof onResolve!=='function'|| onReject && typeof onReject !=='function'){
            throw new Error('必须接收函数')
        }
        return new myPromise((resolve, reject) => {
            if(this.state === 'fulfilled'){
                setTimeout(() => {
                    try{
                        const result = onResolve(this.value);
                        resolve(result)
                    }catch(err){
                        reject(err)
                    }
                })
            }
            if(this.state === 'rejected'){
                setTimeout(() => {
                    try{
                        const result = onReject(this.value)
                        resolve(result)
                    }catch(err){
                        reject(err)
                    }
                })
            }
            if(this.state === 'pending'){
                this.onResolveCallback.push((val) => {
                    setTimeout(() => onResolve(val))
                });
                this.onRejectCallbak.push((val) => {
                    setTimeout(() => onReject(val))
                })
            }
        })
    }
}