(async function(){
    try{
    const f1 = await readFileByPromise('da.txt')
    const f2 = await readFileByPromise('b.txt')
    const f3 = await readFileByPromise('c.txt')
    console.log(f1, f2, f3);
    }catch(e){
        console.log('出错啦！');
    }
})()

function readFileByPromise(filename) {
    const fs = require('fs')
	return new Promise((resolve, reject) => {
		fs.readFile(filename, 'utf-8', (err, data) => {
			if (err) reject(err)
			resolve(data)
		})
	})
}








// fs 读取文件
// promise + then / async + await 解决方案
// readFilePromise('a.txt')
// .then(()=>{return readFilePromise('b.txt')})
// .then(()=>{ readFilePromise('c.txt')})
// (async function(){
//     const f1 = await readFilePromise('a.txt')
//     const f2 = await readFilePromise('b.txt')
//     const f3 = await readFilePromise('c.txt')
// })()

// function readFilePromise(filename)
// {
//     return new Promise(function (resolve, reject) {
//         const fs = require('fs');
//         fs.readFile(`./${filename}`,'utf-8',function (err, data) {
//             if (err) {
//                 return
//             }
//             console.log(data);
//             resolve()
//         })
//     })
// }


// const fs = require('fs')

// function readFileByPromise(filename) {
// 	return new Promise((resolve, reject) => {
// 		fs.readFile(filename, 'utf-8', (err, data) => {
// 			if (err) reject(err)
// 			resolve(data)
// 		})
// 	})
// }

// const asyncReadFile = async () => {
// 	const a = await readFileByPromise('./a.txt')
// 	console.log(a)
// 	const b = await readFileByPromise('./b.txt')
// 	console.log(b)
// 	const c = await readFileByPromise('./c.txt')
// 	console.log(c)
// }

// asyncReadFile()