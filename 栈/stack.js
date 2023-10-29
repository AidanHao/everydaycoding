// let stack = []
//栈数据结构和数组同出一脉，是一个弱化版的数组,是被砍掉一些功能的数组,用数组来模拟栈,
//Stack 栈只使用数组的push和pop方法 push推入最后一个，pop删除最后一个
//栈顶，栈底,不能通过访问下标的形式去获取值
//入栈操作
// stack.push('东北大阪')
// stack.push('可爱多')
// stack.push('巧乐兹')
// stack.push('小布丁')
// stack.push('中学高')
// //出栈
// while(stack.length)//除了0都是true 唯独0是false
// {
//     const top = stack[stack.length-1]
//     console.log('我正在吃',top)
//     stack.pop()
// }



// let s = '{[()]}'
// //       123456654321
// //对称优先用栈
// //const和let的常量：
// //左半部分入栈
// const stack = []
// const len = s.length//方便写代码,并且优化了，每次for循环都要读一遍s.length
// //左半部分作key,右半部分作value
// const obj = {
//     '(': ')',
//     '[': ']',
//     '{': '}'
// }
// for (let i = 0; i <len; i++) {
//     //只要是左半部分就入栈
//     const item = s[i]
//     if(item === '(' || item === '[' || itme === '{'){
//         stack.push(item)
//     }else{
//         //判断此时的item是否适配栈顶元素
//         //如何知道适配呢，代码只知道相等
//         //将栈顶的元素取出作出obj的key读取到value是否===item
//         if(!stack.lengthobj||obj[stack.pop()]!==item)
//         {
//             return false;
//         }      
//     }
//     return !stack.length//!会导致后面的值转变为boolean类型
// }
// //还可以在开头判断s中字符串是否为


