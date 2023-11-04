// window.onload保证页面加载完再执行js
// window.onload = function() {

// }

//用new每一次运行一次都会new一下,工厂模式！

//历史弹幕
let data = [
    {value:'今天你听妈妈的话了嘛?',color:'red',fontSize:22,time:5},
    {value:'一抖哟',color:'green',fontSize:22,time:10},
    {value:'周董男神',color:'yellow',fontSize:26,time:15},

    {},
]
//整理弹幕数据 
CanvasBarrage.prototype.render = function() {
    //清除画布
    this.clear()
    this.renderBarrage()//弹幕绘制再画布上
    if(!this.isPaused) {//播放状态
        requestAnimationFrame(this.render.bind(this))//这个也是定时器 递归,无限循环
        
    }
}
CanvasBarrage.prototype.clear = function() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)//清除画布
}

CanvasBarrage.prototype.renderBarrage = function() 
{
    //拿到视频播放的时间，当前，根据播放的时间判断要不要绘制上
    let time=this.video.currentTime

    //遍历所有的弹幕
    this.barrages.forEach(function(barrage){

    
        if(time>=barrage.time){
            //执行一遍后，数组里面所有的值都会重新被初始化,下面让被初始化的弹幕对象就不再操作
         if(!barrage.isInit&&!barrage.flag){
            barrage.init()
            barrage.isInit=true
         }
         //控制弹幕左移
         barrage.x-=barrage.speed
         barrage.renderEach()
         if(barrage.x<-barrage.width){//从左边出屏幕
            barrage.flag = true
         }
 
        }
    })
    
}
CanvasBarrage.prototype.add = function(obj){
    //添加新的弹幕
    this.barrages.push(new Barrage(obj,this))//this.barrages新增16.7ms之后会重新渲染一波
}


function CanvasBarrage(canvas,video,opts = {}) {
    if(!canvas||!video) return 
    // this是实例对象
    this.video = video
    this.canvas = canvas
    // 设置Canvas宽高和video保持一致
    this.canvas.width = video.width
    this.canvas.height = video.height
    //获取画布
    this.ctx = canvas.getContext('2d')
    //初始化弹幕
    let defOpts = {
        color:'#e91e63',
        fontSize:20,
        speed:1.5,
        opacity:0.5,
        data:[]
    }
    Object.assign(this,defOpts,opts)//直接往this身上挂key值

    //视频播放，弹幕才出现
    this.isPaused = true
    //获取到所有的弹幕
    //map会返回一个新的数组
    this.barrages = this.data.map((item)=>new Barrage(item,this))//将每一条弹幕都修饰一下
    //移动弹幕
    this.render()


}



// let canvas = document.getElementById('canvas')

// new CanvasBarrage(canvas,video,{value:''})

let canvas = document.getElementById('canvas')
// video是因为知道此时视频多少秒
let video = document.getElementById('video')
// $没有意义，区分罢了
let $text = document.getElementById('text')
let $btn = document.getElementById('btn')
let $color = document.getElementById('color')
let $range = document.getElementById('range')

$btn.addEventListener('click', send)
$text.addEventListener('keyup', function(e){
    console.log(e)
    if(e.keyCode===13)
    {
    send()
    }
})
//添加弹幕数据
//创建整理弹幕的实例对象
let canvasBarrage = new CanvasBarrage(canvas,video,{data})
video.addEventListener('play', function(){
    canvasBarrage.isPaused = false

    canvasBarrage.render()//处理每一条弹幕！
})


function send(){
    //读取文本内容
    let value = $text.value
    //当前视频播放时间
    let time = video.currentTime
    let color = $color.value
    let fontSize= $range.value
    let obj = {value:value,color:color,fontSize:fontSize,time:time}
    //add吧obj放进去，接收新的弹幕，再执行一遍
    canvasBarrage.add(obj)

    // console.log(obj)
}
//修饰一条弹幕，为箭头函数服务
//第一个参数是一条弹幕，第二个是上一个函数的this
//init修饰的意思
Barrage.prototype.init = function(){
    this.color = this.obj.color||this.context.color//如果前者为undefined则会读取第二个
    this.speed = this.obj.speed||this.context.speed
    this.opacity = this.obj.opacity||this.context.opacity
    this.fontSize = this.obj.fontSize||this.context.fontSize

    //每条弹幕的宽度
    let p = document.createElement('p')
    p.style.fontSize = this.fontSize + 'px'
    p.innerHTML = this.value
    document.body.appendChild(p)
    this.width = p.offsetWidth
    document.body.removeChild(p)
    //设置弹幕的位置
    this.x = this.context.canvas.width
    this.y = this.context.canvas.height*Math.random()
    //上下方，超出边界
    if(this.y<this.fontSize){
        this.y = this.fontSize
    }else if(this.y>this.context.canvas.height-this.fontSize)
    {
        this.y = this.context.canvas.height - this.fontSize
    }
}
Barrage.prototype.renderEach = function(){
    //这条弹幕绘制在画布上
    //设置画布的文字字体和字号
    //设置画布的文字颜色
    //绘制文字
    this.context.ctx.font = `${this.fontSize}px Arial`
    this.context.ctx.fillStyle = this.color
    this.context.ctx.fillText(this.value,this.x,this.y)
}
function Barrage(obj,context){//context == this
    this.value = obj.value//新弹幕的内容
    this.time = obj.time
    this.obj = obj
    this.context = context
}


