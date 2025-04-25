Function.prototype.myBind = function(context, ...args){
    if(typeof this !== 'function'){
        throw new TypeError('Error')
    }
    context = context || window;
    context.fn = this
    return function(...args2){
        const result = context.fn(...args, ...args2)
        delete context.fn
        return result
    }
}