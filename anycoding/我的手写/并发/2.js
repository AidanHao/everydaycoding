class SuperTask{
    constructor(maxNum){
        this.maxNum = maxNum;
        this.tasks = [];
        this.currentTask = 0
    }
    addTask(task){
        return new Promise((resolve, reject) => {
            this.tasks.push({task, resolve, reject})
            this.runTask
        })
    }
    runTask(){
        if(this.currentTask < this.maxNum && this.tasks.length){
            this.currentTask++
            const {task, resolve, reject} = this.tasks.shift()
            task()
            .then(resolve, reject)
            .finnally(() => {
                this.runTask()
                this.currentTask--
            })

        }
    }
}