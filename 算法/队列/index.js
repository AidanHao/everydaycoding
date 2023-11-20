//栈
// let stack = []

//队列
let queue = [] //只能用push和shift 先进先出
//只允许头出，尾巴进
queue.push('宫保鸡丁')
queue.push('辣椒炒辣椒')
queue.push('红烧肉')

while(queue.length){
    // const top = queue[0]
    // console.log(top);
    // queue.shift()

    //这样也可以
    const top = queue.shift()
    console.log(top);
}
