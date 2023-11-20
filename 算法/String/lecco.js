/**
 * @param {string} s
 * @return {boolean}
 */
let s = "A man, a plan, a canal: Panama"
var isPalindrome = function(s) {
    let res = s.replace(/[^a-zA-Z]/g,'')
    res = res.replace(/ /g,'')
    let res2 = res.split('').reverse().join('')
    return res2
    return res===res2
    };
console.log(isPalindrome(s))