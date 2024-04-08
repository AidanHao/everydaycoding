// 手写一个new
function mynew(fn,...args) {
    let obj = {}
    obj.__proto__ = fn.prototype
    const res = fn.apply(this,args)
    return res instanceof Object ? res: obj
}


// 手写柯里化
function curry(fn){
    return function curred(...args){
        if(args.length>=fn.length){
            fn.apply(this,args)
        }else
        {
            return (...args2)=>{
                return curred.apply(this,args.concat(args2))
            }
        }
    } 
}



// 手写一个instanceOf
function MyInstanceOf(obj,type){
    if(typeof type!=='function'){return false}
    let proto = Object.getPrototypeOf(obj)
    while(proto){
        if(proto===type.prototype){
            return true
        }else{
            proto = Object.getPrototypeOf(obj)
        }
    }
    return false
}



// 递归回溯
function total(nums,aim,result= [],path = [],nowindex = 0){
    if(nowindex === nums.length){
        if(path.reduce((a,b)=>a+b,0)===aim){
            result.push([].concat(path))
            return result
        }
        return
    }
    for(let j=0;j<2;j++){
        path.push(nums[nowindex])
        nums[nowindex] = -nums[nowindex]
        total(nums,aim,result,path,nowindex+1)
        path.pop()
    }
    return result
}

console.log(total([1,1,1,1,1],3));



// 红绿灯
class TrafficLight{
    constructor(){
        this.colors = ['红色','黄色','绿色','黄色']
        this.times = [3000,1000,2000,1000]
        this.isrunning = false
        this.currentIndex = 0
    }
    start(){
        this.isrunning = true
        this.LightWorking()
    }
    async LightWorking(){
        while(this.isrunning) {
            await new Promise((resolve,reject)=>{
                console.log(this.colors[this.currentIndex]);
                setTimeout(()=>{
                    resolve()                    
                },this.times[this.currentIndex])
                this.currentIndex = (this.currentIndex + 1)%this.times.length
            })
            
        }
    }
}
// const p = new TrafficLight()
// p.start()



// 并发
// 模拟一个请求
function timmer(delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },delay)
    })
}
// 实现并发
class SuperTask{
    constructor(maxnum){
        this.maxnum = maxnum
        this.tasks = []//任务队列
        this.runningnum = 0
    }
    add(task){
        return new Promise((resolve,reject)=>{
            this.tasks.push({task,resolve,reject})
            this.runtask()
        })
    }
    runtask(){
        if(this.runningnum <this.maxnum&&this.tasks.length){
            this.runningnum++
            const {task,resolve,reject} = this.tasks.shift()
            task()
            .then(resolve,reject)
            .finally(()=>{
                this.runningnum--
                this.runtask()
            })
        }
    }
}
// const p = new SuperTask(2)
// function addTask(delay,taskname){
//     p.add(()=>timmer(delay))
//     .then(()=>{
//         console.log(`任务${taskname}完成`);
//     })
// }
// addTask(1000,1)
// addTask(2000,2)
// addTask(1000,3)
// addTask(1000,4)
// addTask(500,5)
// addTask(500,6)
