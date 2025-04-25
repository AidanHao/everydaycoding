class EventEmitter{
    constructor(){
        this.event = {}
    }
    on(type, fn){
        if(this.event[type]){
            this.event[type].push(fn)
        }
        else{
            this.event[type] = [fn]
        }
    }
    off(type, fn){
        if(!this.event[type]){
            return
        }else{
            this.event[type] = this.event[type].filter(item => item !== fn)
        }
    }
    once(type, fn){
        const cb = (...args) =>{
            fn(...args)
            this.off(type, cb)
        }
        this.on(type, cb)
    }
    emit(type, ...args){
        if(!this.event[type]){
            return
        }else{
            this.event[type].forEach(fn => {fn(...args)})
        }
    }
}