var speed = document.querySelector('.speed');//赋值语句
var bar = document.querySelector('.speed-bar');
var video = document.querySelector('.flex')
console.log(speed);
// e是形参，参数
speed.addEventListener('mousemove',function(e){
    // 某容器距离浏览器顶部的距离speed.offsetTop
    var y = e.y-speed.offsetTop;
    // 读取容器的高度speed.offsetHeight
    var percent = y / speed.offsetHeight;
    // Math.round()向上取整
    var height = Math.round(percent*100)+'%'
    bar.style.height=height
    var min = 0.4;
    var max =  4;
    var playbackRate = percent * (max-min)+min
    // toFixed(2)保留两位小数
    bar.textContent = playbackRate.toFixed(2)+'x'
    // 视频播放速度
    video.playbackRate=playbackRate;
})