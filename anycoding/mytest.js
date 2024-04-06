// 实现一个new操作符
function Car(name) {
  this.name = name;
  return {};
}

function myNew(...args) {
  let obj = {};
  obj.__proto__ = args[0].prototype;
  // 如果构造函数返回一个原始数据类型的话，没有任何影响的，如果返回的是一个引用类型的话，那么就直接返回这个引用类型
  //
  const res = args[0].call(obj, ...args.slice(1));
  return res instanceof Object ? res : obj;
}

function mynew(fn, ...arguments) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let res = fn.call(obj, ...arguments);
  return res instanceof Object ? res : obj;
}

let car = myNew(Car, "宝马");
console.log(car);

// 手写节流

function throttle(fn, delay) {
  // 拿到现在的时间
  let starttime = Date.now();
  return function () {
    if (Date.now() - starttime > delay) {
      fn.apply(this, arguments);
      starttime = Date.now();
    }
  };
}

// 手写防抖

function debounce(fn, delay) {
  let timer = null; //记录定时器
  return function () {
    if (timer) clearTimeout(timer); //如果存在就清除
    timer = setTimeout(() => {
      //重新赋值
      fn.apply(this, arguments);
    }, delay);
  };
}

// 手写一个深拷贝
function deepCopy(obj) {
  // 判断引用数据是数组还是对象
  let objClone = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    // for in 拿到的是键名 并且会遍历整个原型链
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        objClone[key] = deepCopy(obj[key]);
      } else {
        objClone[key] = obj[key];
      }
    }
  }
  return objClone;
}

// 手写一个柯里化
// function curry(fn) {
//     let res = (...args)=>{
//         if(args.length == fn.length){
//             return fn(...args)
//         }
//         return (...arg) =>{res(...args,...arg)}
//     }
//     return res

// }

// 手写柯里化
function curry(fn) {
  return function curryed(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curryed.apply(this, args.concat(args2));
      };
    }
  };
}

// 手写一个instanceOf
function myInstanceOf(obj, type) {
  if (typeof type !== "function ") return false;
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === type.prototype) {
      return true;
    } else {
      proto = Object.getPrototypeOf(proto);
    }
  }
  return false;
}

// 手写发布订阅
class EventEmitter {
  constructor() {
    this.event = {};
  }
  // 用于订阅
  on(type, cb) {
    if (!this.event[type]) {
      this.event[type] = [cb];
    } else {
      this.event[type].push(cb);
    }
  }
  // 订阅一次
  once(type, cb) {
    const fn = (...args) => {
      cb(...args);
      this.off(type, cb);
    };
    this.on(type, fn);
  }
  //用于发布事件
  emit(type, ...args) {
    if (!this.event[type]) {
      return;
    } else {
      this.event[type].forEach((cb) => {
        cb(...args);
      });
    }
  }
  //用于取消订阅
  off(type, cb) {
    if (!this.event[type]) {
      return;
    } else {
      this.event[type] = this.event[type].filter((item) => {
        item !== cb;
      });
    }
  }
}

// 用法
let ev = new EventEmitter();
const fn = (a, b) => {
  console.log(a, b, 1);
};
const fn1 = (a, b) => {
  console.log(a, b, 2);
};
// 多个对象对同一个事件进行了订阅
ev.on("run", fn);
ev.on("run", fn1);

// 发布一个run事件，还可以接收一个参数
ev.emit("run", 1, 1);
ev.emit("run", 3, 3);

// 手写call
Function.prototype.mycall = function (context, ...args) {
  if (typeof this !== "function") {
    return new TypeError("type error");
  }
  context = context || window;
  // 缓存this
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
// 手写apply
Function.prototype.myapply = function (context, args) {
  if (typeof this !== "function") {
    return new TypeError("type error");
  }
  context = context || window;
  context.fn = this;
  const result = args ? context.fn(...args) : context.fn();
  delete context.fn;
  return result;
};
// 手写bind
Function.prototype.mybind = function (context, ...args) {
  if (typeof this !== "function") {
    return new TypeError("type error");
  }
  context = context || window;
  context.fn = this;
  return function (...args2) {
    const result = context.fn(...args, ...args2);
    delete context.fn;
    return result;
  };
};

function once(cb) {
  let ran = false,
    res;
  return function () {
    if (ran) return res;
    res = cb.apply(this, arguments);
    ran = true;
    return res;
  };
}

let i = 0;

const foo = once(() => {
  i++;
  return i;
});

console.log(foo());
console.log(foo());
