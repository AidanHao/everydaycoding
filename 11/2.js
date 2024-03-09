class Light{
    constructor(){
        this.color = ['红色','黄色','绿色']
        this.time = [1000,1000,1000]
        this.Lindex = 0
    }

    changeColor(color,time,Lindex){
        this.color = color[Lindex]
        this.time = time[Lindex]
        this.onrun(color,time,Lindex)
    }
    onrun(color,time,Lindex){
        let index = this.Lindex
        console.log(this.color.indexOf(color));
        setTimeout(()=>{
            this.changeColor(color,time,index)
        },this.time.indexOf(time))
    }
    start(){
        this.onrun(this.color,this.time,this.Lindex)
    }


}
const p = new Light()
p.start()