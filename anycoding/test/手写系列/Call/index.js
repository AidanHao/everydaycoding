Function.prototype.myCall = function(context,...args){
  if(typeof context !== 'function'){
    throw new Error('type error')
  }

  context = context || window

  context.fn = this;

  const result = context.fn(...args);

  delete context.fn;

  return result;
}