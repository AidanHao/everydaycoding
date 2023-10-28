let temperature = [73,74,75,71,69,72,76,73]
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    //避免我们做重复的操作
    //递减,找打破规则的
    // [0,0,0,0,0,0,0,0]
const len = temperatures.length
const stack = []//维护一个递减趋势的栈
const res = new Array(len).fill(0)
for(let i = 0 ;i<len ;i++) {
    
    // 存在打破递减趋势的温度
    while(stack.length&&temperatures[i]>temperatures[stack[stack.length-1]])
    {
        const top = stack.pop()
        res[top] = i -top
    }

    stack.push(i)
}


























    // const len = temperatures.length
    // const res = []
    // for(var i = 0; i <len; i++){
    //     let flag = false
    //     const item = temperatures[i]
    //     for(var j = i + 1; j<len ; j++){
    //         const high = temperatures[j]
    //         if(item < high){
    //             res.push(j - i)
    //             flag = true
    //             break//性能更好
    //         }
    //     }
    //     //里面找不到更高的就push0
    //     if(!flag){
    //         res.push(0)
    //     }
    
    // }
    // return res
    
};