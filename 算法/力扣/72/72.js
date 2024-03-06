/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    const n = word2.length;
    const m = word1.length;
    const dp = new Array(m+1).fill(0).map(()=>{new Array(n + 1)});
    for(let i = 0; i<=m;i++)
    {
        dp[i][0] = i
    }
    for(let j = 0;j<=n;j++)
    {
        dp[0][j] = j
    }
     // 动态规划填充矩阵
     for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (word1[i - 1] === word2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1]; // 如果两个字符相等，则不需要消耗操作次数
          } else {
            dp[i][j] = Math.min(
              dp[i - 1][j - 1] + 1, // 替换操作
              Math.min(dp[i][j - 1] + 1, // 插入操作
                       dp[i - 1][j] + 1) // 删除操作
            );
          }
        }
      }
    
      return dp[m][n]; // 最终答案位于dp数组右下角
    }
  
  console.log(minDistance('horse', 'ros'))

    // for(let i = 1 ; i<=m; i++)
    // {
    //     for(let j = 1;j <= n ;j++)
    //     {
    //         if(word1[i]===word2[j])
    //         {
    //             dp[i][j]
    //         }
    //     }
    // }
};