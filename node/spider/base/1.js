// console.log('hello');
//console是node里面的一个模块，console是一个对象
// console.log(Date);
// console.log(Math);
// setTimeout(()=>{
//     console.log('setTimeout');
// },2000)
// console.log(setInterval);
// console.log(setImmediate);
// console.log(requestAnimationFrame);//浏览器环境下的一个类似定时器的函数,时间是固定的，是根据电脑屏幕的刷新率来设定的，时间是不需要我们去手动设置的,
//人眼的刷新是16.7毫秒，在这之内是看不到的，1s内动60次

// console.log(__dirname)//读取到当前文件夹的绝对路径，当前文件所处的文件夹的绝对路径;
// console.log(__filename);//读取到某个文件所在的绝对路径

//运行一个软件就是一个进程，运行一个代码，node就会开启一个进程
console.log(process);//