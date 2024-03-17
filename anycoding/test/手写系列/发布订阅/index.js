class PubSu {
  constructor(){
    this.event = {}
  }

  on(type,cb){
    if(!this.event[type]){
      this.event[type] = [cb]
    }else{
      this.event[type].push(cb)
    }
  }

  emit(type,...args){
    if(!this.event[type]){
      return;
    }else{
      this.event[type].forEach(cb=>{
        cb(...args);
      })
    }
  }

  off(type,cb){
    if(!this.event[type]){
      return;
    }else{
      this.event[type] = this.event[type].filter(item => item != cb);
    }
  }

  once(type,cb){  
    const fn = (...args) =>{
      cb(...args);
      this.off(type,cb)
    }
    this.on(type,fn)
  }
}