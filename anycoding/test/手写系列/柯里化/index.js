
function add1(a,b,c){
  return a + b + c;
}

function curry(fn){
  let judge = (...args) =>{
    if(args.length === fn.length){
      return fn(...args);
    }
    return (...arg) => judge(...args,...arg);
  }

  return judge;
}


const add = curry(add1)

console.log(add(1)(2)(3))