// 动态规划
function fibonacci(n) {
    // var result = []
    // result[0]=1
    // result[1]=1
    // for(var i = 2;i<n;i++)
    // {
    //     result.push(result[i-1]+result[i-2])
    // }
    // return result[n-1]

    let a = 1,b = 1
    for(var i = 2;i<n;i++)
    {
        [a , b]= [b , a+b]
    }
    return b
}
console.log(fibonacci(6));