Function.prototype.mycall = function(context,...args){
    if(typeof this!=='function')
    {
        return new TypeError('type error')
    }
    context = context || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result

}

Function.prototype.myApply = function(context,args){
    if(typeof this!=='function')
    {
        return new TypeError('type error')
    }
    context = context ||window
    context.fn=this
    let result = args?context.fn(...args):context.fn()
    delete context.fn
    return result
}

Function.prototype.myBind = function(context,...args){
    if(typeof this!=='function'){
        return new TypeError('type error')
    }
    context = context || window
    context.fn = this
    return function(...args2){
        let result = context.fn(...args,...args2)
        delete context.fn
        return result
    }
}