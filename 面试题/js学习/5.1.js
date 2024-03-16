// 手写深拷贝


let obj = {
    a:1,
    b:{
        n:2
    }
}
function deepCopy(obj){

    let objClone = Array.isArray(obj)?[]:{}
    for(let key in obj){
        // 判断是否是显示继承，因为typeof会遍历原型链
        if(obj.hasOwnProperty(key)){
            if(typeof obj[key] === 'object'&&obj[key]!==null){
                objClone[key] = deepCopy(obj[key])
            }else{
                objClone[key] = obj[key]
            }
        }
        
    }
    return objClone

}

let newObj = deepCopy(obj)
console.log(newObj);