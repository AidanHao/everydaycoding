const Router = require('@koa/router')//引入@koa/router
const router = new Router()
const {userLogin} = require("../mysql/mysqlControl.js")//解构拿到sql方法



//定义登录接口
router.post('/login',async (ctx)=>{
    // 拿到前端传递的账号和密码，去数据库校验
    const {username,password} = ctx.request.body//前端参数在请求体当中，使用解构语法
    try{
        const result = await userLogin(username,password)//await把执行逻辑返回出来
        if(result.length){//账号密码存在
            let data = {
                id:result[0].userid,
                nickname:result[0].nickname,
                username:result[0].username,
                userpower:result[0].userpower
            }
            ctx.body = {
                code:'8000',//不是状态码
                data:data,
                msg:'登录成功'
            }
        }else{//后端错误两种情况，网络请求没走通，逻辑错误，或者后端代码错误，服务器端异常
            ctx.body = {
                code:'8004',
                data:'error',
                msg:'账号密码错误'
            }
        }
    }catch(error){
        ctx.body = {
            code:'8005',
            data:error,
            msg:'服务器异常'
        }
    }
})
//common js 规范 抛出 node里面要这样用
module.exports = router