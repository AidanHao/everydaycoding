let s = 'abca'
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    const len = s.length
    let i = 0, j = len - 1;
  
    while ( i < j && s[i] === s[j]) {
      i++
      j--
    }
  
    // i j
    // 尝试跳过 i， 或者 j
    if (isPalindrome(i + 1, j)) {
      return true
    }
    if (isPalindrome(i, j - 1)) {
      return true
    }
  
    function isPalindrome(st, ed) {
      while (st < ed) {
        if (s[st] !== s[ed]) {
          return false
        }
        st++
        ed--
      }
      return true
    }
  
    return false
  };


// var validPalindrome = function(s) {
//     if(ispallindrome(s))
//     {
//         return true;
//     }else{
//         const len = s.length;
//         for(let i = 0;i<len;i++)
//         {
//             //每个字符都删一次
//             let arr = s.split('')
//             arr.splice(i,1)
//             let str =  arr.join('')
//             if(ispallindrome(str))return true;
//         }
//         return false;
//     }

// };
// function ispallindrome(s){
//     const len = s.length-1
//     for(let i = 0;i<len/2;i++){
//         if(s[i]!==s[len-i]){
//             return false
//         }
//     }
//     return true
// }