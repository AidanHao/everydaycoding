//记忆函数，闭包的高级功能
function memoized(fn){
    if(typeof fn!='function')
    {
        throw new Error('请传入函数')
    }
    var cache = { //key:value O(1) 空间换时间

    }
    return function(){
        // 唯一性
        var key = arguments.length + 
         Array.prototype.join.call(arguments,",")//','保证唯一性
         //可以用Array.from包装数组，...解构数组
         //为什么用join? 借！借方法，临时借用的方法
         console.log(key);
         if(key in cache)
         {
               return cache[key];
         }else{ 
            
            return cache[key] = fn.apply(this, arguments);
         }
    }
}

let count = 0
var fibonacci = function(n){
    count++
     return n <2? n :fibonacci(n-1)+fibonacci(n-2)
}
var memoizedFibonacci = memoized(fibonacci)
//time调试，timeEnd调试
console.time('fibonacci')
memoizedFibonacci(20)
// fibonacci(20)
console.log(count);
console.timeEnd('fibonacci')

//递归的问题，重复计算

