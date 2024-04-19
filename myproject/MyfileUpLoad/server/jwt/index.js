//封装一个可用于创建token的函数
const jwt = require('jsonwebtoken')

function sign(option){//生成token
    return jwt.sign(option,'userinfo',{
        expiresIn:86400
    })
}
const verify = ()=>(ctx,next)=>{
    let jwtToken = ctx.req.headers.authorization; //前端传过来要写成小写
    if (jwtToken) {
        jwt.verify(jwtToken, 'userinfo', (err, decode) => {
            if (err) {//前端传过来的token有问题
                ctx.body = {
                    status:401,//没有权限
                    msg: 'token失效'
                }
            }else{
                //校验成功
                next()//放行
            }
        })
    }else{
        ctx.body={
            status:401,
            msg:'您还未登录~'
        }
    }
}

// 解密函数
const resign = ()=>{
    let jwtToken = ctx.req.headers.authorization; //前端传过来要写成小写
    let jwtArray = jwtToken.split('.')
    let jwtHeader = Buffer.from(jwtArray[0],'utf8').toString('base64')
    let jwtBody= Buffer.from(jwtArray[1],'utf8').toString('base64')
    let jwtFooter = Buffer.from(jwtArray[2],'utf8').toString('base64')

}

module.exports ={
    sign,
    verify
}