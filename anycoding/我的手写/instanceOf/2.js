function myINstanceOf(obj, type){
    if(typeof obj !== 'object' || obj === null){
        return false
    }
    let proto = Object.getPrototypeOf(obj)
    while(proto){
        if(proto == type.prototype){
            return true
        }else{
            proto = Object.getPrototypeOf(proto)
        }
    }
    return false
}