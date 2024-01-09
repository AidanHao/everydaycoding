// 和日记相关的接口


const Router = require('@koa/router')//引入@koa/router
const router = new Router()
const {findNodeListByType,findNodeDetailById} = require('../controllers/mysqlControl.js')

// 加不加async 都不影响这个函数
router.post('/findNodeListByType',async(ctx)=>{
    // 以url为querry
    const {note_type} = ctx.request.body
    // 接下来就是拿着这个类型去数据库中找对应的数据
    
    // console.log(res);
    try{
        const res = await findNodeListByType(note_type)//res是个数组
        
            ctx.body = {
                code:'8000',
                data:res,
                msg:'查询成功！'
            }

    }catch(error){
        ctx.body={
            code:'8005',
            data:error,
            msg:'服务端异常'
        }
    }

})

router.post('/findNodeDetailById',async (ctx)=>{
    const {id} = ctx.request.body
    try{
        const res = await findNodeDetailById(id)
        console.log(res);
        if(res.length)
        {
        ctx.body = {
            code:'8000',
            data:res[0],
            msg:'查询成功'
        }
    }else{
        ctx.body={
            code:'8004',
            data:'error',
            msg:'查找失败'
        }
    }
    }catch(error){
        ctx.body ={
            code:'8005',
            data:error,
            msg:'服务端异常'

        }
    }
})



// 抛出
module.exports = router