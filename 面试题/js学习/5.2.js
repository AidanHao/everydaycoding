let obj = {
    a: 1,
    b: {
        n: 2
    }
}
function deepCopy(obj) {
    return new Promise((resolve) => {
        const { port1, port2 } = new MessageChannel()//x消息隧道
        port1.postMessage(obj)
        port2.onmessage = (msg) => {
            resolve(msg.data)
        }
    })
}
async function fon() {
    let newObj = await deepCopy(obj)
    console.log(newObj);
}
fon()