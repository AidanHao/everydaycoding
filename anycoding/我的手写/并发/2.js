// 模拟一个并发任务、
const timer = function(delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },delay)
    })
}

// 实现并发、
class SuperTask{
    constructor(maxNum){
        this.maxNum = maxNum
        this.tasks = []
        this.runNum = 0
    }
    start(task){
        return new Promise((resolve,reject)=>{
            this.tasks.push({task,resolve,reject})
            this.addTask()
        })
    }
    addTask(){
        if(this.runNum < this.maxNum&&this.tasks.length){
            this.runNum++
            const {task,resolve,reject} = this.tasks.shift()
            task()
            .then(resolve,reject)
            .finally(()=>{
                this.runNum--
                this.addTask()
            })
        }
    }
}
const p = new SuperTask(2)
// 定义一个函数用于执行并发
const runSuperTask= function(delay,taskname){
    p.start(()=>timer(delay))
    .then(()=>{
        console.log(`任务${taskname}完成`);
    })
}
runSuperTask(1000,1)
runSuperTask(2000,2)
runSuperTask(1000,3)
runSuperTask(3000,4)
runSuperTask(1000,5)
runSuperTask(1000,6)
runSuperTask(1000,7)