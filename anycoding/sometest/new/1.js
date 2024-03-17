function Car(name) {
    this.name = name;
}

// 手写一个new
function myNew(...args) {
    let obj = {}
    obj.__proto__ = args[0].prototype
    let res = args[0].call(obj, ...args.slice(1))
    return res instanceof Object ? res : obj
}
const p = myNew(Car, '宝马', '奔驰')
console.log(p);

// 手写一个防抖
function debounce(fn, delay) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            console.log(arguments);
            fn.apply(this, arguments)
        }, delay)
    }

}

// 手写一个节流
function throttle(fn,delay){
    let timer = Data.now()
    return function(){
        if(timer - Data.now() > delay)
        {
            fn.apply(this,arguments)
            timer = Data.now()
        }
    }
}

// 手写一个深拷贝
function deepCopy(obj){
    let objClone = Aarry.isArray()?[]:{}
    for(let key in obj)
    {
        if(obj.hasOwnPrototy(key))
        {
            if(typeof obj[key] === 'object'&&obj[key]!==null)
            {
                objClone[key] = deepCopy(obj[key])
            }
            else{
                objClone[key] = obj[key]
            }
        }
    }
    return objClone
}