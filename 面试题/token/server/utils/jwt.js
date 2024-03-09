// 封装token安装jsonwebtoken
const jwt = require('jsonwebtoken')

function sign(option){
    // 第一个参数是用户信息，第二个是加盐 可以加别的东西，让别人无法通过公认方法解密无法理解你的内容
    // 第三个参数设置加密方式
    return jwt.sign(option,'666',{
        expiresIn:60,// token的有效时长 // expiresIn是有效时长，以秒单位

    })
}

const verify = ()=> (ctx,next)=>{
    // 前端这个Au要大写 后端要小写
    // 把请求头里面的authorization的值读取到
    let jwtToken = ctx.req.headers.authorization
    if(jwtToken){
        // 校验
        jwt.verify(jwtToken,'666',(err,decode)=>{
            if(err){
                // 前端传过来的token有问题
                ctx.body = {
                    status:401,
                    message:'token失效'
                }
            }else{
                // 校验成功
                next()
            }
        })
    }else{
        ctx.body = {
            status:401,
            message:'请提供token'
        }
    }
}


module.exports = {
    sign,
    verify
}