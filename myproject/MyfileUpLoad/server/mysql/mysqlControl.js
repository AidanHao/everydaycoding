// 封装sql语句和连接的操作
const mysql = require('mysql2');
const config = require('../config')
// 第一步 创建线程池，连接池，连接枢纽
const pool = mysql.createPool({
    host:config.database.HOST,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    database:config.database.DATABASE,
    port:config.database.PORT
})
// 第二步连接mysql
const allService = {
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

// 登录
const userLogin = (username,password)=>{
    let _sql = `select * from users where username='${username}' and password='${password}'`
    return allService.query(_sql)//返回一个promise对象
}
//  注册
const userFind = (username)=>{
    let _sql = `select * from users where username='${username}'`
    return allService.query(_sql)
}
//注册成功的sql
const userRegister = (values)=>{//values = [username,password,nickname]要写成整体就用数组
    let _sql = `insert into users set username = ? , password = ?, nickname = ?;`
    return allService.query(_sql,values)//value必须要和sql语句中的顺序一一对应上
}



//抛出这个函数
module.exports ={
    userLogin,
    userFind,
    userRegister
}