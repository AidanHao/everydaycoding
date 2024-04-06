var length = 10;

function fn() {

 return this.length+1;

}

var obj = {

 length: 5,

 test1: function() {

  return fn();

 }

};

obj.test2=fn;
console.log(obj.test1);
fn()===obj.test2()    



// 使用reduce方法实现map的polyfill is 

function mymap(arr){
    let newarr = []
    arr.reduce((a,b)=>{
        return b
    },0)
}
mymap([1,2,3])



function debounce(fn,delay){
    let timer = null
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(this,arguments)
        },delay)
         
    }
}
function throttle(fn,delay){
    let starttime = Date.now()
    return function(){
        if(Date.now()-starttime>delay){
            fn.apply(this,arguments)
            starttime = Date.now()
        }
    }
}


// 长度为n的整数数组height n条线 第i条线 i,0 和 i，height[i]
function water(height){
    let left =0
    let right = height.length-1
    let max = 0
    while(left<right)
    {
        max = Math.max(max,Math.min(height[left],height[right])*(right-left))
        if(height[left]>=height[right]){
            right--
        }else{
            left++
        }
    }
    return max

}
console.log(water([1,8,6,2,5,4,8,3,7]));