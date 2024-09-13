// 手写call
Function.prototype.mycall = function(context,...args){
    if(typeof this!=='function'){
        return TypeError('type error')
    }
    context = context || window
    // 缓存this
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

//二刷
Function.prototype.myCall = function(context, ...args){
    if(typeof this !== 'function'){
        return TypeError('type error');
    }
    context = context || window;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}