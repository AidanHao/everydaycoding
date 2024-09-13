// 递归
function add(n){
    if(n==0||n==1||n==2){
        return 1
    }
    return add(n-2)+add(n-1)
}
console.log(add(6));

// 非递归
function nonadd(n)
{
    if(n==0||n==1||n==2){
        return 1
    }
    let arr = [1,1,1]
    for(let i = 3;i<=n;i++){
        arr[i] = arr[i-1] + arr[i-2]
    }
    return arr[n]
}
console.log(nonadd(6));

// 实现一个队列
class queen{
    constructor(){
        this.arr = []
    }
    add(item){
        this.arr.push(item)
    }
    get(){
        return this.arr.shift()
    }
    showarr(){
        console.log(this.arr);
    }
}

let q = new queen()
q.add(1)
q.add(2)
q.add(3)
q.add(4)
console.log(q.get());
console.log(q.get());
console.log(q.get());
console.log(undefined == -1);
