function throttle(fn,delay) {
  let preTime = Date.now();
  return function (args){
    if(Date.now() - preTime >= delay){
      fn.apply(this,args);
      preTime = Date.now();
    }
  }
}