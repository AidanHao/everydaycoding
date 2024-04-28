// 深拷贝
function deepCopy(obj){
    let newObj = Array.isArray(obj)? [] : {}
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            if(typeof obj[key] == 'object'&& obj[key]!=null){
                newObj[key] = deepCopy(obj[key])
            }else{
                newObj[key] = obj[key]
            }
        }   
    }
    return newObj
}