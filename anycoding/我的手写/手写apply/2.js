Function.prototype.myApply = function(context, args){
    if(typeof this !== 'function'){
        throw new TypeError('Type error');
    }
    context = context || window;
    context.fn = this;
    const result = args ? context.fn(...args) : context.fn();
    delete context.fn;
    return result
}