// 封装 和数据库连接的相关操作
const mysql = require('mysql2');//引入装好的mysql
const config = require('../config')

//第一部以，创建线程池 也叫连接池，创建一个连接枢纽
const pool = mysql.createPool({
    host:config.database.HOST,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    database:config.database.DATABASE,
    port:config.database.PORT,
})

//第二步 连接mysql
const allService = {
    query:function(sql,values){
        //数据库连接是一个异步操作
        //建立一个pool 连接
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err)
                }else{
                    //连接成功了就执行sql语句 这个query与我们定义的不是一个而是自带的 values 就一一写入倒sql
                    connection.query(sql,values,(err,rows)=>{
                        if(err){
                            reject(err)
                        }else{
                            // 执行成功了就调用业务逻辑，不写在这里
                            resolve(rows)
                        }
                        connection.release()//释放连接
                    })
                }
            })//调用了就会连接
        })
    }
}


//登录
const userLogin = (username,password) => {
    let _sql = `select * from users where username="${username}" and password="${password}"; `
    return allService.query(_sql)//返回的是一个promise对象
}

//注册校验 查询
const userFind = (username)=>{
    let _sql = `select * from users where username="${username}";`
    return allService.query(_sql)
    
}

//注册成功，植入数据
const userRegister = (values)=>{//values = [username,password,nickname]要写成整体就用数组
    let _sql = `insert into users set username=?,password=?,nickname=?;`
    return allService.query(_sql,values)//value必须要和sql语句中的顺序一一对应上
}

//根据类型查找笔记
const findNodeListByType = (note_type)=>{
    let _sql = `select * from note where note_type="${note_type}";`
    return allService.query(_sql)//执行这个sql语句
}

//根据id找数据
const findNodeDetailById = (id)=>{
    let _sql=`select * from note where id="${id}";`
    return allService.query(_sql)
}

//抛出这个函数
module.exports ={
    userLogin,
    userFind,
    userRegister,
    findNodeListByType,
    findNodeDetailById,
}