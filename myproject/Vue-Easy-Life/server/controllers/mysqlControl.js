// 封装和数据库连接的相关操作
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


// 获取数据库数据
const getMachine = () =>{
    let _sql = `select * from machine;`
    return allService.query(_sql)
}

// 抛出函数
module.exports = {
    getMachine
}