class PubSu {
  constructor(){
    this.event = {};
  }

  on(type,cb){
    if(!this.event[type]){
      this.event[type] = [cb]
    }else{
      this.event[type].push(cb);
    }
  }

  emit(type,...args){
    if(!this.event[type]){
      return;
    }else{
      this.event[type].forEach(cb =>{
        cb(...args);
      })
    }
  }

  off(type,cb){
    if(!this.event[type]){
      return;
    }
  }
}