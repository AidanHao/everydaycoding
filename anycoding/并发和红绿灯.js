// 实现一个并发
//模拟一个异步请求
function timer(runtime){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()//表示请求执行完毕
        },runtime)
    })
}

class SuperTask{
    constructor(maxcount){
        this.tasks = []//任务队列
        this.maxcount = maxcount//同时并发的数量
        this.runtask = 0//正在运行的任务
    }
    add(task){
        return new Promise((resolve,reject)=>{
            this.tasks.push(//将任务放入到任务队列当中，
                {
                    task,
                    resolve,
                    reject
                }
            )
            this._run()
        })
    };
    _run(){
        //判断是否达到最大并发数量，或者是否还有任务需要执行
        if(this.runtask<this.maxcount && this.tasks.length){
            this.runtask++
            const {task,resolve,reject} = this.tasks.shift()//通过解构，取出头部的任务
            task()
            .then(resolve,reject)
            .finally(()=>{
                //有一个任务执行完毕
                this.runtask--
                this._run()
            })
        }
    }
}

const supertask = new SuperTask(3)
const addTask = function(time,taskname){
    supertask
    .add(()=>timer(time))
    .then(()=>{
        console.log(`任务${taskname}执行完毕`);
    })
}

addTask(1000,1)
addTask(2000,2)
addTask(1000,3)
addTask(1000,4)
addTask(500,5)
addTask(500,6)


// list转tree
const list = [
    { key: 1, data: "A", parentkey: 0 },
    { key: 2, data: "B", parentkey: 0 },
    { key: 3, data: "C", parentkey: 1 },
    { key: 4, data: "D", parentkey: 1 },
    { key: 5, data: "E", parentkey: 2 },
    { key: 6, data: "F", parentkey: 3 },
    { key: 7, data: "G", parentkey: 2 },
    { key: 8, data: "H", parentkey: 4 },
  ];
  function convert(list) {
      let judobj = {}
      for(let i = 0; i < list.length; i++) {
          judobj[list[i].key] = i
      }
      for(let i = 0; i < list.length; i++) {
          if(list[i].parentkey === 0){
              continue
          }else
          {
              if(!list[judobj[list[i].parentkey]].children){
                  list[judobj[list[i].parentkey]].children = []
                  list[judobj[list[i].parentkey]].children.push(list[i])
              }else
              {
                  list[judobj[list[i].parentkey]].children.push(list[i])
              }
          }
      }
  
      return list.filter((list)=>{
          return list.parentkey ===0
      })
  }
  console.log(convert(list));

//红绿灯
class TrafficLight {
    constructor() {
      this.colors = ["红色", "黄色", "绿色",'黄色'];
      this.times = [3000, 1000, 2000,1000];
      this.isRunning = false;
      this.currentIndex = 0;
    }
    start() {
      this.isRunning = true;
      this.working();
    }
    async working() {
      while (this.isRunning) {
        await new Promise((resolve, reject) => {
          console.log(this.colors[this.currentIndex]);
          setTimeout(() => {
            resolve();
          }, this.times[this.currentIndex]);
          this.currentIndex = (this.currentIndex + 1) % this.colors.length;
        });
      }
    }
    stop(){
      this.isRunning = false;
    }
  }
  const p = new TrafficLight();
  p.start();
  setTimeout(()=>{
      p.stop();
  },14000)
  

// 使用reduce方法实现map方法
// 通过reduce方法实现map
Array.prototype.myMap = function(fn){
    let newarr = []
    this.reduce((a,b,c)=>{
        let item = b
        let index = c
        let arr = this
        newarr.push(fn(item,index,arr))
    },0)
    return newarr
}
let arr1 = [5,6,7]
let arr2 = arr1.myMap((item,index,arr)=>{
    arr[index]++
    return --item
})
console.log(arr1,arr2);