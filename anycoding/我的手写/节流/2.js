function throttle(fn, delay){
    let timer = Date.now()
    return function(){
        if(Date.now() - timer > delay){
            fn.apply(this, arguments)
            timer = Date.now()
        }
    }
}