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

// 二刷
function myDeepCopy(obj){
    let newObj = Array.isArray(obj) ? [] : {};
    for(let key in obj){
       if(obj.hasOwnProperty(key)){
        if(typeof obj[key] === 'object' && obj[key]!==null){
            newObj[key] = myDeepCopy(obj[key]);
        }else{
            newObje[key] = obj[key];
        }
       } 
    }
    return newObj;
}