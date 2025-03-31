// 手写bind
Function.prototype.mybind = function(context,...args){
    if(typeof this !== 'function'){
        return TypeError('type error')
    }
    context = context || this
    // 缓存this
    context.fn = this
    return function(...args2){
        const result = context.fn(...args,...args2)
        delete context.fn
        return result
    }
}

//二刷
Function.propotype.myBind = function(context, ...args){
    if(typeof this !== 'function'){
        return TypeError('type error');
    };
    context  = context || window;
    context.fn = this;
    return function(...args2){
        const result = context.fn(...args, ...args2)
        delete context.fn;
        return result;
    }
};

Function.propotype.myBind = function(context, ...args){
    if(typeof this !== 'function'){
        return TypeError('type error')
    };
    context = context || window;
    context.fn = this;
    return function(...args2){
        const result = context.fn(...args, ...args2);
        delete context.fn;
        return result;
    }

}