const Router = require('@koa/router')//引入@koa/router
const router = new Router()
const {userLogin, userFind, userRegister} = require("../mysql/mysqlControl.js")//解构拿到sql方法
const jwt = require('../jwt/index.js')


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
            // 对返回的数据进行jwt，将昵称也返回，减少请求
            data={
                token:jwt.sign(data),
                nickname:result[0].nickname,
            }
            // console.log(data);
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


//定义注册接口
router.post('/register',async (ctx)=>{
    const {username,password,nickname } = ctx.request.body//解构语法拿到对应的数据
    //后端数据校验，双重保障
    if(!username||!password||!nickname){
        ctx.body = {
            code:'8001',
            msg:'账号，密码或者昵称不能为空'
        }
        return
    }
    //进行账号数据校验，账户不能冲突，去user表对比
    try{
        const findRes = await userFind(username)
        // 如果找到了是一个数组
        if(findRes.length){
            ctx.body = {
                code:'8003',
                data:'error',
                msg:'账户已经存在'
            }
            return
        }
        //没找到则允许新的值
        const registerRes = await userRegister([username,password,nickname])
        if(registerRes.affectedRows !==0){
            ctx.body = {
                code:'8000',
                data:'success',
                msg:'注册成功'
            }
        }else{
            ctx.body = {
                code:'8004',
                data:'error',
                msg:'注册失败'
            }
        }
    }catch(error){
        ctx.body = {
            code:'8005',
            data:error,
            msg:'服务端异常'
        }
    }
})


//common js 规范 抛出 node里面要这样用
module.exports = router