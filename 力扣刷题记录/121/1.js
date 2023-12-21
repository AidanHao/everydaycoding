//低买高卖 0
//最低的价格买入，最高的价格卖出 贪心算法 greedy
const maxProfit = function(prices){
    // 流程 自顶向下 递归
    //当天卖 dp[i] = Math.max(price - min , dp[i-1])
    //自下向上去迭代完成 相信每一个dp[i] 都是最优子结构
    // dp[0] = 0
    const dp = new Array(prices.length).fill(0)
    let min = prices[0]
    for(let i = 1;i<prices.length;i++)
    {
        min = Math.min(prices[i], min)
        dp[i] = Math.max(dp[i-1],prices[i]-min)
    }
    return dp[prices.length-1]
}
console.log( maxProfit([7,1,5,3,6,4]))