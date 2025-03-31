class EventEmitter{
    constructor(){
        this.event = {};
    }
    on(type, fn){
        if(!this.event[type]){
            this.event[type] = [fn]
        }else{
            this.event[type].push(fn);
        }
    }
    emit(type, ...args){
        if(!this.event[type]){
            return;
        }else{
            this.event[type].forEach((cb) => {
                cb(...args)
            })
        }
    };
    off(type, cb){
        if(!this.event[type]){
            return;
        }else{
            this.event[type].filter((fn) => fn!==cb)
        }
    }
    once(type, cb){
        const fn = (...args) => {
            cb(...args);
            this.off(type, fn);
        };
        this.on(type, fn);
    }
}