//封装一个可用于创建token的函数
const jwt = require('jsonwebtoken')

function sign(option){//生成token
    return jwt.sign(option,'userinfo',{
        expiresIn:86400
    })
}

module.exports ={
    sign
}