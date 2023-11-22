// 面试题 手动实现一个深拷贝的方法
let obj = {
    name:'小黑',
    age:18,
    like:{
        type:'coding'
    }
}
var copyobj = deepCopy(obj)
obj.type = 'running'
console.log(copyobj);
//换一个地址
//这个如果对象存在循环引用就会爆栈
function deepCopy(obj) {
    let objCopy = {}
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            if(obj[key] instanceof Object)//obj[key] i是引用类型
            {
                objCopy[key] = deepCopy(obj[key])
            }else
            {
                objCopy[key] = obj[key]
            }
        }
    }
    return objCopy
}

//Jquery库，这个库很经典
//https://www.underscorejs.cn/  封装了好多方法