//永远不要相信用户的输入
//如何缓存计算结果
function add(a,b){
    //arguments 类数组
    if(arguments.length!==2)
    {
        //js语言向java靠近
        throw new Error('参数错误')
    }
    if(typeof a !='number'||typeof b !='number')
    {
        throw new Error('参数类型错误,请传入整数')
    }
        return a + b;
}
function memorize(fn){
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
//记忆功能
const memorizeAdd = memorize(add)
// memorizeAdd(1,2)
// memorizeAdd(1,2)
// js 不严格 编译阶段（编译成二进制再运行）
// try{
//     console.log(add(1,2))
//     console.log(add(2,1));
// }catch(err)
// {
//     console.log(err);
// }