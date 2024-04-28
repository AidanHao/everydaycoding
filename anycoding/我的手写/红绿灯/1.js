class TrafficLight{
    constructor(){
        this.colors = ['红色','黄色','绿色','黄色']
        this.times = [3000,1000,2000,1000]
        this.currentIndex = 0
        this.isRunning = false
    }
    start(){
        this.isRunning = true
        this.run()
    }
    async run(){
        while(this.isRunning){
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