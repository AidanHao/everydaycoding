function deepClone(obj, clonedObjects = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 检查是否已经拷贝过该对象，避免循环引用导致无限递归
  if (clonedObjects.has(obj)) {
    return clonedObjects.get(obj);
  }

  let clone;

  // 处理数组
  if (Array.isArray(obj)) {
    clone = [];
    clonedObjects.set(obj, clone);
    for (let i = 0; i < obj.length; i++) {
      clone[i] = deepClone(obj[i], clonedObjects);
    }
  }
  // 处理对象
  else if (obj instanceof Object) {
    clone = {};
    clonedObjects.set(obj, clone);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key], clonedObjects);
      }
    }
  }

  return clone;
}

// 第二种方式  管道通信

function deepCopy(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();

    port1.postMessage(obj)
    port2.onmessage = e => {
      resolve(e.data)
    }
  })
}


async function fn(obj){
  let newObj = await deepCopy(obj);
  console.log(newObj);
}

fn()