const Router = require('@koa/router')//引入@koa/router
const router = new Router()
const {userLogin,userFind,userRegister} = require('../controllers/mysqlControl.js')//我们直接解构,返回值是一个对象



//定义登录接口
//这里是登录接口
// 登录请求 一般用post 也可以用get 本质上没有区别 post里面可以接n个参数，但是get的参数是有限的
router.post('/login',async (ctx)=>{
    // ctx.body = 'login success'、

    //获取到前端传递的账号和密码，去数据库中校验账户密码的正确性
    const {username,password}=ctx.request.body//前端参数在请求体中 这里用的解构语法
    try{
        const result = await userLogin(username,password)//await把执行逻辑返回出来
        // console.log(result); //result是一个空数组
        if(result.length){//账户密码存在
            let data = {
                id:result[0].id,
                nickname:result[0].nickname,
                username:result[0].username
            }
            ctx.body = {
                code:'8000',//不是状态码
                data:data,
                msg:"登录成功",
            }
        }else{//后端错误两种情况，网络请求没走通，逻辑错误，或者后端代码错误，服务器端异常
            ctx.body = {
                code:'8004',
                data:"error",
                msg:'账户或密码错误!'
            }
        }


    }catch(error){
        ctx.body={
            code:'8005',
            data:error,
            msg:'服务器异常！'
        }
    }
    //连接数据库进行验证


    // console.log(username,password);
    // ctx.body = 'login success'//会覆盖try catch中的内容
})


//get 和 post get会把参数信息直接接在url后面，这里推荐使用post 参数会放在请求体里面，以数据报的方式进行传输
//定义注册接口
router.post('/register',async (ctx)=>{
   // 拿到前端传过来的username和password,nickname 
   //在数据库校验是否username 是否存在，如果不存在
   //往数据库中植入一条新的数据
   const {username,password,nickname} = ctx.request.body
   //后端也要做数据校验，双重保证
   if(!username||!password||!nickname)
   {
    ctx.body = {
        code:'8001',
        msg:'账户，密码或昵称不能未空'
    }
    return 
   }
   // 进行数据校验 账户不能冲突 去users表检查注册的用户名是否存在
   try{
    const findRes = await userFind(username)
    //    console.log(findRes);//查到会返回整个数组，查不到返回空数组
       if(findRes.length){//账户已注册，已存在
        ctx.body = {
            code:'8003',
            data:'error',
            msg:'账户已存在'
        }
        return 
       }
       //植入
       const registerRes = await userRegister([username, password,nickname])
    //    console.log(registerRes);
       if(registerRes.affectedRows!==0){
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
        msg:'服务器异常'
    }
   }
    
})

//common js 规范 抛出 node里面要这样用
module.exports = router