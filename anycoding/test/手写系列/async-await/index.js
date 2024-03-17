// function asyncFn(genFn){
//   const g = genFn();
//   return new Promise((resolve,reject)=>{
//     function asyncGoNext(g,nextval){
//       const { value , done } = g.next(nextval);
//       if(!done){
//         value.then((res)=>{
//           asyncGoNext(g,res);
//         })
//       }else{
//         return resolve(value)
//       }
//     }
//     asyncGoNext(g);
//   })
// }

function asyncFn(genFn){
  const g = genFn();
  return new Promise((resolve,reject)=>{
    function asyncGonext(g,nextval){
      const { value , done } = g.next(nextval);
      if(!done){
        value.then((res)=>{
          asyncGonext(g,res)
        })
      }else{
        return resolve(value);
      }
    }
    asyncGonext(g)
  })
}

const getData = (i) =>new Promise((resolve)=>{
  setTimeout(()=>{
    resolve(`data${i}`)
  },1000)
})

function* testG(){
  const data1 = yield getData(1);
  console.log('data1',data1)
  const data2 = yield getData(2);
  console.log('data2',data2)
  return 'success'
}

asyncFn(testG).then((res)=>{
  console.log(res);
})


