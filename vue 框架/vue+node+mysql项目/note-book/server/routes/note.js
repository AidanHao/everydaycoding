// 和日记相关的接口


const Router = require('@koa/router')//引入@koa/router
const router = new Router()
const {findNoteListByType,findNoteDetailById,notePublish} = require('../controllers/mysqlControl.js')
const {formateDate} = require('../config/utils.js')

// 加不加async 都不影响这个函数
router.post('/findNoteListByType',async(ctx)=>{
    // 以url为querry
    const {note_type} = ctx.request.body
    // 接下来就是拿着这个类型去数据库中找对应的数据
    
    // console.log(res);
    try{
        const res = await findNoteListByType(note_type)//res是个数组
        
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

router.post('/findNoteDetailById',async (ctx)=>{
    const {id} = ctx.request.body
    try{
        const res = await findNoteDetailById(id)
        // console.log(res);
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


// 发布笔记
router.post('/publish',async (ctx) =>{
    const {
        note_content,title,head_img,note_type,nickname,userId
    } = ctx.request.body
    const c_time = formateDate(new Date())
    const m_time = formateDate(new Date())
    try{
        const result = await notePublish([note_content,title,head_img,note_type,nickname,userId,c_time,m_time])
        if(result.affectedRows!==0){
            ctx.body = {
                code:'8000',
                data:'success',
                msg:'发布成功'
            }
        }else{
            // 有可能传参不对
            ctx.body = {
                code:'8004',
                data:'error',
                msg:'发布失败'
            }  
        }
    }catch(error){
        ctx.body={
            code:'8005',
            data:error,
            msg:'服务器异常'

        }
    }

})


// 抛出
module.exports = router