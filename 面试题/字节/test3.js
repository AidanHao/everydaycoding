function timeout(time,num){
    // 定时器是浏览器带的方法 js是需要到浏览器里面实现的，定时器是浏览器打造的，定时器是可以并发的 node也是用的v8引擎
    setTimeout(()=>{
        console.log(num + '号任务完成');
    },time)
}

// timeout(10000,1);
// timeout(5000,2);
// timeout(1000,3);

// document 是html提供的内容

// web worker 是js可以手动让js执行多线程这个