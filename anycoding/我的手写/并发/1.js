class SuperTask{
    constructor(maxnum){
        this.maxnum = maxnum;
        this.tasks = []
        this.runningNum = 0
    }
    addTask(task){
        return new Promise((resolve,reject)=>{
            this.tasks.push({task,resolve,reject});
            this.runTask()
        })
    }
    runTask(){
        if(this.runningNum<this.maxnum&&this.tasks.length){
            this.runningNum++
            const {task,resolve,reject} = this.tasks.shift()
            task()
            .then(resolve,reject)
            .finnaly(()=>{
                this.runningNum--
                this.runTask()
            })
        }
    }
}