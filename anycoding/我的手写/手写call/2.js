Function.prototype.myCall = function(context, ...args){
    if(typeof this !== 'function'){
        throw new TypeError('Type error')
    }
    context = context || window;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn
    return result
}