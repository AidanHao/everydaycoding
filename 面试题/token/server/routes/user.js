const router = require('koa-router')()
const jwt = require('../utils/jwt')

// 定义一个post请求的接口
router.post('/login',(ctx)=>{

    // 拿到前端传给我参数
    let user = ctx.request.body
    // console.log(user);

    // 去数据库中查看是否存在user中一样的账户密码
    // 这里我们模拟一下成功了
    if(1){

        // 创建一个token
        let jwtToken = jwt.sign({
            // id
            id:1,
            // 用户名
            username:user.username,
            // 是否是管理员 加不加无所谓 由后端判断
            admin:true
        })
        console.log(jwtToken);

        ctx.body = {
            code:0,
            data:`你好${user.username}`,
            token:jwtToken//如何打造一个token

        }
    }else{
        ctx.body = {
            code:1,
            data:'用户名或密码错误'
        }
    }
})

// 首页的接口  校验前端在请求头当中携带过来的token是否有效！
// 传入路径，然后校验 校验成功了就往后面执行
router.post('/home',jwt.verify(),(ctx)=>{
    ctx.body = {
        code:0,
        data:'这是首页的数据'
    }
})

module.exports = router