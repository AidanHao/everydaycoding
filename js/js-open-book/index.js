var front = document.getElementsByClassName('front-cover')[0]//byClassName默认以数组返回
var book = document.getElementsByClassName('book')[0]
var card = document.getElementsByClassName('card')[0]
var shadow = document.getElementsByClassName('shadow')[0]
var hold= false
var clamp = function(val,min,max){
    return Math.max(min,Math.min(val,max))

}
//onmousedown监听鼠标是否点击，是否按下
front.onmousedown = function(){
    hold = true
}
window.onmouseup=function(){
    hold = false
}
window.onmousemove=function(e){
    if(hold){
        //修改左半本书的角度，卡片旋转，阴影倾斜
        //鼠标在x轴移动的距离控制角度
        var deg = clamp((window.innerWidth/2-e.x+300)/300 * -90,-180,0)
        front.style.transform = `rotateY(${deg}deg)`
        //整本书立起来60+deg/8
        book.style.transform=`rotateX(${deg/8+60}deg)`
        //卡片立起来deg/2
        card.style.transform = `rotateX(${deg/2}deg)`
        //阴影倾斜的角度deg/8
        shadow.style.transform = `skew(${deg/8}deg)`

    }
}