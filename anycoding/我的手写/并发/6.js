class SuperTask{
    constructor(max){
        this.maxNum = max;
        this.runNum = 0;
        this.tasks = [];
    };
    addTask(task){
        return new Promise((resolve, reject) => {
            this.tasks.push({task, resolve, reject});
            this.runTask();
        })
    }
    runTask(){
        if(this.runNum < this.maxNum && this.tasks.length){
            this.runNum++;
            const {task, resolve, reject} = this.tasks.shift();
            task()
            .then(resolve, reject)
            .finnaly(() => {
                this.runNum--
                this.runTask();
            })
        }
    }
}