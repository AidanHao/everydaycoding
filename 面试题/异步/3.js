function a() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('a');
            // resolve('ok')//只要调用resolve，reject就不执行，同样的 reject在上面，resolve就不会执行
            reject('no')
        }, 1000)

    })

}

function b() {
    setTimeout(() => {
        console.log('b');
    }, 500)
}
// 形参在函数内算是变量声明
// a().then(()=>{
//     b()
// })
// .then里面的回调会自动调用
a()
    // 没有resolve() .then会执行，但是then里面的回调不会触发
    .then((res) => {//res = ok
        console.log(res);
        b()
    }, (err) => {
        console.log(err);//then里面有两个回调，一个是resolve，一个是reject也就是catch
    })




// .catch(()=>{
//     console.log('error');
// })