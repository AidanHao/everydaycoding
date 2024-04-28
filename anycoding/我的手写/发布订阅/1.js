// 手写发布订阅
class EventEmitter {
    constructor() {
      this.event = {};
    }
    // 用于订阅
    on(type, cb) {
        if (!this.event[type]) {
            this.event[type] = [cb];
        } else {
            this.event[type].push(cb);
        }
    }
    // 订阅一次
    once(type, cb) {
        const fn = (...args)=>{
            cb(...args)
            this.off(type,cb)
        }
        this.on(type,fn)
    }
    //用于发布事件
    emit(type, ...args) {
        if(!this.event[type]){
            return 
        }else{
            this.event[type].forEach((cb)=>{
                cb(...args)
            })
        }
    }
    //用于取消订阅
    off(type, cb) {
        if(!this.event[type]){
            return
        }else{
            this.event[type] = this.event[type].fileter((item)=>{
                return item!==cb
            })
        }
    }
  }