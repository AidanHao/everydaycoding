// function myNew(Constructor, ...args) {
//   let newObj = Object.create(Constructor.prototype);


//   let result = Constructor.apply(newObj, args);

//   return (result != null && (typeof result === 'object || typeof result === function') ? result :newObj);
// } 

function myNew(constructor,...args){
  if(typeof constructor !== 'function'){
    throw new TypeError('myNew:constructor must be a function');
  }
  const obj = Object.create(constructor.prototype);

  const result = constructor.apply(obj,args);

  // return (result != null && (typeof result === 'object' || typeof result === 'function') ? result : obj)  // 第一种
  return result instanceof Object ? result : obj;   // 第二种
}

function Person(name, age){
  this.name = name;
  this.age = age;
  this.sayName = function(){
    console.log('我是'+this.name);
  }
}

let p = myNew(Person, 'zhangsan', 18);

console.log(p);
console.log(p instanceof Person);
p.sayName()