// 封装sql语句和连接的操作
const mysql = require('mysql2');

// 用于声明mysql
const config = {
    database:{
        DATABASE:'mycool',
        USERNAME:'root',
        PASSWORD:'123456',
        PORT:'3306',
        HOST:'localhost'//可修改
    }
}

// 第一步 创建线程池，连接池，连接枢纽
const pool = mysql.createPool({
    host:config.database.HOST,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    database:config.database.DATABASE,
    port:config.database.PORT
})

// 第二步连接mysql
const sqlServer = {
    query:function(sql,values){
        // 建立一个pool连接
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err)
                }else{
                    // 连接成功就执行sql语句，这个query与我们定义的不是一个而是自带的 values 就一一写入倒sql
                    connection.query(sql,values,(err,rows)=>{
                        if(err){
                            reject(err)
                        }else{
                            // 执行成功就调用业务逻辑
                            resolve(rows)
                        }
                        connection.release()//释放连接
                    })
                }
            })
        })
    }
}

module.exports = sqlServer;