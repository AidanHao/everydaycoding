const Router = require('@koa/router');// 引入路由
const router = new Router()// 声明实例// 是一个构造函数
const {getMachine}  = require('../controllers/mysqlControl.js')


// 定义接口
router.post('/getMachine',async(ctx)=>{
    // 获取数据
    try{
        const res = await getMachine()
        ctx.body = {
            code:'8000',
            data:res,
            msg:'查询成功！'
        }

    }catch(error){
        ctx.body = {
            code:'8005',
            data:error,
            msg:'服务端异常'
        }
    }
})


// node要用module形式
module.exports = router