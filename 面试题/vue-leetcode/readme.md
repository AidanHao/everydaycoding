# diff算法
底层实现用到了位运算
patch补丁包

- 位运算 & | 遵守了 && || 的含义 可以在二进制层面运算，性能更好
- 聊 vue patch过程要聊到位运算 
    有更新 
    old  new  
    DOM 是在浏览器的渲染层
    JS 是在v8引擎主线程
    新旧两个对象对比
    patch 一次收集所有需要的更新（patches） 通知浏览器更新 补丁算法
    

let num1 = 10//1010
let num2 = 5//101
let result = num1 & num2
console.log(result);

n n
O(n^2)
节点之间还要比对属性 文本...O(n^3)

[a,b,c,d] [a,b,c,d] [a,c,d]

为了性能优化