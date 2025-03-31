Function.prototype.myapply = function(context,args){
    if(typeof this !=='function '){
        return TypeError('type error')
    }
    context = context || window
    // 缓存this
    context.fn = this
    const result = args?context.fn(...args):context.fn()
    delete context.fn
    return result
}

//二刷
Function.prototype.myApply = function(context, args){
    if(typeof this !== 'function'){
        return TypeError('type Error');
    }
    context = context || window;
    context.fn = this;
    const result = args ? context.fn(...args) : context.fn();
    delete context.fn;
    return result;
}

Function.prototype.myApply = function(context, args){
    if(typeof this !== 'function'){
        return TypeError('type Error')
    };
    context = context || window;
    context.fn = this;
    const result = args ? context.fn(...args) : context.fn();
    delete context.fn;
    return result;
}