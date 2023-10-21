var nums = [2,7,11,15],target=9
//创建一个空对象
//name 键名key '阳阳'键值value 
var obj = {
    name:'阳阳',
    age:18,
    sex:'box'
}
obj.girefriend = 'xxx'//给对象里面赋值或者修改
//obj.name调用对象
//如果对象里面key为数字调用反法为obj[数字]
//---------------------------------------------------------------
// var twoSum = function(nums, target) {
//     for(var i=0;i<nums.length;i++){
//         var result = target - nums[i]
//         var j = nums.indexOf(result)
//         if(i!==j&& j !=-1){
//             return [i,j]
//         }
//     }
// }
var twoSum = function(nums, target) {
    var diffs = {}
    for(var i =0;i<nums.length;i++){
        if(diffs[target-nums[i]] !==undefined){
            return [diffs[target-nums[i]],i]

        }else{
            diffs[nums[i]] = i
        }
    }
}