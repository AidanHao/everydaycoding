class SuperTask{
    constructor(max){
        this.max =  max;
        this.tasks = [];
        this.runNum = 0;
    }
    add(task){
        return new Promise((resolve, reject) => {
            this.tasks.push({task, resolve, reject});
            this.run()
        })
    }
    run(){
        if(this.runNum < this.max && this.tasks.length){
            const {task, resolve, reject} = this.tasks.shift();
            this.runNum++
            task()
            .then(resolve, reject)
            .finally(() => {
                this.runNum--
                this.run()
            })
        }
    }
}

const timer = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}
const p = new SuperTask(2);
const addPromise = (delay, taskName) => {
    p.add(() => timer(delay))
    .then(() => {
        console.log(`任务${taskName}完成`);

    })
}
addPromise(1000, 1)
addPromise(2000, 2)
addPromise(3000, 3)
addPromise(1000, 4)
addPromise(1000, 5)

