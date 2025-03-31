// 手写instance
function myInstanceOf(obj,type){
    if(typeof obj !=='object' || obj ==null){
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
};

//二刷
function myInstanceOf(obj, type){
    if(typeof obj !=='object' || obj ==null){
        return false
    };
    let proto = Object.getPrototypeOf(obj);
    while(proto){
        if(proto === type.prototype){
            return true
        }else{
            proto = Object.getPrototypeOf(proto);
        }
    }
    return false;
};

function myInstanceOf(obj, type){
    if(typeof obj !== 'object' || obj == null){
        return false;
    }
    let proto = Object.getPrototypeOf(obj);
    while(proto){
        if(proto == type.prototype){
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    };
    return false;
}