// 手写instance
function myInstanceOf(obj,type){
    if(typeof obj !=='function'){
        return false
    }
    let proto = Object.getPrototypeOf(obj)
    while(proto)
    {
        if(proto == type.protorype){
            return true
        }else
        {
            proto = Object.getPrototypeOf(proto)
        }
    }
    return false
}