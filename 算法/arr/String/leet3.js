let s = 'abcabcbb'
/**
 * @param {string} s
 * @return {number}
 */
    var lengthOfLongestSubstring = function(s) {
        let i = 0, res = 0
        for (let j = 0; j < s.length; j++) {
          let index = s.slice(i, j).indexOf(s[j]) // 'abc'  a
          if (index === -1) {
            res = Math.max(res, j - i + 1)
          } else {
            i = i + index + 1
          }
        }
        return res
      };
    

// let obj = {}
//     let res = 0
//     let j = 0//不重复的字符的index
//     for(let i = 0;i<s.length;i++)
//     {
//         const value = obj[s[i]]
//         if(value !== undefined)
//         {
//             //j 表示下一次该从哪里开始
//             j = Math.max(value + 1,j)
//         }
//         res = Math.max(res,i-j+1)
//         obj[s[i]] = i
//     }
//     return res

// const len = s.length();
// if(len===0)return 0
// let res = 1
// let current = 0
// for(let i = 0; i < len; i++) {
//     let current = 1
//     let j =i+1
//     while(s[i]!==s[j]&&j<len){
//         current++
//         j++
//     }
//     res = Math.max(res,current)
// }
// return res