// 节流
function throttle(fn,delay){
    let starttime = Date.now()
    return function(){
        if(Date.now() - starttime >delay){
            fn.apply(this,arguments)
            starttime = Date.now()
        }
    }
}