// commonjs
const game = require('./game.js')
var winCount = 0
// node 内置的process进程对象，document
// 在命令行输入的时候 事件监听
process.stdin.on('data',(buffer)=>{
    // 字节流可以按照比特流进行解析，每个文件的底层都是buffer二进制缓冲
    // console.log(buffer);
    var action = buffer.toString().trim();
    // console.log(action);
    const result = game(action)
    if(result == 1){
        winCount++
        if(winCount == 3)
        {
            console.log('你赢了!');
            // 进程退出，程序结束
            process.exit()
            
        }
        
    }
})