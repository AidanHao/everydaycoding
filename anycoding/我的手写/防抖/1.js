// 防抖
function debounce(fn,delay){
    let timer = null
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(this,arguments)
        },delay)
    }
}

//二刷
function debounce(fn, delay){
    let timer = null
    return function() {
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    }
} 

function debounce(fn, delay){
    let timer = null;
    return function(){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn,apply(this, arguments);
        }, delay);
    }
}