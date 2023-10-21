const secondhand = document.querySelector('.second-hand')
const minhand = document.querySelector('.min-hand')
const hourhand = document.querySelector('.hour-hand')

//console.log(secondhand);

function setTime(){
    const now = new Date()

    //获取当前的秒数
    const seconds = now.getSeconds()
    const secondsDegrees = seconds * 6 + 90              //已经提前走了90° 
    secondhand.style.transform=`rotate(${secondsDegrees}deg)`
    //获取当前的分钟
    const min = now.getMinutes()
    const minDegrees = min*6+90
    minhand.style.transform=`rotate(${minDegrees}deg)`
    //获取当前的小时
    const hours = now.getHours()
    const hourDegrees = hours*30+ 90 +min * 0.5
    hourhand.style.transform=`rotate(${hourDegrees}deg)`

}
setTime()
// 定时器
setInterval(setTime,1000)