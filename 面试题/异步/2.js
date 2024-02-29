let count = 0
function foo(){
    console.log(count);
}
function bar(cb){
    setTimeout(()=>{
        count = 1
        cb()
        
    },1000)
}
// 回调不会爆栈

bar(foo)
