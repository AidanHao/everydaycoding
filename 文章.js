const Fyy ={
    name:'沸羊羊',
    age:20,
    hometown:'大肥羊村',
    inSingle:true,//是否单身
    SendFlower:function(receiver){
        receiver.receiveFlower(this)

    }
}
const Myy ={
    name:'美羊羊',
    emotion:50,//心情
    age:20,
    hometown:'大肥羊村',
    inSingle:true,//是否单身
    receiveFlower:function(sender){
        // console.log(this.name+"收到了"+sender.name+"的花")
        //这里用字符串模板进行优化
        console.log(`${this.name}收到${sender.name}的花`)
        if(this.emotion<80)
                {
                    console.log("本宫没心情,打出去")
                }else{
                    console.log('万达走一波')
                }
    }
}
const Lyy = {
    name:'懒羊羊',
    age:21,
    hometown:'大肥羊村',
    inSingle:true,//是否单身
    //method  接口 Interface 
    receiveFlower(sender){
        // 对代码进行重写
        if(Myy.emotion>=80){
            Myy.receiveFlower(sender)
            }else{
                setTimeout(function(){
                    Myy.emotion=99
                    Myy.receiveFlower(sender)
                },2000)//定时器
            }   
    }
}
console.log(Lyy.receiveFlower(Fyy))