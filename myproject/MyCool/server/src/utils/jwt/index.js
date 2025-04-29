//封装一个可用于创建token的函数
const jwt = require('jsonwebtoken')

function sign(option){//生成token
    return jwt.sign(option,'userInfo',{
        expiresIn:86400
    })
}

const verify = ()=>(ctx,next)=>{
    let jwtToken = ctx.req.headers.authorization; //前端传过来要写成小写
    if (jwtToken) {
        jwt.verify(jwtToken, 'userInfo', (err, decode) => {
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

// 解析token内容
const parseToken = (token) => {
    try {
        // 移除可能的Bearer前缀
        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
        }
        
        // 直接使用jwt.verify解析token
        const decoded = jwt.verify(token, 'userInfo');
        return {
            success: true,
            data: decoded
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

module.exports ={
    sign,
    verify,
    parseToken
}