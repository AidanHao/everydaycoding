class TrafficLight{
    constructor(){
        this.color = ['红灯', '黄灯', '绿灯', '黄灯']
        this.time = [3000, 1000, 2000, 1000]
        this.current = 0
        this.isRun = false
    }
    start(){
        this.isRun = true;
        this.run();
    }
    async run(){
        await new Promise((resolve, reject) => {
            console.log(this.color[this.current]);
            setTimeout(() => {
                resolve();
            }, this.time[this.current]);
            this.current = ++this.current % this.color.length;
            
        })
    }
}