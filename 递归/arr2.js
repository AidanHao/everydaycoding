var arr = [1,[2,[3,4]]]//[1,2,3,4]
//递归
//typeof只能判断原始类型
//arr instanceof Array 判断arr是不是数组
//数组内置的方法 Array.isArray(arr)判断是不是数组

//面试常考
//数组合并的方法
//a.concat(b)把b里面的元素套出来，放在a里面去，或者[].concat(a,b)-->concat会生成一个新数组
//[...a,...b]
function flatten(arr) {
    var result = [];
    for(var i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i]))
        {
            var nextarr=flatten(arr[i]);
            result=result.concat(nextarr)
        }else{
            result.push(arr[i]);
        }

    }
    return result
}
console.log(flatten(arr))