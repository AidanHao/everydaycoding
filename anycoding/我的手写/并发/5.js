class SuperTask{
    constructor(max){
        this.tasks =  []
        this.runNum = 0
        this.max = max
    }
    addTask(task){
        return new Promise((resolve, reject) => {
            this.tasks.push({task,resolve, reject})
            this.run()
        })
    }
    run(){
        if(this.runNum < this.max && this.tasks.length){
            const {task, resolve, reject} = this.tasks.shift()
            this.runNum++
            task().then(resolve, reject).finally(() => {
                this.runNum--
                this.run()
            })
        }
    }
}