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

// 二刷
function throttle(fn, delay) {
    let timer = Date.now()
    return function() {
        if(Date.now() - timer > delay){
            fn.apply(this, arguments);
            timer = Date.now()
        }
    }
};

function throttle(fn ,delay){
    let timer = Date.now();
    return function() {
        if(Date.now() - timer >= delay){
            fn.apply(this, arguments);
            timer = Date.now();
        }
    }
}