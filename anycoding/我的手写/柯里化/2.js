function curry(fn){
    return curryed = (...args) => {
        if(args.length >= fn.length){
            return fn.apply(this, args)
        }else{
            return (...args2) => {
                return curryed.apply(this, args.concat(args2))

            }
        }
    }
}