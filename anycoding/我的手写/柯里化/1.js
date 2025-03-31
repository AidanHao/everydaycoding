// 柯里化
function curry (fn){
    return function curryed(...args){
        if(args.length >= fn.length){
            return fn.apply(this,args)
        }else{
            return (...args2)=>{
                return curryed.apply(this,args.concat(args2))
            }
        }
    }
}

//二刷
function curry(fn){
    return function curryed(...args){
        if(args.length >= fn.length){
            return fn,apply(this, args);
        }else{
            return (...args2)=>{
                return curryed.apply(this, args.concat(args2));
            }
        }
    }
}

function curry(fn){
    return function curryed(...args){
        if(args.length >= fn.length){
            return fn.apply(this, args)
        }else{
            return (...args2) => {
                return curryed(this, args.concat(args2))
            }
        }
    }
}