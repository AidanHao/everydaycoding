function curry(fn){
    return function curryed(...args){
        if(args.length >= fn.length){
            return fn.apply(this, args)
        }else{
            return (...args2) => {
                return curryed.apply(this, args2.concat(args))
            }
        }
    }
}