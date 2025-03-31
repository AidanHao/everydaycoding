//发布订阅复习
class EventEmitter{
    constructor(){
        this.event = {}
    }
    on(type, fn){
        if(!this.event[type]){
            this.event[type] = [fn]
        }else{
            this.event[type].push(fn)
        }
    }
    emit(type, ...args){
        if(!this.event[type]){
            return
        }else{
            this.event[type].forEach((fn) => {
                fn(...args)
            })
        }
    }
    off(type, fn){
        if(!this.event[type]){
            return
        }else{
            this.event[type] = this.event[type].filter((cb) => {
                return cb!==fn
            })
        }
    }
    once(type,fn){
        const cb = (...args) => {
            fn(...args)
            this.off(type, fn)
        }
        this.on(type, cb)
    }
}