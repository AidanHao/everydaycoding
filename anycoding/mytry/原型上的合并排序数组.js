//写在原型上的合并排序数组

let arr = [2,3];
Array.prototype.getArr = function(arr){
    let newArr = [...this.concat(arr).sort()]
    return newArr;
}
console.log(arr.getArr([1,4]));





