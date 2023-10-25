//hackthon 智商游戏！
function createPhoneNumber(numbers){
    var format = "(xxx) xxx-xxxx";//这是一个模板
    for (let i = 0;i<numbers.length;i++){
        format = format.replace('x',numbers[i])//replace 方法考的最多，考点常有
    }
    return format;
}
//刷力扣 leetcode 题解
console.log(createPhoneNumber([1,2,3,4,5,6,7,8,9,0]))