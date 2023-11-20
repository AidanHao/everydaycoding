//理解进程
//石头剪刀布
//argv就是指令的意思
//argv就是接收人为给node传输的指令
// console.log(process);
//node 2.js hello 每打一个空格都会是一个新的指令被接收到
// console.log(process.argv[process.argv.length - 1]);
let player = process.argv[process.argv.length - 1]
//用电脑随机生成一个
let arr = ['rock','scissors','paper']
let index = Math.floor(Math.random()*arr.length)
let computer = arr[index]
//比较规则
if(computer === player)
{
    console.log('平局');
}else if(
    (computer==='rock'&& player==='paper')||
    (computer==='scissors'&& player==='rock')||
    (computer==='paper'&& player==='scissors')
    ){
        console.log('你赢了');
}else{
    console.log('你输了');
}
//js中有些东西是浏览器赋予给它的，除了这些，node基本上都能使用node的东西