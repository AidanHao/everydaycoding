class TrafficLight{
    constructor(){
        this.color = ['红色', '黄色', '绿色', '黄色']
        this.time = [3000,1000,2000,1000]
        this.current = 0
        this.isRun = false
    }
    start(){
        this.isRun = true
        this.run()
    }
    async run(){
        while(this.isRun){
            await new Promise((resolve, reject) => {
                console.log(this.color[this.current])
                setTimeout(() => {
                    resolve()
                }, this.time[this.current])
                this.current = ++this.current % 4
            })
        }
    }
}
const p = new TrafficLight()
p.start()