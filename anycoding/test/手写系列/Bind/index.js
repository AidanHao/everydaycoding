Function.prototype.myBind = function(context,...args1){
  if(typeof context !== 'function'){
    throw new TypeError('Argument must be a function')
  }

  context = context || window

  context.fn = this;

  return function(...args2){
    const result = context.fn(...args1,...args2);
    delete context.fn;
    return result;
  }
}