function myInstanceOf(obj, type){
    let proto = Object.getPrototypeOf(obj)
    while(proto){
        if(proto === type.prototype){
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}
console.log(myInstanceOf(function(){}, Array));
